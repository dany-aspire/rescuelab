# RL-007 Diagnosis

## Status

`DIAGNOSIS_PROPOSED` on 2026-08-24. No application or configuration repair has
been applied. This diagnosis requires ChatGPT Work review before the standing
repair authorization can advance the incident.

## Customer symptom reproduced

The three-file split-origin stack starts successfully. PostgreSQL and the API
are healthy, the API is published on <http://localhost:3000>, and the frontend
loads from <http://localhost:8080>. Direct API requests return valid JSON, but
Chrome blocks the frontend's cross-origin health and incident requests.

The browser renders **Service degraded**, reports `Failed to fetch`, and shows
an empty incident queue. A browser form submission is stopped by its CORS
preflight and does not create a database record.

## Reproduction procedure

An ignored local `.env` was copied from `.env.example` without displaying or
committing its values. RL-007 was reproduced from
`/home/dan/rescuelab-worktrees/rl-007` with:

```bash
docker compose -p rescuelab \
  -f compose.yaml \
  -f compose.production.yaml \
  -f compose.split-origin.yaml \
  config

docker compose -p rescuelab \
  -f compose.yaml \
  -f compose.production.yaml \
  -f compose.split-origin.yaml \
  up --build --detach --force-recreate
```

The existing `rescuelab` project and PostgreSQL named volume were reused. No
volume was deleted, reset, or reinitialized.

## Proposed root cause

The split-origin overlay builds the frontend to request
`http://localhost:3000/api` and serves that frontend from
`http://localhost:8080`, but it configures the API's single allowed CORS origin
as `http://localhost:5173`.

The backend CORS middleware uses an exact origin comparison. It therefore adds
CORS response headers for the obsolete development origin on port 5173, but not
for the deployed frontend origin on port 8080. The API still processes simple
GET requests and returns HTTP 200, yet browsers hide those responses because
`Access-Control-Allow-Origin` is missing. JSON POST creation first triggers an
OPTIONS preflight, which the browser rejects for the same missing header, so the
POST is not executed.

This is a split-origin deployment configuration mismatch, not an API route,
network, port, frontend bundle, PostgreSQL, credential, or container-health
failure.

## Supporting evidence

### Resolved non-secret configuration

The three-file Compose configuration validates and resolves to:

```text
frontend origin:       http://localhost:8080
frontend API base URL: http://localhost:3000/api
published API origin:  http://localhost:3000
configured CORS origin:http://localhost:5173
```

The frontend and API are intentionally on different origins, but the API's
configured allowed origin does not match the deployed frontend.

### Runtime and preserved data

All services start successfully:

```text
rescuelab-db-1    Up (healthy)
rescuelab-api-1   Up (healthy), published on localhost:3000
rescuelab-web-1   Up, published on localhost:8080
```

PostgreSQL reports that its existing data directory was reused, skips
initialization, and becomes ready for connections. It contains all nine existing
incident records before and after the blocked browser creation attempt.

### Direct and simple-request headers

A direct `GET /api/health` without an Origin header returns HTTP 200 healthy
JSON.

With `Origin: http://localhost:8080`, the same request still returns HTTP 200
JSON at the HTTP layer but has no `Access-Control-Allow-Origin` header. Chrome
must therefore block frontend JavaScript from reading it.

With the currently configured `Origin: http://localhost:5173`, the response
includes:

```text
Access-Control-Allow-Origin: http://localhost:5173
Vary: Origin
Access-Control-Allow-Headers: Content-Type
Access-Control-Allow-Methods: GET, POST, OPTIONS
```

A request from `https://disallowed.example` receives no CORS authorization,
confirming that the existing middleware is restrictive rather than permissive.

### POST preflight headers

An OPTIONS preflight for JSON incident creation from
`http://localhost:8080` returns HTTP 204 but omits every CORS authorization
header. The equivalent preflight from `http://localhost:5173` receives the
allow-origin, allowed-methods, and allowed-headers fields.

This shows that the request method and content type are already supported; only
the intended origin is misconfigured.

### Browser network and console evidence

Chrome records both initial GET failures as:

```text
corsError: MissingAllowOriginHeader
net::ERR_FAILED
```

Its console states that requests to the API from origin
`http://localhost:8080` were blocked because no
`Access-Control-Allow-Origin` header was present. The rendered UI shows:

```text
Status: Service degraded
Alert: Failed to fetch
Incident count: 0
```

Submitting the browser form triggers an OPTIONS request for
`/api/incidents`. Chrome records:

```text
corsError: PreflightMissingAllowOriginHeader
```

The database count remains nine, confirming that the rejected preflight
prevented creation.

## Smallest safe repair proposed

Change only the split-origin overlay's default `CORS_ORIGIN` from
`http://localhost:5173` to the deployed frontend origin
`http://localhost:8080`:

```yaml
CORS_ORIGIN: ${CORS_ORIGIN:-http://localhost:8080}
```

This one-value repair authorizes the intended frontend while retaining the
existing exact-match restriction. It does not use a wildcard, disable browser
security, authorize arbitrary origins, or change application routes, ports,
database configuration, and credential handling. Operators can still override
the value explicitly for a different deployment origin.

## Verification plan after approval

1. Change only the split-origin overlay's default CORS origin to port 8080.
2. Run backend tests and the frontend production build.
3. Validate all three Compose files and build the images.
4. Recreate the three-file stack without deleting or resetting the PostgreSQL
   volume.
5. Confirm direct API health and intended-origin GET response headers.
6. Confirm a disallowed origin still receives no CORS authorization.
7. Confirm the intended-origin OPTIONS preflight includes the correct origin,
   methods, and content-type header authorization.
8. Verify browser health, incident loading, creation, and refresh persistence
   across the split origins.
9. Record results in `docs/incidents/RL-007-report.md` and update the GitHub
   mailbox for review.

## Diagnostic integrity

The diagnosis used only current configuration and application files, resolved
non-secret Compose fields, service state and logs, direct HTTP responses,
request/response headers, Chrome network and console evidence, UI behaviour, and
an in-container record count. It did not compare the incident branch with
`main`, inspect the scenario-creation diff, or use repository history to reveal
the injected change.

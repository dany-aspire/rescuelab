# RL-005 Diagnosis

## Status

`DIAGNOSIS_PROPOSED` on 2026-08-24. No application or configuration repair has
been applied. This diagnosis requires ChatGPT Work review and explicit learner
approval before implementation.

## Customer symptom reproduced

The combined base and production Compose stack starts with PostgreSQL and the
API both healthy, and a newly recreated Nginx container starts normally. The
static web page loads, but both proxied API routes return HTTP 502.

Headless Chrome renders **Service degraded**, reports `Health check failed`, and
shows an empty incident queue even though the database still contains all
existing records.

## Reproduction procedure

An ignored local `.env` was copied from `.env.example` without displaying or
committing its values. RL-005 was reproduced from
`/home/dan/rescuelab-worktrees/rl-005` with the combined configuration:

```bash
docker compose -p rescuelab -f compose.yaml -f compose.production.yaml config
docker compose -p rescuelab -f compose.yaml -f compose.production.yaml up --build --detach
docker compose -p rescuelab -f compose.yaml -f compose.production.yaml up --detach --force-recreate web
docker compose -p rescuelab -f compose.yaml -f compose.production.yaml ps --all
```

The existing `rescuelab` project and PostgreSQL named volume were reused. No
volume was deleted, reset, or reinitialized.

## Proposed root cause

The production overlay sets the API process `PORT` to `3001`, while the Nginx
configuration proxies `/api/` to `api:3000`. The two internal port settings do
not agree.

The API server and its container health check both read the same `PORT`
environment variable. Consequently, the API listens on 3001 and its direct
health check passes, so Docker correctly marks it healthy. Nginx is independent
of that environment variable and continues connecting to port 3000, where
nothing is listening. Browser traffic therefore receives 502 even while all
containers appear healthy.

This is a production-overlay/Nginx internal port-routing mismatch, not an API
startup, PostgreSQL, credential, service-name, frontend, or volume failure.

## Supporting evidence

### Resolved non-secret configuration

Combined Compose validation passes. Safe resolved-configuration inspection
shows the API port as `3001`; both API and web use the default Compose network.
The API health check runs `backend/healthcheck.js`, which reads `PORT` and
requests its own loopback health route on that port.

Nginx contains this independent upstream configuration:

```nginx
proxy_pass http://api:3000/api/;
```

### Service state and API logs

After recreating the complete combined stack:

```text
rescuelab-db-1    Up (healthy)
rescuelab-api-1   Up (healthy)
rescuelab-web-1   Up on localhost:8080
```

The API startup log states:

```text
RescueLab API listening on port 3001
```

A direct request inside the API container to port 3001 returns HTTP 200 JSON
with `status: ok` and `database: connected`.

### In-network port and proxy checks

From the Nginx container:

- TCP connection to `api:3000`: refused.
- TCP connection to `api:3001`: open.
- `GET /api/health` through local Nginx: HTTP 502.

Nginx logs the corresponding upstream failure:

```text
connect() failed (111: Connection refused) while connecting to upstream
upstream: http://api:3000/api/health
```

This comparison isolates the failure to Nginx's destination port: the same
healthy API is reachable on 3001 but not on the configured upstream port 3000.

### External HTTP and browser behaviour

Through <http://localhost:8080>, both `GET /api/health` and
`GET /api/incidents` return HTTP 502 HTML from Nginx. Headless Chrome observes:

```text
Status: Service degraded
Alert: Health check failed
Incident count: 0
```

### PostgreSQL and preserved data

PostgreSQL reports that its existing data directory was reused, skips
initialization, becomes ready for connections, and remains healthy. A direct
in-container count confirms all seven existing incident records remain present.
No credential value was printed.

## Smallest safe repair proposed

Change the production overlay's explicit API `PORT` from `3001` to the documented
internal port `3000`, matching the Nginx upstream and the repository's existing
port convention.

This one-value configuration repair makes the production API listener, its
health check, and Nginx routing agree without changing application code, proxy
paths, service discovery, database configuration, or health semantics. It keeps
the production setting explicit and does not expose or commit a credential.

## Verification plan after approval

1. Change only the production overlay API port from 3001 to 3000.
2. Run backend tests and the frontend production build.
3. Validate the combined Compose configuration and confirm the resolved
   non-secret API port agrees with Nginx.
4. Rebuild and recreate the complete combined stack without deleting the
   PostgreSQL volume.
5. Confirm PostgreSQL and API health, direct API health, and proxied HTTP 200
   JSON from `/api/health`.
6. Confirm all existing incidents load.
7. Verify browser incident creation and refresh persistence.
8. Record results in `docs/incidents/RL-005-report.md` and update the GitHub
   mailbox for review.

## Diagnostic integrity

The diagnosis used only current configuration and source files, resolved
non-secret Compose fields, service health, startup and proxy logs, safe internal
HTTP/TCP checks, external HTTP/browser behaviour, and an in-container record
count. It did not compare the incident branch with `main`, inspect the
scenario-creation diff, or use repository history to reveal the injected change.

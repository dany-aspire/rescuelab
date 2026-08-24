# RL-006 Diagnosis

## Status

`DIAGNOSIS_PROPOSED` on 2026-08-24. No application or configuration repair has
been applied. This diagnosis requires ChatGPT Work review and explicit learner
approval before implementation.

## Customer symptom reproduced

The production-style stack starts successfully and Docker reports PostgreSQL and
the API as healthy. Nginx serves the static application, but its proxied health
and incident requests return HTTP 404 responses from the backend.

Headless Chrome renders **Service degraded**, reports `Health check failed`, and
shows an empty incident queue even though the database still contains every
existing record.

## Reproduction procedure

An ignored local `.env` was copied from `.env.example` without displaying or
committing its values. The stack was rebuilt and recreated from
`/home/dan/rescuelab-worktrees/rl-006` with:

```bash
docker compose -p rescuelab -f compose.yaml -f compose.production.yaml config --quiet
docker compose -p rescuelab -f compose.yaml -f compose.production.yaml up --build --detach --force-recreate
docker compose -p rescuelab -f compose.yaml -f compose.production.yaml ps --all
```

The existing `rescuelab` project and PostgreSQL named volume were reused. No
volume was deleted, reset, or reinitialized.

## Proposed root cause

Nginx matches requests with `location /api/` but proxies them using
`proxy_pass http://api:3000/;`. Because that `proxy_pass` includes a URI
component (`/`), Nginx replaces the matching `/api/` location prefix with `/`.

The resulting upstream mappings are:

```text
external /api/health     -> upstream /health
external /api/incidents  -> upstream /incidents
```

The Express backend defines `/api/health` and `/api/incidents`; it does not
define `/health` or `/incidents`. The rewritten requests therefore reach the
healthy API container but receive its normal not-found responses.

This is an Nginx URI-rewrite configuration error, not a container health,
service discovery, port, API startup, database, credential, or frontend failure.

## Supporting evidence

### Container and database state

After the complete rebuild:

```text
rescuelab-db-1    Up (healthy)
rescuelab-api-1   Up (healthy)
rescuelab-web-1   Up on localhost:8080
```

PostgreSQL reports that its existing data directory was reused, skips
initialization, and becomes ready for connections. A direct in-container count
confirms all eight existing incident records remain present. No credential value
was printed.

### Direct API path comparison

Inside the API container:

- `GET /api/health`: HTTP 200 JSON with `status: ok` and
  `database: connected`.
- `GET /health`: HTTP 404.

The first result proves the API and database are healthy. The second matches the
path that Nginx currently produces upstream.

### Proxied response evidence

Through Nginx:

- `GET /api/health`: HTTP 404 with `Cannot GET /health`.
- `GET /api/incidents`: HTTP 404 with `Cannot GET /incidents`.

These backend-generated response bodies expose the exact stripped upstream paths
without requiring any configuration change or traffic interception.

### Effective Nginx configuration and semantics

`nginx -T` validates the configuration and confirms the active pairing:

```nginx
location /api/ {
    proxy_pass http://api:3000/;
}
```

Under Nginx `proxy_pass` URI semantics, the trailing `/` after the upstream port
is a URI component. Nginx replaces the matched location prefix with that URI,
which explains the observed `/health` and `/incidents` requests exactly.

### Browser behaviour

Headless Chrome observes:

```text
Status: Service degraded
Alert: Health check failed
Incident count: 0
```

The static bundle loads normally; only API requests fail.

## Smallest safe repair proposed

Remove the trailing slash from the Nginx `proxy_pass` target:

```nginx
location /api/ {
    proxy_pass http://api:3000;
}
```

With no URI component in `proxy_pass`, Nginx preserves the original request URI,
so external `/api/health` reaches backend `/api/health` and the same applies to
all `/api/` routes. This one-character repair does not bypass Nginx or change
application routes, ports, service discovery, health checks, or database state.

## Verification plan after approval

1. Remove only the trailing slash from the Nginx `proxy_pass` target.
2. Run backend tests and the frontend production build.
3. Validate Compose and build the web image.
4. Rebuild and recreate the complete stack without deleting the PostgreSQL
   volume.
5. Confirm direct and Nginx-proxied `/api/health` both return HTTP 200 JSON.
6. Confirm all existing incidents load through Nginx.
7. Verify browser incident creation and refresh persistence without bypassing
   Nginx.
8. Record results in `docs/incidents/RL-006-report.md` and update the GitHub
   mailbox for review.

## Diagnostic integrity

The diagnosis used only current configuration and route files, effective Nginx
configuration, container health, direct and proxied HTTP responses, service
logs, browser behaviour, and an in-container record count. It did not compare
the incident branch with `main`, inspect the scenario-creation diff, or use
repository history to reveal the injected change.

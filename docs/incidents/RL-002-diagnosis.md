# RL-002 Diagnosis

## Status

`DIAGNOSIS_PROPOSED` on 2026-08-23. No application or configuration repair has
been applied. This diagnosis requires ChatGPT Work review and explicit learner
approval before implementation.

## Customer symptom reproduced

The production-style Compose deployment cannot complete startup. PostgreSQL
becomes healthy, but the API exits with code 1. The API health dependency is
therefore never satisfied, and the web application cannot use the API.

The existing Nginx container can still serve the static page because it was
already running in the reused Compose project, but both proxied API requests fail
with HTTP 502. Chrome renders **Service degraded**, `Health check failed`, and an
empty incident queue.

## Reproduction procedure

The incident was reproduced from `/home/dan/rescuelab-worktrees/rl-002` with the
existing Compose project name:

```bash
docker compose -p rescuelab config
docker compose -p rescuelab ps --all
docker compose -p rescuelab up --build --detach
docker compose -p rescuelab ps --all
docker compose -p rescuelab logs --no-color --tail 100 api db web
```

Using `-p rescuelab` preserved and reused the existing
`rescuelab_postgres_data` volume. No volume was deleted or reset.

## Proposed root cause

The API service's resolved production environment does not contain
`DATABASE_URL`, although the application requires it before opening its listener.

The resolved Compose API environment contains `NODE_ENV` and `PORT`, but no
`DATABASE_URL`. Safe inspection of the created container confirmed the same
environment-variable names without exposing their values.

At startup, `backend/src/server.js` reads `process.env.DATABASE_URL` and
intentionally exits when it is absent:

```text
DATABASE_URL is required.
```

The API therefore exits before listening on port 3000. This is a deployment
configuration failure, not a PostgreSQL availability or data problem.

## Supporting evidence

### Resolved configuration

`docker compose -p rescuelab config` resolves the API environment to:

```yaml
environment:
  NODE_ENV: production
  PORT: "3000"
```

No repository `.env` file or host `DATABASE_URL` was present during the
reproduction. `.env.example` documents the required database URL and the README
already instructs operators to copy it to `.env` for Docker usage.

### Container state and startup logs

After the rebuild:

```text
rescuelab-api-1   Exited (1)
rescuelab-db-1    Up (healthy)
rescuelab-web-1   Up, but unable to reach the API
```

The API's earliest application output was:

```text
> node src/server.js
DATABASE_URL is required.
npm error code 1
```

Container inspection reported exit code 1 and showed environment-variable names
`NODE_ENV`, `PORT`, `NODE_VERSION`, `YARN_VERSION`, and `PATH`; it did not show
`DATABASE_URL`.

### Database and volume

PostgreSQL reported:

```text
PostgreSQL Database directory appears to contain a database; Skipping initialization
database system is ready to accept connections
```

The database container remained healthy, and the named volume
`rescuelab_postgres_data` remained present. This rules out database startup,
credential mutation inside PostgreSQL, or volume loss as the immediate cause.

### HTTP and Nginx

The static page returned HTTP 200. Because the API container was exited, Nginx
logged `connect() failed ... while connecting to upstream` and returned:

```text
GET /api/health     502 text/html
GET /api/incidents  502 text/html
```

### Browser behaviour

Headless Chrome loaded <http://localhost:8080> and observed:

```text
Status: Service degraded
Alert: Health check failed
Incident count: 0
GET /api/health: 502 text/html
GET /api/incidents: 502 text/html
```

## Smallest safe repair proposed

Add the required API environment entry to `compose.yaml` using required Compose
interpolation rather than an embedded production fallback, for example:

```yaml
api:
  environment:
    NODE_ENV: production
    PORT: ${API_PORT:-3000}
    DATABASE_URL: ${DATABASE_URL:?DATABASE_URL is required; copy .env.example to .env}
```

This is the smallest safe repair because:

- it supplies the application requirement through the repository's existing,
  explicit `.env.example` to `.env` workflow;
- it avoids committing a secret or silently using an unsafe production default;
- missing configuration fails clearly during Compose interpolation before any
  container is started;
- it does not weaken the application's existing startup validation.

The ignored local `.env` can be populated from `.env.example` for verification
after approval. No `.env` or credential value should be committed.

## Verification plan after approval

1. Apply only the required `DATABASE_URL` Compose mapping.
2. Confirm missing `DATABASE_URL` produces the intended clear Compose error.
3. Populate the ignored local `.env` from the documented example.
4. Run backend tests, frontend production build, and `docker compose config`.
5. Rebuild with `docker compose -p rescuelab up --build --detach` without deleting
   the volume.
6. Confirm PostgreSQL and API become healthy and Nginx is usable.
7. Confirm `/api/health` returns HTTP 200 JSON and existing incidents load.
8. Verify browser incident creation and refresh persistence.
9. Record results in `docs/incidents/RL-002-report.md` and update repository status.

## Diagnostic integrity

The diagnosis used only current files, resolved configuration, safe container
inspection, service state, startup logs, HTTP responses, and browser behaviour.
It did not compare against `main`, inspect the scenario-creation diff, or use
repository history to reveal the injected change.

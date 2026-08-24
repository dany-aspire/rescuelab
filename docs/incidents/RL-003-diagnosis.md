# RL-003 Diagnosis

## Status

`DIAGNOSIS_PROPOSED` on 2026-08-24. No application or configuration repair has
been applied. This diagnosis requires ChatGPT Work review and explicit learner
approval before implementation.

## Customer symptom reproduced

The combined base and production-overlay deployment cannot complete startup.
PostgreSQL becomes healthy, but the API remains unhealthy and Compose reports
that the API dependency failed to start. The web container already present in
the reused project can serve static assets, but both API routes return HTTP 503.

Headless Chrome renders **Service degraded**, reports `Health check failed`, and
shows an empty incident queue.

## Reproduction procedure

An ignored local `.env` was copied from `.env.example` without displaying or
committing its values. The incident was then reproduced from
`/home/dan/rescuelab-worktrees/rl-003` with:

```bash
docker compose -p rescuelab -f compose.yaml -f compose.production.yaml config
docker compose -p rescuelab -f compose.yaml -f compose.production.yaml up --build --detach
docker compose -p rescuelab -f compose.yaml -f compose.production.yaml ps --all
docker compose -p rescuelab -f compose.yaml -f compose.production.yaml logs api db web
```

The existing `rescuelab` Compose project and PostgreSQL named volume were reused.
No volume was deleted, reset, or reinitialized.

## Proposed root cause

The production overlay adds an API `extra_hosts` entry that resolves the Compose
database service name `db` to `127.0.0.1`. This overrides Docker Compose service
discovery inside the API container.

The required database URL remains present and names the `db` service, but the
override sends PostgreSQL connections back to the API container's own loopback
interface. No PostgreSQL server listens there, so every database check fails with
`ECONNREFUSED 127.0.0.1:5432`. The API process listens on port 3000, but its
health route returns 503 and the container health check eventually marks it
unhealthy.

This is a production-overlay service-discovery error, not a credential,
PostgreSQL startup, data, or application-code failure.

## Supporting evidence

### Resolved combined configuration

Combined Compose validation passes. A redacted inspection confirmed that the API
has the required `DATABASE_URL`, `NODE_ENV`, and `PORT` environment-variable
names. It also resolves this production-only host override:

```text
extra_hosts: db=127.0.0.1
```

The API still depends on the database becoming healthy. Both services share the
`rescuelab_default` network.

### Container state and health

After the combined deployment:

```text
rescuelab-db-1    Up (healthy)
rescuelab-api-1   Up (unhealthy)
rescuelab-web-1   Up from the reused Compose project
```

Compose waited for API health, then stopped with:

```text
dependency failed to start: container rescuelab-api-1 is unhealthy
```

The API health status recorded ten consecutive failures during inspection.

### API logs and name resolution

The API first logs that it is listening on port 3000. Each health request then
fails its database check with:

```text
connect ECONNREFUSED 127.0.0.1:5432
```

Safe inspection inside the API container resolves `db` to `127.0.0.1`. Docker
network metadata places the PostgreSQL container on a separate address on
`rescuelab_default`, and a TCP check from the API container to that address on
port 5432 succeeds. This confirms that PostgreSQL is reachable over the Compose
network but the host override directs the application elsewhere.

### PostgreSQL and preserved data

PostgreSQL reports that its data directory already contains a database, skips
initialization, becomes ready for connections, and remains healthy. A direct
in-container count confirms that all five pre-existing incident records remain
in the database. No credential value was printed during these checks.

### HTTP and browser behaviour

Through Nginx, both `GET /api/health` and `GET /api/incidents` return HTTP 503
JSON with the generic service-unavailable response. Headless Chrome observes:

```text
Status: Service degraded
Alert: Health check failed
Incident count: 0
```

## Smallest safe repair proposed

Remove the `db=127.0.0.1` `extra_hosts` override from the API in
`compose.production.yaml`. Keep the production overlay syntactically valid, but
do not replace the override with a fixed container IP.

This is the smallest safe repair because it restores Docker Compose's built-in
service discovery for `db`, whose network address may change when containers are
recreated. The explicit, required `DATABASE_URL` mechanism in `compose.yaml` and
the documented `.env.example` workflow remain unchanged, so missing
configuration will still fail clearly and no secret needs to be committed.

## Verification plan after approval

1. Remove only the harmful API host override while keeping the overlay valid.
2. Confirm missing required configuration still produces the intended Compose
   interpolation error.
3. Run backend tests, the frontend production build, and combined Compose
   validation.
4. Rebuild the combined production-overlay stack without deleting the existing
   PostgreSQL volume.
5. Confirm PostgreSQL and the API become healthy and Nginx starts normally.
6. Confirm `/api/health` returns HTTP 200 JSON and all existing incidents load.
7. Verify browser incident creation and refresh persistence.
8. Record the results in `docs/incidents/RL-003-report.md` and update the GitHub
   mailbox for review.

## Diagnostic integrity

The diagnosis used only current files, resolved combined configuration,
container state and health, logs, HTTP and browser behaviour, safe Docker network
metadata, and an in-container record count. It did not compare the incident
branch with `main`, inspect the scenario-creation diff, or use repository history
to reveal the injected change.

# RL-001 Incident Report

## Status

`REVIEWED` on `incident/rl-001` on 2026-08-23. The incident branch has not
been merged into `main`.

## Customer symptom

The production page loaded, but displayed **Service degraded**, showed an empty
incident queue, and could not create an incident. At the same time,
`GET /api/health` returned HTTP 200 with a connected database.

## Diagnosis

The production frontend was built with `/service-api` as its API base, while the
deployed Nginx configuration proxies only `/api/` to the backend. Browser GET
requests to `/service-api/*` fell through to the SPA route and received
`index.html`; JSON parsing then failed. A browser POST to
`/service-api/incidents` received HTTP 405 from Nginx.

Evidence gathered before repair:

- Database and API containers were healthy, and the web container was running.
- `GET /api/health` returned HTTP 200 and
  `{"status":"ok","database":"connected"}`.
- `GET /api/incidents` returned the three persisted baseline incidents.
- Chrome rendered **Service degraded**, `0 total`, and a JSON error beginning
  with `Unexpected token '<'`.
- Chrome received `200 text/html` for both `/service-api/health` and
  `/service-api/incidents`, then `405 text/html` when creating an incident.
- The deployed JavaScript bundle contained `/service-api`, while runtime Nginx
  configured only `location /api/`.

The incident was diagnosed from current configuration, runtime state, logs, HTTP
responses, and browser behaviour. No comparison with `main`, incident-creation
diff, or repository-history shortcut was used.

## Approved repair

Changed the frontend build argument in `compose.yaml` from:

```yaml
VITE_API_BASE_URL: /service-api
```

to:

```yaml
VITE_API_BASE_URL: /api
```

This is the smallest safe repair because it aligns the production frontend with
the existing Nginx proxy, backend routes, frontend default, Vite development
proxy, and documented public API. No application code, database configuration,
health check, test, or error handling was changed.

## Verification

### Regression and configuration checks

```bash
npm ci
npm run check
docker compose -p rescuelab config --quiet
```

Results:

- Dependency installation completed with zero reported vulnerabilities.
- Backend suite passed all 3 tests: health, create/list, and empty-title
  rejection.
- Vite production build passed with 29 modules transformed.
- Docker Compose configuration validation passed.

### Production stack

```bash
docker compose -p rescuelab up --build --detach
docker compose -p rescuelab ps --all
curl --fail http://localhost:8080/api/health
curl --fail http://localhost:8080/api/incidents
```

The explicit Compose project name preserved and reused
`rescuelab_postgres_data`. PostgreSQL reported that the database already existed
and skipped initialization. Final container state was:

```text
rescuelab-api-1   Up (healthy)
rescuelab-db-1    Up (healthy)
rescuelab-web-1   Up on localhost:8080
```

The proxied health endpoint returned HTTP 200 JSON with `status: ok` and
`database: connected`. The deployed JavaScript bundle contained `/api` and no
longer contained `/service-api`.

### Browser acceptance checks

Headless Chrome exercised the production page at <http://localhost:8080>.

Initial load:

- Status: **All systems operational**.
- Incident count: 3.
- All three existing incidents were listed.
- No alert was rendered.

Creation:

- Submitted `RL-001 repair verification 2026-08-23` through the browser form.
- `POST /api/incidents` returned HTTP 201 JSON.
- The UI updated to 4 incidents and showed the new record.
- Status remained **All systems operational** with no alert.

Refresh persistence:

- Reloaded the production page without cache.
- `GET /api/health` and `GET /api/incidents` succeeded.
- The UI still showed 4 incidents, including the new record.
- A direct final `GET /api/incidents` also returned the persisted record as ID 4.


## ChatGPT Work review

Accepted. Commit `20eaeeec5e72c61480669fbfcbb28b3dd13e6b9b` contains the intended minimal repair, the reported evidence satisfies every ticket acceptance criterion, and no unrelated application change was introduced. The branch remains unmerged pending the learner's decision.

## Remaining limitations

- The Compose build warns that the Docker Buildx plugin is unavailable and uses
  the classic builder successfully; this did not affect the build or runtime.
- The committed database credentials are documented local-development
  placeholders and must be overridden outside local development.
- npm reported that the esbuild install script was not allowlisted by the local
  npm policy; the production Vite build nevertheless completed successfully.
- The verified repair remains only on `incident/rl-001` until reviewed and
  explicitly merged. No merge was performed.

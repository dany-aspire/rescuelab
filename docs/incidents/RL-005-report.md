# RL-005 Repair Report

## Result

`FIX_VERIFIED` on 2026-08-24. The production-overlay API port now agrees with
the Nginx upstream, direct and proxied health checks pass, and every ticket
acceptance check succeeds.

## Repair

Changed one non-secret value in `compose.production.yaml`:

```yaml
services:
  api:
    environment:
      PORT: "3000"
```

This aligns the production API listener and its health check with Nginx's
explicit `api:3000` upstream. No application code, proxy path, service-discovery
setting, credential, database configuration, or health-check logic was changed.

## Regression and configuration checks

- `npm ci`: passed; 172 packages installed, 175 audited, zero vulnerabilities.
- `npm run check`: passed.
- Backend tests: 3 passed, 0 failed.
- Frontend production build: passed; 29 modules transformed.
- Combined `docker compose ... config --quiet`: passed.
- Safe resolved-configuration inspection confirmed API `PORT=3000` and both API
  and web on the default Compose network.
- Nginx inspection confirmed its upstream remains `api:3000`.

## Complete-stack verification

The combined base and production-overlay stack was rebuilt and force-recreated
without deleting or resetting the existing PostgreSQL volume:

```bash
docker compose -p rescuelab -f compose.yaml -f compose.production.yaml up --build --detach --force-recreate
```

PostgreSQL reported that its data directory already contained a database,
skipped initialization, and became healthy. The API then became healthy before
Nginx started.

```text
rescuelab-db-1    Up (healthy)
rescuelab-api-1   Up (healthy)
rescuelab-web-1   Up on localhost:8080
```

The API startup log confirms `RescueLab API listening on port 3000`.

## Direct and proxied routing checks

- Direct API-container `GET /api/health` on port 3000: HTTP 200 JSON with
  `status: ok` and `database: connected`.
- TCP from Nginx to `api:3000`: open.
- TCP from Nginx to the former port 3001: closed.
- Nginx-container `GET /api/health`: HTTP 200 with the same healthy JSON.
- External `GET http://localhost:8080/api/health`: HTTP 200 with the same healthy
  JSON.
- External `GET /api/incidents`: HTTP 200 with all seven pre-existing records.

No upstream connection error appears after the repair.

## Browser create and persistence check

Headless Chrome exercised the combined production UI at
<http://localhost:8080>:

- Initial status: **All systems operational**.
- Initial queue: all 7 pre-existing incidents were visible.
- The browser created `RL-005 repair verification 2026-08-24`.
- `POST /api/incidents`: HTTP 201.
- The UI updated to 8 incidents with no alert.
- After a cache-bypassing reload, status remained operational, all 8 incidents
  remained visible, and the new record persisted.
- A final direct listing returned HTTP 200 and confirmed the new record as ID 8.

## Data preservation and scope

The existing PostgreSQL named volume was neither deleted nor reset. All seven
pre-repair records remained available, and the browser-created eighth record
persisted after reload.

Only the approved one-value production-overlay repair and the required incident
report, task, status, and handoff documents were changed. No credential or local
environment file is included in the commit.

## Remaining limitations

Docker Compose reports that Buildx is unavailable and successfully falls back to
the classic builder. Local npm policy reports that the esbuild install script is
not allowlisted; the production Vite build still completes successfully.

The repair remains only on `incident/rl-005` pending ChatGPT Work review. It has
not been merged into `main`.

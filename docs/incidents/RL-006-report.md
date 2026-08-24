# RL-006 Repair Report

## Result

`FIX_VERIFIED` on 2026-08-24. Nginx now preserves the external `/api/` prefix,
direct and proxied health checks return the same healthy JSON, and every ticket
acceptance check passes.

## Repair

Removed one trailing slash from `frontend/nginx.conf`:

```nginx
location /api/ {
    proxy_pass http://api:3000;
}
```

With no URI component in `proxy_pass`, Nginx forwards the original request URI.
External `/api/health` now reaches backend `/api/health`, and the same prefix is
preserved for incident listing and creation. No application route, port, service
discovery, health check, database setting, or credential was changed.

## Regression, configuration, and image checks

- `npm ci`: passed; 172 packages installed, 175 audited, zero vulnerabilities.
- `npm run check`: passed.
- Backend tests: 3 passed, 0 failed.
- Local frontend production build: passed; 29 modules transformed.
- Combined `docker compose ... config --quiet`: passed.
- Clean production web-image build: passed through all 15 stages; Vite
  transformed 29 modules and produced the Nginx image.
- Effective `nginx -T` validation passed and confirmed the trailing-slash-free
  `proxy_pass` target.

## Complete-stack verification

The combined base and production-overlay stack was rebuilt and its containers
were recreated without deleting, resetting, or recreating the PostgreSQL named
volume. PostgreSQL recognized its existing data directory, skipped
initialization, and became healthy. The API then became healthy before Nginx
started.

```text
rescuelab-db-1    Up (healthy)
rescuelab-api-1   Up (healthy)
rescuelab-web-1   Up on localhost:8080
```

The API logged `RescueLab API listening on port 3000`.

## Direct and Nginx-proxied checks

- Direct API-container `GET /api/health`: HTTP 200 JSON with `status: ok` and
  `database: connected`.
- Nginx-container `GET /api/health`: HTTP 200 with the same JSON.
- External `GET http://localhost:8080/api/health`: HTTP 200 with the same JSON.
- External `GET /api/incidents`: HTTP 200 with all eight pre-existing records.
- Post-repair Nginx access logs record successful `/api/health` and
  `/api/incidents` requests; the earlier stripped-path 404 behaviour is absent.

All final API verification, including browser work, passed through Nginx.

## Browser create and persistence check

Headless Chrome exercised <http://localhost:8080>:

- Initial status: **All systems operational**.
- Initial queue: all 8 pre-existing incidents were visible.
- The browser created `RL-006 repair verification 2026-08-24`.
- `POST /api/incidents`: HTTP 201 through Nginx.
- The UI updated to 9 incidents with no alert.
- After a cache-bypassing reload, status remained operational, all 9 incidents
  remained visible, and the new record persisted.
- A final Nginx-proxied listing returned HTTP 200 and confirmed the new record as
  ID 9.

## Data preservation and scope

The existing PostgreSQL named volume was neither deleted, reset, nor recreated.
All eight pre-repair records remained available, and the browser-created ninth
record persisted after reload.

Only the approved one-character Nginx repair and the required incident report,
task, status, and handoff documents were changed. No local environment file or
credential is included in the commit.

## Remaining limitations

Docker Compose reports that Buildx is unavailable and successfully falls back to
the classic builder. Local npm policy reports that the esbuild install script is
not allowlisted; both local and clean Docker frontend builds still complete
successfully.

The repair remains only on `incident/rl-006` pending ChatGPT Work review. It has
not been merged into `main`.

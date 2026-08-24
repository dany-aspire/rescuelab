# RL-002 Repair Report

## Result

`FIX_VERIFIED` on 2026-08-24. The API now receives its required production
database connection through Compose, the complete stack starts successfully,
and all ticket acceptance checks pass.

## Repair

Added one environment mapping to the API service in `compose.yaml`:

```yaml
DATABASE_URL: ${DATABASE_URL:?DATABASE_URL is required; copy .env.example to .env}
```

This uses the repository's documented `.env.example` to `.env` workflow. It
does not commit a credential or provide an unsafe fallback. The backend's own
startup validation remains unchanged.

## Missing-configuration check

With both the host variable and local `.env` absent, Compose validation failed
before container startup with exit code 1 and the intended message:

```text
required variable DATABASE_URL is missing a value: DATABASE_URL is required; copy .env.example to .env
```

An ignored local `.env` copied from the documented example was then used only
for verification. It is not part of the commit.

## Regression and configuration checks

- `npm ci`: passed; 172 packages installed, 175 audited, zero vulnerabilities.
- `npm run check`: passed.
- Backend tests: 3 passed, 0 failed.
- Frontend production build: passed; 29 modules transformed.
- `docker compose -p rescuelab config --quiet`: passed.

## Production stack verification

The existing Compose project and volume were preserved. Running
`docker compose -p rescuelab up --build --detach` rebuilt the services without
deleting or resetting any volume.

```text
rescuelab-api-1   Up (healthy)
rescuelab-db-1    Up (healthy)
rescuelab-web-1   Up on localhost:8080
```

The API logged `RescueLab API listening on port 3000`. PostgreSQL reported that
its data directory already contained a database, skipped initialization, and
became ready for connections.

Direct production HTTP checks through Nginx passed:

- `GET /api/health`: HTTP 200 JSON with `status: ok` and
  `database: connected`.
- `GET /api/incidents`: HTTP 200 JSON containing all four pre-existing records.

## Browser create and persistence check

Headless Chrome exercised the production UI at <http://localhost:8080>:

- Initial status: **All systems operational**.
- Initial queue: all 4 pre-existing incidents were visible.
- The browser created `RL-002 repair verification 2026-08-24`.
- `POST /api/incidents`: HTTP 201.
- The UI updated to 5 incidents with no alert.
- After a cache-bypassing reload, status remained operational, the queue still
  contained 5 incidents, and the new record remained visible.
- A final direct listing returned HTTP 200 and confirmed the persisted record as
  ID 5.

## Scope and remaining limitations

Only the approved Compose environment mapping and incident documentation/status
files were changed. Application code, tests, database settings, and health checks
were not modified. The PostgreSQL volume was not deleted or reset.

Docker Compose reported that Buildx is unavailable and successfully used the
classic builder. Local npm policy also reported that the esbuild install script
is not allowlisted; the production Vite build nevertheless completed
successfully.

The repair remains only on `incident/rl-002` pending ChatGPT Work review. It has
not been merged into `main`.

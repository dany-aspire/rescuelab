# RL-003 Repair Report

## Result

`FIX_VERIFIED` on 2026-08-24. The combined base and production Compose
configuration now preserves Docker service discovery, the API connects to
PostgreSQL, and every ticket acceptance check passes.

## Repair

Removed only the API `extra_hosts` mapping from `compose.production.yaml` and
kept the overlay valid with an empty API override:

```yaml
services:
  api: {}
```

No fixed container address was introduced. Docker Compose now resolves `db`
through its default network as intended. The explicit required `DATABASE_URL`
mapping, documented `.env.example` workflow, application code, tests, and health
checks remain unchanged.

## Missing-configuration check

With the host variable unset and an empty environment file, combined Compose
validation exits with code 1 and the intended message:

```text
required variable DATABASE_URL is missing a value: DATABASE_URL is required; copy .env.example to .env
```

The ignored local `.env` was used for runtime verification only. No credential
or environment file is included in the repair commit.

## Regression and combined-configuration checks

- `npm ci`: passed; 172 packages installed, 175 audited, zero vulnerabilities.
- `npm run check`: passed.
- Backend tests: 3 passed, 0 failed.
- Frontend production build: passed; 29 modules transformed.
- Combined `docker compose ... config --quiet`: passed.
- Redacted resolved-configuration inspection confirmed that the API has no
  `extra_hosts` entries and that both API and database use the default network.

## Production-overlay stack verification

The existing `rescuelab` Compose project and PostgreSQL volume were preserved.
The combined stack was rebuilt with:

```bash
docker compose -p rescuelab -f compose.yaml -f compose.production.yaml up --build --detach
```

Nginx was then explicitly recreated to verify the complete dependency startup
path. PostgreSQL and API health passed before Nginx started.

```text
rescuelab-db-1    Up (healthy)
rescuelab-api-1   Up (healthy)
rescuelab-web-1   Up on localhost:8080
```

The API logged `RescueLab API listening on port 3000`. No database connection
errors appeared after repair.

Direct production checks through Nginx passed:

- `GET /api/health`: HTTP 200 JSON with `status: ok` and
  `database: connected`.
- `GET /api/incidents`: HTTP 200 JSON containing all five pre-existing records.

## Browser create and persistence check

Headless Chrome exercised the combined production UI at
<http://localhost:8080>:

- Initial status: **All systems operational**.
- Initial queue: all 5 pre-existing incidents were visible.
- The browser created `RL-003 repair verification 2026-08-24`.
- `POST /api/incidents`: HTTP 201.
- The UI updated to 6 incidents with no alert.
- After a cache-bypassing reload, status remained operational, all 6 incidents
  remained visible, and the new record persisted.
- A final direct listing returned HTTP 200 and confirmed the new record as ID 6.

## Data preservation and scope

The existing PostgreSQL named volume was neither deleted nor reset. All five
pre-repair records remained available, and the browser-created sixth record
persisted after reload.

Only `compose.production.yaml` and the required incident report, task, status,
and handoff documents were changed. No application code, base Compose setting,
test, secret, or fixed container address was added.

## Remaining limitations

Docker Compose reports that Buildx is unavailable and successfully falls back to
the classic builder. Local npm policy reports that the esbuild install script is
not allowlisted; the production Vite build still completes successfully.

The repair remains only on `incident/rl-003` pending ChatGPT Work review. It has
not been merged into `main`.

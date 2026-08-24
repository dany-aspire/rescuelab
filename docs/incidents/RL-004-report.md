# RL-004 Repair Report

## Result

`FIX_VERIFIED` on 2026-08-24. The production web image now builds cleanly, the
complete stack starts successfully, and every ticket acceptance check passes.

## Repair

Moved the existing frontend source-copy instruction in `frontend/Dockerfile` so
it runs after dependency installation and before the production build:

```dockerfile
COPY package.json package-lock.json ./
COPY backend/package.json ./backend/package.json
COPY frontend/package.json ./frontend/package.json
RUN npm ci --workspace=frontend --include-workspace-root=false
COPY frontend ./frontend
RUN npm run build --workspace=frontend
```

No build step was skipped or weakened. Manifest files still form the inputs to
the dependency-installation layer, so frontend source changes do not invalidate
that dependency cache unnecessarily. All required source files are now present
before Vite runs.

## Regression and configuration checks

- `npm ci`: passed; 172 packages installed, 175 audited, zero vulnerabilities.
- `npm run check`: passed.
- Backend tests: 3 passed, 0 failed.
- Local frontend production build: passed; 29 modules transformed.
- `docker compose -p rescuelab config --quiet`: passed.

## Clean production web-image build

The required clean build passed:

```bash
docker compose -p rescuelab build --no-cache web
```

The build installed frontend dependencies, copied the frontend source, then ran
Vite successfully:

```text
Step 8/15  RUN npm ci --workspace=frontend --include-workspace-root=false
Step 9/15  COPY frontend ./frontend
Step 10/15 RUN npm run build --workspace=frontend
29 modules transformed
Successfully built the Nginx web image
```

This directly verifies both the required input order and the complete clean
production image path.

## Complete-stack verification

The existing `rescuelab` Compose project and PostgreSQL named volume were
preserved. Running `docker compose -p rescuelab up --build --detach` recreated
the services without deleting or resetting the volume.

PostgreSQL reported that its data directory already contained a database and
skipped initialization. The startup dependency path completed in order:
PostgreSQL became healthy, the API became healthy, and Nginx started.

```text
rescuelab-db-1    Up (healthy)
rescuelab-api-1   Up (healthy)
rescuelab-web-1   Up on localhost:8080
```

Direct production checks through Nginx passed:

- `GET /api/health`: HTTP 200 JSON with `status: ok` and
  `database: connected`.
- `GET /api/incidents`: HTTP 200 JSON containing all six pre-existing records.

## Browser create and persistence check

Headless Chrome exercised the rebuilt production UI at
<http://localhost:8080>:

- Initial status: **All systems operational**.
- Initial queue: all 6 pre-existing incidents were visible.
- The browser created `RL-004 repair verification 2026-08-24`.
- `POST /api/incidents`: HTTP 201.
- The UI updated to 7 incidents with no alert.
- After a cache-bypassing reload, status remained operational, all 7 incidents
  remained visible, and the new record persisted.
- A final direct listing returned HTTP 200 and confirmed the new record as ID 7.

## Data preservation and scope

The existing PostgreSQL volume was neither deleted nor reset. All six
pre-repair records remained available, and the browser-created seventh record
persisted after reload.

Only the approved Dockerfile instruction order and the required incident report,
task, status, and handoff documents were changed. No application feature,
dependency, test, Compose setting, credential, or database configuration was
modified.

## Remaining limitations

Docker Compose reports that Buildx is unavailable and successfully falls back to
the classic builder. Local npm policy reports that the esbuild install script is
not allowlisted; both local and clean Docker Vite builds still complete
successfully.

The repair remains only on `incident/rl-004` pending ChatGPT Work review. It has
not been merged into `main`.

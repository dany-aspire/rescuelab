# RescueLab Phase 1 Baseline Verification

Verified on 2026-08-23 from the `rescuelab-phase-1` branch.

## Commands executed

```bash
git fetch origin --prune
git worktree add /home/dan/freelance-ops/rescuelab-phase-1 rescuelab-phase-1
cd projects/rescuelab
npm ci
npm run test
npm run build
docker compose config
docker compose up --build --detach
docker compose ps --all
docker compose logs --no-color --tail 80
curl --fail --silent --show-error http://localhost:8080/
curl --fail --silent --show-error http://localhost:8080/api/health
curl --fail --silent --show-error http://localhost:8080/api/incidents
```

Tracked files and pending changes were also searched for private keys, credential-shaped values, and common token formats. Only documented development placeholders were found; no real credentials or secrets were found.

The UI workflow was tested in headless Chrome through the Chrome DevTools Protocol. The browser loaded the rendered React application, submitted a new incident through the form, reloaded the page without cache, and confirmed that the incident remained visible.

## Results

- `npm ci`: installed 172 packages; audit reported zero vulnerabilities.
- Backend tests: 3 passed, covering health, create/list, and empty-title rejection.
- Frontend production build: passed with Vite 7.3.6; 29 modules transformed.
- `docker compose config`: passed.
- Compose build: API and frontend images built successfully from the root lockfile.
- Container state: PostgreSQL and API healthy; Nginx running on host port 8080.
- Frontend request: HTTP 200 with the RescueLab application document.
- Health request: HTTP 200 with `status: ok` and `database: connected`.
- Incident list request: HTTP 200 and returned the seeded and UI-created incidents.
- Browser smoke test: incident creation succeeded, the operational status rendered, and the new incident remained after a hard reload.
- Database persistence: an incident created before rebuilding the API and frontend containers remained afterward. The PostgreSQL volume was not deleted.

## Problems found

The backend and frontend Dockerfiles ran `npm install` inside service-specific build contexts. They therefore ignored the repository's committed workspace lockfile, making container dependency resolution different from the tested local installation and nondeterministic over time.

An initial local backend test attempt failed with `listen EPERM` because the restricted execution environment prohibited opening a loopback listener. Running the same test with normal local permissions passed; this was an execution-environment restriction, not an application defect.

## Fixes made

- Changed both service builds to use the project root as their Docker build context.
- Changed both Dockerfiles to install the relevant workspace with `npm ci` from the committed root lockfile.
- Added a project `.dockerignore` so dependencies, build output, local environment files, and logs are excluded from Docker build contexts.
- Kept the runtime API process as the unprivileged `node` user.

## Final verification evidence

After the Docker changes, backend tests, the frontend build, Compose validation, image builds, container health checks, HTTP checks, and the browser create/reload workflow were all rerun successfully. The final browser check created `UI post-fix smoke check`, found it after reload, reported the application operational, and rendered three persisted incidents.

The verified application remains available at <http://localhost:8080>.

## Remaining limitations

- Compose's documented credentials are local-development placeholders and must be overridden for any non-local deployment.
- Docker Compose reported that the Buildx component was unavailable and used the classic builder successfully. This did not block build or runtime verification.
- Backend unit tests use a repository test double; the live Compose health, API, and browser checks provide the PostgreSQL integration coverage for this baseline.

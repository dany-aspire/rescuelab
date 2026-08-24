# RL-004 Diagnosis

## Status

`DIAGNOSIS_PROPOSED` on 2026-08-24. No application, Dockerfile, or configuration
repair has been applied. This diagnosis requires ChatGPT Work review and explicit
learner approval before implementation.

## Customer symptom reproduced

Repository checks pass outside Docker, but a clean production web-image build
fails in the frontend build stage. Vite finds no modules and cannot resolve its
HTML entry point, so Docker never reaches the Nginx image stage.

The failure was reproduced with:

```bash
npm ci
npm run check
docker compose -p rescuelab config --quiet
docker compose -p rescuelab build --no-cache web
```

The Docker build did not recreate or stop any running service. The existing
PostgreSQL container remained healthy, and a direct record count confirmed that
all six existing incidents remained present. No volume was deleted or reset.

## Earliest meaningful build error

Dependency installation succeeds in Docker. The next instruction runs the
frontend production build and fails:

```text
Step 9/15 : RUN npm run build --workspace=frontend
vite v7.3.6 building client environment for production...
0 modules transformed.
Could not resolve entry module "index.html".
```

The command exits with code 1 from the `rescuelab-frontend` workspace.

## Proposed root cause

The frontend Dockerfile runs `npm run build --workspace=frontend` before copying
the frontend application files into the build stage.

At build time, the workspace manifest has already been copied and dependencies
have been installed, so npm can locate and start the frontend build script.
However, `frontend/index.html`, `frontend/vite.config.js`, and `frontend/src/`
are still absent. The instruction that copies them appears only after the failing
build command and is therefore never reached.

This is a Dockerfile instruction-order failure, not a frontend source,
dependency-installation, Compose, backend, or database failure.

## Supporting evidence

### Local regression checks

- `npm ci`: passed; 172 packages installed, 175 audited, zero vulnerabilities.
- Backend tests: 3 passed, 0 failed.
- Local frontend production build: passed; 29 modules transformed.
- `docker compose -p rescuelab config --quiet`: passed.

The successful local build confirms that the frontend entry point and source are
valid when present.

### Dockerfile stage order

The build stage currently performs these operations in order:

1. Copy root and workspace package manifests.
2. Install the frontend workspace dependencies.
3. Run the frontend build.
4. Copy the frontend directory.

Step 3 requires files that are not supplied until step 4.

### Build context and stage filesystem

The repository contains `frontend/index.html`, `frontend/vite.config.js`, and
the application files under `frontend/src/`. The Docker build context includes
them; `.dockerignore` excludes dependency and generated-output directories, not
frontend source.

A temporary container created from the successful dependency-installation layer
listed the non-dependency contents of `/app/frontend`. It contained only:

```text
package.json
```

That stage had no `index.html`, Vite configuration, or source tree when the
build command ran, directly explaining Vite's entry-module error.

### Running data remained intact

The existing production-style Compose services remained running, with PostgreSQL
and the API healthy. PostgreSQL still contained all six pre-existing incident
records after the clean image-build attempt.

## Smallest safe repair proposed

Move the existing `COPY frontend ./frontend` instruction so it runs after
`npm ci --workspace=frontend --include-workspace-root=false` and before
`npm run build --workspace=frontend`.

The intended build-stage order becomes:

```dockerfile
COPY package.json package-lock.json ./
COPY backend/package.json ./backend/package.json
COPY frontend/package.json ./frontend/package.json
RUN npm ci --workspace=frontend --include-workspace-root=false
COPY frontend ./frontend
RUN npm run build --workspace=frontend
```

This is the smallest safe repair because it supplies all build inputs before
Vite runs while preserving sensible dependency-layer caching: source changes
invalidate the source-copy and build layers, but the manifest-based dependency
installation layer remains reusable.

## Verification plan after approval

1. Move only the existing frontend copy instruction ahead of the build command.
2. Run backend tests and the local frontend production build.
3. Validate Compose and run a clean `--no-cache` web-image build.
4. Start the complete production-style stack without deleting the PostgreSQL
   volume.
5. Confirm PostgreSQL and API health and HTTP 200 JSON from `/api/health`.
6. Confirm all existing incidents load.
7. Verify browser incident creation and refresh persistence.
8. Record results in `docs/incidents/RL-004-report.md` and update the GitHub
   mailbox for review.

## Diagnostic integrity

The diagnosis used only the current Docker build output, current Dockerfile and
package scripts, repository build-context files, safe intermediate-stage file
names, local checks, current service health, and an in-container record count.
It did not compare the incident branch with `main`, inspect the scenario-creation
diff, or use repository history to reveal the injected change.

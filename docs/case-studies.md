# RescueLab Incident Case Studies

RescueLab is a deliberately small deployment-recovery training project. The
eight records below are deliberately introduced **training exercises**—not
client engagements, live production incidents, or evidence of commercial
outcomes. Each summary links the original ticket, evidence-based diagnosis,
repair report, and review so a prospective client or technical reviewer can
inspect the full reasoning chain.

## Exercise index

| Exercise | Deployment failure practiced |
| --- | --- |
| [RL-001](#rl-001--frontendapi-route-mismatch-training-exercise) | Frontend/API route mismatch |
| [RL-002](#rl-002--missing-required-api-configuration-training-exercise) | Missing required API configuration |
| [RL-003](#rl-003--broken-compose-service-discovery-training-exercise) | Broken Compose service discovery |
| [RL-004](#rl-004--docker-build-order-failure-training-exercise) | Docker build order failure |
| [RL-005](#rl-005--internal-port-mismatch-training-exercise) | Internal port mismatch |
| [RL-006](#rl-006--nginx-path-rewrite-error-training-exercise) | Nginx path rewrite error |
| [RL-007](#rl-007--cors-origin-mismatch-training-exercise) | CORS origin mismatch |
| [RL-008](#rl-008--container-listener-binding-error-training-exercise) | Container listener binding error |

## RL-001 — Frontend/API route mismatch (training exercise)

- **Symptom:** The page loaded but showed **Service degraded**; listing and
  creation failed even though the proxied API health endpoint was healthy.
- **Evidence-backed cause:** The production frontend requested
  `/service-api/*`, while Nginx exposed only `/api/*`, so requests reached
  the SPA fallback or an unsupported Nginx method instead of the API.
- **Smallest repair:** Change the frontend build-time API base from
  `/service-api` to `/api`.
- **Verification scope:** Repository tests, frontend build, Compose validation,
  healthy stack and HTTP routes, then browser listing, creation, reload
  persistence, and PostgreSQL-volume preservation.
- **Evidence:** [ticket](../tasks/incidents/RL-001.md) ·
  [combined diagnosis and repair report](incidents/RL-001-report.md) ·
  [independent workflow review](../reviews/RL-001.md). RL-001 predates the
  later separate-diagnosis format, so its diagnosis and repair share one report.

## RL-002 — Missing required API configuration (training exercise)

- **Symptom:** PostgreSQL became healthy, but the API exited and the browser
  could not use the service.
- **Evidence-backed cause:** Compose did not supply the required
  `DATABASE_URL`; the API's intentional startup validation stopped the process.
- **Smallest repair:** Add a required Compose interpolation for
  `DATABASE_URL`, using the documented local environment-file workflow and no
  committed credential or unsafe fallback.
- **Verification scope:** Clear failure when configuration is absent, automated
  checks and Compose validation, full-stack health and HTTP checks, browser
  creation/reload persistence, and preservation of existing data.
- **Evidence:** [ticket](../tasks/incidents/RL-002.md) ·
  [diagnosis](incidents/RL-002-diagnosis.md) ·
  [repair report](incidents/RL-002-report.md) ·
  [independent workflow review](../reviews/RL-002.md).

## RL-003 — Broken Compose service discovery (training exercise)

- **Symptom:** PostgreSQL was healthy, but the API stayed unhealthy and the UI
  received unavailable responses.
- **Evidence-backed cause:** A production-overlay host override resolved the
  Compose service name `db` to API-container loopback, where PostgreSQL was not
  listening.
- **Smallest repair:** Remove only the `db=127.0.0.1` host override and let
  Compose DNS resolve the database service.
- **Verification scope:** Required-configuration failure behavior, automated
  checks, combined-Compose validation, healthy stack and proxied API, browser
  creation/reload persistence, and retained database records.
- **Evidence:** [ticket](../tasks/incidents/RL-003.md) ·
  [diagnosis](incidents/RL-003-diagnosis.md) ·
  [repair report](incidents/RL-003-report.md) ·
  [independent workflow review](../reviews/RL-003.md).

## RL-004 — Docker build order failure (training exercise)

- **Symptom:** Local checks passed, but a clean production web-image build
  failed because Vite could not resolve `index.html`.
- **Evidence-backed cause:** The Dockerfile ran the frontend build before
  copying the frontend entry point, Vite configuration, and source tree into the
  build stage.
- **Smallest repair:** Move the existing frontend source-copy step after
  dependency installation and before the build, retaining useful dependency
  layer caching.
- **Verification scope:** Automated checks and Compose validation, a no-cache
  web-image build, full-stack/API checks, browser creation/reload persistence,
  and PostgreSQL-volume preservation.
- **Evidence:** [ticket](../tasks/incidents/RL-004.md) ·
  [diagnosis](incidents/RL-004-diagnosis.md) ·
  [repair report](incidents/RL-004-report.md) ·
  [independent workflow review](../reviews/RL-004.md).

## RL-005 — Internal port mismatch (training exercise)

- **Symptom:** Containers were healthy and the page loaded, but Nginx returned
  gateway errors for API requests and the UI was degraded.
- **Evidence-backed cause:** The production overlay made the API and its health
  check use port 3001, while Nginx still connected to `api:3000`.
- **Smallest repair:** Change the overlay's one explicit API port value to 3000
  so the listener, health check, and proxy agree.
- **Verification scope:** Automated checks, combined-Compose and resolved-port
  validation, direct and proxied health/routing checks, browser
  creation/reload persistence, and preserved database records.
- **Evidence:** [ticket](../tasks/incidents/RL-005.md) ·
  [diagnosis](incidents/RL-005-diagnosis.md) ·
  [repair report](incidents/RL-005-report.md) ·
  [independent workflow review](../reviews/RL-005.md).

## RL-006 — Nginx path rewrite error (training exercise)

- **Symptom:** The database and API were healthy, but API requests through
  Nginx returned 404 and the UI could neither load nor create incidents.
- **Evidence-backed cause:** A trailing slash in
  `proxy_pass http://api:3000/;` replaced the matched `/api/` prefix, sending
  `/health` and `/incidents` to a backend that defines `/api/*` routes.
- **Smallest repair:** Remove the proxy target's trailing slash so Nginx
  preserves the original request URI.
- **Verification scope:** Automated checks, Compose and clean-image validation,
  effective Nginx configuration, direct and proxied health/listing, browser
  creation/reload persistence, and data-volume preservation.
- **Evidence:** [ticket](../tasks/incidents/RL-006.md) ·
  [diagnosis](incidents/RL-006-diagnosis.md) ·
  [repair report](incidents/RL-006-report.md) ·
  [independent workflow review](../reviews/RL-006.md).

## RL-007 — CORS origin mismatch (training exercise)

- **Symptom:** The split-origin API was healthy and returned data directly, but
  the browser blocked API responses and the UI remained degraded.
- **Evidence-backed cause:** The API allowed the obsolete
  `http://localhost:5173` origin rather than the deployed frontend at
  `http://localhost:8080`.
- **Smallest repair:** Change only the overlay's default allowed origin to the
  deployed frontend origin while retaining exact-origin enforcement.
- **Verification scope:** Automated checks, three-file Compose validation and
  image builds, allowed and rejected CORS requests/preflights, browser
  creation/reload persistence across origins, and preserved database records.
- **Evidence:** [ticket](../tasks/incidents/RL-007.md) ·
  [diagnosis](incidents/RL-007-diagnosis.md) ·
  [repair report](incidents/RL-007-report.md) ·
  [independent workflow review](../reviews/RL-007.md).

## RL-008 — Container listener binding error (training exercise)

- **Symptom:** Docker marked the API healthy, but Nginx could not reach it over
  the service network, producing gateway errors and a degraded UI.
- **Evidence-backed cause:** The API listened only on `127.0.0.1:3000`, so its
  in-container loopback health check passed while peer-container connections
  were refused.
- **Smallest repair:** Change only the API listen host to `0.0.0.0`; keep the
  API unexposed on the host and continue routing browser traffic through Nginx.
- **Verification scope:** Automated checks, Compose and image validation,
  listener-socket and service-network checks, proxied API behavior, browser
  creation/reload persistence, and preservation of all prior records.
- **Evidence:** [ticket](../tasks/incidents/RL-008.md) ·
  [diagnosis](incidents/RL-008-diagnosis.md) ·
  [repair report](incidents/RL-008-report.md) ·
  [independent workflow review](../reviews/RL-008.md).

## Evidence boundaries and protocol evolution

These case studies summarize committed historical records; this index did not
re-run the incidents. The reports record automated, HTTP, Compose, browser, and
data-preservation checks, but the repository does not contain durable raw logs,
CI results, or browser automation for every claim. The exercises demonstrate a
focused diagnostic and minimal-repair practice; they do not establish paid
experience, live production operations, security-audit capability,
service-level guarantees, or outcomes on arbitrary systems.

The workflow evolved during the series. RL-001 combines diagnosis and repair in
one report; RL-002 through RL-008 separate those artifacts. Review,
authorization, actor, and execution-surface language also changed as the
handoff protocol matured. The linked historical files are intentionally left
unchanged, so their original terminology and gates remain visible.

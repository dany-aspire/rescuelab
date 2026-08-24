# RescueLab

RescueLab is a focused **training portfolio** for diagnosing, repairing,
verifying, and documenting deployment failures in small AI-generated React/Node
applications. It contains a working example application and eight deliberately
introduced exercises. They are not client engagements or live-production
incidents.

## Explore the portfolio

- [Incident case studies](docs/case-studies.md) — the eight complete
  ticket-to-review evidence chains.
- [Portfolio evidence audit](docs/portfolio-audit.md) — a claim-by-claim account
  of what the repository does and does not establish.
- [Reproducible demonstration](docs/demo.md) — clean-checkout checks for the
  application, Compose topology, public HTTP path, and database persistence.
- [GitHub Actions demonstration](.github/workflows/demo.yml) — the automated
  workflow that runs the repository and Docker-backed demonstration checks.
- [Client intake and triage guide](docs/client-intake.md) and
  [reusable intake template](templates/client-intake.md) — safe evidence,
  access, scope, and escalation practices.
- [Diagnosis-to-delivery playbook](docs/delivery-playbook.md) and
  [reusable delivery report](templates/delivery-report.md) — the staged repair,
  approval, verification, rollback, and closure process.
- [Scope and limitations](#scope-and-limitations) — explicit boundaries on what
  this training portfolio establishes.

## What is here

The example application is a small incident tracker with this deployment
topology:

- a React interface built with Vite;
- a Node.js/Express JSON API;
- PostgreSQL persistence;
- Docker Compose orchestration; and
- Nginx static hosting with an `/api` reverse proxy.

The eight deployment-recovery exercises cover frontend/API route alignment,
required API configuration, Compose database service discovery, Docker image
build order, container port alignment, Nginx path forwarding, CORS origin
configuration, and container listener binding. Every incident is a training
exercise; the [case-study index](docs/case-studies.md) links its symptom,
evidence-backed diagnosis, smallest repair, recorded verification, and workflow
review.

## Run locally with Docker Compose

Requirements: Docker with the Compose plugin. Port `8080` must be available.

```bash
cp .env.example .env
docker compose config
docker compose up --build -d
curl --fail --silent --show-error http://localhost:8080/api/health
curl --fail --silent --show-error http://localhost:8080/api/incidents
```

Open <http://localhost:8080> to use the interface. Stop the stack without
deleting its PostgreSQL volume:

```bash
docker compose down
```

The committed `.env.example` values are development placeholders. Replace them
before adapting the stack to any shared environment. Do not add `-v` to the
shutdown command unless you intentionally want to delete the local database
volume.

## Quick code verification

Requirements: Node.js and npm. The lockfile-based install, three API tests, and
frontend production build run with:

```bash
npm ci
npm run check
```

These automated checks are intentionally narrow: the API tests use a repository
test double, the build checks compilation, and there is no committed browser
automation. The Compose and HTTP commands above provide additional local runtime
checks, but they do not constitute continuous production monitoring.

For the full clean-checkout and persistence procedure, see the
[reproducible demonstration](docs/demo.md).

## Evidence-first workflow

The exercise workflow separates observation from repair: reproduce the symptom,
collect runtime and configuration evidence, document the proposed cause and
smallest safe fix, obtain approval, apply the repair, run regression and runtime
checks, record limitations, and hand the result to a separate workflow role for
review. In this repository, “independent review” means review by that named
project role—not an external audit.

Historical reports preserve what was recorded during each exercise. They are
documentary evidence, not freshly reproduced test output, a service-level
agreement, or proof that the same result is guaranteed on another stack.

## Scope and limitations

RescueLab demonstrates a training process for a narrow class of small web-app
deployment failures. It does **not** claim paid-client experience, live-production
operations, security-audit capability, payment-system expertise, suitability for
critical infrastructure, or guaranteed outcomes. It contains no testimonials,
uptime commitments, or evidence of commercial results. Security-sensitive,
payment, regulated-data, and critical-infrastructure work requires appropriately
qualified specialists and a separately agreed scope.

# RescueLab Portfolio Evidence Audit

Audit date: 2026-08-24  
Task: P2-001  
Scope: committed files in the accessible `phase-2/p2-001` repository snapshot

## Purpose and method

This audit tests the repository's important portfolio claims against committed,
publicly inspectable evidence. It distinguishes what the current source proves,
what historical reports record, and what remains a recommendation. It does not
re-perform the historical incidents, treat recorded command output as a new
runtime observation, or claim client or production outcomes.

The audit covered the application source and deployment configuration; the
baseline record; all RL-001 through RL-008 tickets, diagnoses, repair reports,
and independent reviews; and the current workflow and Phase 2 documentation.
Repository paths in this document were checked against the accessible checkout.

## Evidence inventory

### Current application and verification surfaces

| Area | Committed evidence | What it supports |
| --- | --- | --- |
| Architecture and local use | `README.md`, `package.json`, `frontend/package.json`, `backend/package.json` | A small React/Vite frontend and Express/PostgreSQL API with workspace scripts for development, tests, and builds. |
| Frontend behavior | `frontend/src/App.jsx`, `frontend/src/main.jsx`, `frontend/src/styles.css` | Health display, incident listing, incident creation, and error presentation are implemented. |
| API and persistence | `backend/src/app.js`, `backend/src/repository.js`, `backend/src/server.js`, `backend/sql/init.sql` | Health, list, and create routes; parameterized database access; required database configuration; and network-accessible server binding are implemented. |
| Automated checks | `backend/test/app.test.js`, `package.json` | Three API tests cover health, create/list, and empty-title rejection; `npm run check` runs those tests and the frontend production build. |
| Container deployment | `compose.yaml`, `compose.production.yaml`, `compose.split-origin.yaml`, `backend/Dockerfile`, `frontend/Dockerfile`, `frontend/nginx.conf`, `.dockerignore`, `.env.example` | A Compose-based PostgreSQL/API/Nginx stack, production and split-origin overlays, health dependencies, lockfile-based images, and reverse proxy are present. |
| Historical baseline | `docs/baseline-verification.md` | A dated record states that tests, build, Compose, HTTP, browser create/reload, and persistence checks passed on 2026-08-23. This is recorded evidence, not a live deployment or an independently reproducible transcript. |

### Incident evidence chains

| Incident | Customer ticket | Pre-repair diagnosis | Repair report | Independent review | Evidence-chain assessment |
| --- | --- | --- | --- | --- | --- |
| RL-001 | `tasks/incidents/RL-001.md` | Diagnosis is incorporated into `docs/incidents/RL-001-report.md`; no separate diagnosis file exists | `docs/incidents/RL-001-report.md` | `reviews/RL-001.md` | Complete enough to follow symptom, diagnosis, repair, verification, and review, but structurally inconsistent with RL-002 through RL-008. |
| RL-002 | `tasks/incidents/RL-002.md` | `docs/incidents/RL-002-diagnosis.md` | `docs/incidents/RL-002-report.md` | `reviews/RL-002.md` | Complete committed chain. |
| RL-003 | `tasks/incidents/RL-003.md` | `docs/incidents/RL-003-diagnosis.md` | `docs/incidents/RL-003-report.md` | `reviews/RL-003.md` | Complete committed chain. |
| RL-004 | `tasks/incidents/RL-004.md` | `docs/incidents/RL-004-diagnosis.md` | `docs/incidents/RL-004-report.md` | `reviews/RL-004.md` | Complete committed chain. |
| RL-005 | `tasks/incidents/RL-005.md` | `docs/incidents/RL-005-diagnosis.md` | `docs/incidents/RL-005-report.md` | `reviews/RL-005.md` | Complete committed chain. |
| RL-006 | `tasks/incidents/RL-006.md` | `docs/incidents/RL-006-diagnosis.md` | `docs/incidents/RL-006-report.md` | `reviews/RL-006.md` | Complete committed chain. |
| RL-007 | `tasks/incidents/RL-007.md` | `docs/incidents/RL-007-diagnosis.md` | `docs/incidents/RL-007-report.md` | `reviews/RL-007.md` | Complete committed chain. |
| RL-008 | `tasks/incidents/RL-008.md` | `docs/incidents/RL-008-diagnosis.md` | `docs/incidents/RL-008-report.md` | `reviews/RL-008.md` | Complete committed chain. |

### Workflow and portfolio-state evidence

`AGENTS.md`, `docs/handoff-procedure.md`, and `handoffs/CURRENT.md` document a
staged assignment, diagnosis, approval, repair, verification, and independent
review workflow. `tasks/BACKLOG.md`, `tasks/CURRENT.md`, `STATUS.md`, and
`docs/PHASE-2.md` record eight completed Phase 1 exercises and define the seven
Phase 2 packaging tasks. These files prove that the process and records exist;
they do not by themselves prove commercial experience or customer outcomes.

## Claim-to-evidence assessment

| Important claim | Evidence | Assessment |
| --- | --- | --- |
| RescueLab is a deliberately small production-style training application. | `README.md`; current frontend, backend, SQL, Nginx, Docker, and Compose files listed above. | **Verified in the current tree.** “Production-style” describes the topology, not a production deployment. |
| The application uses React/Vite, Node/Express, PostgreSQL, Docker Compose, and Nginx. | `frontend/package.json`, `backend/package.json`, `compose.yaml`, `frontend/nginx.conf`. | **Verified in the current tree.** |
| The repository provides automated backend tests and a frontend production build check. | `backend/test/app.test.js`, root `package.json`. | **Verified in the current tree.** Coverage is narrow: three API tests use a repository test double, and there is no committed browser automation. |
| The healthy baseline was tested through the full stack, HTTP API, browser workflow, and persistence. | `docs/baseline-verification.md`. | **Historically recorded and specific.** The repository does not contain raw logs, screenshots, CI results, or a repeatable browser script that independently substantiates every recorded result. |
| Eight deployment-failure exercises were diagnosed, repaired, verified, and independently reviewed. | Eight tickets, eight reports, reviews RL-001 through RL-008, and diagnoses RL-002 through RL-008 in the incident inventory. | **Strong committed documentary support.** RL-001 lacks the later separate-diagnosis structure. Runtime results are historical assertions in reports and reviews, not results freshly reproduced by this audit. |
| The exercises cover frontend/API routing, required environment configuration, database service discovery, image build order, internal port alignment, Nginx path forwarding, CORS, and listener binding. | `docs/incidents/RL-001-report.md`; `docs/incidents/RL-002-diagnosis.md`; `docs/incidents/RL-003-diagnosis.md`; `docs/incidents/RL-004-diagnosis.md`; `docs/incidents/RL-005-diagnosis.md`; `docs/incidents/RL-006-diagnosis.md`; `docs/incidents/RL-007-diagnosis.md`; `docs/incidents/RL-008-diagnosis.md`. | **Verified as documented exercise coverage.** This must not be presented as eight real client engagements. |
| Repairs preserved existing PostgreSQL data and passed regression/runtime checks. | Incident reports and corresponding reviews in the inventory. | **Historically recorded and independently reviewed within the project workflow.** No durable machine-readable test artifacts prove these results outside the narrative records. |
| The workflow separates diagnosis, repair approval, verification, and independent review. | `AGENTS.md`, `docs/handoff-procedure.md`, incident diagnoses/reports, and `reviews/RL-001.md` through `reviews/RL-008.md`. | **Verified as repository process evidence.** “Independent” means review by the named ChatGPT Work role, not an external auditor. |
| The repository demonstrates readiness to rescue small AI-generated application deployments. | The application, eight exercise chains, and verification records. | **Partially supported.** It demonstrates a focused training portfolio and repeatable reasoning pattern; it does not yet establish paid-client experience, production operations, response-time guarantees, or success on arbitrary stacks. |
| The repository is already client-ready and reproducible from a clean checkout. | Current `README.md` and recorded baseline verification. | **Not yet supported.** Phase 2 explicitly schedules the client-facing README and clean-checkout demonstration in P2-003 and P2-004. |
| RescueLab has delivered business, reliability, revenue, security, or production outcomes for clients. | None. | **Unsupported and must not be claimed.** No testimonials, customer authorization, live-service evidence, SLA data, security assessment, or commercial outcome evidence is committed. |

## Gaps, inconsistencies, and public-content risks

### High priority

1. **The repository entrance is stale and undersells the evidence.** `README.md`
   says the first incident has not begun and that later phases will introduce
   failures, while `STATUS.md` and `tasks/BACKLOG.md` say RL-001 through RL-008
   are complete. It provides no incident index or direct path into the evidence.
2. **The portfolio lacks a reproducible demonstration artifact.** The baseline
   record is detailed, but browser checks are prose only. There is no committed
   smoke-test script, screenshot set, CI workflow, tagged release, live demo, or
   captured machine-readable result. A reviewer must trust historical records.
3. **Exercise results could be mistaken for client results.** The ticket/report
   format is realistic, but the repository does not prominently state at its
   entrance that these are deliberately introduced training incidents. All
   future portfolio copy should label them as exercises and avoid claims about
   customers, revenue, uptime, or production impact.

### Medium priority

4. **Navigation is missing rather than broken.** The Markdown corpus contains
   almost no internal links. The incident files exist, but there is no case-study
   index joining each ticket, diagnosis, report, review, and relevant repaired
   surface. `reviews/RL-001.md` contains the only explicit Markdown/URL-style
   repository link, an external GitHub PR URL; this audit did not depend on its
   availability.
5. **RL-001 uses a different artifact shape.** It has no
   `docs/incidents/RL-001-diagnosis.md`; diagnosis and repair evidence share
   `docs/incidents/RL-001-report.md`. This is an honest historical difference,
   not a reason to rewrite history, but the future index should explain it.
6. **Review and authorization language changes over time.** Reviews RL-001
   through RL-005 refer to explicit learner merge approval or older review
   wording, while reviews RL-006 through RL-008 use standing authorization.
   `docs/handoff-procedure.md` also describes `LOCAL_CODEX`, whereas the current
   `AGENTS.md` and Phase 2 material define `CODEX_EXECUTOR` plus an execution
   surface. Preserve historical reviews, but explain protocol evolution in
   current navigation instead of presenting every record as one uniform process.
7. **Status metadata is inconsistent.** `STATUS.md` says RL-008 merged through
   PR #8, while `handoffs/CURRENT.md` identifies PR #11 as the last merged PR.
   These may refer to different events, but the labels do not explain that.
   `STATUS.md` also says P2-001 is “next” while `tasks/CURRENT.md` and the handoff
   show it assigned. Current-state files should use unambiguous, synchronized
   wording in a later task.
8. **Verification depth is limited.** Unit tests do not exercise PostgreSQL,
   Nginx, Compose, CORS, process binding, or the browser. Historical live-stack
   checks cover those areas, but they are manual and not committed as automation.

### Public-content and privacy findings

9. **No credential value or private marketplace dataset was found in the
   audited Markdown.** The committed Compose password is clearly a documented
   development placeholder, and `.env.example` is the intended local template.
   This does not make the defaults suitable for a public deployment.
10. **Two operational notes are out of scope for a public technical portfolio.**
    `docs/workspace-architecture.md` names a private repository, local workspace
    layout, marketplace workflow, and tool split.
    `docs/codex-upwork-mcp-workaround.md` adds marketplace-specific tooling,
    authentication context, local paths, pinned-version details, and workspace
    operations. They reveal no secret in the accessible text, but they are
    personal/private operational material and distract from RescueLab. Review
    removal from the public portfolio in P2-007, preserving private copies where
    appropriate.
11. **Some historical artifacts contain personal local paths.**
    `docs/baseline-verification.md` and several diagnosis files record
    `/home/dan/...` paths. They are not credentials, but they add no portfolio
    value and expose workstation conventions. Do not rewrite incident history;
    avoid such paths in new public artifacts and assess archival/redaction policy
    during final public-content QA.
12. **Scope limitations need a prominent home.** The Phase 2 definition correctly
    excludes security audits, payments, and critical production infrastructure,
    but the current README does not expose those limits to a prospective client.

## Prioritized recommendations for P2-002 through P2-007

These are recommendations, not verified current capabilities.

1. **P2-002 — Add one incident case-study index.** For each RL-001 through
   RL-008, link the ticket, diagnosis (or RL-001's combined report), repair
   report, independent review, symptom, evidence-backed cause, smallest repair,
   and verification scope. Label every incident a training exercise and note the
   RL-001 format exception and protocol evolution without rewriting history.
2. **P2-003 — Replace the stale repository entrance.** Give a two-minute overview
   of the narrow service, architecture, eight exercise categories, evidence
   index, quick verification commands, and explicit limitations. Do not claim
   paid work, production impact, security expertise, or guaranteed outcomes.
3. **P2-004 — Make the healthy demonstration repeatable.** Validate a clean
   checkout with `npm ci`, `npm run check`, Compose validation and startup, HTTP
   health/list/create checks, and browser create/reload persistence. Commit the
   smallest safe smoke-test procedure or automation plus sanitized screenshots
   only if reproducibly generated. Record environment and date; never imply a
   continuously hosted demo unless one exists.
4. **P2-005 — Add a portfolio-safe intake and triage kit.** Request symptoms,
   reproduction steps, deployment target, logs, topology, recent changes, and
   access constraints; include secret-redaction guidance, backup/data rules, and
   escalation boundaries for security, payments, regulated data, and critical
   systems. Keep marketplace pricing and proposal strategy private.
5. **P2-006 — Publish a concise delivery playbook.** Generalize the proven gates:
   reproduce, collect evidence, propose the smallest repair, obtain approval,
   repair, run regression/runtime checks, report limitations, and hand off.
   Remove repository-specific actor jargon where it would confuse clients while
   retaining approval and independent-review safeguards.
6. **P2-007 — Perform release and public-content QA.** Recheck links, claims,
   secrets, placeholders, personal paths, metadata consistency, and clean-checkout
   verification. Decide whether to remove the two marketplace/workspace notes
   from the public repository, synchronize current status, and create a tagged
   portfolio release only after all Phase 2 evidence passes review.

## Audit conclusion

The strongest defensible portfolio statement is: RescueLab is a focused training
project containing a working small React/Node/PostgreSQL deployment and eight
committed, reviewed deployment-failure exercise records. The repository provides
substantial evidence of diagnosis, minimal repair, verification, and structured
handoff practice. Its present weaknesses are packaging, navigation,
reproducibility, metadata clarity, and separation of public portfolio material
from private marketplace operations—not absence of technical incident evidence.

Until P2-002 through P2-007 close those gaps, describe the work as reviewed
training exercises and historically recorded verification. Do not describe it as
client delivery, a live production service, a security audit capability, or proof
of commercial outcomes.

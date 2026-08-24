# Current Task

## RL-007 — CORS failure in a split-origin deployment

Status: FIX_VERIFIED

- Repository: `dany-aspire/rescuelab`
- Branch: `incident/rl-007`
- Healthy reference: `main`
- Suggested worktree: `/home/dan/rescuelab-worktrees/rl-007`
- Ticket: `tasks/incidents/RL-007.md`
- Diagnosis artifact: `docs/incidents/RL-007-diagnosis.md`
- Final report: `docs/incidents/RL-007-report.md`

## Required stage now

Local Codex applied the approved one-value split-origin repair and verified all
ticket acceptance criteria. The frontend origin `http://localhost:8080` now
receives the exact CORS authorization required for browser GET and POST
requests, while disallowed and obsolete origins receive no authorization.

Backend tests, the frontend production build, Compose validation, image builds,
runtime health, response-header checks, browser creation, reload persistence,
and preservation of all existing PostgreSQL data passed. Evidence is recorded
in `docs/incidents/RL-007-report.md`.

ChatGPT Work must review the repair and verification evidence under the
standing authorization. The incident branch has not been merged.

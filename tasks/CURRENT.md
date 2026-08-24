# Current Task

## RL-008 — Deployment-specific process or port-binding failure

Status: FIX_VERIFIED

- Repository: `dany-aspire/rescuelab`
- Branch: `incident/rl-008`
- Healthy reference: `main`
- Suggested worktree: `/home/dan/rescuelab-worktrees/rl-008`
- Ticket: `tasks/incidents/RL-008.md`
- Diagnosis artifact: `docs/incidents/RL-008-diagnosis.md`
- Final report: `docs/incidents/RL-008-report.md`

## Required stage now

Local Codex applied the approved one-line listen-host repair and verified all
ticket acceptance criteria. The API now listens on its container interfaces at
port 3000, the web container can reach it over the Compose network, and Nginx
returns successful health, listing, and creation responses.

Backend tests, the frontend production build, Compose validation, image builds,
runtime health, socket and network checks, browser creation, reload persistence,
and preservation of all existing PostgreSQL data passed. Evidence is recorded
in `docs/incidents/RL-008-report.md`.

ChatGPT Work must review the repair and verification evidence under the
standing authorization. The incident branch has not been merged.

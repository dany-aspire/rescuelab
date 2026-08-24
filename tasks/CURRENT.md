# Current Task

## RL-006 — Nginx reverse-proxy path failure

Status: READY_FOR_DIAGNOSIS

- Repository: `dany-aspire/rescuelab`
- Branch: `incident/rl-006`
- Healthy reference: `main`
- Suggested worktree: `/home/dan/rescuelab-worktrees/rl-006`
- Ticket: `tasks/incidents/RL-006.md`
- Diagnosis artifact: `docs/incidents/RL-006-diagnosis.md`
- Final report after approval: `docs/incidents/RL-006-report.md`

## Required stage now

Follow `AGENTS.md` and `handoffs/CURRENT.md`. Reproduce the Nginx path-routing incident while preserving the existing PostgreSQL volume.

Diagnose from direct and proxied HTTP responses, container health, Nginx configuration and logs, backend route definitions, and the exact upstream URI produced by the current `location`/`proxy_pass` combination. Do not compare with `main` or inspect the scenario-creation diff.

Before changing any application or configuration file, write the diagnosis artifact with the symptom, root cause, evidence, and smallest safe repair. Update the incident mailbox to `DIAGNOSIS_PROPOSED` with `Next actor: CHATGPT_WORK`, commit and push the documentation-only changes, then stop.

# Current Task

## RL-005 — Docker API port-routing failure

Status: READY_FOR_DIAGNOSIS

- Repository: `dany-aspire/rescuelab`
- Branch: `incident/rl-005`
- Healthy reference: `main`
- Suggested worktree: `/home/dan/rescuelab-worktrees/rl-005`
- Ticket: `tasks/incidents/RL-005.md`
- Diagnosis artifact: `docs/incidents/RL-005-diagnosis.md`
- Final report after approval: `docs/incidents/RL-005-report.md`
- Production overlay: `compose.production.yaml`

## Required stage now

Follow `AGENTS.md` and `handoffs/CURRENT.md`. Reproduce the incident with the combined base and production Compose files while preserving the existing PostgreSQL volume.

Diagnose from service health, API startup logs, Nginx upstream errors, resolved non-secret port configuration, and safe in-network HTTP/TCP checks. Compare the API's direct internal health path with the same request through Nginx. Do not compare with `main` or inspect the scenario-creation diff.

Before changing any application or configuration file, write the diagnosis artifact with the symptom, root cause, evidence, and smallest safe repair. Update the incident mailbox to `DIAGNOSIS_PROPOSED` with `Next actor: CHATGPT_WORK`, commit and push the documentation-only changes, then stop.

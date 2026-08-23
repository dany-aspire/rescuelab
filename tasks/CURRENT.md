# Current Task

## RL-002 — API exits during production startup

Status: READY_FOR_DIAGNOSIS

- Repository: `dany-aspire/rescuelab`
- Branch: `incident/rl-002`
- Healthy reference: `main`
- Suggested worktree: `/home/dan/rescuelab-worktrees/rl-002`
- Ticket: `tasks/incidents/RL-002.md`
- Diagnosis artifact: `docs/incidents/RL-002-diagnosis.md`
- Final report after approval: `docs/incidents/RL-002-report.md`

## Required stage now

Follow `AGENTS.md` and `handoffs/CURRENT.md`. Reproduce the incident with the production-style Docker Compose stack while preserving the existing PostgreSQL volume.

Diagnose from container state, startup logs, resolved Compose configuration, application requirements, and safe runtime inspection. Do not compare with `main` or inspect the scenario-creation diff.

Before changing any application or configuration file, write the diagnosis artifact with the symptom, root cause, evidence, and smallest safe repair. Update the GitHub mailbox to hand control to ChatGPT Work, commit and push those documentation-only changes, and stop.

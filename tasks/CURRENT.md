# Current Task

## RL-003 — PostgreSQL connection mismatch inside Docker Compose

Status: READY_FOR_DIAGNOSIS

- Repository: `dany-aspire/rescuelab`
- Branch: `incident/rl-003`
- Healthy reference: `main`
- Suggested worktree: `/home/dan/rescuelab-worktrees/rl-003`
- Ticket: `tasks/incidents/RL-003.md`
- Diagnosis artifact: `docs/incidents/RL-003-diagnosis.md`
- Final report after approval: `docs/incidents/RL-003-report.md`
- Production overlay: `compose.production.yaml`

## Required stage now

Follow `AGENTS.md` and `handoffs/CURRENT.md`. Reproduce the incident with the combined base and production Compose files while preserving the existing PostgreSQL volume. Create the ignored local `.env` from `.env.example` if the new worktree does not already have one.

Diagnose from container state, health-check output, API and PostgreSQL logs, resolved combined Compose configuration, and safe Docker network metadata. Do not print credential values. Do not compare with `main` or inspect the scenario-creation diff.

Before changing any application or configuration file, write the diagnosis artifact with the symptom, root cause, evidence, and smallest safe repair. Update the GitHub mailbox to hand control to ChatGPT Work, commit and push those documentation-only changes, and stop.

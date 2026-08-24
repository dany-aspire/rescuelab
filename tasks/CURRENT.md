# Current Task

## RL-004 — Production web-image build failure

Status: READY_FOR_DIAGNOSIS

- Repository: `dany-aspire/rescuelab`
- Branch: `incident/rl-004`
- Healthy reference: `main`
- Suggested worktree: `/home/dan/rescuelab-worktrees/rl-004`
- Ticket: `tasks/incidents/RL-004.md`
- Diagnosis artifact: `docs/incidents/RL-004-diagnosis.md`
- Final report after approval: `docs/incidents/RL-004-report.md`

## Required stage now

Follow `AGENTS.md` and `handoffs/CURRENT.md`. Reproduce the clean production web-image build failure while preserving the existing PostgreSQL volume and data.

Diagnose from the earliest meaningful Docker build error, Dockerfile stage order, frontend build requirements, build context, and safe stage-filesystem evidence. Confirm whether local backend tests and the local frontend build still pass. Do not compare with `main` or inspect the scenario-creation diff.

Before changing any application or configuration file, write the diagnosis artifact with the symptom, root cause, evidence, and smallest safe repair. Update the incident mailbox to `DIAGNOSIS_PROPOSED` with `Next actor: CHATGPT_WORK`, commit and push the documentation-only changes, then stop.

# Current Task

## RL-007 — CORS failure in a split-origin deployment

Status: READY_FOR_DIAGNOSIS

- Repository: `dany-aspire/rescuelab`
- Branch: `incident/rl-007`
- Healthy reference: `main`
- Suggested worktree: `/home/dan/rescuelab-worktrees/rl-007`
- Ticket: `tasks/incidents/RL-007.md`
- Diagnosis artifact: `docs/incidents/RL-007-diagnosis.md`
- Final report after approval: `docs/incidents/RL-007-report.md`

## Required stage now

Local Codex must reproduce the split-origin browser failure, gather runtime and
header evidence, identify the root cause, and propose the smallest safe repair.

Before changing application or configuration files:

1. Follow the reproduction and constraints in the customer ticket.
2. Record the evidence and proposed repair in
   `docs/incidents/RL-007-diagnosis.md`.
3. Advance `handoffs/CURRENT.md` to `DIAGNOSIS_PROPOSED` with
   `Next actor: CHATGPT_WORK`.
4. Commit and push only the diagnosis and handoff documentation, then stop.

# Current Task

## RL-008 — Deployment-specific process or port-binding failure

Status: READY_FOR_DIAGNOSIS

- Repository: `dany-aspire/rescuelab`
- Branch: `incident/rl-008`
- Healthy reference: `main`
- Suggested worktree: `/home/dan/rescuelab-worktrees/rl-008`
- Ticket: `tasks/incidents/RL-008.md`
- Diagnosis artifact: `docs/incidents/RL-008-diagnosis.md`
- Final report after approval: `docs/incidents/RL-008-report.md`

## Required stage now

Local Codex must reproduce the production gateway failure, gather runtime and
network evidence, identify the root cause, and propose the smallest safe repair.

Before changing application or configuration files:

1. Follow the reproduction and constraints in the customer ticket.
2. Record the evidence and proposed repair in
   `docs/incidents/RL-008-diagnosis.md`.
3. Advance `handoffs/CURRENT.md` to `DIAGNOSIS_PROPOSED` with
   `Next actor: CHATGPT_WORK`.
4. Commit and push only the diagnosis and handoff documentation, then stop.
5. End the local response with: “Next step: send `cfgh` to ChatGPT Work.”

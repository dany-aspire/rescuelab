# Current Task

## RL-005 — Docker API port-routing failure

Status: REPAIR_APPROVED

- Repository: `dany-aspire/rescuelab`
- Branch: `incident/rl-005`
- Healthy reference: `main`
- Suggested worktree: `/home/dan/rescuelab-worktrees/rl-005`
- Ticket: `tasks/incidents/RL-005.md`
- Diagnosis artifact: `docs/incidents/RL-005-diagnosis.md`
- Final report: `docs/incidents/RL-005-report.md`
- Production overlay: `compose.production.yaml`

## Required stage now

The learner approved the RL-005 repair after ChatGPT Work reviewed the diagnosis.

Follow `AGENTS.md` and `handoffs/CURRENT.md`. Apply the smallest repair justified in `docs/incidents/RL-005-diagnosis.md`: align the production overlay's explicit API listening port with the documented Nginx upstream port.

Do not expose or commit credentials and do not delete/reset the PostgreSQL volume. Run every acceptance check in `tasks/incidents/RL-005.md`, including direct and proxied health checks and browser persistence verification.

Write `docs/incidents/RL-005-report.md`, update repository status accurately, then update the incident mailbox to `FIX_VERIFIED` with `Next actor: CHATGPT_WORK`. Commit and push only `incident/rl-005`, then stop.

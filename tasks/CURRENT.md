# Current Task

## RL-007 — CORS failure in a split-origin deployment

Status: REPAIR_APPROVED

- Repository: `dany-aspire/rescuelab`
- Branch: `incident/rl-007`
- Healthy reference: `main`
- Suggested worktree: `/home/dan/rescuelab-worktrees/rl-007`
- Ticket: `tasks/incidents/RL-007.md`
- Diagnosis artifact: `docs/incidents/RL-007-diagnosis.md`
- Final report: `docs/incidents/RL-007-report.md`

## Required stage now

ChatGPT Work accepted the evidence-based diagnosis. The split-origin deployment
serves the frontend from `http://localhost:8080`, while the API authorizes a
different origin, so browser GET responses and the POST preflight lack the
required CORS authorization headers.

Repair is approved under the learner's standing authorization.

Local Codex must:

1. Make the smallest justified repair: change only the split-origin overlay's
   default `CORS_ORIGIN` to `http://localhost:8080`.
2. Keep the exact-origin restriction; do not use a wildcard or disable CORS.
3. Preserve the existing PostgreSQL volume and data.
4. Run every ticket acceptance check and relevant regression test.
5. Write `docs/incidents/RL-007-report.md` with repair and verification evidence.
6. Update this task to `FIX_VERIFIED`.
7. Advance `handoffs/CURRENT.md` to `FIX_VERIFIED` with
   `Next actor: CHATGPT_WORK`.
8. Commit and push only `incident/rl-007`, then stop. Do not merge.
9. End the local response with: “Next step: send `cfgh` to ChatGPT Work.”

# Current Task

## RL-008 — Deployment-specific process or port-binding failure

Status: REPAIR_APPROVED

- Repository: `dany-aspire/rescuelab`
- Branch: `incident/rl-008`
- Healthy reference: `main`
- Suggested worktree: `/home/dan/rescuelab-worktrees/rl-008`
- Ticket: `tasks/incidents/RL-008.md`
- Diagnosis artifact: `docs/incidents/RL-008-diagnosis.md`
- Final report: `docs/incidents/RL-008-report.md`

## Required stage now

ChatGPT Work accepted the evidence-based diagnosis. The API listens only on its
container loopback interface, so the local health check succeeds while Nginx
receives connection refusals at the Compose-network address.

Repair is approved under the learner's standing authorization.

Local Codex must:

1. Make the smallest justified repair: change only the API listen host from
   `127.0.0.1` to `0.0.0.0`.
2. Do not publish a new host port or bypass Nginx.
3. Preserve the existing PostgreSQL volume and data.
4. Run every ticket acceptance check and relevant regression test.
5. Write `docs/incidents/RL-008-report.md` with repair and verification evidence.
6. Update this task to `FIX_VERIFIED`.
7. Advance `handoffs/CURRENT.md` to `FIX_VERIFIED` with
   `Next actor: CHATGPT_WORK`.
8. Commit and push only `incident/rl-008`, then stop. Do not merge.
9. End the local response with: “Next step: send `cfgh` to ChatGPT Work.”

# RescueLab GitHub Handoff

- Protocol: 1
- Sequence: 31
- State: REPAIR_APPROVED
- Incident: RL-006
- Branch: incident/rl-006
- Written by: CHATGPT_WORK
- Next actor: LOCAL_CODEX
- Updated: 2026-08-24
- Control keyword: cfgh
- Base commit: f37a3e7f843a1509155331044cea871ea7a39a1f
- Scenario commit: this branch root commit
- Continuation: automatic from RL-005
- Authorization: standing repair and merge authorization

## Instruction

The diagnosis in `docs/incidents/RL-006-diagnosis.md` is accepted. Repair is
approved under the learner's standing authorization.

Apply only the smallest justified repair: remove the trailing slash from the
Nginx `proxy_pass` target so the `/api/` prefix is preserved. Run the ticket
acceptance checks and relevant regressions without deleting or recreating the
PostgreSQL volume. Write the final report, advance this mailbox to
`FIX_VERIFIED` with `Next actor: CHATGPT_WORK`, commit and push the incident
branch, then stop. Do not merge.

## Pointers

- Task: `tasks/CURRENT.md`
- Ticket: `tasks/incidents/RL-006.md`
- Diagnosis artifact: `docs/incidents/RL-006-diagnosis.md`
- Final report: `docs/incidents/RL-006-report.md`

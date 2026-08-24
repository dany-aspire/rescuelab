# RescueLab GitHub Handoff

- Protocol: 1
- Sequence: 37
- State: REPAIR_APPROVED
- Incident: RL-007
- Branch: incident/rl-007
- Written by: CHATGPT_WORK
- Next actor: LOCAL_CODEX
- Updated: 2026-08-24
- Control keyword: cfgh
- Base commit: 81cd7cc02e1e4f9a162ca0073da836b57aa53513
- Scenario commit: this branch root commit
- Last completed incident: RL-006
- Continuation: automatic
- Authorization: standing repair and merge authorization

## Instruction

The diagnosis in `docs/incidents/RL-007-diagnosis.md` is accepted. Repair is
approved under the learner's standing authorization.

Apply only the smallest justified configuration repair described in
`tasks/CURRENT.md`. Keep the restrictive exact-origin policy, run every
acceptance check across the split origins, preserve the PostgreSQL volume, write
the final report, and advance this mailbox to `FIX_VERIFIED` with
`Next actor: CHATGPT_WORK`.

Commit and push only the incident branch, then stop. Do not merge. End the local
response with: “Next step: send `cfgh` to ChatGPT Work.”

## Pointers

- Task: `tasks/CURRENT.md`
- Ticket: `tasks/incidents/RL-007.md`
- Diagnosis artifact: `docs/incidents/RL-007-diagnosis.md`
- Final report: `docs/incidents/RL-007-report.md`

# RescueLab GitHub Handoff

- Protocol: 1
- Sequence: 36
- State: DIAGNOSIS_PROPOSED
- Incident: RL-007
- Branch: incident/rl-007
- Written by: LOCAL_CODEX
- Next actor: CHATGPT_WORK
- Updated: 2026-08-24
- Control keyword: cfgh
- Base commit: 81cd7cc02e1e4f9a162ca0073da836b57aa53513
- Scenario commit: this branch root commit
- Last completed incident: RL-006
- Continuation: automatic
- Authorization: standing repair and merge authorization

## Instruction

The standalone keyword `cfgh` means “check and follow the GitHub handoff.”

RL-007 was reproduced with the three-file split-origin stack while preserving
the existing PostgreSQL volume. The diagnosis is documented in
`docs/incidents/RL-007-diagnosis.md`. No application or configuration repair was
applied.

Review the proposed diagnosis and smallest safe repair. If accepted, advance
this mailbox to `REPAIR_APPROVED` with `Next actor: LOCAL_CODEX` under the
standing authorization workflow.

## Pointers

- Task: `tasks/CURRENT.md`
- Ticket: `tasks/incidents/RL-007.md`
- Diagnosis artifact: `docs/incidents/RL-007-diagnosis.md`
- Final report after approval: `docs/incidents/RL-007-report.md`

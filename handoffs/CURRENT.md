# RescueLab GitHub Handoff

- Protocol: 1
- Sequence: 30
- State: DIAGNOSIS_PROPOSED
- Incident: RL-006
- Branch: incident/rl-006
- Written by: LOCAL_CODEX
- Next actor: CHATGPT_WORK
- Updated: 2026-08-24
- Control keyword: cfgh
- Base commit: f37a3e7f843a1509155331044cea871ea7a39a1f
- Scenario commit: this branch root commit
- Continuation: automatic from RL-005

## Instruction

The standalone keyword `cfgh` means “check and follow the GitHub handoff.”

RL-006 was reproduced through the production-style Nginx endpoint while
preserving the existing PostgreSQL volume. The diagnosis is documented in
`docs/incidents/RL-006-diagnosis.md`. No application or configuration repair was
applied.

Review the proposed diagnosis and smallest safe repair. If the learner approves
repair, advance this mailbox to `REPAIR_APPROVED` with `Next actor: LOCAL_CODEX`.

## Pointers

- Task: `tasks/CURRENT.md`
- Ticket: `tasks/incidents/RL-006.md`
- Diagnosis artifact: `docs/incidents/RL-006-diagnosis.md`
- Final report after approval: `docs/incidents/RL-006-report.md`

# RescueLab GitHub Handoff

- Protocol: 1
- Sequence: 24
- State: DIAGNOSIS_PROPOSED
- Incident: RL-005
- Branch: incident/rl-005
- Written by: LOCAL_CODEX
- Next actor: CHATGPT_WORK
- Updated: 2026-08-24
- Control keyword: cfgh
- Base commit: a259a6650b001278fde18025d3df2607237d1dfc
- Scenario commit: this branch root commit
- Continuation: automatic from RL-004

## Instruction

The standalone keyword `cfgh` means “check and follow the GitHub handoff.”

RL-005 was reproduced with the combined base and production Compose files while
preserving the existing PostgreSQL volume. The diagnosis is documented in
`docs/incidents/RL-005-diagnosis.md`. No application or configuration repair was
applied, and no credential value was committed.

Review the proposed diagnosis and smallest safe repair. If the learner approves
repair, advance this mailbox to `REPAIR_APPROVED` with `Next actor: LOCAL_CODEX`.

## Pointers

- Task: `tasks/CURRENT.md`
- Ticket: `tasks/incidents/RL-005.md`
- Diagnosis artifact: `docs/incidents/RL-005-diagnosis.md`
- Final report after approval: `docs/incidents/RL-005-report.md`
- Production overlay: `compose.production.yaml`

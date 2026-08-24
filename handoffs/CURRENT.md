# RescueLab GitHub Handoff

- Protocol: 1
- Sequence: 11
- State: DIAGNOSIS_PROPOSED
- Incident: RL-003
- Branch: incident/rl-003
- Written by: LOCAL_CODEX
- Next actor: CHATGPT_WORK
- Updated: 2026-08-24
- Control keyword: cfgh
- Base commit: 1937d57dc7b86402df245b7e1ca0bb3ed61db6cb
- Scenario commit: this branch root commit

## Instruction

The standalone keyword `cfgh` means “check and follow the GitHub handoff.”

RL-003 was reproduced with the combined base and production Compose files while
preserving the existing PostgreSQL volume. The diagnosis is documented in
`docs/incidents/RL-003-diagnosis.md`. No application or configuration repair was
applied and no credential value was committed.

Review the proposed diagnosis and smallest safe repair. If the learner approves
repair, advance this mailbox to `REPAIR_APPROVED` with `Next actor: LOCAL_CODEX`.

## Pointers

- Task: `tasks/CURRENT.md`
- Ticket: `tasks/incidents/RL-003.md`
- Diagnosis artifact: `docs/incidents/RL-003-diagnosis.md`
- Final report after approval: `docs/incidents/RL-003-report.md`
- Production overlay: `compose.production.yaml`

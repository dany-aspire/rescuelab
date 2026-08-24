# RescueLab GitHub Handoff

- Protocol: 1
- Sequence: 10
- State: READY_FOR_DIAGNOSIS
- Incident: RL-003
- Branch: incident/rl-003
- Written by: CHATGPT_WORK
- Next actor: LOCAL_CODEX
- Updated: 2026-08-24
- Control keyword: cfgh
- Base commit: 1937d57dc7b86402df245b7e1ca0bb3ed61db6cb
- Scenario commit: this branch root commit

## Instruction

The standalone keyword `cfgh` means “check and follow the GitHub handoff.”

Create or reuse the worktree specified by `tasks/CURRENT.md`. Read `AGENTS.md`, the current task, and the customer ticket. Reproduce RL-003 using the base Compose file plus `compose.production.yaml`, without deleting or resetting the existing PostgreSQL volume.

Complete the diagnosis stage only. Do not change application or configuration files. Do not expose credential values. Write the required diagnosis artifact, update this mailbox to `DIAGNOSIS_PROPOSED` with `Next actor: CHATGPT_WORK`, commit and push the documentation-only handoff, then stop.

## Pointers

- Task: `tasks/CURRENT.md`
- Ticket: `tasks/incidents/RL-003.md`
- Diagnosis artifact: `docs/incidents/RL-003-diagnosis.md`
- Final report after approval: `docs/incidents/RL-003-report.md`
- Production overlay: `compose.production.yaml`

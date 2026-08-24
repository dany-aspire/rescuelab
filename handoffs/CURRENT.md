# RescueLab GitHub Handoff

- Protocol: 1
- Sequence: 23
- State: READY_FOR_DIAGNOSIS
- Incident: RL-005
- Branch: incident/rl-005
- Written by: CHATGPT_WORK
- Next actor: LOCAL_CODEX
- Updated: 2026-08-24
- Control keyword: cfgh
- Base commit: a259a6650b001278fde18025d3df2607237d1dfc
- Scenario commit: this branch root commit
- Continuation: automatic from RL-004

## Instruction

The standalone keyword `cfgh` means “check and follow the GitHub handoff.”

Create or reuse the worktree specified by `tasks/CURRENT.md`. Read `AGENTS.md`, the current task, and the customer ticket. Reproduce RL-005 using the combined base and production Compose files without deleting or resetting the existing PostgreSQL volume.

Complete the diagnosis stage only. Do not change application or configuration files and do not expose credential values. Write the required diagnosis artifact, update this mailbox to `DIAGNOSIS_PROPOSED` with `Next actor: CHATGPT_WORK`, commit and push the documentation-only handoff, then stop.

## Pointers

- Task: `tasks/CURRENT.md`
- Ticket: `tasks/incidents/RL-005.md`
- Diagnosis artifact: `docs/incidents/RL-005-diagnosis.md`
- Final report after approval: `docs/incidents/RL-005-report.md`
- Production overlay: `compose.production.yaml`

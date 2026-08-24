# RescueLab GitHub Handoff

- Protocol: 1
- Sequence: 29
- State: READY_FOR_DIAGNOSIS
- Incident: RL-006
- Branch: incident/rl-006
- Written by: CHATGPT_WORK
- Next actor: LOCAL_CODEX
- Updated: 2026-08-24
- Control keyword: cfgh
- Base commit: f37a3e7f843a1509155331044cea871ea7a39a1f
- Scenario commit: this branch root commit
- Continuation: automatic from RL-005

## Instruction

The standalone keyword `cfgh` means “check and follow the GitHub handoff.”

Create or reuse the worktree specified by `tasks/CURRENT.md`. Read `AGENTS.md`, the current task, and the customer ticket. Reproduce RL-006 through the production-style Nginx endpoint without deleting or resetting the existing PostgreSQL volume.

Complete the diagnosis stage only. Do not change application or configuration files. Write the required diagnosis artifact, update this mailbox to `DIAGNOSIS_PROPOSED` with `Next actor: CHATGPT_WORK`, commit and push the documentation-only handoff, then stop.

## Pointers

- Task: `tasks/CURRENT.md`
- Ticket: `tasks/incidents/RL-006.md`
- Diagnosis artifact: `docs/incidents/RL-006-diagnosis.md`
- Final report after approval: `docs/incidents/RL-006-report.md`

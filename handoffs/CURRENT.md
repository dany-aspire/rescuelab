# RescueLab GitHub Handoff

- Protocol: 1
- Sequence: 2
- State: READY_FOR_DIAGNOSIS
- Incident: RL-002
- Branch: incident/rl-002
- Written by: CHATGPT_WORK
- Next actor: LOCAL_CODEX
- Updated: 2026-08-23
- Base commit: 21a0fd5db10452c8a506a0cf91be978baa70f03c
- Scenario commit: pending branch head

## Instruction

Create or reuse the worktree specified by `tasks/CURRENT.md`. Read `AGENTS.md`, the current task, and the customer ticket. Reproduce RL-002 from the production-style Docker Compose stack without deleting the existing PostgreSQL volume.

Complete the diagnosis stage only. Do not change application or configuration files. Write the required diagnosis artifact, update this mailbox to `DIAGNOSIS_PROPOSED` with `Next actor: CHATGPT_WORK`, commit and push the documentation-only handoff, then stop.

## Pointers

- Task: `tasks/CURRENT.md`
- Ticket: `tasks/incidents/RL-002.md`
- Diagnosis artifact: `docs/incidents/RL-002-diagnosis.md`
- Final report after approval: `docs/incidents/RL-002-report.md`

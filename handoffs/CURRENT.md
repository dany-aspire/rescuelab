# RescueLab GitHub Handoff

- Protocol: 1
- Sequence: 19
- State: REPAIR_APPROVED
- Incident: RL-004
- Branch: incident/rl-004
- Written by: CHATGPT_WORK
- Next actor: LOCAL_CODEX
- Updated: 2026-08-24
- Control keyword: cfgh
- Base commit: 11c5c6a9938704c71d92ce9cb8072275a7eb1b01
- Scenario commit: this branch root commit
- Approval: learner approved repair in ChatGPT Work

## Instruction

The standalone keyword `cfgh` means “check and follow the GitHub handoff.”

Repair is approved for the diagnosis documented in `docs/incidents/RL-004-diagnosis.md`. Apply the smallest justified Dockerfile instruction-order repair while preserving dependency-layer caching.

Run all ticket acceptance checks, including the clean web-image build and browser persistence check. Do not delete or reset the PostgreSQL volume. Write `docs/incidents/RL-004-report.md`, update repository status accurately, then update this mailbox to `FIX_VERIFIED` with `Next actor: CHATGPT_WORK`. Commit and push only `incident/rl-004`, and stop. Do not merge.

## Pointers

- Task: `tasks/CURRENT.md`
- Ticket: `tasks/incidents/RL-004.md`
- Diagnosis: `docs/incidents/RL-004-diagnosis.md`
- Final report: `docs/incidents/RL-004-report.md`

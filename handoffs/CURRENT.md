# RescueLab GitHub Handoff

- Protocol: 1
- Sequence: 25
- State: REPAIR_APPROVED
- Incident: RL-005
- Branch: incident/rl-005
- Written by: CHATGPT_WORK
- Next actor: LOCAL_CODEX
- Updated: 2026-08-24
- Control keyword: cfgh
- Base commit: a259a6650b001278fde18025d3df2607237d1dfc
- Scenario commit: this branch root commit
- Approval: learner approved repair in ChatGPT Work
- Continuation: automatic from RL-004

## Instruction

The standalone keyword `cfgh` means “check and follow the GitHub handoff.”

Repair is approved for the diagnosis documented in `docs/incidents/RL-005-diagnosis.md`. Apply the smallest justified production-overlay port-alignment repair.

Run all ticket acceptance checks, including direct and proxied health plus browser persistence. Do not expose credentials or delete/reset the PostgreSQL volume. Write `docs/incidents/RL-005-report.md`, update repository status accurately, then update this mailbox to `FIX_VERIFIED` with `Next actor: CHATGPT_WORK`. Commit and push only `incident/rl-005`, and stop. Do not merge.

## Pointers

- Task: `tasks/CURRENT.md`
- Ticket: `tasks/incidents/RL-005.md`
- Diagnosis: `docs/incidents/RL-005-diagnosis.md`
- Final report: `docs/incidents/RL-005-report.md`
- Production overlay: `compose.production.yaml`

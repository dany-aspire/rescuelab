# RescueLab GitHub Handoff

- Protocol: 1
- Sequence: 41
- State: READY_FOR_DIAGNOSIS
- Incident: RL-008
- Branch: incident/rl-008
- Written by: CHATGPT_WORK
- Next actor: LOCAL_CODEX
- Updated: 2026-08-24
- Control keyword: cfgh
- Last completed incident: RL-007
- Active handoff: incident/rl-008:handoffs/CURRENT.md
- Continuation: automatic
- Authorization: standing repair and merge authorization

## Instruction

This file on `main` is the canonical handoff router. RL-008 is active on
`incident/rl-008`.

Local Codex should read the active branch mailbox, `tasks/CURRENT.md`, and the
customer ticket, reproduce the production gateway failure, write an
evidence-based diagnosis, and hand control back as `DIAGNOSIS_PROPOSED`.

Do not modify or merge `main`.

## Pointer

- Active branch: `incident/rl-008`
- Active mailbox: `incident/rl-008:handoffs/CURRENT.md`
- Task: `incident/rl-008:tasks/CURRENT.md`
- Ticket: `incident/rl-008:tasks/incidents/RL-008.md`

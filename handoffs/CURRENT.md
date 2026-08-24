# RescueLab GitHub Handoff

- Protocol: 1
- Sequence: 43
- State: REPAIR_APPROVED
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

ChatGPT Work accepted the diagnosis and automatically recorded repair approval.
Local Codex should read the active branch mailbox and `tasks/CURRENT.md`,
apply the approved minimal listen-host repair, verify service-network and
gateway reachability, write the final report, and hand control back as
`FIX_VERIFIED`.

Do not modify or merge `main`.

## Pointer

- Active branch: `incident/rl-008`
- Active mailbox: `incident/rl-008:handoffs/CURRENT.md`
- Diagnosis: `incident/rl-008:docs/incidents/RL-008-diagnosis.md`

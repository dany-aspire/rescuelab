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
- Base commit: 13931780f227651558cca862b36edeef3f1e9c1f
- Scenario commit: this branch root commit
- Last completed incident: RL-007
- Continuation: automatic
- Authorization: standing repair and merge authorization

## Instruction

The diagnosis in `docs/incidents/RL-008-diagnosis.md` is accepted. Repair is
approved under the learner's standing authorization.

Apply only the API listen-host repair described in `tasks/CURRENT.md`. Do not
publish an unnecessary host port or bypass Nginx. Run every acceptance check,
preserve the PostgreSQL volume, write the final report, and advance this mailbox
to `FIX_VERIFIED` with `Next actor: CHATGPT_WORK`.

Commit and push only the incident branch, then stop. Do not merge. End the local
response with: “Next step: send `cfgh` to ChatGPT Work.”

## Pointers

- Task: `tasks/CURRENT.md`
- Ticket: `tasks/incidents/RL-008.md`
- Diagnosis artifact: `docs/incidents/RL-008-diagnosis.md`
- Final report: `docs/incidents/RL-008-report.md`

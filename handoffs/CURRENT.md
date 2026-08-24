# RescueLab GitHub Handoff

- Protocol: 1
- Sequence: 14
- State: REVIEWED
- Incident: RL-003
- Branch: incident/rl-003
- Written by: CHATGPT_WORK
- Next actor: LEARNER
- Updated: 2026-08-24
- Control keyword: cfgh
- Base commit: 1937d57dc7b86402df245b7e1ca0bb3ed61db6cb
- Scenario commit: this branch root commit
- Repair approval: learner approved
- Review decision: approved for merge

## Instruction

The standalone keyword `cfgh` means “check and follow the GitHub handoff.”

ChatGPT Work reviewed the repair, verification report, and branch scope. The repair is approved for merge. Read `reviews/RL-003.md` for the independent review.

No agent may merge until the learner explicitly approves the RL-003 merge through ChatGPT Work. After approval, ChatGPT Work will merge through GitHub, record the merge evidence, and return the canonical mailbox to `IDLE`.

## Pointers

- Task: `tasks/CURRENT.md`
- Ticket: `tasks/incidents/RL-003.md`
- Diagnosis: `docs/incidents/RL-003-diagnosis.md`
- Final report: `docs/incidents/RL-003-report.md`
- Independent review: `reviews/RL-003.md`
- Production overlay: `compose.production.yaml`

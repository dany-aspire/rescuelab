# RescueLab GitHub Handoff

- Protocol: 1
- Sequence: 26
- State: FIX_VERIFIED
- Incident: RL-005
- Branch: incident/rl-005
- Written by: LOCAL_CODEX
- Next actor: CHATGPT_WORK
- Updated: 2026-08-24
- Control keyword: cfgh
- Base commit: a259a6650b001278fde18025d3df2607237d1dfc
- Scenario commit: this branch root commit
- Approval: learner approved repair in ChatGPT Work
- Continuation: automatic from RL-004

## Instruction

The standalone keyword `cfgh` means “check and follow the GitHub handoff.”

The approved production-overlay port repair has been applied and every RL-005
acceptance check passed. Direct API health and Nginx-proxied health both return
HTTP 200 JSON. The existing PostgreSQL volume and all prior records were
preserved, and no credential was committed.

Review `docs/incidents/RL-005-report.md` and the incident branch changes. The
repair has not been merged into `main`; merge only after explicit learner
approval.

## Pointers

- Task: `tasks/CURRENT.md`
- Ticket: `tasks/incidents/RL-005.md`
- Diagnosis: `docs/incidents/RL-005-diagnosis.md`
- Final report: `docs/incidents/RL-005-report.md`
- Production overlay: `compose.production.yaml`

# RescueLab Handoff Procedure

GitHub is the persistent bridge between ChatGPT Work and local Codex. Full chat transcripts are not synchronized.

## Roles

- ChatGPT Work designs one bounded incident, creates its branch and customer-style ticket, and retains the hidden root cause.
- The learner launches local Codex, reviews its reasoning, and approves or rejects the proposed repair.
- Local Codex reproduces, diagnoses, pauses for approval, then fixes, verifies, documents, commits, and pushes.
- ChatGPT Work reviews the pushed evidence against the intended incident before closing it.

## Repository contract

- `main`: verified healthy reference.
- `incident/rl-NNN`: isolated broken scenario.
- `tasks/CURRENT.md`: one active assignment on the incident branch.
- `tasks/incidents/RL-NNN.md`: customer-visible ticket without the hidden answer.
- `docs/incidents/RL-NNN-report.md`: Codex's diagnosis, repair, and verification evidence.
- `tasks/BACKLOG.md`: ordered future exercises.
- `STATUS.md`: concise portfolio progress.

## State flow

`READY_FOR_DIAGNOSIS` → `DIAGNOSIS_PROPOSED` → `FIX_VERIFIED` → `REVIEWED`

Codex must stop after proposing its evidence-backed diagnosis. The learner's approval is required before the repair stage.

When Codex finishes and pushes, the learner only needs to tell ChatGPT Work that the incident is finished. Work reads the repository directly and performs the review.

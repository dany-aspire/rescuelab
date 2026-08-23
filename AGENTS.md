# RescueLab Agent Contract

This repository is the durable communication channel between ChatGPT Work, the learner, and local Codex. Do not use an uploaded or local-only `HANDOFF.md` as project state.

## Control keyword

The standalone keyword `cfgh` means: check and follow the GitHub handoff.

When `cfgh` is received:

1. Run `git fetch origin --prune` when operating in a local checkout.
2. Read the canonical `handoffs/CURRENT.md` from GitHub, then read the branch and task it names.
3. If `Next actor` names the receiving agent, follow the current stage instructions.
4. If another actor is named, report the current state and next actor, then stop.
5. Do not infer work from an earlier transcript or treat `cfgh` as authorization to bypass diagnosis, repair, review, or merge gates.

## Startup procedure

1. Run `git fetch origin --prune`.
2. Read `handoffs/CURRENT.md` and `tasks/CURRENT.md` from the branch named by the handoff.
3. Act only when `Next actor` is `LOCAL_CODEX`.
4. Confirm the handoff sequence and stage before doing work.
5. Treat GitHub repository state as authoritative; do not depend on an earlier Codex transcript.

## Branch safety

- `main` is the verified healthy baseline.
- Work only on the incident branch named in the handoff.
- Do not modify or merge `main` during an incident.
- Do not delete branches or Docker volumes unless explicitly authorized.

## Diagnostic gate

For an active incident, reproduce the symptom and gather evidence from runtime behaviour, tests, logs, HTTP responses, browser behaviour, and current configuration.

Before changing application code or configuration:

1. Explain the observed symptom.
2. State the proposed root cause.
3. Cite the evidence supporting it.
4. Propose the smallest safe fix.
5. Write the diagnosis artifact specified by `tasks/CURRENT.md`.
6. Update `handoffs/CURRENT.md` to `DIAGNOSIS_PROPOSED` with `Next actor: CHATGPT_WORK`.
7. Commit and push those documentation-only changes, then stop.

Do not compare the incident branch with `main`, inspect the incident-creation commit diff, or use repository history to reveal the injected change before completing the evidence-based diagnosis.

## Repair gate

Do not repair until GitHub contains `State: REPAIR_APPROVED` and `Next actor: LOCAL_CODEX` for the same incident and sequence lineage.

After approval:

- Apply the smallest justified fix.
- Run the ticket acceptance checks and relevant regression suite.
- Write the final report specified by `tasks/CURRENT.md`.
- Update task and status files accurately.
- Update `handoffs/CURRENT.md` to `FIX_VERIFIED` with `Next actor: CHATGPT_WORK`.
- Commit and push only the incident branch, then stop.
- Do not merge unless the learner explicitly authorizes it through ChatGPT Work.

Never expose secrets, weaken tests, or claim success without runtime verification. Ask before destructive or scope-expanding actions.

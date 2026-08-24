# RescueLab Agent Contract

This repository is the durable communication channel between ChatGPT Work, the learner, and the Codex executor. Do not use an uploaded or local-only `HANDOFF.md` as project state.

## Actor and execution surface

`CODEX_EXECUTOR` is the handoff actor role. The canonical handoff may also name an `Execution surface`:

- `CODEX_CLOUD` is the default. ChatGPT Work triggers Codex through the RescueLab agent control-room issue using `@codex`.
- `LOCAL_CODEX` is reserved for incidents that require the learner's exact laptop environment, local-only services, attached hardware, or credentials and state intentionally unavailable to the cloud environment.
- `none` is used when no Codex execution is authorized.

The execution surface does not change the diagnostic, approval, review, or branch-safety gates.

## Control keyword

The standalone keyword `cfgh` means: check and follow the GitHub handoff.

When `cfgh` is received:

1. Run `git fetch origin --prune` when operating in a local checkout.
2. Read the canonical `handoffs/CURRENT.md` from GitHub, then read the branch and task it names.
3. If `Next actor` names the receiving agent and the execution surface matches it, follow the current stage instructions.
4. If another actor is named, report the current state and next actor, then route it:
   - For `CHATGPT_WORK`: “Send `cfgh` to ChatGPT Work.”
   - For `CODEX_EXECUTOR` with `Execution surface: CODEX_CLOUD`: ChatGPT Work triggers `@codex` in the control-room issue; no learner relay is required.
   - For `CODEX_EXECUTOR` with `Execution surface: LOCAL_CODEX`: “Send `cfgh` in the local Codex session.”
   Then stop.
5. Do not infer work from an earlier transcript or treat `cfgh`, an issue mention, or a chat prompt as authorization to bypass diagnosis or independent review gates.

## Startup procedure

1. Refresh repository state: local Codex runs `git fetch origin --prune`; Codex cloud reads the repository state supplied by the connected GitHub environment.
2. Read `handoffs/CURRENT.md` and `tasks/CURRENT.md` from the branch named by the handoff.
3. Act only when `Next actor` is `CODEX_EXECUTOR` and the named execution surface matches the current executor.
4. Confirm the handoff sequence and stage before doing work.
5. Treat GitHub repository state as authoritative; do not depend on an earlier transcript, task prompt, or issue comment.

## Cloud control room

GitHub issue #9 is the event-driven control room for Codex cloud.

- The issue is a trigger and reporting surface, not the canonical router.
- `handoffs/CURRENT.md` remains authoritative.
- ChatGPT Work may mention `@codex` only after recording the corresponding assignment and execution surface in the canonical handoff.
- Codex cloud must report its result to GitHub and stop at the same gates as local Codex.
- A control-room comment cannot authorize work that the canonical handoff does not authorize.

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
6. Update `handoffs/CURRENT.md` to `DIAGNOSIS_PROPOSED` with `Next actor: CHATGPT_WORK` and `Execution surface: none`.
7. Commit and push those documentation-only changes, then stop.
8. Report that ChatGPT Work is the next actor. In a local session, end with: “Next step: send `cfgh` to ChatGPT Work.”

Do not compare the incident branch with `main`, inspect the incident-creation commit diff, or use repository history to reveal the injected change before completing the evidence-based diagnosis.

## Standing authorization and repair gate

The learner has granted standing authorization for routine repairs and merges that pass the workflow gates. ChatGPT Work records these approvals in GitHub without asking the learner each time.

Do not repair until GitHub contains `State: REPAIR_APPROVED`, `Next actor: CODEX_EXECUTOR`, and a matching `Execution surface` for the same incident and sequence lineage. ChatGPT Work may record that state automatically only after accepting the evidence-based diagnosis and smallest safe fix.

After approval:

- Apply the smallest justified fix.
- Run the ticket acceptance checks and relevant regression suite.
- Write the final report specified by `tasks/CURRENT.md`.
- Update task and status files accurately.
- Update `handoffs/CURRENT.md` to `FIX_VERIFIED` with `Next actor: CHATGPT_WORK` and `Execution surface: none`.
- Commit and push only the incident branch, then stop.
- Report that ChatGPT Work is the next actor. In a local session, end with: “Next step: send `cfgh` to ChatGPT Work.”
- Do not merge. ChatGPT Work owns the independent review and merge.

After `FIX_VERIFIED`, ChatGPT Work independently reviews the repair and verification evidence. If the review passes, it records the review and merges automatically under the learner's standing authorization. If the review fails or is uncertain, it stops and reports the blocker instead of merging.

## Automatic continuation

After an incident is merged and completion records are updated, `CHATGPT_WORK` immediately prepares the next unchecked incident in `tasks/BACKLOG.md` and routes the canonical mailbox to it. A separate learner command to start the next incident is not required.

This continuation rule does not bypass diagnosis or independent review gates.

Never expose secrets, weaken tests, or claim success without runtime verification. Ask before destructive or scope-expanding actions.

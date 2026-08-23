# RescueLab Agent Contract

This repository is the durable handoff between ChatGPT Work, the learner, and local Codex.

## Source of truth

1. Read `tasks/CURRENT.md` before starting work.
2. Follow the incident ticket it names.
3. Work only on the branch named in that task.
4. Treat `main` as the verified healthy baseline. Do not modify or merge it during an incident.
5. Do not depend on a previous Codex transcript; repository state is authoritative.

## Diagnostic gate

For an active incident, first reproduce the symptom and gather evidence from runtime behaviour, tests, logs, HTTP responses, browser behaviour, and current configuration.

Before changing application code or configuration:

1. Explain the observed symptom.
2. State the proposed root cause.
3. Cite the evidence supporting it.
4. Propose the smallest safe fix.
5. Stop and wait for the learner's explicit approval.

Do not compare the incident branch with `main`, inspect the incident-creation commit diff, or otherwise use repository history to reveal the injected change before completing the evidence-based diagnosis. This is a diagnostic exercise, not a diff-finding exercise.

## After approval

- Apply the smallest justified fix.
- Run the incident acceptance checks and the complete relevant regression suite.
- Write the report path specified by `tasks/CURRENT.md`.
- Update task status accurately.
- Commit and push the incident branch.
- Do not merge unless explicitly instructed.

Never delete Docker volumes, expose secrets, weaken tests, or claim success without runtime verification. Ask before any destructive or scope-expanding action.

# Current Task

## RL-001 — Production frontend cannot use the API

Status: READY_FOR_DIAGNOSIS

- Repository: `dany-aspire/rescuelab`
- Branch: `incident/rl-001`
- Healthy reference: `main`
- Suggested worktree: `/home/dan/rescuelab-worktrees/rl-001`
- Ticket: `tasks/incidents/RL-001.md`
- Final report: `docs/incidents/RL-001-report.md`

## Required stage now

Read `AGENTS.md` and the ticket. Reproduce the incident from the assigned branch and gather evidence from the running production-style Docker Compose stack.

Before changing any tracked or untracked application/configuration file:

1. Explain the symptom.
2. State the proposed root cause.
3. Show the commands, logs, HTTP/browser evidence, and configuration evidence that support it.
4. Propose the smallest safe repair.
5. Stop and wait for the learner's explicit approval.

Do not inspect the incident-creation commit diff or compare this branch with `main` before the diagnosis gate. Do not merge, delete volumes, or modify the healthy reference.

After approval, follow `AGENTS.md`, satisfy the ticket acceptance criteria, create the final report, set this status to `FIX_VERIFIED`, commit, and push only `incident/rl-001`.

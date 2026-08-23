# Codex Upwork MCP compatibility workaround

Use the current globally installed Codex for normal development, including coding,
debugging, testing, Git work, RescueLab, and work in `~/freelance-ops`.

Keep the isolated `@openai/codex` 0.138.0 installation specifically for Upwork MCP
searches, opportunity research, profile and account reads, and marketplace research.
Run this isolated installation from `~/upwork`, where the Upwork research files are
maintained. Do not use `~/freelance-ops` as its working directory.
Newer Codex 0.149.0 produced `MCP startup failed: Unexpected response type` with the
Upwork Streamable HTTP MCP, while 0.138.0 successfully authenticated and loaded the
Upwork MCP tools using the existing `~/.codex` configuration.

The isolated installation is pinned at
`~/.local/share/codex-0138/node_modules/.bin/codex` and must not be casually upgraded.
This is a temporary compatibility arrangement and should be removed only after a
newer Codex release is independently verified to work with the Upwork MCP. Closure
of a related upstream issue alone is not evidence that this incompatibility is fixed.

The Zellij workspace separation is:

- `codex`: `~/freelance-ops` with the current global Codex, for RescueLab and
  general development.
- `upwork`: `~/upwork` with isolated Codex 0.138.0, for the Upwork MCP workflow.

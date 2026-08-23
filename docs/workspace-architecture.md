# Workspace architecture

The Upwork research workflow and RescueLab development are intentionally kept in
separate repositories and local working directories.

| Workspace | Repository | Visibility | Purpose | Codex |
| --- | --- | --- | --- | --- |
| `~/upwork` | `dany-aspire/freelance-ops` | Private | Upwork research, coordination, and MCP workflows | Isolated `0.138.0` |
| `~/freelance-ops` | `dany-aspire/rescuelab` | Public | RescueLab development, debugging, and portfolio work | Current global release |

Upwork job research, client analysis, OAuth material, and marketplace intelligence
must never be copied or committed to the public RescueLab repository. RescueLab
source code belongs in `~/freelance-ops`; only harmless coordination references may
appear in the private `freelance-ops` repository.

The Codex version split is temporary. Keep `0.138.0` pinned for the Upwork MCP
workflow until a newer release is independently verified against that MCP. Use the
current global Codex for RescueLab and general development.

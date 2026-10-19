# Run — icon / web — 2026-10-20

| Field | Value |
|---|---|
| Unit | `icon` on `web` |
| Unit file | `3-web-components/components/icon/icon.md` |
| Branch | `ds/icon-web` (from `main`) |
| Pull request | — |
| Skipped steps | figma (config › skip) |

User request: "make sure all icons we use in the design system are Google symbols." Plan is already Finished (D-18, Material Symbols Rounded); contract §9 / AC-7 move every built component onto `Icon` and the guard test bans `@mui/icons-material`. Plan and preview not re-run (user chose implement).

## Steps

| # | Step | Agent | Result | Checks | Commit | Prompt |
|---|---|---|---|---|---|---|
| docs:check failure (not a config gate) | Approve — commit and review | User: pre-existing failure outside this unit; noted, not fixed here |
| after-review (round 1) | Approve | Run plan → preview → fix for round 1 |
| 01 | implement | cursor | done | typecheck ✓ · test:web ✓ (86) · docs:check ✗ (pre-existing: tablet/mobile button-group figma contracts stale, also fails on main) | see git log | [01-implement-cursor.prompt.md](01-implement-cursor.prompt.md) |
| 02 | review | claude (dispatcher) | failed: nested Claude Code session not allowed | — | — | [02-review-claude.prompt.md](02-review-claude.prompt.md) |
| 03 | review | claude (wf-reviewer subagent) | done · Changes requested (3 🟡, 2 🟢; Planner #1 #2 #5, Executor #3 #4) | typecheck ✓ · test:web ✓ (86) · docs:check ✗ (pre-existing) | see git log | [03-review-claude.prompt.md](03-review-claude.prompt.md) |

## Gates

| Gate | Decision | Notes |
|---|---|---|

## Questions raised

- (cursor) Regenerate stale tablet/mobile button-group Figma contracts? — outside this unit
- (cursor) Should Button/IconButton strip Icon's `directional` prop like `mirrorInRtl`?

## Summary


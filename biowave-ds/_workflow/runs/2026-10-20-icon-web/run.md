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
| after-plan (plan 1.1) | Approve | Previews accepted; run fix round 1 |
| 01 | implement | cursor | done | typecheck ✓ · test:web ✓ (86) · docs:check ✗ (pre-existing: tablet/mobile button-group figma contracts stale, also fails on main) | see git log | [01-implement-cursor.prompt.md](01-implement-cursor.prompt.md) |
| 02 | review | claude (dispatcher) | failed: nested Claude Code session not allowed | — | — | [02-review-claude.prompt.md](02-review-claude.prompt.md) |
| 03 | review | claude (wf-reviewer subagent) | done · Changes requested (3 🟡, 2 🟢; Planner #1 #2 #5, Executor #3 #4) | typecheck ✓ · test:web ✓ (86) · docs:check ✗ (pre-existing) | see git log | [03-review-claude.prompt.md](03-review-claude.prompt.md) |
| 04 | plan | claude (wf-planner subagent) | done · Plan 1.1 Finished; #1 directional in prepareIcon + Button/IconButton in C5, #2 keep push_pin/expand_more as recorded extras (font draws them), #5 repo-wide D-18 guard | contract ✓ · docs:check ✗ (pre-existing) | see git log | [04-plan-claude.prompt.md](04-plan-claude.prompt.md) |
| 05 | preview | codex | done · icon-light-en.jpg, icon-dark-ar.jpg | previews ✓ | see git log | [05-preview-codex.prompt.md](05-preview-codex.prompt.md) |
| 06 | fix (round 1) | antigravity | done · #1–#5 | typecheck ✓ · test:web ✓ 87/87 on rerun (first run: Button axe light timed out at 20 s, 18 s on rerun) · docs:check ✗ (pre-existing) · D-18 guard probe caught a planted violation ✓ | see git log | [06-fix-antigravity.prompt.md](06-fix-antigravity.prompt.md) |
| 07 | review (round 2) | claude (wf-reviewer subagent) | done · Approved; round 1 #1–#5 fixed; 1 🟢 (Button axe light test near 20 s timeout, not caused by this branch) | typecheck ✓ · test:web ✓ 87/87 · docs:check ✗ (pre-existing) | see git log | [07-review-claude.prompt.md](07-review-claude.prompt.md) |

## Gates

| Gate | Decision | Notes |
|---|---|---|

## Questions raised

- (cursor) Regenerate stale tablet/mobile button-group Figma contracts? — outside this unit
- (cursor) Should Button/IconButton strip Icon's `directional` prop like `mirrorInRtl`?

## Summary

Icon/web built on Google Material Symbols Rounded (D-18) and adopted by every built web component (SplitButton, ButtonGroup, TextField parts, Button/IconButton icon slots). `noLegacyIcons.test.ts` now fails on `@mui/icons-material`, `material-symbols-rounded` or `@mui/material/Icon` anywhere outside `src/components/icon/`. Plan 1.1 Finished · Code Approved · Review Round 2 Approved. Open follow-ups: stale tablet/mobile button-group Figma contracts (pre-existing); Button axe test timeout headroom (🟢); guard does not catch `import { Icon } from '@mui/material'` barrel imports; tablet and mobile Icon still Planned.


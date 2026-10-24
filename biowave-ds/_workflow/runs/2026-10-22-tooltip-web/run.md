# Run — tooltip / web — 2026-10-22

| Field | Value |
|---|---|
| Unit | `tooltip` on `web` (plan step covers web, tablet and mobile — Part A is shared) |
| Unit file | `3-web-components/components/tooltip/tooltip.md` |
| Branch | `ds/tooltip-web` (from `main` @ 46be11a, worktree `/Users/hassansaid/Downloads/Biowave Design System-tooltip-web`) |
| Pull request | — |
| Skipped steps | figma (config › skip) |

## Steps

| # | Step | Agent | Result | Checks | Commit | Prompt |
|---|---|---|---|---|---|---|
| 01 | plan | claude (wf-planner subagent) | done (2026-10-23, resumed after a network error and the session limit) · Tooltip 1.0 on W/T/M: `placement` top/bottom/start/end (logical), `purpose` label/description, touch `trigger` long-press/tap; WCAG 1.4.13; web on MUI `Tooltip`, Icon button's B3.4 tokens/timings + max width `size-container-xxs`; Flutter `BwTooltip` on `RawTooltip` (plan raises pubspec Flutter min to ≥ 3.47.0 — not edited yet); no component tokens; Figma 2 variants (EN/AR), no missing keys. Icon button / Text field migration = follow-up | component-tokens ✓ · contract W/T/M ✓ · docs:build ✓ · docs:check ✓ · sync ✓ READY | see git log | `01-plan-claude.prompt.md` |
| 02–06 | preview ×3 | codex | web, tablet, mobile sheets complete (first runs hit the time limit; tablet/mobile retried as 05/06, one at a time) | previews W/T/M ✓ | see git log | `0[2-6]-preview-codex-*.prompt.md` |

## Gates

| Gate | Decision | Notes |
|---|---|---|

## Questions raised

- Planner: (1) Flutter base `RawTooltip` instead of the roadmap's M3 `Tooltip` (M3 hard-codes its 150/75 ms fade, no reduced motion), with pubspec Flutter min `>=3.24.0` → `>=3.47.0` in tablet + mobile — approve? (2) Token for how long a touch tooltip stays, or framework defaults? (3) Rich tooltips (title, actions, arrow) out of 1.0? (4) When Icon button moves to Tooltip: opens on keyboard focus only (today any focus), max width 320 px instead of MUI 300 px — accept?

## Summary

User (2026-10-22): plan Day 3 + Day 4 components on all platforms. New component, no files yet → **plan** (web, tablet, mobile), then **preview** per platform, then the after-plan gate.

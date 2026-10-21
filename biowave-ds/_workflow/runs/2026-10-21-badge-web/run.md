# Run — badge / web — 2026-10-21

| Field | Value |
|---|---|
| Unit | `badge` on `web` (plan step covers web, tablet and mobile — Part A is shared) |
| Unit file | `3-web-components/components/badge/badge.md` |
| Branch | `ds/badge-web` (from `main`, worktree `.claude/worktrees/badge-web`) |
| Pull request | — |
| Skipped steps | figma (config › skip) · preview (Codex/Antigravity not reachable from this session) |

Orchestrated from a Cowork session (Phase 1 run, ROADMAP Day 3; gates pre-approved by the user except merge). New component, no files yet → **plan**. The tablet and mobile units branch from this one after the plan.

## Steps

| # | Step | Agent | Result | Checks | Commit | Prompt |
|---|---|---|---|---|---|---|
| 01 | plan | claude (wf-planner subagent) | done · Badge 1.0 on W/T/M: variants count · dot · check (P-05 Check badge), 7 colors, ring on anchor, RTL corner, Western digits; no component tokens (P-04); web on MUI `Badge`, Flutter `BwBadge` on `Stack` (M3 `Badge` can't center/ring/animate, C3); Plan Finished · Code/Figma Planned | component-tokens ✓ · contract W/T/M ✓ · docs:build ✓ · docs:check ✗ 2 (pre-existing stale T/M button-group Figma contracts) · sync ✓ READY (1 icon not indexed) | see git log | `01-plan-claude.prompt.md` |

## Gates

| Gate | Decision | Notes |
|---|---|---|
| all gates except merge | Pre-approved by the user (2026-10-21) | Merge to `main` stays with the user |

## Questions raised

- Planner: `check` glyph not in `_sync/figma-icons.json` → Figma contracts show ⏳ not indexed (code contracts complete). Figma skipped in this run.
- Check glyph uses Biowave Icon → mobile Badge waits for `ds/icon-mobile`.
- Preview step not run (Codex/Antigravity not reachable from this session).

## Summary

—

# Run — link / web — 2026-10-21

| Field | Value |
|---|---|
| Unit | `link` on `web` (plan step covers web, tablet and mobile — Part A is shared) |
| Unit file | `3-web-components/components/link/link.md` |
| Branch | `ds/link-web` (from `main`, worktree `.claude/worktrees/link-web`) |
| Pull request | — |
| Skipped steps | figma (config › skip) · preview (Codex/Antigravity not reachable from this session) |

Orchestrated from a Cowork session (Phase 1 run, ROADMAP Day 3; gates pre-approved by the user except merge). New component, no files yet → **plan**. The tablet and mobile units branch from this one after the plan.

## Steps

| # | Step | Agent | Result | Checks | Commit | Prompt |
|---|---|---|---|---|---|---|
| 01 | plan | claude (wf-planner subagent) | done · Link 1.0 on W/T/M (Part A shared, A8 per platform); no component tokens (P-04); web on MUI `Link`, Flutter `BwLink` + `BwLink.span`; Plan Finished · Code/Figma Planned | component-tokens ✓ · contract W/T/M ✓ · docs:build ✓ · docs:check ✗ 2 (pre-existing stale T/M button-group Figma contracts, fixed on `ds/button-group-web`) · sync ✓ READY (1 icon not indexed) | see git log | `01-plan-claude.prompt.md` |

## Gates

| Gate | Decision | Notes |
|---|---|---|
| all gates except merge | Pre-approved by the user (2026-10-21) | Merge to `main` stays with the user |

## Questions raised

- Planner: `open_in_new` not in `_sync/figma-icons.json` → Figma contracts show ⏳ not indexed. Needs `sync:icons:plan` → read in Figma → `sync:icons` → regenerate. Figma is skipped in this run; code contracts are complete.
- Planner: mobile Link needs mobile `BwIcon` (Planned) first → mobile Link branches after `ds/icon-mobile`.
- Preview step not run (Codex/Antigravity not reachable from this session).

## Summary

—

# Run — split-button / web — 2026-10-21

| Field | Value |
|---|---|
| Unit | `split-button` on `web` |
| Unit file | `3-web-components/components/split-button/split-button.md` |
| Branch | `ds/split-button-web` (from `main`, worktree `.claude/worktrees/split-button-web`) |
| Pull request | — |
| Skipped steps | figma (config › skip) |

Orchestrated from a Cowork session (Phase 1 run; gates pre-approved by the user except merge). Plan Finished, Code Built, no review round → **review**.

## Steps

| # | Step | Agent | Result | Checks | Commit | Prompt |
|---|---|---|---|---|---|---|
| 01 | review | claude (wf-reviewer subagent) | done · **Changes requested** — 2 🔴 (#1 menu origins physical `right`, wrong side in AR; #2 full-suite timeouts, needs `ds/button-web` tooling — Executor), 3 🟡 (#3 B4 close motion, #4 B9/B6 test gaps, #5 raised timeouts), 3 🟢 (#6 C3, #7 B6 aria-controls — Planner) | typecheck ✓ · sync ✓ · test:web ✗ 81/87 (timeouts; SplitButton alone 11/11) · docs:check ✗ 2 (stale T/M button-group Figma contracts) | see git log | `01-review-claude.prompt.md` |

## Gates

| Gate | Decision | Notes |
|---|---|---|
| all gates except merge | Pre-approved by the user (2026-10-21) | Merge to `main` stays with the user |

## Questions raised

- Reviewer: #2 needs `ds/button-web` (PR #1) merged first → Orchestrator: asked the user; the fix branch rebases on it.

## Summary

—

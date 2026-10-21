# Run — icon-button / web — 2026-10-21

| Field | Value |
|---|---|
| Unit | `icon-button` on `web` |
| Unit file | `3-web-components/components/icon-button/icon-button.md` |
| Branch | `ds/icon-button-web` (from `main`, worktree `.claude/worktrees/icon-button-web`) |
| Pull request | — |
| Skipped steps | figma (config › skip) |

Orchestrated from a Cowork session (Phase 1 run; gates pre-approved by the user except merge). Plan Finished, Code Built, no review round → **review**.

## Steps

| # | Step | Agent | Result | Checks | Commit | Prompt |
|---|---|---|---|---|---|---|
| 01 | review | claude (wf-reviewer subagent) | done · **Changes requested** — 0 🔴, 6 🟡 (#1 flaky Esc tooltip test, #2 tooltip easing/reduced motion, #3 disabled anchor aria-label, #4 raised timeouts, #5 B9 gaps — Executor; #6 depends on `ds/button-web` test tooling — Planner), 3 🟢 | typecheck ✓ · sync ✓ · test:web ✗ 85/87 · 81/87 · 84/87 (Button/SplitButton timeouts; IconButton alone 11/11) · docs:check ✗ 2 (stale T/M button-group Figma contracts) | see git log | `01-review-claude.prompt.md` |

## Gates

| Gate | Decision | Notes |
|---|---|---|
| all gates except merge | Pre-approved by the user (2026-10-21) | Merge to `main` stays with the user |

## Questions raised

- Reviewer: merge `ds/button-web` (PR #1, shared speedy Emotion cache) before the fix round? → Orchestrator: yes — asked the user; the fix branch rebases on it.

## Summary

—

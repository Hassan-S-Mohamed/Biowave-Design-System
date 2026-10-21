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
| 02 | plan | claude (wf-planner subagent) | done · plan 1.1: #6 B5/C3 menu side from text direction (`end = isRtl ? 'left' : 'right'` for both origins), #7 B6 `aria-controls` only while open; C3 test tooling = shared speedy Emotion cache now on `main` (merged in 371d7f7); C7 AC-7/AC-8 + Fix round 1 task list for #1–#5, #8. Plan Finished | contract web split-button ✓ · docs:check ✓ 0 errors | see git log | `02-plan-claude.prompt.md` |
| 03 | preview | codex | done (12.5 min): `split-button-light-en.jpg`, `split-button-dark-ar.jpg`, README token sheet; RTL menu aligned to the left (inline end) as plan 1.1 #6. ⚠ light menu panel ≈ 8 px past the control's end edge; a JPEG cannot show the scale origin; orchestrator: dark/ar focus columns draw the ring round the whole control (primary) and none on the trigger | previews ✓ | see git log | `03-preview-codex.prompt.md` |

## Gates

| Gate | Decision | Notes |
|---|---|---|
| all gates except merge | Pre-approved by the user (2026-10-21, Cowork session) | Merge to `main` stays with the user. 2026-10-21 Code-tab session: `main` merged in after PR #1 + #8 (371d7f7); gates asked again here |

## Questions raised

- Reviewer: #2 needs `ds/button-web` (PR #1) merged first → Orchestrator: asked the user; the fix branch rebases on it.

## Summary

—

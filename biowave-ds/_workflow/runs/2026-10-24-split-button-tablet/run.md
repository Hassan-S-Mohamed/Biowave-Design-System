# Run — split-button / tablet — 2026-10-24

| Field | Value |
|---|---|
| Unit | `split-button` on `tablet` |
| Unit file | `4-tablet-components/components/split-button/split-button.md` |
| Branch | `ds/split-button-tablet` (from `main` @ 71fcc21) |
| Pull request | — |
| Skipped steps | figma (config › skip). Plan and preview were done in earlier runs (Plan Finished, contract current). |

## Steps

| # | Step | Agent | Result | Checks | Commit | Prompt |
|---|---|---|---|---|---|---|
| after-plan (plan 2) | Approve | Previews skipped (no previewer free; goldens come with the fix). #9: add `bw_button_style.dart` to C5 (Planner) so the shared segment-radius helper can live there. Fixer: Codex, else Antigravity |
| after-review (Round 1) | Approve | Planner fixes #4, #5, #7, #8 → after-plan gate → Fixer #1, #2, #3, #6, #9, #10 + goldens |
| 01 | implement | codex | done (handoff) — orchestrator run: 7 test failures (Icons.*, SemanticsHandle, part gap, menu width) | docs:check ✓ · analyze ✓ · test ✗ | — | [prompt](01-implement-codex.prompt.md) |
| 02 | implement | codex | done — 7 failures fixed | docs:check ✓ · analyze ✓ · test ✓ 160/160 (orchestrator) | (this commit) | [prompt](02-implement-codex.prompt.md) |
| 03 | review | claude (wf-reviewer agent) | done — Round 1 Changes requested: 2 🔴 (menu position, menu keyboard), 5 🟡 (3 Planner), 3 🟢 | docs:check ✓ · analyze ✓ · test ✓ 160/160 · sync ✓ | (this commit) | [prompt](03-review-claude.prompt.md) |
| 04 | plan | claude (wf-planner agent) | done — plan 2: #4 internal params in C3/C5, #5 menu tokens + elevation-3 mapping, #7 goldens in C5, #8 header; contracts regenerated | contract ✓ · docs:check ✓ | (this commit) | [prompt](04-plan-claude.prompt.md) |
| 05 | plan | claude (wf-planner agent) | done — plan 2.1: bw_button_style.dart in C5/C3 for #9 | contract ✓ · docs:check ✓ | (this commit) | [prompt](05-plan-claude.prompt.md) |
| 06 | fix | codex | failed — ChatGPT usage limit, nothing changed | — | — | [prompt](06-fix-codex.prompt.md) |
| 07 | fix | antigravity | partial — code + goldens done, stopped before C8/Handoff | docs:check ✓ · analyze ✓ · test ✓ 168/168 (orchestrator) | — | [prompt](07-fix-antigravity.prompt.md) |
| 08 | fix | antigravity | failed — Antigravity quota reached (default model), nothing changed | — | — | [prompt](08-fix-antigravity.prompt.md) |
| 09 | fix | antigravity (Gemini 3.8 Flash) | done — C8 Fix round 1, Code Built, CHANGELOG | docs:check ✓ · analyze ✓ · test ✓ 168/168 (orchestrator); light-ar golden checked by eye (menu under container, end-aligned) | (this commit) | [prompt](09-fix-antigravity.prompt.md) |

## Gates

| Gate | Decision | Notes |
|---|---|---|

## Questions raised

- Planner: finding #9 (shared `_borderRadius` helper) — should C5 list `bw_button_style.dart` so the helper can move there? → User: yes.

## Summary

Wave 2 (depends on BwIconButton tablet, merged in #14). Run in parallel in its own worktree. Agent assigned by the user: codex.

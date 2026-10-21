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
| 02 | plan | claude (wf-planner subagent) | done · plan 1.1: #6 depends on `ds/button-web` test tooling (rebase check is fix step 0), #8 B7/D4 use Biowave `Icon`, header source; fix list AC-7…AC-11; T/M Figma contracts regenerated (D4). Plan Finished | contract web ✓ · docs:check ✗ 2 (known stale T/M button-group Figma contracts) | see git log | `02-plan-claude.prompt.md` |
| 03 | preview | codex | partial → accepted (not blocking, 12 min): `icon-button-light-en.jpg`, `icon-button-dark-ar.jpg`, README token sheet; ⚠ dark/ar `Text / Error` row draws `arrow_forward` unmirrored (→) after two retries — B5 says it mirrors | previews ✓ | see git log | `03-preview-codex.prompt.md` |

## Gates

| Gate | Decision | Notes |
|---|---|---|
| all gates except merge | Pre-approved by the user (2026-10-21, Cowork session) | Merge to `main` stays with the user. 2026-10-21 Code-tab session: `main` merged in after PR #1 + #8 (161782b); gates asked again here |

## Questions raised

- Planner: Figma contracts drop the `push_pin` key row — the generator hides icon names not in `@material-symbols/font-400` (which calls it `keep`), and `_sync/icons.mjs` `iconNamesIn` misses `<Icon name="x" />`. Tooling follow-up; Figma skipped in this run, doesn't block the fix.
- Reviewer: merge `ds/button-web` (PR #1, shared speedy Emotion cache) before the fix round? → Orchestrator: yes — asked the user; the fix branch rebases on it.

## Summary

—

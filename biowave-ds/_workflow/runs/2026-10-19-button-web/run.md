# Run — button / web — 2026-10-19

| Field | Value |
|---|---|
| Unit | `button` on `web` |
| Unit file | `3-web-components/components/button/button.md` |
| Branch | `ds/button-web` (from `main`) |
| Pull request | — |
| Skipped steps | figma (config › skip) |

## Steps

| # | Step | Agent | Result | Checks | Commit | Prompt |
|---|---|---|---|---|---|---|
| 01 | review | claude | done · **Changes requested** (7 findings: 1 🔴, 3 🟡, 3 🟢) | typecheck ✓ · test:web ✗ 73/77 (not Button: 24/24 ✓) · docs:check ✗ (button-group T/M Figma contracts stale) · sync ✓ | see git log | `01-review-claude.prompt.md` |
| 02 | plan | claude | done · plan v1.2 (spec unchanged), Plan stays Finished | contract web button ✓ · contract tablet/mobile button-group ✓ · docs:check ✓ 0 errors · sync ✓ · probe test:web 77/77 in 35 s | 668185a | `02-plan-claude.prompt.md` |
| 03 | preview | — | not run: Codex and Antigravity are not reachable from this session (cloud + Linux VM). Not blocking | — | — | — |

## Gates

| Gate | Decision | Notes |
|---|---|---|
| after-review | **Approve** (2026-10-19) | Run the Planner first for #11 (shared test tooling) and #14 (stale button-group contracts), then fix
| after-plan | **Approve** (2026-10-19) | Fix step runs from Claude Code on the Mac (Codex): `04-fix-codex.prompt.md` |

## Questions raised

- Reviewer: should Button's Plan go to `Open`? → Planner: no; the review never reopened it, spec unchanged, Plan stays `Finished` (v1.2).
- Planner: Icon button, Split button and Button group tests still have their own raised timeouts (`IconButton.test.tsx:86`, `SplitButton.test.tsx:93, 272`, `ButtonGroup.test.tsx:254`). Each unit removes its own in its next fix step.
- Note: commit 638be9b's message says "review" but it only holds run.md; the review itself is 82f027f.

## Summary

Preflight `npm run sync` ✓ READY (exit 0). Picked by `status.priority` + WIP rule (ROADMAP §2: two items in Changes requested → no new item; review the fixes first). Button web: Plan Finished · Code Built · Round 1 Changes requested · C8 Round 2 fix entry exists → next step **review**.

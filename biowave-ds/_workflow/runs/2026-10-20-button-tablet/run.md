# Run — button / tablet — 2026-10-20

| Field | Value |
|---|---|
| Unit | `button` on `tablet` |
| Unit file | `4-tablet-components/components/button/button.md` |
| Branch | `ds/button-tablet` (from `main` @ ef7598d) |
| Pull request | — |
| Skipped steps | figma (config › skip) |

## Steps

| # | Step | Agent | Result | Checks | Commit | Prompt |
|---|---|---|---|---|---|---|
| 01 | implement | codex | done (15 min): `BwButton`, `BwControlSize`, focus ring, `pumpBw`, 4 goldens; Code `Built` | flutter analyze ✓ · flutter test ✓ 37/37 · component-tokens ✓ · sync ✓ READY · docs:check ✓ (2 baseline errors only) | see git log | `01-implement-codex.prompt.md` |

## Gates

| Gate | Decision | Notes |
|---|---|---|

## Questions raised

- Baseline: `npm run docs:check` on `main` has 2 known errors (tablet + mobile `button-group` Figma contracts stale). They are fixed on `ds/button-web` (finding #14, PR #1, not merged yet). Steps here are checked against "no errors besides those 2".

## Summary

Preflight `npm run sync` ✓ READY (tablet button: plan Finished · code contract current). User asked to build Button on every platform: tablet, then mobile, then next. Button tablet: Plan Finished · Code Planned · no review · C8 empty → next step **implement**. WIP rule (ROADMAP §2): only Text field web is in Changes requested → new item allowed.

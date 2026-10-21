# Fix step — button / mobile

Project root: /Users/hassansaid/Downloads/Biowave Design System-button-mobile/biowave-ds (a git worktree on `ds/button-mobile`; work only here, never in `/Users/hassansaid/Downloads/Biowave Design System/`). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
The latest round in Part E of 5-mobile-components/components/button/button.md (Round 1 — 2026-10-20), and 5-mobile-components/components/button/button-contract.md.

## Outputs (write only these)
The files in contract §9, plus a 'Fix round 1' entry in C8 of 5-mobile-components/components/button/button.md, and one CHANGELOG.md line.

## This step
Fix Review Round 1 findings #1 (🟡) and #2 (🟢):
- #1 `lib/src/common/bw_focus_ring.dart`: always return the `Stack(clipBehavior: Clip.none, fit: StackFit.passthrough)` with the child first and the ring only as a conditional second child, so the child's element/State survives focus changes (as C3 and the merged tablet `4-tablet-components/lib/src/common/bw_focus_ring.dart` do). Add a test: the State inside a loading button (e.g. the spinner / `AnimatedSwitcher`) is the same object before and after keyboard focus.
- #2 `lib/src/components/button/bw_button_style.dart`: one size → dimensions table (icon size included) instead of two mappings, like tablet's `BwButtonMetrics`.
Keep goldens unchanged unless the fix changes pixels (it should not); if they change, say why in C8. Keep Code `Built`. Do not touch web, tablet or any `*-contract.md`.

## Notes from the user
- Approved at the after-review gate: fix both #1 and #2.
- Known baseline: `npm run docs:check` reports 2 errors not owned by this unit (tablet + mobile `button-group` Figma contracts stale; fixed on `ds/button-web`, PR #1, not merged). docs:check passes if those 2 are the only errors.
- Your sandbox blocks plain `flutter test` (sockets); use `flutter test --experimental-faster-testing`. Run `flutter analyze`, not `dart analyze`.

## Checks to run
cd 5-mobile-components && flutter analyze && flutter test · npm run component-tokens · npm run sync · npm run docs:check

Do not commit, push or switch branches. End with the Handoff block.

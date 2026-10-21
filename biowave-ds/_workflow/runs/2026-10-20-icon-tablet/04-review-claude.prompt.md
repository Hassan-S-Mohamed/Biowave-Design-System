# Review step — icon / tablet

Project root: /Users/hassansaid/Downloads/Biowave Design System-icon-tablet/biowave-ds (git worktree on branch ds/icon-tablet). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
B, C7, C8 and E of 4-tablet-components/components/icon/icon.md, and the code changed on this branch (`git diff main...HEAD` plus the working tree).

## Outputs (write only these)
A new 'Round N — 2026-10-20' block in Part E of 4-tablet-components/components/icon/icon.md, plus the Review column of 4-tablet-components/README.md (and one CHANGELOG.md line).

## This step
Review icon/tablet against contract §11 AC-1…AC-5 and the B9/§10 test list. Pay special attention to D-18: glyphs only from Google Material Symbols Rounded (`material_symbols_icons`, `Symbols.*_rounded`), never Flutter `Icons.*`; `test/no_legacy_icons_test.dart` must really fail on `Icons.` in `lib/` (probe it with a planted violation and revert). Check that goldens show real glyphs. No other tablet component is built on main, so there is nothing to adopt yet; note that Button tablet (in progress on another branch) must adopt BwIcon.

## Notes from the user
The goal of this run: every icon used in the design system must be a Google Material Symbol. `npm run docs:check` fails on main too (stale tablet/mobile button-group Figma contracts) — the user accepted that; record it, don't count it against this unit.

## Checks to run
- npm run docs:check
- cd 4-tablet-components && flutter analyze && flutter test

Do not commit, push or switch branches. End with the Handoff block.

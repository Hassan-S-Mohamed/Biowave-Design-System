# Review step — icon / tablet

Project root: /Users/hassansaid/Downloads/Biowave Design System-icon-tablet/biowave-ds (git worktree on branch ds/icon-tablet). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
B, C7, C8 and E of 4-tablet-components/components/icon/icon.md, and the code changed on this branch (`git diff main...HEAD` plus the working tree).

## Outputs (write only these)
A new 'Round 2 — 2026-10-21' block in Part E of 4-tablet-components/components/icon/icon.md, plus the Review column of 4-tablet-components/README.md (and one CHANGELOG.md line).

## This step
Review round 2 for icon/tablet. Since round 1, main (Button tablet #3) was merged in and step 05 adopted BwIcon in BwButton and widened the guard. Review the whole branch again against contract §11 AC-1…AC-5 and the B9/§10 test list. Pay special attention to D-18: glyphs only from Google Material Symbols Rounded (`material_symbols_icons`, `Symbols.*_rounded`), never Flutter `Icons.*`; `test/no_legacy_icons_test.dart` must really fail on `Icons.` in `lib/` (probe it with a planted violation and revert). Check that goldens show real glyphs. Check BwButton now renders every icon through BwIcon with no size/colour change, a single RTL flip (B9), unchanged keys and decorative semantics, and that the regenerated Button goldens differ only by the Symbols variable-font axes. Probe each guard pattern (Icons., CupertinoIcons., IconData(, raw Icon( outside icon/) and revert. Re-check the round 1 nits.

## Notes from the user
The goal of this run: every icon used in the design system must be a Google Material Symbol. `npm run docs:check` fails on main too (stale tablet/mobile button-group Figma contracts) — the user accepted that; record it, don't count it against this unit.

## Checks to run
- npm run docs:check
- cd 4-tablet-components && flutter analyze && flutter test

Do not commit, push or switch branches. End with the Handoff block.

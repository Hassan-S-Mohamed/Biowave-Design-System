# Implement step — icon / tablet

Project root: /Users/hassansaid/Downloads/Biowave Design System-icon-tablet/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
4-tablet-components/components/icon/icon-contract.md only (plus AGENTS.md).

## Outputs (write only these)
The files in contract §9, plus C8 Execution log in 4-tablet-components/components/icon/icon.md (and the Code status in its header + 4-tablet-components/README.md, and one CHANGELOG.md line, per contract §14).

## This step
Build the Biowave tablet `BwIcon` (with `BwIconSize`, `BwIconColor`) exactly as contract §9 says, export it from `lib/biowave_tablet.dart`, and write the §10 tests including goldens. Glyphs come only from Google Material Symbols Rounded via `material_symbols_icons` (`Symbols.*_rounded`, re-exported through `biowave_foundations`) — never Flutter `Icons.*`. Add `test/no_legacy_icons_test.dart`, which fails if `Icons.` (Flutter Material icons) appears anywhere in `lib/` of this package. No other tablet component is built on this branch yet, so there is nothing to adopt; do not create other components. Set Code to Built when done.

## Notes from the user
The goal of this run: every icon used in the design system must be a Google Material Symbol. If you find any icon in the tablet package that is not a Material Symbol, list it in C8 → Questions; do not change files outside contract §9.

## Checks to run
- npm run docs:check (known pre-existing failure: tablet/mobile button-group Figma contracts are stale, also on main — report it, do not fix it)
- cd 4-tablet-components && flutter analyze && flutter test
(and contract §13: npm run component-tokens, npm run sync — must end with READY)

Do not commit, push or switch branches. End with the Handoff block.

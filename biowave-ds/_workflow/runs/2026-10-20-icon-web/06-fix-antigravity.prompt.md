# Fix step — icon / web

Project root: /Users/hassansaid/Downloads/Biowave Design System/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
The latest round in Part E of 3-web-components/components/icon/icon.md (E2 Round 1 — 2026-10-20), and 3-web-components/components/icon/icon-contract.md (regenerated for plan 1.1).

## Outputs (write only these)
The files in contract §9, plus a 'Fix round 1' entry in C8 of 3-web-components/components/icon/icon.md (and Code status → Built in the header + 3-web-components/README.md, and one CHANGELOG.md line).

## This step
Fix review Round 1 findings #1–#5 as now specified by plan 1.1 / the regenerated contract:
- #1 (now in contract): Button.tsx and IconButton.tsx `prepareIcon` strip Icon's `directional` prop exactly like `mirrorInRtl` (and the class); the wrapper gets `bw-icon-directional` once; fix the Icon.tsx JSDoc.
- #2 (now in contract B1): `IconName` = `MaterialSymbol | 'push_pin' | 'expand_more'` as specified; add the type test.
- #3: the single-flip test covers the `directional` prop, the class and both together, inside Button and Icon button; the "RTL only" test asserts the rule is scoped to `[dir='rtl']`.
- #4: the inside-Button sm/md/lg test asserts the actual 16/20/24 sizes.
- #5 (now in contract): extend `src/test/noLegacyIcons.test.ts` to fail on `material-symbols-rounded` or `@mui/material/Icon` anywhere under `3-web-components/src/` outside `src/components/icon/` (excluding the guard file itself); fold the TextField literal source guards into it if they would trip it.

## Notes from the user
Goal of the run: every icon in the design system is a Google Material Symbol. Known pre-existing failure, not this unit: `docs:check` reports stale tablet/mobile button-group Figma contracts — report it, do not fix it.

## Checks to run
- npm run docs:check
- npm run typecheck
- npm run test:web

Do not commit, push or switch branches. End with the Handoff block.

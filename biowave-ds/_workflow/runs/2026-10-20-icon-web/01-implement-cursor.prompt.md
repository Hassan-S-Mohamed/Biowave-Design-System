# Implement step — icon / web

Project root: /Users/hassansaid/Downloads/Biowave Design System/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
3-web-components/components/icon/icon-contract.md only (plus AGENTS.md).

## Outputs (write only these)
The files in contract §9, plus C8 Execution log in 3-web-components/components/icon/icon.md (and the Code status in its header + 3-web-components/README.md, and one CHANGELOG.md line, per contract §14).

## This step
Build the Biowave web `Icon` exactly as contract §9 says, write the §10 tests, and adopt `Icon` in every built component listed in §9 so that no file outside `src/components/icon/` renders `material-symbols-rounded` markup directly (AC-7). Keep the existing D-18 guard `src/test/noLegacyIcons.test.ts` passing: Google Material Symbols only — no `@mui/icons-material`, no other icon set. Set Code to Built when done.

## Notes from the user
The goal of this run: every icon used in the design system must be a Google Material Symbol. If you find any icon in the web components that is not a Material Symbol (another package, inline SVG, or a legacy Material Icons name), list it in C8 → Questions; do not change files outside contract §9.

## Checks to run
- npm run docs:check
- npm run typecheck
- npm run test:web
(and contract §13: npm run component-tokens, npm run sync — must end with READY)

Do not commit, push or switch branches. End with the Handoff block.

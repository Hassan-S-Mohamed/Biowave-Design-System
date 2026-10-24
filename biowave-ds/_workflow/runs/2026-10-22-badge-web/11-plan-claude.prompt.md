# Plan step (foundations) — badge / web

Project root: /Users/hassansaid/Downloads/Biowave Design System-badge-web/biowave-ds (git worktree on branch `ds/badge-web`; work only here). Project rules: AGENTS.md (§6 Changing foundations). Config: _workflow/config.json.

## Inputs (read only these)
AGENTS.md §6, 2-foundations/scripts/contrast-pairs.json, 2-foundations/guidelines/color.md (or the colour guideline the README names), 2-foundations/dist/tokens.json, and B3/B6 of 3-web-components/components/badge/badge.md (plan 1.1).

## Outputs (write only these)
2-foundations/scripts/contrast-pairs.json, the files `npm run tokens` regenerates, and one CHANGELOG.md entry.

## This step
Add the foreground/background pair `color-text-on-warning` on `color-icon-role-warning` (minimum 4.5:1, normal text — the Badge count text on its warning fill, plan 1.1) to contrast-pairs.json, following the file's existing format and grouping. Then run `npm run tokens`: it must end with "0 error(s)" in both themes. No token values change, so no Figma sync is needed — confirm that in the Handoff (if `npm run sync` reports anything pending, report it; do not run Figma steps).

## Notes from the user
User approved this follow-up at the Badge 1.1 gate.

## Checks to run
- npm run tokens
- npm run sync
- npm run docs:check

Do not commit, push or switch branches. End with the Handoff block.

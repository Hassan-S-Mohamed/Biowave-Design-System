# Fix step — text-field / web

Project root: /Users/hassansaid/Downloads/Biowave Design System-text-field-web/biowave-ds (a git worktree on `ds/text-field-web`; work only here, never in `/Users/hassansaid/Downloads/Biowave Design System/`). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
The latest round in Part E of 3-web-components/components/text-field/text-field.md (Round 2 — 2026-10-21 and its Planner response, plan 1.2), and 3-web-components/components/text-field/text-field-contract.md.

## Outputs (write only these)
The files in contract §9, plus a 'Fix round 2' entry in C8 of 3-web-components/components/text-field/text-field.md, the Code field in its header and in the 3-web-components/README.md table, and one CHANGELOG.md line.

## This step
Do the "Fix round 2 — Executor task list" under C7 (finding #9):
1. `FieldAction.tsx`: multiline trailing action `margin-block-start = max(action-inset − padding-block, (line-height − action-box) / 2)` from tokens only, so the action box is `spacing-xs` inside the top border at sm/md/lg (en and ar).
2. Tests: add the multiline case to the viewport test near `TextField.test.tsx:364` (sm/md/lg at 980 and 1280 px, action box inside the border) and update the first-line alignment test near :539 to the new rule.
3. C8 "Fix round 2" entry with every command result; correct the C8 Round 2 wording that still says MUI `Icon` (the code uses the Biowave `Icon`); set Code to `Built`.
Do not change anything else. Do not touch tablet, mobile or any `*-contract.md`.

## Notes from the user
- Approved at the after-plan gate.
- Known baseline: `npm run docs:check` reports 2 errors not owned by this unit (tablet + mobile `button-group` Figma contracts stale). docs:check passes if those 2 are the only errors.
- `node_modules` in this worktree links to the main checkout except `@biowave/*`, which point to this worktree — intended; do not change it.

## Checks to run
npm run docs:check · npm run typecheck · npm run test:web

Do not commit, push or switch branches. End with the Handoff block.

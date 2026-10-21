# Plan step — text-field / web

Project root: /Users/hassansaid/Downloads/Biowave Design System-text-field-web/biowave-ds (a git worktree on `ds/text-field-web`; work only here, never in `/Users/hassansaid/Downloads/Biowave Design System/`). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
3-web-components/README.md, every Part of 3-web-components/components/text-field/text-field.md (Review Round 2 — 2026-10-21 in Part E), and _templates/README.md.

## Outputs (write only these)
Parts A–D and F of 3-web-components/components/text-field/text-field.md and 3-web-components/components/text-field/text-field.tokens.json. Part A stays identical in the web, tablet and mobile files (AGENTS.md rule 10) — change Part A only if you must, and then in all three. One CHANGELOG.md entry.

## This step
Answer the Planner-owned findings of Round 2 with a Planner response under that round:
- **#9 🟡 multiline action covers the border.** Resolve the B2 conflict with one rule. Use the reviewer's recommendation: multiline trailing action `margin-block-start = max(action-inset − padding-block, (line-height − action-box) / 2)`, so the action box is never closer than `spacing-xs` (the action inset) to the top border at any size, and is centred on the first text line when that already leaves enough room. State the resulting offsets per size (sm/md/lg) in B2 and C3, and add to B9/C6 a multiline case in the viewport test (`TextField.test.tsx` near :364) that measures the action box inside the border at every size and both review viewports. Add a "Fix round 2 — Executor task list" under C7 (just #9 code + test).
- **#10 🟢** Update C3 "Icons" and B7 (and any other mention) to the Biowave `Icon` (`import { Icon } from '@biowave/web'` / the in-package import the code uses, `<Icon name="…" />`), matching the code since icon/web.
Bump the plan version in F (1.1 → 1.2), set Plan back to `Finished` in the header and the README table, then run the after-plan commands.

## Notes from the user
- Approved at the after-review gate: use the reviewer's recommended multiline rule.
- Known baseline: `npm run docs:check` reports 2 errors not owned by this unit (tablet + mobile `button-group` Figma contracts stale). Do not regenerate button-group. docs:check passes if those 2 are the only errors.

## Checks to run
npm run contract -- web text-field · npm run docs:check

Do not commit, push or switch branches. End with the Handoff block.

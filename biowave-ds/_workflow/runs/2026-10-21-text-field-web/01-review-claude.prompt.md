# Review step — text-field / web

Project root: /Users/hassansaid/Downloads/Biowave Design System-text-field-web/biowave-ds (a git worktree on `ds/text-field-web`; work only here, never in `/Users/hassansaid/Downloads/Biowave Design System/`). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
B, C7, C8 and E of 3-web-components/components/text-field/text-field.md, and the Text field code on `main` (`3-web-components/src/components/text-field/`; the C8 "Round 2 · spec 1.1" entry lists what changed since Round 1).

## Outputs (write only these)
A new 'Round 2 — 2026-10-21' block in Part E of 3-web-components/components/text-field/text-field.md (and the E1 summary row), plus the Review column of 3-web-components/README.md and the unit file header Review field. One line in CHANGELOG.md.

## This step
Review round 2. Close or re-open every Round 1 finding (#1–#8) and the addendum bugs AD-1 … AD-6 against plan 1.1 and the C8 "Round 2 · spec 1.1" entry, with file:line evidence. Check C7 AC-1 … AC-12. Verify, do not assume: AD-1/AD-2 — the trailing action box sits inside the border at `sm`/`md`/`lg` at both review viewports (below and above 1200 px); AD-3 — a disabled field's action is out of tab order and not clickable; `aria-*` reach the native input. Note that icon/web (merged after Round 1) changed `FieldAction.tsx` / built-in glyphs to the Biowave Icon — check AC-11/AC-12 against that. C8 says Code stayed `In progress`; say whether it should now be `Built`. Verdict: Approved or Changes requested.

## Notes from the user
- Known baseline: `npm run docs:check` reports 2 errors not owned by this unit (tablet + mobile `button-group` Figma contracts stale). Not findings.
- Earlier review runs in this project were cut off by API errors; keep any probing short and write the round as soon as you have the verdict.

## Checks to run
npm run docs:check · npm run typecheck · npm run test:web

Do not commit, push or switch branches. End with the Handoff block.

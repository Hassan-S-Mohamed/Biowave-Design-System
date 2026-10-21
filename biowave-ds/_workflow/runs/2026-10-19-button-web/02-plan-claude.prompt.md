# Plan step — button / web

Project root: biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
3-web-components/README.md, every Part of 3-web-components/components/button/button.md, and _templates/README.md. For #11 also read 2-foundations/web/src/BiowaveProvider.tsx and the web test setup it names (3-web-components/src/test/setup.ts, render.tsx, vitest.config.ts) to plan the fix. Do not change them.

## Outputs (write only these)
Parts A–D and F of 3-web-components/components/button/button.md and its button.tokens.json. Part A stays identical in web, tablet and mobile (AGENTS.md rule 10). Planner-owned E-section response: a "Planner response (2026-10-19)" block under E3, in the same style as the 2026-10-18 one. One CHANGELOG.md line.

## This step
Answer Round 2 Planner findings:
- **#11 🔴**: emotion `<style>` tags pile up per test file (non-speedy caches created once per module in `BiowaveProvider.tsx:44-45`), so axe and user-event get slow and `test:web` fails 73/77. Decide the shared fix, following standard emotion/MUI testing practice, not a guess. For example, a test-only cache with `speedy: true`, or a fresh cache per render that cleanup removes. Write it into C (code plan) as an exact Executor task with acceptance criteria. AC: `npm run test:web` as configured passes 77/77 with default timeouts, and the raised timeouts at `Button.test.tsx:202, 344, 610` are removed (#12). Name every file the Executor may touch, including the Foundations provider/test helper. Say it is shared tooling that unblocks Icon button, Split button and Text field.
- **#14 🟡**: stale tablet/mobile button-group Figma contracts. Run `npm run contract -- tablet button-group` and `npm run contract -- mobile button-group` (generator only, never by hand), and record it.
- Fold the Executor items #12, #13, #15, #16, #17 into C7/C8 guidance so the fix step has one list.
Set Plan back to `Finished` when done, then run the afterPlan commands.

## Notes from the user
Gate after-review: Approve. Planner findings go first.

## Checks to run
npm run contract -- web button · npm run docs:check

Do not commit, push or switch branches. End with the Handoff block.

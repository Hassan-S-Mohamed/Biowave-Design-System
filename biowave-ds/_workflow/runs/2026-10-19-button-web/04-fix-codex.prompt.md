# Fix step — button / web

Project root: /Users/hassansaid/Downloads/Biowave Design System/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
The latest round in Part E of 3-web-components/components/button/button.md (E3 Round 2 — 2026-10-19, and its Planner response 2026-10-19), and 3-web-components/components/button/button-contract.md.

## Outputs (write only these)
The files in contract §9, plus a 'Fix round 1' entry in C8 of 3-web-components/components/button/button.md.

## This step
Fix Round 2 findings #11, #12, #13, #15, #16, #17, which are the contract §11 Executor task list (AC-11 … AC-15). #11 is shared test tooling: a fresh speedy emotion cache per test, flushed after cleanup(). It touches `2-foundations/web/src/BiowaveProvider.tsx`, `2-foundations/web/src/index.ts`, `3-web-components/src/test/render.tsx`, `setup.ts`, and a new `render.test.tsx`. Do not change `vitest.config.ts` or any other unit's timeouts. Set Code to `Built`.

## Notes from the user
none

## Checks to run
npm run docs:check · npm run typecheck · npm run test:web (must pass 77/77 as configured, default timeouts in Button tests)

Do not commit, push or switch branches. End with the Handoff block.

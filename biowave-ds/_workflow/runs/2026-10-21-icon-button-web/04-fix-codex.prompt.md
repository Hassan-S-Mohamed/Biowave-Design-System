# Fix step — icon-button / web

Project root: /Users/hassansaid/Downloads/Biowave Design System/biowave-ds (main checkout, on branch `ds/icon-button-web`). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
The latest round in Part E of 3-web-components/components/icon-button/icon-button.md (Round 1 — 2026-10-21), and 3-web-components/components/icon-button/icon-button-contract.md.

## Outputs (write only these)
The files in contract §9 (only the four (1.1) files the contract's fix list allows), plus a "Fix round 1" entry in C8 of 3-web-components/components/icon-button/icon-button.md. One CHANGELOG.md entry. Code status → Built (header + 3-web-components/README.md) when done.

## This step
Do the contract's "Fix round 1 — Executor task list" (AC-7 … AC-11): Review Round 1 findings #1–#5 (🟡) and the 🟢 items the list includes (#7, #9). AC-7's precondition is already met: the shared per-test speedy Emotion cache from `ds/button-web` (PR #1) is on `main` and merged into this branch (`src/test/render.tsx` / `src/test/setup.ts` have `resetTestEmotionCaches`) — render through `renderWithBiowave`, default timeouts only, and do not edit `src/test/*`, `vitest.config.ts`, Button or any other component. Nothing outside the task list is in scope.

## Notes from the user
none

## Checks to run
- npm run docs:check
- npm run typecheck
- npm run test:web (run it 3 times for AC-11 and report passed/total and duration of each)

If your sandbox cannot run `test:web` (e.g. `.vite-temp` EPERM), say so in C8 and the Handoff; the orchestrator re-runs it.

Do not commit, push or switch branches. End with the Handoff block.

# Fix step — split-button / web

Project root: /Users/hassansaid/Downloads/Biowave Design System-split-button-web/biowave-ds (git worktree on branch `ds/split-button-web`; work only here). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
The latest round in Part E of 3-web-components/components/split-button/split-button.md (Round 1 — 2026-10-21), and 3-web-components/components/split-button/split-button-contract.md (plan 1.1, incl. the "Fix round 1 — Executor task list").

## Outputs (write only these)
The files in contract §9 that the fix list allows, plus a "Fix round 1" entry in C8 of 3-web-components/components/split-button/split-button.md. One CHANGELOG.md entry. Code status → Built (header + 3-web-components/README.md) when done.

## This step
Do the contract's "Fix round 1 — Executor task list" (AC-7, AC-8): Review Round 1 findings #1 (menu origins from the text direction: `end = isRtl ? 'left' : 'right'` for both `anchorOrigin` and `transformOrigin`), #2 (full suite green), #3 (B4 close motion), #4 (B9/B6 tests), #5 (no raised timeouts) and #8 (C8 note), and record #7 under Deviations as the contract says. The shared per-test speedy Emotion cache from `ds/button-web` (PR #1) is on `main` and merged into this branch — render through `renderWithBiowave`, default timeouts only, and do not edit `src/test/*`, `vitest.config.ts`, Button, Icon button or any other component. Nothing outside the task list is in scope.

## Notes from the user
none

## Checks to run
- npm run docs:check
- npm run typecheck
- npm run test:web (run it 3 times and report passed/total and duration of each)

If your sandbox cannot run `test:web` (e.g. `.vite-temp` EPERM), say so in C8 and the Handoff; the orchestrator re-runs it.

Do not commit, push or switch branches. End with the Handoff block.

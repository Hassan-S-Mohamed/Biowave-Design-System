# Fix step — button-group / web

Project root: /Users/hassansaid/Downloads/Biowave Design System-button-group-web/biowave-ds (git worktree on branch `ds/button-group-web`; work only here). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
The latest round in Part E of 3-web-components/components/button-group/button-group.md (Round 1, 2026-10-21), and 3-web-components/components/button-group/button-group-contract.md (plan 1.1, incl. the "Fix round 1 — Executor task list").

## Outputs (write only these)
The files in contract §9 (ButtonGroup.tsx, ButtonGroup.test.tsx), plus a 'Fix round 1' entry in C8 of button-group.md and one CHANGELOG.md entry.

## This step
Fix Review Round 1 findings #2, #3, #4, #7, #9, #10 and the Executor half of #8, exactly as the contract's fix list says. Precondition met: the shared per-test speedy Emotion cache from `ds/button-web` (PR #1) is on `main` and merged into this branch (4900ed8) — render through `renderWithBiowave`, remove the raised timeout, and do not edit `src/test/*`, `vitest.config.ts`, Button, Icon button or any other component. Also implement plan 1.1 #1 (container fills the parent's inline size so `align` works) if the contract's fix list includes it. Code status → Built (header + 3-web-components/README.md) when done.

## Notes from the user
none

## Checks to run
- npm run docs:check
- npm run typecheck
- npm run test:web (all green, default timeouts; run it 3 times and report passed/total and duration of each)

If your sandbox cannot run `test:web` (e.g. `.vite-temp` EPERM), say so in C8 and the Handoff; the orchestrator re-runs it.

Do not commit, push or switch branches. End with the Handoff block.

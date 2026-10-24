# Implement step — tooltip / web

Project root: /Users/hassansaid/Downloads/Biowave Design System-tooltip-web/biowave-ds (git worktree on branch `ds/tooltip-web`; work only here). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
3-web-components/components/tooltip/tooltip-contract.md only.

## Outputs (write only these)
The files in contract §9, plus C8 Execution log in 3-web-components/components/tooltip/tooltip.md. Code status In progress → Built (header + 3-web-components/README.md). One CHANGELOG.md entry.

## This step
Build the web Tooltip exactly from the contract (plan 1.0): code, tests, export from the package entry file. Tests render through the shared `renderWithBiowave` with default timeouts (fake timers where the contract says so); do not edit `src/test/*`, `vitest.config.ts` or other components — moving Icon button / Text field onto Tooltip is a later follow-up, not this step. Anything unclear goes in C8 → Questions; do not invent behaviour.

## Notes from the user
User approved at the after-plan gate: touch display time = framework (MUI) defaults; rich tooltips out of 1.0.

## Checks to run
- npm run docs:check
- npm run typecheck
- npm run test:web

If your sandbox cannot run `test:web`, say so in C8 and the Handoff; the orchestrator re-runs it.

Do not commit, push or switch branches. End with the Handoff block.

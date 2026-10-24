# Implement step — divider / web

Project root: /Users/hassansaid/Downloads/Biowave Design System-divider-web/biowave-ds (git worktree on branch `ds/divider-web`; work only here). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
3-web-components/components/divider/divider-contract.md only.

## Outputs (write only these)
The files in contract §9, plus C8 Execution log in 3-web-components/components/divider/divider.md. Code status In progress → Built (header + 3-web-components/README.md). One CHANGELOG.md entry.

## This step
Build the web Divider exactly from the contract (plan 1.1): code, tests, export from the package entry file. Tests render through the shared `renderWithBiowave` with default timeouts ; do not edit `src/test/*`, `vitest.config.ts` or other components. Anything unclear goes in C8 → Questions; do not invent behaviour.

## Notes from the user
User approved at the after-plan gate: `component="li"` is always aria-hidden. (Corrected after sending: the sent copy carried a leftover Tooltip note — touch display time, "rich dividers" — which does not apply to Divider.)

## Checks to run
- npm run docs:check
- npm run typecheck
- npm run test:web

If your sandbox cannot run `test:web`, say so in C8 and the Handoff; the orchestrator re-runs it.

Do not commit, push or switch branches. End with the Handoff block.

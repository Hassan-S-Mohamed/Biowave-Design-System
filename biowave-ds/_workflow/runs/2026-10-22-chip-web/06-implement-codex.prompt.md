# Implement step — chip / web

Project root: /Users/hassansaid/Downloads/Biowave Design System-chip-web/biowave-ds (git worktree on branch `ds/chip-web`; work only here). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
3-web-components/components/chip/chip-contract.md only.

## Outputs (write only these)
The files in contract §9, plus C8 Execution log in 3-web-components/components/chip/chip.md. Code status In progress → Built (header + 3-web-components/README.md). One CHANGELOG.md entry.

## This step
Build the web Chip exactly from the contract (plan 1.0): `assist`, `filter`, `input` and `tag` variants, code, tests, export from the package entry file. The `status` variant is out of build scope in 1.0 — do exactly what the contract says for it (render as a neutral tag + dev warning), nothing more. The input chip's leading avatar uses the Biowave `Avatar` and the remove control the Biowave `IconButton`, both now on `main` and merged into this branch — compose them through their public APIs; the `sm` chip with an avatar stays blocked as the contract says. Tests render through the shared `renderWithBiowave` with default timeouts; do not edit `src/test/*`, `vitest.config.ts` or other components. Anything unclear goes in C8 → Questions; do not invent behaviour.

## Notes from the user
User approved at the after-plan gate: Tag + Label = one `tag` variant; status later (plan 1.1).

## Checks to run
- npm run docs:check
- npm run typecheck
- npm run test:web

If your sandbox cannot run `test:web`, say so in C8 and the Handoff; the orchestrator re-runs it.

Do not commit, push or switch branches. End with the Handoff block.

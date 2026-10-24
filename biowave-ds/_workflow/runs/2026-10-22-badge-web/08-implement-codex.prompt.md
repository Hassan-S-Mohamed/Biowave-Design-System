# Implement step (continue after Codex usage limit) — badge / web

Project root: /Users/hassansaid/Downloads/Biowave Design System-badge-web/biowave-ds (git worktree on branch `ds/badge-web`; work only here). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
3-web-components/components/badge/badge-contract.md only.

## Outputs (write only these)
The files in contract §9, plus C8 Execution log in 3-web-components/components/badge/badge.md. Code status In progress → Built (header + 3-web-components/README.md). One CHANGELOG.md entry.

## This step
Build the web Badge exactly from the contract (plan 1.0): code, tests, export from the package entry file. Tests render through the shared `renderWithBiowave` with default timeouts; do not edit `src/test/*`, `vitest.config.ts` or other components. Anything unclear or impossible goes in C8 → Questions; do not invent behaviour.

## Notes from the user
Step 06 (Codex) and the Cursor retry both stopped partway (usage limits) with no Handoff. Its partial, uncommitted edits are in the working tree (`git status`, `git diff`): review them against the contract, keep what is right, fix or finish the rest. Do not start over unless the partial code is wrong. Other agents work in other folders at the same time; if test:web fails only by timeouts in files you did not touch, check `uptime` and re-run once.

## Checks to run
- npm run docs:check
- npm run typecheck
- npm run test:web

If your sandbox cannot run `test:web` (e.g. `.vite-temp` EPERM), say so in C8 and the Handoff; the orchestrator re-runs it.

Do not commit, push or switch branches. End with the Handoff block.

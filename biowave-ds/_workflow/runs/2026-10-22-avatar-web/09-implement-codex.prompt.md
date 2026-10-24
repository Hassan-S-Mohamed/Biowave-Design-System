# Implement step (continue after Codex usage limit) — avatar / web

Project root: /Users/hassansaid/Downloads/Biowave Design System-avatar-web/biowave-ds (git worktree on branch `ds/avatar-web`; work only here). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
3-web-components/components/avatar/avatar-contract.md only.

## Outputs (write only these)
The files in contract §9, plus C8 Execution log in 3-web-components/components/avatar/avatar.md. Code status In progress → Built (header + 3-web-components/README.md). One CHANGELOG.md entry.

## This step
Build the web Avatar exactly from the contract (plan 1.0): code, tests, export from the package entry file. Tests render through the shared `renderWithBiowave` with default timeouts; do not edit `src/test/*`, `vitest.config.ts` or other components. Anything unclear goes in C8 → Questions; do not invent behaviour.

## Notes from the user
Step 07 (Codex) and the Cursor retry stopped (usage limits) with no Handoff. Any partial, uncommitted edits are in the working tree (`git status`, `git diff`): review them against the contract, keep what is right, finish the rest; do not start over unless the partial work is wrong. User approved at the after-plan gate: initials rule (2 Latin, 1 Arabic script); sizes sm–xl only (no 2xl). Badge 1.0/1.1 is now on `main` and merged into this branch — compose it through its public API; if a field the contract relies on is missing, stop and ask in C8.

## Checks to run
- npm run docs:check
- npm run typecheck
- npm run test:web

If your sandbox cannot run `test:web`, say so in C8 and the Handoff; the orchestrator re-runs it.

Do not commit, push or switch branches. End with the Handoff block.

# Fix step (continue after Codex usage limit) — badge / web

Project root: /Users/hassansaid/Downloads/Biowave Design System-badge-web/biowave-ds (git worktree on branch `ds/badge-web`; work only here). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
The latest round in Part E of 3-web-components/components/badge/badge.md (Round 1 — 2026-10-24, with the Planner response for plan 1.1), and 3-web-components/components/badge/badge-contract.md (plan 1.1, incl. the "Fix round 1 — Executor task list").

## Outputs (write only these)
`3-web-components/src/components/badge/Badge.tsx`, `Badge.test.tsx`, a "Fix round 1" entry in C8 of 3-web-components/components/badge/badge.md, one CHANGELOG.md entry. Code status → Built (header + 3-web-components/README.md) when done.

## This step
Do the contract's "Fix round 1 — Executor task list" (AC-8 … AC-11): the plan 1.1 `count` × `warning` fill (`color-icon-role-warning`), a hidden standalone badge taking no space after its exit transition (instantly under reduced motion, and from first paint when it starts hidden), drop the unreachable check-icon token for `error`/`warning` (#4), and rewrite the three declaration-only B9 tests to check behaviour (#5). Default timeouts; do not edit `src/test/*`, `vitest.config.ts` or other components.

## Notes from the user
Step 12 (Codex) stopped partway (usage limit) with no Handoff. Its partial, uncommitted edits are in the working tree (`Badge.tsx` changed, tests not yet; 2 Badge tests fail): review them against the contract, keep what is right, finish the rest.

## Checks to run
- npm run docs:check
- npm run typecheck
- npm run test:web

If your sandbox cannot run `test:web`, say so in C8 and the Handoff; the orchestrator re-runs it.

Do not commit, push or switch branches. End with the Handoff block.

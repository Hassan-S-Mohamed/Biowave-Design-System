# Fix step — badge / web

Project root: /Users/hassansaid/Downloads/Biowave Design System-badge-web/biowave-ds (git worktree on branch `ds/badge-web`; work only here). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
The latest round in Part E of 3-web-components/components/badge/badge.md (Round 2 — 2026-10-24), and 3-web-components/components/badge/badge-contract.md (plan 1.1).

## Outputs (write only these)
`3-web-components/src/components/badge/Badge.tsx`, `Badge.test.tsx`, a "Fix round 2" entry in C8 of 3-web-components/components/badge/badge.md, one CHANGELOG.md entry. Code status → Built (header + 3-web-components/README.md) when done.

## This step
Fix Review Round 2 findings: **#1** 🟡 a standalone badge that is shown and hidden again within about one frame (e.g. `count` 0 → 1 → 0) never receives `transitionend` and keeps its space. Collapse at once whenever no exit transition can run (already at scale 0 / no running transition), also handle `transitioncancel`, and add a test for the fast show-then-hide case (0 ms and ~16 ms) — the existing normal-path, reduced-motion and first-paint behaviour must not change. **#2** 🟢 the anchor-box test also asserts the badge root adds no padding or border (B9). Default timeouts; do not edit `src/test/*`, `vitest.config.ts` or other components.

## Notes from the user
none. This is the last fix round allowed.

## Checks to run
- npm run docs:check
- npm run typecheck
- npm run test:web

If your sandbox cannot run `test:web`, say so in C8 and the Handoff; the orchestrator re-runs it.

Do not commit, push or switch branches. End with the Handoff block.

# Fix step — link / web

Project root: /Users/hassansaid/Downloads/Biowave Design System-link-web/biowave-ds (git worktree on branch `ds/link-web`; work only here). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
The latest round in Part E of 3-web-components/components/link/link.md (Round 1 — 2026-10-24), and 3-web-components/components/link/link-contract.md.

## Outputs (write only these)
The files in contract §9, plus a "Fix round 1" entry in C8 of 3-web-components/components/link/link.md (and its header Source code field, #4). One CHANGELOG.md entry. Code status → Built (header + 3-web-components/README.md) when done.

## This step
Fix Review Round 1 findings #1 🟡 (remove the external-link `aria-label` branch so the accessible name is the visible label plus the B6 visually hidden suffix span; a consumer's own `aria-label` is passed through unchanged), #2 🟢 (drop `tabIndex={-1}` on disabled links; update the tests at Link.test.tsx:398 and :578), #3 🟢 (make the non-string children warning test prove its own warning, e.g. reset the `warnOnce` cache or use a separate key), #4 🟢 (header Source code). Default timeouts; do not edit `src/test/*`, `vitest.config.ts` or other components. The two spec gaps the reviewer noted for the Planner are out of scope.

## Notes from the user
none

## Checks to run
- npm run docs:check
- npm run typecheck
- npm run test:web

If your sandbox cannot run `test:web`, say so in C8 and the Handoff; the orchestrator re-runs it.

Do not commit, push or switch branches. End with the Handoff block.

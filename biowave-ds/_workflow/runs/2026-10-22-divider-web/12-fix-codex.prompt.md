# Fix step — divider / web

Project root: /Users/hassansaid/Downloads/Biowave Design System-divider-web/biowave-ds (git worktree on branch `ds/divider-web`; work only here). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
The latest round in Part E of 3-web-components/components/divider/divider.md (Round 1 — 2026-10-24), and 3-web-components/components/divider/divider-contract.md.

## Outputs (write only these)
`3-web-components/src/components/divider/Divider.tsx`, `Divider.test.tsx`, a "Fix round 1" entry in C8 of 3-web-components/components/divider/divider.md, one CHANGELOG.md entry. Code status → Built (header + 3-web-components/README.md) when done.

## This step
Fix Review Round 1 Executor findings: **#1** 🔴 an unlabelled `component="li"` divider keeps `display: list-item` and a disc bullet inside a `<ul>` (23–25 px tall instead of one `border-width-default` line): reset the list styling on the root (`list-style: none`, block display, no margin/padding of its own) so it renders exactly like the `hr` divider; add a test that checks `list-style` none and the rendered height/border in EN and AR. **#2** 🟢 assert the Arabic label padding from the computed style, not the rule text. Default timeouts; do not edit `src/test/*`, `vitest.config.ts` or other components.

## Notes from the user
none

## Checks to run
- npm run docs:check
- npm run typecheck
- npm run test:web

If your sandbox cannot run `test:web`, say so in C8 and the Handoff; the orchestrator re-runs it.

Do not commit, push or switch branches. End with the Handoff block.

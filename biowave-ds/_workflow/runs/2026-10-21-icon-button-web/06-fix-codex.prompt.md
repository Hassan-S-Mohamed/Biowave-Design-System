# Fix step — icon-button / web

Project root: /Users/hassansaid/Downloads/Biowave Design System/biowave-ds (main checkout, on branch `ds/icon-button-web`). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
The latest round in Part E of 3-web-components/components/icon-button/icon-button.md (Round 2 — 2026-10-21), and 3-web-components/components/icon-button/icon-button-contract.md.

## Outputs (write only these)
`3-web-components/src/components/icon-button/IconButton.test.tsx` (the only code file these findings need; touch other contract §9 files only if a finding truly requires it), plus a "Fix round 2" entry in C8 of 3-web-components/components/icon-button/icon-button.md. One CHANGELOG.md entry. Code status → Built (header + 3-web-components/README.md) when done.

## This step
Fix Review Round 2 findings: **#10** 🟡 the render-matrix test ("renders every supported variant, color, and size…") must run well under the 5 s default: read `allCssRules()` once per render and pass it to `cssRulesFor`, and split the test into one `it` per theme × locale; **#11** 🟢 run the open-tooltip axe case on `baseElement` so the portalled tooltip is checked. Default timeouts only; do not edit `src/test/*`, `vitest.config.ts` or other components.

## Notes from the user
none. **Do not touch** the uncommitted changes another session left in this checkout: `_docs/live.tsx`, `_docs/tsconfig.json`, `package.json` and the CHANGELOG entry "Docs — live previews on the Biowave Icon". Add your CHANGELOG entry at the top, above theirs. This is the last fix round allowed.

## Checks to run
- npm run docs:check
- npm run typecheck
- npm run test:web (run it 3 times; report passed/total, duration, and the slowest Icon button test time of each)

If your sandbox cannot run `test:web` (e.g. `.vite-temp` EPERM), say so in C8 and the Handoff; the orchestrator re-runs it.

Do not commit, push or switch branches. End with the Handoff block.

# Review step — icon-button / web

Project root: /Users/hassansaid/Downloads/Biowave Design System/biowave-ds (main checkout, on branch `ds/icon-button-web`). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
B, C7, C8 and E of 3-web-components/components/icon-button/icon-button.md, and the code changed on this branch (`git diff main...HEAD -- 3-web-components/src`; fix round 2 is the latest commit).

## Outputs (write only these)
A new 'Round 3 — 2026-10-21' block in Part E of 3-web-components/components/icon-button/icon-button.md, the Review column of 3-web-components/README.md (and the header field it mirrors; set Code to Approved or Changes requested accordingly), and one CHANGELOG.md entry (at the top).

## This step
Review round 3: check that Round 2 findings #10 (render-matrix test well under the 5 s default; run the full `test:web` at least 3 times) and #11 (open-tooltip axe on `baseElement`) are fixed, that AC-5/AC-7 are now met, and that nothing new broke. The behaviour you measured in Round 2 did not change in this round (test file only) — re-measure only if the diff touches source files.

## Notes from the user
none. **Do not touch** the uncommitted changes another session left in this checkout: `_docs/live.tsx`, `_docs/tsconfig.json`, `package.json` and the CHANGELOG entry "Docs — live previews on the Biowave Icon". Other test suites may run at the same time in other checkouts; if test:web fails only by timeouts in files this branch does not touch, re-run once before calling it a finding.

## Checks to run
- npm run docs:check
- npm run typecheck
- npm run test:web

Do not commit, push or switch branches. End with the Handoff block (Step, Unit, Result, Verdict, Files changed, Checks, Questions).

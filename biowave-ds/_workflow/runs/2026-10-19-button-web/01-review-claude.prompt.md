# Review step — button / web

Project root: biowave-ds (repo `Biowave Design System/biowave-ds`). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
B, C7, C8 and E of 3-web-components/components/button/button.md, and the code changed on this branch (since Round 1 — 2026-10-16: the C8 "Round 2 — 2026-10-18" entry lists the files).

## Outputs (write only these)
A new 'Round 2 — 2026-10-19' block in Part E of 3-web-components/components/button/button.md (and the E1 summary row), plus the Review column of 3-web-components/README.md and the unit file header Review field. One line in CHANGELOG.md.

## This step
Review round 2. Close or re-open every Round 1 finding (#1–#10) against the Planner response (2026-10-18) and the C8 Round 2 log, with file:line evidence. Check C7 acceptance criteria incl. AC-9/AC-10. Known risk to verify, not assume: the C8 Round 2 log of Text field reports that the exact parallel `npm run test:web` times out in Button / Icon button / Split button tests. Reproduce it, find the cause, and record it as a finding with an owner if it is real. Verdict: Approved or Changes requested.

## Notes from the user
none

## Checks to run
npm run docs:check · npm run typecheck · npm run test:web (fresh `npm ci` on Linux; the repo's node_modules are macOS builds). Flutter checks are not part of the web unit.

Do not commit, push or switch branches. End with the Handoff block.

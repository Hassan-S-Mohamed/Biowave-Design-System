# Review step — button-group / web

Project root: /Users/hassansaid/Downloads/Biowave Design System-button-group-web/biowave-ds (git worktree on branch `ds/button-group-web`; work only here). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
B, C7, C8 and E of 3-web-components/components/button-group/button-group.md, and the code changed on this branch (`git diff origin/main...HEAD -- 3-web-components/src`; fix round 2 is commit 8e3d7be; `main` with Icon button #9 and Split button #10 is merged in, 53bf993).

## Outputs (write only these)
A new 'Round 3 — 2026-10-21' block in Part E of 3-web-components/components/button-group/button-group.md, the Review column of 3-web-components/README.md (and the header field it mirrors; set Code to Approved or Changes requested accordingly), and one CHANGELOG.md entry.

## This step
Review round 3: check that Round 2 findings #12 (vertical ignores `align`; vertical + `align="fill"` keeps normal button heights — measure in a real browser), #13 (B1 "Overflow counting" in plan 1.2 — check every row of the B1 examples table, in a real browser if you can, and the dev warning) and #14 (`fill` asserted from the rendered style) are fixed; that AC-12 … AC-14 are met with real numbers in C8; that Round 2's verified `align` behaviour still holds in LTR and RTL; and that nothing new broke. Fix round 2 was the last one allowed, so make the verdict precise: anything you would block on must be a real defect against the spec.

## Notes from the user
none. The machine has been under heavy load: if test:web fails only by timeouts in files this branch does not touch, check the load (`uptime`) and re-run once before calling it a finding.

## Checks to run
- npm run docs:check
- npm run typecheck
- npm run test:web

Do not commit, push or switch branches. End with the Handoff block (Step, Unit, Result, Verdict, Files changed, Checks, Questions).

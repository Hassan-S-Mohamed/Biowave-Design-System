# Review step — split-button / web

Project root: /Users/hassansaid/Downloads/Biowave Design System-split-button-web/biowave-ds (git worktree on branch `ds/split-button-web`; work only here). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
B, C7, C8 and E of 3-web-components/components/split-button/split-button.md, and the code changed on this branch (`git diff main...HEAD -- 3-web-components/src`; the fix round is the latest commit).

## Outputs (write only these)
A new 'Round 2 — 2026-10-21' block in Part E of 3-web-components/components/split-button/split-button.md, the Review column of 3-web-components/README.md (and the header field it mirrors; set Code to Approved or Changes requested accordingly), and one CHANGELOG.md entry.

## This step
Review round 2: check that every Round 1 finding is fixed — #1 (menu anchored `bottom-end` logical: measure in a real browser that the menu aligns to the right in English and the left in Arabic, and scales from its top-end corner), #2 (full `test:web` green at default timeouts), #3 (B4 close: `motion-duration-sm` + `standard-accelerate`), #4 (B9/B6 tests), #5 (no raised timeouts), #8 (C8), #6/#7 closed by plan 1.1 (#7 recorded under Deviations) — AC-7/AC-8 are met with real numbers in C8, and nothing new broke (tokens only, RTL logical properties, both themes and languages, WCAG 2.2 AA, no edits to `src/test/*` or other components).

## Notes from the user
none. Other test suites may be running on this machine at the same time (two other checkouts); if test:web fails only by timeouts in files this branch does not touch, re-run it once before calling it a finding.

## Checks to run
- npm run docs:check
- npm run typecheck
- npm run test:web

Do not commit, push or switch branches. End with the Handoff block (Step, Unit, Result, Verdict, Files changed, Checks, Questions).

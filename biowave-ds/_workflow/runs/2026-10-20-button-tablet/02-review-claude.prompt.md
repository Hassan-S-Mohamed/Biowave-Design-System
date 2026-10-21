# Review step — button / tablet

Project root: /Users/hassansaid/Downloads/Biowave Design System/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
B, C7, C8 and E of 4-tablet-components/components/button/button.md, and the code changed on this branch (`git diff main...HEAD`: the C8 entry lists the files).

## Outputs (write only these)
A new 'Round 1 — 2026-10-20' block in Part E of 4-tablet-components/components/button/button.md (and the E1 summary row), plus the Review column of 4-tablet-components/README.md and the unit file header Review field. One line in CHANGELOG.md.

## This step
Review round 1 of the first Flutter tablet component. Check every C7 acceptance criterion (contract §11 AC-1 … AC-7) with file:line evidence: API matches B1; every value from tokens (no raw values, no `BwPalette`); transitions and reduced motion; RTL; focus ring only in keyboard mode; loading keeps focus, blocks presses and announces once; exact heights per size; no ink splash. Check that the goldens really cover light/dark × en/ar and that the tests assert what §10 asks, not just that they run. Shared pieces (`BwControlSize`, `bw_focus_ring.dart`, `pumpBw`) will be reused by later components — say if their shape will cause trouble. Verdict: Approved or Changes requested.

## Notes from the user
- Known baseline: `npm run docs:check` reports 2 errors that are not this unit's — the `tablet` and `mobile` `button-group` Figma contracts are stale (fixed on `ds/button-web`, PR #1, not merged). Do not raise them as findings; record them as baseline.

## Checks to run
cd 4-tablet-components && flutter analyze && flutter test · npm run component-tokens · npm run sync · npm run docs:check

Do not commit, push or switch branches. End with the Handoff block.

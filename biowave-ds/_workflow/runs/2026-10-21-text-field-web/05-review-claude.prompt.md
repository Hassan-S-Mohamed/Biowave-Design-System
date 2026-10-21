# Review step — text-field / web

Project root: /Users/hassansaid/Downloads/Biowave Design System-text-field-web/biowave-ds (a git worktree on `ds/text-field-web`; work only here, never in `/Users/hassansaid/Downloads/Biowave Design System/`). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
B, C7, C8 and E of 3-web-components/components/text-field/text-field.md, and the code changed since Round 2 (`git diff 30d4253..HEAD -- 3-web-components/src`; the C8 "Fix round 2" entry lists the files).

## Outputs (write only these)
A new 'Round 3 — 2026-10-21' block in Part E of 3-web-components/components/text-field/text-field.md (and the E1 summary row), plus the Review column of 3-web-components/README.md and the unit file header Review field. One line in CHANGELOG.md.

## This step
Review round 3. Close or re-open Round 2 findings #9 and #10 with file:line evidence, and re-check AC-10 (and any AC the diff touches). Verify, do not assume:
- **#9:** measure in real Chromium (throw-away page outside the repo, as in Round 2) that the multiline trailing action box sits `spacing-xs` inside the top border at sm/md/lg, at 980 and 1280 px, in en and ar, and that the new test would fail if the inset went back to first-line centring. The test count stayed at 87 — check the multiline case really was added and asserts the box, not just that it runs.
- **RTL attachments (asked by the user):** in Arabic (dir rtl), check in the real component which side the **prefix** add-on, the **suffix** add-on and the **end button** render on, against B5 ("add-ons and end button swap sides"). The dark/ar preview drew the `http://` prefix on the end (left) side; say whether the real component does the same. If it is wrong, raise it as a finding.
Verdict: Approved or Changes requested.

## Notes from the user
- D3 (Figma Text area tree still says "centre on first line") is deliberately left until Text field tablet/mobile are planned. Not a finding.
- Known baseline: `npm run docs:check` reports 2 errors not owned by this unit (tablet + mobile `button-group` Figma contracts stale). Not findings.
- Keep probing short and write the round as soon as you have the verdict.

## Checks to run
npm run docs:check · npm run typecheck · npm run test:web

Do not commit, push or switch branches. End with the Handoff block.

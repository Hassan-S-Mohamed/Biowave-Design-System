# Review step — icon / web (round 2)

Project root: /Users/hassansaid/Downloads/Biowave Design System/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
B, C7, C8 and E of 3-web-components/components/icon/icon.md, and the code changed on this branch (git diff main...ds/icon-web; the fix is the latest fix(icon/web) commit).

## Outputs (write only these)
A new 'Round 2 — 2026-10-20' block in Part E of 3-web-components/components/icon/icon.md, plus the Review column of 3-web-components/README.md (and a CHANGELOG.md line).

## This step
Review icon/web round 2 against plan 1.1 acceptance criteria (C7) and AGENTS.md. Check each Round 1 finding (#1–#5) is resolved, and look for anything new. Verdict + findings table (severity 🔴/🟡/🟢, owner).

## Notes from the user
Goal of the run: every icon in the design system is a Google Material Symbol (D-18). Orchestrator notes: (a) the extended noLegacyIcons guard was probe-tested and catches a planted `material-symbols-rounded` use; (b) the Button "no axe violations ... light" test took 18 s against a 20 s timeout (≈10 s before this branch) and timed out once — judge whether the fix made it slower and whether that is a finding; (c) `docs:check` fails only on stale tablet/mobile button-group Figma contracts, pre-existing on main and out of scope — note it, don't count it.

## Checks to run
- npm run docs:check
- npm run typecheck
- npm run test:web

Do not commit, push or switch branches. End with the Handoff block.

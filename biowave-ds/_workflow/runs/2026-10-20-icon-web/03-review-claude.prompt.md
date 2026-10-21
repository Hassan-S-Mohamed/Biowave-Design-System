# Review step — icon / web

Project root: /Users/hassansaid/Downloads/Biowave Design System/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
B, C7, C8 and E of 3-web-components/components/icon/icon.md, and the code changed on this branch (git diff main...ds/icon-web).

## Outputs (write only these)
A new 'Round 1 — 2026-10-20' block in Part E of 3-web-components/components/icon/icon.md, plus the Review column of 3-web-components/README.md (and a CHANGELOG.md line).

## This step
Review icon/web round 1 against the acceptance criteria (contract §11 / C7) and AGENTS.md. Give a verdict and a findings table (severity 🔴/🟡/🟢, owner Executor or Planner).

## Notes from the user
The goal of this run: every icon used in the design system must be a Google Material Symbol (D-18). Check explicitly that no web component source renders an icon from any other source (`@mui/icons-material`, inline SVG glyphs, other icon fonts, or direct `material-symbols-rounded` markup outside `src/components/icon/`). Also judge the implementer's open question: should Button/IconButton strip Icon's `directional` prop like `mirrorInRtl`?
Known, pre-existing and out of scope: `docs:check` fails only on stale tablet/mobile button-group Figma contracts (also fails on main). Do not count it against this unit; record it as a note.

## Checks to run
- npm run docs:check
- npm run typecheck
- npm run test:web

Do not commit, push or switch branches. End with the Handoff block.

# Review step — avatar / web

Project root: /Users/hassansaid/Downloads/Biowave Design System-avatar-web/biowave-ds (git worktree on branch `ds/avatar-web`; work only here). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
B, C7, C8 and E of 3-web-components/components/avatar/avatar.md, and the code changed on this branch (`git diff origin/main...HEAD -- 3-web-components/src`).

## Outputs (write only these)
A new 'Round 1 — <today's date>' block in Part E of 3-web-components/components/avatar/avatar.md, the Review column of 3-web-components/README.md (and the header field it mirrors; set Code to Approved or Changes requested accordingly), and one CHANGELOG.md entry.

## This step
First review round for avatar/web against C7, the B9 test list and AGENTS.md rules (tokens only, RTL logical properties, both themes and languages, WCAG 2.2 AA, Biowave `Icon` for the `person` glyph, tests through `renderWithBiowave` with default timeouts). Measure in a real (headless) browser: sizes sm–xl (32/40/48/56), circle vs square radius, the three colours and their contrast in both themes, image → initials → glyph fallback (loading and failed image), initials (`Sara Ali` → `SA`, `سارة علي` → `س`, custom initials), the Badge composed through its public API (placement/overlap per shape, LTR and RTL), `decorative` vs named image role, never focusable.

## Notes from the user
User approved: initials 2 Latin / 1 Arabic script; sizes sm–xl only. If test:web fails only by timeouts in files this branch does not touch, check `uptime` and re-run once. Clean up only processes you started (by PID); use a port no one else uses.

## Checks to run
- npm run docs:check
- npm run typecheck
- npm run test:web

Do not commit, push or switch branches. End with the Handoff block (Step, Unit, Result, Verdict, Files changed, Checks, Questions).

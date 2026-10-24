# Review step — link / web

Project root: /Users/hassansaid/Downloads/Biowave Design System-link-web/biowave-ds (git worktree on branch `ds/link-web`; work only here). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
B, C7, C8 and E of 3-web-components/components/link/link.md, and the code changed on this branch (`git diff origin/main...HEAD -- 3-web-components/src`).

## Outputs (write only these)
A new 'Round 1 — <today's date>' block in Part E of 3-web-components/components/link/link.md, the Review column of 3-web-components/README.md (and the header field it mirrors; set Code to Approved or Changes requested accordingly), and one CHANGELOG.md entry.

## This step
First review round for link/web against the contract's acceptance criteria (C7), the B9 test list and AGENTS.md rules: tokens only, RTL logical properties, both themes and languages, WCAG 2.2 AA, Biowave `Icon` per D-18 (no `@mui/icons-material`), tests through `renderWithBiowave` with default timeouts. Measure dimensions, colours, focus and RTL in a real (headless) browser where the spec gives numbers. The build went through three agents (Codex stopped by a usage limit, Cursor stopped, Codex finished from the partial code) — check for leftovers.

## Notes from the user
none. Other agents may run tests at the same time; if test:web fails only by timeouts in files this branch does not touch, check `uptime` and re-run once before calling it a finding.

## Checks to run
- npm run docs:check
- npm run typecheck
- npm run test:web

Do not commit, push or switch branches. End with the Handoff block (Step, Unit, Result, Verdict, Files changed, Checks, Questions).

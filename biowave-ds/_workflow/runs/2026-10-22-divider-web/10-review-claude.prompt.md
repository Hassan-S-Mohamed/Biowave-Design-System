# Review step — divider / web

Project root: /Users/hassansaid/Downloads/Biowave Design System-divider-web/biowave-ds (git worktree on branch `ds/divider-web`; work only here). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
B, C7, C8 and E of 3-web-components/components/divider/divider.md (plan 1.1), and the code changed on this branch (`git diff origin/main...HEAD -- 3-web-components/src`).

## Outputs (write only these)
A new 'Round 1 — <today's date>' block in Part E of 3-web-components/components/divider/divider.md, the Review column of 3-web-components/README.md (and the header field it mirrors; set Code to Approved or Changes requested accordingly), and one CHANGELOG.md entry.

## This step
First review round for divider/web against C7, the B9 test list and AGENTS.md rules (tokens only, RTL logical properties, both themes and languages, WCAG 2.2 AA, tests through `renderWithBiowave` with default timeouts). Measure in a real (headless) browser: line thickness `border-width-default`, the three emphasis colours in both themes, inset none/start/both (`spacing-xl`, start flips in RTL, vertical + start falls back), vertical in a flex row, the 1.1 label (`caption-md`, `color-text-neutral-muted`, gap `spacing-md`, segments ≥ `spacing-xl`, long label wraps, never on vertical), and the accessibility tree: `<hr>` separator, vertical `aria-orientation`, `decorative` hidden, labelled divider `<div role="separator" aria-label>`, `component="li"` → `<li role="separator" aria-hidden="true">` with axe passing inside a `<ul>`.

## Notes from the user
User approved: `component="li"` is always aria-hidden. If test:web fails only by timeouts in files this branch does not touch, check `uptime` and re-run once. Clean up only processes you started (by PID); use a port no one else uses.

## Checks to run
- npm run docs:check
- npm run typecheck
- npm run test:web

Do not commit, push or switch branches. End with the Handoff block (Step, Unit, Result, Verdict, Files changed, Checks, Questions).

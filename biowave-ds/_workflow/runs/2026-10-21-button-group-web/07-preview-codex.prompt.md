# Preview step — button-group / web

Project root: /Users/hassansaid/Downloads/Biowave Design System-button-group-web/biowave-ds (git worktree on branch `ds/button-group-web`; work only here). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
A2, A4, A5, A6, B1 (the new "Overflow counting" rule and its examples table), B2, B3 and B5 of 3-web-components/components/button-group/button-group.md (no tokens.json of its own); B3 of 3-web-components/components/button/button.md and 3-web-components/components/button/button.tokens.json; resolved values in 2-foundations/dist/tokens.json (theme.light, theme.dark, platform.web, base). The 1.1 sheets in the previews folder are the starting point.

## Outputs (write only these)
Replace the preview images and update README.md (token sheet, prompts, check results) in 3-web-components/components/button-group/previews/. One CHANGELOG.md line.

## This step
Redraw the web Button group sheets for plan 1.2. Keep the 1.1 sections (align row inside visible full-width parent frames, sizes, vertical, overflow), and change:
- **Overflow counting (new, B1):** draw each row of the B1 examples table as its own specimen with a caption, e.g. `maxVisible=1`, `[Docs (href), Cancel, Save (filled)]` → Docs and Save visible, `more` trigger, Cancel in the open menu; `maxVisible=3`, `[Docs (href), Delete, Cancel, Save]` → Docs, Cancel, Save visible, Delete in the menu; always-visible alone over the limit → all visible, no trigger. Never more visible actions than the rule allows.
- **Vertical + `align="fill"` (#12):** a vertical group with `align="fill"` looks exactly like default vertical — full-width buttons at their normal height (`align` is ignored in vertical).
- `fill` (horizontal): the two children must be exactly equal width.
- Make `end`, `start` and `center` clearly different: wide parent frames with the frame edge visible.
- Dark/ar image: Arabic labels, RTL mirroring as B5.
Note any value you could not render exactly with ⚠ in README.md.

## Notes from the user
none

## Checks to run
none

## Preview images (preview step only)
Folder: 3-web-components/components/button-group/previews. One image per entry: light + en → `button-group-light-en.jpg`; dark + ar → `button-group-dark-ar.jpg`. Max width: 1600 px. JPEG quality: 85.

Do not commit, push or switch branches. End with the Handoff block.

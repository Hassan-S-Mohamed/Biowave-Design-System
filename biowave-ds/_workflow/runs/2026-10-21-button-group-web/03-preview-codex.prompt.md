# Preview step — button-group / web

Project root: /Users/hassansaid/Downloads/Biowave Design System-button-group-web/biowave-ds (git worktree on branch `ds/button-group-web`; work only here). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
A2, A4, A5, A6, B2, B3 and B5 of 3-web-components/components/button-group/button-group.md (Button group has no tokens.json of its own); B3 of 3-web-components/components/button/button.md and 3-web-components/components/button/button.tokens.json (the actions are Biowave Buttons and Icon buttons); resolved values in 2-foundations/dist/tokens.json (theme.light, theme.dark, platform.web, base).

## Outputs (write only these)
Preview images and README.md (token sheet, prompts, check results) in 3-web-components/components/button-group/previews/. One CHANGELOG.md line.

## This step
Draw the web Button group from plan 1.1 with exact token values, each specimen inside a visible parent frame (plan 1.1 #1: the group container fills its parent's inline size, so `align` is visible):
- Horizontal `align` row: `end` (default), `start`, `center`, `space-between` (Back … Next), `fill`; a dialog-footer example with one `filled` primary + one `outlined`/`text` secondary.
- `size` sm / md / lg (one size for all actions; group size wins over each action's size).
- `vertical` orientation, full width.
- Overflow: more than 3 actions → the overflow trigger (Icon button, more menu) with the remaining actions in an open menu; `href` / submit actions stay visible (B1).
- Gap and wrapping per B2.
- Dark/ar image: Arabic labels, RTL — the order and `start`/`end` alignment mirror (B5).
Note any value you could not render exactly with ⚠ in README.md.

## Notes from the user
none

## Checks to run
none

## Preview images (preview step only)
Folder: 3-web-components/components/button-group/previews. One image per entry: light + en → `button-group-light-en.jpg`; dark + ar → `button-group-dark-ar.jpg`. Max width: 1600 px. JPEG quality: 85.

Do not commit, push or switch branches. End with the Handoff block.

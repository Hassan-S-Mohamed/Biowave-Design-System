# Preview step — icon-button / web

Project root: /Users/hassansaid/Downloads/Biowave Design System/biowave-ds (main checkout, on branch `ds/icon-button-web`). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
A2, A4, A5, A6, B2, B3 and B5 of 3-web-components/components/icon-button/icon-button.md (Icon button has no tokens.json of its own); B3 of 3-web-components/components/button/button.md and 3-web-components/components/button/button.tokens.json (Icon button B3.1/B3.5 reuse Button's tokens); resolved values in 2-foundations/dist/tokens.json (theme.light, theme.dark, platform.web, base).

## Outputs (write only these)
Preview images and README.md (token sheet, prompts, check results) in 3-web-components/components/icon-button/previews/. One CHANGELOG.md line.

## This step
Draw the web Icon button from plan 1.1 with exact token values:
- Variant × color grid at md: `filled`, `tonal`, `outlined`, `text` × `brand`, `secondary`, `neutral`, `error`, `inverse` (inverse on an inverse surface). Leave out the combinations A4 forbids (`tonal` with `neutral` or `inverse`).
- Sizes sm / md / lg (square container, `radius-md`, icon `size-icon-sm/md/lg`). No `xl` on web.
- States row: default, hover, pressed, focus (focus ring width + offset), disabled, loading (spinner).
- Toggle (text and outlined only): unselected vs selected (filled glyph, B3.2 selected fill) for brand and neutral.
- The temporary tooltip (B3.4) shown above one button, offset `spacing-xs`.
- Dark/ar image: Arabic tooltip labels, RTL layout; directional icons (arrow_forward, chevron_right, undo) mirror, non-directional icons (close, edit, delete, more_vert, search) do not (B5).
Note any value you could not render exactly with ⚠ in README.md.

## Notes from the user
none

## Checks to run
none

## Preview images (preview step only)
Folder: 3-web-components/components/icon-button/previews. One image per entry: light + en → `icon-button-light-en.jpg`; dark + ar → `icon-button-dark-ar.jpg`. Max width: 1600 px. JPEG quality: 85.

Do not commit, push or switch branches. End with the Handoff block.

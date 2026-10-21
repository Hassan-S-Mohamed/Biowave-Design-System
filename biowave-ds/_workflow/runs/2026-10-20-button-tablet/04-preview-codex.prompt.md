# Preview step — button / tablet

Project root: /Users/hassansaid/Downloads/Biowave Design System-button-tablet/biowave-ds (a git worktree on `ds/button-tablet`; work only here). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
A2, A4, A5, A6, B2, B3 and B5 of 4-tablet-components/components/button/button.md; 4-tablet-components/components/button/button.tokens.json; resolved values in 2-foundations/dist/tokens.json (theme.light, theme.dark, platform.tablet, base).

## Outputs (write only these)
Preview images and README.md (token sheet, prompts, check results) in 4-tablet-components/components/button/previews/. One CHANGELOG.md line.

## This step
Draw the tablet Button from plan 1.1 with exact token values: every variant (filled, tonal, outlined, text) × color (brand, secondary, neutral, error, inverse) at `lg`, the four sizes for filled brand, and the states row (default, hovered, pressed, focused, disabled, loading). Show the focus ring as plan 1.1 defines it: outside the visible container with a `focusOffset` gap, stroke `widthFocus`, radius = container radius + offset — never around the 48dp touch area. Arabic labels in the dark/ar image, RTL layout, directional icons mirrored. Note any value you could not render exactly with ⚠ in README.md.

## Notes from the user
none

## Checks to run
none

## Preview images (preview step only)
Folder: 4-tablet-components/components/button/previews. One image per entry: light + en → `button-light-en.jpg`; dark + ar → `button-dark-ar.jpg`. Max width: 1600 px. JPEG quality: 85.

Do not commit, push or switch branches. End with the Handoff block.

# Preview step — chip / tablet

Project root: /Users/hassansaid/Downloads/Biowave Design System-chip-web/biowave-ds (git worktree on branch `ds/chip-web`; work only here). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
A2, A4, A5, A6, B2, B3 and B5 of 4-tablet-components/components/chip/chip.md; 4-tablet-components/components/chip/chip.tokens.json if it exists; resolved values in 2-foundations/dist/tokens.json (theme.light, theme.dark, platform.tablet, base).

## Outputs (write only these)
Preview images and README.md (token sheet, prompts, check results) in 4-tablet-components/components/chip/previews/. One CHANGELOG.md line.

## This step
Draw the tablet Chip from plan 1.0 with exact token values: every A4 variant — assist (leading icon), filter (unselected / selected with check), input (leading avatar, remove button), tag in all 7 colours — sizes sm and md, states default/hover/pressed/focus/disabled for the interactive variants, and B5 RTL (leading items and the remove button swap sides). Skip the status variant (its states are not specified yet). Show it as a Flutter Material 3 tablet component at tablet sizes (touch targets per B2). Dark/ar image: Arabic copy and RTL layout. Note any value you could not render exactly with ⚠ in README.md.

## Notes from the user
none. Other previews run at the same time in other folders; touch only 4-tablet-components/components/chip/previews/ and one CHANGELOG.md line.

## Checks to run
none

## Preview images (preview step only)
Folder: 4-tablet-components/components/chip/previews. One image per entry: light + en → `chip-light-en.jpg`; dark + ar → `chip-dark-ar.jpg`. Max width: 1600 px. JPEG quality: 85.

Do not commit, push or switch branches. End with the Handoff block.

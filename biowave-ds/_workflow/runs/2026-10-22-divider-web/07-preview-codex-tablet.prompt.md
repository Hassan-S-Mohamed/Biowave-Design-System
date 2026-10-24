# Preview step — divider / tablet

Project root: /Users/hassansaid/Downloads/Biowave Design System-divider-web/biowave-ds (git worktree on branch `ds/divider-web`; work only here). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
A2, A4, A5, A6, B2, B3 and B5 of 4-tablet-components/components/divider/divider.md; 4-tablet-components/components/divider/divider.tokens.json if it exists; resolved values in 2-foundations/dist/tokens.json (theme.light, theme.dark, platform.tablet, base).

## Outputs (write only these)
Preview images and README.md (token sheet, prompts, check results) in 4-tablet-components/components/divider/previews/. One CHANGELOG.md line.

## This step
Draw the tablet Divider from plan 1.1 with exact token values: every A4 option — horizontal and vertical × subtle / default / strong × inset none / start / both (start on horizontal only), in context (list rows; toolbar items for vertical), plus the plan 1.1 label: a horizontal divider with "or" / "أو" centred and a long label that wraps, and B5 RTL. Show it as a Flutter Material 3 tablet component at tablet sizes (touch targets per B2). Dark/ar image: Arabic copy and RTL layout. Note any value you could not render exactly with ⚠ in README.md.

## Notes from the user
none. Other previews run at the same time in other folders; touch only 4-tablet-components/components/divider/previews/ and one CHANGELOG.md line.

## Checks to run
none

## Preview images (preview step only)
Folder: 4-tablet-components/components/divider/previews. One image per entry: light + en → `divider-light-en.jpg`; dark + ar → `divider-dark-ar.jpg`. Max width: 1600 px. JPEG quality: 85.

Do not commit, push or switch branches. End with the Handoff block.

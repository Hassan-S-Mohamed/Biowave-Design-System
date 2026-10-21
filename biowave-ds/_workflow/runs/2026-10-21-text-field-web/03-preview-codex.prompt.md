# Preview step — text-field / web

Project root: /Users/hassansaid/Downloads/Biowave Design System-text-field-web/biowave-ds (a git worktree on `ds/text-field-web`; work only here). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
A2, A4, A5, A6, B2, B3 and B5 of 3-web-components/components/text-field/text-field.md; 3-web-components/components/text-field/text-field.tokens.json; resolved values in 2-foundations/dist/tokens.json (theme.light, theme.dark, platform.web, base).

## Outputs (write only these)
Preview images and README.md (token sheet, prompts, check results) in 3-web-components/components/text-field/previews/. One CHANGELOG.md line.

## This step
Draw the web Text field from plan 1.2 with exact token values: sizes sm/md/lg single-line (label, required indicator, help icon, leading icon, trailing action, supporting text, counter), the states row (default, hover, focus, error with error icon, read-only, disabled), prefix / suffix add-ons and the attached end button, and **multiline at sm/md/lg showing the plan 1.2 rule: the trailing action box sits `spacing-xs` inside the top border, never on it**. Arabic labels and RTL layout in the dark/ar image (add-ons and end button swap sides). Note any value you could not render exactly with ⚠ in README.md.

## Notes from the user
none

## Checks to run
none

## Preview images (preview step only)
Folder: 3-web-components/components/text-field/previews. One image per entry: light + en → `text-field-light-en.jpg`; dark + ar → `text-field-dark-ar.jpg`. Max width: 1600 px. JPEG quality: 85.

Do not commit, push or switch branches. End with the Handoff block.

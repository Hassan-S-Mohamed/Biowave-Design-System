# Preview step — tooltip / tablet

Project root: /Users/hassansaid/Downloads/Biowave Design System-tooltip-web/biowave-ds (git worktree on branch `ds/tooltip-web`; work only here). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
A2, A4, A5, A6, B2, B3 and B5 of 4-tablet-components/components/tooltip/tooltip.md; 4-tablet-components/components/tooltip/tooltip.tokens.json if it exists; resolved values in 2-foundations/dist/tokens.json (theme.light, theme.dark, platform.tablet, base).

## Outputs (write only these)
Preview images and README.md (token sheet, prompts, check results) in 4-tablet-components/components/tooltip/previews/. One CHANGELOG.md line.

## This step
Draw the tablet Tooltip from plan 1.0 with exact token values: every A4 option — placement top / bottom / start / end around an Icon button anchor, purpose label (names an icon-only button) vs description (hint on a labelled control), a long two-line text hitting the max width, the offset from the anchor, and B5 RTL (start/end swap sides; Arabic text). Show it as a Flutter Material 3 tablet component at tablet sizes (touch targets per B2). Dark/ar image: Arabic copy and RTL layout. Note any value you could not render exactly with ⚠ in README.md.

## Notes from the user
none. Other previews run at the same time in other folders; touch only 4-tablet-components/components/tooltip/previews/ and one CHANGELOG.md line.

## Checks to run
none

## Preview images (preview step only)
Folder: 4-tablet-components/components/tooltip/previews. One image per entry: light + en → `tooltip-light-en.jpg`; dark + ar → `tooltip-dark-ar.jpg`. Max width: 1600 px. JPEG quality: 85.

Do not commit, push or switch branches. End with the Handoff block.

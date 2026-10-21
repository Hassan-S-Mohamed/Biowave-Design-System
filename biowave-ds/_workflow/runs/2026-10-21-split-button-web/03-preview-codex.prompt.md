# Preview step — split-button / web

Project root: /Users/hassansaid/Downloads/Biowave Design System-split-button-web/biowave-ds (git worktree on branch `ds/split-button-web`; work only here). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
A2, A4, A5, A6, B2, B3 and B5 of 3-web-components/components/split-button/split-button.md (Split button has no tokens.json of its own); B3 of 3-web-components/components/button/button.md and 3-web-components/components/button/button.tokens.json (the primary action and trigger reuse Button's tokens); resolved values in 2-foundations/dist/tokens.json (theme.light, theme.dark, platform.web, base).

## Outputs (write only these)
Preview images and README.md (token sheet, prompts, check results) in 3-web-components/components/split-button/previews/. One CHANGELOG.md line.

## This step
Draw the web Split button from plan 1.1 with exact token values:
- Variant × color at md for every combination A4 allows: primary action + divider + chevron trigger as one connected control.
- Sizes sm / md / lg.
- States: default, hover and pressed on each half separately, focus ring on each half, disabled, loading (spinner in the primary action, trigger stays).
- Open menu (placeholder list, B4): anchored `bottom-end` (logical), chevron rotated, menu scaled from its top-end corner.
- Dark/ar image: Arabic labels, RTL — the primary action on the right, chevron trigger on the left, and **the open menu aligned to the left edge (inline end in RTL)**, as plan 1.1 #6 / B5.
Note any value you could not render exactly with ⚠ in README.md.

## Notes from the user
none

## Checks to run
none

## Preview images (preview step only)
Folder: 3-web-components/components/split-button/previews. One image per entry: light + en → `split-button-light-en.jpg`; dark + ar → `split-button-dark-ar.jpg`. Max width: 1600 px. JPEG quality: 85.

Do not commit, push or switch branches. End with the Handoff block.

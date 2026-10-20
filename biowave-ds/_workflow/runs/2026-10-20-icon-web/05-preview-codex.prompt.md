# Preview step — icon / web

Project root: /Users/hassansaid/Downloads/Biowave Design System/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
A2, A4, A5, A6, B2, B3 and B5 of 3-web-components/components/icon/icon.md; 3-web-components/components/icon/icon.tokens.json; resolved values in 2-foundations/dist/tokens.json (theme.light, theme.dark, platform.web, base).

## Outputs (write only these)
Preview images and README.md (token sheet, prompts, check results) in 3-web-components/components/icon/previews/.

## This step
Make preview images of the planned Icon (plan 1.1): every size token (size-icon-xs … 3xl), the B3 colours, fill 0 vs fill 1 (selected), and RTL mirroring of a directional icon (arrow_forward) next to a non-mirrored one (search, check). Every glyph must be a Google Material Symbols Rounded glyph, named by its Material Symbols name.

## Notes from the user
Goal of the run: every icon in the design system is a Google Material Symbol.

## Checks to run
none

## Preview images (preview step only)
Folder: 3-web-components/components/icon/previews. One image per entry: icon-light-en.jpg (theme light, lang en), icon-dark-ar.jpg (theme dark, lang ar). Max width: 1600 px. JPEG quality: 85.

Do not commit, push or switch branches. End with the Handoff block.

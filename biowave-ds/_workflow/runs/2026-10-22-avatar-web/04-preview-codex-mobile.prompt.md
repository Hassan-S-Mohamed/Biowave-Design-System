# Preview step — avatar / mobile

Project root: /Users/hassansaid/Downloads/Biowave Design System-avatar-web/biowave-ds (git worktree on branch `ds/avatar-web`; work only here). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
A2, A4, A5, A6, B2, B3 and B5 of 5-mobile-components/components/avatar/avatar.md; 5-mobile-components/components/avatar/avatar.tokens.json if it exists; resolved values in 2-foundations/dist/tokens.json (theme.light, theme.dark, platform.mobile, base).

## Outputs (write only these)
Preview images and README.md (token sheet, prompts, check results) in 5-mobile-components/components/avatar/previews/. One CHANGELOG.md line.

## This step
Draw the mobile Avatar from plan 1.0 with exact token values: every A4 option — sizes sm/md/lg/xl × circle/square, colours neutral/brand/secondary, content image / initials (Latin "SA", Arabic "س") / person glyph, the loading and image-failed fallback, the optional badge (count, dot) placed per B2 on circle and square, and B5 RTL (badge placement mirrors). Show it as a Flutter Material 3 mobile component at mobile sizes (touch targets per B2). Dark/ar image: Arabic copy and RTL layout. Note any value you could not render exactly with ⚠ in README.md.

## Notes from the user
none. Other previews run at the same time in other folders; touch only 5-mobile-components/components/avatar/previews/ and one CHANGELOG.md line.

## Checks to run
none

## Preview images (preview step only)
Folder: 5-mobile-components/components/avatar/previews. One image per entry: light + en → `avatar-light-en.jpg`; dark + ar → `avatar-dark-ar.jpg`. Max width: 1600 px. JPEG quality: 85.

Do not commit, push or switch branches. End with the Handoff block.

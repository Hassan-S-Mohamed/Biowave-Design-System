# Plan step — chip (web, tablet, mobile)

Project root: /Users/hassansaid/Downloads/Biowave Design System-chip-web/biowave-ds (git worktree on branch `ds/chip-web`; work only here). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
The three section READMEs (3-web-components, 4-tablet-components, 5-mobile-components), _templates/README.md and _templates/component.md, ROADMAP.md (Day 4 row "Chip — interactive (input · filter · assist) plus static Tag / Label and Status variants (request status: 7 states with status icons, P-05)", base: MUI `Chip` / Flutter `InputChip` · `FilterChip` · `AssistChip`, depends on: Icon, Avatar; §7 decisions incl. P-04, P-05, D-10, D-13, D-18), 2-foundations/dist/tokens.json, the foundation guidelines the template links to, and — as worked examples of finished plans — the button, icon and text-field component files (`*/components/{button,icon,text-field}/`) on all three platforms. _sync/figma-library.json and _sync/figma-icons.json for Figma keys.

## Outputs (write only these)
For each platform section (3-web-components, 4-tablet-components, 5-mobile-components): `components/chip/chip.md` (Parts A–D and F; Part A identical on all three except A8), `components/chip/chip.tokens.json` (D-13, only if the component needs component tokens — aliases to semantic tokens only), the generated contracts and docs pages (npm run contract / npm run docs:build), the Components table row in each section README (Plan Finished · Code Planned · Figma Planned · Review —), and one CHANGELOG.md entry.

## This step
New component: **Chip**. Write the guidelines once (Part A), then spec (B), code plan (C) and Figma build (D) for each platform, following _templates/component.md exactly. Reuse semantic tokens; add a component token only when no semantic token fits (P-04). Flutter widgets are `Bw`-prefixed, React has no prefix. RTL first, both themes, EN + AR copy, WCAG 2.2 AA. Icons only from Material Symbols Rounded via the Biowave Icon (D-18). Tests render through the shared `renderWithBiowave` with default timeouts (web) — plan for it in C6. Never invent behaviour: anything you cannot decide goes to the Handoff Questions.
Set Plan to Finished everywhere, then run the checks below.

## Notes from the user
Chip depends on Avatar, which is planned (1.0, Finished) but not on `main` yet. You may READ (never edit) the Avatar plan at /Users/hassansaid/Downloads/Biowave Design System-avatar-web/biowave-ds/{3-web,4-tablet,5-mobile}-components/components/avatar/avatar.md and use its API for the input chip's leading avatar (the Avatar planner suggests a 24 px `xs` size for chips — decide it here: alias an existing token or raise it as a question). Name the dependency in Part C. P-05: Tag / Label and request Status are **variants of Chip**, not new components; Status has 7 states with status icons — take the state names and icons from ROADMAP §7 P-05 and the Figma legacy pages via _sync/figma-library.json; if they are not written anywhere, list them as a question instead of inventing them. If a contract can't be generated because a Figma key is missing (icon not in figma-icons.json, component tokens not yet pushed to Figma), still finish the plan, report exactly what is missing in the Handoff Questions, and leave Plan Finished. Other planners work in parallel in other worktrees on other components; touch only chip files, the three section READMEs and CHANGELOG.md.

## Checks to run
- npm run component-tokens
- npm run contract -- web chip && npm run contract -- tablet chip && npm run contract -- mobile chip
- npm run docs:build && npm run docs:check
- npm run sync

Do not commit, push or switch branches. End with the Handoff block.

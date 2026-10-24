# Plan step — avatar (web, tablet, mobile)

Project root: /Users/hassansaid/Downloads/Biowave Design System-avatar-web/biowave-ds (git worktree on branch `ds/avatar-web`; work only here). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
The three section READMEs (3-web-components, 4-tablet-components, 5-mobile-components), _templates/README.md and _templates/component.md, ROADMAP.md (Day 4 row "Avatar", base: MUI `Avatar` / Flutter `CircleAvatar` (custom), depends on: Icon, Badge; §7 decisions incl. P-04, P-05, D-10, D-13, D-18), 2-foundations/dist/tokens.json, the foundation guidelines the template links to, and — as worked examples of finished plans — the button, icon and text-field component files (`*/components/{button,icon,text-field}/`) on all three platforms. _sync/figma-library.json and _sync/figma-icons.json for Figma keys.

## Outputs (write only these)
For each platform section (3-web-components, 4-tablet-components, 5-mobile-components): `components/avatar/avatar.md` (Parts A–D and F; Part A identical on all three except A8), `components/avatar/avatar.tokens.json` (D-13, only if the component needs component tokens — aliases to semantic tokens only), the generated contracts and docs pages (npm run contract / npm run docs:build), the Components table row in each section README (Plan Finished · Code Planned · Figma Planned · Review —), and one CHANGELOG.md entry.

## This step
New component: **Avatar**. Write the guidelines once (Part A), then spec (B), code plan (C) and Figma build (D) for each platform, following _templates/component.md exactly. Reuse semantic tokens; add a component token only when no semantic token fits (P-04). Flutter widgets are `Bw`-prefixed, React has no prefix. RTL first, both themes, EN + AR copy, WCAG 2.2 AA. Icons only from Material Symbols Rounded via the Biowave Icon (D-18). Tests render through the shared `renderWithBiowave` with default timeouts (web) — plan for it in C6. Never invent behaviour: anything you cannot decide goes to the Handoff Questions.
Set Plan to Finished everywhere, then run the checks below.

## Notes from the user
Avatar depends on Badge, which is planned (1.0, Finished) but not on `main` yet. You may READ (never edit) the Badge plan at /Users/hassansaid/Downloads/Biowave Design System-badge-web/biowave-ds/{3-web,4-tablet,5-mobile}-components/components/badge/badge.md and use its API (props, sizes, placement) for the avatar's status/count badge. Name this dependency in Part C ("Depends on"). If a contract can't be generated because a Figma key is missing (icon not in figma-icons.json, component tokens not yet pushed to Figma), still finish the plan, report exactly what is missing in the Handoff Questions, and leave Plan Finished. Other planners work in parallel in other worktrees on other components; touch only avatar files, the three section READMEs and CHANGELOG.md.

## Checks to run
- npm run component-tokens
- npm run contract -- web avatar && npm run contract -- tablet avatar && npm run contract -- mobile avatar
- npm run docs:build && npm run docs:check
- npm run sync

Do not commit, push or switch branches. End with the Handoff block.

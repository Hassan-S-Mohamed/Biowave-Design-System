# Plan step — divider (web, tablet, mobile)

Project root: /Users/hassansaid/Downloads/Biowave Design System-divider-web/biowave-ds (git worktree on branch `ds/divider-web`; work only here). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
The three section READMEs, every Part of `{3-web,4-tablet,5-mobile}-components/components/divider/divider.md` (plan 1.0), _templates/README.md and _templates/component.md, 2-foundations/dist/tokens.json and the foundation guidelines the template links to (typography for the label style), _sync/figma-library.json.

## Outputs (write only these)
Parts A–D and F of the three divider.md files (Part A identical on all three except A8), divider.tokens.json only if a component token is truly needed (P-04), the regenerated contracts and docs pages, the README rows (Plan stays Finished), one CHANGELOG.md entry.

## This step
Plan 1.0 → 1.1 with the user's answers to your four 1.0 questions (Notes). Bump the version (minor), add Part F entries, update B9/C6 tests and D (Figma properties/variants) for every change, regenerate all three contracts and docs pages.

## Notes from the user
1. **Inset:** keep `spacing-xl` (16 px) for `start` and `both`. The List plan (Day 8) will add its own text-aligned inset — say so in A4/B2 as a known follow-up, add nothing now.
2. **Text on the divider:** yes, with a show/hide prop. Add an optional label (e.g. "or" / "أو") shown in the middle of a horizontal divider, controlled by a boolean show/hide prop plus the label content. Pick the text style and colour from existing semantic tokens, the gap between label and lines from spacing tokens, define it for horizontal only (say what happens for vertical), RTL and both themes. In Figma: a boolean property for the label and a text property for its content.
3. **Web `decorative`:** default stays **false** (announced as a separator). Keep as written.
4. **Web `component` prop:** add it — `hr` (default) and `li` for dividers that sit directly inside a `<ul>`/`<ol>` (renders `<li role="separator">`, no nested invalid markup). Web only; Flutter needs nothing.

## Checks to run
- npm run component-tokens
- npm run contract -- web divider && npm run contract -- tablet divider && npm run contract -- mobile divider
- npm run docs:build && npm run docs:check

Do not commit, push or switch branches. End with the Handoff block.

# 3 · Web components

> Agent summary: npm package **`@biowave/web`** — React 19 + **MUI v9**, themed by `@biowave/foundations` (MUI theme generated from tokens, CSS variables, light/dark via `data-theme`, RTL via emotion + stylis-plugin-rtl). One folder per component in `components/<name>/`: the Planner writes `<name>.md` (A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog); when the plan is **Finished**, `npm run contract -- web <name>` generates `<name>-contract.md` for the code Executor and `figma-<name>-contract.md` for the Figma Agent. **Builders read only their contract.** Docs: [`index.html`](index.html) (Components List) → `components/<name>/<name>.html`.

## 1. Stack
| | |
|---|---|
| UI base | MUI (`@mui/material`) — wrap or theme MUI components; build custom only when MUI has no equivalent |
| Styling | MUI `styled` / `sx` using theme values or `cssVars` from `@biowave/foundations` |
| Theme | `createBiowaveTheme()` (in foundations). Component-level MUI overrides go in the component folder and are registered through the theme, not in apps |
| RTL | Automatic (provider). Use logical CSS properties only |
| Icons | Google Material Symbols Rounded — `material-symbols` font via the Biowave `Icon` (D-18). Not `@mui/icons-material` |
| Tests | Vitest + Testing Library + axe · per-test speedy Emotion caches flushed after cleanup · run from the repo root with `npm run test:web` |

## 2. Structure
```
3-web-components/
├── README.md                       ← this file (the Components table below is the status source with each file header)
├── index.html                      ← Components List — web docs home of this platform (generated: npm run docs:build)
├── components/
│   ├── index.json                  ← component list (generated)
│   └── <name>/
│       ├── <name>.md               ← the one source file (template: ../_templates/component.md)
│       ├── <name>.tokens.json      ← component tokens, machine copy of B3 (D-13) — when the component has them
│       ├── <name>-contract.md      ← GENERATED → code Executor
│       ├── figma-<name>-contract.md← GENERATED → Figma Agent
│       └── <name>.html             ← docs page (generated shell, reads <name>.md)
├── package.json  tsconfig.json  vitest.config.ts
├── src/
│   ├── index.ts                    ← public exports (re-exports foundations)
│   └── components/<name>/          ← code + tests (created by the Executor)
```

## 3. Rules specific to this platform
- Keep MUI's prop names where the behaviour is the same (`variant`, `size`, `disabled`, `startIcon`); add Biowave props only through the plan.
- Never pass raw colors to `sx`; use `theme.vars.palette.*` or `cssVars.*`.
- Focus: `:focus-visible` with `outline: var(--bw-border-width-focus) solid var(--bw-color-border-focus); outline-offset: var(--bw-border-focus-offset)`.
- Min target 24px (WCAG 2.5.8); Biowave buttons default to 40px height.
- Use `startIcon`/`endIcon` (logical) never `leftIcon`/`rightIcon`.

## 4. Components
Status is written in each file header and here; `npm run docs:check` fails if they differ.

| Component | Plan | Code | Figma | Review | Docs | File |
|---|---|---|---|---|---|---|
| Button | Finished | Built | Planned | Round 3 · 2026-10-20 · Approved | [page](components/button/button.html) | [button.md](components/button/button.md) |
| Icon | Finished | Approved | Planned | Round 2 · 2026-10-20 · Approved | [page](components/icon/icon.html) | [icon.md](components/icon/icon.md) |
| Button group | Finished | Built | Planned | — | [page](components/button-group/button-group.html) | [button-group.md](components/button-group/button-group.md) |
| Icon button | Finished | Approved | Planned | Round 3 · 2026-10-21 · Approved | [page](components/icon-button/icon-button.html) | [icon-button.md](components/icon-button/icon-button.md) |
| Split button | Finished | Approved | Planned | Round 3 · 2026-10-21 · Approved | [page](components/split-button/split-button.html) | [split-button.md](components/split-button/split-button.md) |
| Text field | Finished | Approved | Planned | Round 3 · 2026-10-21 · Approved | [page](components/text-field/text-field.html) | [text-field.md](components/text-field/text-field.md) |
| Tooltip | Open | Changes requested | Planned | Round 1 · 2026-10-24 · Changes requested | [page](components/tooltip/tooltip.html) | [tooltip.md](components/tooltip/tooltip.md) |

## 5. Backlog (from the Figma "Web Components" pages, suggested order)
1. Button · Icon button · Button group · Split button
2. Text field (input, textarea, verification code) · Select
3. Checkbox · Radio · Toggle
4. Tag · Badge · Status (request status) · Avatar
5. Tooltip · Action menu · Tabs · Breadcrumb · Pagination
6. Banner · Snackbar/Toast (from Cards page) · Progress indicator
7. Card · Dialog (pop-up) · Slide-out panel · Accordion · Slider
8. Table (cells, header, toolbar, footer, empty, loading) · Action bar / Undo bar
9. Navigation: Side menu · Top navigation bar · System status bar · Map container

## 6. Commands
```bash
npm run sync                         # start of every task — must say READY
npm run contract -- web <name>     # after the plan is Finished (Planner)
npm run typecheck
npm run test:web
npm run docs:check                   # structure, guidelines, status, contracts, links
npm run docs                         # open the docs locally
```

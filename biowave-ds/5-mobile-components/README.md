# 5 · Mobile components

> Agent summary: Dart package **`biowave_mobile`** — Flutter + **Material 3**, themed by `biowave_foundations` (`BwMobileTheme.light/dark(locale)`). Separate from the tablet package (D-04). One folder per component in `components/<name>/`: the Planner writes `<name>.md` (A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog); when the plan is **Finished**, `npm run contract -- mobile <name>` generates `<name>-contract.md` for the code Executor and `figma-<name>-contract.md` for the Figma Agent. **Builders read only their contract.** Docs: [`index.html`](index.html) (Components List) → `components/<name>/<name>.html`.

## 1. Stack
| | |
|---|---|
| UI base | Material 3 widgets (`FilledButton`, `TextField`, `Checkbox`…) styled through ThemeData / component themes; custom widgets only when M3 has no equivalent |
| Tokens | `context.bw.colors`, `context.bw.text`, `context.bw.elevation`, `context.bw.layout`, `BwSpacing`, `BwRadius`, `BwBorder`, `BwSize`, `BwDuration`, `BwEasing` |
| RTL | Automatic from `MaterialApp(locale:)`. Use `EdgeInsetsDirectional`, `AlignmentDirectional`, `PositionedDirectional`, `BorderRadiusDirectional` |
| Icons | Google Material Symbols Rounded — `material_symbols_icons` (`Symbols.*_rounded`, D-18). Not `Icons.*` |
| Tests | `flutter_test` — golden + semantics + `meetsGuideline` (tap target, contrast) |

## 2. Structure
```
5-mobile-components/
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
├── pubspec.yaml                    ← depends on ../2-foundations/flutter
├── lib/
│   ├── biowave_mobile.dart         ← public exports + BwMobileTheme
│   └── src/components/<name>/      ← code (created by the Executor)
├── test/                           ← theme_test.dart + <name>_test.dart
```

## 3. Rules specific to this platform
- Widgets are named `Bw<Name>` and exported from `lib/biowave_mobile.dart`.
- Prefer theming M3 widgets (e.g. a `FilledButtonThemeData` built from tokens) over re-implementing them; the plan states which.
- Touch target ≥ `BwLayout.mobile.minTarget` (48dp). Keep `MaterialTapTargetSize.padded`.
- Never hard-code `TextDirection`; never use `EdgeInsets.only(left:/right:)`.
- Honour `context.bw.reduceMotion` and the user's text scale.
- Layout: 6 columns, 8 gutter, 16 margin; no persistent sidebars (use drawers / bottom sheets). Portrait-first. Respect SafeArea.

## 4. Components
Status is written in each file header and here; `npm run docs:check` fails if they differ.

| Component | Plan | Code | Figma | Review | Docs | File |
|---|---|---|---|---|---|---|
| Button | Finished | Built | Planned | Round 2 · 2026-10-21 · Approved | [page](components/button/button.html) | [button.md](components/button/button.md) |
| Icon | Finished | Planned | Planned | — | [page](components/icon/icon.html) | [icon.md](components/icon/icon.md) |
| Button group | Finished | Planned | Planned | — | [page](components/button-group/button-group.html) | [button-group.md](components/button-group/button-group.md) |
| Icon button | Finished | Approved | Planned | Round 3 · 2026-10-24 · Approved | [page](components/icon-button/icon-button.html) | [icon-button.md](components/icon-button/icon-button.md) |
| Split button | Finished | Planned | Planned | — | [page](components/split-button/split-button.html) | [split-button.md](components/split-button/split-button.md) |
| Text field | Finished | Planned | Planned | — | [page](components/text-field/text-field.html) | [text-field.md](components/text-field/text-field.md) |

## 5. Backlog (suggested order)
Figma "Mobile Components" pages: Buttons, Inputs, Text Area, Bottom Sheet, Chips, Labels, Avatars, Cards, Tabs, Top App Bar, Navigation Bar, Banners, Snackbar, Checkbox, Radio button, Calendars, Badges, Toggle.

1. Button · Icon button
2. Text field · Text area · OTP / verification code
3. Checkbox · Radio · Switch
4. Chip (assist, suggestion, filter, input) · Label · Badge · Avatar
5. Top app bar · Navigation bar (bottom) · Tabs
6. Card (attendance, request, admin request, report) · List item
7. Bottom sheet · Dialog · Snackbar · Banner (status banners)
8. Calendar / date picker

## 6. Commands
```bash
npm run sync                         # start of every task — must say READY
npm run contract -- mobile <name>     # after the plan is Finished (Planner)
cd 5-mobile-components && flutter analyze && flutter test
npm run docs:check                   # structure, guidelines, status, contracts, links
npm run docs                         # open the docs locally
```

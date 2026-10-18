# Biowave Design System

One design language for every Biowave product, on three platforms, in two languages, in two themes.

| | |
|---|---|
| Platforms | **Web App** (React + MUI) · **Tablet App** (Flutter + Material 3) · **Mobile App** (Flutter + Material 3) |
| Languages | English (LTR, Inter) · Arabic (RTL, IBM Plex Sans Arabic) |
| Themes | Light · Dark |
| Token format | W3C Design Tokens (DTCG) — one source, generated to CSS, TypeScript and Dart |
| Accessibility | WCAG 2.2 AA, checked automatically on every token build |
| Version | Foundations 1.1.0 · Components: 4 planned (button family), 0 built |

> **AI agents:** read [`AGENTS.md`](AGENTS.md) first, then only the `README.md` of the section you work in. Every section README is written so you do not need to open the other files in that section.

## Structure

```
biowave-ds/
├── README.md                ← you are here (map + status)
├── AGENTS.md                ← rules and workflow for every AI agent and developer
├── ROADMAP.md               ← build order: core → complex → patterns, 2–3 per day
├── CHANGELOG.md             ← every change, newest first (rule: logged in the same task)
├── _templates/              ← component.md (the ONE component template) · section-readme.md · README.md (writing rules)
├── _docs/                   ← docs viewer (viewer.js/css), docs:build, docs:check, contract generator, server
├── _sync/                   ← keeps generated code + Figma in step (npm run sync / watch) + Figma library index
├── _audits/                 ← cross-component audits (button-family.md)
│
├── 1-overview/              ← what the system is and why: definition, benefits, vision, value, principles
├── 2-foundations/           ← tokens (source of truth) + guidelines + generated code for all platforms
│   ├── tokens/              ← EDIT HERE ONLY (DTCG .json)
│   ├── guidelines/          ← one page per foundation (colors, typography, a11y, …)
│   ├── web/ · flutter/      ← generated packages @biowave/foundations · biowave_foundations
│   ├── index.html           ← Foundation List — docs home (10 cards) · foundation.html = one card's pages
│   ├── preview/index.html   ← visual reference of every token
│   ├── figma-doc-kit.md     ← Doc/* components + page layouts for all Figma documentation and home pages
│   └── AUDIT.md
├── 3-web-components/        ← npm package  @biowave/web    (React + MUI)
├── 4-tablet-components/     ← Dart package biowave_tablet  (Flutter + M3)
└── 5-mobile-components/     ← Dart package biowave_mobile  (Flutter + M3)
    ├── index.html                       ← Components List — docs home of the platform
    └── components/<name>/
        ├── <name>.md                    ← ONE file: A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog
        ├── <name>.tokens.json           ← component tokens (D-13)
        ├── <name>-contract.md           ← GENERATED when the plan is Finished → code Executor
        ├── figma-<name>-contract.md     ← GENERATED when the plan is Finished → Figma Agent (variables, styles, keys)
        └── <name>.html                  ← docs page (reads <name>.md)
```

How the pieces depend on each other:

```
2-foundations/tokens/*.json ──build──► 2-foundations/web      ──► 3-web-components   (React app imports @biowave/web)
                                  └──► 2-foundations/flutter  ──► 4-tablet-components (tablet app imports biowave_tablet)
                                                              └──► 5-mobile-components (mobile app imports biowave_mobile)
```

## Quick start

```bash
npm install            # once
npm run tokens         # rebuild CSS / TS / Dart + preview, runs contrast checks (fails on any violation)
npm run watch          # auto-rebuild on every token edit + Figma sync alerts (watch:install = start at login)
npm run sync           # is code ↔ files ↔ Figma in sync? (see _sync/README.md)
npm run tokens:check   # contrast + parity report only
npm run typecheck      # React packages
cd 5-mobile-components && flutter test   # Flutter packages
npm run docs           # open the docs: Foundation List → Components List → component pages
npm run docs:check     # structure, guidelines, status, generated pages, contracts, links
npm run contract -- <web|tablet|mobile> <name>   # generate both contracts when a plan is Finished
```

Use in a **web app**:

```tsx
import '@biowave/foundations/tokens.css';
import { BiowaveProvider } from '@biowave/web';

<BiowaveProvider locale="ar" theme="system"><App /></BiowaveProvider>
```

Use in the **mobile app** (tablet is the same with `biowave_tablet` / `BwTabletTheme`):

```dart
import 'package:biowave_mobile/biowave_mobile.dart';

MaterialApp(
  theme: BwMobileTheme.light(locale),
  darkTheme: BwMobileTheme.dark(locale),
  locale: locale,               // Locale('ar') → RTL automatically
);
// In widgets: context.bw.colors.textNeutralDefault, context.bw.text.bodyMd, BwSpacing.md
```

## Status

Component status lives in each component file header and in the Components table of its section README (`docs:check` keeps them equal). Counts only here.

| Section | State | Notes |
|---|---|---|
| 1 · Overview | Draft v1 | Content proposed, needs design-lead sign-off |
| 2 · Foundations | ✅ 1.1.0 | 15 guidelines, tokens verified, synced to Figma. Foundation List docs home. Open decisions D-07…D-11 in `2-foundations/AUDIT.md` |
| 3 · Web components | 4 planned · 1 built | Button: Changes requested (plan Open). Contracts ready: 3 |
| 4 · Tablet components | 4 planned · 0 built | Contracts ready: 4 |
| 5 · Mobile components | 4 planned · 0 built | Contracts ready: 4 |
| Figma Doc Kit | Planned | Blocks all Figma documentation pages and home pages (`2-foundations/figma-doc-kit.md`) |
| Roadmap | v2 | [`ROADMAP.md`](ROADMAP.md): 42 components + 13 patterns, button family first, DS 1.0 ≈ 23 Nov 2026 |

## Key decisions

| ID | Decision |
|---|---|
| D-01 | Tokens in `2-foundations/tokens` are the source of truth. Figma is updated to match them, not the other way round — via `_sync/` (verified value by value). |
| D-02 | DTCG token format; generated outputs are committed so apps never need the build tooling. |
| D-03 | Web builds on **MUI** (theme generated from tokens, CSS variables, RTL via emotion + stylis-plugin-rtl). |
| D-04 | Tablet and Mobile are **separate Flutter packages** over one shared `biowave_foundations` package, both on **Material 3**. |
| D-05 | Three layers: primitives → semantic → (later) component tokens. Components never use primitives. |
| D-12 | **Four Figma files** (2026-10-16): Foundations (variables, styles, icons, Doc Kit — published library) + Web / Tablet / Mobile Components (one set per component per platform, consuming the library). Keys in `_sync/figma-files.json`; component docs are synced per file. Supersedes the "one shared set" note of the button-family plan. |
| D-13 | **Component tokens** (2026-10-16): semantic variables live only in Foundations. Component files hold only component-token collections (`<Component> / <Group>`) whose every value aliases a Foundations semantic variable. Source: `<section>/components/<name>/<name>.tokens.json` per platform (Tablet/Mobile may `$extends` Web). Enforced by `npm run component-tokens` (repo) and `figma-read-tokens.js` + `sync:verify-tokens` (Figma). |
| D-14 | **One file per component per platform** (R-01, 2026-10-18): `<section>/components/<name>/<name>.md` holds guidelines (copied on all three platforms, only A8 differs), spec, code plan, Figma build, review and changelog. The old separate guidelines section and per-platform spec folders are gone. |
| D-15 | **Generated contracts** (R-01): when a plan is Finished, `npm run contract` writes `<name>-contract.md` (code Executor) and `figma-<name>-contract.md` (Figma Agent, with library connections and variable / style / component keys from `_sync/figma-library.json`). Builders read only their contract; contracts are never edited. |
| D-16 | **Docs output** (R-01): web docs keep the catalog design, one HTML page per component; Foundation List and Components List home pages on the web and in Figma; Figma docs use the 12-page Blade-derived template from the Doc Kit. Figma contract = Phase 1 set, Phase 2 docs + Components List card. |
| D-06 | Language is not a theme: direction comes from `dir`/`Directionality`; only fonts, line heights and letter-spacing change per language. |

Foundation-level decisions (D-07 onward) are in [`2-foundations/AUDIT.md`](2-foundations/AUDIT.md).

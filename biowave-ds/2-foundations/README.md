# 2 · Foundations

> Agent summary: tokens in `tokens/` are the **only** place design values are defined. `npm run tokens` generates CSS/TS (web), Dart (Flutter), `dist/tokens.json` and `preview/index.html`, then fails if any WCAG contrast pair or theme/platform parity check fails. Components use **semantic** tokens only. This README summarises every guideline; open a guideline file only for its full tables.

## Folder map

| Path | What | Edit? |
|---|---|---|
| `tokens/primitives/` | Raw palette, pixel scale, font families/weights, durations | Planner only |
| `tokens/semantic/` | Color (light/dark), elevation (light/dark), spacing, radius, border, size, motion, layer, typography families | Planner only |
| `tokens/platform/` | web / tablet / mobile: type scale, line heights (en/ar), role weights, grid, layout, target size, breakpoints | Planner only |
| `guidelines/` | 15 usage pages (below) | Yes, with token changes |
| `scripts/` | `build.mjs`, `check.mjs`, `preview.mjs`, `contrast-pairs.json`, `lib/tokens.mjs` | Yes |
| `web/` | npm `@biowave/foundations`: generated tokens + `createBiowaveTheme` (MUI) + `BiowaveProvider` | `src/mui`, `src/BiowaveProvider.tsx` only |
| `flutter/` | Dart `biowave_foundations`: generated tokens + `BwTheme.build` (Material 3) + `context.bw` | `lib/src/theme` only |
| `dist/tokens.json` | Flat resolved values for every mode | Generated |
| `preview/index.html` | Visual reference (theme / language / platform switches) | Generated |
| `AUDIT.md` | Problems found in the Figma foundations, fixes, open decisions, migration map | Yes |
| `index.html` · `foundation.html` | **Foundation List** docs home (10 cards) and one card's guideline pages — `npm run docs` | Generated (`npm run docs:build`) |
| `figma-doc-kit.md` | Spec of the `Doc/*` Figma components, the 12 documentation page layouts and the home pages (Foundation List · Components List) | Planner |

## Guidelines at a glance

| Foundation | Key facts (full page in `guidelines/`) |
|---|---|
| [Tokens](guidelines/tokens.md) | DTCG format. Layers: primitive → semantic → platform (→ component later). Modes: theme × platform × language. Figma scopes table. |
| [A11y](guidelines/a11y.md) | WCAG 2.2 AA. Contrast auto-checked (152/152 pass). Focus 2px + 2px offset. Targets 24px web / 48dp touch. Reduced motion built in. |
| [Content](guidelines/content.md) | Sentence case, verb-first buttons, no "!", "…" for progress, errors = what happened + how to fix. MSA Arabic, no left/right in copy, +20–30% length. |
| [Spacing](guidelines/spacing.md) | 4px base: none 0, xxs 2, xs 4, sm 6, md 8, lg 12, xl 16, 2xl 20, 3xl 24, 4xl 32, 5xl 40, 6xl 48, 7xl 64, 8xl 80, 9xl 96, 10xl 128, 11xl 160. Use gap; logical directions. |
| [Grid](guidelines/grid.md) | Web ≥1200: 12 col / 24 gutter / 40 margin. Tablet 600–1199: 8 / 24 / 24. Mobile <600: 6 / 8 / 16. App bar 72/64/64. Sidebars start/end 248 (0 on mobile). |
| [Colors](guidelines/colors.md) | Primary navy #193351, secondary teal #0C5F79. Groups: surface, background (+states), text, icon, border, link, overlay. Roles: brand, secondary, success, warning, error, info, neutral. Warning uses dark text. |
| [Typography](guidelines/typography.md) | Inter (en), IBM Plex Sans Arabic (ar). Roles: display, heading, title, body, label, caption, action, data. Body 14 web / 16 touch. Arabic: taller line heights, letter-spacing 0. |
| [Motion](guidelines/motion.md) | Material 3: xs 50, sm 100, md 200, lg 300, xl 400, 2xl 500 ms. Easing standard / emphasized (decelerate in, accelerate out). Reduced motion → 0. |
| [Icons](guidelines/icons.md) | Google Material Symbols Rounded (D-18): web `material-symbols` font, Flutter `material_symbols_icons`. Sizes xs 12 … 3xl 48; default 20 web, 24 touch. Mirror directional icons in RTL only. |
| [Illustration](guidelines/illustration.md) | Flat geometric, token colors, no text inside, decorative for screen readers. Assets not created yet. |
| [Logos](guidelines/logos.md) | Variants (en/ar wordmark, symbol, mono, partner lock-up). Never mirror. Assets to be added. |
| [Elevation](guidelines/elevation.md) | elevation-0…4 + shadow-control, light (navy tint) and dark (black, stronger) values. Pair with surface-raised. |
| [Border](guidelines/border.md) | Widths none/default 1/strong 2/focus 2. Decorative vs control borders (`border-input-*` ≥ 3:1). Focus ring recipe. |
| [Radius](guidelines/radius.md) | none 0, xxs 2, xs 4, sm 6, md 8 (controls), lg 10, xl 12, 2xl 16 (cards), 3xl 20 (dialogs), 4xl 24 (sheets), full. Inner = outer − padding. |
| [Devices](guidelines/devices.md) | Target screens per platform + safe areas; biometric hardware imagery rules (IDEMIA, Suprema, STid, HID, Assa Abloy…). |

## Token cheat sheet

| Need | Web (CSS / TS) | Flutter |
|---|---|---|
| Page background | `var(--bw-color-surface-page)` | `context.bw.colors.surfacePage` |
| Card | `--bw-color-surface-default` + `--bw-color-border-default` + `--bw-radius-2xl` | `colors.surfaceDefault`, `BwRadius.xl2` |
| Primary button fill / label | `--bw-color-background-brand-default` / `--bw-color-text-on-brand` | `colors.backgroundBrandDefault` / `colors.textOnBrand` |
| Body text | `.bw-text-body-md` · `<Typography variant="bodyMd">` | `context.bw.text.bodyMd` |
| Secondary text | `--bw-color-text-neutral-muted` | `colors.textNeutralMuted` |
| Input border | `--bw-color-border-input-default` | `colors.borderInputDefault` |
| Focus ring | `--bw-color-border-focus`, `--bw-border-width-focus`, `--bw-border-focus-offset` | `colors.borderFocus`, `BwBorder.widthFocus` |
| Gap 8 / padding 16 | `--bw-spacing-md` / `--bw-spacing-xl` | `BwSpacing.md` / `BwSpacing.xl` |
| Menu shadow | `--bw-elevation-3` | `context.bw.elevation.elevation3` |
| Transition | `var(--bw-motion-duration-sm) var(--bw-motion-easing-standard)` | `BwDuration.sm`, `BwEasing.standard` |

## Runtime switches

| Switch | Web | Flutter |
|---|---|---|
| Theme | `<html data-theme="light|dark">` (absent = OS) — set by `BiowaveProvider theme=` | `MaterialApp(theme:, darkTheme:)` |
| Language / direction | `<html lang="ar" dir="rtl">` — set by `BiowaveProvider locale=` | `MaterialApp(locale:)` + theme built with the same locale |
| Platform scale | viewport (grid) or `<html data-platform>` | fixed per package (tablet / mobile) |

## Commands
```bash
npm run tokens         # build + preview + checks
npm run tokens:check   # checks with full contrast table
```

## Open decisions
D-07 role weights · D-08 touch headings larger than web · D-09 mobile 6 columns · D-10 Arabic numerals · D-11 dark overlay base. Details in `AUDIT.md`.

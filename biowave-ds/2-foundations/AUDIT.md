# Foundations audit — v1.0.0 migration

Source reviewed (15 Oct 2026): the Figma variable exports in `figma-assets/` (`1. Themes` … `8. Shadows`, plus the `_Primitive` collection inside `ADS Foundations.fig`) and the full `Design System.fig` file (pages, variable collections, text/effect/grid styles, and the earlier `_DS Foundation Architecture Review` frame).

Standards used to judge every finding — nothing here is a matter of taste unless it is marked **Decision**:

| Area | Standard |
|---|---|
| Token format | W3C Design Tokens Community Group format (DTCG, 2025.10) |
| Contrast | WCAG 2.2 AA — 1.4.3 text 4.5:1, 1.4.11 non-text 3:1, 2.4.11/2.4.13 focus, 2.5.8 target size |
| Platforms | Material 3 (Flutter, window size classes, motion), Apple HIG (44pt targets), MUI v9 theming |
| Bidi | W3C Internationalization: logical properties, no letter-spacing on Arabic |

Status legend: ✅ fixed in tokens · 🎨 must also be fixed in Figma · ❓ needs a decision from the design lead

---

## 1. Critical and major findings

| ID | Finding (before) | Fix (now) | Status |
|---|---|---|---|
| A-01 | `Typography/Size/Caption/sm` was **0** in Tablet(EN) and Mobile(EN), 11 in AR. Every `caption/sm` text style on those platforms rendered at 0px. | Its own description says touch platforms have nothing below `caption-md`, so on tablet/mobile `caption-sm` now equals `caption-md` (12px) in both languages. Web keeps 11px. | ✅ 🎨 |
| A-02 | `text/neutral/placeholder` (light) = neutral/200 on white = **1.38:1**. Placeholder text is still text (WCAG 1.4.3). | `color-text-neutral-placeholder` → neutral/500 (4.95:1). Dark → neutral/400 (6.23:1). | ✅ 🎨 |
| A-03 | White label on `background/error/default` (#FF2B2B) = **3.73:1**; white on `background/warning/default` (#FF8C32) = **2.32:1**. Figma worked around this with extra `on/error-accessible`, `success/accessible`, `warning/accessible` tokens. | Fixed the base tokens instead of adding parallel "accessible" ones: error default → error/700 (5.18:1), success default → success/700 (6.33:1), warning default → warning/500 with **dark** text (8.99:1). Hover/pressed re-checked (all ≥ 4.5:1). The `*-accessible` tokens are removed. | ✅ 🎨 |
| A-04 | Focus ring `border/focused/*` used the 200 step (primary/200 on white = **2.58:1**) with eight per-role variants. | One `color-border-focus` (primary/500 light = 9.79:1, primary/200 dark = 7.68:1) + `border-width-focus` 2px + `border-focus-offset` 2px. | ✅ 🎨 |
| A-05 | `icon/neutral/muted` (light) neutral/400 = **2.96:1** — below 3:1 for meaningful icons. A duplicate `muted-accessible` existed. | `color-icon-neutral-muted` → neutral/500 (4.95:1); duplicate removed. | ✅ 🎨 |
| A-06 | Dark theme `background/secondary/*` aliased the **primary** ramp (copy-paste bug): secondary buttons were navy in dark mode. | Dark secondary → secondary/300 (default), /900 (subtle), /200 (hover), /100 (pressed). | ✅ 🎨 |
| A-07 | Width collection aliased a **different, remote** library (`Primitives`), not the local `_Primitive`. | `size-container-*` now alias local primitives. | ✅ 🎨 |
| A-08 | `icon/role/warning` and `icon/role/on/warning` were both a token **and** a group (`$root`). Invalid in DTCG and breaks every code generator. | Flattened: `color-icon-role-warning`, `color-icon-on-warning`. | ✅ 🎨 |
| A-09 | No per-role **font weight**: weights were set per text style and disagreed across platforms (Desktop `heading/lg` = SemiBold, Mobile `heading/lg` = Regular). | Role weights added: display/heading 600, title/label/action/data 500, body/caption 400. | ✅ ❓ D-07 |
| A-10 | Font weights were strings ("Semi Bold"). Code needs numbers. | `primitive.font.weight.*` = 400/500/600/700. | ✅ |
| A-11 | No breakpoints. Grid docs described ranges with gaps (Mobile < 480, Tablet 768–1024, Desktop ≥ 1280). | Material 3 window size classes: mobile 0–599, tablet 600–1199, web ≥ 1200. | ✅ |
| A-12 | Light/dark contrast never verified automatically. | `scripts/check.mjs` checks 76 pairs × 2 themes on every build (152/152 pass). | ✅ |

## 2. Moderate findings

| ID | Finding | Fix | Status |
|---|---|---|---|
| B-01 | `primitive error/alpha/5` was 10% opacity. | All alpha steps rebuilt from their names. | ✅ 🎨 |
| B-02 | Naming mixed `error`/`danger` and `information`/`info`. | One vocabulary, matching MUI and Material: `brand, secondary, success, error, warning, info`. | ✅ 🎨 |
| B-03 | `text/neutral/neutral` (meaningless), `text/neutral/on/default` and `on/neutral` (duplicates of default/subtle). | `text-neutral-subtle`; duplicates removed. | ✅ 🎨 |
| B-04 | `background/default/default`, `background/*/none` (×8 identical transparent tokens), extra `states/` level. | `background-base-*`, a single `background-transparent`, states flattened (`background-brand-hover`). | ✅ 🎨 |
| B-05 | Three overlapping control-boundary tokens (`form/default`, `control-accessible`, `icon-button/outline`). | `color-border-input-default / hover / error`. | ✅ 🎨 |
| B-06 | Payment brand colors (Visa/Mastercard…) lived inside the themed `icon` group. | Moved to `color-external-payment-*` (never themed). | ✅ 🎨 |
| B-07 | Shadows: only 6 color variables (with a broken `primary/secondary/…` nesting and spaces in names); 24 effect styles from four different kits (Untitled UI, M3, Blade, local) with raw black values; no dark-theme shadows. | DTCG `shadow` tokens: `elevation-0…4` + `shadow-control`, separate light/dark values. Kit leftovers to be deleted in Figma. | ✅ 🎨 |
| B-08 | Arabic `display` line height on web was 1.05× (40/42) — Arabic marks and ascenders clip. | Arabic display ≥ 1.25× (now 40/50 and 32/40). | ✅ 🎨 |
| B-09 | Arabic text styles had letter-spacing 0 but the rule was not written down; Latin display used −0.16px ad hoc. | `font-letter-spacing-ar-default` = 0 (rule), `en-display` = −0.16px. | ✅ |
| B-10 | Typography size primitives were duplicated per platform (`Size/Web/14`, `Size/Tablet/14` …) — indirection with no meaning. | Platform files hold the values directly. | ✅ |
| B-11 | `sidebar-left / sidebar-right` are physical names — wrong in RTL. | `layout-width-sidebar-start / sidebar-end`. | ✅ 🎨 |
| B-12 | Missing foundations: border width, motion, icon sizes, target size, z-index. | Added (Material 3 motion, Material Symbols optical sizes, WCAG 2.5.8 / 48dp targets). | ✅ |
| B-13 | Figma file carries ~60 foreign or legacy variable collections (Blade, M3, Untitled UI, old `Primitive`/`Light`/`Button`…) and 4 kit text-style families. | Not imported. Delete in Figma after re-binding components. | 🎨 |
| B-14 | 720 button variants pin `1. Themes` to Light and have no Text Style (found in the earlier review, MODE-002 / STYLE-001). | Will be handled when Button is rebuilt from its plan. | 🎨 |
| B-15 | Most variables use `ALL_SCOPES`. | Scopes to apply in Figma are listed in `guidelines/tokens.md`. | 🎨 |

## 3. Open decisions (❓)

| ID | Question | Proposal in place | Who |
|---|---|---|---|
| D-07 | Role font weights | display/heading 600 · title/label/action/data 500 · body/caption 400 | Design lead |
| D-08 | Mobile and tablet headings are **larger** than web (mobile `heading-lg` 28 vs web 24). Most systems keep headings equal or smaller on small screens. | Kept as designed (larger touch scale). Confirm or align. | Design lead |
| D-09 | Mobile grid uses 6 columns; Material 3 compact uses 4. | Kept 6. | Design lead |
| D-10 | Numerals in Arabic UI: Western (0-9) or Eastern Arabic (٠-٩)? | ✅ **Decided 2026-10-16: Western digits (0-9)** everywhere (IDs, times, dates, numbers, tables). | Product |
| D-11 | Dark theme overlay uses neutral/600 alpha; many systems use black. | Kept. | Design lead |

## 4. Migration map (Figma name → token name)

Pattern rules cover every renamed variable. Names are shown in documentation form (`kebab-case`); CSS adds `--bw-`, Dart uses camelCase without the category (e.g. `colors.backgroundBrandHover`).

| Figma variable | New token |
|---|---|
| `color/surface/*` | `color-surface-*` (unchanged) |
| `color/background/default/default` | `color-background-base-default` |
| `color/background/default/states/hover` | `color-background-base-hover` |
| `color/background/{role}/states/{state}` | `color-background-{role}-{state}` |
| `color/background/{role}/none` | `color-background-transparent` |
| `color/background/information/*` | `color-background-info-*` |
| `color/background/success/accessible` | `color-background-success-default` |
| `color/text/neutral/neutral` | `color-text-neutral-subtle` |
| `color/text/neutral/on/default` | `color-text-neutral-default` |
| `color/text/neutral/on/neutral` | `color-text-neutral-subtle` |
| `color/text/role/on/{role}` | `color-text-on-{role}` |
| `color/text/role/on/error-accessible` | `color-text-on-error` |
| `color/text/role/information` | `color-text-role-info` |
| `color/icon/neutral/muted-accessible` | `color-icon-neutral-muted` |
| `color/icon/role/on/{role}` | `color-icon-on-{role}` |
| `color/icon/role/warning/accessible` | `color-icon-role-warning` |
| `color/icon/payment/*` | `color-external-payment-*` |
| `color/border/danger` | `color-border-error` |
| `color/border/information` | `color-border-info` |
| `color/border/focused/*` | `color-border-focus` |
| `color/border/form/default`, `control-accessible`, `icon-button/outline` | `color-border-input-default` |
| `color/border/form/danger` | `color-border-input-error` |
| `color/link/hovered` | `color-link-hover` |
| `color/overlay/danger` | `color-overlay-error` |
| `color/overlay/information` | `color-overlay-info` |
| `8. Shadows/*` + effect styles | `elevation-0…4`, `shadow-control` |
| `Radius/radius-{x}` | `radius-{x}` |
| `spacing-{x}` | `spacing-{x}` (unchanged) |
| `Width/width-{x}` | `size-container-{x}` |
| `Size/{Role}/{s}` (5./6. Typography) | `font-size-{role}-{s}` (per platform file) |
| `Line Height/{Role}/{s}` | `font-line-height-{en|ar}-{role}-{s}` |
| `grid/columns/count` | `grid-columns` |
| `grid/columns/margin-full` | `grid-margin-full` |
| `layout/width/sidebar-left` | `layout-width-sidebar-start` |
| Figma mode `Desktop` | platform `web` |

## 5. What to do in Figma next (🎨)

1. Re-import the corrected tokens (or edit the variables to match `dist/tokens.json`), keeping variable IDs by renaming instead of deleting.
2. Apply the scopes table in `guidelines/tokens.md`.
3. Delete foreign collections and kit styles (B-13) once nothing references them.
4. Remove theme pinning from component variants so they inherit Light/Dark (B-14).

## 6. Figma sync — done 15 Oct 2026

Applied to the Figma file **Design System** (`AyFaSmfDUlTax3GpKhRdHI`) with variable IDs preserved (renamed, not recreated), so existing bindings keep working:

| Area | Result |
|---|---|
| `_Primitive` | All 291 hidden from pickers (scopes `[]`); `error/alpha/5` fixed; added `Colors/black`, `Typography/Line Height/Web/ar/40` and `/50` |
| `1. Themes` | 110 renamed to the new names, 10 added (`border/input/hover`, `overlay/secondary`, `shadow/*`), 26 duplicates moved to `_deprecated/…` as hidden aliases of their replacement. Light/Dark values, scopes and code syntax (WEB `var(--bw-…)`, iOS/Android = Flutter accessor) set on every token |
| `2. Radius`, `3. Spacing` | Renamed to `radius/*`, `spacing/*`; scopes `CORNER_RADIUS` / `GAP, WIDTH_HEIGHT`; code syntax |
| `4. Width` → `4. Size` | `size/container/*` now alias local primitives (A-07); `size/icon/*` added |
| `9. Border` (new) | `border/width/none·default·strong·focus`, `border/focus/offset` |
| `5./6. Typography` | Modes renamed `Web · Tablet · Mobile`; caption/sm fixed (A-01); Arabic display line heights (B-08); Arabic weight styles fixed to `SemiBold` (were Inter's `Semi Bold`, which IBM Plex Sans Arabic does not have); `Role Weight/*` added (D-07) |
| `7. Grid & Layout` | Mode `Desktop` → `Web`; `sidebar-left/right` → `sidebar-start/end`; added `breakpoint/min·max`, `target/min` |
| `8. Shadows` | Renamed `8. Shadows (deprecated)`, all variables hidden |
| Text styles | `Desktop/*` → `Web/*`; 130 styles bound to `Role Weight/*`; 4 missing `caption/sm` styles created |
| Effect styles | `Elevation/1…4`, `Shadow/Control`, `Focus/Ring` bound to `1. Themes › color/shadow/*` (switch with Light/Dark); `Focus Ring/Neutral` → `_deprecated/` |

Still to do by hand in Figma: re-bind components that use `_deprecated/*` variables, remove theme pinning from button variants (B-14), then delete the deprecated items.

## 7. Semantic colour tokens 2.0 — 27 Oct 2026

Renamed in place in Figma (variable IDs and keys kept, so every binding in the component files keeps working). Full table in `CHANGELOG.md` › *Foundations — Semantic colour tokens 2.0*.

| Old (code / Figma) | New |
|---|---|
| `color-background-transparent` · `color/background/transparent` | `color-background-transparent-default` (+ `hovered`, `pressed`, `disabled` new) |
| `color-background-{role}-hover` · `color/background/primary/*` | `color-background-{role}-hovered` · `color/background/brand/*` |
| `color-background-neutral-subtle` | `color-background-base-subtlest` |
| `color-text-neutral-*` · `color/text/muted` | `color-text-*` · `color/text/subtlest` |
| `color-text-neutral-placeholder` | `color-text-subtlest` — Figma: `_deprecated/color/text/placeholder`, aliased to `color/text/subtlest` |
| `color-icon-neutral-*` (incl. `muted`) | `color-icon-*` (`muted` → `subtlest`) |
| `color-link-hover` · `color-border-input-hover` · `color-overlay-hover` | `…-hovered` |

Found and fixed: the dark values of `color/surface/page · default · subtle · raised` had been changed by hand in Figma (aliases neutral 800 · 600 · 600 · 700, against code 950 · 900 · 800 · 800). Restored to the token source.

## 8. Semantic colour tokens 2.1 — 28 Oct 2026

Renamed in place in Figma: `color/overlay/backdrop` → `color/overlay/default`, `color/border/input/default` → `color/border/bold`, `color/background/base/disabled` → `color/background/disabled`. Moved to `_deprecated/` and aliased to the replacement (bindings keep their colour): every other `*/disabled`, `border/input/error · hovered`, `overlay/hovered · pressed · subtle · scrim · brand`; role overlays have no replacement. Full map in `CHANGELOG.md` › *Semantic colour tokens 2.1*.

Raw hex (no primitive yet, by decision): accent role and the `color/data/*` group. Promote to primitive ramps when the brand palette is next revised.

## 9. Typography 2.0 — 28 Oct 2026

`5. Typography (EN)` → `5. Typography` (modes renamed `Web/Tablet/Mobile` → `… · EN`, `… · AR` added). Variable renames (IDs kept): `Font Family` → `font/family/default`; `Size/<Role>/<size>` → `font/size/<role>/<size>`; `Line Height/<Role>/<size>` → `font/line-height/<role>/<size>`; `Role Weight/<role>` → `font/weight/<role>`. Text styles `Web/en/<role>/<size>` → `<role>/<size>` (keys kept). Deprecated: `Font Weight/*`, all `Web/ar/*`, `Tablet/*`, `Mobile/*` and `*/md-medium` styles, collection `6. Typography (AR)` (kept published for now). Delete the deprecated AR collection once no component file uses a `_deprecated/Web/ar/*` style.

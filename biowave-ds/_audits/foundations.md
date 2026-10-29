# Foundations coverage audit — Web · Tablet · Mobile

> Agent summary: a read-only check of `2-foundations/` (tokens, Figma variables and styles, generated web and Flutter code, the 15 guideline pages and the Devices / biometric hardware page) against what all three platforms need. It ends in one ordered to-do checklist per platform. Nothing in tokens, generated code or Figma was changed. Token changes listed here go through the Planner (AGENTS.md §6).

| Field | Value |
|---|---|
| Date | 2026-10-22 |
| Scope | `tokens/**` · `web/src/**` · `flutter/lib/**` · `guidelines/*.md` · `AUDIT.md` · `_sync/` status |
| Checks run | `node 2-foundations/scripts/check.mjs` ✓ 162/162 contrast pairs, 0 errors · `npm run sync` ✓ READY (18 Figma docs queued) · `npm run docs:check` ✓ · `flutter analyze` (foundations package) ✓ no issues |
| Not checked | The Figma file itself (no Figma read in this audit). Figma items come from `AUDIT.md` §5–6 and `_sync/` |

## 1. What is already covered on all three platforms ✅

| Area | Status |
|---|---|
| Colors | 114 semantic tokens, light and dark keys identical; every role has default · subtle · hover · pressed · disabled; focus, input borders, links, overlays |
| Contrast | 162/162 pairs pass on every build |
| Spacing · radius · border · control sizes · icon sizes · containers | One semantic set, generated to CSS, TS and Dart |
| Typography | 8 roles × sizes, per platform, separate EN and AR line heights, role weights, Arabic letter-spacing 0 |
| Grid and layout | Columns, gutter, margins, app bar, status bar, sidebars, `target-min` per platform |
| Motion | Durations, easing, reduced motion (web CSS; Flutter `context.bw.reduceMotion`) |
| Elevation | `elevation-0…4` + `shadow-control`, light and dark |
| Runtime switches | Web: `data-theme`, `lang/dir`, `data-platform`. Flutter: `BwTheme.build(platform, brightness, locale)` |
| Icons | Material Symbols Rounded on all platforms (D-18) |

## 2. Gaps found

Severity: 🔴 blocks upcoming components (Roadmap Day 4–18) · 🟡 needed before 1.0 · 🟢 polish

### 2.1 Shared (all platforms)

| # | Gap | Sev | Evidence |
|---|---|---|---|
| S-01 | Decisions **D-07** (role weights), **D-08** (touch headings larger than web), **D-09** (mobile 6 columns), **D-11** (dark overlay base) are still open. Roadmap 0.1 says they must close before components | 🔴 | `AUDIT.md` §3 |
| S-02 | No **selected / active** color state. Chip, Segmented button, Tabs, List, Checkbox card, Navigation all need it (Day 4–17). Only `overlay-brand` ("quiet hover/selected") exists | 🔴 | `color.light.json` has default · subtle · hover · pressed · disabled only |
| S-03 | No **focus-ring inverse** color token for controls on brand or inverse surfaces. Figma has the `Focus/Ring Inverse` style, code has no matching token (only `border-inverse`) | 🟡 | Roadmap 0.6; `border.json`, `color.*.json` |
| S-04 | No **status semantic layer** for the product: device status (online · offline · syncing · tampered · maintenance) and request status (7 states — Chip P-05). Without it every component will map statuses to roles differently | 🔴 | No `color.status.*`; Roadmap Day 4 Chip |
| S-05 | No **data-visualization palette** (categorical, sequential). Needed by Dashboard (Day 25) and KPI cards | 🟡 | Roadmap §6 |
| S-06 | No **skeleton / shimmer** color tokens, no **scrollbar** tokens, no **selection highlight** (text selection) token | 🟡 | Skeleton Day 5 |
| S-07 | No **opacity** tokens (disabled opacity, scrim opacity) — the type list has no `number` tokens for opacity | 🟢 | `tokens.md` types |
| S-08 | `surface-page` and `surface-subtle` are the same value in light (#F7F7F7). Subtle panels on the page are invisible | 🟡 | `dist/tokens.json` |
| S-09 | Figma clean-up still open: delete foreign collections and kit styles (B-13), remove theme pinning from 720 button variants (B-14), apply scopes (B-15), re-bind and delete `_deprecated/*` | 🟡 | `AUDIT.md` §5–6 |
| S-10 | 32 tokens are code-only (motion, layer, mono font, letter-spacing, composite shadows). Designers cannot see motion or z-index in Figma | 🟢 | `npm run sync` output |
| S-11 | Docs stale: `a11y.md` and README say "76 pairs × 2 = 152"; the build now checks 162. `Biowave Foundations.md` lists 9 sections, Foundation List has 10 cards and 15 guidelines | 🟢 | `check.mjs` output |
| S-12 | Assets missing: `2-foundations/assets/` does not exist — no logos, no illustrations, no device images | 🟡 | `logos.md`, `illustration.md`, `devices.md` |

### 2.2 Biometric devices

| # | Gap | Sev |
|---|---|---|
| B-01 | No device **image size tokens**: 40 / 64 / 160 are raw numbers in `devices.md`. Add `size.media.device.{sm,md,lg}` (or reuse an avatar/media scale) so components never hard-code them | 🔴 (Avatar, List, Card, Data table use them) |
| B-02 | No device **status tokens** (see S-04) and no rule for how status shows next to a device (color + icon + text, WCAG 1.4.1) | 🔴 |
| B-03 | No **biometric modality icons** (face, finger, palm vein, card/badge, PIN, QR, mobile credential). `icons.md` says custom icons live in Figma page `Icons`, but none are listed or indexed in `_sync/figma-icons.json`; no Material Symbols names chosen as fallback | 🟡 |
| B-04 | No **device-type icons** (reader, controller/hub, turnstile, lock) for small sizes where a photo does not read | 🟡 |
| B-05 | Device image folder `assets/devices/<vendor>/<model>.webp` not created; no list of models with file names; no placeholder image for unknown models; no dark-mode rule (transparent PNG on dark surface) | 🟡 |
| B-06 | No rule for **vendor logos** in product UI (size, where shown, when the model name is enough) beyond `logos.md` "use official assets" | 🟢 |
| B-07 | Device **on-screen UI** is not covered: some managed devices (VisionPass, Sigma, Smart Controller) have their own screens. Decide whether Biowave styles them (kiosk/terminal class with its own size, target and type scale) or they are out of scope | ❓ question |
| B-08 | Image alt rule says "decorative" but there is no rule for an image-only device cell (e.g. table thumbnail column) — then it must have the model name as its label | 🟢 |

### 2.3 Web only

| # | Gap | Sev |
|---|---|---|
| W-01 | **Fonts not shipped**: `typography.md` says self-host `@fontsource/inter` + `@fontsource/ibm-plex-sans-arabic` (+ JetBrains Mono), but `@biowave/foundations` has no font dependency and no `fonts.css`. Apps fall back to system fonts | 🔴 |
| W-02 | `data-*` roles have **no tabular numerals** — `tokens.css` and `biowaveVariants` never set `font-variant-numeric: tabular-nums`, although `typography.md` requires it | 🔴 (Data table, Badge, OTP, pickers) |
| W-03 | No **mono** typography variant (`--bw-font-family-mono` exists but no role/class uses it) for IDs, serials, device MACs | 🟡 |
| W-04 | **Forced colors / Windows High Contrast** not handled (`@media (forced-colors: active)` absent): focus ring and control borders made of shadows disappear | 🟡 |
| W-05 | Raw breakpoints in `createBiowaveTheme.ts`: `md: 840`, `xl: 1600` — breaks golden rule 2 ("add a token first"). Add `breakpoint` tokens for 840 (M3 expanded) and 1600 | 🟡 |
| W-06 | Safe-area insets (`env(safe-area-inset-*)`) in `devices.md` have no token / utility | 🟢 |
| W-07 | MUI components not themed beyond `CssBaseline`/`ButtonBase`: third-party MUI parts (Popover, Menu, Tooltip, DataGrid P-02) will render MUI defaults for radius, elevation, focus. Add component overrides for the shared ones (Paper elevation → `elevation-*`, `focusVisible` ring) | 🟡 |
| W-08 | Focus ring has no ready **CSS utility** (`.bw-focus-ring` / mixin); every component rebuilds it from 3 tokens | 🟢 |
| W-09 | Web page under 1200 px keeps the web type scale (by design). Document the 600–1199 web "tablet-width" behaviour in `grid.md` (which columns, which sidebar state) | 🟢 |

### 2.4 Tablet (Flutter)

| # | Gap | Sev |
|---|---|---|
| T-01 | **No mono font** in `BwFontFamily` (only `en`, `ar`, `arFallback`) — web has it | 🟡 |
| T-02 | `data*` text styles have **no `FontFeature.tabularFigures()`** | 🔴 |
| T-03 | **Fonts not bundled** in `biowave_foundations` (`pubspec.yaml` has no `fonts:`). Every app must add them by hand or falls back to Roboto | 🔴 |
| T-04 | **No layer / z-index** equivalent and no guidance on overlay order in Flutter (`layer.*` is web only) | 🟢 |
| T-05 | One grid for the whole 600–1199 range. M3 splits medium (600–839) and expanded (840–1199); portrait vs landscape tablet need different column / rail / sidebar rules. "248 (adaptive)" sidebar is not defined | 🟡 |
| T-06 | No **navigation rail** width token (Primary navigation Day 17 uses a rail on tablet) | 🟡 |
| T-07 | No **keyboard / pointer** rules for tablet with hardware keyboard (focus ring visible? hover states?) | 🟡 |
| T-08 | High contrast (`MediaQuery.highContrastOf`) and bold text (`boldTextOf`) not handled | 🟢 |
| T-09 | `BwElevation` and `BwTextStyles` `copyWith()`/`lerp` return `this` — theme switch snaps; `copyWith` overrides do nothing | 🟢 |
| T-10 | Foundations package has **no tests** (`2-foundations/flutter/test/` missing): no theme-builds-for-all-modes test, no contrast/tap-target guideline test | 🟡 |

### 2.5 Mobile (Flutter)

Shares T-01, T-02, T-03, T-04, T-08, T-09, T-10 (same package). Mobile-specific:

| # | Gap | Sev |
|---|---|---|
| M-01 | **No `no_legacy_icons_test.dart`** in `5-mobile-components/test` (tablet has it). `icons.md` Migration step 4 requires it | 🔴 |
| M-02 | No **bottom navigation bar** height token and no bottom-sheet / FAB layout tokens (Navigation bar Day 17, Bottom sheet Day 12) | 🟡 |
| M-03 | D-09: 6 columns vs M3 compact 4 — must be decided before layout patterns | 🔴 (S-01) |
| M-04 | Landscape on phones: `devices.md` says "portrait-first" but no rule for what happens in landscape (lock it, or which grid) | 🟢 |
| M-05 | Safe areas: rule exists, but no token for bottom-inset spacing above the home indicator for sticky actions | 🟢 |

## 3. To-do checklists (in order)

Do the **Shared** list first — every platform item below depends on it. Token items are Planner work (`npm run tokens` → guideline page → `CHANGELOG.md` → Figma sync → `npm run contract -- --all`).

### 3.0 Shared — do first
- [ ] 1. Close D-07, D-08, D-09, D-11 with the design lead; write the result in `AUDIT.md` §3 and ROADMAP §7 (S-01)
- [ ] 2. Add a **selected** state to every background role (+ `border-selected`, `text-selected` if needed) and contrast pairs (S-02) — before Chip (Day 4)
- [ ] 3. Add the **status** semantic layer: device status + request status → role mapping, with icon + text rule (S-04, B-02)
- [ ] 4. Add device **image size** tokens and reference them from `devices.md` (B-01)
- [ ] 5. Add `color-border-focus-inverse` to match the Figma `Focus/Ring Inverse` style (S-03)
- [ ] 6. Fix `surface-subtle` vs `surface-page` in light (S-08)
- [ ] 7. Add skeleton, scrollbar and text-selection tokens (S-06) — before Skeleton (Day 5)
- [ ] 8. Add opacity tokens (S-07)
- [ ] 9. Data-viz palette — before Dashboard (Day 25) (S-05)
- [ ] 10. Pick biometric modality and device-type icons (Material Symbols names or custom), index them in `_sync/figma-icons.json` (B-03, B-04)
- [ ] 11. Create `2-foundations/assets/` with devices (model list, placeholder, dark-mode rule), logos, illustrations (S-12, B-05)
- [ ] 12. Answer B-07: are device on-screen UIs in scope?
- [ ] 13. Figma clean-up: B-13, B-14, B-15 scopes, `_deprecated/*` (S-09)
- [ ] 14. Fix stale numbers in `a11y.md`, `2-foundations/README.md`, `Biowave Foundations.md` (S-11); add B-06, B-08 rules to `devices.md`

### 3.1 Web
- [ ] 1. Ship fonts in `@biowave/foundations` (Inter, IBM Plex Sans Arabic, JetBrains Mono; 400/500/600/700) via a `fonts.css` export (W-01)
- [ ] 2. Tabular numerals on `data-*` classes and `biowaveVariants.data*` (W-02)
- [ ] 3. Add breakpoint tokens for 840 and 1600; remove raw values from `createBiowaveTheme.ts` (W-05)
- [ ] 4. `forced-colors` support for focus ring and control borders (W-04)
- [ ] 5. MUI component overrides for Paper/Popover/Menu/Tooltip elevation, radius and focus (W-07) — before Menu/Tooltip
- [ ] 6. Mono typography role or class (W-03)
- [ ] 7. Focus-ring utility (W-08) and safe-area utility (W-06)
- [ ] 8. Document 600–1199 web behaviour in `grid.md` (W-09)

### 3.2 Tablet
- [ ] 1. Bundle fonts in `biowave_foundations` `pubspec.yaml` (T-03)
- [ ] 2. `FontFeature.tabularFigures()` on `data*` styles (generator change in `scripts/build.mjs`) (T-02)
- [ ] 3. Add `BwFontFamily.mono` (T-01)
- [ ] 4. Define medium vs expanded (portrait vs landscape) grid and the "adaptive" sidebar (T-05)
- [ ] 5. Navigation rail width token (T-06) — before Primary navigation (Day 17)
- [ ] 6. Hardware keyboard / pointer rules (T-07)
- [ ] 7. Foundations package tests: theme builds for 2 platforms × 2 themes × 2 locales, contrast and tap-target guidelines (T-10)
- [ ] 8. High contrast / bold text (T-08); real `copyWith`/`lerp` on `BwElevation`, `BwTextStyles` (T-09); overlay-order note (T-04)

### 3.3 Mobile
- [ ] 1. Same as Tablet 1–3 (one shared package — done once)
- [ ] 2. Add `test/no_legacy_icons_test.dart` to `5-mobile-components` (M-01)
- [ ] 3. Apply the D-09 decision to `platform/mobile.json` (M-03)
- [ ] 4. Navigation bar height and bottom-sheet tokens (M-02) — before Day 12 / Day 17
- [ ] 5. Landscape rule (M-04) and bottom safe-area spacing token (M-05)
- [ ] 6. Same as Tablet 7–8 (shared package)

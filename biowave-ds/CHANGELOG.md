# Changelog

Every change to the design system is logged here **in the same task**, newest first (AGENTS.md rule 9). Format: [Keep a Changelog](https://keepachangelog.com); versions follow SemVer per package. Component detail also goes to that component's Part F.

## [Foundations — Spacing 2.0] — 2026-10-29
### Changed — **breaking**
- **Three levels** (plan: `_workflow/tasks/2026-10-29-spacing-2.0.md`): control (`spacing-control-*`, the step equals the control size), component (`spacing-none … 3xl`, same on every platform), layout (new, per platform). Every spacing token now has a "Use for / Not for" description, in the token source and in Figma (21 variables); the 8 control tokens had none.
- **Added** `spacing-layout-section` 40/32/24 · `group` 24/24/16 (= gutter) · `stack` 16/16/12 · `container` 24/24/16 (Web/Tablet/Mobile) in `tokens/platform/*.json` → CSS `--bw-spacing-layout-*` (switches with viewport / `data-platform`), TS `cssVars.spacing.layout.*`, Flutter `BwLayout` `sectionGap · groupGap · stackGap · containerPadding`. Figma: `6. Grid & Layout › spacing/layout/*`, aliased to `_Primitive › Spacing/*`, scope GAP, Flutter code syntax `context.bw.layout.*`.
- **Removed** `spacing-4xl … 11xl` (unused by components) and `BwSpacing.xl4 … xl11`; Figma → `_deprecated/spacing/*`.
- Figma `3. Spacing` scope: GAP only (spacing no longer shows in width/height fields). `figma-map.mjs` updated; Figma verified 32/32 and marked synced.
- Web Components file: 1,585 paddings/gaps bound to an older library's `spacing-0 · xxs · xs · sm · md · lg` (different keys, same values) rebound to the Foundations `spacing/*` (825 in main layers, 760 instance overrides; no value changed). 329 bindings to the removed `spacing/4xl · 5xl · 6xl` remain, all in documentation frames (Introduction, Variations, Props, Components List) — they keep resolving and go away when the docs are rebuilt from the Doc Kit.
- Docs viewer (`_docs/viewer.css`): removed steps replaced — page padding → `grid-margin-full`, section gaps → `spacing-layout-section`, card padding → `spacing-layout-container`, illustration sizes → `size-icon-*`.
- `spacing.md` rewritten (levels, decision order, Use/Not tables, layout section, example, Figma and code usage); `grid.md` links to layout spacing; AUDIT §10.

## [Planning — Spacing 2.0 brief] — 2026-10-29
### Added
- `_workflow/tasks/2026-10-29-spacing-2.0.md`: approved plan for Codex — spacing in three levels (control · component · layout), new platform tokens `spacing-layout-section · group · stack · container` (Web/Tablet/Mobile), `spacing-4xl … 11xl` removed, "Use for / Not for" descriptions for every spacing token, Figma scope GAP only. No token changed yet.

## [Repository — branches merged and cleaned up] — 2026-10-29
### Changed
- Merged into `main`: `rules/component-tokens-semantic` (#5, AGENTS.md rule 3b), `fix/docs-live-icon` (#12), `docs/live-icon-and-foundations-audit` (#11, adds `_audits/foundations.md`; the Pin toggle demo keeps the #12 fix), `ds/button-group-web` (review round 3 Approved). Button group contracts regenerated after the merge.
- Checks on merged `main`: `tokens`, `component-tokens`, `docs:check`, `typecheck`, `sync` ✓ READY, `test:web` 224/224.
### Removed
- Finished branches already merged through pull requests: `ds/button-web`, `ds/icon-button-mobile`, `ds/icon-button-tablet`, `ds/icon-mobile`, `ds/split-button-mobile`, `ds/split-button-tablet`, `claude/confident-sinoussi-852bf7`, plus the four merged above. Superseded plan-only branches `ds/badge-tablet` and `ds/link-tablet` (plans already on `main` via #19 / #16).
- Kept (still in the workflow, synced with `main`): `ds/chip-web`, `ds/text-field-mobile`, `ds/text-field-tablet`.

## [Check — Token changes applied to built components] — 2026-10-29
### Checked
- After colour tokens 2.0 / 2.1, borders, typography 2.0 and the collection renumbering: `npm run tokens` rebuilds with no change to generated CSS / TS / Dart (402/402 contrast pairs), `npm run sync` READY (Figma variables, component tokens in all 3 files and the library index in sync; all 33 contracts current), `docs:check`, `typecheck` and `test:web` (220/220) pass.
- Every token reference in web code (`--bw-*`, `cssVars.*`), Flutter code (`context.bw.colors.*`), `*.tokens.json` aliases, specs and `_templates` resolves to a token in `dist/tokens.json`; no raw colours in component code.
### Fixed
- Leftover old names in prose: Button B3 and Link B3 / C4 `-hover` → `-hovered`; Icon button D3 state layer `{overlay-hover|pressed}` → `{background-transparent-hovered|pressed}` (also fixes the tablet and mobile Figma contracts); `guidelines/icons.md` `color-icon-neutral-*` → `color-icon-default · subtle · subtlest`; Foundations README `border-input-*` → `color-border-bold`; `_audits/input-family.md` token table updated to the 2.x names (used for the input-family plans). Contracts regenerated.
- Docs viewer text-field demo matched to Text field B3.2: border `color-border-bold` (was `border-strong`), fill `color-background-base-default`, hover = `color-background-base-hovered` fill (was a darker border), read-only = `color-background-base-subtlest` + `color-border-default` (was dashed), add-on `color-background-neutral-default` · `color-text-subtle` with the field border as divider.

## [Sync — Collections renumbered] — 2026-10-28
### Changed
- Foundations collections renumbered in Figma after the AR typography collection was deleted: `7. Grid & Layout` → `6. Grid & Layout`, `9. Border` → `7. Border` (variable IDs and keys unchanged). Sync tooling (`figma-map.mjs`, `component-tokens.mjs`, `sync.mjs`, `figma-read.js`) and the badge/link/button specs updated. Figma variables verified (16/16) and marked synced.
- After the publish: component-token aliases in Web (12), Tablet (13) and Mobile (13) still pointed at the stale `9. Border` copy and were re-pointed to `7. Border` (same variables); no layer binds a stale copy. Component tokens marked synced, library index re-read (keys unchanged), contracts regenerated; `docs:check` OK, `npm run sync` READY.

## [Sync — Deprecated AR typography unpublished] — 2026-10-28
### Changed
- `_deprecated · 6. Typography (AR)` unpublished from the Foundations library (no component file uses `Web/ar/*` styles). Library index reach: 7 collections, 287 variables (unchanged). Figma contracts regenerated; `docs:check` OK, `npm run sync` READY.

## [Sync — Web Components typography migration] — 2026-10-28
### Changed (Figma, Web Components file only)
- 921 text layers that held old versions of the Biowave styles (same keys) now use the current `{role}/{size}` styles; no visual change.
- Link variants: `Web/ar/action/md · lg` (168 layers) → `action/md · lg`; their 168 components get the `Web · AR` mode of `5. Typography` (verified: IBM Plex Sans Arabic Medium 16).
- Legacy kit styles mapped to the nearest Biowave style: `Text sm/Medium` → `label/lg` (240), `Text sm/Regular` → `body/md` (42), `Text md/Regular` → `body/lg` (52), `Text xs/Medium` → `label/sm` (20), `Display xl/Medium` → `display/lg` (24, now smaller than the old 60/72), `Button/Button-3 Medium` → `action/md` (29), `Body S` → `body/sm` (14), `Input M` → `body/lg` (8); 21 stale instance overrides refreshed.
- All 13 pages default to `Web · EN`.
### Left as is
- ~2,700 text layers without a style: documentation text (Montserrat) and raw Inter/IBM Plex text, plus ~100 layers inside remote instances. The Figma Agent replaces them when it rebuilds from the contracts. With this, no component file uses the `Web/ar/*` styles, so `_deprecated · 6. Typography (AR)` can be unpublished.

## [Sync — Typography published: library index and contracts] — 2026-10-28
### Changed
- Library index refreshed after the Foundations publish: 287 variables (`5. Typography` 59 with new keys), 23 text styles (`{role}/{size}`); reachable from the component files: 287. The deprecated AR collection is no longer published.
- `contract.mjs`: style detection limited to `{role}/{lg|md|sm}` (component-token names such as `label/default` are not styles).
- All contracts regenerated (text styles `action/{sm|md|lg}` … with keys). `docs:check` OK, `npm run sync` READY.
### Found (not changed)
- The Web Components file still shows the old style names (`Web/en/*`, `Web/ar/*`) until the library update is accepted there, and uses legacy kit styles (`Text sm/Medium`, `Display xl/Medium`, `Button/Button-3 Medium`, `Body S` …, ~420 text layers) plus ~2,600 text layers with no style. Migration to the 23 styles + frame modes is a separate task.

## [Foundations — Typography primitives] — 2026-10-28
### Changed
- **Every typography value points to a primitive.** New flat primitive scales (no platform or language in the name): `font.size.{11…40}`, `font.line-height.{16…50}`, `font.letter-spacing.none · tight`; platform tokens (web/tablet/mobile) now alias them instead of holding numbers (generated CSS/Dart unchanged). Figma `_Primitive`: `Typography/Size/{n}`, `Line Height/{n}`, `Weight/{400|500|600}`, `Letter Spacing/none · tight`, `Font Family/EN · AR · Mono`; all 312 `5. Typography` mode values alias them (action keeps its alias to label/title). 97 old platform/language-scoped primitives (`Typography/Size/Web/14`, `Line Height/Mobile/ar/26` …) and the string weights → `_deprecated/`.
- **Weights are numeric.** `font/weight/{role}` recreated as FLOAT (FONT_WEIGHT scope) aliasing `Typography/Weight/{n}`; the 23 text styles now bind **font weight** instead of font style, so one primitive serves Inter (`Semi Bold`), IBM Plex Sans Arabic (`SemiBold`) and JetBrains Mono. Old string variables → `_deprecated/font/weight/*`. Verified in Web · EN, Tablet · AR and Mobile · AR.
- **Three weights only:** 400 / 500 / 600. `primitive.font.weight.bold` (700) removed (unused); italics deprecated in Figma; web font setup 400/500/600. Inline emphasis = 600.
- `typography.md`: primitives section and weight rule.

## [Foundations — Typography 2.0] — 2026-10-28
### Changed
- **Figma: one typography collection.** `5. Typography (EN)` converted in place into **`5. Typography`** with six modes `Web · EN`, `Web · AR`, `Tablet · EN`, `Tablet · AR`, `Mobile · EN`, `Mobile · AR` (existing modes renamed, IDs kept; AR values copied in). Variables renamed to the code paths: `font/family/default`, `font/family/mono`, `font/size/{role}/{size}`, `font/line-height/{role}/{size}`, `font/weight/{role}`, `font/letter-spacing/display · default` (new; display was a raw −0.16). Scopes and WEB code syntax set.
- **23 text styles** named `{role}/{size}` — the code class names. The `Web/en/*` styles were renamed in place (keys kept) and rebound to the new collection, so existing text keeps its style; one style now serves every platform and language through the frame mode. 115 duplicates (`Web/ar/*`, `Tablet/*`, `Mobile/*`, `*/md-medium`) → `_deprecated/`. Every style has a usage description.
- `Font Weight/*` (8 variables incl. italics, not in code) → `_deprecated/`. `6. Typography (AR)` renamed `_deprecated · 6. Typography (AR)` and kept published until component files move off the `Web/ar/*` styles.
- **`action` role aliased:** `action-lg` = `title-lg`, `action-md` = `label-lg`, `action-sm` = `label-md` (size, line height en/ar, weight) in the platform tokens and in Figma — same values as before, can no longer drift.
- Component specs and the template: text styles `Web/{en|ar}/x/y` → `x/y`; page typography mode → `<Platform> · EN` / `· AR` of `5. Typography`.
- `typography.md` rewritten: how one name maps to web / Flutter / Figma, variable ↔ token table, and a usage table (style → components, weight, Web/Tablet/Mobile size and line height EN · AR).
### Added
- **`code` role** (`code-md`, `code-sm`, JetBrains Mono, regular; web 13/20 · 12/16, tablet/mobile 14/22 · 12/18) for serial numbers, device IDs and keys: CSS `.bw-text-code-*`, MUI `codeMd/codeSm`, Flutter `codeMd/codeSm` + `BwFontFamily.mono`, Figma styles `code/md`, `code/sm`.
- `.bw-text-data-*` and `.bw-text-code-*` include `font-variant-numeric: tabular-nums`.
- Sync tooling: `figma-map.mjs` typography section → single collection; `component-tokens.mjs`, `figma-read.js` collection names; `contract.mjs` detects `{role}/{size}` style names.

## [Sync — Component tokens, library index, contracts] — 2026-10-28
### Changed
- Component tokens applied to the Web, Tablet and Mobile Figma files with the restored `figma-apply-tokens.template.js`: 10 collections / 66 variables per file updated in place (no collection, mode or variable created or removed; IDs kept, so component bindings keep working). Aliases now point to `background/disabled`, `border/bold`, `background/transparent/hovered · pressed`, `background/base/hovered` (text field hover). Lint 0 violations; values match `tokens.json` in every file (digest check). `sync:done:tokens:web · tablet · mobile`.
- Library index `_sync/figma-library.json` refreshed after the Foundations publish: 347 variables (154 colour), 22 removed, effect styles renamed to `_deprecated/` recorded; reachable from the component files: 347.
- All 33 code and Figma contracts regenerated with the new names and keys. `npm run sync` → READY; `docs:check` OK.

## [Foundations — Borders are tokens, never shadows · warning 600] — 2026-10-28
### Changed
- **Rule (Hassan):** borders and rings are drawn with `color-border-*` tokens on a real stroke — CSS `border` / `outline`, Flutter `Border`, Figma stroke — never with `box-shadow` / effect styles. Written in `border.md` (with the Figma focus-ring layer recipe) and `elevation.md`; elevation tokens are for lift only.
- `shadow-control` removed (its third layer was a 1px inset ring); Figma `color/shadow/control-drop · control-ring` → `_deprecated/`; effect styles `Shadow/Control`, `Focus/Ring`, `Focus/Ring Inverse` → `_deprecated/` (IDs kept, existing layers keep rendering until rebuilt).
- Web Badge cut-out ring: `box-shadow` → `outline` (`border-width-strong` + `color-border-inverse`, no layout change); spec B2/B9 and test updated.
- Web Split button menu item focus: inset `box-shadow` → `outline` with negative `outline-offset`.
- Button, Icon button and Link Figma specs (Part D) and the component template: focus ring = `Focus ring` stroke layer bound to `color/border/focus` (`color/border/inverse` on Inverse) instead of effect styles.
- Docs viewer and preview: inset-shadow borders → `border`.
- **Warning ramp:** `warning.600` `#FF8C32` → `#EC842C` (and its alpha ramp), so `background-warning-hovered` is visibly between default 500 and pressed 700. Dark text on it 7.45:1.

## [Foundations — Semantic colour tokens 2.1] — 2026-10-28
### Added
- `color-background-selected-default · hovered · pressed` (primary 50 · 100 · 200 / dark 600 · 500 · 400): one selection fill for table rows, list/menu items, active nav, tabs, chips, cards. Text on it stays `text-default` or `text-role-brand` (no text/icon selected tokens — the role token does the job).
- **Accent role** (orange, separate from warning; raw hex until a primitive ramp exists): `background-accent-default · subtle · subtlest · hovered · pressed`, `text/icon-role-accent`, `text/icon-on-accent`, `border-accent`. Flutter maps it to Material 3 `tertiary` / `tertiaryContainer` (was info).
- **`color-data-*`** group (raw hex): `categorical-1…8` (fixed order: brand blue · gold · rose · teal · orange · violet · magenta · olive), `sequential-1…5` (brand blue, light→dark), `tag-1…8-background / -text` for tags and avatars. Validated with the dataviz checks in both themes (lightness band, chroma ≥ 0.10, adjacent CVD ΔE ≥ 8, normal-vision ΔE ≥ 15, marks ≥ 3:1 on page and default surfaces, first 3 slots pass all-pairs for scatter/map); tag labels ≥ 4.5:1.
- `color-border-bold` (n500 / n400, ≥ 3:1): the control boundary, replacing the input-only group.
- `2-foundations/scripts/foundations-md.mjs`: `tokens/Biowave Foundations.md` is now generated on every `npm run tokens` (old hand-made file deleted).
- `_sync/figma-apply-tokens.template.js` recreated (it had never been committed: `.gitignore` rule `figma-apply-*.js` matched it). Negation rule added in both `.gitignore` files.
- Contrast pairs: 201 per theme (402 checks, all pass).
### Changed
- **One disabled fill:** `color-background-disabled` replaces `base-, neutral-, brand-, secondary-, success-, error-, warning-, info-disabled`. `background-transparent-disabled` removed — a disabled ghost control stays `background-transparent-default`.
- **Overlay is one token:** `color-overlay-default` (was `overlay-backdrop`). `overlay-hovered/pressed/subtle` merged into `background-transparent-hovered/pressed` (identical values); `overlay-scrim` → `overlay-default`; `overlay-brand` → `background-selected-default`; role overlays removed.
- **Borders:** input group removed (`border-input-default` → `border-bold`, `-error` → `border-error`, `-hovered` → `border-bold`). Role borders now ≥ 3:1 (light 500–700 steps, dark 300). Every border, link, overlay and shadow token has a description.
- `color-link-visited` → error 700 / 300 (was identical to hovered).
- Dark `text/icon-role-brand` → primary 100 (keeps 4.5:1 on the selected fills).
- **Text field:** hover keeps `border-bold` and changes the fill to `background-base-hovered` (Atlassian pattern) — web code, test and spec B3.
- **MUI:** `action.hover` → `background-transparent-hovered` (was `overlay-subtle`, a different dark value), `action.selected` → `background-selected-default`, `focus` → `background-transparent-pressed`, `disabledBackground` → `background-disabled`.
- **Flutter M3:** `tertiary*` = accent; container ladder fixed (`surfaceContainerLowest` = page in dark, `surfaceContainerHighest` = `background-base-subtle`); `hoverColor`/`focusColor` = transparent hovered/pressed.
- Figma Foundations: renamed in place (`overlay/backdrop`, `border/input/default`, `background/base/disabled` keep their IDs), 42 created, 20 moved to `_deprecated/` and aliased to their replacement, descriptions on all 145 colour variables, verified value by value.

### Migration map
| Old | New |
|---|---|
| `color-background-{base,neutral,brand,secondary,success,error,warning,info}-disabled` | `color-background-disabled` |
| `color-background-transparent-disabled` | `color-background-transparent-default` |
| `color-overlay-backdrop` · `color-overlay-scrim` | `color-overlay-default` |
| `color-overlay-hovered` · `-pressed` · `-subtle` | `color-background-transparent-hovered` · `-pressed` · `-hovered` |
| `color-overlay-brand` | `color-background-selected-default` |
| `color-border-input-default` · `-hovered` · `-error` | `color-border-bold` · `color-border-bold` · `color-border-error` |

## [Foundations — Semantic colour tokens 2.0] — 2026-10-27
### Changed
- **Surface vs Background documented and tagged.** New section *Surface vs Background — read this first* in `guidelines/colors.md`. Every surface description starts with `[Surface · static, no states]`, every background description with `[Background · interactive, has states]`; usage descriptions name the components per platform. Group descriptions updated.
- **State rename `hover` → `hovered`** everywhere (Hassan's decision, one naming pattern for the whole system): `background-*-hover`, `link-hover`, `border-input-hover`, `overlay-hover`.
- **Background:** `transparent` is now a group (`default` · `hovered` · `pressed` · `disabled`). `base` gains `subtle` (n100 / n800) and `subtlest` (n50 / n950). Every colour role (brand, secondary, success, error, warning, info) has `default · subtle · subtlest · hovered · pressed · disabled`: `subtle` = 100 light / 900 dark, `subtlest` = 50 light / 950 dark. `neutral` kept as a role for the grey filled button (`default · hovered · pressed · disabled`). All `*-disabled` fills = n100 / n800 (were n300 / n700: white label measured 1.88:1).
- **Text / icon:** `neutral` level removed — `text-default · subtle · subtlest · inverse · disabled` (same for `icon-*`). `text-subtlest` = n600 / n300, merging `muted` and `placeholder` (n500 measured 4.23:1 on a subtle input fill). `text-disabled` dark n500 (n600 measured 1.92:1). Role text that failed on its tonal fill darkened: `text-role-error` error.800, `text-role-warning` warning.900. **Icons now mirror text** (names and values); `icon-role-*` were 600/700 steps (error 3.48:1, warning 3.03:1 on page).
- **Badge (web code, all three specs):** `count` × `warning` label `color-text-on-warning` → `color-text-inverse` on the `color-icon-role-warning` fill (the darker role icon made dark text fail).
- `contrast-pairs.json`: +41 pairs (neutral text on every surface/base fill, role text/icon on its subtle and subtlest fills, `on-*` on default/hovered/pressed, neutral and inverse controls). 246/246 checks pass.
- Component specs, tokens.json files, web/Flutter code, tests, templates, docs viewer CSS and README updated to the new names. Code contracts and Figma contracts are regenerated after the Foundations library is re-read (new keys).

### Migration map
| Old | New |
|---|---|
| `color-background-transparent` | `color-background-transparent-default` |
| `color-background-{role}-hover` | `color-background-{role}-hovered` |
| `color-background-neutral-subtle` | `color-background-base-subtlest` |
| `color-text-neutral-{default,subtle,inverse,disabled}` | `color-text-{default,subtle,inverse,disabled}` |
| `color-text-neutral-muted` · `color-text-neutral-placeholder` | `color-text-subtlest` |
| `color-icon-neutral-{default,subtle,inverse,disabled}` | `color-icon-{default,subtle,inverse,disabled}` |
| `color-icon-neutral-muted` | `color-icon-subtlest` |
| `color-link-hover` · `color-border-input-hover` · `color-overlay-hover` | `…-hovered` |

### Found (not changed)
- `warning.500` and `warning.600` primitives are almost identical (8.99 vs 8.53:1 with dark text), so the warning `hovered` fill barely shows. Regenerate `warning.600` darker in a later primitives pass.

## [Review — Web Avatar round 2] — 2026-10-24
### Changed
- Reviewed web `Avatar` (round 2, `avatar.md` › E3): **Approved**. In headless Chrome with a server-side request log, a photo 6000 px below the fold is not requested until it is scrolled near. Initials show while the hidden `img` loads. A 404 removes the `img`. A `src` change returns to loading. A cached photo shows synchronously with no fallback frame. `new Image()` was never called. Round 1 measurements still hold (sizes 32/40/48/56, radii, B3 colours, `SA` / `س`, Badge top-end with top-left in RTL, roles, not focusable). The RTL test now asserts direction and placement in en and ar. docs:check, typecheck and test:web (220/220) pass. All three Round 1 findings fixed; 1 new Executor nit (stale-event test step). Code → `Approved`; Plan stays `Finished`.

## [Fixed — Web Avatar review round 1] — 2026-10-24
### Fixed
- Replaced the eager `new Image()` probe and MUI image path with the real first-render `<img loading="lazy">`, kept it box-preserving and hidden until its own load event, removed it after error, guarded stale events and cached completion, and retained the fallback throughout loading and failure. Avatar tests now fire events on that rendered image, prove no eager probe, and assert the Badge's exact logical top-end placement in both English and Arabic. The full web suite passes 220/220 at default timeouts.

## [Plan — Avatar 1.1 (web, tablet, mobile)] — 2026-10-24
### Changed
- Avatar plan 1.0 → 1.1, answering the Planner nits of Web review round 1. **Web #1 (lazy loading):** B2 › image — Avatar renders the real `img` from the first render with `loading="lazy"`, `visibility: hidden` until its own `load` event (never `display: none`), removed on `error`; container `position: relative`. C3 › Load tracking drops the `new Image()` probe and MUI `src` / `slotProps.img`; `useImageLoaded(src)` tracks the `img`'s own events (stale events ignored, hydration `complete` check). B4 `src` change, B9 (content priority, lazy loading, `src` change, stronger RTL badge assertion for Executor nit #3), C5, C6 (fire `load` / `error` on the `img`), C7 AC-8 – AC-10 and a **Fix round 1 — Executor task list**. **Web #2:** header `Source code` links `src/components/avatar/`. **Tablet / mobile:** B2 › image note — the `ImageProvider` resolves only when the widget is built (lazy lists build visible rows only); no pre-fetch. Part A unchanged; no API or token change. Version 1.1 on all three; web Plan → Finished (header + README), Code stays Approved until the fix round; contracts and docs pages regenerated.

## [Review — Web Avatar round 1] — 2026-10-24
### Changed
- Reviewed web `Avatar` (round 1, `avatar.md` › E2): **Approved**. Measured in headless Chrome in light/dark × en/ar: sizes 32/40/48/56, circle 9999 px vs square 6/8/10/12 px, B3 colours (lowest contrast light secondary icon 6.39:1), image → initials → `person` fallback while loading, after a 404 and on `src` change, initials `SA` / `س` / custom, Badge `overlap` by shape at the top-end corner (top-left in RTL) with the avatar box unchanged, `decorative` vs named `role="img"`, never focusable. docs:check, typecheck and test:web (166/166) pass. 2 Planner nits (lazy loading vs the C3 probe, stale header link) and 1 Executor nit (RTL test strength). Code → `Approved`; Plan → `Open`.

## [Code — Web Avatar 1.0] — 2026-10-24
### Added
- Built the token-only MUI Avatar with photo loading and error fallbacks, grapheme-safe Latin and Arabic initials, Icon fallback, four sizes, two shapes, three colours, Badge composition, decorative and named accessibility, RTL support, public exports, development warnings and complete contract tests.

## [Preview — Mobile Avatar 1.0] — 2026-10-23
### Added
- Added light/English and dark/Arabic RTL mobile Avatar planning sheets covering sm/md/lg/xl sizes, circle/square shapes, neutral/brand/secondary colours, image/initials/person content and loading/failed fallbacks, 48dp touch targets, plus mirrored count/dot badge placement, resolved token values, prompts and visual check notes.

## [Preview — Tablet Avatar 1.0] — 2026-10-23
### Added
- Added light/English and dark/Arabic RTL tablet Avatar planning sheets covering sm/md/lg/xl sizes, circle/square shapes, neutral/brand/secondary colours, image/initials/person content and fallbacks, plus mirrored count/dot badge placement, resolved token values, prompts and generation check notes.

## [Preview — Web Avatar 1.0] — 2026-10-23
### Added
- Added light/English and dark/Arabic RTL Avatar planning sheets covering sm/md/lg/xl sizes, circle/square shapes, neutral/brand/secondary colours, image/initials/person content and fallbacks, plus mirrored count/dot badge placement, with resolved token values and generation check notes.

## [Plan — Avatar 1.0 (Web, Tablet, Mobile)] — 2026-10-23
### Added
- New component **Avatar** planned on all three platforms (Roadmap Day 4; depends on Icon and Badge 1.0): `3-web-components/components/avatar/avatar.md`, `4-tablet-components/components/avatar/avatar.md`, `5-mobile-components/components/avatar/avatar.md` (Parts A–D and F; Part A identical except A8). Image → initials → `person` glyph fallback (fallback shown while the image loads and after an error), initials rule (two Latin initials, one letter for Arabic-script names), sizes `sm`·`md`·`lg`·`xl` on `size-control-height-*`, shapes `circle`·`square`, colours `neutral`·`brand`·`secondary` (subtle backgrounds, no status meaning), one Badge placed by shape (`overlap` `circular`/`rectangular`), `decorative` mode, never focusable. Web on MUI `Avatar` + `Icon` + `Badge`; Flutter custom `BwAvatar` + `BwIcon` + `BwBadge`. No component tokens (P-04): no `avatar.tokens.json`. Plan `Finished`, Code and Figma `Planned`; contracts and docs pages generated; rows added to the three section READMEs.

## [Review — Web Tooltip round 2: Approved] — 2026-10-24
### Changed
- Tooltip (web, plan 1.1) review round 2: **Approved** — Part E3 of `3-web-components/components/tooltip/tooltip.md`. Round 1 #1 fixed: in headless Chrome a pointer moving 1, 2 or 4 px per frame from the anchor across the gap keeps the tooltip open in every placement, en and ar, and when flipped (36/36); the gap hit-tests to the popper and the visible gap is still 4 px (`spacing-xs`). #2 fixed: exactly one described-by element in every sample, including both exit fades. #3 fixed (header link). Round 1 timings, keyboard-only focus open, Esc, reduced motion, sizes, colours and accessible names still hold. One 🟢 nit for a follow-up (an explicit `aria-label={undefined}` on a `label` child drops the name). Code → Approved, Review → Round 2 (header + README). `docs:check` ✓, `typecheck` ✓, `test:web` 146/146 ×3 ✓, `component-tokens` ✓, `sync` READY.

## [Fixed — Web Tooltip review round 1] — 2026-10-24
### Fixed
- Moved the `spacing-xs` anchor gap into the interactive Popper as the tooltip's resolved-placement, anchor-facing logical margin; removed the Popper offset modifier; restored the closed description copy only after `Fade` exits so the described-by id has one owner; linked the source header; and added frame-by-frame hover, negative-control, eight-case gap-geometry and exit-fade id regressions. The full web suite passes 146/146 in three consecutive default-timeout runs.

## [Plan — Tooltip 1.1 (web, tablet, mobile)] — 2026-10-24
### Changed
- Tooltip plan 1.0 → 1.1, answering Web review round 1 Planner blocker #1 (not hoverable, WCAG 1.4.13). **Web:** C3 › Offset drops the popper `offset` modifier; the `spacing-xs` gap becomes the tooltip's anchor-facing margin (`tooltipTokens.offset`, `cssVars.spacing.xs`, logical properties keyed on the resolved `data-popper-placement`), which lies inside the popper box MUI's interactive mode listens on; `leaveDelay` stays 0; C3 › Description id (show the hidden copy only after `Fade` `onExited`). B2 / B4 / B6 notes; B9 adds a step-by-step hover-across-the-gap test (timers advanced one frame between pointer events, with a negative control), a gap-geometry test and a one-id-during-exit check; C5 / C6 / C7 AC-7 – AC-10 and a **Fix round 1 — Executor task list** for #1, #2 (duplicate described-by id during exit) and #3 (header Source code). **Tablet / mobile:** the same gap problem existed for pointer hover (`RawTooltip` `dismissDelay: BwDuration.instant`, gap outside the `MouseRegion`); C3 › Position now puts the gap as transparent main-axis padding inside the hover area, the padded child touching the target, edge clamp `BwSpacing.md - BwSpacing.xs` on the main axis; B2 / B6 notes, B9 test, AC-7. Part A unchanged; no token or API change. Version 1.1 on all three; web Plan → Finished (header + README), Code stays Changes requested; contracts and docs pages regenerated.

## [Review — Web Tooltip round 1: Changes requested] — 2026-10-24
### Changed
- Tooltip (web) review round 1: **Changes requested** — Part E2 of `3-web-components/components/tooltip/tooltip.md`. Headless Chrome confirms B2–B6 tokens, hover delay 500 ms, keyboard-only immediate open, enter 200 ms decelerate / exit 100 ms accelerate, reduced motion 0 ms, max width 320 px, offset 4 px, both themes, logical placement with the RTL swap and flip, and the label / description / disabled names. 🔴 #1 (Planner): not hoverable — C3's `margin: 0` + popper `offset` leaves the 4 px gap outside the popper, so a pointer moving onto the tooltip closes it (WCAG 1.4.13). 🟢 #2 duplicate description id during the exit fade; 🟢 #3 stale header `Source code`. Plan → Open, Code → Changes requested (header + README). `docs:check` ✓, `typecheck` ✓, `test:web` 133/133 ×3 ✓, `sync` READY.

## [Added — Web Tooltip 1.0] — 2026-10-24
### Added
- Implemented and exported the token-styled React + MUI `Tooltip` with logical RTL placement, label and persistent-description semantics, controlled and uncontrolled interaction, hoverable and Escape-dismissible behavior, reduced motion, disabled-anchor support and 26 tests across light/dark, English/Arabic, motion, placement and axe accessibility; all 133 web tests passed in three consecutive full runs.

## [Plan — Tooltip 1.0 (web, tablet, mobile)] — 2026-10-23
### Added
- Added mobile Tooltip light/English and dark/Arabic RTL planning sheets covering logical top/bottom/start/end placement, label and description purposes, long-press and tap triggers, five states, 48 px touch targets, exact token callouts, 4 px anchor offset, and the 320 px two-line maximum-width specimen.
- New component **Tooltip** planned on all three platforms: `3-web-components/components/tooltip/tooltip.md` (`Tooltip`, MUI `Tooltip` + `Fade`), `4-tablet-components/…` and `5-mobile-components/components/tooltip/tooltip.md` (`BwTooltip`, Flutter `RawTooltip` because M3 `Tooltip` does not expose its fade duration and curve). Part A shared (A8 per platform): options `placement` (`top` · `bottom` · `start` · `end`, logical), `purpose` (`label` · `description`), `trigger` (touch: `long-press` · `tap`); WCAG 1.4.13 dismissible / hoverable / persistent; EN + AR copy. Tokens and timings reuse the approved Icon button web temporary tooltip (B3.4: `color-surface-inverse`, `color-text-neutral-inverse`, `label-sm`, `radius-sm`, `spacing-xs` / `spacing-md`, offset `spacing-xs`; B4: hover delay `motion-duration-2xl`, keyboard focus immediate, enter `md` `standard-decelerate`, exit `sm` `standard-accelerate`, reduced motion instant) plus max width `size-container-xxs`. No component tokens (P-04), no token gaps. Icon button and Text field help-tooltip migration recorded as follow-ups in C2 (not edited). Plan → Finished, Code / Figma → Planned (headers + section READMEs); contracts and docs pages generated.
- Added tablet Tooltip light/English and dark/Arabic RTL planning sheets covering logical top/bottom/start/end placement, label and description purposes, long-press and tap triggers, five states, 48 px touch targets, exact token callouts, 4 px anchor offset, and the 320 px two-line maximum-width specimen.

## [Review — Web Divider round 2: Approved] — 2026-10-24
### Changed
- Divider (web) review round 2: **Approved**, no findings. See Part E3 of `3-web-components/components/divider/divider.md`. Round 1 #1 fixed: in headless Chrome (light/dark × en/ar) an unlabelled `component="li"` divider in a plain `<ul>` is 1px tall, `display: block`, `list-style-type: none`, no own margin or padding. #2 fixed (computed Arabic label `paddingInline` test); #3 fixed by the Planner step. Round 1 measurements still hold (thickness, emphasis colours, insets + RTL, vertical, label, AX tree); axe 0 violations. Code → Approved (header + README). `docs:check` ✓, `typecheck` ✓, `test:web` 119/119 ✓, `sync` READY.

## [Fixed — Web Divider review round 1] — 2026-10-24
### Fixed
- Reset unlabelled `component="li"` Divider roots to block layout with no list marker or own margin/padding, so they render with the same tokenized one-line height and border as the default `hr` in English and Arabic. Added regression coverage for the list style, rendered height/border, and computed Arabic inline label padding. `docs:check` ✓; `typecheck` ✓; `test:web` 119/119 ✓ at default timeouts.

## [Plan — Web Divider 1.1 header fix] — 2026-10-24
### Changed
- Divider (web) answering Review round 1 Planner finding #3: header **Source code** row in `3-web-components/components/divider/divider.md` now links the built folder [`src/components/divider/`](3-web-components/src/components/divider/); Part F2 line added. No spec change (Executor findings #1–#2 keep their E2 fixes). Plan Open → Finished (header + `3-web-components/README.md`); Code stays Changes requested; web Divider contract regenerated.

## [Review — Web Divider round 1: Changes requested] — 2026-10-24
### Changed
- Divider (web) review round 1: **Changes requested**. See Part E2 of `3-web-components/components/divider/divider.md`. Checked in headless Chrome (light/dark × en/ar): thickness, the three emphasis colours, insets (start flips in RTL), vertical stretch and fallbacks, label metrics and wrapping all match the tokens; the AX tree matches B6; axe has 0 violations, including a `<ul>` with `li` dividers. 🔴 #1: an unlabelled `component="li"` keeps `list-style: disc`, so it shows a bullet and is 23/25px tall (Executor). 🟢 #2: computed-padding test for the Arabic label (Executor). 🟢 #3: stale Source code header row (Planner). Plan → Open, Code → Changes requested (header + README). `docs:check` ✓, `typecheck` ✓, `sync` READY, `test:web` 118/118 in runs 2–5 (run 1 117/118 under load).

## [Added — Web Divider 1.1] — 2026-10-24
### Added
- Built and exported the token-styled web `Divider` with horizontal and vertical orientations, three emphasis levels, logical start/both insets, optional centred labels, decorative and list semantics, development warnings with specified fallbacks, and forwarded root refs/data attributes. Added 11 table-driven tests covering both themes and languages, RTL/logical CSS, tokens, labels, semantics, invalid combinations, axe, and three consecutive 118/118 full-suite runs at default timeouts.

## [Preview — Mobile Divider 1.1] — 2026-10-24

## [Preview — Tablet Divider 1.1] — 2026-10-24

## [Preview — Web Divider 1.1] — 2026-10-24

## [Plan — Divider 1.1 (web, tablet, mobile)] — 2026-10-23
### Changed
- Divider plan 1.0 → 1.1 on all three platforms (`3-web-components/components/divider/divider.md`, `4-tablet-components/…`, `5-mobile-components/…`; Part A identical except A8), answering the four 1.0 questions: (1) inset stays `spacing-xl` for `start` and `both` — A4.3/B2 note the List plan (Day 8) adds its own text-aligned inset, nothing added now; (2) new optional centred label on horizontal dividers, `showLabel` + `label` (“or” / “أو”): `caption-md`, `color-text-neutral-muted` (4.5:1 pairs already exist), `spacing-md` gap each side, line segments ≥ `spacing-xl`, wraps and never truncates; ignored with a warning / assert on vertical dividers and when the label is empty; Figma `Show label` (BOOLEAN) + `Label` (TEXT), still 18 variants; (3) web `decorative` stays default `false`; (4) new web `component` prop (`hr` default · `li`): `<li role="separator">` inside `<ul>` / `<ol>`, always `aria-hidden="true"` because axe-core 4.14's `list` rule rejects a visible separator child (checked); labelled web root is `<div role="separator" aria-label>`. B9/C6 tests, C7, D1–D10 and Part F updated. No component tokens (P-04). Plan stays Finished; contracts regenerated for web, tablet and mobile; `component-tokens` ✓, `docs:build` ✓, `docs:check` ✓.

## [Preview — Tablet Divider 1.0] — 2026-10-23

## [Preview — Web Divider 1.0 blocked: image service unavailable] — 2026-10-23

## [Plan — Divider 1.0 (web, tablet, mobile)] — 2026-10-22
### Added
- New component **Divider** (Day 3) planned on all three platforms: `3-web-components/components/divider/divider.md`, `4-tablet-components/components/divider/divider.md`, `5-mobile-components/components/divider/divider.md` (Parts A–D and F; Part A identical except A8). Options `orientation` (horizontal · vertical), `emphasis` (subtle · default · strong → `color-border-subtle` · `color-border-default` · `color-border-strong`), `inset` (none · start · both, `spacing-xl`; start is horizontal only), web-only `decorative`; line `border-width-default`. Base MUI `Divider` (`<hr>`, logical borders and margins) / M3 `Divider` + `VerticalDivider` as `BwDivider`. No component tokens (P-04: semantic tokens fit), no icons, no text on the divider in 1.0. Web C6 tests render only through the shared `renderWithBiowave` at default timeouts. Figma: 18 variants (Orientation × Emphasis × Inset, `Direction=RTL` only for Horizontal · Start), bound directly to Foundations variables. Plan → Finished, Code / Figma build → Planned (headers + the three section READMEs); contracts and docs pages generated.

## [Sync — Figma library index re-read] — 2026-10-24
### Changed
- `_sync/figma-library.json` re-read from Figma (Foundations variables + styles, Doc Kit components, reach from the Web Components file) after the Badge contrast-pair change made the index stale (token source hash). Keys, names, scopes and styles unchanged; the only content change is the Web code syntax now filled in on 296 Foundations variables (set in Figma since the 2026-10-18 read). Variables dump rebuilt from the previous index and proven identical to Figma's semantic variables by a fingerprint over all 318 rows (primitives stay out, as before). `npm run contract -- --all` regenerated 24 Figma contracts (code syntax) and 4 code contracts (header Source code catch-up). `docs:check` ✓, `sync` ✓ READY, library index fresh.

## [Review — Web Badge round 3] — 2026-10-24
### Changed
- Reviewed web `Badge` after fix round 2 (round 3, `badge.md` › E4): **Approved**. Round 2 #1 fixed: in headless Chrome a collapsed standalone badge shown and hidden again at 0 ms, ~16 ms and every 4 ms step to 64 ms (light/en, dark/ar, `invisible` and `count` 1 → 0; 68 cases) now leaves no gap; `transitioncancel` handled; the normal exit still animates. #2 fixed (root padding/border asserted). AC-8 … AC-11 measurements still hold (warning fill 3.24 / 12.20:1). docs:check, typecheck and test:web (128/128) pass. Code → `Approved`; Plan stays `Finished`.

## [Fixed — Web Badge review round 2] — 2026-10-24
### Fixed
- Fixed the standalone Badge re-hide race so 0 ms and one-frame show → hide updates collapse immediately when no exit transition can run, and canceled transform exits also collapse. Added 0 ms, 16 ms and `transitioncancel` regressions, plus computed zero-padding and zero-border assertions for the anchored Badge root; all existing first-paint, normal-exit and reduced-motion behaviour remains covered.

## [Review — Web Badge round 2] — 2026-10-24
### Changed
- Reviewed web `Badge` after fix round 1 (round 2, `badge.md` › E3): **Changes requested**. AC-8 met: the `count` × `warning` fill is `color-icon-role-warning`, measured in headless Chrome at 3.24:1 (light) and 12.20:1 (dark) against the surface, with text at 6.10:1 and 13.11:1. AC-10 and AC-11 met; Round 1's measurements still hold. docs:check, typecheck and test:web (125/125) pass. AC-9 fails in one case: a collapsed standalone badge that is shown and hidden again within about one frame stays in the layout at scale 0, leaving a 23.46 px gap (🟡 #1, Executor), plus one 🟢 test nit. Code → `Changes requested`; Plan stays `Finished`.

## [Fixed — Web Badge review round 1] — 2026-10-24
### Fixed
- Updated `count` × `warning` to use the contrast-safe `color-icon-role-warning` fill, collapsed hidden standalone badges after their exit transition (immediately for reduced motion and on an initially hidden mount), removed unreachable error/warning check-icon tokens, and replaced declaration-only coverage with behavioural anchor-layout, first-frame and click-preservation tests. Badge passes 18/18 tests; the full web suite passes 125/125.

## [Foundations — contrast pair for Badge warning count] — 2026-10-24
### Added
- `2-foundations/scripts/contrast-pairs.json`: new pair `color-text-on-warning` on `color-icon-role-warning` (min 4.5:1, normal text) in the warning group: the Badge `count` text on its warning indicator fill (Badge plan 1.1, B3/B6). `npm run tokens`: 164/164 contrast pairs pass, 0 error(s) in both themes. No token values changed, so there is no Figma variable sync (`npm run sync`: Token source → Figma variables ✓ in sync).

## [Plan — Badge (web, tablet, mobile) 1.1] — 2026-10-24
### Changed
- Badge plan 1.0 → 1.1 for web review round 1 Planner nits (`badge.md` › E2 Planner response, F0–F2 on all three platforms). #1: `count` × `warning` indicator fill is now `color-icon-role-warning` (3.24:1 light · 12.20:1 dark on `color-surface-default`; text `color-text-on-warning` 6.10:1 · 13.11:1) instead of `color-background-warning-default` (2.20:1 light) — A4.2 and A9 (all three platforms), B3, B6, B9, C3, D updated; `warning` stays `count` only. #2: a hidden standalone badge takes no space after its exit transition (A5, B1, B2, B4, B9). #3: web header links `src/components/badge/`. Web C7 gains AC-8…AC-11 and a Fix round 1 Executor task list (#1, #2 plus Executor nits #4 unreachable icon token, #5 behavioural tests). No new tokens, no API change.
- Plan `Finished` (web header + README); regenerated web, tablet and mobile `badge-contract.md` / `figma-badge-contract.md` and the docs pages.

## [Review — Web Badge round 1] — 2026-10-24
### Changed
- Reviewed web `Badge` 1.0 (round 1, `badge.md` › E2): **Approved** — AC-1…AC-7 met; sizes, tokens, ring, placement (en/ar, both overlaps), focus, hit-testing and enter/exit/reduced motion measured in headless Chrome; docs:check, typecheck, test:web 121/121 pass. Code → `Approved`; Plan → `Open` for 3 Planner nits (B6/A9 contrast wording for light `count` × `warning` 2.20:1, hidden standalone space, stale Source code header row); 2 Executor nits (unreachable icon tokens, three declaration-only tests)

## [Code — Web Badge 1.0] — 2026-10-24
### Added
- Built and exported the web `Badge` on MUI Badge with count, dot and Check variants; contract colour fallbacks; tokenized dimensions, ring and enter/exit motion; logical rectangular/circular placement and standalone flow; RTL-safe counts and positioning; accessible descriptions; development warnings; and 14 Badge tests covering every allowed variant/colour across both themes and languages, fallbacks, motion, layout and axe.

## [Preview — Tablet Badge 1.0] — 2026-10-23
### Added
- Added light/English and dark/Arabic RTL tablet Badge planning sheets covering count `1`, `9` and `99+`, dot and Check badge variants, every allowed colour, 48dp rectangular and circular anchor placement, standalone flow, exact dimension/ring callouts, planned states and bilingual accessibility copy; the preview README records resolved token values, generation prompts, visual checks and remaining raster precision caveats.

## [Preview — Mobile Badge 1.0] — 2026-10-23
### Added
- Added light/English and dark/Arabic RTL mobile Badge planning sheets covering count `1`, `9` and `99+`, dot and Check badge variants, every allowed colour, 48dp rectangular and circular anchor placement, exact dimension/ring callouts, planned states and bilingual content examples; the preview README records resolved values, generation prompts, visual checks and raster precision caveats.

## [Preview — Web Badge 1.0] — 2026-10-22
### Added
- Added light/English and dark/Arabic RTL Badge planning sheets covering count `1`, `9` and `99+`, dot and Check badge variants, every allowed colour, exact size/ring callouts, rectangular and circular anchor placement, standalone flow, planned states, and bilingual content examples; the preview README records resolved values, prompts and raster QA caveats.

## [Plan — Badge (web, tablet, mobile) 1.0] — 2026-10-21
### Added
- Badge plan (Plan `Finished`, Code and Figma build `Planned`) in `3-web-components/components/badge/badge.md`, `4-tablet-components/components/badge/badge.md` and `5-mobile-components/components/badge/badge.md`: Parts A–D and F, Part A identical on all three platforms except A8. Variants `count` · `dot` · `check` — the Figma **Check badge** folds into Badge as `variant="check"` (P-05); seven colours (`error` default, `success` default for `check`; `warning` count only), `max` (`99+`), `showZero`, `overlap` `rectangular` · `circular`, `invisible` / `isVisible`, required `label` / `semanticLabel`, standalone inline mode, outside `ring` when anchored. Web on MUI `Badge` (`Badge`), Flutter `BwBadge` as a `Stack` composition shaped like M3 `Badge`; check glyph through Icon (`check`, D-18); Western digits (D-10).
- No component tokens: every value is an existing semantic token (P-04), so no `badge.tokens.json`.
- Generated contracts `badge-contract.md` and `figma-badge-contract.md` for web, tablet and mobile; docs pages via `npm run docs:build`; Badge rows in the three section README Components tables.
- Icon `check` is not in `_sync/figma-icons.json` yet: `npm run sync:icons:plan` wrote `_sync/figma-read-icons.generated.js`; the Figma contracts show it as ⏳ not indexed until the script is run in the Material Symbols file and `npm run sync:icons` merges the result.

## [Review — Mobile Split button round 3: Approved] — 2026-10-24
### Changed
- Split button (mobile) review round 3: **Approved** — Part E4 of `5-mobile-components/components/split-button/split-button.md`. Round 2 #11–#13 fixed: shared `BwButtonStyle` `overlay()` equal to `main` again (focused + pressed standalone BwButton → transparent, probed), `bw_button_style.dart` differs from `main` only by `segmentBorderRadius`; menu item focus ring drawn once; `chevronHalfTurn` `@visibleForTesting`. No findings. Plan stays Finished; Code → Approved (header + README). `docs:check` ✓, `flutter analyze` ✓, `flutter test` 141/141 ✓.

## [Fixed — Mobile Split button review round 2] — 2026-10-24
### Fixed
- Fixed Mobile `BwSplitButton` review round 2 findings:
  - Restored `main` order in shared `overlay()` resolver of `lib/src/components/button/bw_button_style.dart` (`focused` wins and returns transparent) so that file differs from `main` only by `segmentBorderRadius` (#11).
  - Removed duplicate menu item focus ring in `backgroundBuilder`, drawing it once via `side` in `lib/src/components/split_button/bw_split_button.dart` (#12).
  - Marked `BwSplitButton.chevronHalfTurn` with `@visibleForTesting` in `lib/src/components/split_button/bw_split_button.dart` so it is not exported as public API (#13).
  - Code status set to `Built` in `split-button.md` header and `5-mobile-components/README.md`.

## [Review — Mobile Split button round 2: Changes requested] — 2026-10-24
### Changed
- Split button (mobile) review round 2: **Changes requested** — Part E3 of `5-mobile-components/components/split-button/split-button.md`. Round 1 #1–#10 all fixed (Tab / Shift+Tab close, internal `@internal` API with tablet names and `BwButtonSegment` hidden, shared `segmentBorderRadius`, decorated `elevation-3` menu surface, menu position LTR + RTL, arrows wrap, menu fade off under reduced motion — probed). Open: the shared `BwButtonStyle` `overlay()` order was changed outside C3, so focused + pressed BwButton / BwIconButton now show `overlayPressed` (#11 🟡, Executor); 2 🟢 nits (double item focus ring, public `chevronHalfTurn`). Plan stays Finished; Code → Changes requested (header + README). `docs:check` ✓, `flutter analyze` ✓, `flutter test` 141/141 ✓.

## [Fixed — Mobile Split button review round 1] — 2026-10-24
### Fixed
- Fixed Mobile `BwSplitButton` review round 1 findings and implemented Plan 2:
  - Handled Tab and Shift+Tab key events to close open menu and advance/restore focus (#1), with tests.
  - Marked all internal parameters on `BwButton` (`segment`), `BwIconButton` (`segment`, `focusNode`, `autofocus`, `statesController`, `iconTurns`, `iconRotationDuration`, `iconRotationCurve`, `expanded`), and `BwButtonStyle.segmentBorderRadius` as `@internal`; hid `BwButtonSegment` from package public export (#3).
  - Defined named `BwSplitButton.chevronHalfTurn = 0.5` constant for chevron rotation (#6).
  - Extracted shared `BwButtonStyle.segmentBorderRadius(dimensions, segment)` helper in `bw_button_style.dart` reused by both buttons without copies (#7).
  - Applied Plan 2 C3: reworked `BwIconButton` composite parameters to match contract §3, replaced `iconChild` with `AnimatedRotation` around glyph, and removed expanded-driven pressed state hack while keeping all existing button/icon-button tests passing.
  - Applied Plan 2 B2/B3/B4/B6: decorated menu surface with `elevation-3` shadow (`DecoratedBox` + `ClipRRect`), transparent `MenuStyle(clipBehavior: Clip.none)`, chevron open `BwDuration.md` / close `BwDuration.sm`, menu `animated: !context.bw.reduceMotion`, and cyclic arrow key navigation.
  - Regenerated all 4 goldens under `5-mobile-components/test/goldens/split_button/` per C5.

## [Plan — Mobile Split button plan 2 (review round 1)] — 2026-10-24
### Changed
- Split button (mobile) plan 2 — Planner findings #2, #4, #5, #7, #8, #9, #10 of Review Round 1, mirroring tablet plan 2.1 (user-approved). B2: menu token table and `elevation-3` on a decorated surface (transparent `MenuStyle`, `Clip.none`). B3: menu item states. B4: chevron timing (open `md`, close `sm`), `MenuAnchor` built-in fade off under reduced motion. B6: menu arrows wrap, menu keys listed. C3 / C5: internal `BwButtonSegment` / `segment` (bw_button.dart), `segment` · `focusNode` · `autofocus` · `statesController` · `iconTurns` · `iconRotationDuration` · `iconRotationCurve` · `expanded` (bw_icon_button.dart), shared `BwButtonStyle.segmentBorderRadius(dimensions, segment)` (bw_button_style.dart) — all `@internal`, hidden from `biowave_mobile.dart`; goldens folder in C5. Header Source code corrected. Plan → Finished (header + README); contract regenerated.

## [Review — Mobile Split button round 1: Changes requested] — 2026-10-24
### Changed
- Split button (mobile) review round 1: **Changes requested** — Part E2 of `5-mobile-components/components/split-button/split-button.md`. Menu sits under the container (LTR + RTL), items reachable by keyboard, chevron timing per B4. Open: Tab / Shift+Tab do not close the menu (#1), BwIconButton `focusNode` / `expanded` / `iconChild` not planned (#2, Planner) and public instead of internal (#3), `elevation-3` mapping and menu tokens missing from the plan (#4, Planner), goldens not in C5 (#5, Planner), half turn derived from unrelated tokens (#6), copied segment radius / focus-ring helper (#7, Planner); 3 🟢 plan nits. Plan → Open, Code → Changes requested (header + README). `docs:check` ✓, `flutter analyze` ✓, `flutter test` 139/139 ✓, `sync` READY.

## [Mobile Split button — code implementation (1.0)] — 2026-10-24
### Added
- Built `BwSplitButton` and `BwSplitButtonOption` for `biowave_mobile` (`lib/src/components/split_button/bw_split_button.dart` + `test/split_button_test.dart` + 4 goldens in `test/goldens/split_button/`), composing `BwButton` (`primary-action`) and `BwIconButton` (`menu-trigger`) with internal `segment` parameter for directional corner radii, `MenuAnchor` for menu alternatives with `alignmentOffset`, accessible semantics container and trigger, token-driven styles, and reduced-motion handling.

## [Review — Tablet Split button round 2: Approved] — 2026-10-24
### Reviewed
- Split button (tablet) review round 2: **Approved**. See Part E3 of `4-tablet-components/components/split-button/split-button.md`. Round 1 findings #1–#10 are all fixed. Re-probes pass: the menu opens end-aligned under the container in LTR and RTL with a `BwSpacing.xs` offset, and the keyboard reaches the menu items (ArrowDown/Up, Enter/Space, Esc, Tab). The BwButton / BwIconButton / `bw_button_style.dart` changes match C3 exactly, and the existing button and icon-button tests are unchanged. The four goldens were checked. Two optional 🟢 nits: #11 the menu jumps for one frame when it is wider than the container, #12 very long option labels are not capped to the screen width. Code → Approved (header + README). `docs:check` ✓, `flutter analyze` ✓, `flutter test` 168/168 ✓, `sync` READY.

## [Fixed — Tablet Split button review round 1] — 2026-10-24
### Fixed
- Fixed Tablet `BwSplitButton` review round 1 findings and plan 2/2.1 items: #1 end-aligned menu under container in LTR/RTL with `BwSpacing.xs` vertical offset; #2 keyboard navigation for menu items (focus first/last, arrow keys move, Enter/Space selects); #3 Tab/Shift+Tab close open menu and advance/reverse focus; #6 chevron close duration `BwDuration.sm` with accelerate curve (open `BwDuration.md`, instant on reduced motion); #9 moved duplicated `_borderRadius` into shared `BwButtonStyle.segmentBorderRadius`; #10 asserted `tap` and `focus` semantics actions on primary button; applied plan 2 menu tokens with elevation-3 decorated surface (`MenuStyle` transparent, `Clip.none`), menu item state styles, and B9 PNG goldens (`light`/`dark` × `en`/`ar`) under `4-tablet-components/test/goldens/split_button/`. Code → Built.

## [Plan — Tablet Split button 2.1] — 2026-10-24
### Changed
- Split button (tablet) plan 2.1 adds review round 1 finding #9 (user-approved): C5 authorises `4-tablet-components/lib/src/components/button/bw_button_style.dart` (change: shared segment radius helper, internal, used by BwButton and BwIconButton) and C3 lists it in the internal-parameters table; F2 row added. No new behaviour. Plan stays Finished; contract regenerated.

## [Plan — Tablet Split button 2] — 2026-10-24
### Changed
- Split button (tablet) plan 2 fixes the Planner findings of review round 1 (Part E2 of `4-tablet-components/components/split-button/split-button.md`): #4 C3 / C5 now record the internal BwButton `segment` and BwIconButton `segment`, `focusNode`, `autofocus`, `statesController`, `iconTurns`, `iconRotationDuration`, `iconRotationCurve`, `expanded` (all `@internal`, defaults keep today's behaviour); #5 B2 maps `elevation-3` onto a decorated menu surface (`MenuStyle` transparent, `clipBehavior: Clip.none`) and lists every menu token, B3 lists the menu item states, B4 records chevron close timing and `MenuAnchor`'s built-in fade timing; #7 C5 authorises `4-tablet-components/test/goldens/split_button/`; #8 header "Source code" → `lib/src/components/split_button/bw_split_button.dart`. Plan → Finished (header + README); contract regenerated. Implementer findings #1–#3, #6, #9, #10 untouched.

## [Review — Tablet Split button round 1: Changes requested] — 2026-10-24
### Changed
- Split button (tablet) review round 1: **Changes requested** — Part E2 of `4-tablet-components/components/split-button/split-button.md`. 🔴 #1 menu not end-aligned with the container (B5), 🔴 #2 arrow keys never reach menu items (B6); 🟡 #3 Tab does not collapse, #6 collapse duration `md` not `sm` (Implementer); 🟡 #4 BwIconButton internal params beyond `segment` not in C3/C5, #5 `elevation-3` mapping and menu tokens missing in tablet B2/§4.1, #7 goldens folder not authorised in C5 (Planner); 🟢 #8–#10. `segment` leaves BwButton / BwIconButton defaults and tests unchanged; gap and menu-width fixes are in code, tests not weakened. Plan → Open, Code → Changes requested (header + README). `docs:check` ✓, `flutter analyze` ✓, `flutter test` 160/160 ✓, `sync` READY.

## [Fixed — Tablet Split button implementation checks] — 2026-10-24
### Fixed
- Replaced the split-button trigger's legacy Material icon with the shared rounded Symbol, made menu options at least as wide as the split-button container, corrected RTL/LTR gap coverage, and disposed semantics handles within each accessibility test. Code → Built; analysis, component-token, sync, and docs checks pass, while Flutter Test remains delegated to the orchestrator because the sandbox denies its loopback socket.

## [Tablet Split button — implementation] — 2026-10-24
### Added
- Added the token-driven Flutter `BwSplitButton` composition, logical segment radii for `BwButton` / `BwIconButton`, keyboard and screen-reader menu interaction, RTL-aware layout, package export, and contract test coverage. Code → Built; analysis, component-token, sync, and docs checks pass, while Flutter Test remains not runnable in the sandbox because its loopback harness socket is denied and will be run by the orchestrator.

## [Review — Web Link round 2: Approved] — 2026-10-24
### Changed
- Link (web) review round 2: **Approved** — Part E3 of `3-web-components/components/link/link.md`. Round 1 findings #1–#4 fixed; headless Chrome accessibility tree in light/dark × en/ar: external name = label + hidden suffix from content ("Contact support (opens in a new tab)", AR suffix, `externalLabel` override), consumer `aria-label` kept unchanged, disabled links not tabbable or click-focusable; dimensions, colours, focus ring and RTL unchanged from Round 1. One 🟢 nit (#5, test guard against a synthesized `aria-label`). Code → Approved (header + README). `docs:check` ✓, `typecheck` ✓, `test:web` 123/123 ✓.

## [Fixed — Web Link review round 1] — 2026-10-24
### Fixed
- Fixed all four Executor findings from review round 1: external accessible names now come from the visible label plus the localized visually hidden suffix while consumer `aria-label` values pass through unchanged; disabled links no longer receive `tabIndex=-1`; empty and non-string label warnings use independently testable once-only keys; and the component header points to the built source. `docs:check` ✓, `typecheck` ✓, `test:web` 123/123 ✓ at default timeouts.

## [Review — Web Link round 1: Changes requested] — 2026-10-24
### Changed
- Link (web) review round 1: **Changes requested** — Part E2 of `3-web-components/components/link/link.md`. Headless Chrome confirms B2–B5 in light/en and dark/ar (24 px target, action-sm|md|lg, 16/16/20 px icons, 1→2 px underline at 2 px offset, 2 px focus ring at 2 px offset, one RTL flip by the Icon). 🟡 #1: external links build their name with an `aria-label` on top of the B6 hidden span; 🟢 #2–4: disabled `tabIndex=-1`, non-string label warning test, stale `Source code` header field. Code → Changes requested (header + README). `docs:check` ✓, `typecheck` ✓, `test:web` 123/123 ✓.

## [Added — Web Link 1.0] — 2026-10-24 — Implemented the token-only MUI Link wrapper, inline and standalone sizes, brand/neutral/inverse states, visited and disabled behavior, safe localized external links, app-router composition, RTL icon handling, public exports, and complete contract tests.

## [Preview — Mobile Link 1.0] — 2026-10-23 — Added light/English and dark/Arabic RTL planning sheets covering inline and standalone options, five mobile states, all sizes, leading and mirrored external icons, 48 px touch targets and resolved shared-token callouts.

## [Preview — Tablet Link 1.0] — 2026-10-23 — Added light/English and dark/Arabic RTL planning sheets covering inline and standalone options, five tablet states, all sizes, leading and mirrored external icons, 48 px touch targets and resolved shared-token callouts.

## [Preview — Web Link 1.0] — 2026-10-22 — Added light/English and dark/Arabic RTL planning sheets covering the planned options, six states, resolved shared-token callouts and RTL mirroring.

## [Plan — Link (web, tablet, mobile) 1.0] — 2026-10-21
### Added
- Link plan for Web, Tablet and Mobile (`<section>/components/link/link.md`, Parts A–D and F; Part A identical on all three except A8): inline and standalone links, `color` brand · neutral · inverse, `size` inherit · sm · md · lg, `underline` always · hover, optional leading icon, `external` (`open_in_new`, screen-reader suffix / hint), `show-visited` on web only. Web on MUI `Link`; Flutter `BwLink` (custom `InkWell` + text) and `BwLink.span` for inline links. Semantic tokens only — no `link.tokens.json` (P-04). Plan `Finished`.
- Generated contracts `link-contract.md` · `figma-link-contract.md` and docs pages `link.html` for the three platforms; Link rows in the three section README Components tables.
- Open: glyph `open_in_new` is not in `_sync/figma-icons.json` yet (`npm run sync:icons:plan` → read in Figma → `npm run sync:icons`, then regenerate the Figma contracts).

## [Docs — live preview demo fixes] — 2026-10-24
### Fixed
- Icon button live preview: the Pin toggle used `variant="tonal"`, which IconButton ignores for toggles (A4.4), so it never switched and warned in the console. It is now `outlined` and its label changes "Pin" ↔ "Unpin" (A7).
- Text field live preview: the password, add-on and end-button examples were all labelled "Email". They now read Password (helper "Use at least 12 characters", A7), Website and Employee ID, in English and Arabic.
- Button group live preview: the "vertical · fill" heading is now translated in Arabic.

## [Docs — live previews on the Biowave Icon] — 2026-10-21
### Fixed
- `_docs/live.tsx` still imported the `MaterialSymbol` test helper that icon/web deleted, so every live React preview (`npm start`) failed with a Vite import error. The demos now use the Biowave `Icon` from `3-web-components/src` (the directional arrow uses `directional` instead of the `bw-icon-directional` class).
### Added
- `_docs/tsconfig.json` and `tsc -p _docs` in `npm run typecheck`, so a broken import in `live.tsx` now fails the typecheck.

## [Review — Mobile Icon button round 3: Approved] — 2026-10-24
### Changed
- Icon button (mobile) review round 3: **Approved** — Part E4 of `5-mobile-components/components/icon-button/icon-button.md`. Round 2 #4 fixed (D11 / Part D equal to `main` again; Fix round 1 kept once in C8). No code or test change since Round 2. No findings. Plan stays Finished. Code → Approved (header + README). `docs:check` ✓, `flutter analyze` ✓, `flutter test` 96/96 ✓, `sync` READY.

## [Fixed — Mobile Icon button review round 2] — 2026-10-24
### Fixed
- Removed the duplicate Mobile Icon button Fix round 1 entry from D11, retained the canonical copy in C8, added the Fix round 2 execution-log entry, and restored the code status to Built. No code changed.

## [Review — Mobile Icon button round 2: Changes requested] — 2026-10-24
### Changed
- Icon button (mobile) review round 2: **Changes requested** — Part E3 of `5-mobile-components/components/icon-button/icon-button.md`. Round 1 #1 fixed (single semantics node now exposes `focused` after Tab and `SemanticsAction.focus`, label read once, `tester.semantics.tap` calls `onPressed`), #2 and #3 fixed. 🟡 #4: the Fixer's Fix round 1 entry was also pasted into D11 (Figma Agent log) — Implementer removes it. Plan stays Finished. Code → Changes requested (header + README). `docs:check` ✓, `flutter analyze` ✓, `flutter test` 96/96 ✓, `sync` READY.

## [Fixed — Mobile Icon button review round 1] — 2026-10-24
### Fixed
- Fixed Mobile `BwIconButton` review round 1 findings (#1–#3): exposed `focusable`, `focused`, and `SemanticsAction.focus` on the single accessible `Semantics` node from the button's `FocusNode` while keeping one labelled node with `button`, `toggled`, `enabled`, and `tap`, and extended `label is read once and toggle state is exposed` to verify post-Tab focus state, focus action, single labelled node, and `tester.semantics.tap` activation; updated the `Source code` link in `icon-button.md` and reverted the unrelated `BwMobileTheme` reformat in `lib/biowave_mobile.dart`.

## [Review — Mobile Icon button round 1: Changes requested] — 2026-10-23
### Changed
- Icon button (mobile) review round 1: **Changes requested** — Part E2 of `5-mobile-components/components/icon-button/icon-button.md`. Screen-reader activation OK (one labelled node, `SemanticsAction.tap` calls `onPressed`). 🟡 #1: the excluding `Semantics` wrapper drops the focus state and `focus` action that BwButton exposes. 🟢 #2 header `Source code` row stale; 🟢 #3 unrelated `BwMobileTheme` reformat. All Implementer; Plan stays Finished. Code → Changes requested (header + README). `docs:check` ✓, `flutter analyze` ✓, `flutter test` 96/96 ✓, `sync` READY.

## [Mobile Icon button — code implementation (1.0)] — 2026-10-23
### Added
- Built `BwIconButton` for `biowave_mobile` (`lib/src/components/icon_button/bw_icon_button.dart` + `test/icon_button_test.dart` + 4 goldens in `test/goldens/icon_button/`), sharing `BwButtonStyle.resolve`, `BwControlSize`, and `BwFocusRing`, with token-only selected state (`WidgetState.selected`), long-press M3 `Tooltip` styled with B3.4 tokens, loading spinner and single announcement, and a single accessible container node carrying the tap action and toggle state.

## [Review — Tablet Icon button round 2: Approved] — 2026-10-24
### Changed
- Icon button (tablet) review round 2: **Approved** — Part E3 of `4-tablet-components/components/icon-button/icon-button.md`. Round 1 #1 fixed (`MergeSemantics` exposes one labelled button node with `tap` + `focus` when enabled, none when disabled; tap-target guidelines now meaningful), #2 fixed (plan 1.1 authorises `test/goldens/icon_button/`; four goldens added and checked by eye), #3 fixed (icon cross-fade), #4 and #5 fixed (header source path, C1 reference). 🟢 #6 nit: no icon-button test asserts reduced motion (Implementer, non-blocking). Code → Approved (header + README). `docs:check` ✓, `flutter analyze` ✓, `flutter test` 152/152 ✓.

## [Fixed — Tablet Icon button review round 1] — 2026-10-23
### Fixed
- Fixed Tablet `BwIconButton` review round 1 findings (#1 merged button semantics exposing `SemanticsAction.tap` and `SemanticsAction.focus` when enabled and none when disabled with one label and `toggled` state, plus tap-target and labeled-tap-target guidelines for `sm`/`md`; #3 cross-fading outgoing and incoming icons in `AnimatedSwitcher`; #2 added B9 PNG goldens under `4-tablet-components/test/goldens/icon_button/`). Code → Built.

## [Plan — Tablet Icon button 1.1] — 2026-10-23
### Changed
- Icon button (tablet) plan 1.1 fixes the Planner findings of review round 1 (Part E2 of `4-tablet-components/components/icon-button/icon-button.md`): #2 C5 now authorises `4-tablet-components/test/goldens/icon_button/` (generated goldens) so B9's PNG goldens are allowed; #4 header "Source code" → `lib/src/components/icon_button/bw_icon_button.dart`; #5 C1 "passes C9" → "passes C6 / B9". Plan → Finished (header + README); contract regenerated. Implementer findings #1, #3 untouched.

## [Review — Tablet Icon button round 1: Changes requested] — 2026-10-23
### Changed
- Icon button (tablet) review round 1: **Changes requested** — Part E2 of `4-tablet-components/components/icon-button/icon-button.md`. 🔴 #1 the outer `Semantics(excludeSemantics: true)` exposes no tap action, so screen readers cannot activate the button (Implementer). 🟡 #2 B9 goldens are not authorised by C5 — answers the C8 question; Planner adds `test/goldens/icon_button/` (Planner). 🟢 #3 icon swap is fade-in not cross-fade; #4 stale "Source code" header; #5 C1 cites a missing C9. Plan → Open, Code → Changes requested (header + README). `docs:check` ✓, `flutter analyze` ✓, `flutter test` 147/147 ✓.

## [Tablet Icon button — implementation] — 2026-10-23
- Round 3 disposes the icon-button semantics handle inside the test body before Flutter verifies that no handles remain active.
- Added the token-driven Flutter `BwIconButton`, package export, and contract test coverage; fixed selected transitions to keep one `BwIcon` mounted and exposed the labelled toggle semantics outside the visual-only tooltip. Code is Built; analysis, component-token, sync, and docs checks pass, while Flutter Test remains not runnable in the sandbox because its loopback harness socket is denied and will be run by the orchestrator.

## [Review — Mobile Icon round 1: Approved] — 2026-10-23
### Changed
- Icon (mobile) review round 1: **Approved** — Part E2 of `5-mobile-components/components/icon/icon.md`. AC-1…AC-5 met; 3 🟢 nits for the Executor (test name over-claims a button double-flip check, stale header `Source code` row, changelog entry format). Note: mobile `BwButton` still renders `Icon` directly, so the B9 button double-flip check moves to Button / Icon button (mobile). Review → Round 1 · Approved (header + README). `docs:check` ✓, `flutter analyze` ✓, `flutter test` 92/92 ✓.

- **2026-10-23 — Mobile Icon (`BwIcon`) built:** Implemented `BwIcon`, `BwIconSize`, and `BwIconColor` in `5-mobile-components/lib/src/components/icon/bw_icon.dart` (exported from `biowave_mobile.dart`) with token-driven sizes and colours, `BwIconAxes` fill/weight/grade/opticalSize axes, RTL `directional` mirroring, decorative/meaningful semantics, golden tests (`light`/`dark` × `en`/`ar`), and the `no_legacy_icons_test.dart` D-18 guard (`Code: Built`).

## [Audit — Foundations coverage per platform] — 2026-10-22
### Added
- `_audits/foundations.md`: read-only check of tokens, generated web/Flutter code, guidelines and biometric devices for Web, Tablet and Mobile, with an ordered to-do checklist per platform. Nothing in tokens, code or Figma changed.

## [Review — Web Button group round 3: Approved] — 2026-10-22
### Changed
- Button group (web) review round 3: **Approved** — Part E4 of `3-web-components/components/button-group/button-group.md`. Round 2 findings #12–#14 fixed: vertical groups ignore every `align` (headless Chrome: buttons 400 × 40 px for all six `align` cases, en + ar), the four B1 Overflow counting examples render exactly as the table (visible children, menu items, dev warnings), and `fill` is asserted from rendered flex longhands. Round 2's `align` placement and RTL mirroring unchanged. Checks: `docs:check` ✓, `typecheck` ✓, `test:web` 111/111 ×2. Code → `Approved` in the header and `3-web-components/README.md`; Plan stays `Finished`.

## [Web Button group — fix round 2 (1.2)] — 2026-10-21
### Fixed
- Fixed review findings #12–#14: vertical groups now ignore every `align` value without applying horizontal fill flex; overflow counting reserves visible slots for the filled primary, links, submit actions and non-Button/IconButton children before keeping the last optional actions; the overflow warning appears only when always-visible children alone exceed the limit; and layout tests assert rendered flex styles and non-zero vertical action heights. `docs:check` and `typecheck` pass; three full Web runs pass 93/93 in 6.51 s, 6.16 s and 6.03 s.

## [Preview — Web Button group 1.2] — 2026-10-21
### Changed
- Redrew the light/English and dark/Arabic RTL plan-check sheets with the four B1 overflow-counting examples, normal-height vertical `align="fill"`, equal-share horizontal `fill` intent, visibly distinct alignment frames, and resolved token callouts; the preview README records the remaining generated-image differences after two retries per image.

## [Plan — Web Button group 1.2: review round 2 Planner item #13] — 2026-10-21
### Changed
- Button group (web) re-plan, version **1.2** (plan 1.2) in `3-web-components/components/button-group/button-group.md`: #13 B1 **Overflow counting** — always-visible children (`filled` primary, `href`, `type="submit"`, not Button/IconButton) use up the `maxVisible` slots first, the other children fill the slots left with the least important going into the menu first, and the limit is exceeded (dev warning) only when the always-visible children alone exceed it; examples table, B9/C6 tests (`maxVisible={1}` with `[Docs href, Cancel, Save (filled)]` → Docs and Save visible, Cancel in the menu; always-visible children alone over the limit), C3. B2/C3 vertical ignores `align`. C7 AC-12–14 + Fix round 2 task list: #12 (vertical + `align="fill"` test with non-zero heights), #13, #14 (`fill` asserted from the rendered style). Part F0/F1/F2 updated.
- Guidelines 1.1: A4.4 Overflow rule added in the Web, Tablet and Mobile `button-group.md` (Part A kept identical).
- Contracts regenerated: `npm run contract -- web button-group`, `-- tablet button-group`, `-- mobile button-group`. Plan → `Finished` in the header and `3-web-components/README.md`.

## [Review — Web Button group round 2: Changes requested] — 2026-10-21
### Changed
- Button group (web) review round 2: **Changes requested** — Part E3 of `3-web-components/components/button-group/button-group.md`. Round 1 findings #1–#11 all fixed (Chromium, 800 px parent: `start` / `center` / `end` / `space-between` / `fill` place the actions and mirror in Arabic; vertical 100% wide, primary on top). New: 1 🟡 (#12 vertical + `align="fill"` collapses the buttons to 0–2 px tall), 2 🟢 (#13 a kept-visible `href`/submit child pushes the primary into the overflow menu — spec gap, Planner; #14 `fill` flex test reads source text). `docs:check` ✅, `typecheck` ✅, `test:web` 91/91 twice (8.30 s, 6.52 s). Plan → `Open`, Code → `Changes requested`; header and `3-web-components/README.md` updated.

## [Web Button group — fix round 1 (1.1)] — 2026-10-21
### Changed
- Fixed review findings #2, #3, #4, #7, #9, #10 and the Executor half of #8: the group now fills its parent's inline size with working logical alignment; the English/Arabic layout matrix covers the full B2 rules; `maxVisible` clamps to 1–4; overflowing links and submit actions remain visible; the ButtonGroup suite uses the shared Biowave renderer and default timeout without its former focus warning. Group-owned size precedence is recorded in C8. `docs:check`, `typecheck` and `component-tokens` pass; three full Web runs pass 91/91 in 7.79 s, 6.64 s and 6.66 s.

- **2026-10-21 — Preview · Web Button group 1.1:** Added light/English and dark/Arabic RTL plan-check sheets with resolved token callouts for alignment, group-owned sm/md/lg sizing, vertical stacking, and overflow behavior; README records the remaining generated-image `fill` width discrepancy.

## [Plan — Web Button group 1.1: review round 1 Planner items] — 2026-10-21
### Changed
- Button group (web) re-plan, version **1.1** (plan 1.1) in `3-web-components/components/button-group/button-group.md`: #1 B2/C3 — container is `display: flex` with `inline-size: 100%` of its parent in both orientations, so `align` places the actions (vertical stays full width, `align-items: stretch`); #8 C3 size precedence aligned with B1 (group wins); #11 header Source code links `src/components/button-group/`. B1 invalid combinations add `maxVisible` clamping and overflowing `href` / `type="submit"` children kept visible; B9/C6 tests and C7 AC-7–11 + a Fix round 1 Executor task list (#2, #3, #4, #7, #9, #10, #8 C8 note). #5 (shared speedy Emotion test cache) not re-planned: the fix rebases on `ds/button-web` (PR #1). Part F0/F2 updated; Part A unchanged.
- Contracts regenerated: `npm run contract -- web button-group`; #6 `npm run contract -- tablet button-group` and `-- mobile button-group` (source hash only; contract body unchanged). Plan → `Finished` in the header and `3-web-components/README.md`.

## [Review — Web Button group round 1: Changes requested] — 2026-10-21
### Changed
- Button group (web) review round 1: **Changes requested** — Part E2 of `3-web-components/components/button-group/button-group.md`. 1 🔴 (B2 hug width makes `align` a no-op), 5 🟡 (inline-flex/fit-content layout, B9 layout test too weak, raised 20 s test timeout, flaky `test:web` / missing shared speedy Emotion cache, stale tablet/mobile Figma contracts), 5 🟢. typecheck ✅; ButtonGroup suite 10/10 but `test:web` fails on flakes in other suites; `docs:check` fails on the stale contracts. Plan → `Open`; review status updated in the header and `3-web-components/README.md`.

## [Review — Web Split button round 3: Approved] — 2026-10-21
### Changed
- Split button (web) review round 3: **Approved** — Part E4 of `3-web-components/components/split-button/split-button.md`. Round 2 #9 fixed (headless Chrome computed Paper `transition`: open `opacity`/`transform` 0.2s `standard-decelerate`, close 0.1s `standard-accelerate`, no delay) and #10 fixed (`prefers-reduced-motion: reduce` → 0 s, menu instant); Round 1 #1 still holds (menu end edge right in English, left in Arabic). 🟢 #11 nit: MUI Grow's `auto` timeout keeps the invisible backdrop ~240 ms after close — carried to the Menu component. Code → Approved (header + README). `docs:check` ✓, `typecheck` ✓, `test:web` 100/100 ✓, `sync` READY.

## [Fixed — Web Split button review round 2] — 2026-10-21
### Fixed
- Fixed menu fade and scale so each uses the complete B4 open and close duration/easing pair, bypassing MUI Grow's shortened scale timing and exit delay; menu durations now remain CSS variables so the reduced-motion token rule makes them instant. Added independent opacity/transform enter/exit coverage and a reduced-motion variable regression test; the full web suite passes 100/100 in three consecutive runs.

## [Review — Web Split button round 2: Changes requested] — 2026-10-21
### Changed
- Split button (web) review round 2: **Changes requested** — Part E3 of `3-web-components/components/split-button/split-button.md`. Round 1 #1 fixed (measured in Chromium: menu end edge on the right in English, left in Arabic, `transform-origin` top-end), #2/#5 fixed (`test:web` 97/97 at default timeouts), #4/#8 fixed, #6/#7 closed by plan 1.1. 🟡 #9: #3 partly open — the menu fade uses `motion-easing-standard` and the scale runs at ⅔ of the B4 duration (MUI Grow); 🟡 #10: menu durations are now JS numbers, so reduced motion no longer zeroes them. Code → Changes requested (header + README). `docs:check` ✓, `typecheck` ✓, `sync` READY.

## [Fixed — Web Split button review round 1] — 2026-10-21
### Fixed
- Fixed logical end menu placement in English and Arabic, tokenized enter/exit motion, and the missing keyboard, loading-focus, radii, localization, `aria-controls`, and bilingual axe coverage; removed raised test timeouts. The configured web suite passes 97/97 in three consecutive runs.

## [Preview — Web Split button 1.1] — 2026-10-21
### Added
- Added light/English and dark/Arabic RTL Split button planning sheets covering all allowed md variant/color combinations, independent half states, sm/md/lg sizes, loading, focus, disabled, and logical end-aligned open menus, with resolved token sheets and generation check notes.

## [Plan — Web Split button 1.1] — 2026-10-21
### Changed
- Web `split-button.md` 1.0 → 1.1 (plan 1 → 1.1) answering Review round 1 Planner findings: #6 B5/C3 — MUI flips only its default menu origins in RTL, so the side is chosen from the text direction (`bottom-end` logical, physical right in LTR, left in RTL); #7 B6 — `aria-controls` only while the menu is open (the code's behaviour). C3 records that the shared per-test speedy Emotion cache from `ds/button-web` (PR #1) is on `main` and merged into this branch, so the fix round uses it and drops raised timeouts. C6 tests and C7 AC-7/AC-8 + Fix round 1 task list for Executor findings #1–#5, #8. Plan → Finished (header + README); Split button web contracts regenerated.

## [Review — Web Split button round 1: Changes requested] — 2026-10-21
### Changed
- Split button (web) review round 1: **Changes requested** — Part E2 of `3-web-components/components/split-button/split-button.md`. AC-1, AC-2, AC-6 met; 🔴 menu anchored with physical `right` (wrong side in Arabic, B5) and `test:web` fails 81/87 in the full suite (tests still raise timeouts; the shared speedy Emotion cache is only on `ds/button-web`); 🟡 B4 close transition, test gaps (B9/B6, `ar`), raised timeouts; 🟢 Planner C3/B6 notes. Plan set to `Open`; Review status updated in the header and `3-web-components/README.md`. `docs:check` fails only on the pre-existing stale tablet/mobile button-group Figma contracts.

## [Review — Web Icon button round 3: Approved] — 2026-10-21
### Changed
- Icon button (web) review round 3: **Approved** — Part E4 of `3-web-components/components/icon-button/icon-button.md`. Round 2 findings fixed: #10 render matrix split per theme × locale with CSS rules read once per render (slowest Icon button test 883 ms, was 3.7–4.4 s); #11 open-tooltip axe runs on `baseElement`. AC-1–AC-11 met; no new findings. `docs:check` ✅, `typecheck` ✅, `test:web` 3/3 full runs 96/96 at the default 5 s timeout. Code → `Approved` (header + `3-web-components/README.md`); Plan stays `Finished`.

## [Fixed — Web Icon button review round 2] — 2026-10-21
### Fixed
- Fixed Icon button findings #10 and #11: the variant matrix now caches CSS rules once per render and runs as four theme/locale tests (slowest 798 ms), while the open-tooltip axe cases scan `baseElement` so the portalled tooltip is covered. `docs:check` and `typecheck` pass; three final full Web runs pass 96/96 at the default timeout.

## [Review — Web Icon button round 2: Changes requested] — 2026-10-21
### Changed
- Icon button (web) review round 2: **Changes requested** — Part E3 of `3-web-components/components/icon-button/icon-button.md`. Round 1 findings #1–#9 all fixed (tooltip easing, 500 ms hover delay and instant reduced-motion timeouts, single accessible name, RTL mirroring measured in headless Chrome for light/en and dark/ar). AC-1–AC-4, AC-6, AC-8–AC-11 met; AC-5/AC-7 not: `test:web` 4 of 5 full runs green — the Icon button variant-matrix test takes 3.7–4.4 s and timed out once at the 5 s default (🟡 #10, re-scans every stylesheet per button). 🟢 #11: open-tooltip axe case skips the portalled tooltip. `docs:check` ✅, `typecheck` ✅. Code → `Changes requested` (header + `3-web-components/README.md`); Plan stays `Finished`.

## [Docs — live previews on the Biowave Icon] — 2026-10-21
### Fixed
- `_docs/live.tsx` still imported the `MaterialSymbol` test helper that icon/web deleted, so every live React preview (`npm start`) failed with a Vite import error. The demos now use the Biowave `Icon` from `3-web-components/src` (the directional arrow uses `directional` instead of the `bw-icon-directional` class).
### Added
- `_docs/tsconfig.json` and `tsc -p _docs` in `npm run typecheck`, so a broken import in `live.tsx` now fails the typecheck.

## [Fixed — Web Icon button review round 1] — 2026-10-21
### Fixed
- Fixed Icon button findings #1–#5, #7 and #9: deterministic token-timed tooltip tests, specified enter/exit easing and reduced-motion timeouts, a single accessible name for disabled tooltip anchors, complete rendered-token/fallback/theme/locale/state coverage under default timeouts, one numeric tooltip-offset source, and whitespace-only label validation. Typecheck, docs, sync and component-token checks pass; three full Web runs pass 93/93.

## [Web Icon button — review round 1 Planner items, plan 1.1] — 2026-10-21
### Changed
- Icon button (web) re-plan, version 1.1: #8 B7 examples use the Biowave `Icon` (`<Icon name="…" />`, `filled`), D4 code values, a D4 **Icons used** line and the header Source code row updated; #6 Part C records the dependency on `ds/button-web` (PR #1, shared per-test speedy Emotion cache) — fix round 1 starts after the rebase and drops the raised timeouts. Executor findings #1–#5, #7, #9 folded into C3/C5/C6, C7 AC-7–AC-11 and a Fix round 1 task list. B1–B6 unchanged, no API change. Plan → `Finished` (header + `3-web-components/README.md`); contracts regenerated with the generator: `npm run contract -- web icon-button`, plus `tablet` / `mobile` `icon-button` (their Figma contracts inherit web D4 — hash and the two D4 code-value rows only). Detail: `3-web-components/components/icon-button/icon-button.md` › F0, F2.
- Added the Icon button plan 1.1 web preview sheets for light/English and dark/Arabic RTL, covering the allowed variant/color matrix, six states, sm/md/lg sizes, toggles, tooltip, resolved token callouts, and RTL icon direction; the preview README records the remaining dark Text/Error arrow-direction warning after the retry limit.

## [Review — Web Icon button round 1: Changes requested] — 2026-10-21
### Changed
- Icon button (web) review round 1: **Changes requested** — Part E2 of `3-web-components/components/icon-button/icon-button.md`. AC-1, AC-2, AC-6 met; AC-3 (tooltip easing / reduced motion), AC-4 (stray `aria-label` on the disabled tooltip anchor) and AC-5 (`test:web` red: flaky Esc tooltip test, raised timeouts, Button/SplitButton timeouts awaiting the `ds/button-web` speedy-cache merge) not met. 6 🟡, 3 🟢; typecheck ✅, sync ✅, icon-button tests 11/11 alone; `docs:check` fails only on the pre-existing stale button-group contracts. Plan → `Open` (Planner items #6, #8); review status updated in the header and `3-web-components/README.md`.

## [Web Text field — review round 3] — 2026-10-21
### Changed
- Web `text-field.md` Part E Round 3 (E5): **Approved** — #9 fixed (Chromium at 980 and 1280 px, EN and AR: multiline action box 24/32/40 sits 4 px = `spacing-xs` inside the top edge and inline end at sm/md/lg; test asserts the `max(…)` rule for single-line and multiline), #10 fixed by plan 1.2; RTL prefix at inline start (right), suffix and end button at inline end (left), as B5 and the dark/AR preview. No new findings. `typecheck` ✓, `docs:check` only the 2 baseline `button-group` errors, `test:web` Text field 19/19 but red from host-load timeouts in untouched Button/Icon button/Split button tests (re-run at the before-merge gate). Code → Approved (header + README).

## [Web Text field — fix round 2 (1.2)] — 2026-10-21
### Fixed
- Fixed finding #9 by keeping multiline trailing actions at least `spacing-xs` inside the top border with the token-only `max(action-inset − padding-block, (line-height − action-box) / 2)` rule, adding sm/md/lg coverage at 980 and 1280 px, and correcting C8 to identify the Biowave `Icon`; Text field tests pass 19/19 and the serial full Web suite passes 87/87.

## [Web Text field — plan 1.2] — 2026-10-21
### Changed
- Added the plan 1.2 web Text field preview sheets for light/English and dark/Arabic RTL, covering sm/md/lg anatomy, six states, attachments, multiline examples, resolved token callouts, and the 4 px trailing-action top inset rule.
- Web `text-field.md` plan 1.1 → 1.2 answering Round 2 Planner findings: #9 one multiline trailing-action rule in B2/C3 — `margin-block-start = max(action-inset − padding-block, (line-height − action-box) / 2)`, action box never closer than `spacing-xs` to the top border (resolved top offset `spacing-xs` at sm/md/lg, EN and AR); B9/C6 add a multiline case to the viewport test; C7 adds "Fix round 2 — Executor task list" (Web D3 not touched — Tablet/Mobile Figma contracts inherit it). #10 B7 examples and C3 Icons now use the Biowave `Icon` (`<Icon name="…" />`). Planner response added under E4. Plan → Finished (header + README); both Text field contracts regenerated.

## [Web Text field — review round 2] — 2026-10-21
### Changed
- Web `text-field.md` Part E Round 2 (E4): **Changes requested** — Round 1 #1–#8 and AD-1 … AD-6 fixed (measured in Chromium at 980 and 1280 px: single-line action box 24/32/40 inset 4 px at sm/md/lg, disabled action and end button not focusable or clickable, `aria-*` on the input); `test:web` 87/87, `typecheck` ✓, `docs:check` only the 2 baseline `button-group` errors. New: #9 🟡 multiline action reaches the top border at md/lg (B2 inset vs first-line rule conflict, Planner → Executor), #10 🟢 C3/B7 still name MUI `Icon` (Planner). Plan → Open, Code → Changes requested (README + header).

## [Review — Web Button round 3: Approved] — 2026-10-20
- Round 2 findings #11–#13, #15–#17 fixed (#14 closed by the Planner); AC-11 … AC-15 met; `docs:check` ✅, `typecheck` ✅, `test:web` ✅ 79/79 in ≈ 6 s with the default timeout (slowest Button test 979 ms), `sync` ✅; `BiowaveProvider` default caches unchanged. Manual QA open: loading width and screen-reader announcement (EN/AR). `3-web-components/components/button/button.md` Part E4, header and `3-web-components/README.md` Review column updated.

## [Fixed — Web Button review round 2] — 2026-10-20
- Added fresh speedy Emotion caches per test with post-cleanup flushing; removed Button's raised timeouts; kept the loading live region mounted; stripped both true and false `mirrorInRtl` markers; and verified transition restoration after re-enable. The configured web suite passes 79/79.

## [Plan — Web Button 1.2: shared test tooling fix] — 2026-10-19
- Review round 2 Planner items: decided the `test:web` fix (#11) — a fresh **speedy** emotion cache per test, flushed after `cleanup()` (MUI `createRenderer` pattern + `@emotion/cache` `speedy`); Foundations gets `createBiowaveEmotionCaches()` and an optional `BiowaveProvider` `emotionCaches` prop (default unchanged). Planner probe, not committed: 73/77 in 2 m 32 s → 77/77 in 35 s with default timeouts. Folded #12, #13, #15–#17 into C3/C6/C7 (Fix round 1 task list). Regenerated stale `tablet` / `mobile` `button-group` Figma contracts with the generator (#14; hash only, body unchanged). Detail: `3-web-components/components/button/button.md` › E3 Planner response, F2.

## [Review — Web Button round 2: Changes requested] — 2026-10-19
- Round 1 findings 1–10 all fixed; `typecheck` ✅, `sync` ✅, Button 24/24 ✅; but `test:web` ❌ 73/77 both parallel and serial (emotion `<style>` tags pile up per test file and slow axe/user-event past 5 s; Planner owns the shared fix, #11), `docs:check` ❌ (stale tablet/mobile button-group Figma contracts, #14), live region mounted with its text (#13). Full record: `3-web-components/components/button/button.md` › E3.

## [Tooling — update components from photos (agent-workflow-kit: Updater)] — 2026-10-20
### Added
- **Updater** role (`update-component` agent, `workflow-update` skill): send photos of a UI screen or a single component plus a prompt; it finds the existing component, compares the photos with its plan, snaps what it sees to existing semantic tokens, shows a diff and asks which rows and platforms (web, tablet, mobile) to apply. On a yes it saves the photos and a change request to `<section>/components/<name>/references/`, updates Parts A–D and F (Part A on all three platforms), sets Plan `Finished` and Code `Planned`, and regenerates the contracts. The orchestrator then runs preview → implement → review as usual; review rounds before the update no longer count.
- `_workflow/inbox/`: drop photos here when you can't send a file path.
- `_workflow/config.json`: `inputs.update`, `outputs.update`, `agents.update`, `update` settings; AGENTS.md: Updater role row.

## [Tablet — Icon review round 2] — 2026-10-21
### Changed
- Icon (tablet) review round 2: **Approved** — Part E3 of `4-tablet-components/components/icon/icon.md`. AC-1…AC-5 met after the `main` merge and `BwIcon` adoption in `BwButton`: `flutter analyze` clean, `flutter test` 131/131; each guard pattern (`Icons.`, `CupertinoIcons.`, `IconData(`, raw `Icon(` outside `icon/`) proven by a planted probe (reverted); Button icons keep size, colour, keys and decorative semantics with a single RTL flip; Button golden diffs confined to sm/md icon glyphs (Symbols axes). Round 1 #2 fixed, #1 and #3 still open; 5 🟢 nits total (incl. guard misses non-`_rounded` `Symbols.*`). `docs:check` fails only on the pre-existing stale button-group contracts (accepted). Review status updated in the header and `4-tablet-components/README.md`.

## [Tablet — Icon adoption in Button] — 2026-10-21
### Changed
- Adopted `BwIcon` in tablet `BwButton` for leading and trailing icons, extended `no_legacy_icons_test.dart` to prohibit Flutter `Icons.*`, `CupertinoIcons.*`, `IconData(` constructors and raw `Icon(` widgets outside `icon/` (proven via planted probes), added BwIcon RTL/semantics button tests, and regenerated Button goldens with `BwIconAxes` variable font metrics.

## [Tablet — Icon review round 1] — 2026-10-20
### Changed
- Icon (tablet) review round 1: **Approved** — Part E2 of `4-tablet-components/components/icon/icon.md`. AC-1…AC-5 met; `flutter analyze` clean, `flutter test` 64/64; D-18 guard proven by a planted `Icons.add` probe (reverted); goldens show real Material Symbols Rounded glyphs. 3 🟢 nits (`filled: false` vs `IconTheme.fill`, guard misses `CupertinoIcons` / `IconData(`, stale "Source code" header row). `docs:check` fails only on the pre-existing stale button-group contracts (accepted). Code → `Approved`.

## [Tablet — Icon] — 2026-10-20
### Added
- Tablet `BwIcon`, `BwIconSize` and `BwIconColor`: Google Material Symbols Rounded glyphs with semantic size/colour tokens, fill, single-flip RTL handling, decorative/labelled semantics, package export, full widget/golden coverage (with `MaterialSymbolsRounded` variable font loaded in tests and EN/AR localization delegates), and a package-wide guard against Flutter `Icons.*` (`flutter analyze` and all 64 `flutter test` cases passing). Code → `Built`.

## [Mobile Button — review round 2] — 2026-10-21
### Changed
- Mobile `button.md` Part E Round 2: **Approved** — Round 1 #1 fixed (`BwFocusRing` always returns the same `Stack`, child State survives focus; the new test fails when the old ring is restored) and #2 fixed (one `BwButtonMetrics` size table); ring geometry unchanged; 70/70 Flutter tests; no new findings. Review status updated in the header and `5-mobile-components/README.md`.

## [Mobile Button — fix round 1 (1.1)] — 2026-10-21
### Fixed
- Mobile Button review findings #1–#2: `BwFocusRing` now keeps a stable `Stack` so loading content State survives keyboard-focus changes, button dimensions use one size-to-metrics table, and a State-identity regression test was added; all 70 Flutter tests pass with existing goldens unchanged.

## [Mobile Button — review round 1] — 2026-10-20
### Changed
- Mobile `button.md` Part E Round 1: **Changes requested** — focus ring measured 2 dp outside the container with no layout change for every size in LTR and RTL, real-font goldens on `surfacePage`; 1 🟡 (#1 `BwFocusRing` swaps `child` ↔ `Stack` on focus and remounts the button content) and 1 🟢 (#2 icon size mapped twice). Review status updated in the header and `5-mobile-components/README.md`.

## [Mobile Button — implementation (1.1)] — 2026-10-20
### Added
- Added the Flutter mobile `BwButton` implementation with token-resolved filled, tonal, outlined and text variants; all colors and sizes; loading, RTL, reduced-motion and keyboard-focus behavior; shared `BwControlSize` and outside-container `BwFocusRing`; localized real-font test infrastructure; comprehensive widget tests; and visually verified light/dark English/Arabic goldens. Flutter analysis passes and all 69 tests pass with the sandbox-compatible faster-test runner.

## [Rules — component tokens from semantic tokens only] — 2026-10-20
### Added
- AGENTS.md golden rule **3b**: component tokens (`<name>.tokens.json` and component variables in Figma) alias semantic tokens only — primitive → semantic → component. Never `{primitive.*}`, raw values or another component's token; a missing semantic token means stop and report (Planner adds it, §6). Already enforced by `npm run component-tokens`.

## [Tablet Button — review round 2] — 2026-10-20
### Changed
- Tablet `button.md` Part E Round 2: **Approved** — Round 1 findings #1–#9 all fixed (focus ring 2 dp outside the container with no layout change, measured per size in LTR/RTL; real-font goldens; disabled stays disabled while loading); 1 new 🟢 nit (#10 golden page background equals the filled-neutral token). Review status updated in the header and `4-tablet-components/README.md`.

## [Tablet Button — fix round 1 (1.1)] — 2026-10-20
### Fixed
- Review findings #1–#9: the keyboard focus ring now paints outside the visible container without affecting layout or fading; loading preserves disabled state; shared localization/reduced-motion test setup and measured light/dark accessibility coverage were added; Inter, IBM Plex Sans Arabic and Material Symbols Rounded are loaded for tests; and all four real-font goldens were regenerated and visually checked.

## [Tablet + Mobile Button — plan 1.1 (review round 1 Planner items)] — 2026-10-20
### Changed
- Added light/English and dark/Arabic RTL tablet Button preview sheets for plan 1.1, with all valid variants and colors, four sizes, six states, token callouts, and corrected outside-container focus-ring geometry.
- Tablet `button.md` 1.0 → 1.1, Plan `Open` → `Finished` (closes E2 findings #1, #6): C3 focus ring rewritten — `BwFocusRing` hooks into `ButtonStyle.backgroundBuilder`, painted in a `Stack(clipBehavior: Clip.none)` at inset −(`focusOffset` + `widthFocus`) around the visible container, no `Padding`, no layout change, no fade; takes a `BorderRadiusGeometry` and a caller `ringKey`. B2/B6 state the geometry; B9/C6 add ring-rect vs container-rect per size, no-layout-change, measured sizes, dark guideline and disabled-while-loading tests. C5 adds `test/flutter_test_config.dart` and `test/fonts/` (Inter and IBM Plex Sans Arabic static TTFs with their SIL OFL licences; Material Symbols Rounded from the `material_symbols_icons` package asset) and the `pumpBw` localizations + `reduceMotion` flag. C7 AC-8–AC-10 and "Fix round 1 — Executor task list" (#1–#9); Planner response under E2. `4-tablet-components/README.md` Plan column updated. Contracts regenerated.
- Mobile `button.md` 1.0 → 1.1 (not built yet): the same focus-ring, test-font and `pumpBw` changes in B2, B6, B9, C3, C5, C6 and C7 AC-8, so mobile is not built with the tablet bug. Contracts regenerated. No token changes; Part A unchanged.

## [Tablet Button — review round 1] — 2026-10-20
### Changed
- Tablet `button.md` Part E Round 1: **Changes requested** (1 🔴 focus-ring geometry/layout, 5 🟡, 3 🟢); Plan set to `Open` for the Planner items (C3 focus ring, test font loading); Review status updated in the header and `4-tablet-components/README.md`.

## [Tablet Button — built (1.0)] — 2026-10-20
### Added
- `BwButton` for Flutter tablet with token-resolved variants, colors and sizes; loading/focus/RTL/accessibility behavior; shared control-size and focus helpers; 37 tests; and light/dark English/Arabic goldens.

## [Web — Icon review round 2] — 2026-10-20
### Changed
- Icon (web) review round 2: **Approved** — Part E3 of `3-web-components/components/icon/icon.md`. Round 1 findings #1–#5 all fixed (directional prop stripped in Button / Icon button, `IconName` = B1, prop/class/both single-flip and `[dir='rtl']` tests, Button 16/20/24 size test, repo-wide D-18 guard). 1 new 🟢 nit: Button light axe test has little timeout headroom (not caused by this branch). Code → `Approved`.

## [Web — Icon fix round 1] — 2026-10-20
### Fixed
- Icon (web) review round 1 findings #1–#5: `Button` and `IconButton` `prepareIcon` strip `directional` (like `mirrorInRtl` and `bw-icon-directional`) and mark the wrapper once; `Icon.tsx` `directional` JSDoc and `IconName` type (`MaterialSymbol | 'push_pin' | 'expand_more' | ''`) match B1; `Icon.test.tsx` tests all three directional marker forms inside `Button` and `IconButton`, `[dir='rtl']` rule scoping, `Button` `sm`/`md`/`lg` 16/20/24 icon sizes, and `push_pin` / `expand_more` typing; `noLegacyIcons.test.ts` guards against `material-symbols-rounded` and `@mui/material/Icon` outside `src/components/icon/`. Code → `Built`.

## [Web — Icon preview plan 1.1] — 2026-10-20
### Added
- Planning previews for Icon (web): light English and dark Arabic RTL spec sheets cover every `size-icon-*` token, all B3 color roles, FILL 0 / FILL 1, exact status content, and directional `arrow_forward` beside non-mirrored `search` and `check`; `previews/README.md` records resolved token values, prompts and visual checks.

## [Web — Icon plan 1.1] — 2026-10-20
### Changed
- Icon (web) plan 1.1 — review round 1 Planner items. Finding 1: Button / Icon button `prepareIcon` strips Icon's `directional` prop like `mirrorInRtl` and marks the wrapper once (B5, C3; `Button.tsx` · `IconButton.tsx` added to C5). Finding 2: `name` is typed `IconName` = `MaterialSymbol` + `push_pin` · `expand_more` — kept because the Figma Material Symbols library and `icons.md` use them and the 0.48.0 Rounded font still renders both ligatures (`push_pin` = `keep`), recorded in B1. Finding 5: `noLegacyIcons.test.ts` must fail on `material-symbols-rounded` / `@mui/material/Icon` outside `src/components/icon/` (B9, C5). Plan → `Finished`; contract regenerated.

## [Web — Icon review round 1] — 2026-10-20
### Changed
- Icon (web) review round 1: **Changes requested** — Part E2 of `3-web-components/components/icon/icon.md`. 3 🟡 (Button / Icon button must strip `directional`; `IconName` extras `push_pin` / `expand_more` vs B1; directional-prop tests), 2 🟢. D-18 sweep clean: no web component renders an icon from any source but Icon. Plan → `Open`, Code → `Changes requested`.

## [Web — Icon] — 2026-10-20
### Added
- Web `Icon` (`@biowave/web`): Material Symbols Rounded glyph with size/color tokens, fill, directional RTL, and labelled/decorative semantics. Re-exports `MaterialSymbol` from `@biowave/foundations`. Split button, button group, and text field now render glyphs through `Icon` (AC-7); tests use `Icon` instead of the temporary `MaterialSymbol` helper.

## [Roadmap v3 — Figma coverage check (P-05)] — 2026-10-20
### Changed
- Every component set in the four Figma files (Web, Tablet, Mobile component files and the LEGACY Web + Mobile pages in Foundations) was compared with `ROADMAP.md`. Decision **P-05** (Hassan): Tag / Label / Request status become **Chip** variants; Check badge → Badge; Checkbox card → selectable Card; Day picker → Segmented button; Notification card → List item; Upload photo → File upload; **Action bar** added to Phase 2 (Day 15, Web + Tablet); **Map** added to the backlog; Slider stays post-1.0.
- DS 1.0 target is now **45 components** + 13 patterns (Phase 1: 22, Phase 2: 23 — the old "21" counts were already out of date). `README.md` roadmap row updated.

## [Tooling — preview images after planning (agent-workflow-kit 1.1.0)] — 2026-10-19
### Added
- **Previewer** step: after each plan step the orchestrator sends the plan to Codex (ChatGPT image generation); if that fails, it uses Antigravity (Gemini image-generator). It draws the component with exact token values from `2-foundations/dist/tokens.json`, in **light + English** and **dark + Arabic (RTL)**, and saves them as JPEG (about 450 KB each) to `<section>/components/<name>/previews/<name>-light-en.jpg` and `<name>-dark-ar.jpg`, with a `README.md` (token sheet, prompts, check results). The images are shown at the after-plan gate, before any code.
- `_workflow/config.json`: `preview` settings and agents; AGENTS.md: Previewer role row.

## [Tooling — agent workflow (agent-workflow-kit 1.0.0)] — 2026-10-19
### Added
- `_workflow/config.json`: settings for the plan → implement → review → fix workflow. Planner and Reviewer = Claude; Implementer and Fixer rotate between Codex, Cursor and Antigravity. Checks per platform come from AGENTS.md §5. Gates after plan, after review and before merge. At most 2 fix rounds. Figma steps are skipped for now.
- AGENTS.md: **Fixer** role row (reads the latest Part E round and the contract; writes code and a "Fix round N" entry in C8) and a pointer to `_workflow/`.
### Changed
- `_docs/check.mjs`: the removed-path scan skips `_workflow/runs/` (run history, like `CHANGELOG.md` and `_audits/`).

## [Repository — agent workflow files excluded from Git] — 2026-10-19
### Changed
- Root `.gitignore` now ignores personal AI-agent state: `.claude/settings.local.json`, `.gemini/` and `.worktrees/`. Shared skills and configs (`.agents/`, `.claude/skills`, `.cursor/`) stay committed.
- `biowave-ds/.gitignore` now ignores `_workflow/.local/` (orchestrator scratch). Run records `_workflow/runs/**/run.md` and `*.prompt.md` are committed; raw agent output (`*.log`) was already ignored.

## [Docs — Text field Overview playground controls] — 2026-10-18
### Added
- Text field Overview now has interactive controls for example type, size, state, required status, supporting text, help tooltip and character counter, with English and Arabic labels.
- The controls update both the lightweight overview sample and a configured real `@biowave/web` `TextField`; presets cover leading/trailing icons, clearable, password, prefix/suffix, attached end button and multiline fields.

## [Repository — local and generated files excluded from Git] — 2026-10-18
### Changed
- Expanded the root `.gitignore` for OS metadata, editor state, local environment and signing files, Node test/build output, Flutter ephemeral output, logs and temporary files. The committed `2-foundations/dist/` output remains explicitly included.

## [Docs — Theme and Language switches on the home pages] — 2026-10-18
### Added
- Components List (Web / Tablet / Mobile), Foundation List and each foundation page now show the **Theme** (Light · Dark · System) and **Language** (EN · عربي) switches next to the title. The choice is saved and shared with the component pages.
### Changed
- `_docs/viewer.js`: one `prefsControls()` builds both switches for every page and one delegated `change` handler saves the choice and re-renders (focus returns to the chosen option). `_docs/component-body.html` keeps only a `data-prefs` slot; component shells regenerated with `npm run docs:build`.

## [Docs — live preview uses Material Symbols (D-18)] — 2026-10-18
### Fixed
- `_docs/live.tsx` still imported the removed `@mui/icons-material`, so every Web component page showed a Vite "Failed to resolve import" overlay. It now loads `@biowave/foundations/icons.css` and renders glyphs with `MaterialSymbol` (`add`, `arrow_forward`, `edit`, `push_pin` / filled, `delete`, `search`) until the Biowave `Icon` ships.

## [Icon — planned for Web, Tablet, Mobile (1.0)] — 2026-10-18
### Added
- `icon.md` for W/T/M (Plan `Finished`): Part A shared (A8 per platform); Web `Icon` on MUI `Icon` + Material Symbols Rounded font (`name: MaterialSymbol`, `size` xs…3xl or inherit, `filled`, `color` 10 roles, `directional`, `label`); Flutter `BwIcon` on `Icon` + `Symbols.*_rounded` (`BwIconSize`, `BwIconColor`, `directional` via `Transform.flip`, `semanticLabel`). Web C2 includes adopting `Icon` inside the built components and tests; Flutter Icon is the first component of each package.
- `icon.tokens.json` (`Icon / Size` 7 modes, `Icon / Color` 10 modes — `disabled` left out: Figma allows 10 modes and disabled icons inherit from their parent). Collections created in the Web, Tablet and Mobile Figma files; lint 0; `sync:verify-tokens` ✓ 66 tokens per file (sorted-dump checksums matched); `sync:done:tokens:*`.
- Icon colour contrast on the base background checked in both themes: all ≥ 3:1 (lowest: warning 3.24 light).
- Docs pages, README rows, contracts (`npm run contract -- <plat> icon`).

## [Tooling — Material Symbols icon library connected (D-18)] — 2026-10-18
### Added
- `_sync/figma-files.json` › `icons`: **Google · Material Symbols** (`RXlnhYgUKBBE6HveEr7e9C`, 4 154 sets `Material Symbols/<name>`, Style × Fill). Published; import by key verified from the Web Components file.
- On-demand icon index `_sync/figma-icons.json` (17 icons): `_sync/icons.mjs`, `_sync/figma-read-icons.js` (template), `npm run sync:icons:plan` (finds icons named in specs: `Symbols.x_rounded`, `<Icon …>x</Icon>`, `MaterialSymbol name="x"`, D4 INSTANCE_SWAP values/defaults, `**Icons used:**` lines) and `npm run sync:icons -- <dump>`. `npm run sync` shows the icon index; every Figma contract has an “Icons (keys)” section (set + Rounded unfilled/filled keys) and goes stale when its icons change.
- `**Icons used:**` lines in Split button (`expand_more`) and Button group (`more_horiz`) Part D on all platforms; Web Button / Icon button D4 rows point to the Material Symbols library (no more “Icons page” / `<{Glyph}Rounded />`).
- `AGENTS.md` §7, `_sync/README.md`, `icons.md` updated. `_sync/figma-read-icons.generated.js` git-ignored.

## [Code — icons migrated to Google Material Symbols (D-18)] — 2026-10-18
### Changed
- `@biowave/foundations` (web): dependency `@material-symbols/font-400@0.48.0` (Rounded, FILL axis only — ≈ 0.56 MB woff2 instead of ≈ 5.4 MB for the full `material-symbols` font); new `src/icons.css` exported as `@biowave/foundations/icons.css` (font import, `font-size: inherit` so token-sized wrappers are not overridden by the package's 24px, `'FILL' 0`, `.bw-icon-fill` = `'FILL' 1`).
- `@biowave/web`: removed `@mui/icons-material`. `SplitButton` (`expand_more`) and `ButtonGroup` (`more_horiz`) render MUI `Icon` with `baseClassName="material-symbols-rounded"`; `IconButton` and `SplitButtonMenu` icon wrappers set `font-size` from the size token. Tests use `src/test/materialSymbol.tsx` (to be replaced by the Icon component). New guard test `src/test/noLegacyIcons.test.ts` fails on any `@mui/icons-material` import. Text field (round 2, other agent) had already switched; not touched.
- `biowave_foundations` (Flutter): `material_symbols_icons ^4.2960.0`, re-exported; `BwIconAxes`; theme `iconTheme` (size/opticalSize `BwSize.iconLg`, `color-icon-neutral-default`, fill 0, weight 400, grade 0). Tablet/Mobile Button plans no longer add the dependency themselves.
### Verified
- Clean install: `npm run typecheck` ✓; `test:web` serial: Button 24, Icon button 11, Split button 11, Button group 10, guard 2 ✓ — the one remaining failure is Text field's axe test timing out at the 5 s default (round-2 work in progress, not caused by this change); one Icon button tooltip test flaked once under load and passed in two reruns.
- Browser render (Chromium, en/ar): Material Symbols font loads; icons 16/20/24 at token sizes with no clipping; `arrow_forward` mirrored in RTL; filled push pin; Text field help/error/clear/visibility/copy glyphs correct.
- Flutter changes not compiled — no Flutter SDK in this environment; run `flutter pub get && flutter analyze` in `2-foundations/flutter`.
### Note
- Run `npm install` on your machine: the lockfile now has `@material-symbols/font-400` and no `@mui/icons-material`.

## [Web Text field — round 2 implementation (1.1)] — 2026-10-18
### Added
- Managed trailing actions (`action`, `clearable`, password visibility), label help tooltip, supporting-row error icon, prefix/suffix add-ons, attached end button, multiline resize and `inputMode`.
- Private `FieldAction` and `FieldAddon` pieces; built-in clear, visibility, help and error glyphs use Material Symbols Rounded via MUI `Icon`.
### Fixed
- Review E2 findings 3, 4, 6, 7 and 8 and adornment bugs AD-1 … AD-6: native-input ARIA routing, disabled required colour, exact label hit area, form-reset counter, token-sized in-border actions, disabled controls, neutral error adornments, multiline first-line alignment and decorative click-to-focus.
### Verified
- Text field: 19/19 tests including light/dark, EN/AR, both review viewports, native form behavior and axe; full Web suite 77/77 when run serially; `typecheck`, `component-tokens`, `sync` and `docs:check` pass. The default parallel Web runner still times out in unrelated pre-existing suites, so Code remains `In progress`.

## [Foundations — D-18: Google Material Symbols is the icon set] — 2026-10-18
### Changed
- `2-foundations/guidelines/icons.md`: sources made exact — Web npm `material-symbols` (self-hosted Rounded variable font, `rounded.css`, class `material-symbols-rounded`, axes `'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' <size>`); Flutter `material_symbols_icons` ≥ 4.2960 (`Symbols.*_rounded`, `Icon(fill:, weight:, grade:, opticalSize:)`, built-in RTL mirroring); Figma `Google · Material Symbols` page. `@mui/icons-material` and Flutter `Icons.*` (the older Material Icons set) are no longer allowed. Migration section added.
- `ROADMAP.md`: decision D-18; Phase 0.4 closed. Section READMEs (2/3/4/5) stack rows.
- Specs (plans stay `Finished`, contracts regenerated): Web Button, Icon button, Text field (API value descriptions, examples, Text field C3 built-in glyphs + AC-12); Tablet and Mobile Button, Icon button, Text field (`Symbols.*_rounded`, RTL mirroring by the package, Code Connect mapping, `material_symbols_icons` added to Button C5 `pubspec.yaml`).
### Found (not changed — code Executor task, `icons.md` › Migration)
- Built web code still imports `@mui/icons-material`: `SplitButton.tsx`, `ButtonGroup.tsx`, `TextField.tsx`, `FieldLabel.tsx`, `FieldSupportingText.tsx` and the Button, Icon button, Split button, Button group tests.
- The Figma library index has no icon components: `figma-read-library.js` scans pages matching `Doc Kit|Icon|Annotation`, which misses `Google · Material Symbols`. Extend the page pattern before the Icon component's Figma contract.

## [Tablet + Mobile Text field — planned (1.1)] — 2026-10-18
### Added
- `4-tablet-components/components/text-field/text-field.md` and `5-mobile-components/components/text-field/text-field.md` (Plan `Finished`): Part A copied from Web 1.1 with a platform A8; Flutter spec `BwTextField` on M3 `TextFormField` (static label, `WidgetStateInputBorder`, decoration `helper`/`error`/`counter` widgets for semantics, `BwIconButton` trailing action / help icon, attached `BwButton`, add-on segments, `obscureText` + show/hide, `clearable`, `validator`, keyboard type/action, grapheme counter); code plan C1–C7 (depends on `BwButton` + `BwIconButton` being built first); Figma D referencing Web D2–D4 with platform differences.
- Platform sizes: **Tablet `md` · `lg`** (default `lg`; `md` hit area padded to 48) · **Mobile `lg` only** (every field ≥ the 48 touch target). No Hover variant in Figma on touch platforms. Variants: Tablet 112 · Mobile 56.
- `text-field.tokens.json` for both platforms (`$extends` the Web file, same aliases); docs pages, `components/index.json`, README rows; contracts generated (`npm run contract -- tablet|mobile text-field`).
- Biowave DS — Tablet and Mobile Components: `Text field / Size` + `Text field / State` collections created (23 tokens each, aliases to Foundations semantic variables). Lint 0 in both files; `sync:verify-tokens` ✓ 64 tokens per file (Tablet Button lines read in full; Mobile Button and both Text field dumps matched by checksum); `sync:done:tokens:tablet|mobile`.
### Verified
- `component-tokens` ✓ · `docs:check` ✓ (15 component files, Part A identical on all three platforms) · `sync` ✓ READY.

## [Sync — library index re-read, all contracts regenerated, Web component tokens pushed] — 2026-10-18
### Changed
- `_sync/figma-library.json` re-read: styles from Foundations (140 text · 8 effect · 6 grid), **28 `Doc/*` components with keys from the Annotation Doc Kit library (D-17)**, reach from the Web Components file (318 variables). Variables kept from the previous read (token source unchanged). Doc Kit components verified importable by key from the Web Components file.
- `npm run contract -- --all`: all 13 code + Figma contracts regenerated (Web Text field now on spec 1.1; Figma contracts carry Doc Kit keys, so Phase 2 docs are no longer blocked).
- Biowave DS — Web Components: component tokens pushed with `figma-apply-tokens-web.js` — created `Text field / Size › action-box, action-inset`, `Text field / State › addon-background, addon-text, error-icon`; updated `Text field / State › border, icon`; 57 unchanged. `figma-read-tokens.js` lint 0 · `sync:verify-tokens web` ✓ 64 tokens · `sync:done:tokens:web`.
### Verified
- `npm run sync` ✓ READY (13 Figma contracts in the build queue) · `npm run docs:check` ✓ · `npm run component-tokens` ✓.

## [Doc Kit 1.3 — own library file (D-17)] — 2026-10-18
### Changed
- **D-17:** the Figma Doc Kit lives in its own library file, **Annotation** (`_sync/figma-files.json` › `docKit`, key `cBPWg6YZNqK8UIzgMQIpXl`), moved from Foundations › `↳ Doc Kit` by Hassan. All 28 `Doc/*` entries are components there again (8 had arrived as instances and were rebuilt; nested instances relinked to the local ones); every value stays bound to the Foundations library (lint: 0 unbound, 0 unstyled text).
- Tooling: the sync status queues `figma-doc-kit.md` for the Annotation file (`sync:done:doc-kit` → `--components=docKit`); `figma-read-library.js` reads `Doc/*` components in the Annotation file (no `loadAllPagesAsync`); the contract generator takes Doc Kit keys by the `Doc/` name and tells the Figma Agent to enable the Annotation library.
- `figma-doc-kit.md` 1.3, `AGENTS.md` §7, `_sync/README.md`, `README.md` (D-17, status), `ROADMAP.md` 0.3.

## [Web Text field — plan 1.1: legacy properties + adornment bug] — 2026-10-18
### Added
- `_audits/input-family.md` §6–7: full property inventory of the legacy web `↳ Inputs` page (Inputs 56, Dropdown 30, Textarea 14, Verification code 48 variants) mapped to Biowave components; decisions **I-11 … I-14** confirmed by Hassan (help icon in the label row, error icon in the supporting row, prefix/suffix as attached add-ons, managed trailing action API, attached end button); adornment bugs AD-1 … AD-6.
- Text field spec 1.1 (`text-field.md`): new parts `help-icon`, `prefix`, `suffix`, `trailing-icon`, `end-button`, `error-icon`; props `helpText`/`helpLabel`, `action`, `clearable`/`clearLabel`/`onClear`, `passwordToggle`, `prefix`, `suffix`, `endButton`, `resize`, `inputMode`; private parts `FieldAddon`, `FieldAction`; Figma D2–D5 and D10 updated (216 variants unchanged; new options are component properties); E3 review addendum.
- `text-field.tokens.json`: `action-box`, `action-inset`, `addon-background`, `addon-text`, `error-icon` (aliases of existing semantic tokens). `component-tokens` ✓.
### Changed
- **Breaking (spec 1.1):** `endAdornment` is decorative only; interactive trailing content moves to `action` / `clearable` / `passwordToggle`. Caller `aria-*` now goes to the native input.
- Error no longer recolours leading/trailing icons; read-only border is `color-border-default` (read-only was identical to default in dark mode).
- Web Text field Plan `Open` → `Finished`; Code stays `Changes requested` (round 2 implements spec 1.1).
### Found (not changed)
- Bug reproduced in Chromium: trailing slot sized by `target-min` (48 px below the 1200 px breakpoint) overflows `sm`/`md` fields; Icon buttons cover the border; disabled field keeps the trailing button active.
- ~~Doc Kit components missing~~ — corrected: the Doc Kit had moved to its own Annotation library (D-17); see the next entry.

## [Docs — one project: `npm start` runs everything] — 2026-10-18
### Added
- `npm start` (also `npm run dev` / `npm run docs`): one Vite dev server for the whole system. `/` opens the **Foundation List** (`2-foundations/index.html`) as the home page; Foundations, token preview, the three Components Lists and every component page are served together.
- Live React previews: `_docs/live.html` + `_docs/live.tsx` render the real `@biowave/web` components (Button, Icon button, Split button, Button group, Text field) from `3-web-components/src` inside each Web component page (Overview tab), following the page's language, theme and color. `_docs/vite.config.mjs`. Dev deps: `vite`, `@vitejs/plugin-react`. No folders added or moved.
### Fixed
- Text field docs page crashed (no playground config) — now has a static preview and states (default, hover, focus, error, read-only, disabled).
- Component page logo linked to a non-existent path — now goes to the Foundation List.
- Platform tabs on a component that exists on one platform only now open that platform's Components List instead of a 404.
### Changed
- Old static server kept as `npm run docs:static`.

## [Web Button family — Icon button, Split button, Button group built] — 2026-10-18
### Added
- `IconButton`: four emphasis variants, five semantic colors, `sm·md·lg`, controlled toggle/selected glyphs, tokenized visual tooltip, loading/disabled behavior, RTL directional icons and accessible native-button semantics.
- `SplitButton`: real Button + IconButton segments with logical inner corners, controlled/uncontrolled menu state, tokenized temporary MUI menu, complete menu-button keyboard navigation and localized trigger labels.
- `ButtonGroup`: horizontal/vertical action layout, five alignment modes, group-owned child sizing, DOM-order-preserving vertical layout, localized overflow menu and validation warnings.
- Public package exports and 32 focused tests for the three components; the complete Web suite now covers 67 passing tests.
### Changed
- `Button`, `IconButton` and `SplitButton` consume Button Group size context; Button and IconButton also expose private segmented-corner primitives for Split Button composition without widening the public API.

## [Review — Web Text field round 1: Changes requested] — 2026-10-18
### Reviewed
- Clean install: typecheck ✅, `test:web` 35/35 ✅, `component-tokens` ✅, `sync` READY; `docs:check` ❌ (all 13 Figma contracts stale since Doc Kit 1.2). Field colour pairs checked on both field backgrounds, light + dark: all pass.
- Findings: 1 gate blocker (stale Figma contracts, not caused by Text field), 3 should-fix (read-only identical to default in dark mode; input `aria-*` routed to the root div; required indicator stays error-coloured when disabled), 4 nits. Figma build, Tablet, Mobile and Select not started. Full record: `3-web-components/components/text-field/text-field.md` › Part E.
### Changed
- Web Text field status: Plan `Finished` → `Open`, Code `Built` → `Changes requested`; `3-web-components/README.md` row updated.

## [Figma Doc Kit 1.2 — built] — 2026-10-18
### Added
- Figma Doc Kit built in **Biowave DS — Foundations** › `↳ Doc Kit`: the 24 `Doc/*` components from `2-foundations/figma-doc-kit.md` plus `Doc/Logo`, all auto layout with native slots, every fill/stroke/padding/gap/radius/width bound to Foundations variables and every text to a `Web/en/*` text style (lint: 0 violations). Unblocks Phase 2 (documentation pages + Components List card) of every Figma contract once the library is published and the keys are read.
- `Foundation List` home page (10 linked cards) right after Cover, built only from the four home components.
- DK-3 sample doc page (31 kit instances, checked in Light and Dark).
### Changed
- `figma-doc-kit.md` 1.2: page widths confirmed (DK-5): Wide = `size/container/6xl`, Standard = `size/container/2xl`; Fill rule for kit instances in rows; slot names; `Doc/Timeline` steps are the `motion-duration-*` tokens; code text uses `Web/en/data/*` (no mono style in Figma).

## [Web Text field — planned and built] — 2026-10-18
### Added
- `TextField` for Web: static visible/visually-hidden label, `sm·md·lg`, single-line and multiline input, required/error/helper/counter states, leading/trailing adornments, disabled/read-only behavior, native form semantics, RTL, dark theme and public package exports.
- Contract-first source, component-token collections, generated code/Figma contracts and 11 focused tests covering token parity, state semantics, Unicode counting, warnings, keyboard order, EN/AR, light/dark and axe.
### Changed
- Accessibility guidance records the approved editable-field focus exception: focused border at `border-width-focus`, no exterior offset; the contract generator now preserves that exception instead of emitting the generic offset-ring rule.
- Pinned Stylis 4.2 across the workspace so `stylis-plugin-rtl` and Emotion serialize the same AST version; this fixes disabled/read-only MUI input rendering in Arabic.

## [Audit — Input family: Figma audit, decisions I-01 … I-10 closed] — 2026-10-18
### Added
- `_audits/input-family.md`: read-only audit of the legacy input sets (web `Inputs`, `Dropdown`, `Textarea`, `Verification code`; mobile `Inputs` + parts, `PIN Input`, `Phone Number`, `Search Input`, `Details input`), token check (no foundation change needed before Day 7), decisions I-01 … I-10 and the proposed build order (Text field + Select Day 7, Verification code Day 8, Phone field Day 13). Nothing in Figma or tokens changed.
### Changed
- Decisions I-01 … I-10 confirmed by Hassan (all recommendations): static label above the field, outlined only, field focus = border in `color-border-focus` at `border-width-focus` (exception to be recorded in `a11y.md` with the Day 7 plan), `sm·md·lg`, Text area inside Text field, shared `.Field/*` parts, legacy sets deprecated after approval.
- `ROADMAP.md`: Verification code added to Day 8, Phone field added to Day 13, I-01 … I-10 row in §7, Phase 0.2 updated.

## [Web Button — code round 2 built] — 2026-10-18
- Fixed review findings #1, #2, #3, #5, #6, #7 and #8: stable loading name with external live status, one sanitized RTL icon flip, opacity fades, progress-duration spinner, instant disabled transitions, shared visually-hidden helper, and the complete 24-test contract matrix.

## [Web Button — review round 1 Planner items, contracts generated] — 2026-10-18
First full-loop test of the R-01 process (Planner → contracts → other agents → review).
### Added
- Token `motion-duration-progress` (primitive `duration.1000` = 1000ms): one full turn of a looping progress indicator; **not** zeroed by reduced motion. Outputs: `--bw-motion-duration-progress`, `cssVars.motion.duration.progress`, `BwDuration.progress`. Exception rule added to `2-foundations/guidelines/motion.md`. Code-only (no Figma variable, like all motion tokens). `npm run tokens` 162/162 contrast pass.
- `3-web-components/components/button/button-contract.md` and `figma-button-contract.md` (generated, `npm run contract -- web button`).
### Changed
- Web Button `button.md` 1.0 → 1.1, Plan `Open` → `Finished` (closes E2 findings #1, #3, #4, #7, #9, #10): B2 + C3 loading content hidden with `opacity` only and the `role="status"` region moved outside the button (keeps the accessible name); B4 + C3 spinner uses `motion-duration-progress`; B5 + C3 `bw-icon-directional` class is the main way, `mirrorInRtl` stripped by the Button, flip scoped to `.bw-button__icon`; C3 instant disabled change; C6 regex with word boundaries plus new tests (name while loading, single RTL flip, per variant × color tokens, spinner under reduced motion); C7 AC-9 / AC-10 (round-2 Executor fixes). Planner response added under E2; F0 / F2 rows added. `3-web-components/README.md` Plan column updated.
- `_sync/figma-library.json` re-saved (token source hash changed; Figma variables unchanged — 318 variables, 140 text / 7 effect styles, 0 components).

## [Structure — R-01: one file per component per platform, contracts, docs home pages] — 2026-10-18
Implements `PLAN.md` v4 (approved by Hassan 2026-10-18; the plan file is removed — this entry is its record). Backup: `../_backup-2026-10-18-pre-R01.tar.gz`.
### Changed
- **One folder and one file per component per platform:** `<section>/components/<name>/<name>.md` = A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog, merged mechanically from the old guideline, spec, plan, figma and review files (content-loss check: every source line present except the intended drops — other platforms' A8 columns, duplicated status rows, the old B8 pointer). Section numbers kept from the old files (spec §3 = B3, figma.md §8 = D8 …); references rewritten.
- Guidelines copied into all three platform files (decision 2026-10-17); A8 keeps only that platform. Tablet/Mobile Part D split into D2 · D3 · D4 (were one "2–4" block).
- Component tokens moved to `<name>.tokens.json` (`$extends` paths updated); component-token hashes unchanged, so Figma stays in sync.
- Templates: one `_templates/component.md` (replaces 5) + `section-readme.md` + `README.md` (writing rules, one fact one home, ASCII legend, section → web tab / Figma page maps, plan status values).
- Section READMEs 3/4/5 rewritten to the standard template; their Components table is the status source together with each file header. Root README (structure, status, D-14…D-16), AGENTS.md (role read-map, rule 3a strict, rule 9 changelog, rule 10 guidelines copies, contract workflow), ROADMAP and `_sync/README.md` updated.
- Web docs keep the catalog design (10 tabs); now one generated HTML page per component (`<name>.html`) reading only `<name>.md`, with platform switch, component menu, status card and contract links; sizes resolved from tokens at runtime.
- `_sync`: the Figma build queue tracks generated Figma contracts (editing a plan, review or changelog no longer re-queues Figma work); `npm run sync` adds the library index and contract status.
### Added
- **Contracts:** `npm run contract -- <platform> <name>` (`_docs/contract.mjs`) generates `<name>-contract.md` (code Executor) and `figma-<name>-contract.md` (Figma Agent: target file, library connections, component-token collections, every variable / text style / effect style with its key, Phase 1 set, Phase 2 docs + Components List card, strict component-tokens-only rule, lint acceptance criteria). Gates: plan Finished, component tokens valid, no token gaps, fresh library index. Generated for 11 components; **Web Button waits** (plan Open — review round 1 Planner items).
- **Figma library index** `_sync/figma-library.json` read from Figma on 2026-10-18: 318 semantic variables, 140 text styles, 7 effect styles, 0 Doc Kit components (not built yet); all 318 reachable from the Web Components file. `_sync/figma-read-library.js`, `_sync/library.mjs`, `npm run sync:library`.
- **Home pages:** Foundation List (`2-foundations/index.html`, 10 cards: the 7 from Hassan's example + Motion, Accessibility, Content) with `foundation.html#<card>` guideline pages; Components List per platform (`<section>/index.html`, generated from the component folders). Figma equivalents specified in `2-foundations/figma-doc-kit.md` › Home pages (new `Doc/Home header`, `Doc/Title bar`, `Doc/Home card`, `Doc/Footer`).
- `2-foundations/figma-doc-kit.md` (moved) now owns the 12 Figma documentation page layouts (from the old Figma build template) and the home pages; v1.1.
- `npm run docs` (server), `docs:build` (generates all HTML shells + `components/index.json`), `docs:check` (structure, Part A identity, status, generated pages, contracts, links, removed paths, demo tokens).
- Component file headers gained `Summary`, `Summary (ar)`, `Parts`, `Parts (ar)` (moved from the old catalog script) and `Plan`, `Code`, `Figma build`, `Review` status fields.
### Removed
- The separate component-guidelines section, the per-platform spec folders, the three platform preview folders, the old catalog folder (moved to `_docs/`) and the five old templates. Audit moved to `_audits/button-family.md`.
### Verified
- `npm run docs:check` ✓ (12 component files) · `npm run sync` ✓ READY, same blocking state as before; queue now 12 Figma contracts (+ Doc Kit) instead of 40 doc files · `npm run component-tokens` ✓, hashes unchanged · `npm run typecheck` ✓ · `npm run test:web` ✓ 21/21 (clean install; the macOS `node_modules` cannot run Vitest in the Linux shell) · Flutter not run (no SDK in this environment).
- Docs pages opened in a browser: Foundation List, a foundation page, Components List (Web, Tablet), component pages in en/ar × light/dark — all tabs render from `<name>.md`, platform switch and menus link correctly, Overview identical to the old catalog.
- Contract gates tested: an invalid token alias and a `Draft` plan both stop generation with the exact reason; editing Part D marked the affected contracts stale.

### Found (not changed)
- The Foundations Figma file still holds legacy component-level collections (`Button size`, `Avatar size`, `Checkbox size`, `Radio button size`, `Component Tokens / Link`) — against rule D-13 for the new system. Left untouched; deprecate when the new sets replace the legacy ones.
- The `biowave-component-doc` skill is out of date (wrong token values and names, old section structure, WCAG 2.1); an update is proposed separately.
- Figma Doc Kit not built yet — blocks every Figma documentation page and both Figma home pages (Phase 2 of every Figma contract).

## [Plan — R-01 repository restructure] — 2026-10-17
### Added
- `PLAN.md` (status: Proposed, not implemented): one folder and one `.md` per component per platform (guidelines copied into each), one HTML documentation page per component linked to its files, single component template, standard section README, sync tooling path changes, changelog rule and backfill of unlogged 2026-10-16 changes. Awaiting Hassan's approval.
### Changed (v2, 17:20)
- `PLAN.md` v2: adds generated implementation contracts per component and platform — `<name>-contract.md` (code Executor) and `figma-<name>-contract.md` (Figma Agent, with library connections and variable / style / component keys) — plus the Figma library index `_sync/figma-library.json` and `npm run contract`. Still not implemented.
### Changed (v3, 17:30)
- `PLAN.md` v3: documentation-style coverage check (§4.4) — 17 doc styles mapped; gaps G1–G9 (one page map for web + Figma docs, Part F1 "Changes", page layouts moved to the Doc Kit file, Doc Kit gate, demo CSS rule, sizes from tokens, outdated `biowave-component-doc` skill, assets display, foundation guideline links). Still not implemented.
### Changed (v4, 23:59)
- `PLAN.md` v4: Foundation List (10 cards) and Components List home pages in Figma and web, from Hassan's examples · web component pages keep the current 10 tabs · Figma docs keep the Blade-derived 12-page template · Figma contract in two phases (component set, then docs + home card) · strict component-tokens-only rule for component Figma files with an extended lint. Still not implemented.

## [Docs — component catalog preview] — 2026-10-16
### Added
- Component catalog: shared `catalog.css` / `catalog.js` / `server.mjs`, one preview page per platform, `npm run preview:components`; documentation tabs rendered at runtime from the markdown sources; playground controls (color, icons); Tablet/Mobile README catalog sections; backup `_catalog-backup-2026-10-16.tar.gz`.
### Note
- Logged on 2026-10-18 (backfill). Superseded by the docs viewer in R-01 (same design).

## [Review — Web Button round 1: Changes requested] — 2026-10-16
### Reviewed
- Typecheck ✅, 21/21 tests ✅, sync READY, component tokens ✅; Flutter not verifiable in the review environment.
- Findings: 2 blockers (loading state changes the accessible name; directional icon flipped twice in RTL), 4 should-fix (`mirrorInRtl` typing, spinner freezes under reduced motion — token gap, content fade, weak tests), 4 nits. Full record: `3-web-components/components/button/button.md` › Part E.
### Note
- Logged on 2026-10-18 (backfill).

## [Components — Web Button built] — 2026-10-16
### Added
- `3-web-components/src/components/button/`: `Button.tsx`, `ButtonSpinner.tsx`, `button.tokens.ts`, `index.ts`, `Button.test.tsx` (21 tests: light/dark, en/ar, states, axe); `src/internal/warnOnce.ts`; test setup `src/test/render.tsx`, `setup.ts`; `vitest.config.ts`; exported from `src/index.ts`.
### Note
- Logged on 2026-10-18 (backfill) — this change was not recorded when it was made.

## [Sync gate fix] — 2026-10-16
### Fixed
- `npm run sync` treated "component docs not yet built in Figma" as a red status, so code Executors refused to start (deadlock: code waited for Figma, but they are planned in parallel). Status now separates **BLOCKING** (code stale, Figma variables pending, component tokens pending/invalid → exit 1) from the **Figma build queue** (⏳, exit 0, "READY for component work"). `npm run sync:strict` keeps the full check for releases. AGENTS.md §5 and §7 updated.

## [Component tokens — D-13] — 2026-10-16
### Added
- Rule D-13: semantic variables only in Foundations; component files hold only component-token collections (`<Component> / <Group>`) aliasing Foundations semantic variables.
- `3-web-components/specs/button/tokens.json` (+ Tablet/Mobile via `$extends`, adding size `xl`).
- `_sync/component-tokens.mjs` (`npm run component-tokens`), `figma-apply-tokens.template.js`, `figma-read-tokens.js`, `sync:verify-tokens`, `sync:done:tokens:<file>`; `npm run sync` section 4.
### Synced and verified
- Button component tokens in Web / Tablet / Mobile Components: 6 collections, 41 variables each (Web 3 sizes, touch 4), every value an alias to a Foundations semantic variable, hidden from publishing, code syntax from the semantic variable. Lint: 0 violations in all three files; negative tests (copied semantic variable, raw value, wrong alias) detected.
### Changed
- AGENTS.md rule 3a + §7, `_sync/README.md`, templates (`figma.md` rule 0, spec §3, plan §5), Button `figma.md` binds component tokens with explicit modes; Definition of done adds `tokens.json`.

## [Figma workspace verified] — 2026-10-16
### Verified
- All four files in the team project (`_sync/figma-files.json` › `$project`); Foundations renamed **Biowave DS — Foundations** and published; library enabled in Web / Tablet / Mobile Components.
- From the Web file: all 9 Foundations collections visible; control tokens, inverse/overlay colors, `Focus/Ring`, `Focus/Ring Inverse` and `Web|Tablet|Mobile/{en|ar}/action/*` text styles importable; zero local variables in component files.
### Fixed
- `size/container/*` (11) were hidden from publishing in Foundations → made publishable (needed by Dialog, Side sheet). **Republish the library** to deliver them.
### Added
- Sync guard: `figma-read.js` marks hidden variables; `sync:verify` fails on any semantic variable hidden from publishing; `figma-apply` un-hides semantic variables it updates.

## [Figma files split — D-12] — 2026-10-16
### Added
- Figma files **Biowave DS — Web Components** · **Tablet Components** · **Mobile Components** (page structure: Cover, Index, Changelog, Components with one page per component, Internals). Keys in `_sync/figma-files.json` (the only place they are written).
- Foundations file: `↳ Doc Kit` page; effect style `Focus/Ring Inverse`; old component sections renamed `LEGACY …` (nothing moved or deleted).
- Sync tooling: component docs tracked **per Figma file**; `npm run sync` groups changes by file; `sync:done -- --components=<file>` (+ `sync:done:web|tablet|mobile|doc-kit`). `sync:done` alone now records variables only.
### Changed
- All 12 button-family `figma.md` files: each platform builds its own set in its own file (Create new; legacy sets are read-only references). Variant counts: Web Button 648 · Tablet/Mobile 720. Supersedes "one shared set for all platforms" from the earlier entry today.
- `_templates/figma.md`, `AGENTS.md` §7, `_sync/README.md`, `figma-doc-kit.md`, guidelines and spec headers point to the new files.

## [Components — button family planned] — 2026-10-16
### Added
- Guidelines: `button.md`, `icon-button.md`, `split-button.md`, `button-group.md`.
- Specs + plans + Figma build files for Web, Tablet and Mobile (36 files). One shared Figma component set per component for all platforms (Typography variable mode selects the platform scale).
### Decided (Planner, pending design-lead confirmation)
- Icon button sizes aligned to the control scale (`sm`–`xl`); Material 3 Expressive sizes, `Width` and `Shape` removed.
- Split button: `filled · tonal · outlined`, colors `brand · secondary · neutral`; built from Button + Icon button instances with a small gap.

## [Foundations 1.1.0] — 2026-10-16
### Added
- **Control tokens (P-04):** `size.control.height.{sm,md,lg,xl}` (32/40/48/56), `spacing.control.padding-inline.*` (8/12/16/24), `spacing.control.gap.*` (4/6/8/8). Replace the Figma-only `Button size` collection (to be deprecated once the button family is rebound).
- `color.background.inverse.{default,hover,pressed}`, `color.border.inverse`, `color.overlay.{hover,pressed}` for the button family.
- 12 contrast pairs (162 total, all pass).
### Decided
- B-01 … B-05 (button family) and D-10 Western digits.
### Synced
- Figma: 18 variables created with Web + Flutter code syntax; verified 189 variables in the changed collections; snapshot updated (459).

## [Roadmap v2 + Button family audit] — 2026-10-15
### Decided
- P-01 build our own web date/time pickers · P-02 MUI X DataGrid (MIT) · P-03 `7-patterns/` section · P-04 component values go into shared semantic **control** tokens first.
### Changed
- ROADMAP v2: button family first (Icon + Button Day 1; Icon button, Split button, Button group Day 2); 42 components; DS 1.0 Day 26.
### Added
- `6-component-guidelines/audits/button-family.md`: Figma gap audit of Button, Split button, Icon button, Button group; decisions B-01 … B-05.

## [Roadmap] — 2026-10-15
### Added
- `ROADMAP.md`: Phase 0 prep → 19 core components → 21 complex components → 13 patterns, 2–3 items per working day, buffer/release days 8, 18, 25; open decisions P-01 … P-04.

## [Sync tooling] — 2026-10-15
### Added
- `_sync/`: one-way sync files → generated code → Figma. `npm run watch` (auto-rebuild on token edits, macOS alerts), `watch:install` (start at login), `sync` (status), `sync:plan` (Figma Plugin API change scripts that keep variable IDs and primitive aliases, deprecate instead of delete), `sync:verify` (value-by-value check of every Figma mode), `sync:done` (baseline).
- Component docs (guidelines, specs, `figma.md`) tracked so changed components are flagged for the Figma Agent.
- AGENTS.md §7: sync procedure.
### Fixed
- Figma `_Primitive › Colors/white` was missing (present in code). Added, hidden, no scopes.
### Verified
- 441 Figma variables match the token source in every mode (themes, primitives, radius, spacing, size, typography EN/AR, grid & layout, border). Baseline saved in `_sync/figma-snapshot.json`.

## [Docs structure — Figma documentation pages] — 2026-10-15
### Added
- `figma.md` §8: 12 standard Figma documentation pages per component (component sheet, introduction, props and tokens, variations, states and motion, usage, content, platform, RTL, accessibility, changes, changelog) with ASCII layouts and sources.
- `6-component-guidelines/figma-doc-kit.md`: one-time spec for the `Doc/*` components every documentation page is built from.

## [Docs structure — Figma build] — 2026-10-15
### Added
- `_templates/figma.md` — per-platform build instructions for the Figma Agent (structure, layer tree, properties, variable/style binding rules, variants, RTL, interactions, docs frames, Code Connect, acceptance criteria, execution log). Values are read from the spec, never copied.
- ASCII wireframe conventions (`6-component-guidelines/README.md`) and wireframes in the guidelines, spec and figma templates.
### Changed
- Spec §8 now links to `figma.md` (the Figma ↔ code mapping has one home). `review.md` has a Figma section. Platform status tables track code and Figma separately.

## [Docs structure] — 2026-10-15
### Added
- `6-component-guidelines/` — design guidelines written once per component for all platforms, with the "one fact, one home" rules.
- `_templates/component-guidelines.md`.
### Changed
- `_templates/component-readme.md` is now the per-platform **spec** (API, dimensions, tokens by part × state, states + motion, RTL, a11y implementation, examples, Figma ↔ code mapping, tests).
- `_templates/plan.md` no longer repeats API / tokens / a11y; it references the spec and keeps approach, token gaps, files, tests and acceptance criteria.
- `_templates/review.md` checks code against the spec as well as the plan. AGENTS.md and README.md updated.

## [Foundations 1.0.1] — 2026-10-15
### Added
- Figma Design System file synced with the token source (see AUDIT.md §6).
- Theme check app moved outside the repo: `../biowave-theme-test` (consumes `biowave_mobile` by path).

## [Foundations 1.0.0] — 2026-10-15
### Added
- Repository structure: 1-overview, 2-foundations, 3-web-components, 4-tablet-components, 5-mobile-components; AGENTS.md workflow (plan → execute → review) and templates.
- DTCG token source migrated from the Figma variable exports.
- Generators for CSS variables, TypeScript, Dart; MUI theme (`createBiowaveTheme`, `BiowaveProvider`); Material 3 theme (`BwTheme.build`).
- Automated WCAG 2.2 contrast check (76 pairs × 2 themes), theme and platform parity checks.
- New foundations: border widths, focus ring, motion, icon sizes, target size, layers (z-index), breakpoints, role font weights, elevation scale with dark values.
- 15 guideline pages and a visual preview.
### Fixed
- See `2-foundations/AUDIT.md` (A-01 … B-12): caption-sm = 0, placeholder contrast, error/warning/success contrast, focus contrast, dark secondary using primary ramp, broken alpha step, remote width aliases, invalid token/group collisions.
### Changed
- Token names unified (see migration map in AUDIT.md).

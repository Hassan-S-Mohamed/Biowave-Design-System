<!-- GENERATED from icon.md @ 04c7f6b1d3fb8140 — do not edit; change the source and run: npm run contract -- web icon -->
# Icon · أيقونة — Web — code contract

> **Everything you need to build Icon on Web, and nothing else.** Read this file only. Generated from [`icon.md`](icon.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](icon.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Icon · أيقونة |
| Platform | Web · React + MUI |
| Built on | MUI `Icon` (font ligature) with `baseClassName="material-symbols-rounded"`; font `@material-symbols/font-400` (D-18) |
| Import | `import { Icon } from '@biowave/web'` |
| Version | 1.1 · 2026-10-20 |
| Source code | [`src/components/icon/`](../../src/components/icon/) |
| Tokens | [`icon.tokens.json`](icon.tokens.json) |
| Source | [`icon.md`](icon.md) @ `04c7f6b1d3fb8140` |

## 1. What it is

An icon is a small Google Material Symbols glyph (Rounded style, decision D-18) that helps people recognise an action, object or status faster. It supports text — it rarely replaces it. Every Biowave component that shows an icon uses this one component, so size, colour, fill and right-to-left behaviour are the same everywhere.

**Part names** (use exactly these in code, class names and tests):

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `container` | Yes | Square box that sets the size and colour; reserves space so layouts never jump while the font loads |
| 2 | `glyph` | Yes | The Material Symbols Rounded glyph named by `name`; outlined (fill 0) by default, filled (fill 1) for selected states |

**Options** (names and values are the props in §2):

- 4.1 `name`
- 4.2 `size`
- 4.3 `filled`
- 4.4 `color`
- 4.5 `directional`
- 4.6 `label`

## 2. API

### `Icon`

| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `name` | `IconName` | `MaterialSymbol` (type from `@material-symbols/font-400`, re-exported by `@biowave/foundations`) plus the two extra names below; `''` is typed only for the empty-name fallback | | ✓ | A4.1 — the glyph |
| `size` | enum | `xs` · `sm` · `md` · `lg` · `xl` · `2xl` · `3xl` | — (inherit) | | A4.2 — without `size` the icon follows the container's `font-size` (Biowave components set it) |
| `filled` | boolean | | `false` | | A4.3 — FILL 1 (class `bw-icon-fill`) |
| `color` | enum | `default` · `subtle` · `muted` · `inverse` · `brand` · `secondary` · `success` · `warning` · `error` · `info` | — (`currentColor`) | | A4.4 |
| `directional` | boolean | | `false` | | A4.5 — adds class `bw-icon-directional`; the icon mirrors in RTL (Button / Icon button take the class and mirror their wrapper once instead) |
| `label` | string | | — | | A4.6 — present: `role="img"` + `aria-label`; absent: `aria-hidden="true"` |
| `className` · `data-*` · `ref` | | | | | Forwarded to the root `span` |

Usage inside components: `<Button startIcon={<Icon name="add" />}>` — no `size`, the Button sizes it.

**`IconName`** = `MaterialSymbol | 'push_pin' | 'expand_more' | ''`, exported from `@biowave/web`. The two extra names are a closed list — any other name needs a new row here first.

| Extra name | Why it is kept | Checked |
|---|---|---|
| `push_pin` | The `@material-symbols/font-400` 0.48.0 typings list only the newer name `keep`. `push_pin` is the name in the Google · Material Symbols Figma library (`_sync/figma-icons.json`) and `icons.md`, which use one name across Figma, web and Flutter | The Rounded woff2 of 0.48.0 still has the `push_pin` ligature; it renders the same glyph as `keep`, pixel for pixel (headless Chrome, 2026-10-20) |
| `expand_more` | Missing from the 0.48.0 typings; it is the Split button menu chevron and is in the Figma library index under this name. The closest listed name, `keyboard_arrow_down`, is a different glyph | The Rounded woff2 of 0.48.0 has the `expand_more` ligature (renders one 1em glyph, not text); it differs from `keyboard_arrow_down` (headless Chrome, 2026-10-20) |

If a later font package drops either ligature, the Planner moves specs, `icons.md` and the Figma index to the listed name in one task.

**Invalid combinations** (`console.warn` once in development; fallback still renders):

| Combination | Fallback |
|---|---|
| `color` is a status (`success` · `warning` · `error` · `info`) without `label` and used standalone | Renders; warns “status icons need text or a label” (only when not inside a Biowave component slot — skip the check when `size` is unset) |
| `name` empty | Renders an empty box of the size; warns |

## 3. Dimensions

```
 ┬ ┌──────┐
 │ │  ◆   │  container: inline-size = block-size = font-size = size-icon-{size}
 ┴ └──────┘  glyph: line-height 1, centred, overflow hidden
```

| Size | Token | px |
|---|---|---|
| `xs` | `size-icon-xs` | 12 |
| `sm` | `size-icon-sm` | 16 |
| `md` | `size-icon-md` | 20 |
| `lg` | `size-icon-lg` | 24 |
| `xl` | `size-icon-xl` | 32 |
| `2xl` | `size-icon-2xl` | 40 |
| `3xl` | `size-icon-3xl` | 48 |

Layout rules: `display: inline-flex`, `flex: none`, `inline-size`/`block-size`/`font-size` from the size token (or `1em` + inherited `font-size` when `size` is unset); `overflow: hidden`; `user-select: none`; `vertical-align: middle`. The box is reserved before the font loads (`font-display: block` from the font package keeps text from flashing the ligature name).

## 4. Tokens by part and state

> Machine-readable source: [`icon.tokens.json`](icon.tokens.json) — Figma collections `Icon / Size` and `Icon / Color`.

| `color` | `glyph` colour |
|---|---|
| — | `currentColor` (inherits) |
| `default` | `color-icon-default` |
| `subtle` | `color-icon-subtle` |
| `muted` | `color-icon-subtlest` |
| `inverse` | `color-icon-inverse` |
| `brand` | `color-icon-role-brand` |
| `secondary` | `color-icon-role-secondary` |
| `success` | `color-icon-role-success` |
| `error` | `color-icon-role-error` |
| `warning` | `color-icon-role-warning` |
| `info` | `color-icon-role-info` |

Fill: `'FILL' 0` default, `'FILL' 1` with `filled` (`@biowave/foundations/icons.css`, class `bw-icon-fill`). Dark theme: same tokens.

### 4.1 How to use each token on Web

Values are for checking only — never paste a value.

| Token | CSS / TS | Light | Dark |
|---|---|---|---|
| `color-icon-default` | `var(--bw-color-icon-default)` · `cssVars.color.icon.default` | #0A0A0A | #F7F7F7 |
| `color-icon-inverse` | `var(--bw-color-icon-inverse)` · `cssVars.color.icon.inverse` | #FFFFFF | #0A0A0A |
| `color-icon-role-brand` | `var(--bw-color-icon-role-brand)` · `cssVars.color.icon.role.brand` | #132843 | #BEC9D9 |
| `color-icon-role-error` | `var(--bw-color-icon-role-error)` · `cssVars.color.icon.role.error` | #A31A1A | #FEA3A3 |
| `color-icon-role-info` | `var(--bw-color-icon-role-info)` · `cssVars.color.icon.role.info` | #1D48AD | #9CBCF2 |
| `color-icon-role-secondary` | `var(--bw-color-icon-role-secondary)` · `cssVars.color.icon.role.secondary` | #094E65 | #90C3D5 |
| `color-icon-role-success` | `var(--bw-color-icon-role-success)` · `cssVars.color.icon.role.success` | #1E6D41 | #8DD4AE |
| `color-icon-role-warning` | `var(--bw-color-icon-role-warning)` · `cssVars.color.icon.role.warning` | #773F12 | #FFC88F |
| `color-icon-subtle` | `var(--bw-color-icon-subtle)` · `cssVars.color.icon.subtle` | #292929 | #DBDBDB |
| `color-icon-subtlest` | `var(--bw-color-icon-subtlest)` · `cssVars.color.icon.subtlest` | #545454 | #BDBDBD |
| `size-icon-2xl` | `var(--bw-size-icon-2xl)` · `cssVars.size.icon.2xl` | 40 | 40 |
| `size-icon-3xl` | `var(--bw-size-icon-3xl)` · `cssVars.size.icon.3xl` | 48 | 48 |
| `size-icon-lg` | `var(--bw-size-icon-lg)` · `cssVars.size.icon.lg` | 24 | 24 |
| `size-icon-md` | `var(--bw-size-icon-md)` · `cssVars.size.icon.md` | 20 | 20 |
| `size-icon-sm` | `var(--bw-size-icon-sm)` · `cssVars.size.icon.sm` | 16 | 16 |
| `size-icon-xl` | `var(--bw-size-icon-xl)` · `cssVars.size.icon.xl` | 32 | 32 |
| `size-icon-xs` | `var(--bw-size-icon-xs)` · `cssVars.size.icon.xs` | 12 | 12 |

### 4.2 Component tokens

The code token map must equal [`icon.tokens.json`](icon.tokens.json) (tests compare them).

| Collection | Variable | Modes → semantic token |
|---|---|---|
| Icon / Size | size | xs: `size-icon-xs` · sm: `size-icon-sm` · md: `size-icon-md` · lg: `size-icon-lg` · xl: `size-icon-xl` · 2xl: `size-icon-2xl` · 3xl: `size-icon-3xl` |
| Icon / Color | color | default: `color-icon-default` · subtle: `color-icon-subtle` · muted: `color-icon-subtlest` · inverse: `color-icon-inverse` · brand: `color-icon-role-brand` · secondary: `color-icon-role-secondary` · success: `color-icon-role-success` · error: `color-icon-role-error` · warning: `color-icon-role-warning` · info: `color-icon-role-info` |

## 5. States and transitions

None of its own. Colour changes come from the parent's transition (`color` inherits). `filled` toggles instantly (no animation of the FILL axis).

## 6. RTL

```
LTR  [→] Next          RTL  التالي [←]      ← directional: mirrored
LTR  [✓] Saved         RTL  تم الحفظ [✓]     ← not directional: never mirrored
```

| Case | In RTL |
|---|---|
| `directional` on | `[dir='rtl'] .bw-icon.bw-icon-directional { transform: scaleX(-1) }` |
| `directional` off | Not mirrored |
| Inside Button / Icon button | `prepareIcon` treats `directional` exactly like `mirrorInRtl`: when the icon has `directional` (the prop), `mirrorInRtl` or the class `bw-icon-directional` — alone or together — it removes them from the icon and marks its own wrapper with `bw-icon-directional` once. Exactly one element is flipped (no double flip, no flip by the icon) |

## 7. Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Decorative (no `label`) | `aria-hidden="true"`, no role; the ligature text is never read |
| Meaningful (`label`) | `role="img"`, `aria-label={label}`; the ligature text is hidden from the name (`aria-label` wins) |
| Contrast | Meaningful icons ≥ 3:1 — the `color` tokens are checked by the build (`contrast-pairs.json`) |
| Focus | Never focusable |

## 8. Examples

```tsx
import { Icon, Button, IconButton } from '@biowave/web';

<Button startIcon={<Icon name="add" />}>Add device</Button>
<Button variant="outlined" endIcon={<Icon name="arrow_forward" directional />}>Next</Button>
<IconButton toggle selected={pinned} icon={<Icon name="push_pin" />} selectedIcon={<Icon name="push_pin" filled />} label="Pin" />
<Icon name="schedule" size="md" color="warning" label="Overdue" />
<Icon name="schedule" size="md" color="warning" label="متأخر" />
```

## 9. How to build it

### Goal

`import { Icon } from '@biowave/web'` renders any Material Symbols Rounded glyph with token sizes and colours, fill, RTL mirroring and correct semantics; the font is loaded once by `@biowave/foundations/icons.css`.

### Scope

**In scope:** B1–B9; `icon.tokens.ts` map; re-export the `MaterialSymbol` type from `@biowave/foundations`; then **adopt Icon** inside the built components — replace their direct MUI `Icon baseClassName="material-symbols-rounded"` usage with `<Icon name="…" />` in `SplitButton.tsx`, `ButtonGroup.tsx`, `TextField.tsx`, `FieldLabel.tsx`, `FieldSupportingText.tsx`, `FieldAction.tsx`, and replace the test helper `src/test/materialSymbol.tsx` with `Icon` in all tests (delete the helper's uses; keep the file only if still referenced).

Also in scope: `prepareIcon` in `Button.tsx` and `IconButton.tsx` per B5 (review round 1, finding 1), and the D-18 guard in `src/test/noLegacyIcons.test.ts` per B9 (finding 5).

**Out of scope:** new icons or custom SVG icons; animated icons; any other Button or Icon button change.

### Approach

- Base: MUI `Icon` with `baseClassName="material-symbols-rounded"` and `fontSize="inherit"`, wrapped in a styled root that applies the B2 size and B3 colour from `icon.tokens.ts` (`cssVars.size.icon.*`, `cssVars.color.icon.*`).
- `filled` → class `bw-icon-fill`; `directional` → class `bw-icon-directional` + the RTL rule in the root styles.
- Button / Icon button `prepareIcon`: read `directional === true` the same way as `mirrorInRtl` — strip the `directional` prop, `mirrorInRtl` and the `bw-icon-directional` class from the cloned icon, and put `bw-icon-directional` on the wrapper once (B5). The `Icon.tsx` JSDoc for `directional` must say exactly this.
- Semantics per B6; the children text is the ligature `name`.
- Type: `name: IconName` per B1 — `MaterialSymbol | 'push_pin' | 'expand_more' | ''` (`export type { MaterialSymbol } from '@material-symbols/font-400'` in `2-foundations/web/src/index.ts`); no other extra names.
- Gotchas: the font package's own `font-size: 24px` is reset by `icons.css` (`font-size: inherit`) — keep it; MUI `Icon` adds `aria-hidden` — override when `label` is set.

### Token gaps

None (`size.icon.*`, `color.icon.*` exist). Component tokens in `icon.tokens.json` alias them.

### Files to create / change

```
3-web-components/src/components/icon/Icon.tsx              new
3-web-components/src/components/icon/icon.tokens.ts        new
3-web-components/src/components/icon/Icon.test.tsx        new
3-web-components/src/components/icon/index.ts             new
3-web-components/src/index.ts                             change: export Icon
2-foundations/web/src/index.ts                            change: export type MaterialSymbol
3-web-components/src/components/{split-button,button-group,text-field}/*.tsx   change: use Icon
3-web-components/src/components/button/Button.tsx          change: prepareIcon strips `directional` (B5)
3-web-components/src/components/icon-button/IconButton.tsx change: prepareIcon strips `directional` (B5)
3-web-components/src/test/noLegacyIcons.test.ts           change: D-18 guard (B9)
3-web-components/src/components/**/*.test.tsx              change: use Icon instead of MaterialSymbol
3-web-components/README.md · CHANGELOG.md                  change
```

## 10. Tests

- [ ] Every `size` renders a box of the token size in light + dark × en + ar
- [ ] Without `size` the box follows the parent's `font-size` (inside Button `sm`/`md`/`lg`: 16/20/24, nothing clipped)
- [ ] `filled` adds `bw-icon-fill`; `color` maps to the B3 tokens; no `color` = `currentColor`
- [ ] `directional` mirrors in RTL only (the rule selector is scoped to `[dir='rtl']`)
- [ ] Inside Button and Icon button, for `<Icon directional />`, `<Icon className="bw-icon-directional" />` and `<Icon directional className="bw-icon-directional" />`: exactly one `.bw-icon-directional` in the tree, on the wrapper, none on the icon; in RTL the glyph is mirrored once
- [ ] Decorative: `aria-hidden`; labelled: `role="img"` + name; axe has no violations
- [ ] Invalid combinations warn once
- [ ] No raw values; no `@mui/icons-material` import (guard test)
- [ ] D-18 guard (`src/test/noLegacyIcons.test.ts`): fails when the text `material-symbols-rounded` or `@mui/material/Icon` appears in any file under `3-web-components/src/` outside `src/components/icon/` (the guard file itself excepted). Every web component then renders glyphs only through Icon
- [ ] Types: `push_pin` and `expand_more` compile as `name`; an unknown name does not

Implement every item in B9, plus:
- [ ] All existing component tests still pass after adopting Icon
- [ ] Type test: an unknown `name` is a TypeScript error (`// @ts-expect-error`)

## 11. Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 API matches B1 (names, types, defaults, warnings)
- [ ] AC-2 Sizes and colours only from B2–B3 tokens; no raw values
- [ ] AC-3 RTL per B5 (single flip inside Button / Icon button, on the wrapper, also for the `directional` prop)
- [ ] AC-4 Semantics per B6; axe clean
- [ ] AC-5 `npm run typecheck` and `npm run test:web` pass
- [ ] AC-6 Exported from `src/index.ts`; README row `Built`
- [ ] AC-7 Built components use `Icon` (no direct `material-symbols-rounded` markup outside `components/icon/`), enforced by `noLegacyIcons.test.ts`

## 12. Rules

1. Never edit generated files (`*/generated/*`, `2-foundations/dist/`, `2-foundations/preview/`, `_sync/*.json`, any `*-contract.md`).
2. No raw values: no hex, px, ms or font names — only the tokens in §4. A missing value means stop and ask; tokens are added by the Planner.
3. Never use primitives (`primitive.*`, `BwPalette`).
4. RTL first: logical properties only (`margin-inline-start`, `padding-inline`, `inset-inline-end`); mirror only directional icons (§6).
5. Light + dark and en + ar, always — and tested.
6. WCAG 2.2 AA: keyboard, visible focus (`color-border-focus`, 2px, 2px offset), labels, targets ≥ `target-min` (24px), reduced motion.
7. Stay inside this contract; one component per task; do not refactor unrelated files.

## 13. Commands that must pass

```bash
npm run typecheck
npm run test:web
npm run component-tokens
npm run sync        # must end with READY
npm run docs:check
```

## 14. When you finish

1. Fill [C8 Execution log](icon.md#c8-execution-log-filled-by-the-executor) in `icon.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `icon.md` and in the Components table of `3-web-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).

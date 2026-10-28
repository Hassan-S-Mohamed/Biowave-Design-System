<!-- GENERATED from divider.md @ e737cd454fbaaeb8 — do not edit; change the source and run: npm run contract -- web divider -->
# Divider · فاصل — Web — code contract

> **Everything you need to build Divider on Web, and nothing else.** Read this file only. Generated from [`divider.md`](divider.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](divider.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Divider · فاصل |
| Platform | Web · React + MUI |
| Built on | MUI `Divider` (`<hr>`), styled only from Biowave tokens |
| Import | `import { Divider } from '@biowave/web'` |
| Version | 1.1 · 2026-10-23 |
| Source code | [`src/components/divider/`](../../src/components/divider/) |
| Tokens | — |
| Source | [`divider.md`](divider.md) @ `e737cd454fbaaeb8` |

## 1. What it is

A divider is a thin line that separates groups of content inside a surface — list items, sections of a card or settings page, or actions in a toolbar. It makes the structure quicker to scan without adding a new surface. It never carries meaning of its own: headings, grouping and spacing still say what belongs together, and the divider only makes the boundary easier to see. A horizontal divider can show a short label in the middle — a connecting word such as “or” between two alternatives — turned on with a show/hide option.

**Part names** (use exactly these in code, class names and tests):

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `container` | Yes | Takes the full length the parent gives it (inline size when horizontal, block size when vertical) and holds the inset space at its ends |
| 2 | `line` | Yes | The visible rule, one border width thick, coloured by `emphasis`. With a label it is drawn as two equal segments, one on each side of the label |
| 3 | `label` | No | Short text centred on a horizontal divider (for example “or” / “أو”); shown only when show label is on |

**Options** (names and values are the props in §2):

- 4.1 `orientation`
- 4.2 `emphasis`
- 4.3 `inset`
- 4.4 `decorative`
- 4.5 `showLabel` and `label`
- 4.6 `component`

## 2. API

### `Divider`

| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `orientation` | enum | `horizontal` · `vertical` | `horizontal` | | A4.1 |
| `emphasis` | enum | `subtle` · `default` · `strong` | `default` | | A4.2 — line colour (B3) |
| `inset` | enum | `none` · `start` · `both` | `none` | | A4.3 — inset space `spacing-xl` (B2) |
| `decorative` | boolean | | `false` | | A4.4 — `true`: hidden from assistive technology (B6). Has no effect with `component="li"` (always hidden, B6) |
| `showLabel` | boolean | | `false` | | A4.5 — `true`: shows `label` in the middle of a horizontal divider |
| `label` | string | | — | | A4.5 — the label text (“or” / “أو”); used only when `showLabel` is `true` |
| `component` | enum | `hr` · `li` | `hr` | | A4.6 — `li` for a divider that sits directly inside a `<ul>` / `<ol>` (B6) |
| `className` · `data-*` · `ref` | | | | | Forwarded to the root element |

No `children` (the label comes only from `label`), no MUI `variant` / `textAlign` / `flexItem` / `light` / `absolute` props on the public API; `component` accepts only `hr` and `li` (C3 maps the Biowave props to MUI).

**Root element**

| `component` | Without label | With label (`showLabel` and a non-empty `label`, horizontal) |
|---|---|---|
| `hr` (default) | `<hr>` | `<div role="separator">` — an `<hr>` cannot hold text |
| `li` | `<li role="separator">` | `<li role="separator">` |

**Invalid combinations** (`console.warn` once in development; the fallback renders):

| Combination | Fallback |
|---|---|
| `orientation="vertical"` with `inset="start"` | Renders `inset="none"`; warns “inset start is for horizontal dividers only” |
| `orientation="vertical"` with `showLabel` | Renders the plain vertical line, no label; warns “label is for horizontal dividers only” |
| `showLabel` with an empty or missing `label` | Renders the plain line, no label; warns “showLabel needs a label” |

## 3. Dimensions

```
Horizontal, inset both
 spacing-xl                                   spacing-xl
├──────────┤                                 ├──────────┤
┌───────────────────────────────────────────────────────┐ ┬
│          ─────────────────────────────────            │ ┴ border-width-default
└───────────────────────────────────────────────────────┘
 ① container (fills inline size)   ② line

Vertical, inset both
 ┬ spacing-xl
 ┴
 │  ② line — border-width-default wide, fills the row's block size
 ┬ spacing-xl
 ┴

Horizontal with label, inset none
┌───────────────────────────────────────────────────────┐ ┬
│②─────────────────────── ③ or ────────────────────────②│ │ caption-md line height
└───────────────────────────────────────────────────────┘ ┴
                        ├─┤    ├─┤ spacing-md each side
 ② two equal segments (each ≥ spacing-xl), centred on the label's block axis
```

| Part | Property | `horizontal` | `vertical` |
|---|---|---|---|
| `line` | thickness | `border-width-default` (block-end border) | `border-width-default` (inline-end border) |
| `container` | length | inline size of the parent (`inline-size: auto`, block element) | block size of the row (`align-self: stretch`, `block-size: auto`) |
| `container` | inset `start` | `margin-inline-start: spacing-xl` | — (invalid, B1) |
| `container` | inset `both` | `margin-inline: spacing-xl` | `margin-block: spacing-xl` |
| `container` | inset `none` | margin `spacing-none` | margin `spacing-none` |
| `container` | outer margin | `spacing-none` — the parent's gap or padding sets the space around it | same |
| `container` (with label) | layout | `display: flex`, `align-items: center`; block size = the label's line height (`caption-md`, per language); the inset margins above still apply to the outer ends | — (no label, B1) |
| `line` (with label) | segments | two segments, one before and one after the label: `flex: 1 0 spacing-xl` (equal share of the free length, never shorter than `spacing-xl`), block-end border `border-width-default` | — |
| `label` (with label) | gap | `padding-inline: spacing-md` (the gap to each segment) | — |
| `label` (with label) | size | `flex: 0 1 auto` — natural width; wraps when longer than the free length, `text-align: center`; never truncated | — |

Layout rules: `flex-shrink: 0`; never adds its own spacing above / below (horizontal) or beside (vertical) — the parent's `gap` does. A vertical divider is meant for flex rows (toolbars, action bars); outside a flex row its height is the row's height only if the parent gives one.

Inset `start` stays one fixed `spacing-xl` (A4.3). Known follow-up: the List plan (Day 8) adds its own text-aligned inset for list rows; nothing is added to Divider now.

## 4. Tokens by part and state

> No component tokens (P-04): every value below is a semantic token, used directly. `{name}.tokens.json` is not needed.

| Part | Property | `emphasis="subtle"` | `emphasis="default"` | `emphasis="strong"` |
|---|---|---|---|---|
| `line` | colour | `color-border-subtle` | `color-border-default` | `color-border-strong` |
| `line` | width | `border-width-default` | `border-width-default` | `border-width-default` |
| `line` (with label) | minimum segment length | `spacing-xl` | same | same |
| `container` | inset | `spacing-xl` · `spacing-none` | same | same |
| `label` | text style | `caption-md` (`biowaveVariants.captionMd`; the family and line height follow the language) | same | same |
| `label` | colour | `color-text-subtlest` | same | same |
| `label` | gap to each segment | `spacing-md` | same | same |

The label does not change with `emphasis`. No interactive states. Dark theme: same tokens (values switch automatically). The line is decorative (`2-foundations/guidelines/border.md`) — no contrast requirement. The label is text: `color-text-subtlest` already meets 4.5:1 on `color-surface-default`, `-page`, `-subtle` and `-raised` in both themes (pairs exist in `contrast-pairs.json`; none to add).

### 4.1 How to use each token on Web

Values are for checking only — never paste a value.

| Token | CSS / TS | Light | Dark |
|---|---|---|---|
| `border-width-default` | `var(--bw-border-width-default)` · `cssVars.border.width.default` | 1 | 1 |
| `color-border-default` | `var(--bw-color-border-default)` · `cssVars.color.border.default` | #DBDBDB | #404040 |
| `color-border-strong` | `var(--bw-color-border-strong)` · `cssVars.color.border.strong` | #BDBDBD | #545454 |
| `color-border-subtle` | `var(--bw-color-border-subtle)` · `cssVars.color.border.subtle` | #EDEDED | #292929 |
| `color-surface-default` | `var(--bw-color-surface-default)` · `cssVars.color.surface.default` | #FFFFFF | #141414 |
| `color-text-subtlest` | `var(--bw-color-text-subtlest)` · `cssVars.color.text.subtlest` | #545454 | #BDBDBD |
| `spacing-md` | `var(--bw-spacing-md)` · `cssVars.spacing.md` | 8 | 8 |
| `spacing-none` | `var(--bw-spacing-none)` · `cssVars.spacing.none` | 0 | 0 |
| `spacing-xl` | `var(--bw-spacing-xl)` · `cssVars.spacing.xl` | 16 | 16 |

## 5. States and transitions

None. The divider has one state and never animates; colour follows the theme instantly. Showing or hiding the label is instant. Reduced motion: nothing to remove.

## 6. RTL

```
LTR  │        ──────────────────────│   inset start: space at the inline start (left)
RTL  │──────────────────────        │   inset start: space at the inline start (right)

LTR  │─────────────── or ───────────────│   label centred
RTL  │─────────────── أو ───────────────│   label centred — same layout
```

| Part | In RTL |
|---|---|
| `container` inset | Logical margins (`margin-inline-start`, `margin-inline`) — mirrors automatically |
| `line` (vertical) | `border-inline-end` — the side flips with the direction; a single line looks the same either way |
| `label` | Centred; its gap is `padding-inline` (logical), so it is the same in both directions; the text follows the document direction and language (`:lang(ar)` font) |
| Icons | None |

## 7. Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role / semantics | Horizontal: `<hr>` (implicit `separator`). Vertical: `<hr aria-orientation="vertical">` (set explicitly if MUI does not). With a label: `<div role="separator">` (horizontal, no `aria-orientation` needed) |
| Accessible name | Without a label: none (a separator needs no name). With a label: `aria-label` = the `label` text, because a separator's children are presentational; the visible label text is inside the separator |
| Decorative | `decorative` → `aria-hidden="true"` on the root; no `aria-orientation`, no `aria-label` |
| Inside a list (`component="li"`) | `<li role="separator" aria-hidden="true">` — always hidden, whatever `decorative` says: the list items already show the grouping, and axe's `list` rule rejects a visible `role="separator"` child of `<ul>` / `<ol>` (checked with axe-core 4.14: passes only when hidden). Never nests an `<hr>` inside the `<li>` |
| Focus | Never focusable; no `tabindex` |
| Contrast | Line decorative — exempt (A9). Label text 4.5:1 (B3) |
| Target size | Not interactive |

| Key | Action |
|---|---|
| — | No keyboard interaction; Tab skips the divider |

## 8. Examples

```tsx
import { Divider } from '@biowave/web';

// Between list sections
<Divider />

// Lines up with list text after the leading icon
<Divider inset="start" emphasis="subtle" decorative />

// "or" between two sign-in options
<Divider showLabel label={t('or')} />            // en: "or" · ar: "أو"

// Directly inside a list
<ul>
  <li>Profile</li>
  <Divider component="li" />
  <li>Sign out</li>
</ul>

// Toolbar groups (row is a flex container)
<Stack direction="row" gap={cssVars.spacing.md}>
  <IconButton icon={<Icon name="undo" directional />} label="Undo" />
  <Divider orientation="vertical" inset="both" />
  <IconButton icon={<Icon name="delete" />} label="حذف" />
</Stack>
```

## 9. How to build it

### Goal

`import { Divider } from '@biowave/web'` renders a token-styled separator with the B1 options — including an optional centred label on horizontal dividers and an `li` root for lists — with logical insets that mirror in Arabic, correct separator semantics, and tests that pass at the default timeouts.

### Scope

**In scope:** B1–B9; `divider.tokens.ts` (TS map of the B3 semantic tokens per `emphasis`, plus the label text style, colour, gap and minimum segment length); export from `src/index.ts`.

**Out of scope:** icons on the divider; a label on vertical dividers; label alignments other than centre; extra thicknesses; a list-text-aligned inset (the List plan decides, Day 8); any change to other components or the shared test tooling.

### Approach

- Base: `styled(MuiDivider)` with `shouldForwardProp` that drops the Biowave props. Map: `orientation` → MUI `orientation`; vertical → MUI `flexItem` always; MUI `variant` stays `fullWidth` (Biowave `inset` replaces `inset`/`middle`, because MUI's inset value is a fixed physical-looking left margin, not a token).
- Styles from `divider.tokens.ts` (`cssVars.color.border.{subtle|default|strong}`, `cssVars.border.width.default`, `cssVars.spacing.xl`, `cssVars.spacing.md`, `cssVars.spacing.none`, `cssVars.color.text.subtlest`, `biowaveVariants.captionMd`): reset MUI's border (`border-width: 0`, `border-style: solid`), then horizontal `border-block-end-width`, vertical `border-inline-end-width`; `border-color` per `emphasis`; `margin: 0` plus the B2 logical inset margins.
- Gotcha: MUI's own styles use `borderBottomWidth` / `borderRightWidth`; the reset must override them so only the logical border remains (stylis RTL would otherwise flip a physical right border — harmless visually but against rule 4).
- **Label:** only when `orientation="horizontal"`, `showLabel` and a non-empty `label`. Pass the text as MUI `children` (MUI then renders the line as `::before` / `::after` and wraps the text in `.MuiDivider-wrapper`). Gotchas: MUI's `withChildren` styles use `border-top` and physical `padding-left` / `padding-right` (`calc(8px * 1.2)`) and fixed `width` on the pseudo elements — override them: pseudo elements `flex: 1 0 spacing-xl`, `width: auto`, `border-width: 0`, `border-block-end-width: border-width-default`, `border-style: solid`, `border-color` per `emphasis`; wrapper `padding-inline: spacing-md`, `padding-block: 0`, `caption-md` typography, `color-text-subtlest`, `text-align: center`, `flex: 0 1 auto`, `white-space: normal`; root `display: flex`, `align-items: center`, no own border (`border-width: 0` on the root when labelled). Do not use MUI `textAlign`.
- **Root element (B1):** pass MUI `component` = `'li'` when `component="li"`; otherwise `'div'` when labelled, `'hr'` when not. MUI sets `role="separator"` for non-`hr` roots — keep it.
- Semantics per B6: `decorative` → `aria-hidden="true"`; vertical non-decorative → `aria-orientation="vertical"` on the `<hr>`; labelled non-decorative → `aria-label={label}`; `component="li"` → always `aria-hidden="true"` and no `aria-label` / `aria-orientation`.
- Invalid combinations per B1 with the shared `warnOnce` helper used by Button.
- **Test tooling:** render only through `renderWithBiowave` from `src/test/render.tsx` (fresh speedy Emotion cache per test, reset in `setup.ts` after `cleanup()`). Do not create an Emotion cache or `BiowaveProvider` in the test file; no per-test timeout arguments; do not change `vitest.config.ts`. Every test passes at the default 5 s timeout.

### Token gaps

None — `color-border-subtle`, `color-border-default`, `color-border-strong`, `border-width-default`, `spacing-xl`, `spacing-md`, `spacing-none`, `color-text-subtlest` and the `caption-md` text style exist.

### Files to create / change

```
3-web-components/src/components/divider/Divider.tsx          new
3-web-components/src/components/divider/divider.tokens.ts    new (B3 map, semantic tokens only)
3-web-components/src/components/divider/Divider.test.tsx     new
3-web-components/src/components/divider/index.ts             new
3-web-components/src/index.ts                                change: export Divider and its types
3-web-components/README.md                                   change: Code status
3-web-components/components/divider/divider.md               change: C8 only
CHANGELOG.md                                                 change
```

## 10. Tests

- [ ] Renders horizontal and vertical × `subtle` · `default` · `strong` × `none` · `start` · `both` (valid combinations) in light + dark × en + ar
- [ ] Line colour per `emphasis` and thickness `border-width-default` come from the B3 tokens (read from the rendered CSS rules / `cssVars`), not literals
- [ ] Inset: `start` → `margin-inline-start` = `spacing-xl`; `both` → `margin-inline` (horizontal) / `margin-block` (vertical) = `spacing-xl`; `none` → no margin
- [ ] RTL: in `en` and `ar` the Divider's own styled rules (`divider.tokens.ts` values) use only logical properties (`margin-inline-start`, `margin-inline`, `margin-block`, `padding-inline`, `border-block-end-width`, `border-inline-end-width`) — no physical `left` / `right` margin, padding or border in them or in the source; the computed inline-start margin is `spacing-xl` with `inset="start"` in both directions
- [ ] Vertical divider stretches to the height of a flex row (`align-self: stretch`)
- [ ] Label: `showLabel` + `label="or"` (en) / `"أو"` (ar) renders the text centred between two line segments; label text style `caption-md`, colour `color-text-subtlest`, `padding-inline` `spacing-md`, segment colour per `emphasis` and minimum length `spacing-xl` — all from `divider.tokens.ts`, light + dark; with `inset` the margins apply to the outer ends
- [ ] Label off: `showLabel={false}` with a `label` renders the plain `<hr>` and no text
- [ ] Semantics: horizontal `<hr>` with role `separator`; vertical has `aria-orientation="vertical"`; labelled divider is `<div role="separator" aria-label="or">` with the visible text inside; `decorative` sets `aria-hidden="true"` (and no `aria-label`); never focusable
- [ ] `component="li"`: renders `<li role="separator" aria-hidden="true">` (with and without a label, and with `decorative={false}`), no `<hr>` inside; a `<ul>` with `<li>` items and `component="li"` dividers is valid markup
- [ ] `orientation="vertical"` + `inset="start"` warns once and renders `inset="none"`; `orientation="vertical"` + `showLabel` warns once and renders no label; `showLabel` with an empty or missing `label` warns once and renders the plain line
- [ ] axe: no violations in both themes and languages — decorative and not, with and without a label, and a `<ul>` containing `component="li"` dividers
- [ ] Source contains no raw hex, px, ms or font names; no primitives

Implement every item in B9, plus:
- [ ] All renders go through `renderWithBiowave` (`theme` × `locale` options); no Emotion cache or provider in `Divider.test.tsx`; no timeout arguments; `npm run test:web` passes 3 full runs at the default timeout
- [ ] Token assertions are table-driven from `divider.tokens.ts` (one source; the test does not repeat values), including the label rows
- [ ] The label is tested with the Arabic sample “أو” under `locale: 'ar'` (`dir="rtl"`): centred, same `padding-inline` on both sides, no physical padding in the computed or source rules

## 11. Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 exactly (names, types, defaults, root element table, warnings + fallbacks); no extra MUI props exposed; `component` only `hr` · `li`
- [ ] AC-2 Every value in B2–B3 comes from the listed semantic token or text style; no raw values, no primitives
- [ ] AC-3 Logical properties only (including the label gap); RTL behaves as B5
- [ ] AC-4 Semantics per B6 (separator, vertical orientation, label as name, decorative hidden, `li` always hidden, never focusable); axe clean, including a list with `li` dividers
- [ ] AC-5 Tests in B9 and C6 exist and pass through `renderWithBiowave` at default timeouts; `npm run typecheck`, `npm run test:web`, `npm run docs:check`, `npm run sync` pass
- [ ] AC-6 Exported from `src/index.ts`; README row and header Code `Built`; C8 and `CHANGELOG.md` filled

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

1. Fill [C8 Execution log](divider.md#c8-execution-log-filled-by-the-executor) in `divider.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `divider.md` and in the Components table of `3-web-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).

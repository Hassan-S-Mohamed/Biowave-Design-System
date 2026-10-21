<!-- GENERATED from divider.md @ 9e2af78f2e259c7b — do not edit; change the source and run: npm run contract -- web divider -->
# Divider · فاصل — Web — code contract

> **Everything you need to build Divider on Web, and nothing else.** Read this file only. Generated from [`divider.md`](divider.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](divider.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Divider · فاصل |
| Platform | Web · React + MUI |
| Built on | MUI `Divider` (`<hr>`), styled only from Biowave tokens |
| Import | `import { Divider } from '@biowave/web'` |
| Version | 1.0 · 2026-10-22 |
| Source code | `src/components/divider/` — not built yet (the Executor creates it) |
| Tokens | — |
| Source | [`divider.md`](divider.md) @ `9e2af78f2e259c7b` |

## 1. What it is

A divider is a thin line that separates groups of content inside a surface — list items, sections of a card or settings page, or actions in a toolbar. It makes the structure quicker to scan without adding a new surface. It never carries meaning of its own: headings, grouping and spacing still say what belongs together, and the divider only makes the boundary easier to see.

**Part names** (use exactly these in code, class names and tests):

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `container` | Yes | Takes the full length the parent gives it (inline size when horizontal, block size when vertical) and holds the inset space at its ends |
| 2 | `line` | Yes | The visible rule, one border width thick, coloured by `emphasis` |

**Options** (names and values are the props in §2):

- 4.1 `orientation`
- 4.2 `emphasis`
- 4.3 `inset`
- 4.4 `decorative`

## 2. API

### `Divider`

| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `orientation` | enum | `horizontal` · `vertical` | `horizontal` | | A4.1 |
| `emphasis` | enum | `subtle` · `default` · `strong` | `default` | | A4.2 — line colour (B3) |
| `inset` | enum | `none` · `start` · `both` | `none` | | A4.3 — inset space `spacing-xl` (B2) |
| `decorative` | boolean | | `false` | | A4.4 — `true`: hidden from assistive technology (B6) |
| `className` · `data-*` · `ref` | | | | | Forwarded to the root `<hr>` |

No `children`, no `component`, no MUI `variant` / `textAlign` / `flexItem` / `light` / `absolute` props on the public API (C3 maps the Biowave props to MUI).

**Invalid combinations** (`console.warn` once in development; the fallback renders):

| Combination | Fallback |
|---|---|
| `orientation="vertical"` with `inset="start"` | Renders `inset="none"`; warns “inset start is for horizontal dividers only” |

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
```

| Part | Property | `horizontal` | `vertical` |
|---|---|---|---|
| `line` | thickness | `border-width-default` (block-end border) | `border-width-default` (inline-end border) |
| `container` | length | inline size of the parent (`inline-size: auto`, block element) | block size of the row (`align-self: stretch`, `block-size: auto`) |
| `container` | inset `start` | `margin-inline-start: spacing-xl` | — (invalid, B1) |
| `container` | inset `both` | `margin-inline: spacing-xl` | `margin-block: spacing-xl` |
| `container` | inset `none` | margin `spacing-none` | margin `spacing-none` |
| `container` | outer margin | `spacing-none` — the parent's gap or padding sets the space around it | same |

Layout rules: `flex-shrink: 0`; never adds its own spacing above / below (horizontal) or beside (vertical) — the parent's `gap` does. A vertical divider is meant for flex rows (toolbars, action bars); outside a flex row its height is the row's height only if the parent gives one.

## 4. Tokens by part and state

> No component tokens (P-04): every value below is a semantic token, used directly. `{name}.tokens.json` is not needed.

| Part | Property | `emphasis="subtle"` | `emphasis="default"` | `emphasis="strong"` |
|---|---|---|---|---|
| `line` | colour | `color-border-subtle` | `color-border-default` | `color-border-strong` |
| `line` | width | `border-width-default` | `border-width-default` | `border-width-default` |
| `container` | inset | `spacing-xl` · `spacing-none` | same | same |

No interactive states. Dark theme: same tokens (values switch automatically). The line is decorative (`2-foundations/guidelines/border.md`) — no contrast requirement, no pair in `contrast-pairs.json`.

### 4.1 How to use each token on Web

Values are for checking only — never paste a value.

| Token | CSS / TS | Light | Dark |
|---|---|---|---|
| `border-width-default` | `var(--bw-border-width-default)` · `cssVars.border.width.default` | 1 | 1 |
| `color-border-default` | `var(--bw-color-border-default)` · `cssVars.color.border.default` | #DBDBDB | #404040 |
| `color-border-strong` | `var(--bw-color-border-strong)` · `cssVars.color.border.strong` | #BDBDBD | #545454 |
| `color-border-subtle` | `var(--bw-color-border-subtle)` · `cssVars.color.border.subtle` | #EDEDED | #292929 |
| `spacing-none` | `var(--bw-spacing-none)` · `cssVars.spacing.none` | 0 | 0 |
| `spacing-xl` | `var(--bw-spacing-xl)` · `cssVars.spacing.xl` | 16 | 16 |

## 5. States and transitions

None. The divider has one state and never animates; colour follows the theme instantly. Reduced motion: nothing to remove.

## 6. RTL

```
LTR  │        ──────────────────────│   inset start: space at the inline start (left)
RTL  │──────────────────────        │   inset start: space at the inline start (right)
```

| Part | In RTL |
|---|---|
| `container` inset | Logical margins (`margin-inline-start`, `margin-inline`) — mirrors automatically |
| `line` (vertical) | `border-inline-end` — the side flips with the direction; a single line looks the same either way |
| Icons | None |

## 7. Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role / semantics | Horizontal: `<hr>` (implicit `separator`). Vertical: `<hr aria-orientation="vertical">` (set explicitly if MUI does not) |
| Decorative | `decorative` → `aria-hidden="true"` on the `<hr>`; no `aria-orientation` |
| Accessible name | None (a separator needs no name) |
| Focus | Never focusable; no `tabindex` |
| Contrast | Decorative — exempt (A9) |
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

// Toolbar groups (row is a flex container)
<Stack direction="row" gap={cssVars.spacing.md}>
  <IconButton icon={<Icon name="undo" directional />} label="Undo" />
  <Divider orientation="vertical" inset="both" />
  <IconButton icon={<Icon name="delete" />} label="حذف" />
</Stack>
```

## 9. How to build it

### Goal

`import { Divider } from '@biowave/web'` renders a token-styled separator with the B1 options, logical insets that mirror in Arabic, correct separator semantics, and tests that pass at the default timeouts.

### Scope

**In scope:** B1–B9; `divider.tokens.ts` (TS map of the B3 semantic tokens per `emphasis`); export from `src/index.ts`.

**Out of scope:** text or icons on the divider; extra thicknesses; a `component` prop (e.g. `li` inside List — the List plan decides, Day 8); any change to other components or the shared test tooling.

### Approach

- Base: `styled(MuiDivider)` with `shouldForwardProp` that drops the Biowave props. Map: `orientation` → MUI `orientation`; vertical → MUI `flexItem` always; MUI `variant` stays `fullWidth` (Biowave `inset` replaces `inset`/`middle`, because MUI's inset value is a fixed physical-looking left margin, not a token).
- Styles from `divider.tokens.ts` (`cssVars.color.border.{subtle|default|strong}`, `cssVars.border.width.default`, `cssVars.spacing.xl`, `cssVars.spacing.none`): reset MUI's border (`border-width: 0`, `border-style: solid`), then horizontal `border-block-end-width`, vertical `border-inline-end-width`; `border-color` per `emphasis`; `margin: 0` plus the B2 logical inset margins.
- Gotcha: MUI's own styles use `borderBottomWidth` / `borderRightWidth`; the reset must override them so only the logical border remains (stylis RTL would otherwise flip a physical right border — harmless visually but against rule 4).
- Semantics per B6: `decorative` → `aria-hidden="true"`; vertical non-decorative → `aria-orientation="vertical"` on the `<hr>`.
- Invalid combination per B1 with the shared `warnOnce` helper used by Button.
- **Test tooling:** render only through `renderWithBiowave` from `src/test/render.tsx` (fresh speedy Emotion cache per test, reset in `setup.ts` after `cleanup()`). Do not create an Emotion cache or `BiowaveProvider` in the test file; no per-test timeout arguments; do not change `vitest.config.ts`. Every test passes at the default 5 s timeout.

### Token gaps

None — `color-border-subtle`, `color-border-default`, `color-border-strong`, `border-width-default`, `spacing-xl` and `spacing-none` exist.

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
- [ ] RTL: in `en` and `ar` the Divider's own styled rules (`divider.tokens.ts` values) use only logical properties (`margin-inline-start`, `margin-inline`, `margin-block`, `border-block-end-width`, `border-inline-end-width`) — no physical `left` / `right` margin or border in them or in the source; the computed inline-start margin is `spacing-xl` with `inset="start"` in both directions
- [ ] Vertical divider stretches to the height of a flex row (`align-self: stretch`)
- [ ] Semantics: horizontal `<hr>` with role `separator`; vertical has `aria-orientation="vertical"`; `decorative` sets `aria-hidden="true"`; never focusable
- [ ] `orientation="vertical"` + `inset="start"` warns once and renders `inset="none"`
- [ ] axe: no violations in both themes and languages, decorative and not
- [ ] Source contains no raw hex, px, ms or font names; no primitives

Implement every item in B9, plus:
- [ ] All renders go through `renderWithBiowave` (`theme` × `locale` options); no Emotion cache or provider in `Divider.test.tsx`; no timeout arguments; `npm run test:web` passes 3 full runs at the default timeout
- [ ] Token assertions are table-driven from `divider.tokens.ts` (one source; the test does not repeat values)

## 11. Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 exactly (names, types, defaults, warning + fallback); no extra MUI props exposed
- [ ] AC-2 Every value in B2–B3 comes from the listed semantic token; no raw values, no primitives
- [ ] AC-3 Logical properties only; RTL behaves as B5
- [ ] AC-4 Semantics per B6 (separator, vertical orientation, decorative hidden, never focusable); axe clean
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

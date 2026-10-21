<!-- GENERATED from badge.md @ 5abba2d3f474c3fd — do not edit; change the source and run: npm run contract -- web badge -->
# Badge · شارة — Web — code contract

> **Everything you need to build Badge on Web, and nothing else.** Read this file only. Generated from [`badge.md`](badge.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](badge.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Badge · شارة |
| Platform | Web · React + MUI |
| Built on | MUI `Badge` (`badgeContent`, `max`, `showZero`, `invisible`, `overlap`), restyled from tokens; the Check badge content is the Biowave `Icon` `check` |
| Import | `import { Badge } from '@biowave/web'` |
| Version | 1.0 · 2026-10-21 |
| Source code | `src/components/badge/` — not built yet (the Executor creates it) |
| Tokens | — |
| Source | [`badge.md`](badge.md) @ `5abba2d3f474c3fd` |

## 1. What it is

A badge is a small indicator pinned to the corner of another element — an icon button, a navigation item, an avatar — or placed inline after text. It tells people, at a glance, that something there needs their attention or is already true. It comes in three variants: **count** (how many new items), **dot** (something new, no number) and **check** (the Check badge, decision P-05: the thing is verified, completed or selected). A badge is never interactive; the element it marks is.

**Part names** (use exactly these in code, class names and tests):

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `anchor` | No | The element the badge marks (Icon button, navigation item, avatar, icon). Consumer content; without it the badge is standalone and sits inline |
| 2 | `indicator` | Yes | The badge shape: a pill (count), a small circle (dot) or a circle (check), filled with the `color` |
| 3 | `count` | Count only | The number, Western digits in both languages (D-10); above `max` it shows `max` followed by `+` |
| 4 | `check-icon` | Check only | The Material Symbols Rounded `check` glyph, drawn by Icon; never mirrored |
| 5 | `ring` | When anchored | A thin outline in the surface colour that separates the `indicator` from the `anchor` |

**Options** (names and values are the props in §2):

- 4.1 `variant`
- 4.2 `color`
- 4.3 `max`
- 4.4 `showZero`
- 4.5 `overlap`
- 4.6 `invisible`
- 4.7 `label`

## 2. API

### `Badge`

| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `variant` | enum | `count` · `dot` · `check` | `count` | | A4.1 |
| `count` | number | integer ≥ 0 | — | ✓ for `count` | A2 `count`; ignored by `dot` and `check` |
| `max` | number | integer ≥ 1 | `99` | | A4.3 — above it the badge shows `{max}+` |
| `showZero` | boolean | | `false` | | A4.4 |
| `color` | enum | `error` · `brand` · `secondary` · `success` · `warning` · `info` · `neutral` | `error` (`success` for `check`) | | A4.2 |
| `overlap` | enum | `rectangular` · `circular` | `rectangular` | | A4.5 — only with `children` |
| `invisible` | boolean | | `false` | | A4.6 — hides with the exit transition (B4) |
| `label` | string | | — | ✓ when visible | A4.7 — the accessible meaning (B6) |
| `children` | slot | one React element | — | | The `anchor`. Absent → standalone inline badge (no `ring`) |
| `className` · `data-*` · `ref` | | | | | Forwarded to the root `span` |

Platform naming notes: MUI `badgeContent` = `count`; MUI `variant="standard"` = `count`, `"dot"` = `dot`; `check` is Biowave-only (P-05). Flutter `isVisible` = `!invisible`, `semanticLabel` = `label`, `child` = `children`.

**Invalid combinations** (`console.warn` once in development; the badge still renders as described):

| Combination | Fallback |
|---|---|
| `variant="count"` without `count` | Hidden (same as `count={0}`) |
| `count` < 0 or not an integer | Treated as `Math.max(0, Math.floor(count))` |
| `max` < 1 | Treated as `1` |
| `count` set with `dot` or `check` | `count` ignored |
| `check` with `error` or `warning` | Renders `success` |
| `dot` with `warning` | Renders `error` |
| Visible badge without `label` | Renders; warns “badges need a label” |
| `overlap` set without `children` | Ignored |

## 3. Dimensions

```
 count                                    dot              check
    spacing-xs         spacing-xs
     ├─┤               ├─┤
   ┬ ╭──────────────────╮                 ┬ ●              ┬ ╭─────╮
   │ │       99+        │  radius-full    ┴ spacing-md     │ │ [✓] │ radius-full
   ┴ ╰──────────────────╯                                  ┴ ╰─────╯
 size-icon-md   min-inline-size size-icon-md               size-icon-md
                text style data-sm                         └ check-icon size-icon-sm
 ring (anchored only): outside the indicator, border-width-strong

 Placement (anchored, rectangular, LTR)
 ┌────────────────────╳     ╳ = indicator centre = anchor top-end corner
 │ anchor             │
 └────────────────────┘
```

| Part | Property | `count` | `dot` | `check` |
|---|---|---|---|---|
| `indicator` | block-size | `size-icon-md` | `spacing-md` | `size-icon-md` |
| `indicator` | min-inline-size | `size-icon-md` | `spacing-md` (fixed) | `size-icon-md` (fixed) |
| `indicator` | padding-inline | `spacing-xs` | — | — |
| `indicator` | radius | `radius-full` | `radius-full` | `radius-full` |
| `count` | text style | `data-sm` (`.bw-text-data-sm`), `font-variant-numeric: tabular-nums` | — | — |
| `check-icon` | size | — | — | `size-icon-sm` (Icon `size` unset; the indicator sets `font-size`) |
| `ring` | width (anchored only) | `border-width-strong` | `border-width-strong` | `border-width-strong` |

Layout rules:
- Root `span`: `position: relative; display: inline-flex; vertical-align: middle; flex: none`. It hugs the anchor; the badge never changes the anchor's box.
- Anchored `indicator`: `position: absolute`, `pointer-events: none`, `z-index` = `layer-raised` (above the anchor, inside the root's stacking context only). Placement with logical properties: `inset-block-start: 0; inset-inline-end: 0`, translated so its centre sits on the corner (B5). `overlap="circular"`: the reference corner moves inward to the circle's edge at 45° — `inset-block-start` and `inset-inline-end` = 14.6% of the anchor box ((1 − cos 45°) ÷ 2, the same as MUI `overlap="circular"`).
- Standalone `indicator` (no `children`): `position: static`, inline after text, no `ring`, no translation; it aligns to the text's middle.
- `count`: one line, `white-space: nowrap`, centred; the text is wrapped in `<bdi dir="ltr">` so `99+` never reorders in Arabic.
- `ring`: drawn outside the indicator box as `box-shadow: 0 0 0 var(--bw-border-width-strong) var(--bw-color-border-inverse)` — it adds no layout size.
- `check-icon`: `<Icon name="check" />` centred; never `directional`.

## 4. Tokens by part and state

No component tokens — every value is an existing semantic token (P-04); `badge.tokens.json` is not needed. A badge has one visual state per `color`; there is no hover, pressed, focus or disabled state.

| `color` | `indicator` background | `count` text | `check-icon` |
|---|---|---|---|
| `error` | `color-background-error-default` | `color-text-on-error` | — (not allowed) |
| `brand` | `color-background-brand-default` | `color-text-on-brand` | `color-icon-on-brand` |
| `secondary` | `color-background-secondary-default` | `color-text-on-secondary` | `color-icon-on-secondary` |
| `success` | `color-background-success-default` | `color-text-on-success` | `color-icon-on-success` |
| `warning` | `color-background-warning-default` | `color-text-on-warning` | — (not allowed) |
| `info` | `color-background-info-default` | `color-text-on-info` | `color-icon-on-info` |
| `neutral` | `color-surface-inverse` | `color-text-neutral-inverse` | `color-icon-neutral-inverse` |

| Part | Property | Token |
|---|---|---|
| `ring` | colour | `color-border-inverse` |
| `ring` | width | `border-width-strong` |

Dark theme: same tokens (values switch automatically). No exceptions.

### 4.1 How to use each token on Web

Values are for checking only — never paste a value.

| Token | CSS / TS | Light | Dark |
|---|---|---|---|
| `border-width-strong` | `var(--bw-border-width-strong)` · `cssVars.border.width.strong` | 2 | 2 |
| `color-background-brand-default` | `var(--bw-color-background-brand-default)` · `cssVars.color.background.brand.default` | #193351 | #607D9F |
| `color-background-error-default` | `var(--bw-color-background-error-default)` · `cssVars.color.background.error.default` | #D42222 | #FF7676 |
| `color-background-info-default` | `var(--bw-color-background-info-default)` · `cssVars.color.background.info.default` | #2559D4 | #6D9CE8 |
| `color-background-secondary-default` | `var(--bw-color-background-secondary-default)` · `cssVars.color.background.secondary.default` | #0C5F79 | #5DA8C2 |
| `color-background-success-default` | `var(--bw-color-background-success-default)` · `cssVars.color.background.success.default` | #1E6D41 | #55BE87 |
| `color-background-warning-default` | `var(--bw-color-background-warning-default)` · `cssVars.color.background.warning.default` | #FF9435 | #FFB05E |
| `color-border-inverse` | `var(--bw-color-border-inverse)` · `cssVars.color.border.inverse` | #FFFFFF | #0A0A0A |
| `color-icon-neutral-inverse` | `var(--bw-color-icon-neutral-inverse)` · `cssVars.color.icon.neutral.inverse` | #FFFFFF | #0A0A0A |
| `color-icon-on-brand` | `var(--bw-color-icon-on-brand)` · `cssVars.color.icon.on.brand` | #FFFFFF | #0A0A0A |
| `color-icon-on-info` | `var(--bw-color-icon-on-info)` · `cssVars.color.icon.on.info` | #FFFFFF | #0A0A0A |
| `color-icon-on-secondary` | `var(--bw-color-icon-on-secondary)` · `cssVars.color.icon.on.secondary` | #FFFFFF | #0A0A0A |
| `color-icon-on-success` | `var(--bw-color-icon-on-success)` · `cssVars.color.icon.on.success` | #FFFFFF | #0A0A0A |
| `color-surface-default` | `var(--bw-color-surface-default)` · `cssVars.color.surface.default` | #FFFFFF | #141414 |
| `color-surface-inverse` | `var(--bw-color-surface-inverse)` · `cssVars.color.surface.inverse` | #141414 | #FFFFFF |
| `color-text-neutral-inverse` | `var(--bw-color-text-neutral-inverse)` · `cssVars.color.text.neutral.inverse` | #FFFFFF | #0A0A0A |
| `color-text-on-brand` | `var(--bw-color-text-on-brand)` · `cssVars.color.text.on.brand` | #FFFFFF | #0A0A0A |
| `color-text-on-error` | `var(--bw-color-text-on-error)` · `cssVars.color.text.on.error` | #FFFFFF | #0A0A0A |
| `color-text-on-info` | `var(--bw-color-text-on-info)` · `cssVars.color.text.on.info` | #FFFFFF | #0A0A0A |
| `color-text-on-secondary` | `var(--bw-color-text-on-secondary)` · `cssVars.color.text.on.secondary` | #FFFFFF | #0A0A0A |
| `color-text-on-success` | `var(--bw-color-text-on-success)` · `cssVars.color.text.on.success` | #FFFFFF | #0A0A0A |
| `color-text-on-warning` | `var(--bw-color-text-on-warning)` · `cssVars.color.text.on.warning` | #0A0A0A | #0A0A0A |
| `layer-raised` | `var(--bw-layer-raised)` · `cssVars.layer.raised` | 1 | 1 |
| `motion-duration-instant` | `var(--bw-motion-duration-instant)` · `cssVars.motion.duration.instant` | 0 | 0 |
| `motion-duration-md` | `var(--bw-motion-duration-md)` · `cssVars.motion.duration.md` | 200 | 200 |
| `motion-duration-sm` | `var(--bw-motion-duration-sm)` · `cssVars.motion.duration.sm` | 100 | 100 |
| `motion-easing-standard-accelerate` | `var(--bw-motion-easing-standard-accelerate)` · `cssVars.motion.easing.standard-accelerate` | [0.3,0,1,1] | [0.3,0,1,1] |
| `motion-easing-standard-decelerate` | `var(--bw-motion-easing-standard-decelerate)` · `cssVars.motion.easing.standard-decelerate` | [0,0,0,1] | [0,0,0,1] |
| `radius-full` | `var(--bw-radius-full)` · `cssVars.radius.full` | 9999 | 9999 |
| `size-icon-md` | `var(--bw-size-icon-md)` · `cssVars.size.icon.md` | 20 | 20 |
| `size-icon-sm` | `var(--bw-size-icon-sm)` · `cssVars.size.icon.sm` | 16 | 16 |
| `spacing-md` | `var(--bw-spacing-md)` · `cssVars.spacing.md` | 8 | 8 |
| `spacing-xs` | `var(--bw-spacing-xs)` · `cssVars.spacing.xs` | 4 | 4 |
| `target-min` | `var(--bw-target-min)` · `cssVars.target.min` |  |  |

## 5. States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Hidden → Visible | `invisible` → `false`, or `count` becomes > 0 (or 0 with `showZero`) | `indicator` scale 0 → 1, from its centre | `motion-duration-md` | `motion-easing-standard-decelerate` |
| Visible → Hidden | `invisible` → `true`, or `count` becomes 0 without `showZero` | `indicator` scale 1 → 0, to its centre | `motion-duration-sm` | `motion-easing-standard-accelerate` |
| Count changes | new `count` | none — digits and pill width change at once | `motion-duration-instant` | — |
| `color` / `variant` changes | prop change | none | `motion-duration-instant` | — |
| Initial render | mount while visible | none — no entrance animation on first paint | — | — |

Reduced motion: every transition is instant (built into `tokens.css`).

## 6. RTL

```
LTR   ┌──────────┐(3)        RTL  (3)┌──────────┐
      │  [✉]     │                   │     [✉]  │
      └──────────┘                   └──────────┘
LTR   Inbox (12)              RTL        (12) الوارد
LTR   ╭──────╮(✓)             RTL  (✓)╭──────╮      ← check never mirrored
```

| Part | In RTL |
|---|---|
| `indicator` placement | Top-end corner = top-left: `inset-inline-end` resolves to the left; the centring translation is `translate(50%, -50%)` in LTR and `translate(-50%, -50%)` in RTL (`[dir='rtl'] &`) |
| `count` | Not mirrored; `<bdi dir="ltr">` keeps `99+` in order; Western digits (D-10) |
| `check-icon` | Never mirrored (checkmarks are not directional, `icons.md` › RTL) |
| Standalone | Follows the text flow: after the label at the inline end |

## 7. Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Indicator | `aria-hidden="true"` on the `indicator` span always — the number, dot or glyph is never read alone |
| Anchored with `label` | Badge renders `<span id={useId()} style={visuallyHidden}>{label}</span>` (`src/internal/visuallyHidden.ts`) and clones the single child adding `aria-describedby` (appended to any ids the child already has). Screen reader: “Notifications, button, 3 unread messages” |
| Hidden badge | No description: the hidden span and the child's added `aria-describedby` id are removed while `invisible` or the count hides it |
| Standalone with `label` | Root `span` gets `role="img"` and `aria-label={label}` |
| Contrast | `count` text on `indicator` ≥ 4.5:1 and `indicator` vs `color-surface-default` ≥ 3:1 for every allowed `color` × `variant` (B1 rules remove `warning` from `dot` and `check`) |
| Focus | Never focusable; no `tabIndex`. The anchor's focus ring ([a11y](../../../2-foundations/guidelines/a11y.md)) stays visible — the indicator covers at most its corner |
| Target size | Not a target: `pointer-events: none`; the anchor's target (`target-min`) is unchanged |
| Live updates | No `aria-live` |

| Key | Action |
|---|---|
| — | None. Keyboard interaction belongs to the anchor |

## 8. Examples

```tsx
import { Badge, IconButton, Icon } from '@biowave/web';

// Count on an Icon button
<Badge count={3} label="3 unread messages">
  <IconButton icon={<Icon name="mail" />} label="Messages" />
</Badge>

// Arabic (direction comes from the provider — the badge moves to the top-left)
<Badge count={120} label="أكثر من 99 رسالة">
  <IconButton icon={<Icon name="mail" />} label="الرسائل" />
</Badge>

// Dot
<Badge variant="dot" label="New activity"><Icon name="schedule" size="md" /></Badge>

// Check badge on a circular anchor (Avatar, Day 4)
<Badge variant="check" overlap="circular" label="Verified">{avatar}</Badge>

// Standalone count after a label
<span>Requests <Badge count={12} color="neutral" label="12 pending requests" /></span>
```

## 9. How to build it

### Goal

`import { Badge } from '@biowave/web'` marks any element (or sits inline) with a count, dot or Check badge in the seven B3 colours, placed on the top-end corner in both directions, animated in and out with the motion tokens, and announced through the anchor's description — built on MUI `Badge`, tokens only.

### Scope

**In scope:** B1–B9 — all props, the three variants (incl. the Check badge, P-05), both `overlap` values, standalone mode, the `aria-describedby` wiring, the dev warnings.

**Out of scope** (do not build)
- Badges inside other components (Tabs, navigation, Avatar) — those components place `Badge` in their own plans
- Live-region announcements of count changes
- Sizes other than the one in B2; custom content (text words, other icons) in the indicator
- Changes to Icon, Icon button or any other component

### Approach

- Base: `@mui/material/Badge` wrapped by `styled(MuiBadge)` in `Badge.tsx`. Map props: `count` → `badgeContent` (only for `variant="count"`), `variant` `count`/`check` → MUI `standard`, `dot` → MUI `dot`; `max`, `showZero`, `invisible` passed through (MUI computes `99+` and the zero-hidden state — wrap the rendered content in `<bdi dir="ltr">` via `badgeContent`). For `check`, `badgeContent` = `<Icon name="check" />` (no `size`; the indicator sets `font-size` to `size-icon-sm`).
- Styles from `cssVars` only (`cssVars.size.icon.md`, `cssVars.spacing.xs`, `cssVars.spacing.md`, `cssVars.radius.full`, `cssVars.border.width.strong`, `cssVars.color.*`, `cssVars.motion.*`, `cssVars.layer.raised`), applied to the MUI `badge` slot. One `switch` from `color` to the three B3 tokens; `neutral` uses `color.surface.inverse` / `color.text.neutral.inverse` / `color.icon.neutral.inverse`.
- Placement: override MUI's `anchorOrigin` styles completely — set `top`/`right`/`transform` to `unset` and use `inset-block-start` / `inset-inline-end` plus `transform: translate(50%, -50%)`, and `[dir='rtl'] &` → `translate(-50%, -50%)` (B5). Visibility combines with the translation: hidden = `translate(…) scale(0)`, visible = `translate(…) scale(1)`, `transform-origin: center`.
- Transitions: replace MUI's `theme.transitions` on the `badge` slot with `transform` timed by B4 — `motion-duration-md` + `motion-easing-standard-decelerate` when becoming visible, `motion-duration-sm` + `motion-easing-standard-accelerate` when hiding (set the transition on the `.MuiBadge-invisible` state for the exit). No transition on first paint.
- Standalone (no `children`): add class `bw-badge-standalone`; the `badge` slot becomes `position: static`, no transform, no ring.
- a11y per B6: `useId()` for the description; `React.cloneElement(children, { 'aria-describedby': [existing, id].filter(Boolean).join(' ') })` only when visible and `label` is set; `visuallyHidden` from `src/internal/visuallyHidden.ts`.
- Dev warnings: one `warnOnce` per combination in B1 (`process.env.NODE_ENV !== 'production'`).
- Gotchas: stylis-plugin-rtl flips physical `right` → `left` in MUI's own styles; because the override uses logical properties and an explicit `[dir='rtl']` translation, make sure the flipped MUI `left` is also `unset` (test the RTL geometry). MUI's `dot` variant has its own `min-width`/`height`/`padding` — override all three from B2.

### Token gaps

None. Every value in B2–B3 is an existing semantic token; no component tokens are needed (P-04, D-13).

### Files to create / change

```
3-web-components/src/components/badge/Badge.tsx         new: Badge, BadgeProps, BadgeVariant, BadgeColor
3-web-components/src/components/badge/Badge.test.tsx    new
3-web-components/src/components/badge/index.ts          new
3-web-components/src/index.ts                           change: export Badge + types
3-web-components/README.md                              change: Badge row Code status
CHANGELOG.md                                            change
```

## 10. Tests

- [ ] Every `variant` × allowed `color` renders the B2 sizes and B3 tokens in light + dark × en + ar (computed styles: `block-size`, `min-inline-size`, `padding-inline`, background, text and icon colour)
- [ ] `count` above `max` shows `{max}+` inside `<bdi dir="ltr">`; `count={0}` hides unless `showZero`; `max` default 99
- [ ] Anchored: `ring` box-shadow uses `border-width-strong` + `color-border-inverse`; standalone: no ring, `position: static`
- [ ] Placement: indicator centre on the anchor's top-end corner in LTR and top-start in RTL (both `overlap` values); the anchor's box size is the same with and without the badge
- [ ] B4: hidden ↔ visible transitions use the listed duration/easing tokens; first render has no animation; reduced motion → instant
- [ ] a11y: indicator `aria-hidden`; anchored label wired by `aria-describedby` (existing ids kept); hidden badge removes it; standalone `role="img"` + name; axe has no violations in light + dark × en + ar
- [ ] `pointer-events: none` on the indicator: a click on the badge reaches the anchor's handler
- [ ] Every invalid combination in B1 warns once and renders the fallback
- [ ] `check-icon` is the Biowave `Icon` with `name="check"`, not mirrored in RTL
- [ ] No raw values (no hex, px, ms or font names in `Badge.tsx`) — same guard as the other components

Implement every item in B9, plus:
- [ ] Type test: `variant="check"` with `color="error"` still compiles (runtime fallback, B1) but an unknown `color` does not (`// @ts-expect-error`)
- [ ] The Icon guard (`src/test/noLegacyIcons.test.ts`) still passes — the check glyph comes from `Icon`

## 11. Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 exactly (names, types, defaults, fallbacks, warnings)
- [ ] AC-2 Every value in B2–B3 comes from the listed token; no raw values, no primitives
- [ ] AC-3 B4 transitions implemented (enter/exit timings differ, no first-paint animation); reduced motion respected
- [ ] AC-4 RTL behaves as B5 (top-start placement, `99+` not reordered, check not mirrored); a11y as B6 (axe clean)
- [ ] AC-5 Tests in B9 and C6 exist and pass; `npm run typecheck`, `npm run test:web`, `npm run docs:check` pass
- [ ] AC-6 Exported from `src/index.ts`; section README status updated
- [ ] AC-7 The anchor is untouched except for the appended `aria-describedby`: same box size, same click target, same focus ring

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

1. Fill [C8 Execution log](badge.md#c8-execution-log-filled-by-the-executor) in `badge.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `badge.md` and in the Components table of `3-web-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).

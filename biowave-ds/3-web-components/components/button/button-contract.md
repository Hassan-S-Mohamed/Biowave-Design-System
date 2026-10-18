<!-- GENERATED from button.md @ 6d60ddc310d2e4a2 — do not edit; change the source and run: npm run contract -- web button -->
# Button · زر — Web — code contract

> **Everything you need to build Button on Web, and nothing else.** Read this file only. Generated from [`button.md`](button.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](button.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Button · زر |
| Platform | Web · React + MUI |
| Built on | MUI `Button` (native `<button>` / `<a>`), styled entirely from Biowave tokens. MUI palette colors, elevation and ripple are not used |
| Import | `import { Button } from '@biowave/web'` |
| Version | 1.1 · 2026-10-18 |
| Source code | [`src/components/button/`](../../src/components/button/) |
| Tokens | [`button.tokens.json`](button.tokens.json) |
| Source | [`button.md`](button.md) @ `6d60ddc310d2e4a2` |

## 1. What it is

A button starts an action the user chose: save a form, approve a request, clock in, add a device. Its label says what will happen. Emphasis (`variant`) and `color` tell the user how important the action is and what it does. One screen area has **one** most-important action.

**Part names** (use exactly these in code, class names and tests):

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `container` | Yes | Hit area and fill. Its emphasis and color carry the hierarchy |
| 2 | `leading-icon` | No | Supports the label (e.g. add, download). Never replaces it |
| 3 | `label` | Yes | Says the action, verb first. Single line |
| 4 | `trailing-icon` | No | Shows where the action goes (arrow, external link) |
| 5 | `spinner` | Loading only | Shows that the action is running. Replaces the content in place |
| 6 | `focus-ring` | Focus only | Shows keyboard focus |

**Options** (names and values are the props in §2):

- 4.1 `variant` — emphasis
- 4.2 `color`
- 4.3 `size`
- 4.4 Icons — `leading-icon` · `trailing-icon`
- 4.5 `full-width`

## 2. API

### Button
| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `variant` | enum | `filled` · `tonal` · `outlined` · `text` | `filled` | | Emphasis — A4.1 |
| `color` | enum | `brand` · `secondary` · `neutral` · `error` · `inverse` | `brand` | | A4.2 |
| `size` | enum | `sm` · `md` · `lg` | `md` | | A4.3 (`xl` is touch only) |
| `startIcon` | `ReactNode` | an icon from `@mui/icons-material` | — | | `leading-icon` — A4.4 |
| `endIcon` | `ReactNode` | an icon | — | | `trailing-icon` |
| `fullWidth` | boolean | | `false` | | A4.5 |
| `loading` | boolean | | `false` | | Shows `spinner`, blocks activation, keeps focus |
| `loadingLabel` | string | | `"Loading"` (EN) / `"جارٍ التحميل"` (AR) from the provider locale | | Announced to screen readers while loading, e.g. "Saving…" |
| `disabled` | boolean | | `false` | | Native disabled; not focusable |
| `type` | enum | `button` · `submit` · `reset` | `button` | | Native button type |
| `href` | string | | — | | Renders an `<a>` with button styling. Use only for actions that navigate (e.g. "Download report") |
| `onClick` | `(e) => void` | | — | | Not called while `loading` or `disabled` |
| `children` | string | | — | ✓ | `label`. Plain text only |
| `ref`, `className`, `aria-*`, `data-*` | | | | | Forwarded to the root element |

Not supported: MUI `variant="contained"`, `color="success|warning|info|primary"`, `disableElevation`, `disableRipple`, `sx` overrides of colors. Platform naming: web `startIcon` = Flutter `leadingIcon`; `onClick` = `onPressed`.

**Invalid combinations** (`console.warn` in development, then the fallback renders):
| Combination | Fallback |
|---|---|
| `variant="tonal"` with `color="neutral"` or `"inverse"` | `variant="outlined"` |
| `startIcon` and `endIcon` both set | `startIcon` only |
| `children` empty or not a string | renders, warns "Button needs a text label — use IconButton" |

## 3. Dimensions

```
   spacing-control-padding-inline-md            spacing-control-padding-inline-md
     ├────────┤ spacing-control-gap-md                       ├────────┤
   ┬ ┌────────────────────────────────────────────────────────────┐
   │ │        [◆]  ├─┤  Save changes                             │  radius-md
   │ └────────────────────────────────────────────────────────────┘  border-width-default (outlined)
   ┴ size-control-height-md
             └ size-icon-md       └ text style action-md
```

| Part | Property | sm | md | lg |
|---|---|---|---|---|
| `container` | height | `size-control-height-sm` | `size-control-height-md` | `size-control-height-lg` |
| `container` | padding-inline | `spacing-control-padding-inline-sm` | `spacing-control-padding-inline-md` | `spacing-control-padding-inline-lg` |
| `container` | gap | `spacing-control-gap-sm` | `spacing-control-gap-md` | `spacing-control-gap-lg` |
| `container` | radius | `radius-md` | `radius-md` | `radius-md` |
| `container` | border width (outlined only) | `border-width-default` | `border-width-default` | `border-width-default` |
| `leading-icon`, `trailing-icon` | size | `size-icon-sm` | `size-icon-md` | `size-icon-lg` |
| `spinner` | size | `size-icon-sm` | `size-icon-md` | `size-icon-lg` |
| `label` | text style | `action-sm` (`.bw-text-action-sm`) | `action-md` | `action-lg` |
| `focus-ring` | width · offset | `border-width-focus` · `border-focus-offset` | same | same |

Layout rules:
- `display: inline-flex`, content centered on both axes. Width hugs content; `fullWidth` → 100% of the parent.
- Height is fixed by the size token. The outlined border is drawn **inside** the height (no layout shift between variants). Padding does not change when an icon is present.
- `label`: one line, `white-space: nowrap`; when the parent forces a narrower width, `text-overflow: ellipsis` and the full label stays the accessible name.
- Loading: content keeps its box and its accessible name (`opacity: 0`, never `visibility`/`display`), `spinner` is centered on top, so the width never changes.
- Elevation: none (`elevation-0`) in every state.

## 4. Tokens by part and state

> Machine-readable source: [`button.tokens.json`](button.tokens.json) (component tokens, D-13). It holds exactly these mappings; `npm run component-tokens` fails if they drift. In Figma these become the `Button / …` collections in the Web Components file.

Token names are written without the `color-` prefix where the column header says "color". Disabled is the same for every color of a variant.

### 3.1 `filled`
| `color` | `container` background · Default / Hover / Pressed | `label` · `spinner` | `leading/trailing-icon` |
|---|---|---|---|
| `brand` | `color-background-brand-default` / `color-background-brand-hover` / `color-background-brand-pressed` | `color-text-on-brand` | `color-icon-on-brand` |
| `secondary` | `color-background-secondary-default` / `color-background-secondary-hover` / `color-background-secondary-pressed` | `color-text-on-secondary` | `color-icon-on-secondary` |
| `error` | `color-background-error-default` / `color-background-error-hover` / `color-background-error-pressed` | `color-text-on-error` | `color-icon-on-error` |
| `neutral` | `color-background-neutral-default` / `color-background-neutral-hover` / `color-background-neutral-pressed` | `color-text-neutral-default` | `color-icon-neutral-default` |
| `inverse` | `color-background-inverse-default` / `color-background-inverse-hover` / `color-background-inverse-pressed` | `color-text-role-brand` | `color-icon-role-brand` |
| Disabled (all) | `color-background-neutral-disabled` | `color-text-neutral-disabled` | `color-icon-neutral-disabled` |

### 3.2 `tonal`
| `color` | `container` background | State layer · Hover / Pressed | `label` · `spinner` | icons |
|---|---|---|---|---|
| `brand` | `color-background-brand-subtle` | `color-overlay-hover` / `color-overlay-pressed` | `color-text-role-brand` | `color-icon-role-brand` |
| `secondary` | `color-background-secondary-subtle` | same | `color-text-role-secondary` | `color-icon-role-secondary` |
| `error` | `color-background-error-subtle` | same | `color-text-role-error` | `color-icon-role-error` |
| Disabled (all) | `color-background-neutral-disabled` | — | `color-text-neutral-disabled` | `color-icon-neutral-disabled` |

### 3.3 `outlined`
| `color` | `container` background | `container` border | State layer · Hover / Pressed | `label` · `spinner` | icons |
|---|---|---|---|---|---|
| `brand` | `color-background-transparent` | `color-border-brand` | `color-overlay-hover` / `color-overlay-pressed` | `color-text-role-brand` | `color-icon-role-brand` |
| `secondary` | same | `color-border-secondary` | same | `color-text-role-secondary` | `color-icon-role-secondary` |
| `error` | same | `color-border-error` | same | `color-text-role-error` | `color-icon-role-error` |
| `neutral` | same | `color-border-strong` | same | `color-text-neutral-default` | `color-icon-neutral-default` |
| `inverse` | same | `color-border-inverse` | same | `color-text-on-brand` | `color-icon-on-brand` |
| Disabled (all) | same | `color-border-disabled` | — | `color-text-neutral-disabled` | `color-icon-neutral-disabled` |

### 3.4 `text`
Same as `outlined` without the border.

### 3.5 Focus
| Part | Property | Token |
|---|---|---|
| `focus-ring` | color | `color-border-focus` (`inverse`: `color-border-inverse`) |
| `focus-ring` | width · offset | `border-width-focus` · `border-focus-offset` |

The **state layer** is a second fill painted above the container fill (web: `background-image: linear-gradient(var(--bw-color-overlay-hover), var(--bw-color-overlay-hover))`). Filled buttons never use a state layer; they switch to the solid `-hover`/`-pressed` tokens.

Dark theme: same tokens, values switch automatically. No exceptions.

### 4.1 How to use each token on Web

Values are for checking only — never paste a value.

| Token | CSS / TS | Light | Dark |
|---|---|---|---|
| `border-focus-offset` | `var(--bw-border-focus-offset)` · `cssVars.border.focus.offset` | 2 | 2 |
| `border-width-default` | `var(--bw-border-width-default)` · `cssVars.border.width.default` | 1 | 1 |
| `border-width-focus` | `var(--bw-border-width-focus)` · `cssVars.border.width.focus` | 2 | 2 |
| `color-background-brand-default` | `var(--bw-color-background-brand-default)` · `cssVars.color.background.brand.default` | #193351 | #607D9F |
| `color-background-brand-hover` | `var(--bw-color-background-brand-hover)` · `cssVars.color.background.brand.hover` | #132843 | #90A3BC |
| `color-background-brand-pressed` | `var(--bw-color-background-brand-pressed)` · `cssVars.color.background.brand.pressed` | #0D1E33 | #BEC9D9 |
| `color-background-brand-subtle` | `var(--bw-color-background-brand-subtle)` · `cssVars.color.background.brand.subtle` | #E8ECF2 | #071323 |
| `color-background-error-default` | `var(--bw-color-background-error-default)` · `cssVars.color.background.error.default` | #D42222 | #FF7676 |
| `color-background-error-hover` | `var(--bw-color-background-error-hover)` · `cssVars.color.background.error.hover` | #A31A1A | #FEA3A3 |
| `color-background-error-pressed` | `var(--bw-color-background-error-pressed)` · `cssVars.color.background.error.pressed` | #721212 | #FECFCF |
| `color-background-error-subtle` | `var(--bw-color-background-error-subtle)` · `cssVars.color.background.error.subtle` | #FEF0EE | #721212 |
| `color-background-inverse-default` | `var(--bw-color-background-inverse-default)` · `cssVars.color.background.inverse.default` | #FFFFFF | #0A0A0A |
| `color-background-inverse-hover` | `var(--bw-color-background-inverse-hover)` · `cssVars.color.background.inverse.hover` | #EDEDED | #141414 |
| `color-background-inverse-pressed` | `var(--bw-color-background-inverse-pressed)` · `cssVars.color.background.inverse.pressed` | #DBDBDB | #292929 |
| `color-background-neutral-default` | `var(--bw-color-background-neutral-default)` · `cssVars.color.background.neutral.default` | #EDEDED | #292929 |
| `color-background-neutral-disabled` | `var(--bw-color-background-neutral-disabled)` · `cssVars.color.background.neutral.disabled` | #EDEDED | #292929 |
| `color-background-neutral-hover` | `var(--bw-color-background-neutral-hover)` · `cssVars.color.background.neutral.hover` | #DBDBDB | #404040 |
| `color-background-neutral-pressed` | `var(--bw-color-background-neutral-pressed)` · `cssVars.color.background.neutral.pressed` | #BDBDBD | #545454 |
| `color-background-secondary-default` | `var(--bw-color-background-secondary-default)` · `cssVars.color.background.secondary.default` | #0C5F79 | #5DA8C2 |
| `color-background-secondary-hover` | `var(--bw-color-background-secondary-hover)` · `cssVars.color.background.secondary.hover` | #094E65 | #90C3D5 |
| `color-background-secondary-pressed` | `var(--bw-color-background-secondary-pressed)` · `cssVars.color.background.secondary.pressed` | #063C4E | #C0DDE8 |
| `color-background-secondary-subtle` | `var(--bw-color-background-secondary-subtle)` · `cssVars.color.background.secondary.subtle` | #E8F4F8 | #032A37 |
| `color-background-transparent` | `var(--bw-color-background-transparent)` · `cssVars.color.background.transparent` | #54545400 | #54545400 |
| `color-border-brand` | `var(--bw-color-border-brand)` · `cssVars.color.border.brand` | #607D9F | #254471 |
| `color-border-disabled` | `var(--bw-color-border-disabled)` · `cssVars.color.border.disabled` | #DBDBDB | #404040 |
| `color-border-error` | `var(--bw-color-border-error)` · `cssVars.color.border.error` | #FF7676 | #FF3B3B |
| `color-border-focus` | `var(--bw-color-border-focus)` · `cssVars.color.border.focus` | #254471 | #90A3BC |
| `color-border-inverse` | `var(--bw-color-border-inverse)` · `cssVars.color.border.inverse` | #FFFFFF | #0A0A0A |
| `color-border-secondary` | `var(--bw-color-border-secondary)` · `cssVars.color.border.secondary` | #5DA8C2 | #1A7596 |
| `color-border-strong` | `var(--bw-color-border-strong)` · `cssVars.color.border.strong` | #BDBDBD | #545454 |
| `color-icon-neutral-default` | `var(--bw-color-icon-neutral-default)` · `cssVars.color.icon.neutral.default` | #0A0A0A | #F7F7F7 |
| `color-icon-neutral-disabled` | `var(--bw-color-icon-neutral-disabled)` · `cssVars.color.icon.neutral.disabled` | #969696 | #545454 |
| `color-icon-on-brand` | `var(--bw-color-icon-on-brand)` · `cssVars.color.icon.on.brand` | #FFFFFF | #0A0A0A |
| `color-icon-on-error` | `var(--bw-color-icon-on-error)` · `cssVars.color.icon.on.error` | #FFFFFF | #0A0A0A |
| `color-icon-on-secondary` | `var(--bw-color-icon-on-secondary)` · `cssVars.color.icon.on.secondary` | #FFFFFF | #0A0A0A |
| `color-icon-role-brand` | `var(--bw-color-icon-role-brand)` · `cssVars.color.icon.role.brand` | #193351 | #90A3BC |
| `color-icon-role-error` | `var(--bw-color-icon-role-error)` · `cssVars.color.icon.role.error` | #FF2B2B | #FEA3A3 |
| `color-icon-role-secondary` | `var(--bw-color-icon-role-secondary)` · `cssVars.color.icon.role.secondary` | #0C5F79 | #90C3D5 |
| `color-overlay-hover` | `var(--bw-color-overlay-hover)` · `cssVars.color.overlay.hover` | #5454541A | #54545466 |
| `color-overlay-pressed` | `var(--bw-color-overlay-pressed)` · `cssVars.color.overlay.pressed` | #54545433 | #54545499 |
| `color-text-neutral-default` | `var(--bw-color-text-neutral-default)` · `cssVars.color.text.neutral.default` | #0A0A0A | #F7F7F7 |
| `color-text-neutral-disabled` | `var(--bw-color-text-neutral-disabled)` · `cssVars.color.text.neutral.disabled` | #969696 | #545454 |
| `color-text-on-brand` | `var(--bw-color-text-on-brand)` · `cssVars.color.text.on.brand` | #FFFFFF | #0A0A0A |
| `color-text-on-error` | `var(--bw-color-text-on-error)` · `cssVars.color.text.on.error` | #FFFFFF | #0A0A0A |
| `color-text-on-secondary` | `var(--bw-color-text-on-secondary)` · `cssVars.color.text.on.secondary` | #FFFFFF | #0A0A0A |
| `color-text-role-brand` | `var(--bw-color-text-role-brand)` · `cssVars.color.text.role.brand` | #132843 | #90A3BC |
| `color-text-role-error` | `var(--bw-color-text-role-error)` · `cssVars.color.text.role.error` | #D42222 | #FEA3A3 |
| `color-text-role-secondary` | `var(--bw-color-text-role-secondary)` · `cssVars.color.text.role.secondary` | #094E65 | #90C3D5 |
| `elevation-0` | `var(--bw-elevation-0)` · `cssVars.elevation.0` | 0px 0px 0px 0px rgb(7 19 35 / 0%) | 0px 0px 0px 0px rgb(0 0 0 / 0%) |
| `motion-duration-instant` | `var(--bw-motion-duration-instant)` · `cssVars.motion.duration.instant` | 0 | 0 |
| `motion-duration-progress` | `var(--bw-motion-duration-progress)` · `cssVars.motion.duration.progress` | 1000 | 1000 |
| `motion-duration-sm` | `var(--bw-motion-duration-sm)` · `cssVars.motion.duration.sm` | 100 | 100 |
| `motion-duration-xs` | `var(--bw-motion-duration-xs)` · `cssVars.motion.duration.xs` | 50 | 50 |
| `motion-easing-linear` | `var(--bw-motion-easing-linear)` · `cssVars.motion.easing.linear` | [0,0,1,1] | [0,0,1,1] |
| `motion-easing-standard` | `var(--bw-motion-easing-standard)` · `cssVars.motion.easing.standard` | [0.2,0,0,1] | [0.2,0,0,1] |
| `radius-md` | `var(--bw-radius-md)` · `cssVars.radius.md` | 8 | 8 |
| `size-control-height-lg` | `var(--bw-size-control-height-lg)` · `cssVars.size.control.height.lg` | 48 | 48 |
| `size-control-height-md` | `var(--bw-size-control-height-md)` · `cssVars.size.control.height.md` | 40 | 40 |
| `size-control-height-sm` | `var(--bw-size-control-height-sm)` · `cssVars.size.control.height.sm` | 32 | 32 |
| `size-icon-lg` | `var(--bw-size-icon-lg)` · `cssVars.size.icon.lg` | 24 | 24 |
| `size-icon-md` | `var(--bw-size-icon-md)` · `cssVars.size.icon.md` | 20 | 20 |
| `size-icon-sm` | `var(--bw-size-icon-sm)` · `cssVars.size.icon.sm` | 16 | 16 |
| `spacing-control-gap-lg` | `var(--bw-spacing-control-gap-lg)` · `cssVars.spacing.control.gap.lg` | 8 | 8 |
| `spacing-control-gap-md` | `var(--bw-spacing-control-gap-md)` · `cssVars.spacing.control.gap.md` | 6 | 6 |
| `spacing-control-gap-sm` | `var(--bw-spacing-control-gap-sm)` · `cssVars.spacing.control.gap.sm` | 4 | 4 |
| `spacing-control-padding-inline-lg` | `var(--bw-spacing-control-padding-inline-lg)` · `cssVars.spacing.control.padding-inline.lg` | 16 | 16 |
| `spacing-control-padding-inline-md` | `var(--bw-spacing-control-padding-inline-md)` · `cssVars.spacing.control.padding-inline.md` | 12 | 12 |
| `spacing-control-padding-inline-sm` | `var(--bw-spacing-control-padding-inline-sm)` · `cssVars.spacing.control.padding-inline.sm` | 8 | 8 |
| `target-min` | `var(--bw-target-min)` · `cssVars.target.min` |  |  |

### 4.2 Component tokens

The code token map must equal [`button.tokens.json`](button.tokens.json) (tests compare them).

| Collection | Variable | Modes → semantic token |
|---|---|---|
| Button / Size | height | sm: `size-control-height-sm` · md: `size-control-height-md` · lg: `size-control-height-lg` |
| Button / Size | padding-inline | sm: `spacing-control-padding-inline-sm` · md: `spacing-control-padding-inline-md` · lg: `spacing-control-padding-inline-lg` |
| Button / Size | gap | sm: `spacing-control-gap-sm` · md: `spacing-control-gap-md` · lg: `spacing-control-gap-lg` |
| Button / Size | icon | sm: `size-icon-sm` · md: `size-icon-md` · lg: `size-icon-lg` |
| Button / Size | radius | sm: `radius-md` · md: `radius-md` · lg: `radius-md` |
| Button / Size | border-width | sm: `border-width-default` · md: `border-width-default` · lg: `border-width-default` |
| Button / Filled | container/default | brand: `color-background-brand-default` · secondary: `color-background-secondary-default` · error: `color-background-error-default` · neutral: `color-background-neutral-default` · inverse: `color-background-inverse-default` |
| Button / Filled | container/hover | brand: `color-background-brand-hover` · secondary: `color-background-secondary-hover` · error: `color-background-error-hover` · neutral: `color-background-neutral-hover` · inverse: `color-background-inverse-hover` |
| Button / Filled | container/pressed | brand: `color-background-brand-pressed` · secondary: `color-background-secondary-pressed` · error: `color-background-error-pressed` · neutral: `color-background-neutral-pressed` · inverse: `color-background-inverse-pressed` |
| Button / Filled | container/disabled | brand: `color-background-neutral-disabled` · secondary: `color-background-neutral-disabled` · error: `color-background-neutral-disabled` · neutral: `color-background-neutral-disabled` · inverse: `color-background-neutral-disabled` |
| Button / Filled | label/default | brand: `color-text-on-brand` · secondary: `color-text-on-secondary` · error: `color-text-on-error` · neutral: `color-text-neutral-default` · inverse: `color-text-role-brand` |
| Button / Filled | label/disabled | brand: `color-text-neutral-disabled` · secondary: `color-text-neutral-disabled` · error: `color-text-neutral-disabled` · neutral: `color-text-neutral-disabled` · inverse: `color-text-neutral-disabled` |
| Button / Filled | icon/default | brand: `color-icon-on-brand` · secondary: `color-icon-on-secondary` · error: `color-icon-on-error` · neutral: `color-icon-neutral-default` · inverse: `color-icon-role-brand` |
| Button / Filled | icon/disabled | brand: `color-icon-neutral-disabled` · secondary: `color-icon-neutral-disabled` · error: `color-icon-neutral-disabled` · neutral: `color-icon-neutral-disabled` · inverse: `color-icon-neutral-disabled` |
| Button / Tonal | container/default | brand: `color-background-brand-subtle` · secondary: `color-background-secondary-subtle` · error: `color-background-error-subtle` |
| Button / Tonal | container/disabled | brand: `color-background-neutral-disabled` · secondary: `color-background-neutral-disabled` · error: `color-background-neutral-disabled` |
| Button / Tonal | state-layer/hover | brand: `color-overlay-hover` · secondary: `color-overlay-hover` · error: `color-overlay-hover` |
| Button / Tonal | state-layer/pressed | brand: `color-overlay-pressed` · secondary: `color-overlay-pressed` · error: `color-overlay-pressed` |
| Button / Tonal | label/default | brand: `color-text-role-brand` · secondary: `color-text-role-secondary` · error: `color-text-role-error` |
| Button / Tonal | label/disabled | brand: `color-text-neutral-disabled` · secondary: `color-text-neutral-disabled` · error: `color-text-neutral-disabled` |
| Button / Tonal | icon/default | brand: `color-icon-role-brand` · secondary: `color-icon-role-secondary` · error: `color-icon-role-error` |
| Button / Tonal | icon/disabled | brand: `color-icon-neutral-disabled` · secondary: `color-icon-neutral-disabled` · error: `color-icon-neutral-disabled` |
| Button / Outlined | container/default | brand: `color-background-transparent` · secondary: `color-background-transparent` · error: `color-background-transparent` · neutral: `color-background-transparent` · inverse: `color-background-transparent` |
| Button / Outlined | container/disabled | brand: `color-background-transparent` · secondary: `color-background-transparent` · error: `color-background-transparent` · neutral: `color-background-transparent` · inverse: `color-background-transparent` |
| Button / Outlined | border/default | brand: `color-border-brand` · secondary: `color-border-secondary` · error: `color-border-error` · neutral: `color-border-strong` · inverse: `color-border-inverse` |
| Button / Outlined | border/disabled | brand: `color-border-disabled` · secondary: `color-border-disabled` · error: `color-border-disabled` · neutral: `color-border-disabled` · inverse: `color-border-disabled` |
| Button / Outlined | state-layer/hover | brand: `color-overlay-hover` · secondary: `color-overlay-hover` · error: `color-overlay-hover` · neutral: `color-overlay-hover` · inverse: `color-overlay-hover` |
| Button / Outlined | state-layer/pressed | brand: `color-overlay-pressed` · secondary: `color-overlay-pressed` · error: `color-overlay-pressed` · neutral: `color-overlay-pressed` · inverse: `color-overlay-pressed` |
| Button / Outlined | label/default | brand: `color-text-role-brand` · secondary: `color-text-role-secondary` · error: `color-text-role-error` · neutral: `color-text-neutral-default` · inverse: `color-text-on-brand` |
| Button / Outlined | label/disabled | brand: `color-text-neutral-disabled` · secondary: `color-text-neutral-disabled` · error: `color-text-neutral-disabled` · neutral: `color-text-neutral-disabled` · inverse: `color-text-neutral-disabled` |
| Button / Outlined | icon/default | brand: `color-icon-role-brand` · secondary: `color-icon-role-secondary` · error: `color-icon-role-error` · neutral: `color-icon-neutral-default` · inverse: `color-icon-on-brand` |
| Button / Outlined | icon/disabled | brand: `color-icon-neutral-disabled` · secondary: `color-icon-neutral-disabled` · error: `color-icon-neutral-disabled` · neutral: `color-icon-neutral-disabled` · inverse: `color-icon-neutral-disabled` |
| Button / Text | container/default | brand: `color-background-transparent` · secondary: `color-background-transparent` · error: `color-background-transparent` · neutral: `color-background-transparent` · inverse: `color-background-transparent` |
| Button / Text | container/disabled | brand: `color-background-transparent` · secondary: `color-background-transparent` · error: `color-background-transparent` · neutral: `color-background-transparent` · inverse: `color-background-transparent` |
| Button / Text | state-layer/hover | brand: `color-overlay-hover` · secondary: `color-overlay-hover` · error: `color-overlay-hover` · neutral: `color-overlay-hover` · inverse: `color-overlay-hover` |
| Button / Text | state-layer/pressed | brand: `color-overlay-pressed` · secondary: `color-overlay-pressed` · error: `color-overlay-pressed` · neutral: `color-overlay-pressed` · inverse: `color-overlay-pressed` |
| Button / Text | label/default | brand: `color-text-role-brand` · secondary: `color-text-role-secondary` · error: `color-text-role-error` · neutral: `color-text-neutral-default` · inverse: `color-text-on-brand` |
| Button / Text | label/disabled | brand: `color-text-neutral-disabled` · secondary: `color-text-neutral-disabled` · error: `color-text-neutral-disabled` · neutral: `color-text-neutral-disabled` · inverse: `color-text-neutral-disabled` |
| Button / Text | icon/default | brand: `color-icon-role-brand` · secondary: `color-icon-role-secondary` · error: `color-icon-role-error` · neutral: `color-icon-neutral-default` · inverse: `color-icon-on-brand` |
| Button / Text | icon/disabled | brand: `color-icon-neutral-disabled` · secondary: `color-icon-neutral-disabled` · error: `color-icon-neutral-disabled` · neutral: `color-icon-neutral-disabled` · inverse: `color-icon-neutral-disabled` |
| Button / Focus | color | default: `color-border-focus` · inverse: `color-border-inverse` |

## 5. States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Default → Hover | pointer enter | background, state layer, border color | `motion-duration-sm` | `motion-easing-standard` |
| Hover → Pressed | pointer down · Enter/Space down | background, state layer | `motion-duration-xs` | `motion-easing-standard` |
| Pressed → Hover/Default | release | background, state layer | `motion-duration-sm` | `motion-easing-standard` |
| Any → Focus | keyboard focus (`:focus-visible`) | focus ring appears | `motion-duration-instant` | — |
| Any → Loading | `loading=true` | content fades out, spinner fades in | `motion-duration-sm` | `motion-easing-linear` |
| Loading | while loading | spinner rotates continuously | one turn per `motion-duration-progress` | `motion-easing-linear` |
| Enabled ↔ Disabled | `disabled` changes | colors | `motion-duration-instant` | — |

Reduced motion: every transition is instant (built into `tokens.css`). The spinner keeps rotating (progress indicators are the allowed exception in [motion.md](../../../2-foundations/guidelines/motion.md)).

## 6. RTL

```
LTR  │  [◆]  Add device          │      │  Next  [▸]  │
RTL  │          إضافة جهاز  [◆]  │      │  [◂]  التالي │
```

| Part | In RTL |
|---|---|
| layout | Mirrors automatically (`startIcon` stays at the inline start). Logical properties only |
| `leading-icon` / `trailing-icon` — directional (arrow_forward, arrow_back, chevron, open_in_new, logout) | Mirrors (`transform: scaleX(-1)` under `[dir=rtl]`, applied **once, on the icon wrapper** `.bw-button__icon`). Mark an icon directional with the `bw-icon-directional` class on the icon element (main way, works with every icon) or `mirrorInRtl` on a custom icon element; the Button reads `mirrorInRtl`, removes it before rendering (it never reaches the DOM or a MUI icon), and puts the class on the wrapper only |
| Non-directional icons (add, download, delete, check, clock) | Does not mirror |
| `spinner` | Does not mirror |

## 7. Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role / semantics | Native `<button type="button">`; `<a href>` when `href` is set (role stays link — use only for navigation-like actions) |
| Accessible name | `children` text. Icons get `aria-hidden="true"` |
| Loading | `aria-busy="true"` + `aria-disabled="true"` (stays focusable, click ignored). A visually hidden `role="status"` region announces `loadingLabel` once |
| Disabled | Native `disabled` (removed from tab order). With `href`: `aria-disabled="true"`, `tabIndex=-1`, no navigation |
| Focus | `:focus-visible` outline: `border-width-focus` solid `color-border-focus`, `outline-offset: border-focus-offset`; follows the container radius |
| Target size | Every size ≥ `target-min` (24) — `sm` is the smallest at 32 |
| Contrast | All label/background pairs in B3 are in `contrast-pairs.json` (4.5:1); outlines and focus 3:1 |
| Screen reader output | "Save changes, button" · loading: "Save changes, button, busy" + "Saving…" |

| Key | Action |
|---|---|
| Tab / Shift+Tab | Moves focus to / away from the button |
| Enter | Activates (button and link) |
| Space | Activates (button only) |

## 8. Examples

```tsx
import { Button } from '@biowave/web';
import AddRounded from '@mui/icons-material/AddRounded';

// Dialog footer: one filled + one outlined
<Button variant="outlined" color="neutral">Cancel</Button>
<Button type="submit" loading={saving} loadingLabel="Saving…">Save changes</Button>

// Destructive
<Button color="error">Delete user</Button>

// With an icon, small, in a table toolbar
<Button size="sm" variant="tonal" startIcon={<AddRounded />}>Add device</Button>

// Arabic (direction and fonts come from BiowaveProvider locale="ar" — no extra props)
<Button>حفظ التغييرات</Button>

// On a navy surface
<Button color="inverse" variant="outlined">Learn more</Button>
```

## 9. How to build it

### Goal

`import { Button } from '@biowave/web'` renders every allowed `variant` × `color` × `size` from B1–B3 using only Biowave tokens, behaves as B4–B6 in light/dark and en/ar, and is covered by the tests in B9. This is also the **first web component**, so this plan sets up the test tooling every later component reuses.

### Scope

**In scope**
- [ ] C1 API (all props) · C2 Dimensions · C3 Tokens · C4 States · C5 RTL · C6 Accessibility · C9 Tests
- [ ] One-time setup: install dependencies and the web test tooling (C5 below)

**Out of scope (do not build)**
- Icon button, Split button, Button group (separate plans)
- A shared `Spinner`/`Progress` component (Day 5). Build a private spinner inside the button folder (C3)
- `xl` size (touch only)
- Storybook / docs site

### Approach

- **Base:** wrap MUI `Button` (`@mui/material/Button`) with `disableRipple`, `disableElevation`, `variant="text"` and `color="inherit"`, so MUI adds no colors, shadows or ripple of its own. All visual styling comes from one `styled()` wrapper that reads our props through a transient prop object (`$variant`, `$color`, `$size`) — never forwarded to the DOM.
- **Token map:** must equal [`button.tokens.json`](button.tokens.json) (add a test that loads `button.tokens.json` and compares every entry). `button.tokens.ts` exports a typed table `variant → color → { bg, bgHover, bgPressed, stateLayer, border, label, icon }` whose values are `cssVars.*` references (B3). The styled wrapper only reads this table. No values in the component file.
- **State layer** (tonal, outlined, text): `background-image: linear-gradient(<overlay>, <overlay>)` on `:hover` and `:active`, over the variant's `background-color`.
- **Focus:** remove MUI's focus visual; apply B6 outline on `&:focus-visible` (and `&.Mui-focusVisible`). `inverse` uses `cssVars.color.border.inverse`.
- **Typography:** `label` uses the `actionSm|actionMd|actionLg` variant from `biowaveVariants` (font size/line height come from CSS variables, so platform and Arabic switch automatically).
- **Loading:** do **not** use MUI's `loading` prop (it sets `disabled` and loses focus). Implement: wrap children + icons in `.bw-button__content` and hide it with **`opacity: 0` only** while loading (never `visibility` or `display` — the label must stay the accessible name, B2/B6; opacity also gives the B4 fade); render the private `ButtonSpinner` absolutely centered and fade it with `opacity` (+ `pointer-events: none`); set `aria-busy`, `aria-disabled`; swallow `onClick`. The `role="status"` live region that receives `loadingLabel` is a **sibling outside** the `<button>`/`<a>` (wrap both in a fragment), styled with the standard visually-hidden pattern (clip, 1px, overflow hidden) from a shared internal helper `src/internal/visuallyHidden.ts`, so it is announced but never part of the button's name.
- **ButtonSpinner** (private, `ButtonSpinner.tsx`): MUI `CircularProgress` with `size` = icon size token, `color="inherit"`, `disableShrink`. One turn per `cssVars.motion.duration.progress` (B4) — not `2xl`. Will be replaced by the Progress component on Day 5 (leave a `// TODO(progress)` comment).
- **RTL icons (B5):** the consumer marks a directional icon with `className="bw-icon-directional"` on the icon element (documented main way) or `mirrorInRtl` on a custom icon element. In `Button.tsx`: detect either marker on `startIcon`/`endIcon`, strip `mirrorInRtl` with `React.cloneElement(icon, { mirrorInRtl: undefined })`, strip the class from the icon, and put `bw-icon-directional` on the wrapper `.bw-button__icon` only. The rule is scoped to the wrapper — `[dir='rtl'] & .bw-button__icon.bw-icon-directional { transform: scaleX(-1) }` — so exactly one element is flipped. Export a small helper type so `mirrorInRtl` on a custom element is not a TS error. Document both ways in the component's JSDoc.
- **Disabled ↔ enabled (B4):** colours change instantly both ways — apply `transition: none` (or `transition-duration: var(--bw-motion-duration-instant)`) while disabled and on the frame the button is re-enabled; hover/press transitions are unchanged.
- **Invalid combinations:** a `warnOnce(key, message)` helper (`src/internal/warnOnce.ts`, dev only via `process.env.NODE_ENV !== 'production'`). Fallbacks exactly as B1.
- **Gotchas:** MUI `Button` uppercases text by default → `textTransform: 'none'`. MUI min-width (64) → `minWidth: 0`. MUI adds `padding` per size → override with tokens. With `href`, MUI renders `<a>`; disabled anchors need `aria-disabled` + `tabIndex=-1` + `preventDefault`.

### Token gaps

None. Added on 2026-10-16 before this plan (Foundations 1.1.0): `size-control-height-*`, `spacing-control-padding-inline-*`, `spacing-control-gap-*`, `color-background-inverse-*`, `color-border-inverse`, `color-overlay-hover`, `color-overlay-pressed`.

### Files to create / change

```
3-web-components/package.json                         change: add devDependencies (below) + "test": "vitest run"
3-web-components/vitest.config.ts                     new: jsdom, setupFiles
3-web-components/src/test/setup.ts                    new: @testing-library/jest-dom, vitest-axe matchers
3-web-components/src/test/render.tsx                  new: renderWithBiowave(ui, { theme: 'light'|'dark', locale: 'en'|'ar' }) using BiowaveProvider
3-web-components/src/internal/warnOnce.ts             new
3-web-components/src/components/button/Button.tsx     new
3-web-components/src/components/button/button.tokens.ts   new
3-web-components/src/components/button/ButtonSpinner.tsx  new (private, not exported from the package)
3-web-components/src/components/button/Button.test.tsx    new
3-web-components/src/components/button/index.ts       new: export { Button } and types ButtonProps, ButtonVariant, ButtonColor, ButtonSize
3-web-components/src/index.ts                         change: uncomment the Button export
3-web-components/README.md                            change: status table row
package.json (root)                                   change: "test:web": "npm test -w 3-web-components"
```

devDependencies to add to `3-web-components`: `@mui/material@^9.5`, `@mui/icons-material@^9.5`, `@emotion/react`, `@emotion/styled`, `react@^19`, `react-dom@^19`, `@types/react`, `@types/react-dom`, `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`, `vitest-axe`. Run `npm install` at the repo root first (no `node_modules` exist yet; `npm run typecheck` currently fails only because MUI is not installed).

## 10. Tests

- [ ] Renders every allowed `variant` × `color` × `size` in light + dark and en + ar (snapshot of computed CSS variables per part, B3)
- [ ] Every state in B4: hover, pressed (`:active`), focus-visible, disabled, loading
- [ ] Loading: `aria-busy`, `aria-disabled`, still focusable, `onClick` not called, width unchanged, status announced once
- [ ] Disabled: not focusable, `onClick` not called; `href` + disabled does not navigate
- [ ] Each invalid combination in B1 warns once and renders its fallback
- [ ] `startIcon` directional icon mirrors under `dir="rtl"`; non-directional does not
- [ ] axe: no violations for each variant in both themes; keyboard table in B6 (Enter, Space, Tab)
- [ ] No raw values: the component file contains no hex, px, ms or font names (lint test)

Implement every item in B9, plus:
- [ ] `renderWithBiowave` works for the 4 theme × locale combinations (used by all later components)
- [ ] A "no raw values" test: read `Button.tsx`, `button.tokens.ts` and `ButtonSpinner.tsx` as text and fail on `/#[0-9a-f]{3,8}\b|\d+px|\d+ms|\bInter\b|\bIBM Plex\b/i` (word boundaries — no stripping of other words)
- [ ] Loading keeps the name: with `loading`, `computeAccessibleName(button)` = the label (e.g. "Save changes"), and the `role="status"` element is **not** inside the button
- [ ] RTL mirrors once: in `ar`, for an icon marked with the class and one marked with `mirrorInRtl`, exactly one element in the icon path carries the flip rule, and `mirrorInRtl` never reaches the DOM (no React warning)
- [ ] Token assertions per variant × color: container, label, icon and border rules use the `cssVars` from B3 (assert the generated CSS rules, not jsdom layout); states and axe run for every allowed color, not only `brand`
- [ ] Spinner uses `motion-duration-progress`; under reduced motion its animation duration stays non-zero
- [ ] No layout claims in jsdom (e.g. "width unchanged while loading") — keep those as manual checks in C8

## 11. Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 exactly (names, types, defaults, fallbacks)
- [ ] AC-2 Every value in B2–B3 comes from the listed token via `cssVars`/theme; no raw values, no primitives
- [ ] AC-3 Every transition in B4; reduced motion respected
- [ ] AC-4 RTL as B5; a11y as B6 (loading keeps focus and is announced)
- [ ] AC-5 Tests in B9 + C6 above exist and pass; `npm run typecheck`, `npm run test:web`, `npm run sync` pass
- [ ] AC-6 Exported from `src/index.ts`; `3-web-components/README.md` status table updated to `Built`
- [ ] AC-7 MUI ripple, elevation, uppercase and min-width are all disabled
- [ ] AC-8 Test tooling (`vitest.config.ts`, `src/test/*`) is generic and documented in one line in `3-web-components/README.md` › Stack › Tests
- [ ] AC-9 Review round 1 findings fixed: #1 loading name, #2 single RTL flip, #3 `mirrorInRtl` stripped, #5 opacity fades, #6 tests, #7 instant disabled change, #8 visually-hidden helper (E2)
- [ ] AC-10 C8 gets a "Round 2" block; header `Code` set to `Built`; `3-web-components/README.md` table matches

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

1. Fill [C8 Execution log](button.md#c8-execution-log-filled-by-the-executor) in `button.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `button.md` and in the Components table of `3-web-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).

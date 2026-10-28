<!-- GENERATED from link.md @ 732ca6aee4d43bdc — do not edit; change the source and run: npm run contract -- web link -->
# Link · رابط — Web — code contract

> **Everything you need to build Link on Web, and nothing else.** Read this file only. Generated from [`link.md`](link.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](link.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Link · رابط |
| Platform | Web · React + MUI |
| Built on | MUI `Link` (native `<a href>`), styled only from Biowave tokens; MUI underline, palette colours and typography are not used |
| Import | `import { Link } from '@biowave/web'` |
| Version | 1.0 · 2026-10-21 |
| Source code | `src/components/link/` (built) |
| Tokens | — |
| Source | [`link.md`](link.md) @ `732ca6aee4d43bdc` |

## 1. What it is

A link takes people somewhere else: another page or screen, a help article, a policy, or a site outside Biowave. It sits inside a sentence (inline) or on its own (standalone), for example "Reset password" under a sign-in form or "View all requests" in a card header. A link **goes somewhere**; it never changes data — that is a [Button](../button/button.md#a--guidelines). Links are always recognisable by more than colour: inline links are always underlined.

**Part names** (use exactly these in code, class names and tests):

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `label` | Yes | Says where the link goes. It is the link's name for screen readers |
| 2 | `leading-icon` | No | Standalone only. A Material Symbols glyph that adds meaning (mail, help, description) |
| 3 | `underline` | Yes, inline · option, standalone | Marks the label as a link without relying on colour. Drawn under the `label` only, never under the icons |
| 4 | `external-icon` | With `external` only | `open_in_new` glyph after the label: the link leaves the product |
| 5 | `focus-ring` | Focus only | Shows keyboard focus around the whole link |

**Options** (names and values are the props in §2):

- 4.1 `color`
- 4.2 `size`
- 4.3 `underline`
- 4.4 `leading-icon`
- 4.5 `external`
- 4.6 `show-visited` (web only)

## 2. API

### Link

| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `href` | string | | — | ✓ (unless `disabled`) | Destination. With `component`, passed to that component as well |
| `children` | string | | — | ✓ | `label`. Plain text only |
| `color` | enum | `brand` · `neutral` · `inverse` | `brand` | | A4.1 |
| `size` | enum | `inherit` · `sm` · `md` · `lg` | `inherit` | | A4.2 — `inherit` = inline, takes the parent's font |
| `underline` | enum | `always` · `hover` | `always` | | A4.3 |
| `startIcon` | `ReactNode` | a Biowave `<Icon name="…" />` (Material Symbols Rounded, D-18) without `size` | — | | `leading-icon` — A4.4. Standalone sizes only |
| `external` | boolean | | `false` | | A4.5 — `target="_blank"`, `rel="noopener noreferrer"`, `external-icon` (`open_in_new`), screen-reader suffix |
| `externalLabel` | string | | `"(opens in a new tab)"` (EN) / `"(يفتح في علامة تبويب جديدة)"` (AR) from the provider locale | | The visually hidden suffix read after the label |
| `showVisited` | boolean | | `false` | | A4.6 — `:visited` colour, `brand` only |
| `disabled` | boolean | | `false` | | No navigation, not focusable (B6). Use rarely (A5) |
| `component` | `React.ElementType` | e.g. the app router's link | `'a'` | | Renders that element with the Link styles; extra props (e.g. `to`) are forwarded |
| `onClick` | `(e) => void` | | — | | Called before navigation; not called while `disabled` |
| `ref`, `className`, `aria-*`, `data-*` | | | | | Forwarded to the root element |

Not supported: MUI `underline="none"`, MUI `color` palette values, `variant` typography values, `sx` colour overrides, a custom `target` / `rel` (use `external`), `endIcon` (the only trailing icon is the `external-icon`). Platform naming: web `startIcon` = Flutter `leadingIcon`; `onClick` + `href` = Flutter `onPressed`; `disabled` = Flutter `onPressed: null`; `showVisited` is web only.

**Invalid combinations** (`console.warn` once in development, then the fallback renders):

| Combination | Fallback |
|---|---|
| `color="neutral"` with `underline="hover"` | `underline="always"` |
| `size="inherit"` with `underline="hover"` | `underline="always"` |
| `size="inherit"` with `startIcon` | `startIcon` not rendered |
| `showVisited` with `color` ≠ `brand` | `showVisited` ignored |
| `children` empty or not a string | renders, warns "Link needs a text label" |
| no `href`, no `component` and not `disabled` | renders as disabled, warns "Link needs an href" |

## 3. Dimensions

```
 Inline (size inherit): no box of its own — font, line height and wrapping come
 from the parent text.        Read the Privacy policy before you continue.
                                       ‾‾‾‾‾‾‾‾‾‾‾‾‾‾ border-width-default,
                                                      offset spacing-xxs

 Standalone (size md, LTR)
          spacing-xs              spacing-xs
         ├┤                      ├┤
   ┬ ┌──────────────────────────────────┐   focus ring (Focus only):
   │ │ [◆] Contact support [▸]          │   border-width-focus · border-focus-offset
   ┴ └──────────────────────────────────┘   · radius-xs
   target-min (min block size)
       └ size-icon-sm   └ text style action-md
```

| Part | Property | `inherit` | `sm` | `md` | `lg` |
|---|---|---|---|---|---|
| `label` | text style | parent's (`font: inherit`) | `action-sm` | `action-md` | `action-lg` |
| `leading-icon`, `external-icon` | size | `1em` of the parent font (Icon without `size`) | `size-icon-sm` | `size-icon-sm` | `size-icon-md` |
| root | gap between parts | `spacing-xs` | `spacing-xs` | `spacing-xs` | `spacing-xs` |
| root | min block size | — (inline exception) | `target-min` | `target-min` | `target-min` |
| root | padding | none | none | none | none |
| `underline` | thickness · offset | `border-width-default` · `spacing-xxs` (hover / pressed: `border-width-strong`) | same | same | same |
| `focus-ring` | width · offset · radius | `border-width-focus` · `border-focus-offset` · `radius-xs` | same | same | same |

Layout rules:
- `inherit`: `display: inline`; wraps with the sentence; the focus outline follows every line box (`box-decoration-break: clone`). The `external-icon` wrapper is `display: inline-block`, `vertical-align: middle`, after the label.
- Standalone (`sm` · `md` · `lg`): `display: inline-flex`, `align-items: center`, width hugs content, `max-inline-size: 100%`; the label wraps to more lines instead of truncating.
- The underline is drawn on the `label` span only (`.bw-link__label`), never under icons or the gap.

## 4. Tokens by part and state

> No component tokens (P-04): every value is a shared semantic token, so there is no `link.tokens.json`. `label`, `underline` and both icons use the same colour (`currentColor`).

| `color` | Default | Hover | Pressed | Visited (`showVisited`) | Disabled |
|---|---|---|---|---|---|
| `brand` | `color-link-default` | `color-link-hovered` | `color-link-pressed` | `color-link-visited` | `color-text-disabled` |
| `neutral` | `color-text-default` | `color-text-default` | `color-text-default` | — | `color-text-disabled` |
| `inverse` | `color-text-inverse` | `color-text-inverse` | `color-text-inverse` | — | `color-text-disabled` |

| Part | `underline` | Default | Hover | Pressed | Focus | Disabled |
|---|---|---|---|---|---|---|
| `underline` | `always` | `border-width-default` | `border-width-strong` | `border-width-strong` | `border-width-default` | none |
| `underline` | `hover` | none | `border-width-default` | `border-width-default` | `border-width-default` | none |

| Part | Property | Token |
|---|---|---|
| `focus-ring` | color | `color-border-focus` (`inverse`: `color-border-inverse`) |
| `focus-ring` | width · offset · radius | `border-width-focus` · `border-focus-offset` · `radius-xs` |

Contrast: `color-link-default` is checked against the page and surface colours in `2-foundations/scripts/contrast-pairs.json` (4.5:1); `-hover` and `-pressed` are darker in light and lighter in dark, so they keep at least that contrast. Dark theme: same tokens, values switch automatically. No exceptions.

### 4.1 How to use each token on Web

Values are for checking only — never paste a value.

| Token | CSS / TS | Light | Dark |
|---|---|---|---|
| `border-focus-offset` | `var(--bw-border-focus-offset)` · `cssVars.border.focus.offset` | 2 | 2 |
| `border-width-default` | `var(--bw-border-width-default)` · `cssVars.border.width.default` | 1 | 1 |
| `border-width-focus` | `var(--bw-border-width-focus)` · `cssVars.border.width.focus` | 2 | 2 |
| `border-width-strong` | `var(--bw-border-width-strong)` · `cssVars.border.width.strong` | 2 | 2 |
| `color-border-focus` | `var(--bw-color-border-focus)` · `cssVars.color.border.focus` | #254471 | #90A3BC |
| `color-border-inverse` | `var(--bw-color-border-inverse)` · `cssVars.color.border.inverse` | #FFFFFF | #0A0A0A |
| `color-link-default` | `var(--bw-color-link-default)` · `cssVars.color.link.default` | #2559D4 | #6D9CE8 |
| `color-link-hovered` | `var(--bw-color-link-hovered)` · `cssVars.color.link.hovered` | #1D48AD | #9CBCF2 |
| `color-link-pressed` | `var(--bw-color-link-pressed)` · `cssVars.color.link.pressed` | #153786 | #CBDCFA |
| `color-link-visited` | `var(--bw-color-link-visited)` · `cssVars.color.link.visited` | #D42222 | #FF7676 |
| `color-text-default` | `var(--bw-color-text-default)` · `cssVars.color.text.default` | #0A0A0A | #F7F7F7 |
| `color-text-disabled` | `var(--bw-color-text-disabled)` · `cssVars.color.text.disabled` | #969696 | #707070 |
| `color-text-inverse` | `var(--bw-color-text-inverse)` · `cssVars.color.text.inverse` | #FFFFFF | #0A0A0A |
| `motion-duration-instant` | `var(--bw-motion-duration-instant)` · `cssVars.motion.duration.instant` | 0 | 0 |
| `motion-duration-sm` | `var(--bw-motion-duration-sm)` · `cssVars.motion.duration.sm` | 100 | 100 |
| `motion-duration-xs` | `var(--bw-motion-duration-xs)` · `cssVars.motion.duration.xs` | 50 | 50 |
| `motion-easing-standard` | `var(--bw-motion-easing-standard)` · `cssVars.motion.easing.standard` | [0.2,0,0,1] | [0.2,0,0,1] |
| `radius-xs` | `var(--bw-radius-xs)` · `cssVars.radius.xs` | 4 | 4 |
| `size-icon-md` | `var(--bw-size-icon-md)` · `cssVars.size.icon.md` | 20 | 20 |
| `size-icon-sm` | `var(--bw-size-icon-sm)` · `cssVars.size.icon.sm` | 16 | 16 |
| `spacing-xs` | `var(--bw-spacing-xs)` · `cssVars.spacing.xs` | 4 | 4 |
| `spacing-xxs` | `var(--bw-spacing-xxs)` · `cssVars.spacing.xxs` | 2 | 2 |
| `target-min` | `var(--bw-target-min)` · `cssVars.target.min` |  |  |

## 5. States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Default → Hover | pointer enter | colour, underline thickness / appearance | `motion-duration-sm` | `motion-easing-standard` |
| Hover → Pressed | pointer down · Enter down | colour, underline thickness | `motion-duration-xs` | `motion-easing-standard` |
| Pressed → Hover / Default | release | colour, underline thickness | `motion-duration-sm` | `motion-easing-standard` |
| Any → Focus | keyboard focus (`:focus-visible`) | focus ring appears | `motion-duration-instant` | — |
| Enabled ↔ Disabled | `disabled` changes | colour, underline | `motion-duration-instant` | — |
| Default → Visited | browser history | colour (no transition: `:visited` allows colour only) | — | — |

Reduced motion: every transition is instant (built into `tokens.css`).

## 6. RTL

```
LTR  Read the Privacy policy before you continue.
RTL                 اقرأ سياسة الخصوصية قبل المتابعة.

LTR  [◆] Contact support [▸]          RTL          [◂] التواصل مع الدعم [◆]
     ↑ leading-icon        ↑ external-icon (open_in_new, mirrored)
```

| Part | In RTL |
|---|---|
| layout | Mirrors automatically (logical properties only); `startIcon` stays at the inline start |
| `external-icon` (`open_in_new`) | Mirrors — rendered as `<Icon name="open_in_new" directional />`; the Icon's own `bw-icon-directional` rule flips it once. Link never flips a wrapper |
| `leading-icon` | Mirrors only when the consumer marks it `directional` (arrows); `mail`, `help`, `description` do not mirror |
| `underline`, `focus-ring` | Follow the text; nothing to mirror |
| Label in the other script (e.g. "Biowave" in an Arabic sentence) | Ordered by the browser's bidi algorithm; no `dir` attribute on the link |

## 7. Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role / semantics | Native `<a href>` (or the `component`, which must render an `<a href>`); role stays link |
| Accessible name | `children` text. Icons are decorative (`Icon` without `label` → `aria-hidden="true"`). `external`: a visually hidden span with `externalLabel` inside the link, after the label (shared helper `src/internal/visuallyHidden.ts`) |
| External | `target="_blank"` + `rel="noopener noreferrer"` |
| Disabled | `<a>` **without** `href`, `role="link"`, `aria-disabled="true"`; not in the tab order; `onClick` not called |
| Focus | `:focus-visible` (and `.Mui-focusVisible`) outline `border-width-focus` solid `color-border-focus` (`inverse`: `color-border-inverse`), `outline-offset: border-focus-offset`, `border-radius: radius-xs` |
| Target size | Standalone: `min-block-size: target-min` (24) · inline: WCAG 2.5.8 inline exception |
| Non-colour cue | Inline and `neutral` links always underlined (WCAG 1.4.1, B1 fallbacks) |
| Cursor | `pointer`; disabled: `default` |
| Screen reader output | "Privacy policy, link" · external: "Contact support (opens in a new tab), link" · AR: "سياسة الخصوصية، رابط" · visited: the browser adds "visited" |

| Key | Action |
|---|---|
| Tab / Shift+Tab | Moves focus to / away from the link |
| Enter | Follows the link (native) |
| Space | Nothing (native link behaviour — scrolls the page) |

## 8. Examples

```tsx
import { Link, Icon } from '@biowave/web';
import { Link as RouterLink } from 'react-router-dom';

// Inline, inside body text
<p>Read the <Link href="/privacy">Privacy policy</Link> before you continue.</p>

// Standalone under a sign-in form, through the app router
<Link component={RouterLink} to="/reset-password" href="/reset-password" size="md">Reset password</Link>

// Card header, underline on hover
<Link href="/requests" size="sm" underline="hover">View all requests</Link>

// External, with a leading icon
<Link href="https://support.example.com" size="md" external startIcon={<Icon name="mail" />}>Contact support</Link>

// Arabic (direction, font and the external suffix come from BiowaveProvider locale="ar")
<Link href="https://support.example.com" size="md" external>التواصل مع الدعم</Link>

// On a navy surface
<Link href="/attendance" size="md" color="inverse">View attendance</Link>
```

## 9. How to build it

### Goal

`import { Link } from '@biowave/web'` renders inline and standalone links per B1–B3 using only Biowave tokens, behaves as B4–B6 in light/dark and en/ar, opens external links safely, works with an app router through `component`, and is covered by B9.

### Scope

**In scope**
- [ ] B1 API (all props) · B2 Dimensions · B3 Tokens · B4 States · B5 RTL · B6 Accessibility · B9 Tests

**Out of scope (do not build)**
- Breadcrumbs, menu items, navigation items (separate components)
- Any router dependency (`react-router-dom` is only an example; the consumer passes `component`)
- A link that looks like a button (use `Button` with `href`)

### Approach

- **Base:** wrap MUI `Link` (`@mui/material/Link`) with `underline="none"` and `color="inherit"`, so MUI adds no colour, underline or typography of its own. All styling comes from one `styled()` wrapper that reads transient props (`$color`, `$size`, `$underline`, `$showVisited`) — never forwarded to the DOM.
- **Token map:** `link.tokens.ts` exports typed tables `color → { default, hover, pressed, visited?, disabled }` and `size → { typography, icon }` whose values are `cssVars.*` references (B2–B3). The styled wrapper reads only these tables.
- **Label and underline:** render the children inside `<span class="bw-link__label">`. The underline is `text-decoration-line: underline` on that span with `text-decoration-thickness: cssVars.border.width.default` (hover / active: `.strong`), `text-underline-offset: cssVars.spacing.xxs`, `text-decoration-color: currentColor`. `underline="hover"` sets `text-decoration-line: none` at rest and `underline` on `:hover`, `:active`, `:focus-visible`.
- **Typography:** `sm`/`md`/`lg` use `actionSm|actionMd|actionLg` from `biowaveVariants` (size and line height are CSS variables, so Arabic switches automatically); `inherit` sets `font: inherit` and `display: inline`.
- **Icons:** `startIcon` is wrapped in `<span class="bw-link__icon" aria-hidden="true">` whose `font-size` is the B2 icon token (the Icon without `size` follows it; for `inherit` the wrapper uses `1em`). The external icon is `<Icon name="open_in_new" directional />` in the same wrapper. Link never adds `bw-icon-directional` to a wrapper (the Icon flips itself once, B5).
- **External:** add `target="_blank"`, `rel="noopener noreferrer"` and a visually hidden `<span>` with `externalLabel` after the label (helper `src/internal/visuallyHidden.ts`). Default text by locale: `const { locale } = useBiowave()` — the same pattern Button uses for `loadingLabel`.
- **Visited:** add `&:visited { color: cssVars.color.link.visited }` only when `$showVisited && $color === 'brand'`.
- **Disabled:** render the root without `href`, with `role="link"`, `aria-disabled="true"`, `cursor: default`; wrap `onClick` to `preventDefault` and do nothing; colours per B3 Disabled, `text-decoration-line: none`.
- **Focus:** remove MUI's focus visual; `&:focus-visible, &.Mui-focusVisible` get the B6 outline; `box-decoration-break: clone` for inline wraps.
- **Router:** `component` is passed to MUI `Link` (`component={component}`); type the props like MUI's `LinkProps<'a', { component?: React.ElementType }>` so `to` and other props are accepted.
- **Invalid combinations:** `warnOnce` from `src/internal/warnOnce.ts`; fallbacks exactly as B1.
- **Gotchas:** MUI `Link` defaults to `underline="always"` with a palette colour at 40% alpha and `variant="inherit"` typography — override both. Browsers only allow `color` (and a few colour properties) in `:visited`. The name `Link` clashes with router `Link` imports — keep `Link` (no `Bw` prefix on web, AGENTS.md §4) and show the alias in the JSDoc (`import { Link as RouterLink }`).

### Token gaps

None. All tokens exist in Foundations: `color-link-default` · `-hover` · `-pressed` · `-visited`, `color-text-default` · `-inverse` · `-disabled`, `color-border-focus` · `-inverse`, `border-width-default` · `-strong` · `-focus`, `border-focus-offset`, `radius-xs`, `spacing-xs` · `-xxs`, `size-icon-sm` · `-md`, `target-min`, `action-sm|md|lg`, `motion-duration-*`, `motion-easing-standard`. No component tokens (P-04).

### Files to create / change

```
3-web-components/src/components/link/Link.tsx         new
3-web-components/src/components/link/link.tokens.ts   new (typed map of B2–B3 → cssVars)
3-web-components/src/components/link/Link.test.tsx    new
3-web-components/src/components/link/index.ts         new: export { Link } and types LinkProps, LinkColor, LinkSize, LinkUnderline
3-web-components/src/index.ts                         change: export Link and its types
3-web-components/README.md                            change: status row
CHANGELOG.md                                          change: one entry
```

## 10. Tests

- [ ] Every `color` × `size` × allowed `underline` in light + dark and en + ar: the generated CSS rules for `label`, `underline` and icons use the B3 `cssVars` (assert rules, not jsdom layout)
- [ ] States: hover, `:active`, `:focus-visible`, disabled; `:visited` rule exists only with `showVisited` + `brand`
- [ ] Underline: drawn on `.bw-link__label` only; thickness and offset tokens per B2/B3; `underline="hover"` has none at rest and one on hover and focus
- [ ] `size="inherit"`: `font: inherit`, `display: inline`, no `min-block-size`; standalone sizes: `action-*` variant and `min-block-size: target-min`
- [ ] External: `target="_blank"`, `rel="noopener noreferrer"`, `open_in_new` Icon with `directional`, accessible name = label + suffix in en and ar; `externalLabel` overrides the suffix
- [ ] Disabled: no `href` attribute, `role="link"`, `aria-disabled="true"`, not tabbable, `onClick` not called
- [ ] `component`: renders the given component, forwards `to`, keeps the Link classes
- [ ] Each invalid combination in B1 warns once and renders its fallback
- [ ] RTL: exactly one element flips the `external-icon` (the Icon itself); `mail` does not flip
- [ ] axe: no violations for each `color` in both themes; Enter follows the link (keyboard table B6)
- [ ] No raw values (hex, px, ms, font names) in `Link.tsx` and `link.tokens.ts`; the D-18 guard (`noLegacyIcons.test.ts`) still passes

Implement every item in B9, plus:
- [ ] Rendered with `renderWithBiowave` for the 4 theme × locale combinations
- [ ] "No raw values" text test on `Link.tsx` and `link.tokens.ts` (same regex as Button)
- [ ] A `component` test with a minimal fake router link (`forwardRef((p, ref) => <a ref={ref} href={p.to} {...p} />)`), no router dependency

## 11. Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 exactly (names, types, defaults, fallbacks)
- [ ] AC-2 Every value in B2–B3 comes from the listed token via `cssVars` / theme variants; no raw values, no primitives
- [ ] AC-3 Every transition in B4; reduced motion respected
- [ ] AC-4 RTL as B5 (one flip, by the Icon); a11y as B6 (external suffix in en and ar, disabled not focusable)
- [ ] AC-5 Tests in B9 + C6 exist and pass; `npm run typecheck`, `npm run test:web`, `npm run docs:check` pass
- [ ] AC-6 Exported from `src/index.ts`; `3-web-components/README.md` status row and the `link.md` header updated to `Built`
- [ ] AC-7 MUI underline, palette colour and typography of `Link` are fully overridden; icons only through the Biowave `Icon`

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

1. Fill [C8 Execution log](link.md#c8-execution-log-filled-by-the-executor) in `link.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `link.md` and in the Components table of `3-web-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).

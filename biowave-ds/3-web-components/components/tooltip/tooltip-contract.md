<!-- GENERATED from tooltip.md @ f97fd31adb22d8a1 — do not edit; change the source and run: npm run contract -- web tooltip -->
# Tooltip · تلميح — Web — code contract

> **Everything you need to build Tooltip on Web, and nothing else.** Read this file only. Generated from [`tooltip.md`](tooltip.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](tooltip.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Tooltip · تلميح |
| Platform | Web · React + MUI |
| Built on | MUI `Tooltip` (popper + `Fade` transition), styled only from semantic tokens; no arrow, no MUI colors |
| Import | `import { Tooltip } from '@biowave/web'` |
| Version | 1.0 · 2026-10-23 |
| Source code | `src/components/tooltip/` — not built yet (the Executor creates it) |
| Tokens | — |
| Source | [`tooltip.md`](tooltip.md) @ `f97fd31adb22d8a1` |

## 1. What it is

A tooltip is a small text label that appears next to a control when the user points at it, focuses it with the keyboard, or long-presses it on a touch screen. It names an icon-only control or adds one short line of extra information about a control. It holds plain text only, never actions, and it goes away on its own, so nothing the user needs to finish a task may live only in a tooltip.

**Part names** (use exactly these in code, class names and tests):

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `container` | Yes | Inverse surface with rounded corners; hugs the text up to a maximum width |
| 2 | `label` | Yes | The tooltip text. Wraps to more lines at the maximum width; never truncated |
| 3 | `anchor` | Yes | The control the tooltip belongs to (for example an Icon button). Supplied by the consumer; the tooltip never changes it |

**Options** (names and values are the props in §2):

- 4.1 `placement`
- 4.2 `purpose`
- 4.3 `trigger` (touch only)

## 2. API

### Tooltip
| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `title` | `string` | plain text (A6) | — | ✓ | The `label` part. MUI's prop name |
| `children` | `ReactElement` | one element that accepts a `ref` and DOM event props (Button, Icon button, a focusable element) | — | ✓ | The `anchor` |
| `placement` | enum | `top` · `bottom` · `start` · `end` | `top` | | A4.1 — logical sides |
| `purpose` | enum | `label` · `description` | `label` | | A4.2 — how the text reaches assistive technology (B6) |
| `open` | `boolean` | | — | | Controlled mode (MUI name). When set, the consumer owns showing and hiding |
| `onOpen` · `onClose` | `(event) => void` | | — | | Called when the tooltip asks to open / close (MUI names) |

Platform naming notes: A4.3 `trigger` is touch only and has no web prop (web always opens on hover and keyboard focus). MUI's physical `placement` values (`left`, `right`, `top-start` …), `arrow`, `followCursor`, `describeChild`, `disableInteractive`, `enterDelay`, `leaveDelay` and `slotProps` are not part of the public API.

**Invalid combinations** (`console.warn` once in development via the shared `warnOnce`, then the fallback):
| Combination | Fallback |
|---|---|
| `title` empty or whitespace only | Warns "Tooltip needs text"; renders `children` without a tooltip |
| `purpose="label"` and the child already has `aria-label` or `aria-labelledby` | Warns "Tooltip purpose label on a named element — use description"; the child's own name wins, the tooltip text is not added as a name |

## 3. Dimensions

```
          spacing-md                     spacing-md
         ├──────────┤                   ├──────────┤
     ┬   ┌───────────────────────────────────────────┐
     │   │          Edit device                       │   radius-sm
     │   └───────────────────────────────────────────┘
     ┴   padding-block spacing-xs        max-width size-container-xxs
                       ↕ offset spacing-xs
                    [◆] anchor
```

| Part | Property | Value |
|---|---|---|
| `container` | padding-block · padding-inline | `spacing-xs` · `spacing-md` |
| `container` | radius | `radius-sm` |
| `container` | width | hug the text · max `size-container-xxs` |
| `container` | border · shadow | none · none (the inverse surface gives the contrast) |
| `container` | gap to the anchor (offset) | `spacing-xs` |
| `container` | minimum distance to the viewport edge | `spacing-md` |
| `container` | stacking | `layer-tooltip` (MUI theme `zIndex.tooltip`, already set from this token) |
| `label` | text style | `label-sm` (`biowaveVariants.labelSm`; Arabic line height from the locale) |
| `label` | alignment · wrapping | start-aligned · wraps at the max width, never truncated |

Layout rules: the tooltip renders in a portal above all page content and never changes the anchor's size or layout. Centred on the anchor's cross axis for every placement.

## 4. Tokens by part and state

Every value is a semantic token; there are no component tokens (P-04 — the same set Icon button B3.4 uses for its temporary tooltip, plus the max width).

| Part | Property | Shown | Entering / exiting |
|---|---|---|---|
| `container` | background | `color-surface-inverse` | same, with opacity animated (B4) |
| `label` | color | `color-text-neutral-inverse` | same |

Dark theme: same tokens — the values switch, so the tooltip is light on dark pages. No exceptions. There is no hover, pressed, focus or disabled style on the tooltip itself; the anchor keeps its own states.

### 4.1 How to use each token on Web

Values are for checking only — never paste a value.

| Token | CSS / TS | Light | Dark |
|---|---|---|---|
| `color-surface-inverse` | `var(--bw-color-surface-inverse)` · `cssVars.color.surface.inverse` | #141414 | #FFFFFF |
| `color-text-neutral-inverse` | `var(--bw-color-text-neutral-inverse)` · `cssVars.color.text.neutral.inverse` | #FFFFFF | #0A0A0A |
| `layer-tooltip` | `var(--bw-layer-tooltip)` · `cssVars.layer.tooltip` | 1600 | 1600 |
| `motion-duration-2xl` | `var(--bw-motion-duration-2xl)` · `cssVars.motion.duration.2xl` | 500 | 500 |
| `motion-duration-instant` | `var(--bw-motion-duration-instant)` · `cssVars.motion.duration.instant` | 0 | 0 |
| `motion-duration-md` | `var(--bw-motion-duration-md)` · `cssVars.motion.duration.md` | 200 | 200 |
| `motion-duration-sm` | `var(--bw-motion-duration-sm)` · `cssVars.motion.duration.sm` | 100 | 100 |
| `motion-easing-standard-accelerate` | `var(--bw-motion-easing-standard-accelerate)` · `cssVars.motion.easing.standard-accelerate` | [0.3,0,1,1] | [0.3,0,1,1] |
| `motion-easing-standard-decelerate` | `var(--bw-motion-easing-standard-decelerate)` · `cssVars.motion.easing.standard-decelerate` | [0,0,0,1] | [0,0,0,1] |
| `radius-sm` | `var(--bw-radius-sm)` · `cssVars.radius.sm` | 6 | 6 |
| `size-container-xxs` | `var(--bw-size-container-xxs)` · `cssVars.size.container.xxs` | 320 | 320 |
| `spacing-md` | `var(--bw-spacing-md)` · `cssVars.spacing.md` | 8 | 8 |
| `spacing-xs` | `var(--bw-spacing-xs)` · `cssVars.spacing.xs` | 4 | 4 |

## 5. States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Hidden → Shown | pointer rests on the anchor for `motion-duration-2xl` (delay) | opacity | `motion-duration-md` | `motion-easing-standard-decelerate` |
| Hidden → Shown | keyboard focus (`:focus-visible`) on the anchor — no delay | opacity | `motion-duration-md` | `motion-easing-standard-decelerate` |
| Shown → Shown | pointer moves from the anchor onto the tooltip | — (stays open, hoverable) | — | — |
| Shown → Hidden | pointer leaves anchor and tooltip · blur · Esc — no delay | opacity | `motion-duration-sm` | `motion-easing-standard-accelerate` |

Reduced motion (`prefers-reduced-motion: reduce`): enter and exit use `motion-duration-instant` (no fade). The hover delay `motion-duration-2xl` stays; keyboard focus still opens at once.

Touch input on web: MUI's built-in long-press handling stays unchanged (Biowave has no token for a touch hold or display time).

## 6. RTL

```
LTR   placement="end"    [◆] ┌ Edit device ┐
RTL   placement="end"    ┌ تعديل الجهاز ┐ [◆]
```

| Part | In RTL |
|---|---|
| `placement` `start` / `end` | Follow the reading direction: `start` is left of the anchor in LTR and right in RTL; `end` the opposite |
| `placement` `top` / `bottom` | Unchanged |
| `label` | Start-aligned (right in RTL); Arabic text style from the provider locale |
| Flip when there is no room | To the opposite logical side |

## 7. Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role / semantics | Tooltip element `role="tooltip"` with a stable id (MUI). Never focusable; no interactive content |
| `purpose="label"` | The anchor gets `aria-label={title}` (MUI `describeChild={false}`). A disabled anchor is wrapped in a `span` that carries **no** `aria-label`; the name goes on the disabled element itself (same rule as Icon button B6) |
| `purpose="description"` | The anchor gets `aria-describedby` pointing to an element that always exists (visually hidden copy of `title` while closed, the tooltip while open). No native `title` attribute on the anchor, ever (it would show a second, unstyled browser tooltip) |
| Dismissible | Esc closes the open tooltip; focus stays on the anchor (WCAG 1.4.13) |
| Hoverable · persistent | Pointer can move onto the tooltip without it closing; it stays until pointer leave, blur or Esc (no auto-hide timer) |
| Contrast | `color-text-neutral-inverse` on `color-surface-inverse` ≥ 4.5:1 in both themes |
| Focus | The anchor keeps its own focus ring; the tooltip adds none |
| Screen reader output | `label`: "Edit device, button" · `description`: "Work email, edit text, We send shift reminders to this address." |

| Key | Action |
|---|---|
| Tab / Shift+Tab | Moves focus to / from the anchor; the tooltip opens at once on focus and closes on blur |
| Esc | Closes the tooltip; focus stays on the anchor |
| Enter / Space | Belong to the anchor (the tooltip does not handle them) |

## 8. Examples

```tsx
import { Tooltip, IconButton, Button, Icon } from '@biowave/web';   // Biowave Icon (D-18)

// Name an icon-only control (Icon button has its own tooltip; this shows Tooltip on any element)
<Tooltip title="Copy invite link">
  <button type="button" className="app-icon-action"><Icon name="content_copy" /></button>
</Tooltip>

// Add a hint to a named control
<Tooltip title="Exports this month's shifts as a CSV file." purpose="description" placement="bottom">
  <Button variant="outlined" color="neutral">Export</Button>
</Tooltip>

// Arabic: same props, Arabic text; start/end follow the reading direction
<Tooltip title="يعرض ساعات العمل لهذا الأسبوع." purpose="description" placement="end">
  <Button variant="text">الساعات</Button>
</Tooltip>
```

## 9. How to build it

### Goal

`Tooltip` from `@biowave/web` matches B1–B6, passes B9 and C6, and reproduces the approved Icon button temporary tooltip (Icon button B3.4 tokens, B4 timings, reduced-motion handling) so Icon button can switch to it later without a visual change.

### Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- Rich tooltips (title, actions, links) and arrows
- Any change to Icon button, Text field, Button, the shared test tooling (`src/test/*`), `vitest.config.ts` or foundations
- **Follow-up, not this task:** migrate Icon button (`IconButtonTooltip.tsx` → `Tooltip` with `purpose="label"`) and the Text field help icon (`helpText` → `Tooltip` with `purpose="description"`) in their own plan steps. Known differences to handle there: the max width becomes `size-container-xxs` (the temporary tooltip uses MUI's default), Icon button opens on any focus while Tooltip opens on keyboard focus only (B4), and Text field `helpText` is a `ReactNode` while `title` is a `string`

### Approach

- **Base:** wrap MUI `Tooltip` with `slots={{ transition: Fade }}`, no `arrow`. Styles go through `slotProps.tooltip.sx` from a `tooltip.tokens.ts` map (`cssVars.*` for colors, padding, radius, max width; `biowaveVariants.labelSm` for the text). Reset MUI's own placement margin on the tooltip element to `0`, so the popper `offset` modifier (`base.spacing.xs`, read once from the token map) is the only gap; set the popper `preventOverflow` padding from `base.spacing.md` and `flip` to the opposite side.
- **Timings:** `enterDelay={base.motion.duration['2xl']}`, `leaveDelay` 0 (`base.motion.duration.instant`); transition `timeout` enter `base.motion.duration.md`, exit `base.motion.duration.sm`; easing enter `cssVars.motion.easing['standard-decelerate']`, exit `cssVars.motion.easing['standard-accelerate']`. Numeric props come from `base` (never a literal). Reduced motion: `useMediaQuery('(prefers-reduced-motion: reduce)')` → both timeouts `base.motion.duration.instant` (CSS `prefers-reduced-motion` does not reach JS numbers). Same pattern as `IconButtonTooltip.tsx` — read it as a reference, do not import from or change it.
- **Open logic (uncontrolled):** internal `open` state. Hover opens through MUI `onOpen` (delayed by `enterDelay`); `onFocus` opens at once only when the target matches `:focus-visible`; `onBlur`, pointer leave (MUI `onClose`) and Esc close. Keep MUI's interactive mode so the pointer can move onto the tooltip. Compose the child's own `onFocus` / `onBlur` handlers (call them first). When the `open` prop is set, use it as is and only forward `onOpen` / `onClose`.
- **Placement:** map logical → MUI physical from the provider direction: `start` → `left` in LTR / `right` in RTL, `end` → the opposite, `top` / `bottom` unchanged. **Gotcha:** check whether MUI already swaps `left`/`right` under the RTL theme; if it does, pass the LTR mapping and let MUI flip. The B9 placement test (resulting `data-popper-placement` in en and ar) decides — never both.
- **Names:** `purpose="label"` → `describeChild={false}`. Disabled child (`children.props.disabled === true`): wrap in `<span className="bw-tooltip__anchor">` with `aria-label={undefined}` and clone the child with `aria-label={title}`. `purpose="description"` → `describeChild`, then clone the child with `title={undefined}` and `aria-describedby` (merged with the child's own ids) pointing to a stable `useId()` id that is either the open tooltip or a `visuallyHidden` span with the same text while closed.
- **Warnings:** `warnOnce` for every B1 invalid combination (`title.trim().length === 0`; `label` on a named child); never throw.
- **Tests:** render only through `renderWithBiowave` from `src/test/render.tsx` (shared per-test speedy Emotion cache, reset in `setup.ts`). No Emotion cache or `BiowaveProvider` in the test file, no per-test timeouts, no change to `vitest.config.ts`. Timed behaviour uses fake timers advanced by the token durations (`base.motion.duration.*`) inside `act`, never real-time waits. Read rendered CSS rules once per render and reuse them (Icon button finding 10).

### Token gaps

None.

### Files to create / change

```
3-web-components/src/components/tooltip/Tooltip.tsx          new
3-web-components/src/components/tooltip/tooltip.tokens.ts    new (cssVars / base map for B2–B4)
3-web-components/src/components/tooltip/Tooltip.test.tsx     new
3-web-components/src/components/tooltip/index.ts             new
3-web-components/src/index.ts                                change: export Tooltip, TooltipProps, TooltipPlacement, TooltipPurpose (alphabetical)
3-web-components/README.md                                   change: Tooltip row (Code)
CHANGELOG.md                                                 change: one entry
```

## 10. Tests

- [ ] Light + dark · en + ar: rendered tooltip uses exactly the B2–B3 tokens (background, color, padding, radius, max width, offset, text style)
- [ ] Every transition in B4: not open before `motion-duration-2xl` on hover, open after; open at once on keyboard focus; stays when the pointer moves onto the tooltip; closes on pointer leave, blur and Esc; enter/exit easing and durations; reduced motion → `motion-duration-instant`
- [ ] Every `placement` in en and ar: resulting popper placement is the physical side B5 gives (`start` = left in LTR, right in RTL); flips to the opposite side when there is no room
- [ ] `purpose="label"`: anchor named by `title` exactly once; disabled anchor: span wrapper has no `aria-label`, the element is named
- [ ] `purpose="description"`: `aria-describedby` resolves to the text while closed and while open; no `title` attribute on the anchor
- [ ] Every invalid combination in B1 warns and falls back
- [ ] a11y: axe on `baseElement` with the tooltip open (portal included) in light/dark × en/ar, for `label`, `description` and a disabled anchor
- [ ] No raw values (lint test over the component folder)

Implement every item in B9, plus:
- [ ] Mouse click focus (not `:focus-visible`) does not open the tooltip at once
- [ ] The child's own `onFocus`, `onBlur` and `aria-describedby` are kept
- [ ] Controlled `open`: the tooltip follows the prop; `onOpen` / `onClose` are called; internal timers do not override it
- [ ] Token-map test: every entry of `tooltip.tokens.ts` names the B2–B4 token (no raw values)
- [ ] No timeout arguments in `Tooltip.test.tsx`; every test passes under the 5 s default; `npm run test:web` green in 3 consecutive full runs

## 11. Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 exactly (names, types, defaults, fallbacks); MUI-only props not exposed
- [ ] AC-2 Every value in B2–B3 comes from the listed token; no raw values, no primitives; one source for the offset
- [ ] AC-3 Every transition in B4 (hover delay, keyboard focus at once, hoverable, closes on leave / blur / Esc, easings); reduced motion instant
- [ ] AC-4 RTL behaves as B5 (logical `start` / `end`, measured placement in en and ar); a11y as B6 (`label` named once, disabled span unnamed, `description` always described, no native `title`)
- [ ] AC-5 Tests in B9 and C6 exist and pass; `npm run typecheck`, `npm run test:web` (3 full runs, default timeouts), `npm run component-tokens`, `npm run sync`, `npm run docs:check` pass
- [ ] AC-6 Exported from `src/index.ts`; README status row updated; nothing outside C5 changed (Icon button and Text field untouched)

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

1. Fill [C8 Execution log](tooltip.md#c8-execution-log-filled-by-the-executor) in `tooltip.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `tooltip.md` and in the Components table of `3-web-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).

# Tooltip · تلميح — Web

> **One file for Tooltip on Web:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- web tooltip`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Tooltip · تلميح |
| Summary | A short text label that names an icon-only control or adds a one-line hint, shown on hover, keyboard focus or long press. |
| Summary (ar) | نص قصير يسمّي عنصر تحكم بأيقونة فقط أو يضيف تلميحًا من سطر واحد، ويظهر عند التمرير أو التركيز بلوحة المفاتيح أو الضغط المطوّل. |
| Parts | Container · label · anchor |
| Parts (ar) | الحاوية · النص · العنصر المرتبط |
| Platform | Web · React + MUI |
| Built on | MUI `Tooltip` (popper + `Fade` transition), styled only from semantic tokens; no arrow, no MUI colors |
| Import | `import { Tooltip } from '@biowave/web'` |
| Figma | **Biowave DS — Web Components** › `↳ Tooltip` · build: [Part D](#d--figma-build) |
| Version | 1.0 · 2026-10-23 |
| Plan | Finished |
| Code | Built |
| Figma build | Planned |
| Review | — |
| Source code | `src/components/tooltip/` — not built yet (the Executor creates it) |
| Tokens | — (no component tokens: every value is an existing semantic token, P-04) |
| Contracts | [`tooltip-contract.md`](tooltip-contract.md) · [`figma-tooltip-contract.md`](figma-tooltip-contract.md) — generated, never edited |
| Docs page | [`tooltip.html`](tooltip.html) |

## Contents

[A · Guidelines](#a--guidelines) · [B · Spec](#b--spec) · [C · Code plan](#c--code-plan) · [D · Figma build](#d--figma-build) · [E · Review](#e--review) · [F · Changelog](#f--changelog)

---

## A · Guidelines

> What it is and when to use it — designers, PMs. Identical on Web, Tablet and Mobile except **A8** (checked by `npm run docs:check`).

| | |
|---|---|
| Specs | [Web](#b--spec) · [Tablet](../../../4-tablet-components/components/tooltip/tooltip.md#b--spec) · [Mobile](../../../5-mobile-components/components/tooltip/tooltip.md#b--spec) |
| Figma | `↳ Tooltip` in **Biowave DS — Web Components** · **Tablet Components** · **Mobile Components** (one set per platform file, D-12; keys in `_sync/figma-files.json`) |
| Version | 1.0 · 2026-10-23 |

### A1 Overview

A tooltip is a small text label that appears next to a control when the user points at it, focuses it with the keyboard, or long-presses it on a touch screen. It names an icon-only control or adds one short line of extra information about a control. It holds plain text only, never actions, and it goes away on its own, so nothing the user needs to finish a task may live only in a tooltip.

![Tooltip — light and dark](./assets/overview.png)

### A2 Anatomy

```
        ①┌──────────────────────┐
         │ ②Edit device          │
         └──────────────────────┘
                   ↕ offset
                ③[◆]
```

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `container` | Yes | Inverse surface with rounded corners; hugs the text up to a maximum width |
| 2 | `label` | Yes | The tooltip text. Wraps to more lines at the maximum width; never truncated |
| 3 | `anchor` | Yes | The control the tooltip belongs to (for example an Icon button). Supplied by the consumer; the tooltip never changes it |

### A3 Usage

**When to use**
- Name an icon-only control: every [Icon button](../icon-button/icon-button.md#a--guidelines) shows its label in a tooltip
- Add one short hint to a control that already has a name, when the hint helps but is not needed to finish the task
- Explain a field from a help icon next to its label ([Text field](../text-field/text-field.md#a--guidelines) help icon)

**When not to use** (and what to use instead)
| Situation | Use instead |
|---|---|
| The information is needed to finish the task (format, limits, consequences) | Visible helper text, for example [Text field](../text-field/text-field.md#a--guidelines) supporting text |
| Errors and validation | [Text field](../text-field/text-field.md#a--guidelines) error text next to the field |
| Why a control is disabled | Visible text near the control (disabled controls cannot be reached with the keyboard) |
| The control has room for a visible label | [Button](../button/button.md#a--guidelines) with a label |
| Actions, links, images or more than one sentence | Visible content on the page or in a dialog |
| Results of an action ("Saved") | A snackbar or an inline status message |

### A4 Options

#### 4.1 `placement`
Logical sides: `start` and `end` follow the reading direction. When the chosen side has no room, the tooltip moves to the opposite side.

| Value | Looks like | Pick it when |
|---|---|---|
| `top` | tooltip above `[◆]` | **Default.** Most controls |
| `bottom` | tooltip below `[◆]` | The anchor sits at the top edge (app bar, table header) or the content above must stay visible |
| `start` | tooltip before `[◆]` in reading order | Vertical toolbars and rails on the end side of the screen |
| `end` | tooltip after `[◆]` in reading order | Vertical toolbars and rails on the start side of the screen |

#### 4.2 `purpose`
| Value | Pick it when |
|---|---|
| `label` | **Default.** The anchor has no visible text (icon-only). The tooltip text is the control's name |
| `description` | The anchor already has a name (visible label or its own accessible name). The tooltip adds a short hint that is read after the name |

#### 4.3 `trigger` (touch only)
On web the tooltip always opens on pointer hover and keyboard focus; this option applies to touch screens.

| Value | Pick it when |
|---|---|
| `long-press` | **Default.** The anchor runs an action on tap; a long press shows the tooltip without running it |
| `tap` | The anchor exists only to show the tooltip, such as a help icon |

**Combination rules**
- `purpose="label"` only on anchors without a name of their own; otherwise use `description`.
- `trigger="tap"` only on anchors that have no action of their own.
- One tooltip per anchor. Never nest a tooltip inside a tooltip.

### A5 States and behavior

| State | When it happens | What the user sees |
|---|---|---|
| Hidden | Default | Only the anchor |
| Shown — hover | Pointer rests on the anchor for a short delay (web, and tablet with a pointer) | Tooltip fades in next to the anchor; it stays while the pointer is on the anchor or on the tooltip |
| Shown — keyboard focus | The anchor receives keyboard focus | Tooltip appears at once |
| Shown — touch | Long press on the anchor, or tap when `trigger="tap"` | Tooltip fades in; it stays while the finger is down and for a short time after release |
| Dismissed | Pointer leaves anchor and tooltip, focus moves away, Esc, or a tap elsewhere | Tooltip fades out; focus stays where it was |

**Behavior rules**
- Overflow: the text wraps at the maximum width and is never truncated. Keep it short (A6) so it rarely wraps.
- Long Arabic text (+20–30% width): wraps the same way; the tooltip grows in height, never in width past the maximum.
- Only one tooltip is visible at a time. It never covers its anchor.
- With reduced motion, the tooltip appears and disappears without a fade; the hover delay stays.
- A disabled anchor still shows its tooltip on pointer hover, but keyboard users cannot reach it, so never put the only explanation of a disabled state in a tooltip.

### A6 Content

General writing rules: [content.md](../../../2-foundations/guidelines/content.md).

| Element | Rule | Max length |
|---|---|---|
| `label` with `purpose="label"` | The control's name: verb first, says the action, not the icon. Sentence case, no full stop | 3 words |
| `label` with `purpose="description"` | One short sentence that adds to the name and never repeats it. Full stop at the end | 80 characters |
| Both | Plain text only: no links, no formatting, no "Click here" | — |

| ✓ EN | ✓ AR | ✗ Avoid |
|---|---|---|
| Edit device | تعديل الجهاز | Pencil |
| More options | خيارات أخرى | Menu |
| Copy invite link | نسخ رابط الدعوة | Copy (unclear when a page has several copy actions) |
| We send shift reminders to this address. | نرسل تذكيرات المناوبات إلى هذا العنوان. | Click here to learn more about email |
| Shows the hours worked this week. | يعرض ساعات العمل لهذا الأسبوع. | Hours (repeats the visible label) |

### A7 Do and don't

| ✓ Do | ✗ Don't |
|---|---|
| ![](./assets/do-1.png) Keep tooltip text to one short line | ![](./assets/dont-1.png) Put paragraphs or lists in a tooltip |
| ![](./assets/do-2.png) Give every icon-only control a tooltip with its name | ![](./assets/dont-2.png) Repeat a visible label in a tooltip |
| ![](./assets/do-3.png) Show information the user needs as text on the screen | ![](./assets/dont-3.png) Hide errors, limits or the reason a control is disabled in a tooltip |
| ![](./assets/do-4.png) Use plain text only | ![](./assets/dont-4.png) Put links, buttons or images in a tooltip |

### A8 Platform notes — Web

| | Web |
|---|---|
| Available | ✓ |
| Opens on | Pointer hover (after a short delay) and keyboard focus (at once) |
| Closes on | Pointer leaving the anchor and the tooltip, focus moving away, Esc |
| Placement | `top` · `bottom` · `start` · `end` |
| `trigger` | Not used — web always opens on hover and focus |
| Not supported | Rich content (title, actions) — plain text only |

### A9 Accessibility (design)

- Screen readers announce a `label` tooltip once, as the control's name, and a `description` tooltip after the name, in English and Arabic.
- The tooltip opens on keyboard focus, not only on hover, and Esc closes it without moving focus (WCAG 1.4.13 dismissible).
- The pointer can move onto the tooltip without it closing (hoverable), and it stays until the user moves away or dismisses it (persistent).
- The text meets 4.5:1 contrast on the inverse surface in light and dark themes.
- The tooltip is never focusable and never holds interactive content; it adds no tab stop.
- It works at 200% text size: the text wraps instead of being cut.

### A10 Related components

- [Icon button](../icon-button/icon-button.md#a--guidelines) — shows its label in a tooltip; the main user of Tooltip
- [Text field](../text-field/text-field.md#a--guidelines) — its help icon opens a tooltip with a short explanation
- [Button](../button/button.md#a--guidelines) — use a visible label instead of a tooltip when there is room

---

## B · Spec

> The contract — API, dimensions, tokens, states, RTL, accessibility. Code and Figma are both reviewed against this part.

### B1 API

#### Tooltip
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

### B2 Dimensions

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

### B3 Tokens by part and state

Every value is a semantic token; there are no component tokens (P-04 — the same set Icon button B3.4 uses for its temporary tooltip, plus the max width).

| Part | Property | Shown | Entering / exiting |
|---|---|---|---|
| `container` | background | `color-surface-inverse` | same, with opacity animated (B4) |
| `label` | color | `color-text-neutral-inverse` | same |

Dark theme: same tokens — the values switch, so the tooltip is light on dark pages. No exceptions. There is no hover, pressed, focus or disabled style on the tooltip itself; the anchor keeps its own states.

### B4 States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Hidden → Shown | pointer rests on the anchor for `motion-duration-2xl` (delay) | opacity | `motion-duration-md` | `motion-easing-standard-decelerate` |
| Hidden → Shown | keyboard focus (`:focus-visible`) on the anchor — no delay | opacity | `motion-duration-md` | `motion-easing-standard-decelerate` |
| Shown → Shown | pointer moves from the anchor onto the tooltip | — (stays open, hoverable) | — | — |
| Shown → Hidden | pointer leaves anchor and tooltip · blur · Esc — no delay | opacity | `motion-duration-sm` | `motion-easing-standard-accelerate` |

Reduced motion (`prefers-reduced-motion: reduce`): enter and exit use `motion-duration-instant` (no fade). The hover delay `motion-duration-2xl` stays; keyboard focus still opens at once.

Touch input on web: MUI's built-in long-press handling stays unchanged (Biowave has no token for a touch hold or display time).

### B5 RTL

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

### B6 Accessibility (implementation)

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

### B7 Examples

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

### B8 Figma

Structure, properties, the Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

- [ ] Light + dark · en + ar: rendered tooltip uses exactly the B2–B3 tokens (background, color, padding, radius, max width, offset, text style)
- [ ] Every transition in B4: not open before `motion-duration-2xl` on hover, open after; open at once on keyboard focus; stays when the pointer moves onto the tooltip; closes on pointer leave, blur and Esc; enter/exit easing and durations; reduced motion → `motion-duration-instant`
- [ ] Every `placement` in en and ar: resulting popper placement is the physical side B5 gives (`start` = left in LTR, right in RTL); flips to the opposite side when there is no room
- [ ] `purpose="label"`: anchor named by `title` exactly once; disabled anchor: span wrapper has no `aria-label`, the element is named
- [ ] `purpose="description"`: `aria-describedby` resolves to the text while closed and while open; no `title` attribute on the anchor
- [ ] Every invalid combination in B1 warns and falls back
- [ ] a11y: axe on `baseElement` with the tooltip open (portal included) in light/dark × en/ar, for `label`, `description` and a disabled anchor
- [ ] No raw values (lint test over the component folder)

---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `tooltip-contract.md`.

> Executor: read `AGENTS.md`, `3-web-components/README.md` and your contract. Nothing else unless linked here.

| Field | Value |
|---|---|
| Component | Tooltip |
| Platform | Web (React + MUI) |
| Depends on | Nothing to build first. Uses the shared `warnOnce` and `visuallyHidden` helpers in `src/internal/` and the shared test tooling in `src/test/` (all on `main`) |
| Plan version | 1 · 2026-10-23 |

### C1 Goal

`Tooltip` from `@biowave/web` matches B1–B6, passes B9 and C6, and reproduces the approved Icon button temporary tooltip (Icon button B3.4 tokens, B4 timings, reduced-motion handling) so Icon button can switch to it later without a visual change.

### C2 Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- Rich tooltips (title, actions, links) and arrows
- Any change to Icon button, Text field, Button, the shared test tooling (`src/test/*`), `vitest.config.ts` or foundations
- **Follow-up, not this task:** migrate Icon button (`IconButtonTooltip.tsx` → `Tooltip` with `purpose="label"`) and the Text field help icon (`helpText` → `Tooltip` with `purpose="description"`) in their own plan steps. Known differences to handle there: the max width becomes `size-container-xxs` (the temporary tooltip uses MUI's default), Icon button opens on any focus while Tooltip opens on keyboard focus only (B4), and Text field `helpText` is a `ReactNode` while `title` is a `string`

### C3 Approach

- **Base:** wrap MUI `Tooltip` with `slots={{ transition: Fade }}`, no `arrow`. Styles go through `slotProps.tooltip.sx` from a `tooltip.tokens.ts` map (`cssVars.*` for colors, padding, radius, max width; `biowaveVariants.labelSm` for the text). Reset MUI's own placement margin on the tooltip element to `0`, so the popper `offset` modifier (`base.spacing.xs`, read once from the token map) is the only gap; set the popper `preventOverflow` padding from `base.spacing.md` and `flip` to the opposite side.
- **Timings:** `enterDelay={base.motion.duration['2xl']}`, `leaveDelay` 0 (`base.motion.duration.instant`); transition `timeout` enter `base.motion.duration.md`, exit `base.motion.duration.sm`; easing enter `cssVars.motion.easing['standard-decelerate']`, exit `cssVars.motion.easing['standard-accelerate']`. Numeric props come from `base` (never a literal). Reduced motion: `useMediaQuery('(prefers-reduced-motion: reduce)')` → both timeouts `base.motion.duration.instant` (CSS `prefers-reduced-motion` does not reach JS numbers). Same pattern as `IconButtonTooltip.tsx` — read it as a reference, do not import from or change it.
- **Open logic (uncontrolled):** internal `open` state. Hover opens through MUI `onOpen` (delayed by `enterDelay`); `onFocus` opens at once only when the target matches `:focus-visible`; `onBlur`, pointer leave (MUI `onClose`) and Esc close. Keep MUI's interactive mode so the pointer can move onto the tooltip. Compose the child's own `onFocus` / `onBlur` handlers (call them first). When the `open` prop is set, use it as is and only forward `onOpen` / `onClose`.
- **Placement:** map logical → MUI physical from the provider direction: `start` → `left` in LTR / `right` in RTL, `end` → the opposite, `top` / `bottom` unchanged. **Gotcha:** check whether MUI already swaps `left`/`right` under the RTL theme; if it does, pass the LTR mapping and let MUI flip. The B9 placement test (resulting `data-popper-placement` in en and ar) decides — never both.
- **Names:** `purpose="label"` → `describeChild={false}`. Disabled child (`children.props.disabled === true`): wrap in `<span className="bw-tooltip__anchor">` with `aria-label={undefined}` and clone the child with `aria-label={title}`. `purpose="description"` → `describeChild`, then clone the child with `title={undefined}` and `aria-describedby` (merged with the child's own ids) pointing to a stable `useId()` id that is either the open tooltip or a `visuallyHidden` span with the same text while closed.
- **Warnings:** `warnOnce` for every B1 invalid combination (`title.trim().length === 0`; `label` on a named child); never throw.
- **Tests:** render only through `renderWithBiowave` from `src/test/render.tsx` (shared per-test speedy Emotion cache, reset in `setup.ts`). No Emotion cache or `BiowaveProvider` in the test file, no per-test timeouts, no change to `vitest.config.ts`. Timed behaviour uses fake timers advanced by the token durations (`base.motion.duration.*`) inside `act`, never real-time waits. Read rendered CSS rules once per render and reuse them (Icon button finding 10).

### C4 Token gaps

None.

### C5 Files to create / change

```
3-web-components/src/components/tooltip/Tooltip.tsx          new
3-web-components/src/components/tooltip/tooltip.tokens.ts    new (cssVars / base map for B2–B4)
3-web-components/src/components/tooltip/Tooltip.test.tsx     new
3-web-components/src/components/tooltip/index.ts             new
3-web-components/src/index.ts                                change: export Tooltip, TooltipProps, TooltipPlacement, TooltipPurpose (alphabetical)
3-web-components/README.md                                   change: Tooltip row (Code)
CHANGELOG.md                                                 change: one entry
```

### C6 Tests

Implement every item in B9, plus:
- [ ] Mouse click focus (not `:focus-visible`) does not open the tooltip at once
- [ ] The child's own `onFocus`, `onBlur` and `aria-describedby` are kept
- [ ] Controlled `open`: the tooltip follows the prop; `onOpen` / `onClose` are called; internal timers do not override it
- [ ] Token-map test: every entry of `tooltip.tokens.ts` names the B2–B4 token (no raw values)
- [ ] No timeout arguments in `Tooltip.test.tsx`; every test passes under the 5 s default; `npm run test:web` green in 3 consecutive full runs

### C7 Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 exactly (names, types, defaults, fallbacks); MUI-only props not exposed
- [ ] AC-2 Every value in B2–B3 comes from the listed token; no raw values, no primitives; one source for the offset
- [ ] AC-3 Every transition in B4 (hover delay, keyboard focus at once, hoverable, closes on leave / blur / Esc, easings); reduced motion instant
- [ ] AC-4 RTL behaves as B5 (logical `start` / `end`, measured placement in en and ar); a11y as B6 (`label` named once, disabled span unnamed, `description` always described, no native `title`)
- [ ] AC-5 Tests in B9 and C6 exist and pass; `npm run typecheck`, `npm run test:web` (3 full runs, default timeouts), `npm run component-tokens`, `npm run sync`, `npm run docs:check` pass
- [ ] AC-6 Exported from `src/index.ts`; README status row updated; nothing outside C5 changed (Icon button and Text field untouched)

---

### C8 Execution log (filled by the Executor)

| Field | Value |
|---|---|
| Agent | Codex |
| Date | 2026-10-24 |
| Built | Public React + MUI `Tooltip` with logical placement, label / description semantics, controlled and uncontrolled state, token-owned styling and motion, reduced motion, disabled anchors, warnings and package exports; 26 contract tests cover theme, locale, placement, interaction and accessibility. |
| Files changed | `src/components/tooltip/Tooltip.tsx`; `src/components/tooltip/tooltip.tokens.ts`; `src/components/tooltip/Tooltip.test.tsx`; `src/components/tooltip/index.ts`; `src/index.ts`; `components/tooltip/tooltip.md`; `3-web-components/README.md`; `CHANGELOG.md` |
| Checks | `npm run component-tokens` ✓; `npm run sync` ✓ READY; `npm run docs:check` ✓; `npm run typecheck` ✓; `npm run test:web` ✓ 133/133 in 3 consecutive full runs |

**Deviations from the plan or spec** (with reason — the Planner updates the spec if accepted):
- none

**Questions for the Planner:**
- none

---

## D · Figma build

> How to build Part B in Figma. The Figma Agent receives this through the generated `figma-tooltip-contract.md`.

> Written by the Planner (Claude) together with Part C. Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> Values come from the spec [Part B](#b--spec) B2–B4; never write values here.
> **One file per platform (D-12).** Builds the Web set in **Biowave DS — Web Components**.

| Field | Value |
|---|---|
| Component | Tooltip |
| Figma file | **Biowave DS — Web Components** (`_sync/figma-files.json` › `web`) — never the Foundations file |
| Page / section | `↳ Tooltip` › sections `Tooltip` and `Tooltip — Documentation` |
| Mode | **Create new.** No legacy Tooltip set to keep |
| Depends on | Docs examples (pages 03, 04, 08, 09) use the Icon Button set in this file as the anchor; if it is not built yet, finish Phase 1 and report those examples blocked in D11 |
| Plan version | 1 · 2026-10-23 |

### D1 Rules for this build

Same as [Button D1](../button/button.md#d1-rules-for-this-build): library first, every value bound, no local variables or styles. Tooltip has **no component tokens** (P-04), so bind directly to the Foundations library variables listed in the contract (§3); `figma-read-tokens.js` lint must still report 0.
- Text uses the published text styles `Web/{en|ar}/label/sm` (EN variant → `en`, AR variant → `ar`).
- No effect style (no shadow) and no stroke.

### D2 Component structure

```
❖ Tooltip                 ← published component set (Language)
```

### D3 Layer tree and auto layout

```
Tooltip                  ↔ horizontal · pad-inline {B2 spacing/md} · pad-block {B2 spacing/xs}
│                          width: hug · max width {B2 size/container/xxs} · height: hug
│                          radius {B2 radius/sm} · fill {B3 color/surface/inverse} · no stroke · no effect
└── label                T text style Web/{en|ar}/label/sm · fill {B3 color/text/neutral/inverse}
                           TEXT `Label` · width: fill (wraps at the max width) · align start · no truncation
```

Wireframe of the result (LTR):

```
┌───────────────────────┐
│ Edit device            │
└───────────────────────┘
   ①   ②
```

### D4 Properties

| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `Label` | TEXT | | `Edit device` | `title` | the text |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | Figma only; code takes language and direction from the provider |

`placement` and `purpose` are not Figma properties: placement has no visual difference on the tooltip itself (no arrow) and purpose is semantics only. Docs page 03 shows the four placements next to an anchor.

### D5 Variants to generate

- Axes: `Language` = **2** variants (`Language=EN` with `Edit device`, `Language=AR` with `تعديل الجهاز`)
- No `State` axis (no hover, pressed, focus or disabled style on the tooltip), no `Direction` axis (the `Language` variant carries it)
- Grid of the raw set: one row, `EN` then `AR`; gap `spacing/xl`

### D6 States, interactions and motion

No prototype interactions on the set. Docs page 04 shows the B4 table with `Doc/Motion row` (hover delay, enter fade, exit fade, reduced motion) and two frames: anchor alone, anchor with the tooltip shown.

### D7 RTL

Method: the `Language=AR` variant. Text aligned start (right), Arabic copy from A6. Nothing mirrors inside the tooltip. Docs page 08 shows `placement=start` and `end` in EN and AR next to an Icon Button anchor (the tooltip changes side, the glyph does not mirror).

```
LTR   [◆] ┌ Edit device ┐            placement=end
RTL   ┌ تعديل الجهاز ┐ [◆]            placement=end
```

### D8 Documentation pages

All 12 standard pages (template D8 + [`2-foundations/figma-doc-kit.md` › Page layouts](../../../2-foundations/figma-doc-kit.md#page-layouts)) in section `Tooltip — Documentation`, frames `Tooltip / 00 Component sheet` … `Tooltip / 11 Changelog` (skip `10`, version 1.0). Built only from the Doc Kit; if it is missing, finish Phase 1 and report "docs waiting for Doc Kit".

Page notes for Tooltip:
- 01 Introduction: Light + Dark panels, each with an Icon Button anchor and its tooltip shown above
- 03 Variations: `placement` (four positions around one anchor), `purpose` (label on an Icon Button, description on a Button), long text wrapping at the max width (EN and AR)
- 05 Usage: the A7 pairs, built with live instances
- 07 Platform: Desktop frame; hover and keyboard focus notes from A8
- 09 Accessibility: reading order example for `label` vs `description`, Esc note, contrast pair

Component description: "Short text that names an icon-only control or adds a one-line hint. Plain text only. Spec: 3-web-components/components/tooltip/tooltip.md".

### D9 Code Connect

- File: `3-web-components/src/components/tooltip/Tooltip.figma.tsx`
- Mapping: D4 (`Label` → `title`). Publish after the code and Figma reviews are both `Approved`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Component set `Tooltip` and layer names match D2–D3 and A2
- [ ] F-AC-2 Properties match D4 exactly (names, types, values, defaults)
- [ ] F-AC-3 Variant count = 2 (D5)
- [ ] F-AC-4 Zero raw values: fill, padding, radius, max width and text bound (QA lint report attached)
- [ ] F-AC-5 Correct in Light and Dark (variable mode switch only)
- [ ] F-AC-6 AR variant per D7; Arabic copy wraps without truncation
- [ ] F-AC-7 Component description filled; no prototype interactions on the set (D6)
- [ ] F-AC-8 Values match B2–B3 one by one (redline check)
- [ ] F-AC-9 Every documentation page in D8 exists, in order, built only from Doc Kit components with live instances (or reported blocked in D11)

---

### D11 Execution log (filled by the Figma Agent)

| Field | Value |
|---|---|
| Agent / stages run | |
| Date | |
| Node IDs | |
| QA report | |

**Deviations:** none
**Questions for the Planner:** none

---

## E · Review

> One block per review round, newest first.

### E1 Summary

| Round | Date | Code verdict | Figma verdict |
|---|---|---|---|
| — | — | not reviewed | not reviewed |

---

## F · Changelog

> Changes to this component on this platform. Every entry also gets one line in the root `CHANGELOG.md`.

### F0 Changes from previous version

None — version 1.0. Filled when the version is above 1.0; it feeds Figma doc page 10.

### F1 Guidelines changelog

| Version | Date | Change | Migration | Author |
|---|---|---|---|---|
| 1.0 | 2026-10-23 | Initial | — | Planner (Claude) |

### F2 Spec changelog

| Version | Date | Change | Breaking | Migration |
|---|---|---|---|---|
| 1.0 | 2026-10-23 | Initial. Tokens and timings taken from the approved Icon button temporary tooltip (Icon button B3.4 and B4) plus max width `size-container-xxs` | No | Icon button and Text field help tooltip switch to `Tooltip` in their own follow-up plans (C2) |

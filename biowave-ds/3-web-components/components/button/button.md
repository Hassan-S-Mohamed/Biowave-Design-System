# Button · زر — Web

> **One file for Button on Web:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- web button`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Button · زر |
| Summary | Triggers an action with a clear level of emphasis, from primary submission to a quiet inline action. |
| Summary (ar) | ينفّذ إجراءً بمستوى واضح من الأهمية، من الإرسال الأساسي إلى الإجراء النصي الهادئ. |
| Parts | Container · label · leading/trailing icon · spinner · focus ring |
| Parts (ar) | الحاوية · التسمية · أيقونة البداية/النهاية · مؤشر التحميل · حلقة التركيز |
| Platform | Web · React + MUI |
| Built on | MUI `Button` (native `<button>` / `<a>`), styled entirely from Biowave tokens. MUI palette colors, elevation and ripple are not used |
| Import | `import { Button } from '@biowave/web'` |
| Figma | **Biowave DS — Web Components** › `↳ Button` (legacy reference: Foundations `3998:4847`) · build: [Part D](#d--figma-build) |
| Version | 1.1 · 2026-10-18 |
| Plan | Finished |
| Code | Built |
| Figma build | Planned |
| Review | Round 3 · 2026-10-20 · Approved |
| Source code | [`src/components/button/`](../../src/components/button/) |
| Tokens | — (no component tokens yet) |
| Contracts | [`button-contract.md`](button-contract.md) · [`figma-button-contract.md`](figma-button-contract.md) — generated, never edited |
| Docs page | [`button.html`](button.html) |

## Contents

[A · Guidelines](#a--guidelines) · [B · Spec](#b--spec) · [C · Code plan](#c--code-plan) · [D · Figma build](#d--figma-build) · [E · Review](#e--review) · [F · Changelog](#f--changelog)

---

## A · Guidelines

> What it is and when to use it — designers, PMs. Identical on Web, Tablet and Mobile except **A8** (checked by `npm run docs:check`).

| | |
|---|---|
| Specs | [Web](#b--spec) · [Tablet](../../../4-tablet-components/components/button/button.md#b--spec) · [Mobile](../../../5-mobile-components/components/button/button.md#b--spec) |
| Figma | `↳ Button` in **Biowave DS — Web Components** · **Tablet Components** · **Mobile Components** (one set per platform file, D-12; keys in `_sync/figma-files.json`) |
| Family | Button · [Icon button](../icon-button/icon-button.md#a--guidelines) · [Split button](../split-button/split-button.md#a--guidelines) · [Button group](../button-group/button-group.md#a--guidelines) |
| Version | 1.0 · 2026-10-16 |

### A1 Overview

A button starts an action the user chose: save a form, approve a request, clock in, add a device. Its label says what will happen. Emphasis (`variant`) and `color` tell the user how important the action is and what it does. One screen area has **one** most-important action.

![Button — light and dark](assets/overview.png)

### A2 Anatomy

```
        ①
┌─────────────────────────────────┐
│   ②[◆]   ③Save changes   ④[▸]   │
└─────────────────────────────────┘
  ⑥ focus ring (keyboard focus only, outside the container)

Loading:
┌─────────────────────────────────┐
│               ⑤◌                │   label hidden, width unchanged
└─────────────────────────────────┘
```

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `container` | Yes | Hit area and fill. Its emphasis and color carry the hierarchy |
| 2 | `leading-icon` | No | Supports the label (e.g. add, download). Never replaces it |
| 3 | `label` | Yes | Says the action, verb first. Single line |
| 4 | `trailing-icon` | No | Shows where the action goes (arrow, external link) |
| 5 | `spinner` | Loading only | Shows that the action is running. Replaces the content in place |
| 6 | `focus-ring` | Focus only | Shows keyboard focus |

### A3 Usage

**When to use**
- To submit, confirm or start something: save, approve, send, clock in, export
- To open a dialog, sheet or flow that completes an action ("Add device")
- As the main and secondary actions of a form, dialog, card or page header

**When not to use** (and what to use instead)
| Situation | Use instead |
|---|---|
| Going to another page with no action (read more, view details in text) | Link |
| Action shown as an icon only (toolbar, table row, close) | [Icon button](../icon-button/icon-button.md#a--guidelines) |
| One main action plus a few related alternatives (Export → PDF, Excel) | [Split button](../split-button/split-button.md#a--guidelines) |
| Choosing one value from a set (Day · Week · Month) | Segmented button |
| Turning a setting on or off | Switch |
| Arranging 2–4 related actions together | [Button group](../button-group/button-group.md#a--guidelines) |

### A4 Options

#### 4.1 `variant` — emphasis
| Value | Looks like | Pick it when |
|---|---|---|
| `filled` | `[■■ Label ■■]` | The **one** most important action in an area (Save, Approve, Clock in) |
| `tonal` | `[▒▒ Label ▒▒]` | An important action that must not compete with the filled one, or the main action in a dense area (card, table toolbar) |
| `outlined` | `[── Label ──]` | Secondary actions next to a filled button (Cancel, Back, Export) |
| `text` | `  Label  ` | Low-emphasis actions: "Clear filters", "Skip", inline actions in cards and dialogs |

#### 4.2 `color`
| Value | Pick it when | Variants allowed |
|---|---|---|
| `brand` | Default. Any normal action | filled · tonal · outlined · text |
| `secondary` | Teal actions where product design asks for a second brand color (e.g. secondary flows in the attendance app). Never next to a brand filled button | filled · tonal · outlined · text |
| `neutral` | Quiet utility actions that should not draw attention (Cancel in a toolbar, Filters) | filled · outlined · text |
| `error` | Destructive actions: delete, remove, revoke access, reject | filled · tonal · outlined · text |
| `inverse` | The button sits on a brand or dark surface (navy side navigation, hero banner, onboarding) | filled · outlined · text |

Success, warning and info are **not** button colors (B-02). Their messages belong to Alert, Snackbar and Chip; the action itself is brand.

#### 4.3 `size`
| Value | Pick it when |
|---|---|
| `sm` | Dense web areas: table toolbars, filters, inline in tables |
| `md` | **Default on web** |
| `lg` | **Default on tablet and mobile**; prominent web actions (empty states, sign-in) |
| `xl` | Tablet and mobile only: the single main action of a screen, usually full width at the bottom (Clock in, Continue) |

Buttons placed side by side always have the same size.

#### 4.4 Icons — `leading-icon` · `trailing-icon`
| Option | Looks like | Pick it when |
|---|---|---|
| none | `[ Save changes ]` | Default. Most buttons need no icon |
| `leading-icon` | `[◆ Add device ]` | The icon makes the action faster to recognise (add, download, upload, print) |
| `trailing-icon` | `[ Next ▸]` | The action moves forward or leaves the app (arrow, open in new) |

#### 4.5 `full-width`
| Value | Pick it when |
|---|---|
| off | Default. The button hugs its label |
| on | Mobile bottom actions, sign-in forms, narrow dialogs and sheets |

**Combination rules**
- Use `leading-icon` **or** `trailing-icon`, not both. A chevron that opens a menu is a [Split button](../split-button/split-button.md#a--guidelines), not a trailing icon.
- `tonal` is not available with `neutral` or `inverse`.
- `xl` is not available on web.
- No icon-only buttons. Use [Icon button](../icon-button/icon-button.md#a--guidelines).
- One `filled` button per area (form, dialog, card, page header). One `error` filled button per view.

### A5 States and behavior

| State | When it happens | What the user sees |
|---|---|---|
| Default | Ready | Fill, border and label of its emphasis and color |
| Hover | Pointer over (web; tablet with a pointer) | Fill darkens a step, or a light state layer appears on non-filled buttons |
| Focus | Keyboard focus | Focus ring outside the container (see [a11y](../../../2-foundations/guidelines/a11y.md)) |
| Pressed | Pointer or finger down, Enter/Space held | Fill darkens one more step |
| Disabled | Action not possible right now | Grey fill and label. Not focusable. Explain why nearby when it isn't obvious |
| Loading | Action running after the press | Spinner replaces the content, width stays the same, further presses are ignored |

**Behavior rules**
- **Loading vs disabled:** use loading after the user pressed and we're waiting (save, sign in). Use disabled only when the action can't be done yet. Prefer keeping the button enabled and showing an error on press over a disabled button with no explanation.
- **Width:** a button hugs its label, except with `full-width`. Loading never changes the width.
- **Label length:** the label is one line and never wraps. If the parent is too narrow, the label truncates with "…". Write short labels so this never happens.
- **Long Arabic text (+20–30% width):** the hug width grows, so leave room in button rows. Don't set fixed widths that only fit English.
- **Double submit:** the action runs once. Loading blocks repeated presses.

### A6 Content

General rules: [content.md](../../../2-foundations/guidelines/content.md) (sentence case, verb first, no "!"). Button-specific:

| Element | Rule | Max length |
|---|---|---|
| `label` | Verb + object. Says the outcome, not the gesture. Same verb as the screen title or dialog question | 3 words · ~24 characters EN |
| `label` (error) | Name what is destroyed: "Delete user", not "Delete" or "Yes" | 3 words |
| `label` (pair) | Cancel is "Cancel" / "إلغاء". Never "No" / "Yes" | — |

| ✓ EN | ✓ AR | ✗ Avoid |
|---|---|---|
| Save changes | حفظ التغييرات | Submit (hides the outcome) |
| Approve request | الموافقة على الطلب | OK / حسنًا |
| Clock in | تسجيل الحضور | Click here / اضغط هنا |
| Delete user | حذف المستخدم | Yes, delete it! |
| Add device | إضافة جهاز | Add new device to the system |
| Cancel | إلغاء | No / لا |

### A7 Do and don't

| ✓ Do | ✗ Don't |
|---|---|
| ![](assets/do-1.png) Use one filled button per area | ![](assets/dont-1.png) Place two filled buttons side by side |
| ![](assets/do-2.png) Pair a filled action with an outlined or text Cancel | ![](assets/dont-2.png) Make Cancel the filled button |
| ![](assets/do-3.png) Use `error` only for destructive actions, with a clear label | ![](assets/dont-3.png) Use red to draw attention to a normal action |
| ![](assets/do-4.png) Show loading in the button that was pressed | ![](assets/dont-4.png) Disable the whole form with no feedback while saving |
| ![](assets/do-5.png) Keep labels to a verb and an object | ![](assets/dont-5.png) Write sentences or end labels with punctuation |
| ![](assets/do-6.png) Use `inverse` on navy and other brand surfaces | ![](assets/dont-6.png) Put a brand filled button on a brand surface |

### A8 Platform notes — Web

```
Web (dialog footer, end-aligned)              Mobile (screen bottom, full width)
┌───────────────────────────────────────┐     ┌─────────────────────────┐
│               [── Cancel ──][■ Save ■]│     │ [■■■■■ Clock in ■■■■■■] │
└───────────────────────────────────────┘     │ [──────  Cancel ──────] │
                                              └─────────────────────────┘
```

| | Web |
|---|---|
| Available | ✓ |
| Default size | `md` |
| Sizes | `sm` · `md` · `lg` |
| Layout | Hugs label, actions end-aligned in rows |
| Interaction | Hover + click + keyboard |
| Touch target | Visual size (≥ 24) |

### A9 Accessibility (design)

- Every button can be reached and pressed with the keyboard (Tab, Enter, Space) and with screen readers in English and Arabic.
- The label is the accessible name. Icons are decorative and are not read.
- Focus is always visible on keyboard focus. On brand surfaces the `inverse` focus ring is used so it stays visible.
- Loading is announced ("Saving…" / "جارٍ الحفظ…"), and the button keeps focus while loading.
- Disabled buttons are not focusable, so the reason must be visible on screen as text, not only in a tooltip.
- Color is never the only signal: destructive buttons also say what they destroy.
- Label contrast meets 4.5:1 and outlines meet 3:1 in light and dark (checked in the token build).

### A10 Related components

- [Icon button](../icon-button/icon-button.md#a--guidelines) — same actions shown as an icon only
- [Split button](../split-button/split-button.md#a--guidelines) — a main action plus a menu of related actions
- [Button group](../button-group/button-group.md#a--guidelines) — arranges several buttons and sets their order and alignment
- Link — navigation inside text
- Segmented button — choose one option from a set

---

## B · Spec

> The contract — API, dimensions, tokens, states, RTL, accessibility. Code and Figma are both reviewed against this part.

### B1 API

#### Button
| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `variant` | enum | `filled` · `tonal` · `outlined` · `text` | `filled` | | Emphasis — A4.1 |
| `color` | enum | `brand` · `secondary` · `neutral` · `error` · `inverse` | `brand` | | A4.2 |
| `size` | enum | `sm` · `md` · `lg` | `md` | | A4.3 (`xl` is touch only) |
| `startIcon` | `ReactNode` | a Material Symbols Rounded glyph (`icons.md`, D-18) | — | | `leading-icon` — A4.4 |
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

### B2 Dimensions

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

### B3 Tokens by part and state

> Machine-readable source: [`button.tokens.json`](button.tokens.json) (component tokens, D-13). It holds exactly these mappings; `npm run component-tokens` fails if they drift. In Figma these become the `Button / …` collections in the Web Components file.

Token names are written without the `color-` prefix where the column header says "color". Disabled is the same for every color of a variant.

#### 3.1 `filled`
| `color` | `container` background · Default / Hover / Pressed | `label` · `spinner` | `leading/trailing-icon` |
|---|---|---|---|
| `brand` | `color-background-brand-default` / `color-background-brand-hover` / `color-background-brand-pressed` | `color-text-on-brand` | `color-icon-on-brand` |
| `secondary` | `color-background-secondary-default` / `color-background-secondary-hover` / `color-background-secondary-pressed` | `color-text-on-secondary` | `color-icon-on-secondary` |
| `error` | `color-background-error-default` / `color-background-error-hover` / `color-background-error-pressed` | `color-text-on-error` | `color-icon-on-error` |
| `neutral` | `color-background-neutral-default` / `color-background-neutral-hover` / `color-background-neutral-pressed` | `color-text-neutral-default` | `color-icon-neutral-default` |
| `inverse` | `color-background-inverse-default` / `color-background-inverse-hover` / `color-background-inverse-pressed` | `color-text-role-brand` | `color-icon-role-brand` |
| Disabled (all) | `color-background-neutral-disabled` | `color-text-neutral-disabled` | `color-icon-neutral-disabled` |

#### 3.2 `tonal`
| `color` | `container` background | State layer · Hover / Pressed | `label` · `spinner` | icons |
|---|---|---|---|---|
| `brand` | `color-background-brand-subtle` | `color-overlay-hover` / `color-overlay-pressed` | `color-text-role-brand` | `color-icon-role-brand` |
| `secondary` | `color-background-secondary-subtle` | same | `color-text-role-secondary` | `color-icon-role-secondary` |
| `error` | `color-background-error-subtle` | same | `color-text-role-error` | `color-icon-role-error` |
| Disabled (all) | `color-background-neutral-disabled` | — | `color-text-neutral-disabled` | `color-icon-neutral-disabled` |

#### 3.3 `outlined`
| `color` | `container` background | `container` border | State layer · Hover / Pressed | `label` · `spinner` | icons |
|---|---|---|---|---|---|
| `brand` | `color-background-transparent` | `color-border-brand` | `color-overlay-hover` / `color-overlay-pressed` | `color-text-role-brand` | `color-icon-role-brand` |
| `secondary` | same | `color-border-secondary` | same | `color-text-role-secondary` | `color-icon-role-secondary` |
| `error` | same | `color-border-error` | same | `color-text-role-error` | `color-icon-role-error` |
| `neutral` | same | `color-border-strong` | same | `color-text-neutral-default` | `color-icon-neutral-default` |
| `inverse` | same | `color-border-inverse` | same | `color-text-on-brand` | `color-icon-on-brand` |
| Disabled (all) | same | `color-border-disabled` | — | `color-text-neutral-disabled` | `color-icon-neutral-disabled` |

#### 3.4 `text`
Same as `outlined` without the border.

#### 3.5 Focus
| Part | Property | Token |
|---|---|---|
| `focus-ring` | color | `color-border-focus` (`inverse`: `color-border-inverse`) |
| `focus-ring` | width · offset | `border-width-focus` · `border-focus-offset` |

The **state layer** is a second fill painted above the container fill (web: `background-image: linear-gradient(var(--bw-color-overlay-hover), var(--bw-color-overlay-hover))`). Filled buttons never use a state layer; they switch to the solid `-hover`/`-pressed` tokens.

Dark theme: same tokens, values switch automatically. No exceptions.

### B4 States and transitions

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

### B5 RTL

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

### B6 Accessibility (implementation)

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

### B7 Examples

```tsx
import { Button } from '@biowave/web';
import Icon from '@mui/material/Icon';   // until the Biowave Icon ships (D-18)

// Dialog footer: one filled + one outlined
<Button variant="outlined" color="neutral">Cancel</Button>
<Button type="submit" loading={saving} loadingLabel="Saving…">Save changes</Button>

// Destructive
<Button color="error">Delete user</Button>

// With an icon, small, in a table toolbar
<Button size="sm" variant="tonal" startIcon={<Icon baseClassName="material-symbols-rounded">add</Icon>}>Add device</Button>

// Arabic (direction and fonts come from BiowaveProvider locale="ar" — no extra props)
<Button>حفظ التغييرات</Button>

// On a navy surface
<Button color="inverse" variant="outlined">Learn more</Button>
```

### B8 Figma

Structure, properties, the Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

- [ ] Renders every allowed `variant` × `color` × `size` in light + dark and en + ar (snapshot of computed CSS variables per part, B3)
- [ ] Every state in B4: hover, pressed (`:active`), focus-visible, disabled, loading
- [ ] Loading: `aria-busy`, `aria-disabled`, still focusable, `onClick` not called, width unchanged, status announced once
- [ ] Disabled: not focusable, `onClick` not called; `href` + disabled does not navigate
- [ ] Each invalid combination in B1 warns once and renders its fallback
- [ ] `startIcon` directional icon mirrors under `dir="rtl"`; non-directional does not
- [ ] axe: no violations for each variant in both themes; keyboard table in B6 (Enter, Space, Tab)
- [ ] No raw values: the component file contains no hex, px, ms or font names (lint test)

---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `button-contract.md`.

> Written by the Planner (Claude). Executed by any agent. Reviewed by Claude against this file.
> Executor: read `AGENTS.md`, `3-web-components/README.md`, this file and the spec [Part B](#b--spec). Nothing else unless linked here.
> **The spec is the contract.** This plan says how to build it.

| Field | Value |
|---|---|
| Component | Button |
| Platform | Web (React + MUI) |
| Plan version | 1.2 · 2026-10-19 |

### C1 Goal

`import { Button } from '@biowave/web'` renders every allowed `variant` × `color` × `size` from B1–B3 using only Biowave tokens, behaves as B4–B6 in light/dark and en/ar, and is covered by the tests in B9. This is also the **first web component**, so this plan sets up the test tooling every later component reuses.

### C2 Scope

**In scope**
- [ ] C1 API (all props) · C2 Dimensions · C3 Tokens · C4 States · C5 RTL · C6 Accessibility · C9 Tests
- [ ] One-time setup: install dependencies and the web test tooling (C5 below)
- [ ] Shared test tooling fix (plan 1.2, review finding 11): a fresh emotion cache per test, flushed after each test (C3 › Test tooling). Shared tooling: it also unblocks Icon button, Split button and Text field, whose tests use the same `renderWithBiowave`

**Out of scope (do not build)**
- Icon button, Split button, Button group (separate plans)
- A shared `Spinner`/`Progress` component (Day 5). Build a private spinner inside the button folder (C3)
- `xl` size (touch only)
- Storybook / docs site

### C3 Approach

- **Base:** wrap MUI `Button` (`@mui/material/Button`) with `disableRipple`, `disableElevation`, `variant="text"` and `color="inherit"`, so MUI adds no colors, shadows or ripple of its own. All visual styling comes from one `styled()` wrapper that reads our props through a transient prop object (`$variant`, `$color`, `$size`) — never forwarded to the DOM.
- **Token map:** must equal [`button.tokens.json`](button.tokens.json) (add a test that loads `button.tokens.json` and compares every entry). `button.tokens.ts` exports a typed table `variant → color → { bg, bgHover, bgPressed, stateLayer, border, label, icon }` whose values are `cssVars.*` references (B3). The styled wrapper only reads this table. No values in the component file.
- **State layer** (tonal, outlined, text): `background-image: linear-gradient(<overlay>, <overlay>)` on `:hover` and `:active`, over the variant's `background-color`.
- **Focus:** remove MUI's focus visual; apply B6 outline on `&:focus-visible` (and `&.Mui-focusVisible`). `inverse` uses `cssVars.color.border.inverse`.
- **Typography:** `label` uses the `actionSm|actionMd|actionLg` variant from `biowaveVariants` (font size/line height come from CSS variables, so platform and Arabic switch automatically).
- **Loading:** do **not** use MUI's `loading` prop (it sets `disabled` and loses focus). Implement: wrap children + icons in `.bw-button__content` and hide it with **`opacity: 0` only** while loading (never `visibility` or `display` — the label must stay the accessible name, B2/B6; opacity also gives the B4 fade); render the private `ButtonSpinner` absolutely centered and fade it with `opacity` (+ `pointer-events: none`); set `aria-busy`, `aria-disabled`; swallow `onClick`. The `role="status"` live region that receives `loadingLabel` is a **sibling outside** the `<button>`/`<a>` (wrap both in a fragment). It is **mounted for as long as the Button is mounted and empty while idle**; `loadingLabel` is written into it when `loading` turns on and removed when it turns off (screen readers often skip a live region that appears with its text already inside — review finding 13). It is styled with the standard visually-hidden pattern (clip, 1px, overflow hidden) from a shared internal helper `src/internal/visuallyHidden.ts`, so it is announced but never part of the button's name.
- **ButtonSpinner** (private, `ButtonSpinner.tsx`): MUI `CircularProgress` with `size` = icon size token, `color="inherit"`, `disableShrink`. One turn per `cssVars.motion.duration.progress` (B4) — not `2xl`. Will be replaced by the Progress component on Day 5 (leave a `// TODO(progress)` comment).
- **RTL icons (B5):** the consumer marks a directional icon with `className="bw-icon-directional"` on the icon element (documented main way) or `mirrorInRtl` on a custom icon element. In `Button.tsx`: detect either marker on `startIcon`/`endIcon`, strip `mirrorInRtl` **whenever the prop is present** (`'mirrorInRtl' in icon.props`, so `mirrorInRtl={false}` is stripped too — finding 15) with `React.cloneElement(icon, { mirrorInRtl: undefined })`, strip the class from the icon, and put `bw-icon-directional` on the wrapper `.bw-button__icon` only. The rule is scoped to the wrapper — `[dir='rtl'] & .bw-button__icon.bw-icon-directional { transform: scaleX(-1) }` — so exactly one element is flipped. Export a small helper type so `mirrorInRtl` on a custom element is not a TS error. Document both ways in the component's JSDoc.
- **Disabled ↔ enabled (B4):** colours change instantly both ways — apply `transition: none` (or `transition-duration: var(--bw-motion-duration-instant)`) while disabled and on the frame the button is re-enabled; hover/press transitions are unchanged.
- **Invalid combinations:** a `warnOnce(key, message)` helper (`src/internal/warnOnce.ts`, dev only via `process.env.NODE_ENV !== 'production'`). Fallbacks exactly as B1.
- **Test tooling — emotion caches (plan 1.2, finding 11).** Cause: `BiowaveProvider` creates its two emotion caches once per module, non-speedy in tests, so every CSS rule becomes its own `<style>` tag that `cleanup()` never removes; axe and user-event slow down with the tag count. Fix, following MUI's own test renderer (`@mui/internal-test-utils` `createRenderer`: a new emotion cache in `beforeEach`, its `sheet.tags` removed in `afterEach`) and the `@emotion/cache` `speedy` option (one `<style>` tag per cache, rules added with `insertRule`):
  1. `2-foundations/web/src/BiowaveProvider.tsx`: move the two `createCache` calls into an exported factory `createBiowaveEmotionCaches(options?: { speedy?: boolean }): BiowaveEmotionCaches` (`{ ltr, rtl }`, same keys `bw` / `bw-rtl`, `prepend: true`, RTL stylis plugins `[prefixer, rtlPlugin]`; `speedy` passed through, `undefined` keeps emotion's default). The module-level default is `createBiowaveEmotionCaches()`, so app behaviour does not change. Add an optional prop `emotionCaches?: BiowaveEmotionCaches` (JSDoc: "Advanced — tests and isolated roots. Defaults to the shared Biowave caches"); the provider uses `emotionCaches[direction]`. Export the factory and the type from `2-foundations/web/src/index.ts`.
  2. `3-web-components/src/test/render.tsx`: keep one test cache pair per test — create it lazily with `createBiowaveEmotionCaches({ speedy: true })` on the first `renderWithBiowave` of a test and pass it as `emotionCaches`; export `resetTestEmotionCaches()` that calls `sheet.flush()` on both caches (removes their tags) and drops the pair, so the next test starts with a fresh cache (fresh `inserted` map — styles are inserted again, never assumed).
  3. `3-web-components/src/test/setup.ts`: in the existing `afterEach`, call `resetTestEmotionCaches()` **after** `cleanup()`.
  4. No test file creates its own emotion cache or `BiowaveProvider`; all render through `renderWithBiowave`. Do not raise timeouts, do not change `vitest.config.ts` (no `testTimeout`, no `fileParallelism` change).
  Planner probe (2026-10-19, clean Linux copy, 2 CPUs, Node 22.22.0, all 7 raised timeouts in the web tests removed, not committed): baseline 73/77 in 2 m 32 s; speedy only (module caches) 74/77 in 1 m 20 s — still fails, because rules still pile up across tests; fresh cache per test without speedy 77/77 in 44 s; **fresh cache per test + speedy 77/77 in 35 s** (chosen). Slowest tests with the chosen fix: Text field matrix 2.61 s, Split button matrix 1.73 s, Button matrix 1.57 s, Button axe light / dark 1.04 s / 0.93 s (were 15.25 s / 15.09 s), Icon button axe light 0.12 s (was 6.21 s ✗), Split button keyboard 0.49 s (was 5.70 s ✗), Text field axe 0.93 s (was 6.45 s ✗). `npm run typecheck` ✅; no "problem inserting the following rule" errors from speedy `insertRule`.
- **Gotchas:** MUI `Button` uppercases text by default → `textTransform: 'none'`. MUI min-width (64) → `minWidth: 0`. MUI adds `padding` per size → override with tokens. With `href`, MUI renders `<a>`; disabled anchors need `aria-disabled` + `tabIndex=-1` + `preventDefault`.

### C4 Token gaps

None. Added on 2026-10-16 before this plan (Foundations 1.1.0): `size-control-height-*`, `spacing-control-padding-inline-*`, `spacing-control-gap-*`, `color-background-inverse-*`, `color-border-inverse`, `color-overlay-hover`, `color-overlay-pressed`.

### C5 Files to create / change

```
3-web-components/package.json                         change: add devDependencies (below) + "test": "vitest run"
3-web-components/vitest.config.ts                     new: jsdom, setupFiles
3-web-components/src/test/setup.ts                    new: @testing-library/jest-dom, vitest-axe matchers
3-web-components/src/test/render.tsx                  new: renderWithBiowave(ui, { theme: 'light'|'dark', locale: 'en'|'ar' }) using BiowaveProvider
                                                      change (1.2): per-test speedy emotion caches + resetTestEmotionCaches() (C3 › Test tooling)
3-web-components/src/test/setup.ts                    change (1.2): afterEach → cleanup() then resetTestEmotionCaches()
3-web-components/src/test/render.test.tsx             new (1.2): tooling test for the cache reset (C6)
2-foundations/web/src/BiowaveProvider.tsx             change (1.2): createBiowaveEmotionCaches() + optional emotionCaches prop; default unchanged
2-foundations/web/src/index.ts                        change (1.2): export createBiowaveEmotionCaches, type BiowaveEmotionCaches
3-web-components/src/internal/warnOnce.ts             new
3-web-components/src/components/button/Button.tsx     new
3-web-components/src/components/button/button.tokens.ts   new
3-web-components/src/components/button/ButtonSpinner.tsx  new (private, not exported from the package)
3-web-components/src/components/button/Button.test.tsx    new
3-web-components/src/components/button/index.ts       new: export { Button } and types ButtonProps, ButtonVariant, ButtonColor, ButtonSize
3-web-components/src/index.ts                         change: uncomment the Button export
3-web-components/README.md                            change: status table row; (1.2) Stack › Tests line names the per-test emotion cache reset
package.json (root)                                   change: "test:web": "npm test -w 3-web-components"
```

devDependencies to add to `3-web-components`: `@mui/material@^9.5`, `material-symbols` (D-18; was `@mui/icons-material`), `@emotion/react`, `@emotion/styled`, `react@^19`, `react-dom@^19`, `@types/react`, `@types/react-dom`, `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`, `vitest-axe`. Run `npm install` at the repo root first (no `node_modules` exist yet; `npm run typecheck` currently fails only because MUI is not installed).

### C6 Tests

Implement every item in B9, plus:
- [ ] `renderWithBiowave` works for the 4 theme × locale combinations (used by all later components)
- [ ] A "no raw values" test: read `Button.tsx`, `button.tokens.ts` and `ButtonSpinner.tsx` as text and fail on `/#[0-9a-f]{3,8}\b|\d+px|\d+ms|\bInter\b|\bIBM Plex\b/i` (word boundaries — no stripping of other words)
- [ ] Loading keeps the name: with `loading`, `computeAccessibleName(button)` = the label (e.g. "Save changes"), and the `role="status"` element is **not** inside the button
- [ ] RTL mirrors once: in `ar`, for an icon marked with the class and one marked with `mirrorInRtl`, exactly one element in the icon path carries the flip rule, and `mirrorInRtl` never reaches the DOM (no React warning)
- [ ] Token assertions per variant × color: container, label, icon and border rules use the `cssVars` from B3 (assert the generated CSS rules, not jsdom layout); states and axe run for every allowed color, not only `brand`
- [ ] Spinner uses `motion-duration-progress`; under reduced motion its animation duration stays non-zero
- [ ] No layout claims in jsdom (e.g. "width unchanged while loading") — keep those as manual checks in C8
- [ ] (1.2) Tooling, in `src/test/render.test.tsx`: after a test that renders through `renderWithBiowave`, the next test starts with no `style[data-emotion]` tags from the previous test, and a render after the reset still produces the expected CSS rules (styles are re-inserted into the new cache)
- [ ] (1.2) Live region (finding 13): the `role="status"` sibling exists and is empty before `loading`; after `loading` turns on it contains `loadingLabel`; after it turns off it is empty again and still mounted. Screen-reader announcement is a manual check in C8 (VoiceOver or NVDA, EN + AR)
- [ ] (1.2) `mirrorInRtl={false}` on a custom icon that spreads its props does not reach the DOM and causes no React warning (finding 15)
- [ ] (1.2) Re-enable (finding 16): after the next animation frame the instant-duration rule is gone and the `motion-duration-sm` transition applies again
- [ ] (1.2) No per-test timeout arguments in `Button.test.tsx` (finding 12); every Button test passes under the 5 s default

### C7 Acceptance criteria (the Reviewer checks exactly these)

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
- [ ] AC-11 (finding 11) Test tooling per C3 › Test tooling: `createBiowaveEmotionCaches` + optional `emotionCaches` prop in Foundations (default behaviour unchanged), per-test speedy caches in `render.tsx`, `resetTestEmotionCaches()` after `cleanup()` in `setup.ts`, tooling test in `render.test.tsx`. `npm run test:web` **as configured** passes **77/77** (or the full count, if tests are added) with the default 5 s timeout, no `testTimeout` / `fileParallelism` change
- [ ] AC-12 (finding 12) The raised timeouts at `Button.test.tsx:202` (30 s), `:344` (20 s) and `:610` (20 s) are removed; every Button test is well under 5 s (planner probe: slowest 1.57 s)
- [ ] AC-13 (finding 13) Live region always mounted, empty when idle, `loadingLabel` written on loading (C3 › Loading, C6)
- [ ] AC-14 (findings 15, 16) `mirrorInRtl` stripped whenever present; re-enable test asserts the transition comes back (C6)
- [ ] AC-15 (finding 17) The C8 "Fix round 1" entry lists every command with ✓/✗ and real numbers: `npm run typecheck`, `npm run test:web` (passed/total, duration), `npm run docs:check`, `npm run sync`; plus the slowest Button test times and the manual checks (loading width, screen-reader announcement)

**Fix round 1 — Executor task list** (one list; nothing else is in scope):
1. #11 Test tooling — C3 › Test tooling steps 1–4. Files: `2-foundations/web/src/BiowaveProvider.tsx`, `2-foundations/web/src/index.ts`, `3-web-components/src/test/render.tsx`, `3-web-components/src/test/setup.ts`, new `3-web-components/src/test/render.test.tsx`. Shared tooling: it also unblocks Icon button, Split button and Text field; do not edit their files (their own raised timeouts — `IconButton.test.tsx:86`, `SplitButton.test.tsx:93, 272`, `ButtonGroup.test.tsx:254` — are removed in their own fix steps; the planner probe shows they pass without them)
2. #12 Remove the three raised timeouts in `3-web-components/src/components/button/Button.test.tsx`
3. #13 Live region always mounted — `3-web-components/src/components/button/Button.tsx` + test
4. #15 Strip `mirrorInRtl` when present (incl. `false`) — `Button.tsx` + test
5. #16 Re-enable test asserts the transition returns — `Button.test.tsx`
6. #17 C8 "Fix round 1" entry with every command result (AC-15); `3-web-components/README.md` › Stack › Tests line; one `CHANGELOG.md` entry (tooling + Button)

Files the Executor may touch in this fix round: exactly the files named in 1–6, plus C8 of this file. Nothing else.

---

### C8 Execution log (filled by the Executor)

| Field | Value |
|---|---|
| Agent | OpenAI Codex |
| Date | 2026-10-16 |
| Files changed | `package.json`; `package-lock.json`; `3-web-components/package.json`; `3-web-components/vitest.config.ts`; `3-web-components/src/test/setup.ts`; `3-web-components/src/test/render.tsx`; `3-web-components/src/internal/warnOnce.ts`; `3-web-components/src/components/button/Button.tsx`; `3-web-components/src/components/button/button.tokens.ts`; `3-web-components/src/components/button/ButtonSpinner.tsx`; `3-web-components/src/components/button/Button.test.tsx`; `3-web-components/src/components/button/index.ts`; `3-web-components/src/index.ts`; `3-web-components/README.md`; `4-tablet-components/pubspec.yaml`; `4-tablet-components/pubspec.lock`; `4-tablet-components/test/theme_test.dart`; `5-mobile-components/pubspec.yaml`; `5-mobile-components/pubspec.lock`; `5-mobile-components/test/theme_test.dart`; `_sync/build-stamp.json` (generated by required `npm run tokens`) |

**Deviations from the plan or spec** (with reason — the Planner updates the spec if accepted):
- With the user's explicit follow-up approval, fixed the pre-existing tablet/mobile Arabic theme test infrastructure so the required AGENTS.md §5 commands pass. Added the Flutter SDK localization dependency and standard Material localization delegates; no tablet/mobile component implementation changed.

**Questions for the Planner:**
- none

#### Round 2 — 2026-10-18

| Field | Value |
|---|---|
| Agent | OpenAI Codex |
| Files changed | `3-web-components/src/components/button/Button.tsx`; `3-web-components/src/components/button/ButtonSpinner.tsx`; `3-web-components/src/components/button/button.tokens.ts`; `3-web-components/src/components/button/Button.test.tsx`; `3-web-components/src/components/button/index.ts`; `3-web-components/src/internal/visuallyHidden.ts`; `3-web-components/src/index.ts`; `3-web-components/components/button/button.md`; `3-web-components/README.md`; `CHANGELOG.md` |
| Tests | 24 tests in `Button.test.tsx`; full variant × color × size × theme × locale render matrix, every allowed color/state, loading/a11y, RTL, invalid combinations, axe and keyboard coverage |
| Could not do | Loading width stability is intentionally a manual check because jsdom has no layout; the implementation keeps content in flow with opacity and absolutely centers the spinner. No automated layout claim was added. |
| Questions | none |

#### Fix round 1 — 2026-10-20

| Field | Value |
|---|---|
| Agent | OpenAI Codex |
| Files changed | `2-foundations/web/src/BiowaveProvider.tsx`; `2-foundations/web/src/index.ts`; `3-web-components/src/test/render.tsx`; `3-web-components/src/test/setup.ts`; `3-web-components/src/test/render.test.tsx`; `3-web-components/src/components/button/Button.tsx`; `3-web-components/src/components/button/Button.test.tsx`; `3-web-components/README.md`; `3-web-components/components/button/button.md`; `CHANGELOG.md` |
| Deviations | none |

| Finding | What changed (`file:line`) | Test that proves it |
|---|---|---|
| #11 | Added `createBiowaveEmotionCaches()` and provider injection (`2-foundations/web/src/BiowaveProvider.tsx:18`, `:44`, `:64`); exported the API (`2-foundations/web/src/index.ts:4`); added one lazy speedy cache pair per test and flushing after cleanup (`3-web-components/src/test/render.tsx:14`, `src/test/setup.ts:26`) | `src/test/render.test.tsx:21` proves prior tags are removed and rules are re-inserted; full `npm run test:web` passed 79/79 with the configured default timeout |
| #12 | Removed all three per-test timeout arguments (`3-web-components/src/components/button/Button.test.tsx:179`, `:275`, `:631`) | Button passed 24/24 under the default timeout; slowest Button test was 1.001 s |
| #13 | Kept the sibling status region mounted and empty while idle (`3-web-components/src/components/button/Button.tsx:327`) | `Button.test.tsx:374` proves idle → loading label → idle on the same live-region element |
| #15 | Omitted `mirrorInRtl` whenever the prop key is present, including `false` (`Button.tsx:190`) | `Button.test.tsx:588` covers true and false markers, no DOM attribute, no React warning, and one wrapper flip only for true |
| #16 | Asserted the re-enabled frame is instant and the normal transition returns after the next animation frame (`Button.test.tsx:478`) | `uses instant color changes when disabling and restores transitions after re-enabling` |
| #17 | Documented the shared cache lifecycle (`3-web-components/README.md:13`), recorded commands and timings here, and added the root changelog entry | `npm run docs:check` passed |

| Command | Result |
|---|---|
| `npm run docs:check` | ✓ 18 component files; structure, guidelines, status, generated pages, contracts, links and demo tokens OK |
| `npm run typecheck` | ✓ Foundations and Web TypeScript projects |
| `npm run test:web` | ✓ 79/79 tests in 7/7 files; 5.78 s Vitest duration, 6.32 s wall |
| `npm run component-tokens` | ✓ Web 299, Tablet 305 and Mobile 305 mode values |
| `npm run sync` | ✓ READY for component work; 18 non-blocking Figma queue items |

Slowest Button tests in the full suite: render matrix 1.001 s; axe light 625 ms; axe dark 604 ms.

**Manual checks:**
- Loading width: not run in a real browser in this terminal step; no jsdom layout claim was added. The implementation continues to keep content in flow with `opacity` and place the spinner absolutely.
- Screen-reader announcement: not run because VoiceOver/NVDA output is unavailable in this environment. The automated live-region lifecycle and EN/AR default-label tests pass; human announcement verification remains.

**Questions:**
- Human QA: confirm loading width stability and one loading-label announcement with VoiceOver or NVDA in English and Arabic.

---

## D · Figma build

> How to build Part B in Figma. The Figma Agent receives this through the generated `figma-button-contract.md`.

> Written by the Planner (Claude) together with Part C. Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> Figma Agent: read this file, the spec [Part B](#b--spec) (all values) and the [guidelines](#a--guidelines) (anatomy, options, do/don't). Nothing else.
> **Values are never written here.** Sizes, tokens, states and timings come from B2–B4.
> **One file per platform (D-12).** This file builds the Web Button set in **Biowave DS — Web Components**. Tablet and Mobile build their own sets in their own files from their own Part D. Within each file there is one Button family (B-05).

| Field | Value |
|---|---|
| Component | Button |
| Platform | Web |
| Figma file | **Biowave DS — Web Components** (`_sync/figma-files.json` › `web`) |
| Page / section | `↳ Button` › section `Button` |
| Mode | **Create new.** Legacy reference (read only, do not edit): Foundations file › `↳ Button` › `.Button _en` `3998:4847` and `.Button _ar` `4000:712` |
| Plan version | 1 · 2026-10-16 |

### D1 Rules for this build

0. **Library first, component tokens only (D-13).** Text styles, effect styles (`Focus/Ring`, `Focus/Ring Inverse`) and icons come from the published library **Biowave DS — Foundations**. Visual values bind to the **Button component tokens** already in this file (created from [`button.tokens.json`](button.tokens.json) by the sync tooling): `Button / Size` (modes `sm`·`md`·`lg`), `Button / Filled` · `Button / Tonal` · `Button / Outlined` · `Button / Text` (modes = colors), `Button / Focus`. Each variant sets the explicit mode of its collections (e.g. `Variant=Filled, Color=Brand, Size=MD` → `Button / Filled`=`brand`, `Button / Size`=`md`). **Never create variables or styles** in this file; if a value is missing, stop and ask the Planner (it is added to `button.tokens.json` → synced).
1. **Every value is bound.** Fills, strokes, radius, padding, gap, height → variables; text → text styles; focus → effect style. No raw hex / px. Opacity 0 for the hidden label in Loading is the only literal allowed.
2. **Spec token → component token:** B3 table and `button.tokens.json` name the same semantic tokens; bind the component token that aliases it (`container/default`, `label/default`, `state-layer/hover`, `border/default`, `height`, `padding-inline`, `gap`, `icon`, `radius`, `border-width`, `Button / Focus › color`). Semantic variables are never bound directly. For reference, spec names map to Foundations variables as: `-` between segments becomes `/`: `color-background-brand-hover` → `1. Themes › color/background/brand/hover`; `size-control-height-md` → `4. Size › size/control/height/md`; `spacing-control-gap-md` → `3. Spacing › spacing/control/gap/md`; `radius-md` → `2. Radius › radius/md`; `border-width-default` → `9. Border › border/width/default`.
   Text styles: `Web/en/action/{sm|md|lg}` and `Web/ar/action/{sm|md|lg}` (they are bound to the Typography variables, so Tablet/Mobile scale comes from the variable mode, not from a different style). Effect: `Focus/Ring`.
3. **Never** bind `_Primitive/*`, `_deprecated/*` or the old `Button size` collection.
4. **Layer names = anatomy part names** (A2): `container` is the component itself, children `leading-icon`, `label`, `trailing-icon`, `spinner`, `state-layer`.
5. Auto layout everywhere. Absolute position only for `state-layer` and `spinner` (both centered, constraints scale).
6. Icons are instances from the **Google · Material Symbols** library (Style=Rounded; D-18, keys in the contract), never detached.

### D2 Component structure

```
❖ Button                         ← component set (published) on page ↳ Button
  └─ ◇ .Button/Spinner           ← private base component (new): ring arc, stroke bound to label color via property override
```

### D3 Layer tree and auto layout

```
Button                    ↔ horizontal · align center/center · gap {B2 gap} · pad-inline {B2 padding-inline} · pad-block 0
│                           height fixed {B2 height} · width hug · radius {B2 radius} · clip content
│                           fill {B3 container background} · stroke inside {B3 border, outlined only} · effect Focus/Ring (State=Focused only)
├── state-layer           ▭ absolute, constraints scale, fill {B3 state layer}; visible only in Hover/Pressed of tonal · outlined · text
├── leading-icon          ◇ Icon instance · size {B2} · fill {B3 icons} · BOOLEAN `Leading icon` · INSTANCE_SWAP `Leading icon glyph`
├── label                 T text style Web/{en|ar}/action/{sm|md|lg} · fill {B3 label} · TEXT `Label` · hug · no wrap
├── trailing-icon         ◇ Icon instance · BOOLEAN `Trailing icon` · INSTANCE_SWAP `Trailing icon glyph`
└── spinner               ◇ .Button/Spinner · absolute centered · size {B2 spinner} · visible only State=Loading
                            (in Loading: leading-icon, label, trailing-icon layer opacity 0, so the width stays the same)
```

```
┌─────────────────────────────────┐
│   [◆]   Save changes    [▸]     │      Loading: ┌─────────────────┐
└─────────────────────────────────┘                │       ◌         │
   ②         ③             ④                       └─────────────────┘
```

### D4 Properties

This table is the source for Code Connect (D9).

| Figma property | Type | Values | Default | Code prop (web) | Code value |
|---|---|---|---|---|---|
| `Variant` | VARIANT | `Filled` · `Tonal` · `Outlined` · `Text` | `Filled` | `variant` | `'filled'` · `'tonal'` · `'outlined'` · `'text'` |
| `Color` | VARIANT | `Brand` · `Secondary` · `Neutral` · `Error` · `Inverse` | `Brand` | `color` | `'brand'` … `'inverse'` |
| `Size` | VARIANT | `SM` · `MD` · `LG` | `MD` | `size` | `'sm'` · `'md'` · `'lg'` |
| `State` | VARIANT | `Default` · `Hover` · `Focused` · `Pressed` · `Disabled` · `Loading` | `Default` | `disabled` / `loading` | `Disabled` → `disabled`; `Loading` → `loading`; others are interaction states, not props |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | Figma only; code takes language and direction from the provider |
| `Label` | TEXT | | `Save changes` (AR variants: `حفظ التغييرات`) | `children` | |
| `Leading icon` | BOOLEAN | | `false` | `startIcon` | present / absent |
| `Leading icon glyph` | INSTANCE_SWAP | preferred: Google · Material Symbols (Rounded) | `add` | `startIcon` | `<Icon baseClassName="material-symbols-rounded">{glyph}</Icon>` |
| `Trailing icon` | BOOLEAN | | `false` | `endIcon` | present / absent |
| `Trailing icon glyph` | INSTANCE_SWAP | preferred: Google · Material Symbols (Rounded) | `arrow_forward` | `endIcon` | |
| — (instance width Fill) | | | | `fullWidth` | not mapped; resizing the instance to Fill = `fullWidth` |

### D5 Variants to generate

- Axes: `Variant × Color × Size × State × Language`
- Allowed `Variant × Color` (B1): Filled/Outlined/Text × all 5 colors (15) + Tonal × Brand/Secondary/Error (3) = **18**
- 18 × 3 sizes × 6 states × 2 languages = **648 variants** (no `XL` on web)
- Grid of the raw set: rows = `Language › Size › Variant › Color`, columns = `State`; gap `spacing/xl`.

#### Legacy mapping (for instance swaps and review; the legacy set is not edited)
| Legacy (Foundations file) | New |
|---|---|
| `Type` Primary · Secondary · Tertiary | `Variant` Filled · Outlined · Text (check visually; report if legacy Secondary looks tonal) |
| `Color` Primary · White · Secondary · Neutral · Error | `Brand` · `Inverse` · `Secondary` · `Neutral` · `Error` |
| `Color` Success · Warning · Info | removed → `Brand` (or `Error` if the label is destructive) |
| `State` Idle · Hovered · Focused · Pressed · Disabled | `Default` · `Hover` · `Focused` · `Pressed` · `Disabled` (+ `Loading`) |
| `Size` Small · Medium · XLarge | `SM` · `MD` · `LG` |
| `.Button _ar` set | `Language=AR` |

#### After this build is `Approved`
1. In the Foundations file: list the instances of `.Button _en` `3998:4847` and `.Button _ar` `4000:712` (report counts per page/file); after product files have swapped to the new library, move both sets to `_Deprecation Ground` with the prefix `_deprecated/`.
2. Move the old documentation frames and product screen frames on the legacy `↳ Button` page into a section `Archive — usage audit 2026-10`.

### D6 States, interactions and motion

Values from B3 (tokens per state) and D4 (transitions).

| Interaction | From → To | Animation |
|---|---|---|
| While hovering | Default → Hover | Smart animate · `motion-duration-sm` · standard easing (B4) |
| While pressing | Hover → Pressed | Smart animate · `motion-duration-xs` |
| On click | Default → Loading (prototype demo only, on the docs page) | Dissolve · `motion-duration-sm` |

Focus is not an interaction in Figma; the `Focused` state shows the ring for docs and handoff.

**Inverse focus ring:** effect style `Focus/Ring Inverse` (Foundations library, created 2026-10-16: ring `color/border/inverse`, gap `color/background/brand/default`). Use it for `Color=Inverse, State=Focused`.

### D7 RTL

Method: `Language=AR` variants. In AR variants: reverse the auto layout order (trailing-icon first, label, leading-icon last, so leading stays at the inline start), text align end, Arabic sample label. Mirror only directional glyphs (B5); the default `Trailing icon glyph` `arrow_forward` is shown mirrored in AR.

```
EN  │  [◆]  Add device          │      │  Next  [▸]  │
AR  │          إضافة جهاز  [◆]  │      │  [◂]  التالي │
```

### D8 Documentation pages

Build the 12 standard pages per `_templates/component.md` D8 + `2-foundations/figma-doc-kit.md` › Page layouts, inside section `Button — Documentation` on `↳ Button` (Web file), frames `Button / 00 Component sheet` … `Button / 11 Changelog` (skip `10`, version 1.0).
**Blocked until the Doc Kit exists** (ROADMAP Day 0.3, `2-foundations/figma-doc-kit.md`). Build D2–D7 first; then stop and report "docs waiting for Doc Kit". Do not draw doc layouts by hand.

Page notes for Button:
- 03 Variations: one block each for `Variant`, `Color` (show the allowed variants per color), `Size`, icons, `fullWidth` (instance set to Fill inside a narrow frame).
- 07 Platform: Desktop + narrow web.
- 09 Accessibility: include `Focus/Ring` and `Focus/Ring Inverse` examples, and the Loading announcement text.

Component description: "Starts an action the user chose. One filled button per area. Spec: 3-web-components/components/button/button.md".

### D9 Code Connect

- File: `3-web-components/src/components/button/Button.figma.tsx`
- Mapping: D4 table. Publish only after code and Figma reviews are both `Approved`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Set `Button` on `↳ Button` in the Web file; base component and layer names match D2–D3 and A2
- [ ] F-AC-2 Properties match D4 exactly (names, types, values, defaults)
- [ ] F-AC-3 Variant count = 648; no `Tonal × Neutral/Inverse`; no Success/Warning/Info; no `XL`
- [ ] F-AC-4 Zero raw values: every fill, stroke, radius, padding, gap, height, text and effect bound (QA lint report attached)
- [ ] F-AC-5 Correct in Light and Dark (variable mode switch only); Typography mode `Web`; zero local variables/styles in the file
- [ ] F-AC-6 AR variants per D7; Arabic labels fit without truncation
- [ ] F-AC-7 Interactions per D6; component description filled; `Focus/Ring` and `Focus/Ring Inverse` library styles applied
- [ ] F-AC-8 Values match B2–B3 one by one (redline check on `MD` and `LG`, every Variant × Color in Default)
- [ ] F-AC-9 Legacy mapping D5 documented in the review; deprecation steps done only after `Approved`
- [ ] F-AC-10 Documentation pages: built when the Doc Kit exists (otherwise reported as blocked)

---

### D11 Execution log (filled by the Figma Agent)

| Field | Value |
|---|---|
| Agent / stages run | build · rtl · qa · document |
| Date | |
| Node IDs | component set `{id}` · `.Button/Spinner` `{id}` · docs section `{id}` |
| QA report | {unbound values: 0 · contrast: pass · …} |

**Deviations** (with reason — the Planner updates the spec if accepted):
- none

**Questions for the Planner:**
- none

---

## E · Review

> One block per review round, newest first.

### E1 Summary

| Round | Date | Code verdict | Figma verdict |
|---|---|---|---|
| 1 | 2026-10-16 | **Changes requested** | not reviewed |
| 2 | 2026-10-19 | **Changes requested** | not reviewed (Figma skipped in workflow config) |
| 3 | 2026-10-20 | **Approved** | not reviewed (Figma skipped in workflow config) |

### E4 Round 3 — 2026-10-20

| Field | Value |
|---|---|
| Plan version reviewed | 1.2 · 2026-10-19 |
| Spec version reviewed | 1.1 |
| Reviewer | Claude |
| Date | 2026-10-20 |
| Verdict | **Approved** |

Inputs: B, C7, C8 (incl. "Fix round 1 — 2026-10-20") and E of this file, and the code changed in commit `e8dc43b` (`git diff e8dc43b~1 e8dc43b`); no uncommitted changes to unit files. Commands run by the Reviewer on this Mac with the repo's installed `node_modules` (Node 24.14.0):

| Command | Result | Time |
|---|---|---|
| `npm run docs:check` | ✅ 18 component files; structure, guidelines, status, generated pages, contracts, links, demo tokens OK | — |
| `npm run typecheck` | ✅ Foundations + Web | — |
| `npm run test:web` (as configured: default 5 s timeout, file-parallel, `vitest.config.ts` unchanged since `4e0d9b8`) | ✅ **79/79** in 7/7 files (2 run: 5.82 s and 6.58 s Vitest duration, 6.4 s wall). Button 24/24 in 3.28 s | 6.4 s |
| `npm run sync` (AC-5) | ✅ READY, exit 0; `web button` code + Figma contracts current; 18 non-blocking Figma queue items | — |

Slowest Button tests (Vitest report): render matrix 979 ms · axe light 647 ms · axe dark 571 ms — all well under 5 s. Round 2 baseline for the same suite: 73/77 in 155.9 s.

Flutter checks are not part of the web unit.

#### Round 2 findings — status

| # | Status | Evidence |
|---|---|---|
| 11 | ✅ Fixed | `createBiowaveEmotionCaches({ speedy })` + `BiowaveEmotionCaches` (`2-foundations/web/src/BiowaveProvider.tsx:18-35`), optional `emotionCaches` prop (`:45`, default `:76`), used at `:94`; exported (`2-foundations/web/src/index.ts:4-11`). Per-test lazy speedy pair + `resetTestEmotionCaches()` flushing both sheets (`3-web-components/src/test/render.tsx:15-27`, passed to the provider `:33-36`); called right after `cleanup()` (`src/test/setup.ts:26-28`). Tooling test `src/test/render.test.tsx:21-36` (second test asserts 0 `bw` style tags after cleanup, then re-insertion). `test:web` 79/79 as configured in ≈ 6 s |
| 12 | ✅ Fixed | No timeout argument left in `Button.test.tsx` (grep for `_000)` / `timeout` = none); render matrix `:179-210`, states `:275-352`, axe `:631-650` use the default 5 s. Slowest 979 ms |
| 13 | ✅ Fixed | `role="status"` sibling always rendered, text only while loading (`Button.tsx:327-329`). Test `Button.test.tsx:374-418`: region exists and is empty before loading, is the same element with "Saving…" while loading, back to empty after (`toBe(idleStatus)`) |
| 15 | ✅ Fixed | `'mirrorInRtl' in icon.props` decides the strip (`Button.tsx:196-204`); directional only when `=== true` (`:191-192`). Test `Button.test.tsx:588-626`: `true` → one wrapper flip, `false` → no `bw-icon-directional`, neither reaches the DOM, no React error. `ref` survives the `createElement` path (React 19.3.1: `ref` is a prop) |
| 16 | ✅ Fixed | Test `Button.test.tsx:478-499` scopes to the root rule (`rootCssRuleFor`, `:136-142`), waits one `requestAnimationFrame`, then asserts the instant duration is gone and `motion-duration-sm` is back |
| 17 | ✅ Fixed | C8 "Fix round 1 — 2026-10-20" lists `docs:check`, `typecheck`, `test:web` (79/79, 5.78 s), `component-tokens`, `sync` with ✓, slowest Button timings and both manual checks. Reviewer re-ran all four required commands with the same results (table above) |
| 14 | ✅ Closed (Planner, Round 2 response) | `docs:check` ✅ — no stale contracts |

#### Default behaviour of `BiowaveProvider` — verified

| Point | Before (`e8dc43b~1`) | After | Same? |
|---|---|---|---|
| LTR cache | `createCache({ key: 'bw', prepend: true })` | `createCache({ key: 'bw', prepend: true, speedy: undefined })` (`BiowaveProvider.tsx:27`) | ✅ `@emotion/sheet` treats `speedy === undefined` as "not set" (`isSpeedy = options.speedy === undefined ? !isDevelopment : options.speedy`); cache passes `speedy: options.speedy` through unchanged |
| RTL cache | key `bw-rtl`, `prepend`, `[prefixer, rtlPlugin]` | same + `speedy: undefined` (`:28-33`) | ✅ |
| Lifetime | one module-level pair | one module-level `defaultEmotionCaches` (`:64`) used when the prop is omitted (`:76`) | ✅ |
| Selection | `caches[direction]` | `emotionCaches[direction]` (`:94`) | ✅ |

The prop is optional and documented as advanced; no consumer outside `src/test/render.tsx` passes it.

#### Acceptance criteria

| AC | Result | Evidence (file:line / test name) |
|---|---|---|
| AC-1 … AC-10 | ✅ | Approved in Round 2 (E3); the Fix round changed only `Button.tsx:196-204, 327-329` (strip condition, live region) — B1 API, tokens, transitions, RTL flip and MUI overrides untouched (diff `e8dc43b`). AC-5 now fully ✅: tests pass, `typecheck` ✅, `test:web` ✅ 79/79, `sync` ✅ |
| AC-11 Shared speedy per-test caches; `test:web` as configured, default timeout | ✅ | See #11. `vitest.config.ts` has no `testTimeout` / `fileParallelism`; 79/79 (77 + 2 tooling tests) |
| AC-12 Raised Button timeouts removed; every Button test well under 5 s | ✅ | See #12; slowest 979 ms |
| AC-13 Live region always mounted, empty when idle | ✅ | See #13 |
| AC-14 `mirrorInRtl` stripped whenever present; re-enable test asserts transition returns | ✅ | See #15, #16 |
| AC-15 C8 Fix round entry with every command and real numbers + manual checks | ✅ | See #17 |

#### Rule checks (AGENTS.md §2)

| Rule | Result | Notes |
|---|---|---|
| No generated files edited | ✅ | Fix round touched source, tests, README, `button.md` C8, `CHANGELOG.md`, run record only |
| No raw values / no primitives | ✅ | Raw-value test `Button.test.tsx:170-177` passes; `render.test.tsx` uses `cssVars` |
| Logical properties, RTL icons | ✅ | Unchanged; single wrapper flip (`:561-586`, `:588-626`) |
| Light + dark, en + ar tested | ✅ | Render matrix `:179-210`; axe light + dark `:631-650`; `false` marker tested in `ar` |
| Accessibility (keyboard, focus, labels, target) | ✅ | Live region now pre-mounted (B6 "announced once"); keyboard tests `:652-700` |
| Stayed inside the plan | ✅ | Files = C7 Fix round 1 list exactly; Icon button / Split button / Text field / Button group files not edited |
| Code matches spec (API, tokens, states, RTL, a11y) | ✅ | — |
| Changelog in the same task | ✅ | `CHANGELOG.md` "[Fixed — Web Button review round 2] — 2026-10-20" |

#### Manual checks (human QA — not a finding)

| Check | Status |
|---|---|
| Loading width stays the same in a real browser (EN + AR) | ⏳ open — jsdom has no layout; the code keeps content in flow with `opacity` and centers the spinner absolutely (B2) |
| One `loadingLabel` announcement with VoiceOver / NVDA (EN "Loading"/custom, AR "جارٍ التحميل") | ⏳ open — automated live-region lifecycle test passes (`Button.test.tsx:374-418`, `:433-440`) |

#### Figma build (Part D)

Skipped — `_workflow/config.json` › `skip: ["figma"]`; Figma build is `Planned`.

#### Findings

| # | Severity | File | Issue | Required change | Owner |
|---|---|---|---|---|---|
| — | — | — | No findings this round | — | — |

#### Next step

- Approved (code). Human QA: run the two manual checks above before merge.
- Shared tooling is in place: the raised timeouts in Icon button, Split button and Button group tests are removed in their own fix steps (C7 task list item 1).

### E3 Round 2 — 2026-10-19

| Field | Value |
|---|---|
| Plan version reviewed | 1.1 · 2026-10-18 |
| Spec version reviewed | 1.1 |
| Reviewer | Claude |
| Date | 2026-10-19 |
| Verdict | **Changes requested** |

Inputs: B, C7, C8 (incl. "Round 2 — 2026-10-18") and E of this file, and the files listed in C8 Round 2. Commands run by the Reviewer on a clean Linux copy after a fresh `npm ci` (Node 22.22.0, 2 CPUs):

| Command | Result | Time |
|---|---|---|
| `npm run docs:check` | ❌ 2 errors: `tablet button-group` and `mobile button-group` Figma contracts stale (finding 14). No Button errors | 0.4 s |
| `npm run typecheck` | ✅ | 8.2 s |
| `npm run test:web` (as configured, file-parallel) | ❌ 73/77. Button 24/24 ✅. Failing: Icon button *axe light* (timeout 5 s) + *axe dark* ("Axe is already running" — knock-on from the timed-out run), Text field *axe* (timeout 5 s), Split button *Arrow/Home/End/Escape keyboard* (timeout 5 s) | 155.9 s (wall 2 m 37 s) |
| `vitest run --no-file-parallelism` | ❌ the same 4 tests fail; Button 24/24 ✅ | 155.5 s (wall 2 m 37 s) |
| `vitest run --testTimeout=60000` (diagnostic only) | ✅ 77/77 | 155.3 s |
| `npm run sync` (AC-5) | ✅ READY, exit 0; `web button` code + Figma contracts current | — |

Flutter checks are not part of the web unit.

#### `test:web` timeout — reproduced, cause found

The C8 Round 2 log of Text field says the parallel run times out in Button / Icon button / Split button. Reproduced, but **file parallelism is not the cause**: serial and parallel runs fail the same 4 tests in the same time. Button does not fail here only because its slow tests carry raised timeouts (`Button.test.tsx:202` 30 s, `:344` 20 s, `:610` 20 s).

Cause: **emotion `<style>` elements pile up inside each test file, and every DOM-wide operation slows down with them.** `BiowaveProvider` creates its two emotion caches once per module (`2-foundations/web/src/BiowaveProvider.tsx:44-45`), not speedy in tests, so each CSS rule becomes its own `<style>` tag in `<head>` and `cleanup()` never removes them. The render-matrix tests at the top of each file insert ~5,000–6,000 tags; the axe and keyboard tests that run later in the same file walk a document with thousands of extra nodes.

| Evidence (Reviewer probe, not committed) | Result |
|---|---|
| axe on 1 Button + 1 Icon button, fresh file (124 tags) | 98–282 ms |
| Same axe after one Button render matrix (6,122 tags) | 6,267 ms (≈ 60×) |
| Same 5,052 tags merged into **one** `<style>` with the same CSS | 6,220 ms → **427 ms** — tag count, not CSS volume, is the cost |
| axe with `preload: false` / `css-orientation-lock` off | still 5.2–5.4 s — not axe's CSSOM preload |
| Button axe tests, in file vs alone (`-t axe`) | 15.6 s / 15.5 s vs 1.9 s / 1.1 s |
| Icon button axe light, in file vs alone | 6.4 s vs 0.48 s |
| Text field axe, in file vs alone | 6.0–7.6 s vs 1.7 s |
| Split button keyboard test, in file vs alone | 5.6–6.1 s vs 1.0 s |

So Button's own axe tests use 78 % of their raised 20 s budget; on a slower or busier machine (the macOS parallel run in the Text field log) they cross it. Raising timeouts hides the problem; it grows with every component that reuses this tooling (AC-8).

#### Round 1 findings — status

| # | Status | Evidence |
|---|---|---|
| 1 | ✅ Fixed | `Button.tsx:143-148` content hidden with `opacity` only; status region is a sibling outside the root (`Button.tsx:289-331`). Test *keeps its accessible name and focus while loading…* (`Button.test.tsx:366-403`): `computeAccessibleName` = "Save changes", status not inside the button, no `visibility: hidden` rule. Announcement timing: see finding 13 |
| 2 | ✅ Fixed | Rule scoped to the wrapper: `Button.tsx:172-174` `[dir='rtl'] & .bw-button__icon.bw-icon-directional`; class removed from the icon (`Button.tsx:190-195`). Test `Button.test.tsx:537-562`: exactly one `.bw-icon-directional` element, the icon child does not carry it |
| 3 | ✅ Fixed | `mirrorInRtl` read and stripped (`Button.tsx:191-203`); `ButtonDirectionalIconProps` exported (`Button.tsx:23-26`, `index.ts`, `src/index.ts:10`). Test `Button.test.tsx:564-587`: no DOM attribute, no React error. Edge case `mirrorInRtl={false}`: finding 15 |
| 4 | ✅ Fixed (Planner) | `--bw-motion-duration-progress: 1000ms` (`tokens.css:80`) is not in the reduced-motion block (`tokens.css:843-845`); `button.tokens.ts:251` → `ButtonSpinner.tsx:22`. Test `Button.test.tsx:405-416` |
| 5 | ✅ Fixed | Content and spinner fade with `opacity` + `motion-duration-sm` / `easing-linear` (`Button.tsx:143-148`, `ButtonSpinner.tsx:20-21, 26`); no `visibility` |
| 6 | ✅ Fixed | (a) no jsdom width claim left; C8 Round 2 keeps it as a manual check. (b) RTL result asserted (#2). (c) part rules per variant × color (`Button.test.tsx:204-231`) and per size (`:233-254`). (d) states (`:267-344`) and axe (`:590-611`) for every allowed color |
| 7 | ✅ Fixed | Instant while disabled (`Button.tsx:128-135`) and on the re-enabled frame (`Button.tsx:242-262, 297`). Test `Button.test.tsx:463-475`; it cannot catch "never reverts" (finding 16) |
| 8 | ✅ Fixed | `src/internal/visuallyHidden.ts` (clip, 1 px, overflow hidden, absolute) used at `Button.tsx:327` |
| 9 | ✅ Fixed (Planner) | C6 regex with word boundaries; `Button.test.tsx:163` |
| 10 | ✅ Closed | Planner decision R-01: header status fields are the single source; header `Plan Finished`, `Code Built` (`button.md:17-18`) |

#### Acceptance criteria

| AC | Result | Evidence (file:line / test name) |
|---|---|---|
| AC-1 Public API = B1 | ✅ | `Button.tsx:28-44` props, `:220-233` defaults, `:245-278` all three fallbacks with `warnOnce`; tests *warns once…* (`Button.test.tsx:479-533`). Nit: finding 15 |
| AC-2 Tokens only | ✅ | `button.tokens.ts` = `button.tokens.json` (test *matches every component token alias*, `Button.test.tsx:137-160`); raw-value test `:162-167`; no primitives |
| AC-3 B4 transitions; reduced motion | ✅ | hover/press/release `Button.tsx:100-120`; focus ring has no transition (`:124-127`); loading fade `:143-148` + `ButtonSpinner.tsx:20-26`; disabled ↔ enabled instant `:106-108, 128-135, 242-262`; spinner `motion-duration-progress`, kept under reduced motion |
| AC-4 RTL B5; a11y B6 | ⚠️ | RTL ✅ (#2, #3). Loading keeps focus and name ✅. "Announced once": the live region is created together with its text (finding 13) |
| AC-5 Tests exist and pass; typecheck, test:web, sync pass | ❌ | Button tests exist and pass (24/24). `typecheck` ✅, `sync` ✅, **`test:web` ❌** 73/77 (finding 11); Button's axe tests pass only on raised timeouts (finding 12) |
| AC-6 Exported; README Built | ✅ | `src/index.ts:7-14`; `3-web-components/README.md:46` Code = Built |
| AC-7 No ripple / elevation / uppercase / min-width | ✅ | `Button.tsx:83, 97-98, 301-302`; test `Button.test.tsx:353-362` |
| AC-8 Generic tooling, documented | ⚠️ | `vitest.config.ts`, `src/test/render.tsx`, `src/test/setup.ts`; README › Stack › Tests (`3-web-components/README.md:13`). Generic, but does not scale — the accumulated-style cost is what breaks `test:web` (finding 11) |
| AC-9 Round 1 fixes #1, #2, #3, #5, #6, #7, #8 | ✅ | Table above |
| AC-10 C8 Round 2; Code Built; README matches | ✅ | `button.md:534-542`; header `Code` Built (`button.md:18`); README row `:46` matches. C8 Round 2 lists no command results (finding 17) |

#### Rule checks (AGENTS.md §2)

| Rule | Result | Notes |
|---|---|---|
| No generated files edited | ✅ | Round 2 files (C8) are source, docs and changelog only |
| No raw values / no primitives | ✅ | Raw-value test passes; `visuallyHidden.ts` uses the standard 1-unit pattern the plan asks for (C3) |
| Logical properties, RTL icons | ✅ | `paddingInline`, `inlineSize`, `insetInline`, logical radii; single wrapper flip |
| Light + dark, en + ar tested | ✅ | Render matrix in all 4 combinations (`Button.test.tsx:171-202`); axe in light + dark (`:590-611`) |
| Accessibility (keyboard, focus, labels, target) | ⚠️ | Keyboard ✅ (`:613-653`), focus ring ✅, name ✅, targets ✅. Live-region timing (finding 13) |
| Stayed inside the plan | ✅ | C5 files plus `visuallyHidden.ts` (C3) |
| Code matches spec (API, tokens, states, RTL, a11y) | ⚠️ | Findings 13, 15 |
| Accepted deviations reflected back into the spec | ✅ | Round 1 Planner response applied in plan 1.1 / spec 1.1 (F2) |

#### Figma build (Part D)

Skipped — `_workflow/config.json` › `skip: ["figma"]`; Figma build is `Planned`.

#### Findings

| # | Severity | File | Issue | Required change | Owner |
|---|---|---|---|---|---|
| 11 | 🔴 Blocker | `2-foundations/web/src/BiowaveProvider.tsx:44-45` · `3-web-components/src/test/render.tsx:10-22` · `src/test/setup.ts:26-32` | `npm run test:web` fails (73/77) in parallel **and** serially. Cause: emotion writes one `<style>` tag per rule (non-speedy in tests) into module-level caches, so tags pile up per test file (≈ 6,000 after one render matrix). axe and user-event then run 6–15× slower than alone and cross the 5 s default (evidence above). Not a parallelism problem; Button passes only through raised timeouts | Decide one shared fix in the test tooling instead of raising timeouts — e.g. a test-only speedy emotion cache (BiowaveProvider option or test cache; merging the same CSS into one tag took axe 6.2 s → 0.43 s), or removing emotion tags and resetting the caches between tests. It touches Foundations code and every web unit, so record it in C3/C5 (tooling owner = this plan) and in the affected units' plans; then the Executor applies it | Planner |
| 12 | 🟡 Should fix | `Button.test.tsx:202, 344, 610` | Raised per-test timeouts (30 s, 20 s, 20 s) hide the slowdown: axe tests take 15.6 s / 15.5 s of 20 s here (1.9 s / 1.1 s alone) | After #11, remove the raised timeouts and confirm every Button test finishes well under the 5 s default; record timings in C8 | Executor |
| 13 | 🟡 Should fix | `Button.tsx:326-330` | The `role="status"` region is mounted together with its text when `loading` turns on. Screen readers often do not announce a live region that appears with its content already inside (B6: "announces `loadingLabel` once"). Not verifiable in jsdom | Keep the visually hidden `role="status"` sibling mounted while the Button is mounted (empty when idle) and put `loadingLabel` into it when loading starts; test that the region exists before loading and gets the text after. Note a manual screen-reader check in C8 | Executor |
| 14 | 🟡 Should fix | `4-tablet-components/components/button-group/` · `5-mobile-components/components/button-group/` | `npm run docs:check` fails: tablet and mobile `button-group` Figma contracts stale. Not caused by Button, but it is a required check of this step | Regenerate: `npm run contract -- tablet button-group` and `npm run contract -- mobile button-group` (after checking why the source changed) | Planner |
| 15 | 🟢 Nit | `Button.tsx:196-203` | `mirrorInRtl={false}` is not stripped: `cloneElement` keeps the prop, so it reaches the DOM on a custom icon that spreads its props (B5: "never reaches the DOM") | Strip whenever the prop is present (`'mirrorInRtl' in icon.props`), not only when it is truthy; add the `false` case to the test | Executor |
| 16 | 🟢 Nit | `Button.test.tsx:327-333, 463-475` | The re-enable test passes even if the instant duration never reverts | After the next animation frame, assert the instant rule is gone and the `motion-duration-sm` transition is back | Executor |
| 17 | 🟢 Nit | `button.md:534-542` (C8 Round 2) | No command results recorded; `test:web` was red at the time (see Text field C8) | List each command with ✓/✗ in the next C8 entry | Executor |

#### Next step

- Changes requested. Planner first: decide #11 (shared tooling fix, record in C3/C5 and the affected units) and regenerate the stale button-group contracts (#14).
- Then the Executor (Fix round): apply #11 in the Button tooling, then #12, #13, and the nits 15–17; add a "Fix round" entry in C8 with check results; `test:web` must pass as configured, without raised timeouts.

#### Planner response (2026-10-19)

| # | Decision |
|---|---|
| 11 | Fresh emotion cache per test, speedy, flushed after `cleanup()` — the pattern of MUI's own test renderer (`createRenderer`: new cache in `beforeEach`, `sheet.tags` removed in `afterEach`) plus the `@emotion/cache` `speedy` option. Foundations gets `createBiowaveEmotionCaches()` and an optional `emotionCaches` prop (default unchanged); `render.tsx` / `setup.ts` reset per test. Probe with all raised timeouts removed: 73/77 in 2 m 32 s → **77/77 in 35 s**; speedy alone is not enough (74/77). Written into C2, C3 › Test tooling, C5, C6, C7 AC-11. Shared tooling: unblocks Icon button, Split button and Text field |
| 12 | C7 AC-12: remove `Button.test.tsx:202, 344, 610` timeouts; slowest Button test in the probe 1.57 s |
| 13 | C3 › Loading: status region always mounted, empty when idle; C6 test; C7 AC-13 |
| 14 | Regenerated with the generator only: `npm run contract -- tablet button-group` and `npm run contract -- mobile button-group`. Cause: only the source hash in line 1 and the Source row changed (`fecddf05b9220a07` → `70d612bf4115be17`); the contract body is identical, so builders get no new instructions. `docs:check` ✅ |
| 15, 16 | C3 › RTL icons and C6; C7 AC-14 |
| 17 | C7 AC-15: the C8 Fix round entry lists every command with ✓/✗ |

Plan version 1.2; Plan stays `Finished`; `npm run contract -- web button` regenerated. Executor items for Fix round 1: the task list under C7 (#11, #12, #13, #15, #16, #17).

### E2 Round 1 — 2026-10-16

| Field | Value |
|---|---|
| Plan version reviewed | 1 |
| Spec version reviewed | 1.0 |
| Reviewer | Claude |
| Date | 2026-10-16 |
| Verdict | **Changes requested** |

Commands run by the Reviewer (fresh `npm ci` on a clean copy — the repo's `node_modules` were installed on macOS and can't run Vitest on Linux):
`npm run typecheck` ✅ · `npm run test:web` ✅ 21/21 · `npm run sync` ✅ READY (exit 0) · `npm run component-tokens` ✅.
Flutter commands (`flutter analyze && flutter test` in 4-/5-) **not verified** — no Flutter SDK in the review environment.

All tests pass, but extra probe tests (below) show two spec violations that the current tests don't catch.

#### Acceptance criteria

| AC | Result | Evidence (file:line / test name) |
|---|---|---|
| AC-1 Public API = B1 | ✅ | `Button.tsx:21-37, 173-213` — names, types, defaults, all 3 fallbacks + `warnOnce`. Small issue: `mirrorInRtl` (finding 3) |
| AC-2 Tokens only, no raw values / primitives | ✅ | `button.tokens.ts` = `button.tokens.json` (test *matches every component token alias*); `elevation-0`, `biowaveVariants.action*` used; no primitives |
| AC-3 Every B4 transition; reduced motion | ❌ | Spinner stops under reduced motion (finding 4); content doesn't fade (finding 5); Disabled→Enabled not instant (finding 7) |
| AC-4 RTL B5 + a11y B6 | ❌ | Loading drops the label from the accessible name (finding 1); directional icons are mirrored twice = not mirrored (finding 2) |
| AC-5 B9 + C6 tests exist and pass; commands pass | ⚠️ | Pass, but some B9 items are only partly covered and some tests can't fail (finding 6) |
| AC-6 Exported + README status | ✅ | `src/index.ts:7-13`; `3-web-components/README.md:44` = Built |
| AC-7 No ripple / elevation / uppercase / min-width | ✅ | `Button.tsx:65, 75-76, 233-234`; test *disables MUI ripple…* |
| AC-8 Generic test tooling, documented | ✅ | `vitest.config.ts`, `src/test/render.tsx`, `src/test/setup.ts`; README › Stack › Tests |

#### Rule checks (AGENTS.md §2)

| Rule | Result | Notes |
|---|---|---|
| No generated files edited | ✅ | `_sync/build-stamp.json` changed only by `npm run tokens` |
| No raw values / no primitives | ✅ | — |
| Logical properties, RTL icons | ❌ | Logical props ✅ (`paddingInline`, `inlineSize`, `insetInline`). Icon mirroring broken (finding 2) |
| Light + dark, en + ar tested | ⚠️ | Rendered in all 4 combos, but per-part token values aren't asserted per theme (finding 6) |
| Accessibility (keyboard, focus, labels, target) | ❌ | Keyboard ✅, focus ring ✅, target ✅. Label lost while loading (finding 1) |
| Stayed inside the plan | ⚠️ | Tablet/mobile `pubspec` + `theme_test.dart` changed — outside "one component per task", but the user approved it and it's logged. Accepted |
| Code matches spec README | ❌ | Findings 1, 2, 4 |
| Accepted deviations reflected back into the spec | ⏳ | Planner: record the Flutter localization fix in `CHANGELOG.md` |

#### Figma build (Part D)

Skipped — Figma status is still `Planned`.

#### Probe evidence (Reviewer-only test, not committed)

```
Loading accessible name   → "Saving…"            (B6 expects "Save changes" + busy, then "Saving…" announced)
Idle accessible name      → "Save changes"       ✅
.bw-icon-directional nodes → 2: SPAN scaleX(-1) | svg scaleX(-1)   → net result: NOT mirrored
<ArrowForwardRounded mirrorInRtl/> → React: "does not recognize the `mirrorInRtl` prop on a DOM element"
tokens.css:843 reduced motion → --bw-motion-duration-2xl: 0ms → spinner animation-duration calc(0ms + 0ms) = 0
```

#### Findings

| # | Severity | File / node | Issue | Required change |
|---|---|---|---|---|
| 1 | 🔴 Blocker | `Button.tsx:122-125, 257-259` | While loading, `.bw-button__content` gets `visibility: hidden`, which also removes the label from the accessibility tree. The only text left inside the button is the `role="status"` span, so the button's name becomes **"Saving…"**. B2 ("full label stays the accessible name") and B6 (SR output) are broken. The plan's "visibility: hidden" instruction caused this — Planner error, not only Executor | Hide content with `opacity: 0` only (no `visibility`), which keeps the box and the name. Move the `role="status"` region **outside** the `<button>`/`<a>` (a sibling, visually hidden), so it's announced and isn't part of the name. Add a test using `computeAccessibleName` while loading = "Save changes". Planner updates C3 |
| 2 | 🔴 Blocker | `Button.tsx:149, 160-165` | When the consumer puts `className="bw-icon-directional"` on the icon, the class ends up on both the wrapper span **and** the svg. The selector `[dir='rtl'] & .bw-icon-directional` matches both → flipped twice = not mirrored. The RTL test only checks the class and rule are there, not the result | Scope the rule to the wrapper: `[dir='rtl'] & .bw-button__icon.bw-icon-directional`. Test: in `ar`, exactly one element in the icon path has `scaleX(-1)` |
| 3 | 🟡 Should fix | `Button.tsx:160-165` · B5 | `mirrorInRtl` on a MUI icon is passed through to the `<svg>` (React warning), and it's a TypeScript error because `SvgIconProps` has no such prop. So B5 only works for custom icons. Plan says "on the icon wrapper", spec says "on the icon" | Planner decides. Recommended: read `mirrorInRtl`, then `React.cloneElement(icon, { mirrorInRtl: undefined })` before rendering, and document `bw-icon-directional` as the main way. Update B5 + C3 so they agree |
| 4 | 🟡 Should fix (Planner) | `ButtonSpinner.tsx:22` · `tokens.css:843` | B4 says the spinner **keeps rotating** under reduced motion. But reduced motion sets `motion-duration-2xl` to `0ms`, so the spinner freezes. There's no token that stays non-zero. Token gap — the Executor can't fix this without a raw value | Planner adds a progress duration token that reduced motion doesn't zero (e.g. `motion-duration-progress`) via AGENTS §6, adds the exception to `motion.md`, then the Executor switches `spinnerDuration` to it |
| 5 | 🟡 Should fix | `Button.tsx:118-125` · `ButtonSpinner.tsx:20-21, 26` | B4 "content fades out, spinner fades in". `visibility` flips instantly (it isn't in the transition), so the content disappears at once instead of fading. Same for the spinner fading out | Fixed by finding 1 (opacity only). For the spinner, use `opacity` + `pointer-events`, or transition `visibility` together with opacity |
| 6 | 🟡 Should fix | `Button.test.tsx` | Tests that can't catch the bugs: (a) *width unchanged* — jsdom always returns width `0`, so it always passes; (b) RTL test checks the class, not the result (missed #2); (c) B9 "computed CSS variables per part" — only tag/type/text checked, per-variant×color×theme values not asserted; (d) states and axe only cover `color="brand"` | Add the tests from #1, #2. Assert container/label/icon/border per variant × color from the rendered CSS rules. Move width checks to Vitest browser mode / Playwright, or remove the claim and note it in the log |
| 7 | 🟢 Nit | `Button.tsx:78-83, 109` | Disabled → Enabled uses the base `sm` transition. B4 says instant both ways | Add an instant duration for the `disabled` prop change (e.g. a class added for one frame), or Planner accepts and edits B4 |
| 8 | 🟢 Nit | `Button.tsx:152-156` | The status span uses only `opacity: 0`; it isn't the standard visually-hidden pattern (clip, 1px size) | Use the standard visually-hidden styles (best as a shared internal helper for later components) |
| 9 | 🟢 Nit (Planner) | C6 · `Button.test.tsx:157-159` | `/Inter/i` matches `interface`/`pointerEvents`, so the test strips those words — fragile | Planner changes the regex to `\bInter\b` / `\bIBM Plex\b` in plan + template |
| 10 | 🟢 Nit | `specs/button/README.md` header · Part C B2 | Spec header still says `Status: Planned`; plan Scope checkboxes not ticked | Update both when re-submitting |

#### Next step

- Changes requested → Executor fixes 🔴 1-2 and 🟡 3, 5, 6, appends to the plan's Execution log, sets status `Built` again.
- Planner, before the Executor resumes: decide #3, add the token for #4, update C3 (#1) and B6 (#9), log the Flutter fix in `CHANGELOG.md`.


#### Planner response (2026-10-18)

| # | Decision |
|---|---|
| 1 | C3 + B2 rewritten: content hidden with `opacity` only; status region is a visually hidden sibling outside the button; name test added (C6) |
| 3 | `bw-icon-directional` class is the main way; `mirrorInRtl` supported on custom elements and stripped by the Button; flip scoped to the wrapper. B5 + C3 agree |
| 4 | New token `motion-duration-progress` (1000ms, not reduced) in Foundations; B4 + C3 use it; exception added to `motion.md` |
| 7 | B4 kept (instant both ways); C3 says how |
| 9 | C6 regex uses word boundaries |
| 10 | Header status fields are the single source (R-01); Plan set to `Finished`, contracts generated |

Executor items for round 2: #1, #2, #3, #5, #6, #7, #8 (C7 AC-9).

---

## F · Changelog

> Changes to this component on this platform.

### F0 Changes from previous version

1.1 — spinner speed now uses `motion-duration-progress` and keeps turning with reduced motion; while loading the button keeps its label as its accessible name; directional icons flip once, marked with `bw-icon-directional` (or `mirrorInRtl` on a custom icon). No API change.

### F1 Guidelines changelog

| Version | Date | Change | Migration | Author |
|---|---|---|---|---|
| 1.0 | 2026-10-16 | Initial. Replaces the Figma `.Button _en/_ar`, `Default Button/EN·AR` and mobile `Buttons` sets | Type Primary/Secondary/Tertiary → `variant` filled/outlined/text (tonal is new) · Color Primary → `brand`, White → `inverse`; Success/Warning/Info removed · Size Small/Medium/XLarge → `sm`/`md`/`lg` | Planner (Claude) |

### F2 Spec changelog

| Version | Date | Change | Breaking | Migration |
|---|---|---|---|---|
| 1.0 | 2026-10-16 | Initial | No | — |
| 1.1 | 2026-10-18 | Review round 1 Planner items: spinner uses `motion-duration-progress` (B4); loading content hidden by opacity, name kept (B2, C3); `mirrorInRtl` / `bw-icon-directional` defined (B5, C3); C6 tests and C7 AC-9/10 added | No | — |
| 1.1 · plan 1.2 | 2026-10-19 | Review round 2 Planner items: shared test tooling fix (fresh speedy emotion cache per test, Foundations `createBiowaveEmotionCaches` + `emotionCaches` prop) in C2/C3/C5; live region always mounted (C3); `mirrorInRtl={false}` stripped (C3); C6 tests and C7 AC-11–15 + Fix round 1 task list added. Spec (B) unchanged | No | — |

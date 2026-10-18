# Button · زر — Tablet

> **One file for Button on Tablet:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- tablet button`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Button · زر |
| Summary | Triggers an action with a clear level of emphasis, from primary submission to a quiet inline action. |
| Summary (ar) | ينفّذ إجراءً بمستوى واضح من الأهمية، من الإرسال الأساسي إلى الإجراء النصي الهادئ. |
| Parts | Container · label · leading/trailing icon · spinner · focus ring |
| Parts (ar) | الحاوية · التسمية · أيقونة البداية/النهاية · مؤشر التحميل · حلقة التركيز |
| Platform | Tablet · Flutter + Material 3 |
| Built on | M3 `FilledButton` · `FilledButton.tonal` · `OutlinedButton` · `TextButton`, chosen by `variant`, with a `ButtonStyle` built only from Biowave tokens. No ink splash |
| Import | `BwButton` from `package:biowave_tablet/biowave_tablet.dart` |
| Figma | **Biowave DS — Tablet Components** › `↳ Button` (page Typography mode `Tablet`) · build: [Part D](#d--figma-build) |
| Version | 1.0 · 2026-10-16 |
| Plan | Finished |
| Code | Planned |
| Figma build | Planned |
| Review | — |
| Source code | `lib/src/components/button/` — not built yet (the Executor creates it) |
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
| Specs | [Web](../../../3-web-components/components/button/button.md#b--spec) · [Tablet](#b--spec) · [Mobile](../../../5-mobile-components/components/button/button.md#b--spec) |
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

### A8 Platform notes — Tablet

```
Web (dialog footer, end-aligned)              Mobile (screen bottom, full width)
┌───────────────────────────────────────┐     ┌─────────────────────────┐
│               [── Cancel ──][■ Save ■]│     │ [■■■■■ Clock in ■■■■■■] │
└───────────────────────────────────────┘     │ [──────  Cancel ──────] │
                                              └─────────────────────────┘
```

| | Tablet |
|---|---|
| Available | ✓ |
| Default size | `lg` |
| Sizes | `sm` · `md` · `lg` · `xl` |
| Layout | Hugs label; full width in sheets and narrow panes |
| Interaction | Touch; hover and keyboard with a pointer or keyboard attached |
| Touch target | Smaller sizes keep a 48 hit area |

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

Context: Tablet app (landscape and portrait, two-pane layouts). Hover and keyboard are supported when a pointer or keyboard is attached.

### B1 API

#### BwButton
| Param | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `label` | `String` | | — | ✓ | `label`. Plain text |
| `onPressed` | `VoidCallback?` | | — | ✓ | `null` = disabled (Flutter convention). Not called while `loading` |
| `variant` | `BwButtonVariant` | `filled` · `tonal` · `outlined` · `text` | `filled` | | Emphasis — A4.1 |
| `color` | `BwButtonColor` | `brand` · `secondary` · `neutral` · `error` · `inverse` | `brand` | | A4.2 |
| `size` | `BwControlSize` | `sm` · `md` · `lg` · `xl` | `lg` | | A4.3 |
| `leadingIcon` | `IconData?` | Material Symbols Rounded | `null` | | `leading-icon` |
| `trailingIcon` | `IconData?` | | `null` | | `trailing-icon` |
| `fullWidth` | `bool` | | `false` | | A4.5 |
| `loading` | `bool` | | `false` | | Shows `spinner`, ignores presses, keeps focus |
| `loadingLabel` | `String?` | | localized "Loading" / "جارٍ التحميل" | | Announced when loading starts, e.g. "Saving…" |
| `focusNode` · `autofocus` | | | | | Passed to the M3 button |

`BwControlSize` is shared by every control (Text field, Select, … later) and lives in `lib/src/common/bw_control_size.dart`. Platform naming: Flutter `leadingIcon` = web `startIcon`; `onPressed` = `onClick`; `onPressed: null` = web `disabled`.

**Invalid combinations** (`assert` in debug; fallback in release):
| Combination | Fallback |
|---|---|
| `variant: tonal` with `color: neutral` or `inverse` | `outlined` |
| `leadingIcon` and `trailingIcon` both set | `leadingIcon` only |
| `label` empty | assert "BwButton needs a label — use BwIconButton" |

### B2 Dimensions

```
   BwSpacing.controlPaddingInlineLg                 BwSpacing.controlPaddingInlineLg
     ├────────┤ BwSpacing.controlGapLg                        ├────────┤
   ┬ ┌────────────────────────────────────────────────────────────┐
   │ │        [◆]  ├─┤  Clock in                                 │  radius-md
   │ └────────────────────────────────────────────────────────────┘
   ┴ size-control-height-lg        (hit area ≥ BwLayout.tablet.minTarget)
```

| Part | Property | sm | md | lg | xl |
|---|---|---|---|---|---|
| `container` | height | `size-control-height-sm` | `size-control-height-md` | `size-control-height-lg` | `size-control-height-xl` |
| `container` | padding-inline | `spacing-control-padding-inline-sm` | `…-md` | `…-lg` | `…-xl` |
| `container` | gap | `spacing-control-gap-sm` | `…-md` | `…-lg` | `…-xl` |
| `container` | radius | `radius-md` | `radius-md` | `radius-md` | `radius-xl` |
| `container` | border width (outlined) | `border-width-default` | same | same | same |
| `leading-icon`, `trailing-icon`, `spinner` | size | `size-icon-sm` | `size-icon-md` | `size-icon-lg` | `size-icon-lg` |
| `label` | text style | `action-sm` | `action-md` | `action-lg` | `action-lg` |
| hit area | min size | `target-min` (`BwLayout.tablet.minTarget`) | same | same (= height) | height |
| `focus-ring` | width · offset | `border-width-focus` · `border-focus-offset` | same | same | same |

Flutter access: `size-control-height-lg` → `BwSize.controlHeightLg` · `spacing-control-gap-lg` → `BwSpacing.controlGapLg` · `radius-md` → `BwRadius.md` · `action-lg` → `context.bw.text.actionLg` · colors → `context.bw.colors.<camelCase>` (e.g. `backgroundBrandDefault`).

Layout rules: width hugs content (`MainAxisSize.min`); `fullWidth` → `minimumSize` width `double.infinity` in the parent constraints. Height fixed by the size token (`fixedSize` height, `minimumSize` height). Outlined border drawn inside the height. `label` one line, `TextOverflow.ellipsis`, `softWrap: false`. Loading keeps the content's size (`Visibility(maintainSize: true, …)`) with the spinner centered on top. `MaterialTapTargetSize.padded` keeps the 48dp hit area for `sm`/`md`. Elevation 0 in every state.

### B3 Tokens by part and state

Identical to the [Web B3](../../../3-web-components/components/button/button.md#b3-tokens-by-part-and-state) (same token for every part × state; tokens are platform-agnostic). Flutter mapping:

| Spec part / state | `ButtonStyle` field |
|---|---|
| `container` background (Default · Hover · Pressed · Disabled) | `backgroundColor` `WidgetStateProperty` |
| state layer (tonal · outlined · text) | `overlayColor`: hovered → `overlayHover`, pressed → `overlayPressed`, focused → transparent; filled → always transparent |
| `container` border (outlined) | `side` `WidgetStateProperty` (`BorderSide(width: BwBorder.widthDefault, color: …)`) |
| `label` · `spinner` | `foregroundColor` |
| icons | `iconColor` |
| splash | `splashFactory: NoSplash.splashFactory` |
| elevation, shadow | `elevation: 0`, `shadowColor: transparent` |

Dark theme: same tokens, values switch automatically. No exceptions.

### B4 States and transitions

Same table as [Web B4](../../../3-web-components/components/button/button.md#b4-states-and-transitions). Flutter: `animationDuration: BwDuration.sm`; pressed uses the same duration (M3 buttons animate state colors with one duration); loading cross-fade `AnimatedSwitcher(duration: BwDuration.sm)`; spinner `CircularProgressIndicator` (indeterminate).
Reduced motion: when `context.bw.reduceMotion` is true use `BwDuration.instant`; the spinner keeps rotating.

### B5 RTL

```
LTR  │  [◆]  Add device          │      │  Next  [▸]  │
RTL  │          إضافة جهاز  [◆]  │      │  [◂]  التالي │
```

| Part | In RTL |
|---|---|
| layout | Mirrors automatically from `Directionality`; padding is `EdgeInsetsDirectional` |
| directional icons | Mirror automatically when `IconData.matchTextDirection` is true (`Icons.arrow_forward_rounded`, `chevron_right`, `logout`…). Do not wrap in `Transform` |
| non-directional icons, `spinner` | Do not mirror |

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role / semantics | M3 button semantics (`button: true`, `enabled`). Icons `excludeFromSemantics` |
| Accessible name | `label` |
| Loading | `Semantics(label: '$label', value: loadingLabel, button: true, enabled: true)`; `SemanticsService.announce(loadingLabel, Directionality.of(context))` once when `loading` turns on; presses ignored, focus kept |
| Disabled | `onPressed: null` → not focusable, `enabled: false` |
| Focus | Keyboard focus only (`FocusManager.instance.highlightMode == traditional`): ring `border-width-focus` in `color-border-focus` (`inverse`: `color-border-inverse`) drawn `border-focus-offset` outside the container, radius = container radius + offset |
| Target size | ≥ `BwLayout.tablet.minTarget` via `MaterialTapTargetSize.padded` |
| Text scale | Label scales with the system text scale; height grows rather than clipping (use `minimumSize`, not a hard max) |
| Screen reader output | "Clock in, button" / "تسجيل الحضور، زر" · loading: "Saving…" announced |

| Key (hardware keyboard) | Action |
|---|---|
| Tab / Shift+Tab | Moves focus |
| Enter / Space | Activates |

### B7 Examples

```dart
import 'package:biowave_tablet/biowave_tablet.dart';

// Screen main action, full width
BwButton(label: 'Clock in', size: BwControlSize.xl, fullWidth: true, onPressed: clockIn);

// Pair in a sheet
BwButton(label: 'Cancel', variant: BwButtonVariant.outlined, color: BwButtonColor.neutral, onPressed: close);
BwButton(label: 'Save changes', loading: saving, loadingLabel: 'Saving…', onPressed: save);

// Destructive
BwButton(label: 'Delete user', color: BwButtonColor.error, onPressed: confirmDelete);

// Arabic: same code; MaterialApp(locale: Locale('ar')) + BwTabletTheme.light(locale) give RTL and the Arabic font
BwButton(label: 'تسجيل الحضور', leadingIcon: Icons.login_rounded, onPressed: clockIn);
```

### B8 Figma

Structure, properties, the Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

- [ ] Golden tests: every allowed `variant` × `color` at `lg`, plus each size for `filled brand`, in light + dark and `Locale('en')` + `Locale('ar')`
- [ ] States: hovered, pressed, focused (keyboard highlight mode), disabled, loading — colors read from the resolved `ButtonStyle` equal the tokens in B3
- [ ] Loading: `onPressed` not called, size unchanged, focus kept, announcement made once
- [ ] Each invalid combination in B1 asserts in debug
- [ ] `meetsGuideline(androidTapTargetGuideline)` and `textContrastGuideline` for every variant × color
- [ ] Text scale 2.0: label not clipped
- [ ] Directional icon mirrors in RTL; `Icons.add` does not
- [ ] No raw values: the widget file contains no `Color(0x`, no numeric `EdgeInsets`/`SizedBox` sizes, no `Duration(milliseconds:` (lint test)

---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `button-contract.md`.

> Written by the Planner (Claude). Executed by any agent. Reviewed by Claude against this file.
> Executor: read `AGENTS.md`, `4-tablet-components/README.md`, this file and the spec [Part B](#b--spec). Nothing else unless linked here.

| Field | Value |
|---|---|
| Component | Button |
| Platform | Tablet (Flutter + M3) |
| Plan version | 1 · 2026-10-16 |

### C1 Goal

`BwButton` from `package:biowave_tablet/biowave_tablet.dart` renders every allowed `variant` × `color` × `size` of B1–B3 from tokens only, behaves as B4–B6 in light/dark and en/ar, and passes B9. First component of this package: it also adds `BwControlSize` and the golden-test helpers later components reuse.

### C2 Scope

**In scope**: B1 API (all params) · C2 · C3 · C4 · C5 · C6 · C9.
**Out of scope**: Icon button, Split button, Button group; a shared Progress widget (Day 5) — use M3 `CircularProgressIndicator` directly inside the button.

### C3 Approach

- `BwButton` is a `StatelessWidget` that picks `FilledButton` / `FilledButton.tonal` / `OutlinedButton` / `TextButton` by `variant` and passes `style: BwButtonStyle.resolve(context, variant, color, size)`.
- `bw_button_style.dart`: a pure function that maps (variant, color, size) → `ButtonStyle` using only `context.bw.colors`, `context.bw.text`, `BwSize`, `BwSpacing`, `BwRadius`, `BwBorder`, `BwDuration`. One `switch` per B3 table — no colors computed with `withOpacity`/`lerp`.
- Child: `Row(mainAxisSize: MainAxisSize.min)` with `leadingIcon` / `label` / `trailingIcon` and `SizedBox(width: BwSpacing.control{Gap}{Size})` gaps; wrapped in `Visibility(maintainSize: true, maintainAnimation: true, maintainState: true, visible: !loading)`; spinner centered in a `Stack`.
- Focus ring: `_BwFocusRing` widget (private, `lib/src/common/bw_focus_ring.dart`, reused by later controls) listening to `Focus` + `FocusManager.instance.highlightMode`; draws a `DecoratedBox` border outside the button with `Padding(padding: EdgeInsetsDirectional.all(BwBorder.focusOffset))`.
- Loading: wrap `onPressed` to a no-op while loading **but keep it non-null** so the button stays enabled and focusable; announce via `SemanticsService.announce`.
- Invalid combinations: `assert` + fallback (B1).
- Gotchas: M3 `FilledButton` default `minimumSize` (64×40) and `padding` must be overridden from tokens; `visualDensity` must be `VisualDensity.standard` so heights are exact; `tapTargetSize: MaterialTapTargetSize.padded`.

### C4 Token gaps

None (Foundations 1.1.0 added the control and inverse/overlay tokens).

### C5 Files to create / change

```
4-tablet-components/lib/src/common/bw_control_size.dart          new: enum BwControlSize { sm, md, lg, xl }
4-tablet-components/lib/src/common/bw_focus_ring.dart            new (private to the package)
4-tablet-components/lib/src/components/button/bw_button.dart     new: BwButton, BwButtonVariant, BwButtonColor
4-tablet-components/lib/src/components/button/bw_button_style.dart  new
4-tablet-components/lib/biowave_tablet.dart                               change: export bw_control_size.dart and button/bw_button.dart
4-tablet-components/test/helpers/bw_test_app.dart                new: pumpBw(tester, child, {brightness, locale}) using BwTabletTheme
4-tablet-components/test/button_test.dart                        new
4-tablet-components/test/goldens/button/                         new (generated goldens)
4-tablet-components/README.md                                    change: status table row
```

### C6 Tests

Implement every item in B9, plus:
- [ ] `pumpBw` helper covers the 4 theme × locale combinations
- [ ] `BwButtonStyle.resolve` unit test: for each allowed (variant, color), resolved colors per `WidgetState` equal B3 tokens

### C7 Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 exactly (names, types, defaults, asserts, fallbacks)
- [ ] AC-2 Every value in B2–B3 comes from the listed token; no raw values, no `BwPalette`
- [ ] AC-3 B4 transitions; reduced motion respected
- [ ] AC-4 RTL as B5; a11y as B6 (focus ring only in keyboard mode; loading keeps focus and announces)
- [ ] AC-5 Tests pass: `cd 4-tablet-components && flutter analyze && flutter test`; `npm run sync` passes
- [ ] AC-6 Exported from `lib/biowave_tablet.dart`; `4-tablet-components/README.md` status table updated to `Built`
- [ ] AC-7 No ink splash; elevation 0; exact heights per size (golden + `tester.getSize`)

---

### C8 Execution log (filled by the Executor)

| Field | Value |
|---|---|
| Agent | |
| Date | |
| Files changed | |

**Deviations from the plan or spec** (with reason — the Planner updates the spec if accepted):
- none

**Questions for the Planner:**
- none

---

## D · Figma build

> How to build Part B in Figma. The Figma Agent receives this through the generated `figma-button-contract.md`.

> Written by the Planner (Claude). Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> **One file per platform (D-12).** This file builds the Tablet set in **Biowave DS — Tablet Components**. Structure, layer tree and properties are the same as the [Web Part D](../../../3-web-components/components/button/button.md#d--figma-build) D2–D4 (one fact, one home); this file lists only what differs. Values come from the Tablet spec [Part B](#b--spec).

| Field | Value |
|---|---|
| Component | Button |
| Platform | Tablet |
| Figma file | **Biowave DS — Tablet Components** (`_sync/figma-files.json` › `tablet`) |
| Page / section | `↳ Button` › section `Button` |
| Mode | **Create new.** Legacy reference (read only): none in Figma (tablet was designed from the mobile set). Use the Mobile build of this component as visual reference |
| Plan version | 2 · 2026-10-16 (D-12: own file) |

### D1 Rules for this build

Same as [Web D1](../../../3-web-components/components/button/button.md#d1-rules-for-this-build) (library first, everything bound, no local variables or styles), plus:
- **Typography mode:** on page `↳ Button` set the explicit variable mode **`Tablet`** for `5. Typography (EN)` and `6. Typography (AR)` (`page.setExplicitVariableModeForCollection`). Text styles stay `Web/{en|ar}/…` names; the mode gives the Tablet scale.

### D2 Component structure

As [Web D2–D4](../../../3-web-components/components/button/button.md#d2-component-structure), with these Tablet differences:
- `Size` adds `XL` (B2 `xl` row: `size/control/height/xl`, `spacing/control/padding-inline/xl`, `radius/xl`)
- `State` = `Default` · `Focused` · `Pressed` · `Disabled` · `Loading` (no `Hover`)
- Default instance size `LG`

### D3 Layer tree and auto layout

As [Web D3](../../../3-web-components/components/button/button.md#d3-layer-tree-and-auto-layout), with the Tablet differences listed in D2.

### D4 Properties

As [Web D4](../../../3-web-components/components/button/button.md#d4-properties), with the Tablet differences listed in D2.

### D5 Variants to generate

18 allowed `Variant × Color` × 4 sizes (`SM` · `MD` · `LG` · `XL`) × 5 states (no `Hover`) × 2 languages = **720**.

#### After this build is `Approved`
Report instances of the legacy reference above; move legacy sets to `_Deprecation Ground` in the Foundations file once product files use the Tablet library.

### D6 States, interactions and motion

As Web D6 without hover interactions. Press: smart animate per B4.

### D7 RTL

As Web D7 (`Language=AR` variants where the component has text).

### D8 Documentation pages

All 12 standard pages (`_templates/component.md` D8 + `2-foundations/figma-doc-kit.md` › Page layouts) in section `Button — Documentation` on `↳ Button` in this file, built only from the Doc Kit (Foundations library). Blocked until the Doc Kit exists. 07 Platform: `Doc/Device frame` = Tablet landscape + Tablet portrait. 09 Accessibility: target-size overlay (`target-min` = 48) on `SM`/`MD`.

Component description: one line from A1 + "Spec: 4-tablet-components/components/button/button.md".

### D9 Code Connect

`4-tablet-components/lib/src/components/button/bw_button.figma.dart` — `Variant` → `variant: BwButtonVariant.*`, `Color` → `color: BwButtonColor.*`, `Size` → `size: BwControlSize.*`, `State=Disabled` → `onPressed: null`, `State=Loading` → `loading: true`, `Label` → `label`, `Leading icon glyph` → `leadingIcon: Icons.*_rounded`, `Trailing icon glyph` → `trailingIcon`. Publish after code and Figma reviews are both `Approved`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Set on `↳ Button` in the Tablet file; structure and layer names as Web D2–D3 + differences above
- [ ] F-AC-2 Properties as Web D4 + differences; variant count per D5
- [ ] F-AC-3 Zero raw values; zero local variables/styles (all from the Foundations library)
- [ ] F-AC-4 Page Typography mode = `Tablet`; Light/Dark by mode only; Arabic fits without truncation
- [ ] F-AC-5 Values match the Tablet B2–B3 (redline, incl. `XL`)
- [ ] F-AC-6 Docs built (or reported blocked by the Doc Kit); Code Connect per D9 after approval

---

### D11 Execution log (filled by the Figma Agent)

| Field | Value |
|---|---|
| Agent / stages run | build · rtl · qa · document |
| Date | |
| Node IDs | component set `{id}` · docs section `{id}` |
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

> Changes to this component on this platform.

### F0 Changes from previous version

None — version 1.0. Filled when the version is above 1.0; it feeds Figma doc page 10.

### F1 Guidelines changelog

| Version | Date | Change | Migration | Author |
|---|---|---|---|---|
| 1.0 | 2026-10-16 | Initial. Replaces the Figma `.Button _en/_ar`, `Default Button/EN·AR` and mobile `Buttons` sets | Type Primary/Secondary/Tertiary → `variant` filled/outlined/text (tonal is new) · Color Primary → `brand`, White → `inverse`; Success/Warning/Info removed · Size Small/Medium/XLarge → `sm`/`md`/`lg` | Planner (Claude) |

### F2 Spec changelog

| Version | Date | Change | Breaking | Migration |
|---|---|---|---|---|
| 1.0 | 2026-10-16 | Initial | No | — |

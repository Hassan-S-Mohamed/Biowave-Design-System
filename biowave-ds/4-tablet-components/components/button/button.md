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
| Version | 1.1 · 2026-10-20 |
| Plan | Finished |
| Code | Built |
| Figma build | Planned |
| Review | Round 2 · 2026-10-20 · Approved |
| Source code | [`lib/src/components/button/`](../../lib/src/components/button/) |
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
| `leadingIcon` | `IconData?` | `Symbols.*_rounded` (D-18; re-exported by `biowave_foundations`) | `null` | | `leading-icon` |
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

Layout rules: width hugs content (`MainAxisSize.min`); `fullWidth` → `minimumSize` width `double.infinity` in the parent constraints. Height fixed by the size token (`fixedSize` height, `minimumSize` height). Outlined border drawn inside the height. `label` one line, `TextOverflow.ellipsis`, `softWrap: false`. Loading keeps the content's size (`Visibility(maintainSize: true, …)`) with the spinner centered on top. `MaterialTapTargetSize.padded` keeps the 48dp hit area for `sm`/`md`. Elevation 0 in every state. The `focus-ring` is painted outside the visible container and takes no layout space: focused or not, the button's size is the container size (height at least `BwLayout.tablet.minTarget`), never container + ring.

### B3 Tokens by part and state

Identical to the [Web B3](../../../3-web-components/components/button/button.md#b3-tokens-by-part-and-state) (same token for every part × state; tokens are platform-agnostic). Flutter mapping:

| Spec part / state | `ButtonStyle` field |
|---|---|
| `container` background (Default · Hover · Pressed · Disabled) | `backgroundColor` `WidgetStateProperty` |
| state layer (tonal · outlined · text) | `overlayColor`: hovered → `backgroundTransparentHovered`, pressed → `backgroundTransparentPressed`, focused → transparent; filled → always transparent |
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
| directional icons | Mirrored by `material_symbols_icons` itself for directional glyphs (`Symbols.arrow_forward_rounded`, `chevron_right`, `logout`…; D-18). Do not wrap in `Transform` |
| non-directional icons, `spinner` | Do not mirror |

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role / semantics | M3 button semantics (`button: true`, `enabled`). Icons `excludeFromSemantics` |
| Accessible name | `label` |
| Loading | `Semantics(label: '$label', value: loadingLabel, button: true, enabled: true)`; `SemanticsService.announce(loadingLabel, Directionality.of(context))` once when `loading` turns on; presses ignored, focus kept |
| Disabled | `onPressed: null` → not focusable, `enabled: false` |
| Focus | Keyboard focus only (`FocusManager.instance.highlightMode == traditional`): ring `border-width-focus` in `color-border-focus` (`inverse`: `color-border-inverse`) painted around the **visible container** (the shaped `Material`), never around the padded 48dp tap-target box: gap between container edge and ring = `border-focus-offset`, stroke = `border-width-focus`, ring inner-edge radius = container radius + offset (outer edge + `border-width-focus`, concentric). The ring takes no layout space (C3) and appears and disappears instantly (B4 Any → Focus `motion-duration-instant`) |
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
BwButton(label: 'تسجيل الحضور', leadingIcon: Symbols.login_rounded, onPressed: clockIn);
```

### B8 Figma

Structure, properties, the Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

- [ ] Golden tests: every allowed `variant` × `color` at `lg`, plus each size for `filled brand`, in light + dark and `Locale('en')` + `Locale('ar')`, rendered with the **real fonts** (`test/flutter_test_config.dart`, C5): Latin `Inter`, Arabic `IBM Plex Sans Arabic` (shaped, joined), Material Symbols Rounded glyphs — no Ahem boxes
- [ ] States: hovered, pressed, focused (keyboard highlight mode), disabled, loading — colors read from the resolved `ButtonStyle` equal the tokens in B3
- [ ] Loading: `onPressed` not called, size unchanged, focus kept, announcement made once
- [ ] Each invalid combination in B1 asserts in debug
- [ ] `meetsGuideline(androidTapTargetGuideline)` and `textContrastGuideline` for every variant × color, in light **and** dark
- [ ] Text scale 2.0: label not clipped — the container (measured) is taller than its size token for `sm` and at least as tall as the label
- [ ] Exact sizes: for each size the visible container (`tester.getSize` of the `Material` inside `BwButton`) has height `BwSize.controlHeight{Sm|Md|Lg|Xl}`; `fullWidth` in a parent of width W → container width W
- [ ] Focus ring geometry, for each size, LTR and RTL, keyboard focus: ring rect (`tester.getRect` of the caller key `BwButton.focus-ring`) = container rect inflated by `BwBorder.focusOffset + BwBorder.widthFocus` on every side (so for `sm`/`md` it follows the container, not the 48dp tap target); ring border width = `BwBorder.widthFocus`; color `borderFocus` (`inverse`: `borderInverse`); outer radius = container radius + `focusOffset` + `widthFocus`
- [ ] Ring takes no layout: the `BwButton` rect is identical before and after focus; its width equals the container width and its height equals `max(container height, BwLayout.tablet.minTarget)`
- [ ] Ring shows on the first frame after keyboard focus (no fade) and never in touch highlight mode
- [ ] `loading: true` with `onPressed: null` stays disabled: not focusable, `enabled: false`
- [ ] Directional icon mirrors in RTL; `Symbols.add_rounded` does not
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
| Plan version | 1.1 · 2026-10-20 |

### C1 Goal

`BwButton` from `package:biowave_tablet/biowave_tablet.dart` renders every allowed `variant` × `color` × `size` of B1–B3 from tokens only, behaves as B4–B6 in light/dark and en/ar, and passes B9. First component of this package: it also adds `BwControlSize` and the golden-test helpers later components reuse.

### C2 Scope

**In scope**: B1 API (all params) · C2 · C3 · C4 · C5 · C6 · C9.
**Out of scope**: Icon button, Split button, Button group; a shared Progress widget (Day 5) — use M3 `CircularProgressIndicator` directly inside the button.

### C3 Approach

- `BwButton` is a `StatelessWidget` that picks `FilledButton` / `FilledButton.tonal` / `OutlinedButton` / `TextButton` by `variant` and passes `style: BwButtonStyle.resolve(context, variant, color, size)`.
- `bw_button_style.dart`: a pure function that maps (variant, color, size) → `ButtonStyle` using only `context.bw.colors`, `context.bw.text`, `BwSize`, `BwSpacing`, `BwRadius`, `BwBorder`, `BwDuration`. One `switch` per B3 table — no colors computed with `withOpacity`/`lerp`.
- Child: `Row(mainAxisSize: MainAxisSize.min)` with `leadingIcon` / `label` / `trailingIcon` and `SizedBox(width: BwSpacing.control{Gap}{Size})` gaps; wrapped in `Visibility(maintainSize: true, maintainAnimation: true, maintainState: true, visible: !loading)`; spinner centered in a `Stack`.
- Focus ring (B6): `BwFocusRing` in `lib/src/common/bw_focus_ring.dart` — not exported from the package, reused by later controls (Icon button, Chip, Text field). It is **painted outside the visible container and never changes layout**. No `Padding`, no wrapper around the M3 button.
  - **Hook:** the M3 button's `ButtonStyle.backgroundBuilder`. Its `child` is exactly the shaped container (inside the button's `Material`, inside the 48dp tap-target padding), so the ring is sized from the container and never from the padded box. Pass `clipBehavior: Clip.none` to the M3 button: Flutter switches to `Clip.antiAlias` when a builder is set, which would clip the ring.
  - **Paint:** `Stack(clipBehavior: Clip.none, fit: StackFit.passthrough, children: [child, ring])`; the ring is `PositionedDirectional(start: -i, end: -i, top: -i, bottom: -i)` with `i = BwBorder.focusOffset + BwBorder.widthFocus`, then `IgnorePointer` → `DecoratedBox(BoxDecoration(border: Border.all(width: BwBorder.widthFocus, color: …), borderRadius: …))`. The border is drawn inside that box, so the gap to the container is `focusOffset`. Outer radius = container radius + `focusOffset` + `widthFocus` (inner edge = container radius + offset, concentric).
  - **When:** shown only if the builder's states contain `WidgetState.focused` **and** `FocusManager.instance.highlightMode == FocusHighlightMode.traditional`. `BwFocusRing` is a `StatefulWidget` that listens with `FocusManager.instance.addHighlightModeListener` (removed in `dispose`) so a mode change repaints it. Shown and hidden instantly — no `AnimatedOpacity` / `AnimatedContainer` (B4 Any → Focus is `motion-duration-instant`).
  - **API:** `BwFocusRing({required bool focused, required BorderRadiusGeometry borderRadius, required Color color, Key? ringKey, required Widget child})`. `borderRadius` is the control's container radius (resolved with `Directionality.of(context)`; a stadium or circle passes its own radius), so other shapes reuse it. `ringKey` is set on the ring's `DecoratedBox` by the caller — `BwButton` passes `ValueKey('BwButton.focus-ring')`; the shared widget hard-codes no key. Color: `context.bw.colors.borderFocus`, `inverse` → `borderInverse`.
- Loading: wrap `onPressed` to a no-op while loading **but keep it non-null** so the button stays enabled and focusable — only when `onPressed` itself is non-null (`loading && onPressed != null ? () {} : onPressed`); `onPressed: null` stays disabled even while loading (B1). Announce via `SemanticsService.announce`.
- Invalid combinations: `assert` + fallback (B1).
- Gotchas: M3 `FilledButton` default `minimumSize` (64×40) and `padding` must be overridden from tokens; `visualDensity` must be `VisualDensity.standard` so heights are exact; `tapTargetSize: MaterialTapTargetSize.padded`.

### C4 Token gaps

None (Foundations 1.1.0 added the control and inverse/overlay tokens).

### C5 Files to create / change

```
4-tablet-components/lib/src/common/bw_control_size.dart          new: enum BwControlSize { sm, md, lg, xl }
4-tablet-components/lib/src/common/bw_focus_ring.dart            new: BwFocusRing (C3), not exported
4-tablet-components/lib/src/components/button/bw_button.dart     new: BwButton, BwButtonVariant, BwButtonColor
4-tablet-components/lib/src/components/button/bw_button_style.dart  new
4-tablet-components/lib/biowave_tablet.dart                               change: export bw_control_size.dart and button/bw_button.dart
4-tablet-components/test/helpers/bw_test_app.dart                new: pumpBw(tester, child, {brightness, locale, textScale, reduceMotion}) using BwTabletTheme
                                                                    MaterialApp gets locale, supportedLocales [en, ar] and
                                                                    GlobalMaterialLocalizations.delegates (flutter_localizations,
                                                                    dev dependency); reduceMotion sets MediaQuery disableAnimations
4-tablet-components/test/flutter_test_config.dart                new: testExecutable loads the real fonts once before every test
4-tablet-components/test/fonts/                                  new: Inter-{Regular,Medium,SemiBold}.ttf · IBMPlexSansArabic-{Regular,Medium,SemiBold}.ttf
                                                                    · OFL-Inter.txt · OFL-IBMPlexSansArabic.txt (licences, unchanged)
4-tablet-components/test/button_test.dart                        new
4-tablet-components/test/goldens/button/                         new (generated goldens)
4-tablet-components/README.md                                    change: status table row
```

**Test fonts** (`test/flutter_test_config.dart`; review finding #6). Goldens must show the real Latin and Arabic text and the icon glyphs, so `testExecutable` calls `TestWidgetsFlutterBinding.ensureInitialized()`, loads three families with `FontLoader`, then runs `testMain()`:

| Family (name registered) | Source | Licence | Why this source |
|---|---|---|---|
| `BwFontFamily.en` (`Inter`) — 400 · 500 · 600 | `test/fonts/Inter-*.ttf`, static TTFs from the official Inter 4.x release (github.com/rsms/inter, `extras/ttf`), committed with `OFL-Inter.txt` | SIL OFL 1.1 | Not in any package: `google_fonts` downloads fonts over the network at run time (not offline, not deterministic) and `@fontsource` ships only WOFF/WOFF2, which `FontLoader` does not take. Committed TTFs are offline, pinned and OFL allows redistribution with the licence |
| `BwFontFamily.ar` (`IBM Plex Sans Arabic`) — 400 · 500 · 600 | `test/fonts/IBMPlexSansArabic-*.ttf`, static TTFs from github.com/google/fonts `ofl/ibmplexsansarabic`, committed with `OFL-IBMPlexSansArabic.txt` | SIL OFL 1.1 | Same as above |
| `packages/material_symbols_icons/MaterialSymbolsRounded` (the family Flutter resolves for `Symbols.*_rounded`) | `rootBundle.load('packages/material_symbols_icons/lib/fonts/MaterialSymbolsRounded.ttf')` — the asset already shipped by `material_symbols_icons` (dependency of `biowave_foundations`) | Apache 2.0 | Already on disk after `flutter pub get`, offline; nothing to commit |

Rules: register Latin and Arabic with the `BwFontFamily.en` / `.ar` constants, not string literals; read the TTFs with `File('test/fonts/…').readAsBytes()` (tests run from the package root); no `pubspec.yaml` change (the fonts are test-only, not package assets); `Noto Sans Arabic` (fallback) is not loaded. Goldens with real fonts are platform-specific: generate and compare them on macOS, where the checks run.

### C6 Tests

Implement every item in B9, plus:
- [ ] `pumpBw` helper covers the 4 theme × locale combinations; in `ar` a widget that needs `MaterialLocalizations` (e.g. `TextField`) builds; `reduceMotion: true` makes `context.bw.reduceMotion` true — the reduced-motion test uses it
- [ ] Test fonts load: a probe `Text` in `BwFontFamily.en` and `.ar` is not rendered with the test font (its width differs from the Ahem width), and `Icon(Symbols.add_rounded)` paints a glyph (golden)
- [ ] `BwButtonStyle.resolve` unit test: for each allowed (variant, color), resolved colors per `WidgetState` equal B3 tokens

### C7 Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 exactly (names, types, defaults, asserts, fallbacks)
- [ ] AC-2 Every value in B2–B3 comes from the listed token; no raw values, no `BwPalette`
- [ ] AC-3 B4 transitions; reduced motion respected
- [ ] AC-4 RTL as B5; a11y as B6 (focus ring only in keyboard mode; loading keeps focus and announces)
- [ ] AC-5 Tests pass: `cd 4-tablet-components && flutter analyze && flutter test`; `npm run sync` passes
- [ ] AC-6 Exported from `lib/biowave_tablet.dart`; `4-tablet-components/README.md` status table updated to `Built`
- [ ] AC-7 No ink splash; elevation 0; exact heights per size (golden + `tester.getSize`)
- [ ] AC-8 Focus ring painted outside the visible container with no layout change (C3, B6) and measured per size (B9); shared test setup per C5: real fonts via `test/flutter_test_config.dart`, `pumpBw` with Material localizations and `reduceMotion`
- [ ] AC-9 Review round 1 findings #1–#9 fixed as in the Fix round 1 task list below (E2)
- [ ] AC-10 C8 gets a "Fix round 1" entry; the 4 goldens regenerated with real fonts; header `Code` stays `Built`; `4-tablet-components/README.md` matches

#### Fix round 1 — Executor task list (Review round 1 · 2026-10-20)

| # | Finding | Do |
|---|---|---|
| 1 | 🔴 Focus ring geometry and layout | Rebuild `BwFocusRing` and its use in `BwButton` exactly as C3 › Focus ring (`backgroundBuilder` hook, `clipBehavior: Clip.none`, negative-inset ring, no `Padding`). Add the B9 focus-ring geometry and no-layout tests |
| 2 | 🟡 `loading` enables a disabled button | `loading && onPressed != null ? () {} : onPressed` (C3); test: `loading: true, onPressed: null` stays disabled and cannot take focus (B9) |
| 3 | 🟡 Ring fades in | No animation on the ring (C3); assert the ring is present after a single `pump()` following keyboard focus |
| 4 | 🟡 Tests do not measure | Measure the container `Material` per size with `tester.getSize`; 200 % text scale asserts the `sm` container grew and fits the label; ring color, width and offset asserted; full-width asserts the container width (B9) |
| 5 | 🟡 `pumpBw` | Add `locale`, `supportedLocales`, `GlobalMaterialLocalizations.delegates` and a `reduceMotion` flag (C5); move the reduced-motion test onto `pumpBw` |
| 6 | 🟡 Ahem goldens | Add `test/flutter_test_config.dart` and `test/fonts/` with the licence files (C5 › Test fonts); regenerate the 4 goldens with `flutter test --update-goldens` and check by eye that Arabic is shaped and icons are glyphs |
| 7 | 🟢 Hard-coded ring key | `ringKey` parameter supplied by the caller (C3) |
| 8 | 🟢 Guideline tests light only | Loop `androidTapTargetGuideline` and `textContrastGuideline` over light and dark (B9) |
| 9 | 🟢 Header "Source code" | Set the header row to `lib/src/components/button/` (built) when C8 gets the Fix round 1 entry |

---

### C8 Execution log (filled by the Executor)

| Field | Value |
|---|---|
| Agent | Codex |
| Date | 2026-10-20 |
| Built | `BwButton` with all allowed variants, colors, sizes, icons, full-width, loading, keyboard focus ring, localized loading semantics and token-only M3 styles; shared `BwControlSize`, package-private focus-ring helper and `pumpBw`; 4 light/dark × en/ar goldens and behavior/token/a11y tests. |
| Files changed | `lib/src/common/bw_control_size.dart`; `lib/src/common/bw_focus_ring.dart`; `lib/src/components/button/bw_button.dart`; `lib/src/components/button/bw_button_style.dart`; `lib/biowave_tablet.dart`; `test/helpers/bw_test_app.dart`; `test/button_test.dart`; `test/goldens/button/`; `4-tablet-components/README.md`; this C8 log; `CHANGELOG.md` |
| Checks | `flutter analyze` — pass, no issues; `flutter test --update-goldens --experimental-faster-testing` — pass, 37 tests; `flutter test --experimental-faster-testing` — pass, 37 tests; `npm run component-tokens` — pass; `npm run sync` — pass, READY; `npm run docs:check` — pass under the run note (only the 2 known stale tablet/mobile button-group Figma contracts). |

**Deviations from the plan or spec** (with reason — the Planner updates the spec if accepted):
- The execution sandbox denies Flutter's normal localhost test-harness socket. The same Flutter toolchain ran the suite in its no-socket `--experimental-faster-testing` mode against a disposable copy with absolute package roots; goldens were generated there and copied back, then all 37 tests passed again without `--update-goldens`. No production or test behavior changed for this runner workaround.
- Dart privacy is library-scoped, so the reusable focus-ring class is public inside its source library but remains package-private in practice because `bw_focus_ring.dart` is not exported.

**Questions for the Planner:**
- none

#### Fix round 1 — 2026-10-20

| Finding | What changed (`file:line`) | Test that proves it |
|---|---|---|
| #1 Focus ring geometry and layout | `lib/src/common/bw_focus_ring.dart:48`; `lib/src/components/button/bw_button.dart:92` — moved the token-sized negative-inset ring into `ButtonStyle.backgroundBuilder` with `Stack(clipBehavior: Clip.none)`, no padding or layout growth | `test/button_test.dart:441` — ring/container rect, radius and unchanged-layout assertions for every size in LTR and RTL |
| #2 Loading enabled a disabled button | `lib/src/components/button/bw_button.dart:85` — loading installs a no-op only when `onPressed` was non-null; loading semantics now preserve disabled state | `test/button_test.dart:406` — disabled loading stays unfocusable, has null `onPressed` and disabled semantics |
| #3 Ring faded in | `lib/src/common/bw_focus_ring.dart:54` — ring is conditionally painted with no animated widget | `test/button_test.dart:441`, `test/button_test.dart:508` — ring exists after the first focus frame and no `AnimatedContainer` is present |
| #4 Tests did not measure | `test/button_test.dart:296`, `test/button_test.dart:441`, `test/button_test.dart:575` — measured visible container heights, 200% growth/label fit, ring stroke/color/offset/radius, no-layout geometry and full width | The same tests use `tester.getSize` / `tester.getRect` against the button's `Material` and caller-keyed ring |
| #5 `pumpBw` lacked localization and reduced motion | `test/helpers/bw_test_app.dart:7` — added `locale`, en/ar supported locales, Material delegates and `reduceMotion` media data | `test/button_test.dart:333`, `test/button_test.dart:621` — reduced duration, all theme/locale combinations and Arabic `TextField` localizations |
| #6 Ahem goldens | `test/flutter_test_config.dart:8`; `test/fonts/`; `test/goldens/button/` — loaded pinned Inter, IBM Plex Sans Arabic and Material Symbols Rounded, retained OFL licences, and regenerated four goldens with localized Arabic fixtures | `test/button_test.dart:649`, `test/button_test.dart:691` — real-font probes plus inspected light/dark en/ar goldens with shaped Arabic and icon glyphs |
| #7 Hard-coded shared ring key | `lib/src/common/bw_focus_ring.dart:8`; `lib/src/components/button/bw_button.dart:99` — shared helper accepts `ringKey`; Button supplies its own key | `test/button_test.dart:475` — caller key locates and measures the rendered ring |
| #8 Guideline tests were light-only | `test/button_test.dart:589` — every allowed variant/color runs tap-target and contrast guidelines in light and dark | `test/button_test.dart:589` — 36 light/dark accessibility cases pass |
| #9 Header source link | `components/button/button.md:21` — linked the built source directory | `npm run docs:check` — header/link structure checked; only the two noted unrelated stale button-group Figma contracts remain |

**Checks:** Flutter SDK `dart analyze` — pass, no issues; `flutter test --update-goldens --experimental-faster-testing` — pass, 65 tests; `flutter test --experimental-faster-testing` — pass, 65 tests; `npm run component-tokens` — pass; `npm run sync` — pass, READY; `npm run docs:check` — expected baseline only (2 unrelated stale tablet/mobile button-group Figma contracts).

**Deviations from the plan or spec:**
- The execution sandbox still denies Flutter's SDK-cache writes and localhost test-harness socket. The same Flutter 3.47.7 toolchain ran the suite in its no-socket `--experimental-faster-testing` mode against a disposable copy with absolute package roots; all repository sources and goldens came from this worktree.

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
- **Typography mode:** on page `↳ Button` set the explicit variable mode **`Tablet · EN`** of `5. Typography` (Arabic frames and examples: **`Tablet · AR`**) (`page.setExplicitVariableModeForCollection`). Text styles stay the same `{role}/{size}` names; the mode gives the Tablet scale and the language font.

### D2 Component structure

As [Web D2–D4](../../../3-web-components/components/button/button.md#d2-component-structure), with these Tablet differences:
- `Size` adds `XL` (B2 `xl` row: `size/control/height/xl`, `spacing/control/padding-inline/xl`, `radius/xl`)
- `State` = `Default` · `Focused` · `Pressed` · `Disabled` · `Loading` (no `Hovered`)
- Default instance size `LG`

### D3 Layer tree and auto layout

As [Web D3](../../../3-web-components/components/button/button.md#d3-layer-tree-and-auto-layout), with the Tablet differences listed in D2.

### D4 Properties

As [Web D4](../../../3-web-components/components/button/button.md#d4-properties), with the Tablet differences listed in D2.

### D5 Variants to generate

18 allowed `Variant × Color` × 4 sizes (`SM` · `MD` · `LG` · `XL`) × 5 states (no `Hovered`) × 2 languages = **720**.

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
| 2 | 2026-10-20 | Approved | not reviewed |
| 1 | 2026-10-20 | Changes requested | not reviewed |

### E3 Round 2 — 2026-10-20

| Field | Value |
|---|---|
| Plan version reviewed | 1.1 |
| Spec version reviewed | 1.1 |
| Reviewer | Claude |
| Date | 2026-10-20 |
| Commit reviewed | `998e775` (branch `ds/button-tablet`, `git diff 593e7d4..HEAD -- 4-tablet-components/lib 4-tablet-components/test`; working tree clean) |
| Verdict | **Approved** (0 🔴, 0 🟡, 1 🟢 new; Round 1 #1–#9 all fixed) |

Checks run by the Reviewer (not copied from C8):

| Command | Result |
|---|---|
| `cd 4-tablet-components && flutter analyze` | ✓ No issues found |
| `cd 4-tablet-components && flutter test` | ✓ 65 tests, all passed (normal runner; goldens compared, not updated) |
| `npm run component-tokens` | ✓ web / tablet / mobile pass |
| `npm run sync` | ✓ READY for component work (18 docs in the Figma build queue, not blocking) |
| `npm run docs:check` | ✗ 2 errors — baseline only: `tablet` and `mobile` `button-group` Figma contracts stale (fixed on `ds/button-web`, PR #1, not merged). Not this unit; not a finding |

Extra evidence: a throw-away probe (scratch copy of the package outside the repo, nothing in the repo changed) rendered a keyboard-focused `BwButton` next to a second button for every size in `en` and `ar` on `surfacePage` and sampled pixels on all four sides of the visible container: at 1 dp outside the container = page color (the `focusOffset` gap), at 3 dp = `borderFocus` (#254471, the `widthFocus` stroke), at 5 dp = page color again. `BwButton` rect = container rect for `lg`/`xl` and container + tap-target padding (height 48) for `sm`/`md`, focused or not.

#### Previous round (Round 1) findings

| # | Was | Status | Evidence |
|---|---|---|---|
| 1 | 🔴 Focus ring geometry and layout | **Fixed** | `bw_button.dart:92-103` hooks `BwFocusRing` into `ButtonStyle.backgroundBuilder` (child = shaped container inside the M3 `Material`, inside the 48 dp tap-target padding); `clipBehavior: Clip.none` on all four M3 buttons `:171,180,189,198`; `bw_focus_ring.dart:49-79` `Stack(clipBehavior: Clip.none, fit: StackFit.passthrough)` + `PositionedDirectional(-inset…)` with `inset = focusOffset + widthFocus`, `IgnorePointer` → `DecoratedBox` border `widthFocus`, outer radius = container radius + inset; no `Padding`. Tests `focus ring matches {sm,md,lg,xl} container in {en,ar}` (`button_test.dart:440-506`): ring rect = container rect inflated by inset, `BwButton` rect unchanged by focus, width = container width, height = `max(container, minTarget)`, stroke, color and radius asserted. Pixel probe above confirms the 2 dp gap and 2 dp stroke on every side, LTR and RTL |
| 2 | 🟡 `loading` enabled a disabled button | **Fixed** | `bw_button.dart:85` `loading && onPressed != null ? () {} : onPressed`; loading semantics `enabled: onPressed != null` `:212`. Test `disabled loading is not focusable or enabled` (`button_test.dart:406-427`): focus refused, `FilledButton.onPressed` null, semantics `isEnabled` false |
| 3 | 🟡 Ring faded in | **Fixed** | `bw_focus_ring.dart:59` plain `if (_showRing)` — no `Animated*`, no duration. Ring found after one `pump()` in the geometry tests; `focus ring is instant, keyboard-only, and inverse-aware` asserts no `AnimatedContainer` |
| 4 | 🟡 Tests did not measure | **Fixed** | `uses exact size tokens and grows at 200% text scale` (`:296-331`) measures the container `Material` per size = `BwSize.controlHeight*`, and at 2.0 asserts `sm` container > token and ≥ label height; ring rect/stroke/color/radius measured (#1); `full width uses the parent width` (`:575-588`) measures the container = 480 |
| 5 | 🟡 `pumpBw` | **Fixed** | `test/helpers/bw_test_app.dart:15-30` `locale`, `supportedLocales [en, ar]`, `GlobalMaterialLocalizations.delegates`, `reduceMotion` → `disableAnimations`. Test `pumpBw provides locales, directions, and reduced motion` builds a `TextField` in all 4 theme × locale combos; `honours reduced motion` (`:333-352`) now uses `pumpBw(reduceMotion: true)` |
| 6 | 🟡 Ahem goldens | **Fixed** | `test/flutter_test_config.dart:8-44` loads `BwFontFamily.en` / `.ar` from `test/fonts/*.ttf` (OFL licences committed) and `MaterialSymbolsRounded` from the package asset; no `pubspec.yaml` change. Opened all 4 PNGs in `test/goldens/button/`: Inter Latin labels, IBM Plex Sans Arabic labels shaped and joined, `add` and `arrow_forward` drawn as real Material Symbols glyphs; in `ar` the arrow points left (mirrored), `add` unchanged, order mirrored. Probe test `real Latin and Arabic test fonts replace Ahem` |
| 7 | 🟢 Hard-coded ring key | **Fixed** | `bw_focus_ring.dart:13,67` `ringKey` parameter; caller passes `ValueKey('BwButton.focus-ring')` `bw_button.dart:99` |
| 8 | 🟢 Guideline tests light only | **Fixed** | `button_test.dart:590-618` loops `Brightness.values` × 18 allowed variant/color — 36 cases pass |
| 9 | 🟢 Header "Source code" | **Fixed** | Header row links `lib/src/components/button/` |

#### Acceptance criteria

| AC | Result | Evidence (file:line / test name) |
|---|---|---|
| AC-1 API matches B1 | ✅ | `bw_button.dart:15-55` names, types, defaults; asserts `:29-42`; fallbacks `:57-66`; `loading` + `onPressed: null` stays disabled `:85,212`. Tests `uses the documented defaults and M3 variant`, `asserts every invalid combination`, `disabled loading is not focusable or enabled` |
| AC-2 Values from tokens | ✅ | Ring: `BwBorder.focusOffset`, `BwBorder.widthFocus`, `borderFocus` / `borderInverse` (`bw_button.dart:86-91`, `bw_focus_ring.dart:49-73`); style file unchanged since Round 1 (✅ there). `component source contains no prohibited raw values` passes; no `BwPalette` in `lib/` |
| AC-3 B4 transitions, reduced motion | ✅ | `animationDuration` and `AnimatedSwitcher` use `BwDuration.instant` under `reduceMotion` (`bw_button_style.dart:69-70`, `bw_button.dart:79-80`); ring instant (Round 1 #3). `honours reduced motion` via `pumpBw` |
| AC-4 RTL as B5; a11y as B6 | ✅ | Ring around the visible container, gap `focusOffset`, stroke `widthFocus`, concentric radius, LTR + RTL (tests and probe above); keyboard-only via highlight-mode listener `bw_focus_ring.dart:28-45` (test `focus ring is instant, keyboard-only, and inverse-aware`); loading keeps focus and announces once (`loading blocks presses, keeps size and focus, and announces once`); `ar` goldens mirror layout and directional icon |
| AC-5 Tests pass; sync passes | ✅ | Checks table above |
| AC-6 Exported; README `Built` | ✅ | `lib/biowave_tablet.dart` unchanged (exports `bw_control_size.dart`, `button/bw_button.dart`; ring and style not exported); README row Code = `Built` |
| AC-7 No splash; elevation 0; exact heights | ✅ | Style unchanged (`NoSplash`, elevation 0); heights 32 / 40 / 48 / 56 measured with `tester.getSize` on the container `Material` (`uses exact size tokens…`) and in the probe |
| AC-8 Ring outside container, no layout change; shared test setup | ✅ | Round 1 #1 and #5 evidence; `flutter_test_config.dart` loads real fonts; `pumpBw` has Material localizations and `reduceMotion` |
| AC-9 Round 1 #1–#9 fixed per task list | ✅ | Previous-round table above — all 9 Fixed |
| AC-10 C8 "Fix round 1"; goldens regenerated; status | ✅ | C8 › "Fix round 1 — 2026-10-20" with file:line + test per finding; 4 goldens regenerated with real fonts (opened and checked); header `Code` = `Built`; `4-tablet-components/README.md` row matches |

#### Goldens — dark theme and filled neutral

- **Filled neutral is not visible in any golden, light or dark.** Its container uses `color-background-neutral-default` (B3 → Web B3 3.1, `bw_button_style.dart:139`), and the golden harness paints the page with the **same** token (`test/button_test.dart:761` `backgroundNeutralDefault`: light #EDEDED, dark #292929). So the button shows as label + icon only. This **matches the B3 tokens** — it is the harness background, not the button, that is wrong (finding 10).
- On the real page background (`color-surface-page`: dark #0A0A0A, light #F7F7F7) the dark filled-neutral container (#292929) is clearly visible; in light it is a subtle #EDEDED on #F7F7F7, as designed.
- The rest of the dark goldens match B3: filled brand / secondary / error use their dark default backgrounds, tonal uses the dark subtle backgrounds, outlined borders and text colors switch, `inverse` sits on the brand fill.

#### Notes for later units (not findings)

- The ring takes no layout space by design (B2). A sibling painted after the button covers the part of the ring that overlaps it: in the probe, two buttons placed with 0 gap hide the ring on the shared edge (right in LTR, left in RTL). Any layout that puts controls closer than `focusOffset + widthFocus` (4 dp) will clip the ring — worth a line in the Button group / Split button plans (spacing ≥ 4 dp, or the focused item painted last). Ancestors that clip (`ClipRRect`, scroll views with no padding) also cut it for `lg`/`xl`, which have no tap-target padding around them.
- Dark `color-surface-subtle` and `color-surface-raised` are both #292929, the same value as `color-background-neutral-default`: a filled-neutral button on a dark card has no visible container. A Foundations question for the Planner, not this unit.

#### Rule checks (AGENTS.md §2)

| Rule | Result | Notes |
|---|---|---|
| No generated files edited | ✅ | Fix commit touches no `generated/`, `dist/`, `_sync/*.json` or contract |
| No raw values / no primitives | ✅ | `lib/` clean; numeric paddings only in the test golden harness |
| Logical properties, RTL icons | ✅ | `PositionedDirectional`, `BorderRadiusDirectional` resolved with `Directionality`; `ar` goldens mirror the arrow only |
| Light + dark, en + ar tested | ✅ | 4 real-font goldens; guideline tests in light and dark; focus geometry in en and ar |
| Accessibility (keyboard, focus, labels, target) | ✅ | Ring 2 dp outside the container, 2 dp stroke, keyboard only, instant; targets ≥ 48 dp; disabled stays disabled while loading |
| Stayed inside the plan | ✅ | Fix files = C5 list; deviation in C8 (sandboxed runner `--experimental-faster-testing`) is a tooling workaround only — the Reviewer ran the normal runner and all 65 tests pass |
| Code matches spec (API names, tokens, states, RTL, a11y) | ✅ | See AC table |
| Accepted deviations reflected back into the spec | ✅ | None need a spec change |
| Changelog | ✅ | `CHANGELOG.md` "Tablet Button — fix round 1 (1.1)" |

#### Findings

| # | Severity | File | Issue | Required change | Owner |
|---|---|---|---|---|---|
| 10 | 🟢 Nit | `test/button_test.dart:761` | The golden harness page uses `backgroundNeutralDefault`, the same token as the filled-neutral container, so filled neutral has no visible container in all four goldens and a regression in its background would not show | Paint the golden page with `context.bw.colors.surfacePage` and regenerate the 4 goldens | Executor |

#### Next step

- Approved. Finding 10 is a nit: fix it with the next change to this unit (or before merge if the orchestrator wants a clean golden). No Planner items; Plan stays `Finished`.

### E2 Round 1 — 2026-10-20

| Field | Value |
|---|---|
| Plan version reviewed | 1 |
| Spec version reviewed | 1.0 |
| Reviewer | Claude |
| Date | 2026-10-20 |
| Commit reviewed | `e12f9fa` (branch `ds/button-tablet`, `git diff main...HEAD`) |
| Verdict | **Changes requested** (1 🔴, 5 🟡, 3 🟢; 2 Planner-owned → Plan `Open`) |

Checks run by the Reviewer (not copied from C8):

| Command | Result |
|---|---|
| `cd 4-tablet-components && flutter analyze` | ✓ No issues found |
| `cd 4-tablet-components && flutter test` | ✓ 37 tests, all passed (normal runner, no `--experimental-faster-testing` needed here) |
| `npm run component-tokens` | ✓ web / tablet / mobile pass |
| `npm run sync` | ✓ READY for component work (18 docs in the Figma build queue, not blocking) |
| `npm run docs:check` | ✗ 2 errors — baseline only: `tablet` and `mobile` `button-group` Figma contracts stale (fixed on `ds/button-web`, PR #1, not merged). Not this unit; not a finding |

Extra evidence: a throw-away probe test run against a scratch copy of the package (nothing in the repo changed) measured the rendered rects reported in findings 1, 2 and 5.

#### Acceptance criteria

| AC | Result | Evidence (file:line / test name) |
|---|---|---|
| AC-1 API matches B1 | ✅ (with finding 2) | `bw_button.dart:9-55` names, types, defaults match B1; asserts `:29-42` (empty label message matches B1); fallbacks `:57-66` (tonal neutral/inverse → outlined, trailing dropped). Tests `asserts every invalid combination`, `uses the documented defaults and M3 variant`. Finding 2: `loading: true` + `onPressed: null` turns a disabled button into an enabled one |
| AC-2 Values from tokens, no raw values / `BwPalette` | ✅ | `bw_button_style.dart:26-55` (B2 heights, padding, gap, icon size, radius incl. `xl` → `BwRadius.xl`), `:57-121`, palettes `:123-249` match Web B3 3.1–3.4 token for token; disabled per variant matches; `shadowColor` uses `backgroundTransparentDefault`. No `Color(0x`, numeric insets, `Duration(milliseconds:` or `BwPalette` in `lib/` (test `component source contains no prohibited raw values`) |
| AC-3 B4 transitions, reduced motion | ❌ | `animationDuration` `bw_button_style.dart:69-70` and `AnimatedSwitcher` `bw_button.dart:79-80,129-130` honour `context.bw.reduceMotion` ✓. But the focus ring animates in with `BwDuration.sm` (`bw_button.dart:188` → `bw_focus_ring.dart:67-69`); B4 (Web table) says Any → Focus is `motion-duration-instant` — finding 3. Reduced-motion test only checks `ButtonStyle.animationDuration` (`honours reduced motion`) |
| AC-4 RTL as B5; a11y as B6 | ❌ | RTL ✓: `EdgeInsetsDirectional` `bw_button_style.dart:102-104`, `BorderRadiusDirectional` `:107`, no `Transform` on icons, `ar` goldens mirror order. Loading ✓: keeps focus and blocks presses (`bw_button.dart:85`), announces once via `SemanticsService.sendAnnouncement` post-frame (`:229-251`), semantics label/value (`:194-204`); test `loading blocks presses, keeps size and focus, and announces once`. Keyboard-only ring ✓ (`bw_focus_ring.dart:30-32`, test `focus ring appears only in keyboard highlight mode`). **Focus ring geometry ✗** — finding 1 |
| AC-5 Tests pass; sync passes | ✅ | See checks table above |
| AC-6 Exported; README `Built` | ✅ | `lib/biowave_tablet.dart` exports `src/common/bw_control_size.dart` and `src/components/button/bw_button.dart`; `bw_focus_ring.dart` and `bw_button_style.dart` not exported ✓. `4-tablet-components/README.md` row Code = `Built` |
| AC-7 No ink splash; elevation 0; exact heights | ⚠️ code ✅ / test ❌ | `splashFactory: NoSplash.splashFactory` `bw_button_style.dart:94`; `elevation` 0 `:90`; `visualDensity.standard` + token `minimumSize` `:95-100`. Probe: visual containers are 32 / 40 / 48 / 56 for sm / md / lg / xl ✓. But no test measures them with `tester.getSize` as AC-7 asks — finding 4 |

#### Goldens and tests (§10 / B9 / C6)

| B9 / C6 item | Covered? | Evidence |
|---|---|---|
| Goldens: allowed variant × color at `lg` + each size of `filled brand`, light/dark × en/ar | ⚠️ | 4 files `test/goldens/button/button-{light,dark}-{en,ar}.png`, 18 variant×color + 4 sizes each ✓. Rendered with the Ahem test font: every label and icon is a box, so the Arabic font, Arabic shaping and Material Symbols glyphs are not verified — finding 6 |
| States: resolved `ButtonStyle` colors equal B3 | ✅ | `resolved colors match tokens for every allowed variant and color` — default, hovered, pressed, focused, disabled for background, foreground, icon, overlay, side. Light theme only (dark uses the same token names, acceptable) |
| Loading: no press, size kept, focus kept, one announcement | ✅ | `loading blocks presses, keeps size and focus, and announces once` (asserts exactly `['Saving…']`, then empty on rebuild) |
| Each invalid combination asserts | ✅ | `asserts every invalid combination` |
| Tap target + text contrast for every variant × color | ⚠️ | `<variant>/<color> meets a11y guidelines` × 18 — light/en only; dark contrast not checked (finding 8) |
| Text scale 2.0: label not clipped | ❌ | `uses exact size tokens and grows at 200% text scale` only asserts no exception and `maxLines`/`overflow`; never checks the container grew or the label fits (probe: `sm` container grows 32 → 40, so the code is fine) — finding 4 |
| Directional icon mirrors in RTL, `add` does not | ⚠️ | `directional icons opt into RTL mirroring but add does not` checks `IconData.matchTextDirection` only (acceptable; the actual mirroring is Flutter's) |
| No raw values (lint test) | ✅ | `component source contains no prohibited raw values` |
| `pumpBw` covers the 4 theme × locale combos | ⚠️ | `test/helpers/bw_test_app.dart` — yes, but `ar` has no `MaterialLocalizations` (finding 5) |
| `BwButtonStyle.resolve` unit test | ✅ | same test as "States" |

#### Shared pieces (reused by later components)

- **`BwControlSize`** (`lib/src/common/bw_control_size.dart`) — plain `enum { sm, md, lg, xl }`, exported. Fine for Text field / Select. Size → token mapping lives per component (`BwButtonStyle.metrics`), which is right.
- **`BwFocusRing`** (`lib/src/common/bw_focus_ring.dart`) — will cause trouble as is: (a) the geometry is wrong and it changes layout (finding 1); (b) it only knows a uniform `double radius`, so a stadium Chip, a circular Icon button or a Text field with a different outline cannot use it — it should take the control's `ShapeBorder` / `BorderRadiusGeometry`; (c) it hard-codes the key `BwButton.focus-ring` (finding 7); (d) it rings whatever the child lays out, which for M3 buttons with `MaterialTapTargetSize.padded` is the 48 dp hit area, not the visible container.
- **`pumpBw`** (`test/helpers/bw_test_app.dart`) — extension shape is fine, but it will break the next component: no `GlobalMaterialLocalizations` delegates, so in `ar` any widget that needs `MaterialLocalizations` throws (probe with a `TextField`: "No MaterialLocalizations found."); it has no reduce-motion switch, so later reduce-motion tests have to bypass it (this unit's test already does, `button_test.dart:335-358`) — finding 5.

#### Rule checks (AGENTS.md §2)

| Rule | Result | Notes |
|---|---|---|
| No generated files edited | ✅ | Diff touches no `generated/`, `dist/`, `_sync/*.json` or contract file |
| No raw values / no primitives | ✅ | `lib/` clean; raw paddings only in the golden harness in `test/` |
| Logical properties, RTL icons | ✅ | `EdgeInsetsDirectional`, `BorderRadiusDirectional`, `AlignmentDirectional` throughout |
| Light + dark, en + ar tested | ⚠️ | All four combos exist in goldens; a11y guideline tests light/en only; Arabic glyphs not rendered (findings 6, 8) |
| Accessibility (keyboard, focus, labels, target) | ❌ | Focus ring not 2 px offset and wrong box for sm/md (finding 1); targets ≥ 48 ✓; labels ✓ |
| Stayed inside the plan | ✅ | Files = C5 list; deviations recorded in C8 (test-runner workaround, Dart privacy) — both accepted, no spec change needed |
| Code matches spec (API names, tokens, states, RTL, a11y) | ❌ | Findings 1, 2, 3 |
| Accepted deviations reflected back into the spec | ✅ | None that need a spec change |
| Changelog | ✅ | `CHANGELOG.md` entry "Tablet Button — built (1.0)" |

#### Findings

| # | Severity | File | Issue | Required change | Owner |
|---|---|---|---|---|---|
| 1 | 🔴 Blocker | `components/button/button.md:402` (C3) → `lib/src/common/bw_focus_ring.dart:67-85` | C3 prescribes a `DecoratedBox` border + `Padding(focusOffset)` around the button. Result (probe, `lg`): ring outer rect = container + 2 px, and the 2 px border is drawn inside it, so the ring **touches** the container — offset 0, not `border-focus-offset`. For `sm`/`md` the ring wraps the padded 48 dp tap target (`sm`: 52 × 52 ring around a 48 × 32 container → 8 px gap top/bottom, 0 px at the sides, radius `md + 2` on the wrong box). The padding is also always laid out, so every button is 4 px wider and taller than its container even when unfocused (`fullWidth` in 480 → container 476). Breaks AGENTS.md rule 6 and B6 | Planner: rewrite C3 so the ring is painted **outside the visible container without affecting layout** (e.g. a foreground `CustomPaint`/`DecoratedBox` positioned with negative inset `-(focusOffset + widthFocus)` in a `Stack(clipBehavior: Clip.none)` around the shape, not the tap-target box), gap = `BwBorder.focusOffset`, stroke = `BwBorder.widthFocus`, radius = container radius + offset; give `BwFocusRing` a shape/`BorderRadiusGeometry` parameter so Chip / Icon button / Text field can reuse it; add a B9 test that measures ring rect vs container rect for every size. Then regenerate the contract; Executor re-implements | Planner |
| 2 | 🟡 Should fix | `lib/src/components/button/bw_button.dart:85` | `action = loading ? () {} : onPressed` makes a **disabled** button (`onPressed: null`) enabled and focusable as soon as `loading` is true (probe: `FilledButton.onPressed` non-null, focus accepted). B1: `null` = disabled | `final action = loading && onPressed != null ? () {} : onPressed;` and add a test: `loading: true, onPressed: null` stays disabled and unfocusable |
| 3 | 🟡 Should fix | `lib/src/components/button/bw_button.dart:188` | Focus ring fades in over `BwDuration.sm`; B4 (Web table, inherited by Tablet B4) says Any → Focus is `motion-duration-instant` | Pass `BwDuration.instant` to the ring (or drop the animation); assert it in the focus-ring test |
| 4 | 🟡 Should fix | `test/button_test.dart:287-333`, `:440-473`, `:504-516` | Tests run but do not assert what B9/AC-7 ask: heights are read from `style.minimumSize`, not measured with `tester.getSize` on the visible container; the 200 % text-scale test never checks the container grew or the label fits; the focus-ring test checks only `border != null` (not color, width, offset — which is how finding 1 slipped through); the full-width test measures `BwButton`, which hides the 4 px loss | Measure the `Material` inside `BwButton.container` for each size (= `BwSize.controlHeight*`); at text scale 2 assert container height ≥ label height and > token height for `sm`; assert ring color (`borderFocus`, `borderInverse` for inverse), width and offset; full-width asserts the container width |
| 5 | 🟡 Should fix | `test/helpers/bw_test_app.dart:12-33` | Shared helper sets the locale only with `Localizations.override`, without `GlobalMaterialLocalizations.delegates` / `supportedLocales` / `locale`. In `ar` there is no `MaterialLocalizations` (probe: a `TextField` throws "No MaterialLocalizations found."), so Text field and every later component will fail their Arabic tests. No reduce-motion switch either | Add `locale`, `supportedLocales: [Locale('en'), Locale('ar')]`, `localizationsDelegates: GlobalMaterialLocalizations.delegates` (`flutter_localizations` is already a dev dependency) and a `reduceMotion` flag (`MediaQuery.disableAnimations`); move the reduced-motion test onto `pumpBw` |
| 6 | 🟡 Should fix | `components/button/button.md:364` (B9) and C5 | Goldens render with the Ahem test font, so the `ar` goldens show boxes: the Arabic font, Arabic shaping and the Material Symbols glyphs (incl. directional mirroring) are never seen. The plan has no font-loading step and no file for it | Planner: add `4-tablet-components/test/flutter_test_config.dart` (shared, loads the Biowave Latin + Arabic fonts and Material Symbols Rounded before goldens) to C5 and state in B9 that goldens use real fonts; Executor regenerates the 4 goldens |
| 7 | 🟢 Nit | `lib/src/common/bw_focus_ring.dart:68` | Shared widget hard-codes `ValueKey('BwButton.focus-ring')`; every later control would get a "BwButton" key | Take the key from the caller (or use `'BwFocusRing'`) |
| 8 | 🟢 Nit | `test/button_test.dart:518-540` | `androidTapTargetGuideline` / `textContrastGuideline` run in light/en only; dark values differ | Loop the guideline tests over both brightnesses |
| 9 | 🟢 Nit | `components/button/button.md:21` (header) | "Source code" still says "not built yet" | Link `lib/src/components/button/` when the fix round updates C8 |

Previous round: none (this is round 1).

#### Next step

- Planner: findings 1 and 6 — fix C3, C5, B9; set Plan `Finished`; `npm run contract -- tablet button`.
- Executor (fix round 1): findings 1–9 against the regenerated contract; append "Fix round 1" to C8; Code stays `Built`.

#### Planner response (2026-10-20)

| # | Decision |
|---|---|
| 1 | C3 rewritten: `BwFocusRing` hooks into `ButtonStyle.backgroundBuilder`, so it wraps the shaped container and not the 48dp tap target; painted in a `Stack(clipBehavior: Clip.none)` at inset −(`focusOffset` + `widthFocus`), M3 button `clipBehavior: Clip.none`, no `Padding`; takes a `BorderRadiusGeometry` and a caller `ringKey`. B2 + B6 state the geometry and that the ring takes no layout; B9 adds ring-rect vs container-rect per size (LTR + RTL) and the no-layout-change test |
| 6 | C5 adds `test/flutter_test_config.dart` and `test/fonts/`: Inter and IBM Plex Sans Arabic static TTFs committed with their OFL licences (`google_fonts` is network-only, `@fontsource` is WOFF only); Material Symbols Rounded loaded from the `material_symbols_icons` package asset. B9 says goldens use real fonts. No new tokens |
| — | Also clarified in C3 (Executor findings #2, #3, #7, so the contract and the fix agree): loading keeps `onPressed: null` disabled; the ring has no animation; the ring key comes from the caller. `pumpBw` (#5) described in C5 |

Same focus-ring and test-font changes applied to the Mobile Button plan (not built yet). Executor items for fix round 1: #1–#9 (C7 › Fix round 1 task list, AC-9).

---

## F · Changelog

> Changes to this component on this platform.

### F0 Changes from previous version

1.1 — the keyboard focus ring now sits 2 dp outside the visible button on every size and no longer makes the button larger; goldens show the real Latin and Arabic fonts and icons. No API change.

### F1 Guidelines changelog

| Version | Date | Change | Migration | Author |
|---|---|---|---|---|
| 1.0 | 2026-10-16 | Initial. Replaces the Figma `.Button _en/_ar`, `Default Button/EN·AR` and mobile `Buttons` sets | Type Primary/Secondary/Tertiary → `variant` filled/outlined/text (tonal is new) · Color Primary → `brand`, White → `inverse`; Success/Warning/Info removed · Size Small/Medium/XLarge → `sm`/`md`/`lg` | Planner (Claude) |

### F2 Spec changelog

| Version | Date | Change | Breaking | Migration |
|---|---|---|---|---|
| 1.0 | 2026-10-16 | Initial | No | — |
| 1.1 | 2026-10-20 | Review round 1 Planner items: focus ring painted outside the visible container without layout (B2, B6, C3; `BwFocusRing` takes a radius and a caller key); real test fonts (C5 `flutter_test_config.dart`, `test/fonts/`); B9/C6 measurement tests; C7 AC-8–AC-10 and Fix round 1 task list | No | — |
| 1.1 (naming) | 2026-10-31 | Component tokens `container/hover` · `state-layer/hover` → `…/hovered` (button.tokens.json, code keys, Figma variables renamed in place — IDs kept); Figma `State` `Hover` → `Hovered`. Internal `segment` (Split button only): inner corners `radius-none`, inner-side border none, Flutter `BwSegmentBorder` | No | Figma: none (renamed in place) |

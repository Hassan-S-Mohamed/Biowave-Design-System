# Button · زر — Mobile

> **One file for Button on Mobile:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- mobile button`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Button · زر |
| Summary | Triggers an action with a clear level of emphasis, from primary submission to a quiet inline action. |
| Summary (ar) | ينفّذ إجراءً بمستوى واضح من الأهمية، من الإرسال الأساسي إلى الإجراء النصي الهادئ. |
| Parts | Container · label · leading/trailing icon · spinner · focus ring |
| Parts (ar) | الحاوية · التسمية · أيقونة البداية/النهاية · مؤشر التحميل · حلقة التركيز |
| Platform | Mobile · Flutter + Material 3 |
| Built on | M3 `FilledButton` · `FilledButton.tonal` · `OutlinedButton` · `TextButton`, chosen by `variant`, with a `ButtonStyle` built only from Biowave tokens. No ink splash |
| Import | `BwButton` from `package:biowave_mobile/biowave_mobile.dart` |
| Figma | **Biowave DS — Mobile Components** › `↳ Button` (page Typography mode `Mobile`) · build: [Part D](#d--figma-build) |
| Version | 1.1 · 2026-10-20 |
| Plan | Finished |
| Code | Built |
| Figma build | Planned |
| Review | Round 2 · 2026-10-21 · Approved |
| Source code | [`lib/src/components/button/bw_button.dart`](../../lib/src/components/button/bw_button.dart) |
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
| Specs | [Web](../../../3-web-components/components/button/button.md#b--spec) · [Tablet](../../../4-tablet-components/components/button/button.md#b--spec) · [Mobile](#b--spec) |
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

### A8 Platform notes — Mobile

```
Web (dialog footer, end-aligned)              Mobile (screen bottom, full width)
┌───────────────────────────────────────┐     ┌─────────────────────────┐
│               [── Cancel ──][■ Save ■]│     │ [■■■■■ Clock in ■■■■■■] │
└───────────────────────────────────────┘     │ [──────  Cancel ──────] │
                                              └─────────────────────────┘
```

| | Mobile |
|---|---|
| Available | ✓ |
| Default size | `lg` |
| Sizes | `sm` · `md` · `lg` · `xl` |
| Layout | Full width common for main actions; stacked, main action on top |
| Interaction | Touch |
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

Context: Mobile app (portrait first, SafeArea). Touch only in practice; hover/keyboard code paths still work for accessibility devices.

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
   ┴ size-control-height-lg        (hit area ≥ BwLayout.mobile.minTarget)
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
| hit area | min size | `target-min` (`BwLayout.mobile.minTarget`) | same | same (= height) | height |
| `focus-ring` | width · offset | `border-width-focus` · `border-focus-offset` | same | same | same |

Flutter access: `size-control-height-lg` → `BwSize.controlHeightLg` · `spacing-control-gap-lg` → `BwSpacing.controlGapLg` · `radius-md` → `BwRadius.md` · `action-lg` → `context.bw.text.actionLg` · colors → `context.bw.colors.<camelCase>` (e.g. `backgroundBrandDefault`).

Layout rules: width hugs content (`MainAxisSize.min`); `fullWidth` → `minimumSize` width `double.infinity` in the parent constraints. Height fixed by the size token (`fixedSize` height, `minimumSize` height). Outlined border drawn inside the height. `label` one line, `TextOverflow.ellipsis`, `softWrap: false`. Loading keeps the content's size (`Visibility(maintainSize: true, …)`) with the spinner centered on top. `MaterialTapTargetSize.padded` keeps the 48dp hit area for `sm`/`md`. Elevation 0 in every state. The `focus-ring` is painted outside the visible container and takes no layout space: focused or not, the button's size is the container size (height at least `BwLayout.mobile.minTarget`), never container + ring.

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
| Target size | ≥ `BwLayout.mobile.minTarget` via `MaterialTapTargetSize.padded` |
| Text scale | Label scales with the system text scale; height grows rather than clipping (use `minimumSize`, not a hard max) |
| Screen reader output | "Clock in, button" / "تسجيل الحضور، زر" · loading: "Saving…" announced |

| Key (hardware keyboard) | Action |
|---|---|
| Tab / Shift+Tab | Moves focus |
| Enter / Space | Activates |

### B7 Examples

```dart
import 'package:biowave_mobile/biowave_mobile.dart';

// Screen main action, full width
BwButton(label: 'Clock in', size: BwControlSize.xl, fullWidth: true, onPressed: clockIn);

// Pair in a sheet
BwButton(label: 'Cancel', variant: BwButtonVariant.outlined, color: BwButtonColor.neutral, onPressed: close);
BwButton(label: 'Save changes', loading: saving, loadingLabel: 'Saving…', onPressed: save);

// Destructive
BwButton(label: 'Delete user', color: BwButtonColor.error, onPressed: confirmDelete);

// Arabic: same code; MaterialApp(locale: Locale('ar')) + BwMobileTheme.light(locale) give RTL and the Arabic font
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
- [ ] Ring takes no layout: the `BwButton` rect is identical before and after focus; its width equals the container width and its height equals `max(container height, BwLayout.mobile.minTarget)`
- [ ] Ring shows on the first frame after keyboard focus (no fade) and never in touch highlight mode
- [ ] `loading: true` with `onPressed: null` stays disabled: not focusable, `enabled: false`
- [ ] Directional icon mirrors in RTL; `Symbols.add_rounded` does not
- [ ] No raw values: the widget file contains no `Color(0x`, no numeric `EdgeInsets`/`SizedBox` sizes, no `Duration(milliseconds:` (lint test)

---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `button-contract.md`.

> Written by the Planner (Claude). Executed by any agent. Reviewed by Claude against this file.
> Executor: read `AGENTS.md`, `5-mobile-components/README.md`, this file and the spec [Part B](#b--spec). Nothing else unless linked here.

| Field | Value |
|---|---|
| Component | Button |
| Platform | Mobile (Flutter + M3) |
| Plan version | 1.1 · 2026-10-20 |

### C1 Goal

`BwButton` from `package:biowave_mobile/biowave_mobile.dart` renders every allowed `variant` × `color` × `size` of B1–B3 from tokens only, behaves as B4–B6 in light/dark and en/ar, and passes B9. First component of this package: it also adds `BwControlSize` and the golden-test helpers later components reuse.

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
5-mobile-components/lib/src/common/bw_control_size.dart          new: enum BwControlSize { sm, md, lg, xl }
5-mobile-components/lib/src/common/bw_focus_ring.dart            new: BwFocusRing (C3), not exported
5-mobile-components/lib/src/components/button/bw_button.dart     new: BwButton, BwButtonVariant, BwButtonColor
5-mobile-components/lib/src/components/button/bw_button_style.dart  new
5-mobile-components/lib/biowave_mobile.dart                               change: export bw_control_size.dart and button/bw_button.dart
5-mobile-components/test/helpers/bw_test_app.dart                new: pumpBw(tester, child, {brightness, locale, textScale, reduceMotion}) using BwMobileTheme
                                                                    MaterialApp gets locale, supportedLocales [en, ar] and
                                                                    GlobalMaterialLocalizations.delegates (flutter_localizations,
                                                                    dev dependency); reduceMotion sets MediaQuery disableAnimations
5-mobile-components/test/flutter_test_config.dart                new: testExecutable loads the real fonts once before every test
5-mobile-components/test/fonts/                                  new: Inter-{Regular,Medium,SemiBold}.ttf · IBMPlexSansArabic-{Regular,Medium,SemiBold}.ttf
                                                                    · OFL-Inter.txt · OFL-IBMPlexSansArabic.txt (licences, unchanged)
5-mobile-components/test/button_test.dart                        new
5-mobile-components/test/goldens/button/                         new (generated goldens)
5-mobile-components/README.md                                    change: status table row
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
- [ ] AC-5 Tests pass: `cd 5-mobile-components && flutter analyze && flutter test`; `npm run sync` passes
- [ ] AC-6 Exported from `lib/biowave_mobile.dart`; `5-mobile-components/README.md` status table updated to `Built`
- [ ] AC-7 No ink splash; elevation 0; exact heights per size (golden + `tester.getSize`)
- [ ] AC-8 Focus ring painted outside the visible container with no layout change (C3, B6) and measured per size (B9); shared test setup per C5: real fonts via `test/flutter_test_config.dart`, `pumpBw` with Material localizations and `reduceMotion`

---

### C8 Execution log (filled by the Executor)

| Field | Value |
|---|---|
| Agent | Codex |
| Date | 2026-10-20 |
| Files changed | `lib/src/common/bw_control_size.dart`; `lib/src/common/bw_focus_ring.dart`; `lib/src/components/button/bw_button.dart`; `lib/src/components/button/bw_button_style.dart`; `lib/biowave_mobile.dart`; `test/helpers/bw_test_app.dart`; `test/flutter_test_config.dart`; `test/fonts/*`; `test/button_test.dart`; `test/goldens/button/*`; `README.md`; `components/button/button.md`; `CHANGELOG.md` |
| Checks | `flutter analyze` ✓; `flutter test --experimental-faster-testing --update-goldens` ✓ (69 tests); `flutter test --experimental-faster-testing` ✓ (69 tests); four real-font goldens visually checked ✓; `npm run component-tokens` ✓; `npm run sync` ✓ READY; `npm run docs:check` ✓ per task instruction — only the 2 known unrelated stale tablet/mobile button-group Figma contracts were reported |

**Deviations from the plan or spec** (with reason — the Planner updates the spec if accepted): none

**Questions for the Planner:** none

#### Fix round 1 — 2026-10-21

| Finding | What changed (`file:line`) | Test that proves it |
|---|---|---|
| #1 🟡 | `lib/src/common/bw_focus_ring.dart:57` now always returns `Stack(clipBehavior: Clip.none, fit: StackFit.passthrough)` with the child first and adds the ring only as a conditional second child, preserving the content element and State across focus changes | `test/button_test.dart:429` — `keyboard focus preserves loading content State` compares the same `AnimatedSwitcher` State object before and after keyboard focus ✓ |
| #2 🟢 | `lib/src/components/button/bw_button_style.dart:140` replaces the separate gap/icon mappings with one `BwControlSize` → `BwButtonMetrics` table containing height, padding, gap, icon size, radius and text style; `bw_button.dart` consumes those metrics | Existing exact-size, token-style and four golden tests pass; all 70 tests ✓ |

**Checks:** `flutter analyze` ✓ (no issues); `flutter test --experimental-faster-testing` ✓ (70 tests, run from an identical disposable no-space copy because the sandbox blocks sockets and the faster runner misresolves relative package roots from the space-containing worktree path); `npm run component-tokens` ✓; `npm run sync` ✓ READY; `npm run docs:check` ✓ per fix-step baseline — only the 2 known unrelated stale tablet/mobile `button-group` Figma contracts were reported.

**Goldens:** unchanged — neither fix changes pixels; all four existing golden comparisons pass.

**Deviations from the plan or spec:** none

**Questions for the Planner:** none

---

## D · Figma build

> How to build Part B in Figma. The Figma Agent receives this through the generated `figma-button-contract.md`.

> Written by the Planner (Claude). Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> **One file per platform (D-12).** This file builds the Mobile set in **Biowave DS — Mobile Components**. Structure, layer tree and properties are the same as the [Web Part D](../../../3-web-components/components/button/button.md#d--figma-build) D2–D4 (one fact, one home); this file lists only what differs. Values come from the Mobile spec [Part B](#b--spec).

| Field | Value |
|---|---|
| Component | Button |
| Platform | Mobile |
| Figma file | **Biowave DS — Mobile Components** (`_sync/figma-files.json` › `mobile`) |
| Page / section | `↳ Button` › section `Button` |
| Mode | **Create new.** Legacy reference (read only): Foundations file › LEGACY Mobile › `↳ Buttons`: `Buttons` `4131:1124`, `Default Button/EN` `4858:41924`, `Default Button/AR` `4858:42702`, copies `.Button _en` `4882:46761` / `.Button _ar` `4882:48846` (B-05: all deprecated after this build is `Approved`) |
| Plan version | 2 · 2026-10-16 (D-12: own file) |

### D1 Rules for this build

Same as [Web D1](../../../3-web-components/components/button/button.md#d1-rules-for-this-build) (library first, everything bound, no local variables or styles), plus:
- **Typography mode:** on page `↳ Button` set the explicit variable mode **`Mobile`** for `5. Typography (EN)` and `6. Typography (AR)` (`page.setExplicitVariableModeForCollection`). Text styles stay `Web/{en|ar}/…` names; the mode gives the Mobile scale.

### D2 Component structure

As [Web D2–D4](../../../3-web-components/components/button/button.md#d2-component-structure), with these Mobile differences:
- `Size` adds `XL` (B2 `xl` row: `size/control/height/xl`, `spacing/control/padding-inline/xl`, `radius/xl`)
- `State` = `Default` · `Focused` · `Pressed` · `Disabled` · `Loading` (no `Hover`)
- Default instance size `LG`

### D3 Layer tree and auto layout

As [Web D3](../../../3-web-components/components/button/button.md#d3-layer-tree-and-auto-layout), with the Mobile differences listed in D2.

### D4 Properties

As [Web D4](../../../3-web-components/components/button/button.md#d4-properties), with the Mobile differences listed in D2.

### D5 Variants to generate

18 allowed `Variant × Color` × 4 sizes (`SM` · `MD` · `LG` · `XL`) × 5 states (no `Hover`) × 2 languages = **720**.

#### After this build is `Approved`
Report instances of the legacy reference above; move legacy sets to `_Deprecation Ground` in the Foundations file once product files use the Mobile library.

### D6 States, interactions and motion

As Web D6 without hover interactions. Press: smart animate per B4.

### D7 RTL

As Web D7 (`Language=AR` variants where the component has text).

### D8 Documentation pages

All 12 standard pages (`_templates/component.md` D8 + `2-foundations/figma-doc-kit.md` › Page layouts) in section `Button — Documentation` on `↳ Button` in this file, built only from the Doc Kit (Foundations library). Blocked until the Doc Kit exists. 07 Platform: `Doc/Device frame` = Phone (SafeArea). 09 Accessibility: target-size overlay (`target-min` = 48) on `SM`/`MD`.

Component description: one line from A1 + "Spec: 5-mobile-components/components/button/button.md".

### D9 Code Connect

`5-mobile-components/lib/src/components/button/bw_button.figma.dart` — `Variant` → `variant: BwButtonVariant.*`, `Color` → `color: BwButtonColor.*`, `Size` → `size: BwControlSize.*`, `State=Disabled` → `onPressed: null`, `State=Loading` → `loading: true`, `Label` → `label`, `Leading icon glyph` → `leadingIcon: Icons.*_rounded`, `Trailing icon glyph` → `trailingIcon`. Publish after code and Figma reviews are both `Approved`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Set on `↳ Button` in the Mobile file; structure and layer names as Web D2–D3 + differences above
- [ ] F-AC-2 Properties as Web D4 + differences; variant count per D5
- [ ] F-AC-3 Zero raw values; zero local variables/styles (all from the Foundations library)
- [ ] F-AC-4 Page Typography mode = `Mobile`; Light/Dark by mode only; Arabic fits without truncation
- [ ] F-AC-5 Values match the Mobile B2–B3 (redline, incl. `XL`)
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
| 2 | 2026-10-21 | Approved | not reviewed |
| 1 | 2026-10-20 | Changes requested | not reviewed |

### E3 Round 2 — 2026-10-21

| Field | Value |
|---|---|
| Plan version reviewed | 1.1 |
| Spec version reviewed | 1.1 |
| Reviewer | Claude |
| Date | 2026-10-21 |
| Commit reviewed | `c9c1628` (branch `ds/button-mobile`, `git diff af0fe5f..HEAD -- 5-mobile-components`; no uncommitted changes under `5-mobile-components`) |
| Verdict | **Approved** (0 🔴, 0 🟡, 0 🟢) |

Checks run by the Reviewer (not copied from C8):

| Command | Result |
|---|---|
| `cd 5-mobile-components && flutter analyze` | ✓ No issues found |
| `cd 5-mobile-components && flutter test` | ✓ 70 tests, all passed (normal runner, run in the worktree; goldens compared, not updated) |
| `npm run component-tokens` | ✓ web / tablet / mobile pass |
| `npm run sync` | ✓ READY for component work (18 docs in the Figma build queue, not blocking) |
| `npm run docs:check` | ✗ 2 errors, both known baseline: `tablet` and `mobile` `button-group` Figma contracts stale (fixed on `ds/button-web`, PR #1, not merged). Not this unit; not a finding |

Regression proof: in a throw-away copy outside the repo (package plus `2-foundations/flutter`), `lib/src/common/bw_focus_ring.dart` was put back to the Round 1 version (`af0fe5f`) and only `keyboard focus preserves loading content State` was run. It **fails** at `test/button_test.dart:457` (`expect(tester.state(switcherFinder), same(stateBeforeFocus))`). With the current ring it passes. So the test catches a return to swapping child ↔ `Stack`. The copy was deleted afterwards.

#### Round 1 findings

| # | Status | Evidence |
|---|---|---|
| 1 🟡 | **Fixed** | `bw_focus_ring.dart:57-82` always returns `Stack(clipBehavior: Clip.none, fit: StackFit.passthrough)` with `widget.child` at index 0 (`:61`) and the ring only as `if (showRing)` second child (`:62`). The early `return widget.child` is gone. Flutter matches the child by slot 0 in the same `Stack`, so its element and State stay when the ring is added or removed. This is the same structure as tablet and C3. Test `keyboard focus preserves loading content State` (`button_test.dart:429-462`) checks the `AnimatedSwitcher` State is the same object after keyboard focus and that the ring is shown. It fails on the old ring (see above) |
| 2 🟢 | **Fixed** | One table `BwButtonStyle.metrics` (`bw_button_style.dart:140-177`) → `BwButtonMetrics` (`:262-278`) holds height, padding, gap, icon size, radius and text style. `BwButtonStyle.gap` / `BwButtonStyle.iconSize` are removed (no other use in `lib/` or `test/`). `ButtonStyle.iconSize` (`:110`), the leading/trailing `Icon` size, the gap and the spinner size (`bw_button.dart:63,81,84,95,98,120`) all read `metrics`. Token values per size are unchanged (sm `iconSm`, md `iconMd`, lg/xl `iconLg`). `BwButtonMetrics` is public in `lib/src` but not exported from `lib/biowave_mobile.dart`, so the B1 API is unchanged |

#### Ring geometry (unchanged since Round 1)

The diff of `bw_focus_ring.dart` only removes the early return and indents the ring under `if (showRing)`. `inset` = `focusOffset` + `widthFocus` (`:50`), `PositionedDirectional` −inset on all sides (`:63-67`), `IgnorePointer`, `DecoratedBox` with `ringKey`, `widthFocus` stroke and radius + inset (`:53-55,68-78`) are the same as the code measured in Round 1. The geometry tests (`{sm,md,lg,xl} ring …`, `sm ring geometry in ar`) and the four goldens pass unchanged.

#### Acceptance criteria (only where the diff touches them)

| AC | Result | Evidence (file:line / test name) |
|---|---|---|
| AC-1 API matches B1 | ✅ | No change to the `BwButton` constructor; barrel export unchanged; `BwButtonMetrics` not exported |
| AC-2 Values from tokens | ✅ | New `gap` field uses `BwSpacing.controlGap*` (`bw_button_style.dart:148,156,164,172`); `component source contains no raw visual values` passes |
| AC-4 a11y as B6 (focus ring keyboard only) | ✅ | Ring still gated by `widget.focused` + `FocusHighlightMode.traditional` (`bw_focus_ring.dart:47-48`); `ring is immediate in keyboard mode and absent in touch mode` passes |
| AC-5 Tests pass; sync passes | ✅ | Checks table above |
| AC-7 Exact heights | ✅ | `{sm,md,lg,xl} has its exact visible height` passes; height comes from `metrics.height` |
| AC-8 Ring outside container, no layout change; C3 structure | ✅ | Finding 1 fixed; geometry unchanged (above) |
| AC-3, AC-6 | ✅ | Not touched by the diff; Round 1 result stands |

#### Rule checks (AGENTS.md §2)

| Rule | Result | Notes |
|---|---|---|
| No generated files edited | ✅ | Diff touches only `bw_focus_ring.dart`, `bw_button.dart`, `bw_button_style.dart`, `button_test.dart`, `button.md` C8 |
| No raw values / no primitives | ✅ | Only tokens added |
| Logical properties, RTL | ✅ | `PositionedDirectional`, `EdgeInsetsDirectional`, `BorderRadiusDirectional` kept |
| Light + dark, en + ar tested | ✅ | Goldens unchanged and passing |
| Stayed inside the plan | ✅ | `BwFocusRing` now matches C3; C8 "Fix round 1" logs the changes, no deviations |
| Changelog | ✅ | `CHANGELOG.md` "Mobile Button — fix round 1 (1.1)" |

#### Findings

| # | Severity | File | Issue | Required change | Owner |
|---|---|---|---|---|---|
| — | — | — | No new findings | — | — |

#### Next step

- Code **Approved**. No Planner items; Plan stays `Finished`. Next: after-review gate, then the Figma build (Part D) when scheduled.

### E2 Round 1 — 2026-10-20

| Field | Value |
|---|---|
| Plan version reviewed | 1.1 |
| Spec version reviewed | 1.1 |
| Reviewer | Claude |
| Date | 2026-10-20 |
| Commit reviewed | `ad2c3fc` (branch `ds/button-mobile`, `git diff origin/main...HEAD -- 5-mobile-components`; working tree clean) |
| Verdict | **Changes requested** (0 🔴, 1 🟡, 1 🟢) |

Checks run by the Reviewer (not copied from C8):

| Command | Result |
|---|---|
| `cd 5-mobile-components && flutter analyze` | ✓ No issues found |
| `cd 5-mobile-components && flutter test` | ✓ 69 tests, all passed (normal runner; goldens compared, not updated) |
| `npm run component-tokens` | ✓ web / tablet / mobile pass |
| `npm run sync` | ✓ READY for component work (18 docs in the Figma build queue, not blocking) |
| `npm run docs:check` | ✗ 2 errors — baseline only: `tablet` and `mobile` `button-group` Figma contracts stale (fixed on `ds/button-web`, PR #1, not merged). Not this unit; not a finding |

Extra evidence: a throw-away probe (scratch copy of the package outside the repo; nothing in the repo changed) keyboard-focused a `BwButton` with a leading icon for every size in `en` and `ar` and measured with `tester.getRect`. In all 8 cases the ring rect = the container `Material` rect inflated by exactly 4 dp on each side (`focusOffset` 2 + `widthFocus` 2; gaps L/R/T/B all 4.0), and the `BwButton` rect was identical before and after focus: `sm` 32 dp container in a 48 dp box (e.g. `ar`: container 368.7–431.3 × 284–316, ring 364.7–435.3 × 280–320, button 276–324 high), `md` 40 in 48, `lg` 48, `xl` 56. The same probe found finding 1: the `AnimatedSwitcher` `State` inside the button is a new object after focus.

**RTL `sm` geometry test.** `sm ring geometry in ar` (`test/button_test.dart:286-349`) measures `_visibleMaterial()` (`:753-758`, the `Material` with `MaterialType.button` = the 32 dp container), not the 48 dp tap-target box, and asserts `ringRect == containerRect.inflate(focusOffset + widthFocus)` (`:316-319`). If the ring were drawn around the padded box, the ring would be 56 dp high instead of 40 and the test fails; if it took layout, `BwButton` rect before ≠ after (`:321`). The width/height assertions (`:322-331`) use `max(container, minTarget)` per B9. The test, not just the code, would catch a regression.

#### Acceptance criteria

| AC | Result | Evidence (file:line / test name) |
|---|---|---|
| AC-1 API matches B1 | ✅ | `bw_button.dart:14-54` names, types, defaults; asserts `:28-41`; fallbacks tonal neutral/inverse → outlined `:58-61`, both icons → leading only `:62`; `loading` + `onPressed: null` stays disabled `:131,170`. Tests `defaults and invalid combinations assert`, `loading with null callback remains disabled` |
| AC-2 Values from tokens | ✅ | `bw_button_style.dart` colors only from `context.bw.colors` (`:180-282`), sizes `BwSize`/`BwSpacing`/`BwRadius` (`:140-178`), border `BwBorder` (`:82`), ring `bw_focus_ring.dart:53-77`. `component source contains no raw visual values` passes; no `BwPalette`; per-state color test in `BwButtonStyle` group (`button_test.dart:84-191`) |
| AC-3 B4 transitions, reduced motion | ✅ | `animationDuration` and `AnimatedSwitcher` use `BwDuration.instant` under `reduceMotion` (`bw_button_style.dart:119-120`, `bw_button.dart:116-117`); ring has no animation. Test `reduced motion uses the instant token` via `pumpBw(reduceMotion: true)` |
| AC-4 RTL as B5; a11y as B6 | ✅ | Ring geometry LTR + RTL (tests + probe); keyboard-only via highlight-mode listener `bw_focus_ring.dart:26-48` (test `ring is immediate in keyboard mode and absent in touch mode`); `inverse` → `borderInverse` (`inverse focus uses inverse border token`); loading semantics + single announcement `bw_button.dart:166-231` (`loading keeps size and focus, blocks presses, announces once`); `directional icon mirrors in RTL and add does not`; Enter/Space test |
| AC-5 Tests pass; sync passes | ✅ | Checks table above |
| AC-6 Exported; README `Built` | ✅ | `lib/biowave_mobile.dart:9,12`; ring and style not exported; README row Code = `Built` |
| AC-7 No splash; elevation 0; exact heights | ✅ | `NoSplash.splashFactory`, elevation `BwSpacing.none` (`bw_button_style.dart:96,122`); `{sm,md,lg,xl} has its exact visible height` measures the container `Material` with `tester.getSize`; goldens |
| AC-8 Ring outside container, no layout change; shared test setup | ⚠️ | Geometry ✅ (above). But `BwFocusRing` does not keep the C3 structure: it returns the bare child when unfocused and a `Stack` when focused, which remounts the control's content on every focus change — finding 1. Test setup ✅: `flutter_test_config.dart` loads Inter, IBM Plex Sans Arabic (from `test/fonts`, OFL committed) and Material Symbols Rounded; `pumpBw` (`test/helpers/bw_test_app.dart`) has en/ar, `GlobalMaterialLocalizations.delegates`, `reduceMotion`, `textScale` |

#### Goldens

- Opened all 4 PNGs in `test/goldens/button/`: Latin labels in Inter, Arabic labels in IBM Plex Sans Arabic shaped and joined (إضافة جهاز), `add` and `arrow_forward` drawn as real Material Symbols glyphs — no Ahem boxes. In `ar` the layout and the arrow mirror (arrow points left), `add` does not.
- Page background is `context.bw.colors.surfacePage` (`button_test.dart:682`; light #F7F7F7, dark #0A0A0A), not `backgroundNeutralDefault` (#EDEDED / #292929): filled neutral shows its container in both themes. Tablet nit #10 is not repeated.

#### Comparison with the merged tablet implementation (shared pieces)

- `bw_control_size.dart`, `flutter_test_config.dart`, the font set and the `BwButtonStyle` token mapping are equivalent.
- `bw_focus_ring.dart` differs where it matters: tablet always builds `Stack([child, if (_showRing) ring])`; mobile returns `widget.child` when the ring is hidden (`bw_focus_ring.dart:47-51`) — finding 1.
- `pumpBw` is a top-level function `pumpBw(tester, child, {textScale})` here and a `WidgetTester` extension `tester.pumpBw(child, {textScaleFactor})` on tablet. Mobile follows its own C5 signature, so not a finding; worth aligning when a shared test helper is planned.

#### Rule checks (AGENTS.md §2)

| Rule | Result | Notes |
|---|---|---|
| No generated files edited | ✅ | Diff touches no `generated/`, `dist/`, `_sync/*.json` or contract |
| No raw values / no primitives | ✅ | `lib/` clean; numeric paddings only in the test golden harness |
| Logical properties, RTL icons | ✅ | `EdgeInsetsDirectional`, `BorderRadiusDirectional`, `PositionedDirectional`, `AlignmentDirectional`; icons not wrapped in `Transform` |
| Light + dark, en + ar tested | ✅ | 4 real-font goldens; guideline tests 2 themes × 18 pairs; focus geometry en + ar |
| Accessibility (keyboard, focus, labels, target) | ✅ | Ring 2 dp outside container, 2 dp stroke, keyboard only, instant; targets ≥ 48 dp (`androidTapTargetGuideline`); contrast guideline both themes |
| Stayed inside the plan | ⚠️ | Files = C5 list; `BwFocusRing` deviates from C3 "Paint" structure (finding 1), not logged as a deviation in C8 |
| Code matches spec | ✅ | See AC table |
| Accepted deviations reflected back into the spec | ✅ | None |
| Changelog | ✅ | `CHANGELOG.md` "Mobile Button — implementation (1.1)" |

#### Findings

| # | Severity | File | Issue | Required change | Owner |
|---|---|---|---|---|---|
| 1 | 🟡 Should fix | `lib/src/common/bw_focus_ring.dart:47-51` | When the ring is hidden `build` returns `widget.child`; when shown it returns `Stack([child, ring])`. The child moves to a different tree position, so Flutter unmounts and re-creates the whole content subtree on every focus in/out (probe: `AnimatedSwitcher` `State` is a new object after focus; a loading spinner restarts, an in-flight cross-fade jumps). C3 specifies `Stack(... children: [child, ring])`, and the tablet version keeps the `Stack` always. Because `BwFocusRing` is the shared ring for Icon button, Chip and Text field, a text field would lose its editing state on focus | Always return the `Stack(clipBehavior: Clip.none, fit: StackFit.passthrough)` with `widget.child` first and the ring only as a conditional second child (as tablet does). Add a test: focus a `loading: true` button in keyboard mode and assert the `AnimatedSwitcher` (or `CircularProgressIndicator`) `State` is the same object before and after focus | Executor |
| 2 | 🟢 Nit | `lib/src/components/button/bw_button_style.dart:139-184` | Icon size per size is mapped twice (`_ButtonDimensions.iconSize` and `BwButtonStyle.iconSize`); two tables can drift | Derive one from the other (single size → dimensions table, as tablet's `BwButtonMetrics`) | Executor |

#### Next step

- Changes requested for finding 1 (fix round 1). Fix finding 2 in the same round if convenient. No Planner items; Plan stays `Finished`.

---

## F · Changelog

> Changes to this component on this platform.

### F0 Changes from previous version

1.1 — plan corrected before the build (same fix as Tablet review round 1): the keyboard focus ring sits 2 dp outside the visible button on every size and takes no layout space; goldens use the real Latin and Arabic fonts and icons. No API change.

### F1 Guidelines changelog

| Version | Date | Change | Migration | Author |
|---|---|---|---|---|
| 1.0 | 2026-10-16 | Initial. Replaces the Figma `.Button _en/_ar`, `Default Button/EN·AR` and mobile `Buttons` sets | Type Primary/Secondary/Tertiary → `variant` filled/outlined/text (tonal is new) · Color Primary → `brand`, White → `inverse`; Success/Warning/Info removed · Size Small/Medium/XLarge → `sm`/`md`/`lg` | Planner (Claude) |

### F2 Spec changelog

| Version | Date | Change | Breaking | Migration |
|---|---|---|---|---|
| 1.0 | 2026-10-16 | Initial | No | — |
| 1.1 | 2026-10-20 | Tablet review round 1 applied before the build: focus ring painted outside the visible container without layout (B2, B6, C3; `BwFocusRing` takes a radius and a caller key); real test fonts (C5 `flutter_test_config.dart`, `test/fonts/`); `pumpBw` with Material localizations and `reduceMotion`; B9/C6 measurement tests; C7 AC-8 | No | — |

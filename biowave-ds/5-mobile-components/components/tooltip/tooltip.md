# Tooltip · تلميح — Mobile

> **One file for Tooltip on Mobile:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- mobile tooltip`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Tooltip · تلميح |
| Summary | A short text label that names an icon-only control or adds a one-line hint, shown on hover, keyboard focus or long press. |
| Summary (ar) | نص قصير يسمّي عنصر تحكم بأيقونة فقط أو يضيف تلميحًا من سطر واحد، ويظهر عند التمرير أو التركيز بلوحة المفاتيح أو الضغط المطوّل. |
| Parts | Container · label · anchor |
| Parts (ar) | الحاوية · النص · العنصر المرتبط |
| Platform | Mobile · Flutter + Material 3 |
| Built on | Flutter `RawTooltip` (the widgets-layer engine under M3 `Tooltip`), styled from semantic tokens. M3 `Tooltip` (ROADMAP base) does not expose its fade duration and curve; `RawTooltip.animationStyle` does (C3) |
| Import | `BwTooltip` from `package:biowave_mobile/biowave_mobile.dart` |
| Figma | **Biowave DS — Mobile Components** › `↳ Tooltip` (page Typography mode `Mobile`) · [Part D](#d--figma-build) |
| Version | 1.1 · 2026-10-24 |
| Plan | Finished |
| Code | Planned |
| Figma build | Planned |
| Review | — |
| Source code | `lib/src/components/tooltip/` — not built yet (the Executor creates it) |
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
| Specs | [Web](../../../3-web-components/components/tooltip/tooltip.md#b--spec) · [Tablet](../../../4-tablet-components/components/tooltip/tooltip.md#b--spec) · [Mobile](#b--spec) |
| Figma | `↳ Tooltip` in **Biowave DS — Web Components** · **Mobile Components** · **Mobile Components** (one set per platform file, D-12; keys in `_sync/figma-files.json`) |
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

### A8 Platform notes — Mobile

| | Mobile |
|---|---|
| Available | ✓ |
| Opens on | Long press (`trigger="long-press"`) or tap (`trigger="tap"`, help icons) · hardware-keyboard focus (at once) when a keyboard is connected |
| Closes on | A short time after the finger lifts · tap elsewhere · focus moving away |
| Placement | `top` · `bottom` · `start` · `end`; on narrow screens `start` / `end` often flip, so prefer `top` / `bottom` |
| Hover | Not used (no pointer) |
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

#### BwTooltip
| Param | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `message` | `String` | plain text (A6) | — | ✓ | The `label` part |
| `child` | `Widget` | the control the tooltip belongs to | — | ✓ | The `anchor` |
| `placement` | `BwTooltipPlacement` | `top` · `bottom` · `start` · `end` | `top` | | A4.1 — logical sides |
| `purpose` | `BwTooltipPurpose` | `label` · `description` | `label` | | A4.2 — how the text reaches assistive technology (B6) |
| `trigger` | `BwTooltipTrigger` | `longPress` · `tap` | `longPress` | | A4.3 (`long-press` · `tap`) |

Platform naming notes: web `title` = Flutter `message`; web `children` = Flutter `child`; A4.3 `long-press` = Dart `BwTooltipTrigger.longPress`. Web's controlled `open` / `onOpen` / `onClose` are not part of the Flutter API.

**Invalid combinations** (`assert` in debug, fallback in release):
| Combination | Fallback |
|---|---|
| `message` empty or whitespace only | assert "BwTooltip needs text"; release: returns `child` without a tooltip |

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

| Part | Property | Token | Flutter |
|---|---|---|---|
| `container` | padding-block · padding-inline | `spacing-xs` · `spacing-md` | `EdgeInsetsDirectional.symmetric(horizontal: BwSpacing.md, vertical: BwSpacing.xs)` |
| `container` | radius | `radius-sm` | `BorderRadiusDirectional.all(Radius.circular(BwRadius.sm))` |
| `container` | width | hug the text · max `size-container-xxs` | `BoxConstraints(maxWidth: BwSize.containerXxs)` |
| `container` | border · shadow | none · none | — |
| `container` | gap to the anchor (offset) | `spacing-xs` | `BwSpacing.xs` — (1.1) transparent padding inside the tooltip's hover area, not empty space between anchor and tooltip (B6 hoverable, C3 › Position) |
| `container` | minimum distance to the screen edge | `spacing-md` | `BwSpacing.md` |
| `label` | text style | `label-sm` | `context.bw.text.labelSm` (Mobile scale, Arabic style from the locale) |
| `label` | alignment · wrapping | start-aligned · wraps at the max width, never truncated | `TextAlign.start`, no `maxLines` |

Layout rules: the tooltip is drawn in the `Overlay` above the page and never changes the anchor's size or layout. Centred on the anchor's cross axis for every placement. The tooltip respects the user's text scale (it wraps; the max width stays).

### B3 Tokens by part and state

Every value is a semantic token; there are no component tokens (P-04 — the same set as the Web Tooltip and Icon button B3.4).

| Part | Property | Shown | Entering / exiting |
|---|---|---|---|
| `container` | background | `color-surface-inverse` (`context.bw.colors.surfaceInverse`) | same, opacity animated (B4) |
| `label` | color | `color-text-neutral-inverse` (`context.bw.colors.textNeutralInverse`) | same |

Dark theme: same tokens — the values switch, so the tooltip is light on dark screens. No exceptions. The tooltip has no pressed, focus or disabled style of its own.

### B4 States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Hidden → Shown | long press (`trigger: longPress`) or tap (`trigger: tap`) on the anchor | opacity | `motion-duration-md` (`BwDuration.md`) | `motion-easing-standard-decelerate` (`BwEasing.standardDecelerate`) |
| Hidden → Shown | pointer hover for `motion-duration-2xl` (`BwDuration.xl2`, delay) — only when a pointer device is connected (no Mobile design relies on it) | opacity | `motion-duration-md` | `motion-easing-standard-decelerate` |
| Hidden → Shown | hardware-keyboard focus on the anchor — no delay | opacity | `motion-duration-md` | `motion-easing-standard-decelerate` |
| Shown → Hidden | after a touch: the framework display time after the finger lifts (no Biowave token) · tap elsewhere | opacity | `motion-duration-sm` (`BwDuration.sm`) | `motion-easing-standard-accelerate` (`BwEasing.standardAccelerate`) |
| Shown → Hidden | pointer leaves anchor and tooltip · focus moves away · Esc — no delay (`motion-duration-instant`) | opacity | `motion-duration-sm` | `motion-easing-standard-accelerate` |

Reduced motion (`context.bw.reduceMotion`): enter and exit use `BwDuration.instant` (no fade). The hover delay stays; a touch still opens at once.

### B5 RTL

```
LTR   placement: end    [◆] ┌ Edit device ┐
RTL   placement: end    ┌ تعديل الجهاز ┐ [◆]
```

| Part | In RTL |
|---|---|
| `placement` `start` / `end` | Follow `Directionality`: `start` is left of the anchor in LTR and right in RTL; `end` the opposite |
| `placement` `top` / `bottom` | Unchanged |
| `label` | `TextAlign.start` (right in RTL); Arabic text style from the locale |
| Flip when there is no room | To the opposite logical side |

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| `purpose: label` | The anchor's semantics node is named by `message`: `MergeSemantics(child: Semantics(label: message, child: child))`; `RawTooltip.semanticsTooltip: null`, so the text is read once |
| `purpose: description` | `RawTooltip.semanticsTooltip: message` — read after the anchor's own name |
| Dismissible | Esc (hardware keyboard) closes the tooltip; focus stays on the anchor. A tap elsewhere closes it |
| Hoverable · persistent | `ignorePointer: false`: a pointer can move onto the tooltip without it closing; no auto-hide while hovered or focused. (1.1) Checked against Web review round 1 #1: plan 1.0 had the same gap problem with a pointer — the position delegate left the `BwSpacing.xs` gap outside both the anchor and the tooltip's `MouseRegion`, and with `dismissDelay: BwDuration.instant` a pointer moving slowly from the anchor would dismiss the tooltip in the gap. Fixed in C3 › Position: the gap is transparent padding inside the tooltip's hover area. Touch triggers are not affected (no hover) |
| Contrast | `textNeutralInverse` on `surfaceInverse` ≥ 4.5:1 in both themes (`textContrastGuideline`) |
| Focus | The anchor keeps its own focus ring; the tooltip is never focusable and adds no traversal stop |
| Haptics | Long press keeps the framework feedback (`enableFeedback: true`) |
| Screen reader output | `label`: "Edit device, button" · `description`: "Export, button, Exports this month's shifts as a CSV file." |

| Key (hardware keyboard) | Action |
|---|---|
| Tab / Shift+Tab | Moves focus to / from the anchor; the tooltip opens at once on focus and closes on blur |
| Esc | Closes the tooltip; focus stays on the anchor |
| Enter / Space | Belong to the anchor |

### B7 Examples

```dart
import 'package:biowave_mobile/biowave_mobile.dart';

// Name an icon-only control
BwTooltip(
  message: 'Edit device',
  child: IconButton(onPressed: edit, icon: const BwIcon(icon: Symbols.edit_rounded)),
);

// Add a hint to a named control
BwTooltip(
  message: "Exports this month's shifts as a CSV file.",
  purpose: BwTooltipPurpose.description,
  placement: BwTooltipPlacement.bottom,
  child: BwButton(label: 'Export', onPressed: export),
);

// Help icon: opens on tap; Arabic text, start / end follow Directionality
BwTooltip(
  message: 'نرسل تذكيرات المناوبات إلى هذا العنوان.',
  purpose: BwTooltipPurpose.description,
  trigger: BwTooltipTrigger.tap,
  placement: BwTooltipPlacement.end,
  child: const BwIcon(icon: Symbols.help_rounded),
);
```

### B8 Figma

Structure, properties, the Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

- [ ] Goldens: tooltip shown, every `placement`, light + dark, en + ar (`test/goldens/tooltip/`), plus a long text wrapping at the max width in en and ar
- [ ] Every transition in B4: long press opens; `trigger: tap` opens on tap; pointer hover opens only after `BwDuration.xl2`; hardware-keyboard focus opens at once; Esc, blur, pointer leave and tap elsewhere close; animation durations and curves from B4; `reduceMotion` → `BwDuration.instant`
- [ ] Every `placement` in LTR and RTL: tooltip position relative to the anchor matches B5 (`tester.getRect`); flips to the opposite side when there is no room; stays `spacing-md` from the screen edge
- [ ] (1.1) Hoverable across the gap (mouse `TestGesture`, `PointerDeviceKind.mouse`), for `top` and for `end` in LTR and RTL: hover the anchor, pump `BwDuration.xl2` + `BwDuration.md` → shown; then move the pointer from inside the anchor, across the gap, into the visible box in steps of one logical pixel, pumping one frame between moves; then pump `BwDuration.sm` + `BwDuration.xl2` → still shown. Negative control: move the pointer off the anchor away from the tooltip → dismissed after `BwDuration.sm`. Gap geometry: the visible box (`_BwTooltipBox`) is exactly `BwSpacing.xs` from the anchor on the facing side in all four placements, LTR and RTL, also after a flip
- [ ] Semantics: `label` → anchor node label = `message`, read once; `description` → node has tooltip = `message` after its own label
- [ ] `textContrastGuideline` passes with the tooltip shown in light and dark
- [ ] Empty `message` asserts; no raw values (lint test)

---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `tooltip-contract.md`.

> Executor: read `AGENTS.md`, `5-mobile-components/README.md` and your contract. Nothing else unless linked here.

| Field | Value |
|---|---|
| Component | Tooltip |
| Platform | Mobile (Flutter + M3) |
| Depends on | Nothing to build first (examples and tests use the built `BwButton` and `BwIcon`) |
| Plan version | 1.1 · 2026-10-24 |

### C1 Goal

`BwTooltip` from `package:biowave_mobile/biowave_mobile.dart` matches B1–B6 and passes B9 and C6, with the same tokens and timings as the Web Tooltip.

### C2 Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- Rich tooltips (title, actions) and arrows
- The foundations `ThemeData.tooltipTheme`, `BwButton`, `BwIcon` and other components
- **Follow-up, not this task:** `BwIconButton` (Code `Planned`) and the Text field help icon (its plan uses M3 `Tooltip(triggerMode: TooltipTriggerMode.tap)`) switch to `BwTooltip` (`purpose: label` / `trigger: tap`) in their own plan steps; M3 widgets that build their own `Tooltip` (e.g. `IconButton(tooltip:)`) keep the M3 look until foundations get a `tooltipTheme` from the same tokens

### C3 Approach

- **Base:** `RawTooltip` (Flutter widgets layer; M3 `Tooltip` is built on it but does not pass `animationStyle` through). `tooltipBuilder: (context, animation) => FadeTransition(opacity: animation, child: _BwTooltipBox(...))`, where the box is a `ConstrainedBox(maxWidth: BwSize.containerXxs)` → `DecoratedBox(color: surfaceInverse, borderRadius)` → `Padding` → `Text(message, style: labelSm.copyWith(color: textNeutralInverse), textAlign: TextAlign.start)`.
- **Timing:** `animationStyle: AnimationStyle(duration: BwDuration.md, reverseDuration: BwDuration.sm, curve: BwEasing.standardDecelerate, reverseCurve: BwEasing.standardAccelerate)`; with `context.bw.reduceMotion` both durations are `BwDuration.instant`. `hoverDelay: BwDuration.xl2`, `dismissDelay: BwDuration.instant`. `touchDelay` is not passed (framework default display time after a touch; Biowave has no token for it). `triggerMode` from `trigger`. `ignorePointer: false`, `enableFeedback: true`.
- **Position (1.1):** the `BwSpacing.xs` gap must be inside the tooltip's hover area. `RawTooltip` wraps the `tooltipBuilder` output in its `MouseRegion` (with `ignorePointer: false`), so the builder returns `Padding(padding: <main axis>, child: _BwTooltipBox(...))` with transparent padding `BwSpacing.xs` on **both** main-axis sides (`EdgeInsetsDirectional.symmetric(vertical: BwSpacing.xs)` for `top` / `bottom`, `EdgeInsetsDirectional.symmetric(horizontal: BwSpacing.xs)` for `start` / `end`) — both sides, because the builder does not know whether the delegate flips. A `positionDelegate` places this padded child **touching** the target (no extra gap) from `placement`, `Directionality.of(context)`, the target rect, the child size and the overlay size: centred on the cross axis; flipped to the opposite side when the chosen side has no room; clamped so the visible box stays `BwSpacing.md` inside the overlay (main axis: clamp the padded child at `BwSpacing.md - BwSpacing.xs`; cross axis: `BwSpacing.md`). Result: the visible gap is `BwSpacing.xs` on the facing side, and the pointer never leaves the hover area between anchor and box. `dismissDelay` stays `BwDuration.instant` — no delay is added to hide the gap. **Gotcha:** if a test shows the padding is not inside `RawTooltip`'s hover region, stop and report in C8 › Questions — do not add a dismiss delay or a custom overlay.
- **Keyboard:** wrap the child in `Focus(canRequestFocus: false, skipTraversal: true, onFocusChange: …)`; when focus arrives and `FocusManager.instance.highlightMode == FocusHighlightMode.traditional`, call `ensureTooltipVisible()` on a `GlobalKey<RawTooltipState>`; on focus loss call `RawTooltip.dismissAllToolTips()`. Esc: `CallbackShortcuts` (`SingleActivator(LogicalKeyboardKey.escape)` → `RawTooltip.dismissAllToolTips()`).
- **Semantics:** per B6. `label` uses `MergeSemantics` + `Semantics(label:)` and `semanticsTooltip: null`; `description` passes `semanticsTooltip: message`.
- **SDK:** `RawTooltip` and `AnimationStyle` on `RawTooltip` need a newer Flutter than the current `pubspec.yaml` floor (`flutter: ">=3.24.0"`). Raise the floor to `">=3.47.0"` (the installed stable is 3.47.7). If the analyzer still cannot find `RawTooltip`, stop and report in C8 › Questions — do not fall back to M3 `Tooltip` or a custom overlay.
- **Enums:** `BwTooltipPlacement`, `BwTooltipPurpose`, `BwTooltipTrigger` in `bw_tooltip.dart`, exported with the widget.
- **Tests:** use `pumpBw` from `test/helpers/bw_test_app.dart` (theme, locale, `reduceMotion`); pump the token durations, never real-time waits.

### C4 Token gaps

None.

### C5 Files to create / change

```
5-mobile-components/lib/src/components/tooltip/bw_tooltip.dart   new (widget + 3 enums + position delegate)
5-mobile-components/test/tooltip_test.dart                        new
5-mobile-components/test/goldens/tooltip/                         new goldens
5-mobile-components/lib/biowave_mobile.dart                       change: export (alphabetical)
5-mobile-components/pubspec.yaml                                  change: environment flutter ">=3.47.0" (C3 › SDK)
5-mobile-components/README.md                                     change: Tooltip row (Code)
CHANGELOG.md                                                      change: one entry
```

### C6 Tests

Implement every item in B9, plus:
- [ ] Hardware-keyboard focus (`FocusHighlightMode.traditional`) opens; touch focus does not open without a long press
- [ ] A tap on the anchor with `trigger: longPress` runs the anchor's action and does not open the tooltip
- [ ] The tooltip adds no focus traversal stop (Tab order unchanged with and without `BwTooltip`)
- [ ] Text scale 2.0: text wraps, width stays ≤ `BwSize.containerXxs`
- [ ] Earlier tests still pass

### C7 Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 exactly (names, types, defaults, assert)
- [ ] AC-2 Every value in B2–B3 comes from the listed token; no raw values, no primitives
- [ ] AC-3 Every transition in B4 via `RawTooltip.animationStyle` and the delays; reduced motion instant
- [ ] AC-4 RTL as B5 (measured positions in LTR and RTL); a11y as B6 (semantics per purpose, Esc, no traversal stop, contrast)
- [ ] AC-5 Tests in B9 and C6 exist and pass; `cd 5-mobile-components && flutter analyze && flutter test`, `npm run component-tokens`, `npm run sync`, `npm run docs:check` pass
- [ ] AC-6 Exported from `lib/biowave_mobile.dart`; README status updated; nothing outside C5 changed
- [ ] AC-7 (1.1) Hoverable across the gap per C3 › Position (transparent main-axis padding inside the hover area, padded child touching the target, visible gap `BwSpacing.xs`, edge clamp keeps `BwSpacing.md`); the B9 (1.1) test exists and passes

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

> How to build Part B in Figma. The Figma Agent receives this through the generated `figma-tooltip-contract.md`.

> Written by the Planner (Claude). Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> **One file per platform (D-12).** This file builds the Mobile set in **Biowave DS — Mobile Components**. Structure, layer tree and properties are the same as the [Web Part D](../../../3-web-components/components/tooltip/tooltip.md#d--figma-build) D2–D4 (one fact, one home); this file lists only what differs. Values come from the Mobile spec [Part B](#b--spec).

| Field | Value |
|---|---|
| Component | Tooltip |
| Platform | Mobile |
| Figma file | **Biowave DS — Mobile Components** (`_sync/figma-files.json` › `mobile`) |
| Page / section | `↳ Tooltip` › sections `Tooltip` and `Tooltip — Documentation` |
| Mode | **Create new.** No legacy Tooltip set |
| Depends on | Docs examples use the Icon Button set in this file as the anchor; if it is not built yet, finish Phase 1 and report those examples blocked in D11 |
| Plan version | 1 · 2026-10-23 |

### D1 Rules for this build

Same as [Web D1](../../../3-web-components/components/tooltip/tooltip.md#d1-rules-for-this-build) (library first, everything bound, no local variables or styles, no component tokens), plus:
- **Typography mode:** on page `↳ Tooltip` set the explicit variable mode **`Mobile`** for `5. Typography (EN)` and `6. Typography (AR)` (`page.setExplicitVariableModeForCollection`). Text styles stay `Web/{en|ar}/label/sm`; the mode gives the Mobile scale.

### D2 Component structure

As [Web D2–D4](../../../3-web-components/components/tooltip/tooltip.md#d2-component-structure), with these Mobile differences:
- Docs page 04 shows long press (and tap for a help icon) instead of hover; no hover example
- Docs page 07 uses `Doc/Device frame` Mobile portrait, with a `placement=bottom` example under an app bar icon

### D3 Layer tree and auto layout

As [Web D3](../../../3-web-components/components/tooltip/tooltip.md#d3-layer-tree-and-auto-layout), with the Mobile differences listed in D2.

### D4 Properties

As [Web D4](../../../3-web-components/components/tooltip/tooltip.md#d4-properties); code props map to `BwTooltip` (`Label` → `message`).

### D5 Variants to generate

As Web D5: `Language` × 2 = **2** variants.

### D6 States, interactions and motion

As Web D6, with the Mobile triggers from B4.

### D7 RTL

As Web D7 (`Language=AR` variant; docs page 08 shows `start` / `end` in EN and AR).

### D8 Documentation pages

All 12 standard pages (template D8 + `2-foundations/figma-doc-kit.md` › Page layouts) in section `Tooltip — Documentation` on `↳ Tooltip` in this file, built only from the Doc Kit; blocked until the Doc Kit exists. Page notes as Web D8 with the D2 differences.

Component description: "Short text that names an icon-only control or adds a one-line hint. Plain text only. Spec: 5-mobile-components/components/tooltip/tooltip.md".

### D9 Code Connect

`5-mobile-components/lib/src/components/tooltip/bw_tooltip.figma.dart` — `Label` → `message`. Publish after the code and Figma reviews are both `Approved`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Set on `↳ Tooltip` in the Mobile file; structure and layer names as Web D2–D3
- [ ] F-AC-2 Properties as Web D4; variant count 2 (D5)
- [ ] F-AC-3 Zero raw values; zero local variables/styles (all from the Foundations library)
- [ ] F-AC-4 Page Typography mode = `Mobile`; Light/Dark by mode only; Arabic wraps without truncation
- [ ] F-AC-5 Values match the Mobile B2–B3 (redline)
- [ ] F-AC-6 Docs built per D8 (or reported blocked by the Doc Kit); Code Connect per D9 after approval

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

1.1 — checked against Web review round 1 #1 (not hoverable): the same gap problem existed here for pointer hover, so the `BwSpacing.xs` gap is now transparent padding inside the tooltip's hover area (C3 › Position); same visible gap, same tokens, no API change. B9 gains a step-by-step hover-across-the-gap test. Not built yet, so no fix round.

### F1 Guidelines changelog

| Version | Date | Change | Migration | Author |
|---|---|---|---|---|
| 1.0 | 2026-10-23 | Initial | — | Planner (Claude) |

### F2 Spec changelog

| Version | Date | Change | Breaking | Migration |
|---|---|---|---|---|
| 1.1 | 2026-10-24 | Web review round 1 #1 applied: B2 / B6 — the `BwSpacing.xs` gap is inside the hover area; C3 › Position (main-axis transparent padding in the builder, padded child touching the target, clamp `BwSpacing.md - BwSpacing.xs` on the main axis); B9 hover-across-the-gap test; C7 AC-7 | No | None |
| 1.0 | 2026-10-23 | Initial. Same tokens and timings as the Web Tooltip; built on `RawTooltip` for token-driven fade timing | No | `BwIconButton` and the Text field help icon switch to `BwTooltip` in their own follow-up plans (C2) |

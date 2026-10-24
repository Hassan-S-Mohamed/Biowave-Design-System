<!-- GENERATED from tooltip.md @ d684793957c5c936 — do not edit; change the source and run: npm run contract -- tablet tooltip -->
# Tooltip · تلميح — Tablet — code contract

> **Everything you need to build Tooltip on Tablet, and nothing else.** Read this file only. Generated from [`tooltip.md`](tooltip.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](tooltip.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Tooltip · تلميح |
| Platform | Tablet · Flutter + Material 3 |
| Built on | Flutter `RawTooltip` (the widgets-layer engine under M3 `Tooltip`), styled from semantic tokens. M3 `Tooltip` (ROADMAP base) does not expose its fade duration and curve; `RawTooltip.animationStyle` does (C3) |
| Import | `BwTooltip` from `package:biowave_tablet/biowave_tablet.dart` |
| Version | 1.1 · 2026-10-24 |
| Source code | `lib/src/components/tooltip/` — not built yet (the Executor creates it) |
| Tokens | — |
| Source | [`tooltip.md`](tooltip.md) @ `d684793957c5c936` |

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

### BwTooltip
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

| Part | Property | Token | Flutter |
|---|---|---|---|
| `container` | padding-block · padding-inline | `spacing-xs` · `spacing-md` | `EdgeInsetsDirectional.symmetric(horizontal: BwSpacing.md, vertical: BwSpacing.xs)` |
| `container` | radius | `radius-sm` | `BorderRadiusDirectional.all(Radius.circular(BwRadius.sm))` |
| `container` | width | hug the text · max `size-container-xxs` | `BoxConstraints(maxWidth: BwSize.containerXxs)` |
| `container` | border · shadow | none · none | — |
| `container` | gap to the anchor (offset) | `spacing-xs` | `BwSpacing.xs` — (1.1) transparent padding inside the tooltip's hover area, not empty space between anchor and tooltip (B6 hoverable, C3 › Position) |
| `container` | minimum distance to the screen edge | `spacing-md` | `BwSpacing.md` |
| `label` | text style | `label-sm` | `context.bw.text.labelSm` (Tablet scale, Arabic style from the locale) |
| `label` | alignment · wrapping | start-aligned · wraps at the max width, never truncated | `TextAlign.start`, no `maxLines` |

Layout rules: the tooltip is drawn in the `Overlay` above the page and never changes the anchor's size or layout. Centred on the anchor's cross axis for every placement. The tooltip respects the user's text scale (it wraps; the max width stays).

## 4. Tokens by part and state

Every value is a semantic token; there are no component tokens (P-04 — the same set as the Web Tooltip and Icon button B3.4).

| Part | Property | Shown | Entering / exiting |
|---|---|---|---|
| `container` | background | `color-surface-inverse` (`context.bw.colors.surfaceInverse`) | same, opacity animated (B4) |
| `label` | color | `color-text-neutral-inverse` (`context.bw.colors.textNeutralInverse`) | same |

Dark theme: same tokens — the values switch, so the tooltip is light on dark screens. No exceptions. The tooltip has no pressed, focus or disabled style of its own.

### 4.1 How to use each token on Tablet

Values are for checking only — never paste a value.

| Token | Dart | Light | Dark |
|---|---|---|---|
| `color-surface-inverse` | `context.bw.colors.surfaceInverse` | #141414 | #FFFFFF |
| `color-text-neutral-inverse` | `context.bw.colors.textNeutralInverse` | #FFFFFF | #0A0A0A |
| `motion-duration-2xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 500 | 500 |
| `motion-duration-instant` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 0 | 0 |
| `motion-duration-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 200 | 200 |
| `motion-duration-sm` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 100 | 100 |
| `motion-easing-standard-accelerate` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | [0.3,0,1,1] | [0.3,0,1,1] |
| `motion-easing-standard-decelerate` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | [0,0,0,1] | [0,0,0,1] |
| `radius-sm` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 6 | 6 |
| `size-container-xxs` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 320 | 320 |
| `spacing-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 8 | 8 |
| `spacing-xs` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 4 | 4 |

## 5. States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Hidden → Shown | long press (`trigger: longPress`) or tap (`trigger: tap`) on the anchor | opacity | `motion-duration-md` (`BwDuration.md`) | `motion-easing-standard-decelerate` (`BwEasing.standardDecelerate`) |
| Hidden → Shown | pointer hover for `motion-duration-2xl` (`BwDuration.xl2`, delay) — mouse or trackpad | opacity | `motion-duration-md` | `motion-easing-standard-decelerate` |
| Hidden → Shown | hardware-keyboard focus on the anchor — no delay | opacity | `motion-duration-md` | `motion-easing-standard-decelerate` |
| Shown → Hidden | after a touch: the framework display time after the finger lifts (no Biowave token) · tap elsewhere | opacity | `motion-duration-sm` (`BwDuration.sm`) | `motion-easing-standard-accelerate` (`BwEasing.standardAccelerate`) |
| Shown → Hidden | pointer leaves anchor and tooltip · focus moves away · Esc — no delay (`motion-duration-instant`) | opacity | `motion-duration-sm` | `motion-easing-standard-accelerate` |

Reduced motion (`context.bw.reduceMotion`): enter and exit use `BwDuration.instant` (no fade). The hover delay stays; a touch still opens at once.

## 6. RTL

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

## 7. Accessibility (implementation)

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

## 8. Examples

```dart
import 'package:biowave_tablet/biowave_tablet.dart';

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

## 9. How to build it

### Goal

`BwTooltip` from `package:biowave_tablet/biowave_tablet.dart` matches B1–B6 and passes B9 and C6, with the same tokens and timings as the Web Tooltip.

### Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- Rich tooltips (title, actions) and arrows
- The foundations `ThemeData.tooltipTheme`, `BwButton`, `BwIcon` and other components
- **Follow-up, not this task:** `BwIconButton` (Code `Planned`) and the Text field help icon (its plan uses M3 `Tooltip(triggerMode: TooltipTriggerMode.tap)`) switch to `BwTooltip` (`purpose: label` / `trigger: tap`) in their own plan steps; M3 widgets that build their own `Tooltip` (e.g. `IconButton(tooltip:)`) keep the M3 look until foundations get a `tooltipTheme` from the same tokens

### Approach

- **Base:** `RawTooltip` (Flutter widgets layer; M3 `Tooltip` is built on it but does not pass `animationStyle` through). `tooltipBuilder: (context, animation) => FadeTransition(opacity: animation, child: _BwTooltipBox(...))`, where the box is a `ConstrainedBox(maxWidth: BwSize.containerXxs)` → `DecoratedBox(color: surfaceInverse, borderRadius)` → `Padding` → `Text(message, style: labelSm.copyWith(color: textNeutralInverse), textAlign: TextAlign.start)`.
- **Timing:** `animationStyle: AnimationStyle(duration: BwDuration.md, reverseDuration: BwDuration.sm, curve: BwEasing.standardDecelerate, reverseCurve: BwEasing.standardAccelerate)`; with `context.bw.reduceMotion` both durations are `BwDuration.instant`. `hoverDelay: BwDuration.xl2`, `dismissDelay: BwDuration.instant`. `touchDelay` is not passed (framework default display time after a touch; Biowave has no token for it). `triggerMode` from `trigger`. `ignorePointer: false`, `enableFeedback: true`.
- **Position (1.1):** the `BwSpacing.xs` gap must be inside the tooltip's hover area. `RawTooltip` wraps the `tooltipBuilder` output in its `MouseRegion` (with `ignorePointer: false`), so the builder returns `Padding(padding: <main axis>, child: _BwTooltipBox(...))` with transparent padding `BwSpacing.xs` on **both** main-axis sides (`EdgeInsetsDirectional.symmetric(vertical: BwSpacing.xs)` for `top` / `bottom`, `EdgeInsetsDirectional.symmetric(horizontal: BwSpacing.xs)` for `start` / `end`) — both sides, because the builder does not know whether the delegate flips. A `positionDelegate` places this padded child **touching** the target (no extra gap) from `placement`, `Directionality.of(context)`, the target rect, the child size and the overlay size: centred on the cross axis; flipped to the opposite side when the chosen side has no room; clamped so the visible box stays `BwSpacing.md` inside the overlay (main axis: clamp the padded child at `BwSpacing.md - BwSpacing.xs`; cross axis: `BwSpacing.md`). Result: the visible gap is `BwSpacing.xs` on the facing side, and the pointer never leaves the hover area between anchor and box. `dismissDelay` stays `BwDuration.instant` — no delay is added to hide the gap. **Gotcha:** if a test shows the padding is not inside `RawTooltip`'s hover region, stop and report in C8 › Questions — do not add a dismiss delay or a custom overlay.
- **Keyboard:** wrap the child in `Focus(canRequestFocus: false, skipTraversal: true, onFocusChange: …)`; when focus arrives and `FocusManager.instance.highlightMode == FocusHighlightMode.traditional`, call `ensureTooltipVisible()` on a `GlobalKey<RawTooltipState>`; on focus loss call `RawTooltip.dismissAllToolTips()`. Esc: `CallbackShortcuts` (`SingleActivator(LogicalKeyboardKey.escape)` → `RawTooltip.dismissAllToolTips()`).
- **Semantics:** per B6. `label` uses `MergeSemantics` + `Semantics(label:)` and `semanticsTooltip: null`; `description` passes `semanticsTooltip: message`.
- **SDK:** `RawTooltip` and `AnimationStyle` on `RawTooltip` need a newer Flutter than the current `pubspec.yaml` floor (`flutter: ">=3.24.0"`). Raise the floor to `">=3.47.0"` (the installed stable is 3.47.7). If the analyzer still cannot find `RawTooltip`, stop and report in C8 › Questions — do not fall back to M3 `Tooltip` or a custom overlay.
- **Enums:** `BwTooltipPlacement`, `BwTooltipPurpose`, `BwTooltipTrigger` in `bw_tooltip.dart`, exported with the widget.
- **Tests:** use `pumpBw` from `test/helpers/bw_test_app.dart` (theme, locale, `reduceMotion`); pump the token durations, never real-time waits.

### Token gaps

None.

### Files to create / change

```
4-tablet-components/lib/src/components/tooltip/bw_tooltip.dart   new (widget + 3 enums + position delegate)
4-tablet-components/test/tooltip_test.dart                        new
4-tablet-components/test/goldens/tooltip/                         new goldens
4-tablet-components/lib/biowave_tablet.dart                       change: export (alphabetical)
4-tablet-components/pubspec.yaml                                  change: environment flutter ">=3.47.0" (C3 › SDK)
4-tablet-components/README.md                                     change: Tooltip row (Code)
CHANGELOG.md                                                      change: one entry
```

## 10. Tests

- [ ] Goldens: tooltip shown, every `placement`, light + dark, en + ar (`test/goldens/tooltip/`), plus a long text wrapping at the max width in en and ar
- [ ] Every transition in B4: long press opens; `trigger: tap` opens on tap; pointer hover opens only after `BwDuration.xl2`; hardware-keyboard focus opens at once; Esc, blur, pointer leave and tap elsewhere close; animation durations and curves from B4; `reduceMotion` → `BwDuration.instant`
- [ ] Every `placement` in LTR and RTL: tooltip position relative to the anchor matches B5 (`tester.getRect`); flips to the opposite side when there is no room; stays `spacing-md` from the screen edge
- [ ] (1.1) Hoverable across the gap (mouse `TestGesture`, `PointerDeviceKind.mouse`), for `top` and for `end` in LTR and RTL: hover the anchor, pump `BwDuration.xl2` + `BwDuration.md` → shown; then move the pointer from inside the anchor, across the gap, into the visible box in steps of one logical pixel, pumping one frame between moves; then pump `BwDuration.sm` + `BwDuration.xl2` → still shown. Negative control: move the pointer off the anchor away from the tooltip → dismissed after `BwDuration.sm`. Gap geometry: the visible box (`_BwTooltipBox`) is exactly `BwSpacing.xs` from the anchor on the facing side in all four placements, LTR and RTL, also after a flip
- [ ] Semantics: `label` → anchor node label = `message`, read once; `description` → node has tooltip = `message` after its own label
- [ ] `textContrastGuideline` passes with the tooltip shown in light and dark
- [ ] Empty `message` asserts; no raw values (lint test)

Implement every item in B9, plus:
- [ ] Hardware-keyboard focus (`FocusHighlightMode.traditional`) opens; touch focus does not open without a long press
- [ ] A tap on the anchor with `trigger: longPress` runs the anchor's action and does not open the tooltip
- [ ] The tooltip adds no focus traversal stop (Tab order unchanged with and without `BwTooltip`)
- [ ] Text scale 2.0: text wraps, width stays ≤ `BwSize.containerXxs`
- [ ] Earlier tests still pass

## 11. Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 exactly (names, types, defaults, assert)
- [ ] AC-2 Every value in B2–B3 comes from the listed token; no raw values, no primitives
- [ ] AC-3 Every transition in B4 via `RawTooltip.animationStyle` and the delays; reduced motion instant
- [ ] AC-4 RTL as B5 (measured positions in LTR and RTL); a11y as B6 (semantics per purpose, Esc, no traversal stop, contrast)
- [ ] AC-5 Tests in B9 and C6 exist and pass; `cd 4-tablet-components && flutter analyze && flutter test`, `npm run component-tokens`, `npm run sync`, `npm run docs:check` pass
- [ ] AC-6 Exported from `lib/biowave_tablet.dart`; README status updated; nothing outside C5 changed
- [ ] AC-7 (1.1) Hoverable across the gap per C3 › Position (transparent main-axis padding inside the hover area, padded child touching the target, visible gap `BwSpacing.xs`, edge clamp keeps `BwSpacing.md`); the B9 (1.1) test exists and passes

## 12. Rules

1. Never edit generated files (`*/generated/*`, `2-foundations/dist/`, `2-foundations/preview/`, `_sync/*.json`, any `*-contract.md`).
2. No raw values: no hex, px, ms or font names — only the tokens in §4. A missing value means stop and ask; tokens are added by the Planner.
3. Never use primitives (`primitive.*`, `BwPalette`).
4. RTL first: logical properties only (`EdgeInsetsDirectional`, `AlignmentDirectional`, `BorderRadiusDirectional`); mirror only directional icons (§6).
5. Light + dark and en + ar, always — and tested.
6. WCAG 2.2 AA: keyboard, visible focus (`color-border-focus`, 2px, 2px offset), labels, targets ≥ `target-min` (48dp), reduced motion.
7. Stay inside this contract; one component per task; do not refactor unrelated files.

## 13. Commands that must pass

```bash
cd 4-tablet-components && flutter analyze && flutter test
npm run component-tokens
npm run sync        # must end with READY
npm run docs:check
```

## 14. When you finish

1. Fill [C8 Execution log](tooltip.md#c8-execution-log-filled-by-the-executor) in `tooltip.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `tooltip.md` and in the Components table of `4-tablet-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).

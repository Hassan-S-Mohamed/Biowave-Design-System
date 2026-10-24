<!-- GENERATED from badge.md @ d85074845f3110e5 — do not edit; change the source and run: npm run contract -- tablet badge -->
# Badge · شارة — Tablet — code contract

> **Everything you need to build Badge on Tablet, and nothing else.** Read this file only. Generated from [`badge.md`](badge.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](badge.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Badge · شارة |
| Platform | Tablet · Flutter + Material 3 |
| Built on | Biowave `Stack` composition shaped like M3 `Badge` (M3 `Badge` cannot centre the indicator on the corner, draw the ring or animate visibility — C3); Check badge glyph via `BwIcon` (`Symbols.check_rounded`) |
| Import | `BwBadge` from `package:biowave_tablet/biowave_tablet.dart` |
| Version | 1.1 · 2026-10-24 |
| Source code | `lib/src/components/badge/` — not built yet (the Executor creates it) |
| Tokens | — |
| Source | [`badge.md`](badge.md) @ `d85074845f3110e5` |

## 1. What it is

A badge is a small indicator pinned to the corner of another element — an icon button, a navigation item, an avatar — or placed inline after text. It tells people, at a glance, that something there needs their attention or is already true. It comes in three variants: **count** (how many new items), **dot** (something new, no number) and **check** (the Check badge, decision P-05: the thing is verified, completed or selected). A badge is never interactive; the element it marks is.

**Part names** (use exactly these in code, class names and tests):

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `anchor` | No | The element the badge marks (Icon button, navigation item, avatar, icon). Consumer content; without it the badge is standalone and sits inline |
| 2 | `indicator` | Yes | The badge shape: a pill (count), a small circle (dot) or a circle (check), filled with the `color` |
| 3 | `count` | Count only | The number, Western digits in both languages (D-10); above `max` it shows `max` followed by `+` |
| 4 | `check-icon` | Check only | The Material Symbols Rounded `check` glyph, drawn by Icon; never mirrored |
| 5 | `ring` | When anchored | A thin outline in the surface colour that separates the `indicator` from the `anchor` |

**Options** (names and values are the props in §2):

- 4.1 `variant`
- 4.2 `color`
- 4.3 `max`
- 4.4 `showZero`
- 4.5 `overlap`
- 4.6 `invisible`
- 4.7 `label`

## 2. API

### `BwBadge`

| Param | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `child` | `Widget?` | | `null` | | The `anchor`. `null` → standalone inline badge (no `ring`) |
| `variant` | `BwBadgeVariant` | `count` · `dot` · `check` | `count` | | A4.1 |
| `count` | `int?` | ≥ 0 | `null` | ✓ for `count` | A2 `count`; ignored by `dot` and `check` |
| `max` | `int` | ≥ 1 | `99` | | A4.3 — above it the badge shows `{max}+` |
| `showZero` | `bool` | | `false` | | A4.4 |
| `color` | `BwBadgeColor?` | `error` · `brand` · `secondary` · `success` · `warning` · `info` · `neutral` | `null` → `error` (`success` for `check`) | | A4.2 |
| `overlap` | `BwBadgeOverlap` | `rectangular` · `circular` | `rectangular` | | A4.5 — only with `child` |
| `isVisible` | `bool` | | `true` | | A4.6 (web `invisible`, inverted) — hides with the exit transition (B4); a hidden standalone badge takes no space (B4) |
| `semanticLabel` | `String?` | | `null` | ✓ when visible | A4.7 — the accessible meaning (B6) |

Platform naming: web `children` = `child`; web `invisible` = `!isVisible`; web `label` = `semanticLabel`. Named constructors are not used — one constructor, like the web props.

**Invalid combinations** (`assert` in debug, message in quotes):
- `variant == count` and `count == null` → “count badges need a count”
- `count < 0` → “count must be ≥ 0”; `max < 1` → “max must be ≥ 1”
- `variant == check` with `color` `error` or `warning` → “check badges use success, brand, secondary, info or neutral”
- `variant == dot` with `color == warning` → “warning is for count badges only”
- visible badge with `semanticLabel == null` → “badges need a semanticLabel”

## 3. Dimensions

Same sizes as [Web B2](../../../3-web-components/components/badge/badge.md#b2-dimensions), in dp:

| Part | Property | `count` | `dot` | `check` |
|---|---|---|---|---|
| `indicator` | height | `size-icon-md` → `BwSize.iconMd` | `spacing-md` → `BwSpacing.md` | `size-icon-md` → `BwSize.iconMd` |
| `indicator` | min width | `size-icon-md` → `BwSize.iconMd` | `spacing-md` (fixed) | `size-icon-md` (fixed) |
| `indicator` | horizontal padding | `spacing-xs` → `EdgeInsetsDirectional.symmetric(horizontal: BwSpacing.xs)` | — | — |
| `indicator` | shape | `radius-full` → `StadiumBorder` / `BorderRadius.circular(BwRadius.full)` | same | same |
| `count` | text style | `data-sm` → `context.bw.text.dataSm` + `FontFeature.tabularFigures()` | — | — |
| `check-icon` | size | — | — | `size-icon-sm` → `BwIcon(size: BwIconSize.sm)` |
| `ring` | width (anchored only) | `border-width-strong` → `BwBorder.widthStrong` | same | same |

```
   ┬ ╭──────────────────╮        ┬ ●              ┬ ╭─────╮
   │ │       99+        │        ┴ BwSpacing.md   │ │ [✓] │
   ┴ ╰──────────────────╯                         ┴ ╰─────╯
 BwSize.iconMd  ├─┤ BwSpacing.xs                BwSize.iconMd
```

Layout rules:
- Anchored: `Stack(clipBehavior: Clip.none)` with the `child` first and the indicator in a `PositionedDirectional(top: 0, end: 0)` wrapped in `FractionalTranslation(translation: Offset(isRtl ? -0.5 : 0.5, -0.5))`, so the indicator centre sits on the anchor's top-end corner (B5). `overlap: circular` insets the reference corner by 14.6% of the anchor size on both axes ((1 − cos 45°) ÷ 2, same as Web).
- The `Stack` is sized by the `child` only; the badge never changes the anchor's size or hit area.
- Standalone (`child == null`): the indicator alone, no `ring`, no translation, aligned to the text's middle when placed in a `Row`.
- `count`: one line, no wrap, centred; the text is built as `'${n}'` / `'$max+'` and wrapped in `Directionality(textDirection: TextDirection.ltr)` so `99+` never reorders in Arabic.
- `ring`: drawn outside the indicator (`BoxDecoration.border` with `BorderSide(strokeAlign: BorderSide.strokeAlignOutside)`) — it adds no layout size.

## 4. Tokens by part and state

Identical to [Web B3](../../../3-web-components/components/badge/badge.md#b3-tokens-by-part-and-state); no component tokens (P-04). Flutter mapping (`context.bw.colors.*`):

| `color` | `indicator` background | `count` text | `check-icon` |
|---|---|---|---|
| `error` | `color-background-error-default` → `backgroundErrorDefault` | `color-text-on-error` → `textOnError` | — |
| `brand` | `color-background-brand-default` → `backgroundBrandDefault` | `color-text-on-brand` → `textOnBrand` | `color-icon-on-brand` → `iconOnBrand` |
| `secondary` | `color-background-secondary-default` → `backgroundSecondaryDefault` | `color-text-on-secondary` → `textOnSecondary` | `color-icon-on-secondary` → `iconOnSecondary` |
| `success` | `color-background-success-default` → `backgroundSuccessDefault` | `color-text-on-success` → `textOnSuccess` | `color-icon-on-success` → `iconOnSuccess` |
| `warning` | `color-icon-role-warning` → `iconRoleWarning` | `color-text-on-warning` → `textOnWarning` | — |
| `info` | `color-background-info-default` → `backgroundInfoDefault` | `color-text-on-info` → `textOnInfo` | `color-icon-on-info` → `iconOnInfo` |
| `neutral` | `color-surface-inverse` → `surfaceInverse` | `color-text-neutral-inverse` → `textNeutralInverse` | `color-icon-neutral-inverse` → `iconNeutralInverse` |

| Part | Property | Token → Flutter |
|---|---|---|
| `ring` | colour | `color-border-inverse` → `context.bw.colors.borderInverse` |
| `ring` | width | `border-width-strong` → `BwBorder.widthStrong` |

`warning` fill (1.1): `color-icon-role-warning`, not `color-background-warning-default` (2.20:1 on `color-surface-default` in light) — reason and ratios in [Web B3](../../../3-web-components/components/badge/badge.md#b3-tokens-by-part-and-state).

Dark theme: same tokens. No exceptions.

### 4.1 How to use each token on Tablet

Values are for checking only — never paste a value.

| Token | Dart | Light | Dark |
|---|---|---|---|
| `border-width-strong` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 2 | 2 |
| `color-background-brand-default` | `context.bw.colors.backgroundBrandDefault` | #193351 | #607D9F |
| `color-background-error-default` | `context.bw.colors.backgroundErrorDefault` | #D42222 | #FF7676 |
| `color-background-info-default` | `context.bw.colors.backgroundInfoDefault` | #2559D4 | #6D9CE8 |
| `color-background-secondary-default` | `context.bw.colors.backgroundSecondaryDefault` | #0C5F79 | #5DA8C2 |
| `color-background-success-default` | `context.bw.colors.backgroundSuccessDefault` | #1E6D41 | #55BE87 |
| `color-background-warning-default` | `context.bw.colors.backgroundWarningDefault` | #FF9435 | #FFB05E |
| `color-border-inverse` | `context.bw.colors.borderInverse` | #FFFFFF | #0A0A0A |
| `color-icon-neutral-inverse` | `context.bw.colors.iconNeutralInverse` | #FFFFFF | #0A0A0A |
| `color-icon-on-brand` | `context.bw.colors.iconOnBrand` | #FFFFFF | #0A0A0A |
| `color-icon-on-info` | `context.bw.colors.iconOnInfo` | #FFFFFF | #0A0A0A |
| `color-icon-on-secondary` | `context.bw.colors.iconOnSecondary` | #FFFFFF | #0A0A0A |
| `color-icon-on-success` | `context.bw.colors.iconOnSuccess` | #FFFFFF | #0A0A0A |
| `color-icon-role-warning` | `context.bw.colors.iconRoleWarning` | #D97424 | #FFC88F |
| `color-surface-default` | `context.bw.colors.surfaceDefault` | #FFFFFF | #141414 |
| `color-surface-inverse` | `context.bw.colors.surfaceInverse` | #141414 | #FFFFFF |
| `color-text-neutral-inverse` | `context.bw.colors.textNeutralInverse` | #FFFFFF | #0A0A0A |
| `color-text-on-brand` | `context.bw.colors.textOnBrand` | #FFFFFF | #0A0A0A |
| `color-text-on-error` | `context.bw.colors.textOnError` | #FFFFFF | #0A0A0A |
| `color-text-on-info` | `context.bw.colors.textOnInfo` | #FFFFFF | #0A0A0A |
| `color-text-on-secondary` | `context.bw.colors.textOnSecondary` | #FFFFFF | #0A0A0A |
| `color-text-on-success` | `context.bw.colors.textOnSuccess` | #FFFFFF | #0A0A0A |
| `color-text-on-warning` | `context.bw.colors.textOnWarning` | #0A0A0A | #0A0A0A |
| `radius-full` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 9999 | 9999 |
| `size-icon-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 20 | 20 |
| `size-icon-sm` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 16 | 16 |
| `spacing-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 8 | 8 |
| `spacing-xs` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 4 | 4 |
| `target-min` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` |  |  |

## 5. States and transitions

Same table as [Web B4](../../../3-web-components/components/badge/badge.md#b4-states-and-transitions). Flutter: `AnimatedScale(alignment: Alignment.center)` on the indicator — to visible `duration: BwDuration.md, curve: BwEasing.standardDecelerate`; to hidden `duration: BwDuration.sm, curve: BwEasing.standardAccelerate`; first build has no animation. Count, `color` and `variant` changes rebuild at once.
Reduced motion: when `context.bw.reduceMotion` is true use `BwDuration.instant`.

**Hidden standalone** (`child == null`, 1.1): takes no space, as [Web B4 › Hidden standalone](../../../3-web-components/components/badge/badge.md#b4-states-and-transitions). When it hides, the exit `AnimatedScale` plays first; in its `onEnd` the indicator is replaced by `SizedBox.shrink()`. When it shows, the indicator is rebuilt at scale 0 and then animates in. With `reduceMotion` it leaves and returns at once. Hidden on first build → `SizedBox.shrink()` from the start. Anchored badges are unchanged.

## 6. RTL

As [Web B5](../../../3-web-components/components/badge/badge.md#b5-rtl): placement mirrors to the top-start corner through `PositionedDirectional(end: 0)` and the RTL-signed `FractionalTranslation`; `count` stays LTR (`99+`); `check-icon` is `BwIcon(icon: Symbols.check_rounded)` without `directional` — never mirrored.

```
LTR   ┌──────────┐(3)        RTL  (3)┌──────────┐
      │  [✉]     │                   │     [✉]  │
      └──────────┘                   └──────────┘
```

## 7. Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Indicator | `ExcludeSemantics` always |
| Anchored with `semanticLabel` | `MergeSemantics(child: Semantics(value: semanticLabel, child: child))` — TalkBack / VoiceOver: “Notifications, 3 unread messages, button” |
| Hidden badge | No `value` while hidden |
| Standalone with `semanticLabel` | `Semantics(label: semanticLabel, image: true)` around the indicator (outside `ExcludeSemantics`) |
| Contrast | As Web B6 — every allowed `color` × `variant` meets 3:1 against `color-surface-default` in both themes; `warning` through its `iconRoleWarning` fill (B3) |
| Focus | Never focusable; no `Focus` / `InkWell` in the badge. The anchor's focus ring stays visible |
| Target size | Not a target: the indicator is wrapped in `IgnorePointer`; the anchor keeps ≥ `target-min` (48) |
| Live updates | No `liveRegion` |

| Key | Action |
|---|---|
| — | None. Interaction belongs to the anchor |

## 8. Examples

```dart
BwBadge(
  count: 3,
  semanticLabel: '3 unread messages',
  child: BwIconButton(icon: Symbols.mail_rounded, label: 'Messages', onPressed: openInbox),
);

// Arabic (direction comes from Directionality — the badge moves to the top-left)
BwBadge(
  count: 120,
  semanticLabel: 'أكثر من 99 رسالة',
  child: BwIconButton(icon: Symbols.mail_rounded, label: 'الرسائل', onPressed: openInbox),
);

BwBadge(variant: BwBadgeVariant.dot, semanticLabel: 'New activity', child: BwIcon(icon: Symbols.schedule_rounded));
BwBadge(variant: BwBadgeVariant.check, overlap: BwBadgeOverlap.circular, semanticLabel: 'Verified', child: avatar);
Row(children: [Text('Requests'), SizedBox(width: BwSpacing.xs), BwBadge(count: 12, color: BwBadgeColor.neutral, semanticLabel: '12 pending requests')]);
```

## 9. How to build it

### Goal

`BwBadge` from `package:biowave_tablet/biowave_tablet.dart` marks any widget (or sits inline) with a count, dot or Check badge in the seven B3 colours, placed on the top-end corner in both directions, scaled in and out with the motion tokens, and merged into the anchor's semantics — tokens only.

### Scope

**In scope:** B1–B9 — `BwBadge`, `BwBadgeVariant`, `BwBadgeColor`, `BwBadgeOverlap`; the three variants (incl. the Check badge, P-05), both `overlap` values, standalone mode, semantics, asserts.

**Out of scope** (do not build)
- Badges inside other widgets (navigation rail / bar, tabs, avatar) — those widgets place `BwBadge` in their own plans
- Live-region announcements of count changes
- Other sizes; custom content in the indicator
- Changes to `BwIcon`, `BwIconButton` or any other widget

### Approach

- Base: Biowave widget composed like M3 `Badge` (same roles: label, small/large size, `isLabelVisible` → `isVisible`), but built with `Stack` + `PositionedDirectional` + `FractionalTranslation` because M3 `Badge` places its label by a fixed offset from the corner (not centred on it), cannot draw the outside `ring` and does not animate visibility. Record in C8 if M3 `Badge` is used internally for the indicator.
- Indicator: `AnimatedScale` → `DecoratedBox(ShapeDecoration / BoxDecoration with BorderRadius.circular(BwRadius.full), border outside when anchored)` → `ConstrainedBox(minWidth/minHeight)` → `Padding(EdgeInsetsDirectional)` → `Text` (count, `context.bw.text.dataSm` with tabular figures, LTR `Directionality`) or `BwIcon(icon: Symbols.check_rounded, size: BwIconSize.sm, color: …)`.
- One `switch` from `BwBadgeColor` to the three B3 colours (`context.bw.colors.*`); `color: null` resolves to `error`, or `success` for `check`.
- Indicator in `IgnorePointer` + `ExcludeSemantics`; semantics per B6.
- Visibility: `count` formatting and the hidden rule (`count == 0 && !showZero`, or `!isVisible`) in one pure function, unit-tested.
- Gotchas: `FractionalTranslation` does not move hit testing — fine, because the indicator ignores pointers; `Stack(clipBehavior: Clip.none)` is required or the half outside the anchor is clipped; keep the `Stack` sized by the child (`fit: StackFit.loose`, child non-positioned).

### Token gaps

None. Every value in B2–B3 is an existing semantic token; no component tokens are needed (P-04, D-13).

### Files to create / change

```
4-tablet-components/lib/src/components/badge/bw_badge.dart    new: BwBadge, BwBadgeVariant, BwBadgeColor, BwBadgeOverlap
4-tablet-components/lib/biowave_tablet.dart                    change: export bw_badge.dart
4-tablet-components/test/badge_test.dart                       new
4-tablet-components/test/goldens/badge/                        new
4-tablet-components/README.md                                  change: Badge row Code status
CHANGELOG.md                                     change
```

## 10. Tests

- [ ] Every `variant` × allowed `color` renders the B2 sizes (`tester.getSize` of the indicator) and B3 colours in light + dark × en + ar; `count` × `warning` fill is `iconRoleWarning`, never `backgroundWarningDefault`
- [ ] `count` above `max` shows `{max}+` in LTR order in both directions; `count: 0` hides unless `showZero`; `max` default 99
- [ ] Anchored: ring width `BwBorder.widthStrong`, colour `borderInverse`, outside; standalone: no ring
- [ ] Placement: indicator centre on the anchor's top-end corner in LTR and top-start in RTL (`tester.getCenter` vs `tester.getTopRight`/`getTopLeft` of the child), both `overlap` values; anchor size unchanged
- [ ] B4: `AnimatedScale` durations/curves per direction; first build not animated; `reduceMotion` → instant
- [ ] Hidden standalone (B4): during the exit the indicator keeps its size; after the exit ends its size is zero (`tester.getSize`); `reduceMotion` → zero at once; hidden on first build → zero; shown again → full size after the enter; an anchored hidden badge keeps the `Stack` sized by the child
- [ ] Semantics: indicator excluded; anchored `value` merged into the anchor node; standalone `image` node with the label; hidden badge adds nothing
- [ ] A tap on the indicator reaches the anchor's `onPressed`
- [ ] Every assert in B1 fires with its message
- [ ] Goldens: variants × colours (light/dark), anchored LTR/RTL, standalone, `99+`
- [ ] No `Icons.` and no raw sizes/colours in the source

Implement every item in B9, plus:
- [ ] Unit test of the visibility / formatting function (0, `showZero`, `max`, `max + 1`, negative → assert)

## 11. Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 API per B1 (names, types, defaults, asserts)
- [ ] AC-2 Sizes and colours only from tokens (B2–B3); no raw values, no `BwPalette`
- [ ] AC-3 B4 transitions (enter/exit timings differ, no first-build animation); reduced motion respected
- [ ] AC-4 RTL per B5; semantics, pointer and focus per B6
- [ ] AC-5 Tests in B9 and C6 exist and pass; `cd 4-tablet-components && flutter analyze && flutter test` pass
- [ ] AC-6 Exported; section README status updated; no `Icons.` in `lib/`
- [ ] AC-7 The anchor is untouched: same size, same hit area, same focus ring

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

1. Fill [C8 Execution log](badge.md#c8-execution-log-filled-by-the-executor) in `badge.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `badge.md` and in the Components table of `4-tablet-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).

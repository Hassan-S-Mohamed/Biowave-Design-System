# Badge · شارة — Tablet

> **One file for Badge on Tablet:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- tablet badge`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Badge · شارة |
| Summary | Marks an element with a count, a dot or a check, so people see at a glance that something needs attention or is already true. |
| Summary (ar) | تُميّز عنصرًا بعدد أو نقطة أو علامة صح، ليرى المستخدم فورًا أن هناك ما يحتاج إلى انتباهه أو أمرًا تحقّق بالفعل. |
| Parts | Anchor · indicator · count · check icon · ring |
| Parts (ar) | العنصر المُعلَّم · المؤشر · العدد · أيقونة الصح · الحلقة |
| Platform | Tablet · Flutter + Material 3 |
| Built on | Biowave `Stack` composition shaped like M3 `Badge` (M3 `Badge` cannot centre the indicator on the corner, draw the ring or animate visibility — C3); Check badge glyph via `BwIcon` (`Symbols.check_rounded`) |
| Import | `BwBadge` from `package:biowave_tablet/biowave_tablet.dart` |
| Figma | **Biowave DS — Tablet Components** › `↳ Badge` (page Typography mode `Tablet`) · build: [Part D](#d--figma-build) |
| Version | 1.0 · 2026-10-21 |
| Plan | Finished |
| Code | Planned |
| Figma build | Planned |
| Review | — |
| Source code | `lib/src/components/badge/` — not built yet (the Executor creates it) |
| Tokens | — (no component tokens: every value is an existing semantic token, P-04) |
| Contracts | [`badge-contract.md`](badge-contract.md) · [`figma-badge-contract.md`](figma-badge-contract.md) — generated, never edited |
| Docs page | [`badge.html`](badge.html) |

## Contents

[A · Guidelines](#a--guidelines) · [B · Spec](#b--spec) · [C · Code plan](#c--code-plan) · [D · Figma build](#d--figma-build) · [E · Review](#e--review) · [F · Changelog](#f--changelog)

---

## A · Guidelines

> What it is and when to use it — designers and PMs. Identical on Web, Tablet and Mobile except **A8** (checked by `npm run docs:check`).

### A1 Overview

A badge is a small indicator pinned to the corner of another element — an icon button, a navigation item, an avatar — or placed inline after text. It tells people, at a glance, that something there needs their attention or is already true. It comes in three variants: **count** (how many new items), **dot** (something new, no number) and **check** (the Check badge, decision P-05: the thing is verified, completed or selected). A badge is never interactive; the element it marks is.

### A2 Anatomy

```
 count (anchored)        dot (anchored)        check (anchored, circular)
 ┌──────────┐(12)②③      ┌──────────┐●②         ╭──────────╮(✓)②④
 │    ①     │  ⑤ ring    │    ①     │ ⑤         │    ①     │ ⑤
 │  anchor  │            │  anchor  │           │  avatar  │
 └──────────┘            └──────────┘           ╰──────────╯
 The indicator ② is centred on the anchor's top-end corner.

 count (standalone, inline, no ring):   Inbox  (12)②③
```

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `anchor` | No | The element the badge marks (Icon button, navigation item, avatar, icon). Consumer content; without it the badge is standalone and sits inline |
| 2 | `indicator` | Yes | The badge shape: a pill (count), a small circle (dot) or a circle (check), filled with the `color` |
| 3 | `count` | Count only | The number, Western digits in both languages (D-10); above `max` it shows `max` followed by `+` |
| 4 | `check-icon` | Check only | The Material Symbols Rounded `check` glyph, drawn by Icon; never mirrored |
| 5 | `ring` | When anchored | A thin outline in the surface colour that separates the `indicator` from the `anchor` |

### A3 Usage

**When to use**
- To show that new items wait behind an entry point: unread messages on an Icon button, pending requests on a navigation item (count)
- To show that something changed when the number does not matter or is unknown: new activity, an update available (dot)
- To show that a person, device or step is verified, completed or selected — a verified employee avatar, a finished onboarding step (check)
- Inline after a list or tab label, to show its count (standalone count)

**When not to use** (and what to use instead)

| Situation | Use instead |
|---|---|
| The user selects or clears the item | Checkbox or selectable Card — a Check badge only shows a state, it is not a control |
| A status that needs words (Approved, Pending, Rejected) | Chip (status variant) |
| A category or label on content | Chip (tag variant) |
| A message the user must read or act on now | Alert or Snackbar |
| A clickable icon | [Icon button](../icon-button/icon-button.md#a--guidelines), with the badge on it |
| A total that is not new or actionable (number of employees) | Plain text in the label |

### A4 Options

#### 4.1 `variant`

| Value | Looks like | Pick it when |
|---|---|---|
| `count` | `[◆] (3)` | The number helps people decide (3 unread, 12 requests). Default |
| `dot` | `[◆]●` | Something is new but the number is unknown or does not matter |
| `check` | `[◆] (✓)` | The Check badge: the marked thing is verified, completed or selected |

#### 4.2 `color`

| Value | Pick it when |
|---|---|
| `error` | Needs attention: unread, overdue, failed. Default for `count` and `dot` |
| `brand` | Neutral emphasis in brand surfaces: new features, informational counts |
| `secondary` | Counts inside teal (secondary) areas |
| `success` | Done or verified. Default for `check` |
| `warning` | Needs attention soon — `count` only (the orange shape alone is too light to see on a white surface) |
| `info` | Informational counts and updates |
| `neutral` | Low-emphasis counts that are not urgent (items in a list or tab) |

#### 4.3 `max`

The largest number shown. Above it the badge shows `max` followed by `+` (`99+`). Default `99`. Only for `count`.

#### 4.4 `showZero`

Off (default): a count of 0 hides the badge. On: the badge shows `0` — use it only when zero is news (“0 errors left”). Only for `count`.

#### 4.5 `overlap`

| Value | Pick it when |
|---|---|
| `rectangular` | The anchor is square or rectangular: Icon button, icon, navigation item. Default |
| `circular` | The anchor is a circle: avatar. The badge moves in so it sits on the circle's edge, not in empty space |

#### 4.6 `invisible`

Hides the badge with its exit animation while keeping the anchor in place — for example when the user opens the inbox. Prefer it to removing the badge, so the badge animates out.

#### 4.7 `label`

What the badge means, in words, for people who cannot see it: “3 unread messages”, “New activity”, “Verified”. Required for every visible badge — the indicator itself is hidden from assistive technology.

**Combination rules**
- `max` and `showZero` apply to `count` only
- `check` uses `success` (default), `brand`, `secondary`, `info` or `neutral` — never `error` or `warning` (a red or orange check contradicts itself)
- `warning` is for `count` only — never `dot` or `check`
- One badge per anchor — never two badges on the same element
- The `ring` shows only when there is an `anchor`; a standalone badge has no ring

### A5 States and behavior

A badge has no interactive states. It follows its data, not the pointer.

| State | When it happens | What the user sees |
|---|---|---|
| Hidden | `count` is 0 (without `showZero`) or `invisible` is on | Nothing; the anchor looks as it does without a badge |
| Appearing | The badge becomes visible | The indicator grows from its centre |
| Visible | Default | The indicator on the anchor's top-end corner (top-left in Arabic) |
| Over max | `count` > `max` | `99+` |
| Disappearing | `count` drops to 0 or `invisible` turns on | The indicator shrinks to its centre, faster than it appeared |
| Anchor hover / focus / pressed / disabled | The anchor changes state | The badge does not change; it never dims and never takes focus |

**Behavior rules**
- The badge never changes the size or position of its anchor and never pushes layout; it overlaps the corner
- The count pill grows with its digits up to `max` + `+`; it is never truncated
- A count change swaps the number at once — no counting animation
- Arabic: digits stay Western (D-10) and `99+` reads the same in both languages; the badge moves to the top-start corner (top-left)
- Clicks and taps on the badge go to the anchor
- Count changes are not announced on their own; when a new item matters right now, the page announces it (Snackbar)

### A6 Content

General writing rules: [content.md](../../../2-foundations/guidelines/content.md). Badge-specific rules:

| Element | Rule | Max length |
|---|---|---|
| `count` | Digits only, Western digits in both languages (D-10); never words or units | `max` + `+` (3 digits by default) |
| `label` (count) | Number + what it counts, plural agreed in both languages | 4 words |
| `label` (dot) | What is new, not what the dot looks like | 3 words |
| `label` (check) | The state that is true: verified, completed, selected | 2 words |

| ✓ EN | ✓ AR | ✗ Avoid |
|---|---|---|
| 3 unread messages | 3 رسائل غير مقروءة | 3 (the number alone has no meaning) |
| More than 99 notifications | أكثر من 99 إشعارًا | 99 plus |
| New activity | نشاط جديد | Red dot |
| Verified | تم التحقق | Check mark |
| Completed | مكتمل | Green tick |

### A7 Do and don't

| ✓ Do | ✗ Don't |
|---|---|
| Count only what the user can act on (unread, pending) | Count totals that are not new (all employees, all devices) |
| Cap long counts at `max` (`99+`) | Show four-digit counts in a badge |
| Give every badge a `label` that says what it means | Rely on the colour or the dot alone |
| Use the Check badge for a state that is already true (verified, done) | Use the Check badge as a checkbox the user clicks |
| Use `error` for attention and `success` for the check | Put a check in red or orange |
| Put one badge on one anchor, on its top-end corner | Stack two badges on the same anchor or place one in the middle of it |

### A8 Platform notes — Tablet

```
Navigation rail (dot and count on items)
┌───────────┐
│  [◆]●     │
│  Home     │
│  [✉](3)   │
│  Inbox    │
│  [◆]      │
│  Settings │
└───────────┘
```

| | Tablet |
|---|---|
| Available | ✓ |
| Typical anchors | Navigation rail items, app bar Icon buttons, avatars in lists |
| Size | One size; the count uses the Tablet `data-sm` text style |
| Interaction | None — touches go to the anchor; the anchor keeps its 48 target |
| Not supported | Badges on Buttons with text labels (put the count in the label instead) |

### A9 Accessibility (design)

- Every visible badge has a `label` in English and Arabic; screen readers hear it with the anchor (“Notifications, button, 3 unread messages”)
- The indicator itself is hidden from assistive technology, so the bare number or the dot is never read without meaning
- Meaning never relies on colour alone: the `label` says it, and `count` shows a number
- Text in the badge meets 4.5:1 against the indicator; the indicator meets 3:1 against the surface (why `warning` is `count` only)
- The badge is never focusable and never a click target; the anchor keeps its own target size and focus ring
- Count changes are not live-announced (no noise); important new items are announced by the page

### A10 Related components

- [Icon button](../icon-button/icon-button.md#a--guidelines) — the most common anchor for a count or dot badge
- [Icon](../icon/icon.md#a--guidelines) — draws the Check badge glyph; a bare icon can also be an anchor
- Avatar (Day 4) — anchors the Check badge with `overlap` `circular`
- Chip — for statuses and tags that need words
- Tabs and navigation (side navigation, navigation rail, navigation bar) — show count and dot badges on their items

---

## B · Spec

> The contract for Tablet. Facts identical on every platform link to the [Web spec](../../../3-web-components/components/badge/badge.md#b--spec).

### B1 API

#### `BwBadge`

| Param | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `child` | `Widget?` | | `null` | | The `anchor`. `null` → standalone inline badge (no `ring`) |
| `variant` | `BwBadgeVariant` | `count` · `dot` · `check` | `count` | | A4.1 |
| `count` | `int?` | ≥ 0 | `null` | ✓ for `count` | A2 `count`; ignored by `dot` and `check` |
| `max` | `int` | ≥ 1 | `99` | | A4.3 — above it the badge shows `{max}+` |
| `showZero` | `bool` | | `false` | | A4.4 |
| `color` | `BwBadgeColor?` | `error` · `brand` · `secondary` · `success` · `warning` · `info` · `neutral` | `null` → `error` (`success` for `check`) | | A4.2 |
| `overlap` | `BwBadgeOverlap` | `rectangular` · `circular` | `rectangular` | | A4.5 — only with `child` |
| `isVisible` | `bool` | | `true` | | A4.6 (web `invisible`, inverted) — hides with the exit transition (B4) |
| `semanticLabel` | `String?` | | `null` | ✓ when visible | A4.7 — the accessible meaning (B6) |

Platform naming: web `children` = `child`; web `invisible` = `!isVisible`; web `label` = `semanticLabel`. Named constructors are not used — one constructor, like the web props.

**Invalid combinations** (`assert` in debug, message in quotes):
- `variant == count` and `count == null` → “count badges need a count”
- `count < 0` → “count must be ≥ 0”; `max < 1` → “max must be ≥ 1”
- `variant == check` with `color` `error` or `warning` → “check badges use success, brand, secondary, info or neutral”
- `variant == dot` with `color == warning` → “warning is for count badges only”
- visible badge with `semanticLabel == null` → “badges need a semanticLabel”

### B2 Dimensions

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

### B3 Tokens by part and state

Identical to [Web B3](../../../3-web-components/components/badge/badge.md#b3-tokens-by-part-and-state); no component tokens (P-04). Flutter mapping (`context.bw.colors.*`):

| `color` | `indicator` background | `count` text | `check-icon` |
|---|---|---|---|
| `error` | `color-background-error-default` → `backgroundErrorDefault` | `color-text-on-error` → `textOnError` | — |
| `brand` | `color-background-brand-default` → `backgroundBrandDefault` | `color-text-on-brand` → `textOnBrand` | `color-icon-on-brand` → `iconOnBrand` |
| `secondary` | `color-background-secondary-default` → `backgroundSecondaryDefault` | `color-text-on-secondary` → `textOnSecondary` | `color-icon-on-secondary` → `iconOnSecondary` |
| `success` | `color-background-success-default` → `backgroundSuccessDefault` | `color-text-on-success` → `textOnSuccess` | `color-icon-on-success` → `iconOnSuccess` |
| `warning` | `color-background-warning-default` → `backgroundWarningDefault` | `color-text-on-warning` → `textOnWarning` | — |
| `info` | `color-background-info-default` → `backgroundInfoDefault` | `color-text-on-info` → `textOnInfo` | `color-icon-on-info` → `iconOnInfo` |
| `neutral` | `color-surface-inverse` → `surfaceInverse` | `color-text-neutral-inverse` → `textNeutralInverse` | `color-icon-neutral-inverse` → `iconNeutralInverse` |

| Part | Property | Token → Flutter |
|---|---|---|
| `ring` | colour | `color-border-inverse` → `context.bw.colors.borderInverse` |
| `ring` | width | `border-width-strong` → `BwBorder.widthStrong` |

Dark theme: same tokens. No exceptions.

### B4 States and transitions

Same table as [Web B4](../../../3-web-components/components/badge/badge.md#b4-states-and-transitions). Flutter: `AnimatedScale(alignment: Alignment.center)` on the indicator — to visible `duration: BwDuration.md, curve: BwEasing.standardDecelerate`; to hidden `duration: BwDuration.sm, curve: BwEasing.standardAccelerate`; first build has no animation. Count, `color` and `variant` changes rebuild at once.
Reduced motion: when `context.bw.reduceMotion` is true use `BwDuration.instant`.

### B5 RTL

As [Web B5](../../../3-web-components/components/badge/badge.md#b5-rtl): placement mirrors to the top-start corner through `PositionedDirectional(end: 0)` and the RTL-signed `FractionalTranslation`; `count` stays LTR (`99+`); `check-icon` is `BwIcon(icon: Symbols.check_rounded)` without `directional` — never mirrored.

```
LTR   ┌──────────┐(3)        RTL  (3)┌──────────┐
      │  [✉]     │                   │     [✉]  │
      └──────────┘                   └──────────┘
```

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Indicator | `ExcludeSemantics` always |
| Anchored with `semanticLabel` | `MergeSemantics(child: Semantics(value: semanticLabel, child: child))` — TalkBack / VoiceOver: “Notifications, 3 unread messages, button” |
| Hidden badge | No `value` while hidden |
| Standalone with `semanticLabel` | `Semantics(label: semanticLabel, image: true)` around the indicator (outside `ExcludeSemantics`) |
| Contrast | As Web B6 |
| Focus | Never focusable; no `Focus` / `InkWell` in the badge. The anchor's focus ring stays visible |
| Target size | Not a target: the indicator is wrapped in `IgnorePointer`; the anchor keeps ≥ `target-min` (48) |
| Live updates | No `liveRegion` |

| Key | Action |
|---|---|
| — | None. Interaction belongs to the anchor |

### B7 Examples

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

### B8 Figma

[Part D](#d--figma-build).

### B9 Tests

- [ ] Every `variant` × allowed `color` renders the B2 sizes (`tester.getSize` of the indicator) and B3 colours in light + dark × en + ar
- [ ] `count` above `max` shows `{max}+` in LTR order in both directions; `count: 0` hides unless `showZero`; `max` default 99
- [ ] Anchored: ring width `BwBorder.widthStrong`, colour `borderInverse`, outside; standalone: no ring
- [ ] Placement: indicator centre on the anchor's top-end corner in LTR and top-start in RTL (`tester.getCenter` vs `tester.getTopRight`/`getTopLeft` of the child), both `overlap` values; anchor size unchanged
- [ ] B4: `AnimatedScale` durations/curves per direction; first build not animated; `reduceMotion` → instant
- [ ] Semantics: indicator excluded; anchored `value` merged into the anchor node; standalone `image` node with the label; hidden badge adds nothing
- [ ] A tap on the indicator reaches the anchor's `onPressed`
- [ ] Every assert in B1 fires with its message
- [ ] Goldens: variants × colours (light/dark), anchored LTR/RTL, standalone, `99+`
- [ ] No `Icons.` and no raw sizes/colours in the source

---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `badge-contract.md`.

| Field | Value |
|---|---|
| Component | Badge |
| Platform | Tablet (Flutter + M3) |
| Plan version | 1 · 2026-10-21 |

### C1 Goal

`BwBadge` from `package:biowave_tablet/biowave_tablet.dart` marks any widget (or sits inline) with a count, dot or Check badge in the seven B3 colours, placed on the top-end corner in both directions, scaled in and out with the motion tokens, and merged into the anchor's semantics — tokens only.

### C2 Scope

**In scope:** B1–B9 — `BwBadge`, `BwBadgeVariant`, `BwBadgeColor`, `BwBadgeOverlap`; the three variants (incl. the Check badge, P-05), both `overlap` values, standalone mode, semantics, asserts.

**Out of scope** (do not build)
- Badges inside other widgets (navigation rail / bar, tabs, avatar) — those widgets place `BwBadge` in their own plans
- Live-region announcements of count changes
- Other sizes; custom content in the indicator
- Changes to `BwIcon`, `BwIconButton` or any other widget

### C3 Approach

- Base: Biowave widget composed like M3 `Badge` (same roles: label, small/large size, `isLabelVisible` → `isVisible`), but built with `Stack` + `PositionedDirectional` + `FractionalTranslation` because M3 `Badge` places its label by a fixed offset from the corner (not centred on it), cannot draw the outside `ring` and does not animate visibility. Record in C8 if M3 `Badge` is used internally for the indicator.
- Indicator: `AnimatedScale` → `DecoratedBox(ShapeDecoration / BoxDecoration with BorderRadius.circular(BwRadius.full), border outside when anchored)` → `ConstrainedBox(minWidth/minHeight)` → `Padding(EdgeInsetsDirectional)` → `Text` (count, `context.bw.text.dataSm` with tabular figures, LTR `Directionality`) or `BwIcon(icon: Symbols.check_rounded, size: BwIconSize.sm, color: …)`.
- One `switch` from `BwBadgeColor` to the three B3 colours (`context.bw.colors.*`); `color: null` resolves to `error`, or `success` for `check`.
- Indicator in `IgnorePointer` + `ExcludeSemantics`; semantics per B6.
- Visibility: `count` formatting and the hidden rule (`count == 0 && !showZero`, or `!isVisible`) in one pure function, unit-tested.
- Gotchas: `FractionalTranslation` does not move hit testing — fine, because the indicator ignores pointers; `Stack(clipBehavior: Clip.none)` is required or the half outside the anchor is clipped; keep the `Stack` sized by the child (`fit: StackFit.loose`, child non-positioned).

### C4 Token gaps

None. Every value in B2–B3 is an existing semantic token; no component tokens are needed (P-04, D-13).

### C5 Files to create / change

```
4-tablet-components/lib/src/components/badge/bw_badge.dart    new: BwBadge, BwBadgeVariant, BwBadgeColor, BwBadgeOverlap
4-tablet-components/lib/biowave_tablet.dart                    change: export bw_badge.dart
4-tablet-components/test/badge_test.dart                       new
4-tablet-components/test/goldens/badge/                        new
4-tablet-components/README.md                                  change: Badge row Code status
CHANGELOG.md                                     change
```

### C6 Tests

Implement every item in B9, plus:
- [ ] Unit test of the visibility / formatting function (0, `showZero`, `max`, `max + 1`, negative → assert)

### C7 Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 API per B1 (names, types, defaults, asserts)
- [ ] AC-2 Sizes and colours only from tokens (B2–B3); no raw values, no `BwPalette`
- [ ] AC-3 B4 transitions (enter/exit timings differ, no first-build animation); reduced motion respected
- [ ] AC-4 RTL per B5; semantics, pointer and focus per B6
- [ ] AC-5 Tests in B9 and C6 exist and pass; `cd 4-tablet-components && flutter analyze && flutter test` pass
- [ ] AC-6 Exported; section README status updated; no `Icons.` in `lib/`
- [ ] AC-7 The anchor is untouched: same size, same hit area, same focus ring

---

### C8 Execution log (filled by the Executor)

| Field | Value |
|---|---|
| Agent | |
| Date | |
| Files changed | |

**Deviations:** none
**Questions for the Planner:** none

---

## D · Figma build

> **One file per platform (D-12).** Structure, layer tree and properties are the same as [Web D2–D4](../../../3-web-components/components/badge/badge.md#d--figma-build); this file lists only what differs. Values come from the Tablet spec [Part B](#b--spec).

| Field | Value |
|---|---|
| Component | Badge |
| Platform | Tablet |
| Figma file | **Biowave DS — Tablet Components** (`_sync/figma-files.json` › `tablet`) |
| Page / section | `↳ Badge` › sections `Badge` and `Badge — Documentation` |
| Mode | **Create new.** The Check badge (P-05) is `Variant=Check` of this set |
| Plan version | 1 · 2026-10-21 |

### D1 Rules for this build

Same as [Web D1](../../../3-web-components/components/badge/badge.md#d1-rules-for-this-build) (library first, no component tokens, everything bound, no local variables or styles), plus:
- **Typography mode:** on page `↳ Badge` set the explicit variable mode **`Tablet`** for `5. Typography (EN)` and `6. Typography (AR)`. Text styles stay `Web/{en|ar}/data/sm`; the mode gives the Tablet scale.
- `check-icon` is an instance of the **Icon** set in this file (`Size=SM`, `Glyph` = `check`).

### D2 Component structure

As [Web D2–D4](../../../3-web-components/components/badge/badge.md#d2-component-structure). No Tablet differences in structure.

### D3 Layer tree and auto layout

As [Web D3](../../../3-web-components/components/badge/badge.md#d3-layer-tree-and-auto-layout).

### D4 Properties

As [Web D4](../../../3-web-components/components/badge/badge.md#d4-properties); code mapping uses the Flutter names in B1 (`Ring=Off` → `child: null`).

**Icons used:** `check` · `mail`

### D5 Variants to generate

Same as Web D5: **50 variants** (`Count` 28 · `Dot` 12 · `Check` 10).

### D6 States, interactions and motion

As Web D6 — no interactive states; doc page 04 shows the B4 scale in/out.

### D7 RTL

As Web D7 (`Language=AR` for `Count`; placement mirror shown on doc page 08).

### D8 Documentation pages

All 12 standard pages in section `Badge — Documentation` on `↳ Badge` in this file, built only from the Doc Kit, page notes as Web D8. 07 Platform: `Doc/Device frame` = Tablet, with the A8 example (navigation rail). 09 Accessibility: target-size overlay (`target-min` = 48) on the anchor, showing the badge does not change it.

Component description: "Marks an element with a count, a dot or a check (Check badge). Never interactive. Spec: 4-tablet-components/components/badge/badge.md".

### D9 Code Connect

`4-tablet-components/lib/src/components/badge/bw_badge.figma.dart` — `Variant` → `variant: BwBadgeVariant.*`, `Color` → `color: BwBadgeColor.*`, `Count` → `count`, `Ring=Off` → `child: null`. Publish after code and Figma reviews are both `Approved`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Set `Badge` on `↳ Badge` in the Tablet file; structure and layer names as Web D2–D3
- [ ] F-AC-2 Properties as Web D4; 50 variants per D5
- [ ] F-AC-3 Zero raw values; zero local variables/styles (all from the Foundations library); `check-icon` is an Icon instance
- [ ] F-AC-4 Page Typography mode = `Tablet`; Light/Dark by mode only; AR count variants per D7
- [ ] F-AC-5 Values match the Tablet B2–B3 (redline every `Variant` with `Ring=On`)
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

> Changes to this component on this platform. Every entry also gets one line in the root `CHANGELOG.md`.

### F0 Changes from previous version

None — version 1.0. Filled when the version is above 1.0; it feeds Figma doc page 10.

### F1 Guidelines changelog

| Version | Date | Change | Migration | Author |
|---|---|---|---|---|
| 1.0 | 2026-10-21 | Initial. Count, dot and Check badge (P-05: the Figma Check badge folds into Badge as `variant` `check`) | — | Claude (Planner) |

### F2 Spec changelog

| Version | Date | Change | Breaking | Migration |
|---|---|---|---|---|
| 1.0 | 2026-10-21 | Initial | No | — |

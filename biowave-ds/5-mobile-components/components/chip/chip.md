# Chip · شريحة — Mobile

> **One file for Chip on Mobile:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- mobile chip`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Chip · شريحة |
| Summary | Holds one short piece of information — an action, a filter, an entered value, a tag or a request status — in a compact shape. |
| Summary (ar) | تعرض معلومة قصيرة واحدة — إجراءً أو عامل تصفية أو قيمة مُدخلة أو وسمًا أو حالة طلب — في شكل مضغوط. |
| Parts | Container · leading icon · check icon · leading avatar · label · remove button · status icon |
| Parts (ar) | الحاوية · أيقونة البداية · أيقونة التحديد · الصورة الرمزية · التسمية · زر الإزالة · أيقونة الحالة |
| Platform | Mobile · Flutter + Material 3 |
| Built on | Custom widget (`assist`, `filter`: `FocusableActionDetector` + `GestureDetector` with a token state layer, no ink; `input`, `tag`, `status`: `DecoratedBox`). M3 `ActionChip` / `FilterChip` / `InputChip` (roadmap base; Flutter's assist chip is `ActionChip`) are not used: their delete icon is not a separate focusable control and their ink, padding and density do not resolve to Biowave tokens (C3). Glyphs via `BwIcon`, remove via `BwIconButton`, avatar via `BwAvatar` |
| Import | `BwChip` from `package:biowave_mobile/biowave_mobile.dart` |
| Figma | **Biowave DS — Mobile Components** › `↳ Chip` (page Typography mode `Mobile`) · build: [Part D](#d--figma-build) |
| Version | 1.0 · 2026-10-23 |
| Plan | Finished |
| Code | Planned |
| Figma build | Planned |
| Review | — |
| Source code | `lib/src/components/chip/` — not built yet (the Executor creates it) |
| Tokens | — (no component tokens: every value is an existing semantic token, P-04) |
| Contracts | [`chip-contract.md`](chip-contract.md) · [`figma-chip-contract.md`](figma-chip-contract.md) — generated, never edited |
| Docs page | [`chip.html`](chip.html) |

## Contents

[A · Guidelines](#a--guidelines) · [B · Spec](#b--spec) · [C · Code plan](#c--code-plan) · [D · Figma build](#d--figma-build) · [E · Review](#e--review) · [F · Changelog](#f--changelog)

---

## A · Guidelines

> What it is and when to use it — designers and PMs. Identical on Web, Tablet and Mobile except **A8** (checked by `npm run docs:check`).

### A1 Overview

A chip is a compact element that holds one short piece of information. Interactive chips let people start a related action (`assist`), narrow a list (`filter`) or see and remove a value they entered (`input`). Static chips label something (`tag`, the Tag / Label of the legacy Figma pages) or show where a request stands (`status`, request status). Tag, Label and Status are variants of Chip, not separate components (decision P-05), so every chip shares one shape, one size scale and one set of rules.

### A2 Anatomy

```
Interactive (assist · filter · input)               radius-md, outlined
①┌──────────────────────────┐   ①┌──────────────────────────┐
 │ ②[◆]  ⑤Add note          │    │ ③[✓]  ⑤Remote            │   filter, selected
 └──────────────────────────┘    └──────────────────────────┘
①┌──────────────────────────────┐
 │ ④(SA) ⑤Sara Ali      ⑥[×]    │                               input
 └──────────────────────────────┘

Static (tag · status)                                radius-full, filled
①╭────────────────────╮   ①╭──────────────────────╮
 │ ②[◆] ⑤Full time    │    │ ⑦[◆] ⑤{state name}   │            status
 ╰────────────────────╯    ╰──────────────────────╯
```

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `container` | Yes | The chip surface and, for `assist` and `filter`, the whole interaction target |
| 2 | `leading-icon` | No | Material Symbols glyph that helps recognise the label; decorative |
| 3 | `check-icon` | Auto | Shown at the start of a selected `filter` chip; replaces the leading icon while selected |
| 4 | `leading-avatar` | No | Avatar of the person or thing an `input` chip stands for; decorative because the label names it |
| 5 | `label` | Yes | The short text of the chip; one line |
| 6 | `remove-button` | Auto | Icon button at the end of an `input` chip that removes the value; its own keyboard stop |
| 7 | `status-icon` | Auto | Fixed glyph of a `status` chip, chosen by the state; never set by hand |

### A3 Usage

**When to use**
- `assist` — a smart or related action next to content, such as “Add note” under a request
- `filter` — narrowing a list or table by one or more independent criteria
- `input` — values a person entered or picked: people, keywords, file types, before they submit
- `tag` — a read-only attribute of a record: contract type, department, skill
- `status` — the current state of a request, always with its status icon and name

**When not to use** (and what to use instead)

| Situation | Use instead |
|---|---|
| The main action of a page or dialog | Button |
| Choosing exactly one option from a short set | Segmented button or Radio |
| Turning one setting on or off | Switch or Checkbox |
| A count or a dot on another element | Badge |
| Showing a person without a value to remove | Avatar |
| A long list of options to choose from | Select or Autocomplete |

### A4 Options

#### 4.1 `variant`

| Value | Looks like | Pick it when |
|---|---|---|
| `assist` | `┌ [◆] Add note ┐` outlined | People start an action that relates to the content around it. Without an icon it also covers the Material suggestion chip |
| `filter` | `┌ Remote ┐` → `┌ [✓] Remote ┐` tinted when selected | People switch a filter on or off; several filters in a row can be on at once |
| `input` | `┌ (SA) Sara Ali [×] ┐` outlined | The chip stands for a value the person entered and can remove |
| `tag` | `╭ Full time ╮` filled, no border | A read-only attribute; not interactive |
| `status` | `╭ [◆] {state} ╮` filled, no border | The state of a request; the state picks the colour and the icon |

Interactive chips have rounded corners and an outline; static chips are fully rounded and filled, so a static chip never looks clickable.

#### 4.2 `size`

| Value | Pick it when |
|---|---|
| `sm` | Default on web: filter bars, table cells, forms |
| `md` | Default on tablet and mobile; prominent filter rows on web |

Chips in the same row use the same size.

#### 4.3 `color` (`tag` only)

| Value | Pick it when |
|---|---|
| `neutral` | Default — most attributes |
| `brand` · `secondary` | To set one group of attributes apart from another |
| `success` · `warning` · `error` · `info` | The attribute is a status word that is not a request status (for example “Overdue”); the label must say it — colour is never the only signal |

#### 4.4 Request status (`status` only)

A `status` chip shows one of the **7 request states**, each with its own status icon and colour. The state names and icons come from the request flow of the legacy Figma pages; they are not written in the design system yet, so this table is filled in plan 1.1 once confirmed (see C2).

| State | Status icon | Colour |
|---|---|---|
| 7 request states — names, icons and colours to be confirmed | — | — |

#### 4.5 Leading content: `icon` and `avatar`

- `icon` — a leading Material Symbols glyph for `assist`, `filter`, `input` and `tag`. Add it only when it helps people scan; never as decoration on every chip in a row.
- `avatar` — a leading avatar for `input` chips that stand for a person or a team. It shows the photo, else the initials, else a person glyph (Avatar rules).
- A `filter` chip shows the check icon while selected, in place of its leading icon.

#### 4.6 `selected` (`filter` only)

| Value | Looks like | Meaning |
|---|---|---|
| off | Outlined, no check | The filter is not applied |
| on | Tinted, check icon, coloured label | The filter is applied |

#### 4.7 Remove (`input` only)

Every `input` chip has a remove button at its end. It removes this one value and has its own name (“Remove Sara Ali”). An `input` chip that cannot be removed is a `tag`.

#### 4.8 `disabled` (interactive only)

`assist`, `filter` and `input` can be disabled when the action or value cannot change right now. Static chips are never disabled.

**Combination rules**
- `icon` is not used on `status` chips — the state sets the icon
- `avatar` is for `input` chips only; one leading item per chip — `avatar` or `icon`, never both
- `color` is for `tag` chips only; `status` chips get their colour from the state
- `selected` is for `filter` chips only
- A remove button is for `input` chips only
- `disabled` is for interactive chips only
- A filter row allows several selected chips; when exactly one option must be chosen use Segmented button or Radio

### A5 States and behavior

| State | When it happens | What the user sees |
|---|---|---|
| Default | Ready | Outlined chip (interactive) or filled chip (static) |
| Hover | Pointer over an `assist` or `filter` chip, or over the remove button (pointer devices only) | A light state layer over the chip or the remove button |
| Pressed | Pointer or touch down | A stronger state layer |
| Focus | Keyboard focus on an `assist` or `filter` chip or on a remove button | Focus ring (see [a11y](../../../2-foundations/guidelines/a11y.md)) around the focused element |
| Selected | A `filter` chip is on | Tinted surface, coloured outline and label, check icon at the start |
| Disabled | An interactive chip cannot be used now | Muted outline, label and icons; removed from the tab order; a disabled `input` chip's remove button is disabled too |

Static chips (`tag`, `status`) have only the Default state.

**Behavior rules**
- One line only: a long label is truncated with an ellipsis when the chip is wider than its container; the full label is always the accessible name
- Long Arabic labels (+20–30% width) widen the chip; never give chips a fixed width sized for English
- Chips in a row wrap onto the next line with the same gap between rows and columns
- Activating an `assist` chip runs its action once; it does not stay selected
- Activating a `filter` chip toggles it; the list updates without moving the chip
- Activating the remove button removes only that value; it never triggers the chip's other action. The owner of the chip list then moves focus to the next chip's remove button, else the previous one, else the related input, so keyboard focus is never lost
- A selected filter keeps its place in the row; chips are not reordered on selection

### A6 Content

General rules: [content.md](../../../2-foundations/guidelines/content.md). Chip-specific rules:

| Element | Rule | Max length |
|---|---|---|
| `label` · `assist` | Verb-first, says the outcome | 3 words |
| `label` · `filter` | Noun or adjective naming the criterion; no verb, no “Filter by” | 3 words |
| `label` · `input` | The value as entered or the person's display name | 24 characters |
| `label` · `tag` | Noun phrase for the attribute | 2 words |
| `label` · `status` | The fixed state name from 4.4 — never a custom word | — |
| `remove-button` name | “Remove {label}” / “إزالة {label}” | — |

| ✓ EN | ✓ AR | ✗ Avoid |
|---|---|---|
| Add note | إضافة ملاحظة | Click here (hides the outcome) |
| Remote · Night shift · This week | عن بُعد · وردية ليلية · هذا الأسبوع | Filter by remote employees in Riyadh |
| Sara Ali | سارة علي | sara.ali@company.com (use the display name) |
| Full time · Contractor | دوام كامل · متعاقد | FT (unexplained abbreviation) |

### A7 Do and don't

| ✓ Do | ✗ Don't |
|---|---|
| Use filter chips for independent on/off filters | Use filter chips for one required choice — use Segmented button or Radio |
| Keep every label short and on one line | Put sentences or two-line text in a chip |
| Use `tag` and `status` for read-only information | Make a static chip look or behave like a button |
| Pair every status colour with its icon and name | Show status by colour alone |
| Give every removable value its own named remove button | Remove a value when the whole chip is clicked |
| Keep chips in a row the same size | Mix `sm` and `md` chips in one row |

### A8 Platform notes — Mobile

```
Phone — filter row under the app bar (one line, scrolls sideways)
┌─────────────────────────────┐
│ [✓ Remote] [Night shift] [Th│ ◂ scrolls
├─────────────────────────────┤
│ list …                      │
└─────────────────────────────┘
  a filter row may stay on one line and scroll inline; other chip rows wrap
```

| | Mobile |
|---|---|
| Available | ✓ |
| Default size | `md` |
| Sizes | `sm` (dense rows; touch area padded to 48) · `md` (default) |
| Layout | Hugs its content; a filter row under the app bar scrolls inline on one line with the page margin as start and end padding; other rows wrap |
| Interaction | Touch; Tab order with a keyboard attached |
| Touch target | Every chip and remove button ≥ `target-min` (48), extended invisibly |
| Not supported | Hover visuals, drag to reorder, chip menus, long-press actions |

### A9 Accessibility (design)

- Every interactive chip and every remove button can be reached and used with the keyboard and with a screen reader; static chips are read as text and are not focus stops
- A `filter` chip says whether it is on or off; selection is shown by the check icon and the tinted surface, never colour alone
- A `status` chip always shows its icon and its state name; colour supports the name and never replaces it
- The remove button has a name that includes the chip label (“Remove Sara Ali”), so it makes sense out of context
- After a value is removed, focus moves to a neighbouring chip or the related input — the owner of the list does this
- A row of filter chips is announced as one group with a name (“Filters”)
- Leading icons and avatars are decorative: the label already names the chip
- Labels stay readable at 200% zoom; truncated labels keep the full text as their accessible name
- Every target meets `target-min`; focus uses the standard ring (2px `color-border-focus`, 2px offset)

### A10 Related components

- Button — the main actions of a page; a chip only supports content
- Segmented button — one choice from a short connected set (Day 8)
- Badge — a count or a dot on another element, not a label of its own
- Avatar — the person on their own; `input` chips show an Avatar at their start
- Autocomplete — picks several values and shows them as `input` chips (Day 13)
- Text field — the field that `input` chips usually belong to

---

## B · Spec

> The contract for Mobile — API, dimensions, tokens, states, RTL and accessibility. Code and Figma are reviewed against this part. Facts that are identical on every platform link to the [Web spec](../../../3-web-components/components/chip/chip.md#b--spec) instead of being copied.

### B1 API

#### `BwChip`

One named constructor per `variant` (A4.1), so invalid combinations cannot compile.

| Constructor · param | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `BwChip.assist` · `label`, `onPressed` | `String` · `VoidCallback?` | | | ✓ | `onPressed: null` = disabled |
| `BwChip.filter` · `label`, `selected`, `onSelected` | `String` · `bool` · `ValueChanged<bool>?` | | `selected: false` | ✓ `label`, `onSelected` | Controlled; `onSelected(!selected)` on tap, Enter, Space; `null` = disabled |
| `BwChip.input` · `label`, `onRemoved` | `String` · `VoidCallback?` | | | ✓ | Remove button calls `onRemoved`; `null` = disabled chip and remove button |
| `BwChip.input` · `avatar` | `BwChipAvatar?` | `BwChipAvatar({String? name, ImageProvider? image, String? initials, IconData? icon, BwAvatarColor color})` | `null` | | A4.5 `leading-avatar`; rendered as a decorative `BwAvatar` (B2) |
| `BwChip.input` · `removeLabel` | `String?` | | localized “Remove {label}” / “إزالة {label}” | | Semantics label of the remove button |
| `BwChip.tag` · `label`, `color` | `String` · `BwChipColor` | `neutral` · `brand` · `secondary` · `success` · `warning` · `error` · `info` | `neutral` | ✓ `label` | A4.3 |
| `BwChip.status` | — | the 7 request states of A4.4 | — | | Not built in 1.0 (C2); added in plan 1.1 |
| all except `status` · `icon` | `IconData?` | `Symbols.*_rounded` (D-18) | `null` | | A4.5 `leading-icon`; on `input` ignored when `avatar` is set |
| all · `size` | `BwControlSize` | `sm` · `md` (`lg`, `xl` assert → `md`) | `md` | | A4.2 · A8 |
| all · `key` | `Key?` | | | | |

Platform naming notes: Flutter `onPressed` = web `onClick`; `onSelected` = web `onSelectedChange`; `onRemoved` = web `onRemove`; a `null` callback = web `disabled`; `avatar` takes `image` (`ImageProvider`) where web takes `src`.

**Invalid combinations** (`assert` in debug, message in quotes; release builds render the fallback):
- `size` `lg` or `xl` → “chips are sm or md” (renders `md`)
- `BwChip.input` with both `avatar` and `icon` → “one leading item per chip” (`icon` ignored)
- Blank `label` → “chips need a label”

### B2 Dimensions

Same redline, parts and layout rules as [Web B2](../../../3-web-components/components/chip/chip.md#b2-dimensions), with the same tokens for `sm` and `md`:

| Part | Property | `sm` | `md` |
|---|---|---|---|
| `container` | height | `size-control-height-sm` | `size-control-height-md` |
| `container` | padding-inline | `spacing-control-padding-inline-sm` | `spacing-control-padding-inline-md` |
| `container` | padding-inline-start with avatar · padding-inline-end with remove | `spacing-xs` | `spacing-xs` |
| `container` | gap | `spacing-control-gap-sm` | `spacing-control-gap-md` |
| `container` | radius · interactive / static | `radius-md` / `radius-full` | same |
| `container` | border · interactive | `border-width-default` | same |
| icons | size | `size-icon-sm` | `size-icon-md` |
| `leading-avatar` | box | `size-icon-lg` (`BwAvatar` `xs`, see C2) | `size-control-height-sm` (`BwAvatar` `sm`) |
| `remove-button` | box · glyph | `size-icon-lg` · `size-icon-sm` | `size-control-height-sm` · `size-icon-md` |
| `label` | text style | `label-md` | `label-lg` |
| chip row (consumer) | spacing and run spacing (`Wrap`) | `spacing-sm` | `spacing-sm` |

- **Touch targets:** every `assist` / `filter` chip and every remove button has a hit area ≥ `target-min` (`BwLayout.mobile.minTarget`, 48), extended invisibly without changing layout (the chip's visual height stays the B2 height)
- **Text scale:** the label scales with the system text scale; the chip grows in height (min height = B2 height, never a fixed max) and never clips

Flutter access: `size-control-height-md` → `BwSize.controlHeightMd` · `spacing-control-padding-inline-md` → `BwSpacing.controlPaddingInlineMd` · `spacing-xs` → `BwSpacing.xs` · `radius-md` → `BwRadius.md` · `radius-full` → `BwRadius.full` · `size-icon-md` → `BwSize.iconMd` · `label-lg` → `context.bw.text.labelLg` · colours → `context.bw.colors.<camelCase>` · `target-min` → `BwLayout.mobile.minTarget`.

### B3 Tokens by part and state

Identical to [Web B3](../../../3-web-components/components/chip/chip.md#b3-tokens-by-part-and-state) (interactive states, selected filter, remove button, tag colours, focus ring). No component tokens (P-04). The **Hover** row applies only when a pointer is attached (`WidgetState.hovered`); Figma has no Hover variant on Mobile. Flutter mapping:

| Spec part / state | Flutter |
|---|---|
| `container` background, border, state layer | `DecoratedBox` (`ShapeDecoration` with `RoundedRectangleBorder` / `StadiumBorder`, `BorderSide` from B3) + a second `ColoredBox` state layer resolved from `WidgetState` (`hovered`, `pressed`) |
| `label` | `Text` with `context.bw.text.label{Size}` and the B3 colour |
| icons | `BwIcon` with the B3 colour |
| `remove-button` | `BwIconButton` (`text`, `neutral`) |
| focus ring | `BwFocusRing` (`lib/src/common/bw_focus_ring.dart`) |
| splash, elevation | none |

### B4 States and transitions

Same as [Web B4](../../../3-web-components/components/chip/chip.md#b4-states-and-transitions) without pointer hover on touch. Durations `BwDuration.sm`, easing `BwEasing.standard`; reduced motion (`MediaQuery.disableAnimationsOf`) makes them instant.

### B5 RTL

Same as [Web B5](../../../3-web-components/components/chip/chip.md#b5-rtl). Flutter: `Directionality` from the app; `EdgeInsetsDirectional` for padding; `Row` order follows the text direction; glyphs never mirrored (no `matchTextDirection`).

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| `assist` | `Semantics(button: true, enabled: onPressed != null, label: label)`; visible text `ExcludeSemantics` |
| `filter` | `Semantics(button: true, toggled: selected, enabled: onSelected != null, label: label)` |
| `input` | Label read as text; the remove button is a **separate** node: `BwIconButton` with `semanticLabel` = `removeLabel` |
| `tag` · `status` | Plain text semantics; not focusable |
| Decorative parts | Leading icon, check icon, status icon `excludeFromSemantics`; avatar `decorative: true` |
| Filter group | The consumer wraps a filter row in `Semantics(container: true, label: 'Filters' / 'عوامل التصفية')` (B7) |
| Focus | `BwFocusRing` (keyboard highlight mode only), 2px `color-border-focus`, `border-focus-offset` |
| Target size | B2 touch targets |
| Screen reader output | As [Web B6](../../../3-web-components/components/chip/chip.md#b6-accessibility-implementation) (TalkBack / VoiceOver wording: “Remote, toggle button, on”) |

| Key (hardware keyboard) | Action |
|---|---|
| Tab / Shift+Tab | Next / previous interactive chip or remove button |
| Enter / Space | `assist`: runs · `filter`: toggles · remove button: removes |
| Backspace / Delete | Focused remove button: removes |

### B7 Examples

```dart
BwChip.assist(label: 'Add note', icon: Symbols.add_rounded, onPressed: addNote);

Semantics(container: true, label: 'Filters',
  child: Wrap(spacing: BwSpacing.sm, runSpacing: BwSpacing.sm, children: [
    BwChip.filter(label: 'Remote', selected: remote, onSelected: setRemote),
    BwChip.filter(label: 'Night shift', selected: night, onSelected: setNight),
  ]));

BwChip.input(label: 'Sara Ali', avatar: BwChipAvatar(name: 'Sara Ali', image: saraPhoto),
  onRemoved: () => removePerson(sara.id));

BwChip.tag(label: 'Contractor', color: BwChipColor.info);

BwChip.input(label: 'سارة علي', avatar: const BwChipAvatar(name: 'سارة علي'), onRemoved: remove);
```

### B8 Figma

Structure, properties, the Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

- [ ] Every variant (`assist`, `filter` unselected / selected, `input`, `tag` × 7 colours) at `sm` and `md`, light + dark × en + ar (`pumpBw`)
- [ ] Goldens for Default, Pressed, Focus, Selected, Disabled and each tag colour
- [ ] Exact height, padding, gap and radius per size (`tester.getSize`, `getRect`); avatar and remove boxes inset `BwSpacing.xs`
- [ ] Resolved colours per state equal the B3 tokens
- [ ] `filter`: tap, Enter and Space call `onSelected(!selected)`; semantics `toggled` follows `selected`; check icon replaces the leading icon
- [ ] `assist`: tap, Enter and Space call `onPressed` once
- [ ] `input`: remove button is its own semantics node named `removeLabel` (EN and AR defaults); tap, Enter, Space, Backspace and Delete call `onRemoved`
- [ ] `null` callbacks: chip and remove button not focusable, no callbacks fired
- [ ] Static chips not focusable
- [ ] Hit areas ≥ `BwLayout.mobile.minTarget` (`meetsGuideline(androidTapTargetGuideline)`, `iOSTapTargetGuideline`); `textContrastGuideline`; `labeledTapTargetGuideline`
- [ ] Text scale 2.0: no overflow, chip grows; long labels ellipsize in a narrow parent
- [ ] RTL: layout mirrored, glyphs not mirrored
- [ ] Every invalid combination asserts and uses the B1 fallback
- [ ] No raw colours, sizes or durations in the source (no `Color(0x`, no numeric `EdgeInsets` / `SizedBox` literals, no `BwPalette`)

---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `chip-contract.md`.

| Field | Value |
|---|---|
| Component | Chip |
| Platform | Mobile (Flutter + M3) |
| Plan version | 1.0 · 2026-10-23 |

### C1 Goal

`BwChip` from `package:biowave_mobile/biowave_mobile.dart` implements the `assist`, `filter`, `input` and `tag` constructors of B1 from tokens only, in light/dark and en/ar, with separate remove semantics and 48 touch targets, and passes B9.

### C2 Scope

**Depends on (must be `Built` first):** `BwIcon`, `BwIconButton` (with `BwFocusRing`, `BwControlSize`, `pumpBw`) and `BwAvatar` in this package (`BwAvatar` plan Finished, not on `main` yet). If one is missing, report “blocked — Icon button / Avatar” in C8 and stop. The `sm` leading avatar needs `BwAvatar` size `xs` (box `size-icon-lg`), which Avatar 1.0 does not have: build everything else and report “blocked — Avatar xs” for that one case.

**In scope:** B1–B9 for `assist`, `filter`, `input`, `tag`.

**Out of scope:** `BwChip.status` (7 request states not defined yet — plan 1.1); a chip-group widget; single-select behaviour; chip menus; drag to reorder; removal animation; focus management after removal (the owner of the list does it).

### C3 Approach

- `BwChip` is a `StatefulWidget` (hover / pressed / focus states) with private constructors behind the named ones; `bw_chip_style.dart` is a pure function (variant, size, color, selected, `Set<WidgetState>`, context) → colours and sizes from `context.bw.colors`, `context.bw.text`, `BwSize`, `BwSpacing`, `BwRadius`, `BwBorder` only
- Interactive chips: `FocusableActionDetector` (`ActivateIntent` for Enter / Space, `onShowHoverHighlight`, `onShowFocusHighlight`) + `GestureDetector` for taps; the hit area is padded to `BwLayout.mobile.minTarget` with a transparent region, the visual container stays the B2 height
- M3 `ActionChip` / `FilterChip` / `InputChip` are not used: their delete icon is not separately focusable, they paint ink splashes, and their `padding` / `labelPadding` / `visualDensity` add values outside the tokens
- Remove button: `BwIconButton(variant: text, color: neutral)` sized to the B2 remove box, `Symbols.close_rounded`, `semanticLabel: removeLabel`; Backspace / Delete via `Shortcuts` on its focus node
- Avatar: `BwAvatar(size: sm, decorative: true, …)` from `BwChipAvatar` at `md`; `xs` at `sm` once it exists (C2)
- Check icon: `Symbols.check_rounded`, cross-fade with the leading icon (`AnimatedSwitcher`, B4)
- Focus ring: shared `BwFocusRing` with the container radius
- Icons (D-18): `material_symbols_icons` `Symbols.*_rounded` through `BwIcon`; never `Icons.*`

**Icons used:** `check` · `close`

### C4 Token gaps

None. No `chip.tokens.json` (P-04). Avatar `xs` is an Avatar plan change (C2).

### C5 Files to create / change

```
5-mobile-components/lib/src/components/chip/bw_chip.dart          new: BwChip, BwChipAvatar, BwChipColor
5-mobile-components/lib/src/components/chip/bw_chip_style.dart    new (private)
5-mobile-components/lib/biowave_mobile.dart                       change: export bw_chip.dart
5-mobile-components/test/chip_test.dart                           new
5-mobile-components/test/goldens/chip/                            new (generated goldens)
5-mobile-components/components/chip/chip.md                       change: header Code status + C8 only
5-mobile-components/README.md                                     change: status table row
CHANGELOG.md                                            change
```

### C6 Tests

Implement every item in B9, plus:
- [ ] `bw_chip_style` unit test: resolved colours per `WidgetState` set equal the B3 tokens for every variant and colour
- [ ] Owned focus nodes disposed

### C7 Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 (constructors, names, types, defaults, asserts, fallbacks)
- [ ] AC-2 Every value in B2–B3 from the listed token; no raw values, no `BwPalette`
- [ ] AC-3 B4 transitions; reduced motion respected
- [ ] AC-4 RTL as B5; semantics, keyboard, focus and targets as B6
- [ ] AC-5 `cd 5-mobile-components && flutter analyze && flutter test` pass; `npm run sync` and `npm run docs:check` pass
- [ ] AC-6 Exported from `lib/biowave_mobile.dart`; `5-mobile-components/README.md` row = header, `Built`
- [ ] AC-7 Reuses `BwIcon`, `BwIconButton`, `BwAvatar`, `BwFocusRing`, `BwControlSize`; no M3 chip widgets, no ink
- [ ] AC-8 Static chips are not focusable

---

### C8 Execution log (filled by the Executor)

| Field | Value |
|---|---|
| Agent | |
| Date | |
| Files changed | |

**Deviations from the plan or spec**
- none

**Questions for the Planner**
- none

---

## D · Figma build

> How to build Part B in Figma. The Figma Agent receives this through the generated `figma-chip-contract.md`.
> **One file per platform (D-12).** This file builds the Mobile sets in **Biowave DS — Mobile Components**. Structure, layer tree and properties are the same as [Web D2–D4](../../../3-web-components/components/chip/chip.md#d--figma-build) (one fact, one home); this file lists only what differs. Values come from the Mobile [Part B](#b--spec).

| Field | Value |
|---|---|
| Component | Chip |
| Platform | Mobile |
| Figma file | **Biowave DS — Mobile Components** (`_sync/figma-files.json` › `mobile`) — never the Foundations file |
| Page / section | `↳ Chip` › sections `Chip` and `Chip — Documentation` |
| Mode | Create new. Legacy Chips / Labels pages stay read-only in Foundations until approval |
| Plan version | 1.0 · 2026-10-23 |

### D1 Rules for this build

Same as [Web D1](../../../3-web-components/components/chip/chip.md#d1-rules-for-this-build) (no component tokens, everything bound, library instances), plus:
- **Typography mode:** on page `↳ Chip` set the explicit variable mode **`Mobile`** for `5. Typography (EN)` and `6. Typography (AR)`.
- Nested instances: Mobile `Icon button` (remove) and `Avatar` from this file once they are built; until then report Phase 1 as “blocked — Icon button / Avatar” for those slots and build the rest.

### D2 Component structure

As [Web D2](../../../3-web-components/components/chip/chip.md#d2-component-structure): `Chip` and `Tag chip` sets plus `.Chip/Leading`; `Status chip` waits for plan 1.1. Mobile differences:
- `Size` = `SM` · `MD` (default `MD`)
- `State` = `Default` · `Pressed` · `Focus` · `Disabled` (no `Hover`)

### D3 Layer tree and auto layout

As [Web D3](../../../3-web-components/components/chip/chip.md#d3-layer-tree-and-auto-layout); the 48 hit area of chips and remove buttons is shown only on doc page 09.

**Icons used:** `check` (check-icon) · `close` (remove-button) · `add` (default `Icon` swap)

### D4 Properties

As [Web D4](../../../3-web-components/components/chip/chip.md#d4-properties) without the `Hover` state value. Code mapping uses the Flutter names from B1 (`BwChip.assist` …, `onSelected`, `onRemoved`, `null` callback = Disabled).

### D5 Variants to generate

- `Chip`: Assist = 2 sizes × 4 states × 2 languages = 16 · Filter = 2 × 4 × 2 selected × 2 = 32 · Input = 2 × 3 × 2 = 12 → **60 variants**
- `Tag chip`: 7 colours × 2 sizes × 2 languages = **28 variants**

### D6 States, interactions and motion

As Web D6 without hover. Press and filter selection: smart animate per B4.

### D7 RTL

As [Web D7](../../../3-web-components/components/chip/chip.md#d7-rtl) (`Language=AR` variants).

### D8 Documentation pages

All 12 standard pages in section `Chip — Documentation`, built only from the Doc Kit (Annotation library, D-17), page notes as Web D8. 07 Platform: `Doc/Device frame` = Phone (SafeArea), with the A8 example. 09 Accessibility: 48 target overlays on chips and remove buttons.

Component description: “Holds one short action, filter, entered value, tag or request status. Spec: 5-mobile-components/components/chip/chip.md”.

### D9 Code Connect

`5-mobile-components/lib/src/components/chip/bw_chip.figma.dart` — mapping per D4 with the Flutter names. Publish after code and Figma reviews are both `Approved`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Sets and `.Chip/Leading` on `↳ Chip` in the Mobile file; structure and layer names as Web D2–D3 + D2 differences
- [ ] F-AC-2 Properties as Web D4 minus `Hover`; variant counts 60 and 28
- [ ] F-AC-3 Zero raw values; no local variables (no component tokens); token lint 0
- [ ] F-AC-4 Page Typography mode = `Mobile`; Light/Dark by mode only; Arabic fits without truncation
- [ ] F-AC-5 Values match the Mobile B2–B3 (redline per size, incl. avatar and remove insets)
- [ ] F-AC-6 Docs built from the Doc Kit; Components List card added; Code Connect per D9 after approval

---

### D11 Execution log (filled by the Figma Agent)

| Field | Value |
|---|---|
| Agent / stages run | build · rtl · qa · document |
| Date | |
| Node IDs | component sets `{id}` · docs section `{id}` |
| QA report | unbound values: — · contrast: — |

**Deviations**
- none

**Questions for the Planner**
- none

---

## E · Review

> One block per review round, newest first.

### E1 Summary

| Round | Date | Code verdict | Figma verdict |
|---|---|---|---|
| — | — | not reviewed yet | not reviewed yet |

---

## F · Changelog

> Changes to this component on this platform. Every entry also gets one line in the root `CHANGELOG.md`.

### F0 Initial version

| Version | Date | Change | Breaking | Migration |
|---|---|---|---|---|
| 1.0 | 2026-10-23 | Initial Mobile Chip plan: `assist`, `filter`, `input`, `tag`; `status` variant defined, its 7 states pending (A4.4) | No | — |

<!-- GENERATED from chip.md @ d8d6692cf2a3fb61 — do not edit; change the source and run: npm run contract -- mobile chip -->
# Chip · شريحة — Mobile — code contract

> **Everything you need to build Chip on Mobile, and nothing else.** Read this file only. Generated from [`chip.md`](chip.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](chip.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Chip · شريحة |
| Platform | Mobile · Flutter + Material 3 |
| Built on | Custom widget (`assist`, `filter`: `FocusableActionDetector` + `GestureDetector` with a token state layer, no ink; `input`, `tag`, `status`: `DecoratedBox`). M3 `ActionChip` / `FilterChip` / `InputChip` (roadmap base; Flutter's assist chip is `ActionChip`) are not used: their delete icon is not a separate focusable control and their ink, padding and density do not resolve to Biowave tokens (C3). Glyphs via `BwIcon`, remove via `BwIconButton`, avatar via `BwAvatar` |
| Import | `BwChip` from `package:biowave_mobile/biowave_mobile.dart` |
| Version | 1.0 · 2026-10-23 |
| Source code | `lib/src/components/chip/` — not built yet (the Executor creates it) |
| Tokens | — |
| Source | [`chip.md`](chip.md) @ `d8d6692cf2a3fb61` |

## 1. What it is

A chip is a compact element that holds one short piece of information. Interactive chips let people start a related action (`assist`), narrow a list (`filter`) or see and remove a value they entered (`input`). Static chips label something (`tag`, the Tag / Label of the legacy Figma pages) or show where a request stands (`status`, request status). Tag, Label and Status are variants of Chip, not separate components (decision P-05), so every chip shares one shape, one size scale and one set of rules.

**Part names** (use exactly these in code, class names and tests):

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `container` | Yes | The chip surface and, for `assist` and `filter`, the whole interaction target |
| 2 | `leading-icon` | No | Material Symbols glyph that helps recognise the label; decorative |
| 3 | `check-icon` | Auto | Shown at the start of a selected `filter` chip; replaces the leading icon while selected |
| 4 | `leading-avatar` | No | Avatar of the person or thing an `input` chip stands for; decorative because the label names it |
| 5 | `label` | Yes | The short text of the chip; one line |
| 6 | `remove-button` | Auto | Icon button at the end of an `input` chip that removes the value; its own keyboard stop |
| 7 | `status-icon` | Auto | Fixed glyph of a `status` chip, chosen by the state; never set by hand |

**Options** (names and values are the props in §2):

- 4.1 `variant`
- 4.2 `size`
- 4.3 `color` (`tag` only)
- 4.4 Request status (`status` only)
- 4.5 Leading content: `icon` and `avatar`
- 4.6 `selected` (`filter` only)
- 4.7 Remove (`input` only)
- 4.8 `disabled` (interactive only)

## 2. API

### `BwChip`

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

## 3. Dimensions

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

## 4. Tokens by part and state

Identical to [Web B3](../../../3-web-components/components/chip/chip.md#b3-tokens-by-part-and-state) (interactive states, selected filter, remove button, tag colours, focus ring). No component tokens (P-04). The **Hover** row applies only when a pointer is attached (`WidgetState.hovered`); Figma has no Hover variant on Mobile. Flutter mapping:

| Spec part / state | Flutter |
|---|---|
| `container` background, border, state layer | `DecoratedBox` (`ShapeDecoration` with `RoundedRectangleBorder` / `StadiumBorder`, `BorderSide` from B3) + a second `ColoredBox` state layer resolved from `WidgetState` (`hovered`, `pressed`) |
| `label` | `Text` with `context.bw.text.label{Size}` and the B3 colour |
| icons | `BwIcon` with the B3 colour |
| `remove-button` | `BwIconButton` (`text`, `neutral`) |
| focus ring | `BwFocusRing` (`lib/src/common/bw_focus_ring.dart`) |
| splash, elevation | none |

### 4.1 How to use each token on Mobile

Values are for checking only — never paste a value.

| Token | Dart | Light | Dark |
|---|---|---|---|
| `border-focus-offset` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 2 | 2 |
| `border-width-default` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 1 | 1 |
| `color-border-focus` | `context.bw.colors.borderFocus` | #254471 | #90A3BC |
| `radius-full` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 9999 | 9999 |
| `radius-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 8 | 8 |
| `size-control-height-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 40 | 40 |
| `size-control-height-sm` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 32 | 32 |
| `size-icon-lg` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 24 | 24 |
| `size-icon-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 20 | 20 |
| `size-icon-sm` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 16 | 16 |
| `spacing-control-gap-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 6 | 6 |
| `spacing-control-gap-sm` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 4 | 4 |
| `spacing-control-padding-inline-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 12 | 12 |
| `spacing-control-padding-inline-sm` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 8 | 8 |
| `spacing-sm` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 6 | 6 |
| `spacing-xs` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 4 | 4 |
| `target-min` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` |  |  |

## 5. States and transitions

Same as [Web B4](../../../3-web-components/components/chip/chip.md#b4-states-and-transitions) without pointer hover on touch. Durations `BwDuration.sm`, easing `BwEasing.standard`; reduced motion (`MediaQuery.disableAnimationsOf`) makes them instant.

## 6. RTL

Same as [Web B5](../../../3-web-components/components/chip/chip.md#b5-rtl). Flutter: `Directionality` from the app; `EdgeInsetsDirectional` for padding; `Row` order follows the text direction; glyphs never mirrored (no `matchTextDirection`).

## 7. Accessibility (implementation)

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

## 8. Examples

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

## 9. How to build it

### Goal

`BwChip` from `package:biowave_mobile/biowave_mobile.dart` implements the `assist`, `filter`, `input` and `tag` constructors of B1 from tokens only, in light/dark and en/ar, with separate remove semantics and 48 touch targets, and passes B9.

### Scope

**Depends on (must be `Built` first):** `BwIcon`, `BwIconButton` (with `BwFocusRing`, `BwControlSize`, `pumpBw`) and `BwAvatar` in this package (`BwAvatar` plan Finished, not on `main` yet). If one is missing, report “blocked — Icon button / Avatar” in C8 and stop. The `sm` leading avatar needs `BwAvatar` size `xs` (box `size-icon-lg`), which Avatar 1.0 does not have: build everything else and report “blocked — Avatar xs” for that one case.

**In scope:** B1–B9 for `assist`, `filter`, `input`, `tag`.

**Out of scope:** `BwChip.status` (7 request states not defined yet — plan 1.1); a chip-group widget; single-select behaviour; chip menus; drag to reorder; removal animation; focus management after removal (the owner of the list does it).

### Approach

- `BwChip` is a `StatefulWidget` (hover / pressed / focus states) with private constructors behind the named ones; `bw_chip_style.dart` is a pure function (variant, size, color, selected, `Set<WidgetState>`, context) → colours and sizes from `context.bw.colors`, `context.bw.text`, `BwSize`, `BwSpacing`, `BwRadius`, `BwBorder` only
- Interactive chips: `FocusableActionDetector` (`ActivateIntent` for Enter / Space, `onShowHoverHighlight`, `onShowFocusHighlight`) + `GestureDetector` for taps; the hit area is padded to `BwLayout.mobile.minTarget` with a transparent region, the visual container stays the B2 height
- M3 `ActionChip` / `FilterChip` / `InputChip` are not used: their delete icon is not separately focusable, they paint ink splashes, and their `padding` / `labelPadding` / `visualDensity` add values outside the tokens
- Remove button: `BwIconButton(variant: text, color: neutral)` sized to the B2 remove box, `Symbols.close_rounded`, `semanticLabel: removeLabel`; Backspace / Delete via `Shortcuts` on its focus node
- Avatar: `BwAvatar(size: sm, decorative: true, …)` from `BwChipAvatar` at `md`; `xs` at `sm` once it exists (C2)
- Check icon: `Symbols.check_rounded`, cross-fade with the leading icon (`AnimatedSwitcher`, B4)
- Focus ring: shared `BwFocusRing` with the container radius
- Icons (D-18): `material_symbols_icons` `Symbols.*_rounded` through `BwIcon`; never `Icons.*`

**Icons used:** `check` · `close`

### Token gaps

None. No `chip.tokens.json` (P-04). Avatar `xs` is an Avatar plan change (C2).

### Files to create / change

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

## 10. Tests

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

Implement every item in B9, plus:
- [ ] `bw_chip_style` unit test: resolved colours per `WidgetState` set equal the B3 tokens for every variant and colour
- [ ] Owned focus nodes disposed

## 11. Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 (constructors, names, types, defaults, asserts, fallbacks)
- [ ] AC-2 Every value in B2–B3 from the listed token; no raw values, no `BwPalette`
- [ ] AC-3 B4 transitions; reduced motion respected
- [ ] AC-4 RTL as B5; semantics, keyboard, focus and targets as B6
- [ ] AC-5 `cd 5-mobile-components && flutter analyze && flutter test` pass; `npm run sync` and `npm run docs:check` pass
- [ ] AC-6 Exported from `lib/biowave_mobile.dart`; `5-mobile-components/README.md` row = header, `Built`
- [ ] AC-7 Reuses `BwIcon`, `BwIconButton`, `BwAvatar`, `BwFocusRing`, `BwControlSize`; no M3 chip widgets, no ink
- [ ] AC-8 Static chips are not focusable

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
cd 5-mobile-components && flutter analyze && flutter test
npm run component-tokens
npm run sync        # must end with READY
npm run docs:check
```

## 14. When you finish

1. Fill [C8 Execution log](chip.md#c8-execution-log-filled-by-the-executor) in `chip.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `chip.md` and in the Components table of `5-mobile-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).

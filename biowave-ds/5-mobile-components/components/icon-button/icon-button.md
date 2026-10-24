# Icon button · زر أيقونة — Mobile

> **One file for Icon button on Mobile:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- mobile icon-button`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Icon button · زر أيقونة |
| Summary | A compact action for familiar symbols. Every icon button keeps a visible tooltip and an accessible name. |
| Summary (ar) | إجراء مدمج للرموز المألوفة. يحتفظ كل زر أيقونة بتلميح مرئي واسم واضح لقارئات الشاشة. |
| Parts | Container · icon · tooltip · spinner · focus ring |
| Parts (ar) | الحاوية · الأيقونة · التلميح · مؤشر التحميل · حلقة التركيز |
| Platform | Mobile · Flutter + Material 3 |
| Built on | M3 `IconButton` · `IconButton.filled` · `IconButton.filledTonal` · `IconButton.outlined` with a `ButtonStyle` from tokens; `isSelected` for toggles; `tooltip` → M3 `Tooltip` (long press) |
| Import | `BwIconButton` from `package:biowave_mobile/biowave_mobile.dart` |
| Figma | **Biowave DS — Mobile Components** › `↳ Icon Button` (page Typography mode `Mobile`) · [Part D](#d--figma-build) |
| Version | 1.0 · 2026-10-16 |
| Plan | Finished |
| Code | Approved |
| Figma build | Planned |
| Review | Round 3 · 2026-10-24 · Approved |
| Source code | [`lib/src/components/icon_button/bw_icon_button.dart`](../../lib/src/components/icon_button/bw_icon_button.dart) |
| Tokens | — (no component tokens yet) |
| Contracts | [`icon-button-contract.md`](icon-button-contract.md) · [`figma-icon-button-contract.md`](figma-icon-button-contract.md) — generated, never edited |
| Docs page | [`icon-button.html`](icon-button.html) |

## Contents

[A · Guidelines](#a--guidelines) · [B · Spec](#b--spec) · [C · Code plan](#c--code-plan) · [D · Figma build](#d--figma-build) · [E · Review](#e--review) · [F · Changelog](#f--changelog)

---

## A · Guidelines

> What it is and when to use it — designers, PMs. Identical on Web, Tablet and Mobile except **A8** (checked by `npm run docs:check`).

| | |
|---|---|
| Specs | [Web](../../../3-web-components/components/icon-button/icon-button.md#b--spec) · [Tablet](../../../4-tablet-components/components/icon-button/icon-button.md#b--spec) · [Mobile](#b--spec) |
| Figma | `↳ Icon Button` in **Biowave DS — Web Components** · **Tablet Components** · **Mobile Components** (one set per platform file, D-12; keys in `_sync/figma-files.json`) |
| Family | [Button](../button/button.md#a--guidelines) · Icon button · [Split button](../split-button/split-button.md#a--guidelines) · [Button group](../button-group/button-group.md#a--guidelines) |
| Version | 1.0 · 2026-10-16 |

### A1 Overview

An icon button starts an action shown only as an icon: close, edit, more options, notifications, filter. It saves space in toolbars, table rows, cards and app bars. Its name is never visible, so it always has an accessible label, and a tooltip on web. It can also be a **toggle** (pin, favourite, show password) that stays selected.

![Icon button — light and dark](assets/overview.png)

### A2 Anatomy

```
  ①┌───────┐         toggle, selected
   │  ②[◆] │        ┌───────┐
   └───────┘        │  [◆]  │  ← filled glyph + selected fill
   ③ tooltip        └───────┘
   ④ focus ring
```

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `container` | Yes | Square hit area and fill |
| 2 | `icon` | Yes | The action. Outlined glyph; filled glyph when a toggle is selected |
| 3 | `tooltip` | Web: yes · touch: on long press | Shows the label on hover and keyboard focus |
| 4 | `focus-ring` | Focus only | Shows keyboard focus |
| — | `spinner` | Loading only | Replaces the icon while the action runs |

### A3 Usage

**When to use**
- Common, recognisable actions where space is tight: close, edit, delete in a row, more options, refresh, filter
- App bars, table rows, card headers, toolbars
- Toggles with a clear on/off icon: pin, favourite, mute, show password

**When not to use**
| Situation | Use instead |
|---|---|
| The icon is not universally understood | [Button](../button/button.md#a--guidelines) with a label (and the icon as `leading-icon`) |
| The main action of a form or dialog | [Button](../button/button.md#a--guidelines) `filled` |
| The icon opens a menu of related actions next to a main action | [Split button](../split-button/split-button.md#a--guidelines) |
| Choosing one option from a set of icons | Segmented button |

### A4 Options

#### 4.1 `variant` — emphasis
Same scale as [Button A4.1](../button/button.md#41-variant--emphasis).
| Value | Looks like | Pick it when |
|---|---|---|
| `filled` | `[■◆■]` | Rare: the single main action shown as an icon (e.g. send in a message box) |
| `tonal` | `[▒◆▒]` | A prominent icon action that must not compete with a filled Button |
| `outlined` | `[─◆─]` | Icon actions next to outlined Buttons, or on busy backgrounds that need a boundary |
| `text` | ` ◆ ` | **Default.** App bars, table rows, card headers (Material calls this "standard") |

#### 4.2 `color`
Same values and rules as [Button A4.2](../button/button.md#42-color): `brand` · `secondary` · `neutral` · `error` · `inverse`. **Default for icon buttons: `neutral`**: most icon actions are utilities. Use `error` for delete in a row only when it isn't followed by a confirmation; otherwise `neutral`.

#### 4.3 `size`
Same scale as [Button A4.3](../button/button.md#43-size), so icon buttons line up with buttons in a row: `sm` · `md` (web default) · `lg` (touch default) · `xl` (touch only). The container is square.

#### 4.4 `toggle` and `selected`
| Value | Pick it when |
|---|---|
| `toggle` off | Default. The press runs an action |
| `toggle` on | The press switches a state (pin, favourite). `selected` shows the current state with a filled glyph and a selected fill |

**Combination rules**
- `tonal` is not available with `neutral` or `inverse`.
- `toggle` is available with `text` and `outlined` only (filled and tonal already look selected).
- `xl` is not available on web.
- A label is always required (accessible name and tooltip), even though it isn't shown.

### A5 States and behavior

Same states as [Button A5](../button/button.md#a5-states-and-behavior), plus:
| State | When it happens | What the user sees |
|---|---|---|
| Selected (toggle) | Toggle is on | Selected fill and the filled glyph |
| Tooltip | Hover (after a short delay) or keyboard focus on web; long press on touch | Label in a tooltip |

**Behavior rules**
- The label changes with a toggle when the action changes: "Pin" ↔ "Unpin".
- Loading replaces the icon with a spinner; the size never changes.
- In a row of icon buttons, keep one size and one variant.

### A6 Content

| Element | Rule | Max length |
|---|---|---|
| label (tooltip + accessible name) | Verb first, says the action, not the icon: "Delete user", not "Trash" | 3 words |

| ✓ EN | ✓ AR | ✗ Avoid |
|---|---|---|
| Close | إغلاق | X |
| Edit device | تعديل الجهاز | Pencil |
| More options | خيارات أخرى | Menu, … |
| Show password | إظهار كلمة المرور | Eye |
| Notifications | الإشعارات | Bell |

### A7 Do and don't

| ✓ Do | ✗ Don't |
|---|---|
| ![](assets/do-1.png) Use well-known icons and give every one a label | ![](assets/dont-1.png) Use a custom or ambiguous icon with no label |
| ![](assets/do-2.png) Keep one size and variant in a toolbar | ![](assets/dont-2.png) Mix filled, outlined and text icon buttons in one row |
| ![](assets/do-3.png) Use a Button with a label for the main action | ![](assets/dont-3.png) Make a form's submit an icon button |
| ![](assets/do-4.png) Change the label when a toggle changes ("Pin" ↔ "Unpin") | ![](assets/dont-4.png) Rely on the filled glyph alone to show a toggle state |

### A8 Platform notes — Mobile

| | Mobile |
|---|---|
| Default size | `lg` |
| Tooltip | Long press |
| Touch target | 48 hit area for `sm`/`md` |

### A9 Accessibility (design)

- Every icon button has a label that screen readers announce, in English and Arabic.
- Toggles announce their state ("Pin, toggle button, pressed").
- Focus ring visible on keyboard focus; `inverse` ring on brand surfaces.
- The icon meets 3:1 against its background; selected and unselected differ by more than color (glyph fill).

### A10 Related components

- [Button](../button/button.md#a--guidelines) — the same actions with a visible label
- [Split button](../split-button/split-button.md#a--guidelines) — uses an icon button as its menu trigger
- Tooltip — shows the label
- Badge — counts on an icon button (e.g. notifications), placed by composition

---

## B · Spec

> The contract — API, dimensions, tokens, states, RTL, accessibility. Code and Figma are both reviewed against this part.

| | |
|---|---|
| Web spec (shared facts) | [3-web-components/components/icon-button](../../../3-web-components/components/icon-button/icon-button.md#b--spec) |

### B1 API

#### BwIconButton
| Param | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `icon` | `IconData` | `Symbols.*_rounded` (D-18; re-exported by `biowave_foundations`) | — | ✓ | `icon` |
| `label` | `String` | | — | ✓ | Semantics label and tooltip |
| `onPressed` | `VoidCallback?` | | — | ✓ | `null` = disabled |
| `variant` | `BwButtonVariant` | `filled` · `tonal` · `outlined` · `text` | `text` | | A4.1 |
| `color` | `BwButtonColor` | `brand` · `secondary` · `neutral` · `error` · `inverse` | `neutral` | | A4.2 |
| `size` | `BwControlSize` | `sm` · `md` · `lg` · `xl` | `lg` | | A4.3 |
| `toggle` · `selected` | `bool` · `bool` | | `false` · `false` | | A4.4 |
| `selectedIcon` | `IconData?` | filled glyph | `null` | with `toggle` | |
| `tooltip` | `bool` | | `true` | | Long-press tooltip |
| `loading` · `loadingLabel` | | | | | As BwButton |

**Invalid combinations** (`assert` in debug, fallback in release): `tonal` with `neutral`/`inverse` → `outlined` · `toggle` with `filled`/`tonal` → toggle ignored · `toggle` without `selectedIcon` → assert · empty `label` → assert.

### B2 Dimensions

Width = height = `size-control-height-{sm|md|lg|xl}`; icon `size-icon-sm|md|lg|lg`; radius `radius-md` (`xl`: `radius-xl`); hit area ≥ `target-min` (`MaterialTapTargetSize.padded`). Everything else: [Web B2](../../../3-web-components/components/icon-button/icon-button.md#b2-dimensions).

### B3 Tokens by part and state

[Web B3](../../../3-web-components/components/icon-button/icon-button.md#b3-tokens-by-part-and-state) (unselected = Button tokens, selected = B3.2, tooltip = B3.4 with M3 `TooltipThemeData` built from the same tokens). `ButtonStyle` mapping as [BwButton B3](../button/button.md#b3-tokens-by-part-and-state).

Dark theme: same tokens. No exceptions.

### B4 States and transitions

Same as the [Web B4](../../../3-web-components/components/icon-button/icon-button.md#b4-states-and-transitions) with Flutter durations (`BwDuration.*`) and easings (`BwEasing.*`). No hover in Mobile examples; hover code paths stay for pointer devices. Reduced motion: `context.bw.reduceMotion` → `BwDuration.instant`.

### B5 RTL

Same as the [Web B5](../../../3-web-components/components/icon-button/icon-button.md#b5-rtl). Flutter: `Directionality` mirrors layout; `EdgeInsetsDirectional`/`BorderRadiusDirectional` only; directional icons mirror through `IconData.matchTextDirection`.

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Semantics | `Semantics(button: true, label: label, toggled: toggle ? selected : null)`; icon `excludeFromSemantics` |
| Tooltip | M3 `Tooltip(message: label, excludeFromSemantics: true)` so the name is not read twice |
| Loading · disabled · focus · target | As BwButton B6 |
| Target size | ≥ `BwLayout.mobile.minTarget` |

| Key (hardware keyboard) | Action |
|---|---|
| Tab / Shift+Tab | Moves focus |
| Enter / Space | Activates |

### B7 Examples

```dart
import 'package:biowave_mobile/biowave_mobile.dart';

BwIconButton(icon: Symbols.edit_rounded, label: 'Edit device', onPressed: edit);
BwIconButton(icon: Symbols.push_pin_rounded, selectedIcon: Symbols.push_pin_rounded, /* drawn with fill 1 when selected */ toggle: true, selected: pinned,
    label: pinned ? 'Unpin' : 'Pin', onPressed: togglePin);
BwIconButton(icon: Symbols.edit_rounded, label: 'تعديل الجهاز', onPressed: edit);
```

### B8 Figma

Structure, properties, the Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

- [ ] Goldens: every allowed `variant` × `color` (selected and not) at `lg`, every size for `text neutral`, light + dark, en + ar
- [ ] Semantics: label read once; toggle state exposed
- [ ] Tap target guideline for `sm`/`md`; contrast guideline
- [ ] Directional icon mirrors in RTL (`matchTextDirection`), `Symbols.close_rounded` does not
- [ ] Invalid combinations assert; no raw values

---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `icon-button-contract.md`.

> Executor: read `AGENTS.md`, `5-mobile-components/README.md`, this file and the spec [Part B](#b--spec).

| Field | Value |
|---|---|
| Component | Icon button |
| Platform | Mobile (Flutter + M3) |
| Depends on | BwButton **Built** |
| Plan version | 1 · 2026-10-16 |

### C1 Goal

`BwIconButton` meets B1–B6 and passes C9 using only tokens and the shared button helpers.

### C2 Scope

In: B1–B6, B9. Out: anything not in the spec.

### C3 Approach

Pick the M3 constructor by `variant`; style from `BwButtonStyle.resolve` (shared with BwButton) plus a selected-state branch (`WidgetState.selected`) for B3.2. Square size via `fixedSize`. Tooltip only when `tooltip` is true.

### C4 Token gaps

None.

### C5 Files to create / change

```
5-mobile-components/lib/src/components/icon_button/bw_icon_button.dart   new (reuses BwButtonStyle, BwControlSize, focus ring)
5-mobile-components/test/icon_button_test.dart                           new
5-mobile-components/lib/biowave_mobile.dart                                       change: export
5-mobile-components/README.md                                            change: status row
```

### C6 Tests

B9, plus earlier button-family tests still pass.

### C7 Acceptance criteria

- [ ] AC-1 API = B1 (names, defaults, asserts)
- [ ] AC-2 Values from tokens only; shared helpers reused, no copied styles
- [ ] AC-3 States/transitions; reduced motion
- [ ] AC-4 RTL and a11y per B5–B6
- [ ] AC-5 `cd 5-mobile-components && flutter analyze && flutter test`; `npm run sync` pass
- [ ] AC-6 Exported from `lib/biowave_mobile.dart`; README status updated

---

### C8 Execution log (filled by the Executor)

| Field | Value |
|---|---|
| Agent | Antigravity (continuing Codex step 02) |
| Date | 2026-10-23 |
| Files changed | `lib/src/components/icon_button/bw_icon_button.dart`; `test/icon_button_test.dart`; `test/goldens/icon_button/icon-button-{light,dark}-{en,ar}.png`; `lib/biowave_mobile.dart`; `README.md`; `components/icon-button/icon-button.md`; `CHANGELOG.md` |
| Checks | `cd 5-mobile-components && flutter analyze && flutter test` ✓ (96 tests); `npm run component-tokens` ✓; `npm run sync` ✓ (READY); `npm run docs:check` ✓ |

**Deviations:** none
**Questions for the Planner:** none

#### Fix round 1 — 2026-10-24 (Antigravity)

| Finding | What changed (`file:line`) | Test that proves it |
|---|---|---|
| #1 (🟡) Focus semantics and `focus` action lost on the excluding `Semantics` node | Wired a state-owned `FocusNode` into all `IconButton` constructors (`5-mobile-components/lib/src/components/icon_button/bw_icon_button.dart:61,79-91,210-243`) and exposed `focusable`, `focused`, and `onFocus` on the single `Semantics` container alongside `button`, `enabled`, `toggled`, and `onTap` (`5-mobile-components/lib/src/components/icon_button/bw_icon_button.dart:273-286`) | `5-mobile-components/test/icon_button_test.dart:376-426` (`label is read once and toggle state is exposed` — checks after Tab: `isFocused` true, `SemanticsAction.focus` present, exactly one labelled node, and `tester.semantics.tap` calls `onPressed` once) |
| #2 (🟢) Header `Source code` row still said not built yet | Updated header `Source code` row to link `lib/src/components/icon_button/bw_icon_button.dart` (`5-mobile-components/components/icon-button/icon-button.md:21`) | `npm run docs:check` |
| #3 (🟢) Unrelated `BwMobileTheme` reformat in `lib/biowave_mobile.dart` | Reverted `BwMobileTheme` formatting and kept only the `BwIconButton` export line (`5-mobile-components/lib/biowave_mobile.dart:13-23`) | `cd 5-mobile-components && flutter analyze && flutter test` |

#### Fix round 2 — 2026-10-24 (Codex)

| Finding | What changed (`file:line`) | Test that proves it |
|---|---|---|
| #4 (🟡) Duplicate Fix round 1 entry in D11 | Removed the misplaced duplicate from the Figma Agent log and kept the original C8 entry (`5-mobile-components/components/icon-button/icon-button.md:408`) | `npm run docs:check` |

---

## D · Figma build

> How to build Part B in Figma. The Figma Agent receives this through the generated `figma-icon-button-contract.md`.

> Written by the Planner (Claude). Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> **One file per platform (D-12).** This file builds the Mobile set in **Biowave DS — Mobile Components**. Structure, layer tree and properties are the same as the [Web Part D](../../../3-web-components/components/icon-button/icon-button.md#d--figma-build) D2–D4 (one fact, one home); this file lists only what differs. Values come from the Mobile spec [Part B](#b--spec).

| Field | Value |
|---|---|
| Component | Icon button |
| Platform | Mobile |
| Figma file | **Biowave DS — Mobile Components** (`_sync/figma-files.json` › `mobile`) |
| Page / section | `↳ Icon Button` › section `Icon Button` |
| Mode | **Create new.** Legacy reference (read only): Foundations file › LEGACY Mobile › `↳ Buttons` › icon `Buttons` `4131:2710` (deprecated after `Approved`) |
| Plan version | 2 · 2026-10-16 (D-12: own file) |

### D1 Rules for this build

Same as [Web D1](../../../3-web-components/components/button/button.md#d1-rules-for-this-build) (library first, everything bound, no local variables or styles), plus:
- **Typography mode:** on page `↳ Icon Button` set the explicit variable mode **`Mobile`** for `5. Typography (EN)` and `6. Typography (AR)` (`page.setExplicitVariableModeForCollection`). Text styles stay `Web/{en|ar}/…` names; the mode gives the Mobile scale.

### D2 Component structure

As [Web D2–D4](../../../3-web-components/components/icon-button/icon-button.md#d2-component-structure), with these Mobile differences:
- `Size` adds `XL`
- No `Hover` state
- Default instance: `Variant=Text`, `Color=Neutral`, `Size=LG`
- Docs page 09 shows the 48 hit area around `SM`/`MD`

### D3 Layer tree and auto layout

As [Web D3](../../../3-web-components/components/icon-button/icon-button.md#d3-layer-tree-and-auto-layout), with the Mobile differences listed in D2.

### D4 Properties

As [Web D4](../../../3-web-components/components/icon-button/icon-button.md#d4-properties), with the Mobile differences listed in D2.

### D5 Variants to generate

`.Icon Button/Appearance`: 18 × 5 states (no `Hover`) = 90 + selected (`Text`/`Outlined` × 5 colors × 5 states) = 50 → **140**; `Icon Button`: 4 sizes × 3 = **12**.

#### After this build is `Approved`
Report instances of the legacy reference above; move legacy sets to `_Deprecation Ground` in the Foundations file once product files use the Mobile library.

### D6 States, interactions and motion

As Web D6 without hover interactions. Press: smart animate per B4.

### D7 RTL

As Web D7 (`Language=AR` variants where the component has text).

### D8 Documentation pages

All 12 standard pages (`_templates/component.md` D8 + `2-foundations/figma-doc-kit.md` › Page layouts) in section `Icon Button — Documentation` on `↳ Icon Button` in this file, built only from the Doc Kit (Foundations library). Blocked until the Doc Kit exists. 07 Platform: `Doc/Device frame` = Phone (SafeArea). 09 Accessibility: target-size overlay (`target-min` = 48) on `SM`/`MD`.

Component description: one line from A1 + "Spec: 5-mobile-components/components/icon-button/icon-button.md".

### D9 Code Connect

`5-mobile-components/lib/src/components/icon_button/bw_icon_button.figma.dart` — `Icon` → `icon: Icons.*_rounded`, `Selected icon` → `selectedIcon`, `Toggle`/`Selected` → `toggle`/`selected`, `Tooltip label` → `label`, `Variant`/`Color`/`Size` → enums. Publish after code and Figma reviews are both `Approved`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Set on `↳ Icon Button` in the Mobile file; structure and layer names as Web D2–D3 + differences above
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
| 3 | 2026-10-24 | Approved | not reviewed |
| 2 | 2026-10-24 | Changes requested | not reviewed |
| 1 | 2026-10-23 | Changes requested | not reviewed |

### E4 Round 3 — 2026-10-24

| Field | Value |
|---|---|
| Plan version reviewed | 1 · 2026-10-16 |
| Spec version reviewed | 1.0 |
| Reviewer | Claude |
| Date | 2026-10-24 |
| Commit reviewed | `50d2e8d` (branch `ds/icon-button-mobile`; `git diff main...HEAD` for the unit, `git diff 9873fda HEAD` for the change since Round 2; working tree clean before this review) |
| Verdict | **Approved** (0 🔴, 0 🟡, 0 🟢) |

Checks run by the Reviewer (not copied from C8):

| Command | Result |
|---|---|
| `npm run docs:check` | ✓ 18 component files OK |
| `cd 5-mobile-components && flutter analyze` | ✓ No issues found |
| `cd 5-mobile-components && flutter test` | ✓ 96 tests, all passed (goldens compared, not updated) |
| `npm run sync` (AC-5) | ✓ READY for component work; `mobile icon-button` code and Figma contracts current; working tree unchanged |

**What changed since Round 2** (`git diff 9873fda HEAD`): only `icon-button.md` (D11 duplicate removed, C8 Fix round 2 entry added, header Code `Changes requested` → `Built`), `5-mobile-components/README.md` (same status), `CHANGELOG.md` (Fix round 2 line) and run records. No change under `5-mobile-components/lib` or `5-mobile-components/test`, so the code approved in substance in Round 2 is unchanged.

#### Round 2 findings

| # | Status | Evidence |
|---|---|---|
| 4 (🟡) Duplicate Fix round 1 entry in D11 | ✅ Fixed | Part D (`### D1` … `## E`) is now byte-identical to `main` (`diff` of `git show main:./5-mobile-components/components/icon-button/icon-button.md` against the working file, Part D only: no differences). D11 (`icon-button.md:408-418`) is back to template content. The single Fix round 1 entry stays in C8 (`:319-325`); Fix round 2 is logged in C8 (`:327-331`); `CHANGELOG.md` "Fixed — Mobile Icon button review round 2" |
| 1–3 (Round 1) | ✅ Still fixed | No code or test change since Round 2 (see above); test `label is read once and toggle state is exposed` passes |

#### Acceptance criteria

| AC | Result | Evidence (file:line / test name) |
|---|---|---|
| AC-1 API = B1 (names, defaults, asserts) | ✅ | Unchanged since Round 2: `bw_icon_button.dart:11-54`, asserts `:25-41`, release fallbacks `:95-106`. Test `defaults and invalid combinations assert` |
| AC-2 Tokens only; shared helpers reused | ✅ | Unchanged: `BwButtonStyle.resolve` + `metrics` (`:129-139`), B3.2 selected branch (`:143-181`), B3.4 tooltip (`:244-271`). Tests `selected tokens resolve in light/dark`, `tooltip uses the tooltip tokens and can be disabled`, `component source contains no raw visual values` |
| AC-3 States/transitions; reduced motion | ✅ | Unchanged: `BwDuration.sm` + `BwEasing.standard` (`:131-132,186-206`), reduced motion → `BwDuration.instant` (`:132,265-268`). Tests `selected glyph is filled and cross-fades from the outline`, `reduced motion makes state animation instant` |
| AC-4 RTL and a11y per B5–B6 | ✅ | Unchanged: one labelled `Semantics` node with button, enabled, toggled, tap, focus state and `focus` action (`:273-286`); tooltip `excludeFromSemantics` (`:247`). Tests `label is read once and toggle state is exposed`, `directional icon mirrors and close does not`, `*-ar` goldens |
| AC-5 analyze, test, sync pass | ✅ | Checks table above |
| AC-6 Exported; README status | ✅ | `lib/biowave_mobile.dart:13`; README row equals the header (`docs:check` ✓) |

#### Rule checks (AGENTS.md §2 and workflow rules)

| Rule | Result | Notes |
|---|---|---|
| 1 No generated files edited | ✅ | Fix commit touches only `icon-button.md`, README, `CHANGELOG.md`, run records |
| 2–3 No raw values / no primitives | ✅ | No code change |
| 4 RTL first | ✅ | No code change |
| 5 Both themes, both languages tested | ✅ | Goldens unchanged and pass |
| 6 Accessibility | ✅ | No code change; Round 1 #1 still holds |
| 7 Stay inside the contract | ✅ | C8 Deviations: none |
| 8 One component per task | ✅ | Only this unit's files |
| 9 Changelog | ✅ | `CHANGELOG.md` "Fixed — Mobile Icon button review round 2" |
| Role ownership (AGENTS.md §1) | ✅ | Fix round 2 written in C8 only; Part E and Part D untouched (Part D equals `main`) |

#### Findings

None.

#### Notes (not findings)

- Tooltip fade easing note from Round 1 still applies (M3 `Tooltip` has no curve parameter); handled by the future Tooltip component.

#### Next step

- Code **Approved** (header + README). Plan stays `Finished`. Figma build stays `Planned`. Ready for the orchestrator's merge gate.

---

### E3 Round 2 — 2026-10-24

| Field | Value |
|---|---|
| Plan version reviewed | 1 · 2026-10-16 |
| Spec version reviewed | 1.0 |
| Reviewer | Claude |
| Date | 2026-10-24 |
| Commit reviewed | `fbe0202` (branch `ds/icon-button-mobile`, `git diff main...HEAD`; working tree clean before this review) |
| Verdict | **Changes requested** (0 🔴, 1 🟡, 0 🟢) |

Checks run by the Reviewer (not copied from C8):

| Command | Result |
|---|---|
| `npm run docs:check` | ✓ 18 component files OK |
| `cd 5-mobile-components && flutter analyze` | ✓ No issues found |
| `cd 5-mobile-components && flutter test` | ✓ 96 tests, all passed (goldens compared, not updated) |
| `npm run sync` (AC-5) | ✓ READY for component work; `mobile icon-button` code and Figma contracts current; working tree unchanged |

#### Round 1 findings

| # | Status | Evidence |
|---|---|---|
| 1 (🟡) Focus state and `focus` action lost | ✅ Fixed | A state-owned `FocusNode` (`bw_icon_button.dart:61`, listener + dispose `:79-91`) is passed to all four M3 constructors (`:213,221,229,237`). The single `Semantics` node (`:273-286`) now sets `focusable: enabled`, `focused: enabled && _focusNode.hasFocus`, `onFocus: _focusNode.requestFocus` next to `label`, `button`, `enabled`, `toggled`, `onTap`, and keeps `excludeSemantics: true`, so the label is still read once. Test `label is read once and toggle state is exposed` (`icon_button_test.dart:376-426`) now checks: before Tab `isFocused` false with `tap` and `focus` actions; after Tab `isFocused` true, `focus` present, exactly one node labelled `Unpin`; `tester.semantics.tap` calls `onPressed` once. Disabled (`onPressed: null`) is not focusable, as BwButton; loading keeps focus (test `loading keeps focus, blocks presses, and announces once`) |
| 2 (🟢) Header `Source code` row stale | ✅ Fixed | `icon-button.md:21` links `lib/src/components/icon_button/bw_icon_button.dart` |
| 3 (🟢) Unrelated `BwMobileTheme` reformat | ✅ Fixed | `git diff main...HEAD -- lib/biowave_mobile.dart` is now only the export line `:13` |

#### Acceptance criteria

| AC | Result | Evidence (file:line / test name) |
|---|---|---|
| AC-1 API = B1 (names, defaults, asserts) | ✅ | Unchanged from Round 1: `bw_icon_button.dart:11-54` params and defaults; asserts `:25-41`; release fallbacks `:95-106`. Test `defaults and invalid combinations assert` |
| AC-2 Tokens only; shared helpers reused | ✅ | `BwButtonStyle.resolve` + `metrics` (`:129-139`), selected branch B3.2 tokens only (`:143-181`), tooltip B3.4 tokens (`:244-271`). The fix adds no visual values. Tests `selected tokens resolve in light/dark`, `tooltip uses the tooltip tokens and can be disabled`, `component source contains no raw visual values` |
| AC-3 States/transitions; reduced motion | ✅ | `AnimatedSwitcher` `BwDuration.sm` + `BwEasing.standard` (`:131-132,186-206`); reduced motion → `BwDuration.instant` (`:132,265-268`). Tests `selected glyph is filled and cross-fades from the outline`, `reduced motion makes state animation instant` |
| AC-4 RTL and a11y per B5–B6 | ✅ | RTL: test `directional icon mirrors and close does not`, `*-ar` goldens. Semantics: one labelled node with `button`, `enabled`, `toggled`, `tap`, and now focus state + `focus` action as BwButton (`:273-286`, finding 1 above); tooltip `excludeFromSemantics` (`:247`); targets (`sm`/`md` meet the Android tap target guideline); Enter/Space; focus ring tests |
| AC-5 analyze, test, sync pass | ✅ | Checks table above |
| AC-6 Exported; README status | ✅ | `lib/biowave_mobile.dart:13`; README row matches the header |

#### Rule checks (AGENTS.md §2 and workflow rules)

| Rule | Result | Notes |
|---|---|---|
| 1 No generated files edited | ✅ | Fix commit touches widget, test, barrel, README, `icon-button.md`, `CHANGELOG.md`, run records; no contract or docs HTML |
| 2–3 No raw values / no primitives | ✅ | Fix adds only a `FocusNode` and semantics flags |
| 4 RTL first | ✅ | No change; `EdgeInsetsDirectional` / `BorderRadiusDirectional` (`:177-179,251-259`) |
| 5 Both themes, both languages tested | ✅ | Goldens unchanged and still pass |
| 6 Accessibility | ✅ | Round 1 finding 1 fixed |
| 7 Stay inside the contract | ✅ | Code matches C3; no deviations |
| 8 One component per task | ✅ | Round 1 finding 3 fixed |
| 9 Changelog | ✅ | `CHANGELOG.md` "Fixed — Mobile Icon button review round 1" |
| Role ownership (AGENTS.md §1 table; workflow rule 2) | ⚠️ | The Fixer writes only a Fix round in **C8**. The same Fix round 1 entry is pasted into **D11** (Figma Agent execution log) — finding 4 |

#### Findings

| # | Severity | File | Issue | Required change | Owner |
|---|---|---|---|---|---|
| 4 | 🟡 Should fix | `5-mobile-components/components/icon-button/icon-button.md:414-422` | The Fix round 1 entry (identical to C8 `:319-327`) was pasted a second time into **D11 Execution log (filled by the Figma Agent)**. D11 is owned by the Figma Agent and is read by the Figma review; it now reports a code fix round for a Figma build that is still `Planned`. This breaks the role boundary (AGENTS.md §1: the Fixer writes "a Fix round N entry in C8") | Delete the duplicated `#### Fix round 1 — 2026-10-24 (Antigravity)` heading and table from D11, so D11 is back to its template content as on `main`. Keep the C8 entry. Log the change in `CHANGELOG.md` | Implementer |

#### Notes (not findings)

- Tooltip fade easing note from Round 1 still applies (M3 `Tooltip` has no curve parameter); handled by the future Tooltip component.

#### Next step

- Code **Changes requested**. Fix round 2: finding 4 only (doc clean-up, no code change). No Planner items; Plan stays `Finished`. The code itself is ready; after finding 4 is fixed, Round 3 only needs to confirm D11 and the checks.

---

### E2 Round 1 — 2026-10-23

| Field | Value |
|---|---|
| Plan version reviewed | 1 · 2026-10-16 |
| Spec version reviewed | 1.0 |
| Reviewer | Claude |
| Date | 2026-10-23 |
| Commit reviewed | `91ddb4a` (branch `ds/icon-button-mobile`, `git diff main...HEAD`; working tree clean before this review) |
| Verdict | **Changes requested** (0 🔴, 1 🟡, 2 🟢) |

Checks run by the Reviewer (not copied from C8):

| Command | Result |
|---|---|
| `npm run docs:check` | ✓ 18 component files OK |
| `cd 5-mobile-components && flutter analyze` | ✓ No issues found |
| `cd 5-mobile-components && flutter test` | ✓ 96 tests, all passed (goldens compared, not updated) |
| `npm run sync` (AC-5) | ✓ READY for component work; `mobile icon-button` code and Figma contracts current; working tree unchanged |

**Screen-reader probe.** In a throw-away copy of the package (plus `2-foundations/flutter`) in the scratchpad, outside the repo, a probe test dumped the semantics tree and ran semantics actions. Nothing in the repo changed.
- Default button: **one** node — `label: "Edit device"`, flags `isButton, hasEnabledState, isEnabled`, actions `tap`, 48 × 48. `find.bySemanticsLabel('Edit device')` finds 1 node; the tooltip and icon add nothing.
- `tester.semantics.tap(...)` on that node calls `onPressed` (presses 0 → 1). So screen-reader activation works (the tablet Round 1 failure is not repeated).
- `onPressed: null` → `isEnabled` false, no `tap` action. `loading: true` → `tap` (no-op), `value: "Loading"`, enabled — same as BwButton B6. Toggle off → `toggled: false`; on → `toggled: true`.
- After Tab, **`BwButton`** reports `isFocused: true` and actions `tap | focus`; **`BwIconButton`** reports `isFocused: none` and action `tap` only, although `FocusManager.primaryFocus` is the icon button's node — finding 1.

#### Acceptance criteria

| AC | Result | Evidence (file:line / test name) |
|---|---|---|
| AC-1 API = B1 (names, defaults, asserts) | ✅ | `bw_icon_button.dart:11-54` all B1 params and defaults (`text`, `neutral`, `lg`, `tooltip: true`); asserts `:25-41` (empty label, tonal + neutral/inverse, toggle + filled/tonal, toggle without `selectedIcon`); release fallbacks tonal → outlined `:79-84`, toggle ignored `:86-90`. Test `defaults and invalid combinations assert` |
| AC-2 Tokens only; shared helpers reused | ✅ | Unselected style from `BwButtonStyle.resolve` + `BwButtonStyle.metrics` (`:113-123`), focus ring through the same helper; selected branch = B3.2 tokens only (`:128-157`); outlined side from the base style; tooltip B3.4 tokens `:224-247`. Tests `selected tokens resolve in light/dark` (incl. selected hover/pressed overlays and outlined/disabled borders), `tooltip uses the tooltip tokens and can be disabled`, `component source contains no raw visual values`; no `BwPalette` |
| AC-3 States/transitions; reduced motion | ✅ | Selected cross-fade `AnimatedSwitcher` `BwDuration.sm` + `BwEasing.standard` (`:115-116,170-190`), filled glyph via `BwIconAxes.fillSelected` (`:187`); reduced motion → `BwDuration.instant` for state, switcher and tooltip (`:116,244-247`). Tests `selected glyph is filled and cross-fades from the outline`, `reduced motion makes state animation instant` |
| AC-4 RTL and a11y per B5–B6 | ⚠️ | RTL ✅: test `directional icon mirrors and close does not`; goldens `*-ar` show the arrow mirrored and the RTL order. Semantics ✅ one labelled node with `button`, `toggled`, `tap` (`:252-262`, test `label is read once and toggle state is exposed` + probe); tooltip `excludeFromSemantics` (`:226`); loading/disabled as BwButton (tests `loading keeps focus, blocks presses, and announces once`, `loading with null callback remains disabled`); target (`sm`/`md` meet the Android tap target guideline); Enter/Space test; focus ring tests. ✗ Focus semantics lost — finding 1 |
| AC-5 analyze, test, sync pass | ✅ | Checks table above |
| AC-6 Exported; README status | ✅ | `lib/biowave_mobile.dart:13`; README row Code was `Built` before this review |

#### Goldens

Opened `icon-button-light-en.png` and `icon-button-dark-ar.png`: every allowed variant × color unselected, text/outlined × every color selected (filled pin glyph, subtle containers, outlined selected borders), and the four sizes for text neutral; inverse cells sit on `surfaceInverse`. Real Material Symbols glyphs, no boxes. In `ar` the cell order is right-to-left and `arrow_forward` points left.

#### Rule checks (AGENTS.md §2)

| Rule | Result | Notes |
|---|---|---|
| 1 No generated files edited | ✅ | Diff: widget, test, goldens, barrel, README, `icon-button.md` header + C8, `CHANGELOG.md`, run records |
| 2–3 No raw values / no primitives | ✅ | Only `BwSpacing`, `BwRadius`, `BwDuration`, `BwEasing`, `BwIconAxes`, `context.bw.*`; the Arabic/English fallback loading message is copy (as BwButton), not a visual value |
| 4 RTL first | ✅ | `EdgeInsetsDirectional`, `BorderRadiusDirectional` (`:161-163,230-238`); mirroring through `IconData.matchTextDirection` |
| 5 Both themes, both languages tested | ✅ | Light/dark token and contrast tests; 4 goldens (light/dark × en/ar) |
| 6 Accessibility | ⚠️ | Finding 1 (focus state not exposed to assistive tech) |
| 7 Stay inside the contract | ✅ | C8 Deviations: none; matches C3 |
| 8 One component per task | 🟢 | `lib/biowave_mobile.dart:16-26` reformats `BwMobileTheme` (format only) — finding 3 |
| 9 Changelog | ✅ | `CHANGELOG.md` "Mobile Icon button — code implementation (1.0)" |

#### Findings

| # | Severity | File | Issue | Required change | Owner |
|---|---|---|---|---|---|
| 1 | 🟡 Should fix | `5-mobile-components/lib/src/components/icon_button/bw_icon_button.dart:252-262` | The outer `Semantics(container: true, excludeSemantics: true, onTap: …)` throws away the M3 `IconButton`'s own semantics. The node keeps label, button, toggled and `tap`, but loses the focus state and the `focus` action: after Tab, `isFocused` is `none` and actions are `tap` only, while `BwButton` reports `isFocused: true` and `tap \| focus`. B6 says focus is "As BwButton B6", so TalkBack / VoiceOver with a hardware keyboard or switch access cannot tell which icon button has focus or move focus to it | Keep **one** labelled node with `button`, `toggled` (toggle only), `enabled` and `tap` (calls `onPressed`, no-op while loading), and also expose the focus state and `focus` action the way BwButton does (for example: merge the button's own semantics instead of excluding them, or set `focusable`/`focused` from the button's `FocusNode`). The label must still be read once. Extend `label is read once and toggle state is exposed` (or add a test) to check after Tab: `isFocused` true, `SemanticsAction.focus` present, still exactly one node with the label, and `tester.semantics.tap` calls `onPressed` once | Implementer |
| 2 | 🟢 Nit | `5-mobile-components/components/icon-button/icon-button.md:21` | Header `Source code` row still says `lib/src/components/icon-button/` — not built yet. The code is built, and the folder is `icon_button` (C5) | Point the row at `lib/src/components/icon_button/bw_icon_button.dart` with a link, as `button.md` does | Implementer |
| 3 | 🟢 Nit | `5-mobile-components/lib/biowave_mobile.dart:16-26` | `BwMobileTheme` was reformatted; not part of this unit and not listed as a deviation in C8 | Revert the formatting of `BwMobileTheme` (keep only the new export on `:13`), or list it in C8 | Implementer |

#### Notes (not findings)

- Tooltip fade easing: web B4 asks `standard-decelerate` in and `standard-accelerate` out. M3 `Tooltip` has no curve parameter, so the build sets only the durations (`:243-247`). To be handled by the future Tooltip component, as B3.4 already calls these tokens temporary. No change asked here.

#### Next step

- Code **Changes requested**. Fix round 1: finding 1 (and the nits). No Planner items; Plan stays `Finished`.

---

## F · Changelog

> Changes to this component on this platform.

### F0 Changes from previous version

None — version 1.0. Filled when the version is above 1.0; it feeds Figma doc page 10.

### F1 Guidelines changelog

| Version | Date | Change | Migration | Author |
|---|---|---|---|---|
| 1.0 | 2026-10-16 | Initial. Re-models the Figma `Icon Button` set | `Style` Standard → `variant` text · Color Default → `neutral` · Sizes XS–XL (Material 3 Expressive, 32–136) → control sizes `sm`–`xl` · `Width` and `Shape` removed (one rounded-square shape, matches Button) · `Type=Toggle` + `Selected` → `toggle` + `selected` | Planner (Claude) |

### F2 Spec changelog

| Version | Date | Change | Breaking | Migration |
|---|---|---|---|---|
| 1.0 | 2026-10-16 | Initial | No | — |

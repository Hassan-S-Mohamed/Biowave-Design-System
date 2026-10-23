# Icon button · زر أيقونة — Tablet

> **One file for Icon button on Tablet:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- tablet icon-button`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Icon button · زر أيقونة |
| Summary | A compact action for familiar symbols. Every icon button keeps a visible tooltip and an accessible name. |
| Summary (ar) | إجراء مدمج للرموز المألوفة. يحتفظ كل زر أيقونة بتلميح مرئي واسم واضح لقارئات الشاشة. |
| Parts | Container · icon · tooltip · spinner · focus ring |
| Parts (ar) | الحاوية · الأيقونة · التلميح · مؤشر التحميل · حلقة التركيز |
| Platform | Tablet · Flutter + Material 3 |
| Built on | M3 `IconButton` · `IconButton.filled` · `IconButton.filledTonal` · `IconButton.outlined` with a `ButtonStyle` from tokens; `isSelected` for toggles; `tooltip` → M3 `Tooltip` (long press) |
| Import | `BwIconButton` from `package:biowave_tablet/biowave_tablet.dart` |
| Figma | **Biowave DS — Tablet Components** › `↳ Icon Button` (page Typography mode `Tablet`) · [Part D](#d--figma-build) |
| Version | 1.0 · 2026-10-16 |
| Plan | Finished |
| Code | Built |
| Figma build | Planned |
| Review | Round 1 · 2026-10-23 · Changes requested |
| Source code | `lib/src/components/icon_button/bw_icon_button.dart` |
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
| Specs | [Web](../../../3-web-components/components/icon-button/icon-button.md#b--spec) · [Tablet](#b--spec) · [Mobile](../../../5-mobile-components/components/icon-button/icon-button.md#b--spec) |
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

### A8 Platform notes — Tablet

| | Tablet |
|---|---|
| Default size | `lg` |
| Tooltip | Long press; hover with a pointer |
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

Same as the [Web B4](../../../3-web-components/components/icon-button/icon-button.md#b4-states-and-transitions) with Flutter durations (`BwDuration.*`) and easings (`BwEasing.*`). No hover in Tablet examples; hover code paths stay for pointer devices. Reduced motion: `context.bw.reduceMotion` → `BwDuration.instant`.

### B5 RTL

Same as the [Web B5](../../../3-web-components/components/icon-button/icon-button.md#b5-rtl). Flutter: `Directionality` mirrors layout; `EdgeInsetsDirectional`/`BorderRadiusDirectional` only; directional icons mirror through `IconData.matchTextDirection`.

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Semantics | `Semantics(button: true, label: label, toggled: toggle ? selected : null)`; icon `excludeFromSemantics` |
| Tooltip | M3 `Tooltip(message: label, excludeFromSemantics: true)` so the name is not read twice |
| Loading · disabled · focus · target | As BwButton B6 |
| Target size | ≥ `BwLayout.tablet.minTarget` |

| Key (hardware keyboard) | Action |
|---|---|
| Tab / Shift+Tab | Moves focus |
| Enter / Space | Activates |

### B7 Examples

```dart
import 'package:biowave_tablet/biowave_tablet.dart';

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

> Executor: read `AGENTS.md`, `4-tablet-components/README.md`, this file and the spec [Part B](#b--spec).

| Field | Value |
|---|---|
| Component | Icon button |
| Platform | Tablet (Flutter + M3) |
| Depends on | BwButton **Built** |
| Plan version | 1.1 · 2026-10-23 (review round 1: goldens in C5) |

### C1 Goal

`BwIconButton` meets B1–B6 and passes C6 / B9 using only tokens and the shared button helpers.

### C2 Scope

In: B1–B6, B9. Out: anything not in the spec.

### C3 Approach

Pick the M3 constructor by `variant`; style from `BwButtonStyle.resolve` (shared with BwButton) plus a selected-state branch (`WidgetState.selected`) for B3.2. Square size via `fixedSize`. Tooltip only when `tooltip` is true.

### C4 Token gaps

None.

### C5 Files to create / change

```
4-tablet-components/lib/src/components/icon_button/bw_icon_button.dart   new (reuses BwButtonStyle, BwControlSize, focus ring)
4-tablet-components/test/icon_button_test.dart                           new
4-tablet-components/test/goldens/icon_button/                            new (generated goldens)
4-tablet-components/lib/biowave_tablet.dart                                       change: export
4-tablet-components/README.md                                            change: status row
```

### C6 Tests

B9, plus earlier button-family tests still pass.

### C7 Acceptance criteria

- [ ] AC-1 API = B1 (names, defaults, asserts)
- [ ] AC-2 Values from tokens only; shared helpers reused, no copied styles
- [ ] AC-3 States/transitions; reduced motion
- [ ] AC-4 RTL and a11y per B5–B6
- [ ] AC-5 `cd 4-tablet-components && flutter analyze && flutter test`; `npm run sync` pass
- [ ] AC-6 Exported from `lib/biowave_tablet.dart`; README status updated

---

### C8 Execution log (filled by the Executor)

| Field | Value |
|---|---|
| Agent | Codex |
| Date | 2026-10-23 |
| Built | `BwIconButton` with the contract API and release fallbacks, shared `BwButtonStyle` and focus ring, token-only square sizing and selected states, bilingual loading semantics, long-press tooltip theming, RTL-aware icons, loading and toggle transitions, public export, and the contract test matrix. Round 2 keeps exactly one `BwIcon` mounted during selected-state transitions and places the labelled toggle semantics outside the visual-only tooltip. |
| Round 3 | Disposed the explicit semantics handle inside the test body so Flutter's post-test handle verification sees no active handle. |
| Files changed | `lib/src/components/icon_button/bw_icon_button.dart`; `test/icon_button_test.dart`; `lib/biowave_tablet.dart`; `README.md`; `components/icon-button/icon-button.md`; `CHANGELOG.md` |
| Checks | `npm run component-tokens` ✓; `npm run sync` ✓ READY; `npm run docs:check` ✓; `flutter analyze` ✓ (writable SDK overlay, `--no-pub`); `flutter test` not runnable in sandbox — orchestrator runs it (the restricted runner denied Flutter Test's required `127.0.0.1:0` harness socket before test execution). |

**Deviations:** `flutter test` could not start in this sandbox because the Flutter test harness cannot bind its loopback socket; the orchestrator runs it, and the run prompt says this does not make the result partial. PNG goldens were not created because §9 does not authorize a golden directory or files; the allowed test file uses token and property assertions for the full render matrix instead.
**Questions for the Planner:** §10 requests generated PNG goldens, but §9 authorizes no golden directory/files; the test therefore covers the full theme/locale/state render matrix with token and property assertions. Should a future plan add `test/goldens/icon_button/` to §9?

#### Fix round 1

| Finding | What changed (`file:line`) | Test that proves it |
|---|---|---|
| #1 (🔴 Blocker — outer `Semantics(excludeSemantics: true)` drops tap and focus actions) | Wrapped `Semantics` in `MergeSemantics` and set `excludeSemantics: loading \|\| onPressed == null` so enabled buttons merge with the inner `IconButton` to expose one labelled button node with `SemanticsAction.tap`, `SemanticsAction.focus`, and `toggled` (`lib/src/components/icon_button/bw_icon_button.dart:237-247`). | `test/icon_button_test.dart:269-319` (`exposes one label and the selected toggle state` — asserts `SemanticsAction.tap` and `SemanticsAction.focus` present when enabled and absent when disabled, plus `tester.semantics.tap` firing `onPressed`); `test/icon_button_test.dart:321-346` (`keeps sm and md targets at the tablet minimum` — asserts `androidTapTargetGuideline` and `labeledTapTargetGuideline`). |
| #2 (🟡 Goldens authorised by Plan 1.1) | Added the B9 PNG golden matrix (`light-en.png`, `light-ar.png`, `dark-en.png`, `dark-ar.png`) under `test/goldens/icon_button/` rendered with real test fonts (`test/icon_button_test.dart:480-658`). | `test/icon_button_test.dart:480-509` (`B9 matrix light/en`, `B9 matrix light/ar`, `B9 matrix dark/en`, `B9 matrix dark/ar`). |
| #3 (🟢 Nit — icon swap is fade-in instead of cross-fade) | Updated `AnimatedSwitcher.layoutBuilder` to stack `...previousChildren` with `currentChild` so outgoing and incoming icons cross-fade (`lib/src/components/icon_button/bw_icon_button.dart:142-148`). | `test/icon_button_test.dart:241-265` (`cross-fades between unselected and selected icons` — asserts 2 `BwIcon` widgets in flight during the transition and 1 settled filled `BwIcon` after `pumpAndSettle`). |

- **Files changed:** `4-tablet-components/lib/src/components/icon_button/bw_icon_button.dart`, `4-tablet-components/test/icon_button_test.dart`, `4-tablet-components/test/goldens/icon_button/light-en.png`, `4-tablet-components/test/goldens/icon_button/light-ar.png`, `4-tablet-components/test/goldens/icon_button/dark-en.png`, `4-tablet-components/test/goldens/icon_button/dark-ar.png`, `4-tablet-components/components/icon-button/icon-button.md`, `4-tablet-components/README.md`, `CHANGELOG.md`
- **Checks:** `npm run docs:check` ✓ · `cd 4-tablet-components && flutter analyze && flutter test` ✓ (152/152)

---

## D · Figma build

> How to build Part B in Figma. The Figma Agent receives this through the generated `figma-icon-button-contract.md`.

> Written by the Planner (Claude). Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> **One file per platform (D-12).** This file builds the Tablet set in **Biowave DS — Tablet Components**. Structure, layer tree and properties are the same as the [Web Part D](../../../3-web-components/components/icon-button/icon-button.md#d--figma-build) D2–D4 (one fact, one home); this file lists only what differs. Values come from the Tablet spec [Part B](#b--spec).

| Field | Value |
|---|---|
| Component | Icon button |
| Platform | Tablet |
| Figma file | **Biowave DS — Tablet Components** (`_sync/figma-files.json` › `tablet`) |
| Page / section | `↳ Icon Button` › section `Icon Button` |
| Mode | **Create new.** Legacy reference (read only): none in Figma; use the Mobile build as visual reference |
| Plan version | 2 · 2026-10-16 (D-12: own file) |

### D1 Rules for this build

Same as [Web D1](../../../3-web-components/components/button/button.md#d1-rules-for-this-build) (library first, everything bound, no local variables or styles), plus:
- **Typography mode:** on page `↳ Icon Button` set the explicit variable mode **`Tablet`** for `5. Typography (EN)` and `6. Typography (AR)` (`page.setExplicitVariableModeForCollection`). Text styles stay `Web/{en|ar}/…` names; the mode gives the Tablet scale.

### D2 Component structure

As [Web D2–D4](../../../3-web-components/components/icon-button/icon-button.md#d2-component-structure), with these Tablet differences:
- `Size` adds `XL`
- No `Hover` state
- Default instance: `Variant=Text`, `Color=Neutral`, `Size=LG`
- Docs page 09 shows the 48 hit area around `SM`/`MD`

### D3 Layer tree and auto layout

As [Web D3](../../../3-web-components/components/icon-button/icon-button.md#d3-layer-tree-and-auto-layout), with the Tablet differences listed in D2.

### D4 Properties

As [Web D4](../../../3-web-components/components/icon-button/icon-button.md#d4-properties), with the Tablet differences listed in D2.

### D5 Variants to generate

`.Icon Button/Appearance`: 18 × 5 states (no `Hover`) = 90 + selected (`Text`/`Outlined` × 5 colors × 5 states) = 50 → **140**; `Icon Button`: 4 sizes × 3 = **12**.

#### After this build is `Approved`
Report instances of the legacy reference above; move legacy sets to `_Deprecation Ground` in the Foundations file once product files use the Tablet library.

### D6 States, interactions and motion

As Web D6 without hover interactions. Press: smart animate per B4.

### D7 RTL

As Web D7 (`Language=AR` variants where the component has text).

### D8 Documentation pages

All 12 standard pages (`_templates/component.md` D8 + `2-foundations/figma-doc-kit.md` › Page layouts) in section `Icon Button — Documentation` on `↳ Icon Button` in this file, built only from the Doc Kit (Foundations library). Blocked until the Doc Kit exists. 07 Platform: `Doc/Device frame` = Tablet landscape + Tablet portrait. 09 Accessibility: target-size overlay (`target-min` = 48) on `SM`/`MD`.

Component description: one line from A1 + "Spec: 4-tablet-components/components/icon-button/icon-button.md".

### D9 Code Connect

`4-tablet-components/lib/src/components/icon_button/bw_icon_button.figma.dart` — `Icon` → `icon: Icons.*_rounded`, `Selected icon` → `selectedIcon`, `Toggle`/`Selected` → `toggle`/`selected`, `Tooltip label` → `label`, `Variant`/`Color`/`Size` → enums. Publish after code and Figma reviews are both `Approved`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Set on `↳ Icon Button` in the Tablet file; structure and layer names as Web D2–D3 + differences above
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
| 1 | 2026-10-23 | Changes requested | not reviewed |

### E2 Round 1 — 2026-10-23

| Field | Value |
|---|---|
| Plan version reviewed | 1 |
| Spec version reviewed | 1.0 |
| Reviewer | Claude |
| Date | 2026-10-23 |
| Code reviewed | `git diff main...ds/icon-button-tablet` + working tree (clean for this unit at review start) |
| Verdict | **Changes requested** — 1 🔴 (screen readers cannot activate the button), 1 🟡 (goldens required by B9 but not authorised by C5), 3 🟢 nits |
| Evidence | Run by the Reviewer in the `ds/icon-button-tablet` worktree: `npm run docs:check` ✅ · `flutter analyze` ✅ no issues · `flutter test` ✅ 147/147. Semantics probe (throw-away test outside the repo, `BwIconButton(icon: Symbols.edit_rounded, label: 'Edit', onPressed: …)`): node `hasAction(SemanticsAction.tap)` = **false**, `hasAction(SemanticsAction.focus)` = false, `isEnabled` = true; `meetsGuideline(androidTapTargetGuideline)` passes only because no node has a tap action |

#### Acceptance criteria

| AC | Result | Evidence (file:line / test name) |
|---|---|---|
| AC-1 API = B1 (names, defaults, asserts) | ✅ | `bw_icon_button.dart:13-26` params and defaults = B1; asserts `:27-43` (empty label, tonal + neutral/inverse, toggle + filled/tonal, toggle without `selectedIcon`); release fallbacks `:58-72`. Tests "uses the documented defaults and activates", "asserts every invalid combination" |
| AC-2 Tokens only; shared helpers reused | ✅ | `BwButtonStyle.resolve` / `.metrics` `:77-83`, `BwFocusRing` `:112-121`, selected branches `:244-272` = web B3.2 (outlined selected border comes from the shared outlined border, which equals the B3.2 border column); tooltip theme `:201-220` = web B3.4. Tests "state matrix is token-resolved for …" (2 themes × 2 languages), "renders every size from semantic dimensions", "selected states use the specified token branches", "component source contains no raw design values" |
| AC-3 States/transitions; reduced motion | ⚠️ | `BwDuration.sm` / `BwEasing.standard`, `instant` under `context.bw.reduceMotion` `:84-85`, `:138-141`, `:218-219`. Icon swap is a fade-in, not a cross-fade — finding 3 |
| AC-4 RTL and a11y per B5–B6 | ❌ | RTL ✅: `directional: activeIcon.matchTextDirection` `:148`, `AlignmentDirectional`/`EdgeInsetsDirectional`/`BorderRadiusDirectional`; test "directional symbols mirror in RTL and close does not". Label once + toggled ✅ (test "exposes one label and the selected toggle state"); focus ring ✅ ("hardware focus draws the token focus ring"); target ✅ ("keeps sm and md targets at the tablet minimum"). **But** `Semantics(excludeSemantics: true)` at `:232-239` drops the inner `IconButton`'s tap and focus actions — finding 1 |
| AC-5 analyze + test; `npm run sync` | ✅ | analyze and test pass (above); `sync` READY per C8, not re-run (not in this platform's checks) |
| AC-6 Exported; README status | ✅ | `lib/biowave_tablet.dart:14`; README row and header `Code` = `Built` at review start |

#### Rule checks (AGENTS.md §2)

| Rule | Result | Notes |
|---|---|---|
| No generated files edited | ✅ | No `generated/`, `dist/`, contract or HTML shell in the diff |
| No raw values / no primitives | ✅ | Semantic tokens only (`context.bw.*`, `BwSpacing`, `BwRadius`, `BwDuration`, `BwEasing`); guard test |
| Logical properties, RTL icons | ✅ | See AC-4 |
| Light + dark, en + ar tested | ⚠️ | Covered by property assertions; no goldens — finding 2 |
| Accessibility | ❌ | Finding 1 |
| Stayed inside the plan | ✅ | Files = C5 / contract §9 |
| Code matches spec | ❌ | Findings 1, 3 |
| Changelog | ✅ | `CHANGELOG.md` "[Tablet Icon button — implementation] — 2026-10-23"; C8 filled |

#### Findings

| # | Severity | File | Issue | Required change | Owner |
|---|---|---|---|---|---|
| 1 | 🔴 Blocker | `lib/src/components/icon_button/bw_icon_button.dart:232-239` | The outer `Semantics(button: true, label:, …, excludeSemantics: true)` has no `onTap` and removes the inner `IconButton`'s semantics, so the node exposes **no `SemanticsAction.tap`** (and no focus action). TalkBack / VoiceOver double-tap and Switch Access cannot activate any icon button (probe above). BwButton only excludes semantics while loading (`bw_button.dart:203-210`). The tap-target guideline passes vacuously for the same reason | Keep one labelled button node **with** the activation action: e.g. pass `onTap: action` (and `onFocus` if you keep `excludeSemantics`), or merge instead of excluding the inner semantics, keeping the label read once and `toggled` exposed. Extend "exposes one label and the selected toggle state" to assert `SemanticsAction.tap` is present when enabled and absent when `onPressed` is null, and that `tester.semantics.tap(...)` fires `onPressed`; add `meetsGuideline(androidTapTargetGuideline)` + `labeledTapTargetGuideline` for `sm`/`md` (B9) | Implementer |
| 2 | 🟡 Should fix | C5 (contract §9) vs B9 (contract §10) | **Answer to the C8 question:** yes, a Planner finding. B9 requires goldens (every allowed `variant` × `color`, selected and not, at `lg`; every size for `text neutral`; light + dark, en + ar), but C5 lists no golden files, so the Implementer was right not to create them. Button tablet's C5 listed `4-tablet-components/test/goldens/button/  new (generated goldens)` — the same line is missing here | Planner adds `4-tablet-components/test/goldens/icon_button/  new (generated goldens)` to C5 and regenerates the contract; then the Implementer adds the goldens (`flutter test --update-goldens`, real test fonts from `flutter_test_config.dart`) and checks them by eye | Planner |
| 3 | 🟢 Nit | `bw_icon_button.dart:138-143` | `layoutBuilder` returns only `currentChild`, so the outgoing icon is dropped at once and the new one fades in; web B4 asks for a cross-fade | Either keep both children during the switch (and adapt the "one `BwIcon`" test to count after `pumpAndSettle`), or Planner states in B4 that tablet uses fade-in | Implementer |
| 4 | 🟢 Nit | Header row "Source code" | Says `lib/src/components/icon-button/` — not built yet; the folder is `icon_button/` and it is built | Point it at `lib/src/components/icon_button/bw_icon_button.dart` | Planner |
| 5 | 🟢 Nit | C1 | "passes C9" — there is no C9 (tests are C6 / B9) | Say "passes C6 / B9" | Planner |

#### Notes

- Tooltip on tablet is long-press; Flutter's `Tooltip` fade-in is fixed internally, so web B4's `motion-duration-md` show / no-fade under reduced motion cannot be set exactly. Not a finding — the Planner may note it in B4 when touching finding 2.
- Loading keeps the button visually enabled with a no-op action, as BwButton does (B6 "As BwButton").
- Figma build (Part D) not reviewed: `Figma build = Planned`.

#### Next step

Changes requested → after-review gate. Planner: findings 2, 4, 5 (Plan → `Open`, regenerate contract). Then Fixer: findings 1, 3 and the goldens from finding 2.

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

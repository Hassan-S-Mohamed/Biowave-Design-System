# Split button · زر مقسّم — Web

> **One file for Split button on Web:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- web split-button`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Split button · زر مقسّم |
| Summary | Pairs one primary action with a short menu of closely related alternatives. |
| Summary (ar) | يجمع إجراءً أساسياً واحداً مع قائمة قصيرة من البدائل المرتبطة به. |
| Parts | Primary action · menu trigger · menu · menu item |
| Parts (ar) | الإجراء الأساسي · مشغّل القائمة · القائمة · عنصر القائمة |
| Platform | Web · React + MUI |
| Built on | Composition of Biowave `Button` (`primary-action`) + `IconButton` (`menu-trigger`) + MUI `Menu`/`MenuItem` (temporary, until the Menu component on Day 10) |
| Import | `import { SplitButton } from '@biowave/web'` |
| Figma | **Biowave DS — Web Components** › `↳ Split Button` (legacy reference: Foundations `4298:3591`) · build: [Part D](#d--figma-build) |
| Version | 1.1 · 2026-10-21 |
| Plan | Finished |
| Code | Built |
| Figma build | Planned |
| Review | Round 1 · 2026-10-21 · Changes requested |
| Source code | `src/components/split-button/` — not built yet (the Executor creates it) |
| Tokens | — (no component tokens yet) |
| Contracts | [`split-button-contract.md`](split-button-contract.md) · [`figma-split-button-contract.md`](figma-split-button-contract.md) — generated, never edited |
| Docs page | [`split-button.html`](split-button.html) |

## Contents

[A · Guidelines](#a--guidelines) · [B · Spec](#b--spec) · [C · Code plan](#c--code-plan) · [D · Figma build](#d--figma-build) · [E · Review](#e--review) · [F · Changelog](#f--changelog)

---

## A · Guidelines

> What it is and when to use it — designers, PMs. Identical on Web, Tablet and Mobile except **A8** (checked by `npm run docs:check`).

| | |
|---|---|
| Specs | [Web](#b--spec) · [Tablet](../../../4-tablet-components/components/split-button/split-button.md#b--spec) · [Mobile](../../../5-mobile-components/components/split-button/split-button.md#b--spec) |
| Figma | `↳ Split Button` in **Biowave DS — Web Components** · **Tablet Components** · **Mobile Components** (one set per platform file, D-12; keys in `_sync/figma-files.json`) |
| Family | [Button](../button/button.md#a--guidelines) · [Icon button](../icon-button/icon-button.md#a--guidelines) · Split button · [Button group](../button-group/button-group.md#a--guidelines) |
| Version | 1.0 · 2026-10-16 |

### A1 Overview

A split button joins a main action with a menu of related alternatives: "Export" + PDF / Excel / CSV, "Approve" + Approve all / Approve with note. The main part runs the most common choice in one press; the chevron part opens the menu. It is built from a [Button](../button/button.md#a--guidelines) and an [Icon button](../icon-button/icon-button.md#a--guidelines), so it looks and behaves like them.

![Split button — light and dark](assets/overview.png)

### A2 Anatomy

```
  ①
  ┌──────────────────────┐ ┌─────┐
  │ ②[◆]  Export report  │ │ ③[⌄]│      ④ menu (opens below, aligned to the end)
  └──────────────────────┘ └─────┘      ┌────────────────────┐
                         ⑤ gap          │ Export as PDF      │
                                        │ Export as Excel    │
                                        └────────────────────┘
```

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `container` | Yes | Groups the two parts; outer corners rounded, inner corners tight |
| 2 | `primary-action` | Yes | A Button: runs the most common action |
| 3 | `menu-trigger` | Yes | An Icon button with a chevron: opens the menu |
| 4 | `menu` | Yes | The alternatives (Menu component) |
| 5 | `gap` | Yes | Small gap that separates the two hit areas |

### A3 Usage

**When to use**
- One action is clearly the most common, and 2–5 close alternatives exist (export formats, approve variants, save as draft)

**When not to use**
| Situation | Use instead |
|---|---|
| The alternatives are unrelated actions | A Button plus an Icon button "More options" with a menu |
| There is no default action — the user must choose | A Button that opens a menu (dropdown button) |
| Only two actions | Two Buttons in a [Button group](../button-group/button-group.md#a--guidelines) |
| Destructive alternatives | Separate Buttons with confirmation |

### A4 Options

#### 4.1 `variant`
`filled` · `tonal` · `outlined` (same look as [Button A4.1](../button/button.md#41-variant--emphasis)). `text` is not available: without a container the two parts don't read as one control.

#### 4.2 `color`
`brand` (default) · `secondary` · `neutral`. Not `error` (destructive actions don't hide in menus) and not `inverse`.

#### 4.3 `size`
Same as [Button A4.3](../button/button.md#43-size): `sm` · `md` · `lg` · `xl` (touch only).

#### 4.4 `leading-icon`
Optional icon on the `primary-action`, same rule as Button.

**Combination rules**
- `tonal` only with `brand` and `secondary`.
- The menu has 2–5 items; the primary action is **not** repeated in the menu.

### A5 States and behavior

Each part has its own states, the same as [Button A5](../button/button.md#a5-states-and-behavior): hovering or pressing the chevron does not highlight the primary action.
| State | When | What the user sees |
|---|---|---|
| Expanded | Menu open | Chevron rotates; trigger keeps its pressed look until the menu closes |
| Loading | Primary action running | Primary part shows a spinner; trigger is disabled |
| Disabled | Whole control unavailable | Both parts disabled |

**Behavior rules**
- The menu opens below, aligned to the inline end of the control (flips above when there's no room).
- Choosing an item closes the menu and runs it; it does **not** change the primary action.
- Esc or a click outside closes the menu and returns focus to the trigger.

### A6 Content

| Element | Rule | Max length |
|---|---|---|
| `primary-action` | Verb + object, like Button | 3 words |
| menu items | Same verb as the primary action + the difference: "Export as PDF" | 4 words |
| trigger label (not shown) | "More options for {primary label}" | — |

| ✓ EN | ✓ AR | ✗ Avoid |
|---|---|---|
| Export report · Export as PDF | تصدير التقرير · تصدير بصيغة PDF | Export · PDF |
| Approve · Approve with note | موافقة · موافقة مع ملاحظة | Approve · Other |

### A7 Do and don't

| ✓ Do | ✗ Don't |
|---|---|
| ![](assets/do-1.png) Put the most common choice in the primary part | ![](assets/dont-1.png) Repeat the primary action in the menu |
| ![](assets/do-2.png) Keep menu items as variations of the same action | ![](assets/dont-2.png) Mix unrelated actions (Export, Delete, Share) |
| ![](assets/do-3.png) Use one split button per area | ![](assets/dont-3.png) Place a split button next to a filled Button |

### A8 Platform notes — Web

| | Web |
|---|---|
| Default size | `md` |
| Menu | Dropdown menu |
| Interaction | Hover, click, keyboard (arrow keys in menu) |

### A9 Accessibility (design)

- Two separate focus stops: primary action, then trigger.
- The trigger has its own label and announces "collapsed / expanded".
- The menu is fully keyboard operable and returns focus to the trigger when it closes.

### A10 Related components

- [Button](../button/button.md#a--guidelines) and [Icon button](../icon-button/icon-button.md#a--guidelines) — the two parts
- Menu — the list of alternatives (Day 10; a placeholder menu is used until then)
- [Button group](../button-group/button-group.md#a--guidelines) — when two visible buttons are enough

---

## B · Spec

> The contract — API, dimensions, tokens, states, RTL, accessibility. Code and Figma are both reviewed against this part.

### B1 API

#### SplitButton
| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `children` | string | | — | ✓ | `primary-action` label |
| `onClick` | `(e) => void` | | — | ✓ | Runs the primary action |
| `options` | `SplitButtonOption[]` | 2–5 items | — | ✓ | Menu items (below) |
| `variant` | enum | `filled` · `tonal` · `outlined` | `filled` | | A4.1 |
| `color` | enum | `brand` · `secondary` · `neutral` | `brand` | | A4.2 |
| `size` | enum | `sm` · `md` · `lg` | `md` | | A4.3 |
| `startIcon` | `ReactNode` | | — | | On the primary action |
| `loading` · `loadingLabel` | | | `false` | | Primary action loading; trigger disabled meanwhile |
| `disabled` | boolean | | `false` | | Disables both parts |
| `menuLabel` | string | | "More options for {children}" / "خيارات أخرى لـ{children}" | | Trigger accessible name |
| `open` · `onOpenChange` | boolean · `(open) => void` | | uncontrolled | | Optional control of the menu |

`SplitButtonOption = { label: string; onSelect: () => void; icon?: ReactNode; disabled?: boolean }`

**Invalid combinations** (dev warning + fallback):
| Combination | Fallback |
|---|---|
| `variant="tonal"` with `neutral` | `outlined` |
| fewer than 2 or more than 5 `options` | renders, warns |
| an option label equal to `children` | renders, warns "Don't repeat the primary action in the menu" |

### B2 Dimensions

```
  radius-md                    radius-xs │ │ radius-xs          radius-md
  ┌──────────────────────────────────┐   ┌────────┐
  │ [◆]  Export report               │   │  [⌄]   │   both: size-control-height-md
  └──────────────────────────────────┘   └────────┘
                                    ├──┤ spacing-xxs
```

| Part | Property | Value |
|---|---|---|
| `container` | layout · gap | inline-flex · `spacing-xxs` |
| `primary-action` | everything | Button of the same `variant`, `color`, `size` ([Button B2](../button/button.md#b2-dimensions)), except: radius start corners `radius-md`, end corners `radius-xs` |
| `menu-trigger` | everything | IconButton of the same `variant`, `color`, `size` ([Icon button B2](../icon-button/icon-button.md#b2-dimensions)), except: start corners `radius-xs`, end corners `radius-md`; icon `expand_more` |
| `menu` (temporary) | min-width · background · elevation · radius | width of `container` · `color-surface-raised` · `elevation-3` · `radius-lg` |
| `menu` item | height · padding-inline · gap · text style · text color | `size-control-height-md` · `spacing-control-padding-inline-md` · `spacing-control-gap-md` · `body-md` · `color-text-neutral-default` |
| `menu` | offset from container | `spacing-xs` |

### B3 Tokens by part and state

- `primary-action`: [Button B3](../button/button.md#b3-tokens-by-part-and-state) for the same `variant` × `color`.
- `menu-trigger`: [Icon button B3.1](../icon-button/icon-button.md#31-unselected); **Expanded** = its Pressed tokens.
- `menu` item: hover `color-overlay-hover`, pressed `color-overlay-pressed`, focus (keyboard) `color-overlay-hover` + `color-border-focus` inner ring, disabled `color-text-neutral-disabled`; icon `color-icon-neutral-subtle`.

### B4 States and transitions

Each part: [Button B4](../button/button.md#b4-states-and-transitions). Plus:
| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Collapsed → Expanded | trigger click · Enter · Space · ArrowDown/Up | chevron rotates half a turn; menu fades + scales in from the top-end | `motion-duration-md` | `motion-easing-standard-decelerate` |
| Expanded → Collapsed | item chosen · Esc · click outside · Tab | chevron back; menu fades out | `motion-duration-sm` | `motion-easing-standard-accelerate` |

Reduced motion: instant (no rotation animation; chevron still shows its final direction).

### B5 RTL

```
LTR  │ [◆] Export report │ │ [⌄] │        menu aligned to the inline end
RTL  │ [⌄] │ │ تصدير التقرير [◆] │
```
| Part | In RTL |
|---|---|
| layout, corner radii | Mirror (logical `border-start-start-radius` … ) |
| `expand_more` chevron | Does not mirror (points down) |
| `menu` | Anchored `bottom-end` (logical), so it opens toward the inline start. The physical side is chosen from the text direction: the menu's end edge lines up with the container's end edge (right in LTR, left in RTL) and it scales in from its top-end corner |

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Structure | `<div role="group" aria-label={children}>` containing two buttons |
| Trigger | `aria-label={menuLabel}`, `aria-haspopup="menu"`, `aria-expanded`; `aria-controls={menuId}` **only while the menu is open** (the menu is not in the DOM when closed, so the attribute is left off then) |
| Menu | `role="menu"`, items `role="menuitem"`; focus moves into the menu on open, returns to the trigger on close |
| Loading | Primary as Button B6; trigger `disabled` while loading |
| Focus ring | Per part, as Button B6 |

| Key (focus on trigger) | Action |
|---|---|
| Enter / Space / ArrowDown | Open, focus first item |
| ArrowUp | Open, focus last item |

| Key (focus in menu) | Action |
|---|---|
| ArrowDown / ArrowUp | Next / previous item (wraps) |
| Home / End | First / last item |
| Enter / Space | Choose item, close, run `onSelect` |
| Esc | Close, focus trigger |
| Tab | Close, move focus on |

### B7 Examples

```tsx
<SplitButton
  onClick={() => exportReport('pdf')}
  options={[
    { label: 'Export as Excel', onSelect: () => exportReport('xlsx') },
    { label: 'Export as CSV', onSelect: () => exportReport('csv') },
  ]}
>Export report</SplitButton>

// Arabic
<SplitButton onClick={approve} options={[{ label: 'موافقة مع ملاحظة', onSelect: approveWithNote }]}>موافقة</SplitButton>
```

### B8 Figma

Structure, properties, the Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

- [ ] Every allowed `variant` × `color` × `size`, light + dark, en + ar; inner/outer radii correct in both directions
- [ ] Two focus stops; trigger `aria-expanded` toggles; menu keyboard table B6 fully
- [ ] Choosing an item runs `onSelect` once, closes, returns focus
- [ ] Loading disables the trigger and keeps focus on the primary action
- [ ] Invalid combinations warn
- [ ] axe passes (open and closed); no raw values

---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `split-button-contract.md`.

> Executor: read `AGENTS.md`, `3-web-components/README.md`, this file and the spec [Part B](#b--spec).

| Field | Value |
|---|---|
| Component | Split button |
| Platform | Web (React + MUI) |
| Depends on | Button and Icon button (web) **Built**; the shared per-test speedy Emotion cache from `ds/button-web` (PR #1), now on `main` and merged into this branch |
| Plan version | 1.1 · 2026-10-21 |

### C1 Goal

`SplitButton` composes the real `Button` and `IconButton` (no re-styling) and a temporary MUI menu, and meets B1–B6, B9.

### C2 Scope

In: B1–B6, B9; plan 1.1: the Review round 1 fixes in the Fix round 1 task list (C7). Out: the Menu component (Day 10) — when it exists, swap `SplitButtonMenu` for it (leave `// TODO(menu)`); any change to the shared test tooling (`src/test/*`, `vitest.config.ts`).

### C3 Approach

- Render `Button` and `IconButton` with the same `variant`/`color`/`size`. Add an **internal** (not exported) `segment?: 'start' | 'end'` prop to both that sets the logical corner radii from B2. Document it as internal in their JSDoc; do not add it to their public spec.
- Menu: `SplitButtonMenu.tsx` (private) wraps MUI `Menu` + `MenuItem`, anchored to the container, styled from B2–B3 tokens.
- **Menu side (B5; plan 1.1, finding 6).** MUI flips only its **default** `anchorOrigin`/`transformOrigin` in RTL; origins passed in are used as physical sides unchanged (`Menu.js`, `Popover.js` `getOffsetLeft`). So choose the side from the text direction (`theme.direction` / the provider's RTL flag): `end = isRtl ? 'left' : 'right'`; `anchorOrigin = { vertical: 'bottom', horizontal: end }`, `transformOrigin = { vertical: 'top', horizontal: end }`. Never pass a fixed `'right'` or `'left'`.
- Ids: `useId()` for the menu id. `aria-controls` is set on the trigger only while the menu is open (B6; plan 1.1, finding 7).
- **Test tooling (plan 1.1, finding 2).** The shared per-test speedy Emotion cache from `ds/button-web` (PR #1; [Button C3 › Test tooling](../button/button.md#c3-approach)) is now on `main` and merged into this branch: `renderWithBiowave` creates a speedy cache pair per test and `src/test/setup.ts` calls `resetTestEmotionCaches()` after `cleanup()`. Split button tests render only through `renderWithBiowave`, create no emotion cache or `BiowaveProvider` of their own, and use the default 5 s timeout — drop the raised timeouts. Do not edit `src/test/*` or `vitest.config.ts`.

### C4 Token gaps

None.

### C5 Files to create / change

```
3-web-components/src/components/split-button/SplitButton.tsx       new
3-web-components/src/components/split-button/SplitButtonMenu.tsx   new (private)
3-web-components/src/components/split-button/SplitButton.test.tsx  new
3-web-components/src/components/split-button/index.ts              new
3-web-components/src/components/button/Button.tsx                  change: internal `segment` prop
3-web-components/src/components/icon-button/IconButton.tsx         change: internal `segment` prop
3-web-components/src/index.ts                                      change: export SplitButton
3-web-components/README.md                                         change: status row
```

### C6 Tests

B9, plus: Button and IconButton tests still pass unchanged.
- [ ] (1.1) `ar` menu side (finding 1): in `ar` the menu origins (or the Paper `transform-origin`) are inline-end — physical `left` — and in `en` physical `right`
- [ ] (1.1) B4 close transition (finding 3): emitted rules show the chevron and the menu opening with `motion-duration-md` + `motion-easing-standard-decelerate` and closing with `motion-duration-sm` + `motion-easing-standard-accelerate`
- [ ] (1.1) Trigger keys (finding 4): Enter, Space and ArrowDown each open the menu and focus the first item; Space on an item chooses it, closes the menu and runs `onSelect` once
- [ ] (1.1) Loading (finding 4): while `loading`, the trigger is disabled and focus stays on the primary action
- [ ] (1.1) `ar` label (finding 4): the default `menuLabel` is "خيارات أخرى لـ{children}"
- [ ] (1.1) Radii (finding 4): per corner — `start` segment start corners `radius-md`, end corners `radius-xs`; `end` segment the reverse — for every allowed `variant`
- [ ] (1.1) axe (finding 4): open and closed, in `en` and `ar`
- [ ] (1.1) `aria-controls` (finding 7): absent while closed; while open it equals the menu's `id`
- [ ] (1.1) No per-test timeout arguments in `SplitButton.test.tsx` (finding 5); every Split button test passes under the 5 s default in the full suite

### C7 Acceptance criteria

- [ ] AC-1 API = B1
- [ ] AC-2 Parts are real `Button`/`IconButton` instances; only radii differ (no copied styles)
- [ ] AC-3 Transitions B4
- [ ] AC-4 RTL B5; a11y B6 (menu keyboard complete)
- [ ] AC-5 typecheck, tests, sync pass
- [ ] AC-6 Exported; README status updated
- [ ] AC-7 (plan 1.1) Review round 1 findings #1–#5 and #8 fixed as the task list below; `npm run test:web` **as configured** (full suite) passes with the default 5 s timeout, no `testTimeout` / `fileParallelism` change
- [ ] AC-8 (plan 1.1) C8 gets a **Fix round 1** entry with every command and real numbers (`npm run typecheck`, `npm run test:web` passed/total + duration, `npm run docs:check`, `npm run sync`), the slowest Split button test times, and Deviations that list "`aria-controls` only while open" (#7); header `Code` set to `Built`; `3-web-components/README.md` table matches

**Fix round 1 — Executor task list** (one list; nothing else is in scope):
1. #1 Menu side from the text direction — C3 › Menu side. File: `3-web-components/src/components/split-button/SplitButtonMenu.tsx` + an `ar` test (C6)
2. #2 Use the shared per-test speedy Emotion cache — C3 › Test tooling. Nothing to build in `src/test/*` (already on this branch); `SplitButton.test.tsx` renders only through `renderWithBiowave`. `npm run test:web` must pass in the full suite
3. #3 B4 close transition: open/closed-specific duration + easing on the chevron; the Paper transition per enter/exit with the B4 duration and easing tokens (drop the blanket `!important` duration). Files: `SplitButton.tsx`, `SplitButtonMenu.tsx` + test (C6)
4. #4 Missing tests (C6 items marked 1.1: trigger keys, Space to choose, loading focus, `ar` label and menu side, per-corner radii for every variant, axe open + closed in `en` and `ar`). File: `SplitButton.test.tsx`
5. #5 Remove the raised timeouts at `SplitButton.test.tsx:93` (30 s) and `:272` (20 s); default timeouts only
6. #8 Replace the outdated C8 `docs:check` question with the current result; C8 **Fix round 1** entry (AC-8), with #7 under Deviations; one `CHANGELOG.md` entry

Files the Executor may touch in this fix round: `3-web-components/src/components/split-button/SplitButton.tsx`, `SplitButtonMenu.tsx`, `SplitButton.test.tsx`, C8 of this file, the header `Code` field, the `3-web-components/README.md` table row and `CHANGELOG.md`. Nothing else.

---

### C8 Execution log (filled by the Executor)

| Field | Value |
|---|---|
| Agent | Codex |
| Date | 2026-10-18 |
| Files changed | `src/components/split-button/SplitButton.tsx`, `SplitButtonMenu.tsx`, `SplitButton.test.tsx`, `index.ts`; internal segment support in Button and IconButton; package `src/index.ts`; Web components README |

**Deviations:** none
**Questions for the Planner:** none — the outdated `docs:check` blocker was cleared; the current check passes.

#### Fix round 1 — 2026-10-21

| Finding | What changed (`file:line`) | Test that proves it |
|---|---|---|
| #1 | `SplitButtonMenu.tsx:89-90,111-112` derives the physical end from `theme.direction` for both menu origins. | `uses the localized label and physical inline-end origin in en/ar` verifies right in English and left in Arabic. |
| #2 | `SplitButton.test.tsx:11` renders only through the shared `renderWithBiowave` speedy cache; no test-tooling file changed. | Three configured full-suite runs passed 97/97. |
| #3 | `SplitButton.tsx:47-55` gives the chevron open/close-specific motion; `SplitButtonMenu.tsx:113-135` gives Grow enter/exit durations and easings without a blanket Paper override. | `emits the specified open and close motion for the chevron and menu`. |
| #4 | `SplitButton.test.tsx:95-124,133-317,320-341,363-389` covers per-corner radii, Enter/Space/ArrowDown, Space selection, loading focus, localized labels/origins, and open/closed axe in both themes and languages. | Split button suite passed 19/19; the named cases cover every requested B9/B6 gap. |
| #5 | Removed both raised per-test timeouts; `SplitButton.test.tsx` uses Vitest's default timeout throughout. | Split button suite passed 19/19 and all three full-suite runs passed under the configured default. |
| #7 | Logged the planned `aria-controls` behavior under Deviations below. | `opens from the trigger, focuses the first item, chooses once, and restores focus` verifies absence while closed, the open menu id while expanded, and removal after close. |
| #8 | Replaced the outdated C8 `docs:check` question with the current passing result and recorded this fix round. | `npm run docs:check` passed. |

**Checks:** `npm run sync` ✓ READY; `npm run component-tokens` ✓ web/tablet/mobile; `npm run docs:check` ✓ 18 component files; `npm run typecheck` ✓; `npm run test:web` ✓ 97/97 in 6.18 s, ✓ 97/97 in 6.21 s, ✓ 97/97 in 5.79 s. Slowest Split button tests: render matrix 1.015 s / 1.136 s / 1.111 s; logical-corner matrix 337 ms / 301 ms / 311 ms.

**Deviations:** `aria-controls` is present only while the menu is open, matching plan 1.1 and avoiding a reference to an unmounted menu.
**Questions for the Planner:** none.

---

## D · Figma build

> How to build Part B in Figma. The Figma Agent receives this through the generated `figma-split-button-contract.md`.

> Executed by the **Figma Agent**. Values from the spec [Part B](#b--spec); never written here. **One file per platform (D-12)**: builds the Web set in **Biowave DS — Web Components**.

| Field | Value |
|---|---|
| Component | Split button |
| Figma file | **Biowave DS — Web Components** (`_sync/figma-files.json` › `web`) |
| Page / section | `↳ Split Button` |
| Mode | **Create new.** Legacy reference (read only): Foundations file › `↳ Split Button` › `Split Button/EN` `4298:3591`, `Split Button/AR` `4298:3881` |
| Depends on | Button and Icon button (Web) `Built` in the same file |
| Plan version | 1 · 2026-10-16 |

### D1 Rules for this build

Same as [Button D1](../button/button.md#d1-rules-for-this-build). The two parts **must be instances** of `Button` and `Icon Button` (rule 6), with only their corner radii overridden (bound to `radius/xs` on the inner corners).

### D2 Component structure

```
❖ Split Button         ← published set
   contains instances of ❖ Button and ❖ Icon Button — no own drawing
```

### D3 Layer tree and auto layout

```
Split Button            ↔ horizontal · gap spacing/xxs · hug
├── primary-action      ◇ Button instance · Variant/Color/Size/Language follow the set · inner corners radius/xs · exposed: Label, Leading icon, Leading icon glyph
└── menu-trigger        ◇ Icon Button instance · same Variant/Color/Size · inner corners radius/xs · Icon = expand_more · Tooltip label = "More options"
```

**Icons used:** `expand_more` — menu trigger chevron, Google · Material Symbols Rounded (D-18)

### D4 Properties

| Figma property | Type | Values | Default | Code prop (web) |
|---|---|---|---|---|
| `Variant` | VARIANT | `Filled` · `Tonal` · `Outlined` | `Filled` | `variant` |
| `Color` | VARIANT | `Brand` · `Secondary` · `Neutral` | `Brand` | `color` |
| `Size` | VARIANT | `SM` · `MD` · `LG` | `MD` | `size` |
| `State` | VARIANT | `Default` · `Primary hover` · `Primary pressed` · `Trigger hover` · `Expanded` · `Focused primary` · `Focused trigger` · `Disabled` · `Loading` | `Default` | `disabled` / `loading`; others interaction only |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — |
| `Label` | TEXT (nested, exposed) | | `Export report` | `children` |
| `Leading icon` · `Leading icon glyph` | BOOLEAN · INSTANCE_SWAP (nested, exposed) | | `false` | `startIcon` |

### D5 Variants to generate

Allowed `Variant × Color`: Filled/Outlined × 3 + Tonal × 2 = 8 × 3 sizes × 9 states × 2 languages = **432**.

#### Legacy mapping (legacy sets are not edited)
| Legacy | New |
|---|---|
| `Type` Brand · Secondary · Neutral · Default | `Color` Brand · Secondary · Neutral (`Default` ≈ `Neutral`, report) |
| `Type` Success · Error · Warning · Info | removed |
| `State=Ghost` | `Variant=Outlined` (verify visually) |
| `Show Menu Buttons` + embedded menu | removed (Menu component) |
| `Size` SM · M · XL | `SM` · `MD` · `LG` |
| `/EN` · `/AR` sets | `Language` EN · AR |

#### After `Approved`
Report instances of `4298:3591` / `4298:3881` in the Foundations file; move them to `_Deprecation Ground` once product files use the new library.

### D6 States, interactions and motion

Primary part hover/press, trigger hover/press as their own components. On click trigger → `Expanded` (smart animate `motion-duration-md`, chevron rotation). A docs-only prototype frame shows the open menu using a placeholder list until Menu exists.

### D7 RTL

`Language=AR`: reverse order (trigger first in the auto layout), inner/outer radii swap sides, Arabic label. Chevron not mirrored.

### D8 Documentation pages

12 standard pages in `Split Button — Documentation`; blocked until the Doc Kit. 05 Usage: "don't repeat the primary action" pair. 09 Accessibility: two focus stops, keyboard table.

Component description: "Main action plus a menu of related alternatives. Spec: 3-web-components/components/split-button/split-button.md".

### D9 Code Connect

`3-web-components/src/components/split-button/SplitButton.figma.tsx` — mapping D4; `options` documented as an example array.

### D10 Acceptance criteria

- [ ] F-AC-1 Parts are instances of Button / Icon Button (no detached or drawn parts)
- [ ] F-AC-2 Properties D4 exactly; F-AC-3 432 variants
- [ ] F-AC-4 Zero raw values; F-AC-5 Light/Dark by mode
- [ ] F-AC-6 AR per D7; F-AC-7 zero local variables/styles; legacy mapping in the review
- [ ] F-AC-8 Docs built or reported blocked

---

### D11 Execution log (filled by the Figma Agent)

| Field | Value |
|---|---|
| Agent / stages run | |
| Date | |
| Node IDs | |

**Deviations:** none
**Questions for the Planner:** none

---

## E · Review

> One block per review round, newest first.

### E1 Summary

| Round | Date | Code verdict | Figma verdict |
|---|---|---|---|
| 1 | 2026-10-21 | **Changes requested** | not reviewed |

### E2 Round 1 — 2026-10-21

| Field | Value |
|---|---|
| Plan version reviewed | 1 |
| Spec version reviewed | 1.0 |
| Reviewer | Claude |
| Date | 2026-10-21 |
| Verdict | **Changes requested** |

Commands run by the Reviewer on branch `ds/split-button-web` (= `main` at `daf7ac9`; `git diff main...HEAD` is empty, so the unit was reviewed as it is on `main`):
`npm run typecheck` ✅ · `npm run sync` ✅ READY (exit 0) · `npm run test:web` ❌ **81/87** (6 failed: 4 Split button, 2 Button axe) · `npx vitest run src/components/split-button` alone ✅ 11/11 in 39 s · `npm run docs:check` ❌ 2 errors, both pre-existing and outside this unit (tablet + mobile `button-group` Figma contracts stale — same state accepted in the tablet Icon round 2).

The code composes the real Button and IconButton correctly and the keyboard model is complete, but the menu is anchored with physical sides (wrong in Arabic), the B4 close transition is not implemented, and the tests fail in the full suite because they still rely on raised timeouts.

#### Acceptance criteria

| AC | Result | Evidence (file:line / test name) |
|---|---|---|
| AC-1 API = B1 | ✅ | `SplitButton.tsx:20-35` (props, `SplitButtonOption` = `SplitButtonMenu.tsx:7-12`), defaults `:59-65`, localized `menuLabel` `:84-86`, all three fallbacks + `warnOnce` `:111-128`; test *warns for invalid variant, option count, and repeated primary action* |
| AC-2 Real `Button`/`IconButton`, only radii differ | ✅ | `SplitButton.tsx:138-173` render `InternalButton` / `InternalIconButton` with the same `variant`/`color`/`size`; `Button.tsx:46-49, 86-90` and `IconButton.tsx:46-48, 84-88` add only logical corner radii; internal aliases `Button.tsx:352-353` not exported from `src/index.ts` |
| AC-3 Transitions B4 | ❌ | Expanded → Collapsed uses `motion-duration-md` + decelerate for the chevron and `md` for the menu; easing tokens not applied to the menu (finding 3) |
| AC-4 RTL B5; a11y B6 | ❌ | Corners mirror ✅ (logical props), chevron not mirrored ✅. Menu anchored with physical `right` → wrong side in `ar` (finding 1). Keyboard B6 ✅: tests *opens from the trigger…*, *implements Arrow, Home, End, Escape, and ArrowUp-open…*, *closes on Tab…*; `role="group"` + `aria-label` `:135-136`; `aria-haspopup`/`aria-expanded` `:160-161` |
| AC-5 typecheck, tests, sync pass | ❌ | typecheck ✅, sync ✅; `test:web` 81/87 — split-button keyboard tests time out at 5 s, axe tests at their raised 20 s (finding 2) |
| AC-6 Exported; README status | ✅ | `src/index.ts:38-44`; `3-web-components/README.md:50` Code = Built |

#### Rule checks (AGENTS.md §2)

| Rule | Result | Notes |
|---|---|---|
| No generated files edited | ✅ | `git status` clean apart from the run folder |
| No raw values / no primitives | ✅ | Only `cssVars.*`, `base.motion.duration.*`, `biowaveVariants.bodyMd`; test *contains no raw colors, dimensions, durations, or font names* |
| RTL first (logical properties) | ❌ | Radii, `marginBlockStart`, `paddingInline`, `minInlineSize` ✅. Menu `anchorOrigin`/`transformOrigin` use physical `right` (finding 1) |
| Both themes, both languages, tested | ⚠️ | Render test covers all combos; axe, keyboard and menu tests run only in `en`; no `ar` test of the menu or the default `menuLabel` (finding 4) |
| Accessibility WCAG 2.2 AA | ✅ | Keyboard, labels, focus return, trigger disabled while loading, inner focus ring on items (`SplitButtonMenu.tsx:57-61`). Reduced motion: CSS durations are zeroed by `tokens.css:843-845` |
| Biowave `Icon` (D-18), no `@mui/icons-material` | ✅ | `SplitButton.tsx:153` `<Icon name="expand_more" />`; guard `src/test/noLegacyIcons.test.ts` passes |
| Stayed inside the contract | ✅ | Files match C5. `TODO(menu)` present (`SplitButtonMenu.tsx:80`) |
| Changelog | ✅ | `CHANGELOG.md` › *Web Button family — Icon button, Split button, Button group built* (2026-10-18) |
| Tests use default timeouts (shared speedy Emotion cache) | ❌ | `SplitButton.test.tsx:93` `30_000`, `:272` `20_000`. The shared per-test speedy cache (Button fix `e8dc43b`) is only on `ds/button-web`, not on `main` (finding 2) |

#### Figma build (Part D)

Skipped — Figma build is `Planned`.

#### Probe evidence

```
SplitButtonMenu.tsx:110-111  anchorOrigin/transformOrigin { horizontal: 'right' }
node_modules/@mui/material/Menu/Menu.js:156-160  only the DEFAULT origins flip with isRtl; explicit props are passed to Popover unchanged
node_modules/@mui/material/Popover/Popover.js:45-55  getOffsetLeft('right') = physical right edge
→ in ar the menu's right edge sits under the primary action (inline start) and scales from the top-right (inline start), not bottom-end.

test:web (full suite)   × SplitButton menu > implements Arrow, Home, End…   Test timed out in 5000ms
                        × SplitButton menu > closes on Tab…                  Test timed out in 5000ms
                        × SplitButton accessibility > … light                Test timed out in 20000ms
                        × SplitButton accessibility > … dark                 Axe is already running
                        × Button accessibility … light / dark                (same cause, Button on main)
vitest split-button only ✓ 11/11 — keyboard test 4.7 s (limit 5 s), axe 9.0 s each
```

#### Findings

| # | Severity | File | Issue | Required change | Owner |
|---|---|---|---|---|---|
| 1 | 🔴 Blocker | `SplitButtonMenu.tsx:110-111` | `anchorOrigin` and `transformOrigin` use physical `horizontal: 'right'`. MUI flips only its default origins in RTL (`Menu.js:156-160`), so in Arabic the menu aligns to the inline **start** and scales from the inline start. B5 requires `bottom-end` (logical) | Pick the side from the direction (`useRtl()` / `theme.direction`): `horizontal: isRtl ? 'left' : 'right'` for both origins. Add an `ar` test that asserts the origins (or the Paper `transform-origin`) are inline-end | Executor |
| 2 | 🔴 Blocker | `SplitButton.test.tsx` (whole file) | `npm run test:web` fails 81/87 in the full suite: 4 Split button tests time out (keyboard at the 5 s default, axe at its raised 20 s, then "Axe is already running"). Same root cause as Button R2: non-speedy Emotion cache per test. The fix (`e8dc43b`, shared per-test speedy cache) exists only on `ds/button-web` | After `ds/button-web` is merged to `main`, update this branch and use the shared cache in these tests. `test:web` must pass in the full suite | Executor |
| 3 | 🟡 Should fix | `SplitButton.tsx:47-50` · `SplitButtonMenu.tsx:34, 110-115` | B4 not met for Expanded → Collapsed: the chevron uses `motion-duration-md` + `standard-decelerate` both ways (should close with `sm` + `standard-accelerate`); the Paper rule `transitionDuration: md !important` overrides the `exit: sm` timeout, so the menu also closes at `md`; the menu never uses the `motion-easing-standard-*` tokens (MUI Grow default easing) | Use open/closed-specific duration + easing on the chevron; set the Paper transition per enter/exit with the B4 duration and easing tokens (drop the blanket `!important` duration). Add a test asserting the emitted rules | Executor |
| 4 | 🟡 Should fix | `SplitButton.test.tsx:95-116, 126-211, 253-274` | B9/B6 gaps: no test for trigger Enter / Space / ArrowDown opening; no Space to choose an item; no test that loading keeps focus on the primary action; no `ar` test of the default `menuLabel` or of menu placement (missed finding 1); the radii test only checks that `radius-md`/`radius-xs` appear somewhere, not which corner gets which, for one variant only; axe only in `en` | Add these tests; assert per-corner radii for `start`/`end` segments for every variant; run axe open + closed in `en` and `ar` | Executor |
| 5 | 🟡 Should fix | `SplitButton.test.tsx:93, 272` | Tests still raise their own timeouts (`30_000`, `20_000`). Button removed these in R2 #11 | Remove the raised timeouts once finding 2 is done; default timeouts only | Executor |
| 6 | 🟢 Nit | C3 | C3 says MUI flips `anchorOrigin`/`transformOrigin` under RTL. It does not for explicitly passed origins — this led to finding 1 | Correct C3: compute the horizontal origin from the direction | Planner |
| 7 | 🟢 Nit | `SplitButton.tsx:162` · B6 | `aria-controls` is set only while open; B6 says always `aria-controls={menuId}`. The code is the better choice (the menu is not in the DOM when closed), but it is an unlogged deviation | Planner records "`aria-controls` only while open" in B6; Executor lists it under C8 Deviations | Planner |
| 8 | 🟢 Nit | C8 | C8 question about `docs:check` is outdated (Doc Kit 1.2 contracts are now current; only the tablet/mobile `button-group` Figma contracts are stale) | Update C8 in the fix round | Executor |

#### Next step

- Changes requested → Planner fixes C3 (#6) and B6 (#7), sets Plan `Finished`, regenerates the contract.
- Executor fixes 🔴 1–2 and 🟡 3–5, nits 7–8 (C8), adds a **Fix round 1** entry in C8, sets Code `Built`. Finding 2 depends on `ds/button-web` being merged to `main` first.

---


## F · Changelog

> Changes to this component on this platform.

### F0 Changes from previous version

1.1 — the menu opens at the inline end in both directions (side chosen from the text direction, B5); the trigger's `aria-controls` is set only while the menu is open (B6). No API change.

1.0 — initial Web implementation: real Button and IconButton segments, tokenized temporary MUI menu, controlled/uncontrolled open state, complete keyboard navigation, RTL logical corners, public exports and contract tests. No API change from the initial spec.

### F1 Guidelines changelog

| Version | Date | Change | Migration | Author |
|---|---|---|---|---|
| 1.0 | 2026-10-16 | Initial. Re-models the Figma `Split Button/EN·AR` sets | `Type` (colors) → `color` brand/secondary/neutral · `State=Ghost` → `variant=outlined` · `Show Menu Buttons` removed (menu is a separate component) · two sets → one with `Language` | Planner (Claude) |

### F2 Spec changelog

| Version | Date | Change | Breaking | Migration |
|---|---|---|---|---|
| 1.0 | 2026-10-16 | Initial | No | — |
| 1.1 · plan 1.1 | 2026-10-21 | Review round 1 Planner items: B5 menu side chosen from the text direction, `bottom-end` logical (#6, C3 corrected — MUI flips only default origins); B6 `aria-controls` only while open (#7). C3 records the shared speedy Emotion test cache (now on `main`); C6 tests and C7 AC-7/8 + Fix round 1 task list for Executor findings #1–#5, #8 | No | — |

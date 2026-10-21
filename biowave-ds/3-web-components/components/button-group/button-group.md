# Button group · مجموعة أزرار — Web

> **One file for Button group on Web:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- web button-group`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Button group · مجموعة أزرار |
| Summary | Arranges related actions with predictable priority, alignment, overflow, and responsive stacking. |
| Summary (ar) | يرتّب الإجراءات المرتبطة بأولوية ومحاذاة وتدفّق وتكديس متجاوب يمكن توقّعه. |
| Parts | Group · children · overflow trigger · overflow menu |
| Parts (ar) | المجموعة · العناصر · مشغّل الخيارات الإضافية · قائمة الخيارات |
| Platform | Web · React + MUI |
| Built on | Custom layout (`div` flex). **Not** MUI `ButtonGroup` (that is a connected control). Overflow uses `IconButton` + the temporary menu from Split button |
| Import | `import { ButtonGroup } from '@biowave/web'` |
| Figma | **Biowave DS — Web Components** › `↳ Button Group` (legacy reference: Foundations `4833:35916`) · build: [Part D](#d--figma-build) |
| Version | 1.2 · 2026-10-21 |
| Plan | Finished |
| Code | Built |
| Figma build | Planned |
| Review | Round 2 · 2026-10-21 · Changes requested |
| Source code | [`src/components/button-group/`](../../src/components/button-group/) |
| Tokens | — (no component tokens yet) |
| Contracts | [`button-group-contract.md`](button-group-contract.md) · [`figma-button-group-contract.md`](figma-button-group-contract.md) — generated, never edited |
| Docs page | [`button-group.html`](button-group.html) |

## Contents

[A · Guidelines](#a--guidelines) · [B · Spec](#b--spec) · [C · Code plan](#c--code-plan) · [D · Figma build](#d--figma-build) · [E · Review](#e--review) · [F · Changelog](#f--changelog)

---

## A · Guidelines

> What it is and when to use it — designers, PMs. Identical on Web, Tablet and Mobile except **A8** (checked by `npm run docs:check`).

| | |
|---|---|
| Specs | [Web](#b--spec) · [Tablet](../../../4-tablet-components/components/button-group/button-group.md#b--spec) · [Mobile](../../../5-mobile-components/components/button-group/button-group.md#b--spec) |
| Figma | `↳ Button Group` in **Biowave DS — Web Components** · **Tablet Components** · **Mobile Components** (one set per platform file, D-12; keys in `_sync/figma-files.json`) |
| Family | [Button](../button/button.md#a--guidelines) · [Icon button](../icon-button/icon-button.md#a--guidelines) · [Split button](../split-button/split-button.md#a--guidelines) · Button group |
| Version | 1.1 · 2026-10-21 |

### A1 Overview

A button group arranges 2–4 related actions — the footer of a dialog, form or card, a page header's actions — with the same size, spacing, order and alignment everywhere. It is a **layout**, not a control: each action keeps its own look and focus. A connected control where one option is selected is a Segmented button, not a button group.

![Button group — light and dark](assets/overview.png)

### A2 Anatomy

```
Horizontal, end-aligned (web dialog footer)
① ┌──────────────────────────────────────────────────────────┐
  │             ④[─ Cancel ─]  ③[■■ Save changes ■■]         │
  └──────────────────────────────────────────────────────────┘
                     ├──┤ ② gap

Vertical, fill (mobile screen bottom)
  ┌─────────────────────────┐
  │ ③[■■■■ Clock in ■■■■■■] │
  │ ④[────── Cancel ──────] │
  └─────────────────────────┘
```

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `container` | Yes | Lays out the actions |
| 2 | `gap` | Yes | Space between actions |
| 3 | `primary-action` | No | The one filled Button, if the group has one |
| 4 | `secondary-actions` | Yes | Other Buttons, Icon buttons or a Link |
| — | `overflow-trigger` | No | "More options" Icon button holding actions beyond the visible limit |

### A3 Usage

**When to use**
- Dialog, sheet and form footers
- Page and card header actions
- Any place with 2–4 actions that belong together

**When not to use**
| Situation | Use instead |
|---|---|
| A single action | [Button](../button/button.md#a--guidelines) on its own |
| Selecting one option | Segmented button |
| One main action with variants | [Split button](../split-button/split-button.md#a--guidelines) |
| Toolbar of many icon actions | Toolbar (later) or Icon buttons in a row |

### A4 Options

#### 4.1 `orientation`
| Value | Looks like | Pick it when |
|---|---|---|
| `horizontal` | `[── A ──] [■ B ■]` | Default on web and tablet |
| `vertical` | stacked, full width | Default on mobile; narrow sheets and side panels |

#### 4.2 `align` (horizontal)
| Value | Pick it when |
|---|---|
| `end` | **Default.** Dialog and form footers, page header actions |
| `start` | Inline with content (under a form section, in a card body) |
| `center` | Empty states, confirmation screens |
| `space-between` | One action at each end (Back … Next) in wizards |
| `fill` | Actions share the width equally (mobile, narrow dialogs) |

#### 4.3 `size`
One size for all actions in the group (`sm` · `md` · `lg` · `xl`), same scale as [Button A4.3](../button/button.md#43-size).

#### 4.4 Overflow
More than the visible limit (web 3, touch 2) → the rest go into an `overflow-trigger` menu.
- Actions that must stay on screen — the primary action, a link, an action that submits a form — always stay visible and use up the visible slots first
- The other actions fill the slots that are left; the least important (first in reading order) go into the menu first
- The group shows more actions than the limit only when the must-stay actions alone are more than the limit

**Combination rules**
- At most one `filled` Button, and it is the primary action.
- Don't mix sizes inside a group.
- `space-between` takes exactly two actions or two sub-groups.

### A5 States and behavior

The group has no states of its own; each action keeps its states.

**Order rules**
- Horizontal: the primary action is at the **inline end** (right in English, left in Arabic). Secondary actions come before it.
- Vertical: the primary action is on **top**.
- Focus and screen reader order are the same in both: secondary first, primary last. Write the actions in that order; the layout places them.
- When there isn't room for a horizontal group (narrow window, long Arabic labels), it stacks vertically (touch platforms do this automatically).

### A6 Content

Labels follow [Button A6](../button/button.md#a6-content). In a pair, the secondary is "Cancel" / "إلغاء" or "Back" / "رجوع"; the primary names the outcome.

| ✓ EN | ✓ AR |
|---|---|
| Cancel · Save changes | إلغاء · حفظ التغييرات |
| Back · Next | رجوع · التالي |
| Reject · Approve | رفض · موافقة |

### A7 Do and don't

| ✓ Do | ✗ Don't |
|---|---|
| ![](assets/do-1.png) Put the primary action at the inline end (top when stacked) | ![](assets/dont-1.png) Put the primary action first in a horizontal footer |
| ![](assets/do-2.png) Keep one filled Button per group | ![](assets/dont-2.png) Use two filled Buttons |
| ![](assets/do-3.png) Move extra actions into "More options" | ![](assets/dont-3.png) Show five buttons in a row |
| ![](assets/do-4.png) Use the same size for every action | ![](assets/dont-4.png) Mix `sm` and `lg` buttons |

### A8 Platform notes — Web

```
Web / Tablet                                  Mobile
┌───────────────────────────────────────┐     ┌─────────────────────────┐
│               [── Cancel ──][■ Save ■]│     │ [■■■■■■■ Save ■■■■■■■■] │
└───────────────────────────────────────┘     │ [────── Cancel ───────] │
                                              └─────────────────────────┘
```
| | Web |
|---|---|
| Default | `horizontal`, `end`, `md` |
| Stacking | When set to `vertical` |
| Visible limit | 3 |

### A9 Accessibility (design)

- Reading and focus order: secondary actions first, primary last, in every layout and both languages.
- If the group labels a set (e.g. "Report actions"), it is exposed as a group with that name.

### A10 Related components

- [Button](../button/button.md#a--guidelines), [Icon button](../icon-button/icon-button.md#a--guidelines), Link — the actions inside
- Segmented button — connected single/multi select
- Dialog, Bottom sheet, Page header — main places a button group appears

---

## B · Spec

> The contract — API, dimensions, tokens, states, RTL, accessibility. Code and Figma are both reviewed against this part.

### B1 API

#### ButtonGroup
| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `children` | `ReactNode` | `Button` · `IconButton` · `SplitButton` · `Link` | — | ✓ | `secondary-actions` then `primary-action` (reading order) |
| `orientation` | enum | `horizontal` · `vertical` | `horizontal` | | A4.1 |
| `align` | enum | `start` · `center` · `end` · `space-between` · `fill` | `end` | | A4.2 (horizontal). Vertical is always full width |
| `size` | enum | `sm` · `md` · `lg` | `md` | | Applied to every child through context |
| `maxVisible` | number | 1–4 | `3` | | Visible slots; the other actions go into the overflow menu per **Overflow counting** below. Out of range → clamped to 1–4 |
| `overflowLabel` | string | | "More options" / "خيارات أخرى" | | Overflow trigger name |
| `aria-label` | string | | — | | When set, the group is exposed as `role="group"` with this name |

**Invalid combinations** (dev warning):
- more than one child with `variant="filled"`
- a child with its own `size` different from the group `size` (group wins)
- `align="space-between"` with more than 2 children
- `align` set with `orientation="vertical"` (ignored)
- `maxVisible` outside 1–4 (clamped)
- the always-visible children alone are more than `maxVisible` — they all stay visible (Overflow counting, rule 3)

**Overflow counting** (plan 1.2, finding 13). `n` = the clamped `maxVisible`. When the group has `n` children or fewer, all are visible and there is no overflow trigger. Otherwise:
1. **Always-visible children use up visible slots first:** the primary action (`variant="filled"`), any child with `href` or `type="submit"` (an overflow menu item calls the child's `onClick()` with no event, so it cannot follow a link or submit a form), and any child that is not a `Button` / `IconButton` (it cannot become a menu item).
2. **The other children fill the slots that are left** (`n` − number of always-visible children, never below 0): the last ones in reading order stay visible; the first (least important) go into the overflow menu first, in reading order.
3. **The limit is exceeded only when the always-visible children alone are more than `n`:** then all of them are visible, every other child goes into the menu, and the group warns (dev). No other case shows more than `n` children.

Visible children keep their DOM order. The overflow trigger does not use a slot; it is placed first (B2) and is rendered only when the menu has at least one item.

| `maxVisible` | Children (reading order) | Visible | Menu | Warning |
|---|---|---|---|---|
| `3` | Delete · Archive · Cancel · Save (`filled`) | Archive · Cancel · Save | Delete | — |
| `3` | Docs (`href`) · Delete · Cancel · Save (`filled`) | Docs · Cancel · Save | Delete | — |
| `1` | Docs (`href`) · Cancel · Save (`filled`) | Docs · Save | Cancel | yes — 2 always-visible > 1 |
| `1` | Docs (`href`) · Help (`href`) · Save (`type="submit"`, `filled`) | all three | — (no trigger) | yes — 3 always-visible > 1 |

### B2 Dimensions

```
horizontal, align=end
┌───────────────────────────────────────────────────────┐
│                         [── Cancel ──]  [■■ Save ■■]  │
└───────────────────────────────────────────────────────┘
                                      ├──┤ spacing-md

vertical
┌───────────────────────┐
│ [■■■■■■ Save ■■■■■■■] │
│          ┬ spacing-md │
│ [────── Cancel ──────] │
└───────────────────────┘
```

| Part | Property | Value |
|---|---|---|
| `container` | display · gap | `display: flex` (block-level, never `inline-flex`) · `spacing-md` (both orientations) |
| `container` | horizontal | `flex-direction: row`; `justify-content` from `align` (`start` · `center` · `flex-end` · `space-between`); `fill` → children `flex: 1 1 0` (horizontal only) |
| `container` | vertical | `flex-direction: column-reverse` (primary = last child on top), `align-items: stretch` → children full width. `align` is ignored: no child gets `flex: 1 1 0` for any `align` value (finding 12) |
| `container` | width | `inline-size: 100%` of its parent in **both** orientations and every `align` — the group fills the footer / header slot, so `justify-content` has free space and `align` places the actions (and mirrors in RTL). Never hug |
| `overflow-trigger` | | `IconButton` `variant="text"` `color="neutral"`, same `size`, icon `more_horiz`, placed first (start) |

No colors of its own: B3 is empty by design.

### B3 Tokens by part and state

None. Children use their own specs.

### B4 States and transitions

None. Overflow menu: as [Split button B4](../split-button/split-button.md#b4-states-and-transitions).

### B5 RTL

```
LTR  │                [── Cancel ──] [■ Save ■] │
RTL  │ [■ حفظ ■] [── إلغاء ──]                   │   (align=end → inline end = left)
```
Layout mirrors automatically; `more_horiz` does not mirror.

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Semantics | Plain container; `role="group"` + `aria-label` only when a label is given |
| Order | DOM order = reading and focus order (secondary → primary) in every orientation. `column-reverse` changes only the visual stacking |
| Overflow | Trigger and menu as Split button B6 |

### B7 Examples

```tsx
<ButtonGroup>
  <Button variant="outlined" color="neutral">Cancel</Button>
  <Button type="submit">Save changes</Button>
</ButtonGroup>

<ButtonGroup align="space-between">
  <Button variant="text">Back</Button>
  <Button>Next</Button>
</ButtonGroup>

<ButtonGroup orientation="vertical" size="lg">
  <Button variant="outlined">إلغاء</Button>
  <Button>حفظ التغييرات</Button>
</ButtonGroup>
```

### B8 Figma

Structure, properties, the Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

- [ ] Each `orientation` × `align` renders the full B2 rule set (computed styles), en + ar: container `display: flex` and `inline-size: 100%`; horizontal `flex-direction: row` + `justify-content` per `align` (`start` · `center` · `flex-end` · `space-between`); `fill` → every child `flex: 1 1 0`; vertical `column-reverse` + `align-items: stretch`; `gap` = `spacing-md`
- [ ] Children receive the group `size`; conflicting child size warns
- [ ] Focus order = DOM order in vertical layout (primary visually on top, focused last)
- [ ] `maxVisible` moves the first (least important) children into the overflow menu; menu items call the children's `onClick`
- [ ] Overflow counting (B1): always-visible children (`filled`, `href`, `type="submit"`, not Button/IconButton) use up slots first — `maxVisible={1}` with `[Docs href, Cancel, Save (filled)]` → Docs and Save visible, Cancel in the menu; `maxVisible={3}` with `[Docs href, Delete, Cancel, Save (filled)]` → Docs, Cancel, Save visible, Delete in the menu, no warning; always-visible children alone more than `maxVisible` (`maxVisible={1}`, `[Docs href, Help href, Save submit]`) → all visible, no overflow trigger, warning
- [ ] Vertical ignores `align`: `orientation="vertical"` with each `align` value keeps the vertical rule set (no child `flex: 1 1 0`), warns, and every child has a non-zero rendered height
- [ ] Invalid combinations warn (incl. `maxVisible` out of range → clamped, always-visible children more than `maxVisible`); axe passes

---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `button-group-contract.md`.

> Executor: read `AGENTS.md`, `3-web-components/README.md`, this file and the spec [Part B](#b--spec).

| Field | Value |
|---|---|
| Component | Button group |
| Platform | Web (React + MUI) |
| Depends on | Button, Icon button, Split button (web) **Built** (reuses `SplitButtonMenu`) |
| Plan version | 1.2 · 2026-10-21 |

### C1 Goal

`ButtonGroup` lays out actions per B2, passes `size` to children, handles overflow, and keeps DOM order = focus order.

### C2 Scope

In: B1–B6, B9. Out: Toolbar, Segmented button.

### C3 Approach

- `ButtonGroupContext` provides `size`; inside a group **the group's size wins** (B1): `Button`, `IconButton`, `SplitButton` use `const size = groupSize ?? props.size ?? default`, and the group warns when a child's own `size` differs (plan 1.1, finding 8).
- Overflow: `React.Children.toArray(children)`; clamp `maxVisible` to 1–4 (`warnOnce` when out of range); if `length > maxVisible`, split the children per B1 **Overflow counting** (plan 1.2, finding 13): mark always-visible children (`variant="filled"`, `href`, `type="submit"`, not Button/IconButton); slots left = `max(0, maxVisible − alwaysVisible)`; of the other children keep the last `slotsLeft` visible and turn the rest (in reading order) into menu options built from their props (`children`/`label` → `label`, `onClick` → `onSelect`, `disabled`). Warn only when the always-visible children alone exceed `maxVisible`. Render the overflow trigger only when the menu has items.
- Styles only `cssVars.spacing.md` + flex rules. No colors. Container (plan 1.1, finding 1): `display: 'flex'` and `inlineSize: '100%'` in both orientations — no `inline-flex`, no `fit-content`; horizontal `justifyContent` from `align` (`start` · `center` · `flex-end` · `space-between`, `fill` → `flex-start` + children `flex: '1 1 0'`); vertical `flexDirection: 'column-reverse'`, `alignItems: 'stretch'`, and **no** `align` rule — the `fill` child rule applies only when `orientation === 'horizontal'` (plan 1.2, finding 12).
- **Test tooling (finding 5, not planned here).** The shared speedy Emotion test cache (`createBiowaveEmotionCaches`, per-test caches in `src/test/render.tsx`, reset in `src/test/setup.ts`) is Button plan 1.2 on branch `ds/button-web` (PR #1, merge pending). This fix round rebases on it once merged; do not re-implement or edit those files here.

### C4 Token gaps

None.

### C5 Files to create / change

```
3-web-components/src/components/button-group/ButtonGroup.tsx          new
3-web-components/src/components/button-group/ButtonGroupContext.ts    new
3-web-components/src/components/button-group/ButtonGroup.test.tsx     new
3-web-components/src/components/button-group/index.ts                 new
3-web-components/src/components/button/Button.tsx                     change: read group size
3-web-components/src/components/icon-button/IconButton.tsx            change: read group size
3-web-components/src/components/split-button/SplitButton.tsx          change: read group size
3-web-components/src/index.ts                                         change: export ButtonGroup
3-web-components/README.md                                            change: status row
```

### C6 Tests

B9; Button/IconButton/SplitButton tests still pass.

- [ ] (1.1) Layout loop asserts the full B2 rule set per orientation × align, en + ar (finding 3) — see B9 first item
- [ ] (1.1) `maxVisible={0}` and `maxVisible={5}` clamp to 1 and 4 and warn once (finding 7)
- [ ] (1.1) A child with `href` or `type="submit"` that would overflow stays visible and warns (finding 9)
- [ ] (1.1) No per-test timeout argument in `ButtonGroup.test.tsx` (finding 4); no `act(...)` warning in the test run (finding 10)
- [ ] (1.2) Overflow counting (finding 13): `maxVisible={1}` with `[Docs href, Cancel, Save (filled)]` → Docs and Save visible, Cancel the only menu item, warning (always-visible 2 > 1); `maxVisible={3}` with `[Docs href, Delete, Cancel, Save (filled)]` → Docs, Cancel, Save visible, Delete the only menu item, no warning; `maxVisible={1}` with `[Docs href, Help href, Save submit]` → all three visible, no overflow trigger, warning. Replaces the 1.1 test *keeps href and submit actions visible instead of moving them into overflow* where its expectations differ
- [ ] (1.2) Vertical + `align="fill"` (finding 12): no child has `flex: 1 1 0`, the `align`-ignored warning fires, and every child has a non-zero rendered height; vertical with each other `align` value keeps the vertical rule set
- [ ] (1.2) `fill` → `flex: 1 1 0` is asserted from the rendered style (the inserted Emotion rule for the child, or a longhand such as `flex-grow: 1` / `flex-basis: 0`), not from the component source text (finding 14)

### C7 Acceptance criteria

- [ ] AC-1 API = B1; AC-2 layout = B2 (no raw values)
- [ ] AC-3 Focus order = DOM order in both orientations
- [ ] AC-4 Overflow behaves per B9
- [ ] AC-5 typecheck, tests, sync pass; AC-6 exported, README updated
- [ ] AC-7 (findings 1, 2) Container `display: flex`, `inline-size: 100%` in both orientations; each `align` value visibly moves the actions in a wide parent and mirrors in `ar`
- [ ] AC-8 (finding 3) B9 layout test asserts the full B2 rule set, en + ar
- [ ] AC-9 (finding 4, 10) No raised timeout in `ButtonGroup.test.tsx`; no `act(...)` warning
- [ ] AC-10 (findings 7, 9) `maxVisible` clamped + warning; `href` / `type="submit"` children never overflow (warning); tests per C6
- [ ] AC-11 C8 gets a "Fix round 1" entry: every command with ✓/✗ and real numbers (`npm run typecheck`, `npm run test:web` passed/total + duration, `npm run docs:check`, `npm run sync`), and the size precedence (group wins) recorded under Deviations/notes (finding 8)

- [ ] AC-12 (finding 13) Overflow follows B1 Overflow counting; tests per C6 (1.2)
- [ ] AC-13 (findings 12, 14) Vertical ignores `align` (no `fill` flex, non-zero heights); `fill` asserted from the rendered style
- [ ] AC-14 C8 gets a "Fix round 2" entry with every command ✓/✗ and real numbers

**Fix round 2 — Executor task list** (one list; nothing else is in scope):
1. #12 Vertical orientation ignores `align`: apply the `fill` child rule (`flex: 1 1 0`) only when `orientation === 'horizontal'` (B2, C3); test vertical + `align="fill"` asserting no child `flex: 1 1 0`, the warning, and **non-zero heights**, plus vertical with each other `align` value — `ButtonGroup.tsx`, `ButtonGroup.test.tsx`
2. #13 Overflow counting per B1 (always-visible children use up slots first; warn only when they alone exceed `maxVisible`; no trigger when the menu is empty); tests per C6 (1.2), updating the 1.1 href/submit test to the new rule — `ButtonGroup.tsx`, `ButtonGroup.test.tsx`
3. #14 Assert `fill` → `flex: 1 1 0` from the rendered style (inserted Emotion rule or a longhand), not the source text — `ButtonGroup.test.tsx`
4. C8 "Fix round 2" entry and one `CHANGELOG.md` entry

Files the Executor may touch in this fix round: `ButtonGroup.tsx`, `ButtonGroup.test.tsx`, C8 of this file, `CHANGELOG.md`. Nothing else.

---

### C8 Execution log (filled by the Executor)

| Field | Value |
|---|---|
| Agent | Codex |
| Date | 2026-10-18 |
| Files changed | `src/components/button-group/ButtonGroup.tsx`, `ButtonGroupContext.ts`, `ButtonGroup.test.tsx`, `index.ts`; group-size support in Button, IconButton and SplitButton; package `src/index.ts`; Web components README |

**Deviations:** none
**Questions for the Planner:** `npm run docs:check` remains blocked by the repository-wide Doc Kit 1.2 change: 12 Figma contracts are stale, including this component's Figma contract. The code contract is current; no generated contract was edited by the Executor.

#### Fix round 1 — 2026-10-21

| Finding | What changed (`file:line`) | Test that proves it |
|---|---|---|
| #2 (and plan 1.1 #1) | `ButtonGroup.tsx:43` — the root is block-level flex at `inlineSize: '100%'`; horizontal alignment maps to the required `justify-content`, `fill` uses `flex-start` plus child flex, and vertical children stay full width | `ButtonGroup.test.tsx:55` — every orientation × alignment in English and Arabic checks display, width, direction, justify-content, vertical stretch, fill flex, gap and document direction |
| #3 | `ButtonGroup.test.tsx:55` — expanded the layout loop from gap/direction only to the complete B2 rule set | `ButtonGroup.test.tsx:55` — 20 orientation/alignment/locale cases |
| #4 | `ButtonGroup.test.tsx:311` — removed the `20_000` axe-test timeout | `npm run test:web` — 91/91 on the default timeout in all three runs |
| #7 | `ButtonGroup.tsx:110` — clamps `maxVisible` to 1–4 and warns once per invalid value | `ButtonGroup.test.tsx:233` — verifies `0 → 1`, `5 → 4`, resulting visibility and both warnings |
| #9 | `ButtonGroup.tsx:124` — `href` and `type="submit"` actions that would overflow remain visible and warn | `ButtonGroup.test.tsx:264` — both actions remain in the DOM, no overflow trigger is created, and both warnings are asserted |
| #10 | `ButtonGroup.test.tsx:217` — the ArrowUp case reaches the trigger with `user.tab()` before keyboard input | `ButtonGroup.test.tsx:217` — focused ButtonGroup run 12/12 with no ButtonGroup `act(...)` warning |
| #8 (Executor half) | This log records the contract's size precedence: `groupSize ?? childSize ?? default`; the group wins | `ButtonGroup.test.tsx:118` — conflicting Button, IconButton and SplitButton sizes render at the group size and warn |

**Checks:** `npm run sync` ✓ READY · `npm run component-tokens` ✓ (web 3 files / 10 collections / 299 mode values; tablet and mobile 3 / 10 / 305 each) · `npm run docs:check` ✓ (18 component files) · `npm run typecheck` ✓ · `npm run test:web` ✓ run 1: 91/91 in 7.79 s · run 2: 91/91 in 6.64 s · run 3: 91/91 in 6.66 s. Focused ButtonGroup: 12/12 in 2.81 s, default timeout.

**Deviations/notes:** Group size wins over a conflicting child size, per B1/C3. The focused ButtonGroup run emits no `act(...)` warning. Each full run still emits the pre-existing warning from `SplitButton.test.tsx` › *implements Arrow, Home, End, Escape, and ArrowUp-open keyboard behavior*; SplitButton is outside this fix's allowed files.
**Questions:** none.

#### Fix round 2 — 2026-10-21

| Finding | What changed (`file:line`) | Test that proves it |
|---|---|---|
| #12 | `ButtonGroup.tsx:60-62` — applies the `fill` child flex rule only in horizontal groups, so every vertical `align` value keeps full-width, non-collapsing actions | `ButtonGroup.test.tsx:56-119` — every vertical `align` in English and Arabic asserts the vertical rule set, no fill flex, non-zero rendered heights, and the ignored-align warning |
| #13 | `ButtonGroup.tsx:77-94, 142-174` — always-visible children consume slots first; the remaining last actions stay visible, the least-important actions enter the menu in reading order, and only an always-visible overage warns | `ButtonGroup.test.tsx:286-350` — covers the three B1/C6 cases, including a single menu item, no-warning within the limit, and no trigger when all children are always visible |
| #14 | `ButtonGroup.test.tsx:102-108` — horizontal `fill` is asserted through each rendered child's computed flex longhands instead of source text | `ButtonGroup.test.tsx:56-119` — rendered children report `flex-grow: 1`, `flex-shrink: 1`, and a zero flex basis |

**Checks:** `npm run sync` ✓ READY · focused ButtonGroup ✓ 14/14 in 3.38 s, default timeout · `npm run docs:check` ✓ (18 component files) · `npm run typecheck` ✓ · `npm run test:web` ✓ run 1: 93/93 in 6.51 s · run 2: 93/93 in 6.16 s · run 3: 93/93 in 6.03 s.

**Deviations/notes:** none. The focused ButtonGroup run emits no `act(...)` warning. Each full run still emits the pre-existing warning from `SplitButton.test.tsx` › *implements Arrow, Home, End, Escape, and ArrowUp-open keyboard behavior*; SplitButton is outside this fix's allowed files.
**Questions:** none.

---

## D · Figma build

> How to build Part B in Figma. The Figma Agent receives this through the generated `figma-button-group-contract.md`.

> Executed by the **Figma Agent**. Values from the spec [Part B](#b--spec). **One file per platform (D-12)**: builds the Web set in **Biowave DS — Web Components**.

| Field | Value |
|---|---|
| Component | Button group |
| Figma file | **Biowave DS — Web Components** (`_sync/figma-files.json` › `web`) |
| Page / section | `↳ Button Group` |
| Mode | **Create new.** Legacy reference (read only): Foundations file › `↳ Button group` › `Button Group/EN` `4833:35916`, `Button Group/AR` `4833:35989` |
| Depends on | Button and Icon button (Web) `Built` in the same file |
| Plan version | 1 · 2026-10-16 |

### D1 Rules for this build

Same as [Button D1](../button/button.md#d1-rules-for-this-build). Children are `Button` / `Icon Button` / `Link` instances placed in the `Actions` slot.

### D2 Component structure

```
❖ Button Group    ← published set with a SLOT property `Actions` (as in the legacy set)
```

### D3 Layer tree and auto layout

```
Button Group           ↔ horizontal (Orientation=Horizontal) · ↕ vertical, reversed (Orientation=Vertical) · gap spacing/md
│                        Align → primary-axis alignment (Start/Center/End/Space between); Fill → children FILL
└── actions            SLOT `Actions` · default content: Button Outlined Neutral "Cancel" + Button Filled Brand "Save changes"
```

**Icons used:** `more_horiz` — overflow (More) trigger, Google · Material Symbols Rounded (D-18)

### D4 Properties

| Figma property | Type | Values | Default | Code prop (web) |
|---|---|---|---|---|
| `Orientation` | VARIANT | `Horizontal` · `Vertical` | `Horizontal` | `orientation` |
| `Align` | VARIANT | `Start` · `Center` · `End` · `Space between` · `Fill` | `End` | `align` |
| `Size` | VARIANT | `SM` · `MD` · `LG` | `MD` | `size` (sets the size of the instances in the slot default) |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — |
| `Actions` | SLOT | | 2 buttons | `children` |

### D5 Variants to generate

Horizontal: 5 aligns × 3 sizes × 2 languages = 30; Vertical: 3 sizes × 2 languages = 6 → **36**.

#### Legacy mapping (legacy sets are not edited)
| Legacy | New |
|---|---|
| `View` Horizontal · Vertical | `Orientation` |
| `Platform` Desktop · Tablet · Mobile | removed (one set per platform file) |
| `Size` SM · M · XL | `SM` · `MD` · `LG` |
| `/EN` · `/AR` sets | `Language` |
| — | `Align` (new) |

#### After `Approved`
Report instances of `4833:35916` / `4833:35989` in the Foundations file; move them to `_Deprecation Ground` once product files use the new library.

### D6 States, interactions and motion

None.

### D7 RTL

`Language=AR`: auto layout direction reversed, so `End` sits at the left; Arabic labels in the default slot content.

### D8 Documentation pages

12 standard pages in `Button Group — Documentation`; blocked until the Doc Kit. 03 Variations: Orientation, Align, Size. 05 Usage: order rules. 07 Platform: web dialog footer.

Component description: "Lays out 2–4 related actions with the right order and alignment. Spec: 3-web-components/components/button-group/button-group.md".

### D9 Code Connect

`3-web-components/src/components/button-group/ButtonGroup.figma.tsx` — mapping D4; `Actions` slot → `children`.

### D10 Acceptance criteria

- [ ] F-AC-1 Properties D4 exactly; 36 variants
- [ ] F-AC-2 Gap bound; no raw values
- [ ] F-AC-3 Vertical shows primary on top; AR mirrors
- [ ] F-AC-4 Zero local variables/styles; docs built or reported blocked

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
| 2 | 2026-10-21 | **Changes requested** | not reviewed |
| 1 | 2026-10-21 | **Changes requested** | not reviewed |

### E3 Round 2 — 2026-10-21

| Field | Value |
|---|---|
| Plan version reviewed | 1.1 |
| Spec version reviewed | 1.1 |
| Reviewer | Claude |
| Date | 2026-10-21 |
| Verdict | **Changes requested** |

Commands run by the Reviewer (branch `ds/button-group-web`, fix round = `16ca3d4`; code diff vs `main` is only `ButtonGroup.tsx` and `ButtonGroup.test.tsx`):
`npm run docs:check` ✅ (18 component files, exit 0) · `npm run typecheck` ✅ (exit 0) · `npm run test:web` ✅ run 1: 91/91, 8.30 s · run 2: 91/91, 6.52 s · `vitest run src/components/button-group` 12/12, 3.07 s, no `act(...)` warning (the only `act(...)` warning in the full run comes from `SplitButton.test.tsx`, outside this unit).

**Real-browser measurement** (Chromium, Browser pane; scratch Vite page outside the repo that imports the branch's `src/index.ts` with `BiowaveProvider`; each group inside an 800 px parent with Cancel + Save changes; vertical in a 400 px parent). Offsets are px from the parent edge:

| Case | Group width | en (LTR) — Cancel / Save | ar (RTL, dark) — إلغاء / حفظ التغييرات |
|---|---|---|---|
| `start` | 800 | left 0 / left 79 | right 0 / right 58 |
| `center` | 800 | left 303 / right 303 (centred) | right 319 / left 319 (centred) |
| `end` (default) | 800 | Save right 0, Cancel right 123 | Save left 0, Cancel left 112 |
| `space-between` | 800 | Cancel left 0, Save right 0 | إلغاء right 0, حفظ left 0 |
| `fill` | 800 | 397 + 8 + 395 px, `flex: 1 1 0px` | 397 + 8 + 395 px, mirrored |
| vertical | 400 | Save top 0, Cancel top 48, both 400 px wide | same, both 400 px wide |

Every `align` value now moves the actions in a wide parent and mirrors in Arabic; gap is 8 px (`spacing-md`) everywhere. Two new defects were found in the same page (findings 12, 13).

#### Round 1 findings

| # | Status | Evidence |
|---|---|---|
| 1 (Planner) | Fixed | Plan 1.1 B2 container width row + C3: `display: flex`, `inline-size: 100%` in both orientations; measured above |
| 2 | Fixed | `ButtonGroup.tsx:47, 50-57` — `display: 'flex'`, `inlineSize: '100%'`, `justify-content` per `align`; browser table above |
| 3 | Fixed | `ButtonGroup.test.tsx:56-98` — display, inline size, direction, `justify-content` per align, vertical `align-items: stretch` + child `inline-size: 100%`, `gap`, `dir`, en + ar. `fill` checks `flex: '1 1 0'` against the source text (jsdom drops it), see finding 14 |
| 4 | Fixed | `ButtonGroup.test.tsx:327` — no timeout argument; no other timeout in the file |
| 5 (Planner) | Fixed (closed by `main`) | `a4343ac` on `main`: `src/test/render.tsx:17` speedy `createBiowaveEmotionCaches`; `test:web` green twice on default timeouts |
| 6 (Planner) | Fixed | Tablet + mobile Figma contracts regenerated in plan 1.1; `docs:check` ✅ |
| 7 | Fixed | `ButtonGroup.tsx:110-116` clamp + `warnOnce`; test *clamps maxVisible to 1–4 and warns for each out-of-range value* (`ButtonGroup.test.tsx:233`) |
| 8 | Fixed | Planner half: C3 says group wins. Executor half: C8 Fix round 1 row #8 + Deviations/notes; `ButtonGroup.tsx:179-190` warns "the group size wins" |
| 9 | Fixed | `ButtonGroup.tsx:126-134`; test *keeps href and submit actions visible instead of moving them into overflow* (`ButtonGroup.test.tsx:264`). Side effect: finding 13 |
| 10 | Fixed | `ButtonGroup.test.tsx:227-228` `user.tab()` + `toHaveFocus()`; focused run shows no `act(...)` warning |
| 11 (Planner) | Fixed | Header "Source code" links `src/components/button-group/` |

#### Acceptance criteria

| AC | Result | Evidence (file:line / test name) |
|---|---|---|
| AC-1 API = B1 | ⚠️ | Props/defaults unchanged and correct; clamp + `href`/submit rules added. But B1 "`align` set with `orientation="vertical"` (ignored)" is not true for `align="fill"` (finding 12) |
| AC-2 Layout = B2, no raw values | ⚠️ | `ButtonGroup.tsx:46-62` — only `cssVars.spacing.md`, `flex`, `100%`; horizontal and default vertical match B2 in the browser. Vertical + `fill` collapses (finding 12) |
| AC-3 Focus order = DOM order | ✅ | Unchanged; test *keeps DOM and focus order while reversing only vertical visual order*; browser: vertical Save on top, Cancel second in DOM |
| AC-4 Overflow per B9 | ⚠️ | Tests *moves the least-important…*, *opens the overflow at the last item with ArrowUp*, clamp and href/submit tests pass. A kept-visible `href`/submit child pushes later children — including the primary — into the menu (finding 13) |
| AC-5 typecheck, tests, sync pass | ✅ | typecheck ✅, `test:web` 91/91 ×2, `docs:check` ✅ |
| AC-6 Exported, README updated | ✅ | Unchanged from round 1 |
| AC-7 Container flex + 100%, `align` visibly moves actions and mirrors | ✅ | Browser table above (5 aligns × en/ar, vertical) |
| AC-8 B9 layout test asserts B2 rule set, en + ar | ⚠️ | `ButtonGroup.test.tsx:56-98` — all rules except `fill` flex, which is a source-text check (finding 14); vertical never sets `align` (finding 12) |
| AC-9 No raised timeout; no `act(...)` warning | ✅ | `ButtonGroup.test.tsx:327`; focused run clean |
| AC-10 `maxVisible` clamped; `href`/submit never overflow; tests | ✅ | `ButtonGroup.tsx:110-134`; tests at `:233`, `:264` |
| AC-11 C8 Fix round 1 with real numbers + size precedence | ✅ | C8 Fix round 1: typecheck, docs:check, sync, component-tokens, three `test:web` runs with passed/total + duration; precedence under Deviations/notes. Reviewer's numbers agree (91/91, 6.5–8.3 s) |

#### Rule checks (AGENTS.md §2)

| Rule | Result | Notes |
|---|---|---|
| No generated files edited | ✅ | Fix commit touches `ButtonGroup.tsx`, `ButtonGroup.test.tsx`, C8, `CHANGELOG.md`, run record only |
| No raw values / no primitives | ✅ | `cssVars.spacing.md`; no hex/px/ms; no `primitive.*` |
| RTL first (logical properties) | ✅ | `inlineSize`, `justify-content` flex-start/end; browser: every align mirrors in `ar` |
| Both themes, both languages, tested | ✅ | Layout loop en + ar; axe loop light/dark × en/ar; browser checked light/en and dark/ar |
| WCAG 2.2 AA | ⚠️ | axe clean; overflow trigger semantics unchanged. Vertical + `fill` renders 0–2 px tall buttons — not visible, not a usable target (finding 12) |
| Biowave `Icon` (D-18) | ✅ | `<Icon name="more_horiz" />` (`ButtonGroup.tsx:218`) |
| Overflow limit; `href`/submit stay visible | ⚠️ | Limit clamped; `href`/submit stay visible ✅, but finding 13 |
| Default test timeouts | ✅ | No timeout argument in `ButtonGroup.test.tsx` |
| No edits to `src/test/*` or other components | ✅ | `git diff main...HEAD -- 3-web-components/src` = 2 ButtonGroup files |
| Stayed inside the contract | ✅ | Files limited to the fix-round list |
| Changelog | ✅ | `CHANGELOG.md` fix-round entry + C8 |

#### Figma build (Part D)

Skipped — Figma build is `Planned` and `figma` is in `_workflow/config.json › skip`.

#### Findings

| # | Severity | File | Issue | Required change | Owner |
|---|---|---|---|---|---|
| 12 | 🟡 Should fix | `ButtonGroup.tsx:58-61`, `ButtonGroup.test.tsx:63` | `orientation="vertical" align="fill"` still gives every child `flex: 1 1 0`. In a column with auto height the buttons collapse: measured group height 10 px, Cancel 2 px and Save 0 px tall (they become a line). B1 says `align` is ignored in vertical (with a warning). The layout loop passes `align={undefined}` for vertical, so this is never tested | Apply the `fill` child rule only when `orientation === 'horizontal'` (vertical stays B2 vertical for every `align`). Add a test: vertical with each `align` value keeps the vertical rule set and warns | Executor |
| 13 | 🟢 Nit | `ButtonGroup.tsx:124-141`, B1 | A child kept visible (`href`, `type="submit"`, or not Button/IconButton) does not use up an overflow slot, so later children move into the menu instead — including the last (primary) action. Measured: `maxVisible={1}` with `[Docs href, Cancel, Save]` → visible `[⋯, Docs]`, menu `Cancel, Save`. B9 says only the first (least important) children overflow; B1 does not say what happens to the count | Write in B1 / B9 what happens when a would-overflow child must stay visible (for example: it counts as visible and the next least-important child overflows only while the primary stays visible), then the Executor follows it | Planner |
| 14 | 🟢 Nit | `ButtonGroup.test.tsx:88-91` | The `fill` → `flex: 1 1 0` check reads the component source text, not the rendered style (jsdom drops the shorthand). Correct in the browser (`flex: 1 1 0px`) | Optional: assert on the Emotion rule text (`flex:1 1 0` in the inserted rule) or on a longhand, so the test fails if the rule is not applied | Executor |

#### Next step

- Planner (Plan → `Open`): #13 — define overflow counting when a child must stay visible; set `Finished` and regenerate the contract.
- Executor (Fix round 2): #12 (required), #14 (optional), #13 after the plan says what to do.

### E2 Round 1 — 2026-10-21

| Field | Value |
|---|---|
| Plan version reviewed | 1 |
| Spec version reviewed | 1.0 |
| Reviewer | Claude |
| Date | 2026-10-21 |
| Verdict | **Changes requested** |

Commands run by the Reviewer (branch `ds/button-group-web`, no diff against `main`; the unit's code is already on `main`):
`npm run typecheck` ✅ (exit 0) · `npm run test:web` ❌ run 1: 86/87 (fail: *IconButton behavior › has one accessible name and shows its visual tooltip…*) · run 2: 85/87 (fail: *SplitButton menu › implements Arrow, Home, End, Escape…* and *Button accessibility › no axe violations … in dark*, 21.9 s > 20 s timeout) · IconButton suite alone: 11/11 ✅ → load-dependent flakes in other components. **`ButtonGroup.test.tsx` 10/10 ✅ in every run (3.4–7.8 s for the whole file)** · `npm run docs:check` ❌ 2 errors: tablet and mobile `button-group` Figma contracts stale (pre-existing; web contracts current).

#### Acceptance criteria

| AC | Result | Evidence (file:line / test name) |
|---|---|---|
| AC-1 API = B1 | ⚠️ | `ButtonGroup.tsx:20-29, 95-104` — all 7 props, defaults `horizontal` / `end` / `md` / `3`, localized `overflowLabel` (`:110-111`), `role="group"` only with a label (`:197`). All 4 invalid-combination warnings (`:145-176`). `maxVisible` range 1–4 not enforced (finding 7) |
| AC-2 Layout = B2, no raw values | ❌ | Tokens only: `gap: cssVars.spacing.md` (`:56`); test *contains no raw colors…* ✅. But the horizontal container is `inline-flex` + `inline-size: fit-content` (`:49, 57`), so it has no free space and `align` = `start`/`center`/`end`/`space-between` has **no visible effect** — `end` (the default, dialog footers) renders at inline start. Root cause is B2 itself (findings 1, 2) |
| AC-3 Focus order = DOM order, both orientations | ✅ | `column-reverse` only for vertical (`:50`); test *keeps DOM and focus order while reversing only vertical visual order*. Overflow trigger is first in DOM (start) per B2 |
| AC-4 Overflow per B9 | ✅ | `ButtonGroup.tsx:112-136`; tests *moves the least-important Button and IconButton actions into the menu* (first children overflow, menu items call `onClick`, focus returns to trigger), *opens the overflow at the last item with ArrowUp*, *uses the localized default overflow label*; non-overflowable child kept visible + warning |
| AC-5 typecheck, tests, sync pass | ❌ | typecheck ✅; `test:web` ❌ (flakes outside this unit, finding 5); `docs:check` ❌ (finding 6); ButtonGroup suite raises its own timeout (finding 4) |
| AC-6 Exported, README updated | ✅ | `src/components/button-group/index.ts`; `src/index.ts:15-21`; `3-web-components/README.md:48` Code = Built |

#### Rule checks (AGENTS.md §2)

| Rule | Result | Notes |
|---|---|---|
| No generated files edited | ✅ | No diff on branch; contracts untouched |
| No raw values / no primitives | ✅ | Only `cssVars.spacing.md`; no hex/px/ms; no `primitive.*` |
| RTL first (logical properties) | ✅ | `inlineSize` only, no left/right; `more_horiz` not mirrored (B5). Layout mirroring cannot be seen while `align` is a no-op (finding 1) |
| Both themes, both languages, tested | ⚠️ | Layout test loops en + ar; axe loops light/dark × en/ar. Layout test asserts only `gap` + `flex-direction` (finding 3) |
| WCAG 2.2 AA | ✅ | Group label optional per B6; overflow trigger has name, `aria-haspopup`, `aria-expanded`, `aria-controls`; Arrow keys open menu; focus restored; axe clean (contrast rule off, as in every web suite) |
| Biowave `Icon` (D-18), no `@mui/icons-material` | ✅ | `<Icon name="more_horiz" />` (`:202`); no `@mui/icons-material` import in the unit |
| Stayed inside the contract | ⚠️ | Size precedence `groupSize ?? sizeProp` (`Button.tsx:252`, `IconButton.tsx:258`, `SplitButton.tsx:75`) follows B1 ("group wins") but not C3 (`props.size ?? groupSize`); C8 says "Deviations: none" (finding 8) |
| Tests use default timeouts | ❌ | `ButtonGroup.test.tsx:254` `20_000` (finding 4). Note: the shared per-test speedy Emotion cache is **not** on `main` — `src/test/render.tsx` has no cache and Button tests still raise timeouts (`Button.test.tsx:202, 344, 610`) |
| Changelog | ✅ | Part F0 + `CHANGELOG.md` entries present |

#### Figma build (Part D)

Skipped — Figma build is `Planned` and `figma` is in `_workflow/config.json › skip`.

#### Findings

| # | Severity | File | Issue | Required change | Owner |
|---|---|---|---|---|---|
| 1 | 🔴 Blocker | `button-group.md` B2 (container width row) | B2 says the horizontal container hugs its content, while the B2/B5 diagrams and A4.2 (`end` default for dialog/form footers, `space-between` for Back … Next) need free space inside the group. With a hugging box `justify-content` never applies, so `align` does nothing | Decide and write in B2 + C3: horizontal container is `display: flex`, `inline-size: 100%` of its parent (or "fills the footer slot"), so `align` places children; keep vertical/`fill` at 100%. Regenerate the contract | Planner |
| 2 | 🟡 Should fix | `ButtonGroup.tsx:49, 57` | `display: 'inline-flex'` (B2 says `flex`) and `inlineSize: 'fit-content'` for horizontal non-fill → `align="end"` renders actions at inline start in a wide parent; RTL mirroring of `end` cannot be seen | After #1: `display: flex`, horizontal inline size per the new B2, so each `align` value moves the children (and mirrors in `ar`) | Executor |
| 3 | 🟡 Should fix | `ButtonGroup.test.tsx:49-75` | B9 "Each orientation × align renders B2 layout (computed styles)" — the loop asserts only `gap` and `flex-direction`; `justify-content` per `align`, `fill` → children `flex: 1 1 0`, vertical full width and container width are never checked, which is why #2 passed | Assert the B2 rule set per orientation × align (justify-content mapping, `flex: 1 1 0` on children for `fill`, `align-items: stretch` + 100% for vertical, container display/width), en + ar | Executor |
| 4 | 🟡 Should fix | `ButtonGroup.test.tsx:254` | The axe test raises its own timeout (`20_000`). The whole ButtonGroup file runs in 3.4–7.8 s here, so the override hides slowness instead of fixing it | Remove the override and use the default timeout; if it is still slow, render once per theme/locale combination with a light fixture rather than raising the limit | Executor |
| 5 | 🟡 Should fix | `src/test/render.tsx`, `Button.test.tsx:202, 344, 610`, `IconButton.test.tsx:86, 287`, `SplitButton.test.tsx:93, 272` | `npm run test:web` is not green: different tests fail in each run under load (IconButton tooltip Escape, SplitButton keyboard, Button axe dark at 21.9 s). The shared speedy Emotion cache that should let suites use default timeouts is not on `main` | Plan a separate shared-test-tooling task (speedy Emotion cache per test in `render.tsx`, drop raised timeouts in all web suites); outside this one-component unit (AGENTS rule 8) | Planner |
| 6 | 🟡 Should fix | `4-tablet-components/…/figma-button-group-contract.md`, `5-mobile-components/…/figma-button-group-contract.md` | `npm run docs:check` fails: both Figma contracts for this component are stale | `npm run contract -- tablet button-group` and `npm run contract -- mobile button-group` | Planner |
| 7 | 🟢 Nit | `ButtonGroup.tsx:100, 112` | `maxVisible` is documented as 1–4 but not checked; `maxVisible={0}` moves every overflowable child (including the primary) into the menu | Clamp to 1–4 and `warnOnce` when out of range; add a test | Executor |
| 8 | 🟢 Nit | C3 · C8 | C3 says `props.size ?? groupSize ?? default`; B1 and the code say the group wins (`groupSize ?? sizeProp`). C8 records "Deviations: none" | Planner: align C3 with B1. Executor: log the precedence in C8 | Planner |
| 9 | 🟢 Nit | `ButtonGroup.tsx:87` | Overflow `onSelect` calls the child's `onClick()` with no event; handlers that use the event (`event.preventDefault()`), `type="submit"` or `href` break when the child overflows | Warn (dev) when an overflowing child has `href` / `type="submit"`, or pass a synthetic-safe call; document in B1 | Executor |
| 10 | 🟢 Nit | `ButtonGroup.test.tsx:194-207` | *opens the overflow at the last item with ArrowUp* logs "An update to IconButtonTooltip inside a test was not wrapped in act(...)" | Wrap the focus in `act()` or use `user.keyboard` after `user.tab()` | Executor |
| 11 | 🟢 Nit | `button-group.md` header | "Source code" still says "not built yet (the Executor creates it)" | Set to `src/components/button-group/` | Planner |

#### Next step

- Planner (Plan → `Open`): #1, #5, #6, #8, #11; set `Finished` and regenerate the contracts.
- Executor (Fix round 1): #2, #3, #4 after the new contract; nits #7, #9, #10 recommended.

---

## F · Changelog

> Changes to this component on this platform.

### F0 Changes from previous version

1.2 — overflow counts the actions that must stay visible: the primary action, links (`href`), submit actions and non-Button children use up the visible slots first, and the least important of the rest go into the menu. The group shows more than `maxVisible` actions only when the must-stay actions alone exceed it (dev warning). Vertical groups ignore `align` (no `fill` stretching). No prop renamed or removed.

1.1 — the group now fills the width of its parent in both orientations, so `align` places the actions (the default `end` puts them at the inline end of a dialog footer). `maxVisible` is clamped to 1–4, and actions with `href` or `type="submit"` never move into the overflow menu. Inside a group the group's `size` wins. No prop renamed or removed.

1.0 — initial Web implementation: horizontal/vertical layouts, alignment and fill modes, shared child sizing, overflow menu, localized trigger, validation, public exports and contract tests. No API change from the initial spec.

### F1 Guidelines changelog

| Version | Date | Change | Migration | Author |
|---|---|---|---|---|
| 1.1 | 2026-10-21 | A4.4 Overflow: must-stay actions (primary, link, submit) use up visible slots first; the least important of the rest go into the menu; the limit is exceeded only when the must-stay actions alone exceed it (same text on Web, Tablet, Mobile) | None | Planner (Claude) |
| 1.0 | 2026-10-16 | Initial. Re-models the Figma `Button Group/EN·AR` sets | `View` → `orientation` · `Platform` removed (defaults per platform) · new `align` and overflow · two sets → one with `Language` | Planner (Claude) |

### F2 Spec changelog

| Version | Date | Change | Breaking | Migration |
|---|---|---|---|---|
| 1.0 | 2026-10-16 | Initial | No | — |
| 1.1 · plan 1.1 | 2026-10-21 | Review round 1 Planner items: #1 container `display: flex` + `inline-size: 100%` in both orientations so `align` works (B2, C3); #8 C3 size precedence aligned with B1 (group wins); #11 header Source code link; #6 tablet + mobile Figma contracts regenerated. B1 invalid combinations + B9/C6 tests for #3, #7, #9; C7 AC-7–11 + Fix round 1 task list (#2, #3, #4, #7, #9, #10, #8 log). #5 (shared Emotion test cache) not re-planned — rebases on `ds/button-web` PR #1. Part A unchanged | No — a group that relied on hugging its content now fills its parent; wrap it in a hugging container if needed | — |
| 1.2 · plan 1.2 | 2026-10-21 | Review round 2 Planner item #13: B1 Overflow counting (always-visible children — `filled`, `href`, `type="submit"`, not Button/IconButton — use up slots first; others fill the rest, least important into the menu first; warn only when the always-visible children alone exceed `maxVisible`; trigger only when the menu has items) + examples; A4.4 guideline (all three platforms, guidelines 1.1); B2 vertical ignores `align`; B9/C6 tests; C3; C7 AC-12–14 + Fix round 2 task list (#12 vertical `fill`, #13, #14) | No — a kept-visible link or submit action no longer pushes the primary into the menu | — |

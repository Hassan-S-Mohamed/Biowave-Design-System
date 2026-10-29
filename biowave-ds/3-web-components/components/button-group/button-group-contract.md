<!-- GENERATED from button-group.md @ 454592e3baebb6ff — do not edit; change the source and run: npm run contract -- web button-group -->
# Button group · مجموعة أزرار — Web — code contract

> **Everything you need to build Button group on Web, and nothing else.** Read this file only. Generated from [`button-group.md`](button-group.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](button-group.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Button group · مجموعة أزرار |
| Platform | Web · React + MUI |
| Built on | Custom layout (`div` flex). **Not** MUI `ButtonGroup` (that is a connected control). Overflow uses `IconButton` + the temporary menu from Split button |
| Import | `import { ButtonGroup } from '@biowave/web'` |
| Version | 1.2 · 2026-10-21 |
| Source code | [`src/components/button-group/`](../../src/components/button-group/) |
| Tokens | — |
| Source | [`button-group.md`](button-group.md) @ `454592e3baebb6ff` |

## 1. What it is

A button group arranges 2–4 related actions — the footer of a dialog, form or card, a page header's actions — with the same size, spacing, order and alignment everywhere. It is a **layout**, not a control: each action keeps its own look and focus. A connected control where one option is selected is a Segmented button, not a button group.

**Part names** (use exactly these in code, class names and tests):

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `container` | Yes | Lays out the actions |
| 2 | `gap` | Yes | Space between actions |
| 3 | `primary-action` | No | The one filled Button, if the group has one |
| 4 | `secondary-actions` | Yes | Other Buttons, Icon buttons or a Link |

**Options** (names and values are the props in §2):

- 4.1 `orientation`
- 4.2 `align` (horizontal)
- 4.3 `size`
- 4.4 Overflow

## 2. API

### ButtonGroup
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

## 3. Dimensions

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

## 4. Tokens by part and state

None. Children use their own specs.

### 4.1 How to use each token on Web

Values are for checking only — never paste a value.

| Token | CSS / TS | Light | Dark |
|---|---|---|---|
| `spacing-md` | `var(--bw-spacing-md)` · `cssVars.spacing.md` | 8 | 8 |

## 5. States and transitions

None. Overflow menu: as [Split button B4](../split-button/split-button.md#b4-states-and-transitions).

## 6. RTL

```
LTR  │                [── Cancel ──] [■ Save ■] │
RTL  │ [■ حفظ ■] [── إلغاء ──]                   │   (align=end → inline end = left)
```
Layout mirrors automatically; `more_horiz` does not mirror.

## 7. Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Semantics | Plain container; `role="group"` + `aria-label` only when a label is given |
| Order | DOM order = reading and focus order (secondary → primary) in every orientation. `column-reverse` changes only the visual stacking |
| Overflow | Trigger and menu as Split button B6 |

## 8. Examples

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

## 9. How to build it

### Goal

`ButtonGroup` lays out actions per B2, passes `size` to children, handles overflow, and keeps DOM order = focus order.

### Scope

In: B1–B6, B9. Out: Toolbar, Segmented button.

### Approach

- `ButtonGroupContext` provides `size`; inside a group **the group's size wins** (B1): `Button`, `IconButton`, `SplitButton` use `const size = groupSize ?? props.size ?? default`, and the group warns when a child's own `size` differs (plan 1.1, finding 8).
- Overflow: `React.Children.toArray(children)`; clamp `maxVisible` to 1–4 (`warnOnce` when out of range); if `length > maxVisible`, split the children per B1 **Overflow counting** (plan 1.2, finding 13): mark always-visible children (`variant="filled"`, `href`, `type="submit"`, not Button/IconButton); slots left = `max(0, maxVisible − alwaysVisible)`; of the other children keep the last `slotsLeft` visible and turn the rest (in reading order) into menu options built from their props (`children`/`label` → `label`, `onClick` → `onSelect`, `disabled`). Warn only when the always-visible children alone exceed `maxVisible`. Render the overflow trigger only when the menu has items.
- Styles only `cssVars.spacing.md` + flex rules. No colors. Container (plan 1.1, finding 1): `display: 'flex'` and `inlineSize: '100%'` in both orientations — no `inline-flex`, no `fit-content`; horizontal `justifyContent` from `align` (`start` · `center` · `flex-end` · `space-between`, `fill` → `flex-start` + children `flex: '1 1 0'`); vertical `flexDirection: 'column-reverse'`, `alignItems: 'stretch'`, and **no** `align` rule — the `fill` child rule applies only when `orientation === 'horizontal'` (plan 1.2, finding 12).
- **Test tooling (finding 5, not planned here).** The shared speedy Emotion test cache (`createBiowaveEmotionCaches`, per-test caches in `src/test/render.tsx`, reset in `src/test/setup.ts`) is Button plan 1.2 on branch `ds/button-web` (PR #1, merge pending). This fix round rebases on it once merged; do not re-implement or edit those files here.

### Token gaps

None.

### Files to create / change

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

## 10. Tests

- [ ] Each `orientation` × `align` renders the full B2 rule set (computed styles), en + ar: container `display: flex` and `inline-size: 100%`; horizontal `flex-direction: row` + `justify-content` per `align` (`start` · `center` · `flex-end` · `space-between`); `fill` → every child `flex: 1 1 0`; vertical `column-reverse` + `align-items: stretch`; `gap` = `spacing-md`
- [ ] Children receive the group `size`; conflicting child size warns
- [ ] Focus order = DOM order in vertical layout (primary visually on top, focused last)
- [ ] `maxVisible` moves the first (least important) children into the overflow menu; menu items call the children's `onClick`
- [ ] Overflow counting (B1): always-visible children (`filled`, `href`, `type="submit"`, not Button/IconButton) use up slots first — `maxVisible={1}` with `[Docs href, Cancel, Save (filled)]` → Docs and Save visible, Cancel in the menu; `maxVisible={3}` with `[Docs href, Delete, Cancel, Save (filled)]` → Docs, Cancel, Save visible, Delete in the menu, no warning; always-visible children alone more than `maxVisible` (`maxVisible={1}`, `[Docs href, Help href, Save submit]`) → all visible, no overflow trigger, warning
- [ ] Vertical ignores `align`: `orientation="vertical"` with each `align` value keeps the vertical rule set (no child `flex: 1 1 0`), warns, and every child has a non-zero rendered height
- [ ] Invalid combinations warn (incl. `maxVisible` out of range → clamped, always-visible children more than `maxVisible`); axe passes

B9; Button/IconButton/SplitButton tests still pass.

- [ ] (1.1) Layout loop asserts the full B2 rule set per orientation × align, en + ar (finding 3) — see B9 first item
- [ ] (1.1) `maxVisible={0}` and `maxVisible={5}` clamp to 1 and 4 and warn once (finding 7)
- [ ] (1.1) A child with `href` or `type="submit"` that would overflow stays visible and warns (finding 9)
- [ ] (1.1) No per-test timeout argument in `ButtonGroup.test.tsx` (finding 4); no `act(...)` warning in the test run (finding 10)
- [ ] (1.2) Overflow counting (finding 13): `maxVisible={1}` with `[Docs href, Cancel, Save (filled)]` → Docs and Save visible, Cancel the only menu item, warning (always-visible 2 > 1); `maxVisible={3}` with `[Docs href, Delete, Cancel, Save (filled)]` → Docs, Cancel, Save visible, Delete the only menu item, no warning; `maxVisible={1}` with `[Docs href, Help href, Save submit]` → all three visible, no overflow trigger, warning. Replaces the 1.1 test *keeps href and submit actions visible instead of moving them into overflow* where its expectations differ
- [ ] (1.2) Vertical + `align="fill"` (finding 12): no child has `flex: 1 1 0`, the `align`-ignored warning fires, and every child has a non-zero rendered height; vertical with each other `align` value keeps the vertical rule set
- [ ] (1.2) `fill` → `flex: 1 1 0` is asserted from the rendered style (the inserted Emotion rule for the child, or a longhand such as `flex-grow: 1` / `flex-basis: 0`), not from the component source text (finding 14)

## 11. Acceptance criteria (the Reviewer checks exactly these)

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

## 12. Rules

1. Never edit generated files (`*/generated/*`, `2-foundations/dist/`, `2-foundations/preview/`, `_sync/*.json`, any `*-contract.md`).
2. No raw values: no hex, px, ms or font names — only the tokens in §4. A missing value means stop and ask; tokens are added by the Planner.
3. Never use primitives (`primitive.*`, `BwPalette`).
4. RTL first: logical properties only (`margin-inline-start`, `padding-inline`, `inset-inline-end`); mirror only directional icons (§6).
5. Light + dark and en + ar, always — and tested.
6. WCAG 2.2 AA: keyboard, visible focus (`color-border-focus`, 2px, 2px offset), labels, targets ≥ `target-min` (24px), reduced motion.
7. Stay inside this contract; one component per task; do not refactor unrelated files.

## 13. Commands that must pass

```bash
npm run typecheck
npm run test:web
npm run component-tokens
npm run sync        # must end with READY
npm run docs:check
```

## 14. When you finish

1. Fill [C8 Execution log](button-group.md#c8-execution-log-filled-by-the-executor) in `button-group.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `button-group.md` and in the Components table of `3-web-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).

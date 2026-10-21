<!-- GENERATED from button-group.md @ 4e2ca2dc5ec04fd1 — do not edit; change the source and run: npm run contract -- web button-group -->
# Button group · مجموعة أزرار — Web — code contract

> **Everything you need to build Button group on Web, and nothing else.** Read this file only. Generated from [`button-group.md`](button-group.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](button-group.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Button group · مجموعة أزرار |
| Platform | Web · React + MUI |
| Built on | Custom layout (`div` flex). **Not** MUI `ButtonGroup` (that is a connected control). Overflow uses `IconButton` + the temporary menu from Split button |
| Import | `import { ButtonGroup } from '@biowave/web'` |
| Version | 1.1 · 2026-10-21 |
| Source code | [`src/components/button-group/`](../../src/components/button-group/) |
| Tokens | — |
| Source | [`button-group.md`](button-group.md) @ `4e2ca2dc5ec04fd1` |

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
| `maxVisible` | number | 1–4 | `3` | | Actions beyond this go into the overflow menu. Out of range → clamped to 1–4 |
| `overflowLabel` | string | | "More options" / "خيارات أخرى" | | Overflow trigger name |
| `aria-label` | string | | — | | When set, the group is exposed as `role="group"` with this name |

**Invalid combinations** (dev warning):
- more than one child with `variant="filled"`
- a child with its own `size` different from the group `size` (group wins)
- `align="space-between"` with more than 2 children
- `align` set with `orientation="vertical"` (ignored)
- `maxVisible` outside 1–4 (clamped)
- an action that would overflow but has `href` or `type="submit"` — it stays visible (an overflow menu item calls the child's `onClick()` with no event, so it cannot follow a link or submit a form)

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
| `container` | horizontal | `flex-direction: row`; `justify-content` from `align` (`start` · `center` · `flex-end` · `space-between`); `fill` → children `flex: 1 1 0` |
| `container` | vertical | `flex-direction: column-reverse` (primary = last child on top), `align-items: stretch` → children full width |
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
- Overflow: `React.Children.toArray(children)`; clamp `maxVisible` to 1–4 (`warnOnce` when out of range); if `length > maxVisible`, the first `length - maxVisible` items become menu options built from their props (`children`/`label` → `label`, `onClick` → `onSelect`, `disabled`). Children that are not Button/IconButton, or that have `href` or `type="submit"`, cannot overflow → warn and keep visible (B1).
- Styles only `cssVars.spacing.md` + flex rules. No colors. Container (plan 1.1, finding 1): `display: 'flex'` and `inlineSize: '100%'` in both orientations — no `inline-flex`, no `fit-content`; horizontal `justifyContent` from `align` (`start` · `center` · `flex-end` · `space-between`, `fill` → `flex-start` + children `flex: '1 1 0'`); vertical `flexDirection: 'column-reverse'`, `alignItems: 'stretch'`.
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
- [ ] Invalid combinations warn (incl. `maxVisible` out of range → clamped, overflowing `href` / `type="submit"` child kept visible); axe passes

B9; Button/IconButton/SplitButton tests still pass.

- [ ] (1.1) Layout loop asserts the full B2 rule set per orientation × align, en + ar (finding 3) — see B9 first item
- [ ] (1.1) `maxVisible={0}` and `maxVisible={5}` clamp to 1 and 4 and warn once (finding 7)
- [ ] (1.1) A child with `href` or `type="submit"` that would overflow stays visible and warns (finding 9)
- [ ] (1.1) No per-test timeout argument in `ButtonGroup.test.tsx` (finding 4); no `act(...)` warning in the test run (finding 10)

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

**Fix round 1 — Executor task list** (one list; nothing else is in scope). Rebase on `ds/button-web` (PR #1, shared speedy Emotion test cache, finding 5) once it is merged into `main`; do not re-implement that tooling:
1. #2 Container per C3 / B2 — `display: flex`, `inlineSize: '100%'`, justify-content per `align` — `3-web-components/src/components/button-group/ButtonGroup.tsx`
2. #3 Layout test asserts the full B2 rule set per orientation × align, en + ar — `ButtonGroup.test.tsx`
3. #4 Remove the `20_000` timeout at `ButtonGroup.test.tsx:254`; if still slow, render once per theme/locale with a light fixture — never raise the limit
4. #7 Clamp `maxVisible` to 1–4 with `warnOnce`; test — `ButtonGroup.tsx`, `ButtonGroup.test.tsx`
5. #9 An overflowing child with `href` or `type="submit"` stays visible and warns (B1); test — `ButtonGroup.tsx`, `ButtonGroup.test.tsx`
6. #10 Wrap the ArrowUp test's focus in `act()` or use `user.tab()` + `user.keyboard` — `ButtonGroup.test.tsx`
7. #8 (Executor half) Log the size precedence (group wins, B1/C3) in C8; one `CHANGELOG.md` entry

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

# Badge · شارة — Web

> **One file for Badge on Web:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- web badge`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Badge · شارة |
| Summary | Marks an element with a count, a dot or a check, so people see at a glance that something needs attention or is already true. |
| Summary (ar) | تُميّز عنصرًا بعدد أو نقطة أو علامة صح، ليرى المستخدم فورًا أن هناك ما يحتاج إلى انتباهه أو أمرًا تحقّق بالفعل. |
| Parts | Anchor · indicator · count · check icon · ring |
| Parts (ar) | العنصر المُعلَّم · المؤشر · العدد · أيقونة الصح · الحلقة |
| Platform | Web · React + MUI |
| Built on | MUI `Badge` (`badgeContent`, `max`, `showZero`, `invisible`, `overlap`), restyled from tokens; the Check badge content is the Biowave `Icon` `check` |
| Import | `import { Badge } from '@biowave/web'` |
| Figma | **Biowave DS — Web Components** › `↳ Badge` · build: [Part D](#d--figma-build) |
| Version | 1.1 · 2026-10-24 |
| Plan | Finished |
| Code | Approved |
| Figma build | Planned |
| Review | Round 3 · 2026-10-24 · Approved |
| Source code | [`src/components/badge/`](../../src/components/badge/) |
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
| `warning` | Needs attention soon: pending approvals, delayed syncs — `count` only (a warning counts what is pending; a dot or check has no number to qualify). Its fill is a darker orange than the standard warning fill, so the shape stays visible on a white surface (A9) |
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
| Hidden | `count` is 0 (without `showZero`) or `invisible` is on | Nothing; the anchor looks as it does without a badge. A hidden standalone badge also gives back its space, so no gap stays after its text |
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

### A8 Platform notes — Web

```
Top bar (Icon button + count)        Side navigation item (standalone count)
┌───────────────────────────────┐    ┌───────────────────────────────┐
│  Biowave        [✉](3)  [◆]   │    │ [◆]  Requests            (12) │
└───────────────────────────────┘    └───────────────────────────────┘
```

| | Web |
|---|---|
| Available | ✓ |
| Typical anchors | Icon buttons in the top bar, side navigation items, table row avatars |
| Size | One size; the count uses the `data-sm` text style |
| Interaction | None — pointer and keyboard go to the anchor |
| Not supported | Badges on Buttons with text labels (put the count in the label instead) |

### A9 Accessibility (design)

- Every visible badge has a `label` in English and Arabic; screen readers hear it with the anchor (“Notifications, button, 3 unread messages”)
- The indicator itself is hidden from assistive technology, so the bare number or the dot is never read without meaning
- Meaning never relies on colour alone: the `label` says it, and `count` shows a number
- Text in the badge meets 4.5:1 against the indicator, and the indicator meets 3:1 against the surface, for every allowed colour and variant in both themes — `warning` uses the darker warning icon colour as its fill for this reason (the standard orange fill is too light on a white surface)
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

> The contract — API, dimensions, tokens, states, RTL and accessibility. Code and Figma are reviewed against this part.

### B1 API

#### `Badge`

| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `variant` | enum | `count` · `dot` · `check` | `count` | | A4.1 |
| `count` | number | integer ≥ 0 | — | ✓ for `count` | A2 `count`; ignored by `dot` and `check` |
| `max` | number | integer ≥ 1 | `99` | | A4.3 — above it the badge shows `{max}+` |
| `showZero` | boolean | | `false` | | A4.4 |
| `color` | enum | `error` · `brand` · `secondary` · `success` · `warning` · `info` · `neutral` | `error` (`success` for `check`) | | A4.2 |
| `overlap` | enum | `rectangular` · `circular` | `rectangular` | | A4.5 — only with `children` |
| `invisible` | boolean | | `false` | | A4.6 — hides with the exit transition (B4); a hidden standalone badge takes no inline space (B4 › Hidden standalone) |
| `label` | string | | — | ✓ when visible | A4.7 — the accessible meaning (B6) |
| `children` | slot | one React element | — | | The `anchor`. Absent → standalone inline badge (no `ring`; no space while hidden, B4) |
| `className` · `data-*` · `ref` | | | | | Forwarded to the root `span` |

Platform naming notes: MUI `badgeContent` = `count`; MUI `variant="standard"` = `count`, `"dot"` = `dot`; `check` is Biowave-only (P-05). Flutter `isVisible` = `!invisible`, `semanticLabel` = `label`, `child` = `children`.

**Invalid combinations** (`console.warn` once in development; the badge still renders as described):

| Combination | Fallback |
|---|---|
| `variant="count"` without `count` | Hidden (same as `count={0}`) |
| `count` < 0 or not an integer | Treated as `Math.max(0, Math.floor(count))` |
| `max` < 1 | Treated as `1` |
| `count` set with `dot` or `check` | `count` ignored |
| `check` with `error` or `warning` | Renders `success` |
| `dot` with `warning` | Renders `error` |
| Visible badge without `label` | Renders; warns “badges need a label” |
| `overlap` set without `children` | Ignored |

### B2 Dimensions

```
 count                                    dot              check
    spacing-xs         spacing-xs
     ├─┤               ├─┤
   ┬ ╭──────────────────╮                 ┬ ●              ┬ ╭─────╮
   │ │       99+        │  radius-full    ┴ spacing-md     │ │ [✓] │ radius-full
   ┴ ╰──────────────────╯                                  ┴ ╰─────╯
 size-icon-md   min-inline-size size-icon-md               size-icon-md
                text style data-sm                         └ check-icon size-icon-sm
 ring (anchored only): outside the indicator, border-width-strong

 Placement (anchored, rectangular, LTR)
 ┌────────────────────╳     ╳ = indicator centre = anchor top-end corner
 │ anchor             │
 └────────────────────┘
```

| Part | Property | `count` | `dot` | `check` |
|---|---|---|---|---|
| `indicator` | block-size | `size-icon-md` | `spacing-md` | `size-icon-md` |
| `indicator` | min-inline-size | `size-icon-md` | `spacing-md` (fixed) | `size-icon-md` (fixed) |
| `indicator` | padding-inline | `spacing-xs` | — | — |
| `indicator` | radius | `radius-full` | `radius-full` | `radius-full` |
| `count` | text style | `data-sm` (`.bw-text-data-sm`), `font-variant-numeric: tabular-nums` | — | — |
| `check-icon` | size | — | — | `size-icon-sm` (Icon `size` unset; the indicator sets `font-size`) |
| `ring` | width (anchored only) | `border-width-strong` | `border-width-strong` | `border-width-strong` |

Layout rules:
- Root `span`: `position: relative; display: inline-flex; vertical-align: middle; flex: none`. It hugs the anchor; the badge never changes the anchor's box.
- Anchored `indicator`: `position: absolute`, `pointer-events: none`, `z-index` = `layer-raised` (above the anchor, inside the root's stacking context only). Placement with logical properties: `inset-block-start: 0; inset-inline-end: 0`, translated so its centre sits on the corner (B5). `overlap="circular"`: the reference corner moves inward to the circle's edge at 45° — `inset-block-start` and `inset-inline-end` = 14.6% of the anchor box ((1 − cos 45°) ÷ 2, the same as MUI `overlap="circular"`).
- Standalone `indicator` (no `children`): `position: static`, inline after text, no `ring`, no translation; it aligns to the text's middle. While hidden it is out of the layout (`display: none`, after the exit transition — B4 › Hidden standalone), so it adds no inline size.
- `count`: one line, `white-space: nowrap`, centred; the text is wrapped in `<bdi dir="ltr">` so `99+` never reorders in Arabic.
- `ring`: drawn outside the indicator box as `box-shadow: 0 0 0 var(--bw-border-width-strong) var(--bw-color-border-inverse)` — it adds no layout size.
- `check-icon`: `<Icon name="check" />` centred; never `directional`.

### B3 Tokens by part and state

No component tokens — every value is an existing semantic token (P-04); `badge.tokens.json` is not needed. A badge has one visual state per `color`; there is no hover, pressed, focus or disabled state.

| `color` | `indicator` background | `count` text | `check-icon` |
|---|---|---|---|
| `error` | `color-background-error-default` | `color-text-on-error` | — (not allowed) |
| `brand` | `color-background-brand-default` | `color-text-on-brand` | `color-icon-on-brand` |
| `secondary` | `color-background-secondary-default` | `color-text-on-secondary` | `color-icon-on-secondary` |
| `success` | `color-background-success-default` | `color-text-on-success` | `color-icon-on-success` |
| `warning` | `color-icon-role-warning` | `color-text-inverse` | — (not allowed) |
| `info` | `color-background-info-default` | `color-text-on-info` | `color-icon-on-info` |
| `neutral` | `color-surface-inverse` | `color-text-inverse` | `color-icon-inverse` |

| Part | Property | Token |
|---|---|---|
| `ring` | colour | `color-border-inverse` |
| `ring` | width | `border-width-strong` |

`warning` fill (1.1): `color-background-warning-default` measures 2.20:1 against `color-surface-default` in light, below the B6 non-text 3:1. The fill is `color-icon-role-warning` — the semantic token for a warning graphic on a surface, which the token build already checks at ≥ 3:1 against `color-surface-default` in both themes (`contrast-pairs.json` › “status icon”): 3.24:1 light · 12.20:1 dark. `color-text-on-warning` on it: 6.10:1 light · 13.11:1 dark. No new token, no primitive.

Dark theme: same tokens (values switch automatically). No exceptions.

### B4 States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Hidden → Visible | `invisible` → `false`, or `count` becomes > 0 (or 0 with `showZero`) | `indicator` scale 0 → 1, from its centre | `motion-duration-md` | `motion-easing-standard-decelerate` |
| Visible → Hidden | `invisible` → `true`, or `count` becomes 0 without `showZero` | `indicator` scale 1 → 0, to its centre | `motion-duration-sm` | `motion-easing-standard-accelerate` |
| Count changes | new `count` | none — digits and pill width change at once | `motion-duration-instant` | — |
| `color` / `variant` changes | prop change | none | `motion-duration-instant` | — |
| Initial render | mount while visible | none — no entrance animation on first paint | — | — |

Reduced motion: every transition is instant (built into `tokens.css`).

**Hidden standalone** (no `children`, 1.1): a hidden standalone badge takes no inline space. When it hides, the B4 exit transition plays first; when it ends, the `indicator` leaves the layout (`display: none`), so the text it follows ends where it would without a badge. When it shows, the `indicator` returns to the layout at scale 0 and then plays the enter transition. With reduced motion it leaves and returns at once. A standalone badge that is hidden on first render takes no space from the first paint. Anchored badges are out of flow already; nothing changes for them.
Why: A5 says a hidden badge shows nothing. A blank gap after a label reads as a missing value and puts labels in lists and tabs out of line; one reflow at the end of the exit is the smaller cost.

### B5 RTL

```
LTR   ┌──────────┐(3)        RTL  (3)┌──────────┐
      │  [✉]     │                   │     [✉]  │
      └──────────┘                   └──────────┘
LTR   Inbox (12)              RTL        (12) الوارد
LTR   ╭──────╮(✓)             RTL  (✓)╭──────╮      ← check never mirrored
```

| Part | In RTL |
|---|---|
| `indicator` placement | Top-end corner = top-left: `inset-inline-end` resolves to the left; the centring translation is `translate(50%, -50%)` in LTR and `translate(-50%, -50%)` in RTL (`[dir='rtl'] &`) |
| `count` | Not mirrored; `<bdi dir="ltr">` keeps `99+` in order; Western digits (D-10) |
| `check-icon` | Never mirrored (checkmarks are not directional, `icons.md` › RTL) |
| Standalone | Follows the text flow: after the label at the inline end |

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Indicator | `aria-hidden="true"` on the `indicator` span always — the number, dot or glyph is never read alone |
| Anchored with `label` | Badge renders `<span id={useId()} style={visuallyHidden}>{label}</span>` (`src/internal/visuallyHidden.ts`) and clones the single child adding `aria-describedby` (appended to any ids the child already has). Screen reader: “Notifications, button, 3 unread messages” |
| Hidden badge | No description: the hidden span and the child's added `aria-describedby` id are removed while `invisible` or the count hides it |
| Standalone with `label` | Root `span` gets `role="img"` and `aria-label={label}` |
| Contrast | `count` text on `indicator` ≥ 4.5:1 and `indicator` vs `color-surface-default` ≥ 3:1 for every allowed `color` × `variant` in both themes (B1 rules remove `warning` from `dot` and `check`). `warning` meets it through its `color-icon-role-warning` fill (B3): lowest pairs light `warning` indicator 3.24:1, dark `brand` text 4.65:1 |
| Focus | Never focusable; no `tabIndex`. The anchor's focus ring ([a11y](../../../2-foundations/guidelines/a11y.md)) stays visible — the indicator covers at most its corner |
| Target size | Not a target: `pointer-events: none`; the anchor's target (`target-min`) is unchanged |
| Live updates | No `aria-live` |

| Key | Action |
|---|---|
| — | None. Keyboard interaction belongs to the anchor |

### B7 Examples

```tsx
import { Badge, IconButton, Icon } from '@biowave/web';

// Count on an Icon button
<Badge count={3} label="3 unread messages">
  <IconButton icon={<Icon name="mail" />} label="Messages" />
</Badge>

// Arabic (direction comes from the provider — the badge moves to the top-left)
<Badge count={120} label="أكثر من 99 رسالة">
  <IconButton icon={<Icon name="mail" />} label="الرسائل" />
</Badge>

// Dot
<Badge variant="dot" label="New activity"><Icon name="schedule" size="md" /></Badge>

// Check badge on a circular anchor (Avatar, Day 4)
<Badge variant="check" overlap="circular" label="Verified">{avatar}</Badge>

// Standalone count after a label
<span>Requests <Badge count={12} color="neutral" label="12 pending requests" /></span>
```

### B8 Figma

Structure, properties, the Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

- [ ] Every `variant` × allowed `color` renders the B2 sizes and B3 tokens in light + dark × en + ar (computed styles: `block-size`, `min-inline-size`, `padding-inline`, background, text and icon colour); `count` × `warning` background is `color-icon-role-warning`, never `color-background-warning-default`
- [ ] `count` above `max` shows `{max}+` inside `<bdi dir="ltr">`; `count={0}` hides unless `showZero`; `max` default 99
- [ ] Anchored: `ring` box-shadow uses `border-width-strong` + `color-border-inverse`; standalone: no ring, `position: static`
- [ ] Placement: indicator centre on the anchor's top-end corner in LTR and top-start in RTL (both `overlap` values); the anchor's box size is the same with and without the badge — checked by comparing the anchor's computed styles rendered with and without `Badge` and by asserting the root adds no padding or border and the anchored indicator is out of flow (`position: absolute`), not by reading a style the test set itself
- [ ] B4: hidden ↔ visible transitions use the listed duration/easing tokens; first render has no animation (checked by behaviour — e.g. no transition / `getAnimations()` empty or the initial transform already final — or by a whitespace-tolerant check, never by matching exact source text and line breaks); reduced motion → instant
- [ ] Hidden standalone (B4): while the exit runs the indicator is still in the layout; after its `transitionend` (fired in the test) it has `display: none`; with reduced motion it has `display: none` at once; hidden on first render → `display: none` from the start; shown again → back in the layout at scale 0, then scale 1; an anchored hidden badge never gets `display: none`
- [ ] a11y: indicator `aria-hidden`; anchored label wired by `aria-describedby` (existing ids kept); hidden badge removes it; standalone `role="img"` + name; axe has no violations in light + dark × en + ar
- [ ] `pointer-events: none` declared on the indicator and the anchor's `onClick` kept after cloning (jsdom has no hit testing; name the test for what it checks — the real click-through is a browser check in review)
- [ ] Every invalid combination in B1 warns once and renders the fallback
- [ ] `check-icon` is the Biowave `Icon` with `name="check"`, not mirrored in RTL
- [ ] No raw values (no hex, px, ms or font names in `Badge.tsx`) — same guard as the other components

---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `badge-contract.md`.

| Field | Value |
|---|---|
| Component | Badge |
| Platform | Web (React + MUI) |
| Plan version | 1.1 · 2026-10-24 |

### C1 Goal

`import { Badge } from '@biowave/web'` marks any element (or sits inline) with a count, dot or Check badge in the seven B3 colours, placed on the top-end corner in both directions, animated in and out with the motion tokens, and announced through the anchor's description — built on MUI `Badge`, tokens only.

### C2 Scope

**In scope:** B1–B9 — all props, the three variants (incl. the Check badge, P-05), both `overlap` values, standalone mode, the `aria-describedby` wiring, the dev warnings.

**Out of scope** (do not build)
- Badges inside other components (Tabs, navigation, Avatar) — those components place `Badge` in their own plans
- Live-region announcements of count changes
- Sizes other than the one in B2; custom content (text words, other icons) in the indicator
- Changes to Icon, Icon button or any other component

### C3 Approach

- Base: `@mui/material/Badge` wrapped by `styled(MuiBadge)` in `Badge.tsx`. Map props: `count` → `badgeContent` (only for `variant="count"`), `variant` `count`/`check` → MUI `standard`, `dot` → MUI `dot`; `max`, `showZero`, `invisible` passed through (MUI computes `99+` and the zero-hidden state — wrap the rendered content in `<bdi dir="ltr">` via `badgeContent`). For `check`, `badgeContent` = `<Icon name="check" />` (no `size`; the indicator sets `font-size` to `size-icon-sm`).
- Styles from `cssVars` only (`cssVars.size.icon.md`, `cssVars.spacing.xs`, `cssVars.spacing.md`, `cssVars.radius.full`, `cssVars.border.width.strong`, `cssVars.color.*`, `cssVars.motion.*`, `cssVars.layer.raised`), applied to the MUI `badge` slot. One `switch` from `color` to the B3 tokens; `neutral` uses `color.surface.inverse` / `color.text.inverse` / `color.icon.inverse`; `warning` uses `color.icon.role.warning` / `color.text.inverse` (1.2, colour tokens 2026-10-27). `error` and `warning` have no `check-icon` token (B3 “—”): the map gives them none (`icon` optional in the map type), so no unlisted token sits in the component.
- Placement: override MUI's `anchorOrigin` styles completely — set `top`/`right`/`transform` to `unset` and use `inset-block-start` / `inset-inline-end` plus `transform: translate(50%, -50%)`, and `[dir='rtl'] &` → `translate(-50%, -50%)` (B5). Visibility combines with the translation: hidden = `translate(…) scale(0)`, visible = `translate(…) scale(1)`, `transform-origin: center`.
- Transitions: replace MUI's `theme.transitions` on the `badge` slot with `transform` timed by B4 — `motion-duration-md` + `motion-easing-standard-decelerate` when becoming visible, `motion-duration-sm` + `motion-easing-standard-accelerate` when hiding (set the transition on the `.MuiBadge-invisible` state for the exit). No transition on first paint.
- Standalone (no `children`): add class `bw-badge-standalone`; the `badge` slot becomes `position: static`, no transform, no ring.
- Hidden standalone (1.1, B4): keep an internal “collapsed” flag. Hidden on first render → collapsed. On hide → collapse on the indicator's `transitionend` for `transform`, or at once when `prefers-reduced-motion: reduce` matches (a 0 s transition fires no `transitionend`). On show → un-collapse first (still at scale 0), then remove the hidden state on the next frame so the enter transition runs. Collapsed = `display: none` on the `badge` slot (class `bw-badge-collapsed`). Anchored badges never collapse. Gotcha: a `transitionend` from the check `Icon` or another property must not collapse it — check `event.target` and `propertyName`.
- a11y per B6: `useId()` for the description; `React.cloneElement(children, { 'aria-describedby': [existing, id].filter(Boolean).join(' ') })` only when visible and `label` is set; `visuallyHidden` from `src/internal/visuallyHidden.ts`.
- Dev warnings: one `warnOnce` per combination in B1 (`process.env.NODE_ENV !== 'production'`).
- Gotchas: stylis-plugin-rtl flips physical `right` → `left` in MUI's own styles; because the override uses logical properties and an explicit `[dir='rtl']` translation, make sure the flipped MUI `left` is also `unset` (test the RTL geometry). MUI's `dot` variant has its own `min-width`/`height`/`padding` — override all three from B2.

### C4 Token gaps

None. Every value in B2–B3 is an existing semantic token; no component tokens are needed (P-04, D-13).

### C5 Files to create / change

```
3-web-components/src/components/badge/Badge.tsx         new: Badge, BadgeProps, BadgeVariant, BadgeColor
3-web-components/src/components/badge/Badge.test.tsx    new
3-web-components/src/components/badge/index.ts          new
3-web-components/src/index.ts                           change: export Badge + types
3-web-components/README.md                              change: Badge row Code status
CHANGELOG.md                                            change
```

### C6 Tests

Implement every item in B9, plus:
- [ ] Type test: `variant="check"` with `color="error"` still compiles (runtime fallback, B1) but an unknown `color` does not (`// @ts-expect-error`)
- [ ] The Icon guard (`src/test/noLegacyIcons.test.ts`) still passes — the check glyph comes from `Icon`
- [ ] (1.1) The colour test table has no `check-icon` token for `error` and `warning` (matches B3 and the component map)
- [ ] (1.1) The three B9 items rewritten in 1.1 (anchor box size, click-through, first render) test behaviour as B9 says; no test matches source text with exact line breaks

### C7 Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 exactly (names, types, defaults, fallbacks, warnings)
- [ ] AC-2 Every value in B2–B3 comes from the listed token; no raw values, no primitives
- [ ] AC-3 B4 transitions implemented (enter/exit timings differ, no first-paint animation); reduced motion respected
- [ ] AC-4 RTL behaves as B5 (top-start placement, `99+` not reordered, check not mirrored); a11y as B6 (axe clean)
- [ ] AC-5 Tests in B9 and C6 exist and pass; `npm run typecheck`, `npm run test:web`, `npm run docs:check` pass
- [ ] AC-6 Exported from `src/index.ts`; section README status updated
- [ ] AC-7 The anchor is untouched except for the appended `aria-describedby`: same box size, same click target, same focus ring
- [ ] AC-8 (1.1, finding 1) `count` × `warning` indicator uses `color-icon-role-warning`; measured ≥ 3:1 against `color-surface-default` in light and dark; text `color-text-on-warning`
- [ ] AC-9 (1.1, finding 2) A hidden standalone badge takes no inline space after its exit transition (at once with reduced motion), per B4 › Hidden standalone; anchored badges unchanged
- [ ] AC-10 (1.1, findings 4, 5) No `check-icon` token for `error` / `warning` in `Badge.tsx` or the test table; the three B9 items test behaviour (C6 1.1)
- [ ] AC-11 (1.1) C8 gets a "Fix round 1" entry listing every command with ✓/✗ and real numbers: `npm run typecheck`, `npm run test:web` (passed/total), `npm run docs:check`

**Fix round 1 — Executor task list** (one list; nothing else is in scope):
1. #1 `warning` fill → `cssVars.color.icon.role.warning` (B3) — `Badge.tsx`; update the colour test table and add the B9 `warning` assertion — `Badge.test.tsx`
2. #2 Hidden standalone takes no space (B4 › Hidden standalone, C3) — `Badge.tsx` + the B9 hidden-standalone tests — `Badge.test.tsx`
3. #4 Drop the unreachable `icon` value for `error` and `warning` (make it optional in the map type) — `Badge.tsx`; same in the test table — `Badge.test.tsx`
4. #5 Rewrite the three declaration-only tests as B9 (1.1) says: (a) anchor box size by comparison, (b) name the click-through test for what it checks, (c) first render by behaviour or a whitespace-tolerant check — `Badge.test.tsx`
5. C8 "Fix round 1" entry (AC-11); one `CHANGELOG.md` entry

Files the Executor may touch in this fix round: `3-web-components/src/components/badge/Badge.tsx`, `3-web-components/src/components/badge/Badge.test.tsx`, C8 of this file and `CHANGELOG.md`. No other component, no tokens, no foundations files.

---

### C8 Execution log (filled by the Executor)

| Field | Value |
|---|---|
| Agent | Codex (`workflow-implement`) |
| Date | 2026-10-24 |
| Built | Web Badge 1.0 on MUI Badge: count, dot and Check variants; seven contract colours with runtime fallbacks; rectangular/circular and standalone placement; tokenized ring, dimensions and enter/exit motion; RTL-safe placement/counts; accessible anchored and standalone labelling; development warnings; public exports. |
| Files changed | `3-web-components/src/components/badge/Badge.tsx` · `3-web-components/src/components/badge/Badge.test.tsx` · `3-web-components/src/components/badge/index.ts` · `3-web-components/src/index.ts` · `3-web-components/components/badge/badge.md` · `3-web-components/README.md` · `CHANGELOG.md` |
| Checks | `npm run component-tokens` ✓ · `npm run sync` ✓ READY · `npm run typecheck` ✓ · `npm run test:web` ✓ (121/121) · `npm run docs:check` ✓ |

**Deviations:** none
**Questions for the Planner:** none

#### Fix round 1 — 2026-10-24

| Finding | What changed (`file:line`) | Test that proves it |
|---|---|---|
| #1 — warning fill | `Badge.tsx:78-82` maps `warning` to `color-icon-role-warning` with `color-text-on-warning`. | `Badge.test.tsx:143-160` checks the warning fill and text tokens and rejects `color-background-warning-default`. |
| #2 — hidden standalone layout | `Badge.tsx:231-290, 367-395` tracks the standalone exit, collapses only after its own `transform` transition, collapses immediately for reduced motion or an initially hidden mount, and restores layout before the next-frame enter; anchored badges never collapse. | `Badge.test.tsx:320-411` covers exit timing, irrelevant/child transition events, `display: none`, next-frame re-entry, initial hidden state, reduced motion and anchored behavior. |
| #4 — unreachable check-icon tokens | `Badge.tsx:44-100` makes `icon` optional and omits it for `error` and `warning`. | `Badge.test.tsx:25-62, 158-159` mirrors the optional map and asserts both values are absent. |
| #5 — behavioural B9 tests | `Badge.test.tsx:200-318, 422-446` compares computed anchor box styles with and without Badge, verifies the initial visible transform, and names/asserts `pointer-events: none` plus preserved anchor `onClick`. | The cited tests exercise rendered behavior without exact multiline source matching or simulated browser hit-testing. |

**Checks:** `npm run docs:check` ✓ (21 component files) · `npm run typecheck` ✓ (2 TypeScript projects, 0 errors) · `npm run test:web` ✓ (125/125 tests, 9/9 files; Badge 18/18)

**Deviations:** none
**Questions for the Planner:** none

#### Fix round 2 — 2026-10-24

| Finding | What changed (`file:line`) | Test that proves it |
|---|---|---|
| #1 — fast re-hide leaves standalone space | `Badge.tsx:231-320, 415-424` collapses an already-hidden standalone badge immediately, checks for an empty Web Animations list when no exit can run, and collapses its own canceled `transform` transition. | `Badge.test.tsx:323-428` keeps the normal transition path, covers collapsed → show → hide at 0 ms and 16 ms, and covers `transitioncancel`; first-paint and reduced-motion coverage remains at `Badge.test.tsx:430-456`. |
| #2 — root box assertion | `Badge.test.tsx:224-266` checks the Badge root's computed padding and border width are zero alongside the existing anchor box comparison and absolute indicator assertion. | `places rectangular and circular indicators at the logical top-end in LTR and RTL` runs for both overlaps in English and Arabic. |

**Checks:** `npm run docs:check` ✓ (21 component files) · `npm run typecheck` ✓ (2 TypeScript projects, 0 errors) · `npm run test:web` ✓ (128/128 tests, 9/9 files; Badge 21/21)

**Deviations:** none
**Questions for the Planner:** none

---

## D · Figma build

> How to build Part B in Figma. The Figma Agent receives this through the generated `figma-badge-contract.md`.

> Written by the Planner (Claude) together with Part C. Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> **Values are never written here.** Sizes, tokens, states and timings come from B2–B4.
> **One file per platform (D-12).** This file builds the Web Badge set in **Biowave DS — Web Components**. Tablet and Mobile build their own sets from their own Part D.

| Field | Value |
|---|---|
| Component | Badge |
| Platform | Web |
| Figma file | **Biowave DS — Web Components** (`_sync/figma-files.json` › `web`) |
| Page / section | `↳ Badge` › sections `Badge` and `Badge — Documentation` |
| Mode | **Create new.** The Check badge (P-05) is the `Variant=Check` of this set, not a separate set |
| Plan version | 1.1 · 2026-10-24 |

### D1 Rules for this build

0. **Library first; no component tokens (D-13).** Badge has no `badge.tokens.json` (B3: every value is a semantic token). Bind directly to the **Biowave DS — Foundations** library variables listed in the contract; never create local variables, collections or styles. Text style `Web/{en|ar}/data/sm`; the check glyph is the **Icon** set in this file.
1. **Every value is bound.** Fill, stroke colour and weight, radius, padding, height, min width → variables; text → text style. No raw hex / px.
2. **Token → variable:** `-` between segments becomes `/`: `color-background-error-default` → `1. Themes › color/background/error/default`; `color-surface-inverse` → `1. Themes › color/surface/inverse`; `color-icon-role-warning` → `1. Themes › color/icon/role/warning` (the `Warning` fill, B3); `size-icon-md` → `4. Size › size/icon/md`; `spacing-xs` → `3. Spacing › spacing/xs`; `spacing-md` → `3. Spacing › spacing/md`; `radius-full` → `2. Radius › radius/full`; `border-width-strong` → `9. Border › border/width/strong`; `color-border-inverse` → `1. Themes › color/border/inverse`.
3. **Never** bind `_Primitive/*` or `_deprecated/*`.
4. **Layer names = anatomy part names** (A2): the component itself is `indicator`; children `count`, `check-icon`. The `ring` is the indicator's outside stroke. `anchor` exists only in documentation examples.
5. Auto layout on the component. Absolute positioning only in documentation examples, where the badge instance is placed on an anchor's top-end corner (B2 placement).
6. `check-icon` is an instance of the **Icon** set in this file (`Size=SM`, `Glyph` = `check`), never detached. Build Icon first.

### D2 Component structure

```
❖ Badge                    ← component set (published) on page ↳ Badge
  (no private base components)
```

### D3 Layer tree and auto layout

```
indicator (Badge)     ↔ horizontal · align center/center · height fixed {B2 block-size}
│                       min width {B2 min-inline-size} · width hug (Count) / fixed (Dot, Check)
│                       pad-inline {B2 padding-inline, Count only} · radius {B2 radius}
│                       fill {B3 indicator background}
│                       stroke OUTSIDE {B3 ring colour} · weight {B3 ring width} — Ring=On only
├── count             T text style Web/{en|ar}/data/sm · fill {B3 count text} · TEXT `Count`
│                       hug · no wrap · Variant=Count only
└── check-icon        ◇ Icon instance (Size=SM, Glyph=check) · fill {B3 check-icon}
                        Variant=Check only
```

```
Count, Ring=On      Dot, Ring=On     Check, Ring=On
  ╭───────╮           ●                ╭─────╮
  │  99+  │                            │ [✓] │
  ╰───────╯                            ╰─────╯
     ③                 ②                  ④
```

### D4 Properties

This table is the source for Code Connect (D9).

| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `Variant` | VARIANT | `Count` · `Dot` · `Check` | `Count` | `variant` | `'count'` · `'dot'` · `'check'` |
| `Color` | VARIANT | `Error` · `Brand` · `Secondary` · `Success` · `Warning` · `Info` · `Neutral` | `Error` | `color` | `'error'` … `'neutral'` |
| `Ring` | VARIANT | `On` · `Off` | `On` | `children` | `On` = anchored (children present) · `Off` = standalone |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | Figma only, `Count` variants only (text style); code takes language from the provider |
| `Count` | TEXT | | `3` | `count` | the shown text; `99+` stands for `count` > `max` |

**Icons used:** `check` · `mail`

### D5 Variants to generate

- Axes: `Variant × Color × Ring × Language`, with the B1 combination rules:
  - `Count`: 7 colours × 2 `Ring` × 2 `Language` = 28
  - `Dot`: 6 colours (no `Warning`) × 2 `Ring`, `Language=EN` only = 12
  - `Check`: 5 colours (no `Error`, `Warning`) × 2 `Ring`, `Language=EN` only = 10
- Total **50 variants**. Defaults: `Count`, `Error`, `On`, `EN`; for `Check` instances set `Color=Success`.
- Grid of the raw set: rows = `Variant › Ring › Language`, columns = `Color`; gap `spacing/xl`.

### D6 States, interactions and motion

No interactive states and no prototype interactions in the set. Doc page 04 shows Hidden → Visible and Visible → Hidden with `Doc/Motion row`, using the B4 durations and easing as written values.

### D7 RTL

Method: `Language=AR` variants for `Count` (Arabic text style; digits stay Western, D-10, and `99+` keeps its order). The badge itself has no direction. Doc page 08 shows the placement mirror: anchored on the top-end corner in EN (top-right) and on the top-start corner in AR (top-left); `check-icon` never mirrored.

```
EN  ┌──────────┐(3)        AR  (3)┌──────────┐
    │  [✉]     │                  │     [✉]  │
    └──────────┘                  └──────────┘
```

### D8 Documentation pages

Build the 12 standard pages (`_templates/component.md` D8 + `2-foundations/figma-doc-kit.md` › Page layouts) in section `Badge — Documentation` on `↳ Badge`, frames `Badge / 00 Component sheet` … `Badge / 11 Changelog` (version 1.1: page `10` shows F0), only from the Doc Kit. If the Doc Kit is not published, finish Phase 1 and report "docs waiting for Doc Kit".

Page notes for Badge:
- 01 Introduction: one Icon button (`mail`) with a `Count` badge, one with a `Dot`, one avatar stand-in (`Doc/Skeleton` circle until Avatar exists) with a `Check` badge; Light and Dark panels.
- 03 Variations: `Variant` row, `Color` row per variant (allowed colours only), `overlap` rectangular vs circular, standalone after a label (`Ring=Off`), `max` (`99+`).
- 04 States and motion: hidden → visible → hidden with B4 timings.
- 08 RTL: EN and AR anchored pairs (D7) and a standalone AR row: `الوارد (12)`.
- 09 Accessibility: the label read with the anchor (“Notifications, button, 3 unread messages”), contrast pairs (incl. the `Warning` fill on `color/icon/role/warning`, B3), why `Warning` is `Count` only (A4.2).
- 10 Changes from previous version: F0 (1.1).

Component description: "Marks an element with a count, a dot or a check (Check badge). Never interactive. Spec: 3-web-components/components/badge/badge.md".

### D9 Code Connect

- File: `3-web-components/src/components/badge/Badge.figma.tsx`
- Mapping: D4 table (`Variant` → `variant`, `Color` → `color`, `Count` → `count`, `Ring=Off` → no children). Publish only after code and Figma reviews are both `Approved`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Set `Badge` on `↳ Badge` in the Web file; layer names match D3 and A2
- [ ] F-AC-2 Properties match D4 exactly (names, types, values, defaults)
- [ ] F-AC-3 Variant count = 50; no `Dot × Warning`, no `Check × Error/Warning`, no AR `Dot`/`Check`
- [ ] F-AC-4 Zero raw values: fill, stroke colour and weight, radius, padding, height, min width and text bound (QA lint report attached); zero local variables or styles
- [ ] F-AC-5 Correct in Light and Dark (variable mode switch only); Typography mode `Web`
- [ ] F-AC-6 `check-icon` is an Icon instance (`check`, Rounded), not detached and not mirrored
- [ ] F-AC-7 AR variants per D7; component description filled
- [ ] F-AC-8 Values match B2–B3 one by one (redline on every `Variant` with `Ring=On`); `Count × Warning` fill bound to `color/icon/role/warning`
- [ ] F-AC-9 Documentation pages per D8 (or reported blocked by the Doc Kit); Components List card

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
| 3 | 2026-10-24 | **Approved** | not reviewed |
| 2 | 2026-10-24 | **Changes requested** | not reviewed |
| 1 | 2026-10-24 | **Approved** | not reviewed |

### E4 Round 3 — 2026-10-24

| Field | Value |
|---|---|
| Plan version reviewed | 1.1 |
| Spec version reviewed | 1.1 |
| Reviewer | Claude |
| Date | 2026-10-24 |
| Verdict | **Approved** — Round 2 #1 is fixed: in a real headless browser a collapsed standalone badge shown and hidden again at 0 ms, ~16 ms (and every 4 ms step up to 64 ms, and after 1, 2 or 3 animation frames) now collapses to the no-badge width, in light/en and dark/ar, for both `invisible` and `count` 0 → 1 → 0. `transitioncancel` is handled. #2 is fixed. Round 2's AC-8 … AC-11 measurements still hold; nothing new broke |

Commands run by the Reviewer on branch `ds/badge-web` at `9841923` (fix round 2 = latest commit; `git diff origin/main...HEAD -- 3-web-components/src` = the four C5 files only; fix commit touches `Badge.tsx`, `Badge.test.tsx`, C8, README, CHANGELOG, run record):
`npm run docs:check` ✅ 21 component files · `npm run typecheck` ✅ (2 projects) · `npm run test:web` ✅ **128/128**, 9 files, 5.89 s, first run, default timeouts (load average 5.19). Badge alone: 21/21 in 2.2 s.
Real browser: the same setup as Round 2 — my own headless Chrome 156 (`--headless=new`, CDP on a private port, not the shared pane) running the real `Badge` / `IconButton` / `Icon` from `3-web-components/src` in `BiowaveProvider` with the generated `tokens.css` + `icons.css`, served by a scratch Vite config outside the repo (private port), 1200 × 900, light/en and dark/ar, `prefers-reduced-motion` emulated as `no-preference` and `reduce`. Standalone widths measured on an `inline-block` line "Requests" + Badge vs the same line without a badge. Both processes (Vite, Chrome) were started by me and stopped by PID afterwards.

#### Acceptance criteria

| AC | Result | Evidence (file:line / test name) |
|---|---|---|
| AC-1 API = B1 | ✅ | No API change in fix round 2 (`Badge.tsx:205-241`); test *warns once for every invalid combination and renders each fallback* passes |
| AC-2 Tokens only | ✅ | Fix adds no values (`Badge.tsx:231, 252-262, 301-320, 418`); guard test *contains no raw colors…* passes. Browser: count 20 × 20, dot 8 × 8, check 20 × 20 in both themes |
| AC-3 B4 transitions; reduced motion | ✅ | The new "no running animation → collapse at once" path does not skip the normal exit: visible → hidden still scales 1 → 0.63 (~41–46 ms) → 0 (~107 ms) at `0.1s cubic-bezier(0.3,0,1,1)` and leaves the layout at ~128–141 ms; enter `0.2s cubic-bezier(0,0,0,1)` scale 0 → 1 by ~230 ms (en + ar). First visible paint `transform: none`, `getAnimations()` = 0. Reduce: `0s`, `display: none` on the first frame, back at once on show |
| AC-4 RTL / a11y | ✅ | Anchored centre on the top-end corner: en (140, 184) = button right/top; ar (616, 188) = button left/top; circular (134.17, 189.83) vs 14.6 % point (134.16, 189.84). Standalone collapse in ar = reference (55.91 px). axe test passes in all 4 combos; 0 `tabindex` nodes inside the indicator |
| AC-5 Tests + checks | ✅ | B9/C6 items covered (`Badge.test.tsx`); new tests *collapses a standalone re-hidden after 0 ms / 16 ms when no exit transition can run* (`:375-415`) and *collapses a hidden standalone when its transform exit is canceled* (`:417-428`); 3 checks pass above |
| AC-6 Export + README | ✅ | `src/index.ts`, `src/components/badge/index.ts` unchanged; README row = header (set by this review) |
| AC-7 Anchor untouched | ✅ | Browser: anchored IconButton 40 × 40 = plain 40 × 40, root 40 × 40 (en + ar); `elementFromPoint` in the indicator → BUTTON; ring `0 0 0 2px rgb(255,255,255)`, `pointer-events: none`, `z-index: 1`; Tab → `:focus-visible`, `outline: solid 2px rgb(37,68,113)`, offset 2 px. Test now also asserts root computed padding 0 and border-width 0 (`Badge.test.tsx:230, 254-255`) |
| AC-8 `count` × `warning` fill | ✅ | Unchanged (`Badge.tsx:78-82`). Re-measured: **light** fill `rgb(217,116,36)` = `--bw-color-icon-role-warning` (≠ `background-warning-default` `rgb(255,148,53)`), vs `#FFFFFF` **3.24:1**, text `rgb(10,10,10)` **6.10:1**. **Dark** fill `rgb(255,200,143)`, vs `rgb(20,20,20)` **12.20:1**, text **13.11:1**. Lowest shape: light `count`×`warning` 3.24, dark `count`×`brand` 4.33; lowest text: light `error` 5.18, dark `brand` 4.65 — same as Round 2 |
| AC-9 Hidden standalone takes no space | ✅ | `Badge.tsx:252-262` collapses at once when the badge was still hidden (`standaloneHidden`), when reduced motion is on, or when `getAnimations()` is empty; `:301-320` collapses on its own `transform` `transitioncancel`. Browser — the Round 2 race: collapsed → show → hide after d = 0, 16, 50, 100 ms → `display: none`, line 59.98 = reference (was 83.44, stuck). Sweep d = 0…64 ms in 4 ms steps × light/en + dark/ar × `invisible` + `count` 1 → 0: **0 failures** (68 cases). Hide after exactly 1, 2, 3 rAF: all `none`. visible → hide → show → hide in 10 / 60 ms steps: `none`. 20-step toggle burst every 7 ms ending visible → `flex` 83.44, then hide → `none` 59.98. Normal exit, `count` → 0, reduced motion, hidden on first render (`invisible` and `count={0}`): `display: none`, width = reference. Anchored hidden (incl. 0 → 3 → 0 in 5 ms): `display: flex`, no `bw-badge-collapsed`, root 40 × 40 |
| AC-10 No unreachable icon tokens; behavioural tests | ✅ | Unchanged from Round 2 (`Badge.tsx:44-48, 78-82, 95-100`; `Badge.test.tsx:25-62, 158-159`); new tests check rendered class and computed `display`, not source text |
| AC-11 C8 Fix round 1 entry | ✅ | C8 › *Fix round 1* unchanged; C8 › *Fix round 2 — 2026-10-24* also lists docs:check ✓ (21), typecheck ✓ (2 projects, 0 errors), test:web ✓ 128/128, Badge 21/21 — the same as my run |

#### Rule checks (AGENTS.md §2)

| Rule | Result | Notes |
|---|---|---|
| No generated files edited | ✅ | Fix commit: `Badge.tsx`, `Badge.test.tsx`, C8, README, CHANGELOG, run record |
| No raw values / no primitives | ✅ | Guard test passes; fix adds logic only |
| RTL first | ✅ | No placement change; ar collapse and placement measured above |
| Both themes, both languages, tested | ✅ | Render matrix + axe light/dark × en/ar; race sweep run in light/en and dark/ar |
| Accessibility WCAG 2.2 AA | ✅ | Contrast unchanged (≥ 3:1 shape, ≥ 4.5:1 text); reduced motion instant |
| Tests via `renderWithBiowave`, default timeouts | ✅ | No timeout arguments; `requestAnimationFrame` / `cancelAnimationFrame` spies restored in `finally` |
| Stayed inside the contract / one component | ✅ | Only the files listed for the fix round |
| Changelog | ✅ | `CHANGELOG.md` › *Fixed — Web Badge review round 2* |

#### Figma build (Part D)

Skipped — Figma build is `Planned`.

#### Probe evidence

```
Headless Chrome 156, 1200×900, real Badge in BiowaveProvider + tokens.css
Re-hide race (collapsed → show → hide after d ms, settled 450–500 ms later)    Round 2 → Round 3
  d=0    flex scale 0 w=83.44 (stuck)  →  none w=59.98/59.98 ✓
  d=16   flex scale 0 w=83.44 (stuck)  →  none w=59.98/59.98 ✓
  d=50, 100                            →  none 59.98 ✓
  sweep d=0..64 step 4 × {light/en, dark/ar} × {invisible, count 1→0}: 68/68 none, w = reference
  hide after 1/2/3 rAF (both locales, both triggers): none ✓
  visible→hide→show→hide 10/60 ms steps: none 59.98 ✓ · 20× toggle burst every 7 ms: ends flex 83.44, then hide → none 59.98
Normal standalone exit still animates
  light/en  0ms m(1) · 41ms m(0.627) · 107ms m(0) flex 83.44 · 141ms none 59.98
  dark/ar   0ms m(1) · 42ms m(0.628) · 109ms m(0) flex 77.02 · 142ms none 55.91
  enter     0ms none · ~27ms flex m(0) · 228ms m(1)
  reduce    hide: none at once · show: flex, transform none
Contrast  light warning 217,116,36 3.24 / text 6.10 · dark 255,200,143 12.20 / 13.11
Anchored  en (140,184) = btn top-right · ar (616,188) = btn top-left · circular Δ < 0.02 px
          root 40×40 = plain 40×40 · hit → BUTTON · hidden after exit: flex, no collapse class
```

#### Previous round findings

| Round 2 # | Status | Evidence |
|---|---|---|
| 1 (Executor, fast show → hide leaves a gap) | Fixed | `Badge.tsx:252-262, 301-320`; tests `Badge.test.tsx:375-428`; browser race probe above: 0 / 16 ms and the 68-case sweep all collapse to the reference width |
| 2 (Executor, root padding/border assertion) | Fixed | `Badge.test.tsx:230, 254-255` assert computed root `padding` and `border-width` = 0 for both overlaps × en/ar |

#### Findings

None.

#### Next step

- Approved → Code `Approved` (header + README). Plan stays `Finished`. Figma build is still `Planned` and was not reviewed.

### E3 Round 2 — 2026-10-24

| Field | Value |
|---|---|
| Plan version reviewed | 1.1 |
| Spec version reviewed | 1.1 |
| Reviewer | Claude |
| Date | 2026-10-24 |
| Verdict | **Changes requested** — AC-8, AC-10 and AC-11 are met and Round 1's measurements still hold, but AC-9 fails in one case I could reproduce: if a collapsed standalone badge is shown and then hidden again within about one frame, it stays in the layout at scale 0 for good (🟡 #1). Plus one 🟢 test nit |

Commands run by the Reviewer on branch `ds/badge-web` at `4571bbf` (fix round 1 = latest commit; `git diff origin/main...HEAD -- 3-web-components/src` = the four C5 files only):
`npm run docs:check` ✅ 21 component files · `npm run typecheck` ✅ (2 projects) · `npm run test:web` ✅ **125/125**, 9 files, 5.36 s, first run, default timeouts (load average 4.35). Badge alone: 18/18 in 2.2 s.
Real browser: my own headless Chrome 156 (`--headless=new`, CDP on a private port, not the shared pane). It ran the real `Badge` / `IconButton` / `Icon` from `3-web-components/src` inside `BiowaveProvider` with the generated `tokens.css` + `icons.css`, served by a scratch Vite config outside the repo, at 1200 × 900, in light/en, dark/ar (+ light/ar for placement), with `prefers-reduced-motion` emulated as `no-preference` and `reduce`. I measured standalone widths on an `inline-block` line that holds "Requests" + Badge and compared them with the same line without a badge. Both processes were stopped by PID afterwards.

#### Acceptance criteria

| AC | Result | Evidence (file:line / test name) |
|---|---|---|
| AC-1 API = B1 | ✅ | Unchanged from Round 1 (`Badge.tsx:22-34, 205-341`); test *warns once for every invalid combination and renders each fallback* passes |
| AC-2 Tokens only | ✅ | `cssVars.*` only; guard test *contains no raw colors…* passes. Browser: count 20 × 20, dot 8 × 8, check 20 × 20 in both themes (same as Round 1) |
| AC-3 B4 transitions; reduced motion | ✅ | Anchored: enter `0.2s cubic-bezier(0,0,0,1)`, exit `0.1s cubic-bezier(0.3,0,1,1)` (en + ar). Standalone exit scale 1 → 0.63 at ~40 ms → collapsed at ~105–114 ms; enter scale 0 → 1 done at ~230 ms. First visible paint: `transform: none`, `getAnimations()` = 0. Reduce: `0s`, no intermediate frames |
| AC-4 RTL / a11y | ✅ | Indicator centre on the anchor's top-end corner: en (140, 184) = button right/top, ar (1060, 188) = button left/top; circular (134.17, 189.83) vs 14.6 % point (134.16, 189.84). axe test passes in all 4 combos; 0 focusable nodes inside the indicator |
| AC-5 Tests + checks | ✅ | All B9/C6 items have a test (`Badge.test.tsx:85-625`); 3 checks pass above. Test gap for #1 below |
| AC-6 Export + README | ✅ | `src/index.ts`, `src/components/badge/index.ts` unchanged; README row = header (set by this review) |
| AC-7 Anchor untouched | ✅ | Browser: anchored IconButton 40 × 40 = plain 40 × 40, root 40 × 40; `elementFromPoint` inside the indicator → BUTTON (en + ar); Tab → `:focus-visible`, `outline: solid 2px rgb(37,68,113)`, offset 2 px |
| AC-8 `count` × `warning` fill | ✅ | `Badge.tsx:78-82` (`cssVars.color.icon.role.warning` + `color.text.on.warning`). Browser, measured: **light** fill `rgb(217,116,36)` = `--bw-color-icon-role-warning` (not `--bw-color-background-warning-default` `rgb(255,148,53)`), vs surface `#FFFFFF` **3.24:1**, text `rgb(10,10,10)` on fill **6.10:1**. **Dark** fill `rgb(255,200,143)` = role-warning, vs surface `rgb(20,20,20)` **12.20:1**, text **13.11:1**. Every allowed colour × variant now ≥ 3:1 shape (lowest light `count`×`warning` 3.24, dark `count`×`brand` 4.33) and ≥ 4.5:1 text (lowest light `error` 5.18, dark `brand` 4.65). Test *uses the warning graphic token for the count fill and no warning check-icon token* |
| AC-9 Hidden standalone takes no space | ❌ | Normal paths work (`Badge.tsx:236-291, 370, 392-393`). Browser, light/en: line 83.44 px visible, then during the exit still 83.44 px (`display: flex`, scaling), then 59.98 px = no-badge line once collapsed. Dark/ar: 77.02 → 55.91 = reference. `count` → 0 collapses too. Reduce: 59.98 / 55.91 on the first frame after hiding; it comes back on the next frame at scale 1. Hidden on first render (`invisible` or `count={0}`): `display: none` straight after the synchronous commit, before any paint. Show again: one frame `display: none`, then `display: flex` at `matrix(0…)` → 1. Anchored hidden: `display: flex`, no `bw-badge-collapsed`, root still 40 × 40 (en + ar). **Fails:** collapsed → show → hide within 0–16 ms leaves `display: flex; transform: matrix(0,0,0,0,0,0)`, line 83.44 px (a 23.46 px blank) **permanently**, with `getAnimations()` = 0. At 50 ms and later it collapses correctly — finding #1 |
| AC-10 No unreachable icon tokens; behavioural tests | ✅ | `Badge.tsx:44-48, 78-82, 95-100` (`icon?`, none for `error` / `warning`); test table `Badge.test.tsx:25-62` + assertions `:158-159`. (a) the anchor box test compares the computed styles of the anchor with and without Badge (`:200-273`); (b) *appends and removes the description, declares pointer-events none, and preserves anchor onClick* says what it checks; (c) first render is checked by behaviour (initial transform already final, `:276-289`). Only whitespace-tolerant source checks are left (`toContain` of single tokens, regex `:414-417, 623-625`). Nit #2 |
| AC-11 C8 Fix round 1 entry | ✅ | C8 › *Fix round 1 — 2026-10-24*: docs:check ✓ (21), typecheck ✓ (2 projects, 0 errors), test:web ✓ 125/125, Badge 18/18 — the same as my run |

#### Rule checks (AGENTS.md §2)

| Rule | Result | Notes |
|---|---|---|
| No generated files edited | ✅ | Fix commit: `Badge.tsx`, `Badge.test.tsx`, C8, README, CHANGELOG, run record |
| No raw values / no primitives | ✅ | Guard test passes; `color-icon-role-warning` is semantic |
| RTL first | ✅ | Logical properties unchanged; standalone collapse is the same in ar (55.91 = reference) |
| Both themes, both languages, tested | ✅ | Render matrix + axe light/dark × en/ar; browser checked both |
| Accessibility WCAG 2.2 AA | ✅ | Contrast now ≥ 3:1 for every allowed shape; reduced motion instant |
| Tests via `renderWithBiowave`, default timeouts | ✅ | No timeout arguments; `requestAnimationFrame` / `matchMedia` stubs are restored in `finally` |
| Stayed inside the contract / one component | ✅ | Only the files listed in the Fix round 1 task list |
| Changelog | ✅ | `CHANGELOG.md` › *Fixed — Web Badge review round 1* |

#### Figma build (Part D)

Skipped — Figma build is `Planned`.

#### Probe evidence

```
Headless Chrome 156, 1200×900, real Badge in BiowaveProvider + tokens.css
Contrast            fill                  vs surface   text on fill
  light warning     rgb(217,116,36)       3.24         6.10     (bg-warning-default would be rgb(255,148,53))
  dark  warning     rgb(255,200,143)      12.20        13.11
  lowest light      count×warning 3.24 · text error 5.18
  lowest dark       count×brand 4.33   · text brand 4.65
Standalone "Requests <Badge count=12 neutral/>"   line width / no-badge reference
  light/en  visible 83.44/59.98 · exit 0–71ms flex, scale 1→0.23, 83.44 · 105ms none 59.98/59.98
            enter 0ms none 59.98 · 30ms flex scale 0, 83.44 · 230ms scale 1
  dark/ar   visible 77.02/55.91 · 114ms none 55.91/55.91
  reduce    hide: first frame none 59.98 (55.91 ar) · show: next frame flex, transform none
  first render hidden (count=0 / invisible): display none at commit, 59.98/59.98
  anchored hidden after exit: display flex, matrix(0,0,0,0,±10,-10), root 40×40, no collapse class
Re-hide race (collapsed → show → hide after d ms, settled 500 ms later)
  d=0   flex matrix(0,0,0,0,0,0) w=83.44  anims=0   ← stuck, 23.46 px blank
  d=16  flex matrix(0,0,0,0,0,0) w=83.44  anims=0   ← stuck
  d=50  none 59.98 ✓      d=100 none 59.98 ✓
  visible → hide → show → hide in 10 ms / 60 ms steps: none 59.98 ✓
Anchored  en centre (140,184) = btn top-right · ar (1060,188) = btn top-left · circular Δ < 0.02 px
          ring rgb(255,255,255) 0 0 0 2px · pointer-events none · z-index 1 · hit → BUTTON
          focus :focus-visible solid 2px rgb(37,68,113) offset 2px
```

#### Previous round findings

| Round 1 # | Status | Evidence |
|---|---|---|
| 1 (Planner, B6/A9 `warning` contrast) | Fixed | Plan 1.1 B3/B6; code `Badge.tsx:78-82`; measured 3.24:1 light / 12.20:1 dark (AC-8) |
| 2 (Planner, hidden standalone space) | Fixed in the plan; code Still open in one edge case | B4 › Hidden standalone written; the code meets it except for the re-hide race — finding #1 below |
| 3 (Planner, header Source code link) | Fixed | Header › Source code links `src/components/badge/` |
| 4 (Executor, unreachable icon tokens) | Fixed | `Badge.tsx:44-48, 78-82, 95-100`; `Badge.test.tsx:25-62, 158-159` |
| 5 (Executor, declaration-only tests) | Fixed | AC-10 above; leftover nit #2 |

#### Findings

| # | Severity | File | Issue | Required change | Owner |
|---|---|---|---|---|---|
| 1 | 🟡 Should fix | `Badge.tsx:252-256, 279-291, 393` · `Badge.test.tsx:320-411` | A standalone badge only collapses on a `transitionend` of its own `transform`. If a collapsed badge is shown and hidden again before its enter transition has started (same tick, or within about one frame — for example `count` 0 → 1 → 0 from a fast data update, or a quick `invisible` toggle), the indicator goes back into the layout with an inline `scale(0)` but no transition runs. No `transitionend` fires, so it stays `display: flex` at scale 0 for good and leaves a 23.46 px blank after the label (measured, d = 0 and 16 ms; fine from 50 ms). That breaks B4 › Hidden standalone / AC-9: "when it ends, the indicator leaves the layout" | When the badge hides and no exit transition can run (it is already at scale 0 / not visibly shown yet, e.g. `standaloneHidden` is still `true` or the pending enter frame has not fired), collapse it at once. Also handle `transitioncancel`, or check that a transition is actually running (`getAnimations()` empty → collapse), so that no path is left waiting for an event that never comes. Add a test: collapsed → show → hide before the `requestAnimationFrame` callback runs → `display: none` | Executor |
| 2 | 🟢 Nit | `Badge.test.tsx:226-273` | B9 asks for both a comparison of the anchor's computed styles *and* a check that the root adds no padding or border. The comparison and the `position: absolute` check are there, but there is no assertion on the root's own `padding` / `border` | Add `padding: 0` / `border-width: 0` (computed) to the root assertion. Can ride along with #1 | Executor |

#### Next step

- Changes requested → Code `Changes requested` (header + README). Plan stays `Finished`: no Planner item (B4 already describes the needed behaviour). Fix round 2 for the Executor: #1 (required), #2 (optional), plus a C8 "Fix round 2" entry and a `CHANGELOG.md` line. Then review round 3 re-runs the re-hide race probe and AC-9. Figma build is still `Planned` and was not reviewed.

### E2 Round 1 — 2026-10-24

| Field | Value |
|---|---|
| Plan version reviewed | 1.0 |
| Spec version reviewed | 1.0 |
| Reviewer | Claude |
| Date | 2026-10-24 |
| Verdict | **Approved** — every AC met and measured in a real browser; no 🔴/🟡 finding. 3 Planner nits (spec wording / gaps) and 2 Executor nits (test strength, dead values) |

Commands run by the Reviewer on branch `ds/badge-web` at `045354c` (implement commit = latest; the branch changes only `src/components/badge/{Badge.tsx,Badge.test.tsx,index.ts}` and `src/index.ts` in `3-web-components/src`):
`npm run docs:check` ✅ 21 component files · `npm run typecheck` ✅ · `npm run test:web` ✅ **121/121**, 9 files, 6.86 s, default timeouts, first run (load average 5.2). Badge alone: 14/14 in ~1.0 s; no timeout arguments in `Badge.test.tsx`; every render goes through `renderWithBiowave`.
Real browser: my own headless Chrome 154 (`--headless=new`, driven over CDP, not the shared pane), the real `Badge` / `IconButton` / `Icon` from `3-web-components/src` inside `BiowaveProvider` with the generated `tokens.css` + `icons.css`, served by a scratch Vite config outside the repo, 1200 × 900 viewport, en/light · ar/light · en/dark · ar/dark, `prefers-reduced-motion` emulated as `no-preference` and `reduce`.

**Leftovers from the three-agent build (Codex → Cursor → Codex):** none found. The branch adds exactly the four C5 files; no stray files, no `TODO`/`console.log`/`debugger`, no `@mui/icons-material`, no extra exports, working tree clean. C8 names only Codex as agent (the hand-overs are in the run record only) — not a finding.

#### Acceptance criteria

| AC | Result | Evidence (file:line / test name) |
|---|---|---|
| AC-1 API = B1 (names, types, defaults, fallbacks, warnings) | ✅ | Props and defaults `Badge.tsx:22-34, 197-211` (`variant='count'`, `max=99`, `showZero=false`, `invisible=false`, colour default `error` / `success` for check `:183`); `className`, `data-*`, `ref` forwarded to the root span (`:313-315`; tests *labels a visible standalone badge…*, *forwards the root ref*). All 8 B1 fallbacks + one `warnOnce` each `:222-278` (dev-only via `internal/warnOnce.ts`); test *warns once for every invalid combination and renders each fallback* (8 calls for 16 renders). Browser: check × `error`/`warning` render success green, dot × `warning` renders error red. Type test *allows runtime color fallbacks but rejects unknown colors at the type level* (C6) |
| AC-2 B2–B3 values from tokens; no raw values / primitives | ✅ | `Badge.tsx:52-98, 107-158` — `cssVars.*` only; guard test *contains no raw colors, pixel dimensions, durations, font names, or legacy icons*. Browser (all 4 theme × language combos): count 20 × 20 (`size-icon-md`), `99+` 31.17 × 20 (grows), padding-inline 4 px (`spacing-xs`); dot 8 × 8 (`spacing-md`); check 20 × 20 with the glyph 16 px (`size-icon-sm`, Icon `size` unset); radius 9999 px; count text 12 px / line-height 16 px en · 18 px ar / weight 500 / `tabular-nums` — the `.bw-text-data-sm` rule wins over MUI's badge font (Emotion caches `prepend: true`). Backgrounds and text/icon colours equal the B3 tokens in light and dark for all 7 colours (e.g. light error `rgb(212,34,34)` / white, dark error `rgb(255,118,118)` / `rgb(10,10,10)`). Ring `0 0 0 2px` `color-border-inverse` (`#FFFFFF` light, `#0A0A0A` dark), anchored only; standalone `box-shadow: none` |
| AC-3 B4 transitions; no first-paint animation; reduced motion | ✅ | `Badge.tsx:111-113, 152-170`. Browser, sampled every frame: **exit** `0.1s cubic-bezier(0.3,0,1,1)` (`sm` + accelerate), scale 1 → 0 done at ~124 ms; **enter** `0.2s cubic-bezier(0,0,0,1)` (`md` + decelerate), 0 → 1 done at ~217 ms; first paint: scale 1, `getAnimations()` empty. During exit the old content stays (count→0 still shows `3` while shrinking). Reduce: both durations `0s`, first frame already final. Test *uses distinct token transitions for enter and exit…* (see nit 5) |
| AC-4 RTL = B5; a11y = B6 (axe clean) | ✅ | Placement `Badge.tsx:121-122, 145-150, 172-174`. Browser: indicator centre = anchor top-end corner exactly — en `(168, 208)` = button right/top, ar `(1032, 208)` = button left/top (`translate(-50%,-50%)`); circular centre `(250.17, 213.83)` vs expected 14.6 % point `(250.16, 213.84)`; dot centre on the corner too. `99+` inside `<bdi dir="ltr">` reads `99+` in ar. Check glyph `transform: none` in RTL (test *keeps the check icon non-directional in RTL*). Standalone in ar sits at the inline end (left of the text). B6: indicator `aria-hidden="true"`; `aria-describedby` appended after existing ids and removed while hidden, back when visible (browser + test *appends and removes the anchored description…*); standalone `role="img"` + `aria-label`, removed while hidden; never focusable (0 focusable badge nodes); axe test 4 combos ✅. Contrast measured: count text ≥ 4.5:1 for every colour in both themes (lowest dark brand 4.65:1); indicator vs `color-surface-default` ≥ 3:1 except light `warning` 2.20:1 — see nit 1 |
| AC-5 B9 + C6 tests exist and pass; checks pass | ✅ | All 10 B9 items and both C6 items have a test (`Badge.test.tsx:85-473`); `src/test/noLegacyIcons.test.ts` passes. docs:check, typecheck, test:web ✅ above. Strength of three placement/motion assertions: nit 5 |
| AC-6 Exported; README status | ✅ | `src/index.ts:7-13` (alphabetical, first), `src/components/badge/index.ts`; README row = header (Code set to Approved by this review) |
| AC-7 Anchor untouched except `aria-describedby` | ✅ | `Badge.tsx:293-299` clones with only `aria-describedby`; test keeps `className` and `onClick`. Browser: anchored IconButton 40 × 40 = same button without a badge 40 × 40, root 40 × 40; `elementFromPoint` inside the indicator over the button returns the BUTTON (`pointer-events: none`, en + ar); Tab to the anchored button: `:focus-visible`, `outline: solid 2px` `color-border-focus` (`#254471` light, `#90A3BC` dark), offset 2 px — unchanged, the indicator covers only the corner |

#### Rule checks (AGENTS.md §2)

| Rule | Result | Notes |
|---|---|---|
| No generated files edited | ✅ | Implement commit touches the 4 source files, C8, README row, CHANGELOG, run record |
| No raw values / no primitives | ✅ | `cssVars.*` semantic tokens only; `14.6%` is the B2 geometric ratio (not a dimension); guard test passes |
| RTL first (logical properties) | ✅ | `blockSize`, `minInlineSize`, `paddingInline`, `insetBlockStart`, `insetInlineEnd`; physical `top/right/bottom/left` only set to `unset` to cancel MUI's anchor origin; RTL translate via `[dir='rtl'] &` (B5) |
| Both themes, both languages, tested | ✅ | Render matrix and axe in light + dark × en + ar; browser checked all four |
| Accessibility WCAG 2.2 AA | ✅ | B6 measured above; reduced motion instant; not a target, not focusable. Light count × `warning` shape contrast: nit 1 |
| Biowave `Icon` (D-18) | ✅ | `<Icon className="bw-badge-check-icon" name="check" />` `Badge.tsx:290`; no `@mui/icons-material` |
| Tests via `renderWithBiowave`, default timeouts | ✅ | No `render` from RTL directly, no timeout arguments |
| Stayed inside the contract / one component | ✅ | No change to Icon, IconButton or any other component |
| Changelog | ✅ | `CHANGELOG.md` › *Code — Web Badge 1.0* |

#### Figma build (Part D)

Skipped — Figma build is `Planned`.

#### Probe evidence

```
Headless Chrome 154, 1200×900, real Badge in BiowaveProvider + tokens.css
  count  en/light  error 20.00×20.00  pad-inline 4px  bg rgb(212,34,34)  text #fff  12px/16px 500 tabular-nums
         "99+"     31.17×20.00   <bdi dir=ltr>       ar: 12px/18px IBM Plex Sans Arabic, still "99+"
  dot    8.00×8.00  pad 0     check 20.00×20.00, glyph 16px, transform none (ar)
  anchored IconButton 40×40 (plain 40×40)  root 40×40
    en  indicator centre (168,208) = button top-right   transform matrix(1,0,0,1,10,-10)
    ar  indicator centre (1032,208) = button top-left   transform matrix(1,0,0,1,-10,-10)
    circular (250.17,213.83) vs 14.6% point (250.16,213.84)
    ring rgb(255,255,255) 0 0 0 2px (light) · rgb(10,10,10) (dark)   z-index 1  pointer-events none
    elementFromPoint inside indicator → BUTTON (en, ar)
  focus (Tab)  :focus-visible  outline solid 2px rgb(37,68,113) offset 2px (light) · rgb(144,163,188) (dark)
  motion  exit 0.1s cubic-bezier(0.3,0,1,1) scale→0 at ~124ms · enter 0.2s cubic-bezier(0,0,0,1) →1 at ~217ms
          reduce: 0s, first frame final · first paint: no animation
  standalone invisible: root width 23.45px visible → 23.45px hidden
Contrast (WCAG)  text/indicator   indicator/surface-default
  light warning   8.99            2.20  ← below B6's 3:1
  dark brand      4.65            4.33  (lowest dark pair)
  all others      ≥ 5.18          ≥ 5.18
```

#### Findings

| # | Severity | File | Issue | Required change | Owner |
|---|---|---|---|---|---|
| 1 | 🟢 Nit | `badge.md` B6 › Contrast · A9 | B6 asks indicator vs `color-surface-default` ≥ 3:1 "for every allowed `color` × `variant`", and A9 says this rule is "why `warning` is `count` only" — but `count` × `warning` is allowed and measures **2.20:1** in light (`color-background-warning-default` on `#FFFFFF`). The code uses the B3 tokens correctly; the spec contradicts itself. A4.2 shows the intent (the dark text, 8.99:1, carries the meaning; the shape alone is too light) | Reword B6 / A9: the 3:1 shape rule applies to `dot` and `check`; `count` × `warning` relies on its text (≥ 4.5:1 on the indicator) — or drop `warning` from `count`. Part A change goes to all three platform files | Planner |
| 2 | 🟢 Nit | `badge.md` B2 / B4 | A hidden **standalone** badge keeps its inline space: `position: static` + `scale(0)` leaves a 23.45 px blank after the text (browser, "Requests ⎵⎵⎵"). The spec does not say whether a hidden standalone badge should keep or release its space | State it in B2/B4 (keep the space to avoid text reflow, or collapse after the exit transition) | Planner |
| 3 | 🟢 Nit | `badge.md` header | Header row "Source code — `src/components/badge/` — not built yet (the Executor creates it)" is stale; the code exists | Link `src/components/badge/` as the other built components do | Planner |
| 4 | 🟢 Nit | `Badge.tsx:72-77, 90-96` · `Badge.test.tsx:29-53` | `getColorTokens` gives `error` and `warning` an `icon` value of `cssVars.color.text.on.*` — a token B3 does not list for `check-icon` ("— not allowed"). It is unreachable (B1 fallback turns check × error/warning into success) and the test table copies it | Drop the `icon` value for those two colours (or make it optional) so no unlisted token sits in the component; update the test table | Executor |
| 5 | 🟢 Nit | `Badge.test.tsx:181-225, 252-257, 269-294` | Three B9 items are asserted by declarations, not behaviour: (a) "anchor box size is the same with and without the badge" checks the anchor's own inline style, which the test itself set; (b) "a click on the badge reaches the anchor's handler" clicks the anchor, not the badge area; (c) "first render has no animation" matches `Badge.tsx` source text including exact line breaks, so a formatter run breaks the test. jsdom has no layout, and the real browser confirms all three (probe above) | (a) compare the anchor's computed styles with and without `Badge`, or assert the root adds no padding/border and the indicator is out of flow; (b) jsdom has no hit testing, so name the assertion for what it checks (`pointer-events: none` declared, anchor `onClick` kept) rather than "click on the badge"; (c) use a whitespace-tolerant regex or a behavioural check | Executor |

#### Next step

- Approved → Code `Approved` (header + README). Planner nits 1–3 → Plan `Open` (AGENTS.md §3: a review that sends Planner items back reopens the plan); the Planner rewords B6/A9, adds the B2/B4 line and the header link, sets `Finished` and regenerates the contracts. Executor nits 4–5 can ride along with the next touch of `Badge.tsx`; not required for this unit. Figma build is still `Planned` and not reviewed.

#### Planner response (2026-10-24)

| # | Decision |
|---|---|
| 1 | Kept `warning` on `count` and gave it a semantic fill that meets 3:1 — accessibility is not weakened and no option is removed. Removing `warning` from `count` would leave `warning` with no variant at all, a breaking API change for a colour that has a real job (colors.md: “needs attention, pending, not critical” — pending approvals, delayed syncs); `error` overstates those and `neutral` hides them. Fill options checked in `2-foundations/dist/tokens.json` against `color-surface-default`, light / dark: `color-background-warning-default` 2.20 / 10.20 (fails light); `-hover` 2.32 (fails); `-pressed` 3.24 / 14.63 (passes, but a pressed state token on a static shape breaks the state rule); **`color-icon-role-warning` 3.24 / 12.20** — the token whose job is a warning graphic on a surface, already guaranteed ≥ 3:1 by the token build (`contrast-pairs.json` › “status icon”). Chosen: indicator `color-icon-role-warning`, text `color-text-on-warning` (6.10 / 13.11). `dot` and `check` stay without `warning` (A4.2 reason reworded: a warning counts what is pending). Written into A4.2 and A9 (all three platforms), B3, B6, B9, C3, C6, C7 AC-8, D1, D8, D10 F-AC-8; tablet and mobile B3/B6/B9 too |
| 2 | A hidden standalone badge takes no space, after its exit transition (at once with reduced motion; none from the first paint when hidden on mount). Reason: A5 — a hidden badge shows nothing; a blank gap after a label reads as a missing value and misaligns lists and tabs; one reflow at the end of the exit is the smaller cost. Written into A5 (Hidden row, all three platforms), B1, B2, B4 › Hidden standalone, C3, B9, C7 AC-9; tablet and mobile B4/B9 get the same rule |
| 3 | Header Source code → [`src/components/badge/`](../../src/components/badge/) |
| 4, 5 | Executor nits carried into C3/C6 and C7 AC-10 and the Fix round 1 task list |

Plan version 1.1; Plan `Finished`; contracts regenerated for web, tablet and mobile. Executor items for Fix round 1: the task list under C7 (#1, #2, #4, #5). #1 and #2 change code behaviour, so the approved 1.0 code no longer matches the plan until that fix round runs.

---

## F · Changelog

> Changes to this component on this platform. Every entry also gets one line in the root `CHANGELOG.md`.

### F0 Changes from previous version

1.1 — review round 1 Planner items: `count` × `warning` indicator fill is `color-icon-role-warning` (was `color-background-warning-default`, 2.20:1 on a white surface) so every allowed colour meets 3:1; a hidden standalone badge gives back its inline space after the exit transition; header links the built source. Fix round 1 task list adds the Executor nits (no unlisted `check-icon` token for `error`/`warning`, behavioural tests). No API change.

### F1 Guidelines changelog

| Version | Date | Change | Migration | Author |
|---|---|---|---|---|
| 1.1 | 2026-10-24 | A4.2 `warning` reason reworded and its darker fill named; A5 hidden standalone gives back its space; A9 3:1 for every allowed colour and variant (review round 1 #1, #2) | — | Claude (Planner) |
| 1.0 | 2026-10-21 | Initial. Count, dot and Check badge (P-05: the Figma Check badge folds into Badge as `variant` `check`) | — | Claude (Planner) |

### F2 Spec changelog

| Version | Date | Change | Breaking | Migration |
|---|---|---|---|---|
| 1.1 | 2026-10-24 | B3 `warning` fill `color-icon-role-warning`; B1/B2/B4 hidden standalone takes no space; B6 contrast row; B9 `warning`, hidden-standalone and behavioural test wording; C3/C6/C7 AC-8–11 + Fix round 1 task list; D1/D8/D10 `Warning` fill variable (review round 1 #1–#5) | No — visual change of `warning` fill only | — |
| 1.0 | 2026-10-21 | Initial | No | — |

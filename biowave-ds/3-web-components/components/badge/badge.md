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
| Version | 1.0 · 2026-10-21 |
| Plan | Finished |
| Code | Planned |
| Figma build | Planned |
| Review | — |
| Source code | `src/components/badge/` — not built yet (the Executor creates it) |
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
| `invisible` | boolean | | `false` | | A4.6 — hides with the exit transition (B4) |
| `label` | string | | — | ✓ when visible | A4.7 — the accessible meaning (B6) |
| `children` | slot | one React element | — | | The `anchor`. Absent → standalone inline badge (no `ring`) |
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
- Standalone `indicator` (no `children`): `position: static`, inline after text, no `ring`, no translation; it aligns to the text's middle.
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
| `warning` | `color-background-warning-default` | `color-text-on-warning` | — (not allowed) |
| `info` | `color-background-info-default` | `color-text-on-info` | `color-icon-on-info` |
| `neutral` | `color-surface-inverse` | `color-text-neutral-inverse` | `color-icon-neutral-inverse` |

| Part | Property | Token |
|---|---|---|
| `ring` | colour | `color-border-inverse` |
| `ring` | width | `border-width-strong` |

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
| Contrast | `count` text on `indicator` ≥ 4.5:1 and `indicator` vs `color-surface-default` ≥ 3:1 for every allowed `color` × `variant` (B1 rules remove `warning` from `dot` and `check`) |
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

- [ ] Every `variant` × allowed `color` renders the B2 sizes and B3 tokens in light + dark × en + ar (computed styles: `block-size`, `min-inline-size`, `padding-inline`, background, text and icon colour)
- [ ] `count` above `max` shows `{max}+` inside `<bdi dir="ltr">`; `count={0}` hides unless `showZero`; `max` default 99
- [ ] Anchored: `ring` box-shadow uses `border-width-strong` + `color-border-inverse`; standalone: no ring, `position: static`
- [ ] Placement: indicator centre on the anchor's top-end corner in LTR and top-start in RTL (both `overlap` values); the anchor's box size is the same with and without the badge
- [ ] B4: hidden ↔ visible transitions use the listed duration/easing tokens; first render has no animation; reduced motion → instant
- [ ] a11y: indicator `aria-hidden`; anchored label wired by `aria-describedby` (existing ids kept); hidden badge removes it; standalone `role="img"` + name; axe has no violations in light + dark × en + ar
- [ ] `pointer-events: none` on the indicator: a click on the badge reaches the anchor's handler
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
| Plan version | 1 · 2026-10-21 |

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
- Styles from `cssVars` only (`cssVars.size.icon.md`, `cssVars.spacing.xs`, `cssVars.spacing.md`, `cssVars.radius.full`, `cssVars.border.width.strong`, `cssVars.color.*`, `cssVars.motion.*`, `cssVars.layer.raised`), applied to the MUI `badge` slot. One `switch` from `color` to the three B3 tokens; `neutral` uses `color.surface.inverse` / `color.text.neutral.inverse` / `color.icon.neutral.inverse`.
- Placement: override MUI's `anchorOrigin` styles completely — set `top`/`right`/`transform` to `unset` and use `inset-block-start` / `inset-inline-end` plus `transform: translate(50%, -50%)`, and `[dir='rtl'] &` → `translate(-50%, -50%)` (B5). Visibility combines with the translation: hidden = `translate(…) scale(0)`, visible = `translate(…) scale(1)`, `transform-origin: center`.
- Transitions: replace MUI's `theme.transitions` on the `badge` slot with `transform` timed by B4 — `motion-duration-md` + `motion-easing-standard-decelerate` when becoming visible, `motion-duration-sm` + `motion-easing-standard-accelerate` when hiding (set the transition on the `.MuiBadge-invisible` state for the exit). No transition on first paint.
- Standalone (no `children`): add class `bw-badge-standalone`; the `badge` slot becomes `position: static`, no transform, no ring.
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

### C7 Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 exactly (names, types, defaults, fallbacks, warnings)
- [ ] AC-2 Every value in B2–B3 comes from the listed token; no raw values, no primitives
- [ ] AC-3 B4 transitions implemented (enter/exit timings differ, no first-paint animation); reduced motion respected
- [ ] AC-4 RTL behaves as B5 (top-start placement, `99+` not reordered, check not mirrored); a11y as B6 (axe clean)
- [ ] AC-5 Tests in B9 and C6 exist and pass; `npm run typecheck`, `npm run test:web`, `npm run docs:check` pass
- [ ] AC-6 Exported from `src/index.ts`; section README status updated
- [ ] AC-7 The anchor is untouched except for the appended `aria-describedby`: same box size, same click target, same focus ring

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
| Plan version | 1 · 2026-10-21 |

### D1 Rules for this build

0. **Library first; no component tokens (D-13).** Badge has no `badge.tokens.json` (B3: every value is a semantic token). Bind directly to the **Biowave DS — Foundations** library variables listed in the contract; never create local variables, collections or styles. Text style `Web/{en|ar}/data/sm`; the check glyph is the **Icon** set in this file.
1. **Every value is bound.** Fill, stroke colour and weight, radius, padding, height, min width → variables; text → text style. No raw hex / px.
2. **Token → variable:** `-` between segments becomes `/`: `color-background-error-default` → `1. Themes › color/background/error/default`; `color-surface-inverse` → `1. Themes › color/surface/inverse`; `size-icon-md` → `4. Size › size/icon/md`; `spacing-xs` → `3. Spacing › spacing/xs`; `spacing-md` → `3. Spacing › spacing/md`; `radius-full` → `2. Radius › radius/full`; `border-width-strong` → `9. Border › border/width/strong`; `color-border-inverse` → `1. Themes › color/border/inverse`.
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

Build the 12 standard pages (`_templates/component.md` D8 + `2-foundations/figma-doc-kit.md` › Page layouts) in section `Badge — Documentation` on `↳ Badge`, frames `Badge / 00 Component sheet` … `Badge / 11 Changelog` (skip `10`, version 1.0), only from the Doc Kit. If the Doc Kit is not published, finish Phase 1 and report "docs waiting for Doc Kit".

Page notes for Badge:
- 01 Introduction: one Icon button (`mail`) with a `Count` badge, one with a `Dot`, one avatar stand-in (`Doc/Skeleton` circle until Avatar exists) with a `Check` badge; Light and Dark panels.
- 03 Variations: `Variant` row, `Color` row per variant (allowed colours only), `overlap` rectangular vs circular, standalone after a label (`Ring=Off`), `max` (`99+`).
- 04 States and motion: hidden → visible → hidden with B4 timings.
- 08 RTL: EN and AR anchored pairs (D7) and a standalone AR row: `الوارد (12)`.
- 09 Accessibility: the label read with the anchor (“Notifications, button, 3 unread messages”), contrast pairs, why `Warning` is `Count` only.

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
- [ ] F-AC-8 Values match B2–B3 one by one (redline on every `Variant` with `Ring=On`)
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

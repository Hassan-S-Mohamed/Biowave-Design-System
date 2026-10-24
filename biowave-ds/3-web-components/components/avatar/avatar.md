# Avatar · صورة رمزية — Web

> **One file for Avatar on Web:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- web avatar`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Avatar · صورة رمزية |
| Summary | Shows a person's photo, initials or a person glyph — optionally with a badge — so people recognise who something belongs to. |
| Summary (ar) | تعرض صورة الشخص أو الأحرف الأولى من اسمه أو رمز شخص — مع شارة عند الحاجة — ليتعرّف المستخدم على صاحب العنصر. |
| Parts | Container · image · initials · fallback icon · badge |
| Parts (ar) | الحاوية · الصورة · الأحرف الأولى · الأيقونة البديلة · الشارة |
| Platform | Web · React + MUI |
| Built on | MUI `Avatar` (`src`, `variant` `circular` · `rounded`, children fallback), restyled from tokens; fallback glyph via the Biowave `Icon`; badge via the Biowave `Badge` |
| Import | `import { Avatar } from '@biowave/web'` |
| Figma | **Biowave DS — Web Components** › `↳ Avatar` · build: [Part D](#d--figma-build) |
| Version | 1.1 · 2026-10-24 |
| Plan | Finished |
| Code | Approved |
| Figma build | Planned |
| Review | Round 1 · 2026-10-24 · Approved |
| Source code | [`src/components/avatar/`](../../src/components/avatar/) |
| Tokens | — (no component tokens: every value is an existing semantic token, P-04) |
| Contracts | [`avatar-contract.md`](avatar-contract.md) · [`figma-avatar-contract.md`](figma-avatar-contract.md) — generated, never edited |
| Docs page | [`avatar.html`](avatar.html) |

## Contents

[A · Guidelines](#a--guidelines) · [B · Spec](#b--spec) · [C · Code plan](#c--code-plan) · [D · Figma build](#d--figma-build) · [E · Review](#e--review) · [F · Changelog](#f--changelog)

---

## A · Guidelines

> What it is and when to use it — designers and PMs. Identical on Web, Tablet and Mobile except **A8** (checked by `npm run docs:check`).

### A1 Overview

An avatar is a small picture that stands for a person — or for a team, a device or a site — wherever that person appears: in lists, tables, cards, comments and the top app bar. It shows a photo when there is one; otherwise it shows the person's initials, and when there is no name either, a generic person glyph. It can carry one Badge on its edge (a presence dot, a count or the Check badge for "verified"). An avatar only identifies; it is never a control on its own.

### A2 Anatomy

```
 image                  initials               icon (fallback)        with badge
 ╭──────────╮           ╭──────────╮           ╭──────────╮           ╭──────────╮●⑤
 │ ②░photo░ │ ①         │    SA ③  │ ①         │   [◆] ④  │ ①         │    SA    │
 │ ░░░░░░░░ │           │          │           │          │           │          │
 ╰──────────╯           ╰──────────╯           ╰──────────╯           ╰──────────╯
 Shape square: the same parts in a rounded square (┌──┐ with rounded corners).
```

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `container` | Yes | The circle (or rounded square) that sets the size, clips the content and shows the background colour behind initials and icon |
| 2 | `image` | No | The photo or picture, cropped to fill the container. Shown only after it has loaded |
| 3 | `initials` | No | One or two letters taken from the `name`, shown when there is no image (or it is loading or failed) |
| 4 | `fallback-icon` | No | A Material Symbols Rounded glyph (`person` by default), drawn by Icon, shown when there is neither an image nor initials |
| 5 | `badge` | No | One Badge on the avatar's top-end edge: presence dot, count or Check badge. Placed by the avatar, styled by Badge |

Exactly one of `image`, `initials` and `fallback-icon` is visible at a time.

### A3 Usage

**When to use**
- To show who a row, card, comment or request belongs to: an employee in an attendance list, the requester of a leave request
- To show the signed-in user in the top app bar or a profile header
- To show a team, a device (biometric terminal) or a site with the `square` shape
- With a Badge to show presence (online), a count (new items for that person) or that the person is verified (Check badge)

**When not to use** (and what to use instead)

| Situation | Use instead |
|---|---|
| A generic symbol for an action or object | [Icon](../icon/icon.md#a--guidelines) |
| A clickable picture on its own (open the profile menu) | Put the avatar inside the clickable component (top app bar profile button, list item) — the avatar itself is not a control |
| A company or product logo | Logo assets (`2-foundations/guidelines/logos.md`) |
| A large photo or illustration in content | An image in the content, not an avatar |
| A status that needs words (Approved, On leave) | Chip (status variant) next to the avatar |

### A4 Options

#### 4.1 `size`

| Value | Pick it when |
|---|---|
| `sm` | Dense tables, inline with body text, small chips of people |
| `md` | Default on web: list rows, table rows, comments |
| `lg` | Default on tablet and mobile: list rows on touch, cards |
| `xl` | Profile headers, the person in a detail panel |

#### 4.2 `shape`

| Value | Looks like | Pick it when |
|---|---|---|
| `circle` | `╭──╮` round | People. Default |
| `square` | `┌──┐` rounded square | Teams, devices, sites and other things that are not a person |

#### 4.3 `color`

The background behind initials and the fallback icon. It does not carry meaning — never use it for status.

| Value | Pick it when |
|---|---|
| `neutral` | Default |
| `brand` | To match brand surfaces, or to tell people apart in a small group |
| `secondary` | To tell people apart in a small group, together with `brand` and `neutral` |

#### 4.4 Content: `image`, `name`, `initials`, `icon`

- `image` — the photo. While it loads, and if it fails, the avatar shows its fallback instead (initials, else icon).
- `name` — the person's or thing's name. It gives the initials and the name screen readers hear.
- `initials` — set only when the initials from the name are wrong (a nickname, a team code). One or two characters.
- `icon` — the fallback glyph when there is no name: `person` by default; pick another Material Symbols name for things that are not people.

How initials come from the `name`: the first letter of the first word and the first letter of the last word, in capitals (“Sara Ali” → “SA”, “Omar” → “O”). For an Arabic-script name, the first letter of the first word only (“سارة علي” → “س”), because two Arabic letters side by side join into a word.

#### 4.5 `badge`

One Badge, with the Badge options (`variant`, `count`, `color`, `label` …). The avatar places it on its top-end edge and picks the Badge `overlap` from its own shape (`circular` for `circle`, `rectangular` for `square`).

| Badge | Pick it when |
|---|---|
| `dot` (`success`) | The person is online or clocked in — the badge `label` says it |
| `count` | New items for this person (unread messages) |
| `check` | The Check badge: the person or device is verified |

#### 4.6 `decorative`

On when the person's name is visible right next to the avatar (a list row with the name as its title). Screen readers then skip the avatar and read the name once.

**Combination rules**
- One badge per avatar — never two
- `color` applies to initials and icon only; a loaded image covers it
- A `decorative` avatar carries no badge — put that status in the visible text, or turn `decorative` off so the badge label is read
- `initials` is one or two characters — never a whole word
- `color` never means status; use the badge or a Chip for status

### A5 States and behavior

An avatar has no interactive states. It shows its content.

| State | When it happens | What the user sees |
|---|---|---|
| Image | `image` has loaded | The photo, cropped to fill the shape |
| Loading | `image` is set and still loading | The fallback (initials, else icon) on the `color`; the photo replaces it at once when loaded |
| Image failed | `image` cannot load | The fallback, as if there were no image |
| Initials | No image, a `name` (or `initials`) | One or two letters on the `color` |
| Icon | No image and no name | The fallback glyph on the `color` |
| With badge | `badge` is set | The badge on the top-end edge (top-left in Arabic); it animates as Badge does |
| Parent hover / focus / pressed / disabled | The parent (list item, button) changes state | The avatar does not change; the parent draws hover, focus and disabled |

**Behavior rules**
- The avatar keeps its size in every state, so rows never jump when an image loads or fails
- The image is cropped to fill (never stretched, never letter-boxed), centred
- Initials never wrap or truncate: they are at most two characters and always fit
- Long Arabic names do not change the avatar — only the initials rule applies
- The avatar never takes focus and never reacts to pointer or touch; clicks go to the parent

### A6 Content

General writing rules: [content.md](../../../2-foundations/guidelines/content.md). Avatar-specific rules:

| Element | Rule | Max length |
|---|---|---|
| `name` | The name as people see it in the product (first and last name), not a user ID or email | — |
| `initials` | Letters from the name; capitals in Latin script; one letter in Arabic script | 2 characters |
| `badge` `label` | What the badge says about the person, in words | Badge A6 |

| ✓ EN | ✓ AR | ✗ Avoid |
|---|---|---|
| Sara Ali → SA | سارة علي → س | sara.ali@biowave.com as the name |
| Omar Hassan → OH | عمر حسن → ع | OHA (three letters) |
| Reception terminal (square, `devices` icon) | جهاز الاستقبال | A person glyph for a device |
| Online (badge label) | متصل | Green dot (badge label) |

### A7 Do and don't

| ✓ Do | ✗ Don't |
|---|---|
| Give every avatar a `name`, even with a photo | Leave screen readers with an unnamed picture |
| Use `circle` for people and `square` for teams and devices | Mix shapes for the same kind of thing |
| Let the avatar fall back to initials while a photo loads or fails | Show an empty circle or a broken-image glyph |
| Put status in a badge with a label, or in text | Use the avatar `color` to mean status |
| Make the row or button around the avatar clickable | Make the bare avatar a click target |
| Mark the avatar `decorative` when the name is visible next to it | Have screen readers read the same name twice |

### A8 Platform notes — Web

```
Table row (sm)                            Top app bar (md, inside the profile button)
┌──────────────────────────────────────┐  ┌───────────────────────────────────┐
│ (SA) Sara Ali    Clocked in   08:58  │  │  Biowave           [✉](3)  (SA)●  │
└──────────────────────────────────────┘  └───────────────────────────────────┘
```

| | Web |
|---|---|
| Available | ✓ |
| Default size | `md`; `sm` in dense tables |
| Image | Loaded lazily by the browser; the fallback shows until it has loaded |
| Interaction | None — the parent row or button handles pointer and keyboard |
| Not supported | Avatar groups (stacked avatars with “+3”), image upload (File upload, Day 16) |

### A9 Accessibility (design)

- Every avatar that is not `decorative` has a name in English and Arabic; screen readers hear it as a picture (“Sara Ali, image”)
- A `decorative` avatar is hidden from assistive technology, because the visible name next to it says the same
- A badge on an avatar is read with it (“Sara Ali, image, Online”); its meaning is in the badge `label`, never in colour alone
- Initials meet 4.5:1 and the fallback icon 3:1 against the avatar background, in light and dark
- The avatar is never focusable and never a target; the parent that is clickable keeps its own target size and focus ring
- Photos are not text: never put words or numbers people must read inside an avatar image

### A10 Related components

- [Icon](../icon/icon.md#a--guidelines) — draws the fallback glyph
- Badge — the dot, count or Check badge on the avatar (the avatar places it; Badge styles it)
- [Icon button](../icon-button/icon-button.md#a--guidelines) — for clickable glyphs; not for avatars
- Chip (Day 4) — input chips can show an avatar of the person
- List (Day 8) and Top app bar (Day 17) — place avatars in rows and in the profile button

---

## B · Spec

> The contract — API, dimensions, tokens, states, RTL and accessibility. Code and Figma are reviewed against this part.

### B1 API

#### `Avatar`

| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `name` | string | | — | ✓ unless `decorative` | A4.4 — source of the initials and the accessible name (B6) |
| `src` | string | image URL | — | | A4.4 `image`; an empty string is treated as no image |
| `initials` | string | 1–2 characters | — (derived from `name`, B2 › Initials rule) | | A4.4 — overrides the derived initials |
| `icon` | `IconName` | Material Symbols name (Icon B1) | `'person'` | | A4.4 — the `fallback-icon` glyph |
| `size` | enum | `sm` · `md` · `lg` · `xl` | `md` | | A4.1 |
| `shape` | enum | `circle` · `square` | `circle` | | A4.2 |
| `color` | enum | `neutral` · `brand` · `secondary` | `neutral` | | A4.3 — background behind `initials` and `fallback-icon` |
| `badge` | `AvatarBadgeProps` | `Omit<BadgeProps, 'children' \| 'overlap'>` | — | | A4.5 — rendered as `<Badge {...badge} overlap={…}>` around the container (B2) |
| `decorative` | boolean | | `false` | | A4.6 — hidden from assistive technology (B6) |
| `className` · `data-*` · `aria-describedby` · `ref` | | | | | Forwarded to the `container` element (the MUI `Avatar` root), also when a badge wraps it |

Exported types: `AvatarProps`, `AvatarSize`, `AvatarShape`, `AvatarColor`, `AvatarBadgeProps`.

Platform naming notes: MUI `variant` `circular` · `rounded` = Biowave `shape` `circle` · `square` (`shape`, because `variant` already means the Badge variant); MUI `src` = `src`; MUI `alt` is not exposed — the name is on the container (B6), the `img` gets `alt=""`. Flutter: `src` = `image` (`ImageProvider`), `icon` is `IconData`. `badge` uses the Badge API (`3-web-components/components/badge/badge.md` B1, Badge 1.0): Avatar sets `overlap`, the consumer sets everything else.

**Initials rule** (when `initials` is not set): trim `name`, split on whitespace. If the first character of the first word is Arabic script (`\p{Script=Arabic}`), the initials are that one character. Otherwise they are the first character of the first word plus the first character of the last word when there are two words or more, upper-cased with `toLocaleUpperCase()`. Characters are grapheme clusters (`Intl.Segmenter` with `granularity: 'grapheme'`), never UTF-16 halves. No name → no initials → `fallback-icon`.

**Invalid combinations** (`warnOnce` in development; the avatar still renders as described):

| Combination | Fallback |
|---|---|
| No `name` (empty or whitespace) and `decorative` off | Renders the `fallback-icon` without an accessible name; warns “avatars need a name or decorative” |
| `initials` longer than 2 characters | Shows the first 2 characters; warns |
| `decorative` with a `badge` | Renders the badge; warns “a decorative avatar hides its badge label” |
| `badge` contains `children` or `overlap` (untyped callers) | Both ignored |

### B2 Dimensions

```
 circle, md                         square, md
   ┬ ╭──────────╮                     ┬ ┌──────────┐
   │ │    SA    │ radius-full         │ │   [◆]    │ radius-md
   │ │          │                     │ │          │
   ┴ ╰──────────╯                     ┴ └──────────┘
 size-control-height-md               size-control-height-md
   initials: text style label-lg      fallback-icon: size-icon-md
```

| Part | Property | `sm` | `md` | `lg` | `xl` |
|---|---|---|---|---|---|
| `container` | inline-size = block-size | `size-control-height-sm` | `size-control-height-md` | `size-control-height-lg` | `size-control-height-xl` |
| `container` | radius (`circle`) | `radius-full` | `radius-full` | `radius-full` | `radius-full` |
| `container` | radius (`square`) | `radius-sm` | `radius-md` | `radius-lg` | `radius-xl` |
| `initials` | text style | `label-sm` (`.bw-text-label-sm`) | `label-lg` (`.bw-text-label-lg`) | `title-lg` (`.bw-text-title-lg`) | `heading-sm` (`.bw-text-heading-sm`) |
| `fallback-icon` | size | `size-icon-sm` | `size-icon-md` | `size-icon-lg` | `size-icon-xl` |

Layout rules:
- `container`: `position: relative; display: inline-flex; align-items: center; justify-content: center; flex: none; overflow: hidden; vertical-align: middle`; fixed square from the size token; never grows or shrinks with content or with the badge.
- `image` (1.1): one real `<img>` inside the container, rendered from the first render whenever `src` is not empty — `position: absolute; inset-block: 0; inset-inline: 0; inline-size: 100%; block-size: 100%; object-fit: cover; object-position: center`; `loading="lazy"`, `decoding="async"`, `alt=""`, `draggable={false}`. Its own `load` / `error` events drive the content (B4): while Loading it is `visibility: hidden` and the fallback shows under it; after `load` it is visible and the fallback is gone; after `error` it is removed (never a broken-image glyph). So the browser fetches a photo only when the avatar comes near the viewport (A8), and a long list does not download every photo at once. Never hide the loading `img` with `display: none` — browsers do not lazy-load an image that has no box.
- `initials`: one line, `white-space: nowrap`, centred, `user-select: none`; the text style's line height is used as is.
- `fallback-icon`: `<Icon name={icon} />` with `size` unset; the container sets `font-size` to the B2 icon token so Icon follows it (Icon B1). Never `directional`.
- `badge`: the container is the Badge `anchor`; `overlap` = `circular` for `circle`, `rectangular` for `square`. Badge's own B2 places the indicator on the top-end corner and draws its `ring`; Avatar adds no offset of its own.

### B3 Tokens by part and state

No component tokens — every value is an existing semantic token (P-04); `avatar.tokens.json` is not needed. An avatar has no interactive states; the table is per `color`.

| `color` | `container` background | `initials` colour | `fallback-icon` colour |
|---|---|---|---|
| `neutral` | `color-background-neutral-default` | `color-text-neutral-subtle` | `color-icon-neutral-subtle` |
| `brand` | `color-background-brand-subtle` | `color-text-role-brand` | `color-icon-role-brand` |
| `secondary` | `color-background-secondary-subtle` | `color-text-role-secondary` | `color-icon-role-secondary` |

- `image` state: the container keeps its `color` background (seen only through transparent pixels); no border, no overlay.
- `badge`: all Badge tokens come from the Badge spec (Badge B3); Avatar names none.
- Dark theme: same tokens (values switch automatically). No exceptions.

### B4 States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Loading → Image | the `img` `load` event | none — the photo replaces the fallback at once | `motion-duration-instant` | — |
| Loading → Image failed | the `img` `error` event | none — the fallback stays | `motion-duration-instant` | — |
| `src` changes | new `src` | back to Loading: a new hidden `img` for the new `src`, fallback shown until its `load` | `motion-duration-instant` | — |
| `size` / `shape` / `color` / `name` changes | prop change | none | `motion-duration-instant` | — |
| Badge hidden ↔ visible | Badge props | as Badge B4 (Badge animates its own indicator) | Badge B4 | Badge B4 |

Reduced motion: nothing of Avatar's own animates; Badge follows its own reduced-motion rule.

### B5 RTL

```
LTR   ╭──────╮●        RTL  ●╭──────╮      ← badge on the top-end corner
      │  SA  │              │  SA  │      ← Latin initials keep their order
      ╰──────╯              ╰──────╯
RTL   ╭──────╮         ← Arabic-script name: one letter (A4.4)
      │  س   │
      ╰──────╯
```

| Part | In RTL |
|---|---|
| `container` · `image` | Not mirrored — photos are never flipped |
| `initials` | Not mirrored; Latin initials keep their order (“SA”), Arabic-script names show one letter |
| `fallback-icon` | Never mirrored (`person` and other identity glyphs are not directional) |
| `badge` | Top-start corner (top-left), placed by Badge B5 |

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Named avatar | `container` has `role="img"` and `aria-label={name}` (trimmed); `img` has `alt=""`; `initials` and `fallback-icon` are `aria-hidden="true"` — the initials are never read letter by letter |
| `decorative` | `container` has `aria-hidden="true"` and no role or label |
| With `badge` | Badge wires its `label` to the container through `aria-describedby` (Badge B6), appended to any id the consumer passed. Screen reader: “Sara Ali, image, Online” |
| Contrast | `initials` on the `container` background ≥ 4.5:1 and `fallback-icon` ≥ 3:1 for every `color`, light and dark (lowest: `secondary` icon in light, 6.39:1) |
| Focus | Never focusable: no `tabIndex`, no handlers. A focusable parent draws its own ring ([a11y](../../../2-foundations/guidelines/a11y.md)) |
| Target size | Not a target. A parent that is clickable keeps ≥ `target-min` |

| Key | Action |
|---|---|
| — | None. Keyboard interaction belongs to the parent |

### B7 Examples

```tsx
import { Avatar } from '@biowave/web';

// Photo, falls back to "SA" while loading or on error
<Avatar name="Sara Ali" src={sara.photoUrl} />

// Arabic (direction comes from the provider) — one letter
<Avatar name="سارة علي" color="brand" />

// Presence dot (Badge API)
<Avatar name="Omar Hassan" src={omar.photoUrl} badge={{ variant: 'dot', color: 'success', label: 'Online' }} />

// Verified device, square, custom fallback glyph
<Avatar name="Reception terminal" shape="square" icon="devices" badge={{ variant: 'check', label: 'Verified' }} />

// In a list row next to the visible name
<Avatar name="Sara Ali" src={sara.photoUrl} size="sm" decorative />
```

### B8 Figma

Structure, properties, the Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

- [ ] Every `size` × `shape` × `color` renders the B2 size and radius and the B3 colours in light + dark × en + ar (computed styles: `inline-size`, `block-size`, `border-radius`, background, initials and icon colour, initials text-style class)
- [ ] Content priority: loading → fallback visible and the `img` already in the DOM but hidden; image after that `img`'s `load`; its `error` → fallback and no `img`; no `src` → initials; no name → `fallback-icon` (`person` by default, `icon` overrides)
- [ ] (1.1) Lazy loading: from the first render the `img` has `loading="lazy"`, `decoding="async"`, `alt=""`, `draggable="false"` and is not `display: none`; no other image request is made (no `new Image()` probe)
- [ ] `src` change shows the fallback again until the new `img` loads; a late `load` / `error` from the previous `src` changes nothing; empty `src` = no image and no `img`
- [ ] Initials rule: “Sara Ali” → “SA”, “Omar” → “O”, “ sara  maria ali ” → “SA”, “سارة علي” → “س”, an emoji or a letter with a combining mark is kept whole (one grapheme); `initials` overrides; 3+ characters → first 2 + warning
- [ ] `badge`: rendered through the Biowave `Badge`; `overlap` `circular` for `circle`, `rectangular` for `square`; a passed `overlap` / `children` is ignored; the container box size is the same with and without the badge
- [ ] a11y: named → `role="img"` + name, `img` `alt=""`, initials and icon `aria-hidden`; `decorative` → `aria-hidden`; badge label in the container's description; consumer `aria-describedby` kept; axe has no violations in light + dark × en + ar, with and without badge
- [ ] Never focusable: `userEvent.tab()` skips the avatar
- [ ] RTL: badge on the top-start corner — (1.1) asserted from the declared placement that decides the corner, not only non-empty insets: in `ar` the indicator resolves `direction: rtl`, its `insetInlineEnd` and `insetBlockStart` are the Badge B2 placement values and the physical `left` / `right` are `unset`; the same test in `en` resolves `direction: ltr` (so inline-end is the top-right there and the top-left in Arabic); initials and image not mirrored (no `scaleX(-1)` on any avatar part)
- [ ] Every invalid combination in B1 warns once and renders the fallback
- [ ] No raw values (no hex, px, ms or font names in `Avatar.tsx`) — same guard as the other components

---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `avatar-contract.md`.

| Field | Value |
|---|---|
| Component | Avatar |
| Platform | Web (React + MUI) |
| Plan version | 1.1 · 2026-10-24 |
| Depends on | Icon (built, `src/components/icon/`) · **Badge 1.0** (`src/components/badge/`, plan Finished, code not on `main` yet — build Avatar after Badge is merged; if `Badge` is missing, stop and report in C8) |

### C1 Goal

`import { Avatar } from '@biowave/web'` shows a photo, the derived initials or a fallback glyph in four sizes, two shapes and three colours, with an optional Badge placed by shape, named for screen readers (or decorative), never focusable — built on MUI `Avatar` and the Biowave `Icon` and `Badge`, tokens only.

### C2 Scope

**In scope:** B1–B9 — all props, the image → initials → icon fallback with load tracking, the initials rule, the `badge` composition, the dev warnings; (1.1) review round 1 fixes — the Fix round 1 task list under C7.

**Out of scope** (do not build)
- Avatar groups (stacked avatars, “+3” overflow) and interactive avatars (click handlers, buttons) — the List, Chip and Top app bar plans place Avatar inside their own interactive parts
- Image upload or cropping (File upload, Day 16)
- Automatic colour from the name
- Sizes other than `sm` · `md` · `lg` · `xl`
- Changes to Icon, Badge or any other component

### C3 Approach

- Base: `@mui/material/Avatar` wrapped by `styled(MuiAvatar)` in `Avatar.tsx`. Map `shape` `circle` → MUI `variant="circular"`, `square` → `variant="rounded"`, and override MUI's radius, size, font and colours completely from `cssVars` (`cssVars.size.control.height.*`, `cssVars.radius.*`, `cssVars.size.icon.*`, `cssVars.color.*`). Initials take the text style class on an inner `span` (`bw-text-label-sm` …); the root's MUI `font-size` / `font-family` are reset so only the class applies.
- Load tracking (1.1 — review round 1 #1): do **not** rely on MUI's internal loading (it shows an empty circle while loading) and do **not** probe with `new Image()` (it fetches every photo at once, so `loading="lazy"` never applies). Avatar renders the real `img` itself as a child of MUI `Avatar`, next to the fallback, and tracks that element's own events:
  - `<img key={src} className="bw-avatar__image" src={src} loading="lazy" decoding="async" alt="" draggable={false} onLoad={…} onError={…} />` whenever `src` is not empty (B2 › image). MUI's `src`, `srcSet`, `alt` and `slotProps.img` are not used.
  - `useImageLoaded(src)` in `useImageLoaded.ts` returns `{ status: 'loading' | 'loaded' | 'error', onLoad, onError }`: `'loading'` for a new non-empty `src`, `'error'` for an empty one; events that belong to a previous `src` are ignored.
  - `'loading'` → `img` `visibility: hidden`, fallback rendered; `'loaded'` → `img` visible, fallback not rendered; `'error'` → no `img`, fallback rendered.
  - An image that finished before React attached its handlers (server-rendered HTML being hydrated): a ref callback on the `img` reads `complete` — `naturalWidth > 0` → `'loaded'`, `0` → `'error'`.
- Initials: a pure `avatarInitials(name)` in `avatarInitials.ts` per the B1 Initials rule (`/\p{Script=Arabic}/u`); unit-tested.
- Fallback glyph: `<Icon name={icon} />` inside a `span` sized by `font-size: var(--bw-size-icon-*)`; colour from the B3 icon token.
- Badge: when `badge` is set, return `<Badge {...rest} overlap={shape === 'circle' ? 'circular' : 'rectangular'}>{container}</Badge>` (strip `children` / `overlap` from `badge` first). The container must forward `aria-describedby` (Badge clones it), `className`, `data-*` and `ref`.
- a11y per B6; `visuallyHidden` is not needed (the name is `aria-label`).
- Dev warnings: `warnOnce` from `src/internal/warnOnce.ts`, one per B1 combination.
- Gotchas: MUI `Avatar` adds `font-size: 1.25rem`, `line-height: 1` and a theme `background-color` — override all; MUI's fallback `Person` SVG appears when children are empty — always pass children; the `img` is Avatar's own now, so `object-fit`, `object-position` and the absolute fill are set explicitly (B2).

### C4 Token gaps

None. Every value in B2–B3 is an existing semantic token; no component tokens are needed (P-04, D-13).

### C5 Files to create / change

```
3-web-components/src/components/avatar/Avatar.tsx           new: Avatar, AvatarProps, AvatarSize, AvatarShape, AvatarColor, AvatarBadgeProps · (1.1) change: own lazy img (C3)
3-web-components/src/components/avatar/avatarInitials.ts    new: avatarInitials(name)
3-web-components/src/components/avatar/useImageLoaded.ts    new: load tracking hook · (1.1) change: tracks the img's own events, no probe
3-web-components/src/components/avatar/Avatar.test.tsx      new · (1.1) change: B9 content / lazy / RTL items
3-web-components/src/components/avatar/index.ts            new
3-web-components/src/index.ts                              change: export Avatar + types
3-web-components/README.md                                 change: Avatar row Code status
CHANGELOG.md                                               change
```

### C6 Tests

Implement every item in B9, plus:
- [ ] Every test renders through the shared `renderWithBiowave` (`src/test/render.tsx`, options `theme` and `locale`); no test creates its own emotion cache or `BiowaveProvider`
- [ ] Default timeouts only: no timeout arguments in `Avatar.test.tsx`, no `testTimeout` / `fileParallelism` change; every test passes under the 5 s default
- [ ] Image loading is driven deterministically: (1.1) the test fires `load` / `error` on the rendered `img` itself (`fireEvent.load` / `fireEvent.error`, wrapped in `act`); no `window.Image` stub is needed — spy on it only to assert it is never constructed; no real network
- [ ] `avatarInitials` unit tests per the B9 cases
- [ ] Type test: an unknown `size`, `shape` or `color` is a TypeScript error (`// @ts-expect-error`); `badge={{ overlap: 'circular' }}` is a type error
- [ ] The Icon guard (`src/test/noLegacyIcons.test.ts`) still passes — the fallback glyph comes from `Icon`; MUI's built-in `Person` icon never renders (assert no `svg` in the avatar)

### C7 Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 exactly (names, types, defaults, initials rule, warnings)
- [ ] AC-2 Every value in B2–B3 comes from the listed token; no raw values, no primitives
- [ ] AC-3 B4: content swaps at once; the fallback shows while loading and after an error; no MUI empty-circle state
- [ ] AC-4 RTL behaves as B5 (badge top-start, nothing mirrored); a11y as B6 (axe clean, never focusable)
- [ ] AC-5 Tests in B9 and C6 exist and pass through `renderWithBiowave` with default timeouts; `npm run typecheck`, `npm run test:web`, `npm run docs:check` pass
- [ ] AC-6 Exported from `src/index.ts`; section README status updated
- [ ] AC-7 The badge is the Biowave `Badge` with `overlap` from `shape`; the avatar box size is unchanged by it
- [ ] AC-8 (1.1) Lazy loading per B2 › image and C3 › Load tracking: the real `img` is in the DOM from the first render with `loading="lazy"`, hidden (not `display: none`) until its own `load`; no `new Image()` probe; in a browser, an avatar far below the fold does not request its photo until scrolled near
- [ ] AC-9 (1.1) The B9 RTL test asserts the corner from the declared placement and direction (`ar` and `en`), not only non-empty insets
- [ ] AC-10 (1.1) C8 gets a **Fix round 1** entry with every command and real numbers (`npm run typecheck`, `npm run test:web` passed/total + duration, `npm run component-tokens`, `npm run docs:check`, `npm run sync`); header `Code` set to `Built`; `3-web-components/README.md` row matches

**Fix round 1 — Executor task list** (one list; nothing else is in scope):
1. #1 Lazy image — C3 › Load tracking and B2 › image: render the real `img` with `loading="lazy"` and track its own `load` / `error`; remove the `new Image()` probe and the MUI `src` / `slotProps.img` path; keep the fallback until the `img` has loaded. Files: `Avatar.tsx`, `useImageLoaded.ts`
2. #1 Tests — B9 (1.1) content priority, lazy loading and `src` change items; drive loading with `fireEvent.load` / `fireEvent.error` on the `img` instead of the `window.Image` stub (C6 1.1). File: `Avatar.test.tsx`
3. #3 RTL test — B9 (1.1) RTL item: assert direction and the placement values in `ar` and `en` (AC-9). File: `Avatar.test.tsx`
4. C8 **Fix round 1** entry (AC-10); header `Code` → `Built` and the README row; one `CHANGELOG.md` entry

(#2, the header `Source code` link, is done by the Planner in 1.1.)

Files the Executor may touch in this fix round: `3-web-components/src/components/avatar/Avatar.tsx`, `useImageLoaded.ts`, `Avatar.test.tsx`, the header `Code` field and C8 of this file, the `3-web-components/README.md` row and `CHANGELOG.md`. Nothing else — not Badge, Icon or the shared test tooling.

---

### C8 Execution log (filled by the Executor)

| Field | Value |
|---|---|
| Agent | Codex |
| Date | 2026-10-24 |
| Files changed | `3-web-components/src/components/avatar/Avatar.tsx`; `avatarInitials.ts`; `useImageLoaded.ts`; `Avatar.test.tsx`; `index.ts`; `3-web-components/src/index.ts`; `3-web-components/README.md`; `3-web-components/components/avatar/avatar.md`; `CHANGELOG.md` |
| Checks | `npm run typecheck` ✓; `npm run test:web` ✓ (166 tests); `npm run component-tokens` ✓; `npm run sync` ✓ (`READY`); `npm run docs:check` ✓ |

**Deviations:** none
**Questions for the Planner:** none

---

## D · Figma build

> How to build Part B in Figma. The Figma Agent receives this through the generated `figma-avatar-contract.md`.

> Written by the Planner (Claude) together with Part C. Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> **Values are never written here.** Sizes, tokens, states and timings come from B2–B4.
> **One file per platform (D-12).** This file builds the Web Avatar set in **Biowave DS — Web Components**. Tablet and Mobile build their own sets from their own Part D.

| Field | Value |
|---|---|
| Component | Avatar |
| Platform | Web |
| Figma file | **Biowave DS — Web Components** (`_sync/figma-files.json` › `web`) |
| Page / section | `↳ Avatar` › sections `Avatar` and `Avatar — Documentation` |
| Mode | **Create new.** The legacy `Avatar size` collection in the Foundations file is not used (D-13) |
| Plan version | 1 · 2026-10-23 |

### D1 Rules for this build

0. **Library first; no component tokens (D-13).** Avatar has no `avatar.tokens.json` (B3: every value is a semantic token). Bind directly to the **Biowave DS — Foundations** library variables listed in the contract; never create local variables, collections or styles. Text styles `Web/{en|ar}/label/sm`, `Web/{en|ar}/label/lg`, `Web/{en|ar}/title/lg`, `Web/{en|ar}/heading/sm`.
1. **Every value is bound.** Fill, radius, width and height → variables; text → text style. The sample photo is an image fill (the only unbound fill allowed).
2. **Token → variable:** `-` between segments becomes `/`: `size-control-height-md` → `4. Size › size/control/height/md`; `size-icon-md` → `4. Size › size/icon/md`; `radius-full` → `2. Radius › radius/full`; `radius-md` → `2. Radius › radius/md`; `color-background-neutral-default` → `1. Themes › color/background/neutral/default`; `color-text-role-brand` → `1. Themes › color/text/role/brand`.
3. **Never** bind `_Primitive/*` or `_deprecated/*`.
4. **Layer names = anatomy part names** (A2): the component itself is `container`; children `image`, `initials`, `fallback-icon`. `badge` exists only in documentation examples, as an instance of the Badge set.
5. Auto layout on the component. Absolute positioning only for the `badge` instance in documentation examples, placed per Badge B2.
6. `fallback-icon` is an instance of the **Icon** set in this file (`Glyph` = `person`); the badge in examples is an instance of the **Badge** set in this file. Build Icon and Badge first; if Badge is not built yet, build the set and leave the badge examples for later (report in D11).

### D2 Component structure

```
❖ Avatar                    ← component set (published) on page ↳ Avatar
  (no private base components)
```

### D3 Layer tree and auto layout

```
container (Avatar)    ↔ horizontal · align center/center · W = H fixed {B2 container size}
│                       radius {B2 radius by Shape} · clip content · fill {B3 container background}
├── image             ▭ rectangle · fill = image (sample portrait, scale mode Fill) · constraints Scale
│                       Type=Image only
├── initials          T text style {B2 initials by Size} · fill {B3 initials} · TEXT `Initials`
│                       hug · no wrap · Type=Initials only
└── fallback-icon     ◇ Icon instance (Glyph=person, Size per B2) · fill {B3 fallback-icon}
                        INSTANCE_SWAP `Icon` · Type=Icon only
```

```
Type=Image        Type=Initials       Type=Icon        doc example with badge
 ╭──────╮          ╭──────╮           ╭──────╮          ╭──────╮●
 │░░░░░░│          │  SA  │           │ [◆]  │          │  SA  │
 ╰──────╯          ╰──────╯           ╰──────╯          ╰──────╯
    ②                 ③                  ④                   ⑤
```

### D4 Properties

This table is the source for Code Connect (D9).

| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `Type` | VARIANT | `Image` · `Initials` · `Icon` | `Initials` | `src` / `name` | `Image` = `src` set · `Initials` = `name` without `src` · `Icon` = neither |
| `Size` | VARIANT | `SM` · `MD` · `LG` · `XL` | `MD` | `size` | `'sm'` … `'xl'` |
| `Shape` | VARIANT | `Circle` · `Square` | `Circle` | `shape` | `'circle'` · `'square'` |
| `Color` | VARIANT | `Neutral` · `Brand` · `Secondary` | `Neutral` | `color` | `'neutral'` · `'brand'` · `'secondary'` |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | Figma only, `Type=Initials` only (text style); code takes language from the provider |
| `Initials` | TEXT | | `SA` (`س` for `AR`) | `initials` / `name` | the shown letters |
| `Icon` | INSTANCE_SWAP | Icon set glyphs | `person` | `icon` | glyph name |

**Icons used:** `person`

### D5 Variants to generate

- Axes: `Type × Size × Shape × Color × Language`, with the B3 rules:
  - `Image`: 4 sizes × 2 shapes, `Color=Neutral`, `Language=EN` = 8
  - `Initials`: 4 sizes × 2 shapes × 3 colours × 2 languages = 48
  - `Icon`: 4 sizes × 2 shapes × 3 colours, `Language=EN` = 24
- Total **80 variants**. Defaults: `Initials`, `MD`, `Circle`, `Neutral`, `EN`.
- Grid of the raw set: rows = `Type › Shape › Language`, columns = `Size › Color`; gap `spacing/xl`.

### D6 States, interactions and motion

No interactive states and no prototype interactions. Doc page 04 shows the content states (Loading → Image, Image failed → fallback) as static frames and points to Badge for the badge motion.

### D7 RTL

Method: `Language=AR` variants for `Initials` (Arabic text style, one letter per A4.4). The avatar itself has no direction and nothing mirrors. Doc page 08 shows the badge on the top-end corner in EN (top-right) and on the top-start corner in AR (top-left).

```
EN  ╭──────╮●        AR  ●╭──────╮
    │  SA  │              │  س   │
    ╰──────╯              ╰──────╯
```

### D8 Documentation pages

Build the 12 standard pages (`_templates/component.md` D8 + `2-foundations/figma-doc-kit.md` › Page layouts) in section `Avatar — Documentation` on `↳ Avatar`, frames `Avatar / 00 Component sheet` … `Avatar / 11 Changelog` (skip `10`, version 1.0), only from the Doc Kit. If the Doc Kit is not published, finish Phase 1 and report "docs waiting for Doc Kit".

Page notes for Avatar:
- 01 Introduction: an image avatar, an initials avatar and an icon avatar at `MD`, one with a `Dot` badge (`Success`); Light and Dark panels.
- 03 Variations: `Size` row, `Shape` row (person circle vs device square), `Color` row, the content fallback order (image → initials → icon), badge examples (dot, count, check) on both shapes.
- 04 States and motion: Loading, Image, Image failed (static frames, B4).
- 05 Usage: avatar inside a list row (decorative, name as title) vs a standalone avatar with a name.
- 08 RTL: EN and AR pairs (D7) with Latin and Arabic initials.
- 09 Accessibility: “Sara Ali, image, Online” reading order, contrast pairs per colour, decorative vs named.

Component description: "Photo, initials or a fallback glyph that stands for a person, team or device; optional Badge. Never interactive. Spec: 3-web-components/components/avatar/avatar.md".

### D9 Code Connect

- File: `3-web-components/src/components/avatar/Avatar.figma.tsx`
- Mapping: D4 table (`Size` → `size`, `Shape` → `shape`, `Color` → `color`, `Initials` → `name`, `Icon` → `icon`, `Type=Image` → `src`). Publish only after code and Figma reviews are both `Approved`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Set `Avatar` on `↳ Avatar` in the Web file; layer names match D3 and A2
- [ ] F-AC-2 Properties match D4 exactly (names, types, values, defaults)
- [ ] F-AC-3 Variant count = 80; no `Image × Brand/Secondary`, no AR `Image` / `Icon`
- [ ] F-AC-4 Zero raw values: fill, radius, width, height and text bound (QA lint report attached; the sample image fill is the only exception); zero local variables or styles
- [ ] F-AC-5 Correct in Light and Dark (variable mode switch only); Typography mode `Web`
- [ ] F-AC-6 `fallback-icon` is an Icon instance (`person`, Rounded), not detached and not mirrored; badge examples are Badge instances
- [ ] F-AC-7 AR variants per D7; component description filled
- [ ] F-AC-8 Values match B2–B3 one by one (redline every `Size` × `Shape`)
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
| 1 | 2026-10-24 | **Approved** | not reviewed |

### E2 Round 1 — 2026-10-24

| Field | Value |
|---|---|
| Plan version reviewed | 1.0 |
| Spec version reviewed | 1.0 |
| Reviewer | Claude |
| Date | 2026-10-24 |
| Verdict | **Approved** — AC-1 … AC-7 met and measured in a real browser; no 🔴/🟡 finding. 2 Planner nits (spec wording) and 1 Executor nit (test strength) |

Commands run by the Reviewer on branch `ds/avatar-web` at `6535c3f` (implement commit = latest; in `3-web-components/src` the branch changes only `src/components/avatar/{Avatar.tsx,Avatar.test.tsx,avatarInitials.ts,useImageLoaded.ts,index.ts}` and `src/index.ts`):
`npm run docs:check` ✅ 27 component files · `npm run typecheck` ✅ · `npm run test:web` ✅ **166/166**, 11 files, 8.40 s, default timeouts, first run (load average 1.92). Avatar alone: 22/22 in 1.73 s; no timeout arguments in `Avatar.test.tsx`; every render goes through `renderWithBiowave`.
Real browser: my own headless Chrome (`--headless=new`, CDP on a private port, not the shared pane) running the real `Avatar` / `Badge` / `Icon` from `3-web-components/src` inside `BiowaveProvider` with the generated `tokens.css` + `icons.css` (Material Symbols Rounded loaded), served by a scratch Vite config outside the repo (private port, own cache dir) with a 4 s delayed image, a 404 image and a fast image; 1200 × 900; light/en · light/ar · dark/en · dark/ar. Both processes were started by me and stopped by PID afterwards.

#### Acceptance criteria

| AC | Result | Evidence (file:line / test name) |
|---|---|---|
| AC-1 API = B1 (names, types, defaults, initials rule, warnings) | ✅ | Props, types and defaults `Avatar.tsx:11-39, 137-153` (`icon='person'`, `size='md'`, `shape='circle'`, `color='neutral'`, `decorative=false`); `name` required unless `decorative` (discriminated union `:29-39`); `className`, `data-*`, `aria-describedby`, `ref` on the container `:211-225` (test *names meaningful content, hides decorative content and forwards the supported root props*). Exported types `index.ts:1-8`. Initials rule `avatarInitials.ts:1-17` (grapheme segmenter, `\p{Script=Arabic}`, `toLocaleUpperCase`); test *derives grapheme-safe initials for %s* (6 cases incl. emoji and combining mark). Browser: `Sara Ali` → `SA`, `Omar` → `O`, `سارة علي` → `س` (label `سارة علي`), `initials="xy"` → `xy`. All 4 B1 warnings once each `Avatar.tsx:162-191` via dev-only `warnOnce`; test *warns once for each invalid combination…* (4 calls over 2 renders) |
| AC-2 B2–B3 values from tokens; no raw values / primitives | ✅ | `Avatar.tsx:47-131` — `cssVars.*` semantic tokens only; `inherit` keywords reset MUI's font (C3). Guard test *contains no raw color, length, duration or font values*. Browser, all 24 size × shape × colour cells in all 4 theme × language combos: box 32/40/48/56 (`sm`–`xl`), unchanged in ar; radius circle 9999 px, square 6/8/10/12 px; initials 12/14/16/18 px weight 500/500/500/600 (line height 16/20/24/24 en · 18/22/26/26 ar from the text style); glyph 16/20/24/32 px. Colours equal B3 in light and dark (e.g. light neutral bg `rgb(237,237,237)` / text+icon `rgb(41,41,41)`; dark brand bg `rgb(7,19,35)` / `rgb(144,163,188)`) |
| AC-3 B4: swap at once; fallback while loading and after error; no MUI empty circle | ✅ | `useImageLoaded.ts:11-45`, `Avatar.tsx:221`. Browser: delayed image → `SA` and no `img` at t0, `img` (alt `""`, `loading=lazy`, `decoding=async`, `draggable=false`, 40 × 40, `object-fit: cover`) after load; `src` change → `SA` again on the next frame, new image after its load; switch to a 404 → `SA`; 404 from mount → `SA`; `src=""` → `SA` and no probe. No `svg` (MUI `Person`) in any state. Tests *keeps the fallback visible until an image loads and resets when src changes*, *uses initials before the Icon fallback…* (stubbed `window.Image`, `act`) |
| AC-4 RTL = B5; a11y = B6 | ✅ | Browser placement (indicator centre relative to the avatar box): en circle `(0.854, 0.146)` = top-end on the circle edge, square `(1, 0)` = top-right corner; ar circle `(0.146, 0.146)`, square `(0, 0)` = top-left (top-start), for `xl` and `sm`, dot, check and count. `transform: none` on container and initials in ar. B6: named → `role="img"` + `aria-label` trimmed, `img` `alt=""`, initials / icon `aria-hidden` (`Avatar.tsx:194-209, 222-224`); decorative → `aria-hidden="true"`, no role / label; badge label in the container's `aria-describedby` (browser: `Online`, `Verified`, `5 messages`; test keeps the consumer id: description `Team member Online`). Contrast measured (initials / icon on bg): light neutral 12.43 / 12.43, brand 12.54 / 10.84, secondary 8.18 / **6.39** (lowest, = B6); dark neutral 10.51, brand 7.24, secondary 7.88 (both). Never focusable: 0 nodes with `tabindex`, test *is never focusable*; axe test light + dark × en + ar with and without badge ✅ |
| AC-5 B9 + C6 tests exist and pass; checks pass | ✅ | Every B9 item and every C6 item has a test (`Avatar.test.tsx:92-394`, incl. `@ts-expect-error` type contract `:385-394` and the no-`svg` asserts); `src/test/noLegacyIcons.test.ts` passes. Checks ✅ above. RTL assertion strength: nit 3 |
| AC-6 Exported; README status | ✅ | `src/index.ts` (alphabetical, first component); README row = header (Code set to Approved by this review) |
| AC-7 Biowave `Badge`, `overlap` from shape; box unchanged | ✅ | `Avatar.tsx:240-254` — `children` / `overlap` stripped, `overlap` circular / rectangular. Browser: classes `MuiBadge-overlapCircular` / `-Rectangular`; `xl` with badge 56 × 56 = without 56 × 56, Badge root 56 × 56 (`sm` 32 × 32). Tests *uses the public Badge, maps overlap…*, owned-prop case in *invalid combinations* |

#### Rule checks (AGENTS.md §2)

| Rule | Result | Notes |
|---|---|---|
| No generated files edited | ✅ | Implement commit touches the C5 files, C8, README row, CHANGELOG, run record |
| No raw values / no primitives | ✅ | `cssVars.*` semantic tokens only; guard test passes |
| RTL first (logical properties) | ✅ | `inlineSize`, `blockSize`; no physical properties; placement owned by Badge (`insetInlineEnd`) |
| Both themes, both languages, tested | ✅ | Render matrix and axe in light + dark × en + ar; browser checked all four |
| Accessibility WCAG 2.2 AA | ✅ | B6 measured above; not a target, not focusable; nothing animates |
| Biowave `Icon` for the glyph (D-18) | ✅ | `<Icon name={icon} />` `Avatar.tsx:207`; ligature rendered at the token size; no `@mui/icons-material`, no MUI `Person` |
| Tests via `renderWithBiowave`, default timeouts | ✅ | No direct `render`, no own provider or cache, no timeout arguments |
| Stayed inside the contract / one component | ✅ | No change to Icon, Badge or any other component |
| Changelog | ✅ | `CHANGELOG.md` › *Code — Web Avatar 1.0* |

#### Figma build (Part D)

Skipped — Figma build is `Planned`.

#### Probe evidence

```
Headless Chrome, 1200×900, real Avatar in BiowaveProvider + tokens.css + icons.css
  box     sm 32×32  md 40×40  lg 48×48  xl 56×56   (en = ar, light = dark)
  radius  circle 9999px · square 6 / 8 / 10 / 12px
  initials 12/16 500 · 14/20 500 · 16/24 500 · 18/24 600   (ar line height 18/22/26/26)
  glyph   16 / 20 / 24 / 32px, "person" ligature, aria-hidden
  load    t0 slow → "SA", no img · t+5s → img alt="" lazy async draggable=false 40×40 cover
          src change → "SA" next frame → img after load · 404 → "SA" · src="" → "SA"
  badge   en circle centre (0.854,0.146) square (1,0) · ar circle (0.146,0.146) square (0,0)
          box with badge 56×56 = without 56×56 · root 56×56
Contrast  initials / icon on bg
  light neutral 12.43/12.43  brand 12.54/10.84  secondary 8.18/6.39
  dark  neutral 10.51/10.51  brand  7.24/7.24   secondary 7.88/7.88
```

#### Findings

| # | Severity | File | Issue | Required change | Owner |
|---|---|---|---|---|---|
| 1 | 🟢 Nit | `avatar.md` B2 · C3 | B2 asks `loading="lazy"` on the `img`, but C3 prescribes a `new Image()` probe that fetches the photo eagerly on mount (`useImageLoaded.ts:25-34`) and the `img` is only rendered after it loaded — so `lazy` never has an effect and every avatar photo in a long list downloads at once. The code follows the plan; the two rules contradict each other | Decide in B2/C3: drop `loading="lazy"` from B2, or ask for a lazy probe (e.g. start the probe when the container enters the viewport, or render the hidden `img` with `loading="lazy"` and track its own `load` / `error`) | Planner |
| 2 | 🟢 Nit | `avatar.md` header | Header row "Source code — `src/components/avatar/` — not built yet (the Executor creates it)" is stale; the code exists | Link `src/components/avatar/` as the other built components do | Planner |
| 3 | 🟢 Nit | `Avatar.test.tsx:314-330` | The B9 RTL item "badge on the top-start corner" is asserted only as `insetInlineEnd` / `insetBlockStart` being non-empty, which is also true in LTR and does not prove the corner. jsdom has no layout; the browser confirms the placement (probe above) | Assert the declared placement that decides the corner (e.g. the indicator's `inset-inline-end` value and `direction: rtl` on the Badge root, or the RTL emotion class), or name the test for what it checks | Executor |

#### Next step

- Approved → Code `Approved` (header + README). Planner nits 1–2 → Plan `Open` (AGENTS.md §3: a review that sends Planner items back reopens the plan); the Planner settles B2/C3 on lazy loading, fixes the header link, sets `Finished` and regenerates the contracts. Executor nit 3 can ride along with the next touch of `Avatar.test.tsx`; not required for this unit. Figma build is still `Planned` and not reviewed.

---

## F · Changelog

> Changes to this component on this platform. Every entry also gets one line in the root `CHANGELOG.md`.

### F0 Changes from previous version

1.1 — review round 1 Planner items #1 and #2: the photo is now loaded lazily for real. Avatar renders the `img` itself with `loading="lazy"`, hidden until its own `load` event, instead of probing every photo with `new Image()` on mount; the fallback still shows while loading and after an error. Same props, same tokens, same look. B9 gains a lazy-loading item and a stronger RTL badge assertion (Executor nit #3); C7 carries the Fix round 1 task list. Header `Source code` now links the built folder.

### F1 Guidelines changelog

| Version | Date | Change | Migration | Author |
|---|---|---|---|---|
| 1.0 | 2026-10-23 | Initial. Image → initials → icon fallback, `circle` · `square`, three neutral-meaning colours, one Badge placed by shape | — | Claude (Planner) |

### F2 Spec changelog

| Version | Date | Change | Breaking | Migration |
|---|---|---|---|---|
| 1.1 | 2026-10-24 | Review round 1 #1 (Planner): B2 › image (own `img`, `loading="lazy"`, hidden until `load`, removed on `error`, never `display: none`; container `position: relative`), B4 `src` change, C3 › Load tracking (no `new Image()` probe, `useImageLoaded` tracks the `img`'s events, hydration `complete` check), B9 content / lazy / `src`-change items, C5, C6 (fire events on the `img`), C7 AC-8 – AC-10 and the Fix round 1 task list (#1, #3 RTL assertion). #2: header `Source code` link | No | None — same props and look |
| 1.0 | 2026-10-23 | Initial | No | — |

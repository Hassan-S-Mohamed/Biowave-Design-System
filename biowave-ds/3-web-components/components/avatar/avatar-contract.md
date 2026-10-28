<!-- GENERATED from avatar.md @ 0749bcbbcd2bb966 — do not edit; change the source and run: npm run contract -- web avatar -->
# Avatar · صورة رمزية — Web — code contract

> **Everything you need to build Avatar on Web, and nothing else.** Read this file only. Generated from [`avatar.md`](avatar.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](avatar.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Avatar · صورة رمزية |
| Platform | Web · React + MUI |
| Built on | MUI `Avatar` (`src`, `variant` `circular` · `rounded`, children fallback), restyled from tokens; fallback glyph via the Biowave `Icon`; badge via the Biowave `Badge` |
| Import | `import { Avatar } from '@biowave/web'` |
| Version | 1.1 · 2026-10-24 |
| Source code | [`src/components/avatar/`](../../src/components/avatar/) |
| Tokens | — |
| Source | [`avatar.md`](avatar.md) @ `0749bcbbcd2bb966` |

## 1. What it is

An avatar is a small picture that stands for a person — or for a team, a device or a site — wherever that person appears: in lists, tables, cards, comments and the top app bar. It shows a photo when there is one; otherwise it shows the person's initials, and when there is no name either, a generic person glyph. It can carry one Badge on its edge (a presence dot, a count or the Check badge for "verified"). An avatar only identifies; it is never a control on its own.

**Part names** (use exactly these in code, class names and tests):

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `container` | Yes | The circle (or rounded square) that sets the size, clips the content and shows the background colour behind initials and icon |
| 2 | `image` | No | The photo or picture, cropped to fill the container. Shown only after it has loaded |
| 3 | `initials` | No | One or two letters taken from the `name`, shown when there is no image (or it is loading or failed) |
| 4 | `fallback-icon` | No | A Material Symbols Rounded glyph (`person` by default), drawn by Icon, shown when there is neither an image nor initials |
| 5 | `badge` | No | One Badge on the avatar's top-end edge: presence dot, count or Check badge. Placed by the avatar, styled by Badge |

**Options** (names and values are the props in §2):

- 4.1 `size`
- 4.2 `shape`
- 4.3 `color`
- 4.4 Content: `image`, `name`, `initials`, `icon`
- 4.5 `badge`
- 4.6 `decorative`

## 2. API

### `Avatar`

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

## 3. Dimensions

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

## 4. Tokens by part and state

No component tokens — every value is an existing semantic token (P-04); `avatar.tokens.json` is not needed. An avatar has no interactive states; the table is per `color`.

| `color` | `container` background | `initials` colour | `fallback-icon` colour |
|---|---|---|---|
| `neutral` | `color-background-neutral-default` | `color-text-subtle` | `color-icon-subtle` |
| `brand` | `color-background-brand-subtle` | `color-text-role-brand` | `color-icon-role-brand` |
| `secondary` | `color-background-secondary-subtle` | `color-text-role-secondary` | `color-icon-role-secondary` |

- `image` state: the container keeps its `color` background (seen only through transparent pixels); no border, no overlay.
- `badge`: all Badge tokens come from the Badge spec (Badge B3); Avatar names none.
- Dark theme: same tokens (values switch automatically). No exceptions.

### 4.1 How to use each token on Web

Values are for checking only — never paste a value.

| Token | CSS / TS | Light | Dark |
|---|---|---|---|
| `color-background-brand-subtle` | `var(--bw-color-background-brand-subtle)` · `cssVars.color.background.brand.subtle` | #BEC9D9 | #071323 |
| `color-background-neutral-default` | `var(--bw-color-background-neutral-default)` · `cssVars.color.background.neutral.default` | #EDEDED | #292929 |
| `color-background-secondary-subtle` | `var(--bw-color-background-secondary-subtle)` · `cssVars.color.background.secondary.subtle` | #C0DDE8 | #032A37 |
| `color-icon-role-brand` | `var(--bw-color-icon-role-brand)` · `cssVars.color.icon.role.brand` | #132843 | #BEC9D9 |
| `color-icon-role-secondary` | `var(--bw-color-icon-role-secondary)` · `cssVars.color.icon.role.secondary` | #094E65 | #90C3D5 |
| `color-icon-subtle` | `var(--bw-color-icon-subtle)` · `cssVars.color.icon.subtle` | #292929 | #DBDBDB |
| `color-text-role-brand` | `var(--bw-color-text-role-brand)` · `cssVars.color.text.role.brand` | #132843 | #BEC9D9 |
| `color-text-role-secondary` | `var(--bw-color-text-role-secondary)` · `cssVars.color.text.role.secondary` | #094E65 | #90C3D5 |
| `color-text-subtle` | `var(--bw-color-text-subtle)` · `cssVars.color.text.subtle` | #292929 | #DBDBDB |
| `motion-duration-instant` | `var(--bw-motion-duration-instant)` · `cssVars.motion.duration.instant` | 0 | 0 |
| `radius-full` | `var(--bw-radius-full)` · `cssVars.radius.full` | 9999 | 9999 |
| `radius-lg` | `var(--bw-radius-lg)` · `cssVars.radius.lg` | 10 | 10 |
| `radius-md` | `var(--bw-radius-md)` · `cssVars.radius.md` | 8 | 8 |
| `radius-sm` | `var(--bw-radius-sm)` · `cssVars.radius.sm` | 6 | 6 |
| `radius-xl` | `var(--bw-radius-xl)` · `cssVars.radius.xl` | 12 | 12 |
| `size-control-height-lg` | `var(--bw-size-control-height-lg)` · `cssVars.size.control.height.lg` | 48 | 48 |
| `size-control-height-md` | `var(--bw-size-control-height-md)` · `cssVars.size.control.height.md` | 40 | 40 |
| `size-control-height-sm` | `var(--bw-size-control-height-sm)` · `cssVars.size.control.height.sm` | 32 | 32 |
| `size-control-height-xl` | `var(--bw-size-control-height-xl)` · `cssVars.size.control.height.xl` | 56 | 56 |
| `size-icon-lg` | `var(--bw-size-icon-lg)` · `cssVars.size.icon.lg` | 24 | 24 |
| `size-icon-md` | `var(--bw-size-icon-md)` · `cssVars.size.icon.md` | 20 | 20 |
| `size-icon-sm` | `var(--bw-size-icon-sm)` · `cssVars.size.icon.sm` | 16 | 16 |
| `size-icon-xl` | `var(--bw-size-icon-xl)` · `cssVars.size.icon.xl` | 32 | 32 |
| `target-min` | `var(--bw-target-min)` · `cssVars.target.min` |  |  |

## 5. States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Loading → Image | the `img` `load` event | none — the photo replaces the fallback at once | `motion-duration-instant` | — |
| Loading → Image failed | the `img` `error` event | none — the fallback stays | `motion-duration-instant` | — |
| `src` changes | new `src` | back to Loading: a new hidden `img` for the new `src`, fallback shown until its `load` | `motion-duration-instant` | — |
| `size` / `shape` / `color` / `name` changes | prop change | none | `motion-duration-instant` | — |
| Badge hidden ↔ visible | Badge props | as Badge B4 (Badge animates its own indicator) | Badge B4 | Badge B4 |

Reduced motion: nothing of Avatar's own animates; Badge follows its own reduced-motion rule.

## 6. RTL

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

## 7. Accessibility (implementation)

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

## 8. Examples

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

## 9. How to build it

### Goal

`import { Avatar } from '@biowave/web'` shows a photo, the derived initials or a fallback glyph in four sizes, two shapes and three colours, with an optional Badge placed by shape, named for screen readers (or decorative), never focusable — built on MUI `Avatar` and the Biowave `Icon` and `Badge`, tokens only.

### Scope

**In scope:** B1–B9 — all props, the image → initials → icon fallback with load tracking, the initials rule, the `badge` composition, the dev warnings; (1.1) review round 1 fixes — the Fix round 1 task list under C7.

**Out of scope** (do not build)
- Avatar groups (stacked avatars, “+3” overflow) and interactive avatars (click handlers, buttons) — the List, Chip and Top app bar plans place Avatar inside their own interactive parts
- Image upload or cropping (File upload, Day 16)
- Automatic colour from the name
- Sizes other than `sm` · `md` · `lg` · `xl`
- Changes to Icon, Badge or any other component

### Approach

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

### Token gaps

None. Every value in B2–B3 is an existing semantic token; no component tokens are needed (P-04, D-13).

### Files to create / change

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

## 10. Tests

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

Implement every item in B9, plus:
- [ ] Every test renders through the shared `renderWithBiowave` (`src/test/render.tsx`, options `theme` and `locale`); no test creates its own emotion cache or `BiowaveProvider`
- [ ] Default timeouts only: no timeout arguments in `Avatar.test.tsx`, no `testTimeout` / `fileParallelism` change; every test passes under the 5 s default
- [ ] Image loading is driven deterministically: (1.1) the test fires `load` / `error` on the rendered `img` itself (`fireEvent.load` / `fireEvent.error`, wrapped in `act`); no `window.Image` stub is needed — spy on it only to assert it is never constructed; no real network
- [ ] `avatarInitials` unit tests per the B9 cases
- [ ] Type test: an unknown `size`, `shape` or `color` is a TypeScript error (`// @ts-expect-error`); `badge={{ overlap: 'circular' }}` is a type error
- [ ] The Icon guard (`src/test/noLegacyIcons.test.ts`) still passes — the fallback glyph comes from `Icon`; MUI's built-in `Person` icon never renders (assert no `svg` in the avatar)

## 11. Acceptance criteria (the Reviewer checks exactly these)

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

1. Fill [C8 Execution log](avatar.md#c8-execution-log-filled-by-the-executor) in `avatar.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `avatar.md` and in the Components table of `3-web-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).

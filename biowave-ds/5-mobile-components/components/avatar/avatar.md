# Avatar · صورة رمزية — Mobile

> **One file for Avatar on Mobile:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- mobile avatar`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Avatar · صورة رمزية |
| Summary | Shows a person's photo, initials or a person glyph — optionally with a badge — so people recognise who something belongs to. |
| Summary (ar) | تعرض صورة الشخص أو الأحرف الأولى من اسمه أو رمز شخص — مع شارة عند الحاجة — ليتعرّف المستخدم على صاحب العنصر. |
| Parts | Container · image · initials · fallback icon · badge |
| Parts (ar) | الحاوية · الصورة · الأحرف الأولى · الأيقونة البديلة · الشارة |
| Platform | Mobile · Flutter + Material 3 |
| Built on | Custom widget shaped like M3 `CircleAvatar` (`CircleAvatar` has no rounded-square shape, shows nothing while an image loads and cannot place a Badge — C3); fallback glyph via `BwIcon` (`Symbols.person_rounded`); badge via `BwBadge` |
| Import | `BwAvatar` from `package:biowave_mobile/biowave_mobile.dart` |
| Figma | **Biowave DS — Mobile Components** › `↳ Avatar` (page Typography mode `Mobile`) · build: [Part D](#d--figma-build) |
| Version | 1.1 · 2026-10-24 |
| Plan | Finished |
| Code | Planned |
| Figma build | Planned |
| Review | — |
| Source code | `lib/src/components/avatar/` — not built yet (the Executor creates it) |
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

### A8 Platform notes — Mobile

```
Top app bar (profile button)       Request card
┌─────────────────────────────┐    ┌─────────────────────────────┐
│ Biowave        [✉](3) (SA)  │    │ (SA)  Sara Ali              │
└─────────────────────────────┘    │       Leave request · 2 days│
                                   └─────────────────────────────┘
```

| | Mobile |
|---|---|
| Available | ✓ |
| Default size | `lg`; `md` inside the top app bar profile button; `xl` in the profile header |
| Image | Network or memory image; the fallback shows until the first frame |
| Interaction | None — the parent list item, card or button handles touch and keeps the 48 target |
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

> The contract for Mobile. Facts identical on every platform link to the [Web spec](../../../3-web-components/components/avatar/avatar.md#b--spec).

### B1 API

#### `BwAvatar`

| Param | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `name` | `String?` | | `null` | ✓ unless `decorative` | A4.4 — source of the initials and the semantics label (B6) |
| `image` | `ImageProvider?` | `NetworkImage` · `MemoryImage` · `AssetImage` … | `null` | | A4.4 `image` |
| `initials` | `String?` | 1–2 characters | `null` → derived from `name` (Initials rule) | | A4.4 — overrides the derived initials |
| `icon` | `IconData` | `Symbols.<name>_rounded` | `Symbols.person_rounded` | | A4.4 — the `fallback-icon` glyph |
| `size` | `BwAvatarSize` | `sm` · `md` · `lg` · `xl` | `lg` | | A4.1 |
| `shape` | `BwAvatarShape` | `circle` · `square` | `circle` | | A4.2 |
| `color` | `BwAvatarColor` | `neutral` · `brand` · `secondary` | `neutral` | | A4.3 — background behind `initials` and `fallback-icon` |
| `badge` | `BwBadge?` | a `BwBadge` with `child: null` | `null` | | A4.5 — BwAvatar rebuilds it with `child` = the container and `overlap` from `shape` (B2) |
| `decorative` | `bool` | | `false` | | A4.6 — excluded from semantics (B6) |

Platform naming: web `src` (URL) = `image` (`ImageProvider`); web `icon` (`IconName`) = `IconData`; web `badge` (Badge props object) = a `BwBadge` widget without `child` (Badge 1.0, `5-mobile-components/components/badge/badge.md` B1). One constructor, like the web props.

**Initials rule** — same as [Web B1](../../../3-web-components/components/avatar/avatar.md#b1-api): trim `name`, split on whitespace; Arabic-script first character (`RegExp(r'\p{Script=Arabic}', unicode: true)`) → that one character; otherwise first character of the first word + first character of the last word (two words or more), `toUpperCase()`. Characters are grapheme clusters (`String.characters`, `package:characters`).

**Invalid combinations** (`assert` in debug, message in quotes; release builds render the fallback):
- `name` null or blank and `decorative == false` → “avatars need a name or decorative” (renders the `fallback-icon`)
- `initials` longer than 2 characters → “initials are 1–2 characters” (shows the first 2)
- `decorative` with `badge` → “a decorative avatar hides its badge label”
- `badge.child != null` → “the avatar is the badge's anchor — leave child null” (the given child is replaced)

### B2 Dimensions

Same sizes as [Web B2](../../../3-web-components/components/avatar/avatar.md#b2-dimensions), in dp:

| Part | Property | `sm` | `md` | `lg` | `xl` |
|---|---|---|---|---|---|
| `container` | width = height | `size-control-height-sm` → `BwSize.controlHeightSm` | `size-control-height-md` → `BwSize.controlHeightMd` | `size-control-height-lg` → `BwSize.controlHeightLg` | `size-control-height-xl` → `BwSize.controlHeightXl` |
| `container` | radius (`circle`) | `radius-full` → `BwRadius.full` | same | same | same |
| `container` | radius (`square`) | `radius-sm` → `BwRadius.sm` | `radius-md` → `BwRadius.md` | `radius-lg` → `BwRadius.lg` | `radius-xl` → `BwRadius.xl` |
| `initials` | text style | `label-sm` → `context.bw.text.labelSm` | `label-lg` → `context.bw.text.labelLg` | `title-lg` → `context.bw.text.titleLg` | `heading-sm` → `context.bw.text.headingSm` |
| `fallback-icon` | size | `size-icon-sm` → `BwIconSize.sm` | `size-icon-md` → `BwIconSize.md` | `size-icon-lg` → `BwIconSize.lg` | `size-icon-xl` → `BwIconSize.xl` |

```
   ┬ ╭──────────╮               ┬ ┌──────────┐
   │ │    SA    │ BwRadius.full │ │   [◆]    │ BwRadius.md
   ┴ ╰──────────╯               ┴ └──────────┘
 BwSize.controlHeightLg        BwSize.controlHeightMd
```

Layout rules:
- `container`: `SizedBox.square(dimension: …)` → `ClipRRect(borderRadius: BorderRadius.circular(…))` → `ColoredBox(color: …)` → `Center`. Fixed size; never grows with content or with the badge.
- `image`: `Image(image:, fit: BoxFit.cover, alignment: Alignment.center, excludeFromSemantics: true, gaplessPlayback: false)`, filling the container; `frameBuilder` shows the fallback until the first frame, `errorBuilder` shows the fallback on error. (1.1) No lazy-loading flag and no pre-fetch: Flutter resolves the `ImageProvider` only when the `Image` is built, and lazy lists (`ListView.builder`, `SliverList`) build only the rows near the viewport, so off-screen avatars do not fetch their photos — the same effect as web `loading="lazy"`. Never resolve or `precacheImage` the photo ahead of the build.
- `initials`: `Text(maxLines: 1, softWrap: false, textAlign: TextAlign.center)` with the B2 text style.
- `fallback-icon`: `BwIcon(icon: icon, size: …)` without `directional`.
- `badge`: `BwBadge` with `child` = the container and `overlap: BwBadgeOverlap.circular` for `circle`, `.rectangular` for `square`; placement and ring per Badge B2.

### B3 Tokens by part and state

Identical to [Web B3](../../../3-web-components/components/avatar/avatar.md#b3-tokens-by-part-and-state); no component tokens (P-04). Flutter mapping (`context.bw.colors.*`):

| `color` | `container` background | `initials` colour | `fallback-icon` colour |
|---|---|---|---|
| `neutral` | `color-background-neutral-default` → `backgroundNeutralDefault` | `color-text-subtle` → `textSubtle` | `color-icon-subtle` → `iconSubtle` |
| `brand` | `color-background-brand-subtle` → `backgroundBrandSubtle` | `color-text-role-brand` → `textRoleBrand` | `color-icon-role-brand` → `iconRoleBrand` |
| `secondary` | `color-background-secondary-subtle` → `backgroundSecondarySubtle` | `color-text-role-secondary` → `textRoleSecondary` | `color-icon-role-secondary` → `iconRoleSecondary` |

Badge colours come from Badge B3. Dark theme: same tokens. No exceptions.

### B4 States and transitions

Same table as [Web B4](../../../3-web-components/components/avatar/avatar.md#b4-states-and-transitions): Loading → Image and Loading → Image failed swap at once (`BwDuration.instant`, no fade — `frameBuilder` returns the child directly); a new `image` shows the fallback again until its first frame (`gaplessPlayback: false`). The badge animates as Badge B4.
Reduced motion: nothing of Avatar's own animates.

### B5 RTL

As [Web B5](../../../3-web-components/components/avatar/avatar.md#b5-rtl): nothing mirrors (image, initials, `fallback-icon`); Latin initials keep their order, Arabic-script names show one letter; the badge moves to the top-start corner through `BwBadge` (`PositionedDirectional`).

```
LTR   ╭──────╮●        RTL  ●╭──────╮
      │  SA  │              │  س   │
      ╰──────╯              ╰──────╯
```

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Named avatar | `Semantics(label: name, image: true, child: ExcludeSemantics(child: content))` — the initials are never read letter by letter; the `Image` has `excludeFromSemantics: true` |
| `decorative` | `ExcludeSemantics` around the whole avatar |
| With `badge` | `BwBadge` merges its `semanticLabel` as the value of the avatar node (Badge B6). TalkBack / VoiceOver: “Sara Ali, Online, image” |
| Contrast | As Web B6 (every `color`, light and dark) |
| Focus | Never focusable: no `Focus`, `InkWell` or `GestureDetector` in the avatar |
| Target size | Not a target; a parent that is tappable keeps ≥ `target-min` (48) |

| Key | Action |
|---|---|
| — | None. Interaction belongs to the parent |

### B7 Examples

```dart
BwAvatar(name: 'Sara Ali', image: NetworkImage(sara.photoUrl));

// Arabic (direction comes from Directionality) — one letter
BwAvatar(name: 'سارة علي', color: BwAvatarColor.brand);

// Presence dot
BwAvatar(
  name: 'Omar Hassan',
  image: NetworkImage(omar.photoUrl),
  badge: BwBadge(variant: BwBadgeVariant.dot, color: BwBadgeColor.success, semanticLabel: 'Online'),
);

// Verified device
BwAvatar(
  name: 'Reception terminal',
  shape: BwAvatarShape.square,
  icon: Symbols.devices_rounded,
  badge: BwBadge(variant: BwBadgeVariant.check, semanticLabel: 'Verified'),
);

// Next to the visible name in a list row
BwAvatar(name: 'Sara Ali', image: NetworkImage(sara.photoUrl), decorative: true);
```

### B8 Figma

[Part D](#d--figma-build).

### B9 Tests

- [ ] Every `size` × `shape` × `color` renders the B2 size (`tester.getSize`) and radius and the B3 colours in light + dark × en + ar
- [ ] Content priority with a test `ImageProvider` that completes or fails on demand: before the first frame → fallback; after → image; error → fallback; no `image` → initials; no name → `fallback-icon` (`Symbols.person_rounded` by default, `icon` overrides); a new `image` shows the fallback again
- [ ] Initials rule (pure function): “Sara Ali” → “SA”, “Omar” → “O”, “ sara  maria ali ” → “SA”, “سارة علي” → “س”, an emoji or a letter with a combining mark kept whole; `initials` overrides
- [ ] `badge`: rendered as `BwBadge` with the container as `child`; `overlap` `circular` for `circle`, `rectangular` for `square`; avatar size unchanged by the badge
- [ ] Semantics: named → image node with the name, no initials node; `decorative` → no node; badge label merged as value
- [ ] Never focusable: no focus node in the avatar subtree; a tap on it reaches the parent's `onTap`
- [ ] RTL: badge on the top-start corner; nothing mirrored
- [ ] Every assert in B1 fires with its message
- [ ] Goldens: sizes × shapes × colours (light/dark), image / initials / icon, LTR / RTL with a badge
- [ ] No `Icons.` and no raw sizes / colours in the source

---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `avatar-contract.md`.

| Field | Value |
|---|---|
| Component | Avatar |
| Platform | Mobile (Flutter + M3) |
| Plan version | 1.1 · 2026-10-24 |
| Depends on | `BwIcon` (`lib/src/components/icon/`) · **`BwBadge` 1.0** (`lib/src/components/badge/`, plan Finished, code not on `main` yet — build Avatar after Badge is merged; if `BwBadge` is missing, stop and report in C8) |

### C1 Goal

`BwAvatar` from `package:biowave_mobile/biowave_mobile.dart` shows a photo, the derived initials or a fallback glyph in four sizes, two shapes and three colours, with an optional `BwBadge` placed by shape, labelled for screen readers (or decorative), never focusable — tokens only.

### C2 Scope

**In scope:** B1–B9 — `BwAvatar`, `BwAvatarSize`, `BwAvatarShape`, `BwAvatarColor`; the image → initials → icon fallback, the initials rule, the badge composition, semantics, asserts.

**Out of scope** (do not build)
- Avatar groups and tappable avatars — List, Chip and Top app bar place `BwAvatar` inside their own tappable parts
- Image upload or cropping (File upload, Day 16); image caching beyond Flutter's `ImageCache`
- Automatic colour from the name; other sizes
- Changes to `BwIcon`, `BwBadge` or any other widget

### C3 Approach

- Base: a `StatelessWidget` composed as in B2 (not M3 `CircleAvatar`: it has no rounded square, shows only its background while `backgroundImage` loads and calls `onBackgroundImageError` without a fallback child). Record in C8 if `CircleAvatar` is used internally.
- Fallback: one private builder for initials / icon, reused by `frameBuilder` (`frame == null && !wasSynchronouslyLoaded`) and `errorBuilder`.
- Initials: a pure top-level function `bwAvatarInitials(String? name)` in `bw_avatar_initials.dart` (not exported from the package); unit-tested.
- Colours: one `switch` from `BwAvatarColor` to the three B3 colours; sizes: one `switch` from `BwAvatarSize` to the B2 tokens.
- Badge: when `badge != null`, return `BwBadge(...)` built from the given badge's public fields (`variant`, `count`, `max`, `showZero`, `color`, `isVisible`, `semanticLabel`) with `child` = the container and `overlap` from `shape`. If `BwBadge` does not expose those fields, stop and ask (C8) — do not change Badge.
- Semantics per B6.
- Gotchas: `ClipRRect` with `BwRadius.full` on a square gives a circle — no `ClipOval` needed; `Image.frameBuilder` is called with `wasSynchronouslyLoaded: true` for cached images — show the image at once then; tests need `tester.runAsync` or a fake `ImageProvider` to control loading.

### C4 Token gaps

None. Every value in B2–B3 is an existing semantic token; no component tokens are needed (P-04, D-13).

### C5 Files to create / change

```
5-mobile-components/lib/src/components/avatar/bw_avatar.dart            new: BwAvatar, BwAvatarSize, BwAvatarShape, BwAvatarColor
5-mobile-components/lib/src/components/avatar/bw_avatar_initials.dart   new: bwAvatarInitials(name)
5-mobile-components/lib/biowave_mobile.dart                    change: export bw_avatar.dart
5-mobile-components/pubspec.yaml                                   change only if `characters` is not a direct dependency yet
5-mobile-components/test/avatar_test.dart                          new
5-mobile-components/test/goldens/avatar/                           new
5-mobile-components/README.md                                      change: Avatar row Code status
CHANGELOG.md                                                  change
```

### C6 Tests

Implement every item in B9, plus:
- [ ] Unit tests of `bwAvatarInitials` (the B9 cases, `null`, blank)
- [ ] `meetsGuideline(textContrastGuideline)` passes for every `color` with initials, light and dark

### C7 Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 API per B1 (names, types, defaults, initials rule, asserts)
- [ ] AC-2 Sizes and colours only from tokens (B2–B3); no raw values, no `BwPalette`
- [ ] AC-3 B4: content swaps at once; the fallback shows before the first frame and after an error
- [ ] AC-4 RTL per B5; semantics, pointer and focus per B6
- [ ] AC-5 Tests in B9 and C6 exist and pass; `cd 5-mobile-components && flutter analyze && flutter test` pass
- [ ] AC-6 Exported; section README status updated; no `Icons.` in `lib/`
- [ ] AC-7 The badge is `BwBadge` with `overlap` from `shape`; the avatar size is unchanged by it

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

> **One file per platform (D-12).** Structure, layer tree and properties are the same as [Web D2–D4](../../../3-web-components/components/avatar/avatar.md#d--figma-build); this file lists only what differs. Values come from the Mobile spec [Part B](#b--spec).

| Field | Value |
|---|---|
| Component | Avatar |
| Platform | Mobile |
| Figma file | **Biowave DS — Mobile Components** (`_sync/figma-files.json` › `mobile`) |
| Page / section | `↳ Avatar` › sections `Avatar` and `Avatar — Documentation` |
| Mode | **Create new** |
| Plan version | 1 · 2026-10-23 |

### D1 Rules for this build

Same as [Web D1](../../../3-web-components/components/avatar/avatar.md#d1-rules-for-this-build) (library first, no component tokens, everything bound except the sample image fill, no local variables or styles), plus:
- **Typography mode:** on page `↳ Avatar` set the explicit variable mode **`Mobile · EN`** of `5. Typography` (Arabic frames and examples: **`Mobile · AR`**). Text styles stay `label/sm`, `label/lg`, `title/lg`, `heading/sm`; the mode gives the Mobile scale and the language font.
- `fallback-icon` is an instance of the **Icon** set in this file (`Glyph` = `person`); badge examples are instances of the **Badge** set in this file.

### D2 Component structure

As [Web D2](../../../3-web-components/components/avatar/avatar.md#d2-component-structure). No Mobile differences in structure.

### D3 Layer tree and auto layout

As [Web D3](../../../3-web-components/components/avatar/avatar.md#d3-layer-tree-and-auto-layout).

### D4 Properties

As [Web D4](../../../3-web-components/components/avatar/avatar.md#d4-properties); code mapping uses the Flutter names in B1 (`Type=Image` → `image`, `Icon` → `icon: Symbols.*_rounded`).

**Icons used:** `person`

### D5 Variants to generate

Same as Web D5: **80 variants** (`Image` 8 · `Initials` 48 · `Icon` 24). Default `Size=LG`.

### D6 States, interactions and motion

As Web D6 — no interactive states; doc page 04 shows the content states.

### D7 RTL

As Web D7 (`Language=AR` for `Initials`; badge placement mirror on doc page 08).

### D8 Documentation pages

All 12 standard pages in section `Avatar — Documentation` on `↳ Avatar` in this file, built only from the Doc Kit, page notes as Web D8. 07 Platform: `Doc/Device frame` = Phone (SafeArea), with the A8 example. 09 Accessibility: target-size overlay (`target-min` = 48) on the parent row, showing the avatar is not the target.

Component description: "Photo, initials or a fallback glyph that stands for a person, team or device; optional Badge. Never interactive. Spec: 5-mobile-components/components/avatar/avatar.md".

### D9 Code Connect

`5-mobile-components/lib/src/components/avatar/bw_avatar.figma.dart` — `Size` → `size: BwAvatarSize.*`, `Shape` → `shape: BwAvatarShape.*`, `Color` → `color: BwAvatarColor.*`, `Initials` → `name`, `Icon` → `icon`, `Type=Image` → `image`. Publish after code and Figma reviews are both `Approved`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Set `Avatar` on `↳ Avatar` in the Mobile file; structure and layer names as Web D2–D3
- [ ] F-AC-2 Properties as Web D4; 80 variants per D5
- [ ] F-AC-3 Zero raw values (sample image fill excepted); zero local variables/styles; `fallback-icon` is an Icon instance
- [ ] F-AC-4 Page Typography mode = `Mobile`; Light/Dark by mode only; AR initials variants per D7
- [ ] F-AC-5 Values match the Mobile B2–B3 (redline every `Size` × `Shape`)
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
| — | — | not reviewed | not reviewed |

---

## F · Changelog

> Changes to this component on this platform. Every entry also gets one line in the root `CHANGELOG.md`.

### F0 Changes from previous version

1.1 — follows web review round 1 #1 (lazy loading): B2 › image now states that the photo is fetched only when the `Image` widget is built (lazy lists build only visible rows) and must not be pre-fetched. No change to the API, tokens, look or the C plan tasks.

### F1 Guidelines changelog

| Version | Date | Change | Migration | Author |
|---|---|---|---|---|
| 1.0 | 2026-10-23 | Initial. Image → initials → icon fallback, `circle` · `square`, three neutral-meaning colours, one Badge placed by shape | — | Claude (Planner) |

### F2 Spec changelog

| Version | Date | Change | Breaking | Migration |
|---|---|---|---|---|
| 1.1 | 2026-10-24 | Web review round 1 #1 (lazy loading): B2 › image note — no pre-fetch or `precacheImage`; the `ImageProvider` resolves when the widget is built | No | None |
| 1.0 | 2026-10-23 | Initial | No | — |

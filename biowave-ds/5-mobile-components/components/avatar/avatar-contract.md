<!-- GENERATED from avatar.md @ e43059fbe194b593 — do not edit; change the source and run: npm run contract -- mobile avatar -->
# Avatar · صورة رمزية — Mobile — code contract

> **Everything you need to build Avatar on Mobile, and nothing else.** Read this file only. Generated from [`avatar.md`](avatar.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](avatar.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Avatar · صورة رمزية |
| Platform | Mobile · Flutter + Material 3 |
| Built on | Custom widget shaped like M3 `CircleAvatar` (`CircleAvatar` has no rounded-square shape, shows nothing while an image loads and cannot place a Badge — C3); fallback glyph via `BwIcon` (`Symbols.person_rounded`); badge via `BwBadge` |
| Import | `BwAvatar` from `package:biowave_mobile/biowave_mobile.dart` |
| Version | 1.1 · 2026-10-24 |
| Source code | `lib/src/components/avatar/` — not built yet (the Executor creates it) |
| Tokens | — |
| Source | [`avatar.md`](avatar.md) @ `e43059fbe194b593` |

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

### `BwAvatar`

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

## 3. Dimensions

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

## 4. Tokens by part and state

Identical to [Web B3](../../../3-web-components/components/avatar/avatar.md#b3-tokens-by-part-and-state); no component tokens (P-04). Flutter mapping (`context.bw.colors.*`):

| `color` | `container` background | `initials` colour | `fallback-icon` colour |
|---|---|---|---|
| `neutral` | `color-background-neutral-default` → `backgroundNeutralDefault` | `color-text-subtle` → `textSubtle` | `color-icon-subtle` → `iconSubtle` |
| `brand` | `color-background-brand-subtle` → `backgroundBrandSubtle` | `color-text-role-brand` → `textRoleBrand` | `color-icon-role-brand` → `iconRoleBrand` |
| `secondary` | `color-background-secondary-subtle` → `backgroundSecondarySubtle` | `color-text-role-secondary` → `textRoleSecondary` | `color-icon-role-secondary` → `iconRoleSecondary` |

Badge colours come from Badge B3. Dark theme: same tokens. No exceptions.

### 4.1 How to use each token on Mobile

Values are for checking only — never paste a value.

| Token | Dart | Light | Dark |
|---|---|---|---|
| `color-background-brand-subtle` | `context.bw.colors.backgroundBrandSubtle` | #BEC9D9 | #071323 |
| `color-background-neutral-default` | `context.bw.colors.backgroundNeutralDefault` | #EDEDED | #292929 |
| `color-background-secondary-subtle` | `context.bw.colors.backgroundSecondarySubtle` | #C0DDE8 | #032A37 |
| `color-icon-role-brand` | `context.bw.colors.iconRoleBrand` | #132843 | #BEC9D9 |
| `color-icon-role-secondary` | `context.bw.colors.iconRoleSecondary` | #094E65 | #90C3D5 |
| `color-icon-subtle` | `context.bw.colors.iconSubtle` | #292929 | #DBDBDB |
| `color-text-role-brand` | `context.bw.colors.textRoleBrand` | #132843 | #BEC9D9 |
| `color-text-role-secondary` | `context.bw.colors.textRoleSecondary` | #094E65 | #90C3D5 |
| `color-text-subtle` | `context.bw.colors.textSubtle` | #292929 | #DBDBDB |
| `radius-full` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 9999 | 9999 |
| `radius-lg` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 10 | 10 |
| `radius-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 8 | 8 |
| `radius-sm` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 6 | 6 |
| `radius-xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 12 | 12 |
| `size-control-height-lg` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 48 | 48 |
| `size-control-height-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 40 | 40 |
| `size-control-height-sm` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 32 | 32 |
| `size-control-height-xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 56 | 56 |
| `size-icon-lg` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 24 | 24 |
| `size-icon-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 20 | 20 |
| `size-icon-sm` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 16 | 16 |
| `size-icon-xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 32 | 32 |
| `target-min` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` |  |  |

## 5. States and transitions

Same table as [Web B4](../../../3-web-components/components/avatar/avatar.md#b4-states-and-transitions): Loading → Image and Loading → Image failed swap at once (`BwDuration.instant`, no fade — `frameBuilder` returns the child directly); a new `image` shows the fallback again until its first frame (`gaplessPlayback: false`). The badge animates as Badge B4.
Reduced motion: nothing of Avatar's own animates.

## 6. RTL

As [Web B5](../../../3-web-components/components/avatar/avatar.md#b5-rtl): nothing mirrors (image, initials, `fallback-icon`); Latin initials keep their order, Arabic-script names show one letter; the badge moves to the top-start corner through `BwBadge` (`PositionedDirectional`).

```
LTR   ╭──────╮●        RTL  ●╭──────╮
      │  SA  │              │  س   │
      ╰──────╯              ╰──────╯
```

## 7. Accessibility (implementation)

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

## 8. Examples

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

## 9. How to build it

### Goal

`BwAvatar` from `package:biowave_mobile/biowave_mobile.dart` shows a photo, the derived initials or a fallback glyph in four sizes, two shapes and three colours, with an optional `BwBadge` placed by shape, labelled for screen readers (or decorative), never focusable — tokens only.

### Scope

**In scope:** B1–B9 — `BwAvatar`, `BwAvatarSize`, `BwAvatarShape`, `BwAvatarColor`; the image → initials → icon fallback, the initials rule, the badge composition, semantics, asserts.

**Out of scope** (do not build)
- Avatar groups and tappable avatars — List, Chip and Top app bar place `BwAvatar` inside their own tappable parts
- Image upload or cropping (File upload, Day 16); image caching beyond Flutter's `ImageCache`
- Automatic colour from the name; other sizes
- Changes to `BwIcon`, `BwBadge` or any other widget

### Approach

- Base: a `StatelessWidget` composed as in B2 (not M3 `CircleAvatar`: it has no rounded square, shows only its background while `backgroundImage` loads and calls `onBackgroundImageError` without a fallback child). Record in C8 if `CircleAvatar` is used internally.
- Fallback: one private builder for initials / icon, reused by `frameBuilder` (`frame == null && !wasSynchronouslyLoaded`) and `errorBuilder`.
- Initials: a pure top-level function `bwAvatarInitials(String? name)` in `bw_avatar_initials.dart` (not exported from the package); unit-tested.
- Colours: one `switch` from `BwAvatarColor` to the three B3 colours; sizes: one `switch` from `BwAvatarSize` to the B2 tokens.
- Badge: when `badge != null`, return `BwBadge(...)` built from the given badge's public fields (`variant`, `count`, `max`, `showZero`, `color`, `isVisible`, `semanticLabel`) with `child` = the container and `overlap` from `shape`. If `BwBadge` does not expose those fields, stop and ask (C8) — do not change Badge.
- Semantics per B6.
- Gotchas: `ClipRRect` with `BwRadius.full` on a square gives a circle — no `ClipOval` needed; `Image.frameBuilder` is called with `wasSynchronouslyLoaded: true` for cached images — show the image at once then; tests need `tester.runAsync` or a fake `ImageProvider` to control loading.

### Token gaps

None. Every value in B2–B3 is an existing semantic token; no component tokens are needed (P-04, D-13).

### Files to create / change

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

## 10. Tests

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

Implement every item in B9, plus:
- [ ] Unit tests of `bwAvatarInitials` (the B9 cases, `null`, blank)
- [ ] `meetsGuideline(textContrastGuideline)` passes for every `color` with initials, light and dark

## 11. Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 API per B1 (names, types, defaults, initials rule, asserts)
- [ ] AC-2 Sizes and colours only from tokens (B2–B3); no raw values, no `BwPalette`
- [ ] AC-3 B4: content swaps at once; the fallback shows before the first frame and after an error
- [ ] AC-4 RTL per B5; semantics, pointer and focus per B6
- [ ] AC-5 Tests in B9 and C6 exist and pass; `cd 5-mobile-components && flutter analyze && flutter test` pass
- [ ] AC-6 Exported; section README status updated; no `Icons.` in `lib/`
- [ ] AC-7 The badge is `BwBadge` with `overlap` from `shape`; the avatar size is unchanged by it

## 12. Rules

1. Never edit generated files (`*/generated/*`, `2-foundations/dist/`, `2-foundations/preview/`, `_sync/*.json`, any `*-contract.md`).
2. No raw values: no hex, px, ms or font names — only the tokens in §4. A missing value means stop and ask; tokens are added by the Planner.
3. Never use primitives (`primitive.*`, `BwPalette`).
4. RTL first: logical properties only (`EdgeInsetsDirectional`, `AlignmentDirectional`, `BorderRadiusDirectional`); mirror only directional icons (§6).
5. Light + dark and en + ar, always — and tested.
6. WCAG 2.2 AA: keyboard, visible focus (`color-border-focus`, 2px, 2px offset), labels, targets ≥ `target-min` (48dp), reduced motion.
7. Stay inside this contract; one component per task; do not refactor unrelated files.

## 13. Commands that must pass

```bash
cd 5-mobile-components && flutter analyze && flutter test
npm run component-tokens
npm run sync        # must end with READY
npm run docs:check
```

## 14. When you finish

1. Fill [C8 Execution log](avatar.md#c8-execution-log-filled-by-the-executor) in `avatar.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `avatar.md` and in the Components table of `5-mobile-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).

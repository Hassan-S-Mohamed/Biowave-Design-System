<!-- GENERATED from avatar.md @ d9a1357f54b12492 — do not edit; change the source and run: npm run contract -- web avatar -->
# Avatar · صورة رمزية — Web — Figma contract

> **Everything the Figma Agent needs to build Avatar in the Web Components file, with our variables and styles.** Read this file only. Generated from [`avatar.md`](avatar.md) (Parts A, B, D) and the Figma library index (`_sync/figma-library.json`, read 2026-10-18). Questions go to [D11 Execution log](avatar.md#d11-execution-log-filled-by-the-figma-agent) — never invent.

**Two phases, one review:** Phase 1 — build the component set (§7–§8). Phase 2 — as soon as Phase 1 is finished, the 12 documentation pages and the Components List card (§9).

| | |
|---|---|
| Target file | **Biowave DS — Web Components** · key `7nDhsPNntzIWlrjmuSmZ9l` · https://www.figma.com/design/7nDhsPNntzIWlrjmuSmZ9l |
| Page | `↳ Avatar` (one page per component) |
| Component | Avatar · صورة رمزية |
| Platform | Web · React + MUI |
| Version | 1.0 · 2026-10-23 |
| Source | [`avatar.md`](avatar.md) @ `d9a1357f54b12492` |

## 1. Library connections in this file

| | |
|---|---|
| Library | **Biowave DS — Foundations** · library key `lk-e00b31b21f924b36eeea820da99c4b306c460986c83e894f415a1c194ba5a2e670f3142c2fccca81280a80bcaee6a87bc47c9a9505d186d7b693aa9805ad7031` |
| Library file | Foundations · key `AyFaSmfDUlTax3GpKhRdHI` |
| Doc Kit library (Phase 2) | **Annotation (Biowave Doc Kit)** · file key `cBPWg6YZNqK8UIzgMQIpXl` — must be enabled in this file (Assets → Libraries) |
| Enabled here | ✓ verified from a component file: 9 collections, 318 variables reachable |

Import by key — never search by name, never copy:

```js
const v = await figma.variables.importVariableByKeyAsync('<variable key>');   // library reference, not a local copy
const s = await figma.importStyleByKeyAsync('<style key>');                   // text / effect style
const c = await figma.importComponentByKeyAsync('<component key>');           // Doc Kit / icon component
const set = await figma.importComponentSetByKeyAsync('<component set key>');
```

## 2. Component-token collections (bind layers to these)

None yet — this component has no component tokens. Bind to the Foundations variables in §3 and report it in D11 so the Planner adds component tokens.

## 3. Foundations variables used (keys)

| Token | Figma variable | Key | Type | Scopes | Used by |
|---|---|---|---|---|---|
| `color-background-brand-subtle` | 1. Themes › `color/background/brand/subtle` | `7e262abe296024e9b4a29951d5e061fee8f3f2d7` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-background-neutral-default` | 1. Themes › `color/background/neutral/default` | `2dc9c39d4df7b490fd0d7ac7385b49fdaf0e973e` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-background-secondary-subtle` | 1. Themes › `color/background/secondary/subtle` | `6cfea2f9951f4815d9385c0029ee3dd3cc4eba6a` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-icon-neutral-subtle` | 1. Themes › `color/icon/neutral/subtle` | `fc66c13d6c036489bf774535cd8dbbf749795748` | COLOR | SHAPE_FILL, STROKE_COLOR | spec |
| `color-icon-role-brand` | 1. Themes › `color/icon/role/brand` | `73d6989d2161d900c2070cd9b67f01653e54251d` | COLOR | SHAPE_FILL, STROKE_COLOR | spec |
| `color-icon-role-secondary` | 1. Themes › `color/icon/role/secondary` | `b3c3c18415370f381760224fd00a40f2816ffdb6` | COLOR | SHAPE_FILL, STROKE_COLOR | spec |
| `color-text-neutral-subtle` | 1. Themes › `color/text/neutral/subtle` | `dac97f2fd2a80ccffd6283bcc06c623f64ebe90a` | COLOR | TEXT_FILL | spec |
| `color-text-role-brand` | 1. Themes › `color/text/role/brand` | `bf6f82d7545a8ae04bb4d55ee373397e5d16c45a` | COLOR | TEXT_FILL | spec |
| `color-text-role-secondary` | 1. Themes › `color/text/role/secondary` | `39d1b107af72de6e3b48156a5c5f3e7cb170b7de` | COLOR | TEXT_FILL | spec |
| `radius-full` | 2. Radius › `radius/full` | `cde1a4778562f488d8f32680d4d00f7957cc2a21` | FLOAT | CORNER_RADIUS | spec |
| `radius-lg` | 2. Radius › `radius/lg` | `bb2122acd11d99ba9396f13390d02b70941a6cfa` | FLOAT | CORNER_RADIUS | spec |
| `radius-md` | 2. Radius › `radius/md` | `0758e506cdfd4d7a4eef6369a4851133d7eab5a4` | FLOAT | CORNER_RADIUS | spec |
| `radius-sm` | 2. Radius › `radius/sm` | `44047be92c065ef35e4aa9ed6732645870ae38c9` | FLOAT | CORNER_RADIUS | spec |
| `radius-xl` | 2. Radius › `radius/xl` | `a5042304656c42bab9b62a4f4ab9c6b1831b487c` | FLOAT | CORNER_RADIUS | spec |
| `size-control-height-lg` | 4. Size › `size/control/height/lg` | `14c0f56d2add6f7149374e67cf4d3a2656aeb5dc` | FLOAT | WIDTH_HEIGHT | spec |
| `size-control-height-md` | 4. Size › `size/control/height/md` | `cb6d23a09de76b9cea37c24579dbb2a9e6e6a079` | FLOAT | WIDTH_HEIGHT | spec |
| `size-control-height-sm` | 4. Size › `size/control/height/sm` | `1409647f4e12e37e76b49ed9ce1a78946e4250f4` | FLOAT | WIDTH_HEIGHT | spec |
| `size-control-height-xl` | 4. Size › `size/control/height/xl` | `2d65685001b2cf5f0f050eddba6e298b104c97c4` | FLOAT | WIDTH_HEIGHT | spec |
| `size-icon-lg` | 4. Size › `size/icon/lg` | `e79bd86fedcce89547674c84c9127d0149e60061` | FLOAT | WIDTH_HEIGHT | spec |
| `size-icon-md` | 4. Size › `size/icon/md` | `eb459c673e6ca16e3c81b240f04b467717953a9a` | FLOAT | WIDTH_HEIGHT | spec |
| `size-icon-sm` | 4. Size › `size/icon/sm` | `2aa4b1f12a5ed0745f9a8b3251dc1fd9f7dd3476` | FLOAT | WIDTH_HEIGHT | spec |
| `size-icon-xl` | 4. Size › `size/icon/xl` | `06927be084b4fad4d4203a7fe7b6922e446d1c84` | FLOAT | WIDTH_HEIGHT | spec |
| `target-min` | 7. Grid & Layout › `target/min` | `db23ec2826d3bfa3e600e5a82801e0c7d37ba298` | FLOAT | WIDTH_HEIGHT | spec |

Code-only tokens (no Figma variable by design — motion, layers): `motion-duration-instant`. Use them only as written values in prototype settings and docs.

## 4. Text styles used (keys)

| Style | Key |
|---|---|
| `Web/en/label/sm` | `fc468e6e7206673886492c3f7f3c44dd1a9f8265` |
| `Web/ar/label/sm` | `fe9cb9594a1f874f420a34ff627a87bac9f91497` |
| `Web/en/label/lg` | `9fe6ff3cff9d3abce486aab5175350b06e06b891` |
| `Web/ar/label/lg` | `17dadc4ed7dede74a5575e3d54f1613ec877a1be` |
| `Web/en/title/lg` | `2da324fe6d92dee8e8bfb65214f3572272421b71` |
| `Web/ar/title/lg` | `6ab5a0d44f5b291775cd371d317f42b03e674a16` |
| `Web/en/heading/sm` | `5598bdd8dbd514d94e313a799f1a6344c7ed688f` |
| `Web/ar/heading/sm` | `ea77e2de7cf6fe466eb1b21be6a9d02e3cacfe14` |

## 5. Effect styles used (keys)

None named in B/D.

## 6. Components to instance (keys)

Nested Biowave components (e.g. Button inside Split button) are instances of the sets **in this file** — build them first; never detach.

### Icons (keys) — Google · Material Symbols library (D-18)

Library file **Google · Material Symbols** · key `RXlnhYgUKBBE6HveEr7e9C` — must be enabled in this file. Import the set, then use the **Style=Rounded** variant (`Fill=Filled` only for selected states). Colour the glyph by binding its vector fills to the icon colour token of the part.

| Icon | Set key | Rounded (unfilled) | Rounded (filled) |
|---|---|---|---|
| `person` | ⏳ not indexed — Planner runs `npm run sync:icons:plan` | | |

## 7. Phase 1 — values (from Part B)

### B1 API

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
- `container`: `display: inline-flex; align-items: center; justify-content: center; flex: none; overflow: hidden; vertical-align: middle`; fixed square from the size token; never grows or shrinks with content or with the badge.
- `image`: `inline-size: 100%; block-size: 100%; object-fit: cover; object-position: center`; `loading="lazy"`, `decoding="async"`, `alt=""`, `draggable={false}`.
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
| `src` changes | new `src` | back to Loading (fallback shown) until the new image loads | `motion-duration-instant` | — |
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

## 8. Phase 1 — build the component set (from Part D)

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

## 9. Phase 2 — documentation pages and Components List card

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

### Doc Kit components (keys)

| Component | Key | Kind |
|---|---|---|
| `Doc/Logo` | `b0506262908cc9602fb86d1d2f2d1574b8797fb1` | COMPONENT |
| `Doc/Version chip` | `20beed5d39281d472c391a3a23650a34058cff6a` | COMPONENT |
| `Doc/Divider` | `719437f0bf3e0276b697f22b886be069e1e428aa` | COMPONENT_SET |
| `Doc/Section` | `f29dffabb982e9374b1b804639f45514a29146a2` | COMPONENT |
| `Doc/Code block` | `9bcc61d27ad9bf6c4d4a9e5a6e3e6ebd37af5028` | COMPONENT |
| `Doc/Property chip` | `8990d04a48fb07d7f8f1056307d1faf3dc0ded65` | COMPONENT |
| `Doc/Header` | `dd9347ba546590b632ae68976fe2733f3f7d340e` | COMPONENT |
| `Doc/Axis label` | `24a64b9f56bb95bffc1b5f1ce61e58205b3023fb` | COMPONENT_SET |
| `Doc/Bracket` | `b10364d75b1d8c84e235d63773c0c7870898354a` | COMPONENT_SET |
| `Doc/Callout` | `24c24d19f00001b99acb880c3101afb1842a64f6` | COMPONENT_SET |
| `Doc/Panel` | `b8b20494dcf5f71d3492d90a96498d510d490132` | COMPONENT_SET |
| `Doc/Tile` | `eb3bac08d98c62634cbbc8a6a0129a5fa1783836` | COMPONENT |
| `Doc/Change note` | `5cc8476dd2952640e8138cf21feeb637cfcfe73a` | COMPONENT |
| `Doc/Deprecated overlay` | `d75a185f612de5fa7daadaff9083edff16c42fc4` | COMPONENT |
| `Doc/Table cell` | `4b48bcab4faac402c079e941b30f8987159bfa3f` | COMPONENT_SET |
| `Doc/Table row` | `fb2c9fdd139f3be6860495d1d95a911275ed8224` | COMPONENT_SET |
| `Doc/Table` | `40980251551a20a72810037dc043c66e9271600b` | COMPONENT |
| `Doc/Timeline` | `81d060910749d01da7648f5ae3877e283d668377` | COMPONENT_SET |
| `Doc/Motion row` | `2072d9e2a11281879696f1f8c6ee6ef917b029ac` | COMPONENT |
| `Doc/Uses` | `25ed1809ed37c229827ee8019ec52fe129ec0d31` | COMPONENT |
| `Doc/Do` | `45fdac0674bae9a7d6502a0d2e7f76943d8ea4f1` | COMPONENT |
| `Doc/Dont` | `b6271df857b44407da2657601b4e388bf843b7e8` | COMPONENT |
| `Doc/Skeleton` | `cdb8f9c05ff039be8fda885a25e3ade2986da93b` | COMPONENT_SET |
| `Doc/Device frame` | `c7c9ec2e833fad1b54333707c2210744515d5339` | COMPONENT_SET |
| `Doc/Home header` | `e9c1ee6681300d4c2a04e8f563c308642a3db3df` | COMPONENT |
| `Doc/Title bar` | `2c79bbf4615cf2c6fc8ef6a14390a32d2832d48d` | COMPONENT |
| `Doc/Home card` | `bdd6e95450e128f7b3d3d5fa86b655a6986d2cfa` | COMPONENT |
| `Doc/Footer` | `dd342bd1d199a8c5f353c58125681fad6b6c09f2` | COMPONENT |

### Components List card

On page `Components List` of this file, add (or refresh) one `Doc/Home card`: preview = live instance of the default variant on the dot-grid tile, title = component name, link "View Component ↗" to the `↳` page of this component. Cards stay in alphabetical order.

### Page layouts (from the Doc Kit spec)

The 12 documentation pages every component gets (Part D8 lists them with their sources; this section is their one layout home).

Every page starts with the same header (`Doc/Header`):

```
┌────────────────────────────────────────────────────────────────────────────┐
│ [logo] Biowave DS / Documentation                 {Platform} · v{version}  │
│                                                                            │
│ {Page title}                                                               │
│ {Page subtitle — one line}                                                 │
│ ────────────────────────────────────────────────────────────────────────── │
```

#### 00 Component sheet
The full variant matrix with axis labels. Columns = interaction states, rows grouped by the other axes. Built from the component set itself.

```
{Name}  (v1.0)
{one-line description}
──────────────────────────────────────────────────────────────────────────
                    State: Default   State: Hover   State: Pressed   State: Disabled
                   ┌──────────────┬──────────────┬───────────────┬────────────────┐
Size: MD │ Primary │ ▢ instance   │ ▢ instance   │ ▢ instance    │ ▢ instance     │
         │ Second. │ ▢            │ ▢            │ ▢             │ ▢              │
Size: SM │ Primary │ ▢            │ ▢            │ ▢             │ ▢              │
                   └──────────────┴──────────────┴───────────────┴────────────────┘
```
`Doc/Axis label` for every row and column (`property` small, `Value` bold). Invalid combinations are not shown.

#### 01 Introduction
Description paragraph, then the anatomy diagram twice: Light panel, then Dark panel (same instance, variable mode switched on the panel).

```
{Description from A1}

┌─ Doc/Panel (Light) ──────────────────────────────────────────────┐
│              title      counter                 trailing-item    │
│                 │          │                          │          │
│ leading-icon ─● ┌──────────────────────────────────────────────┐ │
│                 │ [◆] Title text (12)                     [⤓]  │ │
│ subtitle ─────● │     Subtitle text                            │ │
│                 │ ░░░░░░░░░░░░░░░░ slot ░░░░░░░░░░░░░░░░░░░░░░ │ ├─ slot
│                 └──────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
┌─ Doc/Panel (Dark) ── same diagram ───────────────────────────────┐
```
Callout labels = anatomy part names, exactly (`Doc/Callout`).

#### 02 Props and tokens
One `Doc/Table` per public sub-component (columns: Prop name · Description · Type · Prop values · Default; required props marked `*`). Then a reference instance and the token table.

```
Props [{Name}]                     Props [{Name}Header]
┌──────────┬─────────────┬──────┬──────────────┬─────────┐
│ Prop name│ Description │ Type │ Prop values  │ Default │
├──────────┼─────────────┼──────┼──────────────┼─────────┤
│ size *   │ …           │ enum │ • sm • md    │ md      │
└──────────┴─────────────┴──────┴──────────────┴─────────┘

Tokens            ┌ reference instance ┐
┌───────────────────┬─────────┬──────────────────────────────────────┐
│ Part · property   │ State   │ Token                                │
├───────────────────┼─────────┼──────────────────────────────────────┤
│ container · bg    │ Default │ color-background-neutral-default     │
└───────────────────┴─────────┴──────────────────────────────────────┘
```

#### 03 Variations
One block per property, in D4 order. Each value = one `Doc/Tile` with a live instance and caption `property = Value`. Other properties stay at default.

```
{property}
{one-line description from A4}
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│   ▢ instance     │ │   ▢ instance     │ │   ▢ instance     │
│                  │ │                  │ │                  │
│ size = SM        │ │ size = MD        │ │ size = LG        │
└──────────────────┘ └──────────────────┘ └──────────────────┘
────────────────────────────────────────────────────────────── (Doc/Divider)
```

#### 04 States and motion
One `Doc/Motion row` per transition in B4.

```
States           Animation          Trigger    Timeline (ms)                    Transition properties
──────────────── ────────────────── ────────── ──────────────────────────────── ──────────────────────────────
Initial state    ┌──────────────┐               0  70  150  200  300  400  600  ┌────────────────────────────┐
 ▢ Default       │ prototype    │   Hover       ├──────┤                        │ duration: motion-duration-sm│
Final state      │ preview      │               └ 150 ┘                         │ easing:   motion-easing-std │
 ▢ Hover         └──────────────┘                                               └────────────────────────────┘
                                                                                [Background  ■ ▸ ■]
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
```
Timeline bar length = the duration token's value. Property chip shows the from → to token swatches. Add a reduced-motion note at the end.

#### 05 Usage guidelines
"When to use" as a `Doc/Uses` card, then rule groups, each with a `Doc/Do` + `Doc/Dont` pair holding live, realistic compositions.

```
{Rule group title}
• {rule}
┌─ ✓ Do ──────────────────────────┐   ┌─ ✗ Don't ───────────────────────┐
│ • {rule}                        │   │ • {rule}                        │
│ ┌─────────────────────────────┐ │   │ ┌─────────────────────────────┐ │
│ │ realistic example (instance)│ │   │ │ wrong example (instance)    │ │
│ └─────────────────────────────┘ │   │ └─────────────────────────────┘ │
└─────────────────────────────────┘   └─────────────────────────────────┘
```

#### 06 Content guidelines
Same layout as 05, with copy rules from A6. Show EN and AR examples side by side in the Do card.

#### 07 Platform
One `Doc/Uses` card per layout context of this platform, each with a `Doc/Device frame` containing skeleton page content (`Doc/Skeleton`) and the component in place. Web: Desktop + narrow web. Tablet: Landscape + Portrait. Mobile: Phone. End with the platform differences table from A8.

```
Desktop
These are used on web apps / dashboards.
┌─ ★ Uses ───────────────────────────────────────────┐
│ {rule}                                             │
│ ┌─ Doc/Device frame ─────────────────────────────┐ │
│ │ ▬▬▬▬▬▬▬▬                                       │ │
│ │ ▢▢   ┌ component ┐   ▬▬▬▬▬▬▬▬                  │ │
│ │      └───────────┘   ▬▬▬▬▬▬                    │ │
│ └────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────┘
```

#### 08 RTL
LTR and RTL instances side by side for each structurally different variant, with `Doc/Callout` on every mirrored and non-mirrored part (B5). Arabic sample copy.

```
LTR (en)                              RTL (ar)
┌──────────────────────────────┐      ┌──────────────────────────────┐
│ [◆] Title text          [▸]  │      │  [◂]          عنوان البطاقة [◆] │
└──────────────────────────────┘      └──────────────────────────────┘
  ◆ not mirrored · ▸ mirrored
```

#### 09 Accessibility
`Doc/Section` blocks: Use case · Keyboard (table from B6) · Screen reader output · Focus (instance in Focus state with ring callout) · Target size (overlay showing `target-min`) · Colors (contrast pairs).

#### 10 Changes from previous version
Only when the version is > 1.0. New (live instance, with `Doc/Change note` callouts) next to Previous (old instance or image, hatched with `Doc/Deprecated overlay`). Notes use strike-through for the old value and bold for the new one, e.g. ~~`spacing-lg` fixed~~ → **`spacing-md` variable**.

```
New                                          Previous
┌──────────────────────────┐ ◂ change note   ┌──────────────────────────┐
│ ▢ current instance       │                 │ ╱╱╱ old version ╱╱╱╱╱╱╱  │
└──────────────────────────┘                 └──────────────────────────┘
```

#### 11 Changelog
`Doc/Table` from the changelogs (Version · Date · Change · Breaking · Migration).

Component description field (Figma "Description"): one line from A1 + link to the spec.

## 10. Code Connect

- File: `3-web-components/src/components/avatar/Avatar.figma.tsx`
- Mapping: D4 table (`Size` → `size`, `Shape` → `shape`, `Color` → `color`, `Initials` → `name`, `Icon` → `icon`, `Type=Image` → `src`). Publish only after code and Figma reviews are both `Approved`.

## 11. Rules

All rules in **D1** (§8), plus:

**Component tokens only (strict, D-13).** This file may contain exactly one kind of local variable: the `<Component> / <Group>` collections in §2. Never create a local primitive or semantic variable or any other collection; never copy or detach a library variable; never create a local text, effect, colour or grid style; bind layers to the component token when one exists for the property. Run `_sync/figma-read-tokens.js` (lint) **before Phase 1 and after each phase** — it must report 0 violations.

## 12. Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Set `Avatar` on `↳ Avatar` in the Web file; layer names match D3 and A2
- [ ] F-AC-2 Properties match D4 exactly (names, types, values, defaults)
- [ ] F-AC-3 Variant count = 80; no `Image × Brand/Secondary`, no AR `Image` / `Icon`
- [ ] F-AC-4 Zero raw values: fill, radius, width, height and text bound (QA lint report attached; the sample image fill is the only exception); zero local variables or styles
- [ ] F-AC-5 Correct in Light and Dark (variable mode switch only); Typography mode `Web`
- [ ] F-AC-6 `fallback-icon` is an Icon instance (`person`, Rounded), not detached and not mirrored; badge examples are Badge instances
- [ ] F-AC-7 AR variants per D7; component description filled
- [ ] F-AC-8 Values match B2–B3 one by one (redline every `Size` × `Shape`)
- [ ] F-AC-9 Documentation pages per D8 (or reported blocked by the Doc Kit); Components List card

- [ ] F-AC-L1 Lint (`figma-read-tokens.js`) = 0 violations before Phase 1, after Phase 1 and after Phase 2 (outputs attached in D11)
- [ ] F-AC-L2 Every variable, style and component used comes from §2–§6 by key — no new local variables except component tokens, no local styles

## 13. When you finish

1. Fill [D11 Execution log](avatar.md#d11-execution-log-filled-by-the-figma-agent) in `avatar.md` (stages, node IDs of the set, docs section and pages, lint outputs, deviations, questions).
2. Set **Figma build** to `Built` in the header of `avatar.md` and in `3-web-components/README.md`.
3. `npm run sync:done:web` — records this contract as built in the Web file.
4. Add one line to the root `CHANGELOG.md`.

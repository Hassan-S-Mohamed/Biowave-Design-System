<!-- GENERATED from icon.md @ 24895844655892ef — do not edit; change the source and run: npm run contract -- web icon -->
# Icon · أيقونة — Web — Figma contract

> **Everything the Figma Agent needs to build Icon in the Web Components file, with our variables and styles.** Read this file only. Generated from [`icon.md`](icon.md) (Parts A, B, D) and the Figma library index (`_sync/figma-library.json`, read 2026-10-24). Questions go to [D11 Execution log](icon.md#d11-execution-log-filled-by-the-figma-agent) — never invent.

**Two phases, one review:** Phase 1 — build the component set (§7–§8). Phase 2 — as soon as Phase 1 is finished, the 12 documentation pages and the Components List card (§9).

| | |
|---|---|
| Target file | **Biowave DS — Web Components** · key `7nDhsPNntzIWlrjmuSmZ9l` · https://www.figma.com/design/7nDhsPNntzIWlrjmuSmZ9l |
| Page | `↳ Icon` (one page per component) |
| Component | Icon · أيقونة |
| Platform | Web · React + MUI |
| Version | 1.1 · 2026-10-20 |
| Source | [`icon.md`](icon.md) @ `24895844655892ef` |

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

Already in this file, created by the sync tooling from [`icon.tokens.json`](icon.tokens.json). **Bind component layers to these variables** and pick the option with the collection's explicit variable mode. Each value aliases the Foundations variable shown (key in §3).

| Collection | Modes | Variable | Alias target per mode |
|---|---|---|---|
| Icon / Size | xs · sm · md · lg · xl · 2xl · 3xl | `size` | xs → 4. Size › `size/icon/xs`<br>sm → 4. Size › `size/icon/sm`<br>md → 4. Size › `size/icon/md`<br>lg → 4. Size › `size/icon/lg`<br>xl → 4. Size › `size/icon/xl`<br>2xl → 4. Size › `size/icon/2xl`<br>3xl → 4. Size › `size/icon/3xl` |
| Icon / Color | default · subtle · muted · inverse · brand · secondary · success · error · warning · info | `color` | default → 1. Themes › `color/icon/neutral/default`<br>subtle → 1. Themes › `color/icon/neutral/subtle`<br>muted → 1. Themes › `color/icon/neutral/muted`<br>inverse → 1. Themes › `color/icon/neutral/inverse`<br>brand → 1. Themes › `color/icon/role/brand`<br>secondary → 1. Themes › `color/icon/role/secondary`<br>success → 1. Themes › `color/icon/role/success`<br>error → 1. Themes › `color/icon/role/error`<br>warning → 1. Themes › `color/icon/role/warning`<br>info → 1. Themes › `color/icon/role/info` |

## 3. Foundations variables used (keys)

| Token | Figma variable | Key | Type | Scopes | Used by |
|---|---|---|---|---|---|
| `color-icon-neutral-default` | 1. Themes › `color/icon/neutral/default` | `b0844bd913aafe8789a44bc7b647058cdae299df` | COLOR | SHAPE_FILL, STROKE_COLOR | spec, component token |
| `color-icon-neutral-inverse` | 1. Themes › `color/icon/neutral/inverse` | `f1c29644d88c107b8e40c4ba2dd9e5c8d9667fde` | COLOR | SHAPE_FILL, STROKE_COLOR | spec, component token |
| `color-icon-neutral-muted` | 1. Themes › `color/icon/neutral/muted` | `22b53651f4efa195f0dfb625922d0279003534eb` | COLOR | SHAPE_FILL, STROKE_COLOR | spec, component token |
| `color-icon-neutral-subtle` | 1. Themes › `color/icon/neutral/subtle` | `fc66c13d6c036489bf774535cd8dbbf749795748` | COLOR | SHAPE_FILL, STROKE_COLOR | spec, component token |
| `color-icon-role-brand` | 1. Themes › `color/icon/role/brand` | `73d6989d2161d900c2070cd9b67f01653e54251d` | COLOR | SHAPE_FILL, STROKE_COLOR | spec, component token |
| `color-icon-role-error` | 1. Themes › `color/icon/role/error` | `e7e61106b7c9b1c60197d2c456ad055991cc545d` | COLOR | SHAPE_FILL, STROKE_COLOR | spec, component token |
| `color-icon-role-info` | 1. Themes › `color/icon/role/info` | `9bbd326956964ff857cb9e3a5f9e0f41883fe168` | COLOR | SHAPE_FILL, STROKE_COLOR | spec, component token |
| `color-icon-role-secondary` | 1. Themes › `color/icon/role/secondary` | `b3c3c18415370f381760224fd00a40f2816ffdb6` | COLOR | SHAPE_FILL, STROKE_COLOR | spec, component token |
| `color-icon-role-success` | 1. Themes › `color/icon/role/success` | `096b2f9e4c965c38f55d3dd051dbff93f36a33e5` | COLOR | SHAPE_FILL, STROKE_COLOR | spec, component token |
| `color-icon-role-warning` | 1. Themes › `color/icon/role/warning` | `3fa016bcd1409896b81681403e6a214dcc365fda` | COLOR | SHAPE_FILL, STROKE_COLOR | spec, component token |
| `size-icon-2xl` | 4. Size › `size/icon/2xl` | `5d82d1a47d232577418f3cff87dbefe1d0a02765` | FLOAT | WIDTH_HEIGHT | spec, component token |
| `size-icon-3xl` | 4. Size › `size/icon/3xl` | `160abf1bfcc5ce1bec8193ea16a9df21e4c6b387` | FLOAT | WIDTH_HEIGHT | spec, component token |
| `size-icon-lg` | 4. Size › `size/icon/lg` | `e79bd86fedcce89547674c84c9127d0149e60061` | FLOAT | WIDTH_HEIGHT | spec, component token |
| `size-icon-md` | 4. Size › `size/icon/md` | `eb459c673e6ca16e3c81b240f04b467717953a9a` | FLOAT | WIDTH_HEIGHT | spec, component token |
| `size-icon-sm` | 4. Size › `size/icon/sm` | `2aa4b1f12a5ed0745f9a8b3251dc1fd9f7dd3476` | FLOAT | WIDTH_HEIGHT | spec, component token |
| `size-icon-xl` | 4. Size › `size/icon/xl` | `06927be084b4fad4d4203a7fe7b6922e446d1c84` | FLOAT | WIDTH_HEIGHT | spec, component token |
| `size-icon-xs` | 4. Size › `size/icon/xs` | `1344261c9c0cbee99e5794700634f7cd31694f33` | FLOAT | WIDTH_HEIGHT | spec, component token |

## 4. Text styles used (keys)

None named in B/D.

## 5. Effect styles used (keys)

None named in B/D.

## 6. Components to instance (keys)

Nested Biowave components (e.g. Button inside Split button) are instances of the sets **in this file** — build them first; never detach.

### Icons (keys) — Google · Material Symbols library (D-18)

Library file **Google · Material Symbols** · key `RXlnhYgUKBBE6HveEr7e9C` — must be enabled in this file. Import the set, then use the **Style=Rounded** variant (`Fill=Filled` only for selected states). Colour the glyph by binding its vector fills to the icon colour token of the part.

| Icon | Set key | Rounded (unfilled) | Rounded (filled) |
|---|---|---|---|
| `add` | `7d426edec81a6ef6e44ffdcc37eab6863c7943a7` | `d20bdb7a3a61cd1a31b9e9dddf5c46330cc9bbff` | `cbadf0df7af23f20cf573e9b3856c059d146c57d` |
| `arrow_forward` | `90a6ad2ece86bb88d2f44286bd9efd3a60a5c815` | `48427bac81c0253cee4049d8ad243a4fb4da643d` | `1df1f77448d6e530948cc17302f5ae41c6fa453c` |

## 7. Phase 1 — values (from Part B)

### B1 API

### `Icon`

| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `name` | `IconName` | `MaterialSymbol` (type from `@material-symbols/font-400`, re-exported by `@biowave/foundations`) plus the two extra names below; `''` is typed only for the empty-name fallback | | ✓ | A4.1 — the glyph |
| `size` | enum | `xs` · `sm` · `md` · `lg` · `xl` · `2xl` · `3xl` | — (inherit) | | A4.2 — without `size` the icon follows the container's `font-size` (Biowave components set it) |
| `filled` | boolean | | `false` | | A4.3 — FILL 1 (class `bw-icon-fill`) |
| `color` | enum | `default` · `subtle` · `muted` · `inverse` · `brand` · `secondary` · `success` · `warning` · `error` · `info` | — (`currentColor`) | | A4.4 |
| `directional` | boolean | | `false` | | A4.5 — adds class `bw-icon-directional`; the icon mirrors in RTL (Button / Icon button take the class and mirror their wrapper once instead) |
| `label` | string | | — | | A4.6 — present: `role="img"` + `aria-label`; absent: `aria-hidden="true"` |
| `className` · `data-*` · `ref` | | | | | Forwarded to the root `span` |

Usage inside components: `<Button startIcon={<Icon name="add" />}>` — no `size`, the Button sizes it.

**`IconName`** = `MaterialSymbol | 'push_pin' | 'expand_more' | ''`, exported from `@biowave/web`. The two extra names are a closed list — any other name needs a new row here first.

| Extra name | Why it is kept | Checked |
|---|---|---|
| `push_pin` | The `@material-symbols/font-400` 0.48.0 typings list only the newer name `keep`. `push_pin` is the name in the Google · Material Symbols Figma library (`_sync/figma-icons.json`) and `icons.md`, which use one name across Figma, web and Flutter | The Rounded woff2 of 0.48.0 still has the `push_pin` ligature; it renders the same glyph as `keep`, pixel for pixel (headless Chrome, 2026-10-20) |
| `expand_more` | Missing from the 0.48.0 typings; it is the Split button menu chevron and is in the Figma library index under this name. The closest listed name, `keyboard_arrow_down`, is a different glyph | The Rounded woff2 of 0.48.0 has the `expand_more` ligature (renders one 1em glyph, not text); it differs from `keyboard_arrow_down` (headless Chrome, 2026-10-20) |

If a later font package drops either ligature, the Planner moves specs, `icons.md` and the Figma index to the listed name in one task.

**Invalid combinations** (`console.warn` once in development; fallback still renders):

| Combination | Fallback |
|---|---|
| `color` is a status (`success` · `warning` · `error` · `info`) without `label` and used standalone | Renders; warns “status icons need text or a label” (only when not inside a Biowave component slot — skip the check when `size` is unset) |
| `name` empty | Renders an empty box of the size; warns |

### B2 Dimensions

```
 ┬ ┌──────┐
 │ │  ◆   │  container: inline-size = block-size = font-size = size-icon-{size}
 ┴ └──────┘  glyph: line-height 1, centred, overflow hidden
```

| Size | Token | px |
|---|---|---|
| `xs` | `size-icon-xs` | 12 |
| `sm` | `size-icon-sm` | 16 |
| `md` | `size-icon-md` | 20 |
| `lg` | `size-icon-lg` | 24 |
| `xl` | `size-icon-xl` | 32 |
| `2xl` | `size-icon-2xl` | 40 |
| `3xl` | `size-icon-3xl` | 48 |

Layout rules: `display: inline-flex`, `flex: none`, `inline-size`/`block-size`/`font-size` from the size token (or `1em` + inherited `font-size` when `size` is unset); `overflow: hidden`; `user-select: none`; `vertical-align: middle`. The box is reserved before the font loads (`font-display: block` from the font package keeps text from flashing the ligature name).

### B3 Tokens by part and state

> Machine-readable source: [`icon.tokens.json`](icon.tokens.json) — Figma collections `Icon / Size` and `Icon / Color`.

| `color` | `glyph` colour |
|---|---|
| — | `currentColor` (inherits) |
| `default` | `color-icon-neutral-default` |
| `subtle` | `color-icon-neutral-subtle` |
| `muted` | `color-icon-neutral-muted` |
| `inverse` | `color-icon-neutral-inverse` |
| `brand` | `color-icon-role-brand` |
| `secondary` | `color-icon-role-secondary` |
| `success` | `color-icon-role-success` |
| `error` | `color-icon-role-error` |
| `warning` | `color-icon-role-warning` |
| `info` | `color-icon-role-info` |

Fill: `'FILL' 0` default, `'FILL' 1` with `filled` (`@biowave/foundations/icons.css`, class `bw-icon-fill`). Dark theme: same tokens.

### B4 States and transitions

None of its own. Colour changes come from the parent's transition (`color` inherits). `filled` toggles instantly (no animation of the FILL axis).

### B5 RTL

```
LTR  [→] Next          RTL  التالي [←]      ← directional: mirrored
LTR  [✓] Saved         RTL  تم الحفظ [✓]     ← not directional: never mirrored
```

| Case | In RTL |
|---|---|
| `directional` on | `[dir='rtl'] .bw-icon.bw-icon-directional { transform: scaleX(-1) }` |
| `directional` off | Not mirrored |
| Inside Button / Icon button | `prepareIcon` treats `directional` exactly like `mirrorInRtl`: when the icon has `directional` (the prop), `mirrorInRtl` or the class `bw-icon-directional` — alone or together — it removes them from the icon and marks its own wrapper with `bw-icon-directional` once. Exactly one element is flipped (no double flip, no flip by the icon) |

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Decorative (no `label`) | `aria-hidden="true"`, no role; the ligature text is never read |
| Meaningful (`label`) | `role="img"`, `aria-label={label}`; the ligature text is hidden from the name (`aria-label` wins) |
| Contrast | Meaningful icons ≥ 3:1 — the `color` tokens are checked by the build (`contrast-pairs.json`) |
| Focus | Never focusable |

## 8. Phase 1 — build the component set (from Part D)

| Field | Value |
|---|---|
| Figma file | **Biowave DS — Web Components** (`_sync/figma-files.json` › `web`) |
| Page / section | `↳ Icon` › sections `Icon` and `Icon — Documentation` |
| Mode | Create new |
| Plan version | 1 · 2026-10-18 |

### D1 Rules for this build

0. Component tokens only: `Icon / Size` and `Icon / Color` from [`icon.tokens.json`](icon.tokens.json), synced by the tooling. No local variables or styles of any other kind
1. The glyph is an instance of the **Google · Material Symbols** library set (Style=Rounded; keys in the contract), never detached, never redrawn
2. Size: bind the container width/height to `Icon / Size › size`; the glyph instance scales to fill (constraints Scale)
3. Colour: bind the glyph's vector fills to `Icon / Color › color`; the explicit `Icon / Color` mode picks the colour
4. Layer names = A2 part names

### D2 Component structure

```
❖ Icon                      ← component set (published)
  └─ variants by Size (XS … 3XL)
     └─ glyph               ◇ instance of Material Symbols/<name> (Style=Rounded)
```

### D3 Layer tree and auto layout

```
Icon            frame · fixed W/H = Icon / Size › size · clip content
└── glyph       ◇ Material Symbols set instance · constraints Scale · fills = Icon / Color › color
                  INSTANCE_SWAP `Glyph` · nested property `Fill` exposed (Unfilled · Filled) · `Style` locked to Rounded
```

### D4 Properties

| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `Size` | VARIANT | `XS` · `SM` · `MD` · `LG` · `XL` · `2XL` · `3XL` | `MD` | `size` | `'xs'` … `'3xl'` |
| `Glyph` | INSTANCE_SWAP | Google · Material Symbols sets | `add` | `name` | glyph name |
| `Fill` (nested, exposed) | VARIANT | `Unfilled` · `Filled` | `Unfilled` | `filled` | `false` · `true` |
| Colour | variable mode `Icon / Color` | `default` … `info` | `default` | `color` | same name |

**Icons used:** `add` · `arrow_forward` · `push_pin` — defaults and doc examples

### D5 Variants to generate

- Axis: `Size` = 7 variants. Colour and fill are not axes (mode and nested property)
- Grid: one row, `spacing/xl` gap

### D6 States, interactions and motion

None.

### D7 RTL

No `Language` variant (no text). Doc page 08 shows `arrow_forward` mirrored in an Arabic Button and `check` not mirrored.

## 9. Phase 2 — documentation pages and Components List card

### D8 Documentation pages

Standard 12 pages from the Doc Kit (Annotation library). Page notes: 03 Variations = size scale + colour roles + fill; 05 Usage = icon with text vs Icon button; 08 RTL = directional examples; 09 Accessibility = decorative vs labelled.

Component description: “Material Symbols Rounded glyph with Biowave sizes and colours. Spec: 3-web-components/components/icon/icon.md”.

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

`3-web-components/src/components/icon/Icon.figma.tsx` — `Size` → `size`, `Glyph` → `name`, `Fill` → `filled`, colour mode → `color`. Publish after code and Figma are both `Approved`.

## 11. Rules

All rules in **D1** (§8), plus:

**Component tokens only (strict, D-13).** This file may contain exactly one kind of local variable: the `<Component> / <Group>` collections in §2. Never create a local primitive or semantic variable or any other collection; never copy or detach a library variable; never create a local text, effect, colour or grid style; bind layers to the component token when one exists for the property. Run `_sync/figma-read-tokens.js` (lint) **before Phase 1 and after each phase** — it must report 0 violations.

## 12. Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Set and layers per D2–D3; glyph is a library instance (Rounded), not detached
- [ ] F-AC-2 Properties per D4; 7 variants
- [ ] F-AC-3 Size and colour bound to `Icon / Size` and `Icon / Color`; token lint 0
- [ ] F-AC-4 Light/Dark by mode only
- [ ] F-AC-5 Docs from the Doc Kit; Components List card; Code Connect after approval

- [ ] F-AC-L1 Lint (`figma-read-tokens.js`) = 0 violations before Phase 1, after Phase 1 and after Phase 2 (outputs attached in D11)
- [ ] F-AC-L2 Every variable, style and component used comes from §2–§6 by key — no new local variables except component tokens, no local styles

## 13. When you finish

1. Fill [D11 Execution log](icon.md#d11-execution-log-filled-by-the-figma-agent) in `icon.md` (stages, node IDs of the set, docs section and pages, lint outputs, deviations, questions).
2. Set **Figma build** to `Built` in the header of `icon.md` and in `3-web-components/README.md`.
3. `npm run sync:done:web` — records this contract as built in the Web file.
4. Add one line to the root `CHANGELOG.md`.

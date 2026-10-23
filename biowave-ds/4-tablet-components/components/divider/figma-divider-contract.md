<!-- GENERATED from divider.md @ 675572d95d1a29e0 — do not edit; change the source and run: npm run contract -- tablet divider -->
# Divider · فاصل — Tablet — Figma contract

> **Everything the Figma Agent needs to build Divider in the Tablet Components file, with our variables and styles.** Read this file only. Generated from [`divider.md`](divider.md) (Parts A, B, D) and the Figma library index (`_sync/figma-library.json`, read 2026-10-18). Questions go to [D11 Execution log](divider.md#d11-execution-log-filled-by-the-figma-agent) — never invent.

**Two phases, one review:** Phase 1 — build the component set (§7–§8). Phase 2 — as soon as Phase 1 is finished, the 12 documentation pages and the Components List card (§9).

| | |
|---|---|
| Target file | **Biowave DS — Tablet Components** · key `KTlAsEow60qCiYyU3J90kp` · https://www.figma.com/design/KTlAsEow60qCiYyU3J90kp |
| Page | `↳ Divider` (one page per component) |
| Component | Divider · فاصل |
| Platform | Tablet · Flutter + Material 3 |
| Version | 1.1 · 2026-10-23 |
| Source | [`divider.md`](divider.md) @ `675572d95d1a29e0` |

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
| `border-width-default` | 9. Border › `border/width/default` | `9b62f24ecdfc438789ce3fa296e725ac14b1e08f` | FLOAT | STROKE_FLOAT | spec |
| `color-border-default` | 1. Themes › `color/border/default` | `ad520e82898707a0d3112a12f6f9439566c6d6c4` | COLOR | STROKE_COLOR | spec |
| `color-border-strong` | 1. Themes › `color/border/strong` | `a12934eff6a447ebe30a4507b223c76e583e2701` | COLOR | STROKE_COLOR | spec |
| `color-border-subtle` | 1. Themes › `color/border/subtle` | `07f3e9a3d1ca641c7f05d37bf2e4383e4a8e6112` | COLOR | STROKE_COLOR | spec |
| `color-text-neutral-muted` | 1. Themes › `color/text/neutral/muted` | `8ff5fe7707ac2ac866b453191dea9cdd680d0c8d` | COLOR | TEXT_FILL | spec |
| `spacing-md` | 3. Spacing › `spacing/md` | `58c93e3cec1b6ba603371a027483e101adcef4f0` | FLOAT | WIDTH_HEIGHT, GAP | spec |
| `spacing-none` | 3. Spacing › `spacing/none` | `4879183c164f25d975ac0a8664388a77a2073b80` | FLOAT | WIDTH_HEIGHT, GAP | spec |
| `spacing-xl` | 3. Spacing › `spacing/xl` | `5fa0c2ce8ae034e9696038d2704e520fd8383e55` | FLOAT | WIDTH_HEIGHT, GAP | spec |

## 4. Text styles used (keys)

| Style | Key |
|---|---|
| `Tablet/en/caption/md` | `12d92cf1a17ffa0c123412727a72c7583210e187` |
| `Tablet/ar/caption/md` | `53ee8baee8420ac7ff96a70ff14d621a95e23c97` |
| `Web/en/caption/md` | `3db0d9d2c62c77ac003b6444643b9828150787ba` |
| `Web/ar/caption/md` | `5f111a909c2383565c3ba96d1cf622ef5da90f23` |

## 5. Effect styles used (keys)

None named in B/D.

## 6. Components to instance (keys)

Nested Biowave components (e.g. Button inside Split button) are instances of the sets **in this file** — build them first; never detach.

### Icons (keys) — Google · Material Symbols library (D-18)

No icon named in this spec. Icons come only from the Google · Material Symbols library (Style=Rounded).

## 7. Phase 1 — values (from Part B)

### B1 API

### `BwDivider`

| Param | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `orientation` | `BwDividerOrientation` | `horizontal` · `vertical` | `horizontal` | | A4.1 |
| `emphasis` | `BwDividerEmphasis` | `subtle` · `defaultEmphasis` · `strong` | `defaultEmphasis` | | A4.2 — line colour (B3) |
| `inset` | `BwDividerInset` | `none` · `start` · `both` | `none` | | A4.3 — inset space `spacing-xl` (B2) |
| `showLabel` | `bool` | | `false` | | A4.5 — `true`: shows `label` in the middle of a horizontal divider |
| `label` | `String?` | | `null` | | A4.5 — the label text (“or” / “أو”, from the app's localizations); used only when `showLabel` is `true` |
| `key` | `Key?` | | | | |

Platform naming: web `emphasis="default"` = `BwDividerEmphasis.defaultEmphasis` (`default` is reserved in Dart, as Icon's `defaultColor`). Web `decorative` has no Flutter param: M3 `Divider` / `VerticalDivider` add no semantics node, so the line of `BwDivider` is never announced (A8, B6); a shown label is a normal `Text` and is read. Web `component` has no Flutter param (Flutter lists need no list element).

**Invalid combinations** (`assert` in debug; release renders the fallback):

| Combination | Fallback |
|---|---|
| `orientation: vertical` with `inset: start` | Renders `inset: none`; assert message “inset start is for horizontal dividers only” |
| `orientation: vertical` with `showLabel: true` | Renders the plain vertical line, no label; assert message “label is for horizontal dividers only” |
| `showLabel: true` with a `null` or empty `label` | Renders the plain line, no label; assert message “showLabel needs a label” |

### B2 Dimensions

Same as [Web B2](../../../3-web-components/components/divider/divider.md#b2-dimensions). Flutter mapping:

| Part | Property | `horizontal` → `Divider` | `vertical` → `VerticalDivider` |
|---|---|---|---|
| `line` | thickness | `border-width-default` → `thickness: BwBorder.widthDefault` | same |
| `container` | cross size (no extra space around the line) | `height: BwBorder.widthDefault` | `width: BwBorder.widthDefault` |
| `container` | inset `start` | `spacing-xl` → `indent: BwSpacing.xl` (leading edge, directional) | — (invalid, B1) |
| `container` | inset `both` | `indent` and `endIndent: BwSpacing.xl` | `indent` (top) and `endIndent` (bottom): `BwSpacing.xl` |
| `container` | inset `none` | `spacing-none` → `indent` / `endIndent: BwSpacing.none` | same |
| `container` | length | width of the parent | height from the parent's constraints (in a `Row`, the parent bounds the height, e.g. `IntrinsicHeight` or a fixed-height bar) |
| `container` (with label) | layout | `Row(crossAxisAlignment: center)` inside `Padding(EdgeInsetsDirectional.only(start:, end:))` = the inset above (`BwSpacing.xl` / `BwSpacing.none`); height = the label's line height (`caption-md`, per language) | — (no label, B1) |
| `line` (with label) | segments | two `Expanded` segments, each a `Divider(height: BwBorder.widthDefault, thickness: BwBorder.widthDefault, indent: BwSpacing.none, endIndent: BwSpacing.none)`; never shorter than `spacing-xl` → `BwSpacing.xl` | — |
| `label` (with label) | gap | `spacing-md` → `Padding(EdgeInsetsDirectional.symmetric(horizontal: BwSpacing.md))` | — |
| `label` (with label) | size | natural width, at most the row width − 2 × `BwSpacing.xl` (the minimum segments); wraps (`softWrap: true`), `TextAlign.center`; never `overflow: ellipsis` | — |

Layout rules: the divider adds no space around itself — the parent's gap (`spacing:` / `SizedBox` with `BwSpacing.*`) does. Inset `start` stays one fixed `spacing-xl`; the List plan (Day 8) adds its own text-aligned inset — nothing is added to `BwDivider` now.

### B3 Tokens by part and state

Identical to [Web B3](../../../3-web-components/components/divider/divider.md#b3-tokens-by-part-and-state) (no component tokens). Flutter mapping:

| `emphasis` | `line` colour → Flutter |
|---|---|
| `subtle` | `color-border-subtle` → `context.bw.colors.borderSubtle` |
| `defaultEmphasis` | `color-border-default` → `context.bw.colors.borderDefault` |
| `strong` | `color-border-strong` → `context.bw.colors.borderStrong` |

Width `border-width-default` → `BwBorder.widthDefault`; inset `spacing-xl` → `BwSpacing.xl`, `spacing-none` → `BwSpacing.none`. Colours are passed explicitly — never read from `DividerTheme` or `ThemeData.dividerColor`. Dark theme: same tokens.

| Part | Property | Token → Flutter |
|---|---|---|
| `label` | text style | `caption-md` → `context.bw.text.captionMd` (family and line height follow the locale) |
| `label` | colour | `color-text-neutral-muted` → `context.bw.colors.textNeutralMuted` (4.5:1 on every surface, pairs already in `contrast-pairs.json`) |
| `label` | gap to each segment | `spacing-md` → `BwSpacing.md` |
| `line` (with label) | minimum segment length | `spacing-xl` → `BwSpacing.xl` |

The label does not change with `emphasis`; the segments use the `emphasis` colour above.

### B4 States and transitions

As [Web B4](../../../3-web-components/components/divider/divider.md#b4-states-and-transitions) — none.

### B5 RTL

As [Web B5](../../../3-web-components/components/divider/divider.md#b5-rtl). Flutter: `Divider.indent` is the leading edge and follows `Directionality`, so `inset: start` leaves its space on the right in Arabic with no extra code. Never wrap the line in a physical `EdgeInsets.only(left/right)`. With a label, the row, its inset `Padding` and the label gap use `EdgeInsetsDirectional`; the label stays centred, so the layout looks the same in both directions.

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role / semantics | None — `Divider` / `VerticalDivider` add no semantics node; the line is never announced |
| Label | A plain `Text`: one semantics node whose label is the `label` text, read in reading order; no extra `Semantics` wrapper, no header or button role |
| Focus | Never focusable |
| Contrast | Line decorative — exempt (A9). Label text 4.5:1 (B3) |
| Target size | Not interactive |

## 8. Phase 1 — build the component set (from Part D)

> **One file per platform (D-12).** Structure, layers and properties are the same as [Web D2–D7](../../../3-web-components/components/divider/divider.md#d--figma-build); this file lists only what differs.

| Field | Value |
|---|---|
| Figma file | **Biowave DS — Tablet Components** (`_sync/figma-files.json` › `tablet`) — never the Foundations file |
| Page / section | `↳ Divider` › sections `Divider` and `Divider — Documentation` |
| Mode | Create new |
| Plan version | 1.1 · 2026-10-23 |

### D1 Rules for this build

Same as [Web D1](../../../3-web-components/components/divider/divider.md#d1-rules-for-this-build) (no component tokens; bind to Foundations variables), except the label text style: `Tablet/{en|ar}/caption/md` instead of the Web styles. The page sets the Typography variable mode to `Tablet`.

### D2 Component structure

As Web D2.

### D3 Layer tree and auto layout

As Web D3, including the `label` layer and the second `line` bound to `Show label`; the `label` text style is `Tablet/{en|ar}/caption/md` (default `Tablet/en/caption/md`).

### D4 Properties

As Web D4 (including `Show label` → `showLabel` and `Label` → `label`); code mapping uses the Flutter names in B1 (`Emphasis=Default` → `BwDividerEmphasis.defaultEmphasis`).

### D5 Variants to generate

As Web D5 — **18** variants (the label is a property, not a variant).

### D6 States, interactions and motion

None.

### D7 RTL

As Web D7.

### Inherited from Web (D1, D2, D3, D4, D5, D6, D7, D8)

The Tablet Part D refers to these Web sections; they are copied here so you read one file. Apply the Tablet differences above on top.

#### D1 Rules for this build

0. **No component tokens** — this component has no `Divider / *` collection. Bind directly to the Foundations library variables (keys in the contract). Never create local variables or styles; `figma-read-tokens.js` lint must report 0 before Phase 1 and after each phase.
1. Every value is bound: line stroke colour → `color/border/{subtle|default|strong}`; stroke weight → `border/width/default`; inset padding → `spacing/xl` (or `spacing/none`); label gap → `spacing/md`; label fill → `color/text/neutral/muted`; label text style → `Web/{en|ar}/caption/md` (published Foundations text styles). No raw numbers.
2. Never bind `_Primitive/*` or `_deprecated/*`.
3. Layer names = A2 part names (`container`, `line`, `label`). With a label the line is two layers, both named `line`.
4. Auto layout on every frame; no absolute positioning.
5. No icons. The only text layer is `label`, in Horizontal variants only.

#### D2 Component structure

```
❖ Divider                 ← component set (published)
  └─ variants Orientation × Emphasis × Inset (+ Direction=RTL for Horizontal · Start)
     properties Show label (BOOLEAN) · Label (TEXT) — Horizontal variants only
```

#### D3 Layer tree and auto layout

```
Horizontal
container        ↔ horizontal · width FILL when placed · height HUG
│                  padding-left / padding-right = {B2 inset} (Start: left only in LTR, right only in RTL)
│                  counter-axis align = center · gap = {B3 label gap: spacing/md}
├── line         frame · width FILL (min width {spacing/xl}) · height HUG (no children)
│                  bottom stroke only: weight {B3 border-width-default}, colour {B3 per Emphasis}
│                  strokes included in layout = on (the frame is exactly one stroke thick)
├── label        T `Web/{en|ar}/caption/md` · fill {color/text/neutral/muted} · width HUG · align center
│                  BOOLEAN `Show label` (visibility) · TEXT `Label` (characters) · default “or”
└── line         second segment, same as the first · visibility bound to `Show label`

Vertical
container        ↕ vertical · height FILL when placed · width HUG
│                  padding-top / padding-bottom = {B2 inset} (Both only)
└── line         frame · height FILL · width HUG (no children)
                   right stroke only: weight {B3}, colour {B3}; strokes included in layout = on
```

With `Show label` off, `label` and the second `line` are hidden, so the first `line` fills the container alone (hidden layers take no gap). Vertical variants have no `label` layer: `Show label` and `Label` do nothing there (B1 — no label on vertical dividers). The default text style is `Web/en/caption/md`; Arabic samples on doc pages use `Web/ar/caption/md` and the Arabic text “أو”.

If a hug frame with no children cannot keep the stroke-only size, stop and report in D11 (do not switch to a fill rectangle with a raw height).

```
LTR, Inset=Start              │      ──────────────────────│
RTL, Inset=Start              │──────────────────────      │
Show label on (LTR and RTL)   │─────────── or ───────────│
```

#### D4 Properties

| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `Orientation` | VARIANT | `Horizontal` · `Vertical` | `Horizontal` | `orientation` | `'horizontal'` · `'vertical'` |
| `Emphasis` | VARIANT | `Subtle` · `Default` · `Strong` | `Default` | `emphasis` | `'subtle'` · `'default'` · `'strong'` |
| `Inset` | VARIANT | `None` · `Start` · `Both` | `None` | `inset` | `'none'` · `'start'` · `'both'` |
| `Direction` | VARIANT | `LTR` · `RTL` | `LTR` | — | Figma only; code mirrors automatically |
| `Show label` | BOOLEAN | | `false` | `showLabel` | `true` · `false` |
| `Label` | TEXT | | `or` | `label` | the text |

`decorative` and `component` are code-only (no Figma property).

#### D5 Variants to generate

- Horizontal: 3 Emphasis × 3 Inset × LTR = 9, plus Inset=Start × RTL × 3 Emphasis = 3
- Vertical: 3 Emphasis × (None · Both) × LTR = 6 (Start is invalid, B1)
- Total **18** — the label is a BOOLEAN + TEXT property, not a variant. Grid: rows = Orientation × Inset × Direction, columns = Emphasis; gap `spacing/xl`

#### D6 States, interactions and motion

None.

#### D7 RTL

Method: `Direction=RTL` variants only where the result differs (Horizontal · Inset=Start): padding on the right instead of the left. All other variants look the same in both directions, including a shown label (centred). Doc page 08 shows an inset divider in an Arabic list (sample copy from A6: الإشعارات) and a labelled divider with “أو” in `Web/ar/caption/md`.

#### D8 Documentation pages

Standard 12 pages from the Doc Kit (Annotation library), section `Divider — Documentation`. Page notes: 01 Introduction = a card with sections separated by a default divider, Light + Dark; 03 Variations = orientation, emphasis, inset, show label; 05 Usage = spacing first vs divider, toolbar with vertical dividers, “or” between two sign-in buttons; 06 Content = label copy from A6 (EN / AR); 07 Platform = `Doc/Device frame` Desktop + Web narrow with a list and a toolbar; 08 RTL = Inset=Start and a labelled divider in LTR and RTL; 09 Accessibility = separator vs decorative, label as the separator's name; 10 Changes from previous version = F0.

Component description: “Thin line that separates groups of content, with an optional centred label. Spec: 3-web-components/components/divider/divider.md”.

## 9. Phase 2 — documentation pages and Components List card

### D8 Documentation pages

As Web D8; 07 Platform uses `Doc/Device frame` Tablet landscape + Tablet portrait with a settings list and a toolbar. Labelled samples use `Tablet/en/caption/md` (“or”) and `Tablet/ar/caption/md` (“أو”).

Component description: “Thin line that separates groups of content, with an optional centred label. Spec: 4-tablet-components/components/divider/divider.md”.

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

`4-tablet-components/lib/src/components/divider/bw_divider.figma.dart` — `Orientation` → `orientation: BwDividerOrientation.*`, `Emphasis` → `emphasis: BwDividerEmphasis.*`, `Inset` → `inset: BwDividerInset.*`, `Show label` → `showLabel`, `Label` → `label`; `Direction` not mapped. Publish after code and Figma are both `Approved`.

## 11. Rules

All rules in **D1** (§8 and the inherited Web D1), plus:

**Component tokens only (strict, D-13).** This file may contain exactly one kind of local variable: the `<Component> / <Group>` collections in §2. Never create a local primitive or semantic variable or any other collection; never copy or detach a library variable; never create a local text, effect, colour or grid style; bind layers to the component token when one exists for the property. Run `_sync/figma-read-tokens.js` (lint) **before Phase 1 and after each phase** — it must report 0 violations.

## 12. Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Set on `↳ Divider` in the Tablet file as Web D2–D3
- [ ] F-AC-2 Properties as Web D4 (with `Show label` and `Label`); 18 variants, no Vertical · Start
- [ ] F-AC-3 Zero raw values; bound to Foundations variables; label uses `Tablet/{en|ar}/caption/md`; token lint 0
- [ ] F-AC-4 Light / Dark by variable mode only; RTL per Web D7
- [ ] F-AC-5 Docs from the Doc Kit (or reported blocked); Components List card; Code Connect after approval

- [ ] F-AC-L1 Lint (`figma-read-tokens.js`) = 0 violations before Phase 1, after Phase 1 and after Phase 2 (outputs attached in D11)
- [ ] F-AC-L2 Every variable, style and component used comes from §2–§6 by key — no new local variables except component tokens, no local styles

## 13. When you finish

1. Fill [D11 Execution log](divider.md#d11-execution-log-filled-by-the-figma-agent) in `divider.md` (stages, node IDs of the set, docs section and pages, lint outputs, deviations, questions).
2. Set **Figma build** to `Built` in the header of `divider.md` and in `4-tablet-components/README.md`.
3. `npm run sync:done:tablet` — records this contract as built in the Tablet file.
4. Add one line to the root `CHANGELOG.md`.

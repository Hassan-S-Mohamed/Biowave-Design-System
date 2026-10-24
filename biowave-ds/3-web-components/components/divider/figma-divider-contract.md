<!-- GENERATED from divider.md @ 96284f8886c6a3b9 — do not edit; change the source and run: npm run contract -- web divider -->
# Divider · فاصل — Web — Figma contract

> **Everything the Figma Agent needs to build Divider in the Web Components file, with our variables and styles.** Read this file only. Generated from [`divider.md`](divider.md) (Parts A, B, D) and the Figma library index (`_sync/figma-library.json`, read 2026-10-24). Questions go to [D11 Execution log](divider.md#d11-execution-log-filled-by-the-figma-agent) — never invent.

**Two phases, one review:** Phase 1 — build the component set (§7–§8). Phase 2 — as soon as Phase 1 is finished, the 12 documentation pages and the Components List card (§9).

| | |
|---|---|
| Target file | **Biowave DS — Web Components** · key `7nDhsPNntzIWlrjmuSmZ9l` · https://www.figma.com/design/7nDhsPNntzIWlrjmuSmZ9l |
| Page | `↳ Divider` (one page per component) |
| Component | Divider · فاصل |
| Platform | Web · React + MUI |
| Version | 1.1 · 2026-10-23 |
| Source | [`divider.md`](divider.md) @ `96284f8886c6a3b9` |

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
| `color-surface-default` | 1. Themes › `color/surface/default` | `2013a1c60d84d2bac2524fd0c32229e20cc341a1` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-text-neutral-muted` | 1. Themes › `color/text/neutral/muted` | `8ff5fe7707ac2ac866b453191dea9cdd680d0c8d` | COLOR | TEXT_FILL | spec |
| `spacing-md` | 3. Spacing › `spacing/md` | `58c93e3cec1b6ba603371a027483e101adcef4f0` | FLOAT | WIDTH_HEIGHT, GAP | spec |
| `spacing-none` | 3. Spacing › `spacing/none` | `4879183c164f25d975ac0a8664388a77a2073b80` | FLOAT | WIDTH_HEIGHT, GAP | spec |
| `spacing-xl` | 3. Spacing › `spacing/xl` | `5fa0c2ce8ae034e9696038d2704e520fd8383e55` | FLOAT | WIDTH_HEIGHT, GAP | spec |

## 4. Text styles used (keys)

| Style | Key |
|---|---|
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

### `Divider`

| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `orientation` | enum | `horizontal` · `vertical` | `horizontal` | | A4.1 |
| `emphasis` | enum | `subtle` · `default` · `strong` | `default` | | A4.2 — line colour (B3) |
| `inset` | enum | `none` · `start` · `both` | `none` | | A4.3 — inset space `spacing-xl` (B2) |
| `decorative` | boolean | | `false` | | A4.4 — `true`: hidden from assistive technology (B6). Has no effect with `component="li"` (always hidden, B6) |
| `showLabel` | boolean | | `false` | | A4.5 — `true`: shows `label` in the middle of a horizontal divider |
| `label` | string | | — | | A4.5 — the label text (“or” / “أو”); used only when `showLabel` is `true` |
| `component` | enum | `hr` · `li` | `hr` | | A4.6 — `li` for a divider that sits directly inside a `<ul>` / `<ol>` (B6) |
| `className` · `data-*` · `ref` | | | | | Forwarded to the root element |

No `children` (the label comes only from `label`), no MUI `variant` / `textAlign` / `flexItem` / `light` / `absolute` props on the public API; `component` accepts only `hr` and `li` (C3 maps the Biowave props to MUI).

**Root element**

| `component` | Without label | With label (`showLabel` and a non-empty `label`, horizontal) |
|---|---|---|
| `hr` (default) | `<hr>` | `<div role="separator">` — an `<hr>` cannot hold text |
| `li` | `<li role="separator">` | `<li role="separator">` |

**Invalid combinations** (`console.warn` once in development; the fallback renders):

| Combination | Fallback |
|---|---|
| `orientation="vertical"` with `inset="start"` | Renders `inset="none"`; warns “inset start is for horizontal dividers only” |
| `orientation="vertical"` with `showLabel` | Renders the plain vertical line, no label; warns “label is for horizontal dividers only” |
| `showLabel` with an empty or missing `label` | Renders the plain line, no label; warns “showLabel needs a label” |

### B2 Dimensions

```
Horizontal, inset both
 spacing-xl                                   spacing-xl
├──────────┤                                 ├──────────┤
┌───────────────────────────────────────────────────────┐ ┬
│          ─────────────────────────────────            │ ┴ border-width-default
└───────────────────────────────────────────────────────┘
 ① container (fills inline size)   ② line

Vertical, inset both
 ┬ spacing-xl
 ┴
 │  ② line — border-width-default wide, fills the row's block size
 ┬ spacing-xl
 ┴

Horizontal with label, inset none
┌───────────────────────────────────────────────────────┐ ┬
│②─────────────────────── ③ or ────────────────────────②│ │ caption-md line height
└───────────────────────────────────────────────────────┘ ┴
                        ├─┤    ├─┤ spacing-md each side
 ② two equal segments (each ≥ spacing-xl), centred on the label's block axis
```

| Part | Property | `horizontal` | `vertical` |
|---|---|---|---|
| `line` | thickness | `border-width-default` (block-end border) | `border-width-default` (inline-end border) |
| `container` | length | inline size of the parent (`inline-size: auto`, block element) | block size of the row (`align-self: stretch`, `block-size: auto`) |
| `container` | inset `start` | `margin-inline-start: spacing-xl` | — (invalid, B1) |
| `container` | inset `both` | `margin-inline: spacing-xl` | `margin-block: spacing-xl` |
| `container` | inset `none` | margin `spacing-none` | margin `spacing-none` |
| `container` | outer margin | `spacing-none` — the parent's gap or padding sets the space around it | same |
| `container` (with label) | layout | `display: flex`, `align-items: center`; block size = the label's line height (`caption-md`, per language); the inset margins above still apply to the outer ends | — (no label, B1) |
| `line` (with label) | segments | two segments, one before and one after the label: `flex: 1 0 spacing-xl` (equal share of the free length, never shorter than `spacing-xl`), block-end border `border-width-default` | — |
| `label` (with label) | gap | `padding-inline: spacing-md` (the gap to each segment) | — |
| `label` (with label) | size | `flex: 0 1 auto` — natural width; wraps when longer than the free length, `text-align: center`; never truncated | — |

Layout rules: `flex-shrink: 0`; never adds its own spacing above / below (horizontal) or beside (vertical) — the parent's `gap` does. A vertical divider is meant for flex rows (toolbars, action bars); outside a flex row its height is the row's height only if the parent gives one.

Inset `start` stays one fixed `spacing-xl` (A4.3). Known follow-up: the List plan (Day 8) adds its own text-aligned inset for list rows; nothing is added to Divider now.

### B3 Tokens by part and state

> No component tokens (P-04): every value below is a semantic token, used directly. `{name}.tokens.json` is not needed.

| Part | Property | `emphasis="subtle"` | `emphasis="default"` | `emphasis="strong"` |
|---|---|---|---|---|
| `line` | colour | `color-border-subtle` | `color-border-default` | `color-border-strong` |
| `line` | width | `border-width-default` | `border-width-default` | `border-width-default` |
| `line` (with label) | minimum segment length | `spacing-xl` | same | same |
| `container` | inset | `spacing-xl` · `spacing-none` | same | same |
| `label` | text style | `caption-md` (`biowaveVariants.captionMd`; the family and line height follow the language) | same | same |
| `label` | colour | `color-text-neutral-muted` | same | same |
| `label` | gap to each segment | `spacing-md` | same | same |

The label does not change with `emphasis`. No interactive states. Dark theme: same tokens (values switch automatically). The line is decorative (`2-foundations/guidelines/border.md`) — no contrast requirement. The label is text: `color-text-neutral-muted` already meets 4.5:1 on `color-surface-default`, `-page`, `-subtle` and `-raised` in both themes (pairs exist in `contrast-pairs.json`; none to add).

### B4 States and transitions

None. The divider has one state and never animates; colour follows the theme instantly. Showing or hiding the label is instant. Reduced motion: nothing to remove.

### B5 RTL

```
LTR  │        ──────────────────────│   inset start: space at the inline start (left)
RTL  │──────────────────────        │   inset start: space at the inline start (right)

LTR  │─────────────── or ───────────────│   label centred
RTL  │─────────────── أو ───────────────│   label centred — same layout
```

| Part | In RTL |
|---|---|
| `container` inset | Logical margins (`margin-inline-start`, `margin-inline`) — mirrors automatically |
| `line` (vertical) | `border-inline-end` — the side flips with the direction; a single line looks the same either way |
| `label` | Centred; its gap is `padding-inline` (logical), so it is the same in both directions; the text follows the document direction and language (`:lang(ar)` font) |
| Icons | None |

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role / semantics | Horizontal: `<hr>` (implicit `separator`). Vertical: `<hr aria-orientation="vertical">` (set explicitly if MUI does not). With a label: `<div role="separator">` (horizontal, no `aria-orientation` needed) |
| Accessible name | Without a label: none (a separator needs no name). With a label: `aria-label` = the `label` text, because a separator's children are presentational; the visible label text is inside the separator |
| Decorative | `decorative` → `aria-hidden="true"` on the root; no `aria-orientation`, no `aria-label` |
| Inside a list (`component="li"`) | `<li role="separator" aria-hidden="true">` — always hidden, whatever `decorative` says: the list items already show the grouping, and axe's `list` rule rejects a visible `role="separator"` child of `<ul>` / `<ol>` (checked with axe-core 4.14: passes only when hidden). Never nests an `<hr>` inside the `<li>` |
| Focus | Never focusable; no `tabindex` |
| Contrast | Line decorative — exempt (A9). Label text 4.5:1 (B3) |
| Target size | Not interactive |

| Key | Action |
|---|---|
| — | No keyboard interaction; Tab skips the divider |

## 8. Phase 1 — build the component set (from Part D)

> Executed by the **Figma Agent**. Values from the spec [Part B](#b--spec). **One file per platform (D-12)**: builds the Web set in **Biowave DS — Web Components**.

| Field | Value |
|---|---|
| Figma file | **Biowave DS — Web Components** (`_sync/figma-files.json` › `web`) — never the Foundations file |
| Page / section | `↳ Divider` › sections `Divider` and `Divider — Documentation` |
| Mode | Create new (no legacy Divider set in the Figma files) |
| Plan version | 1.1 · 2026-10-23 |

### D1 Rules for this build

0. **No component tokens** — this component has no `Divider / *` collection. Bind directly to the Foundations library variables (keys in the contract). Never create local variables or styles; `figma-read-tokens.js` lint must report 0 before Phase 1 and after each phase.
1. Every value is bound: line stroke colour → `color/border/{subtle|default|strong}`; stroke weight → `border/width/default`; inset padding → `spacing/xl` (or `spacing/none`); label gap → `spacing/md`; label fill → `color/text/neutral/muted`; label text style → `Web/{en|ar}/caption/md` (published Foundations text styles). No raw numbers.
2. Never bind `_Primitive/*` or `_deprecated/*`.
3. Layer names = A2 part names (`container`, `line`, `label`). With a label the line is two layers, both named `line`.
4. Auto layout on every frame; no absolute positioning.
5. No icons. The only text layer is `label`, in Horizontal variants only.

### D2 Component structure

```
❖ Divider                 ← component set (published)
  └─ variants Orientation × Emphasis × Inset (+ Direction=RTL for Horizontal · Start)
     properties Show label (BOOLEAN) · Label (TEXT) — Horizontal variants only
```

### D3 Layer tree and auto layout

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

### D4 Properties

| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `Orientation` | VARIANT | `Horizontal` · `Vertical` | `Horizontal` | `orientation` | `'horizontal'` · `'vertical'` |
| `Emphasis` | VARIANT | `Subtle` · `Default` · `Strong` | `Default` | `emphasis` | `'subtle'` · `'default'` · `'strong'` |
| `Inset` | VARIANT | `None` · `Start` · `Both` | `None` | `inset` | `'none'` · `'start'` · `'both'` |
| `Direction` | VARIANT | `LTR` · `RTL` | `LTR` | — | Figma only; code mirrors automatically |
| `Show label` | BOOLEAN | | `false` | `showLabel` | `true` · `false` |
| `Label` | TEXT | | `or` | `label` | the text |

`decorative` and `component` are code-only (no Figma property).

### D5 Variants to generate

- Horizontal: 3 Emphasis × 3 Inset × LTR = 9, plus Inset=Start × RTL × 3 Emphasis = 3
- Vertical: 3 Emphasis × (None · Both) × LTR = 6 (Start is invalid, B1)
- Total **18** — the label is a BOOLEAN + TEXT property, not a variant. Grid: rows = Orientation × Inset × Direction, columns = Emphasis; gap `spacing/xl`

### D6 States, interactions and motion

None.

### D7 RTL

Method: `Direction=RTL` variants only where the result differs (Horizontal · Inset=Start): padding on the right instead of the left. All other variants look the same in both directions, including a shown label (centred). Doc page 08 shows an inset divider in an Arabic list (sample copy from A6: الإشعارات) and a labelled divider with “أو” in `Web/ar/caption/md`.

## 9. Phase 2 — documentation pages and Components List card

### D8 Documentation pages

Standard 12 pages from the Doc Kit (Annotation library), section `Divider — Documentation`. Page notes: 01 Introduction = a card with sections separated by a default divider, Light + Dark; 03 Variations = orientation, emphasis, inset, show label; 05 Usage = spacing first vs divider, toolbar with vertical dividers, “or” between two sign-in buttons; 06 Content = label copy from A6 (EN / AR); 07 Platform = `Doc/Device frame` Desktop + Web narrow with a list and a toolbar; 08 RTL = Inset=Start and a labelled divider in LTR and RTL; 09 Accessibility = separator vs decorative, label as the separator's name; 10 Changes from previous version = F0.

Component description: “Thin line that separates groups of content, with an optional centred label. Spec: 3-web-components/components/divider/divider.md”.

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

`3-web-components/src/components/divider/Divider.figma.tsx` — `Orientation` → `orientation`, `Emphasis` → `emphasis`, `Inset` → `inset`, `Show label` → `showLabel`, `Label` → `label`; `Direction` not mapped. Publish after code and Figma are both `Approved`.

## 11. Rules

All rules in **D1** (§8), plus:

**Component tokens only (strict, D-13).** This file may contain exactly one kind of local variable: the `<Component> / <Group>` collections in §2. Never create a local primitive or semantic variable or any other collection; never copy or detach a library variable; never create a local text, effect, colour or grid style; bind layers to the component token when one exists for the property. Run `_sync/figma-read-tokens.js` (lint) **before Phase 1 and after each phase** — it must report 0 violations.

## 12. Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Set, layers and names per D2–D3 and A2
- [ ] F-AC-2 Properties per D4 exactly; 18 variants, no Vertical · Start; `Show label` and `Label` bound to the Horizontal `label` layer (and the second `line`)
- [ ] F-AC-3 Zero raw values: stroke colour, stroke weight, padding, gap, label fill and text style bound to Foundations variables / styles; token lint 0
- [ ] F-AC-4 Light / Dark by variable mode only
- [ ] F-AC-5 RTL variants per D7
- [ ] F-AC-6 Docs pages per D8 from the Doc Kit with live instances (or reported blocked); Components List card
- [ ] F-AC-7 Values match B2–B3 one by one

- [ ] F-AC-L1 Lint (`figma-read-tokens.js`) = 0 violations before Phase 1, after Phase 1 and after Phase 2 (outputs attached in D11)
- [ ] F-AC-L2 Every variable, style and component used comes from §2–§6 by key — no new local variables except component tokens, no local styles

## 13. When you finish

1. Fill [D11 Execution log](divider.md#d11-execution-log-filled-by-the-figma-agent) in `divider.md` (stages, node IDs of the set, docs section and pages, lint outputs, deviations, questions).
2. Set **Figma build** to `Built` in the header of `divider.md` and in `3-web-components/README.md`.
3. `npm run sync:done:web` — records this contract as built in the Web file.
4. Add one line to the root `CHANGELOG.md`.

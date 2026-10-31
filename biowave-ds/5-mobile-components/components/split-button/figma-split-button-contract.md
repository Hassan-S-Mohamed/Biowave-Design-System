<!-- GENERATED from split-button.md @ 2fb61f0632ad9a81 — do not edit; change the source and run: npm run contract -- mobile split-button -->
# Split button · زر مقسّم — Mobile — Figma contract

> **Everything the Figma Agent needs to build Split button in the Mobile Components file, with our variables and styles.** Read this file only. Generated from [`split-button.md`](split-button.md) (Parts A, B, D) and the Figma library index (`_sync/figma-library.json`, read 2026-10-31). Questions go to [D11 Execution log](split-button.md#d11-execution-log-filled-by-the-figma-agent) — never invent.

**Two phases, one review:** Phase 1 — build the component set (§7–§8). Phase 2 — as soon as Phase 1 is finished, the 12 documentation pages and the Components List card (§9).

| | |
|---|---|
| Target file | **Biowave DS — Mobile Components** · key `249tIAxlZogRvgBBXjcIZ5` · https://www.figma.com/design/249tIAxlZogRvgBBXjcIZ5 |
| Page | `↳ Split button` (one page per component) |
| Component | Split button · زر مقسّم |
| Platform | Mobile · Flutter + Material 3 |
| Version | 1.1 · 2026-10-31 |
| Source | [`split-button.md`](split-button.md) @ `2fb61f0632ad9a81` |

## 1. Library connections in this file

| | |
|---|---|
| Library | **Biowave DS — Foundations** · library key `lk-e00b31b21f924b36eeea820da99c4b306c460986c83e894f415a1c194ba5a2e670f3142c2fccca81280a80bcaee6a87bc47c9a9505d186d7b693aa9805ad7031` |
| Library file | Foundations · key `AyFaSmfDUlTax3GpKhRdHI` |
| Doc Kit library (Phase 2) | **Annotation (Biowave Doc Kit)** · file key `cBPWg6YZNqK8UIzgMQIpXl` — must be enabled in this file (Assets → Libraries) |
| Enabled here | ✓ verified from a component file: 7 collections, 281 variables reachable |

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
| `border-width-focus` | 7. Border › `border/width/focus` | `d660bcb01777958134799fe11a99a63aaf1fbfca` | FLOAT | STROKE_FLOAT | spec |
| `color-background-transparent-default` | 1. Themes › `color/background/transparent/default` | `7ded3d8bfead13a83fc2297ef9dc75a16f73857b` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-background-transparent-hovered` | 1. Themes › `color/background/transparent/hovered` | `51354205cb02a343717bc6e5ca84b0e151af3de8` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-background-transparent-pressed` | 1. Themes › `color/background/transparent/pressed` | `830ae424ad770312d061208a89f7452569d643d8` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-border-focus` | 1. Themes › `color/border/focus` | `ef666d3badd2b63f18cb168d9987ead7fbc21480` | COLOR | STROKE_COLOR | spec |
| `color-icon-disabled` | 1. Themes › `color/icon/disabled` | `708926473ca446a26d4a0891351f04692171f74f` | COLOR | SHAPE_FILL, STROKE_COLOR | spec |
| `color-icon-subtle` | 1. Themes › `color/icon/subtle` | `fc66c13d6c036489bf774535cd8dbbf749795748` | COLOR | SHAPE_FILL, STROKE_COLOR | spec |
| `color-surface-raised` | 1. Themes › `color/surface/raised` | `92b71ada5e0cffef4eec84e17092c1f3d81da69f` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-text-default` | 1. Themes › `color/text/default` | `4ea63d9ab5254c4df4eba4d26f771377a07929c4` | COLOR | TEXT_FILL | spec |
| `color-text-disabled` | 1. Themes › `color/text/disabled` | `f88c10f90f454d356c14cc3240da0f04eafbbedd` | COLOR | TEXT_FILL | spec |
| `radius-lg` | 2. Radius › `radius/lg` | `bb2122acd11d99ba9396f13390d02b70941a6cfa` | FLOAT | CORNER_RADIUS | spec |
| `radius-md` | 2. Radius › `radius/md` | `0758e506cdfd4d7a4eef6369a4851133d7eab5a4` | FLOAT | CORNER_RADIUS | spec |
| `radius-none` | 2. Radius › `radius/none` | `e8421984adf95aa6c48895673eac13c0a62604e1` | FLOAT | CORNER_RADIUS | spec |
| `radius-xl` | 2. Radius › `radius/xl` | `a5042304656c42bab9b62a4f4ab9c6b1831b487c` | FLOAT | CORNER_RADIUS | spec |
| `size-control-height-lg` | 4. Size › `size/control/height/lg` | `14c0f56d2add6f7149374e67cf4d3a2656aeb5dc` | FLOAT | WIDTH_HEIGHT | spec |
| `size-icon-lg` | 4. Size › `size/icon/lg` | `e79bd86fedcce89547674c84c9127d0149e60061` | FLOAT | WIDTH_HEIGHT | spec |
| `spacing-md` | 3. Spacing › `spacing/md` | `58c93e3cec1b6ba603371a027483e101adcef4f0` | FLOAT | GAP | spec |
| `spacing-none` | 3. Spacing › `spacing/none` | `4879183c164f25d975ac0a8664388a77a2073b80` | FLOAT | GAP | spec |
| `spacing-xl` | 3. Spacing › `spacing/xl` | `5fa0c2ce8ae034e9696038d2704e520fd8383e55` | FLOAT | GAP | spec |
| `spacing-xs` | 3. Spacing › `spacing/xs` | `9ea993d003d5368c5100b038d51c7c8f3e95c115` | FLOAT | GAP | spec |
| `target-min` | 6. Grid & Layout › `target/min` | `db23ec2826d3bfa3e600e5a82801e0c7d37ba298` | FLOAT | WIDTH_HEIGHT | spec |

Code-only tokens (no Figma variable by design — motion, layers): `elevation-3` · `motion-duration-md` · `motion-duration-sm` · `motion-easing-standard-accelerate` · `motion-easing-standard-decelerate`. Use them only as written values in prototype settings and docs.

## 4. Text styles used (keys)

None named in B/D.

## 5. Effect styles used (keys)

None named in B/D.

## 6. Components to instance (keys)

Nested Biowave components (e.g. Button inside Split button) are instances of the sets **in this file** — build them first; never detach.

### Icons (keys) — Google · Material Symbols library (D-18)

No icon named in this spec. Icons come only from the Google · Material Symbols library (Style=Rounded).

## 7. Phase 1 — values (from Part B)

### B1 API

### BwSplitButton
| Param | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `label` | `String` | | — | ✓ | `primary-action` label |
| `onPressed` | `VoidCallback?` | | — | ✓ | Primary action; `null` disables both parts |
| `options` | `List<BwSplitButtonOption>` | 2–5 | — | ✓ | `BwSplitButtonOption(label:, onSelected:, icon:, enabled:)` |
| `variant` | `BwButtonVariant` | `filled` · `tonal` · `outlined` | `filled` | | |
| `color` | `BwButtonColor` | `brand` · `secondary` · `neutral` | `brand` | | |
| `size` | `BwControlSize` | `sm` · `md` · `lg` · `xl` | `lg` | | |
| `leadingIcon` | `IconData?` | | `null` | | On the primary action |
| `loading` · `loadingLabel` | | | | | Primary action; trigger disabled while loading |
| `menuLabel` | `String?` | | localized "More options for {label}" | | Trigger semantics label |

**Invalid combinations** (`assert` in debug, fallback in release): `tonal` with `neutral` → `outlined` · fewer than 2 / more than 5 options → assert · option label equal to `label` → assert.

### B2 Dimensions

The two parts touch (`spacing-none`) with a vertical `divider` between them: `VerticalDivider(width: BwBorder.widthDefault, thickness: BwBorder.widthDefault, indent/endIndent: BwSpacing.none, color: color-border-default)` in a `SizedBox` of the control height — the Divider spec values, same on every variant and color (swap for `BwDivider` vertical once Divider is built on Mobile). Outer corners `radius-md` (`xl`: `radius-xl`), inner corners `radius-none` via `BorderRadiusDirectional`; each part's shape is `BwSegmentBorder` (internal), which leaves the inner edge unstroked so an outlined control shows one line there. Parts follow BwButton / BwIconButton B2. Menu: the [Web B2](../../../3-web-components/components/split-button/split-button.md#b2-dimensions) tokens, mapped on Mobile as below (touch-sized rows).

| Part | Property | Token | Mobile mapping |
|---|---|---|---|
| `menu` | offset from `container` | `spacing-xs` | `MenuAnchor.alignmentOffset` (vertical) |
| `menu` | min-width | width of `container` | `MenuStyle.minimumSize` and item `minimumSize` |
| `menu` | padding | `spacing-none` | `MenuStyle.padding` |
| `menu` | background | `color-surface-raised` | the decorated surface (below) |
| `menu` | radius | `radius-lg` | the decorated surface; `MenuStyle.shape` uses the same radius |
| `menu` | elevation | `elevation-3` | the decorated surface: `boxShadow: context.bw.elevation.elevation3` |
| `menu` | M3 surface (unused) | `color-background-transparent-default` | `MenuStyle.backgroundColor`, `shadowColor` and `surfaceTintColor` |
| `menu` item | height | `size-control-height-lg` (touch row = `target-min`) | item `minimumSize` |
| `menu` item | padding-inline | `spacing-xl` (menu-row padding on touch, component scale) | `EdgeInsetsDirectional` |
| `menu` item | icon · icon–label gap | `size-icon-lg` · `spacing-md` | `BwIcon(size: BwIconSize.lg)` · `SizedBox` |
| `menu` item | text style | `body-md` | `context.bw.text.bodyMd` |
| `menu` item | focus ring width | `border-width-focus` | inner ring (B3); item corners square, clipped by the surface |

**How `elevation-3` maps on Mobile.** `elevation-3` is a `List<BoxShadow>` (`context.bw.elevation.elevation3`, light and dark), and `MenuStyle` takes only a number (`elevation`) and a `shadowColor`, so the M3 surface is not used for the look: `MenuStyle.backgroundColor`, `shadowColor` and `surfaceTintColor` are `color-background-transparent-default`, and `MenuAnchor(clipBehavior: Clip.none)` so the shadow is not cut off. All `menuChildren` sit in one decorated surface — `DecoratedBox(BoxDecoration(color: color-surface-raised, borderRadius: radius-lg, boxShadow: elevation-3))` with a `ClipRRect` of `radius-lg` inside it, so item overlays follow the corners. No numeric M3 elevation is set (never derived from a shadow offset).

### B3 Tokens by part and state

[Web B3](../../../3-web-components/components/split-button/split-button.md#b3-tokens-by-part-and-state). Expanded trigger = Pressed tokens (`WidgetState.pressed` forced while the menu is open).

Menu item tokens on Mobile (`MenuItemButton` style):

| State | Text | Icon | Overlay | Ring |
|---|---|---|---|---|
| Rest | `color-text-default` | `color-icon-subtle` | `color-background-transparent-default` | — |
| Hover (pointer) | `color-text-default` | `color-icon-subtle` | `color-background-transparent-hovered` | — |
| Pressed | `color-text-default` | `color-icon-subtle` | `color-background-transparent-pressed` | — |
| Focus (keyboard) | `color-text-default` | `color-icon-subtle` | `color-background-transparent-hovered` | `color-border-focus`, `border-width-focus`, inside the item edge |
| Disabled | `color-text-disabled` | `color-icon-disabled` | `color-background-transparent-default` | — |

Dark theme: same tokens. No exceptions.

### B4 States and transitions

Same as the [Web B4](../../../3-web-components/components/split-button/split-button.md#b4-states-and-transitions) with Flutter durations (`BwDuration.*`) and easings (`BwEasing.*`). No hover in Mobile examples; hover code paths stay for pointer devices. Reduced motion: `context.bw.reduceMotion` → `BwDuration.instant`.

Chevron: `motion-duration-md` + `motion-easing-standard-decelerate` on open, `motion-duration-sm` + `motion-easing-standard-accelerate` on close; a half turn when expanded, no turn when collapsed. Menu fade / scale: `MenuAnchor` has no duration or curve parameters, so it uses Flutter's built-in timing; `MenuAnchor(animated: !context.bw.reduceMotion)` turns it off under reduced motion. This is the temporary menu; BwMenu (Day 10) replaces it with token timings.

### B5 RTL

Same as the [Web B5](../../../3-web-components/components/split-button/split-button.md#b5-rtl). Flutter: `Directionality` mirrors layout; `EdgeInsetsDirectional`/`BorderRadiusDirectional` only; directional icons mirror through `IconData.matchTextDirection`.

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Structure | `Semantics(container: true, label: label)` around two buttons; two focus stops |
| Trigger | `Semantics(button: true, label: menuLabel, expanded: isOpen)` |
| Menu | `MenuAnchor` keyboard (arrows, Home / End, Esc) and focus return to the trigger; ArrowDown / ArrowUp move over enabled items and **wrap** (last → first, first → last), as Web B6 and the Tablet build |
| Loading | As BwButton B6; trigger `onPressed: null` while loading |
| Target size | ≥ `BwLayout.mobile.minTarget` |

| Key (hardware keyboard) | Action |
|---|---|
| Tab / Shift+Tab | Moves focus; from an open menu, closes it and moves focus on (B4) |
| Enter / Space | Activates; on the trigger opens the menu and focuses the first enabled item |
| ArrowDown / ArrowUp (menu) | Next / previous enabled item, wrapping at the ends |
| Home / End (menu) | First / last enabled item |
| Esc (menu) | Closes the menu; focus returns to the trigger |

## 8. Phase 1 — build the component set (from Part D)

> Written by the Planner (Claude). Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> **One file per platform (D-12).** This file builds the Mobile set in **Biowave DS — Mobile Components**. Structure, layer tree and properties are the same as the [Web Part D](../../../3-web-components/components/split-button/split-button.md#d--figma-build) D2–D4 (one fact, one home); this file lists only what differs. Values come from the Mobile spec [Part B](#b--spec).

| Field | Value |
|---|---|
| Component | Split button |
| Platform | Mobile |
| Figma file | **Biowave DS — Mobile Components** (`_sync/figma-files.json` › `mobile`) |
| Page / section | `↳ Split Button` › section `Split Button` |
| Mode | **Create new.** Legacy reference (read only): none on the mobile pages; legacy reference is the Foundations file › `↳ Split Button` (`4298:3591` / `4298:3881`) |
| Plan version | 2 · 2026-10-16 (D-12: own file) |

### D1 Rules for this build

Same as [Web D1](../../../3-web-components/components/button/button.md#d1-rules-for-this-build) (library first, everything bound, no local variables or styles), plus:
- **Typography mode:** on page `↳ Split Button` set the explicit variable mode **`Mobile · EN`** of `5. Typography` (Arabic frames and examples: **`Mobile · AR`**) (`page.setExplicitVariableModeForCollection`). Text styles stay the same `{role}/{size}` names; the mode gives the Mobile scale and the language font.

### D2 Component structure

As [Web D2–D4](../../../3-web-components/components/split-button/split-button.md#d2-component-structure), with these Mobile differences:
- `Size` adds `XL`
- No hover states
- Parts are instances of this file's `Button` and `Icon Button`

### D3 Layer tree and auto layout

As [Web D3](../../../3-web-components/components/split-button/split-button.md#d3-layer-tree-and-auto-layout), with the Mobile differences listed in D2.

**Icons used:** `expand_more` — menu trigger chevron, Google · Material Symbols Rounded (D-18)

### D4 Properties

As [Web D4](../../../3-web-components/components/split-button/split-button.md#d4-properties), with the Mobile differences listed in D2.

### D5 Variants to generate

8 allowed `Variant × Color` × 4 sizes × 7 states (no `Primary hovered` / `Trigger hovered`) × 2 languages = **448**.

### After this build is `Approved`
Report instances of the legacy reference above; move legacy sets to `_Deprecation Ground` in the Foundations file once product files use the Mobile library.

### D6 States, interactions and motion

As Web D6 without hover interactions. Press: smart animate per B4.

### D7 RTL

As Web D7 (`Language=AR` variants where the component has text).

### Inherited from Web (D1, D2, D3, D4, D6, D7)

The Mobile Part D refers to these Web sections; they are copied here so you read one file. Apply the Mobile differences above on top.

#### D1 Rules for this build

Same as [Button D1](../button/button.md#d1-rules-for-this-build). The two parts **must be instances** of `Button` and `Icon Button` (rule 6), with only their inner corner radii (bound to `radius/none`) and inner-side stroke weight (bound to `border/width/none`) overridden; a `Divider` instance (Vertical · Default) sits between them. Build Divider before this set.

#### D2 Component structure

```
❖ Split Button         ← published set
   contains instances of ❖ Button and ❖ Icon Button — no own drawing
```

#### D3 Layer tree and auto layout

```
Split Button            ↔ horizontal · gap spacing/none · hug · counter-axis stretch
├── primary-action      ◇ Button instance · Variant/Color/Size/Language follow the set · inner corners radius/none · inline-end stroke weight border/width/none · exposed: Label, Leading icon, Leading icon glyph
├── divider             ◇ Divider instance · Orientation=Vertical · Emphasis=Default · Inset=None · height fill (decorative)
└── menu-trigger        ◇ Icon Button instance · same Variant/Color/Size · inner corners radius/none · inline-start stroke weight border/width/none · Icon = expand_more · Tooltip label = "More options"
```

**Icons used:** `expand_more` — menu trigger chevron, Google · Material Symbols Rounded (D-18)

#### D4 Properties

| Figma property | Type | Values | Default | Code prop (web) |
|---|---|---|---|---|
| `Variant` | VARIANT | `Filled` · `Tonal` · `Outlined` | `Filled` | `variant` |
| `Color` | VARIANT | `Brand` · `Secondary` · `Neutral` | `Brand` | `color` |
| `Size` | VARIANT | `SM` · `MD` · `LG` | `MD` | `size` |
| `State` | VARIANT | `Default` · `Primary hovered` · `Primary pressed` · `Trigger hovered` · `Expanded` · `Focused primary` · `Focused trigger` · `Disabled` · `Loading` | `Default` | `disabled` / `loading`; others interaction only |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — |
| `Label` | TEXT (nested, exposed) | | `Export report` | `children` |
| `Leading icon` · `Leading icon glyph` | BOOLEAN · INSTANCE_SWAP (nested, exposed) | | `false` | `startIcon` |

#### D6 States, interactions and motion

Primary part hover/press, trigger hover/press as their own components. On click trigger → `Expanded` (smart animate `motion-duration-md`, chevron rotation). A docs-only prototype frame shows the open menu using a placeholder list until Menu exists.

#### D7 RTL

`Language=AR`: reverse order (trigger first in the auto layout), inner/outer radii swap sides, Arabic label. Chevron not mirrored.

## 9. Phase 2 — documentation pages and Components List card

### D8 Documentation pages

All 12 standard pages (`_templates/component.md` D8 + `2-foundations/figma-doc-kit.md` › Page layouts) in section `Split Button — Documentation` on `↳ Split Button` in this file, built only from the Doc Kit (Foundations library). Blocked until the Doc Kit exists. 07 Platform: `Doc/Device frame` = Phone (SafeArea). 09 Accessibility: target-size overlay (`target-min` = 48) on `SM`/`MD`.

Component description: one line from A1 + "Spec: 5-mobile-components/components/split-button/split-button.md".

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

`5-mobile-components/lib/src/components/split_button/bw_split_button.figma.dart` — `Label` → `label`, `Variant`/`Color`/`Size` → enums, `State=Disabled` → `onPressed: null`, `State=Loading` → `loading: true`; `options` as an example list. Publish after code and Figma reviews are both `Approved`.

## 11. Rules

All rules in **D1** (§8 and the inherited Web D1), plus:

**Component tokens only (strict, D-13).** This file may contain exactly one kind of local variable: the `<Component> / <Group>` collections in §2. Never create a local primitive or semantic variable or any other collection; never copy or detach a library variable; never create a local text, effect, colour or grid style; bind layers to the component token when one exists for the property. Run `_sync/figma-read-tokens.js` (lint) **before Phase 1 and after each phase** — it must report 0 violations.

## 12. Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Set on `↳ Split Button` in the Mobile file; structure and layer names as Web D2–D3 + differences above
- [ ] F-AC-2 Properties as Web D4 + differences; variant count per D5
- [ ] F-AC-3 Zero raw values; zero local variables/styles (all from the Foundations library)
- [ ] F-AC-4 Page Typography mode = `Mobile`; Light/Dark by mode only; Arabic fits without truncation
- [ ] F-AC-5 Values match the Mobile B2–B3 (redline, incl. `XL`)
- [ ] F-AC-6 Docs built (or reported blocked by the Doc Kit); Code Connect per D9 after approval

- [ ] F-AC-L1 Lint (`figma-read-tokens.js`) = 0 violations before Phase 1, after Phase 1 and after Phase 2 (outputs attached in D11)
- [ ] F-AC-L2 Every variable, style and component used comes from §2–§6 by key — no new local variables except component tokens, no local styles

## 13. When you finish

1. Fill [D11 Execution log](split-button.md#d11-execution-log-filled-by-the-figma-agent) in `split-button.md` (stages, node IDs of the set, docs section and pages, lint outputs, deviations, questions).
2. Set **Figma build** to `Built` in the header of `split-button.md` and in `5-mobile-components/README.md`.
3. `npm run sync:done:mobile` — records this contract as built in the Mobile file.
4. Add one line to the root `CHANGELOG.md`.

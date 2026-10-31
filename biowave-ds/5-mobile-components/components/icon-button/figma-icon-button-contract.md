<!-- GENERATED from icon-button.md @ cd1b4ef59acb4c0f — do not edit; change the source and run: npm run contract -- mobile icon-button -->
# Icon button · زر أيقونة — Mobile — Figma contract

> **Everything the Figma Agent needs to build Icon button in the Mobile Components file, with our variables and styles.** Read this file only. Generated from [`icon-button.md`](icon-button.md) (Parts A, B, D) and the Figma library index (`_sync/figma-library.json`, read 2026-10-31). Questions go to [D11 Execution log](icon-button.md#d11-execution-log-filled-by-the-figma-agent) — never invent.

**Two phases, one review:** Phase 1 — build the component set (§7–§8). Phase 2 — as soon as Phase 1 is finished, the 12 documentation pages and the Components List card (§9).

| | |
|---|---|
| Target file | **Biowave DS — Mobile Components** · key `249tIAxlZogRvgBBXjcIZ5` · https://www.figma.com/design/249tIAxlZogRvgBBXjcIZ5 |
| Page | `↳ Icon button` (one page per component) |
| Component | Icon button · زر أيقونة |
| Platform | Mobile · Flutter + Material 3 |
| Version | 1.0 · 2026-10-16 |
| Source | [`icon-button.md`](icon-button.md) @ `cd1b4ef59acb4c0f` |

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
| `radius-md` | 2. Radius › `radius/md` | `0758e506cdfd4d7a4eef6369a4851133d7eab5a4` | FLOAT | CORNER_RADIUS | spec |
| `radius-xl` | 2. Radius › `radius/xl` | `a5042304656c42bab9b62a4f4ab9c6b1831b487c` | FLOAT | CORNER_RADIUS | spec |
| `target-min` | 6. Grid & Layout › `target/min` | `db23ec2826d3bfa3e600e5a82801e0c7d37ba298` | FLOAT | WIDTH_HEIGHT | spec |

Code-only tokens (no Figma variable by design — motion, layers): `motion-duration-sm`. Use them only as written values in prototype settings and docs.

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
| `edit` | `47f86c39f6fbbb469725e7588206eb14a23c69f6` | `93286c7f439c043811484dccef5cad3ac0d2bee0` | `d4b89f22fb040445e4d2bfca5ebfc1e4bde47025` |

## 7. Phase 1 — values (from Part B)

### B1 API

### BwIconButton
| Param | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `icon` | `IconData` | `Symbols.*_rounded` (D-18; re-exported by `biowave_foundations`) | — | ✓ | `icon` |
| `label` | `String` | | — | ✓ | Semantics label and tooltip |
| `onPressed` | `VoidCallback?` | | — | ✓ | `null` = disabled |
| `variant` | `BwButtonVariant` | `filled` · `tonal` · `outlined` · `text` | `text` | | A4.1 |
| `color` | `BwButtonColor` | `brand` · `secondary` · `neutral` · `error` · `inverse` | `neutral` | | A4.2 |
| `size` | `BwControlSize` | `sm` · `md` · `lg` · `xl` | `lg` | | A4.3 |
| `toggle` · `selected` | `bool` · `bool` | | `false` · `false` | | A4.4 |
| `selectedIcon` | `IconData?` | filled glyph | `null` | with `toggle` | |
| `tooltip` | `bool` | | `true` | | Long-press tooltip |
| `loading` · `loadingLabel` | | | | | As BwButton |

**Invalid combinations** (`assert` in debug, fallback in release): `tonal` with `neutral`/`inverse` → `outlined` · `toggle` with `filled`/`tonal` → toggle ignored · `toggle` without `selectedIcon` → assert · empty `label` → assert.

### B2 Dimensions

Width = height = `size-control-height-{sm|md|lg|xl}`; icon `size-icon-sm|md|lg|lg`; radius `radius-md` (`xl`: `radius-xl`); hit area ≥ `target-min` (`MaterialTapTargetSize.padded`). Everything else: [Web B2](../../../3-web-components/components/icon-button/icon-button.md#b2-dimensions).

### B3 Tokens by part and state

[Web B3](../../../3-web-components/components/icon-button/icon-button.md#b3-tokens-by-part-and-state) (unselected = Button tokens, selected = B3.2, tooltip = B3.4 with M3 `TooltipThemeData` built from the same tokens). `ButtonStyle` mapping as [BwButton B3](../button/button.md#b3-tokens-by-part-and-state).

Dark theme: same tokens. No exceptions.

### B4 States and transitions

Same as the [Web B4](../../../3-web-components/components/icon-button/icon-button.md#b4-states-and-transitions) with Flutter durations (`BwDuration.*`) and easings (`BwEasing.*`). No hover in Mobile examples; hover code paths stay for pointer devices. Reduced motion: `context.bw.reduceMotion` → `BwDuration.instant`.

### B5 RTL

Same as the [Web B5](../../../3-web-components/components/icon-button/icon-button.md#b5-rtl). Flutter: `Directionality` mirrors layout; `EdgeInsetsDirectional`/`BorderRadiusDirectional` only; directional icons mirror through `IconData.matchTextDirection`.

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Semantics | `Semantics(button: true, label: label, toggled: toggle ? selected : null)`; icon `excludeFromSemantics` |
| Tooltip | M3 `Tooltip(message: label, excludeFromSemantics: true)` so the name is not read twice |
| Loading · disabled · focus · target | As BwButton B6 |
| Target size | ≥ `BwLayout.mobile.minTarget` |

| Key (hardware keyboard) | Action |
|---|---|
| Tab / Shift+Tab | Moves focus |
| Enter / Space | Activates |

## 8. Phase 1 — build the component set (from Part D)

> Written by the Planner (Claude). Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> **One file per platform (D-12).** This file builds the Mobile set in **Biowave DS — Mobile Components**. Structure, layer tree and properties are the same as the [Web Part D](../../../3-web-components/components/icon-button/icon-button.md#d--figma-build) D2–D4 (one fact, one home); this file lists only what differs. Values come from the Mobile spec [Part B](#b--spec).

| Field | Value |
|---|---|
| Component | Icon button |
| Platform | Mobile |
| Figma file | **Biowave DS — Mobile Components** (`_sync/figma-files.json` › `mobile`) |
| Page / section | `↳ Icon Button` › section `Icon Button` |
| Mode | **Create new.** Legacy reference (read only): Foundations file › LEGACY Mobile › `↳ Buttons` › icon `Buttons` `4131:2710` (deprecated after `Approved`) |
| Plan version | 2 · 2026-10-16 (D-12: own file) |

### D1 Rules for this build

Same as [Web D1](../../../3-web-components/components/button/button.md#d1-rules-for-this-build) (library first, everything bound, no local variables or styles), plus:
- **Typography mode:** on page `↳ Icon Button` set the explicit variable mode **`Mobile · EN`** of `5. Typography` (Arabic frames and examples: **`Mobile · AR`**) (`page.setExplicitVariableModeForCollection`). Text styles stay the same `{role}/{size}` names; the mode gives the Mobile scale and the language font.

### D2 Component structure

As [Web D2–D4](../../../3-web-components/components/icon-button/icon-button.md#d2-component-structure), with these Mobile differences:
- `Size` adds `XL`
- No `Hovered` state
- Default instance: `Variant=Text`, `Color=Neutral`, `Size=LG`
- Docs page 09 shows the 48 hit area around `SM`/`MD`

### D3 Layer tree and auto layout

As [Web D3](../../../3-web-components/components/icon-button/icon-button.md#d3-layer-tree-and-auto-layout), with the Mobile differences listed in D2.

### D4 Properties

As [Web D4](../../../3-web-components/components/icon-button/icon-button.md#d4-properties), with the Mobile differences listed in D2.

### D5 Variants to generate

`.Icon Button/Appearance`: 18 × 5 states (no `Hovered`) = 90 + selected (`Text`/`Outlined` × 5 colors × 5 states) = 50 → **140**; `Icon Button`: 4 sizes × 3 = **12**.

### After this build is `Approved`
Report instances of the legacy reference above; move legacy sets to `_Deprecation Ground` in the Foundations file once product files use the Mobile library.

### D6 States, interactions and motion

As Web D6 without hover interactions. Press: smart animate per B4.

### D7 RTL

As Web D7 (`Language=AR` variants where the component has text).

### Inherited from Web (D1, D2, D3, D4, D6, D7)

The Mobile Part D refers to these Web sections; they are copied here so you read one file. Apply the Mobile differences above on top.

#### D1 Rules for this build

Same as [Button D1](../button/button.md#d1-rules-for-this-build).

#### D2 Component structure

```
❖ Icon Button                    ← published set (size, toggle, selected)
  ├─ ❖ .Icon Button/Appearance   ← private set (variant × color × state × selected)
  └─ ❖ .Icon Button/Glyph        ← private set (size × selected: outlined / filled glyph swap)
```

#### D3 Layer tree and auto layout

```
Icon Button              ↔ centered · width = height {B2} · padding 0
└── .Icon Button/Appearance  ◇ fill both axes · radius {B2} · fill/stroke {B3} · `Focus ring` layer visible when State=Focused (border.md › Figma focus ring)
    ├── state-layer      ▭ absolute, fill {background-transparent-hovered|pressed} in Hover/Pressed of tonal/outlined/text
    ├── icon             ◇ .Icon Button/Glyph · size {B2 icon} · fill {B3}
    └── spinner          ◇ .Button/Spinner · visible only State=Loading (icon opacity 0)
```

#### D4 Properties

| Figma property | Type | Values | Default | Code prop (web) | Code value |
|---|---|---|---|---|---|
| `Variant` (on Appearance, exposed) | VARIANT | `Filled` · `Tonal` · `Outlined` · `Text` | `Text` | `variant` | |
| `Color` (exposed) | VARIANT | `Brand` · `Secondary` · `Neutral` · `Error` · `Inverse` | `Neutral` | `color` | |
| `State` (exposed) | VARIANT | `Default` · `Hovered` · `Focused` · `Pressed` · `Disabled` · `Loading` | `Default` | `disabled` / `loading` | |
| `Size` | VARIANT | `SM` · `MD` · `LG` | `MD` | `size` | |
| `Toggle` | VARIANT | `Off` · `On` | `Off` | `toggle` | |
| `Selected` | VARIANT | `False` · `True` | `False` | `selected` | only with `Toggle=On` |
| `Icon` | INSTANCE_SWAP | Google · Material Symbols (Rounded) | `edit` | `icon` | `<Icon name="{glyph}" />` |
| `Selected icon` | INSTANCE_SWAP | Google · Material Symbols (Rounded, Fill=Filled) | `edit` | `selectedIcon` | `<Icon name="{glyph}" filled />` |
| `Tooltip label` | TEXT | | `Edit device` | `label` | |

**Icons used:** `edit` (default `Icon` / `Selected icon`) · `push_pin` (toggle example, B7)

#### D6 States, interactions and motion

While hovering → Hovered; while pressing → Pressed (B4). On click for `Toggle=On`: Selected False ↔ True, smart animate `motion-duration-sm`.

#### D7 RTL

No RTL variants. Docs page 08 shows `arrow_back`/`arrow_forward` mirrored and `close`/`edit` not mirrored.

## 9. Phase 2 — documentation pages and Components List card

### D8 Documentation pages

All 12 standard pages (`_templates/component.md` D8 + `2-foundations/figma-doc-kit.md` › Page layouts) in section `Icon Button — Documentation` on `↳ Icon Button` in this file, built only from the Doc Kit (Foundations library). Blocked until the Doc Kit exists. 07 Platform: `Doc/Device frame` = Phone (SafeArea). 09 Accessibility: target-size overlay (`target-min` = 48) on `SM`/`MD`.

Component description: one line from A1 + "Spec: 5-mobile-components/components/icon-button/icon-button.md".

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

`5-mobile-components/lib/src/components/icon_button/bw_icon_button.figma.dart` — `Icon` → `icon: Icons.*_rounded`, `Selected icon` → `selectedIcon`, `Toggle`/`Selected` → `toggle`/`selected`, `Tooltip label` → `label`, `Variant`/`Color`/`Size` → enums. Publish after code and Figma reviews are both `Approved`.

## 11. Rules

All rules in **D1** (§8 and the inherited Web D1), plus:

**Component tokens only (strict, D-13).** This file may contain exactly one kind of local variable: the `<Component> / <Group>` collections in §2. Never create a local primitive or semantic variable or any other collection; never copy or detach a library variable; never create a local text, effect, colour or grid style; bind layers to the component token when one exists for the property. Run `_sync/figma-read-tokens.js` (lint) **before Phase 1 and after each phase** — it must report 0 violations.

## 12. Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Set on `↳ Icon Button` in the Mobile file; structure and layer names as Web D2–D3 + differences above
- [ ] F-AC-2 Properties as Web D4 + differences; variant count per D5
- [ ] F-AC-3 Zero raw values; zero local variables/styles (all from the Foundations library)
- [ ] F-AC-4 Page Typography mode = `Mobile`; Light/Dark by mode only; Arabic fits without truncation
- [ ] F-AC-5 Values match the Mobile B2–B3 (redline, incl. `XL`)
- [ ] F-AC-6 Docs built (or reported blocked by the Doc Kit); Code Connect per D9 after approval

- [ ] F-AC-L1 Lint (`figma-read-tokens.js`) = 0 violations before Phase 1, after Phase 1 and after Phase 2 (outputs attached in D11)
- [ ] F-AC-L2 Every variable, style and component used comes from §2–§6 by key — no new local variables except component tokens, no local styles

## 13. When you finish

1. Fill [D11 Execution log](icon-button.md#d11-execution-log-filled-by-the-figma-agent) in `icon-button.md` (stages, node IDs of the set, docs section and pages, lint outputs, deviations, questions).
2. Set **Figma build** to `Built` in the header of `icon-button.md` and in `5-mobile-components/README.md`.
3. `npm run sync:done:mobile` — records this contract as built in the Mobile file.
4. Add one line to the root `CHANGELOG.md`.

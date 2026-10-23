<!-- GENERATED from chip.md @ f6ed99099ea9bad4 — do not edit; change the source and run: npm run contract -- mobile chip -->
# Chip · شريحة — Mobile — Figma contract

> **Everything the Figma Agent needs to build Chip in the Mobile Components file, with our variables and styles.** Read this file only. Generated from [`chip.md`](chip.md) (Parts A, B, D) and the Figma library index (`_sync/figma-library.json`, read 2026-10-18). Questions go to [D11 Execution log](chip.md#d11-execution-log-filled-by-the-figma-agent) — never invent.

**Two phases, one review:** Phase 1 — build the component set (§7–§8). Phase 2 — as soon as Phase 1 is finished, the 12 documentation pages and the Components List card (§9).

| | |
|---|---|
| Target file | **Biowave DS — Mobile Components** · key `249tIAxlZogRvgBBXjcIZ5` · https://www.figma.com/design/249tIAxlZogRvgBBXjcIZ5 |
| Page | `↳ Chip` (one page per component) |
| Component | Chip · شريحة |
| Platform | Mobile · Flutter + Material 3 |
| Version | 1.0 · 2026-10-23 |
| Source | [`chip.md`](chip.md) @ `f6ed99099ea9bad4` |

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
| `border-focus-offset` | 9. Border › `border/focus/offset` | `b90b6264cf3202aa473578d22cb211167afe775d` | FLOAT | GAP | spec |
| `border-width-default` | 9. Border › `border/width/default` | `9b62f24ecdfc438789ce3fa296e725ac14b1e08f` | FLOAT | STROKE_FLOAT | spec |
| `color-border-focus` | 1. Themes › `color/border/focus` | `ef666d3badd2b63f18cb168d9987ead7fbc21480` | COLOR | STROKE_COLOR | spec |
| `radius-full` | 2. Radius › `radius/full` | `cde1a4778562f488d8f32680d4d00f7957cc2a21` | FLOAT | CORNER_RADIUS | spec |
| `radius-md` | 2. Radius › `radius/md` | `0758e506cdfd4d7a4eef6369a4851133d7eab5a4` | FLOAT | CORNER_RADIUS | spec |
| `size-control-height-md` | 4. Size › `size/control/height/md` | `cb6d23a09de76b9cea37c24579dbb2a9e6e6a079` | FLOAT | WIDTH_HEIGHT | spec |
| `size-control-height-sm` | 4. Size › `size/control/height/sm` | `1409647f4e12e37e76b49ed9ce1a78946e4250f4` | FLOAT | WIDTH_HEIGHT | spec |
| `size-icon-lg` | 4. Size › `size/icon/lg` | `e79bd86fedcce89547674c84c9127d0149e60061` | FLOAT | WIDTH_HEIGHT | spec |
| `size-icon-md` | 4. Size › `size/icon/md` | `eb459c673e6ca16e3c81b240f04b467717953a9a` | FLOAT | WIDTH_HEIGHT | spec |
| `size-icon-sm` | 4. Size › `size/icon/sm` | `2aa4b1f12a5ed0745f9a8b3251dc1fd9f7dd3476` | FLOAT | WIDTH_HEIGHT | spec |
| `spacing-control-gap-md` | 3. Spacing › `spacing/control/gap/md` | `e2e6fc01e3a1245e8c3584798b5d224742a9a6bc` | FLOAT | WIDTH_HEIGHT, GAP | spec |
| `spacing-control-gap-sm` | 3. Spacing › `spacing/control/gap/sm` | `97daa7ac19168846d702cc8c210d1e162a484b41` | FLOAT | WIDTH_HEIGHT, GAP | spec |
| `spacing-control-padding-inline-md` | 3. Spacing › `spacing/control/padding-inline/md` | `ece071c90fd7557c56f2a8918944c46d2672718e` | FLOAT | WIDTH_HEIGHT, GAP | spec |
| `spacing-control-padding-inline-sm` | 3. Spacing › `spacing/control/padding-inline/sm` | `fb323143873973f1548553562791a9983936aa5a` | FLOAT | WIDTH_HEIGHT, GAP | spec |
| `spacing-sm` | 3. Spacing › `spacing/sm` | `8332b62aa90dea8417383c59a11eee680e0f1db5` | FLOAT | WIDTH_HEIGHT, GAP | spec |
| `spacing-xs` | 3. Spacing › `spacing/xs` | `9ea993d003d5368c5100b038d51c7c8f3e95c115` | FLOAT | WIDTH_HEIGHT, GAP | spec |
| `target-min` | 7. Grid & Layout › `target/min` | `db23ec2826d3bfa3e600e5a82801e0c7d37ba298` | FLOAT | WIDTH_HEIGHT | spec |

## 4. Text styles used (keys)

None named in B/D.

## 5. Effect styles used (keys)

| Style | Key |
|---|---|
| `Focus/Ring` | `a52fabd21a5e545bc7bef092fbf39ebfe0e9bd43` |

## 6. Components to instance (keys)

Nested Biowave components (e.g. Button inside Split button) are instances of the sets **in this file** — build them first; never detach.

### Icons (keys) — Google · Material Symbols library (D-18)

Library file **Google · Material Symbols** · key `RXlnhYgUKBBE6HveEr7e9C` — must be enabled in this file. Import the set, then use the **Style=Rounded** variant (`Fill=Filled` only for selected states). Colour the glyph by binding its vector fills to the icon colour token of the part.

| Icon | Set key | Rounded (unfilled) | Rounded (filled) |
|---|---|---|---|
| `add` | `7d426edec81a6ef6e44ffdcc37eab6863c7943a7` | `d20bdb7a3a61cd1a31b9e9dddf5c46330cc9bbff` | `cbadf0df7af23f20cf573e9b3856c059d146c57d` |
| `check` | ⏳ not indexed — Planner runs `npm run sync:icons:plan` | | |
| `close` | `e59e13c612139f0079fe8e1c86a696f24a335eec` | `59b74c3af3cc86471fc3c3da406e1af6f4653030` | `ba5c2563c6776e81c31d5f5212c1376851c1ff4d` |

## 7. Phase 1 — values (from Part B)

### B1 API

### `BwChip`

One named constructor per `variant` (A4.1), so invalid combinations cannot compile.

| Constructor · param | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `BwChip.assist` · `label`, `onPressed` | `String` · `VoidCallback?` | | | ✓ | `onPressed: null` = disabled |
| `BwChip.filter` · `label`, `selected`, `onSelected` | `String` · `bool` · `ValueChanged<bool>?` | | `selected: false` | ✓ `label`, `onSelected` | Controlled; `onSelected(!selected)` on tap, Enter, Space; `null` = disabled |
| `BwChip.input` · `label`, `onRemoved` | `String` · `VoidCallback?` | | | ✓ | Remove button calls `onRemoved`; `null` = disabled chip and remove button |
| `BwChip.input` · `avatar` | `BwChipAvatar?` | `BwChipAvatar({String? name, ImageProvider? image, String? initials, IconData? icon, BwAvatarColor color})` | `null` | | A4.5 `leading-avatar`; rendered as a decorative `BwAvatar` (B2) |
| `BwChip.input` · `removeLabel` | `String?` | | localized “Remove {label}” / “إزالة {label}” | | Semantics label of the remove button |
| `BwChip.tag` · `label`, `color` | `String` · `BwChipColor` | `neutral` · `brand` · `secondary` · `success` · `warning` · `error` · `info` | `neutral` | ✓ `label` | A4.3 |
| `BwChip.status` | — | the 7 request states of A4.4 | — | | Not built in 1.0 (C2); added in plan 1.1 |
| all except `status` · `icon` | `IconData?` | `Symbols.*_rounded` (D-18) | `null` | | A4.5 `leading-icon`; on `input` ignored when `avatar` is set |
| all · `size` | `BwControlSize` | `sm` · `md` (`lg`, `xl` assert → `md`) | `md` | | A4.2 · A8 |
| all · `key` | `Key?` | | | | |

Platform naming notes: Flutter `onPressed` = web `onClick`; `onSelected` = web `onSelectedChange`; `onRemoved` = web `onRemove`; a `null` callback = web `disabled`; `avatar` takes `image` (`ImageProvider`) where web takes `src`.

**Invalid combinations** (`assert` in debug, message in quotes; release builds render the fallback):
- `size` `lg` or `xl` → “chips are sm or md” (renders `md`)
- `BwChip.input` with both `avatar` and `icon` → “one leading item per chip” (`icon` ignored)
- Blank `label` → “chips need a label”

### B2 Dimensions

Same redline, parts and layout rules as [Web B2](../../../3-web-components/components/chip/chip.md#b2-dimensions), with the same tokens for `sm` and `md`:

| Part | Property | `sm` | `md` |
|---|---|---|---|
| `container` | height | `size-control-height-sm` | `size-control-height-md` |
| `container` | padding-inline | `spacing-control-padding-inline-sm` | `spacing-control-padding-inline-md` |
| `container` | padding-inline-start with avatar · padding-inline-end with remove | `spacing-xs` | `spacing-xs` |
| `container` | gap | `spacing-control-gap-sm` | `spacing-control-gap-md` |
| `container` | radius · interactive / static | `radius-md` / `radius-full` | same |
| `container` | border · interactive | `border-width-default` | same |
| icons | size | `size-icon-sm` | `size-icon-md` |
| `leading-avatar` | box | `size-icon-lg` (`BwAvatar` `xs`, see C2) | `size-control-height-sm` (`BwAvatar` `sm`) |
| `remove-button` | box · glyph | `size-icon-lg` · `size-icon-sm` | `size-control-height-sm` · `size-icon-md` |
| `label` | text style | `label-md` | `label-lg` |
| chip row (consumer) | spacing and run spacing (`Wrap`) | `spacing-sm` | `spacing-sm` |

- **Touch targets:** every `assist` / `filter` chip and every remove button has a hit area ≥ `target-min` (`BwLayout.mobile.minTarget`, 48), extended invisibly without changing layout (the chip's visual height stays the B2 height)
- **Text scale:** the label scales with the system text scale; the chip grows in height (min height = B2 height, never a fixed max) and never clips

Flutter access: `size-control-height-md` → `BwSize.controlHeightMd` · `spacing-control-padding-inline-md` → `BwSpacing.controlPaddingInlineMd` · `spacing-xs` → `BwSpacing.xs` · `radius-md` → `BwRadius.md` · `radius-full` → `BwRadius.full` · `size-icon-md` → `BwSize.iconMd` · `label-lg` → `context.bw.text.labelLg` · colours → `context.bw.colors.<camelCase>` · `target-min` → `BwLayout.mobile.minTarget`.

### B3 Tokens by part and state

Identical to [Web B3](../../../3-web-components/components/chip/chip.md#b3-tokens-by-part-and-state) (interactive states, selected filter, remove button, tag colours, focus ring). No component tokens (P-04). The **Hover** row applies only when a pointer is attached (`WidgetState.hovered`); Figma has no Hover variant on Mobile. Flutter mapping:

| Spec part / state | Flutter |
|---|---|
| `container` background, border, state layer | `DecoratedBox` (`ShapeDecoration` with `RoundedRectangleBorder` / `StadiumBorder`, `BorderSide` from B3) + a second `ColoredBox` state layer resolved from `WidgetState` (`hovered`, `pressed`) |
| `label` | `Text` with `context.bw.text.label{Size}` and the B3 colour |
| icons | `BwIcon` with the B3 colour |
| `remove-button` | `BwIconButton` (`text`, `neutral`) |
| focus ring | `BwFocusRing` (`lib/src/common/bw_focus_ring.dart`) |
| splash, elevation | none |

### B4 States and transitions

Same as [Web B4](../../../3-web-components/components/chip/chip.md#b4-states-and-transitions) without pointer hover on touch. Durations `BwDuration.sm`, easing `BwEasing.standard`; reduced motion (`MediaQuery.disableAnimationsOf`) makes them instant.

### B5 RTL

Same as [Web B5](../../../3-web-components/components/chip/chip.md#b5-rtl). Flutter: `Directionality` from the app; `EdgeInsetsDirectional` for padding; `Row` order follows the text direction; glyphs never mirrored (no `matchTextDirection`).

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| `assist` | `Semantics(button: true, enabled: onPressed != null, label: label)`; visible text `ExcludeSemantics` |
| `filter` | `Semantics(button: true, toggled: selected, enabled: onSelected != null, label: label)` |
| `input` | Label read as text; the remove button is a **separate** node: `BwIconButton` with `semanticLabel` = `removeLabel` |
| `tag` · `status` | Plain text semantics; not focusable |
| Decorative parts | Leading icon, check icon, status icon `excludeFromSemantics`; avatar `decorative: true` |
| Filter group | The consumer wraps a filter row in `Semantics(container: true, label: 'Filters' / 'عوامل التصفية')` (B7) |
| Focus | `BwFocusRing` (keyboard highlight mode only), 2px `color-border-focus`, `border-focus-offset` |
| Target size | B2 touch targets |
| Screen reader output | As [Web B6](../../../3-web-components/components/chip/chip.md#b6-accessibility-implementation) (TalkBack / VoiceOver wording: “Remote, toggle button, on”) |

| Key (hardware keyboard) | Action |
|---|---|
| Tab / Shift+Tab | Next / previous interactive chip or remove button |
| Enter / Space | `assist`: runs · `filter`: toggles · remove button: removes |
| Backspace / Delete | Focused remove button: removes |

## 8. Phase 1 — build the component set (from Part D)

> **One file per platform (D-12).** This file builds the Mobile sets in **Biowave DS — Mobile Components**. Structure, layer tree and properties are the same as [Web D2–D4](../../../3-web-components/components/chip/chip.md#d--figma-build) (one fact, one home); this file lists only what differs. Values come from the Mobile [Part B](#b--spec).

| Field | Value |
|---|---|
| Component | Chip |
| Platform | Mobile |
| Figma file | **Biowave DS — Mobile Components** (`_sync/figma-files.json` › `mobile`) — never the Foundations file |
| Page / section | `↳ Chip` › sections `Chip` and `Chip — Documentation` |
| Mode | Create new. Legacy Chips / Labels pages stay read-only in Foundations until approval |
| Plan version | 1.0 · 2026-10-23 |

### D1 Rules for this build

Same as [Web D1](../../../3-web-components/components/chip/chip.md#d1-rules-for-this-build) (no component tokens, everything bound, library instances), plus:
- **Typography mode:** on page `↳ Chip` set the explicit variable mode **`Mobile`** for `5. Typography (EN)` and `6. Typography (AR)`.
- Nested instances: Mobile `Icon button` (remove) and `Avatar` from this file once they are built; until then report Phase 1 as “blocked — Icon button / Avatar” for those slots and build the rest.

### D2 Component structure

As [Web D2](../../../3-web-components/components/chip/chip.md#d2-component-structure): `Chip` and `Tag chip` sets plus `.Chip/Leading`; `Status chip` waits for plan 1.1. Mobile differences:
- `Size` = `SM` · `MD` (default `MD`)
- `State` = `Default` · `Pressed` · `Focus` · `Disabled` (no `Hover`)

### D3 Layer tree and auto layout

As [Web D3](../../../3-web-components/components/chip/chip.md#d3-layer-tree-and-auto-layout); the 48 hit area of chips and remove buttons is shown only on doc page 09.

**Icons used:** `check` (check-icon) · `close` (remove-button) · `add` (default `Icon` swap)

### D4 Properties

As [Web D4](../../../3-web-components/components/chip/chip.md#d4-properties) without the `Hover` state value. Code mapping uses the Flutter names from B1 (`BwChip.assist` …, `onSelected`, `onRemoved`, `null` callback = Disabled).

### D5 Variants to generate

- `Chip`: Assist = 2 sizes × 4 states × 2 languages = 16 · Filter = 2 × 4 × 2 selected × 2 = 32 · Input = 2 × 3 × 2 = 12 → **60 variants**
- `Tag chip`: 7 colours × 2 sizes × 2 languages = **28 variants**

### D6 States, interactions and motion

As Web D6 without hover. Press and filter selection: smart animate per B4.

### D7 RTL

As [Web D7](../../../3-web-components/components/chip/chip.md#d7-rtl) (`Language=AR` variants).

### Inherited from Web (D1, D2, D3, D4, D6, D7, D8)

The Mobile Part D refers to these Web sections; they are copied here so you read one file. Apply the Mobile differences above on top.

#### D1 Rules for this build

0. No component tokens for Chip (P-04): bind layers directly to the Foundations semantic variables (contract §3). Never create variables or styles by hand
1. Every fill, stroke, radius, padding, gap, height and icon size is bound to a variable; text uses published text styles; focus uses `Focus/Ring`
2. Never bind primitives or deprecated variables
3. Layer names equal the A2 part names in kebab-case
4. Auto layout on every frame; no absolute positioning except the hidden pointer-target overlay of `remove-button` on doc page 09
5. Icons, the remove Icon button and the Avatar are library or in-file instances, never detached

#### D2 Component structure

```
❖ Chip            Variant = Assist · Filter · Input (interactive)
❖ Tag chip        static `tag` variant, one variant per colour
❖ Status chip     static `status` variant — built in plan 1.1 (A4.4)
  └─ ◇ .Chip/Leading    private base: leading-icon · check-icon · leading-avatar slot
```

All three sets are the one code component `Chip`; the split only keeps Figma variant axes valid.

#### D3 Layer tree and auto layout

```
Chip                      ↔ horizontal · gap {B2 gap} · pad-inline {B2} · height fixed {B2} · width hug
│                           radius {B2 interactive} · stroke {B3} border-width-default
├── leading-icon          ◇ Icon · size {B2} · BOOLEAN `Leading icon` · INSTANCE_SWAP `Icon`
├── check-icon            ◇ Icon `check` · visible when Selected=True (Filter)
├── leading-avatar        ◇ Avatar · size {B2} · BOOLEAN `Avatar` (Input) · pad-inline-start spacing-xs
├── label                 T label-md / label-lg · TEXT `Label` · width hug · truncate: yes
└── remove-button         ◇ Icon button (text, neutral) · box {B2} · Input only · pad-inline-end spacing-xs

Tag chip                  same tree without check-icon, leading-avatar, remove-button · radius-full · no stroke
```

**Icons used:** `check` (check-icon) · `close` (remove-button) · `add` (default `Icon` swap)

```
┌──────────────────────────┐   ╭──────────────────╮
│  [◆]  Label           [×]│   │ [◆] Label        │
└──────────────────────────┘   ╰──────────────────╯
   ①     ⑤                ⑥      ②   ⑤
```

#### D4 Properties

| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `Variant` | VARIANT | `Assist` · `Filter` · `Input` | `Assist` | `variant` | `'assist'` · `'filter'` · `'input'` |
| `Color` (Tag chip) | VARIANT | `Neutral` · `Brand` · `Secondary` · `Success` · `Warning` · `Error` · `Info` | `Neutral` | `color` (with `variant="tag"`) | lower-case value |
| `Size` | VARIANT | `SM` · `MD` | `SM` | `size` | `'sm'` · `'md'` |
| `State` | VARIANT | `Default` · `Hover` · `Pressed` · `Focus` · `Disabled` | `Default` | `disabled` | Disabled maps to the prop; others are interaction states |
| `Selected` | VARIANT | `False` · `True` | `False` | `selected` | Filter only |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | Provider locale controls code |
| `Label` | TEXT | | `Add note` / `إضافة ملاحظة` | `label` | |
| `Leading icon` | BOOLEAN | | `false` | `icon` | present / absent |
| `Icon` | INSTANCE_SWAP | Material Symbols, Style=Rounded | `add` | `icon` | glyph name |
| `Avatar` | BOOLEAN | | `false` | `avatar` | Input only |

#### D6 States, interactions and motion

| Interaction | From → To | Animation |
|---|---|---|
| While hovering | Default → Hover | Smart animate · B4 |
| While pressing | Hover → Pressed | Smart animate · B4 |
| On click (Filter) | Selected False ↔ True | Smart animate · B4 |

Focus and Disabled have no prototype interaction.

#### D7 RTL

Method: `Language=AR` variants. Reverse auto-layout order, use Arabic sample copy from A6, keep `check`, `close` and status glyphs unmirrored.

```
EN  │ (SA) Sara Ali   [×] │
AR  │ [×]   سارة علي (س) │
```

#### D8 Documentation pages

Build the standard pages from the Doc Kit in section `Chip — Documentation`, frames `Chip / 00 Component sheet` through `Chip / 11 Changelog` (skip page 10 for version 1.0). If the Doc Kit is unavailable, finish D2–D7 and report Phase 2 as blocked.

Page notes:
- 00 shows the `Chip` and `Tag chip` sets
- 03 shows each variant, both sizes, tag colours, leading icon and avatar
- 04 shows the interactive state sequence plus filter selection
- 05 shows a filter row in a table header and input chips under a field
- 09 shows the remove button name, the filter group label and the `target-min` overlay

Component description: “Holds one short action, filter, entered value, tag or request status. Spec: 3-web-components/components/chip/chip.md”.

## 9. Phase 2 — documentation pages and Components List card

### D8 Documentation pages

All 12 standard pages in section `Chip — Documentation`, built only from the Doc Kit (Annotation library, D-17), page notes as Web D8. 07 Platform: `Doc/Device frame` = Phone (SafeArea), with the A8 example. 09 Accessibility: 48 target overlays on chips and remove buttons.

Component description: “Holds one short action, filter, entered value, tag or request status. Spec: 5-mobile-components/components/chip/chip.md”.

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

`5-mobile-components/lib/src/components/chip/bw_chip.figma.dart` — mapping per D4 with the Flutter names. Publish after code and Figma reviews are both `Approved`.

## 11. Rules

All rules in **D1** (§8 and the inherited Web D1), plus:

**Component tokens only (strict, D-13).** This file may contain exactly one kind of local variable: the `<Component> / <Group>` collections in §2. Never create a local primitive or semantic variable or any other collection; never copy or detach a library variable; never create a local text, effect, colour or grid style; bind layers to the component token when one exists for the property. Run `_sync/figma-read-tokens.js` (lint) **before Phase 1 and after each phase** — it must report 0 violations.

## 12. Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Sets and `.Chip/Leading` on `↳ Chip` in the Mobile file; structure and layer names as Web D2–D3 + D2 differences
- [ ] F-AC-2 Properties as Web D4 minus `Hover`; variant counts 60 and 28
- [ ] F-AC-3 Zero raw values; no local variables (no component tokens); token lint 0
- [ ] F-AC-4 Page Typography mode = `Mobile`; Light/Dark by mode only; Arabic fits without truncation
- [ ] F-AC-5 Values match the Mobile B2–B3 (redline per size, incl. avatar and remove insets)
- [ ] F-AC-6 Docs built from the Doc Kit; Components List card added; Code Connect per D9 after approval

- [ ] F-AC-L1 Lint (`figma-read-tokens.js`) = 0 violations before Phase 1, after Phase 1 and after Phase 2 (outputs attached in D11)
- [ ] F-AC-L2 Every variable, style and component used comes from §2–§6 by key — no new local variables except component tokens, no local styles

## 13. When you finish

1. Fill [D11 Execution log](chip.md#d11-execution-log-filled-by-the-figma-agent) in `chip.md` (stages, node IDs of the set, docs section and pages, lint outputs, deviations, questions).
2. Set **Figma build** to `Built` in the header of `chip.md` and in `5-mobile-components/README.md`.
3. `npm run sync:done:mobile` — records this contract as built in the Mobile file.
4. Add one line to the root `CHANGELOG.md`.

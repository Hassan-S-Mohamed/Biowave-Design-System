<!-- GENERATED from badge.md @ 646636a3fd82b6f2 — do not edit; change the source and run: npm run contract -- tablet badge -->
# Badge · شارة — Tablet — Figma contract

> **Everything the Figma Agent needs to build Badge in the Tablet Components file, with our variables and styles.** Read this file only. Generated from [`badge.md`](badge.md) (Parts A, B, D) and the Figma library index (`_sync/figma-library.json`, read 2026-10-28). Questions go to [D11 Execution log](badge.md#d11-execution-log-filled-by-the-figma-agent) — never invent.

**Two phases, one review:** Phase 1 — build the component set (§7–§8). Phase 2 — as soon as Phase 1 is finished, the 12 documentation pages and the Components List card (§9).

| | |
|---|---|
| Target file | **Biowave DS — Tablet Components** · key `KTlAsEow60qCiYyU3J90kp` · https://www.figma.com/design/KTlAsEow60qCiYyU3J90kp |
| Page | `↳ Badge` (one page per component) |
| Component | Badge · شارة |
| Platform | Tablet · Flutter + Material 3 |
| Version | 1.1 · 2026-10-24 |
| Source | [`badge.md`](badge.md) @ `646636a3fd82b6f2` |

## 1. Library connections in this file

| | |
|---|---|
| Library | **Biowave DS — Foundations** · library key `lk-e00b31b21f924b36eeea820da99c4b306c460986c83e894f415a1c194ba5a2e670f3142c2fccca81280a80bcaee6a87bc47c9a9505d186d7b693aa9805ad7031` |
| Library file | Foundations · key `AyFaSmfDUlTax3GpKhRdHI` |
| Doc Kit library (Phase 2) | **Annotation (Biowave Doc Kit)** · file key `cBPWg6YZNqK8UIzgMQIpXl` — must be enabled in this file (Assets → Libraries) |
| Enabled here | ✓ verified from a component file: 9 collections, 347 variables reachable |

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
| `border-width-strong` | 9. Border › `border/width/strong` | `71439086700175c98e9cdf1952de74427c72063e` | FLOAT | STROKE_FLOAT | spec |
| `color-background-brand-default` | 1. Themes › `color/background/brand/default` | `bdd7bfecb9dd5c41ac657e880d4d2efe36909e3f` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-background-error-default` | 1. Themes › `color/background/error/default` | `00642d9524f1bc7c3550f2b6fc75ef70393d6b56` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-background-info-default` | 1. Themes › `color/background/info/default` | `4fbd67301596273d3c752d213b6caea59cda5cee` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-background-secondary-default` | 1. Themes › `color/background/secondary/default` | `5fb5cedefb9062e4290089bb76e4929a21e5e739` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-background-success-default` | 1. Themes › `color/background/success/default` | `1222c78801e68710a1c3affcb6648a60835ac846` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-background-warning-default` | 1. Themes › `color/background/warning/default` | `369f1ccef2a098d715709bd23c490667074ad00b` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-border-inverse` | 1. Themes › `color/border/inverse` | `0e53944b3de77eca83b17b27c3e5d0b4fca582d8` | COLOR | STROKE_COLOR | spec |
| `color-icon-inverse` | 1. Themes › `color/icon/inverse` | `f1c29644d88c107b8e40c4ba2dd9e5c8d9667fde` | COLOR | SHAPE_FILL, STROKE_COLOR | spec |
| `color-icon-on-brand` | 1. Themes › `color/icon/on/brand` | `7adf0bdf71942294bcca707ea3b88ab778741004` | COLOR | SHAPE_FILL, STROKE_COLOR | spec |
| `color-icon-on-info` | 1. Themes › `color/icon/on/info` | `914bfb05cd12b9e876ddbf6f6ff19a4b369910af` | COLOR | SHAPE_FILL, STROKE_COLOR | spec |
| `color-icon-on-secondary` | 1. Themes › `color/icon/on/secondary` | `c9e557cbf045baf1678551c328e726930b0ce16d` | COLOR | SHAPE_FILL, STROKE_COLOR | spec |
| `color-icon-on-success` | 1. Themes › `color/icon/on/success` | `c28ce6e06425528619528dc4b33496dc55ff1d45` | COLOR | SHAPE_FILL, STROKE_COLOR | spec |
| `color-icon-role-warning` | 1. Themes › `color/icon/role/warning` | `3fa016bcd1409896b81681403e6a214dcc365fda` | COLOR | SHAPE_FILL, STROKE_COLOR | spec |
| `color-surface-default` | 1. Themes › `color/surface/default` | `2013a1c60d84d2bac2524fd0c32229e20cc341a1` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-surface-inverse` | 1. Themes › `color/surface/inverse` | `364770c6a80914cb1d30c8afc1e354431dbb5f07` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-text-inverse` | 1. Themes › `color/text/inverse` | `83e1f6c6d7ddf8376b1bc5d0b9d5f6cd13b68e9b` | COLOR | TEXT_FILL | spec |
| `color-text-on-brand` | 1. Themes › `color/text/on/brand` | `993ca33a3563483742db3f20ac2db1d094fa2106` | COLOR | TEXT_FILL | spec |
| `color-text-on-error` | 1. Themes › `color/text/on/error` | `2a712a2cc3a4ba1f5c6ec54f1fccb0a42d8da539` | COLOR | TEXT_FILL | spec |
| `color-text-on-info` | 1. Themes › `color/text/on/info` | `f321b04e3d1a4b3d6640c131b730c637107f2124` | COLOR | TEXT_FILL | spec |
| `color-text-on-secondary` | 1. Themes › `color/text/on/secondary` | `c94b4241b9f81084e2ef11af7d3724b092d9da57` | COLOR | TEXT_FILL | spec |
| `color-text-on-success` | 1. Themes › `color/text/on/success` | `72f5f649b899d7488e05dd8e79537c94251c7aa2` | COLOR | TEXT_FILL | spec |
| `radius-full` | 2. Radius › `radius/full` | `cde1a4778562f488d8f32680d4d00f7957cc2a21` | FLOAT | CORNER_RADIUS | spec |
| `size-icon-md` | 4. Size › `size/icon/md` | `eb459c673e6ca16e3c81b240f04b467717953a9a` | FLOAT | WIDTH_HEIGHT | spec |
| `size-icon-sm` | 4. Size › `size/icon/sm` | `2aa4b1f12a5ed0745f9a8b3251dc1fd9f7dd3476` | FLOAT | WIDTH_HEIGHT | spec |
| `spacing-md` | 3. Spacing › `spacing/md` | `58c93e3cec1b6ba603371a027483e101adcef4f0` | FLOAT | WIDTH_HEIGHT, GAP | spec |
| `spacing-xs` | 3. Spacing › `spacing/xs` | `9ea993d003d5368c5100b038d51c7c8f3e95c115` | FLOAT | WIDTH_HEIGHT, GAP | spec |
| `target-min` | 7. Grid & Layout › `target/min` | `db23ec2826d3bfa3e600e5a82801e0c7d37ba298` | FLOAT | WIDTH_HEIGHT | spec |

## 4. Text styles used (keys)

| Style | Key |
|---|---|
| `Web/en/data/sm` | `b836c927df34dcf83db359fdaf14e70e0b54b7b2` |
| `Web/ar/data/sm` | `6e2745b4b1dd4c3b5d008b9f6a5c8e97d2def079` |

## 5. Effect styles used (keys)

None named in B/D.

## 6. Components to instance (keys)

Nested Biowave components (e.g. Button inside Split button) are instances of the sets **in this file** — build them first; never detach.

### Icons (keys) — Google · Material Symbols library (D-18)

Library file **Google · Material Symbols** · key `RXlnhYgUKBBE6HveEr7e9C` — must be enabled in this file. Import the set, then use the **Style=Rounded** variant (`Fill=Filled` only for selected states). Colour the glyph by binding its vector fills to the icon colour token of the part.

| Icon | Set key | Rounded (unfilled) | Rounded (filled) |
|---|---|---|---|
| `check` | ⏳ not indexed — Planner runs `npm run sync:icons:plan` | | |
| `mail` | `c0a48a046c2a3fb66c36765d7f150b2ac9a045e0` | `0414b32813202713bf05545f2c8154575f842511` | `c625c93be50f00889f8de6e1d8b1747d848531c9` |
| `schedule` | `89f2818a7ab025b819eefea315fc7ca3a5191bc7` | `d75c497b23d5d4b9a36ebe79b61f86dc02b01d1e` | `9f684b8f34e33064a012a35fd954d41f7f3d6e69` |

## 7. Phase 1 — values (from Part B)

### B1 API

### `BwBadge`

| Param | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `child` | `Widget?` | | `null` | | The `anchor`. `null` → standalone inline badge (no `ring`) |
| `variant` | `BwBadgeVariant` | `count` · `dot` · `check` | `count` | | A4.1 |
| `count` | `int?` | ≥ 0 | `null` | ✓ for `count` | A2 `count`; ignored by `dot` and `check` |
| `max` | `int` | ≥ 1 | `99` | | A4.3 — above it the badge shows `{max}+` |
| `showZero` | `bool` | | `false` | | A4.4 |
| `color` | `BwBadgeColor?` | `error` · `brand` · `secondary` · `success` · `warning` · `info` · `neutral` | `null` → `error` (`success` for `check`) | | A4.2 |
| `overlap` | `BwBadgeOverlap` | `rectangular` · `circular` | `rectangular` | | A4.5 — only with `child` |
| `isVisible` | `bool` | | `true` | | A4.6 (web `invisible`, inverted) — hides with the exit transition (B4); a hidden standalone badge takes no space (B4) |
| `semanticLabel` | `String?` | | `null` | ✓ when visible | A4.7 — the accessible meaning (B6) |

Platform naming: web `children` = `child`; web `invisible` = `!isVisible`; web `label` = `semanticLabel`. Named constructors are not used — one constructor, like the web props.

**Invalid combinations** (`assert` in debug, message in quotes):
- `variant == count` and `count == null` → “count badges need a count”
- `count < 0` → “count must be ≥ 0”; `max < 1` → “max must be ≥ 1”
- `variant == check` with `color` `error` or `warning` → “check badges use success, brand, secondary, info or neutral”
- `variant == dot` with `color == warning` → “warning is for count badges only”
- visible badge with `semanticLabel == null` → “badges need a semanticLabel”

### B2 Dimensions

Same sizes as [Web B2](../../../3-web-components/components/badge/badge.md#b2-dimensions), in dp:

| Part | Property | `count` | `dot` | `check` |
|---|---|---|---|---|
| `indicator` | height | `size-icon-md` → `BwSize.iconMd` | `spacing-md` → `BwSpacing.md` | `size-icon-md` → `BwSize.iconMd` |
| `indicator` | min width | `size-icon-md` → `BwSize.iconMd` | `spacing-md` (fixed) | `size-icon-md` (fixed) |
| `indicator` | horizontal padding | `spacing-xs` → `EdgeInsetsDirectional.symmetric(horizontal: BwSpacing.xs)` | — | — |
| `indicator` | shape | `radius-full` → `StadiumBorder` / `BorderRadius.circular(BwRadius.full)` | same | same |
| `count` | text style | `data-sm` → `context.bw.text.dataSm` + `FontFeature.tabularFigures()` | — | — |
| `check-icon` | size | — | — | `size-icon-sm` → `BwIcon(size: BwIconSize.sm)` |
| `ring` | width (anchored only) | `border-width-strong` → `BwBorder.widthStrong` | same | same |

```
   ┬ ╭──────────────────╮        ┬ ●              ┬ ╭─────╮
   │ │       99+        │        ┴ BwSpacing.md   │ │ [✓] │
   ┴ ╰──────────────────╯                         ┴ ╰─────╯
 BwSize.iconMd  ├─┤ BwSpacing.xs                BwSize.iconMd
```

Layout rules:
- Anchored: `Stack(clipBehavior: Clip.none)` with the `child` first and the indicator in a `PositionedDirectional(top: 0, end: 0)` wrapped in `FractionalTranslation(translation: Offset(isRtl ? -0.5 : 0.5, -0.5))`, so the indicator centre sits on the anchor's top-end corner (B5). `overlap: circular` insets the reference corner by 14.6% of the anchor size on both axes ((1 − cos 45°) ÷ 2, same as Web).
- The `Stack` is sized by the `child` only; the badge never changes the anchor's size or hit area.
- Standalone (`child == null`): the indicator alone, no `ring`, no translation, aligned to the text's middle when placed in a `Row`.
- `count`: one line, no wrap, centred; the text is built as `'${n}'` / `'$max+'` and wrapped in `Directionality(textDirection: TextDirection.ltr)` so `99+` never reorders in Arabic.
- `ring`: drawn outside the indicator (`BoxDecoration.border` with `BorderSide(strokeAlign: BorderSide.strokeAlignOutside)`) — it adds no layout size.

### B3 Tokens by part and state

Identical to [Web B3](../../../3-web-components/components/badge/badge.md#b3-tokens-by-part-and-state); no component tokens (P-04). Flutter mapping (`context.bw.colors.*`):

| `color` | `indicator` background | `count` text | `check-icon` |
|---|---|---|---|
| `error` | `color-background-error-default` → `backgroundErrorDefault` | `color-text-on-error` → `textOnError` | — |
| `brand` | `color-background-brand-default` → `backgroundBrandDefault` | `color-text-on-brand` → `textOnBrand` | `color-icon-on-brand` → `iconOnBrand` |
| `secondary` | `color-background-secondary-default` → `backgroundSecondaryDefault` | `color-text-on-secondary` → `textOnSecondary` | `color-icon-on-secondary` → `iconOnSecondary` |
| `success` | `color-background-success-default` → `backgroundSuccessDefault` | `color-text-on-success` → `textOnSuccess` | `color-icon-on-success` → `iconOnSuccess` |
| `warning` | `color-icon-role-warning` → `iconRoleWarning` | `color-text-inverse` → `textInverse` | — |
| `info` | `color-background-info-default` → `backgroundInfoDefault` | `color-text-on-info` → `textOnInfo` | `color-icon-on-info` → `iconOnInfo` |
| `neutral` | `color-surface-inverse` → `surfaceInverse` | `color-text-inverse` → `textInverse` | `color-icon-inverse` → `iconInverse` |

| Part | Property | Token → Flutter |
|---|---|---|
| `ring` | colour | `color-border-inverse` → `context.bw.colors.borderInverse` |
| `ring` | width | `border-width-strong` → `BwBorder.widthStrong` |

`warning` fill (1.1): `color-icon-role-warning`, not `color-background-warning-default` (2.20:1 on `color-surface-default` in light) — reason and ratios in [Web B3](../../../3-web-components/components/badge/badge.md#b3-tokens-by-part-and-state).

Dark theme: same tokens. No exceptions.

### B4 States and transitions

Same table as [Web B4](../../../3-web-components/components/badge/badge.md#b4-states-and-transitions). Flutter: `AnimatedScale(alignment: Alignment.center)` on the indicator — to visible `duration: BwDuration.md, curve: BwEasing.standardDecelerate`; to hidden `duration: BwDuration.sm, curve: BwEasing.standardAccelerate`; first build has no animation. Count, `color` and `variant` changes rebuild at once.
Reduced motion: when `context.bw.reduceMotion` is true use `BwDuration.instant`.

**Hidden standalone** (`child == null`, 1.1): takes no space, as [Web B4 › Hidden standalone](../../../3-web-components/components/badge/badge.md#b4-states-and-transitions). When it hides, the exit `AnimatedScale` plays first; in its `onEnd` the indicator is replaced by `SizedBox.shrink()`. When it shows, the indicator is rebuilt at scale 0 and then animates in. With `reduceMotion` it leaves and returns at once. Hidden on first build → `SizedBox.shrink()` from the start. Anchored badges are unchanged.

### B5 RTL

As [Web B5](../../../3-web-components/components/badge/badge.md#b5-rtl): placement mirrors to the top-start corner through `PositionedDirectional(end: 0)` and the RTL-signed `FractionalTranslation`; `count` stays LTR (`99+`); `check-icon` is `BwIcon(icon: Symbols.check_rounded)` without `directional` — never mirrored.

```
LTR   ┌──────────┐(3)        RTL  (3)┌──────────┐
      │  [✉]     │                   │     [✉]  │
      └──────────┘                   └──────────┘
```

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Indicator | `ExcludeSemantics` always |
| Anchored with `semanticLabel` | `MergeSemantics(child: Semantics(value: semanticLabel, child: child))` — TalkBack / VoiceOver: “Notifications, 3 unread messages, button” |
| Hidden badge | No `value` while hidden |
| Standalone with `semanticLabel` | `Semantics(label: semanticLabel, image: true)` around the indicator (outside `ExcludeSemantics`) |
| Contrast | As Web B6 — every allowed `color` × `variant` meets 3:1 against `color-surface-default` in both themes; `warning` through its `iconRoleWarning` fill (B3) |
| Focus | Never focusable; no `Focus` / `InkWell` in the badge. The anchor's focus ring stays visible |
| Target size | Not a target: the indicator is wrapped in `IgnorePointer`; the anchor keeps ≥ `target-min` (48) |
| Live updates | No `liveRegion` |

| Key | Action |
|---|---|
| — | None. Interaction belongs to the anchor |

## 8. Phase 1 — build the component set (from Part D)

> **One file per platform (D-12).** Structure, layer tree and properties are the same as [Web D2–D4](../../../3-web-components/components/badge/badge.md#d--figma-build); this file lists only what differs. Values come from the Tablet spec [Part B](#b--spec).

| Field | Value |
|---|---|
| Component | Badge |
| Platform | Tablet |
| Figma file | **Biowave DS — Tablet Components** (`_sync/figma-files.json` › `tablet`) |
| Page / section | `↳ Badge` › sections `Badge` and `Badge — Documentation` |
| Mode | **Create new.** The Check badge (P-05) is `Variant=Check` of this set |
| Plan version | 1.1 · 2026-10-24 |

### D1 Rules for this build

Same as [Web D1](../../../3-web-components/components/badge/badge.md#d1-rules-for-this-build) (library first, no component tokens, everything bound, no local variables or styles), plus:
- **Typography mode:** on page `↳ Badge` set the explicit variable mode **`Tablet`** for `5. Typography (EN)` and `6. Typography (AR)`. Text styles stay `Web/{en|ar}/data/sm`; the mode gives the Tablet scale.
- `check-icon` is an instance of the **Icon** set in this file (`Size=SM`, `Glyph` = `check`).

### D2 Component structure

As [Web D2–D4](../../../3-web-components/components/badge/badge.md#d2-component-structure). No Tablet differences in structure.

### D3 Layer tree and auto layout

As [Web D3](../../../3-web-components/components/badge/badge.md#d3-layer-tree-and-auto-layout).

### D4 Properties

As [Web D4](../../../3-web-components/components/badge/badge.md#d4-properties); code mapping uses the Flutter names in B1 (`Ring=Off` → `child: null`).

**Icons used:** `check` · `mail`

### D5 Variants to generate

Same as Web D5: **50 variants** (`Count` 28 · `Dot` 12 · `Check` 10).

### D6 States, interactions and motion

As Web D6 — no interactive states; doc page 04 shows the B4 scale in/out.

### D7 RTL

As Web D7 (`Language=AR` for `Count`; placement mirror shown on doc page 08).

### Inherited from Web (D1, D2, D3, D4, D5, D6, D7, D8)

The Tablet Part D refers to these Web sections; they are copied here so you read one file. Apply the Tablet differences above on top.

#### D1 Rules for this build

0. **Library first; no component tokens (D-13).** Badge has no `badge.tokens.json` (B3: every value is a semantic token). Bind directly to the **Biowave DS — Foundations** library variables listed in the contract; never create local variables, collections or styles. Text style `Web/{en|ar}/data/sm`; the check glyph is the **Icon** set in this file.
1. **Every value is bound.** Fill, stroke colour and weight, radius, padding, height, min width → variables; text → text style. No raw hex / px.
2. **Token → variable:** `-` between segments becomes `/`: `color-background-error-default` → `1. Themes › color/background/error/default`; `color-surface-inverse` → `1. Themes › color/surface/inverse`; `color-icon-role-warning` → `1. Themes › color/icon/role/warning` (the `Warning` fill, B3); `size-icon-md` → `4. Size › size/icon/md`; `spacing-xs` → `3. Spacing › spacing/xs`; `spacing-md` → `3. Spacing › spacing/md`; `radius-full` → `2. Radius › radius/full`; `border-width-strong` → `9. Border › border/width/strong`; `color-border-inverse` → `1. Themes › color/border/inverse`.
3. **Never** bind `_Primitive/*` or `_deprecated/*`.
4. **Layer names = anatomy part names** (A2): the component itself is `indicator`; children `count`, `check-icon`. The `ring` is the indicator's outside stroke. `anchor` exists only in documentation examples.
5. Auto layout on the component. Absolute positioning only in documentation examples, where the badge instance is placed on an anchor's top-end corner (B2 placement).
6. `check-icon` is an instance of the **Icon** set in this file (`Size=SM`, `Glyph` = `check`), never detached. Build Icon first.

#### D2 Component structure

```
❖ Badge                    ← component set (published) on page ↳ Badge
  (no private base components)
```

#### D3 Layer tree and auto layout

```
indicator (Badge)     ↔ horizontal · align center/center · height fixed {B2 block-size}
│                       min width {B2 min-inline-size} · width hug (Count) / fixed (Dot, Check)
│                       pad-inline {B2 padding-inline, Count only} · radius {B2 radius}
│                       fill {B3 indicator background}
│                       stroke OUTSIDE {B3 ring colour} · weight {B3 ring width} — Ring=On only
├── count             T text style Web/{en|ar}/data/sm · fill {B3 count text} · TEXT `Count`
│                       hug · no wrap · Variant=Count only
└── check-icon        ◇ Icon instance (Size=SM, Glyph=check) · fill {B3 check-icon}
                        Variant=Check only
```

```
Count, Ring=On      Dot, Ring=On     Check, Ring=On
  ╭───────╮           ●                ╭─────╮
  │  99+  │                            │ [✓] │
  ╰───────╯                            ╰─────╯
     ③                 ②                  ④
```

#### D4 Properties

This table is the source for Code Connect (D9).

| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `Variant` | VARIANT | `Count` · `Dot` · `Check` | `Count` | `variant` | `'count'` · `'dot'` · `'check'` |
| `Color` | VARIANT | `Error` · `Brand` · `Secondary` · `Success` · `Warning` · `Info` · `Neutral` | `Error` | `color` | `'error'` … `'neutral'` |
| `Ring` | VARIANT | `On` · `Off` | `On` | `children` | `On` = anchored (children present) · `Off` = standalone |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | Figma only, `Count` variants only (text style); code takes language from the provider |
| `Count` | TEXT | | `3` | `count` | the shown text; `99+` stands for `count` > `max` |

**Icons used:** `check` · `mail`

#### D5 Variants to generate

- Axes: `Variant × Color × Ring × Language`, with the B1 combination rules:
  - `Count`: 7 colours × 2 `Ring` × 2 `Language` = 28
  - `Dot`: 6 colours (no `Warning`) × 2 `Ring`, `Language=EN` only = 12
  - `Check`: 5 colours (no `Error`, `Warning`) × 2 `Ring`, `Language=EN` only = 10
- Total **50 variants**. Defaults: `Count`, `Error`, `On`, `EN`; for `Check` instances set `Color=Success`.
- Grid of the raw set: rows = `Variant › Ring › Language`, columns = `Color`; gap `spacing/xl`.

#### D6 States, interactions and motion

No interactive states and no prototype interactions in the set. Doc page 04 shows Hidden → Visible and Visible → Hidden with `Doc/Motion row`, using the B4 durations and easing as written values.

#### D7 RTL

Method: `Language=AR` variants for `Count` (Arabic text style; digits stay Western, D-10, and `99+` keeps its order). The badge itself has no direction. Doc page 08 shows the placement mirror: anchored on the top-end corner in EN (top-right) and on the top-start corner in AR (top-left); `check-icon` never mirrored.

```
EN  ┌──────────┐(3)        AR  (3)┌──────────┐
    │  [✉]     │                  │     [✉]  │
    └──────────┘                  └──────────┘
```

#### D8 Documentation pages

Build the 12 standard pages (`_templates/component.md` D8 + `2-foundations/figma-doc-kit.md` › Page layouts) in section `Badge — Documentation` on `↳ Badge`, frames `Badge / 00 Component sheet` … `Badge / 11 Changelog` (version 1.1: page `10` shows F0), only from the Doc Kit. If the Doc Kit is not published, finish Phase 1 and report "docs waiting for Doc Kit".

Page notes for Badge:
- 01 Introduction: one Icon button (`mail`) with a `Count` badge, one with a `Dot`, one avatar stand-in (`Doc/Skeleton` circle until Avatar exists) with a `Check` badge; Light and Dark panels.
- 03 Variations: `Variant` row, `Color` row per variant (allowed colours only), `overlap` rectangular vs circular, standalone after a label (`Ring=Off`), `max` (`99+`).
- 04 States and motion: hidden → visible → hidden with B4 timings.
- 08 RTL: EN and AR anchored pairs (D7) and a standalone AR row: `الوارد (12)`.
- 09 Accessibility: the label read with the anchor (“Notifications, button, 3 unread messages”), contrast pairs (incl. the `Warning` fill on `color/icon/role/warning`, B3), why `Warning` is `Count` only (A4.2).
- 10 Changes from previous version: F0 (1.1).

Component description: "Marks an element with a count, a dot or a check (Check badge). Never interactive. Spec: 3-web-components/components/badge/badge.md".

## 9. Phase 2 — documentation pages and Components List card

### D8 Documentation pages

All 12 standard pages in section `Badge — Documentation` on `↳ Badge` in this file, built only from the Doc Kit, page notes as Web D8. 07 Platform: `Doc/Device frame` = Tablet, with the A8 example (navigation rail). 09 Accessibility: target-size overlay (`target-min` = 48) on the anchor, showing the badge does not change it.

Component description: "Marks an element with a count, a dot or a check (Check badge). Never interactive. Spec: 4-tablet-components/components/badge/badge.md".

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

`4-tablet-components/lib/src/components/badge/bw_badge.figma.dart` — `Variant` → `variant: BwBadgeVariant.*`, `Color` → `color: BwBadgeColor.*`, `Count` → `count`, `Ring=Off` → `child: null`. Publish after code and Figma reviews are both `Approved`.

## 11. Rules

All rules in **D1** (§8 and the inherited Web D1), plus:

**Component tokens only (strict, D-13).** This file may contain exactly one kind of local variable: the `<Component> / <Group>` collections in §2. Never create a local primitive or semantic variable or any other collection; never copy or detach a library variable; never create a local text, effect, colour or grid style; bind layers to the component token when one exists for the property. Run `_sync/figma-read-tokens.js` (lint) **before Phase 1 and after each phase** — it must report 0 violations.

## 12. Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Set `Badge` on `↳ Badge` in the Tablet file; structure and layer names as Web D2–D3
- [ ] F-AC-2 Properties as Web D4; 50 variants per D5
- [ ] F-AC-3 Zero raw values; zero local variables/styles (all from the Foundations library); `check-icon` is an Icon instance
- [ ] F-AC-4 Page Typography mode = `Tablet`; Light/Dark by mode only; AR count variants per D7
- [ ] F-AC-5 Values match the Tablet B2–B3 (redline every `Variant` with `Ring=On`)
- [ ] F-AC-6 Docs built (or reported blocked by the Doc Kit); Code Connect per D9 after approval

- [ ] F-AC-L1 Lint (`figma-read-tokens.js`) = 0 violations before Phase 1, after Phase 1 and after Phase 2 (outputs attached in D11)
- [ ] F-AC-L2 Every variable, style and component used comes from §2–§6 by key — no new local variables except component tokens, no local styles

## 13. When you finish

1. Fill [D11 Execution log](badge.md#d11-execution-log-filled-by-the-figma-agent) in `badge.md` (stages, node IDs of the set, docs section and pages, lint outputs, deviations, questions).
2. Set **Figma build** to `Built` in the header of `badge.md` and in `4-tablet-components/README.md`.
3. `npm run sync:done:tablet` — records this contract as built in the Tablet file.
4. Add one line to the root `CHANGELOG.md`.

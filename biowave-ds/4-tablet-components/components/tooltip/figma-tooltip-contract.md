<!-- GENERATED from tooltip.md @ 32e6a9e7011477c3 — do not edit; change the source and run: npm run contract -- tablet tooltip -->
# Tooltip · تلميح — Tablet — Figma contract

> **Everything the Figma Agent needs to build Tooltip in the Tablet Components file, with our variables and styles.** Read this file only. Generated from [`tooltip.md`](tooltip.md) (Parts A, B, D) and the Figma library index (`_sync/figma-library.json`, read 2026-10-18). Questions go to [D11 Execution log](tooltip.md#d11-execution-log-filled-by-the-figma-agent) — never invent.

**Two phases, one review:** Phase 1 — build the component set (§7–§8). Phase 2 — as soon as Phase 1 is finished, the 12 documentation pages and the Components List card (§9).

| | |
|---|---|
| Target file | **Biowave DS — Tablet Components** · key `KTlAsEow60qCiYyU3J90kp` · https://www.figma.com/design/KTlAsEow60qCiYyU3J90kp |
| Page | `↳ Tooltip` (one page per component) |
| Component | Tooltip · تلميح |
| Platform | Tablet · Flutter + Material 3 |
| Version | 1.0 · 2026-10-23 |
| Source | [`tooltip.md`](tooltip.md) @ `32e6a9e7011477c3` |

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
| `color-surface-inverse` | 1. Themes › `color/surface/inverse` | `364770c6a80914cb1d30c8afc1e354431dbb5f07` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-text-neutral-inverse` | 1. Themes › `color/text/neutral/inverse` | `83e1f6c6d7ddf8376b1bc5d0b9d5f6cd13b68e9b` | COLOR | TEXT_FILL | spec |
| `radius-sm` | 2. Radius › `radius/sm` | `44047be92c065ef35e4aa9ed6732645870ae38c9` | FLOAT | CORNER_RADIUS | spec |
| `size-container-xxs` | 4. Size › `size/container/xxs` | `8f6b24b58d8c1a4206dee923c88a2cb14caf031d` | FLOAT | WIDTH_HEIGHT | spec |
| `spacing-md` | 3. Spacing › `spacing/md` | `58c93e3cec1b6ba603371a027483e101adcef4f0` | FLOAT | WIDTH_HEIGHT, GAP | spec |
| `spacing-xs` | 3. Spacing › `spacing/xs` | `9ea993d003d5368c5100b038d51c7c8f3e95c115` | FLOAT | WIDTH_HEIGHT, GAP | spec |

Code-only tokens (no Figma variable by design — motion, layers): `motion-duration-2xl` · `motion-duration-instant` · `motion-duration-md` · `motion-duration-sm` · `motion-easing-standard-accelerate` · `motion-easing-standard-decelerate`. Use them only as written values in prototype settings and docs.

## 4. Text styles used (keys)

| Style | Key |
|---|---|
| `Web/en/label/sm` | `fc468e6e7206673886492c3f7f3c44dd1a9f8265` |
| `Web/ar/label/sm` | `fe9cb9594a1f874f420a34ff627a87bac9f91497` |

## 5. Effect styles used (keys)

None named in B/D.

## 6. Components to instance (keys)

Nested Biowave components (e.g. Button inside Split button) are instances of the sets **in this file** — build them first; never detach.

### Icons (keys) — Google · Material Symbols library (D-18)

Library file **Google · Material Symbols** · key `RXlnhYgUKBBE6HveEr7e9C` — must be enabled in this file. Import the set, then use the **Style=Rounded** variant (`Fill=Filled` only for selected states). Colour the glyph by binding its vector fills to the icon colour token of the part.

| Icon | Set key | Rounded (unfilled) | Rounded (filled) |
|---|---|---|---|
| `edit` | `47f86c39f6fbbb469725e7588206eb14a23c69f6` | `93286c7f439c043811484dccef5cad3ac0d2bee0` | `d4b89f22fb040445e4d2bfca5ebfc1e4bde47025` |
| `help` | `1a5ce5356055e28237bb66c81c0d787a00896698` | `e08b509b26ac62a48693567e87f8b43551150599` | `52dea679b06786ee7468b0429667b128e6f9b604` |

## 7. Phase 1 — values (from Part B)

### B1 API

### BwTooltip
| Param | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `message` | `String` | plain text (A6) | — | ✓ | The `label` part |
| `child` | `Widget` | the control the tooltip belongs to | — | ✓ | The `anchor` |
| `placement` | `BwTooltipPlacement` | `top` · `bottom` · `start` · `end` | `top` | | A4.1 — logical sides |
| `purpose` | `BwTooltipPurpose` | `label` · `description` | `label` | | A4.2 — how the text reaches assistive technology (B6) |
| `trigger` | `BwTooltipTrigger` | `longPress` · `tap` | `longPress` | | A4.3 (`long-press` · `tap`) |

Platform naming notes: web `title` = Flutter `message`; web `children` = Flutter `child`; A4.3 `long-press` = Dart `BwTooltipTrigger.longPress`. Web's controlled `open` / `onOpen` / `onClose` are not part of the Flutter API.

**Invalid combinations** (`assert` in debug, fallback in release):
| Combination | Fallback |
|---|---|
| `message` empty or whitespace only | assert "BwTooltip needs text"; release: returns `child` without a tooltip |

### B2 Dimensions

```
          spacing-md                     spacing-md
         ├──────────┤                   ├──────────┤
     ┬   ┌───────────────────────────────────────────┐
     │   │          Edit device                       │   radius-sm
     │   └───────────────────────────────────────────┘
     ┴   padding-block spacing-xs        max-width size-container-xxs
                       ↕ offset spacing-xs
                    [◆] anchor
```

| Part | Property | Token | Flutter |
|---|---|---|---|
| `container` | padding-block · padding-inline | `spacing-xs` · `spacing-md` | `EdgeInsetsDirectional.symmetric(horizontal: BwSpacing.md, vertical: BwSpacing.xs)` |
| `container` | radius | `radius-sm` | `BorderRadiusDirectional.all(Radius.circular(BwRadius.sm))` |
| `container` | width | hug the text · max `size-container-xxs` | `BoxConstraints(maxWidth: BwSize.containerXxs)` |
| `container` | border · shadow | none · none | — |
| `container` | gap to the anchor (offset) | `spacing-xs` | `BwSpacing.xs` |
| `container` | minimum distance to the screen edge | `spacing-md` | `BwSpacing.md` |
| `label` | text style | `label-sm` | `context.bw.text.labelSm` (Tablet scale, Arabic style from the locale) |
| `label` | alignment · wrapping | start-aligned · wraps at the max width, never truncated | `TextAlign.start`, no `maxLines` |

Layout rules: the tooltip is drawn in the `Overlay` above the page and never changes the anchor's size or layout. Centred on the anchor's cross axis for every placement. The tooltip respects the user's text scale (it wraps; the max width stays).

### B3 Tokens by part and state

Every value is a semantic token; there are no component tokens (P-04 — the same set as the Web Tooltip and Icon button B3.4).

| Part | Property | Shown | Entering / exiting |
|---|---|---|---|
| `container` | background | `color-surface-inverse` (`context.bw.colors.surfaceInverse`) | same, opacity animated (B4) |
| `label` | color | `color-text-neutral-inverse` (`context.bw.colors.textNeutralInverse`) | same |

Dark theme: same tokens — the values switch, so the tooltip is light on dark screens. No exceptions. The tooltip has no pressed, focus or disabled style of its own.

### B4 States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Hidden → Shown | long press (`trigger: longPress`) or tap (`trigger: tap`) on the anchor | opacity | `motion-duration-md` (`BwDuration.md`) | `motion-easing-standard-decelerate` (`BwEasing.standardDecelerate`) |
| Hidden → Shown | pointer hover for `motion-duration-2xl` (`BwDuration.xl2`, delay) — mouse or trackpad | opacity | `motion-duration-md` | `motion-easing-standard-decelerate` |
| Hidden → Shown | hardware-keyboard focus on the anchor — no delay | opacity | `motion-duration-md` | `motion-easing-standard-decelerate` |
| Shown → Hidden | after a touch: the framework display time after the finger lifts (no Biowave token) · tap elsewhere | opacity | `motion-duration-sm` (`BwDuration.sm`) | `motion-easing-standard-accelerate` (`BwEasing.standardAccelerate`) |
| Shown → Hidden | pointer leaves anchor and tooltip · focus moves away · Esc — no delay (`motion-duration-instant`) | opacity | `motion-duration-sm` | `motion-easing-standard-accelerate` |

Reduced motion (`context.bw.reduceMotion`): enter and exit use `BwDuration.instant` (no fade). The hover delay stays; a touch still opens at once.

### B5 RTL

```
LTR   placement: end    [◆] ┌ Edit device ┐
RTL   placement: end    ┌ تعديل الجهاز ┐ [◆]
```

| Part | In RTL |
|---|---|
| `placement` `start` / `end` | Follow `Directionality`: `start` is left of the anchor in LTR and right in RTL; `end` the opposite |
| `placement` `top` / `bottom` | Unchanged |
| `label` | `TextAlign.start` (right in RTL); Arabic text style from the locale |
| Flip when there is no room | To the opposite logical side |

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| `purpose: label` | The anchor's semantics node is named by `message`: `MergeSemantics(child: Semantics(label: message, child: child))`; `RawTooltip.semanticsTooltip: null`, so the text is read once |
| `purpose: description` | `RawTooltip.semanticsTooltip: message` — read after the anchor's own name |
| Dismissible | Esc (hardware keyboard) closes the tooltip; focus stays on the anchor. A tap elsewhere closes it |
| Hoverable · persistent | `ignorePointer: false`: a pointer can move onto the tooltip without it closing; no auto-hide while hovered or focused |
| Contrast | `textNeutralInverse` on `surfaceInverse` ≥ 4.5:1 in both themes (`textContrastGuideline`) |
| Focus | The anchor keeps its own focus ring; the tooltip is never focusable and adds no traversal stop |
| Haptics | Long press keeps the framework feedback (`enableFeedback: true`) |
| Screen reader output | `label`: "Edit device, button" · `description`: "Export, button, Exports this month's shifts as a CSV file." |

| Key (hardware keyboard) | Action |
|---|---|
| Tab / Shift+Tab | Moves focus to / from the anchor; the tooltip opens at once on focus and closes on blur |
| Esc | Closes the tooltip; focus stays on the anchor |
| Enter / Space | Belong to the anchor |

## 8. Phase 1 — build the component set (from Part D)

> Written by the Planner (Claude). Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> **One file per platform (D-12).** This file builds the Tablet set in **Biowave DS — Tablet Components**. Structure, layer tree and properties are the same as the [Web Part D](../../../3-web-components/components/tooltip/tooltip.md#d--figma-build) D2–D4 (one fact, one home); this file lists only what differs. Values come from the Tablet spec [Part B](#b--spec).

| Field | Value |
|---|---|
| Component | Tooltip |
| Platform | Tablet |
| Figma file | **Biowave DS — Tablet Components** (`_sync/figma-files.json` › `tablet`) |
| Page / section | `↳ Tooltip` › sections `Tooltip` and `Tooltip — Documentation` |
| Mode | **Create new.** No legacy Tooltip set |
| Depends on | Docs examples use the Icon Button set in this file as the anchor; if it is not built yet, finish Phase 1 and report those examples blocked in D11 |
| Plan version | 1 · 2026-10-23 |

### D1 Rules for this build

Same as [Web D1](../../../3-web-components/components/tooltip/tooltip.md#d1-rules-for-this-build) (library first, everything bound, no local variables or styles, no component tokens), plus:
- **Typography mode:** on page `↳ Tooltip` set the explicit variable mode **`Tablet`** for `5. Typography (EN)` and `6. Typography (AR)` (`page.setExplicitVariableModeForCollection`). Text styles stay `Web/{en|ar}/label/sm`; the mode gives the Tablet scale.

### D2 Component structure

As [Web D2–D4](../../../3-web-components/components/tooltip/tooltip.md#d2-component-structure), with these Tablet differences:
- Docs page 04 shows long press (and tap for a help icon) instead of hover as the main trigger; hover is noted for pointer use
- Docs page 07 uses `Doc/Device frame` Tablet landscape + Tablet portrait, with a navigation-rail example for `placement=end`

### D3 Layer tree and auto layout

As [Web D3](../../../3-web-components/components/tooltip/tooltip.md#d3-layer-tree-and-auto-layout), with the Tablet differences listed in D2.

### D4 Properties

As [Web D4](../../../3-web-components/components/tooltip/tooltip.md#d4-properties); code props map to `BwTooltip` (`Label` → `message`).

### D5 Variants to generate

As Web D5: `Language` × 2 = **2** variants.

### D6 States, interactions and motion

As Web D6, with the Tablet triggers from B4.

### D7 RTL

As Web D7 (`Language=AR` variant; docs page 08 shows `start` / `end` in EN and AR).

### Inherited from Web (D1, D2, D3, D4, D5, D6, D7, D8)

The Tablet Part D refers to these Web sections; they are copied here so you read one file. Apply the Tablet differences above on top.

#### D1 Rules for this build

Same as [Button D1](../button/button.md#d1-rules-for-this-build): library first, every value bound, no local variables or styles. Tooltip has **no component tokens** (P-04), so bind directly to the Foundations library variables listed in the contract (§3); `figma-read-tokens.js` lint must still report 0.
- Text uses the published text styles `Web/{en|ar}/label/sm` (EN variant → `en`, AR variant → `ar`).
- No effect style (no shadow) and no stroke.

#### D2 Component structure

```
❖ Tooltip                 ← published component set (Language)
```

#### D3 Layer tree and auto layout

```
Tooltip                  ↔ horizontal · pad-inline {B2 spacing/md} · pad-block {B2 spacing/xs}
│                          width: hug · max width {B2 size/container/xxs} · height: hug
│                          radius {B2 radius/sm} · fill {B3 color/surface/inverse} · no stroke · no effect
└── label                T text style Web/{en|ar}/label/sm · fill {B3 color/text/neutral/inverse}
                           TEXT `Label` · width: fill (wraps at the max width) · align start · no truncation
```

Wireframe of the result (LTR):

```
┌───────────────────────┐
│ Edit device            │
└───────────────────────┘
   ①   ②
```

#### D4 Properties

| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `Label` | TEXT | | `Edit device` | `title` | the text |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | Figma only; code takes language and direction from the provider |

`placement` and `purpose` are not Figma properties: placement has no visual difference on the tooltip itself (no arrow) and purpose is semantics only. Docs page 03 shows the four placements next to an anchor.

#### D5 Variants to generate

- Axes: `Language` = **2** variants (`Language=EN` with `Edit device`, `Language=AR` with `تعديل الجهاز`)
- No `State` axis (no hover, pressed, focus or disabled style on the tooltip), no `Direction` axis (the `Language` variant carries it)
- Grid of the raw set: one row, `EN` then `AR`; gap `spacing/xl`

#### D6 States, interactions and motion

No prototype interactions on the set. Docs page 04 shows the B4 table with `Doc/Motion row` (hover delay, enter fade, exit fade, reduced motion) and two frames: anchor alone, anchor with the tooltip shown.

#### D7 RTL

Method: the `Language=AR` variant. Text aligned start (right), Arabic copy from A6. Nothing mirrors inside the tooltip. Docs page 08 shows `placement=start` and `end` in EN and AR next to an Icon Button anchor (the tooltip changes side, the glyph does not mirror).

```
LTR   [◆] ┌ Edit device ┐            placement=end
RTL   ┌ تعديل الجهاز ┐ [◆]            placement=end
```

#### D8 Documentation pages

All 12 standard pages (template D8 + [`2-foundations/figma-doc-kit.md` › Page layouts](../../../2-foundations/figma-doc-kit.md#page-layouts)) in section `Tooltip — Documentation`, frames `Tooltip / 00 Component sheet` … `Tooltip / 11 Changelog` (skip `10`, version 1.0). Built only from the Doc Kit; if it is missing, finish Phase 1 and report "docs waiting for Doc Kit".

Page notes for Tooltip:
- 01 Introduction: Light + Dark panels, each with an Icon Button anchor and its tooltip shown above
- 03 Variations: `placement` (four positions around one anchor), `purpose` (label on an Icon Button, description on a Button), long text wrapping at the max width (EN and AR)
- 05 Usage: the A7 pairs, built with live instances
- 07 Platform: Desktop frame; hover and keyboard focus notes from A8
- 09 Accessibility: reading order example for `label` vs `description`, Esc note, contrast pair

Component description: "Short text that names an icon-only control or adds a one-line hint. Plain text only. Spec: 3-web-components/components/tooltip/tooltip.md".

## 9. Phase 2 — documentation pages and Components List card

### D8 Documentation pages

All 12 standard pages (template D8 + `2-foundations/figma-doc-kit.md` › Page layouts) in section `Tooltip — Documentation` on `↳ Tooltip` in this file, built only from the Doc Kit; blocked until the Doc Kit exists. Page notes as Web D8 with the D2 differences.

Component description: "Short text that names an icon-only control or adds a one-line hint. Plain text only. Spec: 4-tablet-components/components/tooltip/tooltip.md".

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

`4-tablet-components/lib/src/components/tooltip/bw_tooltip.figma.dart` — `Label` → `message`. Publish after the code and Figma reviews are both `Approved`.

## 11. Rules

All rules in **D1** (§8 and the inherited Web D1), plus:

**Component tokens only (strict, D-13).** This file may contain exactly one kind of local variable: the `<Component> / <Group>` collections in §2. Never create a local primitive or semantic variable or any other collection; never copy or detach a library variable; never create a local text, effect, colour or grid style; bind layers to the component token when one exists for the property. Run `_sync/figma-read-tokens.js` (lint) **before Phase 1 and after each phase** — it must report 0 violations.

## 12. Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Set on `↳ Tooltip` in the Tablet file; structure and layer names as Web D2–D3
- [ ] F-AC-2 Properties as Web D4; variant count 2 (D5)
- [ ] F-AC-3 Zero raw values; zero local variables/styles (all from the Foundations library)
- [ ] F-AC-4 Page Typography mode = `Tablet`; Light/Dark by mode only; Arabic wraps without truncation
- [ ] F-AC-5 Values match the Tablet B2–B3 (redline)
- [ ] F-AC-6 Docs built per D8 (or reported blocked by the Doc Kit); Code Connect per D9 after approval

- [ ] F-AC-L1 Lint (`figma-read-tokens.js`) = 0 violations before Phase 1, after Phase 1 and after Phase 2 (outputs attached in D11)
- [ ] F-AC-L2 Every variable, style and component used comes from §2–§6 by key — no new local variables except component tokens, no local styles

## 13. When you finish

1. Fill [D11 Execution log](tooltip.md#d11-execution-log-filled-by-the-figma-agent) in `tooltip.md` (stages, node IDs of the set, docs section and pages, lint outputs, deviations, questions).
2. Set **Figma build** to `Built` in the header of `tooltip.md` and in `4-tablet-components/README.md`.
3. `npm run sync:done:tablet` — records this contract as built in the Tablet file.
4. Add one line to the root `CHANGELOG.md`.

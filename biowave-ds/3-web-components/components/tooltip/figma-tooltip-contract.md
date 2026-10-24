<!-- GENERATED from tooltip.md @ 5b8c705a77675822 — do not edit; change the source and run: npm run contract -- web tooltip -->
# Tooltip · تلميح — Web — Figma contract

> **Everything the Figma Agent needs to build Tooltip in the Web Components file, with our variables and styles.** Read this file only. Generated from [`tooltip.md`](tooltip.md) (Parts A, B, D) and the Figma library index (`_sync/figma-library.json`, read 2026-10-18). Questions go to [D11 Execution log](tooltip.md#d11-execution-log-filled-by-the-figma-agent) — never invent.

**Two phases, one review:** Phase 1 — build the component set (§7–§8). Phase 2 — as soon as Phase 1 is finished, the 12 documentation pages and the Components List card (§9).

| | |
|---|---|
| Target file | **Biowave DS — Web Components** · key `7nDhsPNntzIWlrjmuSmZ9l` · https://www.figma.com/design/7nDhsPNntzIWlrjmuSmZ9l |
| Page | `↳ Tooltip` (one page per component) |
| Component | Tooltip · تلميح |
| Platform | Web · React + MUI |
| Version | 1.1 · 2026-10-24 |
| Source | [`tooltip.md`](tooltip.md) @ `5b8c705a77675822` |

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

Code-only tokens (no Figma variable by design — motion, layers): `layer-tooltip` · `motion-duration-2xl` · `motion-duration-instant` · `motion-duration-md` · `motion-duration-sm` · `motion-easing-standard-accelerate` · `motion-easing-standard-decelerate`. Use them only as written values in prototype settings and docs.

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

No icon named in this spec. Icons come only from the Google · Material Symbols library (Style=Rounded).

## 7. Phase 1 — values (from Part B)

### B1 API

### Tooltip
| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `title` | `string` | plain text (A6) | — | ✓ | The `label` part. MUI's prop name |
| `children` | `ReactElement` | one element that accepts a `ref` and DOM event props (Button, Icon button, a focusable element) | — | ✓ | The `anchor` |
| `placement` | enum | `top` · `bottom` · `start` · `end` | `top` | | A4.1 — logical sides |
| `purpose` | enum | `label` · `description` | `label` | | A4.2 — how the text reaches assistive technology (B6) |
| `open` | `boolean` | | — | | Controlled mode (MUI name). When set, the consumer owns showing and hiding |
| `onOpen` · `onClose` | `(event) => void` | | — | | Called when the tooltip asks to open / close (MUI names) |

Platform naming notes: A4.3 `trigger` is touch only and has no web prop (web always opens on hover and keyboard focus). MUI's physical `placement` values (`left`, `right`, `top-start` …), `arrow`, `followCursor`, `describeChild`, `disableInteractive`, `enterDelay`, `leaveDelay` and `slotProps` are not part of the public API.

**Invalid combinations** (`console.warn` once in development via the shared `warnOnce`, then the fallback):
| Combination | Fallback |
|---|---|
| `title` empty or whitespace only | Warns "Tooltip needs text"; renders `children` without a tooltip |
| `purpose="label"` and the child already has `aria-label` or `aria-labelledby` | Warns "Tooltip purpose label on a named element — use description"; the child's own name wins, the tooltip text is not added as a name |

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

| Part | Property | Value |
|---|---|---|
| `container` | padding-block · padding-inline | `spacing-xs` · `spacing-md` |
| `container` | radius | `radius-sm` |
| `container` | width | hug the text · max `size-container-xxs` |
| `container` | border · shadow | none · none (the inverse surface gives the contrast) |
| `container` | gap to the anchor (offset) | `spacing-xs` — (1.1) inside the tooltip's hover area, so the pointer never leaves the tooltip's hit box on its way from the anchor (B6 hoverable) |
| `container` | minimum distance to the viewport edge | `spacing-md` |
| `container` | stacking | `layer-tooltip` (MUI theme `zIndex.tooltip`, already set from this token) |
| `label` | text style | `label-sm` (`biowaveVariants.labelSm`; Arabic line height from the locale) |
| `label` | alignment · wrapping | start-aligned · wraps at the max width, never truncated |

Layout rules: the tooltip renders in a portal above all page content and never changes the anchor's size or layout. Centred on the anchor's cross axis for every placement.

### B3 Tokens by part and state

Every value is a semantic token; there are no component tokens (P-04 — the same set Icon button B3.4 uses for its temporary tooltip, plus the max width).

| Part | Property | Shown | Entering / exiting |
|---|---|---|---|
| `container` | background | `color-surface-inverse` | same, with opacity animated (B4) |
| `label` | color | `color-text-neutral-inverse` | same |

Dark theme: same tokens — the values switch, so the tooltip is light on dark pages. No exceptions. There is no hover, pressed, focus or disabled style on the tooltip itself; the anchor keeps its own states.

### B4 States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Hidden → Shown | pointer rests on the anchor for `motion-duration-2xl` (delay) | opacity | `motion-duration-md` | `motion-easing-standard-decelerate` |
| Hidden → Shown | keyboard focus (`:focus-visible`) on the anchor — no delay | opacity | `motion-duration-md` | `motion-easing-standard-decelerate` |
| Shown → Shown | pointer moves from the anchor across the `spacing-xs` gap onto the tooltip, at any speed (1.1) | — (stays open, hoverable) | — | — |
| Shown → Hidden | pointer leaves anchor and tooltip · blur · Esc — no delay | opacity | `motion-duration-sm` | `motion-easing-standard-accelerate` |

Reduced motion (`prefers-reduced-motion: reduce`): enter and exit use `motion-duration-instant` (no fade). The hover delay `motion-duration-2xl` stays; keyboard focus still opens at once.

Touch input on web: MUI's built-in long-press handling stays unchanged (Biowave has no token for a touch hold or display time).

### B5 RTL

```
LTR   placement="end"    [◆] ┌ Edit device ┐
RTL   placement="end"    ┌ تعديل الجهاز ┐ [◆]
```

| Part | In RTL |
|---|---|
| `placement` `start` / `end` | Follow the reading direction: `start` is left of the anchor in LTR and right in RTL; `end` the opposite |
| `placement` `top` / `bottom` | Unchanged |
| `label` | Start-aligned (right in RTL); Arabic text style from the provider locale |
| Flip when there is no room | To the opposite logical side |

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role / semantics | Tooltip element `role="tooltip"` with a stable id (MUI). Never focusable; no interactive content |
| `purpose="label"` | The anchor gets `aria-label={title}` (MUI `describeChild={false}`). A disabled anchor is wrapped in a `span` that carries **no** `aria-label`; the name goes on the disabled element itself (same rule as Icon button B6) |
| `purpose="description"` | The anchor gets `aria-describedby` pointing to an element that always exists (visually hidden copy of `title` while closed, the tooltip while open). No native `title` attribute on the anchor, ever (it would show a second, unstyled browser tooltip) |
| Dismissible | Esc closes the open tooltip; focus stays on the anchor (WCAG 1.4.13) |
| Hoverable · persistent | Pointer can move onto the tooltip without it closing; it stays until pointer leave, blur or Esc (no auto-hide timer). (1.1) The `spacing-xs` gap between anchor and tooltip belongs to the popper element, which carries MUI's interactive hover listeners, so a pointer moving slowly from the anchor never passes through an area that is outside both (C3 › Offset). `leaveDelay` stays 0 |
| Contrast | `color-text-neutral-inverse` on `color-surface-inverse` ≥ 4.5:1 in both themes |
| Focus | The anchor keeps its own focus ring; the tooltip adds none |
| Screen reader output | `label`: "Edit device, button" · `description`: "Work email, edit text, We send shift reminders to this address." |

| Key | Action |
|---|---|
| Tab / Shift+Tab | Moves focus to / from the anchor; the tooltip opens at once on focus and closes on blur |
| Esc | Closes the tooltip; focus stays on the anchor |
| Enter / Space | Belong to the anchor (the tooltip does not handle them) |

## 8. Phase 1 — build the component set (from Part D)

> Written by the Planner (Claude) together with Part C. Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> Values come from the spec [Part B](#b--spec) B2–B4; never write values here.
> **One file per platform (D-12).** Builds the Web set in **Biowave DS — Web Components**.

| Field | Value |
|---|---|
| Component | Tooltip |
| Figma file | **Biowave DS — Web Components** (`_sync/figma-files.json` › `web`) — never the Foundations file |
| Page / section | `↳ Tooltip` › sections `Tooltip` and `Tooltip — Documentation` |
| Mode | **Create new.** No legacy Tooltip set to keep |
| Depends on | Docs examples (pages 03, 04, 08, 09) use the Icon Button set in this file as the anchor; if it is not built yet, finish Phase 1 and report those examples blocked in D11 |
| Plan version | 1 · 2026-10-23 |

### D1 Rules for this build

Same as [Button D1](../button/button.md#d1-rules-for-this-build): library first, every value bound, no local variables or styles. Tooltip has **no component tokens** (P-04), so bind directly to the Foundations library variables listed in the contract (§3); `figma-read-tokens.js` lint must still report 0.
- Text uses the published text styles `Web/{en|ar}/label/sm` (EN variant → `en`, AR variant → `ar`).
- No effect style (no shadow) and no stroke.

### D2 Component structure

```
❖ Tooltip                 ← published component set (Language)
```

### D3 Layer tree and auto layout

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

### D4 Properties

| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `Label` | TEXT | | `Edit device` | `title` | the text |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | Figma only; code takes language and direction from the provider |

`placement` and `purpose` are not Figma properties: placement has no visual difference on the tooltip itself (no arrow) and purpose is semantics only. Docs page 03 shows the four placements next to an anchor.

### D5 Variants to generate

- Axes: `Language` = **2** variants (`Language=EN` with `Edit device`, `Language=AR` with `تعديل الجهاز`)
- No `State` axis (no hover, pressed, focus or disabled style on the tooltip), no `Direction` axis (the `Language` variant carries it)
- Grid of the raw set: one row, `EN` then `AR`; gap `spacing/xl`

### D6 States, interactions and motion

No prototype interactions on the set. Docs page 04 shows the B4 table with `Doc/Motion row` (hover delay, enter fade, exit fade, reduced motion) and two frames: anchor alone, anchor with the tooltip shown.

### D7 RTL

Method: the `Language=AR` variant. Text aligned start (right), Arabic copy from A6. Nothing mirrors inside the tooltip. Docs page 08 shows `placement=start` and `end` in EN and AR next to an Icon Button anchor (the tooltip changes side, the glyph does not mirror).

```
LTR   [◆] ┌ Edit device ┐            placement=end
RTL   ┌ تعديل الجهاز ┐ [◆]            placement=end
```

## 9. Phase 2 — documentation pages and Components List card

### D8 Documentation pages

All 12 standard pages (template D8 + [`2-foundations/figma-doc-kit.md` › Page layouts](../../../2-foundations/figma-doc-kit.md#page-layouts)) in section `Tooltip — Documentation`, frames `Tooltip / 00 Component sheet` … `Tooltip / 11 Changelog` (skip `10`, version 1.0). Built only from the Doc Kit; if it is missing, finish Phase 1 and report "docs waiting for Doc Kit".

Page notes for Tooltip:
- 01 Introduction: Light + Dark panels, each with an Icon Button anchor and its tooltip shown above
- 03 Variations: `placement` (four positions around one anchor), `purpose` (label on an Icon Button, description on a Button), long text wrapping at the max width (EN and AR)
- 05 Usage: the A7 pairs, built with live instances
- 07 Platform: Desktop frame; hover and keyboard focus notes from A8
- 09 Accessibility: reading order example for `label` vs `description`, Esc note, contrast pair

Component description: "Short text that names an icon-only control or adds a one-line hint. Plain text only. Spec: 3-web-components/components/tooltip/tooltip.md".

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

- File: `3-web-components/src/components/tooltip/Tooltip.figma.tsx`
- Mapping: D4 (`Label` → `title`). Publish after the code and Figma reviews are both `Approved`.

## 11. Rules

All rules in **D1** (§8), plus:

**Component tokens only (strict, D-13).** This file may contain exactly one kind of local variable: the `<Component> / <Group>` collections in §2. Never create a local primitive or semantic variable or any other collection; never copy or detach a library variable; never create a local text, effect, colour or grid style; bind layers to the component token when one exists for the property. Run `_sync/figma-read-tokens.js` (lint) **before Phase 1 and after each phase** — it must report 0 violations.

## 12. Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Component set `Tooltip` and layer names match D2–D3 and A2
- [ ] F-AC-2 Properties match D4 exactly (names, types, values, defaults)
- [ ] F-AC-3 Variant count = 2 (D5)
- [ ] F-AC-4 Zero raw values: fill, padding, radius, max width and text bound (QA lint report attached)
- [ ] F-AC-5 Correct in Light and Dark (variable mode switch only)
- [ ] F-AC-6 AR variant per D7; Arabic copy wraps without truncation
- [ ] F-AC-7 Component description filled; no prototype interactions on the set (D6)
- [ ] F-AC-8 Values match B2–B3 one by one (redline check)
- [ ] F-AC-9 Every documentation page in D8 exists, in order, built only from Doc Kit components with live instances (or reported blocked in D11)

- [ ] F-AC-L1 Lint (`figma-read-tokens.js`) = 0 violations before Phase 1, after Phase 1 and after Phase 2 (outputs attached in D11)
- [ ] F-AC-L2 Every variable, style and component used comes from §2–§6 by key — no new local variables except component tokens, no local styles

## 13. When you finish

1. Fill [D11 Execution log](tooltip.md#d11-execution-log-filled-by-the-figma-agent) in `tooltip.md` (stages, node IDs of the set, docs section and pages, lint outputs, deviations, questions).
2. Set **Figma build** to `Built` in the header of `tooltip.md` and in `3-web-components/README.md`.
3. `npm run sync:done:web` — records this contract as built in the Web file.
4. Add one line to the root `CHANGELOG.md`.

<!-- GENERATED from split-button.md @ e62483d2e8268884 — do not edit; change the source and run: npm run contract -- web split-button -->
# Split button · زر مقسّم — Web — Figma contract

> **Everything the Figma Agent needs to build Split button in the Web Components file, with our variables and styles.** Read this file only. Generated from [`split-button.md`](split-button.md) (Parts A, B, D) and the Figma library index (`_sync/figma-library.json`, read 2026-10-18). Questions go to [D11 Execution log](split-button.md#d11-execution-log-filled-by-the-figma-agent) — never invent.

**Two phases, one review:** Phase 1 — build the component set (§7–§8). Phase 2 — as soon as Phase 1 is finished, the 12 documentation pages and the Components List card (§9).

| | |
|---|---|
| Target file | **Biowave DS — Web Components** · key `7nDhsPNntzIWlrjmuSmZ9l` · https://www.figma.com/design/7nDhsPNntzIWlrjmuSmZ9l |
| Page | `↳ Split button` (one page per component) |
| Component | Split button · زر مقسّم |
| Platform | Web · React + MUI |
| Version | 1.0 · 2026-10-16 |
| Source | [`split-button.md`](split-button.md) @ `e62483d2e8268884` |

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
| `color-border-focus` | 1. Themes › `color/border/focus` | `ef666d3badd2b63f18cb168d9987ead7fbc21480` | COLOR | STROKE_COLOR | spec |
| `color-icon-neutral-subtle` | 1. Themes › `color/icon/neutral/subtle` | `fc66c13d6c036489bf774535cd8dbbf749795748` | COLOR | SHAPE_FILL, STROKE_COLOR | spec |
| `color-overlay-hover` | 1. Themes › `color/overlay/hover` | `aa2655bb098fde1c03c1b3c143cb22c435402789` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-overlay-pressed` | 1. Themes › `color/overlay/pressed` | `8910a028526424e788cdae6f511506ebb855ab37` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-surface-raised` | 1. Themes › `color/surface/raised` | `92b71ada5e0cffef4eec84e17092c1f3d81da69f` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-text-neutral-default` | 1. Themes › `color/text/neutral/default` | `4ea63d9ab5254c4df4eba4d26f771377a07929c4` | COLOR | TEXT_FILL | spec |
| `color-text-neutral-disabled` | 1. Themes › `color/text/neutral/disabled` | `f88c10f90f454d356c14cc3240da0f04eafbbedd` | COLOR | TEXT_FILL | spec |
| `radius-lg` | 2. Radius › `radius/lg` | `bb2122acd11d99ba9396f13390d02b70941a6cfa` | FLOAT | CORNER_RADIUS | spec |
| `radius-md` | 2. Radius › `radius/md` | `0758e506cdfd4d7a4eef6369a4851133d7eab5a4` | FLOAT | CORNER_RADIUS | spec |
| `radius-xs` | 2. Radius › `radius/xs` | `213fc023e86a88779565677e47c64a4dea40c260` | FLOAT | CORNER_RADIUS | spec |
| `size-control-height-md` | 4. Size › `size/control/height/md` | `cb6d23a09de76b9cea37c24579dbb2a9e6e6a079` | FLOAT | WIDTH_HEIGHT | spec |
| `spacing-control-gap-md` | 3. Spacing › `spacing/control/gap/md` | `e2e6fc01e3a1245e8c3584798b5d224742a9a6bc` | FLOAT | WIDTH_HEIGHT, GAP | spec |
| `spacing-control-padding-inline-md` | 3. Spacing › `spacing/control/padding-inline/md` | `ece071c90fd7557c56f2a8918944c46d2672718e` | FLOAT | WIDTH_HEIGHT, GAP | spec |
| `spacing-xs` | 3. Spacing › `spacing/xs` | `9ea993d003d5368c5100b038d51c7c8f3e95c115` | FLOAT | WIDTH_HEIGHT, GAP | spec |
| `spacing-xxs` | 3. Spacing › `spacing/xxs` | `e772baca3a3110208bb2791461b6659a6d6e9ba8` | FLOAT | WIDTH_HEIGHT, GAP | spec |

Code-only tokens (no Figma variable by design — motion, layers): `elevation-3` · `motion-duration-md` · `motion-duration-sm` · `motion-easing-standard-accelerate` · `motion-easing-standard-decelerate`. Use them only as written values in prototype settings and docs.

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
| `expand_more` | `267ced323de796ae4f53245aaa13fb0ed7d0f310` | `7614dc418009adcc275d35ff07afcb7b4f62b1fd` | `c18d6c2b6b894f64a7fd0981b1168b638f45c91f` |

## 7. Phase 1 — values (from Part B)

### B1 API

### SplitButton
| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `children` | string | | — | ✓ | `primary-action` label |
| `onClick` | `(e) => void` | | — | ✓ | Runs the primary action |
| `options` | `SplitButtonOption[]` | 2–5 items | — | ✓ | Menu items (below) |
| `variant` | enum | `filled` · `tonal` · `outlined` | `filled` | | A4.1 |
| `color` | enum | `brand` · `secondary` · `neutral` | `brand` | | A4.2 |
| `size` | enum | `sm` · `md` · `lg` | `md` | | A4.3 |
| `startIcon` | `ReactNode` | | — | | On the primary action |
| `loading` · `loadingLabel` | | | `false` | | Primary action loading; trigger disabled meanwhile |
| `disabled` | boolean | | `false` | | Disables both parts |
| `menuLabel` | string | | "More options for {children}" / "خيارات أخرى لـ{children}" | | Trigger accessible name |
| `open` · `onOpenChange` | boolean · `(open) => void` | | uncontrolled | | Optional control of the menu |

`SplitButtonOption = { label: string; onSelect: () => void; icon?: ReactNode; disabled?: boolean }`

**Invalid combinations** (dev warning + fallback):
| Combination | Fallback |
|---|---|
| `variant="tonal"` with `neutral` | `outlined` |
| fewer than 2 or more than 5 `options` | renders, warns |
| an option label equal to `children` | renders, warns "Don't repeat the primary action in the menu" |

### B2 Dimensions

```
  radius-md                    radius-xs │ │ radius-xs          radius-md
  ┌──────────────────────────────────┐   ┌────────┐
  │ [◆]  Export report               │   │  [⌄]   │   both: size-control-height-md
  └──────────────────────────────────┘   └────────┘
                                    ├──┤ spacing-xxs
```

| Part | Property | Value |
|---|---|---|
| `container` | layout · gap | inline-flex · `spacing-xxs` |
| `primary-action` | everything | Button of the same `variant`, `color`, `size` ([Button B2](../button/button.md#b2-dimensions)), except: radius start corners `radius-md`, end corners `radius-xs` |
| `menu-trigger` | everything | IconButton of the same `variant`, `color`, `size` ([Icon button B2](../icon-button/icon-button.md#b2-dimensions)), except: start corners `radius-xs`, end corners `radius-md`; icon `expand_more` |
| `menu` (temporary) | min-width · background · elevation · radius | width of `container` · `color-surface-raised` · `elevation-3` · `radius-lg` |
| `menu` item | height · padding-inline · gap · text style · text color | `size-control-height-md` · `spacing-control-padding-inline-md` · `spacing-control-gap-md` · `body-md` · `color-text-neutral-default` |
| `menu` | offset from container | `spacing-xs` |

### B3 Tokens by part and state

- `primary-action`: [Button B3](../button/button.md#b3-tokens-by-part-and-state) for the same `variant` × `color`.
- `menu-trigger`: [Icon button B3.1](../icon-button/icon-button.md#31-unselected); **Expanded** = its Pressed tokens.
- `menu` item: hover `color-overlay-hover`, pressed `color-overlay-pressed`, focus (keyboard) `color-overlay-hover` + `color-border-focus` inner ring, disabled `color-text-neutral-disabled`; icon `color-icon-neutral-subtle`.

### B4 States and transitions

Each part: [Button B4](../button/button.md#b4-states-and-transitions). Plus:
| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Collapsed → Expanded | trigger click · Enter · Space · ArrowDown/Up | chevron rotates half a turn; menu fades + scales in from the top-end | `motion-duration-md` | `motion-easing-standard-decelerate` |
| Expanded → Collapsed | item chosen · Esc · click outside · Tab | chevron back; menu fades out | `motion-duration-sm` | `motion-easing-standard-accelerate` |

Reduced motion: instant (no rotation animation; chevron still shows its final direction).

### B5 RTL

```
LTR  │ [◆] Export report │ │ [⌄] │        menu aligned to the inline end
RTL  │ [⌄] │ │ تصدير التقرير [◆] │
```
| Part | In RTL |
|---|---|
| layout, corner radii | Mirror (logical `border-start-start-radius` … ) |
| `expand_more` chevron | Does not mirror (points down) |
| `menu` | Anchored `bottom-end` (logical), so it opens toward the inline start |

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Structure | `<div role="group" aria-label={children}>` containing two buttons |
| Trigger | `aria-label={menuLabel}`, `aria-haspopup="menu"`, `aria-expanded`, `aria-controls={menuId}` |
| Menu | `role="menu"`, items `role="menuitem"`; focus moves into the menu on open, returns to the trigger on close |
| Loading | Primary as Button B6; trigger `disabled` while loading |
| Focus ring | Per part, as Button B6 |

| Key (focus on trigger) | Action |
|---|---|
| Enter / Space / ArrowDown | Open, focus first item |
| ArrowUp | Open, focus last item |

| Key (focus in menu) | Action |
|---|---|
| ArrowDown / ArrowUp | Next / previous item (wraps) |
| Home / End | First / last item |
| Enter / Space | Choose item, close, run `onSelect` |
| Esc | Close, focus trigger |
| Tab | Close, move focus on |

## 8. Phase 1 — build the component set (from Part D)

> Executed by the **Figma Agent**. Values from the spec [Part B](#b--spec); never written here. **One file per platform (D-12)**: builds the Web set in **Biowave DS — Web Components**.

| Field | Value |
|---|---|
| Component | Split button |
| Figma file | **Biowave DS — Web Components** (`_sync/figma-files.json` › `web`) |
| Page / section | `↳ Split Button` |
| Mode | **Create new.** Legacy reference (read only): Foundations file › `↳ Split Button` › `Split Button/EN` `4298:3591`, `Split Button/AR` `4298:3881` |
| Depends on | Button and Icon button (Web) `Built` in the same file |
| Plan version | 1 · 2026-10-16 |

### D1 Rules for this build

Same as [Button D1](../button/button.md#d1-rules-for-this-build). The two parts **must be instances** of `Button` and `Icon Button` (rule 6), with only their corner radii overridden (bound to `radius/xs` on the inner corners).

### D2 Component structure

```
❖ Split Button         ← published set
   contains instances of ❖ Button and ❖ Icon Button — no own drawing
```

### D3 Layer tree and auto layout

```
Split Button            ↔ horizontal · gap spacing/xxs · hug
├── primary-action      ◇ Button instance · Variant/Color/Size/Language follow the set · inner corners radius/xs · exposed: Label, Leading icon, Leading icon glyph
└── menu-trigger        ◇ Icon Button instance · same Variant/Color/Size · inner corners radius/xs · Icon = expand_more · Tooltip label = "More options"
```

**Icons used:** `expand_more` — menu trigger chevron, Google · Material Symbols Rounded (D-18)

### D4 Properties

| Figma property | Type | Values | Default | Code prop (web) |
|---|---|---|---|---|
| `Variant` | VARIANT | `Filled` · `Tonal` · `Outlined` | `Filled` | `variant` |
| `Color` | VARIANT | `Brand` · `Secondary` · `Neutral` | `Brand` | `color` |
| `Size` | VARIANT | `SM` · `MD` · `LG` | `MD` | `size` |
| `State` | VARIANT | `Default` · `Primary hover` · `Primary pressed` · `Trigger hover` · `Expanded` · `Focused primary` · `Focused trigger` · `Disabled` · `Loading` | `Default` | `disabled` / `loading`; others interaction only |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — |
| `Label` | TEXT (nested, exposed) | | `Export report` | `children` |
| `Leading icon` · `Leading icon glyph` | BOOLEAN · INSTANCE_SWAP (nested, exposed) | | `false` | `startIcon` |

### D5 Variants to generate

Allowed `Variant × Color`: Filled/Outlined × 3 + Tonal × 2 = 8 × 3 sizes × 9 states × 2 languages = **432**.

### Legacy mapping (legacy sets are not edited)
| Legacy | New |
|---|---|
| `Type` Brand · Secondary · Neutral · Default | `Color` Brand · Secondary · Neutral (`Default` ≈ `Neutral`, report) |
| `Type` Success · Error · Warning · Info | removed |
| `State=Ghost` | `Variant=Outlined` (verify visually) |
| `Show Menu Buttons` + embedded menu | removed (Menu component) |
| `Size` SM · M · XL | `SM` · `MD` · `LG` |
| `/EN` · `/AR` sets | `Language` EN · AR |

### After `Approved`
Report instances of `4298:3591` / `4298:3881` in the Foundations file; move them to `_Deprecation Ground` once product files use the new library.

### D6 States, interactions and motion

Primary part hover/press, trigger hover/press as their own components. On click trigger → `Expanded` (smart animate `motion-duration-md`, chevron rotation). A docs-only prototype frame shows the open menu using a placeholder list until Menu exists.

### D7 RTL

`Language=AR`: reverse order (trigger first in the auto layout), inner/outer radii swap sides, Arabic label. Chevron not mirrored.

## 9. Phase 2 — documentation pages and Components List card

### D8 Documentation pages

12 standard pages in `Split Button — Documentation`; blocked until the Doc Kit. 05 Usage: "don't repeat the primary action" pair. 09 Accessibility: two focus stops, keyboard table.

Component description: "Main action plus a menu of related alternatives. Spec: 3-web-components/components/split-button/split-button.md".

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

`3-web-components/src/components/split-button/SplitButton.figma.tsx` — mapping D4; `options` documented as an example array.

## 11. Rules

All rules in **D1** (§8), plus:

**Component tokens only (strict, D-13).** This file may contain exactly one kind of local variable: the `<Component> / <Group>` collections in §2. Never create a local primitive or semantic variable or any other collection; never copy or detach a library variable; never create a local text, effect, colour or grid style; bind layers to the component token when one exists for the property. Run `_sync/figma-read-tokens.js` (lint) **before Phase 1 and after each phase** — it must report 0 violations.

## 12. Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Parts are instances of Button / Icon Button (no detached or drawn parts)
- [ ] F-AC-2 Properties D4 exactly; F-AC-3 432 variants
- [ ] F-AC-4 Zero raw values; F-AC-5 Light/Dark by mode
- [ ] F-AC-6 AR per D7; F-AC-7 zero local variables/styles; legacy mapping in the review
- [ ] F-AC-8 Docs built or reported blocked

- [ ] F-AC-L1 Lint (`figma-read-tokens.js`) = 0 violations before Phase 1, after Phase 1 and after Phase 2 (outputs attached in D11)
- [ ] F-AC-L2 Every variable, style and component used comes from §2–§6 by key — no new local variables except component tokens, no local styles

## 13. When you finish

1. Fill [D11 Execution log](split-button.md#d11-execution-log-filled-by-the-figma-agent) in `split-button.md` (stages, node IDs of the set, docs section and pages, lint outputs, deviations, questions).
2. Set **Figma build** to `Built` in the header of `split-button.md` and in `3-web-components/README.md`.
3. `npm run sync:done:web` — records this contract as built in the Web file.
4. Add one line to the root `CHANGELOG.md`.

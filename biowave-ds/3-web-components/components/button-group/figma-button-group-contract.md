<!-- GENERATED from button-group.md @ 2c0988242ba7eda7 — do not edit; change the source and run: npm run contract -- web button-group -->
# Button group · مجموعة أزرار — Web — Figma contract

> **Everything the Figma Agent needs to build Button group in the Web Components file, with our variables and styles.** Read this file only. Generated from [`button-group.md`](button-group.md) (Parts A, B, D) and the Figma library index (`_sync/figma-library.json`, read 2026-10-18). Questions go to [D11 Execution log](button-group.md#d11-execution-log-filled-by-the-figma-agent) — never invent.

**Two phases, one review:** Phase 1 — build the component set (§7–§8). Phase 2 — as soon as Phase 1 is finished, the 12 documentation pages and the Components List card (§9).

| | |
|---|---|
| Target file | **Biowave DS — Web Components** · key `7nDhsPNntzIWlrjmuSmZ9l` · https://www.figma.com/design/7nDhsPNntzIWlrjmuSmZ9l |
| Page | `↳ Button group` (one page per component) |
| Component | Button group · مجموعة أزرار |
| Platform | Web · React + MUI |
| Version | 1.0 · 2026-10-16 |
| Source | [`button-group.md`](button-group.md) @ `2c0988242ba7eda7` |

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
| `spacing-md` | 3. Spacing › `spacing/md` | `58c93e3cec1b6ba603371a027483e101adcef4f0` | FLOAT | WIDTH_HEIGHT, GAP | spec |

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
| `more_horiz` | `b20a6f8323610d658f0068b530f72b73c210f748` | `cb1fe2d468d51ec6d86fc2d94af892a1ed536637` | `c9b7dd7b9258c0fce05cb4c11b632b8fc7b96ecd` |

## 7. Phase 1 — values (from Part B)

### B1 API

### ButtonGroup
| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `children` | `ReactNode` | `Button` · `IconButton` · `SplitButton` · `Link` | — | ✓ | `secondary-actions` then `primary-action` (reading order) |
| `orientation` | enum | `horizontal` · `vertical` | `horizontal` | | A4.1 |
| `align` | enum | `start` · `center` · `end` · `space-between` · `fill` | `end` | | A4.2 (horizontal). Vertical is always full width |
| `size` | enum | `sm` · `md` · `lg` | `md` | | Applied to every child through context |
| `maxVisible` | number | 1–4 | `3` | | Actions beyond this go into the overflow menu |
| `overflowLabel` | string | | "More options" / "خيارات أخرى" | | Overflow trigger name |
| `aria-label` | string | | — | | When set, the group is exposed as `role="group"` with this name |

**Invalid combinations** (dev warning):
- more than one child with `variant="filled"`
- a child with its own `size` different from the group `size` (group wins)
- `align="space-between"` with more than 2 children
- `align` set with `orientation="vertical"` (ignored)

### B2 Dimensions

```
horizontal, align=end
┌───────────────────────────────────────────────────────┐
│                         [── Cancel ──]  [■■ Save ■■]  │
└───────────────────────────────────────────────────────┘
                                      ├──┤ spacing-md

vertical
┌───────────────────────┐
│ [■■■■■■ Save ■■■■■■■] │
│          ┬ spacing-md │
│ [────── Cancel ──────] │
└───────────────────────┘
```

| Part | Property | Value |
|---|---|---|
| `container` | display · gap | flex · `spacing-md` (both orientations) |
| `container` | horizontal | `flex-direction: row`; `justify-content` from `align` (`start` · `center` · `flex-end` · `space-between`); `fill` → children `flex: 1 1 0` |
| `container` | vertical | `flex-direction: column-reverse` (primary = last child on top), children full width |
| `container` | width | hug (horizontal) · 100% of parent (vertical, `fill`) |
| `overflow-trigger` | | `IconButton` `variant="text"` `color="neutral"`, same `size`, icon `more_horiz`, placed first (start) |

No colors of its own: B3 is empty by design.

### B3 Tokens by part and state

None. Children use their own specs.

### B4 States and transitions

None. Overflow menu: as [Split button B4](../split-button/split-button.md#b4-states-and-transitions).

### B5 RTL

```
LTR  │                [── Cancel ──] [■ Save ■] │
RTL  │ [■ حفظ ■] [── إلغاء ──]                   │   (align=end → inline end = left)
```
Layout mirrors automatically; `more_horiz` does not mirror.

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Semantics | Plain container; `role="group"` + `aria-label` only when a label is given |
| Order | DOM order = reading and focus order (secondary → primary) in every orientation. `column-reverse` changes only the visual stacking |
| Overflow | Trigger and menu as Split button B6 |

## 8. Phase 1 — build the component set (from Part D)

> Executed by the **Figma Agent**. Values from the spec [Part B](#b--spec). **One file per platform (D-12)**: builds the Web set in **Biowave DS — Web Components**.

| Field | Value |
|---|---|
| Component | Button group |
| Figma file | **Biowave DS — Web Components** (`_sync/figma-files.json` › `web`) |
| Page / section | `↳ Button Group` |
| Mode | **Create new.** Legacy reference (read only): Foundations file › `↳ Button group` › `Button Group/EN` `4833:35916`, `Button Group/AR` `4833:35989` |
| Depends on | Button and Icon button (Web) `Built` in the same file |
| Plan version | 1 · 2026-10-16 |

### D1 Rules for this build

Same as [Button D1](../button/button.md#d1-rules-for-this-build). Children are `Button` / `Icon Button` / `Link` instances placed in the `Actions` slot.

### D2 Component structure

```
❖ Button Group    ← published set with a SLOT property `Actions` (as in the legacy set)
```

### D3 Layer tree and auto layout

```
Button Group           ↔ horizontal (Orientation=Horizontal) · ↕ vertical, reversed (Orientation=Vertical) · gap spacing/md
│                        Align → primary-axis alignment (Start/Center/End/Space between); Fill → children FILL
└── actions            SLOT `Actions` · default content: Button Outlined Neutral "Cancel" + Button Filled Brand "Save changes"
```

**Icons used:** `more_horiz` — overflow (More) trigger, Google · Material Symbols Rounded (D-18)

### D4 Properties

| Figma property | Type | Values | Default | Code prop (web) |
|---|---|---|---|---|
| `Orientation` | VARIANT | `Horizontal` · `Vertical` | `Horizontal` | `orientation` |
| `Align` | VARIANT | `Start` · `Center` · `End` · `Space between` · `Fill` | `End` | `align` |
| `Size` | VARIANT | `SM` · `MD` · `LG` | `MD` | `size` (sets the size of the instances in the slot default) |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — |
| `Actions` | SLOT | | 2 buttons | `children` |

### D5 Variants to generate

Horizontal: 5 aligns × 3 sizes × 2 languages = 30; Vertical: 3 sizes × 2 languages = 6 → **36**.

### Legacy mapping (legacy sets are not edited)
| Legacy | New |
|---|---|
| `View` Horizontal · Vertical | `Orientation` |
| `Platform` Desktop · Tablet · Mobile | removed (one set per platform file) |
| `Size` SM · M · XL | `SM` · `MD` · `LG` |
| `/EN` · `/AR` sets | `Language` |
| — | `Align` (new) |

### After `Approved`
Report instances of `4833:35916` / `4833:35989` in the Foundations file; move them to `_Deprecation Ground` once product files use the new library.

### D6 States, interactions and motion

None.

### D7 RTL

`Language=AR`: auto layout direction reversed, so `End` sits at the left; Arabic labels in the default slot content.

## 9. Phase 2 — documentation pages and Components List card

### D8 Documentation pages

12 standard pages in `Button Group — Documentation`; blocked until the Doc Kit. 03 Variations: Orientation, Align, Size. 05 Usage: order rules. 07 Platform: web dialog footer.

Component description: "Lays out 2–4 related actions with the right order and alignment. Spec: 3-web-components/components/button-group/button-group.md".

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

`3-web-components/src/components/button-group/ButtonGroup.figma.tsx` — mapping D4; `Actions` slot → `children`.

## 11. Rules

All rules in **D1** (§8), plus:

**Component tokens only (strict, D-13).** This file may contain exactly one kind of local variable: the `<Component> / <Group>` collections in §2. Never create a local primitive or semantic variable or any other collection; never copy or detach a library variable; never create a local text, effect, colour or grid style; bind layers to the component token when one exists for the property. Run `_sync/figma-read-tokens.js` (lint) **before Phase 1 and after each phase** — it must report 0 violations.

## 12. Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Properties D4 exactly; 36 variants
- [ ] F-AC-2 Gap bound; no raw values
- [ ] F-AC-3 Vertical shows primary on top; AR mirrors
- [ ] F-AC-4 Zero local variables/styles; docs built or reported blocked

- [ ] F-AC-L1 Lint (`figma-read-tokens.js`) = 0 violations before Phase 1, after Phase 1 and after Phase 2 (outputs attached in D11)
- [ ] F-AC-L2 Every variable, style and component used comes from §2–§6 by key — no new local variables except component tokens, no local styles

## 13. When you finish

1. Fill [D11 Execution log](button-group.md#d11-execution-log-filled-by-the-figma-agent) in `button-group.md` (stages, node IDs of the set, docs section and pages, lint outputs, deviations, questions).
2. Set **Figma build** to `Built` in the header of `button-group.md` and in `3-web-components/README.md`.
3. `npm run sync:done:web` — records this contract as built in the Web file.
4. Add one line to the root `CHANGELOG.md`.

# Figma Doc Kit

> One-time build for the Figma Agent. Every component's documentation pages (Part D8 of each component file) and the two home pages (Foundation List, Components List) are assembled **only** from these components, so all docs share one template (derived from the Blade examples) and nobody redesigns it per component. This file also owns the **page layouts** (below) — component files hold only page notes.
> Status: **Built 2026-10-18** · File: **Annotation** — the Doc Kit library file (`_sync/figma-files.json` › `docKit`, decision D-17, 2026-10-18; moved from Foundations › `↳ Doc Kit`) · Page: `Annotation` › frame `Doc Kit / Components` · Published as its own library; its components bind to the **Foundations** library variables and text styles. Enable it in Foundations and the three component files · Version 1.3 · 2026-10-18

## Rules
- Bind everything to Biowave variables and text styles (same rules as Part D1 of every component file). Doc pages follow Light/Dark like components.
- All components use auto layout and are prefixed `Doc/`. They live in the Annotation file and are published from there; every colour, spacing, radius, width and text style is a **Foundations library** variable/style (no local variables in the Annotation file).
- Page widths are the only fixed sizes: **Wide** = `size/container/6xl` (1920) for variant matrices, variations, motion and the home pages; **Standard** = `size/container/2xl` (1024) for text pages. Bind the page frame's width to the variable (confirmed by the Planner 2026-10-18, DK-5).
- Kit components have a default width for the Standard page. **In a row, set `Doc/Tile`, `Doc/Do`, `Doc/Dont`, `Doc/Uses` instances to Fill**; full-width pieces (`Doc/Header`, `Doc/Section`, `Doc/Table`, `Doc/Divider`, `Doc/Motion row`, home components) are set to Fill in the page frame.
- Slots are native Figma slots: put live component instances inside them; never detach a kit instance.
- No mono text style exists in Figma (mono is code-only, D-13 sync report), so `Doc/Code block` and code cells use `Web/en/data/*`.
- Changing a Doc Kit component updates every component's docs. Version changes go in this file's changelog.

## Components

| Component | Properties | Used on pages |
|---|---|---|
| `Doc/Logo` | BOOLEAN `Wordmark` | Header, Home header, Footer (added 1.2) |
| `Doc/Header` | TEXT `Title`, `Subtitle`, `Platform` · nested `Doc/Version chip` (exposed → `Version`) | all |
| `Doc/Section` | TEXT `Title`, `Description` · BOOLEAN `Show description` | all |
| `Doc/Divider` | VARIANT `Style` = Solid · Dashed | all |
| `Doc/Axis label` | TEXT `Property`, `Value` · VARIANT `Orientation` = Column · Row | 00 |
| `Doc/Bracket` | VARIANT `Orientation` = Horizontal · Vertical | 00 |
| `Doc/Panel` | VARIANT `Theme` = Light · Dark (sets the `1. Themes` mode) · slot `Content` | 01 |
| `Doc/Callout` | TEXT `Label` · VARIANT `Side` = Top · Bottom · Start · End | 01, 08, 09 |
| `Doc/Table` + `Doc/Table row` + `Doc/Table cell` | Table: slot `Rows` · Row: VARIANT `Row` = Header · Body, slot `Cells` · Cell: VARIANT `Cell` = Text · Code · List · Bold × `Row` = Header · Body, TEXT `Text` (cells set to Fill) | 02, 09, 11 |
| `Doc/Tile` | TEXT `Caption` · slot `Preview` | 03 |
| `Doc/Motion row` | slots `States` (initial + final instance), `Animation` · TEXT `Trigger` · nested exposed `Doc/Timeline`, `Doc/Code block`, `Doc/Property chip` | 04 |
| `Doc/Timeline` | VARIANT `Duration` = instant · xs · sm · md · lg · xl · 2xl (the `motion-duration-*` tokens; bar = 0.8 px per ms) | 04 |
| `Doc/Code block` | TEXT `Code` | 04 |
| `Doc/Property chip` | TEXT `Property` · swatches From / To | 04 |
| `Doc/Uses` | TEXT `Title`, `Rules` · slot `Example` | 05, 06, 07 |
| `Doc/Do` · `Doc/Dont` | TEXT `Rules` · slot `Example` | 05, 06 |
| `Doc/Device frame` | VARIANT `Device` = Desktop · Web narrow · Tablet landscape · Tablet portrait · Phone · slot `Content` | 07 |
| `Doc/Skeleton` | VARIANT `Shape` = Line · Block · Avatar | 07 |
| `Doc/Change note` | TEXT `Old`, `New` | 10 |
| `Doc/Deprecated overlay` | — (hatched overlay) | 10 |
| `Doc/Home header` | TEXT `Section` (Foundation · Component) · link `biowave.ds` | home pages |
| `Doc/Title bar` | TEXT `Title` | home pages |
| `Doc/Home card` | slot `Preview` (subtle tile) · TEXT `Title`, `Link label` (View Tokens · View Component) · set the link on the `link` text of the instance | home pages |
| `Doc/Footer` | — (logo + "Biowave DS") | home pages |
| `Doc/Version chip` | TEXT `Version` | 00, header |

## Wireframes

```
Doc/Header
┌────────────────────────────────────────────────────────────────────────────┐
│ [logo] Biowave DS / Documentation                 {Platform} · v{version}  │
│ {Title}                                                                    │
│ {Subtitle}                                                                 │
│ ────────────────────────────────────────────────────────────────────────── │
└────────────────────────────────────────────────────────────────────────────┘

Doc/Axis label (Column)        Doc/Callout (Top)        Doc/Tile
     state                        title                 ┌──────────────────┐
    Default                         │                   │   ░░ slot ░░     │
 ├──────┴──────┤                    ●                   │ size = MD        │
                                                        └──────────────────┘
Doc/Do                                   Doc/Dont
┌─ ✓ Do ─────────────────────────┐       ┌─ ✗ Don't ──────────────────────┐
│ • {Rules}                      │       │ • {Rules}                      │
│ ┌────────────────────────────┐ │       │ ┌────────────────────────────┐ │
│ │ ░░░░░░░░ slot ░░░░░░░░░░░░ │ │       │ │ ░░░░░░░░ slot ░░░░░░░░░░░░ │ │
│ └────────────────────────────┘ │       │ └────────────────────────────┘ │
└────────────────────────────────┘       └────────────────────────────────┘
  bg color-background-success-subtle       bg color-background-error-subtle

Doc/Timeline
 0    50   100        200        300        400        500 ms
 │    │    │          │          │          │          │
 ├─────────┤ 100 ms · motion-duration-sm  ← bar follows the Duration variant
```

## Page layouts
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

### 00 Component sheet
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

### 01 Introduction
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

### 02 Props and tokens
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

### 03 Variations
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

### 04 States and motion
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

### 05 Usage guidelines
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

### 06 Content guidelines
Same layout as 05, with copy rules from A6. Show EN and AR examples side by side in the Do card.

### 07 Platform
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

### 08 RTL
LTR and RTL instances side by side for each structurally different variant, with `Doc/Callout` on every mirrored and non-mirrored part (B5). Arabic sample copy.

```
LTR (en)                              RTL (ar)
┌──────────────────────────────┐      ┌──────────────────────────────┐
│ [◆] Title text          [▸]  │      │  [◂]          عنوان البطاقة [◆] │
└──────────────────────────────┘      └──────────────────────────────┘
  ◆ not mirrored · ▸ mirrored
```

### 09 Accessibility
`Doc/Section` blocks: Use case · Keyboard (table from B6) · Screen reader output · Focus (instance in Focus state with ring callout) · Target size (overlay showing `target-min`) · Colors (contrast pairs).

### 10 Changes from previous version
Only when the version is > 1.0. New (live instance, with `Doc/Change note` callouts) next to Previous (old instance or image, hatched with `Doc/Deprecated overlay`). Notes use strike-through for the old value and bold for the new one, e.g. ~~`spacing-lg` fixed~~ → **`spacing-md` variable**.

```
New                                          Previous
┌──────────────────────────┐ ◂ change note   ┌──────────────────────────┐
│ ▢ current instance       │                 │ ╱╱╱ old version ╱╱╱╱╱╱╱  │
└──────────────────────────┘                 └──────────────────────────┘
```

### 11 Changelog
`Doc/Table` from the changelogs (Version · Date · Change · Breaking · Migration).

Component description field (Figma "Description"): one line from A1 + link to the spec.

## Home pages
Two home pages, same layout in Figma and on the web (from Hassan's examples `figma-assets/Foundation List.pdf` and `Components List.pdf`).

```
┌──────────────────────────────────────────────────────────────────────────┐
│ [logo] Biowave DS / Foundation                               biowave.ds  │  Doc/Home header
├──────────────────────────────────────────────────────────────────────────┤
│ Foundation List                                                          │  Doc/Title bar
├──────────────────────────────────────────────────────────────────────────┤
│  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐ │
│  │ · · · · · · · │ │ · ·  Aa · · · │ │ · ▆▆▆▆▆ · · · │ │ · ┌─────┐ · · │ │  Doc/Home card
│  │ · ░ preview ░ │ │ · · · · · · · │ │ · ▆▆▆▆▆ · · · │ │ · └─────┘ · · │ │  (preview on dot grid)
│  ├───────────────┤ ├───────────────┤ ├───────────────┤ ├───────────────┤ │
│  │ Devices       │ │ Typography    │ │ Colors        │ │ Layout        │ │
│  │ View Tokens ↗ │ │ View Tokens ↗ │ │ View Tokens ↗ │ │ View Tokens ↗ │ │
│  └───────────────┘ └───────────────┘ └───────────────┘ └───────────────┘ │  4 per row, wraps
├──────────────────────────────────────────────────────────────────────────┤
│                              [logo] Biowave DS                           │  Doc/Footer
└──────────────────────────────────────────────────────────────────────────┘
```

| Page | Figma | Web | Cards |
|---|---|---|---|
| **Foundation List** | Foundations file, page `Foundation List` (first page after Cover) | [`2-foundations/index.html`](index.html) | 10 cards, below |
| **Components List** | Each component file (Web / Tablet / Mobile), page `Components List` (replaces `Index`) | `<section>/index.html` | One per component; preview = live instance of the default variant; link "View Component ↗" to the component page |

Foundation List cards (decision 2026-10-17):

| Card | Guidelines | Preview |
|---|---|---|
| Devices | `devices.md` | device frames |
| Typography | `typography.md` | "Aa" in the display style |
| Colors | `colors.md` | ramp swatches (brand, success, error, warning) |
| Layout | `grid.md` · `spacing.md` · size tokens | frame with redlines |
| Icons | `icons.md` · `logos.md` · `illustration.md` | icon keyline grid |
| Object Styles | `radius.md` · `border.md` · `elevation.md` | square · rounded · shadowed shapes |
| Tokens | `tokens.md` | tokens ⇄ code |
| Motion | `motion.md` | easing curve |
| Accessibility | `a11y.md` | focus ring + contrast pair |
| Content | `content.md` | EN / AR label pair |

Who keeps them current: the Figma Agent adds or refreshes a component's card in **Phase 2** of its Figma contract; the Foundation List is built once with the Doc Kit and refreshed when a foundation page is added. On the web both lists are generated (no hand-kept list).

## Acceptance criteria
- [x] DK-1 All components above exist on `↳ Doc Kit` in the Foundations file and are published, auto layout, bound to variables / text styles, no raw values
- [x] DK-2 Light and Dark correct; `Doc/Panel` switches variable mode
- [x] DK-3 A sample doc set (pages 00–11) for a dummy component builds using only kit components
- [x] DK-4 (Foundation List in Foundations, relinked to the Annotation library; empty Components List pages in Web / Tablet / Mobile, 2026-10-18) `Foundation List` page in the Foundations file (10 cards) and an empty `Components List` page in each component file, built only from `Doc/Home header`, `Doc/Title bar`, `Doc/Home card`, `Doc/Footer`
- [x] DK-5 Page widths confirmed: Wide = `size/container/6xl` (1920), Standard = `size/container/2xl` (1024)

## Build record (2026-10-18)
| Item | Where |
|---|---|
| 25 components (24 above + `Doc/Logo`) | Annotation › page `Annotation` › frame `Doc Kit / Components` (built in Foundations, moved 2026-10-18; the 8 components that arrived as instances were rebuilt as components and nested instances relinked to the local ones) |
| DK-3 sample (pages 02, 03, 05 for a dummy component, 31 kit instances, Light + Dark checked) | Annotation › `DK-3 Sample — Version chip / 02–05` |
| Foundation List (10 cards, linked to the foundation pages / guidelines) | page `Foundation List` (`5151:2`), right after Cover |
| Components List (empty, cards added by each contract's Phase 2) | page `Components List` after Cover in Web, Tablet and Mobile Components (the old `Index` pages are untouched) |
| Lint (Annotation, after the move) | 419 fills/strokes, all bound to Foundations `1. Themes`; 0 unbound; 0 text without a text style; 0 instances pointing at the old Foundations copies. Fixed geometry only where no token applies: timeline bar lengths, dash patterns, the logo vector |

Component keys are not typed here: `figma-read-library.js` (PART `components`) is run in the **Annotation** file after each publish, `npm run sync:library` saves them in `_sync/figma-library.json`, and `npm run contract -- --all` lists them in every Figma contract (§9).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-10-15 | Initial definition |
| 1.1 | 2026-10-18 | Moved from the old component-guidelines section (R-01). Added page layouts (from the old Figma build template), home pages and 4 home components |
| 1.3 | 2026-10-18 | Doc Kit moved to its own library file, **Annotation** (D-17). Tooling reads `Doc/*` keys from that file; Foundation List instances relinked to the Annotation library |
| 1.2 | 2026-10-18 | Built in Figma. Page widths confirmed (DK-5). Added `Doc/Logo`. Slot names, Timeline steps = `motion-duration-*` tokens, Fill rule, code text style recorded |

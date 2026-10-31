# Spacing

Every space answers one question: **between what and what?** The answer picks one of three levels. A 4px base scale with 2px and 6px half-steps; never add numbers together (`8 + 4`) — pick the token that matches.

| Level | Tokens | Changes per platform? | Use for |
|---|---|---|---|
| **Control** | `spacing-control-padding-inline-{sm,md,lg,xl}` · `spacing-control-gap-{sm,md,lg,xl}` | No — the platform picks the control size | Inside a control with a fixed height (Button, Icon button, Split button, Text field, Select, Segmented button). The step always equals the control size. |
| **Component** | `spacing-none · xxs · xs · sm · md · lg · xl · 2xl · 3xl` (0–24px) | No | Inside one component that has no fixed height (Badge, Tooltip, Chip, List item, card content). |
| **Layout** | `spacing-layout-section · group · stack · container` | **Yes** — Web · Tablet · Mobile | Between components on a page, and from a container's edge to its content. |

## Which token? Ask in this order
1. **Am I inside a control that has a height?** → `control/*` with the **same size** as the control (a `md` Button uses `padding-inline-md` and `gap-md`).
2. **Am I inside one component?** → the component scale (`none … 3xl`).
3. **Am I between components, or between a container's edge and its content?** → `layout/*`.

## Component scale
Same value on every platform: a Tooltip looks the same on a phone and a desktop.

| Token | Value | Use for | Not for |
|---|---|---|---|
| `spacing-none` | 0 | Explicitly removing padding or gap — flush lists, joined segments (split button: the parts touch and a Divider separates them), edge-to-edge media | Hiding content |
| `spacing-xxs` | 2 | Optical nudges — badge offset on an avatar or icon, status dot position, gap between stacked lines in dense data | Padding of anything interactive; gaps between interactive elements |
| `spacing-xs` | 4 | Icon-to-text in badges, chips and inline links; title-to-description in list items and card headers; badge padding; field-to-supporting-text gap | Control padding (use `control/*`); gaps between separate interactive elements (use `md`+) |
| `spacing-sm` | 6 | Label-to-field gap, compact chip and tag padding, icon-to-text in small non-control elements | Layout or control padding |
| `spacing-md` | 8 | Tooltip and popover padding, gap between related interactive elements (button group, chip row, toolbar icon buttons), dense list-row vertical padding, menu item gap | Card, dialog or panel padding (use `layout-container`) |
| `spacing-lg` | 12 | List-row padding, menu padding-inline, avatar-to-text gap in list items, gap between the parts of a component (toast header and body) | Space between components on a page (use `layout/*`) |
| `spacing-xl` | 16 | List-row and menu-row padding-inline on touch, content-to-action gap in banners and snackbars, table cell padding-inline | Container edges of cards, dialogs and panels (use `layout-container`) |
| `spacing-2xl` | 20 | Rare: a large component where `xl` is too tight and `3xl` too loose — side sheet header padding, empty-state content gap | Layout |
| `spacing-3xl` | 24 | The largest step inside a component that owns its own spacing — navigation drawer header, illustration-to-text in empty states | Card or dialog padding — it changes per platform (use `layout-container`) |

## Control sizes (P-04)
Shared by every control that has a height. A control picks a size and reads all three values from the same step, so a Button and a Text field of the same size line up. **Never mix steps** (a `md` control with `padding-inline-lg`).

| Size | `size-control-height-*` | `spacing-control-padding-inline-*` | `spacing-control-gap-*` | Icon | Typography | Default on |
|---|---|---|---|---|---|---|
| `sm` | 32 | 8 | 4 | `size-icon-sm` | `action-sm` | dense web only (tables, toolbars, filters) |
| `md` | 40 | 12 | 6 | `size-icon-md` | `action-md` | **web** |
| `lg` | 48 | 16 | 8 | `size-icon-lg` | `action-lg` | **tablet, mobile** |
| `xl` | 56 | 24 | 8 | `size-icon-lg` | `action-lg` | tablet/mobile primary actions only |

On touch platforms a control smaller than `lg` keeps a `target-min` (48dp) hit area around it. The platform difference comes from the control size, so control spacing has no platform modes.

## Layout spacing
Changes per platform: wider on web so content can breathe, tighter on mobile so more fits.

| Token | Web | Tablet | Mobile | Use for | Not for |
|---|---|---|---|---|---|
| `spacing-layout-section` | 40 | 32 | 24 | Vertical gap between page sections that each have their own heading | Space inside a card or form |
| `spacing-layout-group` | 24 | 24 | 16 | Gap between sibling blocks inside a section — cards in a row or grid, form groups, dashboard widgets | Fields inside one form group (use `layout-stack`) |
| `spacing-layout-stack` | 16 | 16 | 12 | Gap between consecutive items in a vertical flow inside a container — section heading to content, field to field, paragraph to paragraph, content to the actions row | Icon-to-text or other gaps inside one component |
| `spacing-layout-container` | 24 | 24 | 16 | Padding from the edge of a surface container to its content — card, dialog, side panel, bottom sheet | Controls, list rows, tooltips (use `control/*` or the component scale) |

- `layout-group` equals `grid-gutter` on purpose, so blocks follow the column rhythm.
- Page margins are **not** layout spacing: use `grid-margin-full` / `grid-margin-sidebar` ([grid](grid.md)).
- Larger one-off offsets (hero, marketing, empty pages) are not tokens. Ask the Planner for a named layout token instead of reaching for a primitive.

### Example — a settings card, web | mobile
```
┌─ Page ─────────────────────────────────────────────┐
│  Section heading "Account"                          │
│     ↕ layout-stack (16 | 12)                         │
│  ┌─ Card ─────────── layout-container (24 | 16) ───┐│
│  │ Title                                           ││
│  │   ↕ spacing-xs (4)                ← component   ││
│  │ Description                                     ││
│  │   ↕ layout-stack (16 | 12)                      ││
│  │ [ Text field  md | lg ]   ← control-padding-*    ││
│  │   ↕ layout-stack (16 | 12)                      ││
│  │ [ Button  md | lg ]       ← control-gap-*        ││
│  └─────────────────────────────────────────────────┘│
│     ↕ layout-section (40 | 24)                       │
│  Section heading "Security" …                        │
└──────────────────────────────────────────────────────┘
```
The card is built once; only the platform mode changes.

## In Figma
- **Component and control spacing** live in `3. Spacing`; **layout spacing** lives in `6. Grid & Layout` (named `spacing/layout/*`), so one mode switch on a frame changes the grid, margins and layout spacing together. Set the frame's `6. Grid & Layout` mode to `Web`, `Tablet` or `Mobile`.
- Spacing variables appear only in **padding and gap** fields (scope `GAP`), never in width or height.
- Hover a variable to read its description: every one says *Use for* and *Not for*.

## In code
| | Component / control | Layout |
|---|---|---|
| CSS | `var(--bw-spacing-md)` | `var(--bw-spacing-layout-stack)` — switches with the viewport or `data-platform` |
| React / MUI | `cssVars.spacing.md` (`theme.spacing(n)` = n × 4px; prefer the named token) | `cssVars.spacing.layout.stack` |
| Flutter | `BwSpacing.md`, `BwSpacing.controlGapMd` … | `context.bw.layout.stackGap` · `sectionGap` · `groupGap` · `containerPadding` |

## Rules
- Use `gap` (flex/grid, Flutter `spacing:` or `SizedBox`) between siblings instead of margins on children.
- Use **logical** directions: `padding-inline-start`, `EdgeInsetsDirectional.only(start: …)`.
- Touch platforms: spacing never shrinks a target below `target-min` (48dp); add padding instead.
- Spacing inside a component never changes per platform; if it seems to need to, the space is probably between components — use `layout/*`.

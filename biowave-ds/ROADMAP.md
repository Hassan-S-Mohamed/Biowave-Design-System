# Roadmap — Biowave components and patterns

> Agent summary: **build order and schedule only.** Core components → complex components → patterns, **2–3 per working day**. Status is not tracked here. It lives in each component file header and the section README Components tables (`3-/4-/5-…/README.md`) (all platforms) and in each section README, so each fact has one home. Before planning a day, read the day's row, the "Depends on" column, and §6 Open decisions.

| Field | Value |
|---|---|
| Version | 3 · 2026-10-20 (Figma coverage check P-05: Action bar added; Tag, Label and Status fold into Chip; variants named) |
| Working week | Sunday–Thursday (Cairo). Dates move with the plan; the day number is what counts. |
| Pace | 2–3 items per day (1 for very large items) |
| Platforms | **W** Web (React + MUI) · **T** Tablet (Flutter + M3) · **M** Mobile (Flutter + M3) |
| Target | Design System 1.0 = 45 components + 13 patterns · Day 26 (≈ 23 Nov 2026) |

## 1. Phases

```
 Phase 0        Phase 1               Phase 2                  Phase 3              
 Prep      ──►  Core components  ──►  Complex components  ──►  Patterns       ──►  DS 1.0
 Day 0          Day 1–8 (22)          Day 10–18 (23)           Day 20–25 (13)
                Day 9 ▸ Core 0.5      Day 19 ▸ Complex 0.9     Day 26 ▸ 1.0 release
```

| Phase | Builds from | Rule |
|---|---|---|
| 1 · Core | Foundations tokens only | One job each and no other Biowave component inside, except Icon |
| 2 · Complex | Core components plus tokens | Must reuse core components. Never re-style a Button inside a Dialog, for example |
| 3 · Patterns | Components only, **no new tokens and no new styling** | A pattern that needs something new means a component is missing. Add it to the backlog instead of the pattern |

## 2. Daily loop

Every item goes through the AGENTS.md workflow. One day looks like this:

| When | Who | What | Output |
|---|---|---|---|
| 1 · Start | Planner | `npm run sync` must be green. Review yesterday's builds first | `review.md` → Approved / Changes requested |
| 2 · Plan | Planner | For each of today's items: guidelines once, then spec + `plan.md` + `figma.md` for each platform it applies to | Status `Planned` |
| 3 · Build | Code Executors (W, T, M) + Figma Agent, in parallel | Implement `plan.md` / `figma.md` | Status `Built` |
| 4 · Close | Planner | Quick check of the execution logs; answer Questions; update this roadmap if the scope moved | — |

**Carry-over rule (WIP limit):** if more than one item is in `Changes requested`, no new item starts that day. Fix first, then plan.
**Code Connect** is published only when an item's code **and** Figma reviews are both `Approved`.

### Definition of done (per component)
- [ ] `<section>/components/<name>/<name>.md` for each platform (Part A identical on all three), anatomy and option names match every spec; contracts generated
- [ ] `tokens.json` per platform (D-13) passes `npm run component-tokens` and is synced + verified in the platform's Figma file
- [ ] For each platform in the row: spec, `plan.md`, `figma.md`, code + tests, Figma component + 12 doc pages
- [ ] Light/Dark × EN/AR tested; WCAG 2.2 AA; all AGENTS.md §5 commands pass
- [ ] `review.md` Approved for code and Figma; Code Connect published
- [ ] Status tables and `CHANGELOG.md` updated

## 3. Phase 0 — Prep (Day 0 · Sun 18 Oct)

| # | Task | Why it blocks |
|---|---|---|
| 0.1 | Close foundation decisions **D-07 … D-11** (`2-foundations/AUDIT.md`) | Font weights and the numeral style (D-10) affect every component, especially Date/Time pickers and tables |
| 0.2 | ~~Decide P-01 … P-04~~ ✅ closed 2026-10-15 (§7). ~~Decide B-01 … B-05~~ ✅ 2026-10-16 (`_audits/button-family.md`). ~~Decide I-01 … I-10~~ ✅ 2026-10-18 (`_audits/input-family.md`) | Button family is Day 1–2 and already exists in Figma; its fixes depend on these |
| 0.3 | Build the **Figma Doc Kit** (`2-foundations/figma-doc-kit.md`, incl. the 4 home-page components) — built 2026-10-18 in the **Annotation** library file (D-17) | ✅ built · publish + enable in each file |
| 0.4 | ~~Confirm the icon set and naming in `2-foundations/guidelines/icons.md`~~ ✅ 2026-10-18 — D-18; code migration step in `icons.md` › Migration | Icon is the first component |
| 0.6 | **Figma files (D-12)** — done by Claude 2026-10-16: 3 component files created with page structure; legacy sections marked in Foundations; `↳ Doc Kit` page; `Focus/Ring Inverse` style. Manual steps done by the design lead and **verified 2026-10-16**: Foundations renamed, all four files in the team project, library published (incl. control tokens, inverse/overlay colors, `Focus/Ring Inverse`) and enabled in the 3 component files | ✅ |
| 0.5 | Move Figma-only component variables into the token source as semantic **control** tokens (P-04, audit G-04) | Button heights, padding and gaps must exist in code before the Button spec |

## 4. Phase 1 — Core components (Day 1–8)

The **button family** goes first and already exists in Figma, so it is *audit → fix → document → code*, not a build from scratch. Gap report: [`_audits/button-family.md`](_audits/button-family.md).

| Day | Date | Component | W | T | M | Base (MUI / M3) | Depends on |
|---|---|---|:-:|:-:|:-:|---|---|
| 1 | Mon 19 Oct | Icon | ● | ● | ● | `SvgIcon` / `Icon` | — |
| 1 | | Button | ● | ● | ● | `Button` / `FilledButton` · `FilledButton.tonal` · `OutlinedButton` · `TextButton` | Icon (loading uses an inline spinner until Progress exists) |
| 2 | Tue 20 Oct | Icon button | ● | ● | ● | `IconButton` / `IconButton` (+ `.filled` · `.filledTonal` · `.outlined`) | Icon, Tooltip label |
| 2 | | Split button | ● | ● | ● | `ButtonGroup` + `Button` + `Menu` / custom (`FilledButton` + `MenuAnchor`) | Button, Icon button; menu content uses Menu (Day 10), placeholder list until then |
| 2 | | Button group (action layout, not a connected control) | ● | ● | ● | `Stack` / `OverflowBar` (wraps to vertical) | Button, Icon button, Link |
| 3 | Wed 21 Oct | Link | ● | ● | ● | `Link` / custom `InkWell` + text | Icon |
| 3 | | Divider | ● | ● | ● | `Divider` / `Divider` | — |
| 3 | | Badge (incl. Check badge variant, P-05) | ● | ● | ● | `Badge` / `Badge` | — |
| 4 | Thu 22 Oct | Avatar | ● | ● | ● | `Avatar` / `CircleAvatar` (custom) | Icon, Badge |
| 4 | | Chip — interactive (input · filter · assist) **plus static Tag / Label and Status variants** (request status: 7 states with status icons, P-05) | ● | ● | ● | `Chip` / `InputChip` · `FilterChip` · `AssistChip` | Icon, Avatar |
| 4 | | Tooltip | ● | ● | ● | `Tooltip` / `Tooltip` (long-press on touch) | — |
| 5 | Sun 25 Oct | Progress (circular + linear) | ● | ● | ● | `CircularProgress` · `LinearProgress` / `CircularProgressIndicator` · `LinearProgressIndicator` | — |
| 5 | | Skeleton | ● | ● | ● | `Skeleton` / custom (shimmer respects reduced motion) | — |
| 5 | | Card (incl. selectable card variant — Checkbox card, P-05) | ● | ● | ● | `Card` / `Card` (filled · outlined · elevated) | — |
| 6 | Mon 26 Oct | Checkbox | ● | ● | ● | `Checkbox` / `Checkbox` + `CheckboxListTile` | — |
| 6 | | Radio | ● | ● | ● | `Radio` / `Radio` + `RadioListTile` | — |
| 6 | | Switch | ● | ● | ● | `Switch` / `Switch` | Icon |
| 7 | Tue 27 Oct | Text field (single line, multiline, label, helper, error, counter) | ● | ● | ● | `TextField` / `TextField` + `InputDecorationTheme` | Icon, Icon button, control tokens |
| 7 | | Select | ● | ● | ● | `Select` / `DropdownMenu` | Text field, Icon |
| 8 | Wed 28 Oct | Verification code (OTP, 4 or 6 digits; digits always LTR, I-08) | ● | ● | ● | custom on `InputBase` × n / custom `TextField` × n | Text field (shared field parts) |
| 8 | | List (list + list item; incl. notification item variant, P-05) | ● | ● | ● | `List` · `ListItem` / `ListTile` | Avatar, Icon, Checkbox, Switch, Divider |
| 8 | | Segmented button (connected single/multi select; incl. day picker — 7 weekdays, multi-select, P-05) | ● | ● | ● | `ToggleButtonGroup` / `SegmentedButton` | Icon |
| **9** | **Thu 29 Oct** | **Buffer + Core release** | | | | Clear carry-overs, cross-component consistency pass, packages **0.5.0** | All of Phase 1 |

## 5. Phase 2 — Complex components (Day 10–18)

| Day | Date | Component | W | T | M | Base (MUI / M3) | Depends on |
|---|---|---|:-:|:-:|:-:|---|---|
| 10 | Sun 1 Nov | Menu | ● | ● | ● | `Menu` / `MenuAnchor` | List, Icon, Divider · then swap into Split button |
| 10 | | Tabs | ● | ● | ● | `Tabs` / `TabBar` | Badge, Icon |
| 10 | | Breadcrumbs | ● | ● | — | `Breadcrumbs` / custom | Link, Icon, Menu (overflow) |
| 11 | Mon 2 Nov | Alert (inline banner) | ● | ● | ● | `Alert` / `MaterialBanner` (custom) | Icon, Button, Icon button |
| 11 | | Snackbar | ● | ● | ● | `Snackbar` / `SnackBar` | Button, Icon button |
| 11 | | Dialog | ● | ● | ● | `Dialog` / `AlertDialog` · `Dialog.fullscreen` | Button group, Icon button |
| 12 | Tue 3 Nov | Bottom sheet | — | ● | ● | — / `showModalBottomSheet` | Button, List |
| 12 | | Side sheet (drawer) | ● | ● | — | `Drawer` / custom side sheet | Button group, Icon button, Divider |
| 12 | | Accordion | ● | ● | ● | `Accordion` / `ExpansionTile` | Icon, Divider |
| 13 | Wed 4 Nov | Search field | ● | ● | ● | `TextField` + adornments / `SearchBar` · `SearchAnchor` | Text field, Icon button |
| 13 | | Phone field (country code Select + Text field, I-07) | ● | ● | ● | `TextField` + `Select` / `TextField` + `DropdownMenu` | Text field, Select, Menu |
| 13 | | Autocomplete (single + multi) | ● | ● | ● | `Autocomplete` / `Autocomplete` + `RawAutocomplete` | Text field, Menu, Chip, Progress |
| 14 | Thu 5 Nov | **Date picker** (field + calendar) — whole day: web is our own build (P-01) | ● | ● | ● | custom on `Popover` + `TextField` / `showDatePicker` | Text field, Icon button, Dialog, D-10 |
| 15 | Sun 8 Nov | Time picker | ● | ● | ● | custom / `showTimePicker` | Text field, Dialog, D-10 |
| 15 | | Date range picker | ● | ● | ● | custom (two calendars) / `showDateRangePicker` | Date picker |
| 15 | | Action bar (bulk / contextual actions bar, directional; P-05) | ● | ● | — | `Toolbar` + Button group / custom `Row` + `BwButton` | Button group, Icon button, Menu, Divider |
| 16 | Mon 9 Nov | File upload (incl. photo / avatar upload variant, P-05) | ● | ● | ● | custom dropzone / `file_picker` + list | Button, Progress, List, Alert |
| 16 | | Pagination | ● | ● | — | `Pagination` · `TablePagination` / custom | Icon button, Select |
| 16 | | Stepper | ● | ● | ● | `Stepper` / custom (M3 has none) | Icon, Button |
| 17 | Tue 10 Nov | Empty state | ● | ● | ● | custom | Icon / illustration, Button group |
| 17 | | Top app bar | ● | ● | ● | `AppBar` · `Toolbar` / `AppBar` · `SliverAppBar` | Icon button, Avatar, Menu, Search field |
| 17 | | Primary navigation — **one guideline, three forms**: W side navigation · T navigation rail · M navigation bar | ● | ● | ● | `Drawer` + `List` / `NavigationRail` / `NavigationBar` | List, Badge, Icon, Tooltip |
| 18 | Wed 11 Nov | **Data table** (sorting, selection, row actions, density, sticky header, loading/empty) — whole day | ● | ● | — | MUI X `DataGrid` MIT (P-02), restyled from tokens / `DataTable` · custom | Checkbox, Menu, Pagination, Skeleton, Empty state, Chip, D-10 |
| **19** | **Thu 12 Nov** | **Buffer + Complex release** | | | | Clear carry-overs; `7-patterns/README.md` + `_templates/pattern.md` (P-03); packages **0.9.0** | All of Phase 2 |

## 6. Phase 3 — Patterns (Day 20–25)

A pattern is a documented composition of components that solves one recurring Biowave task. Deliverables per pattern: pattern guideline in `7-patterns/` (P-03 ✅), a reference composition per platform (example screen or story, **no new components**), and a Figma pattern page.

| Day | Date | Pattern | W | T | M | Built from |
|---|---|---|:-:|:-:|:-:|---|
| 20 | Sun 15 Nov | App shell (layout, responsive breakpoints, primary navigation placement) | ● | ● | ● | Top app bar, Primary navigation, Side sheet |
| 20 | | Page header (title, breadcrumbs, primary/secondary actions, tabs) | ● | ● | ● | Breadcrumbs, Button, Menu, Tabs |
| 21 | Mon 16 Nov | Forms and validation (layout, required/optional, inline + summary errors, submit states) | ● | ● | ● | Text field, Select, Autocomplete, Date picker, Alert, Button |
| 21 | | Destructive actions and confirmation (incl. typed confirmation) | ● | ● | ● | Dialog, Text field, Button, Snackbar (undo) |
| 22 | Tue 17 Nov | Data list page (search, filters, bulk actions, table/list, pagination) | ● | ● | ● | Search field, Chip, Data table / List, Pagination, Menu, Side sheet / Bottom sheet |
| 22 | | Loading, empty and error states | ● | ● | ● | Skeleton, Progress, Empty state, Alert |
| 23 | Wed 18 Nov | Sign-in and OTP verification (email verify, OTP, errors, resend) | ● | ● | ● | Text field, Button, Alert, Link |
| 23 | | Feedback and notifications (when to use snackbar vs alert vs dialog vs badge) | ● | ● | ● | Snackbar, Alert, Dialog, Badge |
| 24 | Thu 19 Nov | Clock in / out and breaks (attendance status Working/Idle) | ● | ● | ● | Button, Card, Chip, Dialog |
| 24 | | Requests and approvals (submit, status timeline, approve/reject) | ● | ● | ● | Forms pattern, Stepper, Chip, List, Dialog |
| 25 | Sun 22 Nov | Detail and profile page | ● | ● | ● | Page header, Tabs, Card, List, Avatar |
| 25 | | Settings | ● | ● | ● | List, Switch, Select, Segmented button |
| 25 | | Dashboard (KPI cards + layout; charts deferred, see §8) | ● | ● | ● | Card, Page header, Segmented button, Date range picker |
| **26** | **Mon 23 Nov** | **Buffer + Design System 1.0** | | | | Full audit (a11y, RTL, dark), docs site check, packages **1.0.0** |

## 7. Decisions

| ID | Question | Decision | Status |
|---|---|---|---|
| P-01 | Web date/time pickers | **Build our own** (no MUI X pickers). Date picker gets a full day (Day 14) | ✅ 2026-10-15 |
| P-02 | Web data table | **MUI X `DataGrid`** (MIT), restyled from tokens. Pro features (pinning, grouping) are out of scope | ✅ 2026-10-15 |
| P-03 | Where patterns live | New section **`7-patterns/`** with README + `_templates/pattern.md`, created on Day 19 | ✅ 2026-10-15 |
| P-04 | Component tokens | Handled **in the semantic layer first**: values shared by several components become semantic tokens (e.g. `size.control.{sm,md,lg}.height`, `spacing.control.padding-x.*`, `spacing.control.gap`). A component-specific token is added only when no shared semantic token fits, and only by the Planner in the spec's *Token gaps*. Figma-only component collections are migrated into the token source (Day 0.5) | ✅ 2026-10-15 |
| D-10 | Numerals in Arabic UI | **Western digits (0-9)** for IDs, times, dates, numbers and tables in both languages | ✅ 2026-10-16 |
| D-18 | Icon set | **Google Material Symbols Rounded** (wght 400, GRAD 0, FILL 0 / 1 selected; opsz = size on Flutter, font default on web). Web: self-hosted `@material-symbols/font-400` variable font (FILL axis) (MUI `Icon` `baseClassName="material-symbols-rounded"`, wrapped by the Biowave `Icon`). Flutter: `material_symbols_icons` (`Symbols.*_rounded`). `@mui/icons-material` and Flutter `Icons.*` not allowed | [`icons.md`](2-foundations/guidelines/icons.md) | ✅ 2026-10-18 |
| I-01 … I-10 | Input family: static label above the field · outlined only · field focus = border in `color-border-focus` (no offset ring) · `sm·md·lg` · Text area inside Text field · shared field parts · Verification code (Day 8) and Phone field (Day 13) added | [`_audits/input-family.md`](_audits/input-family.md) §4 | ✅ 2026-10-18 |
| B-01 … B-05 | Button family: emphasis `filled·tonal·outlined·text` · colors `brand·secondary·neutral·error·inverse` · sizes `sm·md·lg·xl` · one EN/AR set · deprecate duplicates | [`audits/button-family.md`](_audits/button-family.md) §4 | ✅ 2026-10-16 |
| P-05 | Figma components missing from the roadmap (all 4 Figma files checked, incl. LEGACY Web + Mobile pages) | **Tag / Label / Request status** → Chip variants (no new component) · **Check badge** → Badge · **Checkbox card / Card check** → Card (selectable) · **Day picker** → Segmented button · **Notification card** → List item · **Upload photo** → File upload · **Actions bar** → new Phase 2 item **Action bar** (Day 15, W + T) · **Map** → backlog · **Slider** stays post-1.0 · System status bar = device chrome, not a component | ✅ 2026-10-20 |

## 8. Backlog (after 1.0, not scheduled)

Slider (designed in Figma, 30 variants) · Map (designed in Figma: Web `↳ Maps`, P-05) · Rating · Carousel · Tree view · Timeline · Charts (data visualization component set; needed for full Dashboard) · Rich text editor · Calendar/scheduler view (shifts) · Biometric enrollment pattern · Kiosk / terminal mode for tablet.

## 9. Risks

| Risk | Mitigation |
|---|---|
| 2–3 items × up to 3 platforms = up to 9 specs, plans and Figma builds a day; reviews pile up | Carry-over rule (§2). Buffer days 9, 19 and 26. Large items (Text field, Date pickers, Data table) get lighter days |
| A complex component shows a core component is missing an option | Change the core spec with a version bump instead of working around it locally. Log the change in CHANGELOG |
| Figma and code drift | `npm run sync` at the start of every day (AGENTS.md §7) |

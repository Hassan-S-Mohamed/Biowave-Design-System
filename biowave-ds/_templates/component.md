# {Component} · {الاسم بالعربية} — {Web | Tablet | Mobile}

<!--
ONE FILE PER COMPONENT PER PLATFORM — <section>/components/<name>/<name>.md
Written by the Planner. Six parts in a fixed order; section IDs (A1, B3, D8 …) never change because the
HTML docs page, the contract generator, docs:check and reviews all address sections by ID.
  A Guidelines   — identical on Web / Tablet / Mobile except A8 (docs:check fails on drift; change all three files in one task)
  B Spec         — the contract. Only semantic tokens, never hex / px / ms / font names
  C Code plan    — how to build B in code        → generated <name>-contract.md for the code Executor
  D Figma build  — how to build B in Figma       → generated figma-<name>-contract.md for the Figma Agent
  E Review       — one block per round, newest first
  F Changelog
When A–D are done and reviewed, set Plan = Finished and run: npm run contract -- <web|tablet|mobile> <name>
Rules for writing (one fact one home, ASCII wireframes, writing style): _templates/README.md
Delete any optional section that does not apply. Never leave an empty section.
-->

| | |
|---|---|
| Component | {Component} · {الاسم بالعربية} |
| Summary | {One sentence: what it does for the user — shown on the docs page and the Components List card} |
| Summary (ar) | {نفس الجملة بالعربية} |
| Parts | {Part names from A2, joined with ·} |
| Parts (ar) | {أسماء الأجزاء بالعربية} |
| Platform | {Web · React + MUI} / {Tablet · Flutter + M3} / {Mobile · Flutter + M3} |
| Built on | {MUI `Card` · M3 `Card` · custom (reason)} |
| Import | `import { {Name} } from '@biowave/web'` / `BwName` from `package:biowave_{tablet|mobile}/…` |
| Figma | **Biowave DS — {Web | Tablet | Mobile} Components** › `↳ {Component}` |
| Version | 1.0 · {YYYY-MM-DD} |
| Plan | {Draft · Finished · Open} — contracts are generated only when `Finished` |
| Code | {Planned · In progress · Built · In review · Changes requested · Approved} |
| Figma build | {Planned · In progress · Built · In review · Changes requested · Approved} |
| Review | {— · Round n · date · verdict} |
| Source code | [`src/components/{name}/`](../../src/components/{name}/) (web) · [`lib/src/components/{name}/`](../../lib/src/components/{name}/) (Flutter) |
| Tokens | [`{name}.tokens.json`]({name}.tokens.json) — machine copy of B3 (D-13) |
| Contracts | [`{name}-contract.md`]({name}-contract.md) · [`figma-{name}-contract.md`](figma-{name}-contract.md) — generated, never edited |
| Docs page | [`{name}.html`]({name}.html) |

## Contents

[A · Guidelines](#a--guidelines) · [B · Spec](#b--spec) · [C · Code plan](#c--code-plan) · [D · Figma build](#d--figma-build) · [E · Review](#e--review) · [F · Changelog](#f--changelog)

---

## A · Guidelines

> What it is and when to use it — designers, PMs. Identical on Web, Tablet and Mobile except **A8** (checked by `npm run docs:check`).

### A1 Overview

One short paragraph: what it is and the job it does for the user. One hero image, light and dark.

![{Component} — light and dark](./assets/overview.png)

### A2 Anatomy

ASCII wireframe + numbered list (+ optional image). **These part names are the vocabulary for every other doc** — spec, tokens, props, Figma layers, code all use the same names (kebab-case). Wireframe conventions: `_templates/README.md#ascii-wireframes`.

```
┌──────────────────────────────────────────────┐
│ ②[◆]  ③Title text  ④(12)              ⑤[⤓] │   ①
│       ⑥Subtitle text                         │
├──────────────────────────────────────────────┤
│ ⑦░░░░░░░░░░░░░░░░ slot ░░░░░░░░░░░░░░░░░░░░ │
└──────────────────────────────────────────────┘
```

![{Component} anatomy](./assets/anatomy.png)

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `container` | Yes | … |
| 2 | `leading-icon` | No | … |
| 3 | `title` | Yes | … |

### A3 Usage

**When to use**
- …

**When not to use** (and what to use instead)
| Situation | Use instead |
|---|---|
| … | [{Other component}](../{other}/{other}.md#a--guidelines) |

### A4 Options

<!-- One sub-section per design option (what Blade calls "Variations"). Each option becomes a prop in the platform specs, with the SAME name and values. Explain WHEN to pick each value — no tokens, no px. -->

#### 4.1 {variant}
| Value | Looks like | Pick it when |
|---|---|---|
| `primary` | `[■■ Label ■■]` | … |
| `secondary` | `[── Label ──]` | … |

Use a mini wireframe in the table when the difference is structural (show / hide a part, layout change); use an image when the difference is only color.

#### 4.2 {size}
| Value | Pick it when |
|---|---|
| `sm` | Dense tables, toolbars |
| `md` | Default |

#### 4.3 {show-header / trailing-item / …}
…

**Combination rules** — options that must not be used together:
- {e.g. `trailing-item` shows one item only — never two}

### A5 States and behavior

What the user perceives and how it responds. Design level only; exact tokens and timings are in the specs.

| State | When it happens | What the user sees |
|---|---|---|
| Default | | |
| Hover | Pointer over (web only) | |
| Focus | Keyboard focus | Focus ring (see [a11y](../../../2-foundations/guidelines/a11y.md)) |
| Pressed / Selected / Disabled / Loading / Error | | |

**Behavior rules**
- Overflow / truncation: …
- Long Arabic text (+20–30% width): …
- Empty / loading / error content: …

### A6 Content

Component-specific rules only. General writing rules live in [content.md](../../../2-foundations/guidelines/content.md) — do not repeat them.

| Element | Rule | Max length |
|---|---|---|
| `title` | Noun phrase, < 7 words, no ellipsis | {n} chars |
| `primary-action` | Verb-first, says the outcome | 3 words |

| ✓ EN | ✓ AR | ✗ Avoid |
|---|---|---|
| Save changes | حفظ التغييرات | Continue (hides the outcome) |

### A7 Do and don't

Pair each rule with an image. Minimum 3 pairs. Short imperative rules.

| ✓ Do | ✗ Don't |
|---|---|
| ![](./assets/do-1.png) Use one primary action per {component} | ![](./assets/dont-1.png) Stack two primary actions |

### A8 Platform notes — {Web | Tablet | Mobile}

Only what is special on **this** platform (the other platforms are in their own files). Add a wireframe when the layout changes.


```
Web / Tablet                                  Mobile
┌───────────────────────────────────────┐     ┌─────────────────────────┐
│ Footer title      [Secondary][Primary]│     │ Footer title            │
└───────────────────────────────────────┘     │ [Secondary ][ Primary  ]│
                                              └─────────────────────────┘
```

| | Web |
|---|---|
| Available | ✓ |
| Layout | {e.g. actions inline} |
| Interaction | Hover + click + keyboard |
| Not supported | — |

### A9 Accessibility (design)

What every user must be able to do. Implementation (roles, keys, semantics) is in each spec.
- Users can … with keyboard / screen reader / switch access
- Labels: every icon-only part has a visible or accessible label
- Content placed in slots must meet [a11y](../../../2-foundations/guidelines/a11y.md) contrast and labelling rules

### A10 Related components

- [{Component}](#a--guidelines) — how it relates / when to pick it instead

---

## B · Spec

> The contract — API, dimensions, tokens, states, RTL, accessibility. Code and Figma are both reviewed against this part.

### B1 API

One table per public sub-component (e.g. `Card`, `CardHeader`, `CardFooter`). Every option from the guidelines appears here under the same name.

#### {Name}
| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `variant` | enum | `primary` · `secondary` | `primary` | | A4.1 |
| `size` | enum | `sm` · `md` · `lg` | `md` | | A4.2 |
| `disabled` | boolean | | `false` | | |
| `onClick` / `onPressed` | callback | | | | |
| `children` / `child` | slot | | | ✓ | Allowed content: … |

Platform naming notes: {e.g. web `startIcon` = Flutter `icon`; web `onClick` = Flutter `onPressed`}.

**Invalid combinations** (dev warning / assert):
- {e.g. `showHeader=false` with `trailingItem` set}

### B2 Dimensions

Redline wireframe (default size, LTR) + table per part × size. Tokens only.

```
       spacing-md        spacing-xs                       spacing-md
      ├──────────┤      ├──┤                             ├──────────┤
   ┬  ┌──────────────────────────────────────────────────────────────┐
   │  │          [◆]    Label text                       [▸]         │  radius-md
   │  └──────────────────────────────────────────────────────────────┘  border-width-default
   ┴ size-…      └ size-icon-…
```

| Part | Property | sm | md | lg |
|---|---|---|---|---|
| `container` | height | `size-…` | `size-…` | `size-…` |
| `container` | padding-inline | `spacing-sm` | `spacing-md` | `spacing-lg` |
| `container` | gap | `spacing-xs` | | |
| `container` | radius | `radius-md` | | |
| `title` | text style | `typography-body-sm-semibold` | | |

Layout rules: {hug / fill, min / max width, how the slot grows, wrapping}.

### B3 Tokens by part and state

> Machine-readable source: `{name}.tokens.json` in this folder (component tokens, D-13; every value aliases a semantic token). This table and `{name}.tokens.json` must name the same tokens — `npm run component-tokens` fails if they drift.

Every visual value of the component. If a value is missing from foundations, stop — the Planner adds the token first.

| Part | Property | Default | Hover | Pressed | Focus | Selected | Disabled |
|---|---|---|---|---|---|---|---|
| `container` | background | `color-background-neutral-default` | `color-background-neutral-hover` | `color-background-neutral-pressed` | — | | `color-background-neutral-disabled` |
| `container` | border | | | | `color-border-focus` | `color-border-brand` | |
| `container` | elevation | `elevation-0` | `elevation-1` | | | | |
| `title` | color | `color-text-neutral-default` | | | | | `color-text-neutral-disabled` |

Dark theme: same tokens (values switch automatically). List exceptions only.

### B4 States and transitions

Merges "states" and "motion" into one table (trigger → what animates → timing).

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Default → Hover | pointer enter | background, elevation | `motion-duration-sm` | `motion-easing-standard` |
| Default → Selected | click / tap / Space | border color | `motion-duration-sm` | `motion-easing-standard` |
| Any → Loading | `loading=true` | content → spinner | `motion-duration-xs` | `motion-easing-linear` |

Reduced motion: {what is removed — transitions become instant; scale effects disabled}.

### B5 RTL

```
LTR  │  [◆]  Label text               [▸]  │
RTL  │  [◂]               نص التسمية  [◆]  │
```

| Part | In RTL |
|---|---|
| layout | Mirrors automatically (logical properties / `…Directional`) |
| `trailing-icon` (chevron) | Mirrors |
| `leading-icon` (check, logo, clock) | Does not mirror |

### B6 Accessibility (implementation)

Design-level rules are in A9; this is how this platform meets them.

| Requirement | Implementation |
|---|---|
| Role / semantics | {web: `role`, `aria-*` · Flutter: `Semantics(button: true, selected: …)`} |
| Accessible name | from `title`; icon-only parts need `aria-label` / `semanticLabel` |
| Focus | 2px `color-border-focus`, `border-focus-offset` (foundations a11y) |
| Target size | ≥ `target-min` (24px web · 48dp touch) |
| Screen reader output | "{title}, {state}, {role}" |

| Key | Action |
|---|---|
| Tab / Shift+Tab | Moves focus in / out |
| Enter / Space | Activates |
| Esc | {if applicable} |

### B7 Examples

Minimal, copy-pasteable. Always show one EN and one AR example.

```tsx
// Basic
<{Name} variant="primary">Save changes</{Name}>

// Arabic (direction comes from the provider — no extra props)
<{Name} variant="primary">حفظ التغييرات</{Name}>
```

### B8 Figma

Structure, properties, the Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

What the test file covers (filled by the Planner; the plan's acceptance criteria point here).
- [ ] Light + dark · en + ar
- [ ] Every state in B4
- [ ] Every invalid combination in B1 warns / asserts
- [ ] a11y: axe (web) / `meetsGuideline` tap target + contrast (Flutter), keyboard table in B6

---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `{name}-contract.md`.

> Written by the Planner (Claude). Executed by any agent. Reviewed by Claude against this file.
> Executor: read `AGENTS.md`, the section Part B, this file and the spec Part B next to it. Nothing else unless linked here.
> **The spec (Part B in this folder) is the contract** — API, dimensions, tokens, states, RTL, a11y. This plan does not repeat it; it says how to build it.

| Field | Value |
|---|---|
| Plan version | 1 · {YYYY-MM-DD} |

### C1 Goal

One paragraph: what "done" means for this platform.

### C2 Scope

**In scope** — spec sections to implement:
- [ ] C1 API (all props / only: …)
- [ ] C2 Dimensions · C3 Tokens · C4 States · C5 RTL · C6 Accessibility

**Out of scope** (do not build)
- …

### C3 Approach

- Base: {theme MUI `Card` via `components.MuiCard` overrides · wrap M3 `Card` · custom widget because …}
- Where styles live: {component folder / theme override}
- Gotchas: {known MUI / Flutter limitations and the chosen workaround}

### C4 Token gaps

New tokens needed before execution (Planner adds them, never the Executor): none / list with proposed name and value.

### C5 Files to create / change

(Planner writes `{name}.tokens.json` next to the spec before the plan is `Planned`; it is synced to the platform's Figma file by `sync:plan`.)

```
{exact paths}
```

### C6 Tests

Implement every item in B9, plus:
- [ ] …

### C7 Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 exactly (names, types, defaults)
- [ ] AC-2 Every value in B2–B3 comes from the listed token; no raw values, no primitives
- [ ] AC-3 Every transition in B4 implemented; reduced motion respected
- [ ] AC-4 RTL behaves as B5; a11y as B6
- [ ] AC-5 Tests in B9 exist and pass; all commands in AGENTS.md §5 pass
- [ ] AC-6 Exported from the package entry file; section README status table updated
- [ ] AC-… {component-specific}

---

### C8 Execution log (filled by the Executor)

| Field | Value |
|---|---|
| Agent | |
| Date | |
| Files changed | |

**Deviations from the plan or spec** (with reason — the Planner updates the spec if accepted):
- none

**Questions for the Planner:**
- none

---

## D · Figma build

> How to build Part B in Figma. The Figma Agent receives this through the generated `figma-{name}-contract.md`.

> Written by the Planner (Claude) together with Part C. Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> Figma Agent: read this file, the spec Part B next to it (all values) and the guidelines (anatomy, options, do/don't). Nothing else.
> **Values are never written here.** Sizes, tokens, states and timings come from the spec (B2–B4). This file says how to build them in Figma.
> Direction of sync (D-01): code tokens are the source of truth; Figma follows the spec. If Figma needs something the spec lacks, stop and ask — do not invent it.

| Field | Value |
|---|---|
| Figma file | **Biowave DS — {Web | Tablet | Mobile} Components** (`_sync/figma-files.json` › `{web | tablet | mobile}`) — never the Foundations file |
| Page / section | `↳ {Component}` (one page per component) |
| Mode | {Create new · Update existing → node `{id}` (keep the node, re-bind; never delete and recreate)} |
| Plan version | 1 · {YYYY-MM-DD} |

### D1 Rules for this build

0. **Component tokens only (D-13, strict).** This file may hold exactly one kind of local variable: this component's `<Component> / <Group>` collections. Never create a local primitive or semantic variable or any other collection, never copy or detach a library variable, never create a local text / effect / colour / grid style. `figma-read-tokens.js` lint must report 0 before Phase 1 and after each phase.
   **Library first.** Semantic variables, text/effect styles, icons and the Doc Kit come from the published **Biowave DS — Foundations** library. The only local variables allowed are this component's **component tokens** (`<Component> / <Group>` collections created by the sync tooling from `{name}.tokens.json`; each aliases a Foundations semantic variable). **Bind component layers to the component tokens** and select the option with the collection's explicit variable mode (e.g. `Button / Filled` = `brand`). Never create variables or styles by hand. Tablet/Mobile pages set the Typography variable mode to `Tablet`/`Mobile`.
1. **Every value is bound.** Fills, strokes, radius, padding, gap, width/height → variables; text → text styles; shadows/focus → effect styles. No raw hex / px.
2. **Token → variable name:** replace `-` between segments with `/` — `color-background-brand-hover` → `1. Themes › color/background/brand/hover`; `spacing-md` → `spacing/md`; `radius-md` → `radius/md`; `border-width-focus` → `border/width/focus`.
   Text styles: `{Web|Tablet|Mobile}/{style}`. Effect styles: `Elevation/1…4`, `Focus/Ring`, `Shadow/Control`.
3. **Never** bind `_Primitive/*` or `_deprecated/*`.
4. **Layer names = anatomy part names** (A2), kebab-case. No `Frame 12`, no `Group`.
5. Auto layout on every frame. No absolute positioning except badges/indicators listed in D3.
6. Use existing library components for nested parts (Button, Icon, Badge…) — instances, never detached.

### D2 Component structure

```
❖ {Name}                          ← component set (published)
  ├─ ◇ .{Name}/{part}             ← private base component (dot = hidden from assets panel)
  └─ ◇ .{Name}/{part}
```

### D3 Layer tree and auto layout

ASCII tree = exact layer hierarchy. Values in `{…}` are spec references, not numbers.

```
{Name}                    ↔ horizontal · gap {B2 gap} · pad-inline {B2} · pad-block {B2}
│                           width: hug | fill | fixed {…} · height: hug · radius {B2} · stroke {B3}
├── leading-icon          ◇ instance Icon · size {B2} · BOOLEAN `Leading icon` · INSTANCE_SWAP `Icon`
├── label                 T text style {B2} · fill {B3} · TEXT `Label` · width: hug · truncate: {yes/no}
└── trailing-icon         ◇ instance Icon · BOOLEAN `Trailing icon`
```

Wireframe of the result (LTR), for orientation:

```
┌───────────────────────────────────────┐
│  [◆]  Label text               [▸]    │
└───────────────────────────────────────┘
   ①      ②                       ③
```

### D4 Properties

Each property maps 1:1 to a spec prop (B1). This table is the source for Code Connect (D9).

| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `Variant` | VARIANT | `Primary` · `Secondary` | `Primary` | `variant` | `'primary'` · `'secondary'` |
| `Size` | VARIANT | `SM` · `MD` · `LG` | `MD` | `size` | `'sm'` … |
| `State` | VARIANT | `Default` · `Hover` · `Pressed` · `Focus` · `Disabled` | `Default` | — | interaction state, not a prop (except `disabled`) |
| `Label` | TEXT | | `Label` | `children` | |
| `Leading icon` | BOOLEAN | | `false` | `startIcon` | present / absent |
| `Icon` | INSTANCE_SWAP | preferred: Icons set | | `startIcon` | |
| `Direction` | VARIANT | `LTR` · `RTL` | `LTR` | — | Figma only; code mirrors automatically |

### D5 Variants to generate

- Axes: `Variant × Size × State × Direction` = {n} variants
- Exclude invalid combinations from B1: {list} → final count **{n}**
- Hover state: web only (omit on Tablet / Mobile)
- Grid layout of the set (the raw set; the labelled matrix is doc page 00): rows = {Variant × Size}, columns = {State}; gap {spacing/xl}

### D6 States, interactions and motion

Values from B3 (tokens per state) and D4 (transitions).

| Interaction | From → To | Animation |
|---|---|---|
| While hovering | Default → Hover | Smart animate · duration/easing from B4 |
| While pressing | Hover → Pressed | Smart animate · B4 |
| On click | Default → Selected | B4 |

### D7 RTL

Method: {`Direction=RTL` variants (default) · separate RTL page}. In RTL variants: reverse auto-layout order, text align end, mirror only the parts B5 marks "Mirrors". Use Arabic sample copy from A6.

```
LTR  │  [◆]  Label text               [▸]  │
RTL  │  [◂]               نص التسمية  [◆]  │   ← chevron mirrored, icon ◆ not mirrored
```

### D8 Documentation pages

The Figma Agent builds a full documentation set next to the component, in a fixed order and layout, so every component's docs look the same.

**Rules**
- Build only from the **Doc Kit** (Foundations file › `↳ Doc Kit` page, used through the library — see [`2-foundations/figma-doc-kit.md`](../../../2-foundations/figma-doc-kit.md)). Never draw headers, tables, Do/Don't cards or callouts by hand. If the kit is missing, stop and report.
- Every example is a **live instance** of the component being documented — never a flattened copy or a screenshot, so docs update when the component changes.
- **Text comes from the markdown sources** (table below). Copying text is allowed here only, because these pages are a rendering of the docs. Do not write new guidance in Figma.
- Frames named `{Name} / {nn} {Page}` (e.g. `Card / 03 Variations`), placed left → right in order, inside a section `{Name} — Documentation`.
- All pages Light theme, EN, except where the page says otherwise. Use real sample content from A6, not "Lorem ipsum".
- Skip a page only if its source section does not exist (e.g. no `10 Changes` for v1.0). Never leave an empty page.

| # | Page | Width | Source |
|---|---|---|---|
| 00 | Component sheet | Wide | D4–D5 (generated) |
| 01 | Introduction | Standard | A1–A2 |
| 02 | Props and tokens | Standard | B1, B3 |
| 03 | Variations | Wide | A4 |
| 04 | States and motion | Wide | B4 · D6 |
| 05 | Usage guidelines | Standard | A3, A7 |
| 06 | Content guidelines | Standard | A6 |
| 07 | Platform | Standard | A8 |
| 08 | RTL | Standard | B5 · D7 |
| 09 | Accessibility | Standard | A9 · B6 |
| 10 | Changes from previous version | Wide | F0 (only when version > 1.0) |
| 11 | Changelog | Standard | F1 · F2 |

**Two phases, one contract.** Phase 1 builds the component set (D1–D7). Phase 2 starts as soon as Phase 1 is finished: the 12 pages below, then this component's card on the file's **Components List** page (`Doc/Home card` with a live instance of the default variant, title, link "View Component ↗" to the component page). One review covers both phases.

Page layouts (header and pages 00–11, with ASCII layouts) are defined once in [`2-foundations/figma-doc-kit.md` › Page layouts](../../../2-foundations/figma-doc-kit.md#page-layouts). Write here only the **page notes** for this component (which blocks each page shows, platform devices, special examples) and the component description line.

### D9 Code Connect

- File: `{3-web-components/src/components/<name>/<Name>.figma.tsx | lib/src/components/<name>/bw_<name>.figma.dart}`
- Mapping: D4 table. Publish after the code component is `Approved`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Component set, base components and layer names match D2–D3 and A2
- [ ] F-AC-2 Properties match D4 exactly (names, types, values, defaults)
- [ ] F-AC-3 Variant count = D5; no invalid combinations
- [ ] F-AC-4 Zero raw values: every fill, stroke, radius, spacing, size, text and effect bound (QA lint report attached)
- [ ] F-AC-5 Correct in Light and Dark (variable mode switch only, no duplicate variants per theme)
- [ ] F-AC-6 RTL variants per D7; Arabic copy fits without truncation
- [ ] F-AC-7 Interactions per D6; component description filled
- [ ] F-AC-9 Every documentation page in D8 exists, in order, built only from Doc Kit components with live instances; text matches the markdown sources; Introduction has Light + Dark panels
- [ ] F-AC-8 Values match B2–B3 one by one (redline check)

---

### D11 Execution log (filled by the Figma Agent)

| Field | Value |
|---|---|
| Agent / stages run | build · rtl · qa · document |
| Date | |
| Node IDs | component set `{id}` · docs section `{id}` · pages 00–11 `{id…}` |
| QA report | {unbound values: 0 · contrast: pass · …} |

**Deviations** (with reason — the Planner updates the spec if accepted):
- none

**Questions for the Planner:**
- none

---

## E · Review

> One block per review round, newest first.

### E1 Summary

| Round | Date | Code verdict | Figma verdict |
|---|---|---|---|
| 1 | {YYYY-MM-DD} | {Approved · Changes requested} | {Approved · Changes requested · not reviewed} |

### E2 Round 1 — {YYYY-MM-DD}

| Field | Value |
|---|---|
| Plan version reviewed | 1 |
| Spec version reviewed | 1.0 |
| Reviewer | Claude |
| Date | {YYYY-MM-DD} |
| Verdict | {Approved · Changes requested} |

#### Acceptance criteria

| AC | Result | Evidence (file:line / test name) |
|---|---|---|
| AC-1 | ✅ / ❌ | |

#### Rule checks (AGENTS.md §2)

| Rule | Result | Notes |
|---|---|---|
| No generated files edited | | |
| No raw values / no primitives | | |
| Logical properties, RTL icons | | |
| Light + dark, en + ar tested | | |
| Accessibility (keyboard, focus, labels, target) | | |
| Stayed inside the plan | | |
| Code matches spec README (API names, tokens, states, RTL, a11y) | | |
| Accepted deviations reflected back into the spec | | |

#### Figma build (Part D)

Skip if the Figma build is not part of this review.

| AC | Result | Evidence (node ID / QA report) |
|---|---|---|
| F-AC-1 | ✅ / ❌ | |

#### Findings

| # | Severity | File / node | Issue | Required change |
|---|---|---|---|---|
| 1 | 🔴 Blocker / 🟡 Should fix / 🟢 Nit | | | |

#### Next step

- Approved → set status `Approved` in the section README.
- Changes requested → Executor fixes the 🔴 and 🟡 items, appends to the plan's Execution log, sets status `Built` again.

---

## F · Changelog

> Changes to this component on this platform. Every entry also gets one line in the root `CHANGELOG.md`.

### F0 Changes from previous version

Only when the version is above 1.0 (feeds Figma doc page 10): what changed visually, old → new, with migration notes.

### F1 Guidelines changelog

| Version | Date | Change | Migration | Author |
|---|---|---|---|---|
| 1.0 | {YYYY-MM-DD} | Initial | — | |

### F2 Spec changelog

| Version | Date | Change | Breaking | Migration |
|---|---|---|---|---|
| 1.0 | {YYYY-MM-DD} | Initial | No | — |

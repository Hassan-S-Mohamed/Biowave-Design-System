# Templates and writing rules

> Agent summary: how component docs are written. One template per component per platform ([`component.md`](component.md)), one for section READMEs ([`section-readme.md`](section-readme.md)). This page holds the rules every doc follows: one fact one home, section IDs, how sections map to the web and Figma documentation, ASCII wireframes, assets and writing style.

## 1. The component file

`<section>/components/<name>/<name>.md` — one per component per platform, written by the Planner from [`component.md`](component.md).

```
<section>/components/<name>/
├── <name>.md                  ← source: A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog
├── <name>.tokens.json         ← machine copy of B3 (D-13) — Figma sync reads it
├── <name>-contract.md         ← GENERATED (npm run contract) → code Executor
├── figma-<name>-contract.md   ← GENERATED (npm run contract) → Figma Agent
├── <name>.html                ← web documentation page (reads <name>.md)
└── assets/                    ← images, only when needed
```

| Part | Who writes | Who reads | Same on all platforms? |
|---|---|---|---|
| A Guidelines | Planner | Designers, PMs, Planner | **Yes**, except A8 — change all three files in one task (`docs:check` fails on drift) |
| B Spec | Planner | Through both contracts; Reviewer | No |
| C Code plan | Planner (C8 by the Executor) | Through `<name>-contract.md` | No |
| D Figma build | Planner (D11 by the Figma Agent) | Through `figma-<name>-contract.md` | No |
| E Review | Reviewer | Planner, builders | No |
| F Changelog | Whoever changes the component | Everyone | No |

Section IDs (`A1` … `F2`) are fixed. Reviews, contracts, the HTML page and `docs:check` address sections by ID — never renumber. The numbers are the same as the old separate files (guidelines §4 = A4, spec §3 = B3, plan §7 = C7, figma.md §8 = D8).

**Plan status.** The header field `Plan` is `Draft` while writing, `Finished` after the Planner (and, for big changes, a plan review) is done, `Open` when a review sends Planner items back. Contracts are generated only when it is `Finished`.

## 2. One fact, one home

| Fact | Home | Everywhere else |
|---|---|---|
| Part names (anatomy) | A2 | Use the same names in B, D, code and Figma layers |
| Option names and values | A4 | B1 uses the same names as props |
| When to use / which option | A3–A4 | Link |
| Copy rules, EN/AR examples | A6 (component-specific only) | General rules: [`2-foundations/guidelines/content.md`](../2-foundations/guidelines/content.md) |
| Props, types, defaults | B1 | C links to it |
| Token per part and state | B2–B3 (human) + `<name>.tokens.json` (machine, D-13) — checked equal by `npm run component-tokens` | C lists only token gaps |
| Motion timings | B4 | General rules: [`motion.md`](../2-foundations/guidelines/motion.md) |
| Focus ring, contrast, target size | [`a11y.md`](../2-foundations/guidelines/a11y.md) | B6 references, never redefines |
| Acceptance criteria, files | C (code) · D (Figma) | — |
| Figma structure, properties, Figma ↔ code mapping, Code Connect | D | B8 links to it |
| Figma documentation page layouts | [`2-foundations/figma-doc-kit.md` › Page layouts](../2-foundations/figma-doc-kit.md#page-layouts) | D8 holds only page notes |
| Status | File header | Section README table (checked equal by `docs:check`) |

Guidelines are copied into the three platform files on purpose (decision 2026-10-17) so each file is complete; `docs:check` keeps the copies identical.

## 3. How sections become documentation

The web page (`<name>.html`, design unchanged) and the Figma documentation pages (Blade-derived template, built from the Doc Kit) read the same sections:

| Web tab | Sections | Figma page | Sections |
|---|---|---|---|
| Overview | Header · A1 · A2 (+ status and contract links) | 00 Component sheet | D4–D5 (generated from the set) |
| Props & tokens | B1 · B2 · B3 | 01 Introduction | A1–A2 |
| Variations | A4 (live matrix) | 02 Props and tokens | B1 · B3 |
| States & motion | A5 · B4 | 03 Variations | A4 |
| Usage | A3 · A7 | 04 States and motion | B4 · D6 |
| Content | A6 | 05 Usage guidelines | A3 · A7 |
| Platform | A8 | 06 Content guidelines | A6 |
| RTL | B5 | 07 Platform | A8 |
| Accessibility | A9 · B6 | 08 RTL | B5 · D7 |
| Changelog | F · A10 (related) | 09 Accessibility | A9 · B6 |
| | | 10 Changes from previous version | F0 (only when version > 1.0) |
| | | 11 Changelog | F1 · F2 |

Home pages — **Foundation List** and **Components List** — follow the layout in [`2-foundations/figma-doc-kit.md` › Home pages](../2-foundations/figma-doc-kit.md#home-pages) on both the web and in Figma.

## 4. ASCII wireframes
Every component doc uses ASCII wireframes so agents (who cannot see images) and humans read the same layout. Images are optional extras; wireframes are required in A2 Anatomy, B2 Dimensions, B5 RTL, D3 and D7.

| Symbol | Meaning |
|---|---|
| `┌ ┐ └ ┘ │ ─` | Container edge |
| `├ ┤` (inside a box) | Divider |
| `① ② ③` | Anatomy part number (matches the Anatomy table) |
| `[◆]` | Icon (not mirrored in RTL) |
| `[▸]` `[◂]` | Directional icon (mirrored in RTL) |
| `[Label]` | Button / action |
| `[■■ Label ■■]` / `[── Label ──]` | Filled / outlined action |
| `(12)` | Counter / badge |
| `░░░ slot ░░░` | Slot (consumer content) |
| `├────┤ spacing-md` | Spacing redline, annotated with the token |
| `┬ │ ┴ size-…` | Height redline |
| `↔` / `↕` | Auto layout horizontal / vertical (Part D) |
| `❖` / `◇` / `T` | Component set / component or instance / text layer (Part D) |

Rules: monospace-aligned, max 80 columns, LTR first then RTL when it differs, Arabic sample text in RTL wireframes, never write px values — annotate with tokens.

## 5. Assets
Images go in `<section>/components/<name>/assets/` (`overview.png`, `anatomy.png`, `do-1.png`, `dont-1.png`, …). Export light and dark where the difference matters. The web page shows an image in its section when the file exists; until then the wireframe is the reference.

## 6. Writing style
- Sentence case everywhere — headings, table headers, labels.
- No trailing punctuation on UI labels or list items; full stop at the end of complete-sentence descriptions; no exclamation marks.
- Use "…" (the ellipsis character), not "...", in loading copy.
- Verb-first action labels that say the outcome ("Save changes", not "Continue").
- Every EN copy example has its AR pair; Arabic is MSA, sentence case, no "left/right" wording; allow 20–30% more width.
- Do and don't: at least 3 pairs, short imperative rules.
- Tokens by name only (`color-background-brand-default`, `spacing-md`) — never hex, px, ms or font names; never primitives. Values come from `2-foundations/dist/tokens.json`.
- WCAG **2.2** AA is the accessibility baseline.
- Delete an optional section that does not apply; never leave an empty one.
- A review or validation lists issues as a table: `# · Severity (🔴 / 🟡 / 🟢) · Section · Issue · Required change`.

## 7. Section READMEs
Every section README (`1-overview` … `5-mobile-components`) follows [`section-readme.md`](section-readme.md), so an agent always finds the same headings in the same order.

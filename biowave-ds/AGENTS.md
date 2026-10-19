# AGENTS.md — rules for every AI agent and developer

Read this file completely before doing anything. It is short on purpose.

## 1. Read order (do not read the whole repo)

1. This file.
2. Your role's **one file** (below). Each is complete; open nothing else unless it links to it.
3. Need a token value? `2-foundations/dist/tokens.json` (flat, resolved, every mode) — never guess.

| Role | Reads | Writes |
|---|---|---|
| **Planner** (Claude) | Section `README.md` + `<section>/components/<name>/<name>.md` (all Parts) + `_templates/README.md` | Parts A–D and F of `<name>.md`, `<name>.tokens.json`; runs `npm run contract` |
| **Previewer** (ChatGPT / Gemini) | A2 · A4 · A5 · A6 · B2 · B3 · B5 of `<name>.md`, `<name>.tokens.json`, `2-foundations/dist/tokens.json` | `<section>/components/<name>/previews/` — `<name>-light-en.jpg`, `<name>-dark-ar.jpg` + `README.md` (token sheet, prompts, checks). A sketch to check the plan; `<name>.md` stays the source of truth |
| **Code Executor** | `<section>/components/<name>/<name>-contract.md` **only** | Code + tests; **C8** Execution log in `<name>.md` |
| **Figma Agent** | `<section>/components/<name>/figma-<name>-contract.md` **only** | The Figma set + docs; **D11** Execution log in `<name>.md` |
| **Reviewer** (Claude) | B · C7 · D10 · C8 · D11 of `<name>.md`, the code, the Figma file | **Part E** (one round per review) |
| **Fixer** | The latest Part E round + `<name>-contract.md` | Code + tests; a **Fix round N** entry in **C8** (never edits Part E) |
| Designer / PM | The docs: `npm run docs` → Foundation List → Components List → component page | — |

**Agent workflow:** `_workflow/config.json` tells the orchestrator ([agent-workflow-kit](https://github.com/hassanSmohamed/agent-workflow-kit)) which agent does each role, which checks run per platform, and where the human gates are. One branch per component (`ds/<name>-<platform>`); run records in `_workflow/runs/`.

| Section | README | What it owns |
|---|---|---|
| 1-overview | `1-overview/README.md` | Purpose, vision, principles |
| 2-foundations | `2-foundations/README.md` | Tokens, guidelines, generated platform code, Doc Kit spec, Foundation List docs home |
| 3-web-components | `3-web-components/README.md` | React + MUI components — one folder per component |
| 4-tablet-components | `4-tablet-components/README.md` | Flutter tablet components — one folder per component |
| 5-mobile-components | `5-mobile-components/README.md` | Flutter mobile components — one folder per component |
| _templates | `_templates/README.md` | The component template, writing rules, ASCII legend, section → docs maps |
| _docs | `_docs/` (scripts) | Docs viewer, `docs:build`, `docs:check`, contract generator |
| _sync | `_sync/README.md` | Keeping generated code and Figma in step; Figma library index |
| _workflow | `_workflow/config.json` | Agent workflow settings (roles, checks, gates) and run records |

## 2. Golden rules

1. **Never edit generated files.** `*/generated/*`, `2-foundations/dist/`, `2-foundations/preview/`, `_sync/*.json`, every `*-contract.md`, every docs HTML shell and `components/index.json` (`npm run docs:build`).
2. **No raw values in components.** No hex, px, ms or font names. Use semantic tokens (`cssVars.*`, `var(--bw-…)`, MUI theme, `context.bw.*`, `BwSpacing.*`). A missing value means stop and report — tokens are added by the Planner, not the Executor.
3. **Never use primitives in components** (`primitive.*`, `BwPalette`). Only semantic tokens.
3a. **Component Figma files hold component tokens only (D-13, strict).** Semantic and primitive variables exist **only** in the Foundations file. A component file may contain exactly one kind of local variable: collections named `<Component> / <Group>` whose every value aliases a Foundations semantic variable. Never create a local primitive or semantic variable or any other collection, never copy or detach a library variable, never create a local style. Component tokens are written in `<name>.tokens.json` and pushed by the sync tooling; `figma-read-tokens.js` lint must report 0 before Phase 1 and after each phase.
4. **RTL first.** Logical properties only (`margin-inline-start`, `padding-inline`, `inset-inline-end`, `EdgeInsetsDirectional`, `AlignmentDirectional`, `BorderRadiusDirectional`). Mirror directional icons only; never logos, media controls, clocks or checkmarks.
5. **Both themes, both languages, always** — and tested.
6. **Accessibility is not optional.** WCAG 2.2 AA: keyboard operable, visible focus (`color-border-focus`, 2px, 2px offset), labelled, targets ≥ `target-min` (24px web, 48dp touch), reduced motion.
7. **Stay inside your contract.** Anything unclear or impossible goes in C8 / D11 → Questions. Do not invent behaviour.
8. **One component per task.** Do not refactor unrelated files.
9. **Every change is logged in `CHANGELOG.md` in the same task** — code, tokens, docs, Figma, tooling, structure. Newest entry at the top. Component detail also goes to that component's Part F. A task without its changelog entry is not done.
10. **Guidelines are copied on purpose.** Part A of a component is identical in its Web, Tablet and Mobile files except A8. Change all three in one task (`docs:check` fails otherwise).

## 3. Component workflow

```
Planner                                   Executors                                  Reviewer
───────                                   ─────────                                  ────────
<name>.md  Parts A–D (+ tokens.json)
  Plan: Draft → Finished
npm run contract -- <plat> <name>   ──►   Code Executor: <name>-contract.md     ──►  Part E: code verdict
  writes both contracts                     → code + tests, C8, Code = Built
                                          Figma Agent: figma-<name>-contract.md ──►  Part E: Figma verdict
                                            Phase 1 component set
                                            Phase 2 12 doc pages + Components List card
                                            → D11, Figma build = Built, sync:done:<plat>
                                                                                     Approved → Code Connect
                                                                                     Changes requested → back
```

- **Contracts are generated, never written.** The generator refuses unless `Plan` is `Finished`, component tokens pass, C4 has no token gaps, and every variable / style / component the Figma side needs has a key in `_sync/figma-library.json`. If the source changes, the contract becomes **stale** and builders stop until it is regenerated.
- A review that sends Planner items back sets `Plan` to `Open`; the Planner fixes A–D, sets `Finished`, regenerates.
- The Figma Agent builds docs only from the Doc Kit (`2-foundations/figma-doc-kit.md`), imported by key from the **Annotation** library (`figma-files.json` › `docKit`). Until the Doc Kit is built, Phase 2 is reported "blocked — Doc Kit" in D11; Phase 1 still goes ahead.
- **Where to see status:** [`STATUS.md`](STATUS.md) — a generated checklist of every component and pattern per platform, with the **Next** step and the role that owns it. Read it at the start of a task to pick work. Never edit it: after changing any status, run `npm run status` (`docs:check` fails if it is stale).
- Status values (`<name>.md` header and the section README Components table, kept equal by `docs:check`):
  - Plan: `Draft` · `Finished` · `Open`
  - Code / Figma build: `Planned` → `In progress` → `Built` → `In review` → `Approved` (or `Changes requested` → back to `In progress`)

### Executor checklist (code)
- [ ] Read AGENTS.md and your contract. Nothing else unless the contract links it.
- [ ] Set **Code** to `In progress` in the `<name>.md` header and the section README table.
- [ ] Create exactly the files in contract §9; export from the package entry file.
- [ ] Use only the tokens in contract §4.
- [ ] Write the tests in §10; run the commands in §13 — all must pass.
- [ ] Fill C8 in `<name>.md`; set **Code** to `Built`; run `npm run status`; add a `CHANGELOG.md` line.

## 4. Naming conventions

| Thing | Convention | Example |
|---|---|---|
| Token path (JSON) | dot-separated, lowercase, kebab inside a segment | `color.background.brand.hover` |
| Token name in docs | kebab-case | `color-background-brand-hover` |
| CSS variable | `--bw-` + kebab | `--bw-color-background-brand-hover` |
| TS access | object path | `cssVars.color.background.brand.hover` |
| Dart access | camelCase without category | `context.bw.colors.backgroundBrandHover`, `BwSpacing.md`, `BwRadius.xl2` |
| React component | PascalCase, no `Bw` prefix on web | `Button`, `TextField` |
| Flutter widget | `Bw` + PascalCase | `BwButton` |
| Component folder / file | kebab-case, same name twice | `components/text-field/text-field.md` |
| Section IDs in `<name>.md` | Part letter + number, fixed | `A2`, `B3`, `D8` |
| Dart file | snake_case | `bw_text_field.dart` |
| Size scale | `sm · md · lg · xl` (add `xs`, `2xl` only if a plan needs them) | |

## 5. Commands that must pass

```bash
npm run tokens          # only if tokens changed — must end with "0 error(s)"
npm run sync            # must end with "READY for component work" (or "Everything is in sync"); exit code 0
npm run status          # after any status change — regenerates STATUS.md
npm run docs:check      # structure, guidelines, status, generated pages, contracts, links, STATUS.md
npm run typecheck       # web
npm run test:web        # web
cd 4-tablet-components && flutter analyze && flutter test
cd 5-mobile-components && flutter analyze && flutter test
```

## 6. Changing foundations

Only the Planner changes tokens. Steps: edit `2-foundations/tokens/**.json` → `npm run tokens` (must pass contrast checks; add new fg/bg pairs to `scripts/contrast-pairs.json`) → update the matching guideline page → add a line to `CHANGELOG.md` → note any rename in `2-foundations/AUDIT.md` → **sync Figma (§7)** → re-read the library index and regenerate contracts (`npm run sync:library`, `npm run contract -- --all`).

## 7. Keeping code and Figma in sync

Figma is split into four files (D-12). Keys live only in `_sync/figma-files.json`.

| File | Key | Owns | Repo source |
|---|---|---|---|
| **Biowave DS — Foundations** | `foundations` | Variables, text/effect styles, icons, Foundation List page. Published library | `2-foundations/` |
| **Annotation** (Doc Kit, D-17) | `docKit` | The `Doc/*` components for every documentation and home page. Published library, bound to the Foundations library; enable it in Foundations and the component files | `2-foundations/figma-doc-kit.md` |
| **Biowave DS — Web Components** | `web` | Web component sets + docs + Components List page | `3-web-components/components/*/figma-*-contract.md` |
| **Biowave DS — Tablet Components** | `tablet` | Tablet component sets + docs + Components List page | `4-tablet-components/components/*/figma-*-contract.md` |
| **Biowave DS — Mobile Components** | `mobile` | Mobile component sets + docs + Components List page | `5-mobile-components/components/*/figma-*-contract.md` |
| **Google · Material Symbols** | `icons` | Icon library (D-18): one component set per glyph, Style=Rounded used. Published library | `2-foundations/guidelines/icons.md`, `_sync/figma-icons.json` |

- Start of any task: `npm run sync` (or `_sync/status.txt` if the watcher runs), then read [`STATUS.md`](STATUS.md) for what to work on.
  - **✗ BLOCKED** (stale generated code, Figma variables pending, component tokens pending or invalid) → do not start component work; report it.
  - **✓ READY** with ⏳ items in the **Figma build queue** → start. The queue lists Figma contracts not yet built in Figma; it never blocks code work.
- Component tokens: edit `<name>.tokens.json` → `npm run component-tokens` → `npm run sync:plan` → run `_sync/figma-apply-tokens-<file>.js` with `use_figma` → `_sync/figma-read-tokens.js` → `npm run sync:verify-tokens -- <file> <dump>` → `npm run sync:done:tokens:<file>`.
- After a token change: `npm run sync:plan` → `figma-apply-N.js` → `figma-read.js` + `npm run sync:verify` → `npm run sync:done` → publish the library → re-read the library index.
- After the Figma Agent built a contract: `npm run sync:done:<web|tablet|mobile>`. Doc Kit changes: `npm run sync:done:doc-kit`.
- Never edit Figma variables by hand to "fix" a difference — fix the token JSON, then sync. Full procedure: `_sync/README.md`.

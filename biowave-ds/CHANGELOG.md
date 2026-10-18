# Changelog

Every change to the design system is logged here **in the same task**, newest first (AGENTS.md rule 9). Format: [Keep a Changelog](https://keepachangelog.com); versions follow SemVer per package. Component detail also goes to that component's Part F.

## [Web Button — code round 2 built] — 2026-10-18
- Fixed review findings #1, #2, #3, #5, #6, #7 and #8: stable loading name with external live status, one sanitized RTL icon flip, opacity fades, progress-duration spinner, instant disabled transitions, shared visually-hidden helper, and the complete 24-test contract matrix.

## [Web Button — review round 1 Planner items, contracts generated] — 2026-10-18
First full-loop test of the R-01 process (Planner → contracts → other agents → review).
### Added
- Token `motion-duration-progress` (primitive `duration.1000` = 1000ms): one full turn of a looping progress indicator; **not** zeroed by reduced motion. Outputs: `--bw-motion-duration-progress`, `cssVars.motion.duration.progress`, `BwDuration.progress`. Exception rule added to `2-foundations/guidelines/motion.md`. Code-only (no Figma variable, like all motion tokens). `npm run tokens` 162/162 contrast pass.
- `3-web-components/components/button/button-contract.md` and `figma-button-contract.md` (generated, `npm run contract -- web button`).
### Changed
- Web Button `button.md` 1.0 → 1.1, Plan `Open` → `Finished` (closes E2 findings #1, #3, #4, #7, #9, #10): B2 + C3 loading content hidden with `opacity` only and the `role="status"` region moved outside the button (keeps the accessible name); B4 + C3 spinner uses `motion-duration-progress`; B5 + C3 `bw-icon-directional` class is the main way, `mirrorInRtl` stripped by the Button, flip scoped to `.bw-button__icon`; C3 instant disabled change; C6 regex with word boundaries plus new tests (name while loading, single RTL flip, per variant × color tokens, spinner under reduced motion); C7 AC-9 / AC-10 (round-2 Executor fixes). Planner response added under E2; F0 / F2 rows added. `3-web-components/README.md` Plan column updated.
- `_sync/figma-library.json` re-saved (token source hash changed; Figma variables unchanged — 318 variables, 140 text / 7 effect styles, 0 components).

## [Structure — R-01: one file per component per platform, contracts, docs home pages] — 2026-10-18
Implements `PLAN.md` v4 (approved by Hassan 2026-10-18; the plan file is removed — this entry is its record). Backup: `../_backup-2026-10-18-pre-R01.tar.gz`.
### Changed
- **One folder and one file per component per platform:** `<section>/components/<name>/<name>.md` = A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog, merged mechanically from the old guideline, spec, plan, figma and review files (content-loss check: every source line present except the intended drops — other platforms' A8 columns, duplicated status rows, the old B8 pointer). Section numbers kept from the old files (spec §3 = B3, figma.md §8 = D8 …); references rewritten.
- Guidelines copied into all three platform files (decision 2026-10-17); A8 keeps only that platform. Tablet/Mobile Part D split into D2 · D3 · D4 (were one "2–4" block).
- Component tokens moved to `<name>.tokens.json` (`$extends` paths updated); component-token hashes unchanged, so Figma stays in sync.
- Templates: one `_templates/component.md` (replaces 5) + `section-readme.md` + `README.md` (writing rules, one fact one home, ASCII legend, section → web tab / Figma page maps, plan status values).
- Section READMEs 3/4/5 rewritten to the standard template; their Components table is the status source together with each file header. Root README (structure, status, D-14…D-16), AGENTS.md (role read-map, rule 3a strict, rule 9 changelog, rule 10 guidelines copies, contract workflow), ROADMAP and `_sync/README.md` updated.
- Web docs keep the catalog design (10 tabs); now one generated HTML page per component (`<name>.html`) reading only `<name>.md`, with platform switch, component menu, status card and contract links; sizes resolved from tokens at runtime.
- `_sync`: the Figma build queue tracks generated Figma contracts (editing a plan, review or changelog no longer re-queues Figma work); `npm run sync` adds the library index and contract status.
### Added
- **Contracts:** `npm run contract -- <platform> <name>` (`_docs/contract.mjs`) generates `<name>-contract.md` (code Executor) and `figma-<name>-contract.md` (Figma Agent: target file, library connections, component-token collections, every variable / text style / effect style with its key, Phase 1 set, Phase 2 docs + Components List card, strict component-tokens-only rule, lint acceptance criteria). Gates: plan Finished, component tokens valid, no token gaps, fresh library index. Generated for 11 components; **Web Button waits** (plan Open — review round 1 Planner items).
- **Figma library index** `_sync/figma-library.json` read from Figma on 2026-10-18: 318 semantic variables, 140 text styles, 7 effect styles, 0 Doc Kit components (not built yet); all 318 reachable from the Web Components file. `_sync/figma-read-library.js`, `_sync/library.mjs`, `npm run sync:library`.
- **Home pages:** Foundation List (`2-foundations/index.html`, 10 cards: the 7 from Hassan's example + Motion, Accessibility, Content) with `foundation.html#<card>` guideline pages; Components List per platform (`<section>/index.html`, generated from the component folders). Figma equivalents specified in `2-foundations/figma-doc-kit.md` › Home pages (new `Doc/Home header`, `Doc/Title bar`, `Doc/Home card`, `Doc/Footer`).
- `2-foundations/figma-doc-kit.md` (moved) now owns the 12 Figma documentation page layouts (from the old Figma build template) and the home pages; v1.1.
- `npm run docs` (server), `docs:build` (generates all HTML shells + `components/index.json`), `docs:check` (structure, Part A identity, status, generated pages, contracts, links, removed paths, demo tokens).
- Component file headers gained `Summary`, `Summary (ar)`, `Parts`, `Parts (ar)` (moved from the old catalog script) and `Plan`, `Code`, `Figma build`, `Review` status fields.
### Removed
- The separate component-guidelines section, the per-platform spec folders, the three platform preview folders, the old catalog folder (moved to `_docs/`) and the five old templates. Audit moved to `_audits/button-family.md`.
### Verified
- `npm run docs:check` ✓ (12 component files) · `npm run sync` ✓ READY, same blocking state as before; queue now 12 Figma contracts (+ Doc Kit) instead of 40 doc files · `npm run component-tokens` ✓, hashes unchanged · `npm run typecheck` ✓ · `npm run test:web` ✓ 21/21 (clean install; the macOS `node_modules` cannot run Vitest in the Linux shell) · Flutter not run (no SDK in this environment).
- Docs pages opened in a browser: Foundation List, a foundation page, Components List (Web, Tablet), component pages in en/ar × light/dark — all tabs render from `<name>.md`, platform switch and menus link correctly, Overview identical to the old catalog.
- Contract gates tested: an invalid token alias and a `Draft` plan both stop generation with the exact reason; editing Part D marked the affected contracts stale.

### Found (not changed)
- The Foundations Figma file still holds legacy component-level collections (`Button size`, `Avatar size`, `Checkbox size`, `Radio button size`, `Component Tokens / Link`) — against rule D-13 for the new system. Left untouched; deprecate when the new sets replace the legacy ones.
- The `biowave-component-doc` skill is out of date (wrong token values and names, old section structure, WCAG 2.1); an update is proposed separately.
- Figma Doc Kit not built yet — blocks every Figma documentation page and both Figma home pages (Phase 2 of every Figma contract).

## [Plan — R-01 repository restructure] — 2026-10-17
### Added
- `PLAN.md` (status: Proposed, not implemented): one folder and one `.md` per component per platform (guidelines copied into each), one HTML documentation page per component linked to its files, single component template, standard section README, sync tooling path changes, changelog rule and backfill of unlogged 2026-10-16 changes. Awaiting Hassan's approval.
### Changed (v2, 17:20)
- `PLAN.md` v2: adds generated implementation contracts per component and platform — `<name>-contract.md` (code Executor) and `figma-<name>-contract.md` (Figma Agent, with library connections and variable / style / component keys) — plus the Figma library index `_sync/figma-library.json` and `npm run contract`. Still not implemented.
### Changed (v3, 17:30)
- `PLAN.md` v3: documentation-style coverage check (§4.4) — 17 doc styles mapped; gaps G1–G9 (one page map for web + Figma docs, Part F1 "Changes", page layouts moved to the Doc Kit file, Doc Kit gate, demo CSS rule, sizes from tokens, outdated `biowave-component-doc` skill, assets display, foundation guideline links). Still not implemented.
### Changed (v4, 23:59)
- `PLAN.md` v4: Foundation List (10 cards) and Components List home pages in Figma and web, from Hassan's examples · web component pages keep the current 10 tabs · Figma docs keep the Blade-derived 12-page template · Figma contract in two phases (component set, then docs + home card) · strict component-tokens-only rule for component Figma files with an extended lint. Still not implemented.

## [Docs — component catalog preview] — 2026-10-16
### Added
- Component catalog: shared `catalog.css` / `catalog.js` / `server.mjs`, one preview page per platform, `npm run preview:components`; documentation tabs rendered at runtime from the markdown sources; playground controls (color, icons); Tablet/Mobile README catalog sections; backup `_catalog-backup-2026-10-16.tar.gz`.
### Note
- Logged on 2026-10-18 (backfill). Superseded by the docs viewer in R-01 (same design).

## [Review — Web Button round 1: Changes requested] — 2026-10-16
### Reviewed
- Typecheck ✅, 21/21 tests ✅, sync READY, component tokens ✅; Flutter not verifiable in the review environment.
- Findings: 2 blockers (loading state changes the accessible name; directional icon flipped twice in RTL), 4 should-fix (`mirrorInRtl` typing, spinner freezes under reduced motion — token gap, content fade, weak tests), 4 nits. Full record: `3-web-components/components/button/button.md` › Part E.
### Note
- Logged on 2026-10-18 (backfill).

## [Components — Web Button built] — 2026-10-16
### Added
- `3-web-components/src/components/button/`: `Button.tsx`, `ButtonSpinner.tsx`, `button.tokens.ts`, `index.ts`, `Button.test.tsx` (21 tests: light/dark, en/ar, states, axe); `src/internal/warnOnce.ts`; test setup `src/test/render.tsx`, `setup.ts`; `vitest.config.ts`; exported from `src/index.ts`.
### Note
- Logged on 2026-10-18 (backfill) — this change was not recorded when it was made.

## [Sync gate fix] — 2026-10-16
### Fixed
- `npm run sync` treated "component docs not yet built in Figma" as a red status, so code Executors refused to start (deadlock: code waited for Figma, but they are planned in parallel). Status now separates **BLOCKING** (code stale, Figma variables pending, component tokens pending/invalid → exit 1) from the **Figma build queue** (⏳, exit 0, "READY for component work"). `npm run sync:strict` keeps the full check for releases. AGENTS.md §5 and §7 updated.



## [Component tokens — D-13] — 2026-10-16
### Added
- Rule D-13: semantic variables only in Foundations; component files hold only component-token collections (`<Component> / <Group>`) aliasing Foundations semantic variables.
- `3-web-components/specs/button/tokens.json` (+ Tablet/Mobile via `$extends`, adding size `xl`).
- `_sync/component-tokens.mjs` (`npm run component-tokens`), `figma-apply-tokens.template.js`, `figma-read-tokens.js`, `sync:verify-tokens`, `sync:done:tokens:<file>`; `npm run sync` section 4.
### Synced and verified
- Button component tokens in Web / Tablet / Mobile Components: 6 collections, 41 variables each (Web 3 sizes, touch 4), every value an alias to a Foundations semantic variable, hidden from publishing, code syntax from the semantic variable. Lint: 0 violations in all three files; negative tests (copied semantic variable, raw value, wrong alias) detected.
### Changed
- AGENTS.md rule 3a + §7, `_sync/README.md`, templates (`figma.md` rule 0, spec §3, plan §5), Button `figma.md` binds component tokens with explicit modes; Definition of done adds `tokens.json`.


## [Figma workspace verified] — 2026-10-16
### Verified
- All four files in the team project (`_sync/figma-files.json` › `$project`); Foundations renamed **Biowave DS — Foundations** and published; library enabled in Web / Tablet / Mobile Components.
- From the Web file: all 9 Foundations collections visible; control tokens, inverse/overlay colors, `Focus/Ring`, `Focus/Ring Inverse` and `Web|Tablet|Mobile/{en|ar}/action/*` text styles importable; zero local variables in component files.
### Fixed
- `size/container/*` (11) were hidden from publishing in Foundations → made publishable (needed by Dialog, Side sheet). **Republish the library** to deliver them.
### Added
- Sync guard: `figma-read.js` marks hidden variables; `sync:verify` fails on any semantic variable hidden from publishing; `figma-apply` un-hides semantic variables it updates.


## [Figma files split — D-12] — 2026-10-16
### Added
- Figma files **Biowave DS — Web Components** · **Tablet Components** · **Mobile Components** (page structure: Cover, Index, Changelog, Components with one page per component, Internals). Keys in `_sync/figma-files.json` (the only place they are written).
- Foundations file: `↳ Doc Kit` page; effect style `Focus/Ring Inverse`; old component sections renamed `LEGACY …` (nothing moved or deleted).
- Sync tooling: component docs tracked **per Figma file**; `npm run sync` groups changes by file; `sync:done -- --components=<file>` (+ `sync:done:web|tablet|mobile|doc-kit`). `sync:done` alone now records variables only.
### Changed
- All 12 button-family `figma.md` files: each platform builds its own set in its own file (Create new; legacy sets are read-only references). Variant counts: Web Button 648 · Tablet/Mobile 720. Supersedes "one shared set for all platforms" from the earlier entry today.
- `_templates/figma.md`, `AGENTS.md` §7, `_sync/README.md`, `figma-doc-kit.md`, guidelines and spec headers point to the new files.


## [Components — button family planned] — 2026-10-16
### Added
- Guidelines: `button.md`, `icon-button.md`, `split-button.md`, `button-group.md`.
- Specs + plans + Figma build files for Web, Tablet and Mobile (36 files). One shared Figma component set per component for all platforms (Typography variable mode selects the platform scale).
### Decided (Planner, pending design-lead confirmation)
- Icon button sizes aligned to the control scale (`sm`–`xl`); Material 3 Expressive sizes, `Width` and `Shape` removed.
- Split button: `filled · tonal · outlined`, colors `brand · secondary · neutral`; built from Button + Icon button instances with a small gap.


## [Foundations 1.1.0] — 2026-10-16
### Added
- **Control tokens (P-04):** `size.control.height.{sm,md,lg,xl}` (32/40/48/56), `spacing.control.padding-inline.*` (8/12/16/24), `spacing.control.gap.*` (4/6/8/8). Replace the Figma-only `Button size` collection (to be deprecated once the button family is rebound).
- `color.background.inverse.{default,hover,pressed}`, `color.border.inverse`, `color.overlay.{hover,pressed}` for the button family.
- 12 contrast pairs (162 total, all pass).
### Decided
- B-01 … B-05 (button family) and D-10 Western digits.
### Synced
- Figma: 18 variables created with Web + Flutter code syntax; verified 189 variables in the changed collections; snapshot updated (459).


## [Roadmap v2 + Button family audit] — 2026-10-15
### Decided
- P-01 build our own web date/time pickers · P-02 MUI X DataGrid (MIT) · P-03 `7-patterns/` section · P-04 component values go into shared semantic **control** tokens first.
### Changed
- ROADMAP v2: button family first (Icon + Button Day 1; Icon button, Split button, Button group Day 2); 42 components; DS 1.0 Day 26.
### Added
- `6-component-guidelines/audits/button-family.md`: Figma gap audit of Button, Split button, Icon button, Button group; decisions B-01 … B-05.


## [Roadmap] — 2026-10-15
### Added
- `ROADMAP.md`: Phase 0 prep → 19 core components → 21 complex components → 13 patterns, 2–3 items per working day, buffer/release days 8, 18, 25; open decisions P-01 … P-04.


## [Sync tooling] — 2026-10-15
### Added
- `_sync/`: one-way sync files → generated code → Figma. `npm run watch` (auto-rebuild on token edits, macOS alerts), `watch:install` (start at login), `sync` (status), `sync:plan` (Figma Plugin API change scripts that keep variable IDs and primitive aliases, deprecate instead of delete), `sync:verify` (value-by-value check of every Figma mode), `sync:done` (baseline).
- Component docs (guidelines, specs, `figma.md`) tracked so changed components are flagged for the Figma Agent.
- AGENTS.md §7: sync procedure.
### Fixed
- Figma `_Primitive › Colors/white` was missing (present in code). Added, hidden, no scopes.
### Verified
- 441 Figma variables match the token source in every mode (themes, primitives, radius, spacing, size, typography EN/AR, grid & layout, border). Baseline saved in `_sync/figma-snapshot.json`.


## [Docs structure — Figma documentation pages] — 2026-10-15
### Added
- `figma.md` §8: 12 standard Figma documentation pages per component (component sheet, introduction, props and tokens, variations, states and motion, usage, content, platform, RTL, accessibility, changes, changelog) with ASCII layouts and sources.
- `6-component-guidelines/figma-doc-kit.md`: one-time spec for the `Doc/*` components every documentation page is built from.


## [Docs structure — Figma build] — 2026-10-15
### Added
- `_templates/figma.md` — per-platform build instructions for the Figma Agent (structure, layer tree, properties, variable/style binding rules, variants, RTL, interactions, docs frames, Code Connect, acceptance criteria, execution log). Values are read from the spec, never copied.
- ASCII wireframe conventions (`6-component-guidelines/README.md`) and wireframes in the guidelines, spec and figma templates.
### Changed
- Spec §8 now links to `figma.md` (the Figma ↔ code mapping has one home). `review.md` has a Figma section. Platform status tables track code and Figma separately.


## [Docs structure] — 2026-10-15
### Added
- `6-component-guidelines/` — design guidelines written once per component for all platforms, with the "one fact, one home" rules.
- `_templates/component-guidelines.md`.
### Changed
- `_templates/component-readme.md` is now the per-platform **spec** (API, dimensions, tokens by part × state, states + motion, RTL, a11y implementation, examples, Figma ↔ code mapping, tests).
- `_templates/plan.md` no longer repeats API / tokens / a11y; it references the spec and keeps approach, token gaps, files, tests and acceptance criteria.
- `_templates/review.md` checks code against the spec as well as the plan. AGENTS.md and README.md updated.


## [Foundations 1.0.1] — 2026-10-15
### Added
- Figma Design System file synced with the token source (see AUDIT.md §6).
- Theme check app moved outside the repo: `../biowave-theme-test` (consumes `biowave_mobile` by path).


## [Foundations 1.0.0] — 2026-10-15
### Added
- Repository structure: 1-overview, 2-foundations, 3-web-components, 4-tablet-components, 5-mobile-components; AGENTS.md workflow (plan → execute → review) and templates.
- DTCG token source migrated from the Figma variable exports.
- Generators for CSS variables, TypeScript, Dart; MUI theme (`createBiowaveTheme`, `BiowaveProvider`); Material 3 theme (`BwTheme.build`).
- Automated WCAG 2.2 contrast check (76 pairs × 2 themes), theme and platform parity checks.
- New foundations: border widths, focus ring, motion, icon sizes, target size, layers (z-index), breakpoints, role font weights, elevation scale with dark values.
- 15 guideline pages and a visual preview.
### Fixed
- See `2-foundations/AUDIT.md` (A-01 … B-12): caption-sm = 0, placeholder contrast, error/warning/success contrast, focus contrast, dark secondary using primary ramp, broken alpha step, remote width aliases, invalid token/group collisions.
### Changed
- Token names unified (see migration map in AUDIT.md).

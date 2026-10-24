# Changelog

Every change to the design system is logged here **in the same task**, newest first (AGENTS.md rule 9). Format: [Keep a Changelog](https://keepachangelog.com); versions follow SemVer per package. Component detail also goes to that component's Part F.

## [Review — Mobile Icon button round 2: Changes requested] — 2026-10-24
### Changed
- Icon button (mobile) review round 2: **Changes requested** — Part E3 of `5-mobile-components/components/icon-button/icon-button.md`. Round 1 #1 fixed (single semantics node now exposes `focused` after Tab and `SemanticsAction.focus`, label read once, `tester.semantics.tap` calls `onPressed`), #2 and #3 fixed. 🟡 #4: the Fixer's Fix round 1 entry was also pasted into D11 (Figma Agent log) — Implementer removes it. Plan stays Finished. Code → Changes requested (header + README). `docs:check` ✓, `flutter analyze` ✓, `flutter test` 96/96 ✓, `sync` READY.

## [Fixed — Mobile Icon button review round 1] — 2026-10-24
### Fixed
- Fixed Mobile `BwIconButton` review round 1 findings (#1–#3): exposed `focusable`, `focused`, and `SemanticsAction.focus` on the single accessible `Semantics` node from the button's `FocusNode` while keeping one labelled node with `button`, `toggled`, `enabled`, and `tap`, and extended `label is read once and toggle state is exposed` to verify post-Tab focus state, focus action, single labelled node, and `tester.semantics.tap` activation; updated the `Source code` link in `icon-button.md` and reverted the unrelated `BwMobileTheme` reformat in `lib/biowave_mobile.dart`.

## [Review — Mobile Icon button round 1: Changes requested] — 2026-10-23
### Changed
- Icon button (mobile) review round 1: **Changes requested** — Part E2 of `5-mobile-components/components/icon-button/icon-button.md`. Screen-reader activation OK (one labelled node, `SemanticsAction.tap` calls `onPressed`). 🟡 #1: the excluding `Semantics` wrapper drops the focus state and `focus` action that BwButton exposes. 🟢 #2 header `Source code` row stale; 🟢 #3 unrelated `BwMobileTheme` reformat. All Implementer; Plan stays Finished. Code → Changes requested (header + README). `docs:check` ✓, `flutter analyze` ✓, `flutter test` 96/96 ✓, `sync` READY.

## [Mobile Icon button — code implementation (1.0)] — 2026-10-23
### Added
- Built `BwIconButton` for `biowave_mobile` (`lib/src/components/icon_button/bw_icon_button.dart` + `test/icon_button_test.dart` + 4 goldens in `test/goldens/icon_button/`), sharing `BwButtonStyle.resolve`, `BwControlSize`, and `BwFocusRing`, with token-only selected state (`WidgetState.selected`), long-press M3 `Tooltip` styled with B3.4 tokens, loading spinner and single announcement, and a single accessible container node carrying the tap action and toggle state.

## [Review — Web Split button round 3: Approved] — 2026-10-21
### Changed
- Split button (web) review round 3: **Approved** — Part E4 of `3-web-components/components/split-button/split-button.md`. Round 2 #9 fixed (headless Chrome computed Paper `transition`: open `opacity`/`transform` 0.2s `standard-decelerate`, close 0.1s `standard-accelerate`, no delay) and #10 fixed (`prefers-reduced-motion: reduce` → 0 s, menu instant); Round 1 #1 still holds (menu end edge right in English, left in Arabic). 🟢 #11 nit: MUI Grow's `auto` timeout keeps the invisible backdrop ~240 ms after close — carried to the Menu component. Code → Approved (header + README). `docs:check` ✓, `typecheck` ✓, `test:web` 100/100 ✓, `sync` READY.

## [Fixed — Web Split button review round 2] — 2026-10-21
### Fixed
- Fixed menu fade and scale so each uses the complete B4 open and close duration/easing pair, bypassing MUI Grow's shortened scale timing and exit delay; menu durations now remain CSS variables so the reduced-motion token rule makes them instant. Added independent opacity/transform enter/exit coverage and a reduced-motion variable regression test; the full web suite passes 100/100 in three consecutive runs.

## [Review — Web Split button round 2: Changes requested] — 2026-10-21
### Changed
- Split button (web) review round 2: **Changes requested** — Part E3 of `3-web-components/components/split-button/split-button.md`. Round 1 #1 fixed (measured in Chromium: menu end edge on the right in English, left in Arabic, `transform-origin` top-end), #2/#5 fixed (`test:web` 97/97 at default timeouts), #4/#8 fixed, #6/#7 closed by plan 1.1. 🟡 #9: #3 partly open — the menu fade uses `motion-easing-standard` and the scale runs at ⅔ of the B4 duration (MUI Grow); 🟡 #10: menu durations are now JS numbers, so reduced motion no longer zeroes them. Code → Changes requested (header + README). `docs:check` ✓, `typecheck` ✓, `sync` READY.

## [Fixed — Web Split button review round 1] — 2026-10-21
### Fixed
- Fixed logical end menu placement in English and Arabic, tokenized enter/exit motion, and the missing keyboard, loading-focus, radii, localization, `aria-controls`, and bilingual axe coverage; removed raised test timeouts. The configured web suite passes 97/97 in three consecutive runs.

## [Preview — Web Split button 1.1] — 2026-10-21
### Added
- Added light/English and dark/Arabic RTL Split button planning sheets covering all allowed md variant/color combinations, independent half states, sm/md/lg sizes, loading, focus, disabled, and logical end-aligned open menus, with resolved token sheets and generation check notes.

## [Plan — Web Split button 1.1] — 2026-10-21
### Changed
- Web `split-button.md` 1.0 → 1.1 (plan 1 → 1.1) answering Review round 1 Planner findings: #6 B5/C3 — MUI flips only its default menu origins in RTL, so the side is chosen from the text direction (`bottom-end` logical, physical right in LTR, left in RTL); #7 B6 — `aria-controls` only while the menu is open (the code's behaviour). C3 records that the shared per-test speedy Emotion cache from `ds/button-web` (PR #1) is on `main` and merged into this branch, so the fix round uses it and drops raised timeouts. C6 tests and C7 AC-7/AC-8 + Fix round 1 task list for Executor findings #1–#5, #8. Plan → Finished (header + README); Split button web contracts regenerated.

## [Review — Web Split button round 1: Changes requested] — 2026-10-21
### Changed
- Split button (web) review round 1: **Changes requested** — Part E2 of `3-web-components/components/split-button/split-button.md`. AC-1, AC-2, AC-6 met; 🔴 menu anchored with physical `right` (wrong side in Arabic, B5) and `test:web` fails 81/87 in the full suite (tests still raise timeouts; the shared speedy Emotion cache is only on `ds/button-web`); 🟡 B4 close transition, test gaps (B9/B6, `ar`), raised timeouts; 🟢 Planner C3/B6 notes. Plan set to `Open`; Review status updated in the header and `3-web-components/README.md`. `docs:check` fails only on the pre-existing stale tablet/mobile button-group Figma contracts.

## [Review — Web Icon button round 3: Approved] — 2026-10-21
### Changed
- Icon button (web) review round 3: **Approved** — Part E4 of `3-web-components/components/icon-button/icon-button.md`. Round 2 findings fixed: #10 render matrix split per theme × locale with CSS rules read once per render (slowest Icon button test 883 ms, was 3.7–4.4 s); #11 open-tooltip axe runs on `baseElement`. AC-1–AC-11 met; no new findings. `docs:check` ✅, `typecheck` ✅, `test:web` 3/3 full runs 96/96 at the default 5 s timeout. Code → `Approved` (header + `3-web-components/README.md`); Plan stays `Finished`.

## [Fixed — Web Icon button review round 2] — 2026-10-21
### Fixed
- Fixed Icon button findings #10 and #11: the variant matrix now caches CSS rules once per render and runs as four theme/locale tests (slowest 798 ms), while the open-tooltip axe cases scan `baseElement` so the portalled tooltip is covered. `docs:check` and `typecheck` pass; three final full Web runs pass 96/96 at the default timeout.

## [Review — Web Icon button round 2: Changes requested] — 2026-10-21
### Changed
- Icon button (web) review round 2: **Changes requested** — Part E3 of `3-web-components/components/icon-button/icon-button.md`. Round 1 findings #1–#9 all fixed (tooltip easing, 500 ms hover delay and instant reduced-motion timeouts, single accessible name, RTL mirroring measured in headless Chrome for light/en and dark/ar). AC-1–AC-4, AC-6, AC-8–AC-11 met; AC-5/AC-7 not: `test:web` 4 of 5 full runs green — the Icon button variant-matrix test takes 3.7–4.4 s and timed out once at the 5 s default (🟡 #10, re-scans every stylesheet per button). 🟢 #11: open-tooltip axe case skips the portalled tooltip. `docs:check` ✅, `typecheck` ✅. Code → `Changes requested` (header + `3-web-components/README.md`); Plan stays `Finished`.

## [Fixed — Web Icon button review round 1] — 2026-10-21
### Fixed
- Fixed Icon button findings #1–#5, #7 and #9: deterministic token-timed tooltip tests, specified enter/exit easing and reduced-motion timeouts, a single accessible name for disabled tooltip anchors, complete rendered-token/fallback/theme/locale/state coverage under default timeouts, one numeric tooltip-offset source, and whitespace-only label validation. Typecheck, docs, sync and component-token checks pass; three full Web runs pass 93/93.

## [Web Icon button — review round 1 Planner items, plan 1.1] — 2026-10-21
### Changed
- Icon button (web) re-plan, version 1.1: #8 B7 examples use the Biowave `Icon` (`<Icon name="…" />`, `filled`), D4 code values, a D4 **Icons used** line and the header Source code row updated; #6 Part C records the dependency on `ds/button-web` (PR #1, shared per-test speedy Emotion cache) — fix round 1 starts after the rebase and drops the raised timeouts. Executor findings #1–#5, #7, #9 folded into C3/C5/C6, C7 AC-7–AC-11 and a Fix round 1 task list. B1–B6 unchanged, no API change. Plan → `Finished` (header + `3-web-components/README.md`); contracts regenerated with the generator: `npm run contract -- web icon-button`, plus `tablet` / `mobile` `icon-button` (their Figma contracts inherit web D4 — hash and the two D4 code-value rows only). Detail: `3-web-components/components/icon-button/icon-button.md` › F0, F2.
- Added the Icon button plan 1.1 web preview sheets for light/English and dark/Arabic RTL, covering the allowed variant/color matrix, six states, sm/md/lg sizes, toggles, tooltip, resolved token callouts, and RTL icon direction; the preview README records the remaining dark Text/Error arrow-direction warning after the retry limit.

## [Review — Web Icon button round 1: Changes requested] — 2026-10-21
### Changed
- Icon button (web) review round 1: **Changes requested** — Part E2 of `3-web-components/components/icon-button/icon-button.md`. AC-1, AC-2, AC-6 met; AC-3 (tooltip easing / reduced motion), AC-4 (stray `aria-label` on the disabled tooltip anchor) and AC-5 (`test:web` red: flaky Esc tooltip test, raised timeouts, Button/SplitButton timeouts awaiting the `ds/button-web` speedy-cache merge) not met. 6 🟡, 3 🟢; typecheck ✅, sync ✅, icon-button tests 11/11 alone; `docs:check` fails only on the pre-existing stale button-group contracts. Plan → `Open` (Planner items #6, #8); review status updated in the header and `3-web-components/README.md`.

## [Web Text field — review round 3] — 2026-10-21
### Changed
- Web `text-field.md` Part E Round 3 (E5): **Approved** — #9 fixed (Chromium at 980 and 1280 px, EN and AR: multiline action box 24/32/40 sits 4 px = `spacing-xs` inside the top edge and inline end at sm/md/lg; test asserts the `max(…)` rule for single-line and multiline), #10 fixed by plan 1.2; RTL prefix at inline start (right), suffix and end button at inline end (left), as B5 and the dark/AR preview. No new findings. `typecheck` ✓, `docs:check` only the 2 baseline `button-group` errors, `test:web` Text field 19/19 but red from host-load timeouts in untouched Button/Icon button/Split button tests (re-run at the before-merge gate). Code → Approved (header + README).

## [Web Text field — fix round 2 (1.2)] — 2026-10-21
### Fixed
- Fixed finding #9 by keeping multiline trailing actions at least `spacing-xs` inside the top border with the token-only `max(action-inset − padding-block, (line-height − action-box) / 2)` rule, adding sm/md/lg coverage at 980 and 1280 px, and correcting C8 to identify the Biowave `Icon`; Text field tests pass 19/19 and the serial full Web suite passes 87/87.

## [Web Text field — plan 1.2] — 2026-10-21
### Changed
- Added the plan 1.2 web Text field preview sheets for light/English and dark/Arabic RTL, covering sm/md/lg anatomy, six states, attachments, multiline examples, resolved token callouts, and the 4 px trailing-action top inset rule.
- Web `text-field.md` plan 1.1 → 1.2 answering Round 2 Planner findings: #9 one multiline trailing-action rule in B2/C3 — `margin-block-start = max(action-inset − padding-block, (line-height − action-box) / 2)`, action box never closer than `spacing-xs` to the top border (resolved top offset `spacing-xs` at sm/md/lg, EN and AR); B9/C6 add a multiline case to the viewport test; C7 adds "Fix round 2 — Executor task list" (Web D3 not touched — Tablet/Mobile Figma contracts inherit it). #10 B7 examples and C3 Icons now use the Biowave `Icon` (`<Icon name="…" />`). Planner response added under E4. Plan → Finished (header + README); both Text field contracts regenerated.

## [Web Text field — review round 2] — 2026-10-21
### Changed
- Web `text-field.md` Part E Round 2 (E4): **Changes requested** — Round 1 #1–#8 and AD-1 … AD-6 fixed (measured in Chromium at 980 and 1280 px: single-line action box 24/32/40 inset 4 px at sm/md/lg, disabled action and end button not focusable or clickable, `aria-*` on the input); `test:web` 87/87, `typecheck` ✓, `docs:check` only the 2 baseline `button-group` errors. New: #9 🟡 multiline action reaches the top border at md/lg (B2 inset vs first-line rule conflict, Planner → Executor), #10 🟢 C3/B7 still name MUI `Icon` (Planner). Plan → Open, Code → Changes requested (README + header).

## [Review — Web Button round 3: Approved] — 2026-10-20
- Round 2 findings #11–#13, #15–#17 fixed (#14 closed by the Planner); AC-11 … AC-15 met; `docs:check` ✅, `typecheck` ✅, `test:web` ✅ 79/79 in ≈ 6 s with the default timeout (slowest Button test 979 ms), `sync` ✅; `BiowaveProvider` default caches unchanged. Manual QA open: loading width and screen-reader announcement (EN/AR). `3-web-components/components/button/button.md` Part E4, header and `3-web-components/README.md` Review column updated.

## [Fixed — Web Button review round 2] — 2026-10-20
- Added fresh speedy Emotion caches per test with post-cleanup flushing; removed Button's raised timeouts; kept the loading live region mounted; stripped both true and false `mirrorInRtl` markers; and verified transition restoration after re-enable. The configured web suite passes 79/79.

## [Plan — Web Button 1.2: shared test tooling fix] — 2026-10-19
- Review round 2 Planner items: decided the `test:web` fix (#11) — a fresh **speedy** emotion cache per test, flushed after `cleanup()` (MUI `createRenderer` pattern + `@emotion/cache` `speedy`); Foundations gets `createBiowaveEmotionCaches()` and an optional `BiowaveProvider` `emotionCaches` prop (default unchanged). Planner probe, not committed: 73/77 in 2 m 32 s → 77/77 in 35 s with default timeouts. Folded #12, #13, #15–#17 into C3/C6/C7 (Fix round 1 task list). Regenerated stale `tablet` / `mobile` `button-group` Figma contracts with the generator (#14; hash only, body unchanged). Detail: `3-web-components/components/button/button.md` › E3 Planner response, F2.

## [Review — Web Button round 2: Changes requested] — 2026-10-19
- Round 1 findings 1–10 all fixed; `typecheck` ✅, `sync` ✅, Button 24/24 ✅; but `test:web` ❌ 73/77 both parallel and serial (emotion `<style>` tags pile up per test file and slow axe/user-event past 5 s; Planner owns the shared fix, #11), `docs:check` ❌ (stale tablet/mobile button-group Figma contracts, #14), live region mounted with its text (#13). Full record: `3-web-components/components/button/button.md` › E3.

## [Tooling — update components from photos (agent-workflow-kit: Updater)] — 2026-10-20
### Added
- **Updater** role (`update-component` agent, `workflow-update` skill): send photos of a UI screen or a single component plus a prompt; it finds the existing component, compares the photos with its plan, snaps what it sees to existing semantic tokens, shows a diff and asks which rows and platforms (web, tablet, mobile) to apply. On a yes it saves the photos and a change request to `<section>/components/<name>/references/`, updates Parts A–D and F (Part A on all three platforms), sets Plan `Finished` and Code `Planned`, and regenerates the contracts. The orchestrator then runs preview → implement → review as usual; review rounds before the update no longer count.
- `_workflow/inbox/`: drop photos here when you can't send a file path.
- `_workflow/config.json`: `inputs.update`, `outputs.update`, `agents.update`, `update` settings; AGENTS.md: Updater role row.

## [Tablet — Icon review round 2] — 2026-10-21
### Changed
- Icon (tablet) review round 2: **Approved** — Part E3 of `4-tablet-components/components/icon/icon.md`. AC-1…AC-5 met after the `main` merge and `BwIcon` adoption in `BwButton`: `flutter analyze` clean, `flutter test` 131/131; each guard pattern (`Icons.`, `CupertinoIcons.`, `IconData(`, raw `Icon(` outside `icon/`) proven by a planted probe (reverted); Button icons keep size, colour, keys and decorative semantics with a single RTL flip; Button golden diffs confined to sm/md icon glyphs (Symbols axes). Round 1 #2 fixed, #1 and #3 still open; 5 🟢 nits total (incl. guard misses non-`_rounded` `Symbols.*`). `docs:check` fails only on the pre-existing stale button-group contracts (accepted). Review status updated in the header and `4-tablet-components/README.md`.

## [Tablet — Icon adoption in Button] — 2026-10-21
### Changed
- Adopted `BwIcon` in tablet `BwButton` for leading and trailing icons, extended `no_legacy_icons_test.dart` to prohibit Flutter `Icons.*`, `CupertinoIcons.*`, `IconData(` constructors and raw `Icon(` widgets outside `icon/` (proven via planted probes), added BwIcon RTL/semantics button tests, and regenerated Button goldens with `BwIconAxes` variable font metrics.

## [Tablet — Icon review round 1] — 2026-10-20
### Changed
- Icon (tablet) review round 1: **Approved** — Part E2 of `4-tablet-components/components/icon/icon.md`. AC-1…AC-5 met; `flutter analyze` clean, `flutter test` 64/64; D-18 guard proven by a planted `Icons.add` probe (reverted); goldens show real Material Symbols Rounded glyphs. 3 🟢 nits (`filled: false` vs `IconTheme.fill`, guard misses `CupertinoIcons` / `IconData(`, stale "Source code" header row). `docs:check` fails only on the pre-existing stale button-group contracts (accepted). Code → `Approved`.

## [Tablet — Icon] — 2026-10-20
### Added
- Tablet `BwIcon`, `BwIconSize` and `BwIconColor`: Google Material Symbols Rounded glyphs with semantic size/colour tokens, fill, single-flip RTL handling, decorative/labelled semantics, package export, full widget/golden coverage (with `MaterialSymbolsRounded` variable font loaded in tests and EN/AR localization delegates), and a package-wide guard against Flutter `Icons.*` (`flutter analyze` and all 64 `flutter test` cases passing). Code → `Built`.

## [Mobile Button — review round 2] — 2026-10-21
### Changed
- Mobile `button.md` Part E Round 2: **Approved** — Round 1 #1 fixed (`BwFocusRing` always returns the same `Stack`, child State survives focus; the new test fails when the old ring is restored) and #2 fixed (one `BwButtonMetrics` size table); ring geometry unchanged; 70/70 Flutter tests; no new findings. Review status updated in the header and `5-mobile-components/README.md`.

## [Mobile Button — fix round 1 (1.1)] — 2026-10-21
### Fixed
- Mobile Button review findings #1–#2: `BwFocusRing` now keeps a stable `Stack` so loading content State survives keyboard-focus changes, button dimensions use one size-to-metrics table, and a State-identity regression test was added; all 70 Flutter tests pass with existing goldens unchanged.

## [Mobile Button — review round 1] — 2026-10-20
### Changed
- Mobile `button.md` Part E Round 1: **Changes requested** — focus ring measured 2 dp outside the container with no layout change for every size in LTR and RTL, real-font goldens on `surfacePage`; 1 🟡 (#1 `BwFocusRing` swaps `child` ↔ `Stack` on focus and remounts the button content) and 1 🟢 (#2 icon size mapped twice). Review status updated in the header and `5-mobile-components/README.md`.

## [Mobile Button — implementation (1.1)] — 2026-10-20
### Added
- Added the Flutter mobile `BwButton` implementation with token-resolved filled, tonal, outlined and text variants; all colors and sizes; loading, RTL, reduced-motion and keyboard-focus behavior; shared `BwControlSize` and outside-container `BwFocusRing`; localized real-font test infrastructure; comprehensive widget tests; and visually verified light/dark English/Arabic goldens. Flutter analysis passes and all 69 tests pass with the sandbox-compatible faster-test runner.

## [Tablet Button — review round 2] — 2026-10-20
### Changed
- Tablet `button.md` Part E Round 2: **Approved** — Round 1 findings #1–#9 all fixed (focus ring 2 dp outside the container with no layout change, measured per size in LTR/RTL; real-font goldens; disabled stays disabled while loading); 1 new 🟢 nit (#10 golden page background equals the filled-neutral token). Review status updated in the header and `4-tablet-components/README.md`.

## [Tablet Button — fix round 1 (1.1)] — 2026-10-20
### Fixed
- Review findings #1–#9: the keyboard focus ring now paints outside the visible container without affecting layout or fading; loading preserves disabled state; shared localization/reduced-motion test setup and measured light/dark accessibility coverage were added; Inter, IBM Plex Sans Arabic and Material Symbols Rounded are loaded for tests; and all four real-font goldens were regenerated and visually checked.

## [Tablet + Mobile Button — plan 1.1 (review round 1 Planner items)] — 2026-10-20
### Changed
- Added light/English and dark/Arabic RTL tablet Button preview sheets for plan 1.1, with all valid variants and colors, four sizes, six states, token callouts, and corrected outside-container focus-ring geometry.
- Tablet `button.md` 1.0 → 1.1, Plan `Open` → `Finished` (closes E2 findings #1, #6): C3 focus ring rewritten — `BwFocusRing` hooks into `ButtonStyle.backgroundBuilder`, painted in a `Stack(clipBehavior: Clip.none)` at inset −(`focusOffset` + `widthFocus`) around the visible container, no `Padding`, no layout change, no fade; takes a `BorderRadiusGeometry` and a caller `ringKey`. B2/B6 state the geometry; B9/C6 add ring-rect vs container-rect per size, no-layout-change, measured sizes, dark guideline and disabled-while-loading tests. C5 adds `test/flutter_test_config.dart` and `test/fonts/` (Inter and IBM Plex Sans Arabic static TTFs with their SIL OFL licences; Material Symbols Rounded from the `material_symbols_icons` package asset) and the `pumpBw` localizations + `reduceMotion` flag. C7 AC-8–AC-10 and "Fix round 1 — Executor task list" (#1–#9); Planner response under E2. `4-tablet-components/README.md` Plan column updated. Contracts regenerated.
- Mobile `button.md` 1.0 → 1.1 (not built yet): the same focus-ring, test-font and `pumpBw` changes in B2, B6, B9, C3, C5, C6 and C7 AC-8, so mobile is not built with the tablet bug. Contracts regenerated. No token changes; Part A unchanged.

## [Tablet Button — review round 1] — 2026-10-20
### Changed
- Tablet `button.md` Part E Round 1: **Changes requested** (1 🔴 focus-ring geometry/layout, 5 🟡, 3 🟢); Plan set to `Open` for the Planner items (C3 focus ring, test font loading); Review status updated in the header and `4-tablet-components/README.md`.

## [Tablet Button — built (1.0)] — 2026-10-20
### Added
- `BwButton` for Flutter tablet with token-resolved variants, colors and sizes; loading/focus/RTL/accessibility behavior; shared control-size and focus helpers; 37 tests; and light/dark English/Arabic goldens.

## [Web — Icon review round 2] — 2026-10-20
### Changed
- Icon (web) review round 2: **Approved** — Part E3 of `3-web-components/components/icon/icon.md`. Round 1 findings #1–#5 all fixed (directional prop stripped in Button / Icon button, `IconName` = B1, prop/class/both single-flip and `[dir='rtl']` tests, Button 16/20/24 size test, repo-wide D-18 guard). 1 new 🟢 nit: Button light axe test has little timeout headroom (not caused by this branch). Code → `Approved`.

## [Web — Icon fix round 1] — 2026-10-20
### Fixed
- Icon (web) review round 1 findings #1–#5: `Button` and `IconButton` `prepareIcon` strip `directional` (like `mirrorInRtl` and `bw-icon-directional`) and mark the wrapper once; `Icon.tsx` `directional` JSDoc and `IconName` type (`MaterialSymbol | 'push_pin' | 'expand_more' | ''`) match B1; `Icon.test.tsx` tests all three directional marker forms inside `Button` and `IconButton`, `[dir='rtl']` rule scoping, `Button` `sm`/`md`/`lg` 16/20/24 icon sizes, and `push_pin` / `expand_more` typing; `noLegacyIcons.test.ts` guards against `material-symbols-rounded` and `@mui/material/Icon` outside `src/components/icon/`. Code → `Built`.

## [Web — Icon preview plan 1.1] — 2026-10-20
### Added
- Planning previews for Icon (web): light English and dark Arabic RTL spec sheets cover every `size-icon-*` token, all B3 color roles, FILL 0 / FILL 1, exact status content, and directional `arrow_forward` beside non-mirrored `search` and `check`; `previews/README.md` records resolved token values, prompts and visual checks.

## [Web — Icon plan 1.1] — 2026-10-20
### Changed
- Icon (web) plan 1.1 — review round 1 Planner items. Finding 1: Button / Icon button `prepareIcon` strips Icon's `directional` prop like `mirrorInRtl` and marks the wrapper once (B5, C3; `Button.tsx` · `IconButton.tsx` added to C5). Finding 2: `name` is typed `IconName` = `MaterialSymbol` + `push_pin` · `expand_more` — kept because the Figma Material Symbols library and `icons.md` use them and the 0.48.0 Rounded font still renders both ligatures (`push_pin` = `keep`), recorded in B1. Finding 5: `noLegacyIcons.test.ts` must fail on `material-symbols-rounded` / `@mui/material/Icon` outside `src/components/icon/` (B9, C5). Plan → `Finished`; contract regenerated.

## [Web — Icon review round 1] — 2026-10-20
### Changed
- Icon (web) review round 1: **Changes requested** — Part E2 of `3-web-components/components/icon/icon.md`. 3 🟡 (Button / Icon button must strip `directional`; `IconName` extras `push_pin` / `expand_more` vs B1; directional-prop tests), 2 🟢. D-18 sweep clean: no web component renders an icon from any source but Icon. Plan → `Open`, Code → `Changes requested`.

## [Web — Icon] — 2026-10-20
### Added
- Web `Icon` (`@biowave/web`): Material Symbols Rounded glyph with size/color tokens, fill, directional RTL, and labelled/decorative semantics. Re-exports `MaterialSymbol` from `@biowave/foundations`. Split button, button group, and text field now render glyphs through `Icon` (AC-7); tests use `Icon` instead of the temporary `MaterialSymbol` helper.

## [Roadmap v3 — Figma coverage check (P-05)] — 2026-10-20
### Changed
- Every component set in the four Figma files (Web, Tablet, Mobile component files and the LEGACY Web + Mobile pages in Foundations) was compared with `ROADMAP.md`. Decision **P-05** (Hassan): Tag / Label / Request status become **Chip** variants; Check badge → Badge; Checkbox card → selectable Card; Day picker → Segmented button; Notification card → List item; Upload photo → File upload; **Action bar** added to Phase 2 (Day 15, Web + Tablet); **Map** added to the backlog; Slider stays post-1.0.
- DS 1.0 target is now **45 components** + 13 patterns (Phase 1: 22, Phase 2: 23 — the old "21" counts were already out of date). `README.md` roadmap row updated.

## [Tooling — preview images after planning (agent-workflow-kit 1.1.0)] — 2026-10-19
### Added
- **Previewer** step: after each plan step the orchestrator sends the plan to Codex (ChatGPT image generation); if that fails, it uses Antigravity (Gemini image-generator). It draws the component with exact token values from `2-foundations/dist/tokens.json`, in **light + English** and **dark + Arabic (RTL)**, and saves them as JPEG (about 450 KB each) to `<section>/components/<name>/previews/<name>-light-en.jpg` and `<name>-dark-ar.jpg`, with a `README.md` (token sheet, prompts, check results). The images are shown at the after-plan gate, before any code.
- `_workflow/config.json`: `preview` settings and agents; AGENTS.md: Previewer role row.

## [Tooling — agent workflow (agent-workflow-kit 1.0.0)] — 2026-10-19
### Added
- `_workflow/config.json`: settings for the plan → implement → review → fix workflow. Planner and Reviewer = Claude; Implementer and Fixer rotate between Codex, Cursor and Antigravity. Checks per platform come from AGENTS.md §5. Gates after plan, after review and before merge. At most 2 fix rounds. Figma steps are skipped for now.
- AGENTS.md: **Fixer** role row (reads the latest Part E round and the contract; writes code and a "Fix round N" entry in C8) and a pointer to `_workflow/`.
### Changed
- `_docs/check.mjs`: the removed-path scan skips `_workflow/runs/` (run history, like `CHANGELOG.md` and `_audits/`).

## [Repository — agent workflow files excluded from Git] — 2026-10-19
### Changed
- Root `.gitignore` now ignores personal AI-agent state: `.claude/settings.local.json`, `.gemini/` and `.worktrees/`. Shared skills and configs (`.agents/`, `.claude/skills`, `.cursor/`) stay committed.
- `biowave-ds/.gitignore` now ignores `_workflow/.local/` (orchestrator scratch). Run records `_workflow/runs/**/run.md` and `*.prompt.md` are committed; raw agent output (`*.log`) was already ignored.

## [Docs — Text field Overview playground controls] — 2026-10-18
### Added
- Text field Overview now has interactive controls for example type, size, state, required status, supporting text, help tooltip and character counter, with English and Arabic labels.
- The controls update both the lightweight overview sample and a configured real `@biowave/web` `TextField`; presets cover leading/trailing icons, clearable, password, prefix/suffix, attached end button and multiline fields.

## [Repository — local and generated files excluded from Git] — 2026-10-18
### Changed
- Expanded the root `.gitignore` for OS metadata, editor state, local environment and signing files, Node test/build output, Flutter ephemeral output, logs and temporary files. The committed `2-foundations/dist/` output remains explicitly included.

## [Docs — Theme and Language switches on the home pages] — 2026-10-18
### Added
- Components List (Web / Tablet / Mobile), Foundation List and each foundation page now show the **Theme** (Light · Dark · System) and **Language** (EN · عربي) switches next to the title. The choice is saved and shared with the component pages.
### Changed
- `_docs/viewer.js`: one `prefsControls()` builds both switches for every page and one delegated `change` handler saves the choice and re-renders (focus returns to the chosen option). `_docs/component-body.html` keeps only a `data-prefs` slot; component shells regenerated with `npm run docs:build`.

## [Docs — live preview uses Material Symbols (D-18)] — 2026-10-18
### Fixed
- `_docs/live.tsx` still imported the removed `@mui/icons-material`, so every Web component page showed a Vite "Failed to resolve import" overlay. It now loads `@biowave/foundations/icons.css` and renders glyphs with `MaterialSymbol` (`add`, `arrow_forward`, `edit`, `push_pin` / filled, `delete`, `search`) until the Biowave `Icon` ships.

## [Icon — planned for Web, Tablet, Mobile (1.0)] — 2026-10-18
### Added
- `icon.md` for W/T/M (Plan `Finished`): Part A shared (A8 per platform); Web `Icon` on MUI `Icon` + Material Symbols Rounded font (`name: MaterialSymbol`, `size` xs…3xl or inherit, `filled`, `color` 10 roles, `directional`, `label`); Flutter `BwIcon` on `Icon` + `Symbols.*_rounded` (`BwIconSize`, `BwIconColor`, `directional` via `Transform.flip`, `semanticLabel`). Web C2 includes adopting `Icon` inside the built components and tests; Flutter Icon is the first component of each package.
- `icon.tokens.json` (`Icon / Size` 7 modes, `Icon / Color` 10 modes — `disabled` left out: Figma allows 10 modes and disabled icons inherit from their parent). Collections created in the Web, Tablet and Mobile Figma files; lint 0; `sync:verify-tokens` ✓ 66 tokens per file (sorted-dump checksums matched); `sync:done:tokens:*`.
- Icon colour contrast on the base background checked in both themes: all ≥ 3:1 (lowest: warning 3.24 light).
- Docs pages, README rows, contracts (`npm run contract -- <plat> icon`).

## [Tooling — Material Symbols icon library connected (D-18)] — 2026-10-18
### Added
- `_sync/figma-files.json` › `icons`: **Google · Material Symbols** (`RXlnhYgUKBBE6HveEr7e9C`, 4 154 sets `Material Symbols/<name>`, Style × Fill). Published; import by key verified from the Web Components file.
- On-demand icon index `_sync/figma-icons.json` (17 icons): `_sync/icons.mjs`, `_sync/figma-read-icons.js` (template), `npm run sync:icons:plan` (finds icons named in specs: `Symbols.x_rounded`, `<Icon …>x</Icon>`, `MaterialSymbol name="x"`, D4 INSTANCE_SWAP values/defaults, `**Icons used:**` lines) and `npm run sync:icons -- <dump>`. `npm run sync` shows the icon index; every Figma contract has an “Icons (keys)” section (set + Rounded unfilled/filled keys) and goes stale when its icons change.
- `**Icons used:**` lines in Split button (`expand_more`) and Button group (`more_horiz`) Part D on all platforms; Web Button / Icon button D4 rows point to the Material Symbols library (no more “Icons page” / `<{Glyph}Rounded />`).
- `AGENTS.md` §7, `_sync/README.md`, `icons.md` updated. `_sync/figma-read-icons.generated.js` git-ignored.

## [Code — icons migrated to Google Material Symbols (D-18)] — 2026-10-18
### Changed
- `@biowave/foundations` (web): dependency `@material-symbols/font-400@0.48.0` (Rounded, FILL axis only — ≈ 0.56 MB woff2 instead of ≈ 5.4 MB for the full `material-symbols` font); new `src/icons.css` exported as `@biowave/foundations/icons.css` (font import, `font-size: inherit` so token-sized wrappers are not overridden by the package's 24px, `'FILL' 0`, `.bw-icon-fill` = `'FILL' 1`).
- `@biowave/web`: removed `@mui/icons-material`. `SplitButton` (`expand_more`) and `ButtonGroup` (`more_horiz`) render MUI `Icon` with `baseClassName="material-symbols-rounded"`; `IconButton` and `SplitButtonMenu` icon wrappers set `font-size` from the size token. Tests use `src/test/materialSymbol.tsx` (to be replaced by the Icon component). New guard test `src/test/noLegacyIcons.test.ts` fails on any `@mui/icons-material` import. Text field (round 2, other agent) had already switched; not touched.
- `biowave_foundations` (Flutter): `material_symbols_icons ^4.2960.0`, re-exported; `BwIconAxes`; theme `iconTheme` (size/opticalSize `BwSize.iconLg`, `color-icon-neutral-default`, fill 0, weight 400, grade 0). Tablet/Mobile Button plans no longer add the dependency themselves.
### Verified
- Clean install: `npm run typecheck` ✓; `test:web` serial: Button 24, Icon button 11, Split button 11, Button group 10, guard 2 ✓ — the one remaining failure is Text field's axe test timing out at the 5 s default (round-2 work in progress, not caused by this change); one Icon button tooltip test flaked once under load and passed in two reruns.
- Browser render (Chromium, en/ar): Material Symbols font loads; icons 16/20/24 at token sizes with no clipping; `arrow_forward` mirrored in RTL; filled push pin; Text field help/error/clear/visibility/copy glyphs correct.
- Flutter changes not compiled — no Flutter SDK in this environment; run `flutter pub get && flutter analyze` in `2-foundations/flutter`.
### Note
- Run `npm install` on your machine: the lockfile now has `@material-symbols/font-400` and no `@mui/icons-material`.

## [Web Text field — round 2 implementation (1.1)] — 2026-10-18
### Added
- Managed trailing actions (`action`, `clearable`, password visibility), label help tooltip, supporting-row error icon, prefix/suffix add-ons, attached end button, multiline resize and `inputMode`.
- Private `FieldAction` and `FieldAddon` pieces; built-in clear, visibility, help and error glyphs use Material Symbols Rounded via MUI `Icon`.
### Fixed
- Review E2 findings 3, 4, 6, 7 and 8 and adornment bugs AD-1 … AD-6: native-input ARIA routing, disabled required colour, exact label hit area, form-reset counter, token-sized in-border actions, disabled controls, neutral error adornments, multiline first-line alignment and decorative click-to-focus.
### Verified
- Text field: 19/19 tests including light/dark, EN/AR, both review viewports, native form behavior and axe; full Web suite 77/77 when run serially; `typecheck`, `component-tokens`, `sync` and `docs:check` pass. The default parallel Web runner still times out in unrelated pre-existing suites, so Code remains `In progress`.

## [Foundations — D-18: Google Material Symbols is the icon set] — 2026-10-18
### Changed
- `2-foundations/guidelines/icons.md`: sources made exact — Web npm `material-symbols` (self-hosted Rounded variable font, `rounded.css`, class `material-symbols-rounded`, axes `'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' <size>`); Flutter `material_symbols_icons` ≥ 4.2960 (`Symbols.*_rounded`, `Icon(fill:, weight:, grade:, opticalSize:)`, built-in RTL mirroring); Figma `Google · Material Symbols` page. `@mui/icons-material` and Flutter `Icons.*` (the older Material Icons set) are no longer allowed. Migration section added.
- `ROADMAP.md`: decision D-18; Phase 0.4 closed. Section READMEs (2/3/4/5) stack rows.
- Specs (plans stay `Finished`, contracts regenerated): Web Button, Icon button, Text field (API value descriptions, examples, Text field C3 built-in glyphs + AC-12); Tablet and Mobile Button, Icon button, Text field (`Symbols.*_rounded`, RTL mirroring by the package, Code Connect mapping, `material_symbols_icons` added to Button C5 `pubspec.yaml`).
### Found (not changed — code Executor task, `icons.md` › Migration)
- Built web code still imports `@mui/icons-material`: `SplitButton.tsx`, `ButtonGroup.tsx`, `TextField.tsx`, `FieldLabel.tsx`, `FieldSupportingText.tsx` and the Button, Icon button, Split button, Button group tests.
- The Figma library index has no icon components: `figma-read-library.js` scans pages matching `Doc Kit|Icon|Annotation`, which misses `Google · Material Symbols`. Extend the page pattern before the Icon component's Figma contract.

## [Tablet + Mobile Text field — planned (1.1)] — 2026-10-18
### Added
- `4-tablet-components/components/text-field/text-field.md` and `5-mobile-components/components/text-field/text-field.md` (Plan `Finished`): Part A copied from Web 1.1 with a platform A8; Flutter spec `BwTextField` on M3 `TextFormField` (static label, `WidgetStateInputBorder`, decoration `helper`/`error`/`counter` widgets for semantics, `BwIconButton` trailing action / help icon, attached `BwButton`, add-on segments, `obscureText` + show/hide, `clearable`, `validator`, keyboard type/action, grapheme counter); code plan C1–C7 (depends on `BwButton` + `BwIconButton` being built first); Figma D referencing Web D2–D4 with platform differences.
- Platform sizes: **Tablet `md` · `lg`** (default `lg`; `md` hit area padded to 48) · **Mobile `lg` only** (every field ≥ the 48 touch target). No Hover variant in Figma on touch platforms. Variants: Tablet 112 · Mobile 56.
- `text-field.tokens.json` for both platforms (`$extends` the Web file, same aliases); docs pages, `components/index.json`, README rows; contracts generated (`npm run contract -- tablet|mobile text-field`).
- Biowave DS — Tablet and Mobile Components: `Text field / Size` + `Text field / State` collections created (23 tokens each, aliases to Foundations semantic variables). Lint 0 in both files; `sync:verify-tokens` ✓ 64 tokens per file (Tablet Button lines read in full; Mobile Button and both Text field dumps matched by checksum); `sync:done:tokens:tablet|mobile`.
### Verified
- `component-tokens` ✓ · `docs:check` ✓ (15 component files, Part A identical on all three platforms) · `sync` ✓ READY.

## [Sync — library index re-read, all contracts regenerated, Web component tokens pushed] — 2026-10-18
### Changed
- `_sync/figma-library.json` re-read: styles from Foundations (140 text · 8 effect · 6 grid), **28 `Doc/*` components with keys from the Annotation Doc Kit library (D-17)**, reach from the Web Components file (318 variables). Variables kept from the previous read (token source unchanged). Doc Kit components verified importable by key from the Web Components file.
- `npm run contract -- --all`: all 13 code + Figma contracts regenerated (Web Text field now on spec 1.1; Figma contracts carry Doc Kit keys, so Phase 2 docs are no longer blocked).
- Biowave DS — Web Components: component tokens pushed with `figma-apply-tokens-web.js` — created `Text field / Size › action-box, action-inset`, `Text field / State › addon-background, addon-text, error-icon`; updated `Text field / State › border, icon`; 57 unchanged. `figma-read-tokens.js` lint 0 · `sync:verify-tokens web` ✓ 64 tokens · `sync:done:tokens:web`.
### Verified
- `npm run sync` ✓ READY (13 Figma contracts in the build queue) · `npm run docs:check` ✓ · `npm run component-tokens` ✓.

## [Doc Kit 1.3 — own library file (D-17)] — 2026-10-18
### Changed
- **D-17:** the Figma Doc Kit lives in its own library file, **Annotation** (`_sync/figma-files.json` › `docKit`, key `cBPWg6YZNqK8UIzgMQIpXl`), moved from Foundations › `↳ Doc Kit` by Hassan. All 28 `Doc/*` entries are components there again (8 had arrived as instances and were rebuilt; nested instances relinked to the local ones); every value stays bound to the Foundations library (lint: 0 unbound, 0 unstyled text).
- Tooling: the sync status queues `figma-doc-kit.md` for the Annotation file (`sync:done:doc-kit` → `--components=docKit`); `figma-read-library.js` reads `Doc/*` components in the Annotation file (no `loadAllPagesAsync`); the contract generator takes Doc Kit keys by the `Doc/` name and tells the Figma Agent to enable the Annotation library.
- `figma-doc-kit.md` 1.3, `AGENTS.md` §7, `_sync/README.md`, `README.md` (D-17, status), `ROADMAP.md` 0.3.

## [Web Text field — plan 1.1: legacy properties + adornment bug] — 2026-10-18
### Added
- `_audits/input-family.md` §6–7: full property inventory of the legacy web `↳ Inputs` page (Inputs 56, Dropdown 30, Textarea 14, Verification code 48 variants) mapped to Biowave components; decisions **I-11 … I-14** confirmed by Hassan (help icon in the label row, error icon in the supporting row, prefix/suffix as attached add-ons, managed trailing action API, attached end button); adornment bugs AD-1 … AD-6.
- Text field spec 1.1 (`text-field.md`): new parts `help-icon`, `prefix`, `suffix`, `trailing-icon`, `end-button`, `error-icon`; props `helpText`/`helpLabel`, `action`, `clearable`/`clearLabel`/`onClear`, `passwordToggle`, `prefix`, `suffix`, `endButton`, `resize`, `inputMode`; private parts `FieldAddon`, `FieldAction`; Figma D2–D5 and D10 updated (216 variants unchanged; new options are component properties); E3 review addendum.
- `text-field.tokens.json`: `action-box`, `action-inset`, `addon-background`, `addon-text`, `error-icon` (aliases of existing semantic tokens). `component-tokens` ✓.
### Changed
- **Breaking (spec 1.1):** `endAdornment` is decorative only; interactive trailing content moves to `action` / `clearable` / `passwordToggle`. Caller `aria-*` now goes to the native input.
- Error no longer recolours leading/trailing icons; read-only border is `color-border-default` (read-only was identical to default in dark mode).
- Web Text field Plan `Open` → `Finished`; Code stays `Changes requested` (round 2 implements spec 1.1).
### Found (not changed)
- Bug reproduced in Chromium: trailing slot sized by `target-min` (48 px below the 1200 px breakpoint) overflows `sm`/`md` fields; Icon buttons cover the border; disabled field keeps the trailing button active.
- ~~Doc Kit components missing~~ — corrected: the Doc Kit had moved to its own Annotation library (D-17); see the next entry.

## [Docs — one project: `npm start` runs everything] — 2026-10-18
### Added
- `npm start` (also `npm run dev` / `npm run docs`): one Vite dev server for the whole system. `/` opens the **Foundation List** (`2-foundations/index.html`) as the home page; Foundations, token preview, the three Components Lists and every component page are served together.
- Live React previews: `_docs/live.html` + `_docs/live.tsx` render the real `@biowave/web` components (Button, Icon button, Split button, Button group, Text field) from `3-web-components/src` inside each Web component page (Overview tab), following the page's language, theme and color. `_docs/vite.config.mjs`. Dev deps: `vite`, `@vitejs/plugin-react`. No folders added or moved.
### Fixed
- Text field docs page crashed (no playground config) — now has a static preview and states (default, hover, focus, error, read-only, disabled).
- Component page logo linked to a non-existent path — now goes to the Foundation List.
- Platform tabs on a component that exists on one platform only now open that platform's Components List instead of a 404.
### Changed
- Old static server kept as `npm run docs:static`.

## [Web Button family — Icon button, Split button, Button group built] — 2026-10-18
### Added
- `IconButton`: four emphasis variants, five semantic colors, `sm·md·lg`, controlled toggle/selected glyphs, tokenized visual tooltip, loading/disabled behavior, RTL directional icons and accessible native-button semantics.
- `SplitButton`: real Button + IconButton segments with logical inner corners, controlled/uncontrolled menu state, tokenized temporary MUI menu, complete menu-button keyboard navigation and localized trigger labels.
- `ButtonGroup`: horizontal/vertical action layout, five alignment modes, group-owned child sizing, DOM-order-preserving vertical layout, localized overflow menu and validation warnings.
- Public package exports and 32 focused tests for the three components; the complete Web suite now covers 67 passing tests.
### Changed
- `Button`, `IconButton` and `SplitButton` consume Button Group size context; Button and IconButton also expose private segmented-corner primitives for Split Button composition without widening the public API.

## [Review — Web Text field round 1: Changes requested] — 2026-10-18
### Reviewed
- Clean install: typecheck ✅, `test:web` 35/35 ✅, `component-tokens` ✅, `sync` READY; `docs:check` ❌ (all 13 Figma contracts stale since Doc Kit 1.2). Field colour pairs checked on both field backgrounds, light + dark: all pass.
- Findings: 1 gate blocker (stale Figma contracts, not caused by Text field), 3 should-fix (read-only identical to default in dark mode; input `aria-*` routed to the root div; required indicator stays error-coloured when disabled), 4 nits. Figma build, Tablet, Mobile and Select not started. Full record: `3-web-components/components/text-field/text-field.md` › Part E.
### Changed
- Web Text field status: Plan `Finished` → `Open`, Code `Built` → `Changes requested`; `3-web-components/README.md` row updated.

## [Figma Doc Kit 1.2 — built] — 2026-10-18
### Added
- Figma Doc Kit built in **Biowave DS — Foundations** › `↳ Doc Kit`: the 24 `Doc/*` components from `2-foundations/figma-doc-kit.md` plus `Doc/Logo`, all auto layout with native slots, every fill/stroke/padding/gap/radius/width bound to Foundations variables and every text to a `Web/en/*` text style (lint: 0 violations). Unblocks Phase 2 (documentation pages + Components List card) of every Figma contract once the library is published and the keys are read.
- `Foundation List` home page (10 linked cards) right after Cover, built only from the four home components.
- DK-3 sample doc page (31 kit instances, checked in Light and Dark).
### Changed
- `figma-doc-kit.md` 1.2: page widths confirmed (DK-5): Wide = `size/container/6xl`, Standard = `size/container/2xl`; Fill rule for kit instances in rows; slot names; `Doc/Timeline` steps are the `motion-duration-*` tokens; code text uses `Web/en/data/*` (no mono style in Figma).

## [Web Text field — planned and built] — 2026-10-18
### Added
- `TextField` for Web: static visible/visually-hidden label, `sm·md·lg`, single-line and multiline input, required/error/helper/counter states, leading/trailing adornments, disabled/read-only behavior, native form semantics, RTL, dark theme and public package exports.
- Contract-first source, component-token collections, generated code/Figma contracts and 11 focused tests covering token parity, state semantics, Unicode counting, warnings, keyboard order, EN/AR, light/dark and axe.
### Changed
- Accessibility guidance records the approved editable-field focus exception: focused border at `border-width-focus`, no exterior offset; the contract generator now preserves that exception instead of emitting the generic offset-ring rule.
- Pinned Stylis 4.2 across the workspace so `stylis-plugin-rtl` and Emotion serialize the same AST version; this fixes disabled/read-only MUI input rendering in Arabic.

## [Audit — Input family: Figma audit, decisions I-01 … I-10 closed] — 2026-10-18
### Added
- `_audits/input-family.md`: read-only audit of the legacy input sets (web `Inputs`, `Dropdown`, `Textarea`, `Verification code`; mobile `Inputs` + parts, `PIN Input`, `Phone Number`, `Search Input`, `Details input`), token check (no foundation change needed before Day 7), decisions I-01 … I-10 and the proposed build order (Text field + Select Day 7, Verification code Day 8, Phone field Day 13). Nothing in Figma or tokens changed.
### Changed
- Decisions I-01 … I-10 confirmed by Hassan (all recommendations): static label above the field, outlined only, field focus = border in `color-border-focus` at `border-width-focus` (exception to be recorded in `a11y.md` with the Day 7 plan), `sm·md·lg`, Text area inside Text field, shared `.Field/*` parts, legacy sets deprecated after approval.
- `ROADMAP.md`: Verification code added to Day 8, Phone field added to Day 13, I-01 … I-10 row in §7, Phase 0.2 updated.

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

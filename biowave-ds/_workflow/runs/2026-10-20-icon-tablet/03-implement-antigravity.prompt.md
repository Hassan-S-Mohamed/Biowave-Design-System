# Implement step — icon / tablet (retry 2)

Project root: /Users/hassansaid/Downloads/Biowave Design System-icon-tablet/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
4-tablet-components/components/icon/icon-contract.md only (plus AGENTS.md), and the code already written on this branch by step 01.

## Outputs (write only these)
The files in contract §9, plus C8 Execution log in 4-tablet-components/components/icon/icon.md (update the entry; keep Code `Built` only if all checks pass), and the CHANGELOG.md line.

## This step
Step 01 (Codex) built `BwIcon`, `BwIconSize`, `BwIconColor`, `test/icon_test.dart`, `test/no_legacy_icons_test.dart` and golden PNGs, but it could not run `flutter test` in its sandbox. Run outside a sandbox, `cd 4-tablet-components && flutter test` fails 22 of the icon tests:

1. All 14 "uses its token size in light/dark **ar**" tests: "This application's locale, ar, is not supported by all of its localization delegates — no MaterialLocalizations / CupertinoLocalizations delegate for ar". The test harness must add `GlobalMaterialLocalizations.delegate`, `GlobalWidgetsLocalizations.delegate`, `GlobalCupertinoLocalizations.delegate` (flutter_localizations is already a dev dependency) or otherwise build en + ar correctly.
2. "directional icons flip exactly once in RTL only" (Expected a negative value, Actual 1.0) and "non-directional icons never add a flip" — fix the test or the widget so the flip behaviour matches contract §6/§9 (`Transform.flip(flipX: isRtl)`, no `matchTextDirection`).
3. "decorative icons are excluded from semantics" — finder found 2 `ExcludeSemantics` widgets (expected exactly one; `Icon` adds its own). "labelled icons expose an image semantics node" also fails. Check semantics against B6 with a precise finder/`SemanticsTester`/`find.bySemanticsLabel`.
4. All 4 goldens (size_scale, colors, fill, rtl) fail with 12–18 % pixel diff: they were rendered outside `flutter test`. Regenerate with `flutter test --update-goldens test/icon_test.dart` after the fixes above, and confirm the images show Material Symbols Rounded glyphs (not tofu boxes) — the variable Symbols font must be loaded in tests.

Do not weaken the tests to make them pass; they must still prove every §10 item. Keep the no-`Icons.` guard. Glyphs only from Google Material Symbols Rounded (`Symbols.*_rounded`).

## Notes from the user
The goal of this run: every icon used in the design system must be a Google Material Symbol.

## Checks to run
- cd 4-tablet-components && flutter analyze && flutter test   (must pass — all tests)
- npm run docs:check (known pre-existing failure: tablet/mobile button-group Figma contracts are stale, also on main — report it, do not fix it)
- npm run component-tokens; npm run sync (must end with READY)

Do not commit, push or switch branches. End with the Handoff block.

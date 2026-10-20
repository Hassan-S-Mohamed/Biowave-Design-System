# Implement step — button / mobile

Project root: /Users/hassansaid/Downloads/Biowave Design System-button-mobile/biowave-ds (a git worktree on `ds/button-mobile`; work only here, never in `/Users/hassansaid/Downloads/Biowave Design System/`). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
5-mobile-components/components/button/button-contract.md only.

## Outputs (write only these)
The files in contract §9 (`5-mobile-components/lib/src/common/bw_control_size.dart`, `lib/src/common/bw_focus_ring.dart`, `lib/src/components/button/bw_button.dart`, `lib/src/components/button/bw_button_style.dart`, `lib/biowave_mobile.dart`, `test/helpers/bw_test_app.dart`, `test/flutter_test_config.dart`, `test/fonts/`, `test/button_test.dart`, `test/goldens/button/`, `5-mobile-components/README.md` status row, and the `flutter_localizations` dev dependency if §9 needs it), plus the C8 Execution log in 5-mobile-components/components/button/button.md, the Code field and "Source code" row in its header, and one line in CHANGELOG.md.

## This step
Build `BwButton` for Flutter mobile exactly as the contract (plan 1.1) says: §9 Approach, §10 Tests, §11 acceptance criteria. This is the first component of the mobile package, so it also adds `BwControlSize`, `BwFocusRing` (painted outside the visible container via `ButtonStyle.backgroundBuilder` + `Stack(clipBehavior: Clip.none)`, no `Padding`, no fade, caller-supplied key and radius), `pumpBw` (en/ar Material localizations, `reduceMotion`) and `flutter_test_config.dart` with real fonts. Tests must measure (`tester.getSize` on the container, ring rect vs container rect per size in LTR and RTL, growth at text scale 2), not only read styles. Generate the goldens with `flutter test --update-goldens`, then run the suite again without it, and check by eye that Arabic is shaped and icons are glyphs. Fill C8 and set Code to `Built` (unit file header and the `5-mobile-components/README.md` table). Do not touch web, tablet or any `*-contract.md`.

## Notes from the user
- The same test fonts are already committed for tablet: `4-tablet-components/test/fonts/` (Inter and IBM Plex Sans Arabic 400/500/600 static TTFs + `OFL-Inter.txt`, `OFL-IBMPlexSansArabic.txt`, verified). Copy them into `5-mobile-components/test/fonts/` instead of downloading.
- Known baseline: `npm run docs:check` reports 2 errors that are not yours (tablet + mobile `button-group` Figma contracts stale; fixed on another branch, not merged). Do not regenerate them; report docs:check as passing if those 2 are the only errors, and say so in C8.
- node_modules in this worktree are symlinks to the main checkout; that is intended.
- Run `flutter analyze` (not `dart analyze`) and plain `flutter test`.

## Checks to run
cd 5-mobile-components && flutter analyze && flutter test · npm run component-tokens · npm run sync (must end with READY) · npm run docs:check

Do not commit, push or switch branches. End with the Handoff block.

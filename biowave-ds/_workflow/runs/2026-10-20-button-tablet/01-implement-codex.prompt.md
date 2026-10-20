# Implement step — button / tablet

Project root: /Users/hassansaid/Downloads/Biowave Design System/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
4-tablet-components/components/button/button-contract.md only.

## Outputs (write only these)
The files in contract §9 (`4-tablet-components/lib/src/common/bw_control_size.dart`, `lib/src/common/bw_focus_ring.dart`, `lib/src/components/button/bw_button.dart`, `lib/src/components/button/bw_button_style.dart`, `lib/biowave_tablet.dart`, `test/helpers/bw_test_app.dart`, `test/button_test.dart`, `test/goldens/button/`, `4-tablet-components/README.md` status row), plus the C8 Execution log in 4-tablet-components/components/button/button.md, the Code field in its header, and one line in CHANGELOG.md.

## This step
Build `BwButton` for Flutter tablet exactly as the contract says (§9 Approach, §10 Tests, §11 AC-1 … AC-7). This is the first component of the tablet package, so it also adds `BwControlSize`, the private focus ring and the `pumpBw` test helper that later components reuse. Generate the goldens with `flutter test --update-goldens`, then run the suite again without it. Fill C8 and set Code to `Built` (unit file header and the `4-tablet-components/README.md` table). Do not touch web, mobile or any `*-contract.md`.

## Notes from the user
- Known baseline: `npm run docs:check` on this branch reports 2 errors that are not yours — the `tablet` and `mobile` `button-group` Figma contracts are stale (fixed on another branch, not merged yet). Do not regenerate them. Report docs:check as passing if those 2 are the only errors, and say so in C8.

## Checks to run
cd 4-tablet-components && flutter analyze && flutter test · npm run component-tokens · npm run sync (must end with READY) · npm run docs:check

Do not commit, push or switch branches. End with the Handoff block.

# Implement step — icon / tablet (adoption in built components)

Project root: /Users/hassansaid/Downloads/Biowave Design System-icon-tablet/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
4-tablet-components/components/icon/icon-contract.md (plus AGENTS.md), and the tablet Button code that just landed on main: 4-tablet-components/lib/src/components/button/ and its tests.

## Outputs (write only these)
4-tablet-components/lib/src/components/button/bw_button.dart (and bw_button_style.dart only if needed), the affected Button tests/goldens, the guard test 4-tablet-components/test/no_legacy_icons_test.dart, a new C8 entry in 4-tablet-components/components/icon/icon.md, and one CHANGELOG.md line.

## This step
Contract §9: "This is the first component of the package: Button, Icon button and Text field render their icons through `BwIcon`." Button tablet was merged into main after BwIcon was built, and `BwButton` still renders its leading and trailing icons with a raw Flutter `Icon(...)` (bw_button.dart, keys `BwButton.leading-icon` / `BwButton.trailing-icon`). Change both to `BwIcon`, keeping the same size (`dimensions.iconSize` must map to a `BwIconSize` token or follow `IconTheme` via `size: null` — no raw values), colour (inherit from the button's foreground through `IconTheme`), keys, decorative semantics, and the "no double flip in RTL" rule (B9: directional icons flip once inside BwButton). Button behaviour, layout and goldens must not change visually; if a golden changes, regenerate it and say why in C8.

Also extend `test/no_legacy_icons_test.dart` so `lib/` may not use: Flutter `Icons.`, `CupertinoIcons.`, a raw `IconData(` constructor, or a raw `Icon(` widget outside `lib/src/components/icon/` (every icon goes through `BwIcon`). Prove each pattern with a planted probe that you revert.

## Notes from the user
Every icon used in the design system must be a Google Material Symbol (D-18, `Symbols.*_rounded`). Stay out of other components' plans; if Button's plan needs a change to allow this, stop and write it as a question.

## Checks to run
- cd 4-tablet-components && flutter analyze && flutter test   (all tests must pass)
- npm run docs:check (known pre-existing failure: tablet/mobile button-group Figma contracts — report, do not fix)

Do not commit, push or switch branches. End with the Handoff block.

# Icons

Biowave uses **Google Material Symbols** — style **Rounded**, weight 400, grade 0, fill 0 by default and fill 1 for selected states; optical size = the icon size on Flutter, the font default on web (decision **D-18**, 2026-10-18).

| Platform | Source | How |
|---|---|---|
| Web | npm **`@material-symbols/font-400`** — self-hosted Rounded variable font at weight 400 with the FILL axis only (≈ 0.6 MB; the full `material-symbols` font is ≈ 5.4 MB), loaded once by `@biowave/foundations/icons.css` | Rendered by the Biowave `Icon` (Day 1). Until it ships: MUI `Icon` with `baseClassName="material-symbols-rounded"`, e.g. `<Icon baseClassName="material-symbols-rounded">close</Icon>`. Selected state: class `bw-icon-fill` (`'FILL' 1`). Weight 400 / grade 0 are built into the font; the glyph follows the inherited `font-size` (size tokens) |
| Flutter | pub **`material_symbols_icons`** (^4.2960), re-exported by `biowave_foundations` | `Icon(Symbols.close_rounded)` — fill 0, weight 400, grade 0 and size come from the Biowave theme `iconTheme`; selected: `fill: BwIconAxes.fillSelected` |
| Figma | Library file **Google · Material Symbols** (`_sync/figma-files.json` › `icons`, key `RXlnhYgUKBBE6HveEr7e9C`) — one set per glyph, `Material Symbols/<name>`, `Style` × `Fill` | Instances of the **Style=Rounded** variant (`Fill=Filled` for selected). Keys of the glyphs the specs use: `_sync/figma-icons.json` (`npm run sync:icons:plan` → read → `npm run sync:icons`); every Figma contract lists its icons. Never the `_LEGACY Google · Material Icons` page |

**Not allowed in Biowave components:** `@mui/icons-material` and Flutter `Icons.*` — both are the older *Material Icons* set (different glyphs, no fill/weight axes).

**Names:** always the Material Symbols name in snake_case (`close`, `visibility_off`, `push_pin`, `arrow_forward`). Specs, Figma `INSTANCE_SWAP` defaults and Code Connect use the same name.

## Sizes
| Token | Value | Use |
|---|---|---|
| `size-icon-xs` | 12px |  |
| `size-icon-sm` | 16px |  |
| `size-icon-md` | 20px |  |
| `size-icon-lg` | 24px |  |
| `size-icon-xl` | 32px |  |
| `size-icon-2xl` | 40px |  |
| `size-icon-3xl` | 48px |  |

Default inline icon: `size-icon-md` (20) on web, `size-icon-lg` (24) on tablet/mobile. Icon-only buttons keep the icon size but the **target** must reach `target-min`.

## Color
`color-icon-default` · `-subtle` · `-subtlest` on neutral surfaces, `color-icon-role-*` for status, `color-icon-on-*` on filled backgrounds. Meaningful icons need ≥ 3:1 (checked by the build).

## RTL
Flutter `material_symbols_icons` mirrors directional glyphs in RTL itself. On web the font does not: directional icons get the Biowave directional class (Button B5) or the Icon `directional` option.
Mirror icons that show direction or progress (arrow_back/forward, chevrons, undo/redo, send, list indent). Do **not** mirror: logos, checkmarks, clocks, media play/pause, search, plus/minus, slashes in fractions.

## Rules
- Icon-only controls need an accessible name (`aria-label` / `Semantics(label:)` / `tooltip`).
- Decorative icons next to text are hidden from screen readers (`aria-hidden`, `ExcludeSemantics`).
- Custom icons (biometric methods, device types) are drawn on a 24px grid with 2px padding and Material Symbols stroke weight, and stored in Figma page `Icons`.

## Migration (D-18)

Code built before D-18 imports `@mui/icons-material`. One Executor task (owner: code Executor, before the Day 1 Icon component) replaces it:

| Step | Change |
|---|---|
| 1 | ✅ 2026-10-18 `2-foundations/web`: `@material-symbols/font-400` + `src/icons.css` (export `@biowave/foundations/icons.css`): font import, `font-size: inherit`, `'FILL' 0`, `.bw-icon-fill` |
| 2 | ✅ 2026-10-18 `3-web-components`: remove `@mui/icons-material`; replace imports in `split-button/SplitButton.tsx`, `button-group/ButtonGroup.tsx`, `text-field/TextField.tsx`, `text-field/FieldLabel.tsx`, `text-field/FieldSupportingText.tsx` and the tests of Button, Icon button, Split button, Button group |
| 3 | ✅ 2026-10-18 `2-foundations/flutter`: `material_symbols_icons ^4.2960.0`, re-exported from `biowave_foundations.dart` (component packages import `Symbols` from there); `BwIconAxes` constants; theme `iconTheme` = size/opticalSize `BwSize.iconLg`, `color-icon-default`, fill 0, weight 400, grade 0. Not yet run through `flutter analyze` (no Flutter SDK in the build environment) |
| 4 | ✅ web: `src/test/noLegacyIcons.test.ts` fails on any `@mui/icons-material` import · Flutter: add the same check with the first Flutter component |

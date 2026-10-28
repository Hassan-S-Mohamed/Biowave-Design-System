<!-- GENERATED from text-field.md @ 2dae55cb6385ac33 — do not edit; change the source and run: npm run contract -- mobile text-field -->
# Text field · حقل نص — Mobile — code contract

> **Everything you need to build Text field on Mobile, and nothing else.** Read this file only. Generated from [`text-field.md`](text-field.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](text-field.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Text field · حقل نص |
| Platform | Mobile · Flutter + Material 3 |
| Built on | M3 `TextFormField` with an outlined `InputDecoration` built only from Biowave tokens; static label above the field (never `labelText` / floating label) |
| Import | `BwTextField` from `package:biowave_mobile/biowave_mobile.dart` |
| Version | 1.1 · 2026-10-18 (first Mobile version; same guidelines version as Web 1.1) |
| Source code | `lib/src/components/text_field/` — not built yet (the Executor creates it) |
| Tokens | [`text-field.tokens.json`](text-field.tokens.json) |
| Source | [`text-field.md`](text-field.md) @ `2dae55cb6385ac33` |

## 1. What it is

A text field lets a user enter or edit text. It uses a static label above an outlined field so the purpose stays visible after entry and remains clear with long Arabic labels. The same component covers single-line input and multiline text area; choosing `multiline` changes the field anatomy without changing the form model.

**Part names** (use exactly these in code, class names and tests):

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `field` | Yes | Outlined input surface and interaction boundary |
| 2 | `label` | Yes | Persistent name for the input; visually hidden only when nearby context makes repetition unnecessary |
| 3 | `required-indicator` | No | Marks a value that must be supplied; never the only required instruction |
| 4 | `help-icon` | No | Icon button in the label row that shows a short explanation in a tooltip |
| 5 | `prefix` | No | Attached add-on segment before the input with fixed text such as `http://` or a currency |
| 6 | `leading-icon` | No | Non-interactive cue for the expected content |
| 7 | `input` | Yes | Native editable value, single-line or multiline; shows `placeholder` when empty |
| 8 | `trailing-action` | No | One in-field control: clear, show/hide password or one custom action |
| 9 | `trailing-icon` | No | Decorative icon in the same position as ⑧; never together with a trailing action |
| 10 | `suffix` | No | Attached add-on segment after the input with fixed text such as `SAR`, `%` or `kg` |
| 11 | `end-button` | No | Attached button segment after the field, e.g. Copy |
| 12 | `error-icon` | Auto | Shown before the supporting text when `error` is on; never inside the field |
| 13 | `supporting-text` | No | Hint or error linked to the input |
| 14 | `counter` | No | Current character count and optional limit |

**Options** (names and values are the props in §2):

- 4.1 `size`
- 4.2 `multiline`
- 4.3 Label, required indicator and help icon
- 4.4 Leading icon, trailing icon and trailing action
- 4.5 Supporting text, error icon and counter
- 4.6 Prefix and suffix
- 4.7 End button

## 2. API

### `BwTextField`

| Param | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `label` | `String` | | | ✓ | Persistent visible and accessible name |
| `hideLabel` | `bool` | | `false` | | Hides the visible label; the accessible name stays |
| `size` | `BwControlSize` | `lg` (`sm` / `md` assert, fall back to `lg`) | `lg` | | A4.1 · A8 |
| `controller` · `initialValue` | `TextEditingController?` · `String?` | | | | Controlled or uncontrolled value (`TextFormField` rules: not both) |
| `onChanged` · `onSubmitted` · `onTap` | callbacks | | | | |
| `validator` · `autovalidateMode` | `FormFieldValidator<String>?` · `AutovalidateMode` | | `disabled` | | Works inside `Form`; a returned message is shown as the error |
| `helperText` | `String?` | | | | Hint (`supporting-text`) |
| `errorText` | `String?` | | | | Non-null = error state; replaces `helperText` and shows `error-icon` (web: `error` + `helperText`) |
| `helpText` · `helpLabel` | `String?` · `String?` | | `helpLabel` localized “More information about {label}” / “مزيد من المعلومات عن {label}” | | A4.3 `help-icon` with a tooltip |
| `requiredField` | `bool` | | `false` | | Shows `required-indicator`; adds “required” / “مطلوب” to the semantics label. Does not validate by itself |
| `multiline` · `minRows` · `maxRows` | `bool` · `int?` · `int?` | | `false` · `3` · `null` | | A4.2; `maxRows: null` grows without limit |
| `maxLength` · `showCounter` | `int?` · `bool` | | `null` · `false` | | Enforced with `MaxLengthEnforcement.enforced`; counter counts grapheme clusters, the same unit Flutter enforces (web counts code points) |
| `leadingIcon` · `trailingIcon` | `IconData?` | `Symbols.*_rounded` (D-18; re-exported by `biowave_foundations`) | | | Decorative `leading-icon` / `trailing-icon`, excluded from semantics |
| `action` | `BwTextFieldAction?` | `(icon, label, onPressed)` | | | Custom `trailing-action` |
| `clearable` · `clearLabel` · `onCleared` | `bool` · `String?` · `VoidCallback?` | | `false` · localized “Clear {label}” / “مسح {label}” | | Clear action while the field has text and is editable |
| `obscureText` · `passwordToggle` | `bool` · `bool` | | `false` · `true` when `obscureText` | | Password field with show/hide action |
| `prefixText` · `suffixText` | `String?` | | | | A4.6 attached add-ons; single-line only |
| `endButton` | `BwTextFieldEndButton?` | `(label, icon?, onPressed, loading)` | | | A4.7 attached `BwButton`; single-line only |
| `keyboardType` · `textInputAction` · `autofillHints` · `textCapitalization` · `inputFormatters` | Flutter types | | from `obscureText` / `multiline` | | Passed to `TextFormField`; `multiline` forces `TextInputType.multiline` + `TextInputAction.newline` |
| `textDirection` | `TextDirection?` | | ambient | | Only for intrinsically LTR values (email, URL) |
| `readOnly` · `enabled` | `bool` | | `false` · `true` | | `enabled: false` wins over `readOnly` |
| `focusNode` · `autofocus` | | | | | Passed through |

`BwControlSize` and `BwFocusRing` come from `lib/src/common/` (created by Button). Platform naming: Flutter `errorText` = web `error` + `helperText`; `requiredField` = web `required`; `leadingIcon`/`trailingIcon` = web `startAdornment`/`endAdornment`; `prefixText`/`suffixText` = web `prefix`/`suffix`; `obscureText` = web `type="password"`; `enabled: false` = web `disabled`. No `resize` on Mobile.

**Invalid combinations** (`assert` in debug; fallback in release):

| Combination | Fallback |
|---|---|
| `size` not in `lg` | Nearest allowed size |
| `showCounter` without `maxLength` | Counter hidden |
| `minRows` / `maxRows` with `multiline: false` | Ignored |
| `multiline: true` with `obscureText: true` | `obscureText` ignored |
| More than one of `passwordToggle` (on), `action`, `clearable` | Shown in that priority |
| `trailingIcon` with any trailing action | `trailingIcon` ignored |
| `prefixText`, `suffixText` or `endButton` with `multiline: true` | Ignored |
| `suffixText` and `endButton` together | `suffixText` ignored |
| `controller` and `initialValue` together | assert (Flutter `TextFormField` rule) |

## 3. Dimensions

Same redline and layout rules as [Web B2](../../../3-web-components/components/text-field/text-field.md#b2-dimensions) (action inset `spacing-xs`, add-on dividers, end-button shared border, first-line alignment, label/supporting gaps), with the Mobile sizes:

| Part | Property | lg |
|---|---|
| `field` | height | `size-control-height-lg` |
| `field` | padding-inline | `spacing-control-padding-inline-lg` |
| `field` | padding-inline-end with `trailing-action` | `spacing-xs` |
| `field` | internal gap · multiline padding-block | `spacing-control-gap-lg` |
| `leading-icon` · `trailing-icon` · `trailing-action` glyph | size | `size-icon-lg` |
| `trailing-action` | box | `size-control-height-md` |
| `end-button` | `BwButton` size | `lg` |
| `label` | text style | `label-lg` |
| `input` · `prefix` · `suffix` | text style | `body-lg` |

Shared for every size: radius `radius-md` · border `border-width-default` / focused `border-width-focus` · label gap `spacing-sm` · supporting gap `spacing-xs` · `supporting-text`, `counter` = `caption-md` · `error-icon` `size-icon-sm` · help icon glyph `size-icon-sm`.

- **Touch targets:** Only `lg` exists, so the field is always ≥ 48. `trailing-action`, `help-icon` and `end-button` keep a 48 hit area via `MaterialTapTargetSize.padded`, extended invisibly so layout does not change.
- **Text scale:** label, value and supporting text scale with the system text scale; the field grows in height (`isDense: false`, `constraints` with a min height, never a fixed max) and never clips.
- **Keyboard:** the field scrolls into view above the on-screen keyboard (`scrollPadding` = `EdgeInsets.all(BwSpacing.xl3)`).

Flutter access: `size-control-height-lg` → `BwSize.controlHeightLg` · `spacing-control-padding-inline-lg` → `BwSpacing.controlPaddingInlineLg` · `spacing-xs` → `BwSpacing.xs` · `radius-md` → `BwRadius.md` · `border-width-focus` → `BwBorder.widthFocus` · `body-lg` → `context.bw.text.bodyLg` · colours → `context.bw.colors.<camelCase>` (e.g. `borderBold`) · `target-min` → `BwLayout.mobile.minTarget`.

## 4. Tokens by part and state

Identical to [Web B3](../../../3-web-components/components/text-field/text-field.md#b3-tokens-by-part-and-state) (same token for every part × state, including the read-only border and neutral icons in error); machine copy [`text-field.tokens.json`](text-field.tokens.json) extends the Web file. The **Hover** row applies only when a pointer is attached (`WidgetState.hovered`); Figma has no Hover variant on Mobile. Flutter mapping:

| Spec part / state | Flutter |
|---|---|
| `field` border per state | `InputDecoration.border` = `WidgetStateInputBorder.resolveWith` → `OutlineInputBorder(borderRadius: BwRadius.md resolved for the text direction, borderSide: BorderSide(width, color))`; states `focused`, `hovered`, `error`, `disabled` |
| `field` background (read-only, disabled) | `filled: true`, `fillColor` `WidgetStateColor`; `hoverColor` / `focusColor` transparent |
| `label` | `Text` above the field, `context.bw.text.label{Size}`, colour by state |
| `input` · `placeholder` | `style` · `hintStyle` |
| icons | `prefixIconColor` / `suffixIconColor` `WidgetStateColor` |
| `prefix` · `suffix` add-ons | custom segment widgets in `prefixIcon` / `suffixIcon` with zero `prefixIconConstraints` padding so they reach the border |
| `supporting-text` · `error-icon` · `counter` | `InputDecoration.helper` / `error` / `counter` **widgets** (keeps Flutter's semantics), styled from B3 |
| splash, elevation | none |

### 4.1 How to use each token on Mobile

Values are for checking only — never paste a value.

| Token | Dart | Light | Dark |
|---|---|---|---|
| `border-width-default` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 1 | 1 |
| `border-width-focus` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 2 | 2 |
| `color-border-error` | `context.bw.colors.borderError` | #D42222 | #FF7676 |
| `color-border-focus` | `context.bw.colors.borderFocus` | #254471 | #90A3BC |
| `radius-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 8 | 8 |
| `size-control-height-lg` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 48 | 48 |
| `size-control-height-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 40 | 40 |
| `size-icon-lg` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 24 | 24 |
| `size-icon-sm` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 16 | 16 |
| `spacing-control-gap-lg` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 8 | 8 |
| `spacing-control-padding-inline-lg` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 16 | 16 |
| `spacing-sm` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 6 | 6 |
| `spacing-xs` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 4 | 4 |
| `target-min` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` |  |  |

### 4.2 Component tokens

The code token map must equal [`text-field.tokens.json`](text-field.tokens.json) (tests compare them).

| Collection | Variable | Modes → semantic token |
|---|---|---|
| Text field / Size | height | sm: `size-control-height-sm` · md: `size-control-height-md` · lg: `size-control-height-lg` |
| Text field / Size | padding-inline | sm: `spacing-control-padding-inline-sm` · md: `spacing-control-padding-inline-md` · lg: `spacing-control-padding-inline-lg` |
| Text field / Size | gap | sm: `spacing-control-gap-sm` · md: `spacing-control-gap-md` · lg: `spacing-control-gap-lg` |
| Text field / Size | label-gap | sm: `spacing-sm` · md: `spacing-sm` · lg: `spacing-sm` |
| Text field / Size | supporting-gap | sm: `spacing-xs` · md: `spacing-xs` · lg: `spacing-xs` |
| Text field / Size | icon | sm: `size-icon-sm` · md: `size-icon-md` · lg: `size-icon-lg` |
| Text field / Size | radius | sm: `radius-md` · md: `radius-md` · lg: `radius-md` |
| Text field / Size | border-width | sm: `border-width-default` · md: `border-width-default` · lg: `border-width-default` |
| Text field / Size | action-box | sm: `size-icon-lg` · md: `size-control-height-sm` · lg: `size-control-height-md` |
| Text field / Size | action-inset | sm: `spacing-xs` · md: `spacing-xs` · lg: `spacing-xs` |
| Text field / State | background | default: `color-background-base-default` · hover: `color-background-base-hovered` · focus: `color-background-base-default` · error: `color-background-base-default` · disabled: `color-background-disabled` · read-only: `color-background-base-subtlest` |
| Text field / State | border | default: `color-border-bold` · hover: `color-border-bold` · focus: `color-border-focus` · error: `color-border-error` · disabled: `color-border-disabled` · read-only: `color-border-default` |
| Text field / State | border-width | default: `border-width-default` · hover: `border-width-default` · focus: `border-width-focus` · error: `border-width-default` · disabled: `border-width-default` · read-only: `border-width-default` |
| Text field / State | label | default: `color-text-default` · hover: `color-text-default` · focus: `color-text-default` · error: `color-text-default` · disabled: `color-text-disabled` · read-only: `color-text-default` |
| Text field / State | input | default: `color-text-default` · hover: `color-text-default` · focus: `color-text-default` · error: `color-text-default` · disabled: `color-text-disabled` · read-only: `color-text-default` |
| Text field / State | placeholder | default: `color-text-subtlest` · hover: `color-text-subtlest` · focus: `color-text-subtlest` · error: `color-text-subtlest` · disabled: `color-text-disabled` · read-only: `color-text-subtlest` |
| Text field / State | icon | default: `color-icon-subtlest` · hover: `color-icon-subtlest` · focus: `color-icon-default` · error: `color-icon-subtlest` · disabled: `color-icon-disabled` · read-only: `color-icon-subtlest` |
| Text field / State | supporting | default: `color-text-subtlest` · hover: `color-text-subtlest` · focus: `color-text-subtlest` · error: `color-text-role-error` · disabled: `color-text-disabled` · read-only: `color-text-subtlest` |
| Text field / State | counter | default: `color-text-subtlest` · hover: `color-text-subtlest` · focus: `color-text-subtlest` · error: `color-text-role-error` · disabled: `color-text-disabled` · read-only: `color-text-subtlest` |
| Text field / State | required | default: `color-text-role-error` · hover: `color-text-role-error` · focus: `color-text-role-error` · error: `color-text-role-error` · disabled: `color-text-disabled` · read-only: `color-text-role-error` |
| Text field / State | addon-background | default: `color-background-neutral-default` · hover: `color-background-neutral-default` · focus: `color-background-neutral-default` · error: `color-background-neutral-default` · disabled: `color-background-disabled` · read-only: `color-background-neutral-default` |
| Text field / State | addon-text | default: `color-text-subtle` · hover: `color-text-subtle` · focus: `color-text-subtle` · error: `color-text-subtle` · disabled: `color-text-disabled` · read-only: `color-text-subtle` |
| Text field / State | error-icon | default: `color-icon-role-error` · hover: `color-icon-role-error` · focus: `color-icon-role-error` · error: `color-icon-role-error` · disabled: `color-icon-disabled` · read-only: `color-icon-role-error` |

## 5. States and transitions

Same as [Web B4](../../../3-web-components/components/text-field/text-field.md#b4-states-and-transitions) without pointer hover on touch. Durations `BwDuration.sm`, easing `BwEasing.standard`; reduced motion (`MediaQuery.disableAnimationsOf`) makes them instant.

## 6. RTL

Same as [Web B5](../../../3-web-components/components/text-field/text-field.md#b5-rtl). Flutter: `Directionality` from the app; `EdgeInsetsDirectional`, `AlignmentDirectional`, `BorderRadiusDirectional` (resolved with `Directionality.of(context)` where an API needs `BorderRadius`); `prefixText` / `suffixText` and the counter wrapped in `Directionality(textDirection: TextDirection.ltr)` only when their content is intrinsically LTR (URL, digits).

## 7. Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role / name | One text-field semantics node named by `label`: the visible label is `ExcludeSemantics`; the field node gets `label` (+ “required”) through `Semantics` / `TextFormField` decoration semantics. Trailing action, help icon and end button stay **separate** nodes (`Semantics(container: true)`), never merged into the field |
| Hint / error / counter | Through `InputDecoration.helper` / `error` / `counter` so TalkBack and VoiceOver read them with the field; `error-icon` `ExcludeSemantics` |
| Prefix / suffix | Read as part of the field value hint (e.g. “Hourly rate, SAR”) |
| Help icon | `BwIconButton` (`text`, `neutral`) with `helpLabel`; M3 `Tooltip(triggerMode: TooltipTriggerMode.tap, message: helpText)`; stays enabled when the field is disabled |
| Trailing action | `BwIconButton` (`text`, `neutral`) sized to B2 `action-box`; `onPressed: null` when the field is disabled; clear returns focus to the field; password toggle exposes `toggled` with “Show password” / “Hide password” |
| End button | `BwButton` (`outlined`, `neutral`, field size); `onPressed: null` when the field is disabled |
| Focus | **Field exception** (as Web): the outline becomes `border-width-focus` in `color-border-focus` whenever the field has focus (touch or keyboard); error keeps `color-border-error`. Buttons inside use `BwFocusRing` (keyboard only) |
| Disabled / read-only | `enabled: false` removes the field and its controls from focus traversal; `readOnly: true` stays focusable and selectable, clear hidden |
| Target size | B2 touch targets |
| Screen reader output | “Work email, required, text field, Use your work email” · error: “… Enter a valid work email” |

| Key (hardware keyboard) | Action |
|---|---|
| Tab / Shift+Tab | Help icon → field → trailing action → end button |
| Enter | Single line: `onSubmitted` + `textInputAction`; multiline: new line |
| Esc | Closes the help tooltip |

## 8. Examples

```dart
BwTextField(label: 'Work email', keyboardType: TextInputType.emailAddress,
  autofillHints: const [AutofillHints.email], textDirection: TextDirection.ltr,
  leadingIcon: Symbols.mail_rounded, requiredField: true,
  helpText: 'We send shift reminders to this address');

BwTextField(label: 'Password', obscureText: true,
  autofillHints: const [AutofillHints.password]);          // show/hide built in

BwTextField(label: 'Search employees', clearable: true, leadingIcon: Symbols.search_rounded);

BwTextField(label: 'Hourly rate', keyboardType: const TextInputType.numberWithOptions(decimal: true),
  suffixText: 'SAR');

BwTextField(label: 'Request reason', multiline: true, maxRows: 8, maxLength: 400,
  showCounter: true, helperText: 'Explain why you need remote work');

BwTextField(label: 'البريد الإلكتروني للعمل', errorText: 'أدخل بريدًا إلكترونيًا صالحًا للعمل');
```

## 9. How to build it

### Goal

`BwTextField` from `package:biowave_mobile/biowave_mobile.dart` implements B1–B6 from tokens only, in light/dark and en/ar, with the shared field parts later fields reuse, and passes B9.

### Scope

**Depends on (must be `Built` first):** `BwButton` (with `BwControlSize`, `BwFocusRing`, `pumpBw`) and `BwIconButton` in this package. If they are not built, report “blocked — Button / Icon button” in C8 and stop.

**In scope:** B1–B9; private parts `BwFieldLabel` (label, required, help icon), `BwFieldAddon`, `BwFieldAction`, `BwFieldSupporting` (error icon, text, counter) in `lib/src/components/text_field/` for Select, Search field, Phone field and pickers.

**Out of scope:** Select, Search field, Autocomplete, Phone field, Verification code; attached dropdown segments; form-level error summary; input masks and formatters beyond pass-through.

### Approach

- `BwTextField` is a `StatefulWidget` around `TextFormField`; it owns a `TextEditingController` / `FocusNode` only when none is supplied, and disposes only what it owns.
- `bw_text_field_decoration.dart`: a pure function (size, state flags, context) → `InputDecoration` built only from `context.bw.colors`, `context.bw.text`, `BwSize`, `BwSpacing`, `BwRadius`, `BwBorder`. `isDense: false`, `contentPadding` `EdgeInsetsDirectional` from tokens, `constraints: BoxConstraints(minHeight: BwSize.controlHeight{Size})`, `floatingLabelBehavior: FloatingLabelBehavior.never`, no `labelText`.
- Label row above the field (`BwFieldLabel`); `MergeSemantics` is **not** used across the field because it would swallow the inner buttons; name the field with `Semantics(label: …, textField: true)` and `ExcludeSemantics` on the visible label (verify with `matchesSemantics`).
- Trailing action: `BwFieldAction` renders `BwIconButton(variant: text, color: neutral)` constrained to the B2 action box; `suffixIconConstraints` = box + `BwSpacing.xs` end inset; `materialTapTargetSize: padded`.
- Add-ons: `BwFieldAddon` segments in `prefixIcon` / `suffixIcon` with `IntrinsicHeight`, add-on background/text tokens and a divider of `BwBorder.widthDefault` in the current border colour.
- End button: `Row` of `Expanded(field)` + `BwButton`; the field's end corners and the button's start corners square via `BorderRadiusDirectional` resolved for the direction; overlap by `BwBorder.widthDefault` to share one border.
- Error, helper and counter via `InputDecoration.error` / `helper` / `counter` widgets (`BwFieldSupporting`); built-in `counterText` suppressed.
- Mobile: `size` other than `lg` asserts and renders `lg`.
- Icons (D-18): built-in glyphs `Symbols.close_rounded`, `Symbols.visibility_rounded` / `Symbols.visibility_off_rounded`, `Symbols.help_rounded`, `Symbols.error_rounded` from `material_symbols_icons`, `opticalSize` = the B2 icon size. Never `Icons.*`
- Gotchas: M3 `InputDecorator` adds default `contentPadding`, `prefixIconConstraints` (48×48) and `hoverColor` — override all from tokens; `OutlineInputBorder` takes a non-directional `BorderRadius`, resolve the directional one first; `TextFormField` with `maxLength` adds its own counter unless `buildCounter`/`counterText` is suppressed; `visualDensity: VisualDensity.standard`.

### Token gaps

None. `text-field.tokens.json` extends the Web file (same aliases, D-13).

### Files to create / change

```
5-mobile-components/lib/src/components/text_field/bw_text_field.dart               new: BwTextField, BwTextFieldAction, BwTextFieldEndButton
5-mobile-components/lib/src/components/text_field/bw_text_field_decoration.dart    new
5-mobile-components/lib/src/components/text_field/bw_field_label.dart              new (private)
5-mobile-components/lib/src/components/text_field/bw_field_addon.dart              new (private)
5-mobile-components/lib/src/components/text_field/bw_field_action.dart             new (private)
5-mobile-components/lib/src/components/text_field/bw_field_supporting.dart         new (private)
5-mobile-components/lib/biowave_mobile.dart                                                  change: export bw_text_field.dart
5-mobile-components/test/text_field_test.dart                                       new
5-mobile-components/test/goldens/text_field/                                        new (generated goldens)
5-mobile-components/README.md                                                       change: status table row
CHANGELOG.md                                                        change
```

## 10. Tests

- [ ] Renders every allowed size, single line and multiline, in light + dark × en + ar (`pumpBw`)
- [ ] Goldens for Default, Focus, Error, Disabled, Read-only, prefix/suffix, end button, help icon, trailing action
- [ ] Exact field height per size (`tester.getSize`); trailing action box = B2 `action-box`, inset `BwSpacing.xs`, inside the outline
- [ ] Semantics: one text-field node named by `label` (+ required), helper/error/counter read with it; trailing action, help icon and end button are separate nodes with their names (`matchesSemantics`)
- [ ] Disabled: field, trailing action and end button not focusable; help icon still reachable
- [ ] Clear: hidden when empty / read-only / disabled; clears, keeps focus, calls `onChanged('')` and `onCleared`
- [ ] Password toggle flips `obscureText` and the semantics label; caret position kept
- [ ] Help tooltip opens on tap and on keyboard activation, closes with Esc
- [ ] Counter counts grapheme clusters (Arabic, emoji) and matches enforcement
- [ ] Tap on leading icon, prefix or suffix focuses the field
- [ ] `BwLayout.mobile.minTarget` hit areas (`meetsGuideline(androidTapTargetGuideline)`, `iOSTapTargetGuideline`); `textContrastGuideline`; `labeledTapTargetGuideline`
- [ ] Text scale 2.0: no overflow, field grows
- [ ] RTL: layout mirrored, icons not mirrored, LTR content isolated
- [ ] Every invalid combination asserts and uses the B1 fallback
- [ ] No raw colours, sizes or durations in the source (no `Color(0x`, no numeric `EdgeInsets`/`SizedBox` literals, no `BwPalette`)

Implement every item in B9, plus:
- [ ] `bw_text_field_decoration` unit test: resolved border, fill and text colours per `WidgetState` set equal the B3 tokens
- [ ] Owned controller/focus node disposed; supplied ones never disposed

## 11. Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 (names, types, defaults, asserts, fallbacks)
- [ ] AC-2 Every value in B2–B3 from the listed token; no raw values, no `BwPalette`
- [ ] AC-3 B4 transitions; reduced motion respected
- [ ] AC-4 RTL as B5; semantics, focus and targets as B6
- [ ] AC-5 `cd 5-mobile-components && flutter analyze && flutter test` pass; `npm run sync` and `npm run docs:check` pass
- [ ] AC-6 Exported from `lib/biowave_mobile.dart`; `5-mobile-components/README.md` row = header, `Built`
- [ ] AC-7 Trailing action inside the outline at every size; disabled with the field; neutral icons in error (Web AD-1 … AD-6 do not occur)
- [ ] AC-8 Reuses `BwButton`, `BwIconButton`, `BwFocusRing`, `BwControlSize`; private field parts not exported

## 12. Rules

1. Never edit generated files (`*/generated/*`, `2-foundations/dist/`, `2-foundations/preview/`, `_sync/*.json`, any `*-contract.md`).
2. No raw values: no hex, px, ms or font names — only the tokens in §4. A missing value means stop and ask; tokens are added by the Planner.
3. Never use primitives (`primitive.*`, `BwPalette`).
4. RTL first: logical properties only (`EdgeInsetsDirectional`, `AlignmentDirectional`, `BorderRadiusDirectional`); mirror only directional icons (§6).
5. Light + dark and en + ar, always — and tested.
6. WCAG 2.2 AA: keyboard, visible focus (`color-border-focus`, 2px, 2px offset), labels, targets ≥ `target-min` (48dp), reduced motion.
7. Stay inside this contract; one component per task; do not refactor unrelated files.

## 13. Commands that must pass

```bash
cd 5-mobile-components && flutter analyze && flutter test
npm run component-tokens
npm run sync        # must end with READY
npm run docs:check
```

## 14. When you finish

1. Fill [C8 Execution log](text-field.md#c8-execution-log-filled-by-the-executor) in `text-field.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `text-field.md` and in the Components table of `5-mobile-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).

# Text field · حقل نص — Mobile

> **One file for Text field on Mobile:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- mobile text-field`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Text field · حقل نص |
| Summary | Lets a user enter or edit a short value or a longer passage of text. |
| Summary (ar) | يتيح للمستخدم إدخال قيمة قصيرة أو نص أطول وتعديلهما. |
| Parts | Field · label · required indicator · help icon · prefix · leading icon · input · trailing action · trailing icon · suffix · end button · error icon · supporting text · counter |
| Parts (ar) | الحقل · التسمية · علامة الإلزام · أيقونة المساعدة · البادئة · أيقونة البداية · الإدخال · إجراء النهاية · أيقونة النهاية · اللاحقة · زر النهاية · أيقونة الخطأ · النص المساعد · العداد |
| Platform | Mobile · Flutter + Material 3 |
| Built on | M3 `TextFormField` with an outlined `InputDecoration` built only from Biowave tokens; static label above the field (never `labelText` / floating label) |
| Import | `BwTextField` from `package:biowave_mobile/biowave_mobile.dart` |
| Figma | **Biowave DS — Mobile Components** › `↳ Text field` (page Typography mode `Mobile`) · build: [Part D](#d--figma-build) |
| Version | 1.1 · 2026-10-18 (first Mobile version; same guidelines version as Web 1.1) |
| Plan | Finished |
| Code | Built |
| Figma build | Planned |
| Review | — |
| Source code | [`lib/src/components/text_field/`](../../lib/src/components/text_field/) |
| Tokens | [`text-field.tokens.json`](text-field.tokens.json) — extends the Web file (D-13) |
| Contracts | [`text-field-contract.md`](text-field-contract.md) · [`figma-text-field-contract.md`](figma-text-field-contract.md) — generated, never edited |
| Docs page | [`text-field.html`](text-field.html) |

## Contents

[A · Guidelines](#a--guidelines) · [B · Spec](#b--spec) · [C · Code plan](#c--code-plan) · [D · Figma build](#d--figma-build) · [E · Review](#e--review) · [F · Changelog](#f--changelog)

---

## A · Guidelines

> What it is and when to use it — designers and PMs. This guidance is shared by Web, Tablet and Mobile except A8.

### A1 Overview

A text field lets a user enter or edit text. It uses a static label above an outlined field so the purpose stays visible after entry and remains clear with long Arabic labels. The same component covers single-line input and multiline text area; choosing `multiline` changes the field anatomy without changing the form model.

### A2 Anatomy
```
② Work email ③*  ④(?)
①┌─────────┬────────────────────────────────────────┬─────────┐
 │ ⑤http://│ ⑥[◆]  ⑦name@company.com      ⑧[×]  │⑪[Copy] │
 └─────────┴────────────────────────────────────────┴─────────┘
 ⑫[!] ⑬Enter a valid work email                      ⑭(16 / 80)

Suffix instead of an attached button:
 ┌────────────────────────────────────────┬──────┐
 │ 1200                                   │⑩ SAR │
 └────────────────────────────────────────┴──────┘

Multiline:
② Notes
①┌──────────────────────────────────────────────┐
 │ ⑦Add context for the request…            ⑧[×]│
 │                                              │
 └──────────────────────────────────────────────┘
                                         ⑭(0 / 400)
```

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

### A3 Usage

**When to use**
- For a person, email, identifier, title or other free-form text value
- For passwords, numbers or other native input types when the browser behavior is useful
- With `multiline` for notes, reasons, descriptions and other passages of text

**When not to use** (and what to use instead)

| Situation | Use instead |
|---|---|
| Choosing one value from a known list | Select |
| Searching and suggesting known records | Autocomplete |
| Entering a country code and phone number | Phone field |
| Entering a four- or six-digit one-time code | Verification code |
| Starting a search that has search-specific behavior | Search field |

### A4 Options
#### 4.1 `size`

| Value | Pick it when |
|---|---|
| `sm` | A dense web table, filter bar or compact form |
| `md` | Default on web forms and dialogs |
| `lg` | A prominent web form or the default touch size on tablet and mobile |

Fields in the same form row use the same size.

#### 4.2 `multiline`

| Value | Looks like | Pick it when |
|---|---|---|
| off | One line | The expected answer is a short value |
| on | Text area with at least three visible lines | The answer may be a sentence or paragraph |

#### 4.3 Label, required indicator and help icon

The label is visible by default. It may be visually hidden only when an adjacent heading names the value unambiguously and the label remains available to assistive technology. `required` adds an indicator and native required semantics; forms also explain the indicator once near the start.

Add a `help-icon` only when a short explanation (one or two sentences) prevents a mistake and does not fit as supporting text. Supporting text is always preferred for information everyone needs. The help icon sits after the label, never inside the field.

#### 4.4 Leading icon, trailing icon and trailing action

| Option | Pick it when |
|---|---|
| `leading-icon` | The icon clarifies the value type (mail, person, search). Decorative |
| `trailing-icon` | A decorative cue at the end, e.g. a lock on a locked value. Not interactive |
| `trailing-action` · clear | Users often replace the whole value (search, filters) |
| `trailing-action` · show/hide password | Always on for `type=password`, unless turned off |
| `trailing-action` · custom | One other action that acts on this value only, e.g. Scan, Generate. Needs its own name |

The field sizes the trailing action itself and disables it with the field. Never pass a free button into the field.

#### 4.5 Supporting text, error icon and counter

Supporting text gives a stable hint until an error replaces it. When `error` is on, an error icon appears before the message so the error is not shown by colour alone. A counter is useful only when the limit matters to the user. It shows the current count and limit and is announced with the supporting text, not on every keystroke as a live region.

#### 4.6 Prefix and suffix

Attached add-on segments with a divider, for fixed text the user does not type: a protocol (`http://`), a currency (`SAR`, `ر.س`), a unit (`kg`, `%`, `hrs`). Keep them to one short word or symbol. They are part of the field: one border, one focus indicator.

#### 4.7 End button

An attached Button segment after the field for one action on the whole value, e.g. Copy a link or Generate a code. It shares the field's end edge. Use it only when the action is the main reason the field exists; otherwise put a normal Button next to the field.

**Combination rules**
- `rows`, `minRows` and `maxRows` apply only when `multiline` is on
- `prefix`, `suffix` and `end-button` are single-line only
- One control at the field's end: `suffix` or `end-button`, not both
- One `trailing-action` at a time; `trailing-icon` and `trailing-action` are not used together
- A counter requires `maxLength`; otherwise omit it
- `disabled` overrides `readOnly`; disabled fields are unavailable, read-only fields remain focusable and selectable
- Clear is hidden when the field is empty, disabled or read-only
- Error text uses `supporting-text`; never show a hint and an error as two competing lines
- In a multiline field the trailing action aligns to the first text line

### A5 States and behavior
| State | When it happens | What the user sees |
|---|---|---|
| Default | Ready, empty or filled | Base surface, default border and normal text |
| Hover | Pointer over the field (web only) | Stronger input border |
| Focus | Native input has keyboard or pointer focus | Focus border with no exterior offset; this is the documented field exception in the accessibility guideline |
| Error | Validation failed | Error border, error icon and error text; the message explains how to fix the value. Leading and trailing icons keep their normal colour |
| Disabled | Value cannot currently be changed or selected | Disabled surface, border, text, icons, add-ons, trailing action and end button; all removed from the tab order. The help icon stays available |
| Read-only | Value may be read, copied or submitted but not changed | Subtle surface and a lighter border; focusable and selectable; clear is hidden; other actions (copy, show password) still work |
| Filled | A value exists | Value replaces the placeholder; state otherwise stays unchanged |

**Behavior rules**
- Clicking anywhere on the field that is not an interactive control (padding, icons, add-ons) focuses the input
- Labels, helper messages and values wrap naturally where their role allows; single-line input values scroll horizontally rather than wrap
- Multiline input grows between its row bounds; manual vertical resize is allowed on web
- Long Arabic labels and messages wrap without clipping; do not give a field a fixed width sized only for English
- Preserve the user's value through focus, error and theme changes
- Validation normally runs on blur or submit, not on every keystroke; clear an error only when the value is valid
- Clear empties the value, keeps focus in the input and fires the change callback
- The character limit prevents further native entry when reached; never silently truncate an existing controlled value

### A6 Content

General rules: [content.md](../../../2-foundations/guidelines/content.md). Text-field-specific rules:

| Element | Rule | Max length |
|---|---|---|
| `label` | Noun phrase naming the value, not an instruction | 4 words |
| `placeholder` | Example or format only; do not repeat the label | 5 words |
| `supporting-text` hint | Explain format, privacy or consequence | 1 short sentence |
| `supporting-text` error | Say what is wrong and how to fix it | 1 short sentence |
| `trailing-action` name | Verb-first description such as “Clear email” | 3 words |

| ✓ EN | ✓ AR | ✗ Avoid |
|---|---|---|
| Work email · name@company.com | البريد الإلكتروني للعمل · name@company.com | Email · Enter email |
| Password · Use at least 12 characters | كلمة المرور · استخدم 12 حرفًا على الأقل | Password · Invalid |
| Request reason · Explain why you need remote work | سبب الطلب · اشرح سبب حاجتك إلى العمل عن بُعد | Details · Type here… |
| Enter a valid work email | أدخل بريدًا إلكترونيًا صالحًا للعمل | Wrong value |

### A7 Do and don't

| ✓ Do | ✗ Don't |
|---|---|
| Keep a persistent label above every field | Use placeholder text as the only label |
| Put a specific correction beside the field | Show “Invalid” without telling the user what to change |
| Use multiline for sentences and paragraphs | Force a long answer into a single scrolling line |
| Keep supporting text stable to avoid layout surprise | Add and remove unrelated help while the user types |
| Mark required fields consistently and explain the mark once | Mark some required fields with color alone |

### A8 Platform notes — Mobile

```
Mobile form
┌─────────────────────────┐
│ Work email          (?) │
│ ┌─────────────────────┐ │
│ │ name@company.com  ×│ │
│ └─────────────────────┘ │
│ Password                │
│ ┌─────────────────────┐ │
│ │ ••••••••••        👁│ │
│ └─────────────────────┘ │
│ [■■■■■ Sign in ■■■■■■■] │  ← keyboard: Next … Done; field scrolls above the keyboard
└─────────────────────────┘
```

| | Mobile |
|---|---|
| Available | ✓ |
| Default size | `lg` |
| Sizes | `lg` only — every field is at least the 48 touch target; `sm`/`md` fall back to `lg` |
| Layout | Always full width, one field per row; long forms in a scroll view with the main action pinned at the bottom |
| Interaction | Touch only |
| Keyboard | The on-screen keyboard matches the value (email, number, phone, password); its action key is Next inside a form and Done on the last field |
| Multiline | Grows from `minRows` to `maxRows`, then scrolls inside the field; no resize handle |
| Touch target | Field ≥ 48; trailing action, help icon and end button each ≥ 48 hit area |
| Not supported | Hover visuals in Figma, manual resize (`resize`) |

### A9 Accessibility (design)
- Every field has a persistent visible label, or a label that is visually hidden only when the surrounding context is unambiguous
- The label activates and focuses the native input; required and invalid state are exposed to assistive technology
- Supporting and error text is programmatically linked to the input and remains readable at 200% zoom
- Error is communicated by message, icon and semantics, never colour alone
- Focus uses the documented field exception: the input border becomes `border-width-focus` in `color-border-focus` with no exterior offset. Help icon, trailing action and end button keep the normal 2px ring
- Leading icons, trailing icons, prefix and suffix are read with the field's description, not as separate stops
- The help icon, trailing action and end button are each one keyboard stop with a name that says what they do (“More information about Work email”, “Clear Work email”, “Show password”, “Copy invite link”)
- Disabled is used only when interaction is impossible; use read-only when the value must remain discoverable and copyable

### A10 Related components

- Select — chooses one known option while reusing label and supporting-text anatomy
- Verification code — enters a fixed number of digits in separate cells
- Search field — adds search and clear behavior to this field foundation
- Autocomplete — suggests known values and may produce tags
- Phone field — composes a country Select and a phone-number text field

---

## B · Spec

> The contract for Mobile — API, dimensions, tokens, states, RTL and accessibility. Code and Figma are reviewed against this part. Facts that are identical on every platform link to the [Web spec](../../../3-web-components/components/text-field/text-field.md#b--spec) instead of being copied.

### B1 API

#### `BwTextField`

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

### B2 Dimensions

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

Flutter access: `size-control-height-lg` → `BwSize.controlHeightLg` · `spacing-control-padding-inline-lg` → `BwSpacing.controlPaddingInlineLg` · `spacing-xs` → `BwSpacing.xs` · `radius-md` → `BwRadius.md` · `border-width-focus` → `BwBorder.widthFocus` · `body-lg` → `context.bw.text.bodyLg` · colours → `context.bw.colors.<camelCase>` (e.g. `borderInputDefault`) · `target-min` → `BwLayout.mobile.minTarget`.

### B3 Tokens by part and state

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

### B4 States and transitions

Same as [Web B4](../../../3-web-components/components/text-field/text-field.md#b4-states-and-transitions) without pointer hover on touch. Durations `BwDuration.sm`, easing `BwEasing.standard`; reduced motion (`MediaQuery.disableAnimationsOf`) makes them instant.

### B5 RTL

Same as [Web B5](../../../3-web-components/components/text-field/text-field.md#b5-rtl). Flutter: `Directionality` from the app; `EdgeInsetsDirectional`, `AlignmentDirectional`, `BorderRadiusDirectional` (resolved with `Directionality.of(context)` where an API needs `BorderRadius`); `prefixText` / `suffixText` and the counter wrapped in `Directionality(textDirection: TextDirection.ltr)` only when their content is intrinsically LTR (URL, digits).

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role / name | One text-field semantics node named by `label`: the visible label is `ExcludeSemantics`; the field node gets `label` (+ “required”) through `Semantics` / `TextFormField` decoration semantics. Trailing action, help icon and end button stay **separate** nodes (`Semantics(container: true)`), never merged into the field |
| Hint / error / counter | Through `InputDecoration.helper` / `error` / `counter` so TalkBack and VoiceOver read them with the field; `error-icon` `ExcludeSemantics` |
| Prefix / suffix | Read as part of the field value hint (e.g. “Hourly rate, SAR”) |
| Help icon | `BwIconButton` (`text`, `neutral`) with `helpLabel`; M3 `Tooltip(triggerMode: TooltipTriggerMode.tap, message: helpText)`; stays enabled when the field is disabled |
| Trailing action | `BwIconButton` (`text`, `neutral`) sized to B2 `action-box`; `onPressed: null` when the field is disabled; clear returns focus to the field; password toggle exposes `toggled` with “Show password” / “Hide password” |
| End button | `BwButton` (`outlined`, `neutral`, field size); `onPressed: null` when the field is disabled |
| Focus | **Field exception** (as Web): the outline becomes `border-width-focus` in `color-border-focus` whenever the field has focus (touch or keyboard); error keeps `color-border-input-error`. Buttons inside use `BwFocusRing` (keyboard only) |
| Disabled / read-only | `enabled: false` removes the field and its controls from focus traversal; `readOnly: true` stays focusable and selectable, clear hidden |
| Target size | B2 touch targets |
| Screen reader output | “Work email, required, text field, Use your work email” · error: “… Enter a valid work email” |

| Key (hardware keyboard) | Action |
|---|---|
| Tab / Shift+Tab | Help icon → field → trailing action → end button |
| Enter | Single line: `onSubmitted` + `textInputAction`; multiline: new line |
| Esc | Closes the help tooltip |

### B7 Examples

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

### B8 Figma

Structure, properties, the Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

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

---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `text-field-contract.md`.

| Field | Value |
|---|---|
| Component | Text field |
| Platform | Mobile (Flutter + M3) |
| Plan version | 1.1 · 2026-10-18 |

### C1 Goal

`BwTextField` from `package:biowave_mobile/biowave_mobile.dart` implements B1–B6 from tokens only, in light/dark and en/ar, with the shared field parts later fields reuse, and passes B9.

### C2 Scope

**Depends on (must be `Built` first):** `BwButton` (with `BwControlSize`, `BwFocusRing`, `pumpBw`) and `BwIconButton` in this package. If they are not built, report “blocked — Button / Icon button” in C8 and stop.

**In scope:** B1–B9; private parts `BwFieldLabel` (label, required, help icon), `BwFieldAddon`, `BwFieldAction`, `BwFieldSupporting` (error icon, text, counter) in `lib/src/components/text_field/` for Select, Search field, Phone field and pickers.

**Out of scope:** Select, Search field, Autocomplete, Phone field, Verification code; attached dropdown segments; form-level error summary; input masks and formatters beyond pass-through.

### C3 Approach

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

### C4 Token gaps

None. `text-field.tokens.json` extends the Web file (same aliases, D-13).

### C5 Files to create / change

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

### C6 Tests

Implement every item in B9, plus:
- [ ] `bw_text_field_decoration` unit test: resolved border, fill and text colours per `WidgetState` set equal the B3 tokens
- [ ] Owned controller/focus node disposed; supplied ones never disposed

### C7 Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 (names, types, defaults, asserts, fallbacks)
- [ ] AC-2 Every value in B2–B3 from the listed token; no raw values, no `BwPalette`
- [ ] AC-3 B4 transitions; reduced motion respected
- [ ] AC-4 RTL as B5; semantics, focus and targets as B6
- [ ] AC-5 `cd 5-mobile-components && flutter analyze && flutter test` pass; `npm run sync` and `npm run docs:check` pass
- [ ] AC-6 Exported from `lib/biowave_mobile.dart`; `5-mobile-components/README.md` row = header, `Built`
- [ ] AC-7 Trailing action inside the outline at every size; disabled with the field; neutral icons in error (Web AD-1 … AD-6 do not occur)
- [ ] AC-8 Reuses `BwButton`, `BwIconButton`, `BwFocusRing`, `BwControlSize`; private field parts not exported

---

### C8 Execution log (filled by the Executor)

| Field | Value |
|---|---|
| Agent | Antigravity (continuing Codex step 01) |
| Date | 2026-10-24 |
| Files changed | `lib/src/components/text_field/bw_text_field.dart`; `lib/src/components/text_field/bw_text_field_decoration.dart`; `lib/src/components/text_field/bw_field_label.dart`; `lib/src/components/text_field/bw_field_addon.dart`; `lib/src/components/text_field/bw_field_action.dart`; `lib/src/components/text_field/bw_field_supporting.dart`; `lib/biowave_mobile.dart`; `test/text_field_test.dart`; `test/goldens/text_field/text-field-{light,dark}-{en,ar}.png`; `README.md`; `components/text-field/text-field.md`; `CHANGELOG.md` |
| Checks | `cd 5-mobile-components && flutter analyze && flutter test` ✓ (148 tests); `npm run component-tokens` ✓; `npm run sync` ✓ (READY); `npm run docs:check` ✓ |

**Deviations from the plan or spec**
- none

**Questions for the Planner**
- none

---

## D · Figma build

> How to build Part B in Figma. The Figma Agent receives this through the generated `figma-text-field-contract.md`.
> **One file per platform (D-12).** This file builds the Mobile sets in **Biowave DS — Mobile Components**. Structure, layer tree and properties are the same as [Web D2–D4](../../../3-web-components/components/text-field/text-field.md#d--figma-build) (one fact, one home); this file lists only what differs. Values come from the Mobile [Part B](#b--spec).

| Field | Value |
|---|---|
| Component | Text field |
| Platform | Mobile |
| Figma file | **Biowave DS — Mobile Components** (`_sync/figma-files.json` › `mobile`) — never the Foundations file |
| Page / section | `↳ Text field` › sections `Text field` and `Text field — Documentation` |
| Mode | **Create new.** Legacy reference (read only): Foundations › Mobile `↳ Inputs` (3991:1584) and `↳ Text Area` (4131:10187) — see `_audits/input-family.md` |
| Plan version | 1.1 · 2026-10-18 |

### D1 Rules for this build

Same as [Web D1](../../../3-web-components/components/text-field/text-field.md#d1-rules-for-this-build) (component tokens only, everything bound, library instances), plus:
- **Typography mode:** on page `↳ Text field` set the explicit variable mode **`Mobile`** for `5. Typography (EN)` and `6. Typography (AR)`.
- Component tokens: `Text field / Size` and `Text field / State` synced to this file from [`text-field.tokens.json`](text-field.tokens.json).
- Nested instances: Mobile `Button` (end button) and `Icon button` (help icon, trailing action) from this file once they are built; until then report Phase 1 as “blocked — Button / Icon button” for those slots and build the rest.

### D2 Component structure

As [Web D2](../../../3-web-components/components/text-field/text-field.md#d2-component-structure): `Text field` and `Text area` sets plus private `.Field/Label`, `.Field/Container`, `.Field/Add-on`, `.Field/Action`, `.Field/Supporting text`. Mobile differences:
- `Size` = `LG` (default `LG`)
- `State` = `Default` · `Focus` · `Disabled` · `Read-only` (no `Hover`)
- `Text area`: no `Resize handle` property

### D3 Layer tree and auto layout

As [Web D3](../../../3-web-components/components/text-field/text-field.md#d3-layer-tree-and-auto-layout) with the D2 differences; every interactive slot (`help-icon`, `trailing-action`, `end-button`) shows its 48 hit area only on doc page 09.

### D4 Properties

As [Web D4](../../../3-web-components/components/text-field/text-field.md#d4-properties) without `Resize handle`. Code mapping uses the Flutter names from B1 (`errorText`, `requiredField`, `leadingIcon`, `prefixText`, `obscureText`, `enabled: false`).

### D5 Variants to generate

- Axes: `Type × Size × State × Filled × Error × Language`
- Exclude `State=Disabled × Error=True`
- Count: 2 types × 1 size(s) × 2 filled × 2 languages × 7 valid State/Error pairs = **56 variants**

### D6 States, interactions and motion

As Web D6 without hover. Focus on tap: smart animate per B4.

### D7 RTL

As [Web D7](../../../3-web-components/components/text-field/text-field.md#d7-rtl) (`Language=AR` variants).

### D8 Documentation pages

All 12 standard pages in section `Text field — Documentation`, built only from the Doc Kit (Annotation library, D-17). 07 Platform: `Doc/Device frame` = Mobile portrait, with the on-screen keyboard and Next/Done flow. 09 Accessibility: 48 target overlays on help icon, trailing action and end button.

Component description: “Enters or edits short and multiline text with persistent labels and accessible validation. Spec: 5-mobile-components/components/text-field/text-field.md”.

### D9 Code Connect

`5-mobile-components/lib/src/components/text_field/bw_text_field.figma.dart` — mapping per D4 with the Flutter names. Publish after code and Figma reviews are both `Approved`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Sets and private bases on `↳ Text field` in the Mobile file; structure and layer names as Web D2–D3 + D2 differences
- [ ] F-AC-2 Properties as Web D4 minus `Resize handle`; variant count 56
- [ ] F-AC-3 Zero raw values; only this component's token collections as local variables; token lint 0
- [ ] F-AC-4 Page Typography mode = `Mobile`; Light/Dark by mode only; Arabic fits without truncation
- [ ] F-AC-5 Values match the Mobile B2–B3 (redline per size, incl. action box inset)
- [ ] F-AC-6 Docs built from the Doc Kit; Components List card added; Code Connect per D9 after approval

---

### D11 Execution log (filled by the Figma Agent)

| Field | Value |
|---|---|
| Agent / stages run | build · rtl · qa · document |
| Date | |
| Node IDs | |
| QA report | |

**Deviations**
- none

**Questions for the Planner**
- none

---

## E · Review

### E1 Summary

| Round | Date | Code verdict | Figma verdict |
|---|---|---|---|
| — | — | not reviewed | not reviewed |

---

## F · Changelog

### F0 Changes from previous version

First Mobile version (1.1). Differences from Web 1.1 are listed in A8 and B1 (Flutter naming).

### F1 Guidelines changelog

| Version | Date | Change | Migration | Author |
|---|---|---|---|---|
| 1.1 | 2026-10-18 | Guidelines copied from Web 1.1 (legacy properties, managed trailing action); A8 for Mobile | — | Claude (Planner) |

### F2 Spec changelog

| Version | Date | Change | Breaking | Migration |
|---|---|---|---|---|
| 1.1 | 2026-10-18 | Initial Mobile spec (Flutter `BwTextField`), aligned with Web 1.1 | No | — |

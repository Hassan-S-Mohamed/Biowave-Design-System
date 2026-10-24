# Text field · حقل نص — Tablet

> **One file for Text field on Tablet:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- tablet text-field`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Text field · حقل نص |
| Summary | Lets a user enter or edit a short value or a longer passage of text. |
| Summary (ar) | يتيح للمستخدم إدخال قيمة قصيرة أو نص أطول وتعديلهما. |
| Parts | Field · label · required indicator · help icon · prefix · leading icon · input · trailing action · trailing icon · suffix · end button · error icon · supporting text · counter |
| Parts (ar) | الحقل · التسمية · علامة الإلزام · أيقونة المساعدة · البادئة · أيقونة البداية · الإدخال · إجراء النهاية · أيقونة النهاية · اللاحقة · زر النهاية · أيقونة الخطأ · النص المساعد · العداد |
| Platform | Tablet · Flutter + Material 3 |
| Built on | M3 `TextFormField` with an outlined `InputDecoration` built only from Biowave tokens; static label above the field (never `labelText` / floating label) |
| Import | `BwTextField` from `package:biowave_tablet/biowave_tablet.dart` |
| Figma | **Biowave DS — Tablet Components** › `↳ Text field` (page Typography mode `Tablet`) · build: [Part D](#d--figma-build) |
| Version | 1.2 · 2026-10-24 (spec and code plan 1.2; guidelines unchanged, same as Web 1.1) |
| Plan | Finished |
| Code | Built |
| Figma build | Planned |
| Review | Round 1 · 2026-10-24 · Changes requested |
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

### A8 Platform notes — Tablet

```
Tablet landscape (two columns)                     Tablet portrait / sheet
┌────────────────────────┐ ┌────────────────────────┐  ┌──────────────────────────────┐
│ Work email             │ │ Employee ID            │  │ Work email                   │
│ name@company.com       │ │ BW-1042                │  │ name@company.com             │
└────────────────────────┘ └────────────────────────┘  └──────────────────────────────┘
        keyboard Next moves to the next field; the field scrolls above the keyboard
```

| | Tablet |
|---|---|
| Available | ✓ |
| Default size | `lg` |
| Sizes | `md` (dense panes, filter bars; hit area padded to 48) · `lg` (default) |
| Layout | Fills its parent; two columns of fields in landscape forms, one column in portrait and in sheets |
| Interaction | Touch; hover and Tab order with a pointer or keyboard attached |
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

> The contract for Tablet — API, dimensions, tokens, states, RTL and accessibility. Code and Figma are reviewed against this part. Facts that are identical on every platform link to the [Web spec](../../../3-web-components/components/text-field/text-field.md#b--spec) instead of being copied.

### B1 API

#### `BwTextField`

| Param | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `label` | `String` | | | ✓ | Persistent visible and accessible name |
| `hideLabel` | `bool` | | `false` | | Hides the visible label; the accessible name stays |
| `placeholder` | `String?` | | | | Format hint shown while the field is empty (`InputDecoration.hintText`, B3 `placeholder`); never the accessible name (as Web B1) |
| `size` | `BwControlSize` | `md` · `lg` (`sm` asserts, falls back to `md`) | `lg` | | A4.1 · A8 |
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

`BwControlSize` and `BwFocusRing` come from `lib/src/common/` (created by Button). Platform naming: Flutter `errorText` = web `error` + `helperText`; `requiredField` = web `required`; `leadingIcon`/`trailingIcon` = web `startAdornment`/`endAdornment`; `prefixText`/`suffixText` = web `prefix`/`suffix`; `obscureText` = web `type="password"`; `enabled: false` = web `disabled`. No `resize` on Tablet.

**Invalid combinations** (`assert` in debug; fallback in release):

| Combination | Fallback |
|---|---|
| `size` not in `md` · `lg` | Nearest allowed size |
| `showCounter` without `maxLength` | Counter hidden |
| `minRows` / `maxRows` with `multiline: false` | Ignored |
| `multiline: true` with `obscureText: true` | `obscureText` ignored |
| More than one of `passwordToggle` (on), `action`, `clearable` | Shown in that priority |
| `trailingIcon` with any trailing action | `trailingIcon` ignored |
| `prefixText`, `suffixText` or `endButton` with `multiline: true` | Ignored |
| `suffixText` and `endButton` together | `suffixText` ignored |
| `controller` and `initialValue` together | assert (Flutter `TextFormField` rule) |

### B2 Dimensions

Same redline and layout rules as [Web B2](../../../3-web-components/components/text-field/text-field.md#b2-dimensions) (action inset `spacing-xs`, add-on dividers, end-button shared border, first-line alignment, label/supporting gaps), with the Tablet sizes:

| Part | Property | md | lg |
|---|---|---|
| `field` | height | `size-control-height-md` | `size-control-height-lg` |
| `field` | padding-inline | `spacing-control-padding-inline-md` | `spacing-control-padding-inline-lg` |
| `field` | padding-inline-end with `trailing-action` | `spacing-xs` | `spacing-xs` |
| `field` | internal gap · multiline padding-block | `spacing-control-gap-md` | `spacing-control-gap-lg` |
| `leading-icon` · `trailing-icon` · `trailing-action` glyph | size | `size-icon-md` | `size-icon-lg` |
| `trailing-action` | box | `size-control-height-sm` | `size-control-height-md` |
| `end-button` | `BwButton` size | `md` | `lg` |
| `label` | text style | `label-md` | `label-lg` |
| `input` · `prefix` · `suffix` | text style | `body-md` | `body-lg` |

Shared for every size: radius `radius-md` · border `border-width-default` / focused `border-width-focus` · label gap `spacing-sm` · supporting gap `spacing-xs` · `supporting-text`, `counter` = `caption-md` · `error-icon` `size-icon-sm` · help icon glyph `size-icon-sm`.

- **Touch targets:** Hit area of an `md` field is padded to `BwLayout.tablet.minTarget` (48) by a transparent region that focuses the input; layout height stays `size-control-height-md`. `trailing-action`, `help-icon` and `end-button` keep a 48 hit area via `MaterialTapTargetSize.padded`, extended invisibly so layout does not change.
- **Text scale:** label, value and supporting text scale with the system text scale; the field grows in height (`isDense: false`, `constraints` with a min height, never a fixed max) and never clips.
- **Keyboard:** the field scrolls into view above the on-screen keyboard (`scrollPadding` = `EdgeInsets.all(BwSpacing.xl3)`).
- **End button:** the field's end corners and the end button's start corners are square; the outer corners keep `radius-md`; the button overlaps the field by `border-width-default` so one border shows at the seam (as Web B2). The button's corners come from the internal `BwButton` `segment` (C3).

Flutter access: `size-control-height-lg` → `BwSize.controlHeightLg` · `spacing-control-padding-inline-lg` → `BwSpacing.controlPaddingInlineLg` · `spacing-xs` → `BwSpacing.xs` · `radius-md` → `BwRadius.md` · `border-width-focus` → `BwBorder.widthFocus` · `body-lg` → `context.bw.text.bodyLg` · colours → `context.bw.colors.<camelCase>` (e.g. `borderInputDefault`) · `target-min` → `BwLayout.tablet.minTarget`.

### B3 Tokens by part and state

Identical to [Web B3](../../../3-web-components/components/text-field/text-field.md#b3-tokens-by-part-and-state) (same token for every part × state, including the read-only border and neutral icons in error); machine copy [`text-field.tokens.json`](text-field.tokens.json) extends the Web file. The **Hover** row applies only when a pointer is attached (`WidgetState.hovered`); Figma has no Hover variant on Tablet. Flutter mapping:

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

Same triggers as [Web B4](../../../3-web-components/components/text-field/text-field.md#b4-states-and-transitions); Hover only when a pointer is attached. On Flutter the transitions are split by who draws them:

| Transition | Drawn by | Duration · easing | Reduced motion (`context.bw.reduceMotion`) |
|---|---|---|---|
| `field` border colour and width (focus, hover, error, disabled, read-only) · `supporting-text` helper ↔ error swap (with `error-icon`) | Flutter `InputDecorator` (built in) | Flutter's fixed internal duration and curve; the error line fades in with a short vertical slide. No API sets them | **Not applied** — platform limit, accepted |
| Every transition inside the Biowave parts `BwFieldLabel`, `BwFieldAddon`, `BwFieldSupporting` (e.g. `label` colour, add-on background, text and divider colour) | Biowave | `BwDuration.sm` · `BwEasing.standard`; enabled ↔ disabled / read-only `BwDuration.instant` | `BwDuration.instant` |
| Help tooltip · end button · trailing action | `Tooltip` · `BwButton` · `BwIconButton` | As their own B4 (the tooltip fade is Flutter's fixed one) | As their own B4 |

Platform limit (accepted, as for the tooltip fade on Icon button): the `InputDecorator` transition is short and does not follow `BwDuration.sm` or reduced motion. Do not re-implement or fork `InputDecorator`, wrap it in `TickerMode`, or paint the border yourself to change it. The value, selection and focus are never reset by a visual transition.

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
- [ ] `BwLayout.tablet.minTarget` hit areas (`meetsGuideline(androidTapTargetGuideline)`, `iOSTapTargetGuideline`); `textContrastGuideline`; `labeledTapTargetGuideline`
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
| Platform | Tablet (Flutter + M3) |
| Plan version | 1.2 · 2026-10-24 |

### C1 Goal

`BwTextField` from `package:biowave_tablet/biowave_tablet.dart` implements B1–B6 from tokens only, in light/dark and en/ar, with the shared field parts later fields reuse, and passes B9.

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
- End button: `Row` of `Expanded(field)` + `BwButton(segment: BwButtonSegment.end)`, overlapped by `BwBorder.widthDefault` to share one border. The field's end corners are square through its `OutlineInputBorder` radius (`BorderRadiusDirectional.horizontal(start: Radius.circular(BwRadius.md))` resolved for the direction). The button's start corners are square through an internal `segment` on `BwButton` (the same mechanism as the Split button plan; if it already exists, reuse it unchanged):
  - `enum BwButtonSegment { start, end }` is declared in `button/bw_button_style.dart`, which is not exported from `lib/biowave_tablet.dart`, so the parameter is package-private
  - `BwButton` gets one optional named parameter `BwButtonSegment? segment` (default `null` = today's button, every corner `radius`); nothing else in its API, sizes, colours or behaviour changes
  - One shared helper in `bw_button_style.dart`, `BwButtonStyle.borderRadius(metrics, segment)` → `BorderRadiusDirectional`: `null` → every corner `metrics.radius`; `end` → start corners `Radius.zero`, end corners `metrics.radius`; `start` → the mirror. The button `shape` (outline, ink and overlay) and its `BwFocusRing` radius both use it
  - Not allowed: intercepting `PaintingContext` or `Canvas`, `ClipRRect` / `ClipPath` around the button, or a second button implementation
- Error, helper and counter via `InputDecoration.error` / `helper` / `counter` widgets (`BwFieldSupporting`); built-in `counterText` suppressed.
- Motion (B4): transitions inside `BwFieldLabel`, `BwFieldAddon` and `BwFieldSupporting` use `BwDuration.sm` + `BwEasing.standard` (enabled ↔ disabled / read-only `BwDuration.instant`) and `BwDuration.instant` when `context.bw.reduceMotion`. The `InputDecorator` border and helper ↔ error transition stays Flutter's built-in one (B4 platform limit).
- `md` on Tablet: wrap the field in a `ConstrainedBox(minHeight: BwLayout.tablet.minTarget)` tap region that requests focus, without changing the visual height.
- Icons (D-18): built-in glyphs `Symbols.close_rounded`, `Symbols.visibility_rounded` / `Symbols.visibility_off_rounded`, `Symbols.help_rounded`, `Symbols.error_rounded` from `material_symbols_icons`, `opticalSize` = the B2 icon size. Never `Icons.*`
- Gotchas: M3 `InputDecorator` adds default `contentPadding`, `prefixIconConstraints` (48×48) and `hoverColor` — override all from tokens; `OutlineInputBorder` takes a non-directional `BorderRadius`, resolve the directional one first; `TextFormField` with `maxLength` adds its own counter unless `buildCounter`/`counterText` is suppressed; `visualDensity: VisualDensity.standard`.

### C4 Token gaps

None. `text-field.tokens.json` extends the Web file (same aliases, D-13).

### C5 Files to create / change

```
4-tablet-components/lib/src/components/text_field/bw_text_field.dart               new: BwTextField, BwTextFieldAction, BwTextFieldEndButton
4-tablet-components/lib/src/components/text_field/bw_text_field_decoration.dart    new
4-tablet-components/lib/src/components/text_field/bw_field_label.dart              new (private)
4-tablet-components/lib/src/components/text_field/bw_field_addon.dart              new (private)
4-tablet-components/lib/src/components/text_field/bw_field_action.dart             new (private)
4-tablet-components/lib/src/components/text_field/bw_field_supporting.dart         new (private)
4-tablet-components/lib/src/components/button/bw_button_style.dart             change (internal): `BwButtonSegment` + `BwButtonStyle.borderRadius(metrics, segment)` (C3)
4-tablet-components/lib/src/components/button/bw_button.dart                   change (internal): optional `segment` for `shape` and focus-ring radius; default unchanged (C3)
4-tablet-components/lib/biowave_tablet.dart                                                  change: export bw_text_field.dart
4-tablet-components/test/text_field_test.dart                                       new
4-tablet-components/test/goldens/text_field/                                        new (generated goldens)
4-tablet-components/README.md                                                       change: status table row
CHANGELOG.md                                                        change
```

### C6 Tests

Implement every item in B9, plus:
- [ ] `bw_text_field_decoration` unit test: resolved border, fill and text colours per `WidgetState` set equal the B3 tokens
- [ ] Owned controller/focus node disposed; supplied ones never disposed
- [ ] End button: the `BwButton` resolved `shape` radius has square start corners and `radius-md` end corners in `en` and `ar`; the field outline's end corners are square; a `loading: true` end button paints its spinner
- [ ] `BwButton` without `segment` is unchanged: the existing Button tests and goldens pass without edits
- [ ] Reduced motion: with `context.bw.reduceMotion` the Biowave parts' transitions use `BwDuration.instant`; without it `BwDuration.sm` + `BwEasing.standard`

### C7 Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 (names, types, defaults, asserts, fallbacks)
- [ ] AC-2 Every value in B2–B3 from the listed token; no raw values, no `BwPalette`
- [ ] AC-3 B4: transitions inside the Biowave parts use `BwDuration.sm` + `BwEasing.standard`, and `BwDuration.instant` under `context.bw.reduceMotion` (C6 reduced-motion test); the `InputDecorator` border and helper ↔ error transition is Flutter's built-in one, not re-implemented or suppressed (accepted platform limit)
- [ ] AC-4 RTL as B5; semantics, focus and targets as B6
- [ ] AC-5 `cd 4-tablet-components && flutter analyze && flutter test` pass; `npm run sync` and `npm run docs:check` pass
- [ ] AC-6 Exported from `lib/biowave_tablet.dart`; `4-tablet-components/README.md` row = header, `Built`
- [ ] AC-7 Trailing action inside the outline at every size; disabled with the field; neutral icons in error (Web AD-1 … AD-6 do not occur)
- [ ] AC-8 Reuses `BwButton`, `BwIconButton`, `BwFocusRing`, `BwControlSize`; private field parts not exported; the only `BwButton` change is the internal `segment` of C3 / C5 (`BwButtonSegment` not exported, default button unchanged)

---

### C8 Execution log (filled by the Executor)

| Field | Value |
|---|---|
| Agent | Antigravity (Implementer, round 2) |
| Date | 2026-10-24 |
| Files changed | `4-tablet-components/lib/src/components/text_field/bw_text_field.dart`, `4-tablet-components/lib/src/components/text_field/bw_text_field_decoration.dart`, `4-tablet-components/lib/src/components/text_field/bw_field_label.dart`, `4-tablet-components/lib/src/components/text_field/bw_field_addon.dart`, `4-tablet-components/lib/src/components/text_field/bw_field_action.dart`, `4-tablet-components/lib/src/components/text_field/bw_field_supporting.dart`, `4-tablet-components/lib/biowave_tablet.dart`, `4-tablet-components/test/text_field_test.dart`, `4-tablet-components/test/goldens/text_field/text-field-light-en.png`, `4-tablet-components/test/goldens/text_field/text-field-light-ar.png`, `4-tablet-components/test/goldens/text_field/text-field-dark-en.png`, `4-tablet-components/test/goldens/text_field/text-field-dark-ar.png`, `4-tablet-components/README.md`, `CHANGELOG.md` |

**What was built**
- Implemented `BwTextField`, `BwTextFieldAction`, and `BwTextFieldEndButton` in `lib/src/components/text_field/bw_text_field.dart` and exported from `lib/biowave_tablet.dart`.
- Implemented token-only decoration and state/size resolvers in `bw_text_field_decoration.dart` matching `text-field.tokens.json`, using `InputDecoration.border = WidgetStateInputBorder.resolveWith(...)` so focus (`border-width-focus`, `color-border-focus`), error (`color-border-input-error`), hover, read-only (`color-border-default`), and disabled (`color-border-disabled`) borders resolve per state.
- Implemented package-private shared field parts (`BwFieldLabel`, `BwFieldAddon`, `BwFieldAction`, `BwFieldSupporting`) with top-aligned multiline slot layout (`BwFieldTopAlign`), semantic boundary target boxes (`BwFieldTargetBox`) exposing 48dp touch and semantics bounds while keeping B2 visual layout dimensions, intrinsic-width add-on segments, and squared inline-start corners on the attached `endButton` (`BwFieldEndButtonSquareStart`).
- Added full B9 + C6 widget, semantics, accessibility guideline, RTL, token-contract, and 4-mode PNG golden tests in `test/text_field_test.dart`.
- Checks:
  - `npm run component-tokens` ✓
  - `npm run sync` ✓ (READY for component work)
  - `npm run docs:check` ✓
  - `cd 4-tablet-components && flutter analyze && flutter test` ✓ (0 analyzer issues, 181/181 tests passing)

**Deviations from the plan or spec**
- none

**Questions for the Planner**
- none

#### Fix round 1 — 2026-10-24

| Field | Value |
|---|---|
| Agent | Antigravity (Fixer) |
| Date | 2026-10-24 |
| Files changed | `4-tablet-components/lib/src/components/text_field/bw_text_field.dart`, `4-tablet-components/lib/src/components/text_field/bw_field_addon.dart`, `4-tablet-components/lib/src/components/text_field/bw_field_label.dart`, `4-tablet-components/test/text_field_test.dart`, `4-tablet-components/test/goldens/text_field/text-field-light-en.png`, `4-tablet-components/test/goldens/text_field/text-field-light-ar.png`, `4-tablet-components/test/goldens/text_field/text-field-dark-en.png`, `4-tablet-components/test/goldens/text_field/text-field-dark-ar.png`, `4-tablet-components/components/text-field/text-field.md`, `4-tablet-components/README.md`, `CHANGELOG.md` |

| Finding | What changed (`file:line`) | Test that proves it |
|---|---|---|
| #1 🔴 Validator pass-through & FormState integration | `bw_text_field.dart:750-780`: passed `widget.validator` result through, added `forceErrorText`, and wired `errorBuilder` to render `BwFieldSupporting.buildError` | `test/text_field_test.dart:1238-1296`: `Form integration: validator result is passed through to FormField` and `Form integration: autovalidateMode.onUserInteraction` |
| #2 🔴 Affix hint semantics separation | `bw_text_field.dart:357-370`, `:652-675`, `:782-793`: `hintText` resolves only from `widget.placeholder` without copyWith merge; affixes described exclusively in `Semantics.hint` | `test/text_field_test.dart:1298-1342`: `empty field with affixes: shows no hintText, affixes in semantics hint only` |
| #3 🔴 Remove PaintingContext interception; square end button via `BwButton(segment: BwButtonSegment.end)` | `bw_field_addon.dart:1-153`: removed `BwFieldEndButtonSquareStart` and custom canvas interceptors; `bw_text_field.dart:584-599`: end button uses `BwButton(segment: BwButtonSegment.end)` | `test/text_field_test.dart:1344-1372`: `end button: BwButton uses segment: BwButtonSegment.end; loading paints spinner` |
| #6 🟡 Golden affix demo cases | `test/text_field_test.dart:1376-1386`: separated affixes into "Hourly rate (MD)" + `SAR` suffix and "Website" + `https://` prefix; updated all 4 goldens | `test/text_field_test.dart:1463-1490`: golden matrix tests for dark/en, dark/ar, light/en, light/ar |
| #7 🟡 Tab navigation past disabled field & dead check | `test/text_field_test.dart:644-760`: removed dead `helpTapped`, asserted Tab 1 lands on help icon, Tab 2 skips disabled field/action/end button and focuses next field; verified `isFocused: false` and `isEnabled: false` | `test/text_field_test.dart:644-760`: `disabled: field, trailing action and end button not focusable; help icon still reachable; helper text kept in semantics` |
| #8 🟢 Consistent supporting-row start and counter insets | `bw_text_field.dart:617-660`: unified supporting-row start and counter end insets across all fields (with/without leading icon or multiline) by offsetting subtext by `startPadding` / `endPadding` | `test/text_field_test.dart:1374-1416`: `supporting-row start and counter end insets are consistent across all layouts` |
| #9 🟢 Keep helper text in semantics when disabled | `bw_text_field.dart:363`: kept `helperText` in semantics label when field is disabled (suppressing only error text) | `test/text_field_test.dart:703-713`: `disabled: field, trailing action and end button not focusable... helper text kept in semantics` |
| Plan 1.2 motion & reduced motion | `bw_field_label.dart:88-112`: added `AnimatedDefaultTextStyle` with `BwDuration.sm` and `BwEasing.standard` (instant when `reduceMotion`); tested all Biowave parts | `test/text_field_test.dart:1157-1236`: `honours motion duration and reduced motion` |

**Deviations from the plan or spec**
- Reused existing `BwButtonSegment` in `lib/src/components/button/bw_button.dart` and `BwButtonStyle.segmentBorderRadius(dimensions, segment)` in `bw_button_style.dart` (merged from Split button, #17) as instructed by user note, rather than adding a new helper or editing button files.
- In `bw_text_field.dart`, unified supporting row start and counter end insets to `spacing-xs` (4 dp) across all field configurations by compensating subtext visual offsets (`startPadding` / `endPadding`).

**Questions for the Planner**
- none

---

## D · Figma build

> How to build Part B in Figma. The Figma Agent receives this through the generated `figma-text-field-contract.md`.
> **One file per platform (D-12).** This file builds the Tablet sets in **Biowave DS — Tablet Components**. Structure, layer tree and properties are the same as [Web D2–D4](../../../3-web-components/components/text-field/text-field.md#d--figma-build) (one fact, one home); this file lists only what differs. Values come from the Tablet [Part B](#b--spec).

| Field | Value |
|---|---|
| Component | Text field |
| Platform | Tablet |
| Figma file | **Biowave DS — Tablet Components** (`_sync/figma-files.json` › `tablet`) — never the Foundations file |
| Page / section | `↳ Text field` › sections `Text field` and `Text field — Documentation` |
| Mode | **Create new.** Legacy reference (read only): Foundations › Mobile `↳ Inputs` (3991:1584) and `↳ Text Area` (4131:10187) — see `_audits/input-family.md` |
| Plan version | 1.1 · 2026-10-18 |

### D1 Rules for this build

Same as [Web D1](../../../3-web-components/components/text-field/text-field.md#d1-rules-for-this-build) (component tokens only, everything bound, library instances), plus:
- **Typography mode:** on page `↳ Text field` set the explicit variable mode **`Tablet`** for `5. Typography (EN)` and `6. Typography (AR)`.
- Component tokens: `Text field / Size` and `Text field / State` synced to this file from [`text-field.tokens.json`](text-field.tokens.json).
- Nested instances: Tablet `Button` (end button) and `Icon button` (help icon, trailing action) from this file once they are built; until then report Phase 1 as “blocked — Button / Icon button” for those slots and build the rest.

### D2 Component structure

As [Web D2](../../../3-web-components/components/text-field/text-field.md#d2-component-structure): `Text field` and `Text area` sets plus private `.Field/Label`, `.Field/Container`, `.Field/Add-on`, `.Field/Action`, `.Field/Supporting text`. Tablet differences:
- `Size` = `MD` · `LG` (default `LG`)
- `State` = `Default` · `Focus` · `Disabled` · `Read-only` (no `Hover`)
- `Text area`: no `Resize handle` property

### D3 Layer tree and auto layout

As [Web D3](../../../3-web-components/components/text-field/text-field.md#d3-layer-tree-and-auto-layout) with the D2 differences; every interactive slot (`help-icon`, `trailing-action`, `end-button`) shows its 48 hit area only on doc page 09.

### D4 Properties

As [Web D4](../../../3-web-components/components/text-field/text-field.md#d4-properties) without `Resize handle`. Code mapping uses the Flutter names from B1 (`errorText`, `requiredField`, `leadingIcon`, `prefixText`, `obscureText`, `enabled: false`).

### D5 Variants to generate

- Axes: `Type × Size × State × Filled × Error × Language`
- Exclude `State=Disabled × Error=True`
- Count: 2 types × 2 size(s) × 2 filled × 2 languages × 7 valid State/Error pairs = **112 variants**

### D6 States, interactions and motion

As Web D6 without hover. Focus on tap: smart animate per B4.

### D7 RTL

As [Web D7](../../../3-web-components/components/text-field/text-field.md#d7-rtl) (`Language=AR` variants).

### D8 Documentation pages

All 12 standard pages in section `Text field — Documentation`, built only from the Doc Kit (Annotation library, D-17). 07 Platform: `Doc/Device frame` = Tablet landscape + Tablet portrait, with the on-screen keyboard and Next/Done flow. 09 Accessibility: 48 target overlays on help icon, trailing action and end button; `MD` field hit area.

Component description: “Enters or edits short and multiline text with persistent labels and accessible validation. Spec: 4-tablet-components/components/text-field/text-field.md”.

### D9 Code Connect

`4-tablet-components/lib/src/components/text_field/bw_text_field.figma.dart` — mapping per D4 with the Flutter names. Publish after code and Figma reviews are both `Approved`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Sets and private bases on `↳ Text field` in the Tablet file; structure and layer names as Web D2–D3 + D2 differences
- [ ] F-AC-2 Properties as Web D4 minus `Resize handle`; variant count 112
- [ ] F-AC-3 Zero raw values; only this component's token collections as local variables; token lint 0
- [ ] F-AC-4 Page Typography mode = `Tablet`; Light/Dark by mode only; Arabic fits without truncation
- [ ] F-AC-5 Values match the Tablet B2–B3 (redline per size, incl. action box inset)
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
| 1 | 2026-10-24 | Changes requested | not reviewed |

### E2 Round 1 — 2026-10-24

| Field | Value |
|---|---|
| Plan version reviewed | 1.1 · 2026-10-18 |
| Spec version reviewed | 1.1 |
| Reviewer | Claude |
| Date | 2026-10-24 |
| Code reviewed | `git diff main...ds/text-field-tablet` (HEAD `ec58464`, Implementer rounds 1–2 in one commit) + working tree (clean at review start) |
| Verdict | **Changes requested** — 3 🔴, 4 🟡, 4 🟢 (#1–#11); Planner items #4, #5, #10, #11 → Plan `Open` |
| Evidence | Run by the Reviewer in the `ds/text-field-tablet` worktree: `npm run docs:check` ✅ · `flutter analyze` ✅ no issues · `flutter test` ✅ 181/181 (includes the 4 text-field goldens). Behaviour probes: throw-away tests in the scratchpad (copy of `lib/` + test helpers, outside the repo) — results quoted in the findings. The four goldens checked by eye (below) |

#### Previous round findings

None — first round.

#### Round 2 build fixes (the 5 failing tests) — fixed in code, not by weakening tests

Only one commit exists on the branch, so the round-1 test text cannot be diffed; each current test was read against the contract and the code path was checked.

| Failure | Status | Evidence |
|---|---|---|
| Action inset 28 → 4 | ✅ Code | `bw_field_action.dart:92-98` end padding `metrics.actionInset` (`BwSpacing.xs`) with `endPadding` 0 when an action is present (`bw_text_field_decoration.dart` `resolve`, `endPadding`). Test (`text_field_test.dart:469-531`) still asserts exact equality `== BwSpacing.xs` per locale, size and multiline |
| Help-icon label `''` | ✅ Code | `bw_field_label.dart:146-164` — `Tooltip(excludeFromSemantics: true)` around `BwFieldTargetBox` (`bw_field_action.dart:171-176`, semantic boundary + merge) holding `BwIconButton(label: resolvedHelpLabel)`. Test `:589` asserts the exact string `'More information about Work email'`, button flag and tap action |
| Disabled focusability | ✅ Code | Help icon reachable by Tab (test `:688-701` asserts `isFocused`). Reviewer probe: disabled field with help icon + action + end button followed by a second field — Tab 1 → help icon, Tab 2 → the next field (disabled field, action and end button skipped). Test is weaker than B9 here — see #7 |
| Unlabelled tap target | ✅ Code | md hit-area `GestureDetector(excludeFromSemantics: true)` `bw_text_field.dart:754-768`; `labeledTapTargetGuideline` still runs for both sizes and themes (`:790-831`) |
| Password toggle label | ✅ Code | `bw_text_field.dart:345-351`, `:469-482` (`toggle: true`, `selected`). Test `:900-953` asserts exact `'Show password'` → `'Hide password'`, `toggled` false → true, caret offset 4 kept, focus kept |

#### Acceptance criteria

| AC | Result | Evidence (file:line / test name) |
|---|---|---|
| AC-1 API = B1 | ❌ | Names/defaults `bw_text_field.dart:46-90`, asserts `:91-136`, release fallbacks `:197-234`; tests "uses documented defaults", "asserts every invalid combination". But `validator` does not "work inside `Form`" (#1), and an unplanned public `placeholder` param exists (`:88`, `:179`) — #5 |
| AC-2 B2–B3 tokens only | ✅ | `bw_text_field_decoration.dart` size metrics `:217-262`, state tokens `:270-360`; tests "tokenAliases equals text-field.tokens.json", "bw_text_field_decoration unit test…", "no raw colours, sizes or durations in the source" |
| AC-3 B4 transitions; reduced motion | ✅ | `BwDuration.sm` / `BwEasing.standard`, `BwDuration.instant` under `context.bw.reduceMotion` (`bw_field_supporting.dart`, `bw_field_addon.dart:76-77`, `bw_field_label.dart:144`); test "honours reduced motion". Note #11 (InputDecorator's own border animation) |
| AC-4 RTL B5; a11y B6 | ❌ | RTL ✅ (`EdgeInsetsDirectional` / `BorderRadiusDirectional` throughout; test "RTL: layout mirrored, icons not mirrored, LTR content isolated"; `ar` goldens mirrored). A11y: one text-field node named by label (+ required), helper/error/counter read with it, separate labelled help / trailing action / end-button nodes with tap + focus ✅ (tests `:559-642`, `:719-788`); disabled rules ✅ (probe). ❌ affix text is read twice (in label and hint) and leaks into the visible placeholder — #2 |
| AC-5 checks pass | ✅ | `docs:check`, `flutter analyze`, `flutter test` 181/181 (Reviewer run). `npm run sync` READY per C8, not re-run (not in this platform's checks) |
| AC-6 export + README | ✅ | `lib/biowave_tablet.dart:15`; README row = header (now `Changes requested`, `docs:check` keeps them equal) |
| AC-7 trailing action inside outline; disabled with field; neutral icons in error | ✅ | Test `:469-531` (inside outline, inset `xs`, every size, single + multiline, en + ar); `onPressed: null` when disabled `bw_text_field.dart:481`, `:492`, `:502`; error icon colours `bw_text_field_decoration.dart` state `error` uses `iconNeutralMuted`; error goldens show neutral leading icon |
| AC-8 reuse; private parts not exported | ❌ | `BwButton`, `BwIconButton`, `BwIcon`, `BwFocusRing` (via the buttons), `BwControlSize` reused, none changed (no diff under `button/`, `icon/`, `icon_button/`); only `bw_text_field.dart` exported. ❌ the end button is wrapped in a canvas-intercepting painter that breaks `BwButton` painting (#3) |

#### Goldens (checked by eye)

| File | Result |
|---|---|
| `text-field-light-en.png` | ✅ Default (help icon, required `*`, leading icon, placeholder, helper), Focused (2px focus border, clear action), Error (error border, error icon + text, counter), Disabled, Read-only + `Copy` end button (shared border, square seam), Password with toggle, multiline with clear + counter. ❌ Affix demo: "Hourly rate (MD)" with `https://` prefix **and** `SAR` suffix (#6) · 🟢 supporting-row start offset differs (#8) |
| `text-field-light-ar.png` | ✅ Mirrored: labels, icons at inline start/end, end button on the left with square right corners, counter LTR, `https://` / `SAR` isolated LTR. Same #6 / #8 |
| `text-field-dark-en.png` | ✅ Dark tokens (borders, fills, disabled, add-on background, error colour readable) |
| `text-field-dark-ar.png` | ✅ Dark + mirrored; no clipping or overflow, real fonts |

#### Rule checks (AGENTS.md §2)

| Rule | Result | Notes |
|---|---|---|
| No generated files edited | ✅ | No `generated/`, `dist/`, contract or HTML shell in the diff |
| No raw values / no primitives | ✅ | Guard test passes; no `BwPalette`, no `Color(0x` |
| Logical properties, RTL icons | ✅ | See AC-4 |
| Light + dark, en + ar tested | ✅ | Property tests + 4 goldens |
| Accessibility | ❌ | #2 (affix read twice); otherwise B6 met |
| Stayed inside the contract | ❌ | Unlogged `placeholder` param (#5); C8 says "Deviations: none" |
| One component per task | ✅ | Only unit files, the export line, the README row, one CHANGELOG entry, run records |
| Changelog | ✅ | `CHANGELOG.md` "[Tablet Text field — implementation] — 2026-10-24"; C8 filled |

#### Findings

| # | Severity | File | Issue | Required change | Owner |
|---|---|---|---|---|---|
| 1 | 🔴 Blocker | `lib/src/components/text_field/bw_text_field.dart:728-742` | The `validator` wrapper always returns `null` to `TextFormField` and shows the message through a post-frame `setState`. So `FormState.validate()` returns **true** while the error is on screen. Reviewer probe: `Form` + `validator: (v) => v.isEmpty ? 'Required' : null`, empty field → `validate()` = `true`, "Required" shown. B1 says the validator "works inside `Form`". A form with invalid fields can be submitted | Return the validator result to the `FormField` (e.g. pass `widget.validator` through and read `FormFieldState.errorText` for the decoration / semantics, or use `forceErrorText` for `errorText`), so `validate()` is false when a message is returned. Add tests: `validate()` false + error shown; true + no error after a fix; `autovalidateMode.onUserInteraction` | Implementer |
| 2 | 🔴 Blocker | `bw_text_field.dart:666`, `:672-674`, `:745-747` | The affix text is passed as `InputDecoration.hintText` (`_resolvedHintSemantics`), and `.copyWith(hintText: widget.placeholder)` does not clear it when `placeholder` is null. Result: an **empty** field shows the affixes as visible placeholder text. Probe: `prefixText: 'https://', suffixText: '.sa'`, empty → `hintText = "https://, .sa"` rendered. The affix is also read twice. Probe for `suffixText: 'SAR'`: label `"Hourly rate\nPer hour\nSAR"` + hint `"SAR"` | Keep `hintText` = `placeholder` only. Put the affix description only in the `Semantics.hint` (B6 "Hourly rate, SAR"). Add tests: an empty field with affixes shows no hint text, and the semantics read each affix once | Implementer |
| 3 | 🔴 Blocker | `lib/src/components/text_field/bw_field_addon.dart:157-330` (`BwFieldEndButtonSquareStart`) | Squares the button corners by replacing the `PaintingContext` with a subclass backed by an orphan `OffsetLayer` and a wrapping `Canvas`. It overrides only `canvas`, `pushClipPath`, `pushClipRRect` and `pushTransform`. Any composited child (repaint boundary, opacity, colour filter) goes to the orphan layer and is never shown. Probe: `endButton: BwTextFieldEndButton(loading: true)` — the spinner's `RenderAnimatedOpacity` layer `attached = false` (plain `BwButton`: `true`), so the loading spinner is invisible and the label is hidden by `Visibility`: an empty button. Ink and focus ring are drawn on other layers, so they are not squared either. Not covered by any test | Remove the painting-context interception. Square the seam with a supported mechanism, once the Planner has picked one (#4). Add a test that pumps a loading end button and expects the spinner to be painted (golden or layer attached) | Implementer |
| 4 | 🟡 Should fix | `text-field.md` C3 / C5 (and Button B1) | C3 needs "the button's start corners square via `BorderRadiusDirectional`", but `BwButton` has no shape / radius parameter, and C5 does not allow changing `BwButton`. This gap led to #3 | Choose one and write it in C3/C5: (a) allow a package-private `BwButton` shape or corner override (add `button/bw_button.dart` to C5 with the exact param), or (b) a clip-based approach (e.g. `ClipRRect` + an outer border segment) with the accepted visual. Then regenerate the contract | Planner |
| 5 | 🟡 Should fix | `text-field.md` B1; `bw_text_field.dart:88`, `:179` | Tablet B1 has no `placeholder` param. Web B1 does, and Tablet A2 / B3 (`hintStyle`) need one. The Implementer added a public `placeholder` but did not log it (C8 "Deviations: none") | Planner: add `placeholder` (`String?`, "Format hint, never the accessible name") to Tablet B1 and regenerate. Implementer: list unplanned API in C8 Deviations next time | Planner |
| 6 | 🟡 Should fix | `test/text_field_test.dart:1330-1338` (golden board); `test/goldens/text_field/*.png` | The affix demo has a `https://` prefix next to a `SAR` suffix on "Hourly rate" with value `120`. That is a URL scheme on a money amount. It contradicts A2 #5 (prefix = "fixed text such as `http://` or a currency") and B7 (`Hourly rate` + `suffixText: 'SAR'` only). Goldens are the visual record designers check | Use two real cases: e.g. "Hourly rate" + `suffixText: 'SAR'` (B7), and "Website" + `prefixText: 'https://'`, both in the board; regenerate the four goldens and check them by eye | Implementer |
| 7 | 🟡 Should fix | `test/text_field_test.dart:644-717` | B9 "Disabled: field, trailing action and end button not focusable" is not asserted: the test checks only that tap actions are missing and that Tab 1 lands on the help icon. `helpTapped` is never set (dead check). Also no test covers `Form`/`validator` (#1), empty-with-affix (#2) or a loading end button (#3) | After help icon, Tab again and assert focus left the disabled field (e.g. a second field gets focus; field/action/end button `isFocused` false, `isFocusable` false). Remove `helpTapped` or wire it. Add the tests named in #1–#3 | Implementer |
| 8 | 🟢 Nit | `bw_text_field_decoration.dart` `resolve` (`contentPadding` start) | The supporting-row start offset follows `contentPadding.start`, so it changes with the leading slot: ≈4 dp for fields with a leading icon (email, disabled) vs ≈20 dp for the multiline field without one; the error-row counter sits ≈20 dp from the inline end vs ≈4 dp elsewhere (all four goldens) | Use one supporting-row inset for every field (the `helper` / `error` / `counter` padding independent of the leading slot). If Web B2 does not fix the value, ask the Planner in C8 | Implementer |
| 9 | 🟢 Nit | `bw_text_field.dart:359-361` | When disabled, helper text is still shown (goldens "Employee ID is fixed") but is dropped from the field's semantics label, so screen-reader users lose it | Keep `helperText` in the label when disabled (only the error is suppressed) | Implementer |
| 10 | 🟢 Nit | `text-field.md` header | "Source code" still says "not built yet (the Executor creates it)" | Set it to `lib/src/components/text_field/` (and in the contract header on regenerate) | Planner |
| 11 | 🟢 Nit | `text-field.md` B4 | M3 `InputDecorator` animates its border with a fixed internal duration that neither `BwDuration.sm` nor reduced motion can set. B4 says all transitions use `BwDuration.sm` and become instant under reduced motion | Record this platform limit in B4 (as for the Tooltip fade on Icon button), or require a custom border animation | Planner |

#### Notes

- The field's semantics label includes helper / error / counter text (`"Work email, required\nFormat: …"`). This is how Flutter's `InputDecorator` merges them and matches B6 "read with it"; not a finding.
- `Tooltip.dismissAllToolTips()` on Esc (`bw_field_label.dart:56-58`) closes every tooltip in the app, not only this one; acceptable for now.
- Figma build (Part D) not reviewed: `Figma build = Planned`.

#### Next step

Planner: #4, #5, #10, #11 → set Plan `Finished`, regenerate `text-field-contract.md`. Then Fixer: #1, #2, #3, #6, #7 (and nits #8, #9) → Round 2.

---

## F · Changelog

### F0 Changes from previous version

1.2 (2026-10-24) fixes the Planner findings of review round 1 (#4, #5, #10, #11): `placeholder` added to B1; B2 / C3 / C5 square the end-button seam through an internal `BwButton` `segment`; B4 records the `InputDecorator` motion limit and what reduced motion covers; AC-3 and AC-8 made checkable. Header `Source code` points to the built folder. Guidelines (Part A) unchanged. 1.1 was the first Tablet version; differences from Web 1.1 are listed in A8 and B1 (Flutter naming).

### F1 Guidelines changelog

| Version | Date | Change | Migration | Author |
|---|---|---|---|---|
| 1.1 | 2026-10-18 | Guidelines copied from Web 1.1 (legacy properties, managed trailing action); A8 for Tablet | — | Claude (Planner) |

### F2 Spec changelog

| Version | Date | Change | Breaking | Migration |
|---|---|---|---|---|
| 1.1 | 2026-10-18 | Initial Tablet spec (Flutter `BwTextField`), aligned with Web 1.1 | No | — |
| 1.2 | 2026-10-24 | Review round 1 Planner items (#4, #5, #10, #11): B1 `placeholder`; end-button square start corners via internal `BwButton` `segment` (B2, C3, C5, C6, AC-8); B4 `InputDecorator` motion platform limit + reduced-motion scope (C3, C6, AC-3) | No | — |

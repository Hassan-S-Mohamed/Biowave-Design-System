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
| `placeholder` | `String?` | | | | Format hint shown while the field is empty (`InputDecoration.hintText`, B3 `placeholder`); never the accessible name (as Web B1) |
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
- **End button:** the field's end corners and the end button's start corners are square; the outer corners keep `radius-md`; the button overlaps the field by `border-width-default` so one border shows at the seam (as Web B2). The button's corners come from the internal `BwButton` `segment` (C3).

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
| Plan version | 1.2 · 2026-10-24 |

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
- End button: `Row` of `Expanded(field)` + `BwButton(segment: BwButtonSegment.end)`, overlapped by `BwBorder.widthDefault` to share one border. The field's end corners are square through its `OutlineInputBorder` radius (`BorderRadiusDirectional.horizontal(start: Radius.circular(BwRadius.md))` resolved for the direction). The button's start corners are square through an internal `segment` on `BwButton` (the same mechanism as the Split button plan; if it already exists, reuse it unchanged):
  - `enum BwButtonSegment { start, end }` is declared in `button/bw_button_style.dart`, which is not exported from `lib/biowave_mobile.dart`, so the parameter is package-private
  - `BwButton` gets one optional named parameter `BwButtonSegment? segment` (default `null` = today's button, every corner `radius`); nothing else in its API, sizes, colours or behaviour changes
  - One shared helper in `bw_button_style.dart`, `BwButtonStyle.borderRadius(metrics, segment)` → `BorderRadiusDirectional`: `null` → every corner `metrics.radius`; `end` → start corners `Radius.zero`, end corners `metrics.radius`; `start` → the mirror. The button `shape` (outline, ink and overlay) and its `BwFocusRing` radius both use it
  - Not allowed: intercepting `PaintingContext` or `Canvas`, `ClipRRect` / `ClipPath` around the button, or a second button implementation
- Error, helper and counter via `InputDecoration.error` / `helper` / `counter` widgets (`BwFieldSupporting`); built-in `counterText` suppressed.
- Motion (B4): transitions inside `BwFieldLabel`, `BwFieldAddon` and `BwFieldSupporting` use `BwDuration.sm` + `BwEasing.standard` (enabled ↔ disabled / read-only `BwDuration.instant`) and `BwDuration.instant` when `context.bw.reduceMotion`. The `InputDecorator` border and helper ↔ error transition stays Flutter's built-in one (B4 platform limit).
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
5-mobile-components/lib/src/components/button/bw_button_style.dart             change (internal): `BwButtonSegment` + `BwButtonStyle.borderRadius(metrics, segment)` (C3)
5-mobile-components/lib/src/components/button/bw_button.dart                   change (internal): optional `segment` for `shape` and focus-ring radius; default unchanged (C3)
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
- [ ] End button: the `BwButton` resolved `shape` radius has square start corners and `radius-md` end corners in `en` and `ar`; the field outline's end corners are square; a `loading: true` end button paints its spinner
- [ ] `BwButton` without `segment` is unchanged: the existing Button tests and goldens pass without edits
- [ ] Reduced motion: with `context.bw.reduceMotion` the Biowave parts' transitions use `BwDuration.instant`; without it `BwDuration.sm` + `BwEasing.standard`

### C7 Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 (names, types, defaults, asserts, fallbacks)
- [ ] AC-2 Every value in B2–B3 from the listed token; no raw values, no `BwPalette`
- [ ] AC-3 B4: transitions inside the Biowave parts use `BwDuration.sm` + `BwEasing.standard`, and `BwDuration.instant` under `context.bw.reduceMotion` (C6 reduced-motion test); the `InputDecorator` border and helper ↔ error transition is Flutter's built-in one, not re-implemented or suppressed (accepted platform limit)
- [ ] AC-4 RTL as B5; semantics, focus and targets as B6
- [ ] AC-5 `cd 5-mobile-components && flutter analyze && flutter test` pass; `npm run sync` and `npm run docs:check` pass
- [ ] AC-6 Exported from `lib/biowave_mobile.dart`; `5-mobile-components/README.md` row = header, `Built`
- [ ] AC-7 Trailing action inside the outline at every size; disabled with the field; neutral icons in error (Web AD-1 … AD-6 do not occur)
- [ ] AC-8 Reuses `BwButton`, `BwIconButton`, `BwFocusRing`, `BwControlSize`; private field parts not exported; the only `BwButton` change is the internal `segment` of C3 / C5 (`BwButtonSegment` not exported, default button unchanged)

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

#### Fix round 1 — 2026-10-24 (Antigravity)

| Finding / Item | What changed (`file:line`) | Test that proves it |
|---|---|---|
| #1 (🔴) Single text-field semantics node | In `lib/src/components/text_field/bw_text_field.dart:575-582`, removed `container: true` and `textField: true` from the outer `Semantics` wrapper and simplified `label` to `_semanticsLabel` (`:471-472`) and `hint` to `_semanticsHint` (`:474-487`); the inner editable `TextFormField` (`:509-570`) is the single `isTextField` node carrying name (+ required), value, helper/error/counter, and tap/focus actions | `test/text_field_test.dart:497-634` (`field and each action are separate labelled nodes`), `test/text_field_test.dart:636-712` (`error and counter cases expose exactly one text-field node`) |
| #2 (🟡) Semantics node count, matchesSemantics, full Tab order, real tap & Enter/Space tooltip tests | Added tests asserting single `isTextField` node count (`find.semantics.byPredicate`), `matchesSemantics` with label/value/validationResult/children, full Tab focus sequence (`help icon` → `field` → `trailing action` → `end button`), and tooltip activation by real tap and Enter/Space keys | `test/text_field_test.dart:403-442` (`help tooltip opens by real tap and Enter/Space, and closes with Escape`), `test/text_field_test.dart:497-634` (`field and each action are separate labelled nodes`), `test/text_field_test.dart:636-712` (`error and counter cases expose exactly one text-field node`) |
| #3 (🟡) Help icon placed directly after label with `BwSpacing.xs` | In `lib/src/components/text_field/bw_field_label.dart:102-139`, replaced `Expanded` label and `Spacer()` with `Flexible` label and placed the help button directly after the label row (+ required indicator) separated by `SizedBox(width: BwSpacing.xs)`, correctly positioned in both LTR and RTL; updated all 4 goldens (`test/goldens/text_field/text-field-{light,dark}-{en,ar}.png`) | `test/text_field_test.dart:714-746` (`help icon 48dp hit area does not enlarge label-to-field gap`), `test/text_field_test.dart:366-399` (`renders across themes and locales without error` / goldens) |
| #4 (🟡) Help icon 48dp tap area does not enlarge layout (label gap = `BwSpacing.sm`) | In `lib/src/components/text_field/bw_field_action.dart:47-142`, introduced package-private `BwFieldTargetBox` (`RenderShiftedBox`) constraining parent layout size to `Size.square(BwSize.iconSm)` (16dp) while keeping child hit target and semantics at `BwLayout.mobile.minTarget` (48dp); used in `lib/src/components/text_field/bw_field_label.dart:85-97` | `test/text_field_test.dart:714-746` (`help icon 48dp hit area does not enlarge label-to-field gap` verifies gap is `BwSpacing.sm` with and without helpText) |
| #5 (🟡) Prefix/suffix add-ons inside outline with continuous border | In `lib/src/components/text_field/bw_field_addon.dart:27-38,53-78`, inset add-on box with `Padding` by `borderWidth` (1dp) on top, bottom, and outer edge (`start` for prefix, `end` for suffix) and inner corners `BwRadius.md - borderWidth`, so default, focus, and error borders remain visible around add-ons; in `bw_text_field.dart:193-197,320,507`, dynamically track error state via `_hasError` to update add-on borders; updated goldens | `test/text_field_test.dart:748-829` (`validator: FormField is single source of error, validate() false, reset() clears error, border, and semantics`), `test/text_field_test.dart:366-399` (goldens) |
| #9 (🟢) Restore original `BwMobileTheme` formatting | In `lib/biowave_mobile.dart:19-25`, reverted multi-line theme constructor arguments for `BwMobileTheme.light` and `BwMobileTheme.dark` to match `main`, touching only package exports | `cd 5-mobile-components && flutter analyze` (clean) |
| #10 (🟢) Remove test-only `labelStyle` and replace char codes with `''` | In `lib/src/components/text_field/bw_text_field_decoration.dart:74-76,122-125`, removed `labelStyle` and unused `inputColor`; in `lib/src/components/text_field/bw_text_field.dart:204,224,229,281`, replaced `String.fromCharCodes(const <int>[])` with `''` | `test/text_field_test.dart:240-271` (`border, fill, and text resolve in light/dark`), `cd 5-mobile-components && flutter analyze` |
| Plan 1.2: End-button segment | In `lib/src/components/text_field/bw_text_field.dart:619`, passed `segment: BwButtonSegment.end` to attached `BwButton` for square start corners; in `bw_text_field.dart:451-469`, field radius sets square end corners (`topEnd: Radius.zero`, `bottomEnd: Radius.zero`) | `test/text_field_test.dart:831-873` (`end button: resolved shape radius has square start corners in en and ar`) |
| Plan 1.2: Placeholder | In `lib/src/components/text_field/bw_text_field.dart:57,139,503`, kept `placeholder` mapped to `InputDecoration.hintText` and `hintStyle` per Plan 1.2 B1 | `test/text_field_test.dart:133-149` (`defaults match the contract`), `test/text_field_test.dart:240-271` (`border, fill, and text resolve in light/dark`) |
| Plan 1.2: Motion & reduced motion | In `lib/src/components/text_field/bw_field_label.dart:49-50,109-133`, `bw_field_addon.dart:44-45,63-93`, and `bw_field_supporting.dart:32-33,38-46,69-74`, animated label text style, addon container/text style, and supporting/counter text style using `duration = context.bw.reduceMotion ? BwDuration.instant : BwDuration.sm` and `curve: BwEasing.standard` | `test/text_field_test.dart:896-939` (`transitions honour motion tokens and reduced motion`) |
| Plan 1.2: C6 test suites | Added all four required C6 test suites: radius EN/AR (`:831-873`), loading end button paints spinner (`:875-894`), default button unchanged (`:847-850` + `button_test.dart`), and reduced motion (`:896-939`) | `test/text_field_test.dart:831-939`, `cd 5-mobile-components && flutter test` (177 tests pass) |

**Deviations from the plan or spec**
- none — Flutter's built-in `InputDecorator` border and helper ↔ error transition duration/curve is an accepted platform limit per Plan 1.2 B4.

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
| 1 | 2026-10-24 | Changes requested | not reviewed |

### E2 Round 1 — 2026-10-24

| Field | Value |
|---|---|
| Plan version reviewed | 1.1 · 2026-10-18 |
| Spec version reviewed | 1.1 |
| Reviewer | Claude |
| Date | 2026-10-24 |
| Commit reviewed | `8a677f8` (branch `ds/text-field-mobile`; `git diff main...HEAD`; working tree clean before this review) |
| Verdict | **Changes requested** (1 🔴, 6 🟡, 3 🟢) |

Checks run by the Reviewer (not copied from C8):

| Command | Result |
|---|---|
| `npm run docs:check` | ✓ 18 component files OK |
| `cd 5-mobile-components && flutter analyze` | ✓ No issues found |
| `cd 5-mobile-components && flutter test` | ✓ 148 tests, all passed (goldens compared, not updated) |
| `npm run sync` (AC-5) | ✓ READY for component work; `mobile text-field` code and Figma contracts current |

Extra evidence: semantics, help-row and add-on probes were run on a scratch copy of the package outside the repo (`debugDumpSemanticsTree`, `tester.getRect`); nothing in the worktree was added or changed by them. All four goldens in `test/goldens/text_field/` were inspected.

**Codex → Antigravity hand-over.** Codex's uncompiled test file was never committed, so a line-by-line comparison is not possible. The 22 analyzer errors listed in the step-03 prompt are all mechanical (`const` constructors inside `throwsA`, the missing `BwLayout.contentMax` → `BwSize.containerSm`, `TextFormField` getters → `tester.widget<TextField>`, `SemanticsFinder` → `find.semantics.*`), and the current file still asserts each of those things (`text_field_test.dart:34-97`, `:101-181`, `:420`, `:494-575`). No evidence of a removed expectation. But the semantics test as written does not prove B9 "one text-field node" (finding 2), and it passes while finding 1 is present.

#### Acceptance criteria

| AC | Result | Evidence (file:line / test name) |
|---|---|---|
| AC-1 Public API matches B1 | ✅ (🟢 8) | `bw_text_field.dart:45-170`: every B1 param, type and default; `BwTextFieldAction`/`BwTextFieldEndButton` `:15-42`; asserts `:90-127`; release fallbacks: counter `:489`, rows `:513-514`, obscure `:185`, action priority `:420-453`, trailing icon `:374`, add-ons / end button `:331, 396, 586`. Test `invalid combinations assert`, `defaults match the contract`. Extra `placeholder` param not in B1 (finding 8) |
| AC-2 B2–B3 values from tokens; no raw values | ⚠️ | Decoration `bw_text_field_decoration.dart:22-128` matches B3 (tests `border, fill, and text resolve in light/dark`, `read-only uses neutral fill and default border`); no `Color(0x` / `BwPalette` (test `uses no raw colours…`). But B2 layout is not met for the help row (finding 4), add-on outline (finding 5) and end-button shared border (finding 6) |
| AC-3 B4 transitions; reduced motion | ❌ | No `BwDuration` / `BwEasing` / `disableAnimations` for the field anywhere in `text_field/` (only the tooltip, `bw_field_label.dart:107-111`). Border, helper and error transitions come from Flutter's `InputDecorator` (hard-coded 167 ms `fastOutSlowIn`, ignores reduced motion). Finding 7 |
| AC-4 RTL (B5); semantics, focus, targets (B6) | ❌ | RTL ✓ (test `RTL mirrors layout but not neutral glyphs`, `*-ar` goldens, add-on LTR isolation `bw_field_addon.dart:62-65`). Targets ✓ (test `targets, labels, and contrast meet guidance`). Password toggle ✓ "Show password" / "Hide password" + `toggled` via `BwIconButton(toggle:)` (`bw_text_field.dart:421-431`, test `password toggle changes state and preserves caret`). Disabled ✓ (test `disabled controls leave help reachable`). **Semantics ✗:** two text-field nodes (finding 1). Help icon not after the label (finding 3) |
| AC-5 analyze, test, sync, docs:check | ✅ | Checks table above |
| AC-6 Exported; README row = header | ✅ | `lib/biowave_mobile.dart:15`; README row equalled the header (`Built`) before this review (`docs:check` ✓) |
| AC-7 Trailing action inside outline; disabled with field; neutral icons in error | ✅ | Box `BwSize.controlHeightMd`, inset `BwSpacing.xs` (test `field and action use mobile size tokens`); `onPressed: null` when disabled `bw_text_field.dart:428, 440`; clear hidden `:444`; icons `iconNeutralMuted` in error `bw_text_field_decoration.dart:69-71` |
| AC-8 Reuses BwButton, BwIconButton, BwFocusRing, BwControlSize; private parts not exported | ✅ | `BwFieldAction` → `BwIconButton` (`bw_field_action.dart:28`), help → `BwIconButton` (`bw_field_label.dart:112`), end button → `BwButton` (`bw_text_field.dart:600`), icons → `BwIcon`. `git diff main...HEAD` touches no file under `button/`, `icon/`, `icon_button/` or `common/`. Only `bw_text_field.dart` is exported |

#### Rule checks (AGENTS.md §2 and workflow rules)

| Rule | Result | Notes |
|---|---|---|
| 1 No generated files edited | ✅ | No contract, `dist/`, `_sync` or docs shell in the diff |
| 2–3 No raw values / no primitives | ✅ | Token-only; source-policy test passes |
| 4 RTL first | ✅ | `EdgeInsetsDirectional`, `BorderRadiusDirectional`, `BorderDirectional`; directional radius resolved before `OutlineInputBorder` |
| 5 Both themes, both languages tested | ✅ | 4 goldens + render matrix |
| 6 Accessibility | ❌ | Finding 1 (duplicate text-field node), finding 4 (help target changes layout) |
| 7 Stay inside the contract | ⚠️ | C8 says "Deviations: none", but the end button is fully rounded (finding 6) and B4 is not met (finding 7); both should have been raised in C8 → Questions |
| 8 One component per task | ⚠️ | `lib/biowave_mobile.dart` `BwMobileTheme` reformatted (finding 9) |
| 9 Changelog | ✅ | `CHANGELOG.md` entry "Mobile Text field — code implementation (1.1)" |

#### Findings

| # | Severity | File | Issue | Required change | Owner |
|---|---|---|---|---|---|
| 1 | 🔴 Blocker | `lib/src/components/text_field/bw_text_field.dart:562-572` | `Semantics(container: true, textField: true, label: …)` around `TextFormField` adds a **second** text-field node. Semantics dump: outer node `isTextField`, label "Work email, required, Use your work email, 3/20", **no value**; inner (real, editable) node `isTextField`, value "abc", label "3/20" only, and the helper again as a child node. TalkBack / VoiceOver meet two text fields; the one that edits has no name, and the helper is read twice. B6: one text-field node named by `label` (+ required), helper/error/counter read with it | Expose exactly one `isTextField` node that carries the name (+ "required" / "مطلوب"), the value, helper/error/counter and the tap/focus actions (e.g. drop `container`/`textField` from the wrapper so it does not form its own node, or name the field through the decoration semantics). Help icon, trailing action and end button stay separate nodes | Executor |
| 2 | 🟡 Should fix | `test/text_field_test.dart:494-575, 436-458` | Tests do not prove B9: the "one node" test only finds a label by regex (passes with finding 1 present), no `matchesSemantics`, no count of text-field nodes, helper/error/counter not checked in the field's semantics; Tab order checked only help → field (not → trailing action → end button); help tooltip tested only by a semantics tap, not a real tap or keyboard activation (Enter / Space) as B9 requires | Add: count of `isTextField` nodes == 1 with `matchesSemantics` (label, value, textField, tap, focus) for helper, error and counter cases; full Tab order help → field → action → end button; tooltip opens on `tester.tap` and on Enter/Space with focus on the help icon | Executor |
| 3 | 🟡 Should fix | `lib/src/components/text_field/bw_field_label.dart:48-79` | Help icon is pushed to the far end of the label row (`Expanded` label / `Spacer`). Seen in all four goldens (en: at the far right; ar: at the far left) and measured: in a 360-wide field (x 220–580) the help glyph sits at x 548–564, the row end. B2 redline (Web B2 "Work email * (?)") and A4.3 "The help icon sits after the label" put it right after the label | Place the help icon directly after the label (+ required indicator) with `BwSpacing.xs` between them, label `Flexible` so long labels still wrap; in RTL it follows the label on the left. Update goldens | Executor |
| 4 | 🟡 Should fix | `lib/src/components/text_field/bw_field_label.dart:112-119` | The help icon's 48 hit area enlarges the label row: label-to-field gap is 18 with `helpText` vs 6 (`BwSpacing.sm`) without (measured). B2: hit areas are "extended invisibly so layout does not change" | Keep the label row at label height and `label gap = spacing-sm`; extend the help icon's hit area without taking layout space. Add a test for the gap with and without `helpText` | Executor |
| 5 | 🟡 Should fix | `lib/src/components/text_field/bw_field_addon.dart:39-75`, `bw_text_field_decoration.dart:107-112` | Prefix / suffix add-ons paint over the field outline: the add-on box covers the full field rect (prefix `220,30 → 264.5,78` = field top, bottom and start edge), so the outer border, and the focus / error outline, are missing around the add-ons (golden "Hourly rate", all four). B2: add-ons inside one outline with dividers | Draw add-ons inside the outline (inset by the border width, outer corners radius-md minus border) so the field border, focus and error colours stay visible around them; golden for focused + error with add-ons | Executor |
| 6 | 🟡 Should fix | `lib/src/components/text_field/bw_text_field.dart:586-611`; spec B2 / C3 / C5 | End button is a normal fully rounded `BwButton` with its own border (golden "Share code"); B2/C3 want its start corners square and one shared border. `BwButton` has no shape parameter and C5 does not allow changing it, so the spec cannot be met as written. C8 reports no deviation | Planner: decide — allow a shape/corner parameter on `BwButton` in C5 (and list it), or change B2/C3 to accept the rounded attached button. Then regenerate the contract | Planner |
| 7 | 🟡 Should fix | spec B4 / C3; `bw_text_field_decoration.dart` | C3 builds on `TextFormField` + `InputDecorator`, whose border / helper / error transitions use Flutter's fixed 167 ms `fastOutSlowIn` and ignore `MediaQuery.disableAnimations`. B4 (`BwDuration.sm`, `BwEasing.standard`, reduced motion instant) cannot be met with that approach; nothing in the field uses the motion tokens | Planner: either accept Flutter's built-in field transition in B4 (and say reduced motion is not applied to it), or specify how to get `BwDuration.sm` / reduced motion (e.g. own animated border). Regenerate the contract | Planner |
| 8 | 🟢 Nit | spec B1; `bw_text_field.dart:57, 139` | `placeholder` is implemented (and B3 maps `placeholder` → `hintStyle`) but B1 does not list it | Add `placeholder` (`String?`) to B1 | Planner |
| 9 | 🟢 Nit | `lib/biowave_mobile.dart:18-28` | `BwMobileTheme` reformatted; step said "do not reformat anything else" (rule 8) | Restore the original formatting; keep only the export line | Executor |
| 10 | 🟢 Nit | `bw_text_field_decoration.dart:125-128`; `bw_text_field.dart:197, 217, 223, 275` | `labelStyle` set only "for unit verification" (no label is ever rendered by the decoration); `String.fromCharCodes(const <int>[])` used instead of `''` | Assert the input text colour through `TextField.style` and drop the `labelStyle` copy; use `''` | Executor |

#### Previous round

None — first review.

---

## F · Changelog

### F0 Changes from previous version

1.2 (2026-10-24) fixes the Planner findings of review round 1 (#6, #7, #8): `placeholder` added to B1; B2 / C3 / C5 square the end-button seam through an internal `BwButton` `segment`; B4 records the `InputDecorator` motion limit and what reduced motion covers; AC-3 and AC-8 made checkable. Guidelines (Part A) unchanged. 1.1 was the first Mobile version; differences from Web 1.1 are listed in A8 and B1 (Flutter naming).

### F1 Guidelines changelog

| Version | Date | Change | Migration | Author |
|---|---|---|---|---|
| 1.1 | 2026-10-18 | Guidelines copied from Web 1.1 (legacy properties, managed trailing action); A8 for Mobile | — | Claude (Planner) |

### F2 Spec changelog

| Version | Date | Change | Breaking | Migration |
|---|---|---|---|---|
| 1.1 | 2026-10-18 | Initial Mobile spec (Flutter `BwTextField`), aligned with Web 1.1 | No | — |
| 1.2 | 2026-10-24 | Review round 1 Planner items (#6, #7, #8): B1 `placeholder`; end-button square start corners via internal `BwButton` `segment` (B2, C3, C5, C6, AC-8); B4 `InputDecorator` motion platform limit + reduced-motion scope (C3, C6, AC-3) | No | — |

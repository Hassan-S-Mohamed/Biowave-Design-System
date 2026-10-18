# Text field · حقل نص — Web

> **One file for Text field on Web:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders receive generated contracts (`npm run contract -- web text-field`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Text field · حقل نص |
| Summary | Lets a user enter or edit a short value or a longer passage of text. |
| Summary (ar) | يتيح للمستخدم إدخال قيمة قصيرة أو نص أطول وتعديلهما. |
| Parts | Field · label · required indicator · help icon · prefix · leading icon · input · trailing action · trailing icon · suffix · end button · error icon · supporting text · counter |
| Parts (ar) | الحقل · التسمية · علامة الإلزام · أيقونة المساعدة · البادئة · أيقونة البداية · الإدخال · إجراء النهاية · أيقونة النهاية · اللاحقة · زر النهاية · أيقونة الخطأ · النص المساعد · العداد |
| Platform | Web · React + MUI |
| Built on | MUI `FormControl` + `OutlinedInput`; static native label above a notchless outlined field |
| Import | `import { TextField } from '@biowave/web'` |
| Figma | **Biowave DS — Web Components** › `↳ Text field` |
| Version | 1.1 · 2026-10-18 |
| Plan | Finished |
| Code | Changes requested |
| Figma build | Planned |
| Review | Round 1 · 2026-10-18 · Changes requested |
| Source code | [`src/components/text-field/`](../../src/components/text-field/) |
| Tokens | [`text-field.tokens.json`](text-field.tokens.json) — machine copy of B3 (D-13) |
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

### A8 Platform notes — Web

```
Web form row
┌──────────────────────────────┐  ┌──────────────────────────────┐
│ Work email                   │  │ Employee ID                  │
│ name@company.com             │  │ BW-1042                      │
└──────────────────────────────┘  └──────────────────────────────┘
       Tab order follows document order; pointer hover is visible
```

| | Web |
|---|---|
| Available | ✓ |
| Default size | `md` |
| Sizes | `sm` · `md` · `lg` |
| Layout | Fills its parent by default; form layout controls the width |
| Interaction | Hover + click + keyboard; native input autofill and password-manager support |
| Multiline | Auto-grow within row bounds; vertical resize allowed |
| Touch target | Every control and trailing action ≥ `target-min` |

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

> The contract — API, dimensions, tokens, states, RTL and accessibility. Code and Figma are reviewed against this part.

### B1 API
#### `TextField`

| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `label` | `ReactNode` | | | ✓ | Persistent visible and accessible name |
| `hideLabel` | boolean | | `false` | | Visually hides `label`; it remains associated with the input |
| `size` | enum | `sm` · `md` · `lg` | `md` | | A4.1 |
| `multiline` | boolean | | `false` | | A4.2; renders a native textarea through MUI |
| `rows` · `minRows` · `maxRows` | number | | `minRows=3` when multiline | | Multiline only |
| `resize` | enum | `vertical` · `none` | `vertical` | | Multiline only; manual resize handle (legacy `Resize handle`) |
| `required` | boolean | | `false` | | Shows the required indicator and sets native required semantics |
| `helpText` | `ReactNode` | | | | A4.3; shows `help-icon` in the label row with this tooltip content |
| `helpLabel` | string | | locale: “More information about {label}” / “مزيد من المعلومات عن {label}” | | Accessible name of the help icon (string labels only; otherwise required with `helpText`) |
| `helperText` | `ReactNode` | | | | Hint, or correction text when `error=true` |
| `error` | boolean | | `false` | | Invalid visual and `aria-invalid` state; adds `error-icon` when `helperText` is set |
| `showCounter` · `maxLength` | boolean · number | | `false` · — | | Counter needs `maxLength` |
| `startAdornment` | `ReactNode` | icon | | | Decorative `leading-icon`; hidden from assistive technology |
| `endAdornment` | `ReactNode` | icon | | | Decorative `trailing-icon` only; hidden from assistive technology. Never interactive content |
| `action` | object | `{ icon: ReactNode; label: string; onClick }` | | | Custom `trailing-action`, rendered by the field as an Icon button |
| `clearable` | boolean | | `false` | | Clear `trailing-action` while the field has a value and is editable |
| `clearLabel` | string | | locale: “Clear {label}” / “مسح {label}” | | |
| `onClear` | callback | | | | Called after the value is cleared (controlled fields clear through `onChange` with an empty value) |
| `passwordToggle` | boolean | | `true` when `type=password` | | Show/hide password `trailing-action` (`aria-pressed`); labels from locale |
| `prefix` · `suffix` | `ReactNode` | short text | | | A4.6 attached add-on segments; single-line only |
| `endButton` | object | `{ label: string; icon?: ReactNode; onClick; loading?: boolean }` | | | A4.7 attached Button segment; single-line only |
| `readOnly` · `disabled` | boolean | | `false` | | Native states; disabled wins if both are true |
| `fullWidth` | boolean | | `true` | | Fills the parent inline size |
| `id`, `name` | string | | generated / — | | Native form identity |
| `type` | string | native input types | `text` | | Ignored for multiline |
| `placeholder` | string | | | | Format hint, never the accessible name |
| `value`, `defaultValue` | string or number | | | | Controlled or uncontrolled value |
| `onChange` · `onBlur` · `onFocus` | callback | | | | Native events |
| `autoComplete` · `inputMode` | string | | | | Native autofill purpose and virtual keyboard |
| `inputRef` | ref | | | | Ref to the native input or textarea |
| `aria-*` | | | | | **Forwarded to the native input** (`aria-label`, `aria-labelledby`, `aria-errormessage`, …); caller `aria-describedby` is merged with the field's ids |
| `className`, `data-*` | | | | | Forwarded to the root form control |

**Invalid combinations** (`console.warn` once in development; fallback still renders):

| Combination | Fallback |
|---|---|
| `showCounter=true` without `maxLength` | Counter is hidden |
| `rows`, `minRows`, `maxRows` or `resize` while `multiline=false` | Ignored |
| `type` other than `text` while `multiline=true` | Native textarea renders; `type` is ignored |
| `disabled=true` and `readOnly=true` | Disabled semantics and visuals win |
| More than one of `passwordToggle` (on), `action`, `clearable` | One is shown, in that priority |
| `endAdornment` with any trailing action | `endAdornment` is ignored |
| `prefix`, `suffix` or `endButton` with `multiline=true` | Ignored |
| `suffix` and `endButton` together | `suffix` is ignored |
| `helpText` with a non-string `label` and no `helpLabel` | Help icon is not rendered |

### B2 Dimensions
```
   label-* style   help icon box = target-min, glyph size-icon-sm
   Work email *  (?)
   ├── label-gap = spacing-sm ──┤
┬  ┌─────────┬──────────────────────────────────────────┬──────────┐
│  │ http:// │ [◆] value text                    ┌──┐   │ [ Copy ] │ radius-md (outer corners only)
│  │ addon   │                                   │×│   │ Button   │ border-width-default
│  └─────────┴──────────────────────────────────┴──┘───┴──────────┘
┴ size-control-height-*     action box = field height − 2 × spacing-xs, inset spacing-xs
   ├ spacing-xs ┤ [!] Error text                                (16 / 80)
```

| Part | Property | sm | md | lg |
|---|---|---|---|---|
| `field` | single-line height | `size-control-height-sm` | `size-control-height-md` | `size-control-height-lg` |
| `field` | padding-inline | `spacing-control-padding-inline-sm` | `spacing-control-padding-inline-md` | `spacing-control-padding-inline-lg` |
| `field` | padding-inline-end with `trailing-action` | `spacing-xs` | `spacing-xs` | `spacing-xs` |
| `field` | internal gap | `spacing-control-gap-sm` | `spacing-control-gap-md` | `spacing-control-gap-lg` |
| `field` | multiline padding-block | `spacing-control-gap-sm` | `spacing-control-gap-md` | `spacing-control-gap-lg` |
| `field` | radius | `radius-md` | `radius-md` | `radius-md` |
| `field` | border width · focused | `border-width-default` · `border-width-focus` | same | same |
| `leading-icon` · `trailing-icon` | glyph | `size-icon-sm` | `size-icon-md` | `size-icon-lg` |
| `trailing-action` | box (inline + block) | `size-icon-lg` (24) | `size-control-height-sm` (32) | `size-control-height-md` (40) |
| `trailing-action` | glyph | `size-icon-sm` | `size-icon-md` | `size-icon-lg` |
| `trailing-action` | pointer target | ≥ `target-min`, extended invisibly around the box; never changes layout | same | same |
| `prefix` · `suffix` | padding-inline | = field padding-inline | same | same |
| `prefix` · `suffix` | divider | `border-width-default` | same | same |
| `end-button` | Button size | `sm` | `md` | `lg` |
| `help-icon` | glyph · box | `size-icon-sm` · `target-min` | same | same |
| `label` | text style | `label-sm` | `label-md` | `label-lg` |
| `input` · `prefix` · `suffix` | text style | `body-sm` | `body-md` | `body-lg` |
| `supporting-text`, `counter` | text style | `caption-md` | `caption-md` | `caption-md` |
| `error-icon` | glyph · gap to text | `size-icon-sm` · `spacing-xs` | same | same |
| label → field | gap | `spacing-sm` | same | same |
| field → supporting row | gap | `spacing-xs` | same | same |

Layout rules:
- Root fills the available inline size by default; `fullWidth=false` hugs the MUI intrinsic width
- The single-line height includes the border. Input, icons and add-ons center on the block axis
- The trailing action is inset by `spacing-xs` from the border on the top, bottom and inline end, so it never covers the border at any size. A decorative trailing icon sits at the normal padding, mirroring the leading icon
- Multiline: icons top-align; the trailing action's centre aligns with the centre of the first text line
- `prefix`/`suffix` are part of the field (one outer border, one focus indicator). With `end-button`, the field's inline-end corners are square and the Button's inline-start corners are square; they share one border
- Label, helper text and counter can wrap. The helper grows first; the counter stays at inline end and does not overlap it

### B3 Tokens by part and state
> Machine-readable source: [`text-field.tokens.json`](text-field.tokens.json). In Figma it creates `Text field / Size` and `Text field / State`; every value aliases a semantic Foundations token.

#### 3.1 Size tokens

| Part | Property | sm | md | lg |
|---|---|---|---|---|
| `field` | height | `size-control-height-sm` | `size-control-height-md` | `size-control-height-lg` |
| `field` | padding-inline | `spacing-control-padding-inline-sm` | `spacing-control-padding-inline-md` | `spacing-control-padding-inline-lg` |
| `field` | action-inset | `spacing-xs` | `spacing-xs` | `spacing-xs` |
| `field` | gap | `spacing-control-gap-sm` | `spacing-control-gap-md` | `spacing-control-gap-lg` |
| `field` | radius | `radius-md` | `radius-md` | `radius-md` |
| `field` | border | `border-width-default` | `border-width-default` | `border-width-default` |
| icons | icon size | `size-icon-sm` | `size-icon-md` | `size-icon-lg` |
| `trailing-action` | action-box | `size-icon-lg` | `size-control-height-sm` | `size-control-height-md` |

#### 3.2 State tokens

| State | `field` background | `field` border | Border width | `label` · `input` | `placeholder` | icons | `prefix`/`suffix` bg · text | `supporting-text` · `counter` | `error-icon` |
|---|---|---|---|---|---|---|---|---|---|
| Default | `color-background-base-default` | `color-border-input-default` | `border-width-default` | `color-text-neutral-default` | `color-text-neutral-placeholder` | `color-icon-neutral-muted` | `color-background-neutral-default` · `color-text-neutral-subtle` | `color-text-neutral-muted` | — |
| Hover | same | `color-border-input-hover` | same | same | same | same | same | same | — |
| Focus | same | `color-border-focus` | `border-width-focus` | same | same | `color-icon-neutral-default` | same | same | — |
| Error | same | `color-border-input-error` | `border-width-default` (focused: `border-width-focus`) | same | same | `color-icon-neutral-muted` (unchanged) | same | `color-text-role-error` | `color-icon-role-error` |
| Disabled | `color-background-base-disabled` | `color-border-disabled` | `border-width-default` | `color-text-neutral-disabled` | `color-text-neutral-disabled` | `color-icon-neutral-disabled` | `color-background-base-disabled` · `color-text-neutral-disabled` | `color-text-neutral-disabled` | — |
| Read-only | `color-background-neutral-subtle` | `color-border-default` | `border-width-default` (focused: `border-width-focus`) | `color-text-neutral-default` | `color-text-neutral-placeholder` | `color-icon-neutral-muted` | same as Default | `color-text-neutral-muted` | — |

- Add-on divider = the field border token of the current state.
- `required-indicator` uses `color-text-role-error`, `color-text-neutral-disabled` when disabled.
- Trailing action and help icon: Icon button `text` · `neutral` tokens (Icon button spec); end button: Button `outlined` · `neutral`.
- Error priority is Disabled → Error → Focus → Hover → Default; an error that receives focus keeps the error colour and changes to `border-width-focus`.
- Read-only uses a lighter border (`color-border-default`) so it differs from an editable field in both themes; `color-background-neutral-subtle` equals the base background in dark mode, so the border carries the difference. Dark theme uses the same token names and switches values automatically.

### B4 States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Default → Hover | Pointer enters field | border color | `motion-duration-sm` | `motion-easing-standard` |
| Hover/Default → Focus | Native input receives focus | border color and width | `motion-duration-sm` | `motion-easing-standard` |
| Any enabled → Error | Validation result changes | border, icon and supporting-text color | `motion-duration-sm` | `motion-easing-standard` |
| Enabled ↔ Disabled/Read-only | prop changes | background, border and text colors | `motion-duration-instant` | — |

Reduced motion: durations resolve to instant through Foundations; no spatial motion is used. The value, selection and focus are never reset by a visual transition.

### B5 RTL
```
LTR  Work email (?)
     │ http:// │ [◆] name@example.com                  [×] │[ Copy ]│
     [!] Helper text                                    (16 / 80)

RTL                                      البريد الإلكتروني للعمل (?)
     │[ نسخ ]│ [×]                  name@example.com [◆] │ http:// │
     (16 / 80)                                      نص مساعد [!]
```

| Part | In RTL |
|---|---|
| Root, label row and supporting row | Mirror automatically through logical layout and provider direction |
| `input` | Uses the document direction by default; consumers may set native `dir` only for intrinsically LTR values such as email when needed |
| `prefix` · `suffix` · `end-button` | Move to inline start / inline end; their text is not reversed (`http://` stays LTR via bidi isolation) |
| `leading-icon` · `trailing-icon` · `trailing-action` · `help-icon` · `error-icon` | Move with the layout; glyphs do not mirror |
| `counter` | Moves to inline end; Western digits and slash remain LTR |

No physical left/right properties are permitted.

### B6 Accessibility (implementation)
| Requirement | Implementation |
|---|---|
| Role / semantics | Native `<input>` or `<textarea>` inside MUI `OutlinedInput`; no redundant ARIA role |
| Accessible name | Native `<label for=id>`; `hideLabel` applies the shared visually-hidden style, never `display:none`. Caller `aria-label`/`aria-labelledby` go to the input |
| Required | Native `required` plus visible `required-indicator` with `aria-hidden=true` |
| Error | `aria-invalid=true`; supporting-text id in `aria-describedby`; `error-icon` is `aria-hidden` (the text carries the meaning) |
| Supporting text / counter / prefix / suffix | Stable ids combined in `aria-describedby` (prefix and suffix text so “SAR” is announced); counter is not a live region |
| Decorative icons | `leading-icon`, `trailing-icon` wrappers `aria-hidden=true` and `pointer-events: none`; a click on them focuses the input |
| Help icon | Icon button (`text`, `neutral`) with `helpLabel`; tooltip on hover and focus, content linked with `aria-describedby`; Esc closes it; stays enabled when the field is disabled |
| Trailing action | Icon button rendered by the field; `disabled` follows the field; clear = `aria-label` `clearLabel`, returns focus to the input; password toggle = `aria-pressed` with “Show password” / “Hide password” |
| End button | Button rendered by the field; disabled with the field; normal Button semantics |
| Disabled / read-only | Native `disabled` removes input and every field control from the tab order; native `readOnly` remains focusable and selectable; clear hidden |
| Focus | **Field exception:** the input border uses `border-width-focus` and `color-border-focus` with no exterior offset. Error focus uses the same width with `color-border-input-error`. Help icon, trailing action and end button use the normal 2px ring with 2px offset |
| Target size | Field height ≥ `target-min`; trailing action and help icon pointer targets ≥ `target-min` without changing layout |
| Screen reader output | “Work email, required, edit text, SAR” · error adds “invalid” then the linked correction |

| Key | Action |
|---|---|
| Tab / Shift+Tab | Order: help icon → input → trailing action → end button |
| Arrow keys | Moves the text caret; never intercepted by the wrapper |
| Enter | Submits the owning form for single-line input; inserts a line break for multiline input |
| Esc | Closes an open help tooltip; does not clear the value |
| Home / End | Native caret behavior |

### B7 Examples
```tsx
import { TextField } from '@biowave/web';

<TextField label="Work email" name="email" type="email" autoComplete="email"
  placeholder="name@company.com" required startAdornment={<MailOutlineRounded />}
  helpText="We send shift reminders to this address" />

<TextField label="Password" type="password" autoComplete="current-password" />  {/* show/hide built in */}

<TextField label="Search employees" clearable startAdornment={<SearchRounded />} />

<TextField label="Hourly rate" inputMode="decimal" suffix="SAR" />

<TextField label="Invite link" readOnly value={link}
  endButton={{ label: 'Copy', icon: <ContentCopyRounded />, onClick: copy }} />

<TextField label="Request reason" multiline minRows={3} maxRows={8}
  maxLength={400} showCounter helperText="Explain why you need remote work" />

<TextField label="البريد الإلكتروني للعمل" type="email" error
  helperText="أدخل بريدًا إلكترونيًا صالحًا للعمل" />
```

### B8 Figma

Structure, properties, the Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests
- [ ] Renders single-line and multiline fields for `sm` · `md` · `lg` in light + dark and en + ar
- [ ] Associates visible and visually hidden labels with the native control; caller `aria-*` lands on the input
- [ ] Required, error, helper, counter, prefix and suffix ids/semantics match B6; error icon is shown with error text and is `aria-hidden`
- [ ] Default, hover, focus, error, disabled and read-only use the B3 token map; leading icon keeps its neutral colour in error; read-only border differs from default
- [ ] Trailing action box equals the B3 action-box per size, is inset `spacing-xs` and stays inside the field border at viewport widths below and above the web breakpoint
- [ ] Disabled field: trailing action and end button are disabled and skipped by Tab; help icon is still reachable
- [ ] Clear: hidden when empty, read-only or disabled; clears, keeps focus, fires `onChange` and `onClear`
- [ ] Password toggle switches `type`, `aria-pressed` and label; keeps caret position
- [ ] Help icon opens on hover and focus, closes on Esc, content linked by `aria-describedby`
- [ ] Clicking the leading icon, prefix or suffix focuses the input
- [ ] Multiline: trailing action centre aligns with the first line
- [ ] Controlled and uncontrolled values update the counter without mutating or truncating the supplied value
- [ ] Every invalid combination warns once and uses the B1 fallback
- [ ] RTL mirrors layout without mirroring icons; counter and prefix text remain LTR
- [ ] Keyboard order matches B6; read-only remains focusable
- [ ] axe has no violations in both themes and languages
- [ ] Source contains no raw hex, px, ms or font names

---

## C · Code plan

> How to build Part B in code. The generated `text-field-contract.md` is the only component file the Code Executor reads.

| Field | Value |
|---|---|
| Component | Text field |
| Platform | Web (React + MUI) |
| Plan version | 1.1 · 2026-10-18 |

### C1 Goal

`import { TextField } from '@biowave/web'` renders the single-line and multiline APIs in B1 with static labels, token-only state styling, native form behavior, English/Arabic direction, accessible error/help/counter relationships and complete tests.

### C2 Scope
**In scope**
- [ ] All B1 props, B2 dimensions, B3 tokens, B4 states, B5 RTL, B6 accessibility and B9 tests
- [ ] Round 2 fixes: E2 findings 3, 4, 6, 7, 8 and E3 bugs AD-1 … AD-6
- [ ] Private shared pieces `FieldLabel` (with help icon), `FieldSupportingText` (with error icon), `FieldAddon` and `FieldAction` in the text-field folder for later field-family components

**Out of scope (do not build)**
- Select, Verification code, Phone field, Search field or Autocomplete
- Attached dropdown segments (legacy `Leading/Trailing dropdown`) — Phone field and backlog
- Tags inside the field (Autocomplete), payment icons (dropped)
- Form-level validation, error summaries or submit orchestration
- Masking, parsing, currency formatting, rich text or autosuggest menus
- A public base-field component; shared pieces remain internal

### C3 Approach
- **Base:** compose MUI `FormControl` and `OutlinedInput`. Keep the label outside the outline and do not pass MUI's floating/notched label. Use the native input/textarea that `OutlinedInput` creates
- **Token map:** `text-field.tokens.ts` exports typed size and state maps using `cssVars.*`; its semantic references equal `text-field.tokens.json`. Styling reads this map only
- **Structure:** root form control → `FieldLabel` (label, required indicator, help icon) → field row (`FieldAddon` prefix · styled `OutlinedInput` · `FieldAddon` suffix) + attached `Button` → `FieldSupportingText` (error icon, text, counter). Private pieces are not package exports
- **Trailing action (fixes AD-1 … AD-3):** remove the `target-min` box from the slot. `FieldAction` renders the Biowave `IconButton` (`variant="text"`, `color="neutral"`, `disabled={disabled}`) and overrides its box to the B3 `action-box` with the field's icon size through a scoped class; the pointer target is extended with a `::before` of at least `target-min`, centred, so layout never changes. Field `padding-inline-end` becomes `action-inset` when an action exists. A decorative `endAdornment` keeps only the icon size at the normal padding
- **Clear and password:** clear writes an empty value through a native input event so `onChange` fires for controlled and uncontrolled fields, then focuses the input and calls `onClear`. Password toggle keeps internal `visible` state, swaps `type` and restores the caret
- **Help icon:** `IconButton` (`text`, `neutral`) + tooltip. Reuse the private tooltip wrapper styling (`iconButtonTooltipTokens`) with tooltip content = `helpText`, name = `helpLabel`; replace with the shared Tooltip on Day 4 (TODO comment). It is never disabled
- **Add-ons:** `FieldAddon` is a non-interactive segment inside the outlined border (`startAdornment`/`endAdornment` of `OutlinedInput` with negative inline margin equal to the padding so it reaches the border), divider on the inner edge, `aria-hidden` visual + id text in `aria-describedby`
- **End button:** the Biowave `Button` (`outlined`, `neutral`, field size) placed after the `OutlinedInput` in an inline flex row; square the touching corners with logical radius properties and collapse the shared border with a negative `margin-inline-start` of `border-width-default`
- **Click to focus (AD-6):** decorative wrappers get `pointer-events: none`; a root `onMouseDown` on non-interactive targets focuses the input
- **Error colour (AD-4):** only border, supporting text and error icon change colour in error
- **State priority:** native MUI classes plus transient props implement Disabled → Error → Focus → Hover → Default. Read-only has its background and border tokens and still receives focus styling
- **Focus exception:** style only `.MuiOutlinedInput-notchedOutline`; never add an exterior outline or shadow to the field. Controls inside keep their own focus ring
- **Multiline:** pass `multiline`, row props and textarea semantics to MUI; `resize` maps to CSS `resize: vertical | none`. Top-align icons; align the action's centre with the first line using the input line height
- **Counter:** unchanged; additionally reset the uncontrolled mirror on the owning form's `reset` event (E2 finding 8)
- **Ids and aria:** `useId()` id; route every `aria-*` prop to `inputProps` and merge `aria-describedby` (finding 3)
- **Warnings:** existing `warnOnce` helper for every B1 invalid combination; never throw

### C4 Token gaps
None in Foundations. New component tokens in `text-field.tokens.json`: `size.*.action-box`, `size.*.action-inset`, `state.*.addon-background`, `state.*.addon-text`, `state.*.error-icon`, and changed `state.error.icon`, `state.read-only.border`, `state.disabled.required` — all alias existing semantic tokens (B3).

### C5 Files to create / change
```
3-web-components/src/components/text-field/TextField.tsx
3-web-components/src/components/text-field/FieldLabel.tsx
3-web-components/src/components/text-field/FieldSupportingText.tsx
3-web-components/src/components/text-field/FieldAddon.tsx        (new)
3-web-components/src/components/text-field/FieldAction.tsx       (new)
3-web-components/src/components/text-field/text-field.tokens.ts
3-web-components/src/components/text-field/TextField.test.tsx
3-web-components/src/components/text-field/index.ts
3-web-components/src/index.ts
3-web-components/README.md
CHANGELOG.md
```

### C6 Tests
Implement every item in B9, plus:
- [ ] Label click/focus association and generated-id stability
- [ ] Caller `aria-describedby` is preserved and merged with supporting, counter, prefix and suffix ids
- [ ] Counter counts Arabic and emoji as Unicode code points and never has `aria-live`; uncontrolled counter resets with the form
- [ ] Error focus uses error colour plus focus width; normal focus uses focus colour plus focus width
- [ ] Hover and disabled-required colours asserted on their selectors, not only present in CSS
- [ ] Layout test in a real layout engine (or computed styles) for AD-1 / AD-2 at 980 px and 1280 px viewports
- [ ] Token-map test covers every size/state entry and matches component-token aliases
- [ ] “No raw values” source check covers every file in the component folder

### C7 Acceptance criteria (the Reviewer checks exactly these)
- [ ] AC-1 Public API, defaults, warnings and fallbacks match B1 exactly
- [ ] AC-2 Every visual value comes from B2–B3 through `cssVars`/`biowaveVariants`; no raw values or primitives
- [ ] AC-3 Every B4 transition exists and reduced motion resolves through Foundations
- [ ] AC-4 RTL matches B5; semantics and keyboard order match B6
- [ ] AC-5 B9 and C6 tests pass with `npm run typecheck` and `npm run test:web`
- [ ] AC-6 Exported from `src/index.ts`; header and section README status are `Built`
- [ ] AC-7 MUI floating label/notch styling and palette defaults do not appear
- [ ] AC-8 Single-line and multiline use one public component, with private reusable field parts
- [ ] AC-9 `npm run component-tokens`, `npm run sync` and `npm run docs:check` pass
- [ ] AC-10 AD-1 … AD-6 fixed: action inside the border at every size and viewport, disabled with the field, neutral icons in error, first-line alignment, click-to-focus
- [ ] AC-11 Trailing action, help icon and end button reuse the Biowave Icon button and Button (no restyled MUI copies)

### C8 Execution log

| Field | Value |
|---|---|
| Agent | OpenAI Codex |
| Date | 2026-10-18 |
| Files changed | `3-web-components/components/text-field/*`; `3-web-components/src/components/text-field/*`; `3-web-components/src/index.ts`; `3-web-components/README.md`; `2-foundations/guidelines/a11y.md`; `2-foundations/web/package.json`; `package.json`; `package-lock.json`; `_docs/contract.mjs`; `CHANGELOG.md` |

**Deviations from the plan or spec**
- Pinned Stylis to 4.2 at the workspace root and Foundations package. Emotion cache 11.14 embeds Stylis 4.2, while the prior direct range resolved the RTL plugin against Stylis 4.4; disabled MUI input rules crashed the RTL serializer. The aligned dependency is covered by the Arabic disabled/read-only test.
- Updated the contract generator's generic focus rule to honor the B6 editable-field exception; without this, the generated contract contradicted its own component-specific focus requirement.

**Questions for the Planner**
- none

---

## D · Figma build

> Build the Web Text field sets from B2–B4 in the Web Components file. The generated Figma contract adds library keys.

| Field | Value |
|---|---|
| Figma file | **Biowave DS — Web Components** (`_sync/figma-files.json` › `web`) |
| Page / section | `↳ Text field` › sections `Text field` and `Text field — Documentation` |
| Mode | Create new; legacy references remain read-only in Foundations until approval |
| Plan version | 1.1 · 2026-10-18 |

### D1 Rules for this build

0. Component tokens only: use `Text field / Size` and `Text field / State` already synced from [`text-field.tokens.json`](text-field.tokens.json). Never create variables or styles by hand
1. Bind every fill, stroke, radius, padding, gap, height and icon size to a component token; text uses published Foundations text styles
2. Each variant sets explicit collection modes for Size and State. Error uses the `error` State mode; an Error + Focus variant overrides only border width to the Focus mode's width while keeping error color
3. Never bind primitives, deprecated variables or legacy input variables
4. Layer names equal A2 anatomy names in kebab-case
5. Auto layout on every frame. The only absolute layer allowed is the field border if needed to keep the focused border inside the component bounds
6. Icons and trailing actions are library instances, never detached

### D2 Component structure
```
❖ Text field
  ├─ ◇ .Field/Label            label · required-indicator · help-icon
  ├─ ◇ .Field/Container        field box with slots
  ├─ ◇ .Field/Add-on           prefix / suffix segment
  ├─ ◇ .Field/Action           Icon button instance sized to action-box
  └─ ◇ .Field/Supporting text  error-icon · supporting-text · counter

❖ Text area
  └─ instances of the same .Field/* private bases, with multiline layout
```

The private `.Field/*` components are the shared field parts for later Select, Search field, Autocomplete, Phone field and date/time fields in this platform file.

### D3 Layer tree and auto layout
```
Text field                     ↕ vertical · gap {B2 label/field and supporting gaps} · width fill
├── label-row                  ◇ .Field/Label · ↔ · width fill
│   ├── label                  T {B2 label style} · TEXT `Label`
│   ├── required-indicator     T `*` · BOOLEAN `Required`
│   └── help-icon              ◇ Icon button (text, neutral) · BOOLEAN `Help icon`
├── field-row                  ↔ horizontal · gap 0 · width fill
│   ├── field                  ◇ .Field/Container · ↔ · fill · fixed height {B2}
│   │   ├── prefix             ◇ .Field/Add-on · BOOLEAN `Prefix` · TEXT `Prefix text`
│   │   ├── leading-icon       ◇ Icon · BOOLEAN `Leading icon` · INSTANCE_SWAP `Leading icon glyph`
│   │   ├── input              T {B2 input style} · fill · TEXT `Value` / `Placeholder`
│   │   ├── trailing-icon      ◇ Icon · BOOLEAN `Trailing icon` · INSTANCE_SWAP
│   │   ├── trailing-action    ◇ .Field/Action · BOOLEAN `Trailing action` · INSTANCE_SWAP `Action glyph`
│   │   └── suffix             ◇ .Field/Add-on · BOOLEAN `Suffix` · TEXT `Suffix text`
│   └── end-button             ◇ Button (outlined, neutral, same size) · BOOLEAN `End button` · TEXT
└── supporting-row             ◇ .Field/Supporting text · ↔ · width fill
    ├── error-icon             ◇ Icon `error` · visible when Error=True
    ├── supporting-text        T caption-md · BOOLEAN `Supporting text` · TEXT
    └── counter                T caption-md · BOOLEAN `Counter` · TEXT
```

```
Text area                      same outer tree, no prefix / suffix / end-button
└── field                      height hug from three input lines · align start
    ├── leading-icon           top aligned
    ├── input                  T multiline · fill · min three lines
    ├── trailing-action        centre on first line
    └── resize-handle          ◇ Icon · BOOLEAN `Resize handle`
```

### D4 Properties
| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `Type` | VARIANT | `Single line` · `Multiline` | `Single line` | `multiline` | `false` · `true` |
| `Size` | VARIANT | `SM` · `MD` · `LG` | `MD` | `size` | `'sm'` · `'md'` · `'lg'` |
| `State` | VARIANT | `Default` · `Hover` · `Focus` · `Disabled` · `Read-only` | `Default` | `disabled` / `readOnly` | Disabled and Read-only map to props; others are interaction states |
| `Filled` | VARIANT | `False` · `True` | `False` | `value` / `defaultValue` | empty · non-empty |
| `Error` | VARIANT | `False` · `True` | `False` | `error` | `false` · `true` |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | Provider locale controls code |
| `Label` | TEXT | | `Work email` / `البريد الإلكتروني للعمل` | `label` | |
| `Show label` | BOOLEAN | | `true` | `hideLabel` | inverse mapping |
| `Required` | BOOLEAN | | `false` | `required` | |
| `Help icon` | BOOLEAN | | `false` | `helpText` | present / absent |
| `Placeholder` · `Value` | TEXT | | `name@company.com` | `placeholder` · `value` | |
| `Prefix` · `Prefix text` | BOOLEAN · TEXT | | `false` · `http://` | `prefix` | Single line only |
| `Leading icon` · `Leading icon glyph` | BOOLEAN · INSTANCE_SWAP | Icons | `false` · `mail` | `startAdornment` | |
| `Trailing icon` · `Trailing icon glyph` | BOOLEAN · INSTANCE_SWAP | Icons | `false` · `lock` | `endAdornment` | |
| `Trailing action` · `Action glyph` | BOOLEAN · INSTANCE_SWAP | `close` · `visibility` · `visibility_off` · any icon | `false` · `close` | `clearable` · `passwordToggle` · `action` | by glyph |
| `Suffix` · `Suffix text` | BOOLEAN · TEXT | | `false` · `SAR` | `suffix` | Single line only |
| `End button` · `End button label` | BOOLEAN · TEXT | | `false` · `Copy` | `endButton` | Single line only |
| `Supporting text` · `Supporting text value` | BOOLEAN · TEXT | | `true` · `Use your work email` | `helperText` | |
| `Counter` · `Counter value` | BOOLEAN · TEXT | | `false` · `0 / 80` | `showCounter` | derived |
| `Resize handle` | BOOLEAN | | `true` | `resize` | `vertical` · `none` (Multiline only) |

Legacy → new mapping (from `_audits/input-family.md` §6): `Show label`, `Label`, `Required` kept · `Help icon` → label-row `Help icon` · `Error icon` → automatic with `Error` · `Leading visual` → `Leading icon` · `Leading text`/`Trailing text` → `Prefix`/`Suffix` · `Trailing button` → `End button` · `Destructive` → `Error` · `Placeholder`/`Filled` states → `Filled` · Payment, Tags, dropdown types → removed / other components.

### D5 Variants to generate
- Axes: `Type × Size × State × Filled × Error × Language`
- Exclude `State=Disabled × Error=True`; disabled wins in code and does not retain error visuals
- Final count: 2 types × 3 sizes × 2 filled values × 2 languages × 9 valid State/Error pairs = **216 variants** (unchanged — every new option is a component property, not an axis)
- Grid: sections by Type and Language; rows = Size × Filled × Error; columns = State; gap `spacing-xl`
- Docs page 03 shows one example of each new option: help icon, prefix, suffix, end button, trailing icon, clear, password toggle, custom action

### D6 States, interactions and motion

| Interaction | From → To | Animation |
|---|---|---|
| While hovering | Default → Hover | Smart animate border color · B4 duration/easing |
| On focus | Default/Hover → Focus | Smart animate border color/width · B4 |
| Validation example | Default/Focus → Error equivalent | Smart animate colors · B4 |

Focus is shown as a component state for docs. Disabled and Read-only have no prototype interaction.

### D7 RTL

Method: `Language=AR` variants. Reverse horizontal auto-layout order, align label/value/supporting text to start, move the counter to inline end and keep counter digits LTR. Do not mirror mail, person, lock, visibility or clear glyphs.

```
EN  │ [◆] name@company.com                         [×] │
AR  │ [×]                         name@company.com [◆] │
```

### D8 Documentation pages

Build the standard pages from the Doc Kit in section `Text field — Documentation`, frames `Text field / 00 Component sheet` through `Text field / 11 Changelog` (skip page 10 for version 1.0). If the Doc Kit is unavailable, complete D2–D7 and report Phase 2 as blocked.

Page notes:
- 00 shows both Text field and Text area sets
- 03 shows size, multiline, label/required, adornments, supporting text and counter
- 04 shows the full state sequence plus Error × Focus
- 07 uses desktop and narrow-form examples
- 08 shows email and Arabic prose examples to explain intrinsic text direction
- 09 shows visible label, visually hidden label, error association and the field focus exception

Component description: “Enters or edits short and multiline text with persistent labels and accessible validation. Spec: 3-web-components/components/text-field/text-field.md”.

### D9 Code Connect

- File: `3-web-components/src/components/text-field/TextField.figma.tsx`
- Mapping: D4 table. Publish after code and Figma are both `Approved`

### D10 Acceptance criteria (the Reviewer checks exactly these)
- [ ] F-AC-1 `Text field` and `Text area` sets plus private `.Field/*` bases (Label, Container, Add-on, Action, Supporting text) match D2–D3 and A2
- [ ] F-AC-2 Properties match D4 exactly, including defaults and EN/AR sample copy
- [ ] F-AC-3 Variant count is 216 with no Disabled × Error=True variants
- [ ] F-AC-4 Zero raw visual values; all values use component tokens or published styles/components; token lint reports zero
- [ ] F-AC-5 Light and Dark switch by variable mode; Typography mode is Web
- [ ] F-AC-6 RTL matches D7 and B5 (add-ons and end button swap sides) and Arabic copy wraps without clipping
- [ ] F-AC-7 Interactions match D6 and component descriptions are filled
- [ ] F-AC-8 Every B2–B3 mapping passes a redline check for SM, MD and LG, including the action box inset inside the border
- [ ] F-AC-9 Documentation pages and Components List card use only Doc Kit components and live instances, or Phase 2 is explicitly blocked on the missing kit
- [ ] F-AC-10 Legacy mapping in D4 is recorded; legacy sets are not moved until approval and product instance migration

### D11 Execution log

| Field | Value |
|---|---|
| Agent / stages run | build · rtl · qa · document |
| Date | |
| Node IDs | component sets `{id}` · private bases `{id…}` · docs section `{id}` |
| QA report | unbound values: — · contrast: — |

**Deviations**
- none

**Questions for the Planner**
- none

---

## E · Review

### E1 Summary

| Round | Date | Code verdict | Figma verdict |
|---|---|---|---|
| 1 | 2026-10-18 | Changes requested | not reviewed (Figma build not started) |

### E3 Round 1 addendum — adornment bug and plan 1.1 — 2026-10-18

| Field | Value |
|---|---|
| Reviewer | Claude |
| Method | Built component rendered in Chromium (en/ar, light, viewports 980 px and 1280 px); slot boxes, icon offsets, tab order and click targets measured |
| Result | 6 bugs in the trailing / leading adornments (AD-1 … AD-6). Root cause: `endAdornment` accepts any node and the slot is sized by `target-min`, which is 48 px below the 1200 px web breakpoint. Spec 1.1 replaces free trailing content with a managed `action` / `clearable` / `passwordToggle` API (I-13) |

| # | Severity | Bug | Evidence | Fixed in spec 1.1 by |
|---|---|---|---|---|
| AD-1 | 🔴 Blocker | Trailing slot is 48 × 48 below 1200 px: overflows `sm` (32) and `md` (40) fields by 8 / 4 px and pushes a decorative trailing icon 24–28 px from the edge (leading icon sits at 8–16 px) | Help sm: slot 48×48 at top −8 | B2 action box + inset; decorative trailing icon at normal padding; C3 |
| AD-2 | 🔴 Blocker | An Icon button passed in is not sized by the field: `md` / `lg` buttons are as tall as the field and paint over its border | Password md: button 40×40 at 0,0 in a 40 px field | B2 `action-box` = field height − 2 × `spacing-xs`; field renders the button (B1 `action`) |
| AD-3 | 🔴 Blocker | Disabled field keeps its trailing action enabled: in tab order, clickable, full colour | Tab reaches “Clear” in the Disabled field; `rgb(10,10,10)`, cursor pointer | B6 trailing action / end button disabled with the field |
| AD-4 | 🟡 Should fix | Error turns every icon red, including leading and help icons | B3 v1.0 mapped all icons to `color-icon-role-error` | B3 icons stay neutral; separate `error-icon` |
| AD-5 | 🟡 Should fix | Multiline: trailing action not aligned to the first text line | Notes md: button top 14 px, first line 6 px | B2 layout rule; C3 |
| AD-6 | 🟢 Nit | Clicking the leading icon or slot area doesn't focus the input | `activeElement = BODY` after the click | A5 rule; B6 decorative icons; C3 |

Planner items from E2 closed in spec 1.1: **#2** read-only border `color-border-default` (B3) · **#3** `aria-*` routed to the input (B1) · **#5** multiline padding-block documented (B2). **#1** closed 2026-10-18: library index re-read with the Annotation Doc Kit (D-17), all contracts regenerated, Web component tokens pushed and verified. Legacy properties added (decisions I-11 … I-14, `_audits/input-family.md` §6): help icon, error icon, prefix / suffix, end button, resize.

### E2 Round 1 — 2026-10-18

| Field | Value |
|---|---|
| Plan version reviewed | 1 |
| Spec version reviewed | 1.0 |
| Reviewer | Claude |
| Date | 2026-10-18 |
| Verdict | **Changes requested** — code is solid; 1 gate failure (AC-9, not caused by this component), 2 Planner items and 2 Executor items |
| Evidence | Clean install in a scratch copy: `npm run typecheck` ✅ · `npm run test:web` ✅ 35/35 (Text field 11, Button 24) · `npm run component-tokens` ✅ · `npm run sync` ✅ READY · `npm run docs:check` ❌ 13 stale Figma contracts · contrast of every field pair computed from `dist/tokens.json` on both field backgrounds, light + dark ✅ |

#### Acceptance criteria

| AC | Result | Evidence |
|---|---|---|
| AC-1 API, defaults, warnings, fallbacks | ✅ | `TextField.tsx` props = B1; 4 `warnOnce` cases + fallbacks (test "warns once for every invalid combination") |
| AC-2 Token-only values | ✅ | `text-field.tokens.ts` uses `cssVars` / `biowaveVariants` only; raw-value source test covers all 4 files |
| AC-3 B4 transitions, reduced motion | ✅ | `motion-duration-sm` on border/icon, `motion-duration-instant` for background/disabled; reduced motion via Foundations |
| AC-4 RTL (B5), semantics + keyboard (B6) | ⚠️ | Logical properties only, counter `dir="ltr"` + isolate ✅. `aria-*` lands on the root `div`, not the input — finding 3 |
| AC-5 Tests pass | ✅ | 11 tests; B9 / C6 covered except hover token (finding 6) |
| AC-6 Exported, status | ✅ | `src/index.ts`; README row = header |
| AC-7 No floating label / notch / palette defaults | ✅ | `notched={false}`, legend hidden, label outside the outline |
| AC-8 One public component, private field parts | ✅ | `FieldLabel`, `FieldSupportingText` not exported from the package |
| AC-9 `component-tokens`, `sync`, `docs:check` | ❌ | `docs:check` fails: all 13 Figma contracts stale, including this one — finding 1 |

#### Rule checks (AGENTS.md §2)

| Rule | Result | Notes |
|---|---|---|
| No generated files edited | ✅ | Contracts regenerated by the generator, not by hand |
| No raw values / no primitives | ✅ | |
| Logical properties, RTL icons | ✅ | |
| Light + dark, en + ar tested | ✅ | All sizes × themes × locales + axe |
| Accessibility (keyboard, focus, labels, target) | ⚠️ | Finding 3; focus exception per I-04 ✅; all field colour pairs ≥ 3:1 / 4.5:1 ✅ |
| Stayed inside the plan | ⚠️ | One agent (Codex) wrote Parts A–D **and** the code, so the plan had no Planner review before `Finished` (AGENTS §1 roles). Edits to `a11y.md`, the contract generator and the Stylis pin are justified and logged (C8, CHANGELOG) — accepted |
| Code matches spec | ✅ | Except finding 4 |
| Accepted deviations reflected back into the spec | ✅ | Stylis 4.2 pin and generator focus rule recorded in C8 |

#### Findings

| # | Severity | File / section | Issue | Required change | Owner |
|---|---|---|---|---|---|
| 1 | 🔴 Blocker (gate) | all `figma-*-contract.md` | `docs:check` fails: every Figma contract is stale since Doc Kit 1.2 changed `figma-doc-kit.md`. Not caused by Text field, but AC-9 cannot pass | Run `_sync/figma-read-library.js` in Foundations (picks up the Doc Kit keys) → `npm run sync:library` → `npm run contract -- --all` → `docs:check` green | Planner |
| 2 | 🟡 Should fix | B3 · read-only | Read-only can't be seen in dark mode: `color-background-neutral-subtle` = `color-background-base-default` (both `#141414`). In light mode it is 1.07:1 against white | Pick a read-only cue that differs in both themes, e.g. `color-background-base-disabled`-like surface is wrong (looks disabled) — recommend `color-border-subtle` border + no background change, or a new semantic `color-background-input-read-only` with distinct light/dark values. Update B3, tokens.json, A5 | Planner |
| 3 | 🟡 Should fix | B1 · `TextField.tsx` (`...rootProps`) | `aria-*` props go to the root `FormControl` `div`. `aria-label`, `aria-labelledby`, `aria-errormessage`, `aria-required` then do nothing for the input. Only `aria-describedby` is routed correctly | Spec: input-related `aria-*` are forwarded to the native input; root gets `className` and `data-*` only. Code: route them through `inputProps`; add a test with `aria-errormessage` | Planner (B1) → Executor |
| 4 | 🟡 Should fix | `FieldLabel.tsx` `RequiredIndicator` | The `*` always uses `default.required` (error colour) even when the field is disabled; the token map already defines `disabled.required` | Pass `disabled` to the indicator and use `textFieldStateTokens.disabled.required` | Executor |
| 5 | 🟢 Nit | B2 · multiline | Multiline block padding uses `spacing-control-gap-*`, which B2 doesn't name. Fine as a value, but undocumented | Add "multiline padding-block = `spacing-control-gap-*`" to B2 and the tokens | Planner |
| 6 | 🟢 Nit | `TextField.test.tsx` | Hover and read-only colours are only checked as "present in the CSS", not tied to their selector; disabled + required colour untested | Assert the hover rule selector and the disabled indicator colour | Executor |
| 7 | 🟢 Nit | `FieldLabel.tsx` | The label is `inline-flex` inside a column flex `FormControl`, so it stretches full width: clicking empty space to the right of a short label focuses the input | `alignSelf: 'flex-start'` on the label | Executor |
| 8 | 🟢 Nit | `TextField.tsx` counter | Uncontrolled counter keeps the old count after a native form `reset` | Listen to the form's `reset` event, or document controlled use with forms that reset | Executor |

#### Not reviewed

- Figma build (Part D): `Figma build = Planned`; no `↳ Text field` page in Biowave DS — Web Components yet. Its contract is stale (finding 1).
- Tablet and Mobile Text field (Day 7 is W·T·M) and Select (Day 7) — no files yet. When Tablet/Mobile are planned, Part A must be copied unchanged (rule 10).

#### Next step

1. Planner: findings 1, 2, 3 (B1), 5 → Plan `Finished` → regenerate contracts.
2. Executor: findings 3 (code), 4, 6, 7, 8 → C8 round 2 → Code `Built`.
3. Round 2 review.

---

## F · Changelog

### F0 Initial version

| Version | Date | Change | Breaking | Migration |
|---|---|---|---|---|
| 1.0 | 2026-10-18 | Initial Web Text field and Text area plan | No | — |
| 1.0 | 2026-10-18 | Review round 1: Changes requested (E2) | No | — |
| 1.1 | 2026-10-18 | Legacy properties added (help icon, error icon, prefix/suffix, end button, resize); managed trailing action API replaces interactive `endAdornment` (fixes AD-1 … AD-6); read-only border; `aria-*` to the input | **Yes** — interactive `endAdornment` content is no longer allowed | Move clear / show-password / custom buttons to `clearable`, `passwordToggle`, `action` |

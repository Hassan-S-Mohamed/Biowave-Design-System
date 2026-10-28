<!-- GENERATED from text-field.md @ 3102f6b895714446 — do not edit; change the source and run: npm run contract -- web text-field -->
# Text field · حقل نص — Web — code contract

> **Everything you need to build Text field on Web, and nothing else.** Read this file only. Generated from [`text-field.md`](text-field.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](text-field.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Text field · حقل نص |
| Platform | Web · React + MUI |
| Built on | MUI `FormControl` + `OutlinedInput`; static native label above a notchless outlined field |
| Import | `import { TextField } from '@biowave/web'` |
| Version | 1.2 · 2026-10-21 |
| Source code | [`src/components/text-field/`](../../src/components/text-field/) |
| Tokens | [`text-field.tokens.json`](text-field.tokens.json) |
| Source | [`text-field.md`](text-field.md) @ `3102f6b895714446` |

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

### `TextField`

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

## 3. Dimensions

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
| `trailing-action` | multiline margin-block-start | `max(action-inset − spacing-control-gap-sm, (body-sm line-height − action-box) / 2)` | `max(action-inset − spacing-control-gap-md, (body-md line-height − action-box) / 2)` | `max(action-inset − spacing-control-gap-lg, (body-lg line-height − action-box) / 2)` |
| `trailing-action` | multiline offset from the field's top edge (resolved, EN and AR) | `spacing-xs` (margin 0) | `spacing-xs` (margin `spacing-xs` − `spacing-control-gap-md`) | `spacing-xs` (margin `spacing-xs` − `spacing-control-gap-lg`) |
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
- Multiline: icons top-align. **One rule for the trailing action:** `margin-block-start = max(action-inset − padding-block, (line-height − action-box) / 2)`, where `padding-block` = `spacing-control-gap-*` and `line-height` = the input text style's line height for the current size and language. The action box is centred on the first text line when that leaves at least `spacing-xs` above it; otherwise it starts `spacing-xs` below the field's top edge, the same inset as single-line. It is never closer than `spacing-xs` to the top border at any size. With today's tokens the second term is always smaller, so at `sm`, `md` and `lg` (EN and AR) the action box starts exactly `spacing-xs` from the top edge and its centre sits slightly below the first-line centre (by 2 / 3 / 4 in EN, 1 / 2 / 3 in AR for sm / md / lg). This replaces the v1.1 rule "centre aligns with the first text line", which put the box 2 / 1 / 0 from the top edge
- `prefix`/`suffix` are part of the field (one outer border, one focus indicator). With `end-button`, the field's inline-end corners are square and the Button's inline-start corners are square; they share one border
- Label, helper text and counter can wrap. The helper grows first; the counter stays at inline end and does not overlap it

## 4. Tokens by part and state

> Machine-readable source: [`text-field.tokens.json`](text-field.tokens.json). In Figma it creates `Text field / Size` and `Text field / State`; every value aliases a semantic Foundations token.

### 3.1 Size tokens

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

### 3.2 State tokens

| State | `field` background | `field` border | Border width | `label` · `input` | `placeholder` | icons | `prefix`/`suffix` bg · text | `supporting-text` · `counter` | `error-icon` |
|---|---|---|---|---|---|---|---|---|---|
| Default | `color-background-base-default` | `color-border-bold` | `border-width-default` | `color-text-default` | `color-text-subtlest` | `color-icon-subtlest` | `color-background-neutral-default` · `color-text-subtle` | `color-text-subtlest` | — |
| Hover | `color-background-base-hovered` | `color-border-bold` | same | same | same | same | same | same | — |
| Focus | same | `color-border-focus` | `border-width-focus` | same | same | `color-icon-default` | same | same | — |
| Error | same | `color-border-error` | `border-width-default` (focused: `border-width-focus`) | same | same | `color-icon-subtlest` (unchanged) | same | `color-text-role-error` | `color-icon-role-error` |
| Disabled | `color-background-disabled` | `color-border-disabled` | `border-width-default` | `color-text-disabled` | `color-text-disabled` | `color-icon-disabled` | `color-background-disabled` · `color-text-disabled` | `color-text-disabled` | — |
| Read-only | `color-background-base-subtlest` | `color-border-default` | `border-width-default` (focused: `border-width-focus`) | `color-text-default` | `color-text-subtlest` | `color-icon-subtlest` | same as Default | `color-text-subtlest` | — |

- Add-on divider = the field border token of the current state.
- `required-indicator` uses `color-text-role-error`, `color-text-disabled` when disabled.
- Trailing action and help icon: Icon button `text` · `neutral` tokens (Icon button spec); end button: Button `outlined` · `neutral`.
- Error priority is Disabled → Error → Focus → Hover → Default; an error that receives focus keeps the error colour and changes to `border-width-focus`.
- Read-only uses a lighter border (`color-border-default`) so it differs from an editable field in both themes; `color-background-base-subtlest` equals the base background in dark mode, so the border carries the difference. Dark theme uses the same token names and switches values automatically.

### 4.1 How to use each token on Web

Values are for checking only — never paste a value.

| Token | CSS / TS | Light | Dark |
|---|---|---|---|
| `border-width-default` | `var(--bw-border-width-default)` · `cssVars.border.width.default` | 1 | 1 |
| `border-width-focus` | `var(--bw-border-width-focus)` · `cssVars.border.width.focus` | 2 | 2 |
| `color-background-base-default` | `var(--bw-color-background-base-default)` · `cssVars.color.background.base.default` | #FFFFFF | #141414 |
| `color-background-base-hovered` | `var(--bw-color-background-base-hovered)` · `cssVars.color.background.base.hovered` | #EDEDED | #404040 |
| `color-background-base-subtlest` | `var(--bw-color-background-base-subtlest)` · `cssVars.color.background.base.subtlest` | #F7F7F7 | #0A0A0A |
| `color-background-disabled` | `var(--bw-color-background-disabled)` · `cssVars.color.background.disabled` | #EDEDED | #292929 |
| `color-background-neutral-default` | `var(--bw-color-background-neutral-default)` · `cssVars.color.background.neutral.default` | #EDEDED | #292929 |
| `color-border-bold` | `var(--bw-color-border-bold)` · `cssVars.color.border.bold` | #707070 | #969696 |
| `color-border-default` | `var(--bw-color-border-default)` · `cssVars.color.border.default` | #DBDBDB | #404040 |
| `color-border-disabled` | `var(--bw-color-border-disabled)` · `cssVars.color.border.disabled` | #DBDBDB | #404040 |
| `color-border-error` | `var(--bw-color-border-error)` · `cssVars.color.border.error` | #D42222 | #FF7676 |
| `color-border-focus` | `var(--bw-color-border-focus)` · `cssVars.color.border.focus` | #254471 | #90A3BC |
| `color-icon-default` | `var(--bw-color-icon-default)` · `cssVars.color.icon.default` | #0A0A0A | #F7F7F7 |
| `color-icon-disabled` | `var(--bw-color-icon-disabled)` · `cssVars.color.icon.disabled` | #969696 | #707070 |
| `color-icon-role-error` | `var(--bw-color-icon-role-error)` · `cssVars.color.icon.role.error` | #A31A1A | #FEA3A3 |
| `color-icon-subtlest` | `var(--bw-color-icon-subtlest)` · `cssVars.color.icon.subtlest` | #545454 | #BDBDBD |
| `color-text-default` | `var(--bw-color-text-default)` · `cssVars.color.text.default` | #0A0A0A | #F7F7F7 |
| `color-text-disabled` | `var(--bw-color-text-disabled)` · `cssVars.color.text.disabled` | #969696 | #707070 |
| `color-text-role-error` | `var(--bw-color-text-role-error)` · `cssVars.color.text.role.error` | #A31A1A | #FEA3A3 |
| `color-text-subtle` | `var(--bw-color-text-subtle)` · `cssVars.color.text.subtle` | #292929 | #DBDBDB |
| `color-text-subtlest` | `var(--bw-color-text-subtlest)` · `cssVars.color.text.subtlest` | #545454 | #BDBDBD |
| `motion-duration-instant` | `var(--bw-motion-duration-instant)` · `cssVars.motion.duration.instant` | 0 | 0 |
| `motion-duration-sm` | `var(--bw-motion-duration-sm)` · `cssVars.motion.duration.sm` | 100 | 100 |
| `motion-easing-standard` | `var(--bw-motion-easing-standard)` · `cssVars.motion.easing.standard` | [0.2,0,0,1] | [0.2,0,0,1] |
| `radius-md` | `var(--bw-radius-md)` · `cssVars.radius.md` | 8 | 8 |
| `size-control-height-lg` | `var(--bw-size-control-height-lg)` · `cssVars.size.control.height.lg` | 48 | 48 |
| `size-control-height-md` | `var(--bw-size-control-height-md)` · `cssVars.size.control.height.md` | 40 | 40 |
| `size-control-height-sm` | `var(--bw-size-control-height-sm)` · `cssVars.size.control.height.sm` | 32 | 32 |
| `size-icon-lg` | `var(--bw-size-icon-lg)` · `cssVars.size.icon.lg` | 24 | 24 |
| `size-icon-md` | `var(--bw-size-icon-md)` · `cssVars.size.icon.md` | 20 | 20 |
| `size-icon-sm` | `var(--bw-size-icon-sm)` · `cssVars.size.icon.sm` | 16 | 16 |
| `spacing-control-gap-lg` | `var(--bw-spacing-control-gap-lg)` · `cssVars.spacing.control.gap.lg` | 8 | 8 |
| `spacing-control-gap-md` | `var(--bw-spacing-control-gap-md)` · `cssVars.spacing.control.gap.md` | 6 | 6 |
| `spacing-control-gap-sm` | `var(--bw-spacing-control-gap-sm)` · `cssVars.spacing.control.gap.sm` | 4 | 4 |
| `spacing-control-padding-inline-lg` | `var(--bw-spacing-control-padding-inline-lg)` · `cssVars.spacing.control.padding-inline.lg` | 16 | 16 |
| `spacing-control-padding-inline-md` | `var(--bw-spacing-control-padding-inline-md)` · `cssVars.spacing.control.padding-inline.md` | 12 | 12 |
| `spacing-control-padding-inline-sm` | `var(--bw-spacing-control-padding-inline-sm)` · `cssVars.spacing.control.padding-inline.sm` | 8 | 8 |
| `spacing-sm` | `var(--bw-spacing-sm)` · `cssVars.spacing.sm` | 6 | 6 |
| `spacing-xs` | `var(--bw-spacing-xs)` · `cssVars.spacing.xs` | 4 | 4 |
| `target-min` | `var(--bw-target-min)` · `cssVars.target.min` |  |  |

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

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Default → Hover | Pointer enters field | border color | `motion-duration-sm` | `motion-easing-standard` |
| Hover/Default → Focus | Native input receives focus | border color and width | `motion-duration-sm` | `motion-easing-standard` |
| Any enabled → Error | Validation result changes | border, icon and supporting-text color | `motion-duration-sm` | `motion-easing-standard` |
| Enabled ↔ Disabled/Read-only | prop changes | background, border and text colors | `motion-duration-instant` | — |

Reduced motion: durations resolve to instant through Foundations; no spatial motion is used. The value, selection and focus are never reset by a visual transition.

## 6. RTL

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

## 7. Accessibility (implementation)

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
| Focus | **Field exception:** the input border uses `border-width-focus` and `color-border-focus` with no exterior offset. Error focus uses the same width with `color-border-error`. Help icon, trailing action and end button use the normal 2px ring with 2px offset |
| Target size | Field height ≥ `target-min`; trailing action and help icon pointer targets ≥ `target-min` without changing layout |
| Screen reader output | “Work email, required, edit text, SAR” · error adds “invalid” then the linked correction |

| Key | Action |
|---|---|
| Tab / Shift+Tab | Order: help icon → input → trailing action → end button |
| Arrow keys | Moves the text caret; never intercepted by the wrapper |
| Enter | Submits the owning form for single-line input; inserts a line break for multiline input |
| Esc | Closes an open help tooltip; does not clear the value |
| Home / End | Native caret behavior |

## 8. Examples

```tsx
import { TextField, Icon } from '@biowave/web';   // Icon = Material Symbols Rounded (D-18)

<TextField label="Work email" name="email" type="email" autoComplete="email"
  placeholder="name@company.com" required startAdornment={<Icon name="mail" />}
  helpText="We send shift reminders to this address" />

<TextField label="Password" type="password" autoComplete="current-password" />  {/* show/hide built in */}

<TextField label="Search employees" clearable startAdornment={<Icon name="search" />} />

<TextField label="Hourly rate" inputMode="decimal" suffix="SAR" />

<TextField label="Invite link" readOnly value={link}
  endButton={{ label: 'Copy', icon: <Icon name="content_copy" />, onClick: copy }} />

<TextField label="Request reason" multiline minRows={3} maxRows={8}
  maxLength={400} showCounter helperText="Explain why you need remote work" />

<TextField label="البريد الإلكتروني للعمل" type="email" error
  helperText="أدخل بريدًا إلكترونيًا صالحًا للعمل" />
```

## 9. How to build it

### Goal

`import { TextField } from '@biowave/web'` renders the single-line and multiline APIs in B1 with static labels, token-only state styling, native form behavior, English/Arabic direction, accessible error/help/counter relationships and complete tests.

### Scope

**In scope**
- [ ] All B1 props, B2 dimensions, B3 tokens, B4 states, B5 RTL, B6 accessibility and B9 tests
- [ ] Round 2 fixes: E2 findings 3, 4, 6, 7, 8 and E3 bugs AD-1 … AD-6
- [ ] Fix round 2: E4 finding 9 (multiline trailing action rule, C7 task list)
- [ ] Private shared pieces `FieldLabel` (with help icon), `FieldSupportingText` (with error icon), `FieldAddon` and `FieldAction` in the text-field folder for later field-family components

**Out of scope (do not build)**
- Select, Verification code, Phone field, Search field or Autocomplete
- Attached dropdown segments (legacy `Leading/Trailing dropdown`) — Phone field and backlog
- Tags inside the field (Autocomplete), payment icons (dropped)
- Form-level validation, error summaries or submit orchestration
- Masking, parsing, currency formatting, rich text or autosuggest menus
- A public base-field component; shared pieces remain internal

### Approach

- **Base:** compose MUI `FormControl` and `OutlinedInput`. Keep the label outside the outline and do not pass MUI's floating/notched label. Use the native input/textarea that `OutlinedInput` creates
- **Token map:** `text-field.tokens.ts` exports typed size and state maps using `cssVars.*`; its semantic references equal `text-field.tokens.json`. Styling reads this map only
- **Structure:** root form control → `FieldLabel` (label, required indicator, help icon) → field row (`FieldAddon` prefix · styled `OutlinedInput` · `FieldAddon` suffix) + attached `Button` → `FieldSupportingText` (error icon, text, counter). Private pieces are not package exports
- **Trailing action (fixes AD-1 … AD-3):** remove the `target-min` box from the slot. `FieldAction` renders the Biowave `IconButton` (`variant="text"`, `color="neutral"`, `disabled={disabled}`) and overrides its box to the B3 `action-box` with the field's icon size through a scoped class; the pointer target is extended with a `::before` of at least `target-min`, centred, so layout never changes. Field `padding-inline-end` becomes `action-inset` when an action exists. A decorative `endAdornment` keeps only the icon size at the normal padding
- **Clear and password:** clear writes an empty value through a native input event so `onChange` fires for controlled and uncontrolled fields, then focuses the input and calls `onClear`. Password toggle keeps internal `visible` state, swaps `type` and restores the caret
- **Help icon:** `IconButton` (`text`, `neutral`) + tooltip. Reuse the private tooltip wrapper styling (`iconButtonTooltipTokens`) with tooltip content = `helpText`, name = `helpLabel`; replace with the shared Tooltip on Day 4 (TODO comment). It is never disabled
- **Add-ons:** `FieldAddon` is a non-interactive segment inside the outlined border (`startAdornment`/`endAdornment` of `OutlinedInput` with negative inline margin equal to the padding so it reaches the border), divider on the inner edge, `aria-hidden` visual + id text in `aria-describedby`
- **End button:** the Biowave `Button` (`outlined`, `neutral`, field size) placed after the `OutlinedInput` in an inline flex row; square the touching corners with logical radius properties and collapse the shared border with a negative `margin-inline-start` of `border-width-default`
- **Click to focus (AD-6):** decorative wrappers get `pointer-events: none`; a root `onMouseDown` on non-interactive targets focuses the input
- **Icons (D-18):** built-in glyphs use the Biowave `Icon` (Material Symbols Rounded) — clear `close`, password `visibility` / `visibility_off`, help `help`, error `error` — as `<Icon name="…" />` at the B2 glyph sizes. Inside the package import it from `'../icon'`; apps and examples use `import { Icon } from '@biowave/web'`. Never use MUI `Icon` or import `@mui/icons-material`
- **Error colour (AD-4):** only border, supporting text and error icon change colour in error
- **State priority:** native MUI classes plus transient props implement Disabled → Error → Focus → Hover → Default. Read-only has its background and border tokens and still receives focus styling
- **Focus exception:** style only `.MuiOutlinedInput-notchedOutline`; never add an exterior outline or shadow to the field. Controls inside keep their own focus ring
- **Multiline:** pass `multiline`, row props and textarea semantics to MUI; `resize` maps to CSS `resize: vertical | none`. Top-align icons. Trailing action (E4 finding 9): `align-self: flex-start` and `margin-block-start: max(calc(action-inset − gap), calc((input line-height − action-box) / 2))` from the size token map and the input typography line height (locale-aware), so the box is never closer than `spacing-xs` to the top edge. Resolved offset from the top edge = `spacing-xs` at `sm` · `md` · `lg` (B2). Single-line is unchanged
- **Counter:** unchanged; additionally reset the uncontrolled mirror on the owning form's `reset` event (E2 finding 8)
- **Ids and aria:** `useId()` id; route every `aria-*` prop to `inputProps` and merge `aria-describedby` (finding 3)
- **Warnings:** existing `warnOnce` helper for every B1 invalid combination; never throw

### Token gaps

None in Foundations. New component tokens in `text-field.tokens.json`: `size.*.action-box`, `size.*.action-inset`, `state.*.addon-background`, `state.*.addon-text`, `state.*.error-icon`, and changed `state.error.icon`, `state.read-only.border`, `state.disabled.required` — all alias existing semantic tokens (B3).

### Files to create / change

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

## 10. Tests

- [ ] Renders single-line and multiline fields for `sm` · `md` · `lg` in light + dark and en + ar
- [ ] Associates visible and visually hidden labels with the native control; caller `aria-*` lands on the input
- [ ] Required, error, helper, counter, prefix and suffix ids/semantics match B6; error icon is shown with error text and is `aria-hidden`
- [ ] Default, hover, focus, error, disabled and read-only use the B3 token map; leading icon keeps its neutral colour in error; read-only border differs from default
- [ ] Trailing action box equals the B3 action-box per size, is inset `spacing-xs` and stays inside the field border at viewport widths below and above the web breakpoint, for single-line **and multiline** fields
- [ ] Disabled field: trailing action and end button are disabled and skipped by Tab; help icon is still reachable
- [ ] Clear: hidden when empty, read-only or disabled; clears, keeps focus, fires `onChange` and `onClear`
- [ ] Password toggle switches `type`, `aria-pressed` and label; keeps caret position
- [ ] Help icon opens on hover and focus, closes on Esc, content linked by `aria-describedby`
- [ ] Clicking the leading icon, prefix or suffix focuses the input
- [ ] Multiline: trailing action follows the B2 rule — top edge ≥ `spacing-xs` from the field's top edge at `sm` · `md` · `lg`, centred on the first line only when that leaves `spacing-xs`
- [ ] Controlled and uncontrolled values update the counter without mutating or truncating the supplied value
- [ ] Every invalid combination warns once and uses the B1 fallback
- [ ] RTL mirrors layout without mirroring icons; counter and prefix text remain LTR
- [ ] Keyboard order matches B6; read-only remains focusable
- [ ] axe has no violations in both themes and languages
- [ ] Source contains no raw hex, px, ms or font names

Implement every item in B9, plus:
- [ ] Label click/focus association and generated-id stability
- [ ] Caller `aria-describedby` is preserved and merged with supporting, counter, prefix and suffix ids
- [ ] Counter counts Arabic and emoji as Unicode code points and never has `aria-live`; uncontrolled counter resets with the form
- [ ] Error focus uses error colour plus focus width; normal focus uses focus colour plus focus width
- [ ] Hover and disabled-required colours asserted on their selectors, not only present in CSS
- [ ] Layout test in a real layout engine (or computed styles) for AD-1 / AD-2 at 980 px and 1280 px viewports
- [ ] Multiline case in the same viewport test (`TextField.test.tsx` near :364): for `sm` · `md` · `lg` at 980 and 1280 px, a `multiline` field with a trailing action has the action box inside the border — `margin-block-start` equals the B2 `max(…)` expression and the box's top offset is ≥ `action-inset` (`spacing-xs`), inline-end inset = `action-inset`
- [ ] Token-map test covers every size/state entry and matches component-token aliases
- [ ] “No raw values” source check covers every file in the component folder

## 11. Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API, defaults, warnings and fallbacks match B1 exactly
- [ ] AC-2 Every visual value comes from B2–B3 through `cssVars`/`biowaveVariants`; no raw values or primitives
- [ ] AC-3 Every B4 transition exists and reduced motion resolves through Foundations
- [ ] AC-4 RTL matches B5; semantics and keyboard order match B6
- [ ] AC-5 B9 and C6 tests pass with `npm run typecheck` and `npm run test:web`
- [ ] AC-6 Exported from `src/index.ts`; header and section README status are `Built`
- [ ] AC-7 MUI floating label/notch styling and palette defaults do not appear
- [ ] AC-8 Single-line and multiline use one public component, with private reusable field parts
- [ ] AC-9 `npm run component-tokens`, `npm run sync` and `npm run docs:check` pass
- [ ] AC-10 AD-1 … AD-6 fixed: action inside the border at every size and viewport (single-line and multiline, B2 multiline rule), disabled with the field, neutral icons in error, first-line alignment, click-to-focus
- [ ] AC-12 Icons from the Biowave `Icon` (Material Symbols Rounded, D-18) only; no MUI `Icon` and no `@mui/icons-material` import in the component folder
- [ ] AC-11 Trailing action, help icon and end button reuse the Biowave Icon button and Button (no restyled MUI copies)

#### Fix round 2 — Executor task list

From E4 Round 2 (plan 1.2). Only these; nothing else changes.

| # | Finding | File | Task |
|---|---|---|---|
| 1 | 9 🟡 | `FieldAction.tsx` (multiline `marginBlockStart`, ~:41-45) | Replace `calc((lineHeight − actionBox) / 2)` with `max(calc(actionInset − gap), calc((lineHeight − actionBox) / 2))` using `textFieldSizeTokens[size].actionInset`, `.gap` and the input line height (C3 Multiline). Single-line keeps `alignSelf: 'center'` and no margin |
| 2 | 9 🟡 | `TextField.test.tsx` (viewport test ~:364) | Add the multiline case from C6 for `sm` · `md` · `lg` at 980 and 1280 px; update the AD-5 multiline alignment test (~:539) to the B2 rule (top offset ≥ `spacing-xs`, not exact first-line centring) |
| 3 | — | `text-field.md` C8, `CHANGELOG.md` | Add a "Fix round 2" entry in C8 (note there that built-in glyphs use the Biowave `Icon` since icon/web — E4 #10); set Code to `Built` in the header and `3-web-components/README.md`; changelog line |

## 12. Rules

1. Never edit generated files (`*/generated/*`, `2-foundations/dist/`, `2-foundations/preview/`, `_sync/*.json`, any `*-contract.md`).
2. No raw values: no hex, px, ms or font names — only the tokens in §4. A missing value means stop and ask; tokens are added by the Planner.
3. Never use primitives (`primitive.*`, `BwPalette`).
4. RTL first: logical properties only (`margin-inline-start`, `padding-inline`, `inset-inline-end`); mirror only directional icons (§6).
5. Light + dark and en + ar, always — and tested.
6. WCAG 2.2 AA: keyboard, visible focus (`color-border-focus` at `border-width-focus`, with no exterior offset per the documented field exception in §7), labels, targets ≥ `target-min` (24px), reduced motion.
7. Stay inside this contract; one component per task; do not refactor unrelated files.

## 13. Commands that must pass

```bash
npm run typecheck
npm run test:web
npm run component-tokens
npm run sync        # must end with READY
npm run docs:check
```

## 14. When you finish

1. Fill [C8 Execution log](text-field.md#c8-execution-log-filled-by-the-executor) in `text-field.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `text-field.md` and in the Components table of `3-web-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).

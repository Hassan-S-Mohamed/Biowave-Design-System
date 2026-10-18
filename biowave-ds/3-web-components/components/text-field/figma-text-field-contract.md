<!-- GENERATED from text-field.md @ 5509ac331e8f2a1d — do not edit; change the source and run: npm run contract -- web text-field -->
# Text field · حقل نص — Web — Figma contract

> **Everything the Figma Agent needs to build Text field in the Web Components file, with our variables and styles.** Read this file only. Generated from [`text-field.md`](text-field.md) (Parts A, B, D) and the Figma library index (`_sync/figma-library.json`, read 2026-10-17). Questions go to [D11 Execution log](text-field.md#d11-execution-log-filled-by-the-figma-agent) — never invent.

**Two phases, one review:** Phase 1 — build the component set (§7–§8). Phase 2 — as soon as Phase 1 is finished, the 12 documentation pages and the Components List card (§9).

| | |
|---|---|
| Target file | **Biowave DS — Web Components** · key `7nDhsPNntzIWlrjmuSmZ9l` · https://www.figma.com/design/7nDhsPNntzIWlrjmuSmZ9l |
| Page | `↳ Text field` (one page per component) |
| Component | Text field · حقل نص |
| Platform | Web · React + MUI |
| Version | 1.0 · 2026-10-18 |
| Source | [`text-field.md`](text-field.md) @ `5509ac331e8f2a1d` |

## 1. Library connections in this file

| | |
|---|---|
| Library | **Biowave DS — Foundations** · library key `lk-e00b31b21f924b36eeea820da99c4b306c460986c83e894f415a1c194ba5a2e670f3142c2fccca81280a80bcaee6a87bc47c9a9505d186d7b693aa9805ad7031` |
| Library file | Foundations · key `AyFaSmfDUlTax3GpKhRdHI` |
| Enabled here | ✓ verified from a component file: 9 collections, 318 variables reachable |

Import by key — never search by name, never copy:

```js
const v = await figma.variables.importVariableByKeyAsync('<variable key>');   // library reference, not a local copy
const s = await figma.importStyleByKeyAsync('<style key>');                   // text / effect style
const c = await figma.importComponentByKeyAsync('<component key>');           // Doc Kit / icon component
const set = await figma.importComponentSetByKeyAsync('<component set key>');
```

## 2. Component-token collections (bind layers to these)

Already in this file, created by the sync tooling from [`text-field.tokens.json`](text-field.tokens.json). **Bind component layers to these variables** and pick the option with the collection's explicit variable mode. Each value aliases the Foundations variable shown (key in §3).

| Collection | Modes | Variable | Alias target per mode |
|---|---|---|---|
| Text field / Size | sm · md · lg | `height` | sm → 4. Size › `size/control/height/sm`<br>md → 4. Size › `size/control/height/md`<br>lg → 4. Size › `size/control/height/lg` |
| Text field / Size | sm · md · lg | `padding-inline` | sm → 3. Spacing › `spacing/control/padding-inline/sm`<br>md → 3. Spacing › `spacing/control/padding-inline/md`<br>lg → 3. Spacing › `spacing/control/padding-inline/lg` |
| Text field / Size | sm · md · lg | `gap` | sm → 3. Spacing › `spacing/control/gap/sm`<br>md → 3. Spacing › `spacing/control/gap/md`<br>lg → 3. Spacing › `spacing/control/gap/lg` |
| Text field / Size | sm · md · lg | `label-gap` | sm → 3. Spacing › `spacing/sm`<br>md → 3. Spacing › `spacing/sm`<br>lg → 3. Spacing › `spacing/sm` |
| Text field / Size | sm · md · lg | `supporting-gap` | sm → 3. Spacing › `spacing/xs`<br>md → 3. Spacing › `spacing/xs`<br>lg → 3. Spacing › `spacing/xs` |
| Text field / Size | sm · md · lg | `icon` | sm → 4. Size › `size/icon/sm`<br>md → 4. Size › `size/icon/md`<br>lg → 4. Size › `size/icon/lg` |
| Text field / Size | sm · md · lg | `radius` | sm → 2. Radius › `radius/md`<br>md → 2. Radius › `radius/md`<br>lg → 2. Radius › `radius/md` |
| Text field / Size | sm · md · lg | `border-width` | sm → 9. Border › `border/width/default`<br>md → 9. Border › `border/width/default`<br>lg → 9. Border › `border/width/default` |
| Text field / State | default · hover · focus · error · disabled · read-only | `background` | default → 1. Themes › `color/background/base/default`<br>hover → 1. Themes › `color/background/base/default`<br>focus → 1. Themes › `color/background/base/default`<br>error → 1. Themes › `color/background/base/default`<br>disabled → 1. Themes › `color/background/base/disabled`<br>read-only → 1. Themes › `color/background/neutral/subtle` |
| Text field / State | default · hover · focus · error · disabled · read-only | `border` | default → 1. Themes › `color/border/input/default`<br>hover → 1. Themes › `color/border/input/hover`<br>focus → 1. Themes › `color/border/focus`<br>error → 1. Themes › `color/border/input/error`<br>disabled → 1. Themes › `color/border/disabled`<br>read-only → 1. Themes › `color/border/input/default` |
| Text field / State | default · hover · focus · error · disabled · read-only | `border-width` | default → 9. Border › `border/width/default`<br>hover → 9. Border › `border/width/default`<br>focus → 9. Border › `border/width/focus`<br>error → 9. Border › `border/width/default`<br>disabled → 9. Border › `border/width/default`<br>read-only → 9. Border › `border/width/default` |
| Text field / State | default · hover · focus · error · disabled · read-only | `label` | default → 1. Themes › `color/text/neutral/default`<br>hover → 1. Themes › `color/text/neutral/default`<br>focus → 1. Themes › `color/text/neutral/default`<br>error → 1. Themes › `color/text/neutral/default`<br>disabled → 1. Themes › `color/text/neutral/disabled`<br>read-only → 1. Themes › `color/text/neutral/default` |
| Text field / State | default · hover · focus · error · disabled · read-only | `input` | default → 1. Themes › `color/text/neutral/default`<br>hover → 1. Themes › `color/text/neutral/default`<br>focus → 1. Themes › `color/text/neutral/default`<br>error → 1. Themes › `color/text/neutral/default`<br>disabled → 1. Themes › `color/text/neutral/disabled`<br>read-only → 1. Themes › `color/text/neutral/default` |
| Text field / State | default · hover · focus · error · disabled · read-only | `placeholder` | default → 1. Themes › `color/text/neutral/placeholder`<br>hover → 1. Themes › `color/text/neutral/placeholder`<br>focus → 1. Themes › `color/text/neutral/placeholder`<br>error → 1. Themes › `color/text/neutral/placeholder`<br>disabled → 1. Themes › `color/text/neutral/disabled`<br>read-only → 1. Themes › `color/text/neutral/placeholder` |
| Text field / State | default · hover · focus · error · disabled · read-only | `icon` | default → 1. Themes › `color/icon/neutral/muted`<br>hover → 1. Themes › `color/icon/neutral/muted`<br>focus → 1. Themes › `color/icon/neutral/default`<br>error → 1. Themes › `color/icon/role/error`<br>disabled → 1. Themes › `color/icon/neutral/disabled`<br>read-only → 1. Themes › `color/icon/neutral/muted` |
| Text field / State | default · hover · focus · error · disabled · read-only | `supporting` | default → 1. Themes › `color/text/neutral/muted`<br>hover → 1. Themes › `color/text/neutral/muted`<br>focus → 1. Themes › `color/text/neutral/muted`<br>error → 1. Themes › `color/text/role/error`<br>disabled → 1. Themes › `color/text/neutral/disabled`<br>read-only → 1. Themes › `color/text/neutral/muted` |
| Text field / State | default · hover · focus · error · disabled · read-only | `counter` | default → 1. Themes › `color/text/neutral/muted`<br>hover → 1. Themes › `color/text/neutral/muted`<br>focus → 1. Themes › `color/text/neutral/muted`<br>error → 1. Themes › `color/text/role/error`<br>disabled → 1. Themes › `color/text/neutral/disabled`<br>read-only → 1. Themes › `color/text/neutral/muted` |
| Text field / State | default · hover · focus · error · disabled · read-only | `required` | default → 1. Themes › `color/text/role/error`<br>hover → 1. Themes › `color/text/role/error`<br>focus → 1. Themes › `color/text/role/error`<br>error → 1. Themes › `color/text/role/error`<br>disabled → 1. Themes › `color/text/neutral/disabled`<br>read-only → 1. Themes › `color/text/role/error` |

## 3. Foundations variables used (keys)

| Token | Figma variable | Key | Type | Scopes | Used by |
|---|---|---|---|---|---|
| `border-width-default` | 9. Border › `border/width/default` | `9b62f24ecdfc438789ce3fa296e725ac14b1e08f` | FLOAT | STROKE_FLOAT | spec, component token |
| `border-width-focus` | 9. Border › `border/width/focus` | `d660bcb01777958134799fe11a99a63aaf1fbfca` | FLOAT | STROKE_FLOAT | spec, component token |
| `color-background-base-default` | 1. Themes › `color/background/base/default` | `82c8830a9ba9a3837c6d6f261cc1b43e8b6a9c08` | COLOR | FRAME_FILL, SHAPE_FILL | spec, component token |
| `color-background-base-disabled` | 1. Themes › `color/background/base/disabled` | `3697f6cbec9ecaa8acf84032dbdb9f6a1607a6ff` | COLOR | FRAME_FILL, SHAPE_FILL | spec, component token |
| `color-background-neutral-subtle` | 1. Themes › `color/background/neutral/subtle` | `99e507c57d0911a93c3305a2454046b2b28d3acb` | COLOR | FRAME_FILL, SHAPE_FILL | spec, component token |
| `color-border-disabled` | 1. Themes › `color/border/disabled` | `a6d557c3fa0bcb0e2e6b6592234d737ef80936bf` | COLOR | STROKE_COLOR | spec, component token |
| `color-border-focus` | 1. Themes › `color/border/focus` | `ef666d3badd2b63f18cb168d9987ead7fbc21480` | COLOR | STROKE_COLOR | spec, component token |
| `color-border-input-default` | 1. Themes › `color/border/input/default` | `ab8b644249ebef8ab1b6a1efc54e0b4e504d3979` | COLOR | STROKE_COLOR | spec, component token |
| `color-border-input-error` | 1. Themes › `color/border/input/error` | `e346a0de10a9c6bdfd00c3c5b4cb376b58f3e87f` | COLOR | STROKE_COLOR | spec, component token |
| `color-border-input-hover` | 1. Themes › `color/border/input/hover` | `eadf46670cd0192d6b3ac611127c1762c7e2df5e` | COLOR | STROKE_COLOR | spec, component token |
| `color-icon-neutral-default` | 1. Themes › `color/icon/neutral/default` | `b0844bd913aafe8789a44bc7b647058cdae299df` | COLOR | SHAPE_FILL, STROKE_COLOR | spec, component token |
| `color-icon-neutral-disabled` | 1. Themes › `color/icon/neutral/disabled` | `708926473ca446a26d4a0891351f04692171f74f` | COLOR | SHAPE_FILL, STROKE_COLOR | spec, component token |
| `color-icon-neutral-muted` | 1. Themes › `color/icon/neutral/muted` | `22b53651f4efa195f0dfb625922d0279003534eb` | COLOR | SHAPE_FILL, STROKE_COLOR | spec, component token |
| `color-icon-role-error` | 1. Themes › `color/icon/role/error` | `e7e61106b7c9b1c60197d2c456ad055991cc545d` | COLOR | SHAPE_FILL, STROKE_COLOR | spec, component token |
| `color-text-neutral-default` | 1. Themes › `color/text/neutral/default` | `4ea63d9ab5254c4df4eba4d26f771377a07929c4` | COLOR | TEXT_FILL | spec, component token |
| `color-text-neutral-disabled` | 1. Themes › `color/text/neutral/disabled` | `f88c10f90f454d356c14cc3240da0f04eafbbedd` | COLOR | TEXT_FILL | spec, component token |
| `color-text-neutral-muted` | 1. Themes › `color/text/neutral/muted` | `8ff5fe7707ac2ac866b453191dea9cdd680d0c8d` | COLOR | TEXT_FILL | spec, component token |
| `color-text-neutral-placeholder` | 1. Themes › `color/text/neutral/placeholder` | `60b49c24f7a0bcd05569c52a3497bab40f56840c` | COLOR | TEXT_FILL | spec, component token |
| `color-text-role-error` | 1. Themes › `color/text/role/error` | `99d512c8b115971ff7f8045c6decd1cada845f37` | COLOR | TEXT_FILL | spec, component token |
| `radius-md` | 2. Radius › `radius/md` | `0758e506cdfd4d7a4eef6369a4851133d7eab5a4` | FLOAT | CORNER_RADIUS | spec, component token |
| `size-control-height-lg` | 4. Size › `size/control/height/lg` | `14c0f56d2add6f7149374e67cf4d3a2656aeb5dc` | FLOAT | WIDTH_HEIGHT | spec, component token |
| `size-control-height-md` | 4. Size › `size/control/height/md` | `cb6d23a09de76b9cea37c24579dbb2a9e6e6a079` | FLOAT | WIDTH_HEIGHT | spec, component token |
| `size-control-height-sm` | 4. Size › `size/control/height/sm` | `1409647f4e12e37e76b49ed9ce1a78946e4250f4` | FLOAT | WIDTH_HEIGHT | spec, component token |
| `size-icon-lg` | 4. Size › `size/icon/lg` | `e79bd86fedcce89547674c84c9127d0149e60061` | FLOAT | WIDTH_HEIGHT | spec, component token |
| `size-icon-md` | 4. Size › `size/icon/md` | `eb459c673e6ca16e3c81b240f04b467717953a9a` | FLOAT | WIDTH_HEIGHT | spec, component token |
| `size-icon-sm` | 4. Size › `size/icon/sm` | `2aa4b1f12a5ed0745f9a8b3251dc1fd9f7dd3476` | FLOAT | WIDTH_HEIGHT | spec, component token |
| `spacing-control-gap-lg` | 3. Spacing › `spacing/control/gap/lg` | `c9e0925c6738c94acdf8f5220207a44c304e25f0` | FLOAT | WIDTH_HEIGHT, GAP | spec, component token |
| `spacing-control-gap-md` | 3. Spacing › `spacing/control/gap/md` | `e2e6fc01e3a1245e8c3584798b5d224742a9a6bc` | FLOAT | WIDTH_HEIGHT, GAP | spec, component token |
| `spacing-control-gap-sm` | 3. Spacing › `spacing/control/gap/sm` | `97daa7ac19168846d702cc8c210d1e162a484b41` | FLOAT | WIDTH_HEIGHT, GAP | spec, component token |
| `spacing-control-padding-inline-lg` | 3. Spacing › `spacing/control/padding-inline/lg` | `3dddd3d0ffa2e8c03e2ee62241d0b414f9c3f5b5` | FLOAT | WIDTH_HEIGHT, GAP | spec, component token |
| `spacing-control-padding-inline-md` | 3. Spacing › `spacing/control/padding-inline/md` | `ece071c90fd7557c56f2a8918944c46d2672718e` | FLOAT | WIDTH_HEIGHT, GAP | spec, component token |
| `spacing-control-padding-inline-sm` | 3. Spacing › `spacing/control/padding-inline/sm` | `fb323143873973f1548553562791a9983936aa5a` | FLOAT | WIDTH_HEIGHT, GAP | spec, component token |
| `spacing-sm` | 3. Spacing › `spacing/sm` | `8332b62aa90dea8417383c59a11eee680e0f1db5` | FLOAT | WIDTH_HEIGHT, GAP | spec, component token |
| `spacing-xl` | 3. Spacing › `spacing/xl` | `5fa0c2ce8ae034e9696038d2704e520fd8383e55` | FLOAT | WIDTH_HEIGHT, GAP | spec |
| `spacing-xs` | 3. Spacing › `spacing/xs` | `9ea993d003d5368c5100b038d51c7c8f3e95c115` | FLOAT | WIDTH_HEIGHT, GAP | spec, component token |
| `target-min` | 7. Grid & Layout › `target/min` | `db23ec2826d3bfa3e600e5a82801e0c7d37ba298` | FLOAT | WIDTH_HEIGHT | spec |

Code-only tokens (no Figma variable by design — motion, layers): `motion-duration-instant` · `motion-duration-sm` · `motion-easing-standard`. Use them only as written values in prototype settings and docs.

## 4. Text styles used (keys)

None named in B/D.

## 5. Effect styles used (keys)

None named in B/D.

## 6. Components to instance (keys)

Nested Biowave components (e.g. Button inside Split button) are instances of the sets **in this file** — build them first; never detach.

## 7. Phase 1 — values (from Part B)

### B1 API

### `TextField`

| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `label` | `ReactNode` | | | ✓ | Persistent visible and accessible name |
| `hideLabel` | boolean | | `false` | | Visually hides `label`; it remains associated with the input |
| `size` | enum | `sm` · `md` · `lg` | `md` | | A4.1 |
| `multiline` | boolean | | `false` | | A4.2; renders a native textarea through MUI |
| `rows` | number | | | | Fixed visible rows for multiline input |
| `minRows` | number | | `3` when multiline | | Minimum auto-growing rows; ignored when `rows` is set |
| `maxRows` | number | | | | Maximum auto-growing rows |
| `required` | boolean | | `false` | | Shows the required indicator and sets native required semantics |
| `helperText` | `ReactNode` | | | | Hint, or correction text when `error=true` |
| `error` | boolean | | `false` | | Invalid visual and `aria-invalid` state |
| `showCounter` | boolean | | `false` | | Shows `current / maxLength`; requires `maxLength` |
| `maxLength` | number | | | | Native character limit and counter maximum |
| `startAdornment` | `ReactNode` | | | | Decorative leading icon; hidden from assistive technology |
| `endAdornment` | `ReactNode` | | | | One trailing action or decorative icon; interactive content supplies its own name |
| `readOnly` | boolean | | `false` | | Native read-only state; disabled wins if both are true |
| `disabled` | boolean | | `false` | | Native disabled state |
| `fullWidth` | boolean | | `true` | | Fills the parent inline size |
| `id`, `name` | string | | generated / — | | Native form identity |
| `type` | string | native input types | `text` | | Ignored for multiline |
| `placeholder` | string | | | | Format hint, never the accessible name |
| `value`, `defaultValue` | string or number | | | | Controlled or uncontrolled value |
| `onChange` | callback | | | | Native input/textarea change event |
| `onBlur`, `onFocus` | callback | | | | Native focus events |
| `autoComplete` | string | | | | Native autofill purpose |
| `inputRef` | ref | | | | Ref to the native input or textarea |
| `className`, `aria-*`, `data-*` | | | | | Forwarded to the root form control |

**Invalid combinations** (`console.warn` once in development; fallback still renders):

| Combination | Fallback |
|---|---|
| `showCounter=true` without `maxLength` | Counter is hidden |
| `rows`, `minRows` or `maxRows` while `multiline=false` | Row props are ignored |
| `type` other than `text` while `multiline=true` | Native textarea renders; `type` is ignored |
| `disabled=true` and `readOnly=true` | Disabled semantics and visuals win |

### B2 Dimensions

```
      label text style label-md
      Work email
      ├──────── spacing-sm ────────┤
   ┬  ┌──────────────────────────────────────────────────────────┐
   │  │ spacing-control-padding-inline-md  Value text      [◆] │ radius-md
   │  └──────────────────────────────────────────────────────────┘ border-width-default
   ┴ size-control-height-md           └ size-icon-md
      ├──────── spacing-xs ────────┤
      supporting text style caption-md                         counter
```

| Part | Property | sm | md | lg |
|---|---|---|---|---|
| `field` | single-line height | `size-control-height-sm` | `size-control-height-md` | `size-control-height-lg` |
| `field` | padding-inline | `spacing-control-padding-inline-sm` | `spacing-control-padding-inline-md` | `spacing-control-padding-inline-lg` |
| `field` | internal gap | `spacing-control-gap-sm` | `spacing-control-gap-md` | `spacing-control-gap-lg` |
| `field` | radius | `radius-md` | `radius-md` | `radius-md` |
| `field` | border width | `border-width-default` | same | same |
| `field` | focused border width | `border-width-focus` | same | same |
| `leading-icon`, `trailing-action` | visual size | `size-icon-sm` | `size-icon-md` | `size-icon-lg` |
| `label` | text style | `label-sm` | `label-md` | `label-lg` |
| `input` | text style | `body-sm` | `body-md` | `body-lg` |
| `supporting-text`, `counter` | text style | `caption-md` | `caption-md` | `caption-md` |
| label → field | gap | `spacing-sm` | same | same |
| field → supporting row | gap | `spacing-xs` | same | same |

Layout rules:
- Root fills the available inline size by default; `fullWidth=false` hugs the MUI intrinsic width
- The single-line height includes the border. The input and adornments center on the block axis
- Multiline uses the same inline padding, top-aligns adornments and derives its block size from the text style plus `rows`/`minRows`/`maxRows`; it has no separate raw minimum-height value
- Label, helper text and counter can wrap. The helper grows first; the counter stays at inline end and does not overlap it
- The trailing action supplies its own target box of at least `target-min`; the field does not shrink that target

### B3 Tokens by part and state

> Machine-readable source: [`text-field.tokens.json`](text-field.tokens.json). In Figma it creates `Text field / Size` and `Text field / State`; every value aliases a semantic Foundations token.

### 3.1 Size tokens

| Part | Property | sm | md | lg |
|---|---|---|---|---|
| `field` | height | `size-control-height-sm` | `size-control-height-md` | `size-control-height-lg` |
| `field` | padding-inline | `spacing-control-padding-inline-sm` | `spacing-control-padding-inline-md` | `spacing-control-padding-inline-lg` |
| `field` | gap | `spacing-control-gap-sm` | `spacing-control-gap-md` | `spacing-control-gap-lg` |
| `field` | radius | `radius-md` | `radius-md` | `radius-md` |
| `field` | border | `border-width-default` | `border-width-default` | `border-width-default` |
| adornments | icon size | `size-icon-sm` | `size-icon-md` | `size-icon-lg` |

### 3.2 State tokens

| State | `field` background | `field` border | Border width | `label` · `input` | `placeholder` | icons | `supporting-text` · `counter` |
|---|---|---|---|---|---|---|---|
| Default | `color-background-base-default` | `color-border-input-default` | `border-width-default` | `color-text-neutral-default` | `color-text-neutral-placeholder` | `color-icon-neutral-muted` | `color-text-neutral-muted` |
| Hover | same | `color-border-input-hover` | same | same | same | same | same |
| Focus | same | `color-border-focus` | `border-width-focus` | same | same | `color-icon-neutral-default` | same |
| Error | same | `color-border-input-error` | `border-width-default` (focused: `border-width-focus`) | same | same | `color-icon-role-error` | `color-text-role-error` |
| Disabled | `color-background-base-disabled` | `color-border-disabled` | `border-width-default` | `color-text-neutral-disabled` | `color-text-neutral-disabled` | `color-icon-neutral-disabled` | `color-text-neutral-disabled` |
| Read-only | `color-background-neutral-subtle` | `color-border-input-default` | `border-width-default` (focused: `border-width-focus`) | `color-text-neutral-default` | `color-text-neutral-placeholder` | `color-icon-neutral-muted` | `color-text-neutral-muted` |

`required-indicator` uses `color-text-role-error`. Error priority is Disabled → Error → Focus → Hover → Default; an error that receives focus keeps the error color and changes to `border-width-focus`. Dark theme uses the same token names and switches values automatically.

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
LTR  Work email
     │ [◆] name@example.com                         [×] │
     Helper text                              (16 / 80)

RTL  البريد الإلكتروني للعمل
     │ [×]                         name@example.com [◆] │
                                      (16 / 80) نص مساعد
```

| Part | In RTL |
|---|---|
| Root, label and supporting row | Mirror automatically through logical layout and provider direction |
| `input` | Uses the document direction by default; consumers may set native `dir` only for intrinsically LTR values such as email when needed |
| `leading-icon` | Moves to inline start; ordinary field icons do not mirror |
| `trailing-action` | Moves to inline end; its own directional glyph follows that component's mirroring rule |
| `counter` | Moves to inline end; Western digits and slash remain LTR |

No physical left/right properties are permitted.

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role / semantics | Native `<input>` or `<textarea>` inside MUI `OutlinedInput`; no redundant ARIA role |
| Accessible name | Native `<label for=id>`; `hideLabel` applies the shared visually-hidden style, never `display:none` |
| Required | Native `required` plus visible `required-indicator` with `aria-hidden=true` |
| Error | `aria-invalid=true`; `supporting-text` id included in `aria-describedby`; error message is text, not color alone |
| Supporting text / counter | Stable ids combined in `aria-describedby`; counter is not a live region |
| Adornments | Leading icon wrapper is `aria-hidden=true`; interactive trailing content provides its own name and keyboard behavior |
| Disabled / read-only | Native `disabled` removes input from tab order; native `readOnly` remains focusable and selectable |
| Focus | **Field exception:** focused outline border uses `border-width-focus` and `color-border-focus` with no exterior offset. Error focus uses the same width with `color-border-input-error` |
| Target size | Field height is ≥ `target-min`; interactive trailing content must also be ≥ `target-min` |
| Screen reader output | “Work email, required, edit text” · error adds “invalid” then the linked correction |

| Key | Action |
|---|---|
| Tab / Shift+Tab | Moves focus into or out of the input and any interactive trailing action in document order |
| Arrow keys | Moves the text caret; never intercepted by the wrapper |
| Enter | Submits the owning form for single-line input; inserts a line break for multiline input |
| Home / End | Native caret behavior |

## 8. Phase 1 — build the component set (from Part D)

> Build the Web Text field sets from B2–B4 in the Web Components file. The generated Figma contract adds library keys.

| Field | Value |
|---|---|
| Figma file | **Biowave DS — Web Components** (`_sync/figma-files.json` › `web`) |
| Page / section | `↳ Text field` › sections `Text field` and `Text field — Documentation` |
| Mode | Create new; legacy references remain read-only in Foundations until approval |
| Plan version | 1 · 2026-10-18 |

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
  ├─ ◇ .Field/Label
  ├─ ◇ .Field/Container
  └─ ◇ .Field/Supporting text

❖ Text area
  └─ instances of the same .Field/* private bases, with multiline layout
```

The private `.Field/*` components are the approved shared field parts for later Select, Search field, Autocomplete and date/time fields in this platform file.

### D3 Layer tree and auto layout

```
Text field                     ↕ vertical · gap {B2 label/field and supporting gaps} · width fill
├── label                      ◇ .Field/Label · width fill
│   ├── label                  T {B2 label text style} · TEXT `Label`
│   └── required-indicator     T `*` · BOOLEAN `Required`
├── field                      ◇ .Field/Container · ↔ horizontal · fill · fixed height {B2}
│   ├── leading-icon           ◇ Icon · BOOLEAN `Leading icon` · INSTANCE_SWAP `Leading icon glyph`
│   ├── input                  T {B2 input style} · fill · TEXT `Value` or `Placeholder`
│   └── trailing-action        ◇ instance · BOOLEAN `Trailing action` · INSTANCE_SWAP
└── supporting-row            ↔ horizontal · width fill
    ├── supporting-text        ◇ .Field/Supporting text · TEXT `Supporting text` · BOOLEAN
    └── counter                T caption-md · TEXT `Counter` · BOOLEAN
```

```
Text area                      same outer tree
└── field                      height hug from three input lines · align start
    ├── leading-icon           top aligned
    ├── input                  T multiline · fill · min three lines
    └── trailing-action        top aligned
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
| `Placeholder` | TEXT | | `name@company.com` | `placeholder` | |
| `Value` | TEXT | | `name@company.com` | `value` | |
| `Leading icon` | BOOLEAN | | `false` | `startAdornment` | present / absent |
| `Leading icon glyph` | INSTANCE_SWAP | Icons | `mail` | `startAdornment` | |
| `Trailing action` | BOOLEAN | | `false` | `endAdornment` | present / absent |
| `Trailing action instance` | INSTANCE_SWAP | Icon button | `clear` | `endAdornment` | |
| `Supporting text` | BOOLEAN | | `true` | `helperText` | present / absent |
| `Supporting text value` | TEXT | | `Use your work email` | `helperText` | |
| `Counter` | BOOLEAN | | `false` | `showCounter` | |
| `Counter value` | TEXT | | `0 / 80` | derived | |

### D5 Variants to generate

- Axes: `Type × Size × State × Filled × Error × Language`
- Exclude `State=Disabled × Error=True`; disabled wins in code and does not retain error visuals
- Final count: 2 types × 3 sizes × 2 filled values × 2 languages × 9 valid State/Error pairs = **216 variants**
- Label, required, icons, supporting text and counter are component properties, not variant axes
- Grid: sections by Type and Language; rows = Size × Filled × Error; columns = State; gap `spacing-xl`

Legacy reference mapping:

| Legacy | New |
|---|---|
| `State=Placeholder` | `Filled=False, State=Default` |
| `State=Filled` | `Filled=True, State=Default` |
| `Destructive=True` | `Error=True` |
| `Type=Tags` | Autocomplete (later contract) |
| leading/trailing dropdown | Phone field or Select (later contract) |
| Payment and trailing button layouts | Removed; compose a field with surrounding layout/components |

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

## 9. Phase 2 — documentation pages and Components List card

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

### Doc Kit components (keys)

> **Blocked — Doc Kit not built.** None of `Doc/Header`, `Doc/Section`, `Doc/Divider`, `Doc/Axis label`, `Doc/Bracket`, `Doc/Panel`, `Doc/Callout`, `Doc/Table`, `Doc/Tile`, `Doc/Motion row`, `Doc/Timeline`, `Doc/Code block`, `Doc/Property chip`, `Doc/Uses`, `Doc/Do`, `Doc/Device frame`, `Doc/Skeleton`, `Doc/Change note`, `Doc/Deprecated overlay`, `Doc/Home header`, `Doc/Title bar`, `Doc/Home card`, `Doc/Footer`, `Doc/Version chip` exist in the Foundations library yet. Finish Phase 1, then stop and report "docs waiting for Doc Kit" in D11. Do not draw doc layouts by hand.

### Components List card

On page `Components List` of this file, add (or refresh) one `Doc/Home card`: preview = live instance of the default variant on the dot-grid tile, title = component name, link "View Component ↗" to the `↳` page of this component. Cards stay in alphabetical order.

### Page layouts (from the Doc Kit spec)

The 12 documentation pages every component gets (Part D8 lists them with their sources; this section is their one layout home).

Every page starts with the same header (`Doc/Header`):

```
┌────────────────────────────────────────────────────────────────────────────┐
│ [logo] Biowave DS / Documentation                 {Platform} · v{version}  │
│                                                                            │
│ {Page title}                                                               │
│ {Page subtitle — one line}                                                 │
│ ────────────────────────────────────────────────────────────────────────── │
```

#### 00 Component sheet
The full variant matrix with axis labels. Columns = interaction states, rows grouped by the other axes. Built from the component set itself.

```
{Name}  (v1.0)
{one-line description}
──────────────────────────────────────────────────────────────────────────
                    State: Default   State: Hover   State: Pressed   State: Disabled
                   ┌──────────────┬──────────────┬───────────────┬────────────────┐
Size: MD │ Primary │ ▢ instance   │ ▢ instance   │ ▢ instance    │ ▢ instance     │
         │ Second. │ ▢            │ ▢            │ ▢             │ ▢              │
Size: SM │ Primary │ ▢            │ ▢            │ ▢             │ ▢              │
                   └──────────────┴──────────────┴───────────────┴────────────────┘
```
`Doc/Axis label` for every row and column (`property` small, `Value` bold). Invalid combinations are not shown.

#### 01 Introduction
Description paragraph, then the anatomy diagram twice: Light panel, then Dark panel (same instance, variable mode switched on the panel).

```
{Description from A1}

┌─ Doc/Panel (Light) ──────────────────────────────────────────────┐
│              title      counter                 trailing-item    │
│                 │          │                          │          │
│ leading-icon ─● ┌──────────────────────────────────────────────┐ │
│                 │ [◆] Title text (12)                     [⤓]  │ │
│ subtitle ─────● │     Subtitle text                            │ │
│                 │ ░░░░░░░░░░░░░░░░ slot ░░░░░░░░░░░░░░░░░░░░░░ │ ├─ slot
│                 └──────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
┌─ Doc/Panel (Dark) ── same diagram ───────────────────────────────┐
```
Callout labels = anatomy part names, exactly (`Doc/Callout`).

#### 02 Props and tokens
One `Doc/Table` per public sub-component (columns: Prop name · Description · Type · Prop values · Default; required props marked `*`). Then a reference instance and the token table.

```
Props [{Name}]                     Props [{Name}Header]
┌──────────┬─────────────┬──────┬──────────────┬─────────┐
│ Prop name│ Description │ Type │ Prop values  │ Default │
├──────────┼─────────────┼──────┼──────────────┼─────────┤
│ size *   │ …           │ enum │ • sm • md    │ md      │
└──────────┴─────────────┴──────┴──────────────┴─────────┘

Tokens            ┌ reference instance ┐
┌───────────────────┬─────────┬──────────────────────────────────────┐
│ Part · property   │ State   │ Token                                │
├───────────────────┼─────────┼──────────────────────────────────────┤
│ container · bg    │ Default │ color-background-neutral-default     │
└───────────────────┴─────────┴──────────────────────────────────────┘
```

#### 03 Variations
One block per property, in D4 order. Each value = one `Doc/Tile` with a live instance and caption `property = Value`. Other properties stay at default.

```
{property}
{one-line description from A4}
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│   ▢ instance     │ │   ▢ instance     │ │   ▢ instance     │
│                  │ │                  │ │                  │
│ size = SM        │ │ size = MD        │ │ size = LG        │
└──────────────────┘ └──────────────────┘ └──────────────────┘
────────────────────────────────────────────────────────────── (Doc/Divider)
```

#### 04 States and motion
One `Doc/Motion row` per transition in B4.

```
States           Animation          Trigger    Timeline (ms)                    Transition properties
──────────────── ────────────────── ────────── ──────────────────────────────── ──────────────────────────────
Initial state    ┌──────────────┐               0  70  150  200  300  400  600  ┌────────────────────────────┐
 ▢ Default       │ prototype    │   Hover       ├──────┤                        │ duration: motion-duration-sm│
Final state      │ preview      │               └ 150 ┘                         │ easing:   motion-easing-std │
 ▢ Hover         └──────────────┘                                               └────────────────────────────┘
                                                                                [Background  ■ ▸ ■]
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
```
Timeline bar length = the duration token's value. Property chip shows the from → to token swatches. Add a reduced-motion note at the end.

#### 05 Usage guidelines
"When to use" as a `Doc/Uses` card, then rule groups, each with a `Doc/Do` + `Doc/Dont` pair holding live, realistic compositions.

```
{Rule group title}
• {rule}
┌─ ✓ Do ──────────────────────────┐   ┌─ ✗ Don't ───────────────────────┐
│ • {rule}                        │   │ • {rule}                        │
│ ┌─────────────────────────────┐ │   │ ┌─────────────────────────────┐ │
│ │ realistic example (instance)│ │   │ │ wrong example (instance)    │ │
│ └─────────────────────────────┘ │   │ └─────────────────────────────┘ │
└─────────────────────────────────┘   └─────────────────────────────────┘
```

#### 06 Content guidelines
Same layout as 05, with copy rules from A6. Show EN and AR examples side by side in the Do card.

#### 07 Platform
One `Doc/Uses` card per layout context of this platform, each with a `Doc/Device frame` containing skeleton page content (`Doc/Skeleton`) and the component in place. Web: Desktop + narrow web. Tablet: Landscape + Portrait. Mobile: Phone. End with the platform differences table from A8.

```
Desktop
These are used on web apps / dashboards.
┌─ ★ Uses ───────────────────────────────────────────┐
│ {rule}                                             │
│ ┌─ Doc/Device frame ─────────────────────────────┐ │
│ │ ▬▬▬▬▬▬▬▬                                       │ │
│ │ ▢▢   ┌ component ┐   ▬▬▬▬▬▬▬▬                  │ │
│ │      └───────────┘   ▬▬▬▬▬▬                    │ │
│ └────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────┘
```

#### 08 RTL
LTR and RTL instances side by side for each structurally different variant, with `Doc/Callout` on every mirrored and non-mirrored part (B5). Arabic sample copy.

```
LTR (en)                              RTL (ar)
┌──────────────────────────────┐      ┌──────────────────────────────┐
│ [◆] Title text          [▸]  │      │  [◂]          عنوان البطاقة [◆] │
└──────────────────────────────┘      └──────────────────────────────┘
  ◆ not mirrored · ▸ mirrored
```

#### 09 Accessibility
`Doc/Section` blocks: Use case · Keyboard (table from B6) · Screen reader output · Focus (instance in Focus state with ring callout) · Target size (overlay showing `target-min`) · Colors (contrast pairs).

#### 10 Changes from previous version
Only when the version is > 1.0. New (live instance, with `Doc/Change note` callouts) next to Previous (old instance or image, hatched with `Doc/Deprecated overlay`). Notes use strike-through for the old value and bold for the new one, e.g. ~~`spacing-lg` fixed~~ → **`spacing-md` variable**.

```
New                                          Previous
┌──────────────────────────┐ ◂ change note   ┌──────────────────────────┐
│ ▢ current instance       │                 │ ╱╱╱ old version ╱╱╱╱╱╱╱  │
└──────────────────────────┘                 └──────────────────────────┘
```

#### 11 Changelog
`Doc/Table` from the changelogs (Version · Date · Change · Breaking · Migration).

Component description field (Figma "Description"): one line from A1 + link to the spec.

## 10. Code Connect

- File: `3-web-components/src/components/text-field/TextField.figma.tsx`
- Mapping: D4 table. Publish after code and Figma are both `Approved`

## 11. Rules

All rules in **D1** (§8), plus:

**Component tokens only (strict, D-13).** This file may contain exactly one kind of local variable: the `<Component> / <Group>` collections in §2. Never create a local primitive or semantic variable or any other collection; never copy or detach a library variable; never create a local text, effect, colour or grid style; bind layers to the component token when one exists for the property. Run `_sync/figma-read-tokens.js` (lint) **before Phase 1 and after each phase** — it must report 0 violations.

## 12. Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 `Text field` and `Text area` sets plus private `.Field/*` bases match D2–D3 and A2
- [ ] F-AC-2 Properties match D4 exactly, including defaults and EN/AR sample copy
- [ ] F-AC-3 Variant count is 216 with no Disabled × Error=True variants
- [ ] F-AC-4 Zero raw visual values; all values use component tokens or published styles/components; token lint reports zero
- [ ] F-AC-5 Light and Dark switch by variable mode; Typography mode is Web
- [ ] F-AC-6 RTL matches D7 and Arabic copy wraps without clipping
- [ ] F-AC-7 Interactions match D6 and component descriptions are filled
- [ ] F-AC-8 Every B2–B3 mapping passes a redline check for SM, MD and LG
- [ ] F-AC-9 Documentation pages and Components List card use only Doc Kit components and live instances, or Phase 2 is explicitly blocked on the missing kit
- [ ] F-AC-10 Legacy mapping is recorded; legacy sets are not moved until approval and product instance migration

- [ ] F-AC-L1 Lint (`figma-read-tokens.js`) = 0 violations before Phase 1, after Phase 1 and after Phase 2 (outputs attached in D11)
- [ ] F-AC-L2 Every variable, style and component used comes from §2–§6 by key — no new local variables except component tokens, no local styles

## 13. When you finish

1. Fill [D11 Execution log](text-field.md#d11-execution-log-filled-by-the-figma-agent) in `text-field.md` (stages, node IDs of the set, docs section and pages, lint outputs, deviations, questions).
2. Set **Figma build** to `Built` in the header of `text-field.md` and in `3-web-components/README.md`.
3. `npm run sync:done:web` — records this contract as built in the Web file.
4. Add one line to the root `CHANGELOG.md`.

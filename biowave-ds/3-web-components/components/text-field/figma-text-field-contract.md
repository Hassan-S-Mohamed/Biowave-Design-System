<!-- GENERATED from text-field.md @ 73c030b6de9bd26e — do not edit; change the source and run: npm run contract -- web text-field -->
# Text field · حقل نص — Web — Figma contract

> **Everything the Figma Agent needs to build Text field in the Web Components file, with our variables and styles.** Read this file only. Generated from [`text-field.md`](text-field.md) (Parts A, B, D) and the Figma library index (`_sync/figma-library.json`, read 2026-10-28). Questions go to [D11 Execution log](text-field.md#d11-execution-log-filled-by-the-figma-agent) — never invent.

**Two phases, one review:** Phase 1 — build the component set (§7–§8). Phase 2 — as soon as Phase 1 is finished, the 12 documentation pages and the Components List card (§9).

| | |
|---|---|
| Target file | **Biowave DS — Web Components** · key `7nDhsPNntzIWlrjmuSmZ9l` · https://www.figma.com/design/7nDhsPNntzIWlrjmuSmZ9l |
| Page | `↳ Text field` (one page per component) |
| Component | Text field · حقل نص |
| Platform | Web · React + MUI |
| Version | 1.2 · 2026-10-21 |
| Source | [`text-field.md`](text-field.md) @ `73c030b6de9bd26e` |

## 1. Library connections in this file

| | |
|---|---|
| Library | **Biowave DS — Foundations** · library key `lk-e00b31b21f924b36eeea820da99c4b306c460986c83e894f415a1c194ba5a2e670f3142c2fccca81280a80bcaee6a87bc47c9a9505d186d7b693aa9805ad7031` |
| Library file | Foundations · key `AyFaSmfDUlTax3GpKhRdHI` |
| Doc Kit library (Phase 2) | **Annotation (Biowave Doc Kit)** · file key `cBPWg6YZNqK8UIzgMQIpXl` — must be enabled in this file (Assets → Libraries) |
| Enabled here | ✓ verified from a component file: 9 collections, 347 variables reachable |

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
| Text field / Size | sm · md · lg | `action-box` | sm → 4. Size › `size/icon/lg`<br>md → 4. Size › `size/control/height/sm`<br>lg → 4. Size › `size/control/height/md` |
| Text field / Size | sm · md · lg | `action-inset` | sm → 3. Spacing › `spacing/xs`<br>md → 3. Spacing › `spacing/xs`<br>lg → 3. Spacing › `spacing/xs` |
| Text field / State | default · hover · focus · error · disabled · read-only | `background` | default → 1. Themes › `color/background/base/default`<br>hover → 1. Themes › `color/background/base/hovered`<br>focus → 1. Themes › `color/background/base/default`<br>error → 1. Themes › `color/background/base/default`<br>disabled → 1. Themes › `color/background/disabled`<br>read-only → 1. Themes › `color/background/base/subtlest` |
| Text field / State | default · hover · focus · error · disabled · read-only | `border` | default → 1. Themes › `color/border/bold`<br>hover → 1. Themes › `color/border/bold`<br>focus → 1. Themes › `color/border/focus`<br>error → 1. Themes › `color/border/error`<br>disabled → 1. Themes › `color/border/disabled`<br>read-only → 1. Themes › `color/border/default` |
| Text field / State | default · hover · focus · error · disabled · read-only | `border-width` | default → 9. Border › `border/width/default`<br>hover → 9. Border › `border/width/default`<br>focus → 9. Border › `border/width/focus`<br>error → 9. Border › `border/width/default`<br>disabled → 9. Border › `border/width/default`<br>read-only → 9. Border › `border/width/default` |
| Text field / State | default · hover · focus · error · disabled · read-only | `label` | default → 1. Themes › `color/text/default`<br>hover → 1. Themes › `color/text/default`<br>focus → 1. Themes › `color/text/default`<br>error → 1. Themes › `color/text/default`<br>disabled → 1. Themes › `color/text/disabled`<br>read-only → 1. Themes › `color/text/default` |
| Text field / State | default · hover · focus · error · disabled · read-only | `input` | default → 1. Themes › `color/text/default`<br>hover → 1. Themes › `color/text/default`<br>focus → 1. Themes › `color/text/default`<br>error → 1. Themes › `color/text/default`<br>disabled → 1. Themes › `color/text/disabled`<br>read-only → 1. Themes › `color/text/default` |
| Text field / State | default · hover · focus · error · disabled · read-only | `placeholder` | default → 1. Themes › `color/text/subtlest`<br>hover → 1. Themes › `color/text/subtlest`<br>focus → 1. Themes › `color/text/subtlest`<br>error → 1. Themes › `color/text/subtlest`<br>disabled → 1. Themes › `color/text/disabled`<br>read-only → 1. Themes › `color/text/subtlest` |
| Text field / State | default · hover · focus · error · disabled · read-only | `icon` | default → 1. Themes › `color/icon/subtlest`<br>hover → 1. Themes › `color/icon/subtlest`<br>focus → 1. Themes › `color/icon/default`<br>error → 1. Themes › `color/icon/subtlest`<br>disabled → 1. Themes › `color/icon/disabled`<br>read-only → 1. Themes › `color/icon/subtlest` |
| Text field / State | default · hover · focus · error · disabled · read-only | `supporting` | default → 1. Themes › `color/text/subtlest`<br>hover → 1. Themes › `color/text/subtlest`<br>focus → 1. Themes › `color/text/subtlest`<br>error → 1. Themes › `color/text/role/error`<br>disabled → 1. Themes › `color/text/disabled`<br>read-only → 1. Themes › `color/text/subtlest` |
| Text field / State | default · hover · focus · error · disabled · read-only | `counter` | default → 1. Themes › `color/text/subtlest`<br>hover → 1. Themes › `color/text/subtlest`<br>focus → 1. Themes › `color/text/subtlest`<br>error → 1. Themes › `color/text/role/error`<br>disabled → 1. Themes › `color/text/disabled`<br>read-only → 1. Themes › `color/text/subtlest` |
| Text field / State | default · hover · focus · error · disabled · read-only | `required` | default → 1. Themes › `color/text/role/error`<br>hover → 1. Themes › `color/text/role/error`<br>focus → 1. Themes › `color/text/role/error`<br>error → 1. Themes › `color/text/role/error`<br>disabled → 1. Themes › `color/text/disabled`<br>read-only → 1. Themes › `color/text/role/error` |
| Text field / State | default · hover · focus · error · disabled · read-only | `addon-background` | default → 1. Themes › `color/background/neutral/default`<br>hover → 1. Themes › `color/background/neutral/default`<br>focus → 1. Themes › `color/background/neutral/default`<br>error → 1. Themes › `color/background/neutral/default`<br>disabled → 1. Themes › `color/background/disabled`<br>read-only → 1. Themes › `color/background/neutral/default` |
| Text field / State | default · hover · focus · error · disabled · read-only | `addon-text` | default → 1. Themes › `color/text/subtle`<br>hover → 1. Themes › `color/text/subtle`<br>focus → 1. Themes › `color/text/subtle`<br>error → 1. Themes › `color/text/subtle`<br>disabled → 1. Themes › `color/text/disabled`<br>read-only → 1. Themes › `color/text/subtle` |
| Text field / State | default · hover · focus · error · disabled · read-only | `error-icon` | default → 1. Themes › `color/icon/role/error`<br>hover → 1. Themes › `color/icon/role/error`<br>focus → 1. Themes › `color/icon/role/error`<br>error → 1. Themes › `color/icon/role/error`<br>disabled → 1. Themes › `color/icon/disabled`<br>read-only → 1. Themes › `color/icon/role/error` |

## 3. Foundations variables used (keys)

| Token | Figma variable | Key | Type | Scopes | Used by |
|---|---|---|---|---|---|
| `border-width-default` | 9. Border › `border/width/default` | `9b62f24ecdfc438789ce3fa296e725ac14b1e08f` | FLOAT | STROKE_FLOAT | spec, component token |
| `border-width-focus` | 9. Border › `border/width/focus` | `d660bcb01777958134799fe11a99a63aaf1fbfca` | FLOAT | STROKE_FLOAT | spec, component token |
| `color-background-base-default` | 1. Themes › `color/background/base/default` | `82c8830a9ba9a3837c6d6f261cc1b43e8b6a9c08` | COLOR | FRAME_FILL, SHAPE_FILL | spec, component token |
| `color-background-base-hovered` | 1. Themes › `color/background/base/hovered` | `748ab6c7d3faeb25b160aa79b60eeadf0dba10a6` | COLOR | FRAME_FILL, SHAPE_FILL | spec, component token |
| `color-background-base-subtlest` | 1. Themes › `color/background/base/subtlest` | `99e507c57d0911a93c3305a2454046b2b28d3acb` | COLOR | FRAME_FILL, SHAPE_FILL | spec, component token |
| `color-background-disabled` | 1. Themes › `color/background/disabled` | `3697f6cbec9ecaa8acf84032dbdb9f6a1607a6ff` | COLOR | FRAME_FILL, SHAPE_FILL | spec, component token |
| `color-background-neutral-default` | 1. Themes › `color/background/neutral/default` | `2dc9c39d4df7b490fd0d7ac7385b49fdaf0e973e` | COLOR | FRAME_FILL, SHAPE_FILL | spec, component token |
| `color-border-bold` | 1. Themes › `color/border/bold` | `ab8b644249ebef8ab1b6a1efc54e0b4e504d3979` | COLOR | STROKE_COLOR | spec, component token |
| `color-border-default` | 1. Themes › `color/border/default` | `ad520e82898707a0d3112a12f6f9439566c6d6c4` | COLOR | STROKE_COLOR | spec, component token |
| `color-border-disabled` | 1. Themes › `color/border/disabled` | `a6d557c3fa0bcb0e2e6b6592234d737ef80936bf` | COLOR | STROKE_COLOR | spec, component token |
| `color-border-error` | 1. Themes › `color/border/error` | `28b0f15306faf6c8113f5acdf14ed8fc66e02c57` | COLOR | STROKE_COLOR | spec, component token |
| `color-border-focus` | 1. Themes › `color/border/focus` | `ef666d3badd2b63f18cb168d9987ead7fbc21480` | COLOR | STROKE_COLOR | spec, component token |
| `color-icon-default` | 1. Themes › `color/icon/default` | `b0844bd913aafe8789a44bc7b647058cdae299df` | COLOR | SHAPE_FILL, STROKE_COLOR | spec, component token |
| `color-icon-disabled` | 1. Themes › `color/icon/disabled` | `708926473ca446a26d4a0891351f04692171f74f` | COLOR | SHAPE_FILL, STROKE_COLOR | spec, component token |
| `color-icon-role-error` | 1. Themes › `color/icon/role/error` | `e7e61106b7c9b1c60197d2c456ad055991cc545d` | COLOR | SHAPE_FILL, STROKE_COLOR | spec, component token |
| `color-icon-subtlest` | 1. Themes › `color/icon/subtlest` | `22b53651f4efa195f0dfb625922d0279003534eb` | COLOR | SHAPE_FILL, STROKE_COLOR | spec, component token |
| `color-text-default` | 1. Themes › `color/text/default` | `4ea63d9ab5254c4df4eba4d26f771377a07929c4` | COLOR | TEXT_FILL | spec, component token |
| `color-text-disabled` | 1. Themes › `color/text/disabled` | `f88c10f90f454d356c14cc3240da0f04eafbbedd` | COLOR | TEXT_FILL | spec, component token |
| `color-text-role-error` | 1. Themes › `color/text/role/error` | `99d512c8b115971ff7f8045c6decd1cada845f37` | COLOR | TEXT_FILL | spec, component token |
| `color-text-subtle` | 1. Themes › `color/text/subtle` | `dac97f2fd2a80ccffd6283bcc06c623f64ebe90a` | COLOR | TEXT_FILL | spec, component token |
| `color-text-subtlest` | 1. Themes › `color/text/subtlest` | `8ff5fe7707ac2ac866b453191dea9cdd680d0c8d` | COLOR | TEXT_FILL | spec, component token |
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

### Icons (keys) — Google · Material Symbols library (D-18)

Library file **Google · Material Symbols** · key `RXlnhYgUKBBE6HveEr7e9C` — must be enabled in this file. Import the set, then use the **Style=Rounded** variant (`Fill=Filled` only for selected states). Colour the glyph by binding its vector fills to the icon colour token of the part.

| Icon | Set key | Rounded (unfilled) | Rounded (filled) |
|---|---|---|---|
| `close` | `e59e13c612139f0079fe8e1c86a696f24a335eec` | `59b74c3af3cc86471fc3c3da406e1af6f4653030` | `ba5c2563c6776e81c31d5f5212c1376851c1ff4d` |
| `lock` | `6d6db24b56e1aedc14c06debb38ebc4c4efa6b9f` | `7dc2d539af63651f3d5a05a45e199e30af0e03a1` | `114b8dcc062a768a73ad5d1f8fd4feafa3c437f8` |
| `mail` | `c0a48a046c2a3fb66c36765d7f150b2ac9a045e0` | `0414b32813202713bf05545f2c8154575f842511` | `c625c93be50f00889f8de6e1d8b1747d848531c9` |
| `visibility` | `d4d08ec08d56bace685378780686e9bd9ba2fbc3` | `83dc756659ab4833731edbafcfd2361e27a9c1c8` | `f46d69180f0839c329e6351aaf0fe815437c4452` |
| `visibility_off` | `054d29dbcf6cb2420c4873417710beff739fef54` | `adbd73bbe19f80439bea7d89c8e4a6d2aea759c7` | `bac555932dd47f792543c1adfdb8223644f531ef` |

## 7. Phase 1 — values (from Part B)

### B1 API

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

### B3 Tokens by part and state

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

## 8. Phase 1 — build the component set (from Part D)

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

| Component | Key | Kind |
|---|---|---|
| `Doc/Logo` | `b0506262908cc9602fb86d1d2f2d1574b8797fb1` | COMPONENT |
| `Doc/Version chip` | `20beed5d39281d472c391a3a23650a34058cff6a` | COMPONENT |
| `Doc/Divider` | `719437f0bf3e0276b697f22b886be069e1e428aa` | COMPONENT_SET |
| `Doc/Section` | `f29dffabb982e9374b1b804639f45514a29146a2` | COMPONENT |
| `Doc/Code block` | `9bcc61d27ad9bf6c4d4a9e5a6e3e6ebd37af5028` | COMPONENT |
| `Doc/Property chip` | `8990d04a48fb07d7f8f1056307d1faf3dc0ded65` | COMPONENT |
| `Doc/Header` | `dd9347ba546590b632ae68976fe2733f3f7d340e` | COMPONENT |
| `Doc/Axis label` | `24a64b9f56bb95bffc1b5f1ce61e58205b3023fb` | COMPONENT_SET |
| `Doc/Bracket` | `b10364d75b1d8c84e235d63773c0c7870898354a` | COMPONENT_SET |
| `Doc/Callout` | `24c24d19f00001b99acb880c3101afb1842a64f6` | COMPONENT_SET |
| `Doc/Panel` | `b8b20494dcf5f71d3492d90a96498d510d490132` | COMPONENT_SET |
| `Doc/Tile` | `eb3bac08d98c62634cbbc8a6a0129a5fa1783836` | COMPONENT |
| `Doc/Change note` | `5cc8476dd2952640e8138cf21feeb637cfcfe73a` | COMPONENT |
| `Doc/Deprecated overlay` | `d75a185f612de5fa7daadaff9083edff16c42fc4` | COMPONENT |
| `Doc/Table cell` | `4b48bcab4faac402c079e941b30f8987159bfa3f` | COMPONENT_SET |
| `Doc/Table row` | `fb2c9fdd139f3be6860495d1d95a911275ed8224` | COMPONENT_SET |
| `Doc/Table` | `40980251551a20a72810037dc043c66e9271600b` | COMPONENT |
| `Doc/Timeline` | `81d060910749d01da7648f5ae3877e283d668377` | COMPONENT_SET |
| `Doc/Motion row` | `2072d9e2a11281879696f1f8c6ee6ef917b029ac` | COMPONENT |
| `Doc/Uses` | `25ed1809ed37c229827ee8019ec52fe129ec0d31` | COMPONENT |
| `Doc/Do` | `45fdac0674bae9a7d6502a0d2e7f76943d8ea4f1` | COMPONENT |
| `Doc/Dont` | `b6271df857b44407da2657601b4e388bf843b7e8` | COMPONENT |
| `Doc/Skeleton` | `cdb8f9c05ff039be8fda885a25e3ade2986da93b` | COMPONENT_SET |
| `Doc/Device frame` | `c7c9ec2e833fad1b54333707c2210744515d5339` | COMPONENT_SET |
| `Doc/Home header` | `e9c1ee6681300d4c2a04e8f563c308642a3db3df` | COMPONENT |
| `Doc/Title bar` | `2c79bbf4615cf2c6fc8ef6a14390a32d2832d48d` | COMPONENT |
| `Doc/Home card` | `bdd6e95450e128f7b3d3d5fa86b655a6986d2cfa` | COMPONENT |
| `Doc/Footer` | `dd342bd1d199a8c5f353c58125681fad6b6c09f2` | COMPONENT |

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

- [ ] F-AC-L1 Lint (`figma-read-tokens.js`) = 0 violations before Phase 1, after Phase 1 and after Phase 2 (outputs attached in D11)
- [ ] F-AC-L2 Every variable, style and component used comes from §2–§6 by key — no new local variables except component tokens, no local styles

## 13. When you finish

1. Fill [D11 Execution log](text-field.md#d11-execution-log-filled-by-the-figma-agent) in `text-field.md` (stages, node IDs of the set, docs section and pages, lint outputs, deviations, questions).
2. Set **Figma build** to `Built` in the header of `text-field.md` and in `3-web-components/README.md`.
3. `npm run sync:done:web` — records this contract as built in the Web file.
4. Add one line to the root `CHANGELOG.md`.

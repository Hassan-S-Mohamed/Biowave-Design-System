<!-- GENERATED from text-field.md @ d9e1c84bf01138af — do not edit; change the source and run: npm run contract -- mobile text-field -->
# Text field · حقل نص — Mobile — Figma contract

> **Everything the Figma Agent needs to build Text field in the Mobile Components file, with our variables and styles.** Read this file only. Generated from [`text-field.md`](text-field.md) (Parts A, B, D) and the Figma library index (`_sync/figma-library.json`, read 2026-10-18). Questions go to [D11 Execution log](text-field.md#d11-execution-log-filled-by-the-figma-agent) — never invent.

**Two phases, one review:** Phase 1 — build the component set (§7–§8). Phase 2 — as soon as Phase 1 is finished, the 12 documentation pages and the Components List card (§9).

| | |
|---|---|
| Target file | **Biowave DS — Mobile Components** · key `249tIAxlZogRvgBBXjcIZ5` · https://www.figma.com/design/249tIAxlZogRvgBBXjcIZ5 |
| Page | `↳ Text field` (one page per component) |
| Component | Text field · حقل نص |
| Platform | Mobile · Flutter + Material 3 |
| Version | 1.2 · 2026-10-24 (spec and code plan 1.2; guidelines unchanged, same as Web 1.1) |
| Source | [`text-field.md`](text-field.md) @ `d9e1c84bf01138af` |

## 1. Library connections in this file

| | |
|---|---|
| Library | **Biowave DS — Foundations** · library key `lk-e00b31b21f924b36eeea820da99c4b306c460986c83e894f415a1c194ba5a2e670f3142c2fccca81280a80bcaee6a87bc47c9a9505d186d7b693aa9805ad7031` |
| Library file | Foundations · key `AyFaSmfDUlTax3GpKhRdHI` |
| Doc Kit library (Phase 2) | **Annotation (Biowave Doc Kit)** · file key `cBPWg6YZNqK8UIzgMQIpXl` — must be enabled in this file (Assets → Libraries) |
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
| Text field / Size | sm · md · lg | `action-box` | sm → 4. Size › `size/icon/lg`<br>md → 4. Size › `size/control/height/sm`<br>lg → 4. Size › `size/control/height/md` |
| Text field / Size | sm · md · lg | `action-inset` | sm → 3. Spacing › `spacing/xs`<br>md → 3. Spacing › `spacing/xs`<br>lg → 3. Spacing › `spacing/xs` |
| Text field / State | default · hover · focus · error · disabled · read-only | `background` | default → 1. Themes › `color/background/base/default`<br>hover → 1. Themes › `color/background/base/default`<br>focus → 1. Themes › `color/background/base/default`<br>error → 1. Themes › `color/background/base/default`<br>disabled → 1. Themes › `color/background/base/disabled`<br>read-only → 1. Themes › `color/background/neutral/subtle` |
| Text field / State | default · hover · focus · error · disabled · read-only | `border` | default → 1. Themes › `color/border/input/default`<br>hover → 1. Themes › `color/border/input/hover`<br>focus → 1. Themes › `color/border/focus`<br>error → 1. Themes › `color/border/input/error`<br>disabled → 1. Themes › `color/border/disabled`<br>read-only → 1. Themes › `color/border/default` |
| Text field / State | default · hover · focus · error · disabled · read-only | `border-width` | default → 9. Border › `border/width/default`<br>hover → 9. Border › `border/width/default`<br>focus → 9. Border › `border/width/focus`<br>error → 9. Border › `border/width/default`<br>disabled → 9. Border › `border/width/default`<br>read-only → 9. Border › `border/width/default` |
| Text field / State | default · hover · focus · error · disabled · read-only | `label` | default → 1. Themes › `color/text/neutral/default`<br>hover → 1. Themes › `color/text/neutral/default`<br>focus → 1. Themes › `color/text/neutral/default`<br>error → 1. Themes › `color/text/neutral/default`<br>disabled → 1. Themes › `color/text/neutral/disabled`<br>read-only → 1. Themes › `color/text/neutral/default` |
| Text field / State | default · hover · focus · error · disabled · read-only | `input` | default → 1. Themes › `color/text/neutral/default`<br>hover → 1. Themes › `color/text/neutral/default`<br>focus → 1. Themes › `color/text/neutral/default`<br>error → 1. Themes › `color/text/neutral/default`<br>disabled → 1. Themes › `color/text/neutral/disabled`<br>read-only → 1. Themes › `color/text/neutral/default` |
| Text field / State | default · hover · focus · error · disabled · read-only | `placeholder` | default → 1. Themes › `color/text/neutral/placeholder`<br>hover → 1. Themes › `color/text/neutral/placeholder`<br>focus → 1. Themes › `color/text/neutral/placeholder`<br>error → 1. Themes › `color/text/neutral/placeholder`<br>disabled → 1. Themes › `color/text/neutral/disabled`<br>read-only → 1. Themes › `color/text/neutral/placeholder` |
| Text field / State | default · hover · focus · error · disabled · read-only | `icon` | default → 1. Themes › `color/icon/neutral/muted`<br>hover → 1. Themes › `color/icon/neutral/muted`<br>focus → 1. Themes › `color/icon/neutral/default`<br>error → 1. Themes › `color/icon/neutral/muted`<br>disabled → 1. Themes › `color/icon/neutral/disabled`<br>read-only → 1. Themes › `color/icon/neutral/muted` |
| Text field / State | default · hover · focus · error · disabled · read-only | `supporting` | default → 1. Themes › `color/text/neutral/muted`<br>hover → 1. Themes › `color/text/neutral/muted`<br>focus → 1. Themes › `color/text/neutral/muted`<br>error → 1. Themes › `color/text/role/error`<br>disabled → 1. Themes › `color/text/neutral/disabled`<br>read-only → 1. Themes › `color/text/neutral/muted` |
| Text field / State | default · hover · focus · error · disabled · read-only | `counter` | default → 1. Themes › `color/text/neutral/muted`<br>hover → 1. Themes › `color/text/neutral/muted`<br>focus → 1. Themes › `color/text/neutral/muted`<br>error → 1. Themes › `color/text/role/error`<br>disabled → 1. Themes › `color/text/neutral/disabled`<br>read-only → 1. Themes › `color/text/neutral/muted` |
| Text field / State | default · hover · focus · error · disabled · read-only | `required` | default → 1. Themes › `color/text/role/error`<br>hover → 1. Themes › `color/text/role/error`<br>focus → 1. Themes › `color/text/role/error`<br>error → 1. Themes › `color/text/role/error`<br>disabled → 1. Themes › `color/text/neutral/disabled`<br>read-only → 1. Themes › `color/text/role/error` |
| Text field / State | default · hover · focus · error · disabled · read-only | `addon-background` | default → 1. Themes › `color/background/neutral/default`<br>hover → 1. Themes › `color/background/neutral/default`<br>focus → 1. Themes › `color/background/neutral/default`<br>error → 1. Themes › `color/background/neutral/default`<br>disabled → 1. Themes › `color/background/base/disabled`<br>read-only → 1. Themes › `color/background/neutral/default` |
| Text field / State | default · hover · focus · error · disabled · read-only | `addon-text` | default → 1. Themes › `color/text/neutral/subtle`<br>hover → 1. Themes › `color/text/neutral/subtle`<br>focus → 1. Themes › `color/text/neutral/subtle`<br>error → 1. Themes › `color/text/neutral/subtle`<br>disabled → 1. Themes › `color/text/neutral/disabled`<br>read-only → 1. Themes › `color/text/neutral/subtle` |
| Text field / State | default · hover · focus · error · disabled · read-only | `error-icon` | default → 1. Themes › `color/icon/role/error`<br>hover → 1. Themes › `color/icon/role/error`<br>focus → 1. Themes › `color/icon/role/error`<br>error → 1. Themes › `color/icon/role/error`<br>disabled → 1. Themes › `color/icon/neutral/disabled`<br>read-only → 1. Themes › `color/icon/role/error` |

## 3. Foundations variables used (keys)

| Token | Figma variable | Key | Type | Scopes | Used by |
|---|---|---|---|---|---|
| `border-width-default` | 9. Border › `border/width/default` | `9b62f24ecdfc438789ce3fa296e725ac14b1e08f` | FLOAT | STROKE_FLOAT | spec, component token |
| `border-width-focus` | 9. Border › `border/width/focus` | `d660bcb01777958134799fe11a99a63aaf1fbfca` | FLOAT | STROKE_FLOAT | spec, component token |
| `color-background-base-default` | 1. Themes › `color/background/base/default` | `82c8830a9ba9a3837c6d6f261cc1b43e8b6a9c08` | COLOR | FRAME_FILL, SHAPE_FILL | component token |
| `color-background-base-disabled` | 1. Themes › `color/background/base/disabled` | `3697f6cbec9ecaa8acf84032dbdb9f6a1607a6ff` | COLOR | FRAME_FILL, SHAPE_FILL | component token |
| `color-background-neutral-default` | 1. Themes › `color/background/neutral/default` | `2dc9c39d4df7b490fd0d7ac7385b49fdaf0e973e` | COLOR | FRAME_FILL, SHAPE_FILL | component token |
| `color-background-neutral-subtle` | 1. Themes › `color/background/neutral/subtle` | `99e507c57d0911a93c3305a2454046b2b28d3acb` | COLOR | FRAME_FILL, SHAPE_FILL | component token |
| `color-border-default` | 1. Themes › `color/border/default` | `ad520e82898707a0d3112a12f6f9439566c6d6c4` | COLOR | STROKE_COLOR | component token |
| `color-border-disabled` | 1. Themes › `color/border/disabled` | `a6d557c3fa0bcb0e2e6b6592234d737ef80936bf` | COLOR | STROKE_COLOR | component token |
| `color-border-focus` | 1. Themes › `color/border/focus` | `ef666d3badd2b63f18cb168d9987ead7fbc21480` | COLOR | STROKE_COLOR | spec, component token |
| `color-border-input-default` | 1. Themes › `color/border/input/default` | `ab8b644249ebef8ab1b6a1efc54e0b4e504d3979` | COLOR | STROKE_COLOR | component token |
| `color-border-input-error` | 1. Themes › `color/border/input/error` | `e346a0de10a9c6bdfd00c3c5b4cb376b58f3e87f` | COLOR | STROKE_COLOR | spec, component token |
| `color-border-input-hover` | 1. Themes › `color/border/input/hover` | `eadf46670cd0192d6b3ac611127c1762c7e2df5e` | COLOR | STROKE_COLOR | component token |
| `color-icon-neutral-default` | 1. Themes › `color/icon/neutral/default` | `b0844bd913aafe8789a44bc7b647058cdae299df` | COLOR | SHAPE_FILL, STROKE_COLOR | component token |
| `color-icon-neutral-disabled` | 1. Themes › `color/icon/neutral/disabled` | `708926473ca446a26d4a0891351f04692171f74f` | COLOR | SHAPE_FILL, STROKE_COLOR | component token |
| `color-icon-neutral-muted` | 1. Themes › `color/icon/neutral/muted` | `22b53651f4efa195f0dfb625922d0279003534eb` | COLOR | SHAPE_FILL, STROKE_COLOR | component token |
| `color-icon-role-error` | 1. Themes › `color/icon/role/error` | `e7e61106b7c9b1c60197d2c456ad055991cc545d` | COLOR | SHAPE_FILL, STROKE_COLOR | component token |
| `color-text-neutral-default` | 1. Themes › `color/text/neutral/default` | `4ea63d9ab5254c4df4eba4d26f771377a07929c4` | COLOR | TEXT_FILL | component token |
| `color-text-neutral-disabled` | 1. Themes › `color/text/neutral/disabled` | `f88c10f90f454d356c14cc3240da0f04eafbbedd` | COLOR | TEXT_FILL | component token |
| `color-text-neutral-muted` | 1. Themes › `color/text/neutral/muted` | `8ff5fe7707ac2ac866b453191dea9cdd680d0c8d` | COLOR | TEXT_FILL | component token |
| `color-text-neutral-placeholder` | 1. Themes › `color/text/neutral/placeholder` | `60b49c24f7a0bcd05569c52a3497bab40f56840c` | COLOR | TEXT_FILL | component token |
| `color-text-neutral-subtle` | 1. Themes › `color/text/neutral/subtle` | `dac97f2fd2a80ccffd6283bcc06c623f64ebe90a` | COLOR | TEXT_FILL | component token |
| `color-text-role-error` | 1. Themes › `color/text/role/error` | `99d512c8b115971ff7f8045c6decd1cada845f37` | COLOR | TEXT_FILL | component token |
| `radius-md` | 2. Radius › `radius/md` | `0758e506cdfd4d7a4eef6369a4851133d7eab5a4` | FLOAT | CORNER_RADIUS | spec, component token |
| `size-control-height-lg` | 4. Size › `size/control/height/lg` | `14c0f56d2add6f7149374e67cf4d3a2656aeb5dc` | FLOAT | WIDTH_HEIGHT | spec, component token |
| `size-control-height-md` | 4. Size › `size/control/height/md` | `cb6d23a09de76b9cea37c24579dbb2a9e6e6a079` | FLOAT | WIDTH_HEIGHT | spec, component token |
| `size-control-height-sm` | 4. Size › `size/control/height/sm` | `1409647f4e12e37e76b49ed9ce1a78946e4250f4` | FLOAT | WIDTH_HEIGHT | component token |
| `size-icon-lg` | 4. Size › `size/icon/lg` | `e79bd86fedcce89547674c84c9127d0149e60061` | FLOAT | WIDTH_HEIGHT | spec, component token |
| `size-icon-md` | 4. Size › `size/icon/md` | `eb459c673e6ca16e3c81b240f04b467717953a9a` | FLOAT | WIDTH_HEIGHT | component token |
| `size-icon-sm` | 4. Size › `size/icon/sm` | `2aa4b1f12a5ed0745f9a8b3251dc1fd9f7dd3476` | FLOAT | WIDTH_HEIGHT | spec, component token |
| `spacing-control-gap-lg` | 3. Spacing › `spacing/control/gap/lg` | `c9e0925c6738c94acdf8f5220207a44c304e25f0` | FLOAT | WIDTH_HEIGHT, GAP | spec, component token |
| `spacing-control-gap-md` | 3. Spacing › `spacing/control/gap/md` | `e2e6fc01e3a1245e8c3584798b5d224742a9a6bc` | FLOAT | WIDTH_HEIGHT, GAP | component token |
| `spacing-control-gap-sm` | 3. Spacing › `spacing/control/gap/sm` | `97daa7ac19168846d702cc8c210d1e162a484b41` | FLOAT | WIDTH_HEIGHT, GAP | component token |
| `spacing-control-padding-inline-lg` | 3. Spacing › `spacing/control/padding-inline/lg` | `3dddd3d0ffa2e8c03e2ee62241d0b414f9c3f5b5` | FLOAT | WIDTH_HEIGHT, GAP | spec, component token |
| `spacing-control-padding-inline-md` | 3. Spacing › `spacing/control/padding-inline/md` | `ece071c90fd7557c56f2a8918944c46d2672718e` | FLOAT | WIDTH_HEIGHT, GAP | component token |
| `spacing-control-padding-inline-sm` | 3. Spacing › `spacing/control/padding-inline/sm` | `fb323143873973f1548553562791a9983936aa5a` | FLOAT | WIDTH_HEIGHT, GAP | component token |
| `spacing-sm` | 3. Spacing › `spacing/sm` | `8332b62aa90dea8417383c59a11eee680e0f1db5` | FLOAT | WIDTH_HEIGHT, GAP | spec, component token |
| `spacing-xs` | 3. Spacing › `spacing/xs` | `9ea993d003d5368c5100b038d51c7c8f3e95c115` | FLOAT | WIDTH_HEIGHT, GAP | spec, component token |
| `target-min` | 7. Grid & Layout › `target/min` | `db23ec2826d3bfa3e600e5a82801e0c7d37ba298` | FLOAT | WIDTH_HEIGHT | spec |

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
| `search` | `744f9679cd7bc248d4408574f1fde6ce4384c6b5` | `4320ce7aad1cd292e9f5b18a0e2ee5e051888702` | `a80aea8ea3e3761d01a170c3a003b40c9a049455` |
| `visibility` | `d4d08ec08d56bace685378780686e9bd9ba2fbc3` | `83dc756659ab4833731edbafcfd2361e27a9c1c8` | `f46d69180f0839c329e6351aaf0fe815437c4452` |
| `visibility_off` | `054d29dbcf6cb2420c4873417710beff739fef54` | `adbd73bbe19f80439bea7d89c8e4a6d2aea759c7` | `bac555932dd47f792543c1adfdb8223644f531ef` |

## 7. Phase 1 — values (from Part B)

### B1 API

### `BwTextField`

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

## 8. Phase 1 — build the component set (from Part D)

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

### Inherited from Web (D1, D2, D3, D4, D6, D7)

The Mobile Part D refers to these Web sections; they are copied here so you read one file. Apply the Mobile differences above on top.

#### D1 Rules for this build

0. Component tokens only: use `Text field / Size` and `Text field / State` already synced from [`text-field.tokens.json`](text-field.tokens.json). Never create variables or styles by hand
1. Bind every fill, stroke, radius, padding, gap, height and icon size to a component token; text uses published Foundations text styles
2. Each variant sets explicit collection modes for Size and State. Error uses the `error` State mode; an Error + Focus variant overrides only border width to the Focus mode's width while keeping error color
3. Never bind primitives, deprecated variables or legacy input variables
4. Layer names equal A2 anatomy names in kebab-case
5. Auto layout on every frame. The only absolute layer allowed is the field border if needed to keep the focused border inside the component bounds
6. Icons and trailing actions are library instances, never detached

#### D2 Component structure

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

#### D3 Layer tree and auto layout

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

#### D4 Properties

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

#### D6 States, interactions and motion

| Interaction | From → To | Animation |
|---|---|---|
| While hovering | Default → Hover | Smart animate border color · B4 duration/easing |
| On focus | Default/Hover → Focus | Smart animate border color/width · B4 |
| Validation example | Default/Focus → Error equivalent | Smart animate colors · B4 |

Focus is shown as a component state for docs. Disabled and Read-only have no prototype interaction.

#### D7 RTL

Method: `Language=AR` variants. Reverse horizontal auto-layout order, align label/value/supporting text to start, move the counter to inline end and keep counter digits LTR. Do not mirror mail, person, lock, visibility or clear glyphs.

```
EN  │ [◆] name@company.com                         [×] │
AR  │ [×]                         name@company.com [◆] │
```

## 9. Phase 2 — documentation pages and Components List card

### D8 Documentation pages

All 12 standard pages in section `Text field — Documentation`, built only from the Doc Kit (Annotation library, D-17). 07 Platform: `Doc/Device frame` = Mobile portrait, with the on-screen keyboard and Next/Done flow. 09 Accessibility: 48 target overlays on help icon, trailing action and end button.

Component description: “Enters or edits short and multiline text with persistent labels and accessible validation. Spec: 5-mobile-components/components/text-field/text-field.md”.

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

`5-mobile-components/lib/src/components/text_field/bw_text_field.figma.dart` — mapping per D4 with the Flutter names. Publish after code and Figma reviews are both `Approved`.

## 11. Rules

All rules in **D1** (§8 and the inherited Web D1), plus:

**Component tokens only (strict, D-13).** This file may contain exactly one kind of local variable: the `<Component> / <Group>` collections in §2. Never create a local primitive or semantic variable or any other collection; never copy or detach a library variable; never create a local text, effect, colour or grid style; bind layers to the component token when one exists for the property. Run `_sync/figma-read-tokens.js` (lint) **before Phase 1 and after each phase** — it must report 0 violations.

## 12. Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Sets and private bases on `↳ Text field` in the Mobile file; structure and layer names as Web D2–D3 + D2 differences
- [ ] F-AC-2 Properties as Web D4 minus `Resize handle`; variant count 56
- [ ] F-AC-3 Zero raw values; only this component's token collections as local variables; token lint 0
- [ ] F-AC-4 Page Typography mode = `Mobile`; Light/Dark by mode only; Arabic fits without truncation
- [ ] F-AC-5 Values match the Mobile B2–B3 (redline per size, incl. action box inset)
- [ ] F-AC-6 Docs built from the Doc Kit; Components List card added; Code Connect per D9 after approval

- [ ] F-AC-L1 Lint (`figma-read-tokens.js`) = 0 violations before Phase 1, after Phase 1 and after Phase 2 (outputs attached in D11)
- [ ] F-AC-L2 Every variable, style and component used comes from §2–§6 by key — no new local variables except component tokens, no local styles

## 13. When you finish

1. Fill [D11 Execution log](text-field.md#d11-execution-log-filled-by-the-figma-agent) in `text-field.md` (stages, node IDs of the set, docs section and pages, lint outputs, deviations, questions).
2. Set **Figma build** to `Built` in the header of `text-field.md` and in `5-mobile-components/README.md`.
3. `npm run sync:done:mobile` — records this contract as built in the Mobile file.
4. Add one line to the root `CHANGELOG.md`.

#!/usr/bin/env node
// Implementation contracts (R-01). Generated from <name>.md when its plan is Finished — never edited by hand.
//   <name>-contract.md        → code Executor  (Parts A names, B, C + resolved tokens)
//   figma-<name>-contract.md  → Figma Agent    (Parts A, B, D + library connections, variable / style / component KEYS)
//
//   node _docs/contract.mjs <web|tablet|mobile> <name>      both contracts for one component
//   node _docs/contract.mjs --all                            every component whose plan is Finished
//   node _docs/contract.mjs --status                         up to date / stale / missing for every component
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ROOT, SECTIONS, PLATFORM_LABEL, load, listComponents, sectionText, sha, plainStatus } from './component-file.mjs';
import { expectedFigma } from '../_sync/figma-map.mjs';
import { figmaModel, expectedComponentTokens } from '../_sync/component-tokens.mjs';
import { libraryState } from '../_sync/library.mjs';
import { FIGMA_FILES, readJson } from '../_sync/lib.mjs';
import { readIcons, iconNamesIn } from '../_sync/icons.mjs';

const TOKENS = readJson(path.join(ROOT, '2-foundations/dist/tokens.json'));
const DOC_KIT = '2-foundations/figma-doc-kit.md';
const kebab = (p) => p.replace(/\./g, '-');

// ---------------------------------------------------------------- token index (code side)
let TOK;
function tokenIndex() {
  if (TOK) return TOK;
  TOK = new Map();
  const put = (p, o) => { const k = kebab(p); TOK.set(k, { path: p, ...(TOK.get(k) || {}), ...o }); };
  for (const [p, t] of Object.entries(TOKENS.base)) put(p, { value: t.value });
  for (const [p, t] of Object.entries(TOKENS.theme.light)) put(p, { light: t.value });
  for (const [p, t] of Object.entries(TOKENS.theme.dark)) put(p, { dark: t.value });
  for (const plat of Object.keys(TOKENS.platform)) for (const [p, t] of Object.entries(TOKENS.platform[plat])) put(p, { [plat]: t.value });
  for (const e of expectedFigma()) if (e.web && TOK.has(e.web)) TOK.set(e.web, { ...TOK.get(e.web), figma: e });
  return TOK;
}
const show = (v) => (v == null ? '' : typeof v === 'object' ? JSON.stringify(v) : String(v));
function tokensNamed(text) {
  const idx = tokenIndex(), out = new Set();
  for (const m of text.matchAll(/`([a-z][a-z0-9]*(?:-[a-z0-9]+)+)`/g)) if (idx.has(m[1])) out.add(m[1]);
  return [...out].sort();
}

// ---------------------------------------------------------------- sources
function tokensFile(plat, name) {
  const rel = `${SECTIONS[plat]}/components/${name}/${name}.tokens.json`;
  return fs.existsSync(path.join(ROOT, rel)) ? rel : null;
}
const sec = (doc, id) => sectionText(doc, id);
const block = (doc, id, level = '##') => {
  const s = doc.sections[id];
  return s ? `${level} ${id} ${s.title}\n\n${s.text.replace(/^(#{4,6}) /gm, (m, h) => h.slice(1) + ' ')}\n` : '';
};

// Tablet/Mobile Part D says "As Web D2–D4": pull those Web sections in, so the Figma Agent reads one file.
function inheritedWeb(plat, name, doc) {
  if (plat === 'web') return { ids: [], web: null };
  const text = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D10'].map((i) => sec(doc, i)).join('\n') + '\n' + (doc.parts.D?.introText || '');
  const ids = new Set();
  for (const m of text.matchAll(/Web (?:\[)?D(\d+)(?:–D(\d+))?/g)) {
    const a = +m[1], b = m[2] ? +m[2] : a;
    for (let i = a; i <= b; i++) ids.add(`D${i}`);
  }
  if (/Web Part D|\[Web Part D\]/.test(text)) ['D2', 'D3', 'D4'].forEach((i) => ids.add(i));
  const web = load('web', name);
  return { ids: [...ids].sort((x, y) => +x.slice(1) - +y.slice(1)), web };
}

// ---------------------------------------------------------------- hashes (only the parts each contract carries)
function codeHash(c) {
  const t = tokensFile(c.plat, c.name);
  const ids = ['A1', 'A2', 'A4', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B9', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7'];
  return sha(JSON.stringify([c.doc.title, ids.map((i) => sec(c.doc, i)), c.doc.parts.C?.introText, t && fs.readFileSync(path.join(ROOT, t), 'utf8'), 'v1']));
}
function figmaHash(c, lib) {
  const t = tokensFile(c.plat, c.name);
  const ids = [...'123456789'.split('').map((n) => `A${n}`), 'A10', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', ...Array.from({ length: 10 }, (_, i) => `D${i + 1}`)];
  const inh = inheritedWeb(c.plat, c.name, c.doc);
  const libPart = lib ? { v: lib.variables, t: lib.textStyles, e: lib.effectStyles, c: lib.components, r: lib.reach } : null;
  const icx = readIcons(); const iconPart = [...iconNamesIn(c.doc.raw ?? JSON.stringify(ids.map((i) => sec(c.doc, i))))].sort().map((n) => [n, icx.icons[n] || icx.missing?.[n] || null]);
  return sha(JSON.stringify([c.doc.title, c.doc.header.Figma, ids.map((i) => sec(c.doc, i)), c.doc.parts.D?.introText, t && fs.readFileSync(path.join(ROOT, t), 'utf8'),
    inh.web ? inh.ids.map((i) => sec(inh.web.doc, i)) : null, libPart, iconPart, fs.existsSync(path.join(ROOT, DOC_KIT)) ? fs.readFileSync(path.join(ROOT, DOC_KIT), 'utf8') : '', 'v1']));
}
const contractPaths = (plat, name) => ({
  code: `${SECTIONS[plat]}/components/${name}/${name}-contract.md`,
  figma: `${SECTIONS[plat]}/components/${name}/figma-${name}-contract.md`,
});
const headerHash = (rel) => { const abs = path.join(ROOT, rel); if (!fs.existsSync(abs)) return null; const m = /@ ([0-9a-f]{16})/.exec(fs.readFileSync(abs, 'utf8').split('\n')[0]); return m ? m[1] : 'edited'; };

export function contractState(plat, name) {
  const c = load(plat, name); if (!c) return null;
  const plan = plainStatus(c.doc.header.Plan);
  const lib = libraryState().lib;
  const p = contractPaths(plat, name);
  const st = (rel, want) => { const h = headerHash(rel); return h == null ? 'missing' : h === want ? 'current' : 'stale'; };
  return { plan, code: st(p.code, codeHash(c)), figma: st(p.figma, figmaHash(c, lib)), paths: p };
}

// ---------------------------------------------------------------- gates
function gates(c, needFigma) {
  const errs = [];
  const plan = plainStatus(c.doc.header.Plan);
  if (plan !== 'Finished') errs.push(`Plan is "${plan || '—'}" in the header of ${c.rel} — contracts are generated only when it is "Finished"`);
  const ct = expectedComponentTokens(c.plat);
  if (ct.errors.length) errs.push(`npm run component-tokens fails for ${c.plat}: ${ct.errors[0]}`);
  const gap = sec(c.doc, 'C4');
  if (gap && !/^\s*(none|—|-)\b/i.test(gap.replace(/^New tokens.*?:\s*/i, '')) && /\b(add|missing|new token|needed)\b/i.test(gap) && !/none/i.test(gap)) errs.push('C4 Token gaps is not empty — the Planner adds the tokens first');
  let lib = null;
  if (needFigma) {
    const ls = libraryState();
    lib = ls.lib;
    if (!ls.ok) errs.push(`Figma library index ${ls.lib ? 'is stale' : 'is missing'} (${ls.reason}) — run _sync/figma-read-library.js in Figma, then npm run sync:library`);
  }
  return { errs, lib };
}

// ---------------------------------------------------------------- code contract
function codeContract(c) {
  const { doc, plat, name } = c;
  const label = PLATFORM_LABEL[plat];
  const hash = codeHash(c);
  const tfile = tokensFile(plat, name);
  const bText = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B9'].map((i) => sec(doc, i)).join('\n');
  const named = tokensNamed(bText);
  const fieldFocusException = /\*\*Field exception:\*\*|no exterior offset/i.test(sec(doc, 'B6'));
  const idx = tokenIndex();
  const access = (k) => {
    const t = idx.get(k);
    if (plat === 'web') return `\`var(--bw-${k})\` · \`cssVars.${t.path}\``;
    return t.figma?.dart ? `\`${t.figma.dart}\`` : '`context.bw` / `Bw*` constant in `bw_tokens.g.dart`';
  };
  const val = (k) => { const t = idx.get(k); if (t.light != null) return [show(t.light), show(t.dark)]; const v = t[plat] ?? t.value; return [show(v), show(v)]; };
  const parts = (sec(doc, 'A2').match(/^\|\s*\d+\s*\|\s*`[^`]+`.*$/gm) || []).join('\n');
  const options = (sec(doc, 'A4').match(/^####? [\d.]+ .*$/gm) || []).map((l) => '- ' + l.replace(/^####? /, '')).join('\n');
  const cmds = plat === 'web'
    ? ['npm run typecheck', 'npm run test:web', 'npm run component-tokens', 'npm run sync        # must end with READY', 'npm run docs:check']
    : [`cd ${SECTIONS[plat]} && flutter analyze && flutter test`, 'npm run component-tokens', 'npm run sync        # must end with READY', 'npm run docs:check'];
  const L = [];
  L.push(`<!-- GENERATED from ${name}.md @ ${hash} — do not edit; change the source and run: npm run contract -- ${plat} ${name} -->`);
  L.push(`# ${doc.title} — code contract`, '');
  L.push(`> **Everything you need to build ${doc.header.Component?.split('·')[0].trim() || name} on ${label}, and nothing else.** Read this file only. Generated from [\`${name}.md\`](${name}.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](${name}.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.`, '');
  L.push('| | |', '|---|---|');
  for (const k of ['Component', 'Platform', 'Built on', 'Import', 'Version', 'Source code']) if (doc.header[k]) L.push(`| ${k} | ${doc.header[k].replace(/\]\(\.\.\/\.\.\//g, '](../../')} |`);
  L.push(`| Tokens | ${tfile ? `[\`${name}.tokens.json\`](${name}.tokens.json)` : '—'} |`, `| Source | [\`${name}.md\`](${name}.md) @ \`${hash}\` |`, '');
  L.push('## 1. What it is', '', sec(doc, 'A1').split('\n').filter((l) => !l.startsWith('![')).join('\n').trim(), '');
  if (parts) L.push('**Part names** (use exactly these in code, class names and tests):', '', '| # | Part | Required | Role |', '|---|---|---|---|', parts, '');
  if (options) L.push('**Options** (names and values are the props in §2):', '', options, '');
  L.push(block(doc, 'B1', '## 2. API —').replace('## 2. API — B1 API', '## 2. API'));
  L.push(block(doc, 'B2').replace(/^## B2 Dimensions/m, '## 3. Dimensions'));
  L.push(block(doc, 'B3').replace(/^## B3 Tokens by part and state/m, '## 4. Tokens by part and state'));
  if (named.length) {
    L.push(`### 4.1 How to use each token on ${label}`, '', 'Values are for checking only — never paste a value.', '', `| Token | ${plat === 'web' ? 'CSS / TS' : 'Dart'} | Light | Dark |`, '|---|---|---|---|');
    for (const k of named) { const [l, d] = val(k); L.push(`| \`${k}\` | ${access(k)} | ${l} | ${d} |`); }
    L.push('');
  }
  if (tfile) {
    L.push('### 4.2 Component tokens', '', `The code token map must equal [\`${name}.tokens.json\`](${name}.tokens.json) (tests compare them).`, '', '| Collection | Variable | Modes → semantic token |', '|---|---|---|');
    for (const col of figmaModel(tfile).collections) for (const [v, byMode] of Object.entries(col.vars)) L.push(`| ${col.collection} | ${v} | ${Object.entries(byMode).map(([m, t]) => `${m}: \`${kebab(t.path)}\``).join(' · ')} |`);
    L.push('');
  }
  L.push(block(doc, 'B4').replace(/^## B4 /m, '## 5. '));
  L.push(block(doc, 'B5').replace(/^## B5 /m, '## 6. '));
  L.push(block(doc, 'B6').replace(/^## B6 /m, '## 7. '));
  L.push(block(doc, 'B7').replace(/^## B7 /m, '## 8. '));
  L.push('## 9. How to build it', '', `### Goal\n\n${sec(doc, 'C1')}`, '', `### Scope\n\n${sec(doc, 'C2')}`, '', `### Approach\n\n${sec(doc, 'C3')}`, '', `### Token gaps\n\n${sec(doc, 'C4')}`, '', `### Files to create / change\n\n${sec(doc, 'C5')}`, '');
  L.push('## 10. Tests', '', sec(doc, 'B9'), '', sec(doc, 'C6'), '');
  L.push('## 11. Acceptance criteria (the Reviewer checks exactly these)', '', sec(doc, 'C7'), '');
  L.push('## 12. Rules', '',
    '1. Never edit generated files (`*/generated/*`, `2-foundations/dist/`, `2-foundations/preview/`, `_sync/*.json`, any `*-contract.md`).',
    '2. No raw values: no hex, px, ms or font names — only the tokens in §4. A missing value means stop and ask; tokens are added by the Planner.',
    '3. Never use primitives (`primitive.*`, `BwPalette`).',
    `4. RTL first: logical properties only (${plat === 'web' ? '`margin-inline-start`, `padding-inline`, `inset-inline-end`' : '`EdgeInsetsDirectional`, `AlignmentDirectional`, `BorderRadiusDirectional`'}); mirror only directional icons (§6).`,
    '5. Light + dark and en + ar, always — and tested.',
    `6. WCAG 2.2 AA: keyboard, visible focus (${fieldFocusException ? '\`color-border-focus\` at \`border-width-focus\`, with no exterior offset per the documented field exception in §7' : '\`color-border-focus\`, 2px, 2px offset'}), labels, targets ≥ \`target-min\` (${plat === 'web' ? '24px' : '48dp'}), reduced motion.`,
    '7. Stay inside this contract; one component per task; do not refactor unrelated files.', '');
  L.push('## 13. Commands that must pass', '', '```bash', ...cmds, '```', '');
  L.push('## 14. When you finish', '', `1. Fill [C8 Execution log](${name}.md#c8-execution-log-filled-by-the-executor) in \`${name}.md\` (agent, date, files, deviations, questions).`,
    `2. Set **Code** to \`Built\` in the header of \`${name}.md\` and in the Components table of \`${SECTIONS[plat]}/README.md\`.`,
    '3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).', '');
  return L.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
}

// ---------------------------------------------------------------- figma contract
function expandBraces(s) {
  const m = /\{([^{}]+)\}/.exec(s); if (!m) return [s];
  return m[1].split('|').flatMap((alt) => expandBraces(s.slice(0, m.index) + alt + s.slice(m.index + m[0].length)));
}
function figmaContract(c, lib, errors) {
  const { doc, plat, name } = c;
  const label = PLATFORM_LABEL[plat];
  const file = FIGMA_FILES[plat];
  const hash = figmaHash(c, lib);
  const tfile = tokensFile(plat, name);
  const inh = inheritedWeb(plat, name, doc);
  const varKey = new Map(lib.variables.map((v) => [`${v.collection}::${v.name}`, v]));
  const bdText = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', ...Array.from({ length: 10 }, (_, i) => `D${i + 1}`)].map((i) => sec(doc, i)).join('\n') + (inh.web ? inh.ids.map((i) => sec(inh.web.doc, i)).join('\n') : '');
  const idx = tokenIndex();
  // variables used: tokens named in B/D + every alias target of the component tokens
  const used = new Map();
  const addTok = (k, why) => { const t = idx.get(k); if (!t) return; (used.get(k) || used.set(k, { t, why: new Set() }).get(k)).why.add(why); };
  tokensNamed(bdText).forEach((k) => addTok(k, 'spec'));
  const cols = tfile ? figmaModel(tfile).collections : [];
  for (const col of cols) for (const byMode of Object.values(col.vars)) for (const t of Object.values(byMode)) addTok(kebab(t.path), 'component token');
  const vrows = [], codeOnlyRows = [];
  for (const [k, { t, why }] of [...used.entries()].sort()) {
    if (!t.figma) { codeOnlyRows.push(`\`${k}\``); continue; }
    const v = varKey.get(`${t.figma.collection}::${t.figma.name}`);
    if (!v) { errors.push(`variable ${t.figma.collection} › ${t.figma.name} (\`${k}\`) is not in the library index — republish Foundations / re-read the library`); continue; }
    vrows.push(`| \`${k}\` | ${v.collection} › \`${v.name}\` | \`${v.key}\` | ${v.type} | ${v.scopes.join(', ') || '—'} | ${[...why].join(', ')} |`);
  }
  // styles named in B/D (brace patterns like Web/{en|ar}/action/{sm|md|lg} are expanded)
  const textNames = new Set(lib.textStyles.map((s) => s.name)), effNames = new Map(lib.effectStyles.map((s) => [s.name, s]));
  const tRows = [], missingT = [];
  const pats = new Set([...bdText.matchAll(/`((?:display|heading|title|body|label|caption|action|data|code)\/[^`\s]+)`/g)].map((m) => m[1]));
  const seenT = new Set();
  for (const p of [...pats].filter((x) => !/[…*]/.test(x))) for (const n of expandBraces(p)) { // "action/{sm|md|lg}" is shorthand, not a style name
    if (seenT.has(n)) continue; seenT.add(n);
    const s = lib.textStyles.find((x) => x.name === n);
    if (s) tRows.push(`| \`${s.name}\` | \`${s.key}\` |`); else missingT.push(n);
  }
  missingT.forEach((n) => errors.push(`text style "${n}" (named in B/D) is not in the library index`));
  const eRows = [...effNames.values()].filter((s) => new RegExp(`(^|[^\\w/])${s.name.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')}(?![\\w/])`).test(bdText)).map((s) => `| \`${s.name}\` | \`${s.key}\` |`);
  const docKit = lib.components.filter((x) => /^Doc\//.test(x.name));
  const otherComps = lib.components.filter((x) => !/^Doc\//.test(x.name) && bdText.includes(x.name));
  const docKitSpec = fs.existsSync(path.join(ROOT, DOC_KIT)) ? fs.readFileSync(path.join(ROOT, DOC_KIT), 'utf8') : '';
  const layouts = (/\n## Page layouts\n([\s\S]*?)\n## /.exec(docKitSpec) || [])[1] || '';
  const kitNames = [...docKitSpec.matchAll(/^\| `(Doc\/[^`]+)`/gm)].map((m) => m[1]);
  const L = [];
  L.push(`<!-- GENERATED from ${name}.md @ ${hash} — do not edit; change the source and run: npm run contract -- ${plat} ${name} -->`);
  L.push(`# ${doc.title} — Figma contract`, '');
  L.push(`> **Everything the Figma Agent needs to build ${doc.header.Component?.split('·')[0].trim() || name} in the ${label} Components file, with our variables and styles.** Read this file only. Generated from [\`${name}.md\`](${name}.md) (Parts A, B, D) and the Figma library index (\`_sync/figma-library.json\`, read ${lib.readAt.slice(0, 10)}). Questions go to [D11 Execution log](${name}.md#d11-execution-log-filled-by-the-figma-agent) — never invent.`, '');
  L.push('**Two phases, one review:** Phase 1 — build the component set (§7–§8). Phase 2 — as soon as Phase 1 is finished, the 12 documentation pages and the Components List card (§9).', '');
  L.push('| | |', '|---|---|',
    `| Target file | **${file.name}** · key \`${file.key}\` · https://www.figma.com/design/${file.key} |`,
    `| Page | \`↳ ${doc.header.Component?.split('·')[0].trim() || name}\` (one page per component) |`,
    `| Component | ${doc.header.Component || name} |`, `| Platform | ${doc.header.Platform || label} |`, `| Version | ${doc.header.Version || ''} |`,
    `| Source | [\`${name}.md\`](${name}.md) @ \`${hash}\` |`, '');
  L.push('## 1. Library connections in this file', '',
    '| | |', '|---|---|',
    `| Library | **${lib.library}** · library key \`${lib.libraryKey}\` |`,
    `| Library file | Foundations · key \`${lib.foundationsFile}\` |`,
    `| Doc Kit library (Phase 2) | ${FIGMA_FILES.docKit ? `**${FIGMA_FILES.docKit.name}** · file key \`${FIGMA_FILES.docKit.key}\` — must be enabled in this file (Assets → Libraries)` : 'not registered'} |`,
    `| Enabled here | ${lib.reach ? `✓ verified from a component file: ${lib.reach.collections} collections, ${lib.reach.variables} variables reachable` : '✗ not verified — check Assets → Libraries'} |`, '',
    'Import by key — never search by name, never copy:', '', '```js',
    "const v = await figma.variables.importVariableByKeyAsync('<variable key>');   // library reference, not a local copy",
    "const s = await figma.importStyleByKeyAsync('<style key>');                   // text / effect style",
    "const c = await figma.importComponentByKeyAsync('<component key>');           // Doc Kit / icon component",
    "const set = await figma.importComponentSetByKeyAsync('<component set key>');",
    '```', '');
  L.push('## 2. Component-token collections (bind layers to these)', '');
  if (cols.length) {
    L.push('Already in this file, created by the sync tooling from ' + `[\`${name}.tokens.json\`](${name}.tokens.json)` + '. **Bind component layers to these variables** and pick the option with the collection\'s explicit variable mode. Each value aliases the Foundations variable shown (key in §3).', '', '| Collection | Modes | Variable | Alias target per mode |', '|---|---|---|---|');
    for (const col of cols) for (const [v, byMode] of Object.entries(col.vars)) L.push(`| ${col.collection} | ${col.modes.join(' · ')} | \`${v}\` | ${Object.entries(byMode).map(([m, t]) => `${m} → ${t.collection} › \`${t.name}\``).join('<br>')} |`);
    L.push('');
  } else L.push('None yet — this component has no component tokens. Bind to the Foundations variables in §3 and report it in D11 so the Planner adds component tokens.', '');
  L.push('## 3. Foundations variables used (keys)', '', '| Token | Figma variable | Key | Type | Scopes | Used by |', '|---|---|---|---|---|---|', ...vrows, '');
  if (codeOnlyRows.length) L.push(`Code-only tokens (no Figma variable by design — motion, layers): ${codeOnlyRows.join(' · ')}. Use them only as written values in prototype settings and docs.`, '');
  L.push('## 4. Text styles used (keys)', '', ...(tRows.length ? ['| Style | Key |', '|---|---|', ...tRows] : ['None named in B/D.']), '');
  L.push('## 5. Effect styles used (keys)', '', ...(eRows.length ? ['| Style | Key |', '|---|---|', ...eRows] : ['None named in B/D.']), '');
  L.push('## 6. Components to instance (keys)', '');
  if (otherComps.length) L.push('| Component | Page | Key | Kind |', '|---|---|---|---|', ...otherComps.map((x) => `| \`${x.name}\` | ${x.page} | \`${x.key}\` | ${x.kind} |`), '');
  L.push('Nested Biowave components (e.g. Button inside Split button) are instances of the sets **in this file** — build them first; never detach.', '');
  const icx = readIcons();
  const iconNames = [...iconNamesIn(['A2', 'A4', ...['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7'], ...Array.from({ length: 10 }, (_, i) => `D${i + 1}`)].map((i) => sec(doc, i)).join('\n') + bdText)].sort();
  L.push('### Icons (keys) — Google · Material Symbols library (D-18)', '');
  if (iconNames.length) {
    L.push(`Library file **${FIGMA_FILES.icons?.name || 'Google · Material Symbols'}** · key \`${FIGMA_FILES.icons?.key || '—'}\` — must be enabled in this file. Import the set, then use the **Style=Rounded** variant (\`Fill=Filled\` only for selected states). Colour the glyph by binding its vector fills to the icon colour token of the part.`, '',
      '| Icon | Set key | Rounded (unfilled) | Rounded (filled) |', '|---|---|---|---|',
      ...iconNames.map((n) => { const k = icx.icons[n]; return k ? `| \`${n}\` | \`${k.set}\` | \`${k.rounded}\` | \`${k.roundedFilled}\` |` : `| \`${n}\` | ⏳ not indexed — Planner runs \`npm run sync:icons:plan\` | | |`; }), '');
  } else L.push('No icon named in this spec. Icons come only from the Google · Material Symbols library (Style=Rounded).', '');
  L.push('## 7. Phase 1 — values (from Part B)', '');
  for (const id of ['B1', 'B2', 'B3', 'B4', 'B5', 'B6']) L.push(block(doc, id, '###'));
  L.push('## 8. Phase 1 — build the component set (from Part D)', '');
  if (doc.parts.D?.introText) L.push(doc.parts.D.introText.replace(/^> How to build Part B in Figma.*$/m, '').trim(), '');
  for (const id of ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7']) L.push(block(doc, id, '###'));
  if (inh.web && inh.ids.length) {
    L.push(`### Inherited from Web (${inh.ids.join(', ')})`, '', `The ${label} Part D refers to these Web sections; they are copied here so you read one file. Apply the ${label} differences above on top.`, '');
    for (const id of inh.ids) L.push(block(inh.web.doc, id, '####'));
  }
  L.push('## 9. Phase 2 — documentation pages and Components List card', '');
  L.push(block(doc, 'D8', '###'));
  L.push('### Doc Kit components (keys)', '');
  if (docKit.length) L.push('| Component | Key | Kind |', '|---|---|---|', ...docKit.map((x) => `| \`${x.name}\` | \`${x.key}\` | ${x.kind} |`), '');
  else L.push(`> **Blocked — Doc Kit not built.** None of ${kitNames.length ? kitNames.map((n) => `\`${n}\``).join(', ') : 'the Doc/* components'} exist in the published Doc Kit library yet (the Annotation file, \`_sync/figma-files.json\` › \`docKit\`). Finish Phase 1, then stop and report "docs waiting for Doc Kit" in D11. Do not draw doc layouts by hand.`, '');
  L.push('### Components List card', '', `On page \`Components List\` of this file, add (or refresh) one \`Doc/Home card\`: preview = live instance of the default variant on the dot-grid tile, title = component name, link "View Component ↗" to the \`↳\` page of this component. Cards stay in alphabetical order.`, '');
  if (layouts) L.push('### Page layouts (from the Doc Kit spec)', '', layouts.trim().replace(/^### /gm, '#### '), '');
  L.push(block(doc, 'D9', '## 10. Code Connect —').replace(/^## 10\. Code Connect — D9 Code Connect/m, '## 10. Code Connect'));
  L.push('## 11. Rules', '', 'All rules in **D1** (§8' + (inh.ids.includes('D1') ? ' and the inherited Web D1' : '') + '), plus:', '',
    '**Component tokens only (strict, D-13).** This file may contain exactly one kind of local variable: the `<Component> / <Group>` collections in §2. Never create a local primitive or semantic variable or any other collection; never copy or detach a library variable; never create a local text, effect, colour or grid style; bind layers to the component token when one exists for the property. Run `_sync/figma-read-tokens.js` (lint) **before Phase 1 and after each phase** — it must report 0 violations.', '');
  L.push('## 12. Acceptance criteria (the Reviewer checks exactly these)', '', sec(doc, 'D10'), '',
    '- [ ] F-AC-L1 Lint (`figma-read-tokens.js`) = 0 violations before Phase 1, after Phase 1 and after Phase 2 (outputs attached in D11)',
    '- [ ] F-AC-L2 Every variable, style and component used comes from §2–§6 by key — no new local variables except component tokens, no local styles', '');
  L.push('## 13. When you finish', '', `1. Fill [D11 Execution log](${name}.md#d11-execution-log-filled-by-the-figma-agent) in \`${name}.md\` (stages, node IDs of the set, docs section and pages, lint outputs, deviations, questions).`,
    `2. Set **Figma build** to \`Built\` in the header of \`${name}.md\` and in \`${SECTIONS[plat]}/README.md\`.`,
    `3. \`npm run sync:done:${plat}\` — records this contract as built in the ${label} file.`, '4. Add one line to the root `CHANGELOG.md`.', '');
  return L.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
}

// ---------------------------------------------------------------- CLI
export function generate(plat, name, { write = true } = {}) {
  const c = load(plat, name);
  if (!c) return { ok: false, errors: [`no ${SECTIONS[plat]}/components/${name}/${name}.md`] };
  // Contracts come as a pair: both are written or neither.
  const { errs, lib } = gates(c, true);
  if (errs.length) return { ok: false, errors: errs };
  const code = codeContract(c);
  const ferrs = [];
  const figma = figmaContract(c, lib, ferrs);
  if (ferrs.length) return { ok: false, errors: ferrs };
  const p = contractPaths(plat, name);
  if (write) { fs.writeFileSync(path.join(ROOT, p.code), code); fs.writeFileSync(path.join(ROOT, p.figma), figma); }
  return { ok: true, paths: p };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  if (args[0] === '--status') {
    for (const plat of Object.keys(SECTIONS)) for (const name of listComponents(plat)) {
      const s = contractState(plat, name);
      console.log(`${plat.padEnd(6)} ${name.padEnd(14)} plan ${s.plan.padEnd(9)} code contract ${s.code.padEnd(8)} figma contract ${s.figma}`);
    }
    process.exit(0);
  }
  const jobs = args[0] === '--all'
    ? Object.keys(SECTIONS).flatMap((plat) => listComponents(plat).map((name) => [plat, name]))
    : [[args[0], args[1]]];
  if (!jobs[0][0] || !jobs[0][1]) { console.error('usage: npm run contract -- <web|tablet|mobile> <name>   |   --all   |   --status'); process.exit(2); }
  let bad = 0;
  for (const [plat, name] of jobs) {
    const c = load(plat, name);
    if (args[0] === '--all' && c && plainStatus(c.doc.header.Plan) !== 'Finished') { console.log(`· ${plat} ${name}: skipped (plan ${plainStatus(c.doc.header.Plan)})`); continue; }
    const r = generate(plat, name);
    if (r.ok) console.log(`✓ ${plat} ${name}: ${r.paths.code} · ${r.paths.figma}`);
    else { bad++; console.log(`✗ ${plat} ${name}:`); r.errors.forEach((e) => console.log('   ' + e)); }
  }
  process.exit(bad ? 1 : 0);
}

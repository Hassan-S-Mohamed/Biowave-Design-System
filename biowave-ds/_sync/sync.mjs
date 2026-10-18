#!/usr/bin/env node
// Biowave sync — keeps three things in step:
//   token source (2-foundations/tokens)  →  generated code (CSS · TS · Dart · preview)  →  Figma variables
//   component Figma contracts (figma-<name>-contract.md, generated from <name>.md)  →  Figma components (built by the Figma Agent)
//
//   node _sync/sync.mjs status            what is out of sync and what to do (exit 1 if anything is)
//   node _sync/sync.mjs stamp             record that generated code matches the source (run by `npm run tokens`)
//   node _sync/sync.mjs plan              write figma-pending.json + figma-apply*.js for the Figma Agent
//   node _sync/sync.mjs verify <dump...>  compare figma-read.js output with the token source
//   node _sync/sync.mjs verify-tokens <web|tablet|mobile> <dump>   check a component file (figma-read-tokens.js output)
//   node _sync/sync.mjs mark-synced --component-tokens=web[,…]   after verify-tokens passed
//   node _sync/sync.mjs mark-synced       after Figma VARIABLES are updated and verified (Foundations file)
//   node _sync/sync.mjs library <dump…>   save figma-read-library.js output as _sync/figma-library.json (keys for the Figma contracts)
//   node _sync/sync.mjs mark-synced --components=web[,tablet,mobile,foundations]
//                                         after the Figma Agent rebuilt components in those files (docs baseline per file)
import fs from 'node:fs';
import path from 'node:path';
import { P, SYNC, ROOT, FIGMA_FILE_KEY, FIGMA_FILES, COMPONENT_FILES, sourceHash, docHashesByFile, docTargets, readJson, writeJson, sameValue } from './lib.mjs';
import { expectedFigma, codeOnly } from './figma-map.mjs';
import { expectedComponentTokens } from './component-tokens.mjs';
import { libraryState, saveLibrary } from './library.mjs';

const [cmd = 'status', ...args] = process.argv.slice(2);
const quiet = args.includes('--short');
// --strict: also fail when Figma builds are queued (release check). Default: only BLOCKING problems fail.
const strict = args.includes('--strict');
const now = () => new Date().toISOString();
// remove a generated file; if the file system refuses deletes, blank it instead so it can never be applied twice
const discard = (f) => { if (!fs.existsSync(f)) return; try { fs.unlinkSync(f); } catch { fs.writeFileSync(f, f.endsWith('.json') ? '{ "status": "nothing pending" }\n' : '// nothing pending — run `npm run sync:plan`\nreturn "nothing pending";\n'); } };

function codeState() {
  const stamp = readJson(P.buildStamp);
  const current = sourceHash();
  return { fresh: !!stamp && stamp.sourceHash === current, stamp, current };
}

// Older snapshots stored docs as one flat map; spread them onto the files they target.
function snapDocsByFile(snap) {
  const d = snap.docs || {};
  if (Object.keys(d).some((k) => k.includes('/'))) {
    const out = {};
    for (const [f, h] of Object.entries(d)) for (const t of docTargets(f)) (out[t] ||= {})[f] = h;
    return out;
  }
  return d;
}

function figmaDiff() {
  const snap = readJson(P.snapshot, { tokens: {}, docs: {} });
  const exp = expectedFigma();
  const expMap = new Map(exp.map((e) => [e.key, e]));
  const added = [], changed = [], removed = [];
  for (const e of exp) {
    const old = snap.tokens[e.key];
    if (!old) { added.push(e); continue; }
    const diffModes = Object.keys(e.modes).filter((m) => !sameValue(e.modes[m], old[m]));
    if (diffModes.length) changed.push({ ...e, from: Object.fromEntries(diffModes.map((m) => [m, old[m]])) });
  }
  for (const k of Object.keys(snap.tokens)) if (!expMap.has(k)) {
    const [collection, id] = k.split('::');
    removed.push({ key: k, collection, web: id.includes('/') || id.includes(' ') ? null : id, name: id, op: 'deprecate' });
  }
  const docs = docHashesByFile();
  const old = snapDocsByFile(snap);
  const docChanges = [], docRemoved = [];
  for (const [file, map] of Object.entries(docs)) {
    for (const f of Object.keys(map)) if (old[file]?.[f] !== map[f]) docChanges.push({ file, doc: f });
    for (const f of Object.keys(old[file] || {})) if (!(f in map)) docRemoved.push({ file, doc: f });
  }
  return { snap, exp, added, changed, removed, docs, docChanges, docRemoved };
}

async function status() {
  const c = codeState();
  const f = figmaDiff();
  const tokenChanges = f.added.length + f.changed.length + f.removed.length;
  const ctPendingQuick = COMPONENT_FILES.filter((x) => { const ct = expectedComponentTokens(x); return ct.errors.length || (ct.collections.length && (f.snap.componentTokens || {})[x] !== ct.hash); }).length;
  // BLOCKING = the shared foundation is not in step (stale code, Figma variables or component tokens pending).
  // QUEUE = component docs not yet built in Figma — a work list for the Figma Agent, never a reason to stop code work.
  const blocking = !c.fresh || tokenChanges > 0 || ctPendingQuick > 0;
  const queued = f.docChanges.length + f.docRemoved.length;
  const ok = !blocking && (!strict || !queued);
  const line = (s) => console.log(s);
  if (quiet) {
    line(`code ${c.fresh ? '✓ in sync' : '✗ STALE → npm run tokens'} · figma tokens ${tokenChanges ? `✗ ${tokenChanges} pending → npm run sync:plan` : '✓ in sync'} · figma build queue ${queued ? `⏳ ${queued} doc(s)` : '✓ empty'} · component tokens ${ctPendingQuick ? `✗ ${ctPendingQuick} file(s) pending` : '✓ in sync'} → ${blocking ? '✗ BLOCKED' : '✓ READY for component work'}`);
    return ok;
  }
  line('Biowave sync status\n');
  line(`1. Token source → generated code   ${c.fresh ? '✓ in sync' : '✗ STALE — run: npm run tokens'}`);
  if (c.stamp) line(`   last build ${c.stamp.builtAt}`);
  line(`\n2. Token source → Figma variables   ${tokenChanges ? `✗ ${tokenChanges} change(s) not in Figma yet` : '✓ in sync'}`);
  line(`   last Figma sync ${f.snap.syncedAt ?? 'never'} · file ${FIGMA_FILE_KEY}`);
  const show = (label, list, fmt) => { if (!list.length) return; line(`   ${label} (${list.length}):`); list.slice(0, 25).forEach((x) => line(`     · ${fmt(x)}`)); if (list.length > 25) line(`     … ${list.length - 25} more`); };
  show('added', f.added, (e) => `${e.collection} › ${e.name}  ${JSON.stringify(e.modes)}`);
  show('changed', f.changed, (e) => `${e.collection} › ${e.name}  ${JSON.stringify(e.from)} → ${JSON.stringify(Object.fromEntries(Object.keys(e.from).map((m) => [m, e.modes[m]])))}`);
  show('removed (will be deprecated, not deleted)', f.removed, (e) => `${e.collection} › ${e.name}`);
  if (tokenChanges) line('   → next: npm run sync:plan, then ask Claude / the Figma Agent to "apply the pending Figma sync"');
  line(`\n3. Figma build queue (Figma contracts not yet built in Figma — NOT blocking; work list for the Figma Agent)   ${queued ? `⏳ ${queued} doc(s)` : '✓ empty'}`);
  for (const file of ['foundations', ...COMPONENT_FILES]) {
    const ch = f.docChanges.filter((d) => d.file === file), rm = f.docRemoved.filter((d) => d.file === file);
    if (!ch.length && !rm.length) continue;
    line(`   ${FIGMA_FILES[file].name} (${FIGMA_FILES[file].key}) — ${ch.length + rm.length}:`);
    ch.forEach((d) => line(`     · ${d.doc}`));
    rm.forEach((d) => line(`     · ${d.doc} (deleted)`));
  }
  if (f.docChanges.length || f.docRemoved.length) line('   → next: the Figma Agent builds each listed component from its figma-<name>-contract.md (Phase 1 set, Phase 2 docs), then: npm run sync:done:<file>');
  line('\n4. Component tokens (tokens.json) → component files (D-13: aliases to Foundations semantic variables only)');
  let ctPending = 0;
  for (const file of COMPONENT_FILES) {
    const ct = expectedComponentTokens(file);
    const done = (f.snap.componentTokens || {})[file] === ct.hash;
    if (ct.errors.length) { ctPending++; line(`   ✗ ${FIGMA_FILES[file].name}: ${ct.errors.length} error(s) in tokens.json — run: npm run component-tokens`); continue; }
    if (!ct.collections.length) { line(`   · ${FIGMA_FILES[file].name}: no component tokens yet`); continue; }
    if (!done) ctPending++;
    line(`   ${done ? '✓' : '✗'} ${FIGMA_FILES[file].name}: ${ct.collections.length} collection(s)${done ? ' in sync' : ' not in Figma yet → npm run sync:plan, run figma-apply-tokens-' + file + '.js, verify, sync:done:tokens:' + file}`);
  }
  const ls = libraryState();
  line(`\n5. Figma library index (_sync/figma-library.json — keys for the Figma contracts)   ${ls.ok ? '✓ fresh' : '⏳ ' + ls.reason}`);
  if (ls.lib) line(`   read ${ls.lib.readAt} · ${ls.lib.variables.length} variables · ${ls.lib.textStyles.length} text / ${ls.lib.effectStyles.length} effect styles · ${ls.lib.components.length} components · reachable from component files: ${ls.lib.reach ? ls.lib.reach.variables : '—'}`);
  line('\n6. Contracts (generated when a plan is Finished — npm run contract)');
  try {
    const { contractState } = await import('../_docs/contract.mjs');
    const { listComponents } = await import('../_docs/component-file.mjs');
    for (const plat of COMPONENT_FILES) for (const name of listComponents(plat)) {
      const cs = contractState(plat, name);
      const mark = cs.plan !== 'Finished' ? '·' : cs.code === 'current' && cs.figma === 'current' ? '✓' : '⏳';
      line(`   ${mark} ${plat} ${name}: plan ${cs.plan} · code contract ${cs.code} · figma contract ${cs.figma}`);
    }
  } catch (e) { line(`   ? could not read contracts: ${e.message}`); }
  line(`\nCode-only by design (no Figma variable): ${codeOnly().length} tokens — motion, layers, mono font, letter-spacing, composite shadows (Figma uses effect styles bound to color/shadow/*).`);
  if (blocking) line('\n✗ BLOCKED — the foundation is out of step. Fix sections 1, 2 or 4 above before any component work.');
  else if (queued) line(`\n✓ READY for component work. ⏳ ${queued} doc(s) in the Figma build queue (not blocking; the Figma Agent works through it).${strict ? '\n✗ --strict: queue must be empty.' : ''}`);
  else line('\n✓ Everything is in sync.');
  return ok;
}

function plan() {
  const c = codeState();
  if (!c.fresh) { console.error('✗ Generated code is stale. Run `npm run tokens` first, then plan again.'); process.exit(1); }
  const f = figmaDiff();
  const strip = ({ key, from, ...e }) => ({ op: 'upsert', ...e });
  const changes = [...f.added.map(strip), ...f.changed.map(strip), ...f.removed];
  for (const old of fs.readdirSync(SYNC).filter((n) => /^figma-apply-\d+\.js$/.test(n))) discard(path.join(SYNC, old));
  writeJson(P.pending, { createdAt: now(), fileKey: FIGMA_FILE_KEY, counts: { added: f.added.length, changed: f.changed.length, removed: f.removed.length }, changes, docChanges: f.docChanges.map((d) => ({ ...d, fileKey: FIGMA_FILES[d.file].key })) });
  const tplT = fs.readFileSync(path.join(SYNC, 'figma-apply-tokens.template.js'), 'utf8');
  for (const file of COMPONENT_FILES) {
    const out = path.join(SYNC, `figma-apply-tokens-${file}.js`);
    const ct = expectedComponentTokens(file);
    if (ct.errors.length) { console.error(`✗ ${file}: tokens.json has errors — run npm run component-tokens`); process.exitCode = 1; continue; }
    if (!ct.collections.length || (f.snap.componentTokens || {})[file] === ct.hash) { discard(out); continue; }
    fs.writeFileSync(out, tplT.replace("/*__FILE__*/''", JSON.stringify(file)).replace('/*__COLLECTIONS__*/[]', JSON.stringify(ct.collections.map(({ collection, modes, vars }) => ({ collection, modes, vars: Object.fromEntries(Object.entries(vars).map(([n, bm]) => [n, Object.fromEntries(Object.entries(bm).map(([m, t]) => [m, `${t.collection}::${t.name}`]))])) })))));
    console.log(`✓ component tokens → _sync/figma-apply-tokens-${file}.js  (run on ${FIGMA_FILES[file].name} ${FIGMA_FILES[file].key})`);
  }
  if (!changes.length) { console.log('✓ No token changes for Figma.' + (f.docChanges.length ? ` ${f.docChanges.length} component doc(s) changed — see npm run sync.` : '')); return; }
  const tpl = fs.readFileSync(path.join(SYNC, 'figma-apply.template.js'), 'utf8');
  const chunks = []; let cur = [];
  for (const ch of changes) { cur.push(ch); if (JSON.stringify(cur).length > 30000) { chunks.push(cur); cur = []; } }
  if (cur.length) chunks.push(cur);
  chunks.forEach((ch, i) => fs.writeFileSync(path.join(SYNC, `figma-apply-${i + 1}.js`), tpl.replace('/*__CHANGES__*/[]', JSON.stringify(ch))));
  console.log(`✓ ${changes.length} change(s) → _sync/figma-pending.json and ${chunks.length} script(s): ${chunks.map((_, i) => `_sync/figma-apply-${i + 1}.js`).join(', ')}`);
  console.log(`  Run each with the Figma MCP use_figma tool on file ${FIGMA_FILE_KEY}, then verify (figma-read.js → npm run sync:verify) and npm run sync:done.`);
}

function parseDump(text) {
  const map = new Map();
  for (const line of text.split('\n')) {
    const parts = line.trim().replace(/^"|"$/g, '').split('|');
    if (parts.length < 4) continue;
    const [collection, name, web, modes] = parts;
    const vals = Object.fromEntries(modes.split(';').map((kv) => { const i = kv.indexOf('='); const v = kv.slice(i + 1); return [kv.slice(0, i), v !== '' && !isNaN(+v) && !v.startsWith('#') ? +v : v]; }));
    map.set(`${collection}::${name}`, { collection, name, web, vals });
  }
  return map;
}

function verify(files) {
  if (!files.length) { console.error('usage: sync.mjs verify <dump-file...>  (output of _sync/figma-read.js)'); process.exit(2); }
  const dump = new Map(); for (const f of files) for (const [k, v] of parseDump(fs.readFileSync(f, 'utf8'))) dump.set(k, v);
  const collections = new Set([...dump.values()].map((v) => v.collection));
  const exp = expectedFigma().filter((e) => collections.has(e.collection));
  const live = [...dump.values()];
  let bad = 0, checked = 0; const used = new Set();
  for (const e of exp) {
    const cands = live.filter((v) => v.collection === e.collection && (e.web ? v.web === e.web : v.name === e.name));
    const v = cands.find((x) => x.name === e.name) || cands[0];
    if (!v) { console.log(`MISSING in Figma  ${e.collection} › ${e.name}`); bad++; continue; }
    used.add(`${v.collection}::${v.name}`); checked++;
    if (v.vals.__hidden && e.collection !== '_Primitive') { console.log(`HIDDEN from publishing (component files cannot use it)  ${e.collection} › ${e.name}`); bad++; }
    for (const [m, val] of Object.entries(e.modes)) if (!sameValue(val, v.vals[m])) { console.log(`DIFF  ${e.collection} › ${e.name} [${m}]  code ${val}  figma ${v.vals[m]}`); bad++; }
  }
  const extra = live.filter((v) => !used.has(`${v.collection}::${v.name}`) && ['1. Themes', '2. Radius', '3. Spacing', '4. Size', '7. Grid & Layout', '9. Border'].includes(v.collection));
  extra.forEach((v) => console.log(`FIGMA ONLY (not in code)  ${v.collection} › ${v.name}`));
  console.log(`\nverified ${checked} variable(s) in ${collections.size} collection(s): ${bad ? `✗ ${bad} difference(s)` : '✓ all match the token source'}${extra.length ? ` · ${extra.length} Figma-only variable(s) listed above` : ''}`);
  return bad === 0;
}

function verifyTokens(file, dumpFile) {
  if (!COMPONENT_FILES.includes(file) || !dumpFile) { console.error('usage: sync.mjs verify-tokens <web|tablet|mobile> <dump-file>  (output of _sync/figma-read-tokens.js)'); process.exit(2); }
  const text = fs.readFileSync(dumpFile, 'utf8');
  let bad = 0; const live = new Map();
  for (const l of text.split('\n')) {
    const p = l.trim().split('|');
    if (p[0] === 'X') { console.log(`VIOLATION  ${p.slice(1).join('|')}`); bad++; }
    if (p[0] === 'V') live.set(`${p[1]}::${p[2]}`, Object.fromEntries((p[3] || '').split(';').filter(Boolean).map((kv) => { const i = kv.indexOf('='); return [kv.slice(0, i), kv.slice(i + 1)]; })));
  }
  const ct = expectedComponentTokens(file); let checked = 0;
  for (const c of ct.collections) for (const [name, byMode] of Object.entries(c.vars)) {
    const v = live.get(`${c.collection}::${name}`);
    if (!v) { console.log(`MISSING  ${c.collection} › ${name}`); bad++; continue; }
    live.delete(`${c.collection}::${name}`); checked++;
    for (const [m, t] of Object.entries(byMode)) {
      const got = v[m]; const want = `${t.collection}::${t.name}`;
      const ok = got === want || (got && got.startsWith('?::') && got.slice(3) === t.name);
      if (!ok) { console.log(`DIFF  ${c.collection} › ${name} [${m}]  repo ${want}  figma ${got ?? '—'}`); bad++; }
    }
  }
  for (const k of live.keys()) { console.log(`FIGMA ONLY (not in any tokens.json)  ${k.replace('::', ' › ')}`); bad++; }
  console.log(`\n${FIGMA_FILES[file].name}: verified ${checked} component token(s): ${bad ? `✗ ${bad} problem(s)` : '✓ all alias Foundations semantic variables and match tokens.json'}`);
  return bad === 0;
}

function markSynced() {
  const snap = readJson(P.snapshot, { tokens: {}, docs: {} });
  const docs = snapDocsByFile(snap);
  const ctArg = args.find((a) => a.startsWith('--component-tokens='));
  if (ctArg) {
    const files = ctArg.split('=')[1].split(',').map((s) => s.trim());
    const ct = { ...(snap.componentTokens || {}) };
    for (const x of files) { if (!COMPONENT_FILES.includes(x)) { console.error(`✗ unknown file ${x}`); process.exit(2); } ct[x] = expectedComponentTokens(x).hash; discard(path.join(SYNC, `figma-apply-tokens-${x}.js`)); }
    writeJson(P.snapshot, { ...snap, docs, componentTokens: ct });
    console.log(`✓ Component tokens marked as synced in: ${files.map((x) => FIGMA_FILES[x].name).join(', ')}.`);
    return;
  }
  const comp = args.find((a) => a.startsWith('--components='));
  if (comp) {
    // Component docs only: the Figma Agent rebuilt components in these files.
    const files = comp.split('=')[1].split(',').map((s) => s.trim()).filter(Boolean);
    const bad = files.filter((x) => !(x in FIGMA_FILES));
    if (bad.length) { console.error(`✗ unknown file(s): ${bad.join(', ')} — use ${Object.keys(FIGMA_FILES).join(', ')}`); process.exit(2); }
    const now_ = docHashesByFile();
    for (const x of files) docs[x] = now_[x];
    writeJson(P.snapshot, { ...snap, docs, docsSyncedAt: { ...(snap.docsSyncedAt || {}), ...Object.fromEntries(files.map((x) => [x, now()])) } });
    console.log(`✓ Component docs marked as built in: ${files.map((x) => FIGMA_FILES[x].name).join(', ')}.`);
    return;
  }
  // Variables only (Foundations file). Component docs keep their own baseline per file.
  const c = codeState();
  if (!c.fresh) { console.error('✗ Generated code is stale — run `npm run tokens` first.'); process.exit(1); }
  const exp = expectedFigma();
  writeJson(P.snapshot, { ...snap, syncedAt: now(), fileKey: FIGMA_FILE_KEY, sourceHash: c.current,
    tokens: Object.fromEntries(exp.map((e) => [e.key, e.modes])), docs });
  discard(P.pending);
  for (const old of fs.readdirSync(SYNC).filter((n) => /^figma-apply-\d+\.js$/.test(n))) discard(path.join(SYNC, old));
  console.log(`✓ Figma variables snapshot saved (${exp.length} variables, Foundations ${FIGMA_FILE_KEY}). Component docs unchanged — use --components=<file> after a component build.`);
}

switch (cmd) {
  case 'status': process.exit((await status()) ? 0 : 1);
  case 'library': process.exit(saveLibrary(args.filter((a) => !a.startsWith('--'))) ? 0 : 1);
  case 'stamp': writeJson(P.buildStamp, { sourceHash: sourceHash(), builtAt: now() }); if (!quiet) console.log('✓ build stamp updated'); break;
  case 'plan': plan(); break;
  case 'verify': process.exit(verify(args.filter((a) => !a.startsWith('--'))) ? 0 : 1);
  case 'verify-tokens': process.exit(verifyTokens(args[0], args[1]) ? 0 : 1);
  case 'mark-synced': markSynced(); break;
  default: console.error(`unknown command: ${cmd}`); process.exit(2);
}

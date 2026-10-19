#!/usr/bin/env node
// docs:check (R-01) — fails (exit 1) when the documentation structure is broken. Checks:
//   1 structure   every <section>/components/<name>/<name>.md follows _templates/component.md (header fields, Parts A–F, section IDs in order)
//   2 guidelines  Part A (except A8) is identical on Web, Tablet and Mobile
//   3 status      header Plan / Code / Figma build = the section README Components table
//   4 generated   docs:build outputs (HTML shells, index.json) exist and are up to date
//   5 contracts   a Finished plan has both contracts and they are current; nobody edited a contract
//   6 links       every relative link in a component file resolves; no reference to removed paths
//   7 demo CSS    every var(--bw-…) used by the docs viewer exists in tokens.css
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, SECTIONS, REQUIRED, load, listComponents, plainStatus } from './component-file.mjs';
import { expectedFiles } from './build.mjs';
import { contractState } from './contract.mjs';

const errors = [], warnings = [];
const err = (m) => errors.push(m), warn = (m) => warnings.push(m);
const HEADER = ['Component', 'Summary', 'Summary (ar)', 'Parts', 'Parts (ar)', 'Platform', 'Import', 'Figma', 'Version', 'Plan', 'Code', 'Figma build', 'Review'];
const PLAN = ['Draft', 'Finished', 'Open'];
const STATUS = ['Planned', 'In progress', 'Built', 'In review', 'Changes requested', 'Approved'];

// 1 structure
const all = {};
for (const plat of Object.keys(SECTIONS)) for (const name of listComponents(plat)) {
  const c = load(plat, name); (all[name] ||= {})[plat] = c;
  for (const f of HEADER) if (!(f in c.doc.header)) err(`${c.rel}: header field "${f}" missing`);
  if (!PLAN.includes(plainStatus(c.doc.header.Plan))) err(`${c.rel}: Plan must be one of ${PLAN.join(' · ')} (is "${c.doc.header.Plan}")`);
  for (const f of ['Code', 'Figma build']) if (!STATUS.includes(plainStatus(c.doc.header[f]))) err(`${c.rel}: ${f} must be one of ${STATUS.join(' · ')} (is "${c.doc.header[f]}")`);
  for (const part of 'ABCDEF') if (!c.doc.parts[part]) err(`${c.rel}: Part ${part} missing ("## ${part} · …")`);
  for (const [part, ids] of Object.entries(REQUIRED)) {
    const have = c.doc.order.filter((id) => id[0] === part);
    for (const id of ids) if (!have.includes(id)) err(`${c.rel}: section ${id} missing`);
    const known = have.filter((id) => ids.includes(id));
    const sorted = [...known].sort((a, b) => +a.slice(1) - +b.slice(1));
    if (known.join() !== sorted.join()) err(`${c.rel}: Part ${part} sections out of order (${known.join(', ')})`);
  }
}

// 2 guidelines identical across platforms (A8 may differ)
for (const [name, byPlat] of Object.entries(all)) {
  const plats = Object.keys(byPlat); if (plats.length < 2) continue;
  for (const id of REQUIRED.A.filter((x) => x !== 'A8')) {
    const texts = plats.map((p) => byPlat[p].doc.sections[id]?.text ?? '');
    if (new Set(texts).size > 1) err(`${name}: ${id} differs between ${plats.join(' / ')} — guidelines are copied; change all three files in the same task`);
  }
}

// 3 status = section README table
for (const [plat, sec] of Object.entries(SECTIONS)) {
  const readme = path.join(ROOT, sec, 'README.md');
  const rows = {};
  for (const line of fs.readFileSync(readme, 'utf8').split('\n')) {
    const m = /\(components\/([a-z0-9-]+)\/\1\.md\)\s*\|\s*$/.exec(line);
    if (!m) continue;
    const cells = line.split('|').slice(1, -1).map((x) => x.trim());
    rows[m[1]] = { plan: cells[1], code: cells[2], figma: cells[3] };
  }
  for (const name of listComponents(plat)) {
    const c = all[name][plat], r = rows[name];
    if (!r) { err(`${sec}/README.md: no row for ${name} in the Components table`); continue; }
    const h = { plan: plainStatus(c.doc.header.Plan), code: plainStatus(c.doc.header.Code), figma: plainStatus(c.doc.header['Figma build']) };
    for (const k of ['plan', 'code', 'figma']) if (plainStatus(r[k]) !== h[k]) err(`${sec}/README.md: ${name} ${k} "${r[k]}" ≠ "${h[k]}" in ${c.rel}`);
  }
}

// 4 generated docs files
for (const [rel, content] of Object.entries(expectedFiles())) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) err(`${rel}: missing — run npm run docs:build`);
  else if (fs.readFileSync(abs, 'utf8') !== content) err(`${rel}: out of date or edited — run npm run docs:build`);
}

// 5 contracts
for (const [name, byPlat] of Object.entries(all)) for (const plat of Object.keys(byPlat)) {
  const s = contractState(plat, name);
  for (const kind of ['code', 'figma']) {
    if (s.plan === 'Finished' && s[kind] !== 'current') err(`${plat} ${name}: ${kind} contract is ${s[kind]} — run npm run contract -- ${plat} ${name}`);
    if (s.plan !== 'Finished' && s[kind] === 'stale') warn(`${plat} ${name}: ${kind} contract exists but the plan is ${s.plan} — regenerate after the plan is Finished`);
  }
}

// 6 links + removed paths
const REMOVED = /(?:^|[\s(`/])(?:\d-[a-z]+-components\/specs\/|6-component-guidelines\/|component-preview\/|_templates\/(?:component-guidelines|component-readme|plan|figma|review)\.md)/;
const scanSkip = /(^|\/)(node_modules|\.git|\.dart_tool|build|dist|generated)(\/|$)|^CHANGELOG\.md$|^_audits\/|^_workflow\/runs\/|^_sync\/(watch\.log|status\.txt|figma-pending\.json|figma-snapshot\.json)$|\.tar\.gz$/;
function walk(dir, out = []) {
  for (const e of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
    const rel = dir ? `${dir}/${e.name}` : e.name;
    if (scanSkip.test(rel)) continue;
    if (e.isDirectory()) walk(rel, out); else if (/\.(md|mjs|js|json|html|ts|tsx|dart|css)$/.test(e.name)) out.push(rel);
  }
  return out;
}
for (const rel of walk('')) {
  let text = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  if (/\/components\/([^/]+)\/\1\.md$/.test(rel)) text = text.replace(/\n## E · Review\n[\s\S]*?(?=\n## F · |$)/, '\n'); // review history may quote old paths
  if (rel === '_docs/check.mjs') continue;
  text.split('\n').forEach((line, i) => { if (REMOVED.test(line)) err(`${rel}:${i + 1}: refers to a removed path — ${line.trim().slice(0, 110)}`); });
}
for (const [name, byPlat] of Object.entries(all)) for (const c of Object.values(byPlat)) {
  const dir = path.dirname(c.abs);
  let fenced = false;
  c.text.split('\n').forEach((line, i) => {
    if (line.startsWith('```')) fenced = !fenced;
    if (fenced) return;
    for (const m of line.matchAll(/\]\(([^)\s#]+)(#[^)]*)?\)/g)) {
      const target = m[1];
      if (/^(https?:|mailto:)/.test(target) || /\{[a-z]+\}/.test(target)) continue;
      if (/-contract\.md$|\.html$|assets\//.test(target)) continue; // generated later / optional images
      if (!fs.existsSync(path.resolve(dir, target))) err(`${c.rel}:${i + 1}: broken link → ${target}`);
    }
  });
}

// 7 demo CSS tokens exist
const tokensCss = fs.readFileSync(path.join(ROOT, '2-foundations/web/src/generated/tokens.css'), 'utf8');
const defined = new Set([...tokensCss.matchAll(/(--bw-[a-z0-9-]+)\s*:/g)].map((m) => m[1]));
const viewerCss = fs.readFileSync(path.join(ROOT, '_docs/viewer.css'), 'utf8');
for (const m of new Set([...viewerCss.matchAll(/var\((--bw-[a-z0-9-]+)/g)].map((x) => x[1]))) if (!defined.has(m)) err(`_docs/viewer.css uses ${m}, which is not a token`);

warnings.forEach((w) => console.log('  ⚠ ' + w));
errors.forEach((e) => console.log('  ✗ ' + e));
const n = Object.values(all).reduce((k, v) => k + Object.keys(v).length, 0);
console.log(errors.length ? `\n✗ docs:check — ${errors.length} error(s) in ${n} component file(s)` : `\n✓ docs:check — ${n} component file(s), structure, guidelines, status, generated pages, contracts, links and demo tokens OK${warnings.length ? ` (${warnings.length} warning(s))` : ''}`);
process.exit(errors.length ? 1 : 0);

// Shared helpers for the Biowave sync tooling. Plain Node >= 18, no dependencies.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

export const SYNC = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(SYNC, '..');
// Figma files (D-12): one Foundations file + one file per platform. Keys live only in figma-files.json.
export const FIGMA_FILES = JSON.parse(fs.readFileSync(path.join(SYNC, 'figma-files.json'), 'utf8'));
for (const k of Object.keys(FIGMA_FILES)) if (k.startsWith('$')) delete FIGMA_FILES[k];
export const FIGMA_FILE_KEY = FIGMA_FILES.foundations.key; // variables + styles live in Foundations
export const COMPONENT_FILES = ['web', 'tablet', 'mobile'];
export const P = {
  tokensJson: path.join(ROOT, '2-foundations/dist/tokens.json'),
  buildStamp: path.join(SYNC, 'build-stamp.json'),
  snapshot: path.join(SYNC, 'figma-snapshot.json'),
  pending: path.join(SYNC, 'figma-pending.json'),
};

// ------------------------------------------------------------------ files & hashes
const IGNORE = /(^|\/)(node_modules|\.dart_tool|build|\.git|\.idea|generated|dist|preview)(\/|$)|\.DS_Store$/;
export function walk(dir, filter = () => true, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, e.name);
    const rel = path.relative(ROOT, abs).split(path.sep).join('/');
    if (IGNORE.test(rel)) continue;
    if (e.isDirectory()) walk(abs, filter, out);
    else if (filter(rel)) out.push(rel);
  }
  return out.sort();
}
export const sha = (s) => crypto.createHash('sha256').update(s).digest('hex').slice(0, 16);
export const hashFile = (rel) => sha(fs.readFileSync(path.join(ROOT, rel)));

// Everything that changes the generated token outputs.
export const tokenSources = () => [
  ...walk(path.join(ROOT, '2-foundations/tokens'), (f) => f.endsWith('.json')),
  ...walk(path.join(ROOT, '2-foundations/scripts'), (f) => /\.(mjs|json)$/.test(f)),
];
export const sourceHash = () => sha(tokenSources().map((f) => `${f}:${hashFile(f)}`).join('\n'));

// What the Figma Agent builds from (R-01): the generated Figma contract of each component
// (<section>/components/<name>/figma-<name>-contract.md) + the Doc Kit spec. Editing a plan, review
// or changelog never re-queues Figma work — only a regenerated Figma contract does.
export const isDesignDoc = (rel) =>
  rel === '2-foundations/figma-doc-kit.md' ||
  /^[345]-[a-z]+-components\/components\/([^/]+)\/figma-\1-contract\.md$/.test(rel);
export const designDocs = () => ['2-foundations', '3-web-components', '4-tablet-components', '5-mobile-components']
  .flatMap((d) => walk(path.join(ROOT, d), isDesignDoc));
export const docHashes = () => Object.fromEntries(designDocs().map((f) => [f, hashFile(f)]));
// Which Figma file must be rebuilt when a doc changes.
export function docTargets(rel) {
  if (rel === '2-foundations/figma-doc-kit.md') return ['foundations'];
  return [{ '3': 'web', '4': 'tablet', '5': 'mobile' }[rel[0]]];
}
// Doc hashes grouped by Figma file: { foundations: {path: hash}, web: {...}, tablet: {...}, mobile: {...} }
export function docHashesByFile() {
  const out = Object.fromEntries(['foundations', ...COMPONENT_FILES].map((k) => [k, {}]));
  for (const [f, h] of Object.entries(docHashes())) for (const t of docTargets(f)) out[t][f] = h;
  return out;
}

export const readJson = (f, fallback = null) => (fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : fallback);
export const writeJson = (f, v) => fs.writeFileSync(f, JSON.stringify(v, null, 2) + '\n');

// ------------------------------------------------------------------ value normalisation
export function normColor(v) {
  let s = String(v).trim().toUpperCase();
  if (/^#[0-9A-F]{3}$/.test(s)) s = '#' + [...s.slice(1)].map((c) => c + c).join('');
  if (/^#[0-9A-F]{8}$/.test(s) && s.endsWith('FF')) s = s.slice(0, 7);
  return s;
}
export function sameValue(a, b) {
  if (typeof a === 'number' || typeof b === 'number') return Math.abs(Number(a) - Number(b)) < 0.01;
  const A = normColor(a), B = normColor(b);
  if (A === B) return true;
  // alpha rounding (0.7 * 255 = 178.5 → B2 or B3) is not a real difference
  const m = /^#[0-9A-F]{6}/;
  if (m.test(A) && m.test(B) && A.slice(0, 7) === B.slice(0, 7)) {
    const a1 = A.length === 9 ? parseInt(A.slice(7), 16) : 255, b1 = B.length === 9 ? parseInt(B.slice(7), 16) : 255;
    return Math.abs(a1 - b1) <= 1;
  }
  return String(a) === String(b);
}

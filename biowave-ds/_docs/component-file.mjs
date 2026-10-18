// Parser for <section>/components/<name>/<name>.md (R-01). Shared by contract.mjs, check.mjs and the sync status.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const SECTIONS = { web: '3-web-components', tablet: '4-tablet-components', mobile: '5-mobile-components' };
export const PLATFORM_LABEL = { web: 'Web', tablet: 'Tablet', mobile: 'Mobile' };
export const PART_TITLES = { A: 'A · Guidelines', B: 'B · Spec', C: 'C · Code plan', D: 'D · Figma build', E: 'E · Review', F: 'F · Changelog' };
export const REQUIRED = {
  A: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10'],
  B: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9'],
  C: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8'],
  D: ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11'],
  E: ['E1'],
  F: ['F0'],
};
export const sha = (s) => crypto.createHash('sha256').update(s).digest('hex').slice(0, 16);

export const componentPath = (plat, name) => `${SECTIONS[plat]}/components/${name}/${name}.md`;
export function listComponents(plat) {
  const dir = path.join(ROOT, SECTIONS[plat], 'components');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory() && fs.existsSync(path.join(dir, d.name, `${d.name}.md`))).map((d) => d.name).sort();
}

export function parse(text) {
  const lines = text.split('\n');
  const doc = { title: '', header: {}, headerOrder: [], parts: {}, sections: {}, order: [] };
  let part = null, sec = null, fenced = false, inHeader = true;
  for (const line of lines) {
    if (line.startsWith('```')) fenced = !fenced;
    if (!fenced) {
      const h1 = /^# (.*)$/.exec(line);
      if (h1 && !doc.title) { doc.title = h1[1]; continue; }
      const p = /^## ([A-F]) · (.*)$/.exec(line);
      if (p) { part = p[1]; sec = null; inHeader = false; doc.parts[part] = { title: line.slice(3), intro: [], body: [] }; continue; }
      if (/^## /.test(line)) { inHeader = inHeader && /^## Contents/.test(line); part = null; sec = null; continue; }
      const s = /^### ([A-F]\d+) (.*)$/.exec(line);
      if (s && part) { sec = s[1]; doc.sections[sec] = { id: sec, title: s[2], part, lines: [] }; doc.order.push(sec); continue; }
      if (inHeader) {
        const f = /^\|\s*([^|]+?)\s*\|\s*(.*?)\s*\|\s*$/.exec(line);
        if (f && f[1] !== '---' && f[1] !== '') { doc.header[f[1]] = f[2]; doc.headerOrder.push(f[1]); }
      }
    }
    if (sec) doc.sections[sec].lines.push(line);
    else if (part) doc.parts[part].intro.push(line);
  }
  for (const s of Object.values(doc.sections)) s.text = s.lines.join('\n').replace(/\n---\s*$/, '').trim();
  for (const p of Object.values(doc.parts)) p.introText = p.intro.join('\n').replace(/\n---\s*$/, '').trim();
  return doc;
}

export function load(plat, name) {
  const rel = componentPath(plat, name);
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) return null;
  const text = fs.readFileSync(abs, 'utf8');
  return { rel, abs, text, doc: parse(text), plat, name };
}

export const plainStatus = (v = '') => v.replace(/\*\*/g, '').trim();
export const sectionText = (doc, id) => doc.sections[id]?.text ?? '';
export const sectionsText = (doc, ids) => ids.map((id) => sectionText(doc, id)).join('\n\n');

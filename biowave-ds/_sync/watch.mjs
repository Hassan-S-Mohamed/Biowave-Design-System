#!/usr/bin/env node
// Watches the repo and keeps everything in step automatically:
//   token JSON or generator changed → rebuild CSS / TS / Dart / preview (+ contrast checks) → re-check Figma
//   component guideline / spec / figma.md changed → re-check what the Figma Agent must rebuild
// Status is written to _sync/status.txt (agents read it) and shown as a macOS notification when something needs Figma.
//   npm run watch            (foreground)      npm run watch:install   (start automatically at login, macOS)
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { ROOT, SYNC, isDesignDoc } from './lib.mjs';

const IGNORE = /(^|\/)(node_modules|\.dart_tool|build|\.git|\.idea|generated|dist|preview|_sync)(\/|$)|\.DS_Store$|~$|\.swp$/;
const isTokenSource = (rel) => /^2-foundations\/(tokens\/.+\.json|scripts\/.+\.(mjs|json))$/.test(rel);
const node = (file, ...args) => spawnSync(process.execPath, [path.join(ROOT, file), ...args], { cwd: ROOT, encoding: 'utf8' });
const stamp = () => new Date().toLocaleTimeString();
const notify = (title, msg) => {
  if (process.platform !== 'darwin') return;
  spawnSync('osascript', ['-e', `display notification ${JSON.stringify(msg)} with title ${JSON.stringify(title)}`]);
};

let timer = null, pendingBuild = false, changed = new Set(), lastStatus = '';
function run() {
  const files = [...changed]; changed = new Set();
  console.log(`\n[${stamp()}] changed: ${files.join(', ')}`);
  if (pendingBuild) {
    pendingBuild = false;
    const b = node('2-foundations/scripts/build.mjs');
    process.stdout.write(b.stdout); process.stderr.write(b.stderr);
    if (b.status !== 0) { notify('Biowave tokens: build failed', 'Fix the token JSON — see the watch log. Generated code was not updated.'); return report(); }
    node('2-foundations/scripts/preview.mjs');
    node('_sync/sync.mjs', 'stamp', '--short');
    console.log(`[${stamp()}] ✓ generated code rebuilt (CSS · TS · Dart · preview)`);
  }
  report();
}
function report() {
  const s = node('_sync/sync.mjs', 'status');
  const short = node('_sync/sync.mjs', 'status', '--short').stdout.trim();
  fs.writeFileSync(path.join(SYNC, 'status.txt'), `updated ${new Date().toISOString()}\n${short}\n\n${s.stdout}`);
  console.log(`[${stamp()}] ${short}`);
  if (short !== lastStatus && /✗/.test(short)) notify('Biowave design system out of sync', short.replace(/ · /g, '\n'));
  lastStatus = short;
}

fs.watch(ROOT, { recursive: true }, (_event, filename) => {
  if (!filename) return;
  const rel = filename.split(path.sep).join('/');
  if (IGNORE.test(rel)) return;
  const token = isTokenSource(rel), doc = isDesignDoc(rel) || /\/components\/([^/]+)\/\1\.md$/.test(rel);
  if (!token && !doc) return;
  if (token) pendingBuild = true;
  changed.add(rel);
  clearTimeout(timer); timer = setTimeout(run, 600);
});
console.log(`[${stamp()}] Biowave sync watcher running on ${ROOT}`);
// catch up on anything edited while the watcher was off
const first = node('_sync/sync.mjs', 'status', '--short').stdout;
if (/code ✗/.test(first)) { pendingBuild = true; changed.add('(changes made while the watcher was off)'); run(); } else report();

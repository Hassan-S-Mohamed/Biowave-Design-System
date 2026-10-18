#!/usr/bin/env node
// macOS: start the sync watcher automatically at login (launchd). Remove with --uninstall.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { ROOT, SYNC } from './lib.mjs';

if (process.platform !== 'darwin') { console.error('Auto-start is macOS only. Run `npm run watch` in a terminal instead.'); process.exit(1); }
const LABEL = 'com.biowave.ds-sync-watch';
const plist = path.join(os.homedir(), 'Library/LaunchAgents', `${LABEL}.plist`);
const uid = process.getuid();
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
spawnSync('launchctl', ['bootout', `gui/${uid}/${LABEL}`]);
if (process.argv.includes('--uninstall')) {
  if (fs.existsSync(plist)) fs.unlinkSync(plist);
  console.log('✓ Watcher removed from login items.');
  process.exit(0);
}
fs.mkdirSync(path.dirname(plist), { recursive: true });
fs.writeFileSync(plist, `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>Label</key><string>${LABEL}</string>
  <key>ProgramArguments</key><array><string>${esc(process.execPath)}</string><string>${esc(path.join(SYNC, 'watch.mjs'))}</string></array>
  <key>WorkingDirectory</key><string>${esc(ROOT)}</string>
  <key>RunAtLoad</key><true/>
  <key>KeepAlive</key><true/>
  <key>StandardOutPath</key><string>${esc(path.join(SYNC, 'watch.log'))}</string>
  <key>StandardErrorPath</key><string>${esc(path.join(SYNC, 'watch.log'))}</string>
  <key>EnvironmentVariables</key><dict><key>PATH</key><string>${esc(process.env.PATH || '/usr/bin:/bin')}</string></dict>
</dict></plist>
`);
const r = spawnSync('launchctl', ['bootstrap', `gui/${uid}`, plist], { encoding: 'utf8' });
if (r.status !== 0) { console.error(r.stderr || 'launchctl failed'); process.exit(1); }
console.log(`✓ Watcher installed — runs at login. Log: _sync/watch.log · Status: _sync/status.txt
  Note: if the repo stays in ~/Downloads, macOS may block background access. If _sync/watch.log shows
  "Operation not permitted", move the repo to e.g. ~/Developer, or allow Node in System Settings › Privacy & Security › Full Disk Access.`);

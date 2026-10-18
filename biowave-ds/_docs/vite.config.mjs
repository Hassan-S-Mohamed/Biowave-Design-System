// One dev server for the whole design system (npm start):
//   /                                      → Foundation List (2-foundations/index.html) — the docs home
//   /2-foundations/…                       foundations, guidelines, token preview
//   /3-web-components/ · /4-tablet-components/ · /5-mobile-components/   Components List + every component page
//   /_docs/live.html?component=<name>      the REAL React components (3-web-components/src), embedded in each Web page
// Static pages are served as they are; only live.tsx goes through React/TypeScript. Edits reload the browser.
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const root = fileURLToPath(new URL('..', import.meta.url));
const HOME = '/2-foundations/index.html';
const port = Number.parseInt(process.env.BIOWAVE_PREVIEW_PORT ?? '4173', 10);

/** `/` and folder URLs open their index.html, like the static docs server. */
const homePage = {
  name: 'biowave-home',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const path = (req.url ?? '/').split('?')[0];
      if (path === '/' || path === '/index.html') {
        res.writeHead(302, { Location: HOME });
        res.end();
        return;
      }
      next();
    });
    server.httpServer?.once('listening', () => {
      setTimeout(() => console.log(`\n  Biowave DS home → http://localhost:${port}${HOME}\n  Foundations · Web / Tablet / Mobile components · live React previews — one server.\n`), 0);
    });
  },
};

export default defineConfig({
  root,
  appType: 'mpa',
  plugins: [react(), homePage],
  // Keep the Arabic RTL plugin and Emotion on the same Stylis version (see package.json "overrides").
  resolve: { dedupe: ['react', 'react-dom', '@emotion/react', '@emotion/styled', '@mui/material', 'stylis'] },
  server: {
    port,
    open: process.env.CI ? false : HOME,
    fs: { allow: [root] },
    watch: { ignored: ['**/build/**', '**/.dart_tool/**', '**/_sync/watch.log', '**/_sync/status.txt'] },
  },
  optimizeDeps: { entries: ['_docs/live.html'] },
  logLevel: 'info',
});

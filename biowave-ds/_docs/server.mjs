import { createReadStream, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const port = Number.parseInt(process.env.BIOWAVE_PREVIEW_PORT ?? '4173', 10);
const types = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.svg': 'image/svg+xml',
};

const server = createServer((request, response) => {
  const requestPath = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname);

  if (requestPath === '/') {
    response.writeHead(302, { Location: '/2-foundations/index.html' });
    response.end();
    return;
  }

  const resolvedPath = resolve(repoRoot, `.${requestPath}`);
  if (resolvedPath !== repoRoot && !resolvedPath.startsWith(`${repoRoot}${sep}`)) {
    response.writeHead(403).end('Forbidden');
    return;
  }

  let filePath = resolvedPath;
  try {
    if (statSync(filePath).isDirectory()) filePath = resolve(filePath, 'index.html');
    if (!statSync(filePath).isFile()) throw new Error('Not a file');
  } catch {
    response.writeHead(404).end('Not found');
    return;
  }

  response.writeHead(200, {
    'Content-Type': types[extname(filePath)] ?? 'application/octet-stream',
    'Cache-Control': 'no-store',
  });
  createReadStream(filePath).pipe(response);
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Biowave docs: http://127.0.0.1:${port}/  (Foundation List · Components List per platform · one page per component)`);
  console.log('Press Ctrl+C to stop.');
});


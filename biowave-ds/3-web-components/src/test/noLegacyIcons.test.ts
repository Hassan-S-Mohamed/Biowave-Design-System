import { describe, expect, it } from 'vitest';

// Only the Vite API this file needs (a global vite/client reference would change other files' types).
declare global {
  interface ImportMeta {
    glob(
      patterns: string | string[],
      options: { query: '?raw'; import: 'default'; eager: true },
    ): Record<string, string>;
  }
}

// D-18: Biowave components use Google Material Symbols only (2-foundations/guidelines/icons.md).
const LEGACY_IMPORT = new RegExp(`(from|import|require\\()\\s*\\(?\\s*['"]${['@mui/', 'icons-material'].join('')}`);
const sources = import.meta.glob(['../**/*.ts', '../**/*.tsx', '!./noLegacyIcons.test.ts'], {
  query: '?raw',
  import: 'default',
  eager: true,
});

describe('icon set (D-18)', () => {
  it('scans the component sources', () => {
    expect(Object.keys(sources).length).toBeGreaterThan(10);
  });

  it('never imports the legacy Material Icons package', () => {
    const offenders = Object.entries(sources)
      .filter(([, text]) => LEGACY_IMPORT.test(text))
      .map(([file]) => file);
    expect(offenders).toEqual([]);
  });
});

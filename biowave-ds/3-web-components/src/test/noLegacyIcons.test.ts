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

// D-18: Biowave components use Google Material Symbols only (2-foundations/guidelines/icons.md),
// and every web component renders glyphs through `src/components/icon/`.
const LEGACY_IMPORT = new RegExp(`(from|import|require\\()\\s*\\(?\\s*['"]${['@mui/', 'icons-material'].join('')}`);
const DIRECT_ICON_MARKUP = /material-symbols-rounded|@mui\/material\/Icon\b/;
const sources = import.meta.glob(['../**/*.ts', '../**/*.tsx', '!./noLegacyIcons.test.ts'], {
  query: '?raw',
  import: 'default',
  eager: true,
});

describe('icon set (D-18)', () => {
  it('scans the component sources', () => {
    expect(Object.keys(sources).length).toBeGreaterThan(10);
    expect(Object.keys(sources).some((file) => file.startsWith('../components/icon/'))).toBe(true);
  });

  it('never imports the legacy Material Icons package', () => {
    const offenders = Object.entries(sources)
      .filter(([, text]) => LEGACY_IMPORT.test(text))
      .map(([file]) => file);
    expect(offenders).toEqual([]);
  });

  it('never uses material-symbols-rounded or @mui/material/Icon outside src/components/icon/', () => {
    const offenders = Object.entries(sources)
      .filter(([file, text]) => !file.startsWith('../components/icon/') && DIRECT_ICON_MARKUP.test(text))
      .map(([file]) => file);
    expect(offenders).toEqual([]);
  });
});

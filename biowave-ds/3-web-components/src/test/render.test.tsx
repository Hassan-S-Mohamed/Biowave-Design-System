import * as React from 'react';
import { styled } from '@mui/material/styles';
import { cssVars } from '@biowave/foundations';
import { describe, expect, it } from 'vitest';
import { renderWithBiowave } from './render';

const CacheProbe = styled('div')({
  color: cssVars.color.text.default,
});

function biowaveStyleTags(): HTMLStyleElement[] {
  return Array.from(document.querySelectorAll<HTMLStyleElement>('style[data-emotion^="bw"]'));
}

function biowaveCssRules(): string {
  return biowaveStyleTags()
    .flatMap((tag) => Array.from(tag.sheet?.cssRules ?? []).map((rule) => rule.cssText))
    .join('\n');
}

describe('renderWithBiowave emotion cache lifecycle', () => {
  it('inserts styles into the current test cache', () => {
    renderWithBiowave(<CacheProbe>First cache</CacheProbe>);

    expect(biowaveStyleTags().length).toBeGreaterThan(0);
    expect(biowaveCssRules()).toContain(cssVars.color.text.default);
  });

  it('starts fresh after cleanup and re-inserts styles into the new cache', () => {
    expect(biowaveStyleTags()).toHaveLength(0);

    renderWithBiowave(<CacheProbe>Fresh cache</CacheProbe>);

    expect(biowaveStyleTags().length).toBeGreaterThan(0);
    expect(biowaveCssRules()).toContain(cssVars.color.text.default);
  });
});

import * as React from 'react';
import { screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, expect, it, vi } from 'vitest';
// @ts-expect-error Vite's raw loader supplies source text in tests.
import componentSource from './Divider.tsx?raw';
// @ts-expect-error Vite's raw loader supplies source text in tests.
import tokenMapSource from './divider.tokens.ts?raw';
import { renderWithBiowave } from '../../test/render';
import { Divider } from './Divider';
import {
  dividerTokens,
  type DividerEmphasis,
  type DividerInset,
  type DividerOrientation,
} from './divider.tokens';

const themes = ['light', 'dark'] as const;
const locales = ['en', 'ar'] as const;
const emphases: DividerEmphasis[] = ['subtle', 'default', 'strong'];
const validLayouts: Array<{ orientation: DividerOrientation; inset: DividerInset }> = [
  { orientation: 'horizontal', inset: 'none' },
  { orientation: 'horizontal', inset: 'start' },
  { orientation: 'horizontal', inset: 'both' },
  { orientation: 'vertical', inset: 'none' },
  { orientation: 'vertical', inset: 'both' },
];

function allCssRules(): string {
  const rules: string[] = [];
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      for (const rule of Array.from(sheet.cssRules)) rules.push(rule.cssText);
    } catch {
      // The test environment has no cross-origin stylesheets.
    }
  }
  return rules.join('\n');
}

function cssRulesFor(element: Element, cssText = allCssRules()): string {
  const selectors = Array.from(element.classList)
    .filter((className) => className.startsWith('bw-'))
    .map((className) => `.${className}`);
  return cssText
    .split('\n')
    .filter((rule) => selectors.some((selector) => rule.includes(selector)))
    .join('\n');
}

describe('Divider token contract and layout', () => {
  it('renders every valid layout and emphasis in both themes and languages', () => {
    for (const theme of themes) {
      for (const locale of locales) {
        const view = renderWithBiowave(
          <div>
            {validLayouts.flatMap(({ orientation, inset }) =>
              emphases.map((emphasis) => {
                const key = `${orientation}-${emphasis}-${inset}`;
                return (
                  <Divider
                    key={key}
                    data-testid={key}
                    orientation={orientation}
                    emphasis={emphasis}
                    inset={inset}
                  />
                );
              }),
            )}
          </div>,
          { theme, locale },
        );

        expect(document.documentElement).toHaveAttribute('lang', locale);
        expect(document.documentElement).toHaveAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr');

        for (const { orientation, inset } of validLayouts) {
          for (const emphasis of emphases) {
            const divider = screen.getByTestId(`${orientation}-${emphasis}-${inset}`);
            const rules = cssRulesFor(divider);
            const line = dividerTokens.line[emphasis];

            expect(rules).toContain(line.color);
            expect(rules).toContain(line.width);
            expect(rules).toContain(
              orientation === 'horizontal'
                ? 'border-block-end-width'
                : 'border-inline-end-width',
            );

            if (inset === 'start') {
              expect(rules).toContain(`margin-inline-start: ${dividerTokens.inset.start}`);
            } else if (inset === 'both') {
              expect(rules).toContain(
                orientation === 'horizontal'
                  ? `margin-inline: ${dividerTokens.inset.both}`
                  : `margin-block: ${dividerTokens.inset.both}`,
              );
            } else {
              expect(rules).toContain(`margin: ${dividerTokens.inset.none}`);
            }
          }
        }
        view.unmount();
      }
    }
  });

  it('uses only semantic tokens and logical directional properties', () => {
    const rawValue = /#[0-9a-f]{3,8}\b|\d+px|\d+ms|\bInter\b|\bIBM Plex\b/i;
    const physicalProperty =
      /\b(?:margin|padding|border)(?:Left|Right)\b|\b(?:margin|padding|border)-(?:left|right)\b/i;

    expect(componentSource).not.toMatch(rawValue);
    expect(tokenMapSource).not.toMatch(rawValue);
    expect(componentSource).not.toMatch(physicalProperty);
    expect(tokenMapSource).not.toMatch(physicalProperty);
    expect(componentSource).toContain('marginInlineStart');
    expect(componentSource).toContain('marginInline');
    expect(componentSource).toContain('marginBlock');
    expect(componentSource).toContain('paddingInline');
    expect(componentSource).toContain('borderBlockEndWidth');
    expect(componentSource).toContain('borderInlineEndWidth');
  });

  it('keeps start inset at the logical inline start in English and Arabic', () => {
    for (const locale of locales) {
      const view = renderWithBiowave(
        <Divider inset="start" data-testid={`start-${locale}`} />,
        { locale },
      );
      const divider = screen.getByTestId(`start-${locale}`);
      const rules = cssRulesFor(divider);
      expect(rules).toContain(`margin-inline-start: ${dividerTokens.inset.start}`);
      expect(rules).not.toMatch(/margin-(?:left|right)/i);
      expect(getComputedStyle(divider).marginInlineStart).toBe(dividerTokens.inset.start);
      view.unmount();
    }
  });

  it('stretches a vertical divider to its flex row block size', () => {
    renderWithBiowave(
      <div style={{ display: 'flex' }}>
        <span>One</span>
        <Divider orientation="vertical" data-testid="vertical" />
        <span>Two</span>
      </div>,
    );
    const rules = cssRulesFor(screen.getByTestId('vertical'));
    expect(rules).toContain('align-self: stretch');
    expect(rules).toContain('block-size: auto');
  });
});

describe('Divider label', () => {
  it('centres English and Arabic labels between token-styled line segments', () => {
    const cases = [
      { locale: 'en' as const, label: 'or' },
      { locale: 'ar' as const, label: 'أو' },
    ];

    for (const theme of themes) {
      for (const { locale, label } of cases) {
        for (const emphasis of emphases) {
          const view = renderWithBiowave(
            <Divider
              showLabel
              label={label}
              emphasis={emphasis}
              inset="both"
              data-testid={`${theme}-${locale}-${emphasis}`}
            />,
            { theme, locale },
          );
          const divider = screen.getByTestId(`${theme}-${locale}-${emphasis}`);
          const labelElement = divider.querySelector('.MuiDivider-wrapper');
          const rules = cssRulesFor(divider);

          expect(divider).toHaveTextContent(label);
          expect(labelElement).not.toBeNull();
          expect(rules).toContain('align-items: center');
          expect(rules).toContain('text-align: center');
          expect(rules).toContain(`padding-inline: ${dividerTokens.label.gap}`);
          expect(rules).toContain(dividerTokens.label.color);
          expect(rules).toContain(dividerTokens.label.minimumSegmentLength);
          expect(rules).toContain(dividerTokens.line[emphasis].color);
          expect(rules).toContain(dividerTokens.line[emphasis].width);
          expect(rules).toContain(`margin-inline: ${dividerTokens.inset.both}`);
          for (const value of Object.values(dividerTokens.label.typography)) {
            expect(rules).toContain(String(value));
          }
          if (locale === 'ar') {
            expect(document.documentElement).toHaveAttribute('dir', 'rtl');
            expect(rules).not.toMatch(/padding-(?:left|right)/i);
          }
          view.unmount();
        }
      }
    }
  });

  it('renders a plain line when the label option is off', () => {
    const { container } = renderWithBiowave(
      <Divider showLabel={false} label="or" data-testid="plain" />,
    );
    expect(screen.getByTestId('plain').tagName).toBe('HR');
    expect(container).not.toHaveTextContent('or');
    expect(container.querySelector('.MuiDivider-wrapper')).toBeNull();
  });
});

describe('Divider semantics and validation', () => {
  it('uses the required root and separator semantics', () => {
    const ref = React.createRef<HTMLHRElement | HTMLDivElement | HTMLLIElement>();
    const view = renderWithBiowave(
      <Divider ref={ref} className="consumer-class" data-purpose="section" />,
    );
    const horizontal = screen.getByRole('separator');
    expect(horizontal.tagName).toBe('HR');
    expect(horizontal).toHaveClass('bw-divider__container', 'consumer-class');
    expect(horizontal).toHaveAttribute('data-purpose', 'section');
    expect(horizontal).not.toHaveAttribute('aria-orientation');
    expect(horizontal).not.toHaveAttribute('tabindex');
    expect(ref.current).toBe(horizontal);

    view.rerender(<Divider orientation="vertical" data-testid="vertical-semantic" />);
    const vertical = screen.getByTestId('vertical-semantic');
    expect(vertical.tagName).toBe('HR');
    expect(vertical).toHaveAttribute('aria-orientation', 'vertical');
    expect(vertical).not.toHaveAttribute('tabindex');

    view.rerender(<Divider showLabel label="or" data-testid="labelled" />);
    const labelled = screen.getByTestId('labelled');
    expect(labelled.tagName).toBe('DIV');
    expect(labelled).toHaveAttribute('role', 'separator');
    expect(labelled).toHaveAttribute('aria-label', 'or');
    expect(labelled).toHaveTextContent('or');
    expect(labelled).not.toHaveAttribute('tabindex');
  });

  it('hides decorative dividers and removes naming and orientation metadata', () => {
    const { container } = renderWithBiowave(
      <Divider
        decorative
        showLabel
        label="or"
        data-testid="decorative"
      />,
    );
    const divider = container.querySelector('[data-testid="decorative"]');
    expect(divider).toHaveAttribute('aria-hidden', 'true');
    expect(divider).not.toHaveAttribute('aria-label');
    expect(divider).not.toHaveAttribute('aria-orientation');
    expect(divider).not.toHaveAttribute('tabindex');

    const { container: verticalContainer } = renderWithBiowave(
      <Divider decorative orientation="vertical" data-testid="decorative-vertical" />,
    );
    expect(
      verticalContainer.querySelector('[data-testid="decorative-vertical"]'),
    ).not.toHaveAttribute('aria-orientation');
  });

  it('renders list dividers as hidden li roots without nested hr elements', () => {
    const { container } = renderWithBiowave(
      <ul>
        <li>Profile</li>
        <Divider component="li" decorative={false} data-testid="list-plain" />
        <li>Preferences</li>
        <Divider
          component="li"
          decorative={false}
          showLabel
          label="or"
          data-testid="list-label"
        />
        <li>Sign out</li>
      </ul>,
    );

    for (const testId of ['list-plain', 'list-label']) {
      const divider = screen.getByTestId(testId);
      expect(divider.tagName).toBe('LI');
      expect(divider).toHaveAttribute('role', 'separator');
      expect(divider).toHaveAttribute('aria-hidden', 'true');
      expect(divider).not.toHaveAttribute('aria-label');
      expect(divider.querySelector('hr')).toBeNull();
    }
    expect(container.querySelector('ul > hr')).toBeNull();
  });

  it('warns once for invalid combinations and renders each fallback', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const view = renderWithBiowave(
      <Divider orientation="vertical" inset="start" data-testid="invalid-inset" />,
    );
    view.rerender(
      <Divider orientation="vertical" inset="start" data-testid="invalid-inset" />,
    );
    expect(cssRulesFor(screen.getByTestId('invalid-inset'))).toContain(
      `margin: ${dividerTokens.inset.none}`,
    );

    view.rerender(
      <Divider orientation="vertical" showLabel label="or" data-testid="invalid-vertical-label" />,
    );
    expect(screen.getByTestId('invalid-vertical-label')).not.toHaveTextContent('or');

    view.rerender(<Divider showLabel label="" data-testid="invalid-empty-label" />);
    expect(screen.getByTestId('invalid-empty-label').tagName).toBe('HR');
    expect(screen.getByTestId('invalid-empty-label')).toBeEmptyDOMElement();

    view.rerender(<Divider showLabel data-testid="invalid-missing-label" />);
    expect(screen.getByTestId('invalid-missing-label').tagName).toBe('HR');

    const warnings = warn.mock.calls.map(([message]) => String(message));
    expect(warnings.filter((message) => message.includes('inset start'))).toHaveLength(1);
    expect(warnings.filter((message) => message.includes('label is for horizontal'))).toHaveLength(1);
    expect(warnings.filter((message) => message.includes('showLabel needs a label'))).toHaveLength(1);
    warn.mockRestore();
  });

  it('has no axe violations in both themes and languages', async () => {
    for (const theme of themes) {
      for (const locale of locales) {
        const { container, unmount } = renderWithBiowave(
          <main>
            <section>
              <h2>First</h2>
              <Divider />
              <Divider decorative />
              <Divider showLabel label={locale === 'ar' ? 'أو' : 'or'} />
              <Divider decorative showLabel label={locale === 'ar' ? 'أو' : 'or'} />
              <Divider orientation="vertical" />
            </section>
            <ul>
              <li>One</li>
              <Divider component="li" />
              <li>Two</li>
            </ul>
          </main>,
          { theme, locale },
        );
        expect(
          (
            await axe(container, {
              rules: { 'color-contrast': { enabled: false } },
            })
          ).violations,
        ).toEqual([]);
        unmount();
      }
    }
  });
});

import * as React from 'react';
import { screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, expect, it, vi } from 'vitest';
import componentTokenSource from '../../../components/icon/icon.tokens.json';
// @ts-expect-error Vite's raw loader supplies source text in tests.
import iconSource from './Icon.tsx?raw';
// @ts-expect-error Vite's raw loader supplies source text in tests.
import tokenMapSource from './icon.tokens.ts?raw';
import { renderWithBiowave } from '../../test/render';
import { Button } from '../button';
import { IconButton } from '../icon-button';
import { Icon } from './Icon';
import {
  iconColorTokens,
  iconSizeTokens,
  type IconColor,
  type IconSize,
} from './icon.tokens';

const sizes: IconSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'];
const colors: IconColor[] = [
  'default',
  'subtle',
  'muted',
  'inverse',
  'brand',
  'secondary',
  'success',
  'warning',
  'error',
  'info',
];
const themes = ['light', 'dark'] as const;
const locales = ['en', 'ar'] as const;
const buttonSizes = ['sm', 'md', 'lg'] as const;

interface TokenLeaf {
  $value: string;
}

const source = componentTokenSource.icon as unknown as {
  size: Record<IconSize, { size: TokenLeaf }>;
  color: Record<IconColor, { color: TokenLeaf }>;
};

function cssVariable({ $value }: TokenLeaf): string {
  return `var(--bw-${$value.slice(1, -1).replaceAll('.', '-')})`;
}

function allCssRules(): string {
  const rules: string[] = [];
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      for (const rule of Array.from(sheet.cssRules)) rules.push(rule.cssText);
    } catch {
      // Cross-origin stylesheets are not readable in jsdom.
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

describe('Icon token contract', () => {
  it('matches every component-token alias', () => {
    for (const size of sizes) {
      expect(iconSizeTokens[size]).toBe(cssVariable(source.size[size].size));
    }
    for (const color of colors) {
      expect(iconColorTokens[color]).toBe(cssVariable(source.color[color].color));
    }
  });

  it('contains no raw colors, dimensions, durations, or font names', () => {
    const rawValue = /#[0-9a-f]{3,8}\b|\d+px|\d+ms|\bInter\b|\bIBM Plex\b/i;
    for (const sourceText of [iconSource, tokenMapSource]) {
      expect(sourceText).not.toMatch(rawValue);
      expect(sourceText).not.toContain('@mui/icons-material');
    }
  });
});

describe('Icon rendering', () => {
  it('renders every size as a token-sized box in both themes and languages', () => {
    for (const theme of themes) {
      for (const locale of locales) {
        const view = renderWithBiowave(
          <>
            {sizes.map((size) => (
              <Icon key={size} name="schedule" size={size} data-testid={`icon-${size}`} />
            ))}
          </>,
          { theme, locale },
        );

        for (const size of sizes) {
          const el = screen.getByTestId(`icon-${size}`);
          expect(el).toHaveClass('bw-icon', 'material-symbols-rounded');
          expect(el).toHaveStyle({
            inlineSize: iconSizeTokens[size],
            blockSize: iconSizeTokens[size],
            fontSize: iconSizeTokens[size],
          });
          expect(el).toHaveTextContent('schedule');
        }
        expect(document.documentElement.dir).toBe(locale === 'ar' ? 'rtl' : 'ltr');
        view.unmount();
      }
    }
  });

  it('without size follows the parent font-size inside Button sm/md/lg', () => {
    const view = renderWithBiowave(
      <>
        {buttonSizes.map((size) => (
          <Button key={size} size={size} startIcon={<Icon name="add" data-testid={`in-${size}`} />}>
            {size}
          </Button>
        ))}
      </>,
    );

    for (const size of buttonSizes) {
      const icon = screen.getByTestId(`in-${size}`);
      const wrapper = icon.parentElement;
      expect(wrapper).toHaveClass('bw-button__icon');
      expect(getComputedStyle(wrapper!).fontSize).toBeTruthy();
      expect(icon).toHaveStyle({ fontSize: 'inherit' });
    }
    view.unmount();
  });

  it('maps filled, color, and currentColor', () => {
    const view = renderWithBiowave(
      <>
        <Icon name="push_pin" filled data-testid="filled" />
        <Icon name="schedule" color="brand" data-testid="brand" />
        <Icon name="add" data-testid="inherit" />
      </>,
    );

    expect(screen.getByTestId('filled')).toHaveClass('bw-icon-fill');
    expect(screen.getByTestId('brand')).toHaveStyle({ color: iconColorTokens.brand });
    // `currentColor` resolves in computed style; assert the token rule instead.
    expect(cssRulesFor(screen.getByTestId('inherit'))).toMatch(/color:\s*currentColor/i);
    view.unmount();
  });

  it('mirrors directional icons in RTL only; one flip inside Button and IconButton', () => {
    const ltr = renderWithBiowave(
      <Icon name="arrow_forward" directional data-testid="dir-ltr" />,
      { locale: 'en' },
    );
    const ltrIcon = screen.getByTestId('dir-ltr');
    expect(ltrIcon).toHaveClass('bw-icon-directional');
    expect(cssRulesFor(ltrIcon)).toContain('scaleX(-1)');
    expect(document.documentElement.dir).toBe('ltr');
    ltr.unmount();

    const rtl = renderWithBiowave(
      <Icon name="arrow_forward" directional data-testid="dir-rtl" />,
      { locale: 'ar' },
    );
    expect(screen.getByTestId('dir-rtl')).toHaveClass('bw-icon-directional');
    expect(document.documentElement.dir).toBe('rtl');
    rtl.unmount();

    const inButton = renderWithBiowave(
      <Button startIcon={<Icon name="arrow_forward" className="bw-icon-directional" />}>
        Next
      </Button>,
      { locale: 'ar' },
    );
    const button = screen.getByRole('button', { name: 'Next' });
    const wrapper = button.querySelector('.bw-button__icon');
    expect(wrapper).toHaveClass('bw-icon-directional');
    expect(button.querySelectorAll('.bw-icon-directional')).toHaveLength(1);
    expect(wrapper?.firstElementChild).not.toHaveClass('bw-icon-directional');
    expect(cssRulesFor(wrapper!)).toContain('scaleX(-1)');
    inButton.unmount();

    const inIconButton = renderWithBiowave(
      <IconButton
        icon={<Icon name="arrow_forward" className="bw-icon-directional" />}
        label="Next"
        tooltip={false}
      />,
      { locale: 'ar' },
    );
    const iconButton = screen.getByRole('button', { name: 'Next' });
    expect(iconButton.querySelectorAll('.bw-icon-directional')).toHaveLength(1);
    inIconButton.unmount();
  });

  it('is decorative without label and labelled with role=img; axe clean', async () => {
    const decorative = renderWithBiowave(<Icon name="add" data-testid="deco" />);
    const deco = screen.getByTestId('deco');
    expect(deco).toHaveAttribute('aria-hidden', 'true');
    expect(deco).not.toHaveAttribute('role');
    decorative.unmount();

    const labelled = renderWithBiowave(
      <Icon name="schedule" size="md" color="warning" label="Overdue" data-testid="label" />,
    );
    const el = screen.getByTestId('label');
    expect(el).toHaveAttribute('role', 'img');
    expect(el).toHaveAttribute('aria-label', 'Overdue');
    expect(el).not.toHaveAttribute('aria-hidden');
    expect((await axe(labelled.container)).violations).toEqual([]);
    labelled.unmount();
  });

  it('warns once for invalid combinations', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    renderWithBiowave(<Icon name="" size="md" />);
    renderWithBiowave(<Icon name="" size="md" />);
    expect(warn).toHaveBeenCalledWith('Icon: `name` is empty; rendering an empty box.');

    warn.mockClear();
    renderWithBiowave(<Icon name="schedule" size="md" color="warning" />);
    renderWithBiowave(<Icon name="schedule" size="md" color="error" />);
    expect(warn).toHaveBeenCalledWith('Icon: status icons need text or a label');
    expect(warn).toHaveBeenCalledTimes(1);

    warn.mockClear();
    renderWithBiowave(<Icon name="schedule" color="warning" />);
    expect(warn).not.toHaveBeenCalled();

    warn.mockRestore();
  });

  it('rejects an unknown name at the type level', () => {
    // @ts-expect-error — unknown Material Symbol names must be a TypeScript error
    const _invalid: React.ReactElement = <Icon name="not_a_real_symbol_xyz" />;
    void _invalid;
  });
});

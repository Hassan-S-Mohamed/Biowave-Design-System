import * as React from 'react';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// @ts-expect-error The installed package's exports map omits its bundled declaration file.
import { computeAccessibleName } from 'dom-accessibility-api';
import { axe } from 'vitest-axe';
import { afterEach, describe, expect, it, vi } from 'vitest';
// @ts-expect-error Vite's raw loader supplies source text in tests.
import componentSource from './IconButton.tsx?raw';
// @ts-expect-error Vite's raw loader supplies source text in tests.
import tooltipSource from './IconButtonTooltip.tsx?raw';
// @ts-expect-error Vite's raw loader supplies source text in tests.
import tokenSource from './iconButton.tokens.ts?raw';
import { renderWithBiowave } from '../../test/render';
import { buttonSizeTokens, type ButtonColor, type ButtonSize } from '../button/button.tokens';
import { IconButton, type IconButtonVariant } from './IconButton';
import { iconButtonSelectedTokens } from './iconButton.tokens';
import { Icon } from '../icon';
const sizes: ButtonSize[] = ['sm', 'md', 'lg'];
const themes = ['light', 'dark'] as const;
const locales = ['en', 'ar'] as const;
const allowedColors: Record<IconButtonVariant, ButtonColor[]> = {
  filled: ['brand', 'secondary', 'neutral', 'error', 'inverse'],
  tonal: ['brand', 'secondary', 'error'],
  outlined: ['brand', 'secondary', 'neutral', 'error', 'inverse'],
  text: ['brand', 'secondary', 'neutral', 'error', 'inverse'],
};

afterEach(() => {
  vi.useRealTimers();
});

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

describe('IconButton rendering and tokens', () => {
  it('renders every supported variant, color, and size in both themes and languages', () => {
    for (const theme of themes) {
      for (const locale of locales) {
        const cases = (Object.keys(allowedColors) as IconButtonVariant[]).flatMap((variant) =>
          allowedColors[variant].flatMap((color) =>
            sizes.map((size) => ({ variant, color, size, label: `${variant}-${color}-${size}` })),
          ),
        );
        const view = renderWithBiowave(
          <>
            {cases.map(({ variant, color, size, label }) => (
              <IconButton
                key={label}
                icon={<Icon name="edit" />}
                label={label}
                variant={variant}
                color={color}
                size={size}
                tooltip={false}
              />
            ))}
          </>,
          { theme, locale },
        );

        expect(view.container.querySelectorAll('button')).toHaveLength(cases.length);
        expect(document.documentElement.dir).toBe(locale === 'ar' ? 'rtl' : 'ltr');
        view.unmount();
      }
    }
  }, 30_000);

  it('uses square size tokens and the selected toggle token map', () => {
    const view = renderWithBiowave(
      <>
        {sizes.map((size) => (
          <IconButton
            key={size}
            icon={<Icon name="push_pin" />}
            selectedIcon={<Icon name="push_pin" filled />}
            label={size}
            size={size}
            toggle
            selected
            variant="outlined"
            color="brand"
            tooltip={false}
          />
        ))}
      </>,
    );

    Array.from(view.container.querySelectorAll('button')).forEach((button, index) => {
      const rules = cssRulesFor(button);
      expect(rules).toContain(buttonSizeTokens[sizes[index]].height);
      expect(rules).toContain(buttonSizeTokens[sizes[index]].icon);
      expect(rules).toContain(iconButtonSelectedTokens.outlined.brand.bg);
      expect(rules).toContain(iconButtonSelectedTokens.outlined.brand.icon.default);
      expect(rules).toContain(iconButtonSelectedTokens.outlined.brand.border?.default);
    });
  });

  it('contains no raw colors, dimensions, durations, or font names', () => {
    const rawValue = /#[0-9a-f]{3,8}\b|\d+px|\d+ms|\bInter\b|\bIBM Plex\b/i;
    expect(componentSource).not.toMatch(rawValue);
    expect(tooltipSource).not.toMatch(rawValue);
    expect(tokenSource).not.toMatch(rawValue);
  });
});

describe('IconButton behavior', () => {
  it('has one accessible name and shows its visual tooltip on hover and focus', async () => {
    const view = renderWithBiowave(
      <IconButton icon={<Icon name="edit" />} label="Edit device" />,
    );
    const button = screen.getByRole('button', { name: 'Edit device' });
    expect(computeAccessibleName(button)).toBe('Edit device');

    act(() => button.focus());
    expect(button).toHaveFocus();
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Edit device');

    fireEvent.keyDown(document, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());

    act(() => button.blur());
    fireEvent.mouseOver(button);
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Edit device');
    view.unmount();
  });

  it('exposes controlled toggle state and cross-fades the selected icon', () => {
    const view = renderWithBiowave(
      <IconButton
        icon={<Icon name="push_pin" data-testid="pin-outline" />}
        selectedIcon={<Icon name="push_pin" filled data-testid="pin-filled" />}
        label="Pin"
        toggle
        tooltip={false}
      />,
    );
    expect(screen.getByRole('button', { name: 'Pin' })).toHaveAttribute('aria-pressed', 'false');

    view.rerender(
      <IconButton
        icon={<Icon name="push_pin" data-testid="pin-outline" />}
        selectedIcon={<Icon name="push_pin" filled data-testid="pin-filled" />}
        label="Unpin"
        toggle
        selected
        tooltip={false}
      />,
    );
    const selectedButton = screen.getByRole('button', { name: 'Unpin' });
    expect(selectedButton).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('pin-outline')).toBeInTheDocument();
    expect(screen.getByTestId('pin-filled')).toBeInTheDocument();
    expect(cssRulesFor(selectedButton)).toContain('opacity: 1');
  });

  it('stays focusable while loading, blocks activation, and announces progress once', () => {
    const onClick = vi.fn();
    renderWithBiowave(
      <IconButton
        icon={<Icon name="edit" />}
        label="Edit device"
        loading
        loadingLabel="Editing…"
        onClick={onClick}
        tooltip={false}
      />,
    );
    const button = screen.getByRole('button', { name: 'Edit device' });
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button).not.toBeDisabled();
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
    expect(screen.getAllByRole('status')).toHaveLength(1);
    expect(screen.getByRole('status')).toHaveTextContent('Editing…');
  });

  it('uses a native disabled button and activates with keyboard input', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    renderWithBiowave(
      <>
        <IconButton icon={<Icon name="close" />} label="Disabled" disabled tooltip={false} />
        <IconButton icon={<Icon name="edit" />} label="Edit" onClick={onClick} tooltip={false} />
      </>,
    );
    expect(screen.getByRole('button', { name: 'Disabled' })).toBeDisabled();
    await user.tab();
    expect(screen.getByRole('button', { name: 'Edit' })).toHaveFocus();
    await user.keyboard('{Enter}');
    await user.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(2);
  });
});

describe('IconButton validation and RTL', () => {
  it('warns and applies the specified fallbacks', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const view = renderWithBiowave(
      <IconButton
        icon={<Icon name="edit" />}
        label="Fallback"
        variant="tonal"
        color="neutral"
        toggle
        selected
        tooltip={false}
      />,
    );
    view.rerender(
      <IconButton icon={<Icon name="edit" />} label="" toggle tooltip={false} />,
    );

    expect(warn.mock.calls.flat().join(' ')).toContain('falling back to variant="outlined"');
    expect(warn.mock.calls.flat().join(' ')).toContain('selectedIcon');
    expect(warn.mock.calls.flat().join(' ')).toContain('IconButton needs a label');
    warn.mockRestore();
  });

  it('mirrors only directional icon wrappers in RTL', () => {
    const view = renderWithBiowave(
      <IconButton
        icon={<Icon name="arrow_forward" className="bw-icon-directional" />}
        label="التالي"
        tooltip={false}
      />,
      { locale: 'ar' },
    );
    const directional = screen.getByRole('button', { name: 'التالي' });
    expect(directional.querySelectorAll('.bw-icon-directional')).toHaveLength(1);
    expect(cssRulesFor(directional)).toContain('scaleX(-1)');
    view.unmount();

    renderWithBiowave(
      <IconButton icon={<Icon name="close" />} label="إغلاق" tooltip={false} />,
      { locale: 'ar' },
    );
    expect(document.querySelector('.bw-icon-button__icon')).not.toHaveClass('bw-icon-directional');
  });
});

describe('IconButton accessibility', () => {
  for (const theme of themes) {
    it(`has no axe violations in ${theme}`, async () => {
      const { container } = renderWithBiowave(
        <>
          <IconButton icon={<Icon name="edit" />} label="Edit" tooltip={false} />
          <IconButton
            icon={<Icon name="push_pin" />}
            selectedIcon={<Icon name="push_pin" filled />}
            label="Pin"
            variant="outlined"
            toggle
            selected
            tooltip={false}
          />
        </>,
        { theme },
      );
      expect(
        (
          await axe(container, {
            rules: { 'color-contrast': { enabled: false } },
          })
        ).violations,
      ).toEqual([]);
    }, 20_000);
  }
});

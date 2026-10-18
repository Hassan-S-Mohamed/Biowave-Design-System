import * as React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DownloadRounded from '@mui/icons-material/DownloadRounded';
import TableChartRounded from '@mui/icons-material/TableChartRounded';
import { axe } from 'vitest-axe';
import { describe, expect, it, vi } from 'vitest';
import { cssVars } from '@biowave/foundations';
// @ts-expect-error Vite's raw loader supplies source text in tests.
import componentSource from './SplitButton.tsx?raw';
// @ts-expect-error Vite's raw loader supplies source text in tests.
import menuSource from './SplitButtonMenu.tsx?raw';
import { renderWithBiowave } from '../../test/render';
import {
  SplitButton,
  type SplitButtonColor,
  type SplitButtonOption,
  type SplitButtonSize,
  type SplitButtonVariant,
} from './SplitButton';

const variants: SplitButtonVariant[] = ['filled', 'tonal', 'outlined'];
const colors: SplitButtonColor[] = ['brand', 'secondary', 'neutral'];
const sizes: SplitButtonSize[] = ['sm', 'md', 'lg'];
const themes = ['light', 'dark'] as const;
const locales = ['en', 'ar'] as const;

function makeOptions(onSelect = vi.fn()): SplitButtonOption[] {
  return [
    { label: 'Export as Excel', onSelect, icon: <TableChartRounded /> },
    { label: 'Export as CSV', onSelect: vi.fn() },
    { label: 'Export as JSON', onSelect: vi.fn() },
  ];
}

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

describe('SplitButton rendering', () => {
  it('renders every supported variant, color, and size in both themes and languages', () => {
    for (const theme of themes) {
      for (const locale of locales) {
        const cases = variants.flatMap((variant) =>
          colors.flatMap((color) => {
            if (variant === 'tonal' && color === 'neutral') return [];
            return sizes.map((size) => ({ variant, color, size }));
          }),
        );
        const view = renderWithBiowave(
          <>
            {cases.map(({ variant, color, size }) => {
              const label = `${variant}-${color}-${size}`;
              return (
                <SplitButton
                  key={label}
                  variant={variant}
                  color={color}
                  size={size}
                  onClick={vi.fn()}
                  options={makeOptions()}
                >
                  {label}
                </SplitButton>
              );
            })}
          </>,
          { theme, locale },
        );

        expect(view.container.querySelectorAll('[role="group"]')).toHaveLength(cases.length);
        expect(view.container.querySelectorAll('button')).toHaveLength(cases.length * 2);
        expect(document.documentElement.dir).toBe(locale === 'ar' ? 'rtl' : 'ltr');
        view.unmount();
      }
    }
  }, 30_000);

  it('composes two real buttons with tokenized logical segment radii in LTR and RTL', () => {
    for (const locale of locales) {
      const view = renderWithBiowave(
        <SplitButton
          startIcon={<DownloadRounded />}
          onClick={vi.fn()}
          options={makeOptions()}
        >
          Export report
        </SplitButton>,
        { locale },
      );
      const [primary, trigger] = screen.getAllByRole('button');
      expect(cssRulesFor(primary)).toContain(cssVars.radius.md);
      expect(cssRulesFor(primary)).toContain(cssVars.radius.xs);
      expect(cssRulesFor(primary)).toContain('border-start-end-radius');
      expect(cssRulesFor(trigger)).toContain(cssVars.radius.md);
      expect(cssRulesFor(trigger)).toContain(cssVars.radius.xs);
      expect(cssRulesFor(trigger)).toContain('border-start-start-radius');
      view.unmount();
    }
  });

  it('contains no raw colors, dimensions, durations, or font names', () => {
    const rawValue = /#[0-9a-f]{3,8}\b|\d+px|\d+ms|\bInter\b|\bIBM Plex\b/i;
    expect(componentSource).not.toMatch(rawValue);
    expect(menuSource).not.toMatch(rawValue);
  });
});

describe('SplitButton menu', () => {
  it('opens from the trigger, focuses the first item, chooses once, and restores focus', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    renderWithBiowave(
      <SplitButton onClick={vi.fn()} options={makeOptions(onSelect)}>
        Export report
      </SplitButton>,
    );
    const trigger = screen.getByRole('button', { name: 'More options for Export report' });

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('menu', { name: 'More options for Export report' })).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByRole('menuitem', { name: 'Export as Excel' })).toHaveFocus(),
    );

    await user.keyboard('{Enter}');
    expect(onSelect).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it('implements Arrow, Home, End, Escape, and ArrowUp-open keyboard behavior', async () => {
    const user = userEvent.setup();
    renderWithBiowave(
      <SplitButton onClick={vi.fn()} options={makeOptions()}>
        Export report
      </SplitButton>,
    );
    const trigger = screen.getByRole('button', { name: 'More options for Export report' });
    trigger.focus();

    await user.keyboard('{ArrowUp}');
    await waitFor(() =>
      expect(screen.getByRole('menuitem', { name: 'Export as JSON' })).toHaveFocus(),
    );
    await user.keyboard('{Home}');
    expect(screen.getByRole('menuitem', { name: 'Export as Excel' })).toHaveFocus();
    await user.keyboard('{ArrowUp}');
    expect(screen.getByRole('menuitem', { name: 'Export as JSON' })).toHaveFocus();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('menuitem', { name: 'Export as Excel' })).toHaveFocus();
    await user.keyboard('{End}');
    expect(screen.getByRole('menuitem', { name: 'Export as JSON' })).toHaveFocus();
    await user.keyboard('{Escape}');
    await waitFor(() => expect(trigger).toHaveFocus());
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes on Tab without returning focus to the trigger', async () => {
    const user = userEvent.setup();
    renderWithBiowave(
      <>
        <SplitButton onClick={vi.fn()} options={makeOptions()}>
          Export report
        </SplitButton>
        <button type="button">After</button>
      </>,
    );
    const trigger = screen.getByRole('button', { name: 'More options for Export report' });
    await user.click(trigger);
    await user.tab();
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
    expect(trigger).not.toHaveFocus();
  });

  it('supports controlled open state', () => {
    const onOpenChange = vi.fn();
    const view = renderWithBiowave(
      <SplitButton open={false} onOpenChange={onOpenChange} onClick={vi.fn()} options={makeOptions()}>
        Export report
      </SplitButton>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'More options for Export report' }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();

    view.rerender(
      <SplitButton open onOpenChange={onOpenChange} onClick={vi.fn()} options={makeOptions()}>
        Export report
      </SplitButton>,
    );
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });
});

describe('SplitButton states and validation', () => {
  it('runs the primary action independently and disables the trigger while loading', () => {
    const onClick = vi.fn();
    const view = renderWithBiowave(
      <SplitButton onClick={onClick} options={makeOptions()}>
        Export report
      </SplitButton>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Export report' }));
    expect(onClick).toHaveBeenCalledTimes(1);

    view.rerender(
      <SplitButton loading onClick={onClick} options={makeOptions()}>
        Export report
      </SplitButton>,
    );
    expect(screen.getByRole('button', { name: 'Export report' })).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByRole('button', { name: 'More options for Export report' })).toBeDisabled();
  });

  it('warns for invalid variant, option count, and repeated primary action', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    renderWithBiowave(
      <SplitButton
        variant="tonal"
        color="neutral"
        onClick={vi.fn()}
        options={[{ label: 'Export report', onSelect: vi.fn() }]}
      >
        Export report
      </SplitButton>,
    );
    const warnings = warn.mock.calls.flat().join(' ');
    expect(warnings).toContain('falling back to variant="outlined"');
    expect(warnings).toContain('between 2 and 5');
    expect(warnings).toContain("Don't repeat the primary action");
    warn.mockRestore();
  });
});

describe('SplitButton accessibility', () => {
  for (const theme of themes) {
    it(`has no axe violations when closed and open in ${theme}`, async () => {
      const user = userEvent.setup();
      const view = renderWithBiowave(
        <SplitButton onClick={vi.fn()} options={makeOptions()}>
          Export report
        </SplitButton>,
        { theme },
      );
      expect(
        (await axe(view.container, { rules: { 'color-contrast': { enabled: false } } })).violations,
      ).toEqual([]);

      await user.click(screen.getByRole('button', { name: 'More options for Export report' }));
      const menu = screen.getByRole('menu', { name: 'More options for Export report' });
      expect(
        (await axe(menu, { rules: { 'color-contrast': { enabled: false } } })).violations,
      ).toEqual([]);
    }, 20_000);
  }
});

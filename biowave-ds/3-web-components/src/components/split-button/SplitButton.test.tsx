import * as React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { describe, expect, it, vi } from 'vitest';
import { base, cssVars } from '@biowave/foundations';
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
import { Icon } from '../icon';
const variants: SplitButtonVariant[] = ['filled', 'tonal', 'outlined'];
const colors: SplitButtonColor[] = ['brand', 'secondary', 'neutral'];
const sizes: SplitButtonSize[] = ['sm', 'md', 'lg'];
const themes = ['light', 'dark'] as const;
const locales = ['en', 'ar'] as const;

function makeOptions(onSelect = vi.fn()): SplitButtonOption[] {
  return [
    { label: 'Export as Excel', onSelect, icon: <Icon name="table_chart" /> },
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
  });

  it('assigns every logical segment corner for each variant in LTR and RTL', () => {
    for (const locale of locales) {
      for (const variant of variants) {
        const view = renderWithBiowave(
          <SplitButton
            variant={variant}
            startIcon={<Icon name="download" />}
            onClick={vi.fn()}
            options={makeOptions()}
          >
            Export report
          </SplitButton>,
          { locale },
        );
        const [primary, trigger] = screen.getAllByRole('button');
        const primaryRules = cssRulesFor(primary).replace(/\s+/g, '');
        const triggerRules = cssRulesFor(trigger).replace(/\s+/g, '');

        expect(primaryRules).toContain(`border-start-start-radius:${cssVars.radius.md}`);
        expect(primaryRules).toContain(`border-end-start-radius:${cssVars.radius.md}`);
        expect(primaryRules).toContain(`border-start-end-radius:${cssVars.radius.xs}`);
        expect(primaryRules).toContain(`border-end-end-radius:${cssVars.radius.xs}`);
        expect(triggerRules).toContain(`border-start-start-radius:${cssVars.radius.xs}`);
        expect(triggerRules).toContain(`border-end-start-radius:${cssVars.radius.xs}`);
        expect(triggerRules).toContain(`border-start-end-radius:${cssVars.radius.md}`);
        expect(triggerRules).toContain(`border-end-end-radius:${cssVars.radius.md}`);
        view.unmount();
      }
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
    expect(trigger).not.toHaveAttribute('aria-controls');

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    const menu = screen.getByRole('menu', { name: 'More options for Export report' });
    expect(trigger).toHaveAttribute('aria-controls', menu.id);
    await waitFor(() =>
      expect(screen.getByRole('menuitem', { name: 'Export as Excel' })).toHaveFocus(),
    );

    await user.keyboard(' ');
    expect(onSelect).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
    expect(trigger).not.toHaveAttribute('aria-controls');
  });

  it.each([
    ['Enter', '{Enter}'],
    ['Space', ' '],
    ['ArrowDown', '{ArrowDown}'],
  ])('opens with %s and focuses the first item', async (_keyName, key) => {
    const user = userEvent.setup();
    renderWithBiowave(
      <SplitButton onClick={vi.fn()} options={makeOptions()}>
        Export report
      </SplitButton>,
    );
    const trigger = screen.getByRole('button', { name: 'More options for Export report' });
    trigger.focus();

    await user.keyboard(key);

    await waitFor(() =>
      expect(screen.getByRole('menuitem', { name: 'Export as Excel' })).toHaveFocus(),
    );
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

  it.each([
    ['en', 'Export report', 'More options for Export report', '100px 0px'],
    ['ar', 'تصدير التقرير', 'خيارات أخرى لـتصدير التقرير', '0px 0px'],
  ] as const)(
    'uses the localized label and physical inline-end origin in %s',
    async (locale, children, label, transformOrigin) => {
      const user = userEvent.setup();
      renderWithBiowave(
        <SplitButton onClick={vi.fn()} options={makeOptions()}>
          {children}
        </SplitButton>,
        { locale },
      );
      const trigger = screen.getByRole('button', { name: label });
      const group = screen.getByRole('group', { name: children });
      const anchorRect = {
        bottom: 140,
        height: 40,
        left: 200,
        right: 400,
        top: 100,
        width: 200,
        x: 200,
        y: 100,
        toJSON: () => undefined,
      };
      const anchorRectSpy = vi.spyOn(group, 'getBoundingClientRect').mockReturnValue(anchorRect);
      const widthSpy = vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(100);
      const heightSpy = vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(80);

      try {
        await user.click(trigger);

        const menu = screen.getByRole('menu', { name: label });
        const paper = menu.closest('.MuiPaper-root') as HTMLElement;
        await waitFor(() => expect(paper.style.transformOrigin).toBe(transformOrigin));
      } finally {
        anchorRectSpy.mockRestore();
        widthSpy.mockRestore();
        heightSpy.mockRestore();
      }
    },
  );

  it('emits the specified open and close motion for the chevron and menu', async () => {
    const user = userEvent.setup();
    renderWithBiowave(
      <SplitButton onClick={vi.fn()} options={makeOptions()}>
        Export report
      </SplitButton>,
    );
    const group = screen.getByRole('group', { name: 'Export report' });
    const trigger = screen.getByRole('button', { name: 'More options for Export report' });
    expect(cssRulesFor(group)).toContain(cssVars.motion.duration.sm);
    expect(cssRulesFor(group)).toContain(cssVars.motion.easing['standard-accelerate']);

    await user.click(trigger);

    expect(cssRulesFor(group)).toContain(cssVars.motion.duration.md);
    expect(cssRulesFor(group)).toContain(cssVars.motion.easing['standard-decelerate']);
    const menu = screen.getByRole('menu');
    const paper = menu.closest('.MuiPaper-root') as HTMLElement;
    await waitFor(() =>
      expect(paper.style.transition).toContain(`${base.motion.duration.md}ms`),
    );
    expect(paper.style.transition).toContain(cssVars.motion.easing['standard-decelerate']);

    fireEvent.click(trigger);

    expect(cssRulesFor(group)).toContain(cssVars.motion.duration.sm);
    expect(cssRulesFor(group)).toContain(cssVars.motion.easing['standard-accelerate']);
    expect(paper.style.transition).toContain(`${base.motion.duration.sm}ms`);
    expect(paper.style.transition).toContain(cssVars.motion.easing['standard-accelerate']);
  });
});

describe('SplitButton states and validation', () => {
  it('runs the primary action independently and keeps focus there while loading', () => {
    const onClick = vi.fn();
    const view = renderWithBiowave(
      <SplitButton onClick={onClick} options={makeOptions()}>
        Export report
      </SplitButton>,
    );
    const primary = screen.getByRole('button', { name: 'Export report' });
    fireEvent.click(primary);
    expect(onClick).toHaveBeenCalledTimes(1);
    primary.focus();

    view.rerender(
      <SplitButton loading onClick={onClick} options={makeOptions()}>
        Export report
      </SplitButton>,
    );
    expect(primary).toHaveFocus();
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
    for (const locale of locales) {
      it(`has no axe violations when closed and open in ${theme}/${locale}`, async () => {
        const user = userEvent.setup();
        const children = locale === 'ar' ? 'تصدير التقرير' : 'Export report';
        const menuLabel =
          locale === 'ar' ? `خيارات أخرى لـ${children}` : `More options for ${children}`;
        const view = renderWithBiowave(
          <SplitButton onClick={vi.fn()} options={makeOptions()}>
            {children}
          </SplitButton>,
          { theme, locale },
        );
        expect(
          (await axe(view.container, { rules: { 'color-contrast': { enabled: false } } })).violations,
        ).toEqual([]);

        await user.click(screen.getByRole('button', { name: menuLabel }));
        const menu = screen.getByRole('menu', { name: menuLabel });
        expect(
          (await axe(menu, { rules: { 'color-contrast': { enabled: false } } })).violations,
        ).toEqual([]);
      });
    }
  }
});

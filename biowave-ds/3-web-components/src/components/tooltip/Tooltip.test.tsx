import * as React from 'react';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { base, biowaveVariants, cssVars } from '@biowave/foundations';
// @ts-expect-error The installed package's exports map omits its bundled declaration file.
import { computeAccessibleName } from 'dom-accessibility-api';
import { axe } from 'vitest-axe';
import { afterEach, describe, expect, it, vi } from 'vitest';
// @ts-expect-error Vite's raw loader supplies source text in tests.
import componentSource from './Tooltip.tsx?raw';
// @ts-expect-error Vite's raw loader supplies source text in tests.
import testSource from './Tooltip.test.tsx?raw';
// @ts-expect-error Vite's raw loader supplies source text in tests.
import tokenSource from './tooltip.tokens.ts?raw';
import { renderWithBiowave } from '../../test/render';
import { Tooltip, type TooltipPlacement } from './Tooltip';
import { tooltipTokens } from './tooltip.tokens';

const themes = ['light', 'dark'] as const;
const locales = ['en', 'ar'] as const;

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
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

function cssRulesFor(element: Element, cssText: string): string {
  const selectors = Array.from(element.classList).map((className) => `.${className}`);
  return cssText
    .split('\n')
    .filter((rule) => selectors.some((selector) => rule.includes(selector)))
    .join('\n');
}

function tooltipTransitionStyle(): string {
  const tooltip = screen.getByRole('tooltip');
  return [tooltip, ...Array.from(tooltip.querySelectorAll<HTMLElement>('[style]'))]
    .map((element) => element.getAttribute('style') ?? '')
    .join(' ');
}

function mockReducedMotion(matches: boolean): void {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)' && matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  );
}

function domRect(x: number, y: number, width: number, height: number): DOMRect {
  return {
    x,
    y,
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    toJSON: () => ({}),
  } as DOMRect;
}

function mockLayout(anchorY = 300): void {
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
    this: HTMLElement,
  ) {
    if (this === document.documentElement || this === document.body) {
      return domRect(0, 0, 1024, 768);
    }
    if (this.getAttribute('role') === 'tooltip' || this.classList.contains('bw-tooltip__container')) {
      return domRect(0, 0, 120, 40);
    }
    return domRect(400, anchorY, 40, 40);
  });
  vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockImplementation(function (
    this: HTMLElement,
  ) {
    return this.getAttribute('role') === 'tooltip' || this.classList.contains('bw-tooltip__container')
      ? 120
      : 40;
  });
  vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockImplementation(function (
    this: HTMLElement,
  ) {
    return this.getAttribute('role') === 'tooltip' || this.classList.contains('bw-tooltip__container')
      ? 40
      : 40;
  });
  vi.spyOn(document.documentElement, 'clientWidth', 'get').mockReturnValue(1024);
  vi.spyOn(document.documentElement, 'clientHeight', 'get').mockReturnValue(768);
}

describe('Tooltip validation and token contract', () => {
  it('warns once and applies both invalid-combination fallbacks', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const empty = renderWithBiowave(
      <Tooltip title="   ">
        <button type="button">Empty</button>
      </Tooltip>,
    );
    expect(screen.getByRole('button', { name: 'Empty' })).toBeInTheDocument();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    empty.unmount();

    renderWithBiowave(
      <Tooltip title="Tooltip name">
        <button type="button" aria-label="Existing name" />
      </Tooltip>,
    );
    const namedButton = screen.getByRole('button', { name: 'Existing name' });
    expect(computeAccessibleName(namedButton)).toBe('Existing name');
    expect(namedButton).not.toHaveAttribute('aria-label', 'Tooltip name');
    expect(warn).toHaveBeenCalledTimes(2);
    expect(warn.mock.calls.flat().join(' ')).toContain('Tooltip needs text');
    expect(warn.mock.calls.flat().join(' ')).toContain(
      'Tooltip purpose label on a named element — use description',
    );
  });

  it('maps every visual, spacing, layer, and motion value to the specified token', () => {
    expect(tooltipTokens).toEqual({
      background: cssVars.color.surface.inverse,
      color: cssVars.color.text.inverse,
      radius: cssVars.radius.sm,
      paddingBlock: cssVars.spacing.xs,
      paddingInline: cssVars.spacing.md,
      maxWidth: cssVars.size.container.xxs,
      offset: cssVars.spacing.xs,
      viewportPadding: base.spacing.md,
      zIndex: cssVars.layer.tooltip,
      hoverDelay: base.motion.duration['2xl'],
      leaveDelay: base.motion.duration.instant,
      enterDuration: base.motion.duration.md,
      exitDuration: base.motion.duration.sm,
      instantDuration: base.motion.duration.instant,
      enterEasing: cssVars.motion.easing['standard-decelerate'],
      exitEasing: cssVars.motion.easing['standard-accelerate'],
    });
    expect(componentSource).toContain('tooltipTokens.offset');
    expect(componentSource).not.toContain('base.spacing.xs');
  });

  it('contains no raw colors, dimensions, durations, or font names and no test timeouts', () => {
    const rawValue = /#[0-9a-f]{3,8}\b|\d+px|\d+ms|\bInter\b|\bIBM Plex\b/i;
    expect(componentSource).not.toMatch(rawValue);
    expect(tokenSource).not.toMatch(rawValue);
    const timeoutArgument = new RegExp(
      String.raw`(?:it|test)\([\s\S]*?\},\s*` + String.raw`[1-9][0-9]*\s*\)`,
    );
    expect(testSource).not.toMatch(timeoutArgument);
  });
});

describe('Tooltip rendering and motion', () => {
  for (const theme of themes) {
    for (const locale of locales) {
      it(`uses the complete visual token set in ${theme}/${locale}`, () => {
        const view = renderWithBiowave(
          <Tooltip title={locale === 'ar' ? 'تعديل الجهاز' : 'Edit device'} open>
            <button type="button" />
          </Tooltip>,
          { theme, locale },
        );
        const popper = screen.getByRole('tooltip');
        const container = popper.querySelector('.bw-tooltip__container');
        expect(container).not.toBeNull();
        const cssText = allCssRules();
        const containerRules = cssRulesFor(container as Element, cssText);
        const popperRules = cssRulesFor(popper, cssText);

        for (const token of [
          tooltipTokens.background,
          tooltipTokens.color,
          tooltipTokens.radius,
          tooltipTokens.paddingBlock,
          tooltipTokens.paddingInline,
          tooltipTokens.maxWidth,
          ...Object.values(biowaveVariants.labelSm),
        ]) {
          expect(containerRules).toContain(String(token));
        }
        expect(popperRules).toContain(tooltipTokens.zIndex);
        expect(containerRules).toContain('text-align: start');
        expect(containerRules).toContain('margin: 0');
        expect(document.documentElement.dir).toBe(locale === 'ar' ? 'rtl' : 'ltr');
        view.unmount();
      });
    }
  }

  for (const { placement, locale } of [
    { placement: 'top', locale: 'en' },
    { placement: 'end', locale: 'en' },
    { placement: 'end', locale: 'ar' },
  ] as const) {
    it(`keeps ${placement} open while the pointer crosses the gap step by step in ${locale}`, () => {
      vi.useFakeTimers();
      mockLayout();
      renderWithBiowave(
        <Tooltip title="Edit device" placement={placement}>
          <button type="button">Edit</button>
        </Tooltip>,
        { locale },
      );
      const button = screen.getByRole('button', { name: 'Edit device' });

      fireEvent.mouseOver(button);
      act(() => vi.advanceTimersByTime(tooltipTokens.hoverDelay));
      const tooltip = screen.getByRole('tooltip');
      const popper = tooltip.closest('.MuiTooltip-popper');
      expect(popper).not.toBeNull();

      fireEvent.mouseLeave(button);
      fireEvent.mouseOver(popper as Element);
      act(() => vi.advanceTimersToNextFrame());
      for (const step of [2, 3, 4]) {
        fireEvent.mouseMove(popper as Element, { clientX: step, clientY: step });
        act(() => vi.advanceTimersToNextFrame());
      }
      fireEvent.mouseOver(tooltip);
      act(() => vi.advanceTimersToNextFrame());
      act(() =>
        vi.advanceTimersByTime(tooltipTokens.exitDuration + tooltipTokens.hoverDelay),
      );

      expect(screen.getByRole('tooltip')).toBeInTheDocument();
      expect(tooltipTransitionStyle()).not.toContain(tooltipTokens.exitEasing);
    });
  }

  it('starts exiting when the pointer leaves the anchor without entering the popper', () => {
    vi.useFakeTimers();
    renderWithBiowave(
      <Tooltip title="Edit device">
        <button type="button">Edit</button>
      </Tooltip>,
    );
    const button = screen.getByRole('button', { name: 'Edit device' });
    fireEvent.mouseOver(button);
    act(() => vi.advanceTimersByTime(tooltipTokens.hoverDelay));

    fireEvent.mouseLeave(button);
    act(() => vi.advanceTimersToNextFrame());
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    expect(tooltipTransitionStyle()).toContain(tooltipTokens.exitEasing);
    act(() => vi.runAllTimers());
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('delays hover, opens keyboard focus at once, and closes on leave and blur', () => {
    vi.useFakeTimers();
    renderWithBiowave(
      <Tooltip title="Edit device">
        <button type="button">Edit</button>
      </Tooltip>,
    );
    const button = screen.getByRole('button', { name: 'Edit device' });

    fireEvent.mouseOver(button);
    act(() => vi.advanceTimersByTime(tooltipTokens.hoverDelay - 1));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1));
    expect(screen.getByRole('tooltip')).toHaveTextContent('Edit device');

    fireEvent.mouseLeave(button);
    act(() => vi.advanceTimersByTime(tooltipTokens.leaveDelay));
    act(() => vi.advanceTimersByTime(tooltipTokens.exitDuration));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    vi.spyOn(button, 'matches').mockImplementation((selector: string) => selector === ':focus-visible');
    fireEvent.focus(button);
    expect(screen.getByRole('tooltip')).toHaveTextContent('Edit device');
    fireEvent.blur(button);
    act(() => vi.advanceTimersByTime(tooltipTokens.exitDuration));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('does not open at once for pointer focus and closes on Escape without moving focus', () => {
    vi.useFakeTimers();
    renderWithBiowave(
      <Tooltip title="Edit device">
        <button type="button">Edit</button>
      </Tooltip>,
    );
    const button = screen.getByRole('button', { name: 'Edit device' });
    vi.spyOn(button, 'matches').mockReturnValue(false);
    fireEvent.mouseDown(button);
    fireEvent.focus(button);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    fireEvent.mouseOver(button);
    act(() => vi.advanceTimersByTime(tooltipTokens.hoverDelay));
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    button.focus();
    fireEvent.keyDown(document, { key: 'Escape' });
    act(() => vi.runAllTimers());
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(button).toHaveFocus();
  });

  it('uses the specified enter and exit timing and instant reduced-motion timing', () => {
    mockReducedMotion(false);
    vi.useFakeTimers();
    const normal = renderWithBiowave(
      <Tooltip title="Edit device">
        <button type="button">Edit</button>
      </Tooltip>,
    );
    const button = screen.getByRole('button', { name: 'Edit device' });
    vi.spyOn(button, 'matches').mockReturnValue(true);
    fireEvent.focus(button);
    expect(tooltipTransitionStyle()).toContain(tooltipTokens.enterEasing);
    expect(tooltipTransitionStyle()).toContain(`${tooltipTokens.enterDuration}ms`);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(tooltipTransitionStyle()).toContain(tooltipTokens.exitEasing);
    expect(tooltipTransitionStyle()).toContain(`${tooltipTokens.exitDuration}ms`);
    act(() => vi.runAllTimers());
    normal.unmount();

    mockReducedMotion(true);
    renderWithBiowave(
      <Tooltip title="Copy">
        <button type="button">Copy</button>
      </Tooltip>,
    );
    const reducedButton = screen.getByRole('button', { name: 'Copy' });
    vi.spyOn(reducedButton, 'matches').mockReturnValue(true);
    fireEvent.focus(reducedButton);
    expect(tooltipTransitionStyle()).toContain(`${tooltipTokens.instantDuration}ms`);
    fireEvent.keyDown(document, { key: 'Escape' });
    act(() => vi.runAllTimers());
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});

describe('Tooltip placement', () => {
  const expected = {
    en: { top: 'top', bottom: 'bottom', start: 'left', end: 'right' },
    ar: { top: 'top', bottom: 'bottom', start: 'right', end: 'left' },
  } as const;

  for (const locale of locales) {
    for (const placement of ['top', 'bottom', 'start', 'end'] as TooltipPlacement[]) {
      it(`maps ${placement} to ${expected[locale][placement]} in ${locale}`, async () => {
        mockLayout();
        const view = renderWithBiowave(
          <Tooltip title="Placement" placement={placement} open>
            <button type="button" />
          </Tooltip>,
          { locale },
        );
        await waitFor(() =>
          expect(screen.getByRole('tooltip')).toHaveAttribute(
            'data-popper-placement',
            expected[locale][placement],
          ),
        );
        view.unmount();
      });
    }
  }

  const facingMargin = {
    en: {
      top: 'margin-block-end',
      bottom: 'margin-block-start',
      left: 'margin-inline-end',
      right: 'margin-inline-start',
    },
    ar: {
      top: 'margin-block-end',
      bottom: 'margin-block-start',
      left: 'margin-inline-start',
      right: 'margin-inline-end',
    },
  } as const;

  for (const locale of locales) {
    for (const placement of ['top', 'bottom', 'start', 'end'] as TooltipPlacement[]) {
      const resolvedPlacement = expected[locale][placement];
      it(`keeps only the ${resolvedPlacement} anchor-facing margin in ${locale}`, async () => {
        mockLayout();
        renderWithBiowave(
          <Tooltip title="Placement" placement={placement} open>
            <button type="button" />
          </Tooltip>,
          { locale },
        );
        const tooltip = screen.getByRole('tooltip');
        await waitFor(() =>
          expect(tooltip).toHaveAttribute('data-popper-placement', resolvedPlacement),
        );
        const container = tooltip.querySelector('.bw-tooltip__container') as Element;
        const containerRules = cssRulesFor(container, allCssRules());
        const placementRule = containerRules
          .split('\n')
          .find((rule) =>
            rule.includes(`[data-popper-placement*="${resolvedPlacement}"]`) &&
            rule.includes(tooltipTokens.offset),
          );

        expect(placementRule).toMatch(/margin:\s*0(?:px)?/);
        expect(placementRule).toContain(
          `${facingMargin[locale][resolvedPlacement]}: ${tooltipTokens.offset}`,
        );
        expect(componentSource).not.toContain("name: 'offset'");
      });
    }
  }

  it('flips to the opposite side when the requested side has no room', async () => {
    mockLayout(0);
    renderWithBiowave(
      <Tooltip title="Placement" placement="top" open>
        <button type="button" />
      </Tooltip>,
    );
    await waitFor(() =>
      expect(screen.getByRole('tooltip')).toHaveAttribute('data-popper-placement', 'bottom'),
    );
  });
});

describe('Tooltip accessibility and controlled mode', () => {
  it('names label anchors exactly once and puts a disabled name on the element, not its wrapper', () => {
    const enabled = renderWithBiowave(
      <Tooltip title="Copy invite link" open>
        <button type="button" />
      </Tooltip>,
    );
    const enabledButton = screen.getByRole('button', { name: 'Copy invite link' });
    expect(computeAccessibleName(enabledButton)).toBe('Copy invite link');
    enabled.unmount();

    renderWithBiowave(
      <Tooltip title="Delete" open>
        <button type="button" disabled />
      </Tooltip>,
    );
    const disabledButton = screen.getByRole('button', { name: 'Delete' });
    expect(computeAccessibleName(disabledButton)).toBe('Delete');
    expect(disabledButton.closest('.bw-tooltip__anchor')).not.toHaveAttribute('aria-label');
  });

  it('keeps child handlers and description ids while resolving text closed and open', () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    const view = renderWithBiowave(
      <Tooltip title="We send shift reminders to this address." purpose="description">
        <button
          type="button"
          aria-describedby="existing-description"
          onFocus={onFocus}
          onBlur={onBlur}
        >
          Work email
        </button>
      </Tooltip>,
    );
    const button = screen.getByRole('button', { name: 'Work email' });
    expect(button).not.toHaveAttribute('title');
    const ids = button.getAttribute('aria-describedby')?.split(/\s+/) ?? [];
    expect(ids).toContain('existing-description');
    const tooltipId = ids.find((id) => id !== 'existing-description');
    expect(tooltipId).toBeDefined();
    expect(document.getElementById(tooltipId as string)).toHaveTextContent(
      'We send shift reminders to this address.',
    );

    vi.spyOn(button, 'matches').mockReturnValue(true);
    fireEvent.focus(button);
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('tooltip')).toHaveAttribute('id', tooltipId);
    expect(document.querySelectorAll(`#${CSS.escape(tooltipId as string)}`)).toHaveLength(1);
    fireEvent.blur(button);
    expect(onBlur).toHaveBeenCalledTimes(1);
    view.unmount();
  });

  it('keeps one description id through pointer-leave and Escape exit fades', () => {
    vi.useFakeTimers();
    renderWithBiowave(
      <Tooltip title="We send shift reminders to this address." purpose="description">
        <button type="button">Work email</button>
      </Tooltip>,
    );
    const button = screen.getByRole('button', { name: 'Work email' });
    const tooltipId = button.getAttribute('aria-describedby') as string;
    const idOwners = () => document.querySelectorAll(`#${CSS.escape(tooltipId)}`);
    expect(idOwners()).toHaveLength(1);

    fireEvent.mouseOver(button);
    act(() => vi.advanceTimersByTime(tooltipTokens.hoverDelay));
    expect(screen.getByRole('tooltip')).toHaveAttribute('id', tooltipId);
    expect(idOwners()).toHaveLength(1);
    fireEvent.mouseLeave(button);
    act(() => vi.advanceTimersByTime(tooltipTokens.exitDuration / 2));
    expect(screen.getByRole('tooltip')).toHaveAttribute('id', tooltipId);
    expect(idOwners()).toHaveLength(1);
    act(() => vi.runAllTimers());
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(idOwners()).toHaveLength(1);

    vi.spyOn(button, 'matches').mockImplementation((selector: string) => selector === ':focus-visible');
    fireEvent.focus(button);
    expect(screen.getByRole('tooltip')).toHaveAttribute('id', tooltipId);
    expect(idOwners()).toHaveLength(1);
    fireEvent.keyDown(document, { key: 'Escape' });
    act(() => vi.advanceTimersByTime(tooltipTokens.exitDuration / 2));
    expect(screen.getByRole('tooltip')).toHaveAttribute('id', tooltipId);
    expect(idOwners()).toHaveLength(1);
    act(() => vi.runAllTimers());
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(idOwners()).toHaveLength(1);
  });

  it('follows controlled open and forwards requests without internal timers overriding the prop', () => {
    vi.useFakeTimers();
    const onOpen = vi.fn();
    const onClose = vi.fn();
    const view = renderWithBiowave(
      <Tooltip title="Controlled" open={false} onOpen={onOpen} onClose={onClose}>
        <button type="button">Anchor</button>
      </Tooltip>,
    );
    const button = screen.getByRole('button', { name: 'Controlled' });
    fireEvent.mouseOver(button);
    act(() => vi.advanceTimersByTime(tooltipTokens.hoverDelay));
    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    view.rerender(
      <Tooltip title="Controlled" open onOpen={onOpen} onClose={onClose}>
        <button type="button">Anchor</button>
      </Tooltip>,
    );
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    fireEvent.mouseLeave(screen.getByRole('button', { name: 'Controlled' }));
    act(() => vi.runAllTimers());
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  for (const theme of themes) {
    for (const locale of locales) {
      it(`has no axe violations for label, description, and disabled anchors in ${theme}/${locale}`, async () => {
        const text = locale === 'ar' ? 'تعديل الجهاز' : 'Edit device';
        const description = locale === 'ar' ? 'يفتح إعدادات الجهاز.' : 'Opens device settings.';
        const { baseElement } = renderWithBiowave(
          <>
            <Tooltip title={text} open>
              <button type="button" />
            </Tooltip>
            <Tooltip title={description} purpose="description" open>
              <button type="button">{text}</button>
            </Tooltip>
            <Tooltip title={locale === 'ar' ? 'معطّل' : 'Disabled'} open>
              <button type="button" disabled />
            </Tooltip>
          </>,
          { theme, locale },
        );
        expect(
          (
            await axe(baseElement, {
              rules: {
                'color-contrast': { enabled: false },
                region: { enabled: false },
              },
            })
          ).violations,
        ).toEqual([]);
      });
    }
  }
});

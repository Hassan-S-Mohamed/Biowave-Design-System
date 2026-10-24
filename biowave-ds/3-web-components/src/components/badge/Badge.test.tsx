import * as React from 'react';
import { act, fireEvent, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, expect, it, vi } from 'vitest';
import { cssVars } from '@biowave/foundations';
// @ts-expect-error Vite's raw loader supplies source text in tests.
import badgeSource from './Badge.tsx?raw';
import { renderWithBiowave } from '../../test/render';
import {
  Badge,
  type BadgeColor,
  type BadgeProps,
  type BadgeVariant,
} from './Badge';

const themes = ['light', 'dark'] as const;
const locales = ['en', 'ar'] as const;

const colorsByVariant: Record<BadgeVariant, BadgeColor[]> = {
  count: ['error', 'brand', 'secondary', 'success', 'warning', 'info', 'neutral'],
  dot: ['error', 'brand', 'secondary', 'success', 'info', 'neutral'],
  check: ['brand', 'secondary', 'success', 'info', 'neutral'],
};

const colorTokens: Record<
  BadgeColor,
  { background: string; foreground: string; icon?: string }
> = {
  error: {
    background: cssVars.color.background.error.default,
    foreground: cssVars.color.text.on.error,
  },
  brand: {
    background: cssVars.color.background.brand.default,
    foreground: cssVars.color.text.on.brand,
    icon: cssVars.color.icon.on.brand,
  },
  secondary: {
    background: cssVars.color.background.secondary.default,
    foreground: cssVars.color.text.on.secondary,
    icon: cssVars.color.icon.on.secondary,
  },
  success: {
    background: cssVars.color.background.success.default,
    foreground: cssVars.color.text.on.success,
    icon: cssVars.color.icon.on.success,
  },
  warning: {
    background: cssVars.color.icon.role.warning,
    foreground: cssVars.color.text.on.warning,
  },
  info: {
    background: cssVars.color.background.info.default,
    foreground: cssVars.color.text.on.info,
    icon: cssVars.color.icon.on.info,
  },
  neutral: {
    background: cssVars.color.surface.inverse,
    foreground: cssVars.color.text.neutral.inverse,
    icon: cssVars.color.icon.neutral.inverse,
  },
};

function getIndicator(container: HTMLElement): HTMLElement {
  const indicator = container.querySelector<HTMLElement>('.bw-badge-indicator');
  if (!indicator) throw new Error('Badge indicator was not rendered');
  return indicator;
}

function getRoot(container: HTMLElement): HTMLElement {
  const root = container.querySelector<HTMLElement>('.bw-badge');
  if (!root) throw new Error('Badge root was not rendered');
  return root;
}

function renderBadge(
  props: BadgeProps,
  options?: { theme?: 'light' | 'dark'; locale?: 'en' | 'ar' },
) {
  return renderWithBiowave(<Badge {...props} />, options);
}

describe('Badge visual contract', () => {
  it('renders every allowed variant and color with token styles in every theme and language', () => {
    for (const theme of themes) {
      for (const locale of locales) {
        for (const variant of Object.keys(colorsByVariant) as BadgeVariant[]) {
          for (const color of colorsByVariant[variant]) {
            const view = renderBadge(
              {
                variant,
                color,
                count: variant === 'count' ? 7 : undefined,
                label: `${variant}-${color}`,
              },
              { theme, locale },
            );
            const indicator = getIndicator(view.container);
            const tokens = colorTokens[color];
            const expectedSize =
              variant === 'dot' ? cssVars.spacing.md : cssVars.size.icon.md;
            const expectedForeground =
              variant === 'check' ? tokens.icon ?? tokens.foreground : tokens.foreground;

            expect(indicator).toHaveAttribute('aria-hidden', 'true');
            expect(indicator).toHaveStyle({
              blockSize: expectedSize,
              minInlineSize: expectedSize,
              paddingInline: variant === 'count' ? cssVars.spacing.xs : 0,
              borderRadius: cssVars.radius.full,
              backgroundColor: tokens.background,
              color: expectedForeground,
              pointerEvents: 'none',
              zIndex: cssVars.layer.raised,
            });

            if (variant === 'count') {
              expect(indicator).toHaveClass('bw-text-data-sm');
              expect(indicator).toHaveStyle({
                fontVariantNumeric: 'tabular-nums',
                whiteSpace: 'nowrap',
              });
            } else {
              expect(indicator).not.toHaveClass('bw-text-data-sm');
            }

            if (variant === 'check') {
              const icon = indicator.querySelector<HTMLElement>('.bw-badge-check-icon');
              expect(icon).not.toBeNull();
              expect(icon).toHaveClass('bw-icon');
              expect(icon).toHaveTextContent('check');
              expect(indicator).toHaveStyle({ fontSize: cssVars.size.icon.sm });
            }

            expect(document.documentElement.dir).toBe(locale === 'ar' ? 'rtl' : 'ltr');
            view.unmount();
          }
        }
      }
    }
  });

  it('uses the warning graphic token for the count fill and no warning check-icon token', () => {
    const view = renderBadge({
      count: 7,
      color: 'warning',
      label: 'Seven pending requests',
    });
    const indicator = getIndicator(view.container);

    expect(indicator).toHaveStyle({
      backgroundColor: cssVars.color.icon.role.warning,
      color: cssVars.color.text.on.warning,
    });
    expect(indicator).not.toHaveStyle({
      backgroundColor: cssVars.color.background.warning.default,
    });
    expect(colorTokens.error.icon).toBeUndefined();
    expect(colorTokens.warning.icon).toBeUndefined();
  });

  it('uses count and max semantics and keeps the rendered count LTR', () => {
    const view = renderBadge({ count: 120, label: 'Unread messages' });
    let count = view.container.querySelector('bdi');
    expect(count).toHaveTextContent('99+');
    expect(count).toHaveAttribute('dir', 'ltr');

    view.rerender(<Badge count={12} max={9} label="Unread messages" />);
    count = view.container.querySelector('bdi');
    expect(count).toHaveTextContent('9+');

    view.rerender(<Badge count={0} label="No unread messages" />);
    expect(getIndicator(view.container)).toHaveClass('MuiBadge-invisible');

    view.rerender(<Badge count={0} showZero label="No unread messages" />);
    expect(getIndicator(view.container)).not.toHaveClass('MuiBadge-invisible');
    expect(view.container.querySelector('bdi')).toHaveTextContent('0');
  });

  it('draws a token ring only when anchored', () => {
    const anchored = renderWithBiowave(
      <Badge count={3} label="Three notifications">
        <button type="button">Notifications</button>
      </Badge>,
    );
    expect(getIndicator(anchored.container)).toHaveStyle({
      boxShadow: `0 0 0 ${cssVars.border.width.strong} ${cssVars.color.border.inverse}`,
      position: 'absolute',
    });
    anchored.unmount();

    const standalone = renderBadge({ count: 3, label: 'Three notifications' });
    expect(getIndicator(standalone.container)).toHaveStyle({
      boxShadow: 'none',
      position: 'static',
      transform: 'none',
    });
  });

  it('places rectangular and circular indicators at the logical top-end in LTR and RTL', () => {
    for (const locale of locales) {
      for (const overlap of ['rectangular', 'circular'] as const) {
        const view = renderWithBiowave(
          <>
            <button
              type="button"
              data-testid="plain-anchor"
              style={{ inlineSize: cssVars.target.min, blockSize: cssVars.target.min }}
            >
              Inbox
            </button>
            <Badge count={3} overlap={overlap} label="Three notifications">
              <button
                type="button"
                data-testid="badged-anchor"
                style={{ inlineSize: cssVars.target.min, blockSize: cssVars.target.min }}
              >
                Inbox
              </button>
            </Badge>
          </>,
          { locale },
        );
        const root = getRoot(view.container);
        const plainAnchor = screen.getByTestId('plain-anchor');
        const badgedAnchor = screen.getByTestId('badged-anchor');
        const indicator = getIndicator(view.container);
        const plainStyles = getComputedStyle(plainAnchor);
        const badgedStyles = getComputedStyle(badgedAnchor);
        const rootStyles = getComputedStyle(root);

        expect(root).toHaveStyle({
          position: 'relative',
          display: 'inline-flex',
          verticalAlign: 'middle',
          flex: 'none',
          isolation: 'isolate',
          '--badge-translate-inline': locale === 'ar' ? '-50%' : '50%',
          '--badge-translate-block': '-50%',
        });
        expect({
          inlineSize: badgedStyles.inlineSize,
          blockSize: badgedStyles.blockSize,
          boxSizing: badgedStyles.boxSizing,
          padding: badgedStyles.padding,
          border: badgedStyles.border,
        }).toEqual({
          inlineSize: plainStyles.inlineSize,
          blockSize: plainStyles.blockSize,
          boxSizing: plainStyles.boxSizing,
          padding: plainStyles.padding,
          border: plainStyles.border,
        });
        expect(Number.parseFloat(rootStyles.padding) || 0).toBe(0);
        expect(Number.parseFloat(rootStyles.borderWidth) || 0).toBe(0);
        expect(indicator).toHaveStyle({
          position: 'absolute',
          insetBlockStart: overlap === 'circular' ? '14.6%' : 0,
          insetInlineEnd: overlap === 'circular' ? '14.6%' : 0,
          transform:
            'translate(var(--badge-translate-inline), var(--badge-translate-block)) scale(1)',
        });
        expect(indicator.style.top).toBe('');
        expect(indicator.style.right).toBe('');
        expect(indicator.style.left).toBe('');
        view.unmount();
      }
    }
  });

  it('uses distinct token transitions and renders the first visible frame at its final transform', () => {
    const initiallyVisible = renderWithBiowave(
      <Badge count={1} label="One notification">
        <button type="button">Notifications</button>
      </Badge>,
    );
    const initialIndicator = getIndicator(initiallyVisible.container);
    expect(initialIndicator).not.toHaveClass('MuiBadge-invisible');
    expect(initialIndicator).toHaveStyle({
      transform:
        'translate(var(--badge-translate-inline), var(--badge-translate-block)) scale(1)',
    });
    initiallyVisible.unmount();

    const view = renderWithBiowave(
      <Badge count={0} label="Notifications">
        <button type="button">Notifications</button>
      </Badge>,
    );
    const indicator = getIndicator(view.container);

    expect(indicator).toHaveClass('MuiBadge-invisible');
    expect(indicator).toHaveStyle({
      transitionProperty: 'transform',
      transitionDuration: cssVars.motion.duration.sm,
      transitionTimingFunction: cssVars.motion.easing['standard-accelerate'],
    });

    view.rerender(
      <Badge count={1} label="One notification">
        <button type="button">Notifications</button>
      </Badge>,
    );
    expect(indicator).not.toHaveClass('MuiBadge-invisible');
    expect(indicator).toHaveStyle({
      transitionDuration: cssVars.motion.duration.md,
      transitionTimingFunction: cssVars.motion.easing['standard-decelerate'],
    });

    view.rerender(
      <Badge count={0} label="Notifications">
        <button type="button">Notifications</button>
      </Badge>,
    );
    expect(indicator).toHaveClass('MuiBadge-invisible');
    expect(indicator).toHaveStyle({
      transitionDuration: cssVars.motion.duration.sm,
      transitionTimingFunction: cssVars.motion.easing['standard-accelerate'],
    });

  });

  it('collapses a hidden standalone after its transform exit and restores it before entering', () => {
    const view = renderBadge({ count: 3, label: 'Three notifications' });
    let indicator = getIndicator(view.container);

    view.rerender(<Badge count={3} invisible label="Three notifications" />);
    indicator = getIndicator(view.container);
    expect(indicator).toHaveClass('MuiBadge-invisible');
    expect(indicator).not.toHaveClass('bw-badge-collapsed');
    expect(getComputedStyle(indicator).display).not.toBe('none');

    fireEvent.transitionEnd(indicator, { propertyName: 'opacity' });
    expect(getIndicator(view.container)).not.toHaveClass('bw-badge-collapsed');

    const count = indicator.querySelector('bdi');
    if (!count) throw new Error('Badge count was not rendered');
    fireEvent.transitionEnd(count, { propertyName: 'transform' });
    expect(getIndicator(view.container)).not.toHaveClass('bw-badge-collapsed');

    fireEvent.transitionEnd(indicator, { propertyName: 'transform' });
    indicator = getIndicator(view.container);
    expect(indicator).toHaveClass('bw-badge-collapsed');
    expect(indicator).toHaveStyle({ display: 'none' });

    let frame: FrameRequestCallback | undefined;
    const requestFrame = vi
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((callback) => {
        frame = callback;
        return 1;
      });
    const cancelFrame = vi
      .spyOn(window, 'cancelAnimationFrame')
      .mockImplementation(() => undefined);

    try {
      view.rerender(<Badge count={3} label="Three notifications" />);
      indicator = getIndicator(view.container);
      expect(indicator).not.toHaveClass('bw-badge-collapsed');
      expect(indicator).toHaveClass('MuiBadge-invisible');
      expect(getComputedStyle(indicator).display).not.toBe('none');
      expect(indicator).toHaveStyle({ transform: 'scale(0)' });

      act(() => frame?.(0));
      indicator = getIndicator(view.container);
      expect(indicator).not.toHaveClass('MuiBadge-invisible');
      expect(indicator).toHaveStyle({ transform: 'none' });
    } finally {
      requestFrame.mockRestore();
      cancelFrame.mockRestore();
    }
  });

  it.each([0, 16])(
    'collapses a standalone re-hidden after %d ms when no exit transition can run',
    (delay) => {
      let frame: FrameRequestCallback | undefined;
      const requestFrame = vi
        .spyOn(window, 'requestAnimationFrame')
        .mockImplementation((callback) => {
          frame = callback;
          return 1;
        });
      const cancelFrame = vi
        .spyOn(window, 'cancelAnimationFrame')
        .mockImplementation(() => undefined);
      const view = renderBadge({ count: 0, label: 'Notifications' });

      try {
        view.rerender(<Badge count={1} label="One notification" />);
        let indicator = getIndicator(view.container);
        expect(indicator).not.toHaveClass('bw-badge-collapsed');
        expect(indicator).toHaveStyle({ transform: 'scale(0)' });

        if (delay > 0) {
          act(() => frame?.(delay));
          indicator = getIndicator(view.container);
          Object.defineProperty(indicator, 'getAnimations', {
            configurable: true,
            value: vi.fn(() => []),
          });
        }

        view.rerender(<Badge count={0} label="Notifications" />);
        indicator = getIndicator(view.container);
        expect(indicator).toHaveClass('bw-badge-collapsed');
        expect(indicator).toHaveStyle({ display: 'none' });
      } finally {
        view.unmount();
        requestFrame.mockRestore();
        cancelFrame.mockRestore();
      }
    },
  );

  it('collapses a hidden standalone when its transform exit is canceled', () => {
    const view = renderBadge({ count: 3, label: 'Three notifications' });

    view.rerender(<Badge count={3} invisible label="Three notifications" />);
    let indicator = getIndicator(view.container);
    expect(indicator).not.toHaveClass('bw-badge-collapsed');

    fireEvent.transitionCancel(indicator, { propertyName: 'transform' });
    indicator = getIndicator(view.container);
    expect(indicator).toHaveClass('bw-badge-collapsed');
    expect(indicator).toHaveStyle({ display: 'none' });
  });

  it('collapses a standalone immediately on first hidden render and with reduced motion', () => {
    const initiallyHidden = renderBadge({ count: 0, label: 'Notifications' });
    expect(getIndicator(initiallyHidden.container)).toHaveStyle({ display: 'none' });
    initiallyHidden.unmount();

    vi.stubGlobal('matchMedia', (query: string): MediaQueryList => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(() => false),
    }));
    let reduced: ReturnType<typeof renderBadge> | undefined;
    try {
      reduced = renderBadge({ count: 3, label: 'Three notifications' });
      reduced.rerender(
        <Badge count={3} invisible label="Three notifications" />,
      );
      expect(getIndicator(reduced.container)).toHaveStyle({ display: 'none' });
    } finally {
      reduced?.unmount();
      vi.unstubAllGlobals();
    }
  });

  it('never collapses an anchored hidden badge', () => {
    const view = renderWithBiowave(
      <Badge count={3} invisible label="Three notifications">
        <button type="button">Notifications</button>
      </Badge>,
    );
    const indicator = getIndicator(view.container);

    fireEvent.transitionEnd(indicator, { propertyName: 'transform' });
    expect(indicator).not.toHaveClass('bw-badge-collapsed');
    expect(getComputedStyle(indicator).display).not.toBe('none');
  });

  it('keeps transition durations in motion tokens so reduced motion can make them instant', () => {
    expect(badgeSource).toContain('cssVars.motion.duration.md');
    expect(badgeSource).toContain('cssVars.motion.duration.sm');
    expect(badgeSource).toContain('cssVars.motion.duration.instant');
    expect(badgeSource).not.toMatch(/transitionDuration:\s*['"]?\d/);
  });
});

describe('Badge accessibility and behaviour', () => {
  it('appends and removes the description, declares pointer-events none, and preserves anchor onClick', () => {
    const onClick = vi.fn();
    const view = renderWithBiowave(
      <>
        <span id="existing-description">Existing description</span>
        <Badge count={3} label="Three unread messages">
          <button
            type="button"
            aria-describedby="existing-description"
            className="anchor-class"
            onClick={onClick}
          >
            Notifications
          </button>
        </Badge>
      </>,
    );
    const anchor = screen.getByRole('button', { name: 'Notifications' });
    const description = screen.getByText('Three unread messages');
    const describedBy = anchor.getAttribute('aria-describedby')?.split(' ') ?? [];

    expect(describedBy).toEqual(['existing-description', description.id]);
    expect(anchor).toHaveClass('anchor-class');
    fireEvent.click(anchor);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(getIndicator(view.container)).toHaveStyle({ pointerEvents: 'none' });

    view.rerender(
      <>
        <span id="existing-description">Existing description</span>
        <Badge count={3} invisible label="Three unread messages">
          <button
            type="button"
            aria-describedby="existing-description"
            className="anchor-class"
            onClick={onClick}
          >
            Notifications
          </button>
        </Badge>
      </>,
    );
    expect(anchor).toHaveAttribute('aria-describedby', 'existing-description');
    expect(screen.queryByText('Three unread messages')).not.toBeInTheDocument();
  });

  it('labels a visible standalone badge as an image and removes the name while hidden', () => {
    const view = renderBadge({
      count: 12,
      label: 'Twelve pending requests',
      className: 'consumer-class',
      'data-testid': 'standalone',
    });
    const root = screen.getByTestId('standalone');
    expect(root).toBe(getRoot(view.container));
    expect(root).toHaveClass('bw-badge', 'bw-badge-standalone', 'consumer-class');
    expect(root).toHaveAttribute('role', 'img');
    expect(root).toHaveAccessibleName('Twelve pending requests');
    expect(root).not.toHaveAttribute('tabindex');

    view.rerender(
      <Badge
        count={12}
        invisible
        label="Twelve pending requests"
        data-testid="standalone"
      />,
    );
    expect(root).not.toHaveAttribute('role');
    expect(root).not.toHaveAttribute('aria-label');
  });

  it('forwards the root ref', () => {
    const ref = React.createRef<HTMLSpanElement>();
    const view = renderWithBiowave(
      <Badge ref={ref} count={1} label="One notification" />,
    );
    expect(ref.current).toBe(getRoot(view.container));
  });

  it('has no axe violations in every theme and language', async () => {
    for (const theme of themes) {
      for (const locale of locales) {
        const view = renderWithBiowave(
          <div>
            <Badge count={3} label="Three unread messages">
              <button type="button">Notifications</button>
            </Badge>
            <span>
              Requests <Badge count={12} color="neutral" label="Twelve pending requests" />
            </span>
          </div>,
          { theme, locale },
        );
        expect((await axe(view.container)).violations).toEqual([]);
        view.unmount();
      }
    }
  });

  it('keeps the check icon non-directional in RTL', () => {
    const view = renderBadge(
      { variant: 'check', label: 'Verified' },
      { locale: 'ar' },
    );
    const icon = view.container.querySelector<HTMLElement>('.bw-badge-check-icon');
    expect(icon).not.toBeNull();
    expect(icon).toHaveTextContent('check');
    expect(icon).not.toHaveClass('bw-icon-directional');
    expect(icon).not.toHaveAttribute('data-directional');
  });
});

describe('Badge fallbacks and public API', () => {
  it('warns once for every invalid combination and renders each fallback', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    const missing = renderBadge({ variant: 'count', label: 'Count' });
    renderBadge({ variant: 'count', label: 'Count' });
    expect(getIndicator(missing.container)).toHaveClass('MuiBadge-invisible');

    const invalidCount = renderBadge({ count: -1.5, label: 'Count' });
    renderBadge({ count: -2, label: 'Count' });
    expect(getIndicator(invalidCount.container)).toHaveClass('MuiBadge-invisible');

    const invalidMax = renderBadge({ count: 3, max: 0, label: 'Count' });
    renderBadge({ count: 4, max: 0, label: 'Count' });
    expect(invalidMax.container.querySelector('bdi')).toHaveTextContent('1+');

    const ignoredCount = renderBadge({ variant: 'dot', count: 3, label: 'New' });
    renderBadge({ variant: 'check', count: 3, label: 'Verified' });
    expect(getIndicator(ignoredCount.container).querySelector('bdi')).toBeNull();

    const checkFallback = renderBadge({
      variant: 'check',
      color: 'error',
      label: 'Verified',
    });
    renderBadge({ variant: 'check', color: 'warning', label: 'Verified' });
    expect(getIndicator(checkFallback.container)).toHaveStyle({
      backgroundColor: cssVars.color.background.success.default,
      color: cssVars.color.icon.on.success,
    });

    const dotFallback = renderBadge({
      variant: 'dot',
      color: 'warning',
      label: 'New',
    });
    renderBadge({ variant: 'dot', color: 'warning', label: 'New' });
    expect(getIndicator(dotFallback.container)).toHaveStyle({
      backgroundColor: cssVars.color.background.error.default,
      color: cssVars.color.text.on.error,
    });

    renderBadge({ count: 1 });
    renderBadge({ count: 2 });

    const overlapFallback = renderBadge({
      count: 1,
      overlap: 'circular',
      label: 'One notification',
    });
    renderBadge({ count: 2, overlap: 'circular', label: 'Two notifications' });
    expect(getIndicator(overlapFallback.container)).toHaveClass(
      'MuiBadge-overlapRectangular',
    );
    expect(getIndicator(overlapFallback.container)).not.toHaveClass(
      'MuiBadge-overlapCircular',
    );

    const messages = warn.mock.calls.map(([message]) => message);
    expect(messages).toEqual(
      expect.arrayContaining([
        'Badge: `variant="count"` needs `count`; rendering hidden.',
        'Badge: `count` must be a non-negative integer; normalizing it.',
        'Badge: `max` must be at least 1; using 1.',
        'Badge: `count` is ignored for dot and check variants.',
        'Badge: check badges cannot use error or warning; using success.',
        'Badge: dot badges cannot use warning; using error.',
        'Badge: badges need a label',
        'Badge: `overlap` is ignored without `children`.',
      ]),
    );
    expect(warn).toHaveBeenCalledTimes(8);
    warn.mockRestore();
  });

  it('allows runtime color fallbacks but rejects unknown colors at the type level', () => {
    const runtimeFallback: React.ReactElement<BadgeProps> = (
      <Badge variant="check" color="error" label="Verified" />
    );
    expect(runtimeFallback.props.color).toBe('error');

    // @ts-expect-error Unknown badge colors must be a TypeScript error.
    const invalidColor = <Badge color="magenta" count={1} label="Invalid" />;
    expect(invalidColor).toBeDefined();
  });

  it('contains no raw colors, pixel dimensions, durations, font names, or legacy icons', () => {
    const rawValue = /#[0-9a-f]{3,8}\b|\d+px|\d+ms|\bInter\b|\bIBM Plex\b/i;
    expect(badgeSource).not.toMatch(rawValue);
    expect(badgeSource).not.toContain('@mui/icons-material');
    expect(badgeSource).toContain('<Icon className="bw-badge-check-icon" name="check" />');
  });
});

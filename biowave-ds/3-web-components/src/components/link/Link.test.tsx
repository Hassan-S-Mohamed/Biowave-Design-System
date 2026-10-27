import * as React from 'react';
import { act, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { describe, expect, it, vi } from 'vitest';
// @ts-expect-error Vite's raw loader supplies source text in tests.
import linkSource from './Link.tsx?raw';
// @ts-expect-error Vite's raw loader supplies source text in tests.
import tokenMapSource from './link.tokens.ts?raw';
import { renderWithBiowave } from '../../test/render';
import { Icon } from '../icon';
import { Link } from './Link';
import {
  linkColorTokens,
  linkFocusTokens,
  linkLayoutTokens,
  linkMotionTokens,
  linkSizeTokens,
  linkUnderlineTokens,
  type LinkColor,
  type LinkSize,
  type LinkUnderline,
} from './link.tokens';

const colors: LinkColor[] = ['brand', 'neutral', 'inverse'];
const sizes: LinkSize[] = ['inherit', 'sm', 'md', 'lg'];
const themes = ['light', 'dark'] as const;
const locales = ['en', 'ar'] as const;

function allowedUnderlines(color: LinkColor, size: LinkSize): LinkUnderline[] {
  return color === 'neutral' || size === 'inherit' ? ['always'] : ['always', 'hover'];
}

const renderCases = colors.flatMap((color) =>
  sizes.flatMap((size) =>
    allowedUnderlines(color, size).map((underline) => ({ color, size, underline })),
  ),
);

function allCssRules(): string {
  const rules: string[] = [];
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      for (const rule of Array.from(sheet.cssRules)) rules.push(rule.cssText);
    } catch {
      // Cross-origin stylesheets are not readable; the test environment has none.
    }
  }
  return rules.join('\n');
}

function generatedClass(element: Element): string {
  return Array.from(element.classList).find((name) => name.startsWith('bw-')) ?? '';
}

function cssRulesFor(element: Element, cssText = allCssRules()): string {
  const className = generatedClass(element);
  return cssText
    .split('\n')
    .filter((rule) => className && rule.includes(`.${className}`))
    .join('\n');
}

function rootCssRuleFor(element: Element, cssText = allCssRules()): string {
  const className = generatedClass(element);
  return cssText
    .split('\n')
    .find((rule) => className && rule.startsWith(`.${className} {`)) ?? '';
}

function descendantCssRuleFor(
  element: Element,
  selector: string,
  cssText = allCssRules(),
): string {
  const className = generatedClass(element);
  return cssText
    .split('\n')
    .find((rule) => className && rule.startsWith(`.${className} ${selector} {`)) ?? '';
}

describe('Link token contract', () => {
  it('maps every visual, layout, focus, underline, size, and motion value to cssVars', () => {
    expect(linkColorTokens).toEqual({
      brand: {
        default: 'var(--bw-color-link-default)',
        hover: 'var(--bw-color-link-hovered)',
        pressed: 'var(--bw-color-link-pressed)',
        visited: 'var(--bw-color-link-visited)',
        disabled: 'var(--bw-color-text-disabled)',
      },
      neutral: {
        default: 'var(--bw-color-text-default)',
        hover: 'var(--bw-color-text-default)',
        pressed: 'var(--bw-color-text-default)',
        disabled: 'var(--bw-color-text-disabled)',
      },
      inverse: {
        default: 'var(--bw-color-text-inverse)',
        hover: 'var(--bw-color-text-inverse)',
        pressed: 'var(--bw-color-text-inverse)',
        disabled: 'var(--bw-color-text-disabled)',
      },
    });
    expect(linkLayoutTokens).toEqual({
      gap: 'var(--bw-spacing-xs)',
      targetMin: 'var(--bw-target-min)',
      radius: 'var(--bw-radius-xs)',
    });
    expect(linkUnderlineTokens).toEqual({
      defaultWidth: 'var(--bw-border-width-default)',
      strongWidth: 'var(--bw-border-width-strong)',
      offset: 'var(--bw-spacing-xxs)',
    });
    expect(linkFocusTokens).toEqual({
      default: 'var(--bw-color-border-focus)',
      inverse: 'var(--bw-color-border-inverse)',
      width: 'var(--bw-border-width-focus)',
      offset: 'var(--bw-border-focus-offset)',
    });
    expect(linkMotionTokens).toEqual({
      defaultDuration: 'var(--bw-motion-duration-sm)',
      pressedDuration: 'var(--bw-motion-duration-xs)',
      instantDuration: 'var(--bw-motion-duration-instant)',
      easing: 'var(--bw-motion-easing-standard)',
    });
    expect(linkSizeTokens.inherit).toEqual({ typography: { font: 'inherit' }, icon: '1em' });
    expect(linkSizeTokens.sm.icon).toBe('var(--bw-size-icon-sm)');
    expect(linkSizeTokens.md.icon).toBe('var(--bw-size-icon-sm)');
    expect(linkSizeTokens.lg.icon).toBe('var(--bw-size-icon-md)');
  });

  it('contains no raw colors, dimensions, durations, or font names', () => {
    const rawValue = /#[0-9a-f]{3,8}\b|\d+px|\d+ms|\bInter\b|\bIBM Plex\b/i;
    expect(linkSource).not.toMatch(rawValue);
    expect(tokenMapSource).not.toMatch(rawValue);
    expect(linkSource).not.toContain('@mui/icons-material');
  });
});

describe('Link rendered variants', () => {
  for (const theme of themes) {
    for (const locale of locales) {
      it(`renders every allowed color × size × underline with token rules in ${theme}/${locale}`, () => {
        const view = renderWithBiowave(
          <>
            {renderCases.map(({ color, size, underline }) => {
              const id = `${color}-${size}-${underline}`;
              return (
                <Link
                  key={id}
                  href={`/${id}`}
                  color={color}
                  size={size}
                  underline={underline}
                  external
                  startIcon={size === 'inherit' ? undefined : <Icon name="mail" />}
                  data-testid={id}
                >
                  {id}
                </Link>
              );
            })}
          </>,
          { theme, locale },
        );
        const cssText = allCssRules();

        for (const { color, size, underline } of renderCases) {
          const id = `${color}-${size}-${underline}`;
          const link = screen.getByTestId(id);
          const rules = cssRulesFor(link, cssText);
          const rootRule = rootCssRuleFor(link, cssText);
          const labelRule = descendantCssRuleFor(link, '.bw-link__label', cssText);
          const iconRule = descendantCssRuleFor(link, '.bw-link__icon', cssText);
          const visual = linkColorTokens[color];

          expect(rules).toContain(visual.default);
          expect(rules).toContain(visual.hover);
          expect(rules).toContain(visual.pressed);
          expect(rules).toContain(visual.disabled);
          expect(rootRule).toContain(size === 'inherit' ? 'display: inline' : 'display: inline-flex');
          expect(rootRule).toContain('text-decoration: none');
          expect(labelRule).toContain(
            `text-decoration-line: ${underline === 'always' ? 'underline' : 'none'}`,
          );
          expect(labelRule).toContain(linkUnderlineTokens.defaultWidth);
          expect(labelRule).toContain(linkUnderlineTokens.offset);
          expect(iconRule).toContain(linkSizeTokens[size].icon);

          if (size === 'inherit') {
            expect(rootRule).toContain('font: inherit');
            expect(rootRule).not.toContain('min-block-size');
          } else {
            expect(rootRule).toContain(linkLayoutTokens.targetMin);
            expect(rootRule).toContain(linkLayoutTokens.gap);
            for (const value of Object.values(linkSizeTokens[size].typography)) {
              if (typeof value === 'string') expect(rootRule).toContain(value);
            }
          }
        }

        expect(document.documentElement.dir).toBe(locale === 'ar' ? 'rtl' : 'ltr');
        view.unmount();
      });
    }
  }
});

describe('Link states and underline', () => {
  it('uses the specified hover, pressed, focus, disabled, visited, and motion rules', () => {
    const view = renderWithBiowave(
      <Link href="/states" size="md" underline="hover" showVisited>
        States
      </Link>,
    );
    const link = screen.getByRole('link', { name: 'States' });
    const rules = cssRulesFor(link);
    const ruleList = rules.split('\n');

    expect(ruleList.find((rule) => rule.includes(':hover') && !rule.includes('__label'))).toContain(
      linkColorTokens.brand.hover,
    );
    const activeRoot = ruleList.find(
      (rule) => rule.includes(':active') && !rule.includes('__label'),
    );
    expect(activeRoot).toContain(linkColorTokens.brand.pressed);
    expect(activeRoot).toContain(linkMotionTokens.pressedDuration);
    const focusRoot = ruleList.find(
      (rule) => rule.includes(':focus-visible') && !rule.includes('__label'),
    );
    expect(focusRoot).toContain(linkFocusTokens.width);
    expect(focusRoot).toContain(linkFocusTokens.default);
    expect(focusRoot).toContain(linkFocusTokens.offset);
    const disabledRoot = ruleList.find(
      (rule) =>
        rule.startsWith(`.${generatedClass(link)}[aria-disabled="true"]`) &&
        !rule.includes('__label'),
    );
    expect(disabledRoot).toContain(linkColorTokens.brand.disabled);
    expect(disabledRoot).toContain(linkMotionTokens.instantDuration);
    const visited = ruleList.find((rule) => rule.includes(':visited'));
    expect(visited).toContain(linkColorTokens.brand.visited);
    expect(rules).toContain(linkMotionTokens.defaultDuration);
    expect(rules).toContain(linkMotionTokens.easing);
    view.unmount();

    const neutral = renderWithBiowave(
      <Link href="/neutral" color="neutral" size="md">
        Neutral
      </Link>,
    );
    expect(cssRulesFor(screen.getByRole('link', { name: 'Neutral' }))).not.toContain(':visited');
    neutral.unmount();

    const inverse = renderWithBiowave(
      <Link href="/inverse" color="inverse" size="md">
        Inverse
      </Link>,
    );
    const inverseFocus = cssRulesFor(screen.getByRole('link', { name: 'Inverse' }))
      .split('\n')
      .find((rule) => rule.includes(':focus-visible') && !rule.includes('__label'));
    expect(inverseFocus).toContain(linkFocusTokens.inverse);
    inverse.unmount();
  });

  it('draws underline only on the label with the required rest, hover, active, and focus widths', () => {
    const view = renderWithBiowave(
      <>
        <Link href="/always" size="md" external startIcon={<Icon name="mail" />}>
          Always
        </Link>
        <Link href="/hover" size="md" underline="hover">
          Hover
        </Link>
      </>,
    );
    const always = screen.getByRole('link', { name: /Always/ });
    const alwaysRules = cssRulesFor(always).split('\n');
    const alwaysBase = descendantCssRuleFor(always, '.bw-link__label');
    expect(alwaysBase).toContain('text-decoration-line: underline');
    expect(alwaysBase).toContain(linkUnderlineTokens.defaultWidth);
    expect(alwaysBase).toContain(linkUnderlineTokens.offset);
    expect(
      alwaysRules.find((rule) => rule.includes(':hover') && rule.includes('__label')),
    ).toContain(linkUnderlineTokens.strongWidth);
    expect(
      alwaysRules.find((rule) => rule.includes(':active') && rule.includes('__label')),
    ).toContain(linkUnderlineTokens.strongWidth);
    expect(rootCssRuleFor(always)).toContain('text-decoration: none');
    expect(descendantCssRuleFor(always, '.bw-link__icon')).not.toContain('text-decoration');

    const hover = screen.getByRole('link', { name: 'Hover' });
    const hoverRules = cssRulesFor(hover).split('\n');
    expect(descendantCssRuleFor(hover, '.bw-link__label')).toContain(
      'text-decoration-line: none',
    );
    expect(
      hoverRules.find((rule) => rule.includes(':hover') && rule.includes('__label')),
    ).toContain(linkUnderlineTokens.defaultWidth);
    expect(
      hoverRules.find((rule) => rule.includes(':focus-visible') && rule.includes('__label')),
    ).toContain(linkUnderlineTokens.defaultWidth);
    view.unmount();
  });

  it('changes instantly in both directions between enabled and disabled', async () => {
    const view = renderWithBiowave(
      <Link href="/toggle" size="md">
        Toggle
      </Link>,
    );

    view.rerender(
      <Link href="/toggle" size="md" disabled>
        Toggle
      </Link>,
    );
    expect(rootCssRuleFor(screen.getByRole('link', { name: 'Toggle' }))).toContain(
      `transition-duration: ${linkMotionTokens.instantDuration}`,
    );

    view.rerender(
      <Link href="/toggle" size="md">
        Toggle
      </Link>,
    );
    expect(rootCssRuleFor(screen.getByRole('link', { name: 'Toggle' }))).toContain(
      `transition-duration: ${linkMotionTokens.instantDuration}`,
    );

    await act(
      () => new Promise<void>((resolve) => window.requestAnimationFrame(() => resolve())),
    );
    const restored = rootCssRuleFor(screen.getByRole('link', { name: 'Toggle' }));
    expect(restored).not.toContain(`transition-duration: ${linkMotionTokens.instantDuration}`);
    expect(restored).toContain(linkMotionTokens.defaultDuration);
    view.unmount();
  });
});

describe('Link behavior and accessibility', () => {
  it('renders safe external links with localized and overridden accessible suffixes', () => {
    const english = renderWithBiowave(
      <Link href="https://example.com" size="md" external>
        Contact support
      </Link>,
      { locale: 'en' },
    );
    const enLink = screen.getByRole('link', {
      name: 'Contact support (opens in a new tab)',
    });
    expect(enLink).toHaveAttribute('target', '_blank');
    expect(enLink).toHaveAttribute('rel', 'noopener noreferrer');
    const enIcon = enLink.querySelector('.bw-link__external-icon .bw-icon');
    expect(enIcon).toHaveTextContent('open_in_new');
    expect(enIcon).toHaveClass('bw-icon-directional');
    expect(enIcon).toHaveAttribute('aria-hidden', 'true');
    english.unmount();

    const arabic = renderWithBiowave(
      <Link href="https://example.com" size="md" external>
        التواصل مع الدعم
      </Link>,
      { locale: 'ar' },
    );
    expect(
      screen.getByRole('link', { name: 'التواصل مع الدعم (يفتح في علامة تبويب جديدة)' }),
    ).toBeInTheDocument();
    arabic.unmount();

    const override = renderWithBiowave(
      <Link href="https://example.com" size="md" external externalLabel="New window">
        Help
      </Link>,
    );
    expect(screen.getByRole('link', { name: 'Help New window' })).toBeInTheDocument();
    override.unmount();

    const consumerLabel = renderWithBiowave(
      <Link href="https://example.com" size="md" external aria-label="Support portal">
        Contact support
      </Link>,
    );
    expect(screen.getByRole('link', { name: 'Support portal' })).toHaveAttribute(
      'aria-label',
      'Support portal',
    );
    consumerLabel.unmount();
  });

  it('removes disabled navigation and activation from the tab order', async () => {
    const onClick = vi.fn();
    renderWithBiowave(
      <>
        <Link href="/disabled" size="md" disabled onClick={onClick}>
          Disabled
        </Link>
        <Link href="/enabled" size="md">
          Enabled
        </Link>
      </>,
    );
    const disabled = screen.getByRole('link', { name: 'Disabled' });
    expect(disabled).not.toHaveAttribute('href');
    expect(disabled).toHaveAttribute('role', 'link');
    expect(disabled).toHaveAttribute('aria-disabled', 'true');
    expect(disabled).not.toHaveAttribute('tabindex');
    expect(fireEvent.click(disabled)).toBe(false);
    expect(onClick).not.toHaveBeenCalled();

    await userEvent.tab();
    expect(screen.getByRole('link', { name: 'Enabled' })).toHaveFocus();
  });

  it('renders an app-router component, forwards to, href, ref, and Link classes', () => {
    interface RouterLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
      to: string;
      href?: string;
    }
    const RouterLink = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(function RouterLink(
      { to, href, ...props },
      ref,
    ) {
      return <a {...props} ref={ref} href={href ?? to} data-to={to} />;
    });
    const ref = React.createRef<HTMLAnchorElement>();

    renderWithBiowave(
      <Link component={RouterLink} to="/reset" href="/reset" size="md" ref={ref}>
        Reset password
      </Link>,
    );
    const link = screen.getByRole('link', { name: 'Reset password' });
    expect(link).toHaveAttribute('href', '/reset');
    expect(link).toHaveAttribute('data-to', '/reset');
    expect(link).toHaveClass('MuiLink-root');
    expect(generatedClass(link)).not.toBe('');
    expect(ref.current).toBe(link);
  });

  it('lets Enter activate native link navigation while Space does not', async () => {
    window.history.replaceState(null, '', '/');
    renderWithBiowave(<Link href="#privacy">Privacy policy</Link>);
    const link = screen.getByRole('link', { name: 'Privacy policy' });

    await userEvent.tab();
    expect(link).toHaveFocus();
    await userEvent.keyboard(' ');
    expect(window.location.hash).toBe('');
    await userEvent.keyboard('{Enter}');
    expect(window.location.hash).toBe('#privacy');
  });

  it('mirrors only the external Icon in RTL and leaves a mail leading icon unchanged', () => {
    renderWithBiowave(
      <Link href="/rtl" size="md" external startIcon={<Icon name="mail" />}>
        التواصل
      </Link>,
      { locale: 'ar' },
    );
    const link = screen.getByRole('link', { name: /التواصل/ });
    const directional = link.querySelectorAll('.bw-icon-directional');
    expect(directional).toHaveLength(1);
    expect(directional[0]).toHaveTextContent('open_in_new');
    expect(link.querySelector('.bw-link__external-icon')).not.toHaveClass('bw-icon-directional');
    expect(link.querySelector('.bw-link__leading-icon .bw-icon')).not.toHaveClass(
      'bw-icon-directional',
    );
    const flipRules = cssRulesFor(directional[0])
      .split('\n')
      .filter((rule) => rule.includes('scaleX(-1)'));
    expect(flipRules.length).toBeGreaterThan(0);
    for (const rule of flipRules) expect(rule.split('{')[0]).toMatch(/\[dir=['"]?rtl['"]?\]/);
  });

  it('has no axe violations for every color in both themes', async () => {
    for (const theme of themes) {
      for (const color of colors) {
        const view = renderWithBiowave(
          <Link href={`/${theme}-${color}`} color={color} size="md">
            {`${theme} ${color}`}
          </Link>,
          { theme },
        );
        expect((await axe(view.container)).violations).toEqual([]);
        view.unmount();
      }
    }
  });
});

describe('Link validation fallbacks', () => {
  it('warns once for each invalid combination and renders the documented fallback', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    const neutral = renderWithBiowave(
      <Link href="/neutral" color="neutral" size="md" underline="hover">
        Neutral
      </Link>,
    );
    neutral.rerender(
      <Link href="/neutral" color="neutral" size="md" underline="hover">
        Neutral
      </Link>,
    );
    expect(warn).toHaveBeenCalledWith(
      'Link: color="neutral" does not support underline="hover"; falling back to underline="always".',
    );
    expect(warn).toHaveBeenCalledTimes(1);
    expect(descendantCssRuleFor(screen.getByRole('link'), '.bw-link__label')).toContain(
      'text-decoration-line: underline',
    );
    neutral.unmount();

    const inherit = renderWithBiowave(
      <Link href="/inherit" underline="hover">
        Inherit
      </Link>,
    );
    inherit.rerender(
      <Link href="/inherit" underline="hover">
        Inherit
      </Link>,
    );
    expect(warn).toHaveBeenCalledWith(
      'Link: size="inherit" does not support underline="hover"; falling back to underline="always".',
    );
    expect(warn).toHaveBeenCalledTimes(2);
    inherit.unmount();

    const startIcon = renderWithBiowave(
      <Link href="/icon" startIcon={<Icon name="mail" />}>
        Icon
      </Link>,
    );
    startIcon.rerender(
      <Link href="/icon" startIcon={<Icon name="mail" />}>
        Icon
      </Link>,
    );
    expect(warn).toHaveBeenCalledWith(
      'Link: size="inherit" does not support startIcon; the icon will not be rendered.',
    );
    expect(screen.getByRole('link')).not.toContainElement(
      screen.queryByText('mail'),
    );
    expect(warn).toHaveBeenCalledTimes(3);
    startIcon.unmount();

    const visited = renderWithBiowave(
      <Link href="/visited" color="inverse" size="md" showVisited>
        Visited
      </Link>,
    );
    visited.rerender(
      <Link href="/visited" color="inverse" size="md" showVisited>
        Visited
      </Link>,
    );
    expect(warn).toHaveBeenCalledWith(
      'Link: showVisited does not support color="inverse"; showVisited will be ignored.',
    );
    expect(cssRulesFor(screen.getByRole('link'))).not.toContain(':visited');
    expect(warn).toHaveBeenCalledTimes(4);
    visited.unmount();

    const empty = renderWithBiowave(<Link href="/empty">{''}</Link>);
    empty.rerender(<Link href="/empty">{''}</Link>);
    expect(warn).toHaveBeenCalledWith('Link needs a text label');
    expect(warn).toHaveBeenCalledTimes(5);
    empty.unmount();

    const nonString = renderWithBiowave(
      <Link href="/number">{42 as unknown as string}</Link>,
    );
    expect(nonString.container.querySelector('a')).toHaveTextContent('42');
    expect(warn).toHaveBeenLastCalledWith('Link needs a text label');
    expect(warn).toHaveBeenCalledTimes(6);
    nonString.unmount();

    const missingHref = renderWithBiowave(<Link>Missing href</Link>);
    missingHref.rerender(<Link>Missing href</Link>);
    const fallback = screen.getByRole('link', { name: 'Missing href' });
    expect(warn).toHaveBeenCalledWith('Link needs an href');
    expect(warn).toHaveBeenCalledTimes(7);
    expect(fallback).not.toHaveAttribute('href');
    expect(fallback).toHaveAttribute('aria-disabled', 'true');
    expect(fallback).not.toHaveAttribute('tabindex');

    warn.mockRestore();
  });
});

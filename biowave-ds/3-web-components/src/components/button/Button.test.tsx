import * as React from 'react';
import { act, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// @ts-expect-error The installed package's exports map omits its bundled declaration file.
import { computeAccessibleName } from 'dom-accessibility-api';
import { axe } from 'vitest-axe';
import { describe, expect, it, vi } from 'vitest';
import componentTokenSource from '../../../components/button/button.tokens.json';
// @ts-expect-error Vite's raw loader supplies source text in tests.
import buttonSource from './Button.tsx?raw';
// @ts-expect-error Vite's raw loader supplies source text in tests.
import spinnerSource from './ButtonSpinner.tsx?raw';
// @ts-expect-error Vite's raw loader supplies source text in tests.
import tokenMapSource from './button.tokens.ts?raw';
import { renderWithBiowave } from '../../test/render';
import { Button, type ButtonDirectionalIconProps } from './Button';
import {
  buttonFocusTokens,
  buttonMotionTokens,
  buttonSizeTokens,
  buttonTokens,
  resolveButtonTokens,
  type ButtonColor,
  type ButtonSize,
  type ButtonVariant,
  type ButtonVisualTokens,
} from './button.tokens';
import { Icon } from '../icon';
const sizes: ButtonSize[] = ['sm', 'md', 'lg'];
const themes = ['light', 'dark'] as const;
const locales = ['en', 'ar'] as const;
const allowedColors: Record<ButtonVariant, ButtonColor[]> = {
  filled: ['brand', 'secondary', 'neutral', 'error', 'inverse'],
  tonal: ['brand', 'secondary', 'error'],
  outlined: ['brand', 'secondary', 'neutral', 'error', 'inverse'],
  text: ['brand', 'secondary', 'neutral', 'error', 'inverse'],
};
const variantColorCases = (Object.keys(allowedColors) as ButtonVariant[]).flatMap((variant) =>
  allowedColors[variant].map((color) => ({ variant, color })),
);

interface TokenLeaf {
  $value: string;
}

interface SourceVisualTokens {
  container: {
    default: TokenLeaf;
    hovered?: TokenLeaf;
    pressed?: TokenLeaf;
    disabled: TokenLeaf;
  };
  'state-layer'?: { hovered: TokenLeaf; pressed: TokenLeaf };
  border?: { default: TokenLeaf; disabled: TokenLeaf };
  label: { default: TokenLeaf; disabled: TokenLeaf };
  icon: { default: TokenLeaf; disabled: TokenLeaf };
}

interface SourceSizeTokens {
  height: TokenLeaf;
  'padding-inline': TokenLeaf;
  gap: TokenLeaf;
  icon: TokenLeaf;
  radius: TokenLeaf;
  'border-width': TokenLeaf;
}

const source = componentTokenSource.button as unknown as {
  size: Record<ButtonSize, SourceSizeTokens>;
  filled: Record<ButtonColor, SourceVisualTokens>;
  tonal: Record<Exclude<ButtonColor, 'neutral' | 'inverse'>, SourceVisualTokens>;
  outlined: Record<ButtonColor, SourceVisualTokens>;
  text: Record<ButtonColor, SourceVisualTokens>;
  'focus-ring': { default: { color: TokenLeaf }; inverse: { color: TokenLeaf } };
};

function cssVariable({ $value }: TokenLeaf): string {
  return `var(--bw-${$value.slice(1, -1).replaceAll('.', '-')})`;
}

function expectedVisualTokens(tokens: SourceVisualTokens): ButtonVisualTokens {
  return {
    bg: cssVariable(tokens.container.default),
    ...(tokens.container.hovered ? { bgHovered: cssVariable(tokens.container.hovered) } : {}),
    ...(tokens.container.pressed ? { bgPressed: cssVariable(tokens.container.pressed) } : {}),
    bgDisabled: cssVariable(tokens.container.disabled),
    ...(tokens['state-layer']
      ? {
          stateLayer: {
            hovered: cssVariable(tokens['state-layer'].hovered),
            pressed: cssVariable(tokens['state-layer'].pressed),
          },
        }
      : {}),
    ...(tokens.border
      ? {
          border: {
            default: cssVariable(tokens.border.default),
            disabled: cssVariable(tokens.border.disabled),
          },
        }
      : {}),
    label: {
      default: cssVariable(tokens.label.default),
      disabled: cssVariable(tokens.label.disabled),
    },
    icon: {
      default: cssVariable(tokens.icon.default),
      disabled: cssVariable(tokens.icon.disabled),
    },
  };
}

function allCssRules(): string {
  const rules: string[] = [];
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      for (const rule of Array.from(sheet.cssRules)) rules.push(rule.cssText);
    } catch {
      // Cross-origin sheets are not readable; the test environment has none.
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

function rootCssRuleFor(element: Element, cssText = allCssRules()): string {
  const className = Array.from(element.classList).find((name) => name.startsWith('bw-'));
  if (!className) return '';
  return cssText
    .split('\n')
    .find((rule) => rule.startsWith(`.${className} {`)) ?? '';
}

describe('Button token contract', () => {
  it('matches every component token alias in tokens.json', () => {
    for (const size of sizes) {
      const expected = source.size[size];
      expect(buttonSizeTokens[size]).toEqual({
        height: cssVariable(expected.height),
        paddingInline: cssVariable(expected['padding-inline']),
        gap: cssVariable(expected.gap),
        icon: cssVariable(expected.icon),
        radius: cssVariable(expected.radius),
        borderWidth: cssVariable(expected['border-width']),
      });
    }

    for (const variant of Object.keys(allowedColors) as ButtonVariant[]) {
      for (const color of allowedColors[variant]) {
        const sourceByColor = source[variant] as Record<string, SourceVisualTokens>;
        const actualByColor = buttonTokens[variant] as Record<string, ButtonVisualTokens>;
        expect(actualByColor[color]).toEqual(expectedVisualTokens(sourceByColor[color]));
      }
    }

    expect(buttonFocusTokens.default).toBe(cssVariable(source['focus-ring'].default.color));
    expect(buttonFocusTokens.inverse).toBe(cssVariable(source['focus-ring'].inverse.color));
  });

  it('contains no raw colors, dimensions, durations, or font names', () => {
    const rawValue = /#[0-9a-f]{3,8}\b|\d+px|\d+ms|\bInter\b|\bIBM Plex\b/i;
    expect(buttonSource).not.toMatch(rawValue);
    expect(tokenMapSource).not.toMatch(rawValue);
    expect(spinnerSource).not.toMatch(rawValue);
  });
});

describe('Button rendering', () => {
  it('renders every allowed variant, color, and size in every theme and locale', () => {
    for (const theme of themes) {
      for (const locale of locales) {
        const combinations = (Object.keys(allowedColors) as ButtonVariant[]).flatMap((variant) =>
          allowedColors[variant].flatMap((color) =>
            sizes.map((size) => ({ variant, color, size, label: `${variant}-${color}-${size}` })),
          ),
        );
        const view = renderWithBiowave(
          <>
            {combinations.map(({ variant, color, size, label }) => (
              <Button key={label} variant={variant} color={color} size={size}>
                {label}
              </Button>
            ))}
          </>,
          { theme, locale },
        );

        expect(document.documentElement).toHaveAttribute('lang', locale);
        expect(document.documentElement).toHaveAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr');
        const renderedButtons = Array.from(view.container.querySelectorAll('button'));
        expect(renderedButtons).toHaveLength(combinations.length);
        renderedButtons.forEach((button, index) => {
          expect(button.tagName).toBe('BUTTON');
          expect(button).toHaveAttribute('type', 'button');
          expect(button).toHaveTextContent(combinations[index].label);
        });
        view.unmount();
      }
    }
  });

  it('emits the expected part rules for every allowed variant and color', () => {
    const view = renderWithBiowave(
      <>
        {variantColorCases.map(({ variant, color }) => (
          <Button
            key={`${variant}-${color}`}
            variant={variant}
            color={color}
            startIcon={<Icon name="add" />}
          >
            {`${variant}-${color}`}
          </Button>
        ))}
      </>,
    );
    const cssText = allCssRules();
    const buttons = Array.from(view.container.querySelectorAll('button'));

    buttons.forEach((button, index) => {
      const { variant, color } = variantColorCases[index];
      const visual = resolveButtonTokens(variant, color);
      const rules = cssRulesFor(button, cssText);
      expect(rules).toContain(visual.bg);
      expect(rules).toContain(visual.label.default);
      expect(rules).toContain(visual.icon.default);
      if (visual.border) expect(rules).toContain(visual.border.default);
    });
  });

  it('emits every size token in generated rules', () => {
    const view = renderWithBiowave(
      <>
        {sizes.map((size) => (
          <Button key={size} size={size} startIcon={<Icon name="add" />}>
            {size}
          </Button>
        ))}
      </>,
    );
    const cssText = allCssRules();

    Array.from(view.container.querySelectorAll('button')).forEach((button, index) => {
      const size = buttonSizeTokens[sizes[index]];
      const rules = cssRulesFor(button, cssText);
      expect(rules).toContain(size.height);
      expect(rules).toContain(size.paddingInline);
      expect(rules).toContain(size.gap);
      expect(rules).toContain(size.icon);
      expect(rules).toContain(size.radius);
    });
  });

  it('makes renderWithBiowave work for all theme and locale combinations', () => {
    for (const theme of themes) {
      for (const locale of locales) {
        const view = renderWithBiowave(<Button>Action</Button>, { theme, locale });
        expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
        expect(document.documentElement.dir).toBe(locale === 'ar' ? 'rtl' : 'ltr');
        view.unmount();
      }
    }
  });

  it('covers every state and token rule for every allowed color', () => {
    const renderCases = (state: 'enabled' | 'disabled' | 'loading') => (
      <>
        {variantColorCases.map(({ variant, color }) => (
          <Button
            key={`${variant}-${color}`}
            variant={variant}
            color={color}
            startIcon={<Icon name="add" />}
            disabled={state === 'disabled'}
            loading={state === 'loading'}
          >
            {`${variant}-${color}`}
          </Button>
        ))}
      </>
    );
    const view = renderWithBiowave(renderCases('enabled'));

    let cssText = allCssRules();
    Array.from(view.container.querySelectorAll('button')).forEach((button, index) => {
      const { variant, color } = variantColorCases[index];
      const visual = resolveButtonTokens(variant, color);
      const focusColor = color === 'inverse' ? buttonFocusTokens.inverse : buttonFocusTokens.default;
      const rules = cssRulesFor(button, cssText);
      expect(rules).toContain(':hover');
      expect(rules).toContain(':active');
      expect(rules).toContain(':focus-visible');
      expect(rules).toContain('.Mui-disabled');
      expect(rules).toContain('[aria-busy');
      expect(rules).toContain(focusColor);
      expect(rules).toContain(buttonMotionTokens.defaultDuration);
      expect(rules).toContain(buttonMotionTokens.pressedDuration);
      expect(rules).toContain(buttonMotionTokens.standardEasing);
      if (visual.bgHovered && visual.bgPressed) {
        expect(rules).toContain(visual.bgHovered);
        expect(rules).toContain(visual.bgPressed);
      } else {
        expect(rules).toContain(
          `linear-gradient(${visual.stateLayer?.hovered}, ${visual.stateLayer?.hovered})`,
        );
        expect(rules).toContain(
          `linear-gradient(${visual.stateLayer?.pressed}, ${visual.stateLayer?.pressed})`,
        );
      }
    });

    view.rerender(renderCases('disabled'));
    cssText = allCssRules();
    Array.from(view.container.querySelectorAll('button')).forEach((button, index) => {
      const { variant, color } = variantColorCases[index];
      const visual = resolveButtonTokens(variant, color);
      const rules = cssRulesFor(button, cssText);
      expect(rules).toContain(visual.bgDisabled);
      expect(rules).toContain(visual.label.disabled);
      expect(rules).toContain(visual.icon.disabled);
      expect(rules).toContain(`transition-duration: ${buttonMotionTokens.instantDuration}`);
      if (visual.border) expect(rules).toContain(visual.border.disabled);
    });

    view.rerender(renderCases('enabled'));
    cssText = allCssRules();
    Array.from(view.container.querySelectorAll('button')).forEach((button) => {
      expect(cssRulesFor(button, cssText)).toContain(
        `transition-duration: ${buttonMotionTokens.instantDuration}`,
      );
    });

    view.rerender(renderCases('loading'));
    cssText = allCssRules();
    Array.from(view.container.querySelectorAll('button')).forEach((button) => {
      const rules = cssRulesFor(button, cssText);
      expect(button).toHaveAttribute('aria-busy', 'true');
      expect(rules).toContain(buttonMotionTokens.loadingDuration);
      expect(rules).toContain(buttonMotionTokens.linearEasing);
      expect(rules).toContain('opacity: 0');
    });
  });

  it('supports full width while retaining the fixed tokenized height', () => {
    renderWithBiowave(<Button fullWidth>Action</Button>);
    const button = screen.getByRole('button', { name: 'Action' });
    expect(button).toHaveClass('MuiButton-fullWidth');
    expect(cssRulesFor(button)).toContain(buttonSizeTokens.md.height);
  });

  it('disables MUI ripple, elevation, uppercase text, and minimum width', () => {
    renderWithBiowave(<Button>Mixed Case</Button>);
    const button = screen.getByRole('button', { name: 'Mixed Case' });
    const rules = cssRulesFor(button);

    expect(button.querySelector('.MuiTouchRipple-root')).not.toBeInTheDocument();
    expect(rules).toContain('min-width: 0');
    expect(rules).toContain('text-transform: none');
    expect(rules).toContain('var(--bw-elevation-0)');
  });
});

describe('Button loading and disabled behavior', () => {
  it('keeps its accessible name and focus while loading, blocks activation, and announces once', () => {
    const onClick = vi.fn();
    const view = renderWithBiowave(<Button onClick={onClick}>Save changes</Button>);
    const button = screen.getByRole('button', { name: 'Save changes' });
    const idleStatus = screen.getByRole('status');
    expect(idleStatus).toBeEmptyDOMElement();
    act(() => button.focus());

    view.rerender(
      <Button loading loadingLabel="Saving…" onClick={onClick}>
        Save changes
      </Button>,
    );

    expect(button).toHaveFocus();
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button).not.toBeDisabled();
    expect(button.tabIndex).toBe(0);
    expect(computeAccessibleName(button)).toBe('Save changes');
    expect(screen.getAllByRole('status')).toHaveLength(1);
    const status = screen.getByRole('status');
    expect(status).toBe(idleStatus);
    expect(status).toHaveTextContent('Saving…');
    expect(button).not.toContainElement(status);
    const spinner = button.querySelector('.MuiCircularProgress-root');
    expect(spinner).toBeInTheDocument();
    expect(cssRulesFor(spinner as Element)).toContain(buttonMotionTokens.spinnerDuration);
    expect(cssRulesFor(spinner as Element)).toContain(buttonMotionTokens.linearEasing);
    expect(cssRulesFor(button)).not.toContain('visibility: hidden');

    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();

    view.rerender(
      <Button loading loadingLabel="Saving…" onClick={onClick}>
        Save changes
      </Button>,
    );
    expect(screen.getAllByText('Saving…')).toHaveLength(1);

    view.rerender(<Button onClick={onClick}>Save changes</Button>);
    expect(screen.getByRole('status')).toBe(idleStatus);
    expect(idleStatus).toBeEmptyDOMElement();
  });

  it('keeps progress rotation non-zero under reduced motion', () => {
    renderWithBiowave(<Button loading>Save</Button>);
    const spinner = screen
      .getByRole('button', { name: 'Save' })
      .querySelector('.MuiCircularProgress-root');
    const rules = cssRulesFor(spinner as Element);

    expect(buttonMotionTokens.spinnerDuration).toBe('var(--bw-motion-duration-progress)');
    expect(buttonMotionTokens.spinnerDuration).not.toBe(buttonMotionTokens.instantDuration);
    expect(rules).toContain(buttonMotionTokens.spinnerDuration);
    expect(spinnerSource).not.toContain('visibility');
  });

  it('uses the provider locale for the default loading label', () => {
    const english = renderWithBiowave(<Button loading>Save</Button>, { locale: 'en' });
    expect(screen.getByRole('status')).toHaveTextContent('Loading');
    english.unmount();

    renderWithBiowave(<Button loading>حفظ</Button>, { locale: 'ar' });
    expect(screen.getByRole('status')).toHaveTextContent('جارٍ التحميل');
  });

  it('removes a disabled native button from keyboard activation', async () => {
    const onClick = vi.fn();
    renderWithBiowave(
      <>
        <Button disabled onClick={onClick}>
          Disabled
        </Button>
        <Button>Enabled</Button>
      </>,
    );

    const disabled = screen.getByRole('button', { name: 'Disabled' });
    expect(disabled).toBeDisabled();
    fireEvent.click(disabled);
    expect(onClick).not.toHaveBeenCalled();

    await userEvent.tab();
    expect(screen.getByRole('button', { name: 'Enabled' })).toHaveFocus();
  });

  it('disables an anchor without navigation or activation', () => {
    const onClick = vi.fn();
    renderWithBiowave(
      <Button href="#report" disabled onClick={onClick}>
        Report
      </Button>,
    );
    const link = screen.getByRole('link', { name: 'Report' });

    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).toHaveAttribute('tabindex', '-1');
    expect(fireEvent.click(link)).toBe(false);
    expect(onClick).not.toHaveBeenCalled();
    expect(window.location.hash).not.toBe('#report');
  });

  it('uses instant color changes when disabling and restores transitions after re-enabling', async () => {
    const view = renderWithBiowave(<Button>Action</Button>);

    view.rerender(<Button disabled>Action</Button>);
    expect(rootCssRuleFor(screen.getByRole('button', { name: 'Action' }))).toContain(
      `transition-duration: ${buttonMotionTokens.instantDuration}`,
    );

    view.rerender(<Button>Action</Button>);
    expect(rootCssRuleFor(screen.getByRole('button', { name: 'Action' }))).toContain(
      `transition-duration: ${buttonMotionTokens.instantDuration}`,
    );

    await act(
      () => new Promise<void>((resolve) => window.requestAnimationFrame(() => resolve())),
    );
    const restoredRules = rootCssRuleFor(screen.getByRole('button', { name: 'Action' }));
    expect(restoredRules).not.toContain(
      `transition-duration: ${buttonMotionTokens.instantDuration}`,
    );
    expect(restoredRules).toContain(buttonMotionTokens.defaultDuration);
  });
});

describe('Button validation', () => {
  it('warns once per unsupported tonal color and renders the outlined fallback', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const neutral = renderWithBiowave(
      <Button variant="tonal" color="neutral">
        Neutral
      </Button>,
    );
    neutral.rerender(
      <Button variant="tonal" color="neutral">
        Neutral
      </Button>,
    );
    const neutralRules = cssRulesFor(screen.getByRole('button', { name: 'Neutral' }));
    expect(neutralRules).toContain(buttonTokens.outlined.neutral.border?.default);
    neutral.unmount();

    renderWithBiowave(
      <Button variant="tonal" color="inverse">
        Inverse
      </Button>,
    );
    expect(warn).toHaveBeenCalledTimes(2);
    expect(warn.mock.calls[0]?.[0]).toContain('color="neutral"');
    expect(warn.mock.calls[1]?.[0]).toContain('color="inverse"');
    warn.mockRestore();
  });

  it('warns once and keeps only startIcon when both icons are supplied', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const view = renderWithBiowave(
      <Button startIcon={<Icon name="add" />} endIcon={<Icon name="arrow_forward" />}>
        Action
      </Button>,
    );
    view.rerender(
      <Button startIcon={<Icon name="add" />} endIcon={<Icon name="arrow_forward" />}>
        Action
      </Button>,
    );

    expect(document.querySelectorAll('.bw-button__icon')).toHaveLength(1);
    expect(warn).toHaveBeenCalledTimes(1);
    warn.mockRestore();
  });

  it('warns once for an empty or non-string label and still renders', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const view = renderWithBiowave(<Button>{''}</Button>);
    view.rerender(<Button>{123 as unknown as string}</Button>);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn).toHaveBeenCalledWith('Button needs a text label — use IconButton');
    warn.mockRestore();
  });
});

describe('Button RTL', () => {
  it('moves the directional class to one wrapper and leaves other icons unchanged', () => {
    const directional = renderWithBiowave(
      <Button startIcon={<Icon name="arrow_forward" className="bw-icon-directional" />}>
        التالي
      </Button>,
      { locale: 'ar' },
    );
    const directionalButton = screen.getByRole('button', { name: 'التالي' });
    const directionalWrapper = directionalButton.querySelector('.bw-button__icon');
    expect(directionalWrapper).toHaveClass('bw-icon-directional');
    expect(directionalButton.querySelectorAll('.bw-icon-directional')).toHaveLength(1);
    expect(directionalWrapper?.firstElementChild).not.toHaveClass('bw-icon-directional');
    expect(cssRulesFor(directionalButton)).toContain(
      '.bw-button__icon.bw-icon-directional',
    );
    expect(cssRulesFor(directionalButton)).toContain('scaleX(-1)');
    directional.unmount();

    renderWithBiowave(
      <Button startIcon={<Icon name="add" />}>
        إضافة
      </Button>,
      { locale: 'ar' },
    );
    expect(document.querySelector('.bw-button__icon')).not.toHaveClass('bw-icon-directional');
  });

  it('strips mirrorInRtl whenever present and flips only a true marker', () => {
    const reactError = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    function DirectionalIcon(
      props: ButtonDirectionalIconProps & React.SVGProps<SVGSVGElement>,
    ) {
      return <svg data-testid="directional-icon" {...props} />;
    }

    const directional = renderWithBiowave(
      <Button startIcon={<DirectionalIcon mirrorInRtl />}>
        التالي
      </Button>,
      { locale: 'ar' },
    );
    const button = screen.getByRole('button', { name: 'التالي' });
    const icon = screen.getByTestId('directional-icon');
    expect(button.querySelectorAll('.bw-icon-directional')).toHaveLength(1);
    expect(button.querySelector('.bw-button__icon')).toHaveClass('bw-icon-directional');
    expect(icon).not.toHaveAttribute('mirrorInRtl');
    expect(icon).not.toHaveAttribute('mirrorinrtl');
    directional.unmount();

    renderWithBiowave(
      <Button startIcon={<DirectionalIcon mirrorInRtl={false} />}>
        إضافة
      </Button>,
      { locale: 'ar' },
    );
    const nonDirectionalButton = screen.getByRole('button', { name: 'إضافة' });
    const nonDirectionalIcon = screen.getByTestId('directional-icon');
    expect(nonDirectionalButton.querySelector('.bw-button__icon')).not.toHaveClass(
      'bw-icon-directional',
    );
    expect(nonDirectionalIcon).not.toHaveAttribute('mirrorInRtl');
    expect(nonDirectionalIcon).not.toHaveAttribute('mirrorinrtl');
    expect(reactError).not.toHaveBeenCalled();
    reactError.mockRestore();
  });
});

describe('Button accessibility and keyboard', () => {
  for (const theme of themes) {
    it(`has no axe violations for every allowed variant and color in ${theme}`, async () => {
      const { container } = renderWithBiowave(
        <>
          {variantColorCases.map(({ variant, color }) => (
            <Button key={`${variant}-${color}`} variant={variant} color={color}>
              {`${variant}-${color}`}
            </Button>
          ))}
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
    });
  }

  it('activates a button with Enter and Space and participates in tab order', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    renderWithBiowave(
      <>
        <Button onClick={onClick}>Action</Button>
        <Button>Next</Button>
      </>,
    );
    const button = screen.getByRole('button', { name: 'Action' });
    const next = screen.getByRole('button', { name: 'Next' });

    await user.tab();
    expect(button).toHaveFocus();
    await user.keyboard('{Enter}');
    await user.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(2);
    await user.tab();
    expect(next).toHaveFocus();
    await user.tab({ shift: true });
    expect(button).toHaveFocus();
  });

  it('activates a link with Enter but not Space', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    renderWithBiowave(
      <Button href="#destination" onClick={onClick}>
        Continue
      </Button>,
    );
    const link = screen.getByRole('link', { name: 'Continue' });

    await user.tab();
    expect(link).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(1);
    await user.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

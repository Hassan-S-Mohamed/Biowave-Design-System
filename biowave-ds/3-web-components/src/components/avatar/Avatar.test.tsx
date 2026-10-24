import { createRef } from 'react';
import { act, cleanup, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { cssVars } from '@biowave/foundations';
import { axe } from 'vitest-axe';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderWithBiowave } from '../../test/render';
import { Avatar, type AvatarBadgeProps, type AvatarProps } from './Avatar';
// @ts-expect-error — Vitest/Vite provides raw module imports at test runtime.
import avatarSource from './Avatar.tsx?raw';
import { avatarInitials } from './avatarInitials';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

function loadImage(image: HTMLImageElement): void {
  act(() => fireEvent.load(image));
}

function failImage(image: HTMLImageElement): void {
  act(() => fireEvent.error(image));
}

const sizes = {
  sm: { textClass: 'bw-text-label-sm' },
  md: { textClass: 'bw-text-label-lg' },
  lg: { textClass: 'bw-text-title-lg' },
  xl: { textClass: 'bw-text-heading-sm' },
} as const;

const sizeTokens = {
  sm: cssVars.size.control.height.sm,
  md: cssVars.size.control.height.md,
  lg: cssVars.size.control.height.lg,
  xl: cssVars.size.control.height.xl,
} as const;

const squareRadiusTokens = {
  sm: cssVars.radius.sm,
  md: cssVars.radius.md,
  lg: cssVars.radius.lg,
  xl: cssVars.radius.xl,
} as const;

const iconSizeTokens = {
  sm: cssVars.size.icon.sm,
  md: cssVars.size.icon.md,
  lg: cssVars.size.icon.lg,
  xl: cssVars.size.icon.xl,
} as const;

const colorTokens = {
  neutral: {
    background: cssVars.color.background.neutral.default,
    initials: cssVars.color.text.neutral.subtle,
    icon: cssVars.color.icon.neutral.subtle,
  },
  brand: {
    background: cssVars.color.background.brand.subtle,
    initials: cssVars.color.text.role.brand,
    icon: cssVars.color.icon.role.brand,
  },
  secondary: {
    background: cssVars.color.background.secondary.subtle,
    initials: cssVars.color.text.role.secondary,
    icon: cssVars.color.icon.role.secondary,
  },
} as const;

describe.each([
  ['light', 'en'],
  ['light', 'ar'],
  ['dark', 'en'],
  ['dark', 'ar'],
] as const)('visual contract in %s/%s', (theme, locale) => {
  it('renders every size, shape and color from semantic tokens', () => {
    const combinations = Object.keys(sizes).flatMap((size) =>
      (['circle', 'square'] as const).flatMap((shape) =>
        (['neutral', 'brand', 'secondary'] as const).map((color) => ({
          size: size as keyof typeof sizes,
          shape,
          color,
        })),
      ),
    );

    renderWithBiowave(
      <>
        {combinations.map(({ size, shape, color }) => {
          const key = `${size}-${shape}-${color}`;
          return (
            <div key={key}>
              <Avatar
                name="Sara Ali"
                size={size}
                shape={shape}
                color={color}
                data-testid={`${key}-initials`}
              />
              <Avatar
                decorative
                size={size}
                shape={shape}
                color={color}
                data-testid={`${key}-icon`}
              />
            </div>
          );
        })}
      </>,
      { theme, locale },
    );

    for (const { size, shape, color } of combinations) {
      const key = `${size}-${shape}-${color}`;
      const initialsAvatar = screen.getByTestId(`${key}-initials`);
      const iconAvatar = screen.getByTestId(`${key}-icon`);
      const initials = initialsAvatar.querySelector('.bw-avatar__initials');
      const icon = iconAvatar.querySelector('.bw-avatar__fallback-icon');
      const avatarStyle = getComputedStyle(initialsAvatar);

      expect(avatarStyle.inlineSize).toBe(sizeTokens[size]);
      expect(avatarStyle.blockSize).toBe(sizeTokens[size]);
      const radiusToken = shape === 'circle' ? cssVars.radius.full : squareRadiusTokens[size];
      expect(avatarStyle.borderRadius).toBe(radiusToken);
      expect(avatarStyle.backgroundColor).toBe(colorTokens[color].background);
      expect(initials).toHaveClass(sizes[size].textClass);
      const initialsStyle = getComputedStyle(initials!);
      const iconStyle = getComputedStyle(icon!);
      expect(initialsStyle.color).toBe(colorTokens[color].initials);
      expect(iconStyle.color).toBe(colorTokens[color].icon);
      expect(iconStyle.fontSize).toBe(iconSizeTokens[size]);
    }
  });
});

describe('content and initials', () => {
  it('keeps the fallback visible until an image loads and resets when src changes', () => {
    const imageConstructor = vi.spyOn(window, 'Image');
    const { rerender } = renderWithBiowave(
      <Avatar name="Sara Ali" src="/sara.png" data-testid="avatar" />,
    );

    const firstImage = screen.getByTestId('avatar').querySelector('img');
    expect(firstImage).not.toBeNull();
    expect(screen.getByText('SA')).toBeInTheDocument();
    expect(firstImage).toHaveAttribute('src', '/sara.png');
    expect(firstImage).toHaveAttribute('alt', '');
    expect(firstImage).toHaveAttribute('loading', 'lazy');
    expect(firstImage).toHaveAttribute('decoding', 'async');
    expect(firstImage).toHaveAttribute('draggable', 'false');
    expect(getComputedStyle(firstImage!).visibility).toBe('hidden');
    expect(getComputedStyle(firstImage!).display).not.toBe('none');
    expect(imageConstructor).not.toHaveBeenCalled();

    loadImage(firstImage!);
    expect(screen.queryByText('SA')).not.toBeInTheDocument();
    expect(getComputedStyle(firstImage!).visibility).toBe('visible');

    rerender(<Avatar name="Sara Ali" src="/new.png" data-testid="avatar" />);
    const nextImage = screen.getByTestId('avatar').querySelector('img');
    expect(nextImage).not.toBeNull();
    expect(nextImage).not.toBe(firstImage);
    expect(nextImage).toHaveAttribute('src', '/new.png');
    expect(screen.getByText('SA')).toBeInTheDocument();
    expect(getComputedStyle(nextImage!).visibility).toBe('hidden');

    loadImage(firstImage!);
    expect(screen.getByText('SA')).toBeInTheDocument();
    expect(getComputedStyle(nextImage!).visibility).toBe('hidden');

    failImage(nextImage!);
    expect(screen.getByText('SA')).toBeInTheDocument();
    expect(screen.getByTestId('avatar').querySelector('img')).not.toBeInTheDocument();

    rerender(<Avatar name="Sara Ali" src="" data-testid="avatar" />);
    expect(screen.getByText('SA')).toBeInTheDocument();
    expect(screen.getByTestId('avatar').querySelector('img')).not.toBeInTheDocument();
    expect(imageConstructor).not.toHaveBeenCalled();
  });

  it.each([
    ['loaded', 120, true],
    ['failed', 0, false],
  ] as const)('handles an already-complete %s image when its ref attaches', (_state, naturalWidth, remainsVisible) => {
    vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(true);
    vi.spyOn(HTMLImageElement.prototype, 'naturalWidth', 'get').mockReturnValue(naturalWidth);

    renderWithBiowave(
      <Avatar name="Sara Ali" src="/cached.png" data-testid="avatar" />,
    );

    const image = screen.getByTestId('avatar').querySelector('img');
    if (remainsVisible) {
      expect(image).toBeInTheDocument();
      expect(getComputedStyle(image!).visibility).toBe('visible');
      expect(screen.queryByText('SA')).not.toBeInTheDocument();
    } else {
      expect(image).not.toBeInTheDocument();
      expect(screen.getByText('SA')).toBeInTheDocument();
    }
  });

  it('uses initials before the Icon fallback, and supports a custom Icon glyph', () => {
    const { rerender } = renderWithBiowave(
      <Avatar name="Sara Ali" initials="XY" data-testid="avatar" />,
    );
    expect(screen.getByText('XY')).toBeInTheDocument();
    expect(screen.getByTestId('avatar').querySelector('svg')).not.toBeInTheDocument();

    rerender(<Avatar decorative data-testid="avatar" />);
    expect(screen.getByText('person')).toBeInTheDocument();
    expect(screen.getByTestId('avatar').querySelector('svg')).not.toBeInTheDocument();

    rerender(<Avatar decorative icon="devices" data-testid="avatar" />);
    expect(screen.getByText('devices')).toBeInTheDocument();
    expect(screen.getByTestId('avatar').querySelector('svg')).not.toBeInTheDocument();
  });

  it.each([
    ['Sara Ali', 'SA'],
    ['Omar', 'O'],
    [' sara  maria ali ', 'SA'],
    ['سارة علي', 'س'],
    ['👩🏽‍💻', '👩🏽‍💻'],
    ['e\u0301', 'E\u0301'],
  ])('derives grapheme-safe initials for %s', (name, expected) => {
    expect(avatarInitials(name)).toBe(expected);
  });
});

describe('Badge composition', () => {
  it('uses the public Badge, maps overlap from shape and preserves the avatar box', () => {
    const { rerender } = renderWithBiowave(
      <>
        <span id="context">Team member</span>
        <Avatar
          name="Sara Ali"
          aria-describedby="context"
          badge={{ variant: 'dot', color: 'success', label: 'Online' }}
          data-testid="badged"
        />
        <Avatar name="Sara Ali" data-testid="plain" />
      </>,
    );

    const badged = screen.getByTestId('badged');
    const indicator = badged.parentElement?.querySelector('.MuiBadge-badge');
    expect(indicator).toHaveClass('MuiBadge-overlapCircular');
    expect(getComputedStyle(badged).inlineSize).toBe(getComputedStyle(screen.getByTestId('plain')).inlineSize);
    expect(badged.getAttribute('aria-describedby')?.split(/\s+/u)).toContain('context');
    expect(badged).toHaveAccessibleDescription('Team member Online');

    rerender(
      <Avatar
        name="Sara Ali"
        shape="square"
        badge={{ variant: 'check', label: 'Verified' }}
        data-testid="badged"
      />,
    );
    expect(screen.getByTestId('badged').parentElement?.querySelector('.MuiBadge-badge')).toHaveClass(
      'MuiBadge-overlapRectangular',
    );
  });
});

describe('accessibility and RTL', () => {
  it.each([
    ['light', 'en'],
    ['light', 'ar'],
    ['dark', 'en'],
    ['dark', 'ar'],
  ] as const)('is axe-clean in %s/%s with and without a badge', async (theme, locale) => {
    const name = locale === 'ar' ? 'سارة علي' : 'Sara Ali';
    const { container } = renderWithBiowave(
      <>
        <Avatar name={name} />
        <Avatar
          name={name}
          badge={{ variant: 'dot', color: 'success', label: locale === 'ar' ? 'متصل' : 'Online' }}
        />
      </>,
      { theme, locale },
    );
    expect((await axe(container)).violations).toHaveLength(0);
  });

  it('names meaningful content, hides decorative content and forwards the supported root props', () => {
    const ref = createRef<HTMLDivElement>();
    renderWithBiowave(
      <>
        <Avatar
          ref={ref}
          name="  Sara Ali  "
          className="consumer-class"
          data-owner="profile"
          data-testid="named"
        />
        <Avatar decorative data-testid="decorative" />
      </>,
    );

    const named = screen.getByRole('img', { name: 'Sara Ali' });
    expect(named).toBe(ref.current);
    expect(named).toHaveClass('consumer-class');
    expect(named).toHaveAttribute('data-owner', 'profile');
    expect(named.querySelector('.bw-avatar__initials')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByTestId('decorative')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByTestId('decorative')).not.toHaveAttribute('role');
    expect(screen.getByTestId('decorative')).not.toHaveAttribute('aria-label');
  });

  it('is never focusable', async () => {
    const user = userEvent.setup();
    renderWithBiowave(
      <>
        <Avatar name="Sara Ali" />
        <button type="button">Next</button>
      </>,
    );
    await user.tab();
    expect(screen.getByRole('button', { name: 'Next' })).toHaveFocus();
  });

  it.each([
    ['en', 'ltr'],
    ['ar', 'rtl'],
  ] as const)('keeps avatar content unmirrored and resolves Badge to the top-end edge in %s', (locale, direction) => {
    renderWithBiowave(
      <Avatar
        name="Sara Ali"
        badge={{ variant: 'dot', color: 'success', label: locale === 'ar' ? 'متصل' : 'Online' }}
        data-testid="avatar"
      />,
      { locale },
    );
    const avatar = screen.getByTestId('avatar');
    const initials = avatar.querySelector('.bw-avatar__initials');
    const badgeRoot = avatar.parentElement;
    const indicator = avatar.parentElement?.querySelector('.MuiBadge-badge');
    expect(badgeRoot?.closest('[dir]')).toHaveAttribute('dir', direction);
    expect(getComputedStyle(avatar).transform).not.toContain('scaleX(-1)');
    expect(getComputedStyle(initials!).transform).not.toContain('scaleX(-1)');
    const indicatorStyle = getComputedStyle(indicator!);
    expect(indicatorStyle.insetInlineEnd).toBe('14.6%');
    expect(indicatorStyle.insetBlockStart).toBe('14.6%');
    expect(indicatorStyle.left).toBe('');
    expect(indicatorStyle.right).toBe('');
  });
});

describe('invalid combinations', () => {
  it('warns once for each invalid combination and keeps rendering the documented fallback', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const ownedBadgeProps = {
      variant: 'dot',
      color: 'success',
      label: 'Online',
      overlap: 'rectangular',
      children: 'ignored',
    } as unknown as AvatarBadgeProps;

    const InvalidCases = () => (
      <>
        <Avatar {...({ 'data-testid': 'missing-name' } as unknown as AvatarProps)} />
        <Avatar name="Sara Ali" initials="XYZ" data-testid="long-initials" />
        <Avatar
          name="Sara Ali"
          decorative
          badge={{ variant: 'dot', color: 'success', label: 'Online' }}
          data-testid="decorative-badge"
        />
        <Avatar name="Sara Ali" badge={ownedBadgeProps} data-testid="owned-badge" />
      </>
    );

    const { rerender } = renderWithBiowave(<InvalidCases />);
    expect(screen.getByTestId('missing-name').querySelector('.bw-avatar__fallback-icon')).toBeInTheDocument();
    expect(screen.getByTestId('long-initials')).toHaveTextContent('XY');
    expect(screen.queryByText('ignored')).not.toBeInTheDocument();
    expect(
      screen.getByTestId('owned-badge').parentElement?.querySelector('.MuiBadge-badge'),
    ).toHaveClass('MuiBadge-overlapCircular');
    expect(warn.mock.calls.map(([message]) => message)).toEqual([
      'Avatar: avatars need a name or decorative.',
      'Avatar: initials longer than 2 characters are truncated.',
      'Avatar: a decorative avatar hides its badge label.',
      'Avatar: badge children and overlap are controlled by Avatar and are ignored.',
    ]);

    rerender(<InvalidCases />);
    expect(warn).toHaveBeenCalledTimes(4);
  });
});

describe('source and type guards', () => {
  it('contains no raw color, length, duration or font values', () => {
    expect(avatarSource).not.toMatch(/#[\da-f]{3,8}\b/iu);
    expect(avatarSource).not.toMatch(/\b\d+(?:\.\d+)?(?:px|ms)\b/iu);
    expect(avatarSource).not.toMatch(/\b(?:Arial|Roboto|sans-serif|serif)\b/iu);
  });
});

function avatarTypeContract(): void {
  // @ts-expect-error — Avatar has no 2xl size.
  <Avatar name="Sara Ali" size="2xl" />;
  // @ts-expect-error — Avatar shapes are circle or square.
  <Avatar name="Sara Ali" shape="pill" />;
  // @ts-expect-error — Avatar colors are the three planned semantic roles.
  <Avatar name="Sara Ali" color="danger" />;
  // @ts-expect-error — Avatar owns Badge overlap.
  <Avatar name="Sara Ali" badge={{ variant: 'dot', color: 'success', label: 'Online', overlap: 'circular' }} />;
}

void avatarTypeContract;

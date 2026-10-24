import { forwardRef, useCallback, type ReactNode } from 'react';
import MuiAvatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import { cssVars } from '@biowave/foundations';
import { Badge, type BadgeProps } from '../badge';
import { Icon, type IconName } from '../icon';
import { warnOnce } from '../../internal/warnOnce';
import { avatarGraphemes, avatarInitials } from './avatarInitials';
import { useImageLoaded } from './useImageLoaded';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'circle' | 'square';
export type AvatarColor = 'neutral' | 'brand' | 'secondary';
export type AvatarBadgeProps = Omit<BadgeProps, 'children' | 'overlap'>;

interface AvatarSharedProps {
  src?: string;
  initials?: string;
  icon?: IconName;
  size?: AvatarSize;
  shape?: AvatarShape;
  color?: AvatarColor;
  badge?: AvatarBadgeProps;
  className?: string;
  'aria-describedby'?: string;
  [dataAttribute: `data-${string}`]: string | number | boolean | undefined;
}

interface NamedAvatarProps {
  name: string;
  decorative?: false;
}

interface DecorativeAvatarProps {
  name?: string;
  decorative: true;
}

export type AvatarProps = AvatarSharedProps & (NamedAvatarProps | DecorativeAvatarProps);

interface StyledAvatarProps {
  avatarSize: AvatarSize;
  avatarShape: AvatarShape;
  avatarColor: AvatarColor;
}

const dimensions: Record<AvatarSize, string> = {
  sm: cssVars.size.control.height.sm,
  md: cssVars.size.control.height.md,
  lg: cssVars.size.control.height.lg,
  xl: cssVars.size.control.height.xl,
};

const squareRadii: Record<AvatarSize, string> = {
  sm: cssVars.radius.sm,
  md: cssVars.radius.md,
  lg: cssVars.radius.lg,
  xl: cssVars.radius.xl,
};

const iconSizes: Record<AvatarSize, string> = {
  sm: cssVars.size.icon.sm,
  md: cssVars.size.icon.md,
  lg: cssVars.size.icon.lg,
  xl: cssVars.size.icon.xl,
};

const initialsClasses: Record<AvatarSize, string> = {
  sm: 'bw-text-label-sm',
  md: 'bw-text-label-lg',
  lg: 'bw-text-title-lg',
  xl: 'bw-text-heading-sm',
};

const backgrounds: Record<AvatarColor, string> = {
  neutral: cssVars.color.background.neutral.default,
  brand: cssVars.color.background.brand.subtle,
  secondary: cssVars.color.background.secondary.subtle,
};

const initialsColors: Record<AvatarColor, string> = {
  neutral: cssVars.color.text.neutral.subtle,
  brand: cssVars.color.text.role.brand,
  secondary: cssVars.color.text.role.secondary,
};

const iconColors: Record<AvatarColor, string> = {
  neutral: cssVars.color.icon.neutral.subtle,
  brand: cssVars.color.icon.role.brand,
  secondary: cssVars.color.icon.role.secondary,
};

const AvatarRoot = styled(MuiAvatar, {
  name: 'BiowaveAvatar',
  slot: 'Root',
  shouldForwardProp: (prop) =>
    prop !== 'avatarSize' && prop !== 'avatarShape' && prop !== 'avatarColor',
})<StyledAvatarProps>(({ avatarSize, avatarShape, avatarColor }) => ({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 'none',
  overflow: 'hidden',
  verticalAlign: 'middle',
  inlineSize: dimensions[avatarSize],
  blockSize: dimensions[avatarSize],
  borderRadius: avatarShape === 'circle' ? cssVars.radius.full : squareRadii[avatarSize],
  backgroundColor: backgrounds[avatarColor],
  color: initialsColors[avatarColor],
  fontFamily: 'inherit',
  fontSize: 'inherit',
  lineHeight: 'inherit',
  '& .bw-avatar__image': {
    position: 'absolute',
    insetBlock: 0,
    insetInline: 0,
    inlineSize: '100%',
    blockSize: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    visibility: 'hidden',
  },
  '& .bw-avatar__image--loaded': {
    visibility: 'visible',
  },
  '& .bw-avatar__initials': {
    color: initialsColors[avatarColor],
    whiteSpace: 'nowrap',
    userSelect: 'none',
  },
  '& .bw-avatar__fallback-icon': {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: iconColors[avatarColor],
    fontSize: iconSizes[avatarSize],
  },
}));

function dataAttributes(props: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(props).filter(([key]) => key.startsWith('data-')));
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(function Avatar(
  {
    name,
    src,
    initials,
    icon = 'person',
    size = 'md',
    shape = 'circle',
    color = 'neutral',
    badge,
    decorative = false,
    className,
    'aria-describedby': ariaDescribedby,
    ...rest
  },
  ref,
) {
  const trimmedName = name?.trim() ?? '';
  const normalizedSrc = src ?? '';
  const { status: imageStatus, onLoad, onError } = useImageLoaded(normalizedSrc);
  const handleImageRef = useCallback(
    (image: HTMLImageElement | null) => {
      if (!image?.complete) return;
      if (image.naturalWidth > 0) onLoad();
      else onError();
    },
    [onError, onLoad],
  );
  const suppliedInitials = initials === undefined ? undefined : avatarGraphemes(initials);
  const renderedInitials =
    suppliedInitials === undefined
      ? avatarInitials(trimmedName)
      : suppliedInitials.slice(0, 2).join('');

  if (!decorative && !trimmedName) {
    warnOnce('avatar-missing-name', 'Avatar: avatars need a name or decorative.');
  }
  if (suppliedInitials && suppliedInitials.length > 2) {
    warnOnce(
      'avatar-long-initials',
      'Avatar: initials longer than 2 characters are truncated.',
    );
  }
  if (decorative && badge) {
    warnOnce(
      'avatar-decorative-badge',
      'Avatar: a decorative avatar hides its badge label.',
    );
  }

  const unsafeBadge = badge as
    | (AvatarBadgeProps & { children?: ReactNode; overlap?: unknown })
    | undefined;
  const hasOwnedBadgeProp = Boolean(
    unsafeBadge &&
      (Object.prototype.hasOwnProperty.call(unsafeBadge, 'children') ||
        Object.prototype.hasOwnProperty.call(unsafeBadge, 'overlap')),
  );
  if (hasOwnedBadgeProp) {
    warnOnce(
      'avatar-owned-badge-props',
      'Avatar: badge children and overlap are controlled by Avatar and are ignored.',
    );
  }

  const fallback = renderedInitials ? (
    <span
      className={`bw-avatar__initials ${initialsClasses[size]}`}
      data-avatar-part="initials"
      aria-hidden="true"
    >
      {renderedInitials}
    </span>
  ) : (
    <span
      className="bw-avatar__fallback-icon"
      data-avatar-part="fallback-icon"
      aria-hidden="true"
    >
      <Icon name={icon} />
    </span>
  );

  const container = (
    <AvatarRoot
      {...dataAttributes(rest)}
      ref={ref}
      className={['bw-avatar__container', className].filter(Boolean).join(' ')}
      data-avatar-part="container"
      avatarSize={size}
      avatarShape={shape}
      avatarColor={color}
      variant={shape === 'circle' ? 'circular' : 'rounded'}
      role={!decorative && trimmedName ? 'img' : undefined}
      aria-label={!decorative && trimmedName ? trimmedName : undefined}
      aria-hidden={decorative ? 'true' : undefined}
      aria-describedby={ariaDescribedby}
    >
      {normalizedSrc && imageStatus !== 'error' ? (
        <img
          key={normalizedSrc}
          ref={handleImageRef}
          className={[
            'bw-avatar__image',
            imageStatus === 'loaded' && 'bw-avatar__image--loaded',
          ]
            .filter(Boolean)
            .join(' ')}
          data-avatar-part="image"
          src={normalizedSrc}
          loading="lazy"
          decoding="async"
          alt=""
          draggable={false}
          onLoad={onLoad}
          onError={onError}
        />
      ) : null}
      {imageStatus === 'loaded' ? null : fallback}
    </AvatarRoot>
  );

  if (!badge) return container;

  const {
    children: _ignoredChildren,
    overlap: _ignoredOverlap,
    ...forwardedBadgeProps
  } = unsafeBadge!;
  return (
    <Badge
      {...forwardedBadgeProps}
      overlap={shape === 'circle' ? 'circular' : 'rectangular'}
    >
      {container}
    </Badge>
  );
});

Avatar.displayName = 'Avatar';

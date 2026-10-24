import * as React from 'react';
import MuiBadge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { cssVars } from '@biowave/foundations';
import { visuallyHidden } from '../../internal/visuallyHidden';
import { warnOnce } from '../../internal/warnOnce';
import { Icon } from '../icon';

export type BadgeVariant = 'count' | 'dot' | 'check';
export type BadgeColor =
  | 'error'
  | 'brand'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'info'
  | 'neutral';
export type BadgeOverlap = 'rectangular' | 'circular';

type BadgeAnchor = React.ReactElement<{ 'aria-describedby'?: string }>;

export interface BadgeProps {
  variant?: BadgeVariant;
  count?: number;
  max?: number;
  showZero?: boolean;
  color?: BadgeColor;
  overlap?: BadgeOverlap;
  invisible?: boolean;
  label?: string;
  children?: BadgeAnchor;
  className?: string;
  [dataAttribute: `data-${string}`]: unknown;
}

interface StyledBadgeProps {
  $badgeVariant: BadgeVariant;
  $badgeColor: BadgeColor;
  $anchored: boolean;
  $overlap: BadgeOverlap;
  $mounted: boolean;
}

const styledBadgeProps = new Set([
  '$badgeVariant',
  '$badgeColor',
  '$anchored',
  '$overlap',
  '$mounted',
]);

function getColorTokens(color: BadgeColor) {
  switch (color) {
    case 'brand':
      return {
        background: cssVars.color.background.brand.default,
        foreground: cssVars.color.text.on.brand,
        icon: cssVars.color.icon.on.brand,
      };
    case 'secondary':
      return {
        background: cssVars.color.background.secondary.default,
        foreground: cssVars.color.text.on.secondary,
        icon: cssVars.color.icon.on.secondary,
      };
    case 'success':
      return {
        background: cssVars.color.background.success.default,
        foreground: cssVars.color.text.on.success,
        icon: cssVars.color.icon.on.success,
      };
    case 'warning':
      return {
        background: cssVars.color.background.warning.default,
        foreground: cssVars.color.text.on.warning,
        icon: cssVars.color.text.on.warning,
      };
    case 'info':
      return {
        background: cssVars.color.background.info.default,
        foreground: cssVars.color.text.on.info,
        icon: cssVars.color.icon.on.info,
      };
    case 'neutral':
      return {
        background: cssVars.color.surface.inverse,
        foreground: cssVars.color.text.neutral.inverse,
        icon: cssVars.color.icon.neutral.inverse,
      };
    case 'error':
    default:
      return {
        background: cssVars.color.background.error.default,
        foreground: cssVars.color.text.on.error,
        icon: cssVars.color.text.on.error,
      };
  }
}

const StyledBadge = styled(MuiBadge, {
  shouldForwardProp: (prop) => !styledBadgeProps.has(String(prop)),
})<StyledBadgeProps>(
  ({ $badgeVariant, $badgeColor, $anchored, $overlap, $mounted }) => {
    const colors = getColorTokens($badgeColor);
    const isCount = $badgeVariant === 'count';
    const isDot = $badgeVariant === 'dot';
    const indicatorSize = isDot
      ? cssVars.spacing.md
      : cssVars.size.icon.md;
    const placement = $overlap === 'circular' ? '14.6%' : 0;
    const enterDuration = $mounted
      ? cssVars.motion.duration.md
      : cssVars.motion.duration.instant;

    return {
      position: 'relative',
      display: 'inline-flex',
      flex: 'none',
      verticalAlign: 'middle',
      isolation: 'isolate',
      '--badge-translate-inline': '50%',
      '--badge-translate-block': '-50%',

      '& .MuiBadge-badge.bw-badge-indicator': {
        boxSizing: 'border-box',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        blockSize: indicatorSize,
        minInlineSize: indicatorSize,
        paddingInline: isCount ? cssVars.spacing.xs : 0,
        borderRadius: cssVars.radius.full,
        backgroundColor: colors.background,
        color: $badgeVariant === 'check' ? colors.icon : colors.foreground,
        fontSize:
          $badgeVariant === 'check' ? cssVars.size.icon.sm : undefined,
        fontVariantNumeric: isCount ? 'tabular-nums' : undefined,
        whiteSpace: isCount ? 'nowrap' : undefined,
        pointerEvents: 'none',
        zIndex: cssVars.layer.raised,
        top: 'unset',
        right: 'unset',
        bottom: 'unset',
        left: 'unset',
        insetBlockStart: $anchored ? placement : 'unset',
        insetInlineEnd: $anchored ? placement : 'unset',
        position: $anchored ? 'absolute' : 'static',
        transform: $anchored
          ? 'translate(var(--badge-translate-inline), var(--badge-translate-block)) scale(1)'
          : 'none',
        transformOrigin: 'center',
        transitionProperty: 'transform',
        transitionDuration: enterDuration,
        transitionTimingFunction:
          cssVars.motion.easing['standard-decelerate'],
        boxShadow: $anchored
          ? `0 0 0 ${cssVars.border.width.strong} ${cssVars.color.border.inverse}`
          : 'none',
      },

      '& .MuiBadge-badge.bw-badge-indicator.MuiBadge-invisible': {
        transform: $anchored
          ? 'translate(var(--badge-translate-inline), var(--badge-translate-block)) scale(0)'
          : 'scale(0)',
        transitionDuration: $mounted
          ? cssVars.motion.duration.sm
          : cssVars.motion.duration.instant,
        transitionTimingFunction:
          cssVars.motion.easing['standard-accelerate'],
      },

      "[dir='rtl'] &": {
        '--badge-translate-inline': '-50%',
      },
    };
  },
);

function effectiveColor(
  variant: BadgeVariant,
  color: BadgeColor | undefined,
): BadgeColor {
  const requested = color ?? (variant === 'check' ? 'success' : 'error');

  if (variant === 'check' && (requested === 'error' || requested === 'warning')) {
    return 'success';
  }

  if (variant === 'dot' && requested === 'warning') {
    return 'error';
  }

  return requested;
}

/** A non-interactive count, dot or check indicator for an anchor or inline use. */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    variant = 'count',
    count,
    max = 99,
    showZero = false,
    color,
    overlap,
    invisible = false,
    label,
    children,
    className,
    ...rest
  },
  ref,
) {
  const descriptionId = React.useId();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const anchored = children != null;
  const resolvedOverlap = anchored ? overlap ?? 'rectangular' : 'rectangular';
  const normalizedCount =
    count == null ? 0 : Math.max(0, Math.floor(count));
  const normalizedMax = max < 1 ? 1 : max;
  const hiddenByCount =
    variant === 'count' && normalizedCount === 0 && !showZero;
  const hidden = invisible || hiddenByCount;
  const resolvedColor = effectiveColor(variant, color);

  if (variant === 'count' && count == null) {
    warnOnce(
      'badge-count-missing',
      'Badge: `variant="count"` needs `count`; rendering hidden.',
    );
  }

  if (count != null && (count < 0 || !Number.isInteger(count))) {
    warnOnce(
      'badge-count-invalid',
      'Badge: `count` must be a non-negative integer; normalizing it.',
    );
  }

  if (max < 1) {
    warnOnce('badge-max-invalid', 'Badge: `max` must be at least 1; using 1.');
  }

  if (variant !== 'count' && count != null) {
    warnOnce(
      'badge-count-ignored',
      'Badge: `count` is ignored for dot and check variants.',
    );
  }

  if (variant === 'check' && (color === 'error' || color === 'warning')) {
    warnOnce(
      'badge-check-color',
      'Badge: check badges cannot use error or warning; using success.',
    );
  }

  if (variant === 'dot' && color === 'warning') {
    warnOnce(
      'badge-dot-warning',
      'Badge: dot badges cannot use warning; using error.',
    );
  }

  if (!hidden && (label == null || label === '')) {
    warnOnce('badge-label-missing', 'Badge: badges need a label');
  }

  if (!anchored && overlap != null) {
    warnOnce(
      'badge-overlap-standalone',
      'Badge: `overlap` is ignored without `children`.',
    );
  }

  const displayedCount =
    normalizedCount > normalizedMax
      ? `${normalizedMax}+`
      : normalizedCount;
  const badgeContent =
    variant === 'count' ? (
      <bdi className="bw-badge-count" dir="ltr">
        {displayedCount}
      </bdi>
    ) : variant === 'check' ? (
      <Icon className="bw-badge-check-icon" name="check" />
    ) : undefined;

  let anchor = children;
  if (children && !hidden && label) {
    const describedBy = [children.props['aria-describedby'], descriptionId]
      .filter(Boolean)
      .join(' ');
    anchor = React.cloneElement(children, { 'aria-describedby': describedBy });
  }

  const classes = ['bw-badge', !anchored ? 'bw-badge-standalone' : '', className]
    .filter(Boolean)
    .join(' ');
  const badgeClasses = [
    'bw-badge-indicator',
    variant === 'count' ? 'bw-text-data-sm' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <StyledBadge
      {...rest}
      ref={ref}
      className={classes}
      variant={variant === 'dot' ? 'dot' : 'standard'}
      badgeContent={badgeContent}
      max={normalizedMax}
      showZero={showZero}
      invisible={hidden}
      overlap={resolvedOverlap}
      slotProps={{
        badge: {
          'aria-hidden': true,
          className: badgeClasses,
        },
      }}
      role={!anchored && !hidden && label ? 'img' : undefined}
      aria-label={!anchored && !hidden && label ? label : undefined}
      $badgeVariant={variant}
      $badgeColor={resolvedColor}
      $anchored={anchored}
      $overlap={resolvedOverlap}
      $mounted={mounted}
    >
      {anchor}
      {anchored && !hidden && label ? (
        <span id={descriptionId} style={visuallyHidden}>
          {label}
        </span>
      ) : null}
    </StyledBadge>
  );
});

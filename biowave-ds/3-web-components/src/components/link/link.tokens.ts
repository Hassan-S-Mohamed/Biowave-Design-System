import { biowaveVariants, cssVars } from '@biowave/foundations';

export type LinkColor = 'brand' | 'neutral' | 'inverse';
export type LinkSize = 'inherit' | 'sm' | 'md' | 'lg';
export type LinkUnderline = 'always' | 'hover';

export interface LinkVisualTokens {
  default: string;
  hover: string;
  pressed: string;
  visited?: string;
  disabled: string;
}

const disabledColor = cssVars.color.text.neutral.disabled;

export const linkColorTokens = {
  brand: {
    default: cssVars.color.link.default,
    hover: cssVars.color.link.hover,
    pressed: cssVars.color.link.pressed,
    visited: cssVars.color.link.visited,
    disabled: disabledColor,
  },
  neutral: {
    default: cssVars.color.text.neutral.default,
    hover: cssVars.color.text.neutral.default,
    pressed: cssVars.color.text.neutral.default,
    disabled: disabledColor,
  },
  inverse: {
    default: cssVars.color.text.neutral.inverse,
    hover: cssVars.color.text.neutral.inverse,
    pressed: cssVars.color.text.neutral.inverse,
    disabled: disabledColor,
  },
} as const satisfies Record<LinkColor, LinkVisualTokens>;

export const linkSizeTokens = {
  inherit: {
    typography: { font: 'inherit' },
    icon: '1em',
  },
  sm: {
    typography: biowaveVariants.actionSm,
    icon: cssVars.size.icon.sm,
  },
  md: {
    typography: biowaveVariants.actionMd,
    icon: cssVars.size.icon.sm,
  },
  lg: {
    typography: biowaveVariants.actionLg,
    icon: cssVars.size.icon.md,
  },
} as const satisfies Record<LinkSize, { typography: object; icon: string }>;

export const linkLayoutTokens = {
  gap: cssVars.spacing.xs,
  targetMin: cssVars.target.min,
  radius: cssVars.radius.xs,
} as const;

export const linkUnderlineTokens = {
  defaultWidth: cssVars.border.width.default,
  strongWidth: cssVars.border.width.strong,
  offset: cssVars.spacing.xxs,
} as const;

export const linkFocusTokens = {
  default: cssVars.color.border.focus,
  inverse: cssVars.color.border.inverse,
  width: cssVars.border.width.focus,
  offset: cssVars.border.focus.offset,
} as const;

export const linkMotionTokens = {
  defaultDuration: cssVars.motion.duration.sm,
  pressedDuration: cssVars.motion.duration.xs,
  instantDuration: cssVars.motion.duration.instant,
  easing: cssVars.motion.easing.standard,
} as const;

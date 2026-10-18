import { biowaveVariants, cssVars } from '@biowave/foundations';

export type ButtonVariant = 'filled' | 'tonal' | 'outlined' | 'text';
export type ButtonColor = 'brand' | 'secondary' | 'neutral' | 'error' | 'inverse';
export type ButtonSize = 'sm' | 'md' | 'lg';

type TonalColor = Exclude<ButtonColor, 'neutral' | 'inverse'>;

export interface ButtonVisualTokens {
  bg: string;
  bgHover?: string;
  bgPressed?: string;
  bgDisabled: string;
  stateLayer?: {
    hover: string;
    pressed: string;
  };
  border?: {
    default: string;
    disabled: string;
  };
  label: {
    default: string;
    disabled: string;
  };
  icon: {
    default: string;
    disabled: string;
  };
}

const disabledBackground = cssVars.color.background.neutral.disabled;
const transparentBackground = cssVars.color.background.transparent;
const disabledLabel = cssVars.color.text.neutral.disabled;
const disabledIcon = cssVars.color.icon.neutral.disabled;
const disabledBorder = cssVars.color.border.disabled;
const stateLayer = {
  hover: cssVars.color.overlay.hover,
  pressed: cssVars.color.overlay.pressed,
} as const;

function filled(
  bg: string,
  bgHover: string,
  bgPressed: string,
  label: string,
  icon: string,
): ButtonVisualTokens {
  return {
    bg,
    bgHover,
    bgPressed,
    bgDisabled: disabledBackground,
    label: { default: label, disabled: disabledLabel },
    icon: { default: icon, disabled: disabledIcon },
  };
}

function layered(
  bg: string,
  bgDisabled: string,
  label: string,
  icon: string,
  border?: string,
): ButtonVisualTokens {
  return {
    bg,
    bgDisabled,
    stateLayer,
    ...(border ? { border: { default: border, disabled: disabledBorder } } : {}),
    label: { default: label, disabled: disabledLabel },
    icon: { default: icon, disabled: disabledIcon },
  };
}

export const buttonTokens = {
  filled: {
    brand: filled(
      cssVars.color.background.brand.default,
      cssVars.color.background.brand.hover,
      cssVars.color.background.brand.pressed,
      cssVars.color.text.on.brand,
      cssVars.color.icon.on.brand,
    ),
    secondary: filled(
      cssVars.color.background.secondary.default,
      cssVars.color.background.secondary.hover,
      cssVars.color.background.secondary.pressed,
      cssVars.color.text.on.secondary,
      cssVars.color.icon.on.secondary,
    ),
    neutral: filled(
      cssVars.color.background.neutral.default,
      cssVars.color.background.neutral.hover,
      cssVars.color.background.neutral.pressed,
      cssVars.color.text.neutral.default,
      cssVars.color.icon.neutral.default,
    ),
    error: filled(
      cssVars.color.background.error.default,
      cssVars.color.background.error.hover,
      cssVars.color.background.error.pressed,
      cssVars.color.text.on.error,
      cssVars.color.icon.on.error,
    ),
    inverse: filled(
      cssVars.color.background.inverse.default,
      cssVars.color.background.inverse.hover,
      cssVars.color.background.inverse.pressed,
      cssVars.color.text.role.brand,
      cssVars.color.icon.role.brand,
    ),
  },
  tonal: {
    brand: layered(
      cssVars.color.background.brand.subtle,
      disabledBackground,
      cssVars.color.text.role.brand,
      cssVars.color.icon.role.brand,
    ),
    secondary: layered(
      cssVars.color.background.secondary.subtle,
      disabledBackground,
      cssVars.color.text.role.secondary,
      cssVars.color.icon.role.secondary,
    ),
    error: layered(
      cssVars.color.background.error.subtle,
      disabledBackground,
      cssVars.color.text.role.error,
      cssVars.color.icon.role.error,
    ),
  },
  outlined: {
    brand: layered(
      transparentBackground,
      transparentBackground,
      cssVars.color.text.role.brand,
      cssVars.color.icon.role.brand,
      cssVars.color.border.brand,
    ),
    secondary: layered(
      transparentBackground,
      transparentBackground,
      cssVars.color.text.role.secondary,
      cssVars.color.icon.role.secondary,
      cssVars.color.border.secondary,
    ),
    neutral: layered(
      transparentBackground,
      transparentBackground,
      cssVars.color.text.neutral.default,
      cssVars.color.icon.neutral.default,
      cssVars.color.border.strong,
    ),
    error: layered(
      transparentBackground,
      transparentBackground,
      cssVars.color.text.role.error,
      cssVars.color.icon.role.error,
      cssVars.color.border.error,
    ),
    inverse: layered(
      transparentBackground,
      transparentBackground,
      cssVars.color.text.on.brand,
      cssVars.color.icon.on.brand,
      cssVars.color.border.inverse,
    ),
  },
  text: {
    brand: layered(
      transparentBackground,
      transparentBackground,
      cssVars.color.text.role.brand,
      cssVars.color.icon.role.brand,
    ),
    secondary: layered(
      transparentBackground,
      transparentBackground,
      cssVars.color.text.role.secondary,
      cssVars.color.icon.role.secondary,
    ),
    neutral: layered(
      transparentBackground,
      transparentBackground,
      cssVars.color.text.neutral.default,
      cssVars.color.icon.neutral.default,
    ),
    error: layered(
      transparentBackground,
      transparentBackground,
      cssVars.color.text.role.error,
      cssVars.color.icon.role.error,
    ),
    inverse: layered(
      transparentBackground,
      transparentBackground,
      cssVars.color.text.on.brand,
      cssVars.color.icon.on.brand,
    ),
  },
} as const satisfies {
  filled: Record<ButtonColor, ButtonVisualTokens>;
  tonal: Record<TonalColor, ButtonVisualTokens>;
  outlined: Record<ButtonColor, ButtonVisualTokens>;
  text: Record<ButtonColor, ButtonVisualTokens>;
};

export const buttonSizeTokens = {
  sm: {
    height: cssVars.size.control.height.sm,
    paddingInline: cssVars.spacing.control['padding-inline'].sm,
    gap: cssVars.spacing.control.gap.sm,
    icon: cssVars.size.icon.sm,
    radius: cssVars.radius.md,
    borderWidth: cssVars.border.width.default,
  },
  md: {
    height: cssVars.size.control.height.md,
    paddingInline: cssVars.spacing.control['padding-inline'].md,
    gap: cssVars.spacing.control.gap.md,
    icon: cssVars.size.icon.md,
    radius: cssVars.radius.md,
    borderWidth: cssVars.border.width.default,
  },
  lg: {
    height: cssVars.size.control.height.lg,
    paddingInline: cssVars.spacing.control['padding-inline'].lg,
    gap: cssVars.spacing.control.gap.lg,
    icon: cssVars.size.icon.lg,
    radius: cssVars.radius.md,
    borderWidth: cssVars.border.width.default,
  },
} as const satisfies Record<ButtonSize, object>;

export const buttonFocusTokens = {
  default: cssVars.color.border.focus,
  inverse: cssVars.color.border.inverse,
  width: cssVars.border.width.focus,
  offset: cssVars.border.focus.offset,
} as const;

export const buttonMotionTokens = {
  defaultDuration: cssVars.motion.duration.sm,
  pressedDuration: cssVars.motion.duration.xs,
  instantDuration: cssVars.motion.duration.instant,
  loadingDuration: cssVars.motion.duration.sm,
  standardEasing: cssVars.motion.easing.standard,
  linearEasing: cssVars.motion.easing.linear,
  spinnerDuration: cssVars.motion.duration.progress,
} as const;

export const buttonTypographyTokens = {
  sm: biowaveVariants.actionSm,
  md: biowaveVariants.actionMd,
  lg: biowaveVariants.actionLg,
} as const;

export const buttonElevationToken = cssVars.elevation['0'];

export function resolveButtonTokens(
  variant: ButtonVariant,
  color: ButtonColor,
): ButtonVisualTokens {
  if (variant === 'tonal') return buttonTokens.tonal[color as TonalColor];
  return buttonTokens[variant][color];
}

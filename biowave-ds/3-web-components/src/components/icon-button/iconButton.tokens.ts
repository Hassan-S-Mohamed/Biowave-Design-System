import { base, cssVars } from '@biowave/foundations';
import type { ButtonColor, ButtonVariant, ButtonVisualTokens } from '../button/button.tokens';

type ToggleVariant = Extract<ButtonVariant, 'outlined' | 'text'>;

const disabledBackground = cssVars.color.background.neutral.disabled;
const disabledBorder = cssVars.color.border.disabled;
const disabledIcon = cssVars.color.icon.neutral.disabled;
const stateLayer = {
  hover: cssVars.color.overlay.hover,
  pressed: cssVars.color.overlay.pressed,
} as const;

function selected(
  background: string,
  icon: string,
  border?: string,
): ButtonVisualTokens {
  return {
    bg: background,
    bgDisabled: disabledBackground,
    stateLayer,
    ...(border
      ? { border: { default: border, disabled: disabledBorder } }
      : {}),
    label: { default: icon, disabled: disabledIcon },
    icon: { default: icon, disabled: disabledIcon },
  };
}

const selectedBackgrounds = {
  brand: cssVars.color.background.brand.subtle,
  secondary: cssVars.color.background.secondary.subtle,
  neutral: cssVars.color.background.neutral.default,
  error: cssVars.color.background.error.subtle,
  inverse: cssVars.color.background.inverse.default,
} as const;

const selectedIcons = {
  brand: cssVars.color.icon.role.brand,
  secondary: cssVars.color.icon.role.secondary,
  neutral: cssVars.color.icon.neutral.default,
  error: cssVars.color.icon.role.error,
  inverse: cssVars.color.icon.role.brand,
} as const;

const selectedBorders = {
  brand: cssVars.color.border.brand,
  secondary: cssVars.color.border.secondary,
  neutral: cssVars.color.border.strong,
  error: cssVars.color.border.error,
  inverse: cssVars.color.border.inverse,
} as const;

export const iconButtonSelectedTokens = {
  text: {
    brand: selected(selectedBackgrounds.brand, selectedIcons.brand),
    secondary: selected(selectedBackgrounds.secondary, selectedIcons.secondary),
    neutral: selected(selectedBackgrounds.neutral, selectedIcons.neutral),
    error: selected(selectedBackgrounds.error, selectedIcons.error),
    inverse: selected(selectedBackgrounds.inverse, selectedIcons.inverse),
  },
  outlined: {
    brand: selected(selectedBackgrounds.brand, selectedIcons.brand, selectedBorders.brand),
    secondary: selected(
      selectedBackgrounds.secondary,
      selectedIcons.secondary,
      selectedBorders.secondary,
    ),
    neutral: selected(selectedBackgrounds.neutral, selectedIcons.neutral, selectedBorders.neutral),
    error: selected(selectedBackgrounds.error, selectedIcons.error, selectedBorders.error),
    inverse: selected(
      selectedBackgrounds.inverse,
      selectedIcons.inverse,
      selectedBorders.inverse,
    ),
  },
} as const satisfies Record<ToggleVariant, Record<ButtonColor, ButtonVisualTokens>>;

export const iconButtonTooltipTokens = {
  background: cssVars.color.surface.inverse,
  color: cssVars.color.text.neutral.inverse,
  radius: cssVars.radius.sm,
  paddingBlock: cssVars.spacing.xs,
  paddingInline: cssVars.spacing.md,
  offset: base.spacing.xs,
  enterEasing: cssVars.motion.easing['standard-decelerate'],
  exitEasing: cssVars.motion.easing['standard-accelerate'],
} as const;

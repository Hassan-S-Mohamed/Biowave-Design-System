import { cssVars } from '@biowave/foundations';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
export type IconColor =
  | 'default'
  | 'subtle'
  | 'muted'
  | 'inverse'
  | 'brand'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

/** Component token map — must equal `icon.tokens.json` aliases. */
export const iconSizeTokens = {
  xs: cssVars.size.icon.xs,
  sm: cssVars.size.icon.sm,
  md: cssVars.size.icon.md,
  lg: cssVars.size.icon.lg,
  xl: cssVars.size.icon.xl,
  '2xl': cssVars.size.icon['2xl'],
  '3xl': cssVars.size.icon['3xl'],
} as const satisfies Record<IconSize, string>;

/** Component token map — must equal `icon.tokens.json` aliases. */
export const iconColorTokens = {
  default: cssVars.color.icon.neutral.default,
  subtle: cssVars.color.icon.neutral.subtle,
  muted: cssVars.color.icon.neutral.muted,
  inverse: cssVars.color.icon.neutral.inverse,
  brand: cssVars.color.icon.role.brand,
  secondary: cssVars.color.icon.role.secondary,
  success: cssVars.color.icon.role.success,
  warning: cssVars.color.icon.role.warning,
  error: cssVars.color.icon.role.error,
  info: cssVars.color.icon.role.info,
} as const satisfies Record<IconColor, string>;

export const iconStatusColors = ['success', 'warning', 'error', 'info'] as const satisfies ReadonlyArray<
  IconColor
>;

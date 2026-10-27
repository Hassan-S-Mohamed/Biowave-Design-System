import { biowaveVariants, cssVars } from '@biowave/foundations';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerEmphasis = 'subtle' | 'default' | 'strong';
export type DividerInset = 'none' | 'start' | 'both';

export const dividerTokens = {
  line: {
    subtle: {
      color: cssVars.color.border.subtle,
      width: cssVars.border.width.default,
    },
    default: {
      color: cssVars.color.border.default,
      width: cssVars.border.width.default,
    },
    strong: {
      color: cssVars.color.border.strong,
      width: cssVars.border.width.default,
    },
  },
  inset: {
    none: cssVars.spacing.none,
    start: cssVars.spacing.xl,
    both: cssVars.spacing.xl,
  },
  label: {
    typography: biowaveVariants.captionMd,
    color: cssVars.color.text.subtlest,
    gap: cssVars.spacing.md,
    minimumSegmentLength: cssVars.spacing.xl,
  },
} as const;

import { base, cssVars } from '@biowave/foundations';

export const tooltipTokens = {
  background: cssVars.color.surface.inverse,
  color: cssVars.color.text.neutral.inverse,
  radius: cssVars.radius.sm,
  paddingBlock: cssVars.spacing.xs,
  paddingInline: cssVars.spacing.md,
  maxWidth: cssVars.size.container.xxs,
  offset: cssVars.spacing.xs,
  viewportPadding: base.spacing.md,
  zIndex: cssVars.layer.tooltip,
  hoverDelay: base.motion.duration['2xl'],
  leaveDelay: base.motion.duration.instant,
  enterDuration: base.motion.duration.md,
  exitDuration: base.motion.duration.sm,
  instantDuration: base.motion.duration.instant,
  enterEasing: cssVars.motion.easing['standard-decelerate'],
  exitEasing: cssVars.motion.easing['standard-accelerate'],
} as const;

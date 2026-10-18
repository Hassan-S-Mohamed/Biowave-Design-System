import * as React from 'react';
import Fade from '@mui/material/Fade';
import MuiTooltip from '@mui/material/Tooltip';
import { base, biowaveVariants } from '@biowave/foundations';
import { iconButtonTooltipTokens } from './iconButton.tokens';

interface IconButtonTooltipProps {
  children: React.ReactElement;
  disabled: boolean;
  enabled: boolean;
  title: string;
}

// TODO(tooltip): replace this private wrapper with the shared Tooltip component.
export function IconButtonTooltip({ children, disabled, enabled, title }: IconButtonTooltipProps) {
  if (!enabled) return children;

  const anchor = disabled ? (
    <span className="bw-icon-button__tooltip-anchor">{children}</span>
  ) : children;

  return (
    <MuiTooltip
      title={title}
      describeChild={false}
      placement="top"
      enterDelay={base.motion.duration['2xl']}
      slots={{ transition: Fade }}
      slotProps={{
        popper: {
          modifiers: [
            {
              name: 'offset',
              options: { offset: [base.spacing.none, base.spacing.xs] },
            },
          ],
        },
        tooltip: {
          sx: {
            ...biowaveVariants.labelSm,
            backgroundColor: iconButtonTooltipTokens.background,
            color: iconButtonTooltipTokens.color,
            borderRadius: iconButtonTooltipTokens.radius,
            paddingBlock: iconButtonTooltipTokens.paddingBlock,
            paddingInline: iconButtonTooltipTokens.paddingInline,
          },
        },
        transition: {
          timeout: {
            enter: base.motion.duration.md,
            exit: base.motion.duration.sm,
          },
        },
      }}
    >
      {anchor}
    </MuiTooltip>
  );
}

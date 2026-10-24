import * as React from 'react';
import Fade, { type FadeProps } from '@mui/material/Fade';
import MuiTooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import { biowaveVariants, useBiowave } from '@biowave/foundations';
import { visuallyHidden } from '../../internal/visuallyHidden';
import { warnOnce } from '../../internal/warnOnce';
import { tooltipTokens } from './tooltip.tokens';

export type TooltipPlacement = 'top' | 'bottom' | 'start' | 'end';
export type TooltipPurpose = 'label' | 'description';

export interface TooltipProps {
  title: string;
  children: React.ReactElement;
  placement?: TooltipPlacement;
  purpose?: TooltipPurpose;
  open?: boolean;
  onOpen?: (event: React.SyntheticEvent) => void;
  onClose?: (event: React.SyntheticEvent | Event) => void;
}

interface TooltipChildProps {
  disabled?: boolean;
  onFocus?: React.FocusEventHandler<HTMLElement>;
  onBlur?: React.FocusEventHandler<HTMLElement>;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  title?: string;
}

const TooltipTransitionExitedContext = React.createContext<(() => void) | undefined>(undefined);

const TooltipFade = React.forwardRef<HTMLDivElement, FadeProps>(function TooltipFade(
  { onExited, ...props },
  ref,
) {
  const onBiowaveExited = React.useContext(TooltipTransitionExitedContext);
  return (
    <Fade
      {...props}
      ref={ref}
      onExited={(node) => {
        onExited?.(node);
        onBiowaveExited?.();
      }}
    />
  );
});

const physicalPlacements = {
  ltr: { top: 'top', bottom: 'bottom', start: 'left', end: 'right' },
  rtl: { top: 'top', bottom: 'bottom', start: 'right', end: 'left' },
} as const;

const oppositePlacements = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
} as const;

function mergeIds(current: string | undefined, added: string): string {
  return Array.from(new Set(`${current ?? ''} ${added}`.trim().split(/\s+/))).join(' ');
}

function hasAccessibleName(props: TooltipChildProps): boolean {
  return Boolean(props['aria-label']?.trim() || props['aria-labelledby']?.trim());
}

/** Plain-text Biowave tooltip with logical placement and explicit accessible purpose. */
export function Tooltip({
  title,
  children,
  placement = 'top',
  purpose = 'label',
  open: openProp,
  onOpen,
  onClose,
}: TooltipProps) {
  const { direction } = useBiowave();
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const descriptionId = React.useId();
  const [internalOpen, setInternalOpen] = React.useState(false);
  const controlled = openProp !== undefined;
  const open = controlled ? openProp : internalOpen;
  const tooltipExited = React.useRef(!open);
  const [, refreshDescriptionCopy] = React.useReducer((value: boolean) => !value, false);
  if (open) tooltipExited.current = false;
  const child = children as React.ReactElement<TooltipChildProps>;
  const childIsNamed = hasAccessibleName(child.props);
  const disabled = child.props.disabled === true;
  const physicalPlacement = physicalPlacements[direction][placement];

  const requestOpen = React.useCallback(
    (event: React.SyntheticEvent) => {
      if (!controlled) setInternalOpen(true);
      if (!open) onOpen?.(event);
    },
    [controlled, onOpen, open],
  );

  const requestClose = React.useCallback(
    (event: React.SyntheticEvent | Event) => {
      if (!controlled) setInternalOpen(false);
      if (open) onClose?.(event);
    },
    [controlled, onClose, open],
  );
  const handleTooltipExited = React.useCallback(() => {
    tooltipExited.current = true;
    if (purpose === 'description') refreshDescriptionCopy();
  }, [purpose]);

  if (title.trim().length === 0) {
    warnOnce('tooltip-empty-title', 'Tooltip needs text');
    return children;
  }

  if (purpose === 'label' && childIsNamed) {
    warnOnce(
      'tooltip-label-on-named-element',
      'Tooltip purpose label on a named element — use description',
    );
  }

  const accessibleChild = React.cloneElement(child, {
    title: undefined,
    ...(purpose === 'description'
      ? {
          'aria-describedby': mergeIds(child.props['aria-describedby'], descriptionId),
        }
      : disabled && !childIsNamed
        ? { 'aria-label': title }
        : {}),
    onFocus: (event: React.FocusEvent<HTMLElement>) => {
      child.props.onFocus?.(event);
      if (event.currentTarget.matches(':focus-visible')) requestOpen(event);
    },
    onBlur: (event: React.FocusEvent<HTMLElement>) => {
      child.props.onBlur?.(event);
      requestClose(event);
    },
  });

  const anchor = disabled ? (
    <span
      className="bw-tooltip__anchor"
      aria-label={undefined}
      aria-describedby={undefined}
      title={undefined}
    >
      {accessibleChild}
    </span>
  ) : accessibleChild;
  return (
    <>
      <TooltipTransitionExitedContext.Provider value={handleTooltipExited}>
        <MuiTooltip
          id={descriptionId}
          title={title}
          describeChild={purpose === 'description' || childIsNamed}
          disableFocusListener
          open={open}
          onOpen={requestOpen}
          onClose={requestClose}
          placement={physicalPlacement}
          enterDelay={tooltipTokens.hoverDelay}
          enterNextDelay={tooltipTokens.hoverDelay}
          leaveDelay={tooltipTokens.leaveDelay}
          slots={{ transition: TooltipFade }}
          slotProps={{
            popper: {
              sx: { zIndex: tooltipTokens.zIndex },
              modifiers: [
                {
                  name: 'preventOverflow',
                  options: { padding: tooltipTokens.viewportPadding },
                },
                {
                  name: 'flip',
                  options: {
                    fallbackPlacements: [oppositePlacements[physicalPlacement]],
                  },
                },
              ],
            },
            tooltip: {
              className: 'bw-tooltip__container bw-tooltip__label',
              sx: {
                ...biowaveVariants.labelSm,
                backgroundColor: tooltipTokens.background,
                color: tooltipTokens.color,
                borderRadius: tooltipTokens.radius,
                paddingBlock: tooltipTokens.paddingBlock,
                paddingInline: tooltipTokens.paddingInline,
                maxWidth: tooltipTokens.maxWidth,
                margin: '0',
                '.MuiTooltip-popper[data-popper-placement*="top"] &': {
                  margin: '0',
                  marginBlockEnd: tooltipTokens.offset,
                },
                '.MuiTooltip-popper[data-popper-placement*="bottom"] &': {
                  margin: '0',
                  marginBlockStart: tooltipTokens.offset,
                },
                '.MuiTooltip-popper[data-popper-placement*="left"] &':
                  direction === 'rtl'
                    ? { margin: '0', marginInlineStart: tooltipTokens.offset }
                    : { margin: '0', marginInlineEnd: tooltipTokens.offset },
                '.MuiTooltip-popper[data-popper-placement*="right"] &':
                  direction === 'rtl'
                    ? { margin: '0', marginInlineEnd: tooltipTokens.offset }
                    : { margin: '0', marginInlineStart: tooltipTokens.offset },
                border: 'none',
                boxShadow: 'none',
                textAlign: 'start',
                whiteSpace: 'normal',
                overflowWrap: 'break-word',
              },
            },
            transition: {
              easing: {
                enter: tooltipTokens.enterEasing,
                exit: tooltipTokens.exitEasing,
              },
              timeout: {
                enter: prefersReducedMotion
                  ? tooltipTokens.instantDuration
                  : tooltipTokens.enterDuration,
                exit: prefersReducedMotion
                  ? tooltipTokens.instantDuration
                  : tooltipTokens.exitDuration,
              },
            },
          }}
        >
          {anchor}
        </MuiTooltip>
      </TooltipTransitionExitedContext.Provider>
      {purpose === 'description' && !open && tooltipExited.current ? (
        <span id={descriptionId} style={visuallyHidden}>
          {title}
        </span>
      ) : null}
    </>
  );
}

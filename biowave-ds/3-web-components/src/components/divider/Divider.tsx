import * as React from 'react';
import MuiDivider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import { warnOnce } from '../../internal/warnOnce';
import {
  dividerTokens,
  type DividerEmphasis,
  type DividerInset,
  type DividerOrientation,
} from './divider.tokens';

export type { DividerEmphasis, DividerInset, DividerOrientation } from './divider.tokens';

export type DividerComponent = 'hr' | 'li';

export interface DividerProps {
  orientation?: DividerOrientation;
  emphasis?: DividerEmphasis;
  inset?: DividerInset;
  decorative?: boolean;
  showLabel?: boolean;
  label?: string;
  component?: DividerComponent;
  className?: string;
  [dataAttribute: `data-${string}`]: unknown;
}

interface DividerRootProps {
  $orientation: DividerOrientation;
  $emphasis: DividerEmphasis;
  $inset: DividerInset;
  $labelled: boolean;
}

const DividerRoot = styled(MuiDivider, {
  shouldForwardProp: (prop) =>
    prop !== '$orientation' &&
    prop !== '$emphasis' &&
    prop !== '$inset' &&
    prop !== '$labelled',
})<DividerRootProps>(({ $orientation, $emphasis, $inset, $labelled }) => {
  const line = dividerTokens.line[$emphasis];
  const inset =
    $inset === 'start'
      ? { marginInlineStart: dividerTokens.inset.start }
      : $inset === 'both'
        ? $orientation === 'horizontal'
          ? { marginInline: dividerTokens.inset.both }
          : { marginBlock: dividerTokens.inset.both }
        : {};

  return {
    boxSizing: 'border-box',
    display: $labelled ? 'flex' : 'block',
    flexShrink: 0,
    inlineSize: $orientation === 'horizontal' ? 'auto' : undefined,
    blockSize: $orientation === 'vertical' ? 'auto' : undefined,
    alignSelf: $orientation === 'vertical' ? 'stretch' : undefined,
    listStyle: 'none',
    margin: dividerTokens.inset.none,
    padding: dividerTokens.inset.none,
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: line.color,
    borderBlockEndWidth:
      $orientation === 'horizontal' && !$labelled ? line.width : undefined,
    borderInlineEndWidth: $orientation === 'vertical' ? line.width : undefined,
    ...inset,
    ...($labelled
      ? {
          alignItems: 'center',
          '&::before, &::after': {
            flex: `1 0 ${dividerTokens.label.minimumSegmentLength}`,
            width: 'auto',
            borderWidth: 0,
            borderStyle: 'solid',
            borderColor: line.color,
            borderBlockEndWidth: line.width,
          },
          '& .MuiDivider-wrapper': {
            ...dividerTokens.label.typography,
            color: dividerTokens.label.color,
            paddingInline: dividerTokens.label.gap,
            paddingBlock: 0,
            textAlign: 'center',
            flex: '0 1 auto',
            whiteSpace: 'normal',
          },
        }
      : {}),
  };
});

type DividerElement = HTMLHRElement | HTMLDivElement | HTMLLIElement;
type DividerRootWithComponentProps = Omit<
  React.ComponentProps<typeof DividerRoot>,
  'ref'
> & {
  component: 'hr' | 'div' | 'li';
  ref?: React.ForwardedRef<DividerElement>;
};
const DividerRootWithComponent = DividerRoot as React.ComponentType<DividerRootWithComponentProps>;

export const Divider = React.forwardRef<DividerElement, DividerProps>(function Divider(
  {
    orientation = 'horizontal',
    emphasis = 'default',
    inset = 'none',
    decorative = false,
    showLabel = false,
    label,
    component = 'hr',
    className,
    ...rest
  },
  ref,
) {
  const hasLabelText = typeof label === 'string' && label.trim().length > 0;

  if (orientation === 'vertical' && inset === 'start') {
    warnOnce(
      'divider-vertical-inset-start',
      'Divider: inset start is for horizontal dividers only',
    );
  }
  if (orientation === 'vertical' && showLabel) {
    warnOnce(
      'divider-vertical-label',
      'Divider: label is for horizontal dividers only',
    );
  }
  if (showLabel && !hasLabelText) {
    warnOnce('divider-label-required', 'Divider: showLabel needs a label');
  }

  const effectiveInset = orientation === 'vertical' && inset === 'start' ? 'none' : inset;
  const labelled = orientation === 'horizontal' && showLabel && hasLabelText;
  const hidden = component === 'li' || decorative;
  const rootComponent = component === 'li' ? 'li' : labelled ? 'div' : 'hr';
  const rootClassName = ['bw-divider__container', className].filter(Boolean).join(' ');

  return (
    <DividerRootWithComponent
      {...rest}
      ref={ref}
      component={rootComponent}
      orientation={orientation}
      flexItem={orientation === 'vertical'}
      role={rootComponent === 'hr' ? undefined : 'separator'}
      aria-hidden={hidden || undefined}
      aria-orientation={!hidden && orientation === 'vertical' ? 'vertical' : undefined}
      aria-label={!hidden && labelled ? label : undefined}
      className={rootClassName}
      $orientation={orientation}
      $emphasis={emphasis}
      $inset={effectiveInset}
      $labelled={labelled}
    >
      {labelled ? label : undefined}
    </DividerRootWithComponent>
  );
});

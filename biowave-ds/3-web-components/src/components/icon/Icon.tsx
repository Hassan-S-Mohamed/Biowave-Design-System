import * as React from 'react';
import MuiIcon from '@mui/material/Icon';
import { styled } from '@mui/material/styles';
import { type MaterialSymbol } from '@biowave/foundations';
import { warnOnce } from '../../internal/warnOnce';
import {
  iconColorTokens,
  iconSizeTokens,
  iconStatusColors,
  type IconColor,
  type IconSize,
} from './icon.tokens';

export type { IconColor, IconSize };
export type { MaterialSymbol };

/**
 * Closed list of spec / Figma glyph names Biowave uses that
 * `@material-symbols/font-400` typings omit, plus `''` for the empty-name
 * fallback (B1).
 */
export type IconName = MaterialSymbol | 'push_pin' | 'expand_more' | '';

export interface IconProps extends React.AriaAttributes {
  name: IconName;
  size?: IconSize;
  filled?: boolean;
  color?: IconColor;
  /**
   * Adds `bw-icon-directional` so the icon mirrors in RTL. Inside `Button` and
   * `IconButton`, `prepareIcon` strips `directional`, `mirrorInRtl` and the
   * `bw-icon-directional` class from the cloned icon and puts
   * `bw-icon-directional` on its wrapper once (B5).
   */
  directional?: boolean;
  label?: string;
  className?: string;
  [dataAttribute: `data-${string}`]: unknown;
}

interface IconRootProps {
  $color?: IconColor;
  $size?: IconSize;
}

const IconRoot = styled(MuiIcon, {
  shouldForwardProp: (prop) => prop !== '$color' && prop !== '$size',
})<IconRootProps>(({ $color, $size }) => {
  const boxSize = $size ? iconSizeTokens[$size] : '1em';

  return {
    display: 'inline-flex',
    flex: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    inlineSize: boxSize,
    blockSize: boxSize,
    fontSize: $size ? iconSizeTokens[$size] : 'inherit',
    lineHeight: 1,
    overflow: 'hidden',
    userSelect: 'none',
    verticalAlign: 'middle',
    color: $color ? iconColorTokens[$color] : 'currentColor',

    "[dir='rtl'] &.bw-icon-directional": {
      transform: 'scaleX(-1)',
    },
  };
});

/**
 * Biowave Material Symbols Rounded glyph (D-18). Pass `directional` so the
 * icon mirrors in RTL; inside `Button` and `IconButton`, `prepareIcon` strips
 * the `directional` prop, `mirrorInRtl` and the `bw-icon-directional` class
 * from the cloned icon and puts `bw-icon-directional` on the wrapper once.
 */
export const Icon = React.forwardRef<HTMLSpanElement, IconProps>(function Icon(
  {
    name,
    size,
    filled = false,
    color,
    directional = false,
    label,
    className,
    ...rest
  },
  ref,
) {
  const isStatus =
    color != null && (iconStatusColors as ReadonlyArray<string>).includes(color);

  if (name === '') {
    warnOnce('icon-empty-name', 'Icon: `name` is empty; rendering an empty box.');
  }

  if (isStatus && label == null && size != null) {
    warnOnce(
      'icon-status-label',
      'Icon: status icons need text or a label',
    );
  }

  const classes = [
    'bw-icon',
    filled ? 'bw-icon-fill' : '',
    directional ? 'bw-icon-directional' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const labelled = label != null && label !== '';

  return (
    <IconRoot
      ref={ref}
      baseClassName="material-symbols-rounded"
      fontSize="inherit"
      className={classes}
      $color={color}
      $size={size}
      role={labelled ? 'img' : undefined}
      aria-label={labelled ? label : undefined}
      aria-hidden={labelled ? undefined : true}
      {...rest}
    >
      {name}
    </IconRoot>
  );
});

import * as React from 'react';
import MuiIconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { cssVars, useBiowave } from '@biowave/foundations';
import { visuallyHidden } from '../../internal/visuallyHidden';
import { warnOnce } from '../../internal/warnOnce';
import { ButtonSpinner } from '../button/ButtonSpinner';
import { useButtonGroupSize } from '../button-group/ButtonGroupContext';
import {
  buttonElevationToken,
  buttonFocusTokens,
  buttonMotionTokens,
  buttonSizeTokens,
  resolveButtonTokens,
  type ButtonColor,
  type ButtonSize,
  type ButtonVariant,
  type ButtonVisualTokens,
} from '../button/button.tokens';
import { IconButtonTooltip } from './IconButtonTooltip';
import { iconButtonSelectedTokens } from './iconButton.tokens';

export type IconButtonVariant = ButtonVariant;
export type IconButtonColor = ButtonColor;
export type IconButtonSize = ButtonSize;

export interface IconButtonProps extends React.AriaAttributes {
  icon: React.ReactNode;
  label: string;
  variant?: IconButtonVariant;
  color?: IconButtonColor;
  size?: IconButtonSize;
  toggle?: boolean;
  selected?: boolean;
  selectedIcon?: React.ReactNode;
  tooltip?: boolean;
  loading?: boolean;
  loadingLabel?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  [dataAttribute: `data-${string}`]: unknown;
}

interface IconButtonInternalProps extends IconButtonProps {
  /** @internal Used only when IconButton is composed inside SplitButton. */
  segment?: 'start' | 'end';
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
}

interface IconButtonRootProps {
  $color: IconButtonColor;
  $selected: boolean;
  $size: IconButtonSize;
  $segment?: 'start' | 'end';
  $variant: IconButtonVariant;
  $visual: ButtonVisualTokens;
}

function stateLayer(value: string | undefined): string {
  return value ? `linear-gradient(${value}, ${value})` : 'none';
}

const IconButtonRoot = styled(MuiIconButton, {
  shouldForwardProp: (prop) =>
    prop !== '$color' &&
    prop !== '$selected' &&
    prop !== '$size' &&
    prop !== '$segment' &&
    prop !== '$variant' &&
    prop !== '$visual',
})<IconButtonRootProps>(({ $color, $selected, $size, $segment, $visual }) => {
  const size = buttonSizeTokens[$size];
  const focusColor = $color === 'inverse' ? buttonFocusTokens.inverse : buttonFocusTokens.default;

  return {
    position: 'relative',
    display: 'inline-flex',
    inlineSize: size.height,
    blockSize: size.height,
    minInlineSize: size.height,
    padding: cssVars.spacing.none,
    borderRadius: $segment ? undefined : size.radius,
    borderStartStartRadius: $segment === 'end' ? cssVars.radius.xs : size.radius,
    borderEndStartRadius: $segment === 'end' ? cssVars.radius.xs : size.radius,
    borderStartEndRadius: $segment === 'start' ? cssVars.radius.xs : size.radius,
    borderEndEndRadius: $segment === 'start' ? cssVars.radius.xs : size.radius,
    borderWidth: $visual.border ? size.borderWidth : cssVars.border.width.none,
    borderStyle: $visual.border ? 'solid' : 'none',
    borderColor: $visual.border?.default,
    backgroundColor: $visual.bg,
    backgroundImage: 'none',
    color: $visual.icon.default,
    boxShadow: buttonElevationToken,
    overflow: 'hidden',
    transition: [
      `background-color ${buttonMotionTokens.defaultDuration} ${buttonMotionTokens.standardEasing}`,
      `background-image ${buttonMotionTokens.defaultDuration} ${buttonMotionTokens.standardEasing}`,
      `border-color ${buttonMotionTokens.defaultDuration} ${buttonMotionTokens.standardEasing}`,
      `color ${buttonMotionTokens.defaultDuration} ${buttonMotionTokens.standardEasing}`,
    ].join(', '),

    '&:hover:not(.Mui-disabled):not([aria-busy="true"])': {
      backgroundColor: $visual.bgHover ?? $visual.bg,
      backgroundImage: stateLayer($visual.stateLayer?.hover),
      borderColor: $visual.border?.default,
      boxShadow: buttonElevationToken,
    },
    '&:active:not(.Mui-disabled):not([aria-busy="true"])': {
      backgroundColor: $visual.bgPressed ?? $visual.bg,
      backgroundImage: stateLayer($visual.stateLayer?.pressed),
      transitionDuration: buttonMotionTokens.pressedDuration,
    },
    '&[aria-expanded="true"]:not(.Mui-disabled)': {
      backgroundColor: $visual.bgPressed ?? $visual.bg,
      backgroundImage: stateLayer($visual.stateLayer?.pressed),
    },
    '&:focus': {
      outline: 'none',
    },
    '&:focus-visible, &.Mui-focusVisible': {
      outline: `${buttonFocusTokens.width} solid ${focusColor}`,
      outlineOffset: buttonFocusTokens.offset,
    },
    '&.Mui-disabled': {
      backgroundColor: $visual.bgDisabled,
      backgroundImage: 'none',
      borderColor: $visual.border?.disabled,
      color: $visual.icon.disabled,
      boxShadow: buttonElevationToken,
      transitionDuration: buttonMotionTokens.instantDuration,
    },
    '& .bw-icon-button__icons': {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      inlineSize: size.icon,
      blockSize: size.icon,
      fontSize: size.icon,
      opacity: 1,
      transition: `opacity ${buttonMotionTokens.loadingDuration} ${buttonMotionTokens.linearEasing}`,
    },
    '&[aria-busy="true"] .bw-icon-button__icons': {
      opacity: 0,
    },
    '& .bw-icon-button__icon': {
      position: 'absolute',
      inset: cssVars.spacing.none,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      inlineSize: '100%',
      blockSize: '100%',
      opacity: 0,
      transition: `opacity ${buttonMotionTokens.defaultDuration} ${buttonMotionTokens.standardEasing}`,
    },
    '& .bw-icon-button__icon > *': {
      inlineSize: '100%',
      blockSize: '100%',
    },
    '& .bw-icon-button__icon--default': {
      opacity: $selected ? 0 : 1,
    },
    '& .bw-icon-button__icon--selected': {
      opacity: $selected ? 1 : 0,
    },
    "[dir='rtl'] & .bw-icon-button__icon.bw-icon-directional": {
      transform: 'scaleX(-1)',
    },
  };
});

interface PreparedIcon {
  className: string;
  icon: React.ReactNode;
}

type MarkableIconProps = { className?: string; mirrorInRtl?: boolean };

function prepareIcon(icon: React.ReactNode, modifier: string): PreparedIcon {
  if (!React.isValidElement<MarkableIconProps>(icon)) {
    return { icon, className: `bw-icon-button__icon ${modifier}` };
  }

  const classNames = icon.props.className?.split(/\s+/).filter(Boolean) ?? [];
  const directional =
    icon.props.mirrorInRtl === true || classNames.includes('bw-icon-directional');
  const cleanClassName = classNames
    .filter((className) => className !== 'bw-icon-directional')
    .join(' ');
  const { mirrorInRtl: _mirrorInRtl, ...cleanProps } = icon.props;
  const cleanIcon = _mirrorInRtl
    ? React.createElement(icon.type, {
        ...cleanProps,
        key: icon.key,
        className: cleanClassName || undefined,
      })
    : React.cloneElement(icon, { className: cleanClassName || undefined });

  return {
    icon: cleanIcon,
    className: [
      'bw-icon-button__icon',
      modifier,
      directional ? 'bw-icon-directional' : '',
    ].filter(Boolean).join(' '),
  };
}

function resolveIconButtonVisual(
  variant: IconButtonVariant,
  color: IconButtonColor,
  selected: boolean,
): ButtonVisualTokens {
  if (selected && (variant === 'text' || variant === 'outlined')) {
    return iconButtonSelectedTokens[variant][color];
  }
  return resolveButtonTokens(variant, color);
}

const IconButtonInternal = React.forwardRef<HTMLButtonElement, IconButtonInternalProps>(
  function IconButton(
    {
      icon,
      label,
      variant = 'text',
      color = 'neutral',
      size: sizeProp,
      segment,
      toggle = false,
      selected = false,
      selectedIcon,
      tooltip = true,
      loading = false,
      loadingLabel,
      disabled = false,
      type = 'button',
      onClick,
      ...rest
    },
    ref,
  ) {
    const { locale } = useBiowave();
    const groupSize = useButtonGroupSize();
    const size = groupSize ?? sizeProp ?? 'md';
    const effectiveVariant =
      variant === 'tonal' && (color === 'neutral' || color === 'inverse')
        ? 'outlined'
        : variant;
    const effectiveToggle = toggle && (effectiveVariant === 'text' || effectiveVariant === 'outlined');
    const effectiveSelected = effectiveToggle && selected;
    const visual = resolveIconButtonVisual(effectiveVariant, color, effectiveSelected);
    const effectiveLoadingLabel = loadingLabel ?? (locale === 'ar' ? 'جارٍ التحميل' : 'Loading');
    const preparedIcon = prepareIcon(icon, 'bw-icon-button__icon--default');
    const preparedSelectedIcon = prepareIcon(
      selectedIcon ?? icon,
      'bw-icon-button__icon--selected',
    );

    if (effectiveVariant !== variant) {
      warnOnce(
        `icon-button-tonal-${color}`,
        `IconButton: variant="tonal" does not support color="${color}"; falling back to variant="outlined".`,
      );
    }
    if (toggle && (variant === 'filled' || variant === 'tonal')) {
      warnOnce(
        `icon-button-toggle-${variant}`,
        `IconButton: toggle is not supported with variant="${variant}"; ignoring toggle state.`,
      );
    }
    if (toggle && !selectedIcon) {
      warnOnce(
        'icon-button-toggle-selected-icon',
        'IconButton: toggle needs selectedIcon; using icon for both states.',
      );
    }
    if (label.length === 0) {
      warnOnce('icon-button-label', 'IconButton needs a label');
    }

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
      if (loading || disabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };

    const control = (
      <IconButtonRoot
        {...rest}
        ref={ref}
        $color={color}
        $selected={effectiveSelected}
        $size={size}
        $segment={segment}
        $variant={effectiveVariant}
        $visual={visual}
        type={type}
        color="inherit"
        disableRipple
        disabled={disabled}
        aria-label={label}
        aria-pressed={effectiveToggle ? selected : undefined}
        aria-busy={loading || undefined}
        aria-disabled={loading || undefined}
        onClick={handleClick}
      >
        <span className="bw-icon-button__icons" aria-hidden="true">
          <span className={preparedIcon.className}>{preparedIcon.icon}</span>
          {effectiveToggle ? (
            <span className={preparedSelectedIcon.className}>{preparedSelectedIcon.icon}</span>
          ) : null}
        </span>
        <ButtonSpinner size={size} visible={loading} />
      </IconButtonRoot>
    );

    return (
      <>
        <IconButtonTooltip disabled={disabled} enabled={tooltip} title={label}>
          {control}
        </IconButtonTooltip>
        {loading ? (
          <span style={visuallyHidden} role="status">
            {effectiveLoadingLabel}
          </span>
        ) : null}
      </>
    );
  },
);

export const IconButton = IconButtonInternal as React.ForwardRefExoticComponent<
  React.PropsWithoutRef<IconButtonProps> & React.RefAttributes<HTMLButtonElement>
>;

/** @internal SplitButton composition primitive; not exported from the package. */
export const InternalIconButton = IconButtonInternal;

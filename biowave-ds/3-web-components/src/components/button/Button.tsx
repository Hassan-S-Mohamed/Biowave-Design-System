import * as React from 'react';
import MuiButton from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { cssVars, useBiowave } from '@biowave/foundations';
import { visuallyHidden } from '../../internal/visuallyHidden';
import { warnOnce } from '../../internal/warnOnce';
import { useButtonGroupSize } from '../button-group/ButtonGroupContext';
import { ButtonSpinner } from './ButtonSpinner';
import {
  buttonElevationToken,
  buttonFocusTokens,
  buttonMotionTokens,
  buttonSizeTokens,
  buttonTypographyTokens,
  resolveButtonTokens,
  type ButtonColor,
  type ButtonSize,
  type ButtonVariant,
} from './button.tokens';

export type { ButtonColor, ButtonSize, ButtonVariant } from './button.tokens';

/** Add to a custom icon's props to support Button's `mirrorInRtl` marker. */
export interface ButtonDirectionalIconProps {
  mirrorInRtl?: boolean;
}

export interface ButtonProps extends React.AriaAttributes {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
  loadingLabel?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  children: string;
  className?: string;
  [dataAttribute: `data-${string}`]: unknown;
}

interface ButtonInternalProps extends ButtonProps {
  /** @internal Used only when Button is composed inside SplitButton. */
  segment?: 'start' | 'end';
}

interface ButtonRootProps {
  $variant: ButtonVariant;
  $color: ButtonColor;
  $size: ButtonSize;
  $instantColorTransition: boolean;
  $segment?: 'start' | 'end';
}

function stateLayer(value: string | undefined): string {
  return value ? `linear-gradient(${value}, ${value})` : 'none';
}

const ButtonRoot = styled(MuiButton, {
  shouldForwardProp: (prop) =>
    prop !== '$variant' &&
    prop !== '$color' &&
    prop !== '$size' &&
    prop !== '$instantColorTransition' &&
    prop !== '$segment',
})<ButtonRootProps>(({ $variant, $color, $size, $instantColorTransition, $segment }) => {
  const visual = resolveButtonTokens($variant, $color);
  const size = buttonSizeTokens[$size];
  const focusColor = $color === 'inverse' ? buttonFocusTokens.inverse : buttonFocusTokens.default;

  return {
    ...buttonTypographyTokens[$size],
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    height: size.height,
    minWidth: 0,
    paddingInline: size.paddingInline,
    paddingBlock: 0,
    borderRadius: $segment ? undefined : size.radius,
    borderStartStartRadius: $segment === 'end' ? cssVars.radius.xs : size.radius,
    borderEndStartRadius: $segment === 'end' ? cssVars.radius.xs : size.radius,
    borderStartEndRadius: $segment === 'start' ? cssVars.radius.xs : size.radius,
    borderEndEndRadius: $segment === 'start' ? cssVars.radius.xs : size.radius,
    borderWidth: visual.border ? size.borderWidth : 0,
    borderStyle: visual.border ? 'solid' : 'none',
    borderColor: visual.border?.default,
    backgroundColor: visual.bg,
    backgroundImage: 'none',
    color: visual.label.default,
    boxShadow: buttonElevationToken,
    textTransform: 'none',
    overflow: 'hidden',
    transition: [
      `background-color ${buttonMotionTokens.defaultDuration} ${buttonMotionTokens.standardEasing}`,
      `background-image ${buttonMotionTokens.defaultDuration} ${buttonMotionTokens.standardEasing}`,
      `border-color ${buttonMotionTokens.defaultDuration} ${buttonMotionTokens.standardEasing}`,
      `color ${buttonMotionTokens.instantDuration} ${buttonMotionTokens.standardEasing}`,
    ].join(', '),
    transitionDuration: $instantColorTransition
      ? buttonMotionTokens.instantDuration
      : undefined,

    '&:hover:not(.Mui-disabled):not([aria-busy="true"])': {
      backgroundColor: visual.bgHover ?? visual.bg,
      backgroundImage: stateLayer(visual.stateLayer?.hover),
      borderColor: visual.border?.default,
      boxShadow: buttonElevationToken,
    },
    '&:active:not(.Mui-disabled):not([aria-busy="true"])': {
      backgroundColor: visual.bgPressed ?? visual.bg,
      backgroundImage: stateLayer(visual.stateLayer?.pressed),
      transitionDuration: buttonMotionTokens.pressedDuration,
    },
    '&:focus': {
      outline: 'none',
    },
    '&:focus-visible, &.Mui-focusVisible': {
      outline: `${buttonFocusTokens.width} solid ${focusColor}`,
      outlineOffset: buttonFocusTokens.offset,
    },
    '&.Mui-disabled': {
      backgroundColor: visual.bgDisabled,
      backgroundImage: 'none',
      borderColor: visual.border?.disabled,
      color: visual.label.disabled,
      boxShadow: buttonElevationToken,
      transitionDuration: buttonMotionTokens.instantDuration,
    },
    '& .bw-button__content': {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: size.gap,
      minInlineSize: 0,
      maxInlineSize: '100%',
      opacity: 1,
      transition: `opacity ${buttonMotionTokens.loadingDuration} ${buttonMotionTokens.linearEasing}`,
    },
    '&[aria-busy="true"] .bw-button__content': {
      opacity: 0,
    },
    '& .bw-button__label': {
      minInlineSize: 0,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    '& .bw-button__icon': {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none',
      inlineSize: size.icon,
      blockSize: size.icon,
      fontSize: size.icon,
      color: visual.icon.default,
    },
    '& .bw-button__icon > *': {
      inlineSize: '100%',
      blockSize: '100%',
    },
    '&.Mui-disabled .bw-button__icon': {
      color: visual.icon.disabled,
    },
    "[dir='rtl'] & .bw-button__icon.bw-icon-directional": {
      transform: 'scaleX(-1)',
    },
  };
});

interface PreparedIcon {
  icon: React.ReactNode;
  className: string;
}

type MarkableIconProps = ButtonDirectionalIconProps & {
  className?: string;
  directional?: boolean;
};

function prepareIcon(icon: React.ReactNode): PreparedIcon {
  if (!React.isValidElement<MarkableIconProps>(icon)) {
    return { icon, className: 'bw-button__icon' };
  }

  const classNames = icon.props.className?.split(/\s+/).filter(Boolean) ?? [];
  const directional =
    icon.props.directional === true ||
    icon.props.mirrorInRtl === true ||
    classNames.includes('bw-icon-directional');
  const cleanClassName = classNames
    .filter((className) => className !== 'bw-icon-directional')
    .join(' ');
  const {
    directional: _directional,
    mirrorInRtl: _mirrorInRtl,
    ...cleanProps
  } = icon.props;
  const cleanIcon =
    _directional !== undefined || _mirrorInRtl !== undefined
      ? React.createElement(icon.type, {
          ...cleanProps,
          key: icon.key,
          className: cleanClassName || undefined,
        })
      : React.cloneElement(icon, { className: cleanClassName || undefined });

  return {
    icon: cleanIcon,
    className: directional
      ? 'bw-button__icon bw-icon-directional'
      : 'bw-button__icon',
  };
}

/**
 * Biowave action button. Mark directional icons with `<Icon directional />`,
 * the `bw-icon-directional` class, or `ButtonDirectionalIconProps` (`mirrorInRtl`)
 * on a custom icon. Button removes the marker from the icon and mirrors its
 * wrapper once.
 */
const ButtonInternal = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonInternalProps>(
  function Button(
    {
      variant = 'filled',
      color = 'brand',
      size: sizeProp,
      segment,
      startIcon,
      endIcon,
      fullWidth = false,
      loading = false,
      loadingLabel,
      disabled = false,
      type = 'button',
      href,
      onClick,
      children,
      ...rest
    },
    ref,
  ) {
    const { locale } = useBiowave();
    const groupSize = useButtonGroupSize();
    const size = groupSize ?? sizeProp ?? 'md';
    const previouslyDisabled = React.useRef(disabled);
    const [, advanceTransitionFrame] = React.useState(0);
    const justReenabled = previouslyDisabled.current && !disabled;
    const effectiveVariant =
      variant === 'tonal' && (color === 'neutral' || color === 'inverse')
        ? 'outlined'
        : variant;
    const effectiveEndIcon = startIcon && endIcon ? undefined : endIcon;
    const effectiveLoadingLabel = loadingLabel ?? (locale === 'ar' ? 'جارٍ التحميل' : 'Loading');
    const preparedStartIcon = startIcon ? prepareIcon(startIcon) : undefined;
    const preparedEndIcon = effectiveEndIcon ? prepareIcon(effectiveEndIcon) : undefined;

    React.useLayoutEffect(() => {
      previouslyDisabled.current = disabled;
      if (!justReenabled) return undefined;

      const frame = window.requestAnimationFrame(() => {
        advanceTransitionFrame((value) => value + 1);
      });
      return () => window.cancelAnimationFrame(frame);
    }, [disabled, justReenabled]);

    if (effectiveVariant !== variant) {
      warnOnce(
        `button-tonal-${color}`,
        `Button: variant="tonal" does not support color="${color}"; falling back to variant="outlined".`,
      );
    }
    if (startIcon && endIcon) {
      warnOnce(
        'button-both-icons',
        'Button: startIcon and endIcon cannot be used together; rendering startIcon only.',
      );
    }
    if (typeof children !== 'string' || children.length === 0) {
      warnOnce('button-text-label', 'Button needs a text label — use IconButton');
    }

    const handleClick: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> = (event) => {
      if (loading || disabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };

    return (
      <>
        <ButtonRoot
          {...rest}
          ref={ref as React.Ref<HTMLButtonElement>}
          $variant={effectiveVariant}
          $color={color}
          $size={size}
          $segment={segment}
          $instantColorTransition={disabled || justReenabled}
          variant="text"
          color="inherit"
          fullWidth={fullWidth}
          disableRipple
          disableElevation
          href={href}
          type={href ? undefined : type}
          disabled={disabled}
          aria-busy={loading || undefined}
          aria-disabled={loading || (disabled && href ? true : undefined)}
          tabIndex={disabled && href ? -1 : undefined}
          onClick={handleClick}
        >
          <span className="bw-button__content">
            {preparedStartIcon ? (
              <span className={preparedStartIcon.className} aria-hidden="true">
                {preparedStartIcon.icon}
              </span>
            ) : null}
            <span className="bw-button__label">{children}</span>
            {preparedEndIcon ? (
              <span className={preparedEndIcon.className} aria-hidden="true">
                {preparedEndIcon.icon}
              </span>
            ) : null}
          </span>
          <ButtonSpinner size={size} visible={loading} />
        </ButtonRoot>
        {loading ? (
          <span style={visuallyHidden} role="status">
            {effectiveLoadingLabel}
          </span>
        ) : null}
      </>
    );
  },
);

export const Button = ButtonInternal as React.ForwardRefExoticComponent<
  React.PropsWithoutRef<ButtonProps> &
    React.RefAttributes<HTMLButtonElement | HTMLAnchorElement>
>;

/** @internal SplitButton composition primitive; not exported from the package. */
export const InternalButton = ButtonInternal;

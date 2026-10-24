import * as React from 'react';
import MuiLink, { type LinkProps as MuiLinkProps } from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import { useBiowave } from '@biowave/foundations';
import { visuallyHidden } from '../../internal/visuallyHidden';
import { warnOnce } from '../../internal/warnOnce';
import { Icon } from '../icon';
import {
  linkColorTokens,
  linkFocusTokens,
  linkLayoutTokens,
  linkMotionTokens,
  linkSizeTokens,
  linkUnderlineTokens,
  type LinkColor,
  type LinkSize,
  type LinkUnderline,
  type LinkVisualTokens,
} from './link.tokens';

export type { LinkColor, LinkSize, LinkUnderline } from './link.tokens';

interface LinkOwnProps extends React.AriaAttributes {
  href?: string;
  children: string;
  color?: LinkColor;
  size?: LinkSize;
  underline?: LinkUnderline;
  startIcon?: React.ReactNode;
  external?: boolean;
  externalLabel?: string;
  showVisited?: boolean;
  disabled?: boolean;
  component?: React.ElementType;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  className?: string;
  [dataAttribute: `data-${string}`]: unknown;
}

type UnsupportedMuiLinkProp =
  | 'children'
  | 'color'
  | 'underline'
  | 'variant'
  | 'sx'
  | 'target'
  | 'rel'
  | 'href'
  | 'onClick'
  | 'component';

export type LinkProps<RootComponent extends React.ElementType = 'a'> = Omit<
  MuiLinkProps<RootComponent, { component?: RootComponent }>,
  UnsupportedMuiLinkProp
> &
  Omit<LinkOwnProps, 'component'> & {
    component?: RootComponent;
  };

interface LinkRootProps {
  component?: React.ElementType;
  $color: LinkColor;
  $size: LinkSize;
  $underline: LinkUnderline;
  $showVisited: boolean;
  $instantTransition: boolean;
}

const LinkRoot = styled(MuiLink, {
  shouldForwardProp: (prop) =>
    prop !== '$color' &&
    prop !== '$size' &&
    prop !== '$underline' &&
    prop !== '$showVisited' &&
    prop !== '$instantTransition',
})<LinkRootProps>(({ $color, $size, $underline, $showVisited, $instantTransition }) => {
  const visual: LinkVisualTokens = linkColorTokens[$color];
  const size = linkSizeTokens[$size];
  const inline = $size === 'inherit';
  const focusColor = $color === 'inverse' ? linkFocusTokens.inverse : linkFocusTokens.default;

  return {
    ...size.typography,
    display: inline ? 'inline' : 'inline-flex',
    alignItems: inline ? undefined : 'center',
    gap: inline ? undefined : linkLayoutTokens.gap,
    minBlockSize: inline ? undefined : linkLayoutTokens.targetMin,
    maxInlineSize: inline ? undefined : '100%',
    padding: 0,
    border: 0,
    borderRadius: linkLayoutTokens.radius,
    background: 'none',
    color: visual.default,
    cursor: 'pointer',
    textDecoration: 'none',
    boxDecorationBreak: inline ? 'clone' : undefined,
    WebkitBoxDecorationBreak: inline ? 'clone' : undefined,
    transition: `color ${linkMotionTokens.defaultDuration} ${linkMotionTokens.easing}`,
    transitionDuration: $instantTransition ? linkMotionTokens.instantDuration : undefined,

    ...($showVisited && visual.visited
      ? {
          '&:visited': {
            color: visual.visited,
          },
        }
      : {}),

    '& .bw-link__label': {
      textDecorationLine: $underline === 'always' ? 'underline' : 'none',
      textDecorationThickness: linkUnderlineTokens.defaultWidth,
      textUnderlineOffset: linkUnderlineTokens.offset,
      textDecorationColor: 'currentColor',
      transition: [
        `text-decoration-thickness ${linkMotionTokens.defaultDuration} ${linkMotionTokens.easing}`,
        `text-decoration-color ${linkMotionTokens.defaultDuration} ${linkMotionTokens.easing}`,
      ].join(', '),
      transitionDuration: $instantTransition ? linkMotionTokens.instantDuration : undefined,
    },

    '& .bw-link__icon': {
      display: inline ? 'inline-block' : 'inline-flex',
      alignItems: inline ? undefined : 'center',
      justifyContent: inline ? undefined : 'center',
      flex: inline ? undefined : 'none',
      inlineSize: size.icon,
      blockSize: size.icon,
      fontSize: size.icon,
      color: 'currentColor',
      verticalAlign: 'middle',
    },
    '& .bw-link__icon > *': {
      inlineSize: '100%',
      blockSize: '100%',
    },
    '& .bw-link__external-icon': {
      marginInlineStart: inline ? linkLayoutTokens.gap : undefined,
    },

    '&:hover:not([aria-disabled="true"])': {
      color: visual.hover,
      '& .bw-link__label': {
        textDecorationLine: 'underline',
        textDecorationThickness:
          $underline === 'always'
            ? linkUnderlineTokens.strongWidth
            : linkUnderlineTokens.defaultWidth,
      },
    },
    '&:active:not([aria-disabled="true"])': {
      color: visual.pressed,
      transitionDuration: linkMotionTokens.pressedDuration,
      '& .bw-link__label': {
        textDecorationLine: 'underline',
        textDecorationThickness:
          $underline === 'always'
            ? linkUnderlineTokens.strongWidth
            : linkUnderlineTokens.defaultWidth,
        transitionDuration: linkMotionTokens.pressedDuration,
      },
    },
    '&:focus': {
      outline: 'none',
    },
    '&:focus-visible, &.Mui-focusVisible': {
      outline: `${linkFocusTokens.width} solid ${focusColor}`,
      outlineOffset: linkFocusTokens.offset,
      '& .bw-link__label': {
        textDecorationLine: 'underline',
        textDecorationThickness: linkUnderlineTokens.defaultWidth,
        transitionDuration: linkMotionTokens.instantDuration,
      },
    },
    '&[aria-disabled="true"]': {
      color: visual.disabled,
      cursor: 'default',
      transitionDuration: linkMotionTokens.instantDuration,
      '& .bw-link__label': {
        textDecorationLine: 'none',
        transitionDuration: linkMotionTokens.instantDuration,
      },
    },
  };
});

type LinkInternalProps = LinkOwnProps;

const LinkInternal = React.forwardRef<HTMLAnchorElement, LinkInternalProps>(function Link(
  {
    href,
    children,
    color = 'brand',
    size = 'inherit',
    underline = 'always',
    startIcon,
    external = false,
    externalLabel,
    showVisited = false,
    disabled = false,
    component,
    onClick,
    'aria-label': ariaLabel,
    ...rest
  },
  ref,
) {
  const { locale } = useBiowave();
  const missingDestination = !href && !component && !disabled;
  const effectiveDisabled = disabled || missingDestination;
  const previouslyDisabled = React.useRef(effectiveDisabled);
  const [, advanceTransitionFrame] = React.useState(0);
  const justReenabled = previouslyDisabled.current && !effectiveDisabled;
  const effectiveUnderline =
    color === 'neutral' || size === 'inherit' ? 'always' : underline;
  const effectiveStartIcon = size === 'inherit' ? undefined : startIcon;
  const effectiveShowVisited = showVisited && color === 'brand';
  const effectiveExternalLabel =
    externalLabel ??
    (locale === 'ar' ? '(يفتح في علامة تبويب جديدة)' : '(opens in a new tab)');

  React.useLayoutEffect(() => {
    previouslyDisabled.current = effectiveDisabled;
    if (!justReenabled) return undefined;

    const frame = window.requestAnimationFrame(() => {
      advanceTransitionFrame((value) => value + 1);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [effectiveDisabled, justReenabled]);

  if (color === 'neutral' && underline === 'hover') {
    warnOnce(
      'link-neutral-hover',
      'Link: color="neutral" does not support underline="hover"; falling back to underline="always".',
    );
  }
  if (size === 'inherit' && underline === 'hover') {
    warnOnce(
      'link-inherit-hover',
      'Link: size="inherit" does not support underline="hover"; falling back to underline="always".',
    );
  }
  if (size === 'inherit' && startIcon) {
    warnOnce(
      'link-inherit-start-icon',
      'Link: size="inherit" does not support startIcon; the icon will not be rendered.',
    );
  }
  if (showVisited && color !== 'brand') {
    warnOnce(
      `link-show-visited-${color}`,
      `Link: showVisited does not support color="${color}"; showVisited will be ignored.`,
    );
  }
  if (typeof children !== 'string' || children.length === 0) {
    warnOnce('link-text-label', 'Link needs a text label');
  }
  if (missingDestination) {
    warnOnce('link-href', 'Link needs an href');
  }

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (effectiveDisabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  return (
    <LinkRoot
      {...rest}
      ref={ref}
      component={component}
      $color={color}
      $size={size}
      $underline={effectiveUnderline}
      $showVisited={effectiveShowVisited}
      $instantTransition={effectiveDisabled || justReenabled}
      underline="none"
      color="inherit"
      variant="inherit"
      href={effectiveDisabled ? undefined : href}
      target={external && !effectiveDisabled ? '_blank' : undefined}
      rel={external && !effectiveDisabled ? 'noopener noreferrer' : undefined}
      role={effectiveDisabled ? 'link' : undefined}
      aria-label={
        external ? `${ariaLabel ?? String(children)} ${effectiveExternalLabel}` : ariaLabel
      }
      aria-disabled={effectiveDisabled ? true : undefined}
      tabIndex={effectiveDisabled ? -1 : undefined}
      onClick={handleClick}
    >
      {effectiveStartIcon ? (
        <span className="bw-link__icon bw-link__leading-icon" aria-hidden="true">
          {effectiveStartIcon}
        </span>
      ) : null}
      <span className="bw-link__label">{children}</span>
      {external ? (
        <>
          <span className="bw-link__external-label" style={visuallyHidden}>
            {` ${effectiveExternalLabel}`}
          </span>
          <span className="bw-link__icon bw-link__external-icon" aria-hidden="true">
            <Icon name="open_in_new" directional />
          </span>
        </>
      ) : null}
    </LinkRoot>
  );
});

type LinkComponent = <RootComponent extends React.ElementType = 'a'>(
  props: LinkProps<RootComponent> & React.RefAttributes<HTMLAnchorElement>,
) => React.ReactElement | null;

/**
 * Biowave navigation link. For app routers, alias their component and pass it
 * through `component`, for example `import { Link as RouterLink } from 'react-router-dom'`.
 */
export const Link = LinkInternal as LinkComponent;

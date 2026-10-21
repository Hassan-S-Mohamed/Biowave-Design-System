import * as React from 'react';
import { styled } from '@mui/material/styles';
import { cssVars, useBiowave } from '@biowave/foundations';
import { warnOnce } from '../../internal/warnOnce';
import { useButtonGroupSize } from '../button-group/ButtonGroupContext';
import { InternalButton } from '../button/Button';
import type { ButtonSize } from '../button/button.tokens';
import { Icon } from '../icon';
import { InternalIconButton } from '../icon-button/IconButton';
import {
  SplitButtonMenu,
  type SplitButtonMenuOption,
} from './SplitButtonMenu';

export type SplitButtonVariant = 'filled' | 'tonal' | 'outlined';
export type SplitButtonColor = 'brand' | 'secondary' | 'neutral';
export type SplitButtonSize = ButtonSize;
export type SplitButtonOption = SplitButtonMenuOption;

export interface SplitButtonProps {
  children: string;
  onClick: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  options: SplitButtonOption[];
  variant?: SplitButtonVariant;
  color?: SplitButtonColor;
  size?: SplitButtonSize;
  startIcon?: React.ReactNode;
  loading?: boolean;
  loadingLabel?: string;
  disabled?: boolean;
  menuLabel?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

interface SplitButtonRootProps {
  $open: boolean;
}

const SplitButtonRoot = styled('div', {
  shouldForwardProp: (prop) => prop !== '$open',
})<SplitButtonRootProps>(({ $open }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: cssVars.spacing.xxs,
  '& .bw-split-button__chevron': {
    transform: $open ? 'rotate(0.5turn)' : 'none',
    transition: `transform ${
      $open ? cssVars.motion.duration.md : cssVars.motion.duration.sm
    } ${
      $open
        ? cssVars.motion.easing['standard-decelerate']
        : cssVars.motion.easing['standard-accelerate']
    }`,
  },
}));

export const SplitButton = React.forwardRef<HTMLDivElement, SplitButtonProps>(
  function SplitButton(
    {
      children,
      onClick,
      options,
      variant = 'filled',
      color = 'brand',
      size: sizeProp,
      startIcon,
      loading = false,
      loadingLabel,
      disabled = false,
      menuLabel,
      open: controlledOpen,
      onOpenChange,
      className,
    },
    forwardedRef,
  ) {
    const { locale } = useBiowave();
    const groupSize = useButtonGroupSize();
    const size = groupSize ?? sizeProp ?? 'md';
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
    const [initialFocus, setInitialFocus] = React.useState<'first' | 'last'>('first');
    const localContainerRef = React.useRef<HTMLDivElement | null>(null);
    const triggerRef = React.useRef<HTMLButtonElement | null>(null);
    const generatedId = React.useId();
    const menuId = `${generatedId}-menu`;
    const open = controlledOpen ?? uncontrolledOpen;
    const effectiveVariant = variant === 'tonal' && color === 'neutral' ? 'outlined' : variant;
    const effectiveMenuLabel =
      menuLabel ??
      (locale === 'ar' ? `خيارات أخرى لـ${children}` : `More options for ${children}`);

    React.useImperativeHandle(forwardedRef, () => localContainerRef.current as HTMLDivElement);

    const updateOpen = React.useCallback(
      (nextOpen: boolean) => {
        if (controlledOpen === undefined) setUncontrolledOpen(nextOpen);
        onOpenChange?.(nextOpen);
      },
      [controlledOpen, onOpenChange],
    );

    const openMenu = (focus: 'first' | 'last') => {
      if (disabled || loading) return;
      setInitialFocus(focus);
      updateOpen(true);
    };

    const closeMenu = (restoreTriggerFocus: boolean) => {
      updateOpen(false);
      if (restoreTriggerFocus) {
        queueMicrotask(() => triggerRef.current?.focus());
      }
    };

    if (effectiveVariant !== variant) {
      warnOnce(
        'split-button-tonal-neutral',
        'SplitButton: variant="tonal" does not support color="neutral"; falling back to variant="outlined".',
      );
    }
    if (options.length < 2 || options.length > 5) {
      warnOnce(
        `split-button-options-${options.length}`,
        'SplitButton: options must contain between 2 and 5 items.',
      );
    }
    if (options.some((option) => option.label === children)) {
      warnOnce(
        'split-button-repeated-primary',
        "SplitButton: Don't repeat the primary action in the menu",
      );
    }

    return (
      <SplitButtonRoot
        ref={localContainerRef}
        $open={open}
        className={className}
        role="group"
        aria-label={children}
      >
        <InternalButton
          variant={effectiveVariant}
          color={color}
          size={size}
          segment="start"
          startIcon={startIcon}
          loading={loading}
          loadingLabel={loadingLabel}
          disabled={disabled}
          onClick={onClick}
        >
          {children}
        </InternalButton>
        <InternalIconButton
          ref={triggerRef}
          icon={<Icon name="expand_more" className="bw-split-button__chevron" />}
          label={effectiveMenuLabel}
          variant={effectiveVariant}
          color={color}
          size={size}
          segment="end"
          disabled={disabled || loading}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls={open ? menuId : undefined}
          onClick={() => {
            if (open) closeMenu(false);
            else openMenu('first');
          }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
              event.preventDefault();
              openMenu(event.key === 'ArrowUp' ? 'last' : 'first');
            }
          }}
        />
        <SplitButtonMenu
          anchorEl={localContainerRef.current}
          initialFocus={initialFocus}
          label={effectiveMenuLabel}
          menuId={menuId}
          onRequestClose={closeMenu}
          open={open}
          options={options}
        />
      </SplitButtonRoot>
    );
  },
);

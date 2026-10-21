import * as React from 'react';
import { styled } from '@mui/material/styles';
import { cssVars, useBiowave } from '@biowave/foundations';
import { warnOnce } from '../../internal/warnOnce';
import { Button, type ButtonProps } from '../button/Button';
import type { ButtonSize } from '../button/button.tokens';
import { Icon } from '../icon';
import { IconButton, InternalIconButton } from '../icon-button/IconButton';
import { SplitButton } from '../split-button/SplitButton';
import {
  SplitButtonMenu,
  type SplitButtonMenuOption,
} from '../split-button/SplitButtonMenu';
import { ButtonGroupContext } from './ButtonGroupContext';

export type ButtonGroupOrientation = 'horizontal' | 'vertical';
export type ButtonGroupAlign = 'start' | 'center' | 'end' | 'space-between' | 'fill';
export type ButtonGroupSize = ButtonSize;

export interface ButtonGroupProps {
  children: React.ReactNode;
  orientation?: ButtonGroupOrientation;
  align?: ButtonGroupAlign;
  size?: ButtonGroupSize;
  maxVisible?: number;
  overflowLabel?: string;
  'aria-label'?: string;
  className?: string;
}

interface ButtonGroupRootProps {
  $align: ButtonGroupAlign;
  $orientation: ButtonGroupOrientation;
}

const justifyContent: Record<Exclude<ButtonGroupAlign, 'fill'>, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  'space-between': 'space-between',
};

const ButtonGroupRoot = styled('div', {
  shouldForwardProp: (prop) => prop !== '$align' && prop !== '$orientation',
})<ButtonGroupRootProps>(({ $align, $orientation }) => {
  return {
    display: 'flex',
    flexDirection: $orientation === 'vertical' ? 'column-reverse' : 'row',
    alignItems: $orientation === 'vertical' || $align === 'fill' ? 'stretch' : 'center',
    justifyContent:
      $orientation === 'horizontal'
        ? $align === 'fill'
          ? 'flex-start'
          : justifyContent[$align]
        : undefined,
    gap: cssVars.spacing.md,
    inlineSize: '100%',
    '& > *': {
      ...($orientation === 'vertical' ? { inlineSize: '100%' } : {}),
      ...($align === 'fill' ? { flex: '1 1 0' } : {}),
    },
  };
});

type ActionElement = React.ReactElement<Record<string, unknown>>;

function isActionElement(child: React.ReactNode): child is ActionElement {
  return React.isValidElement<Record<string, unknown>>(child);
}

function isOverflowable(child: ActionElement): boolean {
  return child.type === Button || child.type === IconButton;
}

function actionLabel(child: ActionElement): string | undefined {
  if (child.type === IconButton) return child.props.label as string | undefined;
  return typeof child.props.children === 'string' ? child.props.children : undefined;
}

function toMenuOption(child: ActionElement): SplitButtonMenuOption | undefined {
  const label = actionLabel(child);
  if (!label) return undefined;

  const onClick = child.props.onClick as (() => void) | undefined;
  return {
    label,
    onSelect: () => onClick?.(),
    icon: (child.props.startIcon ?? child.props.icon) as React.ReactNode,
    disabled: Boolean(child.props.disabled),
  };
}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  function ButtonGroup(
    {
      children,
      orientation = 'horizontal',
      align: alignProp,
      size = 'md',
      maxVisible = 3,
      overflowLabel,
      'aria-label': ariaLabel,
      className,
    },
    forwardedRef,
  ) {
    const { locale } = useBiowave();
    const align = alignProp ?? 'end';
    const actionChildren = React.Children.toArray(children);
    const clampedMaxVisible = Math.min(Math.max(maxVisible, 1), 4);
    if (clampedMaxVisible !== maxVisible) {
      warnOnce(
        `button-group-max-visible-${String(maxVisible)}`,
        `ButtonGroup: maxVisible=${String(maxVisible)} is outside 1–4; clamped to ${String(clampedMaxVisible)}.`,
      );
    }
    const effectiveOverflowLabel =
      overflowLabel ?? (locale === 'ar' ? 'خيارات أخرى' : 'More options');
    const overflowCount = Math.max(actionChildren.length - clampedMaxVisible, 0);
    const overflowOptions: SplitButtonMenuOption[] = [];
    const visibleChildren: React.ReactNode[] = [];
    let remainingOverflow = overflowCount;

    for (const child of actionChildren) {
      if (remainingOverflow > 0 && isActionElement(child) && isOverflowable(child)) {
        if (child.props.href !== undefined || child.props.type === 'submit') {
          const reason = child.props.href !== undefined ? 'href' : 'type="submit"';
          warnOnce(
            `button-group-non-overflowable-${reason}`,
            `ButtonGroup: a child with ${reason} cannot move into overflow; keeping this child visible.`,
          );
          visibleChildren.push(child);
          continue;
        }
        const option = toMenuOption(child);
        if (option) {
          overflowOptions.push(option);
          remainingOverflow -= 1;
          continue;
        }
      }

      if (remainingOverflow > 0 && isActionElement(child) && !isOverflowable(child)) {
        warnOnce(
          'button-group-non-overflowable-child',
          'ButtonGroup: only Button and IconButton children can move into overflow; keeping this child visible.',
        );
      }
      visibleChildren.push(child);
    }

    const filledCount = actionChildren.filter((child) => {
      if (!isActionElement(child)) return false;
      if (child.type === IconButton) return child.props.variant === 'filled';
      if (child.type === Button || child.type === SplitButton) {
        return child.props.variant === undefined || child.props.variant === 'filled';
      }
      return child.props.variant === 'filled';
    }).length;

    if (filledCount > 1) {
      warnOnce(
        'button-group-multiple-filled',
        'ButtonGroup: use no more than one child with variant="filled".',
      );
    }
    if (align === 'space-between' && actionChildren.length > 2) {
      warnOnce(
        'button-group-space-between-count',
        'ButtonGroup: align="space-between" supports at most 2 children.',
      );
    }
    if (orientation === 'vertical' && alignProp !== undefined) {
      warnOnce(
        'button-group-vertical-align',
        'ButtonGroup: align is ignored when orientation="vertical".',
      );
    }
    for (const child of actionChildren) {
      if (
        isActionElement(child) &&
        child.props.size !== undefined &&
        child.props.size !== size
      ) {
        warnOnce(
          `button-group-size-${String(child.props.size)}-${size}`,
          `ButtonGroup: child size="${String(child.props.size)}" differs from group size="${size}"; the group size wins.`,
        );
      }
    }

    const [menuOpen, setMenuOpen] = React.useState(false);
    const [initialFocus, setInitialFocus] = React.useState<'first' | 'last'>('first');
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const triggerRef = React.useRef<HTMLButtonElement | null>(null);
    const generatedId = React.useId();
    const menuId = `${generatedId}-overflow-menu`;

    React.useImperativeHandle(forwardedRef, () => containerRef.current as HTMLDivElement);

    const closeMenu = (restoreTriggerFocus: boolean) => {
      setMenuOpen(false);
      if (restoreTriggerFocus) queueMicrotask(() => triggerRef.current?.focus());
    };

    return (
      <ButtonGroupContext.Provider value={size}>
        <ButtonGroupRoot
          ref={containerRef}
          $align={align}
          $orientation={orientation}
          className={className}
          {...(ariaLabel ? { role: 'group', 'aria-label': ariaLabel } : {})}
        >
          {overflowOptions.length > 0 ? (
            <InternalIconButton
              ref={triggerRef}
              icon={<Icon name="more_horiz" />}
              label={effectiveOverflowLabel}
              variant="text"
              color="neutral"
              size={size}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              aria-controls={menuOpen ? menuId : undefined}
              onClick={() => {
                setInitialFocus('first');
                setMenuOpen((current) => !current);
              }}
              onKeyDown={(event) => {
                if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                  event.preventDefault();
                  setInitialFocus(event.key === 'ArrowUp' ? 'last' : 'first');
                  setMenuOpen(true);
                }
              }}
            />
          ) : null}
          {visibleChildren}
          {overflowOptions.length > 0 ? (
            <SplitButtonMenu
              anchorEl={containerRef.current}
              initialFocus={initialFocus}
              label={effectiveOverflowLabel}
              menuId={menuId}
              onRequestClose={closeMenu}
              open={menuOpen}
              options={overflowOptions}
            />
          ) : null}
        </ButtonGroupRoot>
      </ButtonGroupContext.Provider>
    );
  },
);

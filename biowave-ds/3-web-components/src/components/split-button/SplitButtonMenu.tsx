import * as React from 'react';
import MuiMenu from '@mui/material/Menu';
import MuiMenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import { base, biowaveVariants, cssVars } from '@biowave/foundations';

export interface SplitButtonMenuOption {
  label: string;
  onSelect: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface SplitButtonMenuProps {
  anchorEl: HTMLElement | null;
  initialFocus: 'first' | 'last';
  label: string;
  menuId: string;
  onRequestClose: (restoreTriggerFocus: boolean) => void;
  open: boolean;
  options: SplitButtonMenuOption[];
}

function stateLayer(value: string): string {
  return `linear-gradient(${value}, ${value})`;
}

const StyledMenu = styled(MuiMenu)(() => ({
  '& .MuiPaper-root': {
    marginBlockStart: cssVars.spacing.xs,
    backgroundColor: cssVars.color.surface.raised,
    borderRadius: cssVars.radius.lg,
    boxShadow: cssVars.elevation['3'],
    transitionDuration: `${cssVars.motion.duration.md} !important`,
  },
  '& .MuiList-root': {
    paddingBlock: cssVars.spacing.none,
  },
}));

const StyledMenuItem = styled(MuiMenuItem)(() => ({
  ...biowaveVariants.bodyMd,
  minBlockSize: cssVars.size.control.height.md,
  paddingInline: cssVars.spacing.control['padding-inline'].md,
  gap: cssVars.spacing.control.gap.md,
  color: cssVars.color.text.neutral.default,
  backgroundColor: cssVars.color.surface.raised,
  backgroundImage: 'none',
  '&:hover': {
    backgroundColor: cssVars.color.surface.raised,
    backgroundImage: stateLayer(cssVars.color.overlay.hover),
  },
  '&:active': {
    backgroundColor: cssVars.color.surface.raised,
    backgroundImage: stateLayer(cssVars.color.overlay.pressed),
  },
  '&:focus-visible, &.Mui-focusVisible': {
    backgroundColor: cssVars.color.surface.raised,
    backgroundImage: stateLayer(cssVars.color.overlay.hover),
    boxShadow: `inset 0 0 0 ${cssVars.border.width.focus} ${cssVars.color.border.focus}`,
  },
  '&.Mui-disabled': {
    color: cssVars.color.text.neutral.disabled,
  },
  '& .bw-split-button-menu__icon': {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    inlineSize: cssVars.size.icon.md,
    blockSize: cssVars.size.icon.md,
    fontSize: cssVars.size.icon.md,
    color: cssVars.color.icon.neutral.subtle,
  },
  '& .bw-split-button-menu__icon > *': {
    inlineSize: '100%',
    blockSize: '100%',
  },
}));

// TODO(menu): replace this private menu with the shared Menu component.
export function SplitButtonMenu({
  anchorEl,
  initialFocus,
  label,
  menuId,
  onRequestClose,
  open,
  options,
}: SplitButtonMenuProps) {
  const itemRefs = React.useRef<Array<HTMLLIElement | null>>([]);

  const focusInitialItem = React.useCallback(() => {
    const enabledItems = itemRefs.current.filter(
      (item): item is HTMLLIElement => Boolean(item && item.getAttribute('aria-disabled') !== 'true'),
    );
    const target = initialFocus === 'last' ? enabledItems.at(-1) : enabledItems[0];
    if (target?.isConnected) target.focus();
  }, [initialFocus]);

  React.useLayoutEffect(() => {
    if (!open) return;
    queueMicrotask(focusInitialItem);
  }, [focusInitialItem, open]);

  return (
    <StyledMenu
      anchorEl={anchorEl}
      open={open}
      onClose={(_event, reason) => onRequestClose(reason === 'escapeKeyDown')}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      transitionDuration={{
        enter: base.motion.duration.md,
        exit: base.motion.duration.sm,
      }}
      autoFocus={false}
      disableAutoFocusItem
      variant="menu"
      slotProps={{
        root: { disableAutoFocus: true, disableRestoreFocus: true },
        paper: {
          sx: {
            minInlineSize: anchorEl?.getBoundingClientRect().width,
          },
        },
        list: {
          id: menuId,
          'aria-label': label,
        },
        transition: {
          onEnter: focusInitialItem,
          onEntered: focusInitialItem,
        },
      }}
    >
      {options.map((option, index) => (
        <StyledMenuItem
          key={`${option.label}-${index}`}
          ref={(item) => {
            itemRefs.current[index] = item;
          }}
          disabled={option.disabled}
          onClick={() => {
            option.onSelect();
            onRequestClose(true);
          }}
        >
          {option.icon ? (
            <span className="bw-split-button-menu__icon" aria-hidden="true">
              {option.icon}
            </span>
          ) : null}
          <span>{option.label}</span>
        </StyledMenuItem>
      ))}
    </StyledMenu>
  );
}

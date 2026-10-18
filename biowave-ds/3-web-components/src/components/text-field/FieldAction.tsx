import * as React from 'react';
import { cssVars } from '@biowave/foundations';
import { styled } from '@mui/material/styles';
import { IconButton } from '../icon-button';
import {
  textFieldSizeTokens,
  textFieldTargetToken,
  type TextFieldSize,
} from './text-field.tokens';

export interface FieldActionProps {
  disabled: boolean;
  icon: React.ReactNode;
  label: string;
  multiline: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  selected?: boolean;
  selectedIcon?: React.ReactNode;
  size: TextFieldSize;
  toggle?: boolean;
}

interface ActionRootProps {
  $multiline: boolean;
  $size: TextFieldSize;
}

const ActionRoot = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== '$multiline' && prop !== '$size',
})<ActionRootProps>(({ $multiline, $size }) => {
  const size = textFieldSizeTokens[$size];
  const lineHeight = size.inputTypography.lineHeight;

  return {
    flex: 'none',
    inlineSize: size.actionBox,
    blockSize: size.actionBox,
    minInlineSize: size.actionBox,
    padding: cssVars.spacing.none,
    overflow: 'visible',
    alignSelf: $multiline ? 'flex-start' : 'center',
    marginBlockStart:
      $multiline && lineHeight
        ? `calc((${String(lineHeight)} - ${size.actionBox}) / 2)`
        : undefined,

    '&::before': {
      content: '\"\"',
      position: 'absolute',
      inlineSize: textFieldTargetToken,
      blockSize: textFieldTargetToken,
      insetBlockStart: '50%',
      insetInlineStart: '50%',
      transform: 'translate(-50%, -50%)',
    },
    '& .bw-icon-button__icons': {
      inlineSize: size.icon,
      blockSize: size.icon,
      fontSize: size.icon,
    },
    '& .material-symbols-rounded': {
      fontOpticalSizing: 'auto',
    },
  };
});

export function FieldAction({
  disabled,
  icon,
  label,
  multiline,
  onClick,
  selected = false,
  selectedIcon,
  size,
  toggle = false,
}: FieldActionProps) {
  return (
    <ActionRoot
      className="bw-text-field__trailing-action"
      icon={icon}
      label={label}
      variant="text"
      color="neutral"
      size={size}
      toggle={toggle}
      selected={selected}
      selectedIcon={selectedIcon}
      tooltip={false}
      disabled={disabled}
      onClick={onClick}
      $multiline={multiline}
      $size={size}
    />
  );
}

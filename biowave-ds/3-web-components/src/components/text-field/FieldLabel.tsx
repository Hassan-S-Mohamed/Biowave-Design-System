import * as React from 'react';
import { styled } from '@mui/material/styles';
import { visuallyHidden } from '../../internal/visuallyHidden';
import {
  textFieldSizeTokens,
  textFieldStateTokens,
  type TextFieldSize,
} from './text-field.tokens';

export interface FieldLabelProps {
  children: React.ReactNode;
  disabled: boolean;
  hidden: boolean;
  htmlFor: string;
  required: boolean;
  size: TextFieldSize;
}

interface LabelRootProps {
  $disabled: boolean;
  $hidden: boolean;
  $size: TextFieldSize;
}

const LabelRoot = styled('label', {
  shouldForwardProp: (prop) =>
    prop !== '$disabled' && prop !== '$hidden' && prop !== '$size',
})<LabelRootProps>(({ $disabled, $hidden, $size }) => {
  const size = textFieldSizeTokens[$size];
  const state = textFieldStateTokens[$disabled ? 'disabled' : 'default'];

  return {
    ...size.labelTypography,
    display: 'inline-flex',
    alignItems: 'baseline',
    gap: size.gap,
    color: state.label,
    marginBlockEnd: $hidden ? undefined : size.labelGap,
    ...($hidden ? visuallyHidden : {}),
  };
});

const RequiredIndicator = styled('span')({
  color: textFieldStateTokens.default.required,
});

export function FieldLabel({
  children,
  disabled,
  hidden,
  htmlFor,
  required,
  size,
}: FieldLabelProps) {
  return (
    <LabelRoot
      className="bw-text-field__label"
      htmlFor={htmlFor}
      $disabled={disabled}
      $hidden={hidden}
      $size={size}
    >
      <span>{children}</span>
      {required ? (
        <RequiredIndicator
          className="bw-text-field__required-indicator"
          aria-hidden="true"
        >
          *
        </RequiredIndicator>
      ) : null}
    </LabelRoot>
  );
}

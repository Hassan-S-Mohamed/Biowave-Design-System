import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  textFieldSizeTokens,
  textFieldStateTokens,
  textFieldSupportingTypography,
  type TextFieldSize,
} from './text-field.tokens';

export interface FieldSupportingTextProps {
  counter?: React.ReactNode;
  counterId?: string;
  disabled: boolean;
  error: boolean;
  helperId?: string;
  helperText?: React.ReactNode;
  size: TextFieldSize;
}

interface SupportingRootProps {
  $disabled: boolean;
  $error: boolean;
  $size: TextFieldSize;
}

const SupportingRoot = styled('div', {
  shouldForwardProp: (prop) =>
    prop !== '$disabled' && prop !== '$error' && prop !== '$size',
})<SupportingRootProps>(({ $disabled, $error, $size }) => {
  const state = textFieldStateTokens[
    $disabled ? 'disabled' : $error ? 'error' : 'default'
  ];

  return {
    ...textFieldSupportingTypography,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: textFieldSizeTokens[$size].gap,
    marginBlockStart: textFieldSizeTokens[$size].supportingGap,
    color: state.supporting,
  };
});

const Helper = styled('span')({
  flex: '1 1 auto',
  minInlineSize: 0,
});

const Counter = styled('span')({
  flex: '0 0 auto',
  color: 'inherit',
  direction: 'ltr',
  unicodeBidi: 'isolate',
});

export function FieldSupportingText({
  counter,
  counterId,
  disabled,
  error,
  helperId,
  helperText,
  size,
}: FieldSupportingTextProps) {
  return (
    <SupportingRoot
      className="bw-text-field__supporting-row"
      $disabled={disabled}
      $error={error}
      $size={size}
    >
      {helperText != null ? (
        <Helper id={helperId} className="bw-text-field__supporting-text">
          {helperText}
        </Helper>
      ) : null}
      {counter != null ? (
        <Counter id={counterId} className="bw-text-field__counter" dir="ltr">
          {counter}
        </Counter>
      ) : null}
    </SupportingRoot>
  );
}

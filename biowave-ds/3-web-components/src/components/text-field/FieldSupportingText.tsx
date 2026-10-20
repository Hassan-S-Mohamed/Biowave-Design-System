import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Icon } from '../icon';
import {
  textFieldErrorGap,
  textFieldErrorIconSize,
  textFieldMotionTokens,
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
    transition: `color ${
      $disabled ? textFieldMotionTokens.instantDuration : textFieldMotionTokens.duration
    } ${textFieldMotionTokens.easing}`,
  };
});

const Helper = styled('span')({
  flex: '1 1 auto',
  minInlineSize: 0,
});

const Message = styled('span')({
  display: 'inline-flex',
  alignItems: 'flex-start',
  gap: textFieldErrorGap,
  flex: '1 1 auto',
  minInlineSize: 0,
});

const ErrorIcon = styled('span', {
  shouldForwardProp: (prop) => prop !== '$disabled',
})<{ $disabled: boolean }>(({ $disabled }) => ({
  display: 'inline-flex',
  flex: 'none',
  inlineSize: textFieldErrorIconSize,
  blockSize: textFieldErrorIconSize,
  fontSize: textFieldErrorIconSize,
  color: textFieldStateTokens[$disabled ? 'disabled' : 'error'].errorIcon,
  transition: `color ${
    $disabled ? textFieldMotionTokens.instantDuration : textFieldMotionTokens.duration
  } ${textFieldMotionTokens.easing}`,

  '& > *': {
    inlineSize: '100%',
    blockSize: '100%',
    fontOpticalSizing: 'auto',
  },
}));

const Counter = styled('span', {
  shouldForwardProp: (prop) => prop !== '$disabled' && prop !== '$error',
})<{ $disabled: boolean; $error: boolean }>(({ $disabled, $error }) => ({
  flex: '0 0 auto',
  color: textFieldStateTokens[
    $disabled ? 'disabled' : $error ? 'error' : 'default'
  ].counter,
  transition: `color ${
    $disabled ? textFieldMotionTokens.instantDuration : textFieldMotionTokens.duration
  } ${textFieldMotionTokens.easing}`,
  direction: 'ltr',
  unicodeBidi: 'isolate',
}));

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
        <Message>
          {error ? (
            <ErrorIcon
              className="bw-text-field__error-icon"
              aria-hidden="true"
              $disabled={disabled}
            >
              <Icon name="error" />
            </ErrorIcon>
          ) : null}
          <Helper id={helperId} className="bw-text-field__supporting-text">
            {helperText}
          </Helper>
        </Message>
      ) : null}
      {counter != null ? (
        <Counter
          id={counterId}
          className="bw-text-field__counter"
          dir="ltr"
          $disabled={disabled}
          $error={error}
        >
          {counter}
        </Counter>
      ) : null}
    </SupportingRoot>
  );
}

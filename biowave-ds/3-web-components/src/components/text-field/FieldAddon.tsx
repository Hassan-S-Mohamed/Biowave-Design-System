import * as React from 'react';
import { styled } from '@mui/material/styles';
import { cssVars } from '@biowave/foundations';
import { visuallyHidden } from '../../internal/visuallyHidden';
import {
  textFieldMotionTokens,
  textFieldSizeTokens,
  textFieldStateTokens,
  type TextFieldSize,
} from './text-field.tokens';

export interface FieldAddonProps {
  children: React.ReactNode;
  disabled: boolean;
  edgePadding: string;
  id: string;
  position: 'prefix' | 'suffix';
  readOnly: boolean;
  size: TextFieldSize;
}

interface AddonRootProps {
  $disabled: boolean;
  $edgePadding: string;
  $position: 'prefix' | 'suffix';
  $readOnly: boolean;
  $size: TextFieldSize;
}

const AddonRoot = styled('span', {
  shouldForwardProp: (prop) =>
    prop !== '$disabled' &&
    prop !== '$edgePadding' &&
    prop !== '$position' &&
    prop !== '$readOnly' &&
    prop !== '$size',
})<AddonRootProps>(({ $disabled, $edgePadding, $position, $readOnly, $size }) => {
  const size = textFieldSizeTokens[$size];
  const state = textFieldStateTokens[
    $disabled ? 'disabled' : $readOnly ? 'read-only' : 'default'
  ];

  return {
    ...size.inputTypography,
    display: 'inline-flex',
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 'none',
    paddingInline: size.paddingInline,
    marginInlineStart:
      $position === 'prefix' ? `calc(${size.paddingInline} * -1)` : undefined,
    marginInlineEnd:
      $position === 'suffix' ? `calc(${$edgePadding} * -1)` : undefined,
    borderWidth: cssVars.border.width.none,
    borderInlineEndWidth: $position === 'prefix' ? size.borderWidth : undefined,
    borderInlineStartWidth: $position === 'suffix' ? size.borderWidth : undefined,
    borderStyle: 'solid',
    borderColor: state.border,
    backgroundColor: state.addonBackground,
    color: state.addonText,
    direction: 'ltr',
    unicodeBidi: 'isolate',
    pointerEvents: 'none',
    transition: [
      `border-color ${
        $disabled || $readOnly
          ? textFieldMotionTokens.instantDuration
          : textFieldMotionTokens.duration
      } ${textFieldMotionTokens.easing}`,
      `background-color ${
        $disabled || $readOnly
          ? textFieldMotionTokens.instantDuration
          : textFieldMotionTokens.duration
      } ${textFieldMotionTokens.easing}`,
      `color ${
        $disabled || $readOnly
          ? textFieldMotionTokens.instantDuration
          : textFieldMotionTokens.duration
      } ${textFieldMotionTokens.easing}`,
    ].join(', '),
  };
});

export function FieldAddon({
  children,
  disabled,
  edgePadding,
  id,
  position,
  readOnly,
  size,
}: FieldAddonProps) {
  return (
    <>
      <AddonRoot
        className={`bw-text-field__addon bw-text-field__${position}`}
        aria-hidden="true"
        dir="ltr"
        $disabled={disabled}
        $edgePadding={edgePadding}
        $position={position}
        $readOnly={readOnly}
        $size={size}
      >
        {children}
      </AddonRoot>
      <span id={id} style={visuallyHidden}>
        {children}
      </span>
    </>
  );
}

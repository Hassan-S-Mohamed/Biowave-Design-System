import * as React from 'react';
import Fade from '@mui/material/Fade';
import MuiTooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { base, biowaveVariants, cssVars } from '@biowave/foundations';
import { visuallyHidden } from '../../internal/visuallyHidden';
import { Icon } from '../icon';
import { IconButton } from '../icon-button';
import { iconButtonTooltipTokens } from '../icon-button/iconButton.tokens';
import {
  textFieldSizeTokens,
  textFieldStateTokens,
  textFieldTargetToken,
  type TextFieldSize,
} from './text-field.tokens';

export interface FieldLabelProps {
  children: React.ReactNode;
  disabled: boolean;
  hidden: boolean;
  htmlFor: string;
  helpId?: string;
  helpLabel?: string;
  helpText?: React.ReactNode;
  required: boolean;
  size: TextFieldSize;
}

interface LabelRowProps {
  $spaced: boolean;
  $size: TextFieldSize;
}

const LabelRow = styled('div', {
  shouldForwardProp: (prop) => prop !== '$spaced' && prop !== '$size',
})<LabelRowProps>(({ $spaced, $size }) => {
  const size = textFieldSizeTokens[$size];

  return {
    display: 'inline-flex',
    alignItems: 'baseline',
    alignSelf: 'flex-start',
    gap: size.gap,
    marginBlockEnd: $spaced ? size.labelGap : undefined,
  };
});

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
    alignSelf: 'flex-start',
    gap: size.gap,
    color: state.label,
    ...($hidden ? visuallyHidden : {}),
  };
});

const RequiredIndicator = styled('span', {
  shouldForwardProp: (prop) => prop !== '$disabled',
})<{ $disabled: boolean }>(({ $disabled }) => ({
  color: textFieldStateTokens[$disabled ? 'disabled' : 'default'].required,
}));

const HelpButton = styled(IconButton)({
  inlineSize: textFieldTargetToken,
  blockSize: textFieldTargetToken,
  minInlineSize: textFieldTargetToken,
  padding: cssVars.spacing.none,

  '& .bw-icon-button__icons': {
    inlineSize: cssVars.size.icon.sm,
    blockSize: cssVars.size.icon.sm,
    fontSize: cssVars.size.icon.sm,
  },
  '& .bw-icon': {
    fontOpticalSizing: 'auto',
  },
});

const HelpAnchor = styled('span')({
  display: 'inline-flex',
  alignSelf: 'center',
});

export function FieldLabel({
  children,
  disabled,
  hidden,
  htmlFor,
  helpId,
  helpLabel,
  helpText,
  required,
  size,
}: FieldLabelProps) {
  const [helpOpen, setHelpOpen] = React.useState(false);
  const hasHelp = helpText != null && helpLabel != null && helpId != null;

  return (
    <LabelRow
      className="bw-text-field__label-row"
      $spaced={!hidden || hasHelp}
      $size={size}
    >
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
            $disabled={disabled}
          >
            *
          </RequiredIndicator>
        ) : null}
      </LabelRoot>
      {hasHelp ? (
        <MuiTooltip
          id={helpId}
          title={helpText}
          describeChild
          open={helpOpen}
          onOpen={() => setHelpOpen(true)}
          onClose={() => setHelpOpen(false)}
          placement="top"
          enterDelay={base.motion.duration['2xl']}
          slots={{ transition: Fade }}
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: 'offset',
                  options: { offset: [base.spacing.none, base.spacing.xs] },
                },
              ],
            },
            tooltip: {
              sx: {
                ...biowaveVariants.labelSm,
                backgroundColor: iconButtonTooltipTokens.background,
                color: iconButtonTooltipTokens.color,
                borderRadius: iconButtonTooltipTokens.radius,
                paddingBlock: iconButtonTooltipTokens.paddingBlock,
                paddingInline: iconButtonTooltipTokens.paddingInline,
              },
            },
            transition: {
              timeout: {
                enter: base.motion.duration.md,
                exit: base.motion.duration.sm,
              },
            },
          }}
        >
          <HelpAnchor
            onKeyDown={(event) => {
              if (event.key === 'Escape') setHelpOpen(false);
            }}
          >
            <HelpButton
              className="bw-text-field__help-icon"
              icon={<Icon name="help" />}
              label={helpLabel}
              variant="text"
              color="neutral"
              size="sm"
              tooltip={false}
              aria-describedby={helpId}
            />
          </HelpAnchor>
        </MuiTooltip>
      ) : null}
    </LabelRow>
  );
}

import { biowaveVariants, cssVars } from '@biowave/foundations';

export type TextFieldSize = 'sm' | 'md' | 'lg';
export type TextFieldState =
  | 'default'
  | 'hover'
  | 'focus'
  | 'error'
  | 'disabled'
  | 'read-only';

export interface TextFieldSizeTokens {
  height: string;
  paddingInline: string;
  gap: string;
  labelGap: string;
  supportingGap: string;
  icon: string;
  actionBox: string;
  actionInset: string;
  radius: string;
  borderWidth: string;
  labelTypography: React.CSSProperties;
  inputTypography: React.CSSProperties;
}

export interface TextFieldStateTokens {
  background: string;
  border: string;
  borderWidth: string;
  label: string;
  input: string;
  placeholder: string;
  icon: string;
  supporting: string;
  counter: string;
  required: string;
  addonBackground: string;
  addonText: string;
  errorIcon: string;
}

const sharedSizeTokens = {
  labelGap: cssVars.spacing.sm,
  supportingGap: cssVars.spacing.xs,
  radius: cssVars.radius.md,
  borderWidth: cssVars.border.width.default,
} as const;

export const textFieldSizeTokens: Record<TextFieldSize, TextFieldSizeTokens> = {
  sm: {
    ...sharedSizeTokens,
    height: cssVars.size.control.height.sm,
    paddingInline: cssVars.spacing.control['padding-inline'].sm,
    gap: cssVars.spacing.control.gap.sm,
    icon: cssVars.size.icon.sm,
    actionBox: cssVars.size.icon.lg,
    actionInset: cssVars.spacing.xs,
    labelTypography: biowaveVariants.labelSm,
    inputTypography: biowaveVariants.bodySm,
  },
  md: {
    ...sharedSizeTokens,
    height: cssVars.size.control.height.md,
    paddingInline: cssVars.spacing.control['padding-inline'].md,
    gap: cssVars.spacing.control.gap.md,
    icon: cssVars.size.icon.md,
    actionBox: cssVars.size.control.height.sm,
    actionInset: cssVars.spacing.xs,
    labelTypography: biowaveVariants.labelMd,
    inputTypography: biowaveVariants.bodyMd,
  },
  lg: {
    ...sharedSizeTokens,
    height: cssVars.size.control.height.lg,
    paddingInline: cssVars.spacing.control['padding-inline'].lg,
    gap: cssVars.spacing.control.gap.lg,
    icon: cssVars.size.icon.lg,
    actionBox: cssVars.size.control.height.md,
    actionInset: cssVars.spacing.xs,
    labelTypography: biowaveVariants.labelLg,
    inputTypography: biowaveVariants.bodyLg,
  },
};

const defaultState: TextFieldStateTokens = {
  background: cssVars.color.background.base.default,
  border: cssVars.color.border.input.default,
  borderWidth: cssVars.border.width.default,
  label: cssVars.color.text.neutral.default,
  input: cssVars.color.text.neutral.default,
  placeholder: cssVars.color.text.neutral.placeholder,
  icon: cssVars.color.icon.neutral.muted,
  supporting: cssVars.color.text.neutral.muted,
  counter: cssVars.color.text.neutral.muted,
  required: cssVars.color.text.role.error,
  addonBackground: cssVars.color.background.neutral.default,
  addonText: cssVars.color.text.neutral.subtle,
  errorIcon: cssVars.color.icon.role.error,
};

export const textFieldStateTokens: Record<TextFieldState, TextFieldStateTokens> = {
  default: defaultState,
  hover: {
    ...defaultState,
    border: cssVars.color.border.input.hover,
  },
  focus: {
    ...defaultState,
    border: cssVars.color.border.focus,
    borderWidth: cssVars.border.width.focus,
    icon: cssVars.color.icon.neutral.default,
  },
  error: {
    ...defaultState,
    border: cssVars.color.border.input.error,
    supporting: cssVars.color.text.role.error,
    counter: cssVars.color.text.role.error,
  },
  disabled: {
    background: cssVars.color.background.base.disabled,
    border: cssVars.color.border.disabled,
    borderWidth: cssVars.border.width.default,
    label: cssVars.color.text.neutral.disabled,
    input: cssVars.color.text.neutral.disabled,
    placeholder: cssVars.color.text.neutral.disabled,
    icon: cssVars.color.icon.neutral.disabled,
    supporting: cssVars.color.text.neutral.disabled,
    counter: cssVars.color.text.neutral.disabled,
    required: cssVars.color.text.neutral.disabled,
    addonBackground: cssVars.color.background.base.disabled,
    addonText: cssVars.color.text.neutral.disabled,
    errorIcon: cssVars.color.icon.neutral.disabled,
  },
  'read-only': {
    ...defaultState,
    background: cssVars.color.background.neutral.subtle,
    border: cssVars.color.border.default,
  },
};

export const textFieldSupportingTypography = biowaveVariants.captionMd;

export const textFieldMotionTokens = {
  duration: cssVars.motion.duration.sm,
  instantDuration: cssVars.motion.duration.instant,
  easing: cssVars.motion.easing.standard,
} as const;

export const textFieldTargetToken = cssVars.target.min;
export const textFieldErrorIconSize = cssVars.size.icon.sm;
export const textFieldErrorGap = cssVars.spacing.xs;

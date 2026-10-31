import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import { cssVars, useBiowave } from '@biowave/foundations';
import { warnOnce } from '../../internal/warnOnce';
import { Button } from '../button';
import { Icon } from '../icon';
import { FieldAction } from './FieldAction';
import { FieldAddon } from './FieldAddon';
import { FieldLabel } from './FieldLabel';
import { FieldSupportingText } from './FieldSupportingText';
import {
  textFieldMotionTokens,
  textFieldSizeTokens,
  textFieldStateTokens,
  type TextFieldSize,
} from './text-field.tokens';

export type { TextFieldSize } from './text-field.tokens';

type FieldValue = string | number;
type InputElement = HTMLInputElement | HTMLTextAreaElement;

export interface TextFieldAction {
  icon: React.ReactNode;
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export interface TextFieldEndButton {
  label: string;
  icon?: React.ReactNode;
  loading?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

export interface TextFieldProps extends React.AriaAttributes {
  label: React.ReactNode;
  hideLabel?: boolean;
  size?: TextFieldSize;
  multiline?: boolean;
  rows?: number;
  minRows?: number;
  maxRows?: number;
  resize?: 'vertical' | 'none';
  required?: boolean;
  helpText?: React.ReactNode;
  helpLabel?: string;
  helperText?: React.ReactNode;
  error?: boolean;
  showCounter?: boolean;
  maxLength?: number;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  action?: TextFieldAction;
  clearable?: boolean;
  clearLabel?: string;
  onClear?: () => void;
  passwordToggle?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  endButton?: TextFieldEndButton;
  readOnly?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  id?: string;
  name?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  value?: FieldValue;
  defaultValue?: FieldValue;
  onChange?: React.ChangeEventHandler<InputElement>;
  onBlur?: React.FocusEventHandler<InputElement>;
  onFocus?: React.FocusEventHandler<InputElement>;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<InputElement>['inputMode'];
  inputRef?: React.Ref<InputElement>;
  className?: string;
  [dataAttribute: `data-${string}`]: unknown;
}

interface FieldRootProps {
  $hasAction: boolean;
  $hasEndButton: boolean;
  $multiline: boolean;
  $readOnly: boolean;
  $resize: 'vertical' | 'none';
  $size: TextFieldSize;
}

const Root = styled(FormControl)({
  minInlineSize: cssVars.spacing.none,
});

const FieldRow = styled('div')({
  display: 'flex',
  alignItems: 'flex-start',
  minInlineSize: cssVars.spacing.none,
  inlineSize: '100%',
});

const FieldRoot = styled(OutlinedInput, {
  shouldForwardProp: (prop) =>
    prop !== '$hasAction' &&
    prop !== '$hasEndButton' &&
    prop !== '$multiline' &&
    prop !== '$readOnly' &&
    prop !== '$resize' &&
    prop !== '$size',
})<FieldRootProps>(({ $hasAction, $hasEndButton, $multiline, $readOnly, $resize, $size }) => {
  const size = textFieldSizeTokens[$size];
  const normal = textFieldStateTokens[$readOnly ? 'read-only' : 'default'];
  const hovered = textFieldStateTokens.hovered;
  const focused = textFieldStateTokens.focused;
  const error = textFieldStateTokens.error;
  const disabled = textFieldStateTokens.disabled;

  return {
    ...size.inputTypography,
    boxSizing: 'border-box',
    flex: '1 1 auto',
    minInlineSize: cssVars.spacing.none,
    height: $multiline ? 'auto' : size.height,
    minBlockSize: size.height,
    paddingInline: size.paddingInline,
    paddingInlineEnd: $hasAction ? size.actionInset : size.paddingInline,
    paddingBlock: $multiline ? size.gap : cssVars.spacing.none,
    gap: size.gap,
    alignItems: $multiline ? 'flex-start' : 'center',
    borderRadius: size.radius,
    borderStartEndRadius: $hasEndButton ? cssVars.radius.none : size.radius,
    borderEndEndRadius: $hasEndButton ? cssVars.radius.none : size.radius,
    backgroundColor: normal.background,
    color: normal.input,
    transition: [
      `background-color ${textFieldMotionTokens.instantDuration} ${textFieldMotionTokens.easing}`,
      `color ${textFieldMotionTokens.instantDuration} ${textFieldMotionTokens.easing}`,
    ].join(', '),

    '& .MuiOutlinedInput-notchedOutline': {
      top: cssVars.spacing.none,
      borderColor: normal.border,
      borderWidth: normal.borderWidth,
      borderRadius: size.radius,
      borderStartEndRadius: $hasEndButton ? cssVars.radius.none : size.radius,
      borderEndEndRadius: $hasEndButton ? cssVars.radius.none : size.radius,
      transition: [
        `border-color ${
          $readOnly ? textFieldMotionTokens.instantDuration : textFieldMotionTokens.duration
        } ${textFieldMotionTokens.easing}`,
        `border-width ${
          $readOnly ? textFieldMotionTokens.instantDuration : textFieldMotionTokens.duration
        } ${textFieldMotionTokens.easing}`,
      ].join(', '),
    },
    '& .MuiOutlinedInput-notchedOutline legend': {
      display: 'none',
    },
    '&:hover:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error):not([data-read-only="true"])': {
      backgroundColor: hovered.background,
    },
    '&:hover:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error):not([data-read-only="true"]) .MuiOutlinedInput-notchedOutline': {
      borderColor: hovered.border,
      borderWidth: hovered.borderWidth,
    },
    '&:hover:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error):not([data-read-only="true"]) .bw-text-field__addon': {
      borderColor: hovered.border,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: focused.border,
      borderWidth: focused.borderWidth,
      transitionDuration: textFieldMotionTokens.duration,
    },
    '&.Mui-focused .bw-text-field__addon': {
      borderColor: focused.border,
      transitionDuration: textFieldMotionTokens.duration,
    },
    '&.Mui-error .MuiOutlinedInput-notchedOutline': {
      borderColor: error.border,
      borderWidth: error.borderWidth,
    },
    '&.Mui-error .bw-text-field__addon': {
      borderColor: error.border,
    },
    '&.Mui-focused.Mui-error .MuiOutlinedInput-notchedOutline': {
      borderColor: error.border,
      borderWidth: focused.borderWidth,
    },
    '&.Mui-disabled': {
      backgroundColor: disabled.background,
      color: disabled.input,
      transitionDuration: textFieldMotionTokens.instantDuration,
    },
    '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
      borderColor: disabled.border,
      borderWidth: disabled.borderWidth,
      transitionDuration: textFieldMotionTokens.instantDuration,
    },
    '&.Mui-disabled .bw-text-field__addon': {
      borderColor: disabled.border,
    },
    '& .MuiInputBase-input': {
      ...size.inputTypography,
      boxSizing: 'border-box',
      minInlineSize: cssVars.spacing.none,
      height: 'auto',
      padding: cssVars.spacing.none,
      color: 'inherit',
    },
    '& .MuiInputBase-inputMultiline': {
      resize: $multiline ? $resize : undefined,
    },
    '& .MuiInputBase-input::placeholder': {
      color: normal.placeholder,
      opacity: 1,
    },
    '&.Mui-disabled .MuiInputBase-input': {
      color: disabled.input,
      WebkitTextFillColor: disabled.input,
    },
    '&.Mui-disabled .MuiInputBase-input::placeholder': {
      color: disabled.placeholder,
      opacity: 1,
    },
    '& .bw-text-field__leading-icon, & .bw-text-field__trailing-icon': {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none',
      inlineSize: size.icon,
      blockSize: size.icon,
      fontSize: size.icon,
      color: normal.icon,
      pointerEvents: 'none',
      transition: `color ${textFieldMotionTokens.duration} ${textFieldMotionTokens.easing}`,
    },
    '& .bw-text-field__leading-icon > *, & .bw-text-field__trailing-icon > *': {
      inlineSize: '100%',
      blockSize: '100%',
    },
    '&.Mui-focused .bw-text-field__leading-icon, &.Mui-focused .bw-text-field__trailing-icon': {
      color: focused.icon,
    },
    '&.Mui-disabled .bw-text-field__leading-icon, &.Mui-disabled .bw-text-field__trailing-icon': {
      color: disabled.icon,
      transitionDuration: textFieldMotionTokens.instantDuration,
    },
  };
});

const AttachedButton = styled(Button)({
  flex: 'none',
  marginInlineStart: `calc(${cssVars.border.width.default} * -1)`,
  borderStartStartRadius: cssVars.radius.none,
  borderEndStartRadius: cssVars.radius.none,
});

function mergeIds(...values: Array<string | undefined>): string | undefined {
  const ids = values.flatMap((item) => item?.split(/\s+/).filter(Boolean) ?? []);
  return ids.length ? [...new Set(ids)].join(' ') : undefined;
}

function valueLength(fieldValue: FieldValue | undefined): number {
  return fieldValue == null ? 0 : Array.from(String(fieldValue)).length;
}

function splitForwardedProps(props: Record<string, unknown>): {
  ariaProps: React.AriaAttributes;
  dataProps: Record<string, unknown>;
} {
  const ariaProps: Record<string, unknown> = {};
  const dataProps: Record<string, unknown> = {};

  for (const [key, propValue] of Object.entries(props)) {
    if (key.startsWith('aria-')) ariaProps[key] = propValue;
    else if (key.startsWith('data-')) dataProps[key] = propValue;
  }

  return { ariaProps: ariaProps as React.AriaAttributes, dataProps };
}

function writeNativeValue(input: InputElement, nextValue: string): void {
  const prototype =
    input instanceof HTMLTextAreaElement
      ? HTMLTextAreaElement.prototype
      : HTMLInputElement.prototype;
  const setter = Object.getOwnPropertyDescriptor(prototype, 'value')?.set;
  if (setter) setter.call(input, nextValue);
  else input.value = nextValue;
}

/**
 * Biowave text field. Uses a persistent static label and one API for native
 * single-line input and multiline textarea behavior.
 */
export const TextField = React.forwardRef<HTMLDivElement, TextFieldProps>(function TextField(
  {
    label,
    hideLabel = false,
    size = 'md',
    multiline = false,
    rows,
    minRows,
    maxRows,
    resize: resizeProp,
    required = false,
    helpText,
    helpLabel,
    helperText,
    error = false,
    showCounter = false,
    maxLength,
    startAdornment,
    endAdornment,
    action,
    clearable = false,
    clearLabel,
    onClear,
    passwordToggle,
    prefix,
    suffix,
    endButton,
    readOnly = false,
    disabled = false,
    fullWidth = true,
    id: suppliedId,
    name,
    type = 'text',
    placeholder,
    value,
    defaultValue,
    onChange,
    onBlur,
    onFocus,
    autoComplete,
    inputMode,
    inputRef,
    className,
    ...forwardedProps
  },
  ref,
) {
  const { locale } = useBiowave();
  const generatedId = React.useId();
  const inputId = suppliedId ?? `bw-text-field-${generatedId}`;
  const nativeInputRef = React.useRef<InputElement | null>(null);
  const pendingSelection = React.useRef<{
    direction: 'forward' | 'backward' | 'none' | null;
    end: number | null;
    start: number | null;
  } | null>(null);
  const [uncontrolledValue, setUncontrolledValue] = React.useState<FieldValue | undefined>(
    defaultValue,
  );
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const currentValue = value !== undefined ? value : uncontrolledValue;
  const hasValue = valueLength(currentValue) > 0;
  const effectiveReadOnly = readOnly && !disabled;
  const effectiveError = error && !disabled;
  const effectiveMinRows = multiline && rows == null ? (minRows ?? 3) : undefined;
  const resize = resizeProp ?? 'vertical';
  const passwordAction = !multiline && type === 'password' && passwordToggle !== false;
  const configuredActionCount = Number(passwordAction) + Number(Boolean(action)) + Number(clearable);
  const hasConfiguredAction = passwordAction || action != null || clearable;
  const clearVisible = clearable && hasValue && !disabled && !effectiveReadOnly;
  const hasRenderedAction = passwordAction || action != null || clearVisible;
  const effectivePrefix = multiline ? undefined : prefix;
  const effectiveEndButton = multiline ? undefined : endButton;
  const effectiveSuffix = multiline || effectiveEndButton ? undefined : suffix;
  const effectiveEndAdornment = hasConfiguredAction ? undefined : endAdornment;
  const prefixId = effectivePrefix != null ? `${inputId}-prefix` : undefined;
  const suffixId = effectiveSuffix != null ? `${inputId}-suffix` : undefined;
  const helperId = helperText != null ? `${inputId}-supporting` : undefined;
  const counterVisible = showCounter && maxLength != null;
  const counterId = counterVisible ? `${inputId}-counter` : undefined;
  const { ariaProps, dataProps } = splitForwardedProps(forwardedProps);
  const callerDescribedBy = ariaProps['aria-describedby'];
  const describedBy = mergeIds(
    typeof callerDescribedBy === 'string' ? callerDescribedBy : undefined,
    helperId,
    counterId,
    prefixId,
    suffixId,
  );
  const effectiveHelpLabel =
    helpLabel ??
    (typeof label === 'string'
      ? locale === 'ar'
        ? `مزيد من المعلومات عن ${label}`
        : `More information about ${label}`
      : undefined);
  const helpVisible = helpText != null && effectiveHelpLabel != null;
  const helpId = helpVisible ? `${inputId}-help` : undefined;
  const effectiveClearLabel =
    clearLabel ??
    (locale === 'ar'
      ? `مسح ${typeof label === 'string' ? label : 'الحقل'}`
      : `Clear ${typeof label === 'string' ? label : 'field'}`);
  const passwordLabel = passwordVisible
    ? locale === 'ar'
      ? 'إخفاء كلمة المرور'
      : 'Hide password'
    : locale === 'ar'
      ? 'إظهار كلمة المرور'
      : 'Show password';
  const effectiveType = passwordAction && passwordVisible ? 'text' : type;

  const setNativeInputRef = React.useCallback(
    (node: InputElement | null) => {
      nativeInputRef.current = node;
      if (typeof inputRef === 'function') inputRef(node);
      else if (inputRef) {
        (inputRef as React.MutableRefObject<InputElement | null>).current = node;
      }
    },
    [inputRef],
  );

  React.useEffect(() => {
    if (value !== undefined) return undefined;
    const form = nativeInputRef.current?.form;
    if (!form) return undefined;
    let active = true;

    const handleReset = () => {
      queueMicrotask(() => {
        if (active) setUncontrolledValue(nativeInputRef.current?.value ?? defaultValue);
      });
    };

    form.addEventListener('reset', handleReset);
    return () => {
      active = false;
      form.removeEventListener('reset', handleReset);
    };
  }, [defaultValue, inputId, value]);

  React.useLayoutEffect(() => {
    const selection = pendingSelection.current;
    const input = nativeInputRef.current;
    if (!selection || !input) return;

    pendingSelection.current = null;
    input.focus();
    if (selection.start != null && selection.end != null) {
      input.setSelectionRange(selection.start, selection.end, selection.direction ?? undefined);
    }
  }, [passwordVisible]);

  React.useEffect(() => {
    if (type !== 'password' && passwordVisible) setPasswordVisible(false);
  }, [passwordVisible, type]);

  if (showCounter && maxLength == null) {
    warnOnce(
      'text-field-counter-without-limit',
      'TextField: showCounter requires maxLength; the counter is hidden.',
    );
  }
  if (!multiline && (rows != null || minRows != null || maxRows != null || resizeProp != null)) {
    warnOnce(
      'text-field-multiline-props-single-line',
      'TextField: rows, minRows, maxRows and resize apply only when multiline=true; multiline props are ignored.',
    );
  }
  if (multiline && type !== 'text') {
    warnOnce(
      'text-field-multiline-type',
      'TextField: type is ignored when multiline=true; a native textarea is rendered.',
    );
  }
  if (disabled && readOnly) {
    warnOnce(
      'text-field-disabled-read-only',
      'TextField: disabled and readOnly were both set; disabled semantics and visuals win.',
    );
  }
  if (configuredActionCount > 1) {
    warnOnce(
      'text-field-multiple-actions',
      'TextField: only one trailing action is allowed; passwordToggle, action and clearable are applied in that priority.',
    );
  }
  if (endAdornment != null && hasConfiguredAction) {
    warnOnce(
      'text-field-adornment-with-action',
      'TextField: endAdornment is ignored when a managed trailing action is configured.',
    );
  }
  if (multiline && (prefix != null || suffix != null || endButton != null)) {
    warnOnce(
      'text-field-addons-multiline',
      'TextField: prefix, suffix and endButton are ignored when multiline=true.',
    );
  }
  if (!multiline && suffix != null && endButton != null) {
    warnOnce(
      'text-field-suffix-end-button',
      'TextField: suffix is ignored when endButton is set.',
    );
  }
  if (helpText != null && effectiveHelpLabel == null) {
    warnOnce(
      'text-field-help-label',
      'TextField: helpLabel is required when helpText is used with a non-string label; the help icon is hidden.',
    );
  }

  const handleChange: React.ChangeEventHandler<InputElement> = (event) => {
    if (value === undefined) setUncontrolledValue(event.currentTarget.value);
    onChange?.(event);
  };

  const handleClear = () => {
    const input = nativeInputRef.current;
    if (!input) return;

    writeNativeValue(input, '');
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.focus();
    onClear?.();
  };

  const handlePasswordToggle = () => {
    const input = nativeInputRef.current;
    if (input) {
      pendingSelection.current = {
        start: input.selectionStart,
        end: input.selectionEnd,
        direction: input.selectionDirection,
      };
    }
    setPasswordVisible((visible) => !visible);
  };

  const handleFieldMouseDown: React.MouseEventHandler<HTMLDivElement> = (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest('button, a, input, textarea, [role="button"]')) return;

    event.preventDefault();
    nativeInputRef.current?.focus();
  };

  const trailingAction = passwordAction ? (
    <FieldAction
      disabled={disabled}
      icon={<Icon name={passwordVisible ? 'visibility_off' : 'visibility'} />}
      label={passwordLabel}
      multiline={multiline}
      onClick={handlePasswordToggle}
      selected={passwordVisible}
      selectedIcon={<Icon name={passwordVisible ? 'visibility_off' : 'visibility'} />}
      size={size}
      toggle
    />
  ) : action ? (
    <FieldAction
      disabled={disabled}
      icon={action.icon}
      label={action.label}
      multiline={multiline}
      onClick={action.onClick}
      size={size}
    />
  ) : clearVisible ? (
    <FieldAction
      disabled={disabled}
      icon={<Icon name="close" />}
      label={effectiveClearLabel}
      multiline={multiline}
      onClick={handleClear}
      size={size}
    />
  ) : undefined;

  return (
    <Root
      ref={ref}
      className={className}
      fullWidth={fullWidth}
      disabled={disabled}
      error={effectiveError}
      required={required}
      {...dataProps}
    >
      <FieldLabel
        disabled={disabled}
        hidden={hideLabel}
        htmlFor={inputId}
        helpId={helpId}
        helpLabel={effectiveHelpLabel}
        helpText={helpVisible ? helpText : undefined}
        required={required}
        size={size}
      >
        {label}
      </FieldLabel>
      <FieldRow className="bw-text-field__field-row">
        <FieldRoot
          className="bw-text-field__field"
          name={name}
          type={multiline ? undefined : effectiveType}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          onBlur={onBlur}
          onFocus={onFocus}
          onMouseDown={handleFieldMouseDown}
          autoComplete={autoComplete}
          inputRef={setNativeInputRef}
          placeholder={placeholder}
          disabled={disabled}
          error={effectiveError}
          required={required}
          readOnly={effectiveReadOnly}
          multiline={multiline}
          rows={multiline ? rows : undefined}
          minRows={effectiveMinRows}
          maxRows={multiline && rows == null ? maxRows : undefined}
          notched={false}
          data-read-only={effectiveReadOnly ? 'true' : undefined}
          startAdornment={
            effectivePrefix != null || startAdornment != null ? (
              <>
                {effectivePrefix != null && prefixId ? (
                  <FieldAddon
                    disabled={disabled}
                    edgePadding={textFieldSizeTokens[size].paddingInline}
                    id={prefixId}
                    position="prefix"
                    readOnly={effectiveReadOnly}
                    size={size}
                  >
                    {effectivePrefix}
                  </FieldAddon>
                ) : null}
                {startAdornment != null ? (
                  <span className="bw-text-field__leading-icon" aria-hidden="true">
                    {startAdornment}
                  </span>
                ) : null}
              </>
            ) : undefined
          }
          endAdornment={
            trailingAction != null || effectiveEndAdornment != null || effectiveSuffix != null ? (
              <>
                {trailingAction}
                {effectiveEndAdornment != null ? (
                  <span className="bw-text-field__trailing-icon" aria-hidden="true">
                    {effectiveEndAdornment}
                  </span>
                ) : null}
                {effectiveSuffix != null && suffixId ? (
                  <FieldAddon
                    disabled={disabled}
                    edgePadding={
                      hasRenderedAction
                        ? textFieldSizeTokens[size].actionInset
                        : textFieldSizeTokens[size].paddingInline
                    }
                    id={suffixId}
                    position="suffix"
                    readOnly={effectiveReadOnly}
                    size={size}
                  >
                    {effectiveSuffix}
                  </FieldAddon>
                ) : null}
              </>
            ) : undefined
          }
          inputProps={{
            ...ariaProps,
            className: 'bw-text-field__input',
            id: inputId,
            inputMode,
            maxLength,
            'aria-describedby': describedBy,
            'aria-invalid': effectiveError || ariaProps['aria-invalid'] || undefined,
          }}
          $hasAction={hasRenderedAction}
          $hasEndButton={effectiveEndButton != null}
          $multiline={multiline}
          $readOnly={effectiveReadOnly}
          $resize={resize}
          $size={size}
        />
        {effectiveEndButton ? (
          <AttachedButton
            className="bw-text-field__end-button"
            variant="outlined"
            color="neutral"
            size={size}
            startIcon={effectiveEndButton.icon}
            loading={effectiveEndButton.loading}
            disabled={disabled}
            onClick={effectiveEndButton.onClick}
          >
            {effectiveEndButton.label}
          </AttachedButton>
        ) : null}
      </FieldRow>
      {helperText != null || counterVisible ? (
        <FieldSupportingText
          counter={counterVisible ? `${valueLength(currentValue)} / ${maxLength}` : undefined}
          counterId={counterId}
          disabled={disabled}
          error={effectiveError}
          helperId={helperId}
          helperText={helperText}
          size={size}
        />
      ) : null}
    </Root>
  );
});

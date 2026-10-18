import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import { warnOnce } from '../../internal/warnOnce';
import { FieldLabel } from './FieldLabel';
import { FieldSupportingText } from './FieldSupportingText';
import {
  textFieldMotionTokens,
  textFieldSizeTokens,
  textFieldStateTokens,
  textFieldTargetToken,
  type TextFieldSize,
} from './text-field.tokens';

export type { TextFieldSize } from './text-field.tokens';

type FieldValue = string | number;
type InputElement = HTMLInputElement | HTMLTextAreaElement;

export interface TextFieldProps extends React.AriaAttributes {
  label: React.ReactNode;
  hideLabel?: boolean;
  size?: TextFieldSize;
  multiline?: boolean;
  rows?: number;
  minRows?: number;
  maxRows?: number;
  required?: boolean;
  helperText?: React.ReactNode;
  error?: boolean;
  showCounter?: boolean;
  maxLength?: number;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
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
  inputRef?: React.Ref<InputElement>;
  className?: string;
  [dataAttribute: `data-${string}`]: unknown;
}

interface FieldRootProps {
  $multiline: boolean;
  $readOnly: boolean;
  $size: TextFieldSize;
}

const Root = styled(FormControl)({
  minInlineSize: 0,
});

const FieldRoot = styled(OutlinedInput, {
  shouldForwardProp: (prop) =>
    prop !== '$multiline' && prop !== '$readOnly' && prop !== '$size',
})<FieldRootProps>(({ $multiline, $readOnly, $size }) => {
  const size = textFieldSizeTokens[$size];
  const normal = textFieldStateTokens[$readOnly ? 'read-only' : 'default'];
  const hover = textFieldStateTokens.hover;
  const focus = textFieldStateTokens.focus;
  const error = textFieldStateTokens.error;
  const disabled = textFieldStateTokens.disabled;

  return {
    ...size.inputTypography,
    boxSizing: 'border-box',
    minInlineSize: 0,
    height: $multiline ? 'auto' : size.height,
    minBlockSize: size.height,
    paddingInline: size.paddingInline,
    paddingBlock: $multiline ? size.gap : 0,
    gap: size.gap,
    alignItems: $multiline ? 'flex-start' : 'center',
    borderRadius: size.radius,
    backgroundColor: normal.background,
    color: normal.input,
    transition: [
      `background-color ${textFieldMotionTokens.instantDuration} ${textFieldMotionTokens.easing}`,
      `color ${textFieldMotionTokens.instantDuration} ${textFieldMotionTokens.easing}`,
    ].join(', '),

    '& .MuiOutlinedInput-notchedOutline': {
      top: 0,
      borderColor: normal.border,
      borderWidth: normal.borderWidth,
      borderRadius: size.radius,
      transition: [
        `border-color ${textFieldMotionTokens.duration} ${textFieldMotionTokens.easing}`,
        `border-width ${textFieldMotionTokens.duration} ${textFieldMotionTokens.easing}`,
      ].join(', '),
    },
    '& .MuiOutlinedInput-notchedOutline legend': {
      display: 'none',
    },
    '&:hover:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
      borderColor: hover.border,
      borderWidth: hover.borderWidth,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: focus.border,
      borderWidth: focus.borderWidth,
    },
    '&.Mui-error .MuiOutlinedInput-notchedOutline': {
      borderColor: error.border,
      borderWidth: error.borderWidth,
    },
    '&.Mui-focused.Mui-error .MuiOutlinedInput-notchedOutline': {
      borderColor: error.border,
      borderWidth: focus.borderWidth,
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
    '& .MuiInputBase-input': {
      ...size.inputTypography,
      boxSizing: 'border-box',
      minInlineSize: 0,
      height: 'auto',
      padding: 0,
      color: 'inherit',
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
    '& .bw-text-field__leading-icon, & .bw-text-field__trailing-action': {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none',
      color: normal.icon,
      transition: `color ${textFieldMotionTokens.duration} ${textFieldMotionTokens.easing}`,
    },
    '& .bw-text-field__leading-icon': {
      inlineSize: size.icon,
      blockSize: size.icon,
      fontSize: size.icon,
    },
    '& .bw-text-field__trailing-action': {
      minInlineSize: textFieldTargetToken,
      minBlockSize: textFieldTargetToken,
    },
    '& .bw-text-field__leading-icon > *, & .bw-text-field__trailing-action > svg': {
      inlineSize: size.icon,
      blockSize: size.icon,
    },
    '&.Mui-focused .bw-text-field__leading-icon, &.Mui-focused .bw-text-field__trailing-action': {
      color: focus.icon,
    },
    '&.Mui-error .bw-text-field__leading-icon, &.Mui-error .bw-text-field__trailing-action': {
      color: error.icon,
    },
    '&.Mui-disabled .bw-text-field__leading-icon, &.Mui-disabled .bw-text-field__trailing-action': {
      color: disabled.icon,
      transitionDuration: textFieldMotionTokens.instantDuration,
    },
  };
});

function mergeIds(...values: Array<string | undefined>): string | undefined {
  const ids = values.flatMap((value) => value?.split(/\s+/).filter(Boolean) ?? []);
  return ids.length ? [...new Set(ids)].join(' ') : undefined;
}

function valueLength(value: FieldValue | undefined): number {
  return value == null ? 0 : Array.from(String(value)).length;
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
    required = false,
    helperText,
    error = false,
    showCounter = false,
    maxLength,
    startAdornment,
    endAdornment,
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
    inputRef,
    className,
    'aria-describedby': callerDescribedBy,
    ...rootProps
  },
  ref,
) {
  const generatedId = React.useId();
  const inputId = suppliedId ?? `bw-text-field-${generatedId}`;
  const helperId = helperText != null ? `${inputId}-supporting` : undefined;
  const counterVisible = showCounter && maxLength != null;
  const counterId = counterVisible ? `${inputId}-counter` : undefined;
  const describedBy = mergeIds(callerDescribedBy, helperId, counterId);
  const [uncontrolledValue, setUncontrolledValue] = React.useState<FieldValue | undefined>(
    defaultValue,
  );
  const currentValue = value !== undefined ? value : uncontrolledValue;
  const effectiveReadOnly = readOnly && !disabled;
  const effectiveMinRows = multiline && rows == null ? (minRows ?? 3) : undefined;

  if (showCounter && maxLength == null) {
    warnOnce(
      'text-field-counter-without-limit',
      'TextField: showCounter requires maxLength; the counter is hidden.',
    );
  }
  if (!multiline && (rows != null || minRows != null || maxRows != null)) {
    warnOnce(
      'text-field-rows-single-line',
      'TextField: rows, minRows and maxRows apply only when multiline=true; row props are ignored.',
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

  const handleChange: React.ChangeEventHandler<InputElement> = (event) => {
    if (value === undefined) setUncontrolledValue(event.currentTarget.value);
    onChange?.(event);
  };

  return (
    <Root
      ref={ref}
      className={className}
      fullWidth={fullWidth}
      disabled={disabled}
      error={error}
      required={required}
      {...rootProps}
    >
      <FieldLabel
        disabled={disabled}
        hidden={hideLabel}
        htmlFor={inputId}
        required={required}
        size={size}
      >
        {label}
      </FieldLabel>
      <FieldRoot
        className="bw-text-field__field"
        id={undefined}
        name={name}
        type={multiline ? undefined : type}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        onBlur={onBlur}
        onFocus={onFocus}
        autoComplete={autoComplete}
        inputRef={inputRef}
        placeholder={placeholder}
        disabled={disabled}
        error={error}
        required={required}
        readOnly={effectiveReadOnly}
        multiline={multiline}
        rows={multiline ? rows : undefined}
        minRows={effectiveMinRows}
        maxRows={multiline && rows == null ? maxRows : undefined}
        notched={false}
        startAdornment={
          startAdornment ? (
            <span className="bw-text-field__leading-icon" aria-hidden="true">
              {startAdornment}
            </span>
          ) : undefined
        }
        endAdornment={
          endAdornment ? (
            <span className="bw-text-field__trailing-action">{endAdornment}</span>
          ) : undefined
        }
        inputProps={{
          id: inputId,
          maxLength,
          'aria-describedby': describedBy,
          'aria-invalid': error || undefined,
        }}
        $multiline={multiline}
        $readOnly={effectiveReadOnly}
        $size={size}
      />
      {helperText != null || counterVisible ? (
        <FieldSupportingText
          counter={counterVisible ? `${valueLength(currentValue)} / ${maxLength}` : undefined}
          counterId={counterId}
          disabled={disabled}
          error={error}
          helperId={helperId}
          helperText={helperText}
          size={size}
        />
      ) : null}
    </Root>
  );
});

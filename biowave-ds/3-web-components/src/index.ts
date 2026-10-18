// @biowave/web — public API.
// Components are added one at a time from approved plans (see 3-web-components/README.md).
// Re-export foundations so apps need a single import.
export * from '@biowave/foundations';

// Components (keep alphabetical):
export {
  Button,
  type ButtonProps,
  type ButtonDirectionalIconProps,
  type ButtonVariant,
  type ButtonColor,
  type ButtonSize,
} from './components/button';
export {
  ButtonGroup,
  type ButtonGroupProps,
  type ButtonGroupOrientation,
  type ButtonGroupAlign,
  type ButtonGroupSize,
} from './components/button-group';
export {
  IconButton,
  type IconButtonProps,
  type IconButtonVariant,
  type IconButtonColor,
  type IconButtonSize,
} from './components/icon-button';
export {
  SplitButton,
  type SplitButtonProps,
  type SplitButtonOption,
  type SplitButtonVariant,
  type SplitButtonColor,
  type SplitButtonSize,
} from './components/split-button';
export { TextField, type TextFieldProps, type TextFieldSize } from './components/text-field';

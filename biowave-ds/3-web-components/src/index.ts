// @biowave/web — public API.
// Components are added one at a time from approved plans (see 3-web-components/README.md).
// Re-export foundations so apps need a single import.
export * from '@biowave/foundations';

// Components (keep alphabetical):
export {
  Badge,
  type BadgeProps,
  type BadgeVariant,
  type BadgeColor,
  type BadgeOverlap,
} from './components/badge';
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
  Divider,
  type DividerProps,
  type DividerComponent,
  type DividerOrientation,
  type DividerEmphasis,
  type DividerInset,
} from './components/divider';
export {
  Icon,
  type IconProps,
  type IconName,
  type IconColor,
  type IconSize,
  type MaterialSymbol,
} from './components/icon';
export {
  IconButton,
  type IconButtonProps,
  type IconButtonVariant,
  type IconButtonColor,
  type IconButtonSize,
} from './components/icon-button';
export {
  Link,
  type LinkProps,
  type LinkColor,
  type LinkSize,
  type LinkUnderline,
} from './components/link';
export {
  SplitButton,
  type SplitButtonProps,
  type SplitButtonOption,
  type SplitButtonVariant,
  type SplitButtonColor,
  type SplitButtonSize,
} from './components/split-button';
export {
  TextField,
  type TextFieldAction,
  type TextFieldEndButton,
  type TextFieldProps,
  type TextFieldSize,
} from './components/text-field';
export {
  Tooltip,
  type TooltipProps,
  type TooltipPlacement,
  type TooltipPurpose,
} from './components/tooltip';

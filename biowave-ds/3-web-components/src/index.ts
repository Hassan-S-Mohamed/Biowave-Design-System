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

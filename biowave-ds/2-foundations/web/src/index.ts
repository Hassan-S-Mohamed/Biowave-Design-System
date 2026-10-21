// @biowave/foundations — public API
export * from './generated/tokens';
export { createBiowaveTheme, biowaveVariants, type BiowaveTypographyVariant, type CreateBiowaveThemeOptions } from './mui/createBiowaveTheme';
export {
  BiowaveProvider,
  createBiowaveEmotionCaches,
  useBiowave,
  type BiowaveEmotionCaches,
  type BiowaveProviderProps,
  type ThemePreference,
} from './BiowaveProvider';
export type { MaterialSymbol } from '@material-symbols/font-400';

import Icon, { type IconProps } from '@mui/material/Icon';

export interface MaterialSymbolProps extends Omit<IconProps, 'children' | 'baseClassName'> {
  /** Material Symbols name in snake_case, e.g. `push_pin` (2-foundations/guidelines/icons.md). */
  name: string;
  /** Selected state: same glyph with FILL 1. */
  filled?: boolean;
}

/** Test helper: a Material Symbols Rounded glyph (D-18). Replaced by the Biowave Icon once it ships. */
export function MaterialSymbol({ name, filled = false, className, ...props }: MaterialSymbolProps) {
  return (
    <Icon
      baseClassName="material-symbols-rounded"
      fontSize="inherit"
      className={[filled ? 'bw-icon-fill' : '', className ?? ''].filter(Boolean).join(' ') || undefined}
      {...props}
    >
      {name}
    </Icon>
  );
}

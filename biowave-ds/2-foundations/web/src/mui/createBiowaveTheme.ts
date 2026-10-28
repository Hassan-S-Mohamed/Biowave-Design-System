// Maps Biowave tokens onto an MUI theme. Hand-written, but every value comes from generated tokens.
import type * as React from 'react';
// Rule: never put a raw color / px value here. Add a token first, rebuild, then map it.
import { createTheme, type Theme, type PaletteOptions } from '@mui/material/styles';
import { base, themes, platforms, cssVars, type ThemeName } from '../generated/tokens';

type Direction = 'ltr' | 'rtl';

function palette(name: ThemeName): PaletteOptions {
  const c = themes[name].color;
  const role = (r: 'brand' | 'secondary' | 'success' | 'error' | 'warning' | 'info') => ({
    main: c.background[r].default,
    dark: c.background[r].pressed,
    light: c.background[r].subtle,
    contrastText: c.text.on[r],
  });
  return {
    mode: name,
    primary: role('brand'),
    secondary: role('secondary'),
    success: role('success'),
    error: role('error'),
    warning: role('warning'),
    info: role('info'),
    text: { primary: c.text.default, secondary: c.text.subtlest, disabled: c.text.disabled },
    background: { default: c.surface.page, paper: c.surface.default },
    divider: c.border.default,
    action: {
      // state layers = background/transparent/*, selection = background/selected/* (same tokens as Figma and Flutter)
      hover: c.background.transparent.hovered,
      selected: c.background.selected.default,
      disabled: c.text.disabled,
      disabledBackground: c.background.disabled,
      focus: c.background.transparent.pressed,
    },
  };
}

const t = cssVars.font;
// Font size / line height come from CSS variables, so platform (data-platform) and
// language (:lang(ar)) switch them at runtime without rebuilding the theme.
const variant = (role: keyof typeof t.size, size: string) => {
  const sizes = t.size[role] as Record<string, string>;
  const lines = t['line-height'][role as keyof (typeof t)['line-height']] as Record<string, string>;
  return {
    fontFamily: t.family.active,
    fontSize: sizes[size],
    lineHeight: lines[size],
    fontWeight: t.weight[role as keyof typeof t.weight],
    letterSpacing: role === 'display' ? 'var(--bw-font-letter-spacing-display)' : 'var(--bw-font-letter-spacing-default)',
  };
};

/** Biowave custom typography variants, available as <Typography variant="headingLg"> etc. */
export const biowaveVariants = {
  displayLg: variant('display', 'lg'), displayMd: variant('display', 'md'),
  headingLg: variant('heading', 'lg'), headingMd: variant('heading', 'md'), headingSm: variant('heading', 'sm'),
  titleLg: variant('title', 'lg'), titleMd: variant('title', 'md'),
  bodyLg: variant('body', 'lg'), bodyMd: variant('body', 'md'), bodySm: variant('body', 'sm'),
  labelLg: variant('label', 'lg'), labelMd: variant('label', 'md'), labelSm: variant('label', 'sm'),
  captionMd: variant('caption', 'md'), captionSm: variant('caption', 'sm'),
  actionLg: variant('action', 'lg'), actionMd: variant('action', 'md'), actionSm: variant('action', 'sm'),
  dataLg: variant('data', 'lg'), dataMd: variant('data', 'md'), dataSm: variant('data', 'sm'),
} as const;

export type BiowaveTypographyVariant = keyof typeof biowaveVariants;

declare module '@mui/material/styles' {
  interface TypographyVariants extends Record<BiowaveTypographyVariant, React.CSSProperties> {}
  interface TypographyVariantsOptions extends Partial<Record<BiowaveTypographyVariant, React.CSSProperties>> {}
}
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides extends Record<BiowaveTypographyVariant, true> {}
}

export interface CreateBiowaveThemeOptions {
  direction?: Direction;
}

/**
 * Creates the MUI theme for the Biowave Web App.
 * Light and dark are both included (CSS variables); the active one is chosen by
 * the `data-theme` attribute on <html>, which BiowaveProvider manages.
 */
export function createBiowaveTheme({ direction = 'ltr' }: CreateBiowaveThemeOptions = {}): Theme {
  const web = platforms.web;
  return createTheme({
    direction,
    cssVariables: { colorSchemeSelector: '[data-theme="%s"]', cssVarPrefix: 'mui' },
    colorSchemes: { light: { palette: palette('light') }, dark: { palette: palette('dark') } },
    spacing: 4, // theme.spacing(n) = n * 4px. Prefer cssVars.spacing.* for named steps.
    shape: { borderRadius: base.radius.md },
    breakpoints: {
      values: { xs: 0, sm: platforms.tablet.breakpoint.min, md: 840, lg: web.breakpoint.min, xl: 1600 },
    },
    zIndex: {
      appBar: base.layer.sticky,
      drawer: base.layer.drawer,
      modal: base.layer.modal,
      snackbar: base.layer.toast,
      tooltip: base.layer.tooltip,
    },
    transitions: {
      duration: {
        shortest: base.motion.duration.sm,
        shorter: base.motion.duration.sm,
        short: base.motion.duration.md,
        standard: base.motion.duration.lg,
        complex: base.motion.duration.xl,
        enteringScreen: base.motion.duration.lg,
        leavingScreen: base.motion.duration.md,
      },
      easing: {
        easeInOut: `cubic-bezier(${base.motion.easing.standard.join(',')})`,
        easeOut: `cubic-bezier(${base.motion.easing['standard-decelerate'].join(',')})`,
        easeIn: `cubic-bezier(${base.motion.easing['standard-accelerate'].join(',')})`,
        sharp: `cubic-bezier(${base.motion.easing['emphasized-accelerate'].join(',')})`,
      },
    },
    typography: {
      fontFamily: t.family.active,
      // Native MUI variants mapped to Biowave roles so third-party MUI components look right.
      h1: biowaveVariants.displayLg,
      h2: biowaveVariants.displayMd,
      h3: biowaveVariants.headingLg,
      h4: biowaveVariants.headingMd,
      h5: biowaveVariants.headingSm,
      h6: biowaveVariants.titleLg,
      subtitle1: biowaveVariants.titleLg,
      subtitle2: biowaveVariants.titleMd,
      body1: biowaveVariants.bodyMd,
      body2: biowaveVariants.bodySm,
      caption: biowaveVariants.captionMd,
      overline: { ...biowaveVariants.labelSm, textTransform: 'none' },
      button: { ...biowaveVariants.actionMd, textTransform: 'none' },
      ...biowaveVariants,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: { backgroundColor: cssVars.color.surface.page, color: cssVars.color.text.default },
        },
      },
      MuiButtonBase: { defaultProps: { disableRipple: false } },
    },
  });
}

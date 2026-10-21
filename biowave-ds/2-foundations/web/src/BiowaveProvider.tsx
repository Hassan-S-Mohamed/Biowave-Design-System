// Root provider for every Biowave web app. Wrap the app once:
//   <BiowaveProvider locale="ar" theme="system"><App /></BiowaveProvider>
// It sets <html lang / dir / data-platform>, wires MUI (theme + RTL cache) and keeps
// MUI's color scheme in sync with the `theme` prop. Import '@biowave/foundations/tokens.css' and
// '@biowave/foundations/icons.css' (Material Symbols Rounded, D-18) once.
import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache, { type EmotionCache } from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, useColorScheme } from '@mui/material/styles';
import { createBiowaveTheme } from './mui/createBiowaveTheme';
import type { LocaleName, PlatformName } from './generated/tokens';

export type ThemePreference = 'light' | 'dark' | 'system';

export interface BiowaveEmotionCaches {
  ltr: EmotionCache;
  rtl: EmotionCache;
}

export function createBiowaveEmotionCaches(
  options: { speedy?: boolean } = {},
): BiowaveEmotionCaches {
  return {
    ltr: createCache({ key: 'bw', prepend: true, speedy: options.speedy }),
    rtl: createCache({
      key: 'bw-rtl',
      prepend: true,
      speedy: options.speedy,
      stylisPlugins: [prefixer, rtlPlugin],
    }),
  };
}

export interface BiowaveProviderProps {
  /** UI language. 'ar' switches to RTL, Arabic font and Arabic line heights. */
  locale?: LocaleName;
  /** Color theme. 'system' follows the OS setting. */
  theme?: ThemePreference;
  /** Force a platform scale. Leave empty on the Web App: grid follows the viewport, type stays "web". */
  platform?: PlatformName;
  /** Advanced — tests and isolated roots. Defaults to the shared Biowave caches. */
  emotionCaches?: BiowaveEmotionCaches;
  children: React.ReactNode;
}

interface BiowaveContextValue {
  locale: LocaleName;
  direction: 'ltr' | 'rtl';
  theme: ThemePreference;
}

const BiowaveContext = React.createContext<BiowaveContextValue | null>(null);

/** Current locale, direction and theme preference. */
export function useBiowave(): BiowaveContextValue {
  const ctx = React.useContext(BiowaveContext);
  if (!ctx) throw new Error('useBiowave must be used inside <BiowaveProvider>');
  return ctx;
}

const defaultEmotionCaches = createBiowaveEmotionCaches();

function SyncColorScheme({ theme }: { theme: ThemePreference }) {
  const { setMode } = useColorScheme();
  React.useEffect(() => setMode(theme), [theme, setMode]);
  return null;
}

export function BiowaveProvider({
  locale = 'en',
  theme = 'system',
  platform,
  emotionCaches = defaultEmotionCaches,
  children,
}: BiowaveProviderProps) {
  const direction = locale === 'ar' ? 'rtl' : 'ltr';
  const muiTheme = React.useMemo(() => createBiowaveTheme({ direction }), [direction]);

  React.useEffect(() => {
    const html = document.documentElement;
    html.lang = locale;
    html.dir = direction;
    if (platform) html.setAttribute('data-platform', platform);
    else html.removeAttribute('data-platform');
  }, [locale, direction, platform]);

  const value = React.useMemo(() => ({ locale, direction, theme }) as const, [locale, direction, theme]);

  return (
    <BiowaveContext.Provider value={value}>
      <CacheProvider value={emotionCaches[direction]}>
        <ThemeProvider theme={muiTheme} defaultMode={theme}>
          <SyncColorScheme theme={theme} />
          <CssBaseline enableColorScheme />
          {children}
        </ThemeProvider>
      </CacheProvider>
    </BiowaveContext.Provider>
  );
}

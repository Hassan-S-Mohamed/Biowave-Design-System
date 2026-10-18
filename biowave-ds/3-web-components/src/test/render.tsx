import type { ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { BiowaveProvider } from '@biowave/foundations';

export interface RenderWithBiowaveOptions extends Omit<RenderOptions, 'wrapper'> {
  theme?: 'light' | 'dark';
  locale?: 'en' | 'ar';
}

export function renderWithBiowave(
  ui: ReactElement,
  { theme = 'light', locale = 'en', ...options }: RenderWithBiowaveOptions = {},
) {
  return render(ui, {
    wrapper: ({ children }) => (
      <BiowaveProvider theme={theme} locale={locale}>
        {children}
      </BiowaveProvider>
    ),
    ...options,
  });
}

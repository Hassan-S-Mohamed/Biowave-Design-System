import type { ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import {
  BiowaveProvider,
  createBiowaveEmotionCaches,
  type BiowaveEmotionCaches,
} from '@biowave/foundations';

export interface RenderWithBiowaveOptions extends Omit<RenderOptions, 'wrapper'> {
  theme?: 'light' | 'dark';
  locale?: 'en' | 'ar';
}

let testEmotionCaches: BiowaveEmotionCaches | undefined;

function getTestEmotionCaches(): BiowaveEmotionCaches {
  testEmotionCaches ??= createBiowaveEmotionCaches({ speedy: true });
  return testEmotionCaches;
}

export function resetTestEmotionCaches(): void {
  if (!testEmotionCaches) return;
  testEmotionCaches.ltr.sheet.flush();
  testEmotionCaches.rtl.sheet.flush();
  testEmotionCaches = undefined;
}

export function renderWithBiowave(
  ui: ReactElement,
  { theme = 'light', locale = 'en', ...options }: RenderWithBiowaveOptions = {},
) {
  const emotionCaches = getTestEmotionCaches();

  return render(ui, {
    wrapper: ({ children }) => (
      <BiowaveProvider theme={theme} locale={locale} emotionCaches={emotionCaches}>
        {children}
      </BiowaveProvider>
    ),
    ...options,
  });
}

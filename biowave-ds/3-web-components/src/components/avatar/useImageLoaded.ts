import { useEffect, useState } from 'react';

export type AvatarImageState = 'loading' | 'loaded' | 'error';

interface ImageLoadState {
  src: string;
  status: AvatarImageState;
}

/** Probe an image before handing it to MUI so the fallback never disappears while loading. */
export function useImageLoaded(src?: string): AvatarImageState {
  const normalizedSrc = src ?? '';
  const [loadState, setLoadState] = useState<ImageLoadState>(() => ({
    src: normalizedSrc,
    status: normalizedSrc ? 'loading' : 'error',
  }));

  useEffect(() => {
    if (!normalizedSrc) {
      setLoadState({ src: normalizedSrc, status: 'error' });
      return;
    }

    let active = true;
    const image = new Image();
    setLoadState({ src: normalizedSrc, status: 'loading' });

    image.onload = () => {
      if (active) setLoadState({ src: normalizedSrc, status: 'loaded' });
    };
    image.onerror = () => {
      if (active) setLoadState({ src: normalizedSrc, status: 'error' });
    };
    image.src = normalizedSrc;

    return () => {
      active = false;
      image.onload = null;
      image.onerror = null;
    };
  }, [normalizedSrc]);

  if (loadState.src !== normalizedSrc) return normalizedSrc ? 'loading' : 'error';
  return loadState.status;
}

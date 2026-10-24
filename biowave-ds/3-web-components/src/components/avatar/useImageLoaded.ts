import { useCallback, useRef, useState } from 'react';

export type AvatarImageState = 'loading' | 'loaded' | 'error';

interface ImageLoadState {
  src: string;
  status: AvatarImageState;
}

interface UseImageLoadedResult {
  status: AvatarImageState;
  onLoad: () => void;
  onError: () => void;
}

/** Track the rendered image element without starting a separate eager request. */
export function useImageLoaded(src?: string): UseImageLoadedResult {
  const normalizedSrc = src ?? '';
  const currentSrc = useRef(normalizedSrc);
  currentSrc.current = normalizedSrc;
  const [loadState, setLoadState] = useState<ImageLoadState>(() => ({
    src: normalizedSrc,
    status: normalizedSrc ? 'loading' : 'error',
  }));

  const setStatus = useCallback((status: AvatarImageState) => {
    if (!normalizedSrc || currentSrc.current !== normalizedSrc) return;
    setLoadState((current) =>
      current.src === normalizedSrc && current.status === status
        ? current
        : { src: normalizedSrc, status },
    );
  }, [normalizedSrc]);

  const status =
    loadState.src === normalizedSrc
      ? loadState.status
      : normalizedSrc
        ? 'loading'
        : 'error';
  const onLoad = useCallback(() => setStatus('loaded'), [setStatus]);
  const onError = useCallback(() => setStatus('error'), [setStatus]);

  return { status, onLoad, onError };
}

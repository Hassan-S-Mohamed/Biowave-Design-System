import type { CSSProperties } from 'react';

/** Keep assistive text available while removing it from visual layout. */
export const visuallyHidden: CSSProperties = {
  border: 0,
  clip: 'rect(0 0 0 0)',
  blockSize: 1,
  inlineSize: 1,
  marginBlock: -1,
  marginInline: -1,
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  whiteSpace: 'nowrap',
};

import * as React from 'react';
import type { ButtonSize } from '../button/button.tokens';

export const ButtonGroupContext = React.createContext<ButtonSize | undefined>(undefined);

export function useButtonGroupSize(): ButtonSize | undefined {
  return React.useContext(ButtonGroupContext);
}

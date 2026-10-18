import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import {
  buttonMotionTokens,
  buttonSizeTokens,
  type ButtonSize,
} from './button.tokens';

interface SpinnerRootProps {
  $visible: boolean;
}

const SpinnerRoot = styled(CircularProgress, {
  shouldForwardProp: (prop) => prop !== '$visible',
})<SpinnerRootProps>(({ $visible }) => ({
  position: 'absolute',
  insetBlock: 0,
  insetInline: 0,
  margin: 'auto',
  opacity: $visible ? 1 : 0,
  pointerEvents: 'none',
  animationDuration: buttonMotionTokens.spinnerDuration,
  animationTimingFunction: buttonMotionTokens.linearEasing,
  animationIterationCount: 'infinite',
  animationPlayState: $visible ? 'running' : 'paused',
  transition: `opacity ${buttonMotionTokens.loadingDuration} ${buttonMotionTokens.linearEasing}`,
}));

interface ButtonSpinnerProps {
  size: ButtonSize;
  visible: boolean;
}

// TODO(progress): replace this private spinner with the shared Progress component.
export function ButtonSpinner({ size, visible }: ButtonSpinnerProps) {
  return (
    <SpinnerRoot
      $visible={visible}
      size={buttonSizeTokens[size].icon}
      color="inherit"
      disableShrink
      aria-hidden="true"
    />
  );
}

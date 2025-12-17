import { forwardRef, memo } from 'react';

import { View } from './Overlay.view';

export interface ControllerProps {
  children: React.ReactNode;
  className?: string;
  animateChildren?: boolean;
  childrenSelector?: string;
  onClose?: () => void;
  closeOnEscape?: boolean;
  closeOnRouteChange?: boolean;
}

export const Controller = memo(
  forwardRef<HTMLDivElement, ControllerProps>((props, ref) => {
    return <View {...props} ref={ref} />;
  })
);

Controller.displayName = 'Overlay_Controller';

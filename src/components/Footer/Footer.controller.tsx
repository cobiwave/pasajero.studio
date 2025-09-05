import { forwardRef, memo } from 'react';

import { View } from './Footer.view';

export interface ControllerProps {
  className?: string;
}

export const Controller = memo(
  forwardRef<HTMLDivElement, ControllerProps>((props, ref) => {
    return <View {...props} ref={ref} />;
  })
);

Controller.displayName = 'Footer_Controller';

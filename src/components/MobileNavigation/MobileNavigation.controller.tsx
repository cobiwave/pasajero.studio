import type { NavigationLink } from '../Navigation/Navigation.controller';

import { forwardRef, memo } from 'react';

import { View } from './MobileNavigation.view';

export interface ControllerProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
  navigationLinks: NavigationLink[];
  className?: string;
}

export const Controller = memo(
  forwardRef<HTMLDivElement, ControllerProps>((props, ref) => {
    return <View {...props} ref={ref} />;
  })
);

Controller.displayName = 'MobileNavigation_Controller';

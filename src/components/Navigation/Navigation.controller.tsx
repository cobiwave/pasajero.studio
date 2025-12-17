import { forwardRef, memo } from 'react';

import { View } from './Navigation.view';

export interface NavigationLink {
  id: string;
  slug: string | null;
  link: {
    text: string | null;
    url: string | null;
  } | null;
}

export interface ControllerProps {
  links: NavigationLink[];
  className?: string;
}

export const Controller = memo(
  forwardRef<HTMLDivElement, ControllerProps>((props, ref) => {
    return <View {...props} ref={ref} />;
  })
);

Controller.displayName = 'Navigation_Controller';

import type { FC } from 'react';
import type { ComponentList } from '@/renderComponent';

import { memo } from 'react';

import { View } from './PageTemplate.view';

export interface ControllerProps {
  components: ComponentList[];
}

export const Controller: FC<ControllerProps> = memo((props) => {
  return <View {...props} />;
});

Controller.displayName = 'PageTemplate_Controller';

import type { FC } from 'react';

import { memo } from 'react';

import { View } from './LanguageSelector.view';

export interface ControllerProps {
  className?: string;
}

export const Controller: FC<ControllerProps> = memo((props) => {
  return <View {...props} />;
});

Controller.displayName = 'LanguageSelector_Controller';

import type { FC } from 'react';

import { memo } from 'react';

import { View } from './PageArticles.view';

export interface ControllerProps {
  content: {
    allArticles: { id: string; slug: string | null }[];
  };
}

export const Controller: FC<ControllerProps> = memo((props) => {
  return <View {...props} />;
});

Controller.displayName = 'PageArticles_Controller';

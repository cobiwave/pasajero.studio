import type { Article } from '@/types';

import { forwardRef, memo } from 'react';

import { View } from './ArticleList.view';

export interface ControllerProps {
  data: Article[];
  className?: string;
}

export const Controller = memo(
  forwardRef<HTMLDivElement, ControllerProps>((props, ref) => {
    return <View {...props} ref={ref} />;
  })
);

Controller.displayName = 'ArticleList_Controller';

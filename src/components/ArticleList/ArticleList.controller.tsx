import type { QueryAllArticles } from '@/graphql/queries';
import type { TypeFromQuery } from '@/lib/datocms/graphql';

import { forwardRef, memo } from 'react';

import { View } from './ArticleList.view';

export interface ControllerProps {
  data: TypeFromQuery<typeof QueryAllArticles>['allArticles'];
  className?: string;
}

export const Controller = memo(
  forwardRef<HTMLDivElement, ControllerProps>((props, ref) => {
    return <View {...props} ref={ref} />;
  })
);

Controller.displayName = 'ArticleList_Controller';

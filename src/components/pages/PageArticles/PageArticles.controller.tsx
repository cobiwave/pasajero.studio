import type { FC } from 'react';
import type { QueryAllArticles } from '@/graphql/QueryAllArticles';
import type { TypeFromQuery } from '@/lib/datocms/graphql';

import { memo } from 'react';

import { View } from './PageArticles.view';

export interface ControllerProps {
  content: {
    allArticles: TypeFromQuery<typeof QueryAllArticles>['allArticles'];
  };
}

export const Controller: FC<ControllerProps> = memo((props) => {
  return <View {...props} />;
});

Controller.displayName = 'PageArticles_Controller';

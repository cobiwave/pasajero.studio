import type { FC } from 'react';
import type { QueryArticle } from '@/graphql/queries/articles';
import type { TypeFromQuery } from '@/lib/datocms/graphql';

import { memo } from 'react';

import { View } from './PageArticle.view';

export interface ControllerProps {
  article: TypeFromQuery<typeof QueryArticle>['article'];
}

export const Controller: FC<ControllerProps> = memo((props) => {
  return <View {...props} />;
});

Controller.displayName = 'PageArticle_Controller';

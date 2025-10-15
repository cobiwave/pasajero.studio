import type { FC } from 'react';
import type { QueryAllArticles } from '@/graphql/QueryAllArticles';
import type { TypeFromQuery } from '@/lib/datocms/graphql';
import type { ComponentList } from '@/renderComponent';

import { memo } from 'react';

import { View } from './PageTemplate.view';

export interface ControllerProps {
  articles: TypeFromQuery<typeof QueryAllArticles>['allArticles'];
  components: ComponentList[];
}

export const Controller: FC<ControllerProps> = memo((props) => {
  return <View {...props} />;
});

Controller.displayName = 'PageTemplate_Controller';

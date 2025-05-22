import type { FC } from 'react';
import type { ImageGalleryBlockFragment } from '@/graphql/fragments/FragmentImageGallery';
import type { QueryAllArticles } from '@/graphql/queries';
import type { TagFragment } from '@/lib/datocms/commonFragments';
import type { FragmentOf, TypeFromQuery } from '@/lib/datocms/graphql';

import { memo } from 'react';

import { View } from './PageHome.view';

export interface ControllerProps {
  content: {
    homePage: {
      _seoMetaTags: FragmentOf<typeof TagFragment>[];
      imageGallery: FragmentOf<typeof ImageGalleryBlockFragment> | null;
    };
    allArticles: TypeFromQuery<typeof QueryAllArticles>['allArticles'];
  };
}

export const Controller: FC<ControllerProps> = memo(async (props) => {
  return <View {...props} />;
});

Controller.displayName = 'PageHome_Controller';

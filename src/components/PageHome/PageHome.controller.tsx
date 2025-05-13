import type { FC } from 'react';
import type { ImageGalleryBlockFragment } from '@/graphql/fragments/FragmentImageGallery';
import type { TagFragment } from '@/lib/datocms/commonFragments';
import type { Article } from '@/types';

import { memo } from 'react';

import { type FragmentOf } from '@/lib/datocms/graphql';

import { View } from './PageHome.view';

export interface ControllerProps {
  content: {
    homePage: {
      _seoMetaTags: FragmentOf<typeof TagFragment>[];
      imageGallery: FragmentOf<typeof ImageGalleryBlockFragment> | null;
    };
    allArticles: Article[];
  };
}

export const Controller: FC<ControllerProps> = memo(async (props) => {
  return <View {...props} />;
});

Controller.displayName = 'PageHome_Controller';

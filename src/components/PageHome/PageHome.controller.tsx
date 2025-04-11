import type { FC } from 'react';
import type { ImageGalleryBlockFragment } from '@/components/ImageGallery/ImageGallery';
import type { TagFragment } from '@/lib/datocms/commonFragments';

import { memo } from 'react';

import { type FragmentOf } from '@/lib/datocms/graphql';

import { View } from './PageHome.view';

export interface ControllerProps {
  content: {
    _seoMetaTags: FragmentOf<typeof TagFragment>[];
    imageGallery: FragmentOf<typeof ImageGalleryBlockFragment> | null;
  };
}

export const Controller: FC<ControllerProps> = memo(async (props) => {
  return <View {...props} />;
});

Controller.displayName = 'PageHome_Controller';

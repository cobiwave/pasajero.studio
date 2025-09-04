import type { ImageGalleryBlockFragment } from '@/components/ImageGallery/ImageGallery.fragment';
import type { FragmentOf } from '@/lib/datocms/graphql';

import { forwardRef, memo } from 'react';

import { View } from './ImageGallery.view';

export interface ControllerProps {
  data: FragmentOf<typeof ImageGalleryBlockFragment>;
  className?: string;
}

export const Controller = memo(
  forwardRef<HTMLDivElement, ControllerProps>((props, ref) => {
    return <View {...props} ref={ref} />;
  })
);

Controller.displayName = 'ImageGallery_Controller';

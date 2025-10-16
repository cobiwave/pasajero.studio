import type { ImageGalleryBlockFragment } from '@/graphql/components/ImageGallery.fragment';

import { forwardRef, memo } from 'react';

import { type ResultOf } from '@/lib/datocms/graphql';

import { View } from './ImageGallery.view';

export interface ControllerProps {
  data: ResultOf<typeof ImageGalleryBlockFragment>;
  className?: string;
}

export const Controller = memo(
  forwardRef<HTMLDivElement, ControllerProps>((props, ref) => {
    return <View {...props} ref={ref} />;
  })
);

Controller.displayName = 'ImageGallery_Controller';

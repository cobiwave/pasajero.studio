import type { ImageGalleryBlockFragment } from '@/graphql/components/ImageGallery.fragment';
import type { ResultOf } from '@/lib/datocms/graphql';

import { forwardRef, memo } from 'react';

import { View } from './ImageGallery.view';

export interface ControllerProps {
  data: ResultOf<typeof ImageGalleryBlockFragment>;
  className?: string;
}

export const Controller = memo(
  forwardRef<HTMLDivElement, ControllerProps>((props, ref) => {
    console.log('Props.data:', props.data);

    return <View {...props} ref={ref} />;
  })
);

Controller.displayName = 'ImageGallery_Controller';

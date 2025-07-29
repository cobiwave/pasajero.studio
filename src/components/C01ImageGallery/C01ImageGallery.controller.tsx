import type { C01ImageGalleryBlockFragment } from '@/components/C01ImageGallery/C01ImageGallery.fragment';
import type { FragmentOf } from '@/lib/datocms/graphql';

import { forwardRef, memo } from 'react';

import { View } from './C01ImageGallery.view';

export interface ControllerProps {
  data: FragmentOf<typeof C01ImageGalleryBlockFragment>;
  className?: string;
}

export const Controller = memo(
  forwardRef<HTMLDivElement, ControllerProps>((props, ref) => {
    console.log('C01ImageGallery Controller props:', props);

    return <View {...props} ref={ref} />;
  })
);

Controller.displayName = 'C01ImageGallery_Controller';

import type { AspectRatio } from '@/data/constants';
import type { ResultOf } from '@/lib/datocms/graphql';
import type { ResponsiveImageProps } from '../ResponsiveImage/ResponsiveImage';

import { forwardRef, memo } from 'react';

import { graphql } from '@/lib/datocms/graphql';

import { ResponsiveImageFragment } from '../ResponsiveImage/ResponsiveImage';
import { View } from './Image.view';

export const ImageBlockFragment = graphql(
  /* GraphQL */ `
    fragment ImageBlockFragment on ImageBlockRecord {
      __typename
      _modelApiKey
      id
      asset {
        id
        alt
        title
        responsiveImage {
          ...ResponsiveImageFragment
        }
      }
    }
  `,
  [ResponsiveImageFragment]
);

export interface ControllerProps {
  data: ResultOf<typeof ImageBlockFragment>;
  aspectRatio?: AspectRatio;
  responsiveImageProps?: ResponsiveImageProps;
  className?: string;
  parallaxEffect?: boolean;
}

export const Controller = memo(
  forwardRef<HTMLDivElement, ControllerProps>((props, ref) => {
    return <View {...props} ref={ref} />;
  })
);

Controller.displayName = 'Image_Controller';

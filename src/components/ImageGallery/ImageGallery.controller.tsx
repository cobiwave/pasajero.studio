import { forwardRef, memo } from 'react';

import { ConfigBlockFragment } from '@/graphql/infra/ConfigBlock.fragment';
import { graphql, type ResultOf } from '@/lib/datocms/graphql';

import { ImageBlockFragment } from '../atoms/Image/Image.controller';
import { View } from './ImageGallery.view';

export const ImageGalleryBlockFragment = graphql(
  /* GraphQL */ `
    fragment ImageGalleryBlockFragment on ImageGalleryBlockRecord {
      __typename
      _modelApiKey
      id
      config {
        ...ConfigBlockFragment
      }
      images {
        ...ImageBlockFragment
      }
    }
  `,
  [ConfigBlockFragment, ImageBlockFragment]
);

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

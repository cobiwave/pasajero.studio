import { forwardRef, memo } from 'react';

import { MediaConfigBlockFragment } from '@/graphql/infra/MediaConfigBlock.fragment';
import { type ResultOf } from '@/lib/datocms/graphql';
import { graphql } from '@/lib/datocms/graphql';

import { ImageBlockFragment } from '../atoms/Image/Image.controller';
import { VideoBlockFragment } from '../atoms/VideoBlock/VideoBlock';
import { View } from './Media.view';

export const MediaBlockFragment = graphql(
  /* GraphQL */ `
    fragment MediaBlockFragment on MediaBlockRecord {
      __typename
      _modelApiKey
      id
      mediaConfig {
        ...MediaConfigBlockFragment
      }
      mediaAsset {
        ...ImageBlockFragment
        ...VideoBlockFragment
      }
    }
  `,
  [MediaConfigBlockFragment, ImageBlockFragment, VideoBlockFragment]
);

export interface ControllerProps {
  data: ResultOf<typeof MediaBlockFragment>;
  className?: string;
}

export const Controller = memo(
  forwardRef<HTMLDivElement, ControllerProps>((props, ref) => {
    return <View {...props} ref={ref} />;
  })
);

Controller.displayName = 'Media_Controller';

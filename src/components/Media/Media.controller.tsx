import { forwardRef, memo } from 'react';

import { MediaConfigBlockFragment } from '@/graphql/infra/MediaConfigBlock.fragment';
import { type ResultOf } from '@/lib/datocms/graphql';
import { graphql } from '@/lib/datocms/graphql';

import { ExternalVideoBlockFragment } from '../atoms/ExternalVideo/ExternalVideo.controller';
import { ImageBlockFragment } from '../atoms/Image/Image.controller';
import { VideoBlockFragment } from '../atoms/Video/Video.controller';
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
      media {
        ...ImageBlockFragment
        ...VideoBlockFragment
        ...ExternalVideoBlockFragment
      }
    }
  `,
  [MediaConfigBlockFragment, ImageBlockFragment, VideoBlockFragment, ExternalVideoBlockFragment]
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

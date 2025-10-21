import type { AspectRatio } from '@/data/constants';

import { forwardRef, memo } from 'react';

import { graphql, type ResultOf } from '@/lib/datocms/graphql';

import { VideoPlayerFragment } from '../VideoPlayer/VideoPlayer';
import { View } from './Video.view';

export const VideoBlockFragment = graphql(
  /* GraphQL */ `
    fragment VideoBlockFragment on VideoBlockRecord {
      __typename
      _modelApiKey
      id
      asset {
        title
        ...VideoPlayerFragment
      }
    }
  `,
  [VideoPlayerFragment]
);

export interface ControllerProps {
  data: ResultOf<typeof VideoBlockFragment>;
  className?: string;
  aspectRatio?: AspectRatio;
}

export const Controller = memo(
  forwardRef<HTMLDivElement, ControllerProps>((props, ref) => {
    return <View {...props} ref={ref} />;
  })
);

Controller.displayName = 'Video_Controller';

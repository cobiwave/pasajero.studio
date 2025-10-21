import type { AspectRatio } from '@/data/constants';
import type { ResultOf } from '@/lib/datocms/graphql';

import { forwardRef, memo } from 'react';

import { graphql } from '@/lib/datocms/graphql';

import { View } from './ExternalVideo.view';

export const ExternalVideoBlockFragment = graphql(/* GraphQL */ `
  fragment ExternalVideoBlockFragment on ExternalVideoBlockRecord {
    __typename
    _modelApiKey
    id
    link {
      title
      url
    }
  }
`);

export interface ControllerProps {
  data: ResultOf<typeof ExternalVideoBlockFragment>;
  className?: string;
  aspectRatio?: AspectRatio;
}

export const Controller = memo(
  forwardRef<HTMLDivElement, ControllerProps>((props, ref) => {
    return <View {...props} ref={ref} />;
  })
);

Controller.displayName = 'ExternalVideo_Controller';

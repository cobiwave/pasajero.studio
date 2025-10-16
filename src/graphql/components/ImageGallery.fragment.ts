import { ResponsiveImageFragment } from '@/graphql/atoms/ResponsiveImage.fragment';
import { graphql } from '@/lib/datocms/graphql';

import { ConfigBlockFragment } from '../infra/ConfigBlock.fragment';

export const ImageGalleryBlockFragment = graphql(
  /* GraphQL */ `
    fragment ImageGalleryBlockFragment on ImageGalleryBlockRecord {
      __typename
      _modelApiKey
      id
      config {
        ...ConfigBlockFragment
      }
      assets {
        id
        title
        responsiveImage {
          ...ResponsiveImageFragment
        }
      }
    }
  `,
  [ResponsiveImageFragment, ConfigBlockFragment]
);

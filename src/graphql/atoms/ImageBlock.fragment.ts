import type { BaseBlockRecord } from '@/graphql/types/index';
import type { FragmentOf } from '@/lib/datocms/graphql';

import { ResponsiveImageFragment } from '@/graphql/atoms/ResponsiveImage.fragment';
import { graphql } from '@/lib/datocms/graphql';

export interface ImageBlockRecord extends BaseBlockRecord {
  __typename: 'ImageBlockRecord';
  asset: {
    id: string;
    alt?: string;
    title?: string;
    responsiveImage: FragmentOf<typeof ResponsiveImageFragment>;
  };
}

export const ImageBlockFragment = graphql(
  /* GraphQL */ `
    fragment ImageBlockFragment on ImageBlockRecord {
      __typename
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

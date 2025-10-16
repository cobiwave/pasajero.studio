import { ResponsiveImageFragment } from '@/graphql/atoms/ResponsiveImage.fragment';
import { graphql } from '@/lib/datocms/graphql';

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

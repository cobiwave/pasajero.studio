import { ImageBlockFragment } from '@/components/atoms/Image/Image.controller';
import { ResponsiveImageFragment } from '@/components/atoms/ResponsiveImage/ResponsiveImage';

import { graphql } from '@/lib/datocms/graphql';

import { MediaConfigBlockFragment } from './infra/MediaConfigBlock.fragment';

export const QueryAllArticles = graphql(
  /* GraphQL */ `
    query ArticlePaths {
      allArticles {
        id
        slug
        title
        summary
        date
        categories {
          id
          name
          slug
        }
        mediaConfig {
          ...MediaConfigBlockFragment
        }
        featuredImage {
          ...ImageBlockFragment
        }
      }
    }
  `,
  [ResponsiveImageFragment, ImageBlockFragment, MediaConfigBlockFragment]
);

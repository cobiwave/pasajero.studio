import { ImageBlockFragment } from '@/components/atoms/Image/Image.controller';
import { ResponsiveImageFragment } from '@/components/atoms/ResponsiveImage/ResponsiveImage';

import { graphql } from '@/lib/datocms/graphql';

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

        featuredImage {
          ...ImageBlockFragment
        }
      }
    }
  `,
  [ResponsiveImageFragment, ImageBlockFragment]
);

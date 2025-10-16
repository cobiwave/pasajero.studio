import { graphql } from '@/lib/datocms/graphql';

import { ResponsiveImageFragment } from './atoms/ResponsiveImage.fragment';

export const QueryAllArticles = graphql(
  /* GraphQL */ `
    query ArticlePaths {
      allArticles {
        _firstPublishedAt
        id
        slug
        title
        summary
        categories {
          id
          name
          slug
        }
        featuredImage {
          id
          alt
          responsiveImage {
            ...ResponsiveImageFragment
          }
        }
      }
    }
  `,
  [ResponsiveImageFragment]
);

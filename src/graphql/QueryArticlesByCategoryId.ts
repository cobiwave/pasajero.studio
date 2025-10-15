import { graphql } from '@/lib/datocms/graphql';

import { ResponsiveImageFragment } from './fragments/ResponsiveImage.fragment';

export const QueryArticlesByCategoryId = graphql(
  /* GraphQL */ `
    query ArticlesByCategory($categoryId: [ItemId]!) {
      allArticles(filter: { categories: { anyIn: $categoryId } }) {
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

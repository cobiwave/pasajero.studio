import { ImageBlockFragment } from '@/components/atoms/Image/Image.controller';
import { ResponsiveImageFragment } from '@/components/atoms/ResponsiveImage/ResponsiveImage';

import { graphql } from '@/lib/datocms/graphql';

export const QueryArticlesByCategoryId = graphql(
  /* GraphQL */ `
    query ArticlesByCategory($categoryId: [ItemId]!) {
      allArticles(filter: { categories: { anyIn: $categoryId } }) {
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

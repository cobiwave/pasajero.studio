import { ImageBlockFragment } from '@/components/atoms/Image/Image.controller';
import { ResponsiveImageFragment } from '@/components/atoms/ResponsiveImage/ResponsiveImage';

import { graphql } from '@/lib/datocms/graphql';

export const QueryAllArticles = graphql(
  /* GraphQL */ `
    query ArticlePaths($locale: SiteLocale) {
      allArticles(locale: $locale) {
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

import { TagFragment } from '@/lib/datocms/commonFragments';
import { graphql } from '@/lib/datocms/graphql';

import { ImageBlockFragment } from './atoms/ImageBlock.fragment';
import { ResponsiveImageFragment } from './atoms/ResponsiveImage.fragment';

export const QueryArticle = graphql(
  /* GraphQL */ `
    query ArticleBySlug($slug: String) {
      article(filter: { slug: { eq: $slug } }) {
        _firstPublishedAt
        _seoMetaTags {
          ...TagFragment
        }
        id
        slug
        title
        content {
          value
          links
          blocks {
            ...ImageBlockFragment
          }
        }
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
  [TagFragment, ResponsiveImageFragment, ImageBlockFragment]
);

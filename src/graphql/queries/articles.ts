import { TagFragment } from '@/lib/datocms/commonFragments';
import { graphql } from '@/lib/datocms/graphql';

import { ImageBlockFragment } from '../fragments/ImageBlock.fragment';
import { ResponsiveImageFragment } from '../fragments/ResponsiveImage.fragment';

export const QueryAllArticles = graphql(
  /* GraphQL */ `
    query ArticlePaths {
      allArticles {
        _firstPublishedAt
        id
        slug
        title
        summary
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

export const QueryArticle = graphql(
  /* GraphQL */ `
    query ArticleBySlug($slug: String) {
      article(filter: { slug: { eq: $slug } }) {
        _publishedAt
        _seoMetaTags {
          ...TagFragment
        }
        id
        title
        slug
        content {
          value
          links
          blocks {
            ...ImageBlockFragment
          }
        }
        categories {
          slug
          name
          description
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

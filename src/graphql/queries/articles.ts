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

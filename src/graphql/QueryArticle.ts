import { TagFragment } from '@/lib/datocms/commonFragments';
import { graphql } from '@/lib/datocms/graphql';

import { ResponsiveImageFragment } from './atoms/ResponsiveImage.fragment';
import { RichTextBlockFragment } from './components/RichText.fragment';

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
        summary
        articleDate
        author {
          id
          name
        }
        categories {
          id
          name
          slug
        }
        richText {
          ...RichTextBlockFragment
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
  [TagFragment, ResponsiveImageFragment, RichTextBlockFragment]
);

import { ImageBlockFragment } from '@/components/atoms/Image/Image.controller';

import { TagFragment } from '@/lib/datocms/commonFragments';
import { graphql } from '@/lib/datocms/graphql';

import { RichTextBlockFragment } from './components/RichTextBlock.fragment';

export const QueryArticle = graphql(
  /* GraphQL */ `
    query ArticleBySlug($locale: SiteLocale, $slug: String) {
      article(locale: $locale, filter: { slug: { eq: $slug } }) {
        _seoMetaTags {
          ...TagFragment
        }
        id
        slug
        title
        summary
        date
        author {
          id
          name
        }
        categories {
          id
          name
          slug
        }
        featuredImage {
          ...ImageBlockFragment
        }
        richText {
          ...RichTextBlockFragment
        }
      }
    }
  `,
  [TagFragment, RichTextBlockFragment, ImageBlockFragment]
);

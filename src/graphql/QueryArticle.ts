import { ImageBlockFragment } from '@/components/atoms/Image/Image.controller';

import { TagFragment } from '@/lib/datocms/commonFragments';
import { graphql } from '@/lib/datocms/graphql';

import { RichTextBlockFragment } from './components/RichTextBlock.fragment';

export const QueryArticle = graphql(
  /* GraphQL */ `
    query ArticleBySlug($slug: String) {
      article(filter: { slug: { eq: $slug } }) {
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

import { ImageGalleryBlockFragment } from '@/components/ImageGallery/ImageGallery.controller';

import { graphql } from '@/lib/datocms/graphql';

import { RichTextBlockFragment } from './components/RichTextBlock.fragment';

export const QueryPage = graphql(
  /* GraphQL */
  `
    query getPage($locale: SiteLocale, $slug: String!) {
      page(locale: $locale, filter: { slug: { eq: $slug } }) {
        id
        slug
        title
        components {
          ...ImageGalleryBlockFragment
          ...RichTextBlockFragment
        }
      }
    }
  `,
  [ImageGalleryBlockFragment, RichTextBlockFragment]
);

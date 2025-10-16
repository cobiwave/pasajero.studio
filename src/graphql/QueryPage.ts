import type { DatoGetPageData } from '@/data/types';

import { DEBUG } from '@/data/constants';

import { executeQuery } from '@/lib/datocms/executeQuery';
import { graphql } from '@/lib/datocms/graphql';

import { ImageGalleryBlockFragment } from './components/ImageGallery.fragment';
import { RichTextBlockFragment } from './components/RichText.fragment';

export const getPageData = async (pageName: string): Promise<DatoGetPageData> => {
  const query = graphql(
    `
      query getPage($slug: String!) {
        page(filter: { slug: { eq: $slug } }) {
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

  const page = await executeQuery(query, {
    variables: {
      slug: pageName
    }
  });

  if (DEBUG) {
    // eslint-disable-next-line no-console
    console.log('{{ getPageData fn }}', page);
  }

  return page as unknown as DatoGetPageData;
};

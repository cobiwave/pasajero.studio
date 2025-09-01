import type { DatoGetPageData } from '@/data/types';

import { DEBUG } from '@/data/constants';

import { C01ImageGalleryBlockFragment } from '@/components/C01ImageGallery/C01ImageGallery.fragment';

import { executeQuery } from '@/lib/datocms/executeQuery';
import { graphql } from '@/lib/datocms/graphql';

export const getPageData = async (pageName: string): Promise<DatoGetPageData> => {
  const query = graphql(
    `
      query MyQuery($slug: String!) {
        page(filter: { slug: { eq: $slug } }) {
          id
          slug
          title
          components {
            ...C01ImageGalleryBlockFragment
          }
        }
      }
    `,
    [C01ImageGalleryBlockFragment]
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

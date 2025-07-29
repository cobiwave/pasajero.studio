import type { DatoGetPageData } from '@/data/types';

import { DEBUG } from '@/data/constants';

import { C01ImageGalleryBlockFragment } from '@/components/C01ImageGallery/C01ImageGallery.fragment';

import { TagFragment } from '@/lib/datocms/commonFragments';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { graphql } from '@/lib/datocms/graphql';

import { ResponsiveImageFragment } from './fragments/FragmentResponsiveImage';

export const QueryAllArticles = graphql(
  /* GraphQL */ `
    query ArticlePaths {
      allArticles {
        _firstPublishedAt
        id
        slug
        title
        summary
        content {
          value
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
        _publishedAt
        _seoMetaTags {
          ...TagFragment
        }
        id
        title
        slug
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
  [TagFragment, ResponsiveImageFragment]
);

export const getPageData = async (pageName: string = 'home-page'): Promise<DatoGetPageData> => {
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

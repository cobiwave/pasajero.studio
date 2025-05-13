import type { Article } from '@/types';

import { notFound } from 'next/navigation';

import { PageHome } from '@/components/PageHome';

import { ImageGalleryBlockFragment } from '@/graphql/fragments/FragmentImageGallery';
import { QueryAllArticles } from '@/graphql/queries';
import { TagFragment } from '@/lib/datocms/commonFragments';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { generateMetadataFn } from '@/lib/datocms/generateMetadataFn';
import { graphql } from '@/lib/datocms/graphql';

const query = graphql(
  /* GraphQL */ `
    query HomePageQuery {
      homePage {
        _seoMetaTags {
          ...TagFragment
        }
        imageGallery {
          ...ImageGalleryBlockFragment
        }
      }
    }
  `,
  [TagFragment, ImageGalleryBlockFragment]
);

/**
 * We use a helper to generate function that fits the Next.js
 * `generateMetadata()` format, automating the creation of meta tags based on
 * the `_seoMetaTags` present in a DatoCMS GraphQL query.
 */
export const generateMetadata = generateMetadataFn({
  query,
  // A callback that picks the SEO meta tags from the result of the query
  pickSeoMetaTags: (data) => data.homePage?._seoMetaTags
});

export default async function Home() {
  const { homePage } = await executeQuery(query);
  const { allArticles } = await executeQuery(QueryAllArticles);

  if (!homePage) {
    notFound();
  }

  // console.log('allArticles ===>', allArticles);

  return (
    <PageHome
      content={{
        homePage,
        allArticles: allArticles as unknown as Article[]
      }}
    />
  );
}

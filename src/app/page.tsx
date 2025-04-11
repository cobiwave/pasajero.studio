import { notFound } from 'next/navigation';

import { PageHome } from '@/components/PageHome';

import { ImageGalleryBlockFragment } from '@/graphql/fragments/FragmentImageGallery';
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

  if (!homePage) {
    notFound();
  }

  return <PageHome content={homePage} />;
}

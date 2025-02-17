import { notFound } from 'next/navigation';
import { graphql } from '@/lib/datocms/graphql';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { TagFragment } from '@/lib/datocms/commonFragments';
import ImageGalleryBlock from '@/components/blocks/ImageGalleryBlock';
import { generateMetadataFn } from '@/lib/datocms/generateMetadataFn';
import styles from './page.module.scss';

/**
 * The GraphQL query that will be executed for this route to generate the page
 * content and metadata.
 *
 * Thanks to gql.tada, the result will be fully typed!
 */
const query = graphql(
  /* GraphQL */ `
    query HomePageQuery {
      homePage {
        _seoMetaTags {
          ...TagFragment
        }
        title
        imageGallery {
          assets {
            id
            title
            responsiveImage {
              src
              srcSet
              alt
              title
              base64
            }
          }
        }
      }
    }
  `,
  [TagFragment],
);

/**
 * We use a helper to generate function that fits the Next.js
 * `generateMetadata()` format, automating the creation of meta tags based on
 * the `_seoMetaTags` present in a DatoCMS GraphQL query.
 */
export const generateMetadata = generateMetadataFn({
  query,
  // A callback that picks the SEO meta tags from the result of the query
  pickSeoMetaTags: (data) => data.homePage?._seoMetaTags,
});

export default async function Home() {
  const { homePage } = await executeQuery(query);

  if (!homePage) {
    notFound();
  }

  console.log('homePage', homePage);

  return (
    <div className={styles.root}>
      <ImageGalleryBlock data={homePage.imageGallery} />
    </div>
  );
}

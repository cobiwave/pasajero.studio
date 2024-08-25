import { notFound } from 'next/navigation';
import { graphql } from '@/lib/datocms/graphql';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { TagFragment } from '@/lib/datocms/commonFragments';
import { generateMetadataFn } from '@/lib/datocms/generateMetadataFn';
import styles from './page.module.css';

/**
 * The GraphQL query that will be executed for this route to generate the page
 * content and metadata.
 *
 * Thanks to gql.tada, the result will be fully typed!
 */
const query = graphql(
  /* GraphQL */ `
    query BasicPageQuery {
      page {
        _seoMetaTags {
          ...TagFragment
        }
        title
        _firstPublishedAt
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
  pickSeoMetaTags: (data) => data.page?._seoMetaTags,
});

export default async function Home() {
  const { page } = await executeQuery(query);

  if (!page) {
    notFound();
  }

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>{page.title}</h1>
    </div>
  );
}

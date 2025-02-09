import { notFound } from 'next/navigation';
import Image from 'next/image';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { TagFragment } from '@/lib/datocms/commonFragments';
import { generateMetadataFn } from '@/lib/datocms/generateMetadataFn';
import { graphql } from '@/lib/datocms/graphql';
import styles from './page.module.scss';

// Query to get all possible paths
const pathsQuery = graphql(`
  query ArticlePaths {
    allArticles {
      slug
    }
  }
`);

const query = graphql(
  `
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
          url
        }
      }
    }
  `,
  [TagFragment],
);

export async function generateStaticParams() {
  const { allArticles } = await executeQuery(pathsQuery);

  return allArticles.map((article) => ({
    slug: article.slug ?? '',
  }));
}

export const generateMetadata = generateMetadataFn({
  query,
  buildQueryVariables: (params: { slug: string }) => ({
    slug: params.slug,
  }),
  pickSeoMetaTags: (data) => data.article?._seoMetaTags,
});

export default async function Article({ params }: { params: { slug: string } }) {
  const { slug } = params;

  console.log('slug ===>', slug);
  const { article } = await executeQuery(query, {
    variables: {
      slug,
    },
  });

  console.log('article ===>', article);

  if (!article) {
    notFound();
  }

  return (
    <div className={styles.root}>
      <Image
        src={article.featuredImage?.url || ''}
        width={500}
        height={500}
        alt="Picture of the author"
      />
      {article.categories.map((category) => (
        <h1 key={category.slug}>{category.name}</h1>
      ))}
    </div>
  );
}

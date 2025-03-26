import { notFound } from 'next/navigation';
import Image from 'next/image';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { TypeFromQuery, VariablesFromQuery } from '@/lib/datocms/graphql';
import { ARTICLE_BY_SLUG, ARTICLES_PATHS } from '@/graphql/queries';
import { generateMetadataFn } from '@/lib/datocms/generateMetadataFn';
import styles from './page.module.scss';

type PageProps = {
  params: { category: string; slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateStaticParams() {
  const { allArticles } = await executeQuery(ARTICLES_PATHS);

  return allArticles.map((article) => ({
    slug: article.slug ?? ''
  }));
}

export const generateMetadata = generateMetadataFn<
  PageProps,
  TypeFromQuery<typeof ARTICLE_BY_SLUG>,
  VariablesFromQuery<typeof ARTICLE_BY_SLUG>
>({
  query: ARTICLE_BY_SLUG,
  buildQueryVariables: (props) => ({
    slug: props.params.slug
  }),
  pickSeoMetaTags: (data) => data?.article?._seoMetaTags
});

export default async function Article({ params }: PageProps) {
  const { slug } = params;

  console.log('slug ===>', slug);
  const { article } = await executeQuery(ARTICLE_BY_SLUG, {
    variables: {
      slug
    }
  });

  console.log('article ===>', article);

  if (!article) {
    notFound();
  }

  return (
    <div className={styles.root}>
      <Image src={article.featuredImage?.url || ''} width={500} height={500} alt="Picture of the author" />
      {article.categories.map((category) => (
        <h1 key={category.slug}>{category.name}</h1>
      ))}
    </div>
  );
}

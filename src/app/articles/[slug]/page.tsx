import type { TypeFromQuery, VariablesFromQuery } from '@/lib/datocms/graphql';

import Image from 'next/image';
import { notFound } from 'next/navigation';

import { QueryAllArticles, QueryArticle } from '@/graphql/queries';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { generateMetadataFn } from '@/lib/datocms/generateMetadataFn';

import styles from './page.module.scss';

type PageProps = {
  params: { category: string; slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateStaticParams() {
  const { allArticles } = await executeQuery(QueryAllArticles);

  return allArticles.map((article) => ({
    slug: article.slug ?? ''
  }));
}

export const generateMetadata = generateMetadataFn<
  PageProps,
  TypeFromQuery<typeof QueryArticle>,
  VariablesFromQuery<typeof QueryArticle>
>({
  query: QueryArticle,
  buildQueryVariables: (props) => ({
    slug: props.params.slug
  }),
  pickSeoMetaTags: (data) => data?.article?._seoMetaTags
});

export default async function Article({ params }: PageProps) {
  const { slug } = params;

  console.log('slug ===>', slug);
  const { article } = await executeQuery(QueryArticle, {
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

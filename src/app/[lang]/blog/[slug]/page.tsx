import type { PageProps } from '@/data/types';
import type { TypeFromQuery, VariablesFromQuery } from '@/lib/datocms/graphql';

import { notFound } from 'next/navigation';

import { PageArticle } from '@/components/pages/PageArticle';

import { QueryAllArticles } from '@/graphql/QueryAllArticles';
import { QueryArticle } from '@/graphql/QueryArticle';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { generateMetadataFn } from '@/lib/datocms/generateMetadataFn';

export const revalidate = 0;

export async function generateStaticParams() {
  const { allArticles } = await executeQuery(QueryAllArticles);

  return allArticles.map((article) => ({
    slug: article.slug
  }));
}

export const generateMetadata = generateMetadataFn<
  PageProps,
  TypeFromQuery<typeof QueryArticle>,
  VariablesFromQuery<typeof QueryArticle>
>({
  query: QueryArticle,
  buildQueryVariables: async (props) => ({
    slug: (await props.params).slug
  }),
  pickSeoMetaTags: (data) => data?.article?._seoMetaTags
});

export default async function Article({ params }: PageProps) {
  const { lang, slug } = await params;
  const locale = lang as 'en' | 'es';
  const { article }: TypeFromQuery<typeof QueryArticle> = await executeQuery(QueryArticle, {
    variables: {
      locale,
      slug
    }
  });

  if (!article) {
    notFound();
  }

  return <PageArticle article={article} />;
}

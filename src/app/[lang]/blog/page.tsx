import type { PageProps } from '@/data/types';

import { notFound } from 'next/navigation';

import { PageArticles } from '@/components/pages/PageArticles';

import { QueryAllArticles } from '@/graphql/QueryAllArticles';
import { executeQuery } from '@/lib/datocms/executeQuery';

export default async function Page({ params: { lang } }: PageProps) {
  const { allArticles } = await executeQuery(QueryAllArticles, {
    variables: { locale: lang }
  });

  if (allArticles.length === 0) {
    notFound();
  }

  return <PageArticles content={{ allArticles }} />;
}

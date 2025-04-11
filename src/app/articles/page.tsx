import { notFound } from 'next/navigation';

import { PageArticles } from '@/components/PageArticles';

import { QueryAllArticles } from '@/graphql/queries';
import { executeQuery } from '@/lib/datocms/executeQuery';

export default async function CategoryPage() {
  const { allArticles } = await executeQuery(QueryAllArticles);

  if (allArticles.length === 0) {
    notFound();
  }

  return <PageArticles content={{ allArticles }} />;
}

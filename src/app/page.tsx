import type { TypeFromQuery } from '@/lib/datocms/graphql';
import type { ComponentList } from '@/renderComponent';

import { notFound } from 'next/navigation';

import { ArticleList } from '@/components/ArticleList';

import { QueryAllArticles } from '@/graphql/queries/articles';
import { getPageData } from '@/graphql/queries/pages';
import { executeQuery } from '@/lib/datocms/executeQuery';
import RenderComponents from '@/renderComponent';

export const revalidate = 0;

export default async function Home() {
  const { page } = await getPageData('home-page');
  const { allArticles }: TypeFromQuery<typeof QueryAllArticles> = await executeQuery(QueryAllArticles);

  const components =
    page?.components.map((component) => {
      const { __typename } = component;

      return {
        __typename,
        props: { data: component }
      };
    }) || [];

  if (!page) {
    notFound();
  }

  return (
    <main>
      <ArticleList articles={allArticles} />
      <RenderComponents components={components as unknown as ComponentList[]} />
    </main>
  );
}

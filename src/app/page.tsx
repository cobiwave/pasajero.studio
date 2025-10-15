import type { TypeFromQuery } from '@/lib/datocms/graphql';
import type { ComponentList } from '@/renderComponent';

import { notFound } from 'next/navigation';

import { PageHome } from '@/components/pages/PageHome';

import { QueryAllArticles } from '@/graphql/queries/articles';
import { getPageData } from '@/graphql/queries/pages';
import { executeQuery } from '@/lib/datocms/executeQuery';

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

  return <PageHome articles={allArticles} components={components as unknown as ComponentList[]} />;
}

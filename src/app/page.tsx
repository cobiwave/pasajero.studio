import type { ComponentList } from '@/renderComponent';

import { notFound } from 'next/navigation';

import { getPageData } from '@/graphql/queries';
import RenderComponents from '@/renderComponent';

export const revalidate = 0;

export default async function Home() {
  const { page } = await getPageData('home-page');
  // const { allArticles }: TypeFromQuery<typeof QueryAllArticles> = await executeQuery(QueryAllArticles);

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
    <>
      {/* {allArticles.length > 0 ? <ArticleList articles={allArticles} /> : null} */}
      <RenderComponents components={components as unknown as ComponentList[]} />
    </>
  );
}

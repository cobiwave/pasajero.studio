import type { PageProps } from '@/data/types';
import type { ComponentList } from '@/renderComponent';

import { notFound } from 'next/navigation';

import { PageTemplate } from '@/components/PageTemplate';

import { QueryArticlesByCategory } from '@/graphql/queries/articles';
import { getPageData } from '@/graphql/queries/pages';
import { executeQuery } from '@/lib/datocms/executeQuery';

export const revalidate = 0;

export default async function Page({ params }: PageProps) {
  const { category } = params;
  const { page } = await getPageData(category);
  const result = await executeQuery(QueryArticlesByCategory, {
    variables: {
      categorySlug: category
    }
  });
  const { allArticles } = result;

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

  return <PageTemplate articles={allArticles} components={components as unknown as ComponentList[]} />;
}

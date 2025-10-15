import type { PageProps } from '@/data/types';
import type { ComponentList } from '@/renderComponent';

import { notFound } from 'next/navigation';

import { PageTemplate } from '@/components/pages/PageTemplate';

import { QueryArticlesByCategoryId } from '@/graphql/queries/articles';
import { QueryAllCategories } from '@/graphql/queries/categories';
import { getPageData } from '@/graphql/queries/pages';
import { executeQuery } from '@/lib/datocms/executeQuery';

export default async function Page({ params }: PageProps) {
  const { category } = params;
  const { page } = await getPageData(category);

  // Category filtering
  const allCategories = (await executeQuery(QueryAllCategories)) as {
    allCategoryReferences: { id: string; name: string; slug: string }[];
  };
  const categoryId = allCategories.allCategoryReferences.find((cat) => cat.slug === category)?.id;

  if (!categoryId) {
    notFound();
  }

  // Fetch articles based on the filtered category ID
  const result = await executeQuery(QueryArticlesByCategoryId, {
    variables: {
      categoryId: [categoryId]
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

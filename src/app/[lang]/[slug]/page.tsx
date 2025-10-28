import type { PageProps } from '@/data/types';
import type { ComponentList } from '@/renderComponent';

import { notFound } from 'next/navigation';

import { PageTemplate } from '@/components/pages/PageTemplate';

import { QueryAllCategories } from '@/graphql/QueryAllCategories';
import { QueryArticlesByCategoryId } from '@/graphql/QueryArticlesByCategoryId';
import { QueryPage } from '@/graphql/QueryPage';
import { executeQuery } from '@/lib/datocms/executeQuery';

export default async function Page({ params }: PageProps) {
  const { lang, slug } = params;

  const { page } = await executeQuery(QueryPage, {
    variables: {
      locale: lang,
      slug
    }
  });

  // Category filtering
  const allCategories = (await executeQuery(QueryAllCategories)) as {
    allCategoryReferences: { id: string; name: string; slug: string }[];
  };
  const categoryId = allCategories.allCategoryReferences.find((category) => category.slug === slug)?.id;

  let allArticles;

  // Fetch articles only if categoryId exists
  if (categoryId) {
    const result = await executeQuery(QueryArticlesByCategoryId, {
      variables: {
        locale: lang,
        categoryId: [categoryId]
      }
    });
    allArticles = result.allArticles;
  }

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

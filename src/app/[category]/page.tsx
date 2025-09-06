import type { PageProps } from '@/data/types';
import type { ComponentList } from '@/renderComponent';

import { notFound } from 'next/navigation';

import { PageTemplate } from '@/components/PageTemplate';

import { getPageData } from '@/graphql/queries/pages';

export const revalidate = 0;

export default async function Page({ params }: PageProps) {
  const { category } = params;

  const { page } = await getPageData(category);

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

  return <PageTemplate components={components as unknown as ComponentList[]} />;
}

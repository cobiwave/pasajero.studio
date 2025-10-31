import type { PageProps } from '@/data/types';
import type { TypeFromQuery } from '@/lib/datocms/graphql';
import type { ComponentList } from '@/renderComponent';

import { notFound } from 'next/navigation';

import { PageHome } from '@/components/pages/PageHome';

import { QueryAllArticles } from '@/graphql/QueryAllArticles';
import { QueryPage } from '@/graphql/QueryPage';
import { executeQuery } from '@/lib/datocms/executeQuery';

export const revalidate = 60;

export default async function Home({ params: { lang } }: PageProps) {
  const [{ page }, { allArticles }] = await Promise.all([
    executeQuery(QueryPage, {
      variables: {
        locale: lang,
        slug: 'home-page'
      }
    }),
    executeQuery(QueryAllArticles, {
      variables: { locale: lang }
    }) as Promise<TypeFromQuery<typeof QueryAllArticles>>
  ]);

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

  return <PageHome content={{ allArticles, components: components as unknown as ComponentList[] }} />;
}

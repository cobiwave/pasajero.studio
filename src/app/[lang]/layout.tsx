import type { TypeFromQuery } from '@/lib/datocms/graphql';

import { Footer } from '@/components/Footer';
import GlobalNav from '@/components/GlobalNav/GlobalNav';

import { executeQuery } from '@/lib/datocms/executeQuery';

import { QueryNavigationLinks } from '../../graphql/QueryNavigation';

export default async function LangLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { lang: 'en' | 'es' };
}) {
  const { lang } = params;

  const [{ allNavigations: unsortedNavigations }] = await Promise.all([
    executeQuery(QueryNavigationLinks, {
      variables: { locale: lang }
    }) as Promise<TypeFromQuery<typeof QueryNavigationLinks>>
  ]);

  const allNavigations = [...unsortedNavigations].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <>
      {allNavigations.length > 0 ? <GlobalNav links={allNavigations} /> : null}
      <main>{children}</main>
      <Footer />
    </>
  );
}

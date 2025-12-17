import type { TypeFromQuery } from '@/lib/datocms/graphql';

import { Footer } from '@/components/Footer';
import { Navigation } from '@/components/Navigation';

import { executeQuery } from '@/lib/datocms/executeQuery';

import { QueryNavigationLinks } from '../../graphql/QueryNavigation';

export default async function LangLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as 'en' | 'es';

  const [{ allNavigations: unsortedNavigations }] = await Promise.all([
    executeQuery(QueryNavigationLinks, {
      variables: { locale }
    }) as Promise<TypeFromQuery<typeof QueryNavigationLinks>>
  ]);

  const allNavigations = [...unsortedNavigations].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <>
      {allNavigations.length > 0 ? <Navigation links={allNavigations} /> : null}
      <main>{children}</main>
      <Footer />
    </>
  );
}

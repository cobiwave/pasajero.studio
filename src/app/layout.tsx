import { toNextMetadata } from 'react-datocms';
import { Roboto } from 'next/font/google';
import { draftMode } from 'next/headers';

import { Footer } from '@/components/Footer';
import GlobalNav from '@/components/GlobalNav/GlobalNav';
import DebugGrid from '@/components/helpers/DebugGrid/DebugGrid';

import { TagFragment } from '@/lib/datocms/commonFragments';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { graphql } from '@/lib/datocms/graphql';

import '@/styles/global.scss';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700']
});

const query = graphql(
  /* GraphQL */ `
    query query {
      _site {
        faviconMetaTags {
          ...TagFragment
        }
      }
    }
  `,
  [TagFragment]
);

export async function generateMetadata() {
  const { isEnabled: isDraftModeEnabled } = draftMode();
  const data = await executeQuery(query, { includeDrafts: isDraftModeEnabled });
  return toNextMetadata(data._site.faviconMetaTags);
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <GlobalNav />
        {children}
        <Footer />
        <DebugGrid />
      </body>
    </html>
  );
}

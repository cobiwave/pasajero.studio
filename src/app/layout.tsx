import localFont from 'next/font/local';
import { draftMode } from 'next/headers';
import { toNextMetadata } from 'react-datocms';
import { TagFragment } from '@/lib/datocms/commonFragments';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { graphql } from '@/lib/datocms/graphql';
import './global.css';

const myFont = localFont({ src: './StretchPro.woff2' });

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
  [TagFragment],
);

export async function generateMetadata() {
  const { isEnabled: isDraftModeEnabled } = draftMode();
  const data = await executeQuery(query, { includeDrafts: isDraftModeEnabled });
  return toNextMetadata(data._site.faviconMetaTags);
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={myFont.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}

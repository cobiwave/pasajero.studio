import type { ApolloQueryResult, OperationVariables, QueryOptions } from '@apollo/client';

// import type { FooterContent, NavContent } from '@/data/types'
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev';

import data from '@/data/content.json';

import { copy } from '@/utils/copy';

// TODO: migrate over to ApolloClient once content schema is set up
export type PageIdentifier = keyof typeof data.pages;
export type CommonStaticContent = typeof data.common;
export type HeadContent = typeof data.common.head;
export type PageContent<T extends PageIdentifier = 'home'> = {
  head: HeadContent;
  common: CommonStaticContent;
  body: (typeof data.pages)[T]['body'];
};

const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX || '';
const buildNumber = process.env.NEXT_PUBLIC_BUILD_NUMBER || '';

// if (typeof window !== 'undefined') {
//   throw new TypeError('This file should not be imported on the client side')
// }

loadDevMessages();
loadErrorMessages();

class DraftService {
  apollo = new ApolloClient({
    // link: from([
    //   new RetryLink({ attempts: { max: Infinity } }),
    //   createHttpLink({ uri: `${process.env.cmsUrl}/graphql` })
    // ]),
    uri: `https://graphql.datocms.com/`,
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_DATOCMS_DRAFT_TOKEN}`,
      'X-Include-Drafts': 'true',
    },
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'all',
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
    cache: new InMemoryCache({
      typePolicies: Object.fromEntries(['Home'].map((type) => [type, { merge: true }])),
    }),
  });

  // generateNav(queryNavResult: ApolloQueryResult<NavigationQueryResult>): NavContent {
  //   return {
  //     menu:
  //       queryNavResult.data?.navigation?.menuItem?.map((item) => ({
  //         title: item.link.text,
  //         path: item.link.url,
  //         imgSrc: item.desktopImage?.url
  //       })) || [],
  //     submit: queryNavResult.data?.navigation?.navCtaHeading || '',
  //     sideNavMobileImage: queryNavResult.data?.navigation?.sideNavMobileImage?.url || '',
  //     subMenu:
  //       queryNavResult.data?.navigation?.subMenu?.map((item) => ({
  //         title: item.text,
  //         path: item.url
  //       })) || [],
  //     social: {
  //       title: queryNavResult.data?.navigation?.social?.socialHeading || '',
  //       youtubeLink: queryNavResult.data?.navigation?.social?.youtube || '',
  //       linkedinLink: queryNavResult.data?.navigation?.social?.linkedin || '',
  //       instagramLink: queryNavResult.data?.navigation?.social?.instagram || '',
  //       xTwitterLink: queryNavResult.data?.navigation?.social?.xLink || ''
  //     }
  //   }
  // }

  // generateFooter(queryFooterResult: ApolloQueryResult<NavigationQueryResult>): FooterContent {
  //   return {
  //     siteMap: {
  //       title: queryFooterResult.data?.navigation?.sitemap || '',
  //       links:
  //         queryFooterResult.data?.navigation?.menuItem.map((item) => ({
  //           title: item.link.text,
  //           path: item.link.url
  //         })) || []
  //     },
  //     whereToRide: {
  //       title: queryFooterResult.data?.navigation?.whereToRide?.heading || '',
  //       links:
  //         queryFooterResult.data?.navigation?.whereToRide?.city?.map((item) => ({
  //           title: item.text,
  //           path: item.url,
  //           disabled: item.isDisabled
  //         })) || []
  //     },
  //     form: {
  //       title: queryFooterResult.data?.navigation?.form?.heading || '',
  //       description: queryFooterResult.data?.navigation?.form?.description || '',
  //       email: {
  //         name: queryFooterResult.data?.navigation?.form?.emailLabel || '',
  //         label: queryFooterResult.data?.navigation?.form?.emailLabel || ''
  //       },
  //       zip: {
  //         name: queryFooterResult.data?.navigation?.form?.zipCodeLabel || '',
  //         label: queryFooterResult.data?.navigation?.form?.zipCodeLabel || ''
  //       },
  //       permission: queryFooterResult.data?.navigation?.form?.disclaimer || '',
  //       submit: queryFooterResult.data?.navigation?.form?.submitLabel || ''
  //     },
  //     bottom: {
  //       infoLinks:
  //         queryFooterResult.data?.navigation?.bottom?.map((item) => ({
  //           title: item.text,
  //           path: item.url
  //         })) || [],
  //       socials: {
  //         title: queryFooterResult.data?.navigation?.social?.socialHeading || '',
  //         youtubeLink: queryFooterResult.data?.navigation?.social?.youtube || '',
  //         linkedinLink: queryFooterResult.data?.navigation?.social?.linkedin || '',
  //         instagramLink: queryFooterResult.data?.navigation?.social?.instagram || '',
  //         xTwitterLink: queryFooterResult.data?.navigation?.social?.xLink || ''
  //       }
  //     },
  //     copyright: data.common.footer.copyright.text
  //   }
  // }

  async query<T, TVariables extends OperationVariables = OperationVariables>(
    options: QueryOptions<TVariables, T>,
  ): Promise<ApolloQueryResult<T>> {
    const result = await this.apollo.query(options);
    return result;
  }
  // TODO: migrate over to ApolloClient once content schema is set up
  getPageContent = <T extends PageIdentifier>(pageIdentifier: T): PageContent<T> => {
    const pageContent = data.pages[pageIdentifier];
    const common = data.common;
    const pageTitle = copy
      .parse(
        common.head.title,
        { title: pageContent.head.title ? copy.plain(pageContent.head.title) : '' },
        true,
        true,
      )
      .trim();
    const head = {
      ...common.head,
      ...pageContent.head,
      image: `${assetPrefix}/common/assets/images/share-image.jpg?v${buildNumber}`,
      title:
        pageTitle.startsWith('–') || pageTitle.startsWith('|') ? pageTitle.substring(2) : pageTitle,
      description: copy.parse(
        common.head.description,
        { description: pageContent.head.description || data.pages.home.head.description },
        true,
        true,
      ),
    };
    const body = pageContent.body;
    return { head, body, common };
  };
}

export const draftPreview = new DraftService();

import data from '@/data/content.json';

import { copy } from '@/utils/copy';

export type PageIdentifier = keyof typeof data.pages;
export type CommonContent = typeof data.common;
export type HeadContent = typeof data.common.head;
export type PageContent<T extends PageIdentifier = 'home'> = {
  head: HeadContent;
  common: CommonContent;
  body: (typeof data.pages)[T]['body'];
};

class Service {
  getPageContent = <T extends PageIdentifier>(pageIdentifier: T): PageContent<T> => {
    const pageContent = data.pages[pageIdentifier];
    const common = data.common;
    const pageTitle = copy
      .parse(common.head.title, {
        values: { title: pageContent.head.title ? copy.plain(pageContent.head.title) : '' },
        removeLineBreaks: true,
        removeHTML: true
      })
      .trim();
    const head = {
      ...common.head,
      ...pageContent.head,
      title: pageTitle.startsWith('–') || pageTitle.startsWith('|') ? pageTitle.substring(2) : pageTitle,
      description: copy.parse(common.head.description, {
        values: { description: pageContent.head.description || data.pages.home.head.description },
        removeLineBreaks: true,
        removeHTML: true
      })
    };
    const body = pageContent.body;
    return { head, body, common };
  };
}

export const CmsService = new Service();

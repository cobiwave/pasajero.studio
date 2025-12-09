import type { PaddingSizes } from './constants';

export interface DatoGetPageData {
  page: Page;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  components: CmsBaseComponent[];
}

export interface CmsBaseComponent {
  __typename?: string;
  _modelApiKey?: string;
  id?: string;
  topPadding?: PaddingSizes;
  bottomPadding?: PaddingSizes;
}

export type PageProps = {
  params: Promise<{ lang: string; slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

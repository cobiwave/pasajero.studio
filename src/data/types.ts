export interface DatoGetPageData {
  page: Page;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  components: Component[];
}

export interface Component {
  __typename: string;
  id?: string;
  title?: string;
  eyebrow?: string;
  description?: string;
}

export interface ComponentFE {
  data: {
    __typename: string;
    id?: string;
    title?: string;
    eyebrow?: string;
    description?: string;
  };
}

export type PageProps = {
  params: { category: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

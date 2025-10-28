import { graphql } from '@/lib/datocms/graphql';

export const QueryNavigationLinks = graphql(/* GraphQL */ `
  query NavigationLinks($locale: SiteLocale) {
    allNavigations(locale: $locale) {
      id
      slug
      order
      link {
        text
        url
      }
    }
  }
`);

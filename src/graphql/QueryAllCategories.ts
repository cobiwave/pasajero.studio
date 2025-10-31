import { graphql } from '@/lib/datocms/graphql';

export const QueryAllCategories = graphql(/* GraphQL */ `
  query allCategoryReferences {
    allCategories {
      id
      name
      slug
    }
  }
`);

import { graphql } from '@/lib/datocms/graphql';

export const QueryAllCategories = graphql(/* GraphQL */ `
  query allCategoryReferences {
    allCategoryReferences {
      id
      name
      slug
    }
  }
`);

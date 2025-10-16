import { graphql } from '@/lib/datocms/graphql';

export const SpacingBlockFragment = graphql(/* GraphQL */ `
  fragment SpacingBlockFragment on SpacingBlockRecord {
    __typename
    _modelApiKey
    id
    variant
  }
`);

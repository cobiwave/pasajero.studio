import { graphql } from '@/lib/datocms/graphql';

export const ConfigBlockFragment = graphql(/* GraphQL */ `
  fragment ConfigBlockFragment on ConfigBlockRecord {
    _modelApiKey
    id
    topPadding
    bottomPadding
  }
`);

import { graphql } from '@/lib/datocms/graphql';

export const MediaConfigBlockFragment = graphql(/* GraphQL */ `
  fragment MediaConfigBlockFragment on MediaConfigBlockRecord {
    _modelApiKey
    id
    aspectRatio
  }
`);

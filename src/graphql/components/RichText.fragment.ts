import { ConfigBlockFragment } from '@/graphql/fragments/ConfigBlock.fragment';
import { ImageBlockFragment } from '@/graphql/fragments/ImageBlock.fragment';
import { graphql } from '@/lib/datocms/graphql';

export const RichTextBlockFragment = graphql(
  /* GraphQL */ `
    fragment RichTextBlockFragment on RichTextBlockRecord {
      __typename
      _modelApiKey
      id
      config {
        ...ConfigBlockFragment
      }
      content {
        value
        links
        blocks {
          ...ImageBlockFragment
        }
      }
    }
  `,
  [ImageBlockFragment, ConfigBlockFragment]
);

import { graphql } from '@/lib/datocms/graphql';

import { ImageBlockFragment } from '../atoms/ImageBlock.fragment';
import { ConfigBlockFragment } from '../infra/ConfigBlock.fragment';

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

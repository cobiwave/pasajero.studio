import { MediaBlockFragment } from '@/components/Media/Media.controller';

import { graphql } from '@/lib/datocms/graphql';

import { SpacingBlockFragment } from '../atoms/SpacingBlock.fragment';
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
          ...MediaBlockFragment
          ...SpacingBlockFragment
        }
      }
    }
  `,
  [MediaBlockFragment, ConfigBlockFragment, SpacingBlockFragment]
);

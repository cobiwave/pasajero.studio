import { ImageBlockFragment } from '@/graphql/fragments/ImageBlock.fragment';
import { graphql } from '@/lib/datocms/graphql';

export const RichTextBlockFragment = graphql(
  /* GraphQL */ `
    fragment RichTextBlockFragment on RichTextBlockRecord {
      __typename
      id
      content {
        value
        links
        blocks {
          ...ImageBlockFragment
        }
      }
    }
  `,
  [ImageBlockFragment]
);

import type { QueryArticle } from '@/graphql/queries/articles';

import { forwardRef, memo } from 'react';

import { type FragmentOf, readFragment, type TypeFromQuery } from '@/lib/datocms/graphql';

import { RichTextBlockFragment } from './RichText.fragment';
import { View } from './RichText.view';

type StructuredContent = {
  value: unknown;
  links: string[];
  blocks: unknown[];
};
type DatoCMSArticleContent = NonNullable<TypeFromQuery<typeof QueryArticle>['article']>['content'];
export type ContentType = DatoCMSArticleContent | StructuredContent | null | undefined;

export interface PropsWithData {
  data: FragmentOf<typeof RichTextBlockFragment>;
  content?: never;
  className?: string;
}

export interface PropsWithContent {
  data?: never;
  content: ContentType;
  className?: string;
}

export type ControllerProps = PropsWithData | PropsWithContent;

export const Controller = memo(
  forwardRef<HTMLDivElement, ControllerProps>((props, ref) => {
    let filteredContent: ContentType;

    if ('data' in props && props.data) {
      const { data, className } = props;
      const unmaskedData = readFragment(RichTextBlockFragment, data);
      filteredContent = unmaskedData?.content;

      if (!filteredContent) {
        return null;
      }

      return <View content={filteredContent} className={className} ref={ref} />;
    }

    if ('content' in props) {
      const { content, className } = props;
      filteredContent = content;

      if (!filteredContent) {
        return null;
      }

      return <View content={filteredContent} className={className} ref={ref} />;
    }

    return null;
  })
);

Controller.displayName = 'RichText_Controller';

import type { QueryArticle } from '@/graphql/queries/articles';
import type { TypeFromQuery } from '@/lib/datocms/graphql';

import { forwardRef, memo } from 'react';

import { View } from './A01RichText.view';

type DatoCMSArticleContent = NonNullable<TypeFromQuery<typeof QueryArticle>['article']>['content'];
export type ContentType = DatoCMSArticleContent | null | undefined;

export interface ControllerProps {
  content: ContentType;
  className?: string;
}

export const Controller = memo(
  forwardRef<HTMLDivElement, ControllerProps>((props, ref) => {
    return <View {...props} ref={ref} />;
  })
);

Controller.displayName = 'A01RichText_Controller';

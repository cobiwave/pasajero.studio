import type { QueryAllArticles } from '@/graphql/QueryAllArticles';
import type { TypeFromQuery } from '@/lib/datocms/graphql';

import { forwardRef, memo, useMemo } from 'react';

import { View } from './ArticleList.view';

export interface ControllerProps {
  articles: TypeFromQuery<typeof QueryAllArticles>['allArticles'];
  className?: string;
}

export const Controller = memo(
  forwardRef<HTMLDivElement, ControllerProps>(({ articles, ...props }, ref) => {
    const sortedArticles = useMemo(() => {
      if (!articles || articles.length === 0) return articles;
      return [...articles].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });
    }, [articles]);

    if (!sortedArticles || sortedArticles.length === 0) {
      return null;
    }

    return <View {...props} articles={sortedArticles} ref={ref} />;
  })
);

Controller.displayName = 'ArticleList_Controller';

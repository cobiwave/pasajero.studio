'use client';

import type { FC } from 'react';
import type { ControllerProps } from './PageArticle.controller';

import { useMemo } from 'react';
import classNames from 'classnames';
import { animate } from 'motion';

import { prettifyDate } from '@/utils/basic-functions';

import { useRefs } from '@/hooks/use-refs';
import { useTransitionPresence } from '@/hooks/use-transition-presence';

import css from './PageArticle.module.scss';

import ResponsiveImage from '../ResponsiveImage/ResponsiveImage';
import { RichText } from '../RichText';

export interface ViewProps extends ControllerProps {}

export type ViewRefs = {
  root: HTMLElement;
};

export const View: FC<ViewProps> = ({ content: { article } }) => {
  const refs = useRefs<ViewRefs>();

  useTransitionPresence(
    useMemo(
      () => ({
        animateIn: () => animate(refs.root.current!, { opacity: 1 }, { delay: 0.15 }),
        animateOut: () => animate(refs.root.current!, { opacity: 0 })
      }),
      [refs]
    )
  );

  return (
    <main className={classNames('PageArticle', css.root)} ref={refs.root}>
      <div className={css.heading}>
        {article?.title ? <h1 className={css.title}>{article.title}</h1> : null}
        {article?._publishedAt ? <div className={css.date}>{prettifyDate(article._publishedAt)}</div> : null}
      </div>

      <div className={css.banner}>
        {article?.featuredImage?.responsiveImage ? (
          <ResponsiveImage
            imgStyle={{
              width: '100%',
              height: '100%',
              maxWidth: '100%',
              objectFit: 'cover',
              aspectRatio: '16 / 9'
            }}
            pictureClassName={css.image}
            data={article.featuredImage.responsiveImage}
          />
        ) : null}
      </div>

      <RichText className={css.content} content={article?.content} />
    </main>
  );
};

View.displayName = 'PageArticle_View';

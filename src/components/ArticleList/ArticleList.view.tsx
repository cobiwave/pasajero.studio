'use client';

import type { ControllerProps } from './ArticleList.controller';

import { forwardRef, useMemo } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { animate } from 'motion';

import { prettifyDate } from '@/utils/basic-functions';
import { multiRef } from '@/utils/multi-ref';

import { useRefs } from '@/hooks/use-refs';
import { useTransitionPresence } from '@/hooks/use-transition-presence';

import css from './ArticleList.module.scss';

import ResponsiveImage from '../ResponsiveImage/ResponsiveImage';

export interface ViewProps extends ControllerProps {}

export type ViewRefs = {
  root: HTMLDivElement;
};

export const View = forwardRef<HTMLDivElement, ViewProps>(({ articles, className }, ref) => {
  const refs = useRefs<ViewRefs>();

  useTransitionPresence(
    useMemo(
      () => ({
        animateIn: () => animate(refs.root.current!, { opacity: 1 }),
        animateOut: () => animate(refs.root.current!, { opacity: 0 })
      }),
      [refs]
    )
  );

  return (
    <div className={classNames('ArticleList', css.root, className)} ref={multiRef(refs.root, ref)}>
      <ul>
        {articles.map(({ id, slug, title, summary, featuredImage, _firstPublishedAt }) => (
          <li key={id}>
            {featuredImage?.responsiveImage ? (
              <div className={css.imageWrapper}>
                <Link className={css.title} href={`/articles/${slug}`}>
                  <ResponsiveImage
                    imgStyle={{
                      width: '100%',
                      height: '100%',
                      maxWidth: '100%',
                      objectFit: 'cover',
                      aspectRatio: '16 / 9'
                    }}
                    pictureClassName={css.image}
                    data={featuredImage.responsiveImage}
                  />
                </Link>
              </div>
            ) : null}
            <div className={css.content}>
              <div className={css.date}>{prettifyDate(_firstPublishedAt)}</div>
              <div className={css.summary}>
                <div className={css.titleWrapper}>
                  <Link className={css.title} href={`/articles/${slug}`}>
                    {title}
                  </Link>
                </div>
                <div className={css.descriptionWrapper}>
                  <p className={css.description}>{summary as string}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
});

View.displayName = 'ArticleList_View';

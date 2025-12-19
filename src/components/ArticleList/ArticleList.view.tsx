'use client';

import type { ControllerProps } from './ArticleList.controller';

import { forwardRef, useMemo } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { animate } from 'motion';

import { AspectRatio, ROUTES } from '@/data/constants';

import { prettifyDate } from '@/utils/basic-functions';
import { multiRef } from '@/utils/multi-ref';

import { useLanguage } from '@/hooks/use-language';
import { useRefs } from '@/hooks/use-refs';
import { useTransitionPresence } from '@/hooks/use-transition-presence';

import { Image } from '@/components/atoms/Image';

import { readFragment } from '@/lib/datocms/graphql';

import css from './ArticleList.module.scss';

import { ImageBlockFragment } from '../atoms/Image/Image.controller';

export interface ViewProps extends ControllerProps {}

export type ViewRefs = {
  root: HTMLDivElement;
};

export const View = forwardRef<HTMLDivElement, ViewProps>(({ articles, className }, ref) => {
  const refs = useRefs<ViewRefs>();
  const { currentLanguage } = useLanguage();

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
      <ul role="list">
        {articles.map(({ id, slug, title, date, summary, featuredImage }) => {
          const unmaskedFeaturedImage = readFragment(ImageBlockFragment, featuredImage);

          return (
            <li key={id}>
              {unmaskedFeaturedImage ? (
                <div className={css.imageWrapper}>
                  <Link className={css.title} href={`/${currentLanguage}${ROUTES.BLOG}${slug}`}>
                    <Image
                      data={unmaskedFeaturedImage}
                      aspectRatio={AspectRatio.ThreeTwo}
                      className={css.image}
                      parallaxEffect
                      responsiveImageProps={{
                        imgStyle: {
                          objectFit: 'cover',
                          height: '100%'
                        }
                      }}
                    />
                  </Link>
                </div>
              ) : null}
              <div className={css.content}>
                <div className={css.date}>{prettifyDate(date)}</div>
                <div className={css.summary}>
                  <div className={css.titleWrapper}>
                    <Link className={css.title} href={`/${currentLanguage}${ROUTES.BLOG}${slug}`}>
                      {title}
                    </Link>
                  </div>
                  <div className={css.descriptionWrapper}>
                    <p className={css.description}>{summary as string}</p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
});

View.displayName = 'ArticleList_View';

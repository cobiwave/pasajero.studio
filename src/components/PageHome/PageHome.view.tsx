'use client';

import type { FC } from 'react';
import type { ControllerProps } from './PageHome.controller';

import { useMemo } from 'react';
import classNames from 'classnames';
import { animate } from 'motion';

import { useRefs } from '@/hooks/use-refs';
import { useTransitionPresence } from '@/hooks/use-transition-presence';

import { ImageGallery } from '@/components/ImageGallery';

import css from './PageHome.module.scss';

import { ArticleList } from '../ArticleList';

export interface ViewProps extends ControllerProps {}

export type ViewRefs = {
  root: HTMLElement;
};

export const View: FC<ViewProps> = ({ content }) => {
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

  // console.log('allArticles', content.allArticles);

  return (
    <section className={classNames('PageHome', css.root)} ref={refs.root}>
      {content.allArticles.length > 0 ? <ArticleList data={content.allArticles} /> : null}
      {content.homePage.imageGallery ? <ImageGallery data={content.homePage.imageGallery} /> : null}
    </section>
  );
};

View.displayName = 'PageHome_View';

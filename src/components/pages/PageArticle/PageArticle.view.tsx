'use client';

import type { FC } from 'react';
import type { ControllerProps } from './PageArticle.controller';

import { useMemo } from 'react';
import classNames from 'classnames';
import { animate } from 'motion';

import { AspectRatio } from '@/data/constants';

import { prettifyDate } from '@/utils/basic-functions';

import { useRefs } from '@/hooks/use-refs';
import { useTransitionPresence } from '@/hooks/use-transition-presence';

import { Image } from '@/components/atoms/Image';
import { ImageBlockFragment } from '@/components/atoms/Image/Image.controller';
import { RichText } from '@/components/RichText';

import { RichTextBlockFragment } from '@/graphql/components/RichTextBlock.fragment';
import { readFragment } from '@/lib/datocms/graphql';

import css from './PageArticle.module.scss';

export interface ViewProps extends ControllerProps {}

export type ViewRefs = {
  root: HTMLElement;
};

export const View: FC<ViewProps> = ({ article }) => {
  const unmaskedRichText = readFragment(RichTextBlockFragment, article?.richText);
  const unmaskedFeaturedImage = readFragment(ImageBlockFragment, article?.featuredImage);

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
    <section className={classNames('PageArticle', css.root)} ref={refs.root}>
      <div className={css.heading}>
        {article?.title ? <h1 className={css.title}>{article.title}</h1> : null}
        {article?.date ? <div className={css.date}>{prettifyDate(article.date)}</div> : null}
      </div>

      <div className={css.featuredImage}>
        {unmaskedFeaturedImage ? <Image data={unmaskedFeaturedImage} aspectRatio={AspectRatio.SixteenNine} /> : null}
      </div>
      {unmaskedRichText ? <RichText data={unmaskedRichText} /> : null}
    </section>
  );
};

View.displayName = 'PageArticle_View';

'use client';

import type { FC } from 'react';
import type { ControllerProps } from './PageTemplate.controller';

import { useMemo } from 'react';
import classNames from 'classnames';
import { animate } from 'motion';

import { useRefs } from '@/hooks/use-refs';
import { useTransitionPresence } from '@/hooks/use-transition-presence';

import RenderComponents from '@/renderComponent';

import css from './PageTemplate.module.scss';

import { ArticleList } from '../../ArticleList';

export interface ViewProps extends ControllerProps {}

export type ViewRefs = {
  root: HTMLElement;
};

export const View: FC<ViewProps> = ({ articles, components }) => {
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
    <section className={classNames('PageTemplate', css.root)} ref={refs.root}>
      <ArticleList articles={articles} />
      <RenderComponents components={components} />
    </section>
  );
};

View.displayName = 'PageTemplate_View';

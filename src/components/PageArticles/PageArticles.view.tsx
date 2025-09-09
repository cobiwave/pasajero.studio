'use client';

import type { FC } from 'react';
import type { ControllerProps } from './PageArticles.controller';

import { useMemo } from 'react';
import classNames from 'classnames';
import { animate } from 'motion';

import { useRefs } from '@/hooks/use-refs';
import { useTransitionPresence } from '@/hooks/use-transition-presence';

import css from './PageArticles.module.scss';

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

  return (
    <section className={classNames('PageArticles', css.root)} ref={refs.root}>
      <ul role="list">
        {content.allArticles.map(({ slug, id }) => (
          <li key={id}>{slug}</li>
        ))}
      </ul>
    </section>
  );
};

View.displayName = 'PageArticles_View';

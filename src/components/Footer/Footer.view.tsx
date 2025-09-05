'use client';

import type { ControllerProps } from './Footer.controller';

import { forwardRef, useMemo } from 'react';
import classNames from 'classnames';
import { animate } from 'motion';

import { multiRef } from '@/utils/multi-ref';

import { useRefs } from '@/hooks/use-refs';
import { useTransitionPresence } from '@/hooks/use-transition-presence';

import css from './Footer.module.scss';

export interface ViewProps extends ControllerProps {}

export type ViewRefs = {
  root: HTMLDivElement;
};

export const View = forwardRef<HTMLDivElement, ViewProps>(({ className }, ref) => {
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
    <footer className={classNames('Footer', css.root, className)} ref={multiRef(refs.root, ref)}>
      <div className={css.container}>
        <ul className={css.links}>
          <li>Link 1</li>
          <li>Link 2</li>
          <li>Link 3</li>
          <li>Link 4</li>
        </ul>
        <div className={css.newsletter}>NewsLetter</div>
        <div className={css.copyright}>
          <p>© 2025 My Website. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
});

View.displayName = 'Footer_View';

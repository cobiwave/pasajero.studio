'use client';

import type { ControllerProps } from './Footer.controller';

import { forwardRef, useMemo } from 'react';
import Link from 'next/link';
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
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
        <div className={css.copyright}>
          <p>© {new Date().getFullYear()} PASAJERO STUDIO.</p>
        </div>
        <ul className={css.social}>
          <li>
            <a href="https://www.instagram.com/pasajero.studio/" target="_blank" rel="noopener noreferrer">
              <img src="/assets/instagram.svg" alt="Instagram" />
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/@pasajero.studio" target="_blank" rel="noopener noreferrer">
              <img src="/assets/youtube.svg" alt="Youtube" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
});

View.displayName = 'Footer_View';

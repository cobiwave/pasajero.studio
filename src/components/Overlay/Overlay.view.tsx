'use client';

import { forwardRef, useMemo } from 'react';
import { animate, stagger } from 'motion';

import { multiRef } from '@/utils/multi-ref';

import { useRefs } from '@/hooks/use-refs';
import { useTransitionPresence } from '@/hooks/use-transition-presence';

import css from './Overlay.module.scss';

export interface OverlayProps {
  children: React.ReactNode;
  className?: string;
  animateChildren?: boolean;
  childrenSelector?: string;
}

type OverlayRefs = {
  root: HTMLDivElement;
  animatedItems: HTMLElement[];
};

export const Overlay = forwardRef<HTMLDivElement, OverlayProps>(
  ({ children, className, animateChildren = true, childrenSelector = 'li' }, ref) => {
    const refs = useRefs<OverlayRefs>();

    const animations = useMemo(
      () => ({
        animateIn: () => {
          if (!refs.root.current) {
            return animate(document.body, { opacity: 1 }, { duration: 0 });
          }

          // Animate overlay
          const overlayAnim = animate(refs.root.current, { opacity: [0, 1] }, { duration: 0.2 });

          // Animate children if enabled
          if (animateChildren) {
            const items = refs.root.current.querySelectorAll(childrenSelector);
            if (items && items.length > 0) {
              animate(
                [...items],
                { opacity: [0, 1], y: [30, 0] },
                { duration: 0.3, delay: stagger(0.1, { from: 'first' }) }
              );
            }
          }

          return overlayAnim;
        },
        animateOut: () => {
          if (!refs.root.current) {
            return animate(document.body, { opacity: 0 }, { duration: 0 });
          }

          // Animate children out first if enabled
          if (animateChildren) {
            const items = refs.root.current.querySelectorAll(childrenSelector);
            if (items && items.length > 0) {
              animate([...items], { opacity: [1, 0], y: [0, -20] }, { duration: 0.2 });
            }
          }

          // Then animate overlay
          return animate(refs.root.current, { opacity: [1, 0] }, { duration: 0.2, delay: 0.1 });
        }
      }),
      [refs, animateChildren, childrenSelector]
    );

    useTransitionPresence(animations);

    return (
      <div ref={multiRef(refs.root, ref)} className={`${css.overlay} ${className || ''}`} aria-hidden={false}>
        {children}
      </div>
    );
  }
);

Overlay.displayName = 'Overlay';

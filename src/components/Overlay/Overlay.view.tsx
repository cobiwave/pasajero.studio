'use client';

import type { ControllerProps } from './Overlay.controller';

import { forwardRef, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { animate, stagger } from 'motion';

import { multiRef } from '@/utils/multi-ref';

import useKeyPress, { KEYS } from '@/hooks/use-key-press';
import { useRefs } from '@/hooks/use-refs';
import { useTransitionPresence } from '@/hooks/use-transition-presence';

import css from './Overlay.module.scss';

export interface ViewProps extends ControllerProps {}

export type ViewRefs = {
  root: HTMLDivElement;
  animatedItems: HTMLElement[];
};

export const View = forwardRef<HTMLDivElement, ViewProps>(
  (
    {
      children,
      className,
      animateChildren = true,
      childrenSelector = 'li',
      onClose,
      closeOnEscape = true,
      closeOnRouteChange = true
    },
    ref
  ) => {
    const refs = useRefs<ViewRefs>();

    // Close menu when pressing Escape
    useKeyPress({
      keys: KEYS.ESCAPE,
      onPress: () => {
        if (onClose) {
          onClose();
        }
      },
      shouldListen: closeOnEscape && !!onClose
    });

    // Close menu on route change
    useEffect(() => {
      if (!closeOnRouteChange || !onClose) return;

      const handleRouteChange = () => onClose();
      window.addEventListener('popstate', handleRouteChange);
      return () => window.removeEventListener('popstate', handleRouteChange);
    }, [onClose, closeOnRouteChange]);

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

    useTransitionPresence(
      useMemo(
        () => ({
          animateIn: () => animate(refs.root.current!, { opacity: 1 }),
          animateOut: () => animate(refs.root.current!, { opacity: 0 })
        }),
        [refs]
      )
    );

    useTransitionPresence(animations);

    return (
      <div className={classNames('Overlay', css.root, className)} ref={multiRef(refs.root, ref)} aria-hidden={false}>
        {children}
      </div>
    );
  }
);

View.displayName = 'Overlay_View';

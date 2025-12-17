'use client';

import type { ControllerProps } from './MobileNavigation.controller';

import { forwardRef, useCallback } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

import { multiRef } from '@/utils/multi-ref';

import { useRefs } from '@/hooks/use-refs';

import css from './MobileNavigation.module.scss';

import { Overlay } from '../Overlay';

export interface ViewProps extends ControllerProps {}

export type ViewRefs = {
  root: HTMLDivElement;
  button: HTMLButtonElement;
};

export const View = forwardRef<HTMLDivElement, ViewProps>(
  ({ isOpen, navigationLinks, onClose, onToggle, className }, ref) => {
    const refs = useRefs<ViewRefs>();

    // Handle button click - simple toggle
    const handleToggle = useCallback(() => {
      onToggle();
    }, [onToggle]);

    return (
      <div className={classNames('MobileNavigation', css.root, className)} ref={multiRef(refs.root, ref)}>
        {/* Mobile Menu Button */}
        <div className={css.mobileMenuButtonContainer}>
          <button
            ref={refs.button}
            className={classNames(css.mobileMenuButton, {
              [css.isOpen]: isOpen
            })}
            onClick={handleToggle}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            type="button"
          >
            <span className={css.hamburgerLine} />
            <span className={css.hamburgerLine} />
            <span className={css.hamburgerLine} />
          </button>
        </div>

        {isOpen ? (
          <Overlay onClose={onClose} closeOnEscape closeOnRouteChange>
            <ul role="list" className={css.mobileNavList}>
              {navigationLinks.map((link) => (
                <li key={link.link?.url} className={css.mobileNavItem}>
                  <Link href={link.link?.url ?? '#'} onClick={onClose} className={css.mobileNavLink}>
                    {link.link?.text}
                  </Link>
                </li>
              ))}
            </ul>
          </Overlay>
        ) : null}
      </div>
    );
  }
);

View.displayName = 'MobileNavigation_View';

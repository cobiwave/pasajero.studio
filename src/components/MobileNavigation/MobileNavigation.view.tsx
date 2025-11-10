'use client';

import type { NavigationLink } from '../Navigation/Navigation.controller';
import type { ControllerProps } from './MobileNavigation.controller';

import { forwardRef, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLockBodyScroll } from '@uidotdev/usehooks';
import classNames from 'classnames';

import { multiRef } from '@/utils/multi-ref';

import useKeyPress, { KEYS } from '@/hooks/use-key-press';
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

        {/* Mobile Menu Overlay with TransitionPresence */}
        {isOpen && <MobileNavigationOverlay navigationLinks={navigationLinks} onClose={onClose} />}
      </div>
    );
  }
);

View.displayName = 'MobileNavigation_View';

interface MobileNavigationOverlayProps {
  onClose: () => void;
  navigationLinks: NavigationLink[];
}

function MobileNavigationOverlay({ onClose, navigationLinks }: MobileNavigationOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when component is mounted
  useLockBodyScroll();

  // Close menu when pressing Escape
  useKeyPress({
    keys: KEYS.ESCAPE,
    onPress: onClose,
    shouldListen: true
  });

  // Close menu on route change
  useEffect(() => {
    const handleRouteChange = () => onClose();
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, [onClose]);

  return (
    <Overlay ref={overlayRef}>
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
  );
}

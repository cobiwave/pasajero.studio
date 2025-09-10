'use client';

import { forwardRef, useCallback, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useLockBodyScroll } from '@uidotdev/usehooks';
import classNames from 'classnames';
import { animate, stagger } from 'motion';

import { multiRef } from '@/utils/multi-ref';

import useKeyPress, { KEYS } from '@/hooks/use-key-press';
import { useRefs } from '@/hooks/use-refs';
import { useTransitionPresence } from '@/hooks/use-transition-presence';

import css from './MobileNav.module.scss';

export interface NavigationLink {
  href: string;
  label: string;
}

interface MobileNavOverlayProps {
  navigationLinks: NavigationLink[];
  onClose: () => void;
}

type OverlayRefs = {
  root: HTMLDivElement;
  navItems: HTMLLIElement[];
};

const MobileNavOverlay = forwardRef<HTMLDivElement, MobileNavOverlayProps>(({ navigationLinks, onClose }, ref) => {
  const refs = useRefs<OverlayRefs>();

  const animations = useMemo(
    () => ({
      animateIn: () => {
        const items = refs.navItems.current;
        if (!refs.root.current || !items || items.length === 0) {
          return animate(refs.root.current || document.body, { opacity: 1 }, { duration: 0 });
        }

        // Animate overlay
        const overlayAnim = animate(refs.root.current, { opacity: [0, 1] }, { duration: 0.2 });

        // Animate nav items with stagger
        animate(items, { opacity: [0, 1], y: [30, 0] }, { duration: 0.3, delay: stagger(0.1, { from: 'first' }) });

        return overlayAnim;
      },
      animateOut: () => {
        const items = refs.navItems.current;
        if (!refs.root.current) {
          return animate(document.body, { opacity: 0 }, { duration: 0 });
        }

        // Animate nav items out first
        if (items && items.length > 0) {
          animate(items, { opacity: [1, 0], y: [0, -20] }, { duration: 0.2 });
        }

        // Then animate overlay
        return animate(refs.root.current, { opacity: [1, 0] }, { duration: 0.2, delay: 0.1 });
      }
    }),
    [refs]
  );

  useTransitionPresence(animations);

  const handleRef = useCallback(
    (el: HTMLLIElement | null, index: number) => {
      if (el) {
        if (!refs.navItems.current) {
          refs.navItems.current = [];
        }
        refs.navItems.current[index] = el;
      }
    },
    [refs.navItems]
  );

  return (
    <div ref={multiRef(refs.root, ref)} className={css.mobileMenuOverlay} aria-hidden={false}>
      <ul role="list" className={css.mobileNavList}>
        {navigationLinks.map((link, index) => (
          <li key={link.href} ref={(el) => handleRef(el, index)} className={css.mobileNavItem}>
            <Link href={link.href} onClick={onClose} className={css.mobileNavLink}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
});

MobileNavOverlay.displayName = 'MobileNavOverlay';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
  navigationLinks: NavigationLink[];
}

interface MobileNavContentProps {
  onClose: () => void;
  navigationLinks: NavigationLink[];
}

function MobileNavContent({ onClose, navigationLinks }: MobileNavContentProps) {
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

  return <MobileNavOverlay ref={overlayRef} navigationLinks={navigationLinks} onClose={onClose} />;
}

export default function MobileNav({ isOpen, onClose, onToggle, navigationLinks }: MobileNavProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Handle button click - simple toggle
  const handleToggle = useCallback(() => {
    onToggle();
  }, [onToggle]);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className={css.mobileMenuButtonContainer}>
        <button
          ref={buttonRef}
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
      {isOpen && <MobileNavContent navigationLinks={navigationLinks} onClose={onClose} />}
    </>
  );
}

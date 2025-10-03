'use client';

import { useEffect, useState } from 'react';
import localFont from 'next/font/local';
import Link from 'next/link';
import { useIsClient, useWindowSize } from '@uidotdev/usehooks';
import classNames from 'classnames';

import { TransitionPresence } from '@/motion/transition.presence';

import css from './GlobalNav.module.scss';

import MobileNav, { type NavigationLink } from './MobileNav';

const stretchPro = localFont({
  src: '../../fonts/StretchPro.woff2'
});

// Mock data - luego puedes reemplazar con datos del CMS
const navigationLinks: NavigationLink[] = [
  { href: '/film', label: 'Film' },
  { href: '/surf', label: 'Surf' },
  { href: '/skate', label: 'Skate' },
  { href: '/art', label: 'Art' }
];

// Breakpoint from vars.scss
// TODO - sync with SCSS variable
const DESKTOP_BREAKPOINT = 1080;

export default function GlobalNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const windowSize = useWindowSize();
  const isClient = useIsClient();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Use window size instead of device detection
  const isMobile = isClient && windowSize.width && windowSize.width < DESKTOP_BREAKPOINT;

  // Close mobile menu when switching to desktop
  useEffect(() => {
    if (!isMobile && isMobileMenuOpen) {
      closeMobileMenu();
    }
  }, [isMobile, isMobileMenuOpen]);

  return (
    <header className={css.root}>
      <a href="#main-content" className={css.skip}>
        Skip to main content
      </a>

      <nav className={classNames(css.nav)} role="navigation" aria-label="Main Navigation">
        <ul role="list" className={css.desktopNav}>
          {navigationLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>

        <div className={classNames(css.logo, stretchPro.className)}>
          <Link href="/" aria-label="Home">
            Pasajero
          </Link>
        </div>

        {/* Mobile Navigation with TransitionPresence */}
        {isMobile && (
          <TransitionPresence>
            <MobileNav
              key="mobile-nav"
              isOpen={isMobileMenuOpen}
              onClose={closeMobileMenu}
              onToggle={toggleMobileMenu}
              navigationLinks={navigationLinks}
            />
          </TransitionPresence>
        )}
      </nav>
    </header>
  );
}

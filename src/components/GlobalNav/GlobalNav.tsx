'use client';

import { useEffect, useState } from 'react';
import localFont from 'next/font/local';
import Link from 'next/link';
import { useIsClient, useWindowSize } from '@uidotdev/usehooks';
import classNames from 'classnames';

import { useLanguage } from '@/hooks/use-language';

import { TransitionPresence } from '@/motion/transition.presence';

import css from './GlobalNav.module.scss';

import LanguageSelector from './LanguageSelector';
import MobileNav, { type NavigationLink } from './MobileNav';

const stretchPro = localFont({
  src: '../../fonts/StretchPro.woff2'
});

// Breakpoint from vars.scss
// TODO - sync with SCSS variable
const DESKTOP_BREAKPOINT = 1080;

export interface GlobalNavProps {
  links: NavigationLink[];
}

export default function GlobalNav({ links }: GlobalNavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const windowSize = useWindowSize();
  const isClient = useIsClient();
  const { currentLanguage } = useLanguage();

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
      <nav className={classNames(css.nav)} role="navigation" aria-label="Main Navigation">
        <ul role="list" className={css.desktopNav}>
          {links.map((link) => (
            <li key={link.id}>
              <Link href={`/${currentLanguage}${link.link?.url}`}>{link.link?.text}</Link>
            </li>
          ))}
        </ul>

        <div className={classNames(css.logo, stretchPro.className)}>
          <Link href={`/${currentLanguage}`} aria-label="Home">
            Pasajero
          </Link>
        </div>

        <div className={css.languageSelector}>
          <LanguageSelector />
        </div>

        {/* Mobile Navigation with TransitionPresence */}
        {isMobile && (
          <TransitionPresence>
            <MobileNav
              key="mobile-nav"
              isOpen={isMobileMenuOpen}
              onClose={closeMobileMenu}
              onToggle={toggleMobileMenu}
              navigationLinks={links.map((link) => ({
                ...link,
                href: `/${currentLanguage}${link.link?.url}`
              }))}
            />
          </TransitionPresence>
        )}
      </nav>
    </header>
  );
}

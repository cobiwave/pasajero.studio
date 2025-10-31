'use client';

import type { ControllerProps } from './Navigation.controller';

import { forwardRef, useEffect, useState } from 'react';
import localFont from 'next/font/local';
import Link from 'next/link';
import { useIsClient, useWindowSize } from '@uidotdev/usehooks';
import classNames from 'classnames';

import { multiRef } from '@/utils/multi-ref';
import { sass } from '@/utils/sass';

import { useLanguage } from '@/hooks/use-language';
import { useRefs } from '@/hooks/use-refs';

import { TransitionPresence } from '@/motion/transition.presence';

import css from './Navigation.module.scss';

import { LanguageSelector } from '../LanguageSelector';
import { MobileNavigation } from '../MobileNavigation';

const stretchPro = localFont({
  src: '../../fonts/StretchPro.woff2'
});

export interface ViewProps extends ControllerProps {}

export type ViewRefs = {
  root: HTMLDivElement;
};

export const View = forwardRef<HTMLDivElement, ViewProps>(({ links, className }, ref) => {
  const refs = useRefs<ViewRefs>();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const windowSize = useWindowSize();
  const isClient = useIsClient();
  const { currentLanguage } = useLanguage();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Use window size instead of device detection
  const isMobile = isClient && windowSize.width && windowSize.width < parseInt(sass['breakpoint-desktop'], 10);

  // Close mobile menu when switching to desktop
  useEffect(() => {
    if (!isMobile && isMobileMenuOpen) {
      closeMobileMenu();
    }
  }, [isMobile, isMobileMenuOpen]);

  return (
    <header className={classNames('Navigation', css.root, className)} ref={multiRef(refs.root, ref)}>
      <nav className={classNames(css.nav)}>
        <div className={classNames(css.logo, stretchPro.className)}>
          <Link href={`/${currentLanguage}`} aria-label="Home">
            Pasajero
          </Link>
        </div>

        <ul role="list" className={css.desktopNav}>
          {links.map((link) => (
            <li key={link.id}>
              <Link href={`/${currentLanguage}${link.link?.url}`}>{link.link?.text}</Link>
            </li>
          ))}
        </ul>

        <div className={css.languageSelector}>
          <LanguageSelector />
        </div>

        {/* Mobile Navigation with TransitionPresence */}
        {isMobile && (
          <TransitionPresence>
            <MobileNavigation
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
});

View.displayName = 'Navigation_View';

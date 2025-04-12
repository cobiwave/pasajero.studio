import localFont from 'next/font/local';
import Link from 'next/link';
import classNames from 'classnames';

import css from './GlobalNav.module.scss';

const stretchPro = localFont({
  src: '../../fonts/StretchPro.woff2'
});

export default function GlobalNav() {
  return (
    <header className={css.root}>
      <a href="#main-content" className={css.skip}>
        Skip to main content
      </a>

      <nav className={css.nav} role="navigation" aria-label="Main Navigation">
        <ul>
          <li>
            <Link href="/skate">Skate</Link>
          </li>
          <li>
            <Link href="/surf">Surf</Link>
          </li>
          <li>
            <Link href="/art">Art</Link>
          </li>
        </ul>

        <div className={classNames(css.logo, stretchPro.className)}>
          <Link href="/" aria-label="Home">
            Pasajero
          </Link>
        </div>
      </nav>
    </header>
  );
}

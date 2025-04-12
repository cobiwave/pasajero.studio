import Link from 'next/link';

import styles from './GlobalNav.module.scss';

export default function GlobalNav() {
  return (
    <header className={styles.root}>
      <a href="#main-content" className={styles.skip}>
        Skip to main content
      </a>

      <nav className={styles.nav} role="navigation" aria-label="Main Navigation">
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

        <div className={styles.logo}>
          <Link href="/" aria-label="Home">
            Pasajero
          </Link>
        </div>
      </nav>
    </header>
  );
}

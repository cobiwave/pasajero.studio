import Link from 'next/link';
import styles from './GlobalNav.module.scss';

export default function GlobalNav() {
  return (
    <header className={styles.header}>
      <a href="#main-content" className={styles.skip}>
        Skip to main content
      </a>

      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" aria-label="Home">
            Pasajero
          </Link>
        </div>

        {/* <nav className={styles.nav} role="navigation" aria-label="Main Navigation">
          <ul>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav> */}
      </div>
    </header>
  );
}

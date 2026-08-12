"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLenis } from "@/components/SmoothScroll";
import styles from "./Navbar.module.css";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface NavbarProps {
  items: { label: string; href: string }[];
  contactEmail: string;
  socials: { label: string; href: string }[];
}

export default function Navbar({
  items: NAV_ITEMS,
  contactEmail: CONTACT_EMAIL,
  socials: SOCIALS,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();

      if (e.key === "Tab" && isOpen && overlayRef.current) {
        const focusable =
          overlayRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [close, isOpen]);

  useEffect(() => {
    const lenis = getLenis();
    if (isOpen) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    }
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <a href="#work">
        Skip to content
      </a>

      {/* Persistent editorial bar — md and up */}
      <div
        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
      >
        <Link
          href="/"
          style={{ fontFamily: "StretchPro, sans-serif" }}
        >
          PASAJERO
        </Link>

        <nav aria-label="Primary">
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <a href={`mailto:${CONTACT_EMAIL}`}>
            Email
          </a>
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile: top bar + hamburger + fullscreen overlay — below md */}
      <nav data-nav-status={isOpen ? "active" : "not-active"}>
        <div>
          <Link
            href="/"
            onClick={close}
            style={{ fontFamily: "StretchPro, sans-serif" }}
          >
            PASAJERO
          </Link>

          <button
            onClick={toggle}
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isOpen}
            aria-controls="nav-overlay"
            className={styles.hamburger}
          >
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
          </button>
        </div>

        <div
          ref={overlayRef}
          id="nav-overlay"
          role="dialog"
          aria-modal={isOpen}
          aria-label="Navigation menu"
          className={styles.tile}
        >
          <ul className={styles.list}>
            {NAV_ITEMS.map((item) => (
              <li key={item.label} className={styles.item}>
                <div className={styles.link}>
                  <Link
                    href={item.href}
                    onClick={close}
                    tabIndex={isOpen ? 0 : -1}
                    style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
                  >
                    {item.label}
                  </Link>
                </div>
              </li>
            ))}
          </ul>

          <div>
            <p>{CONTACT_EMAIL}</p>
          </div>
        </div>
      </nav>
    </>
  );
}

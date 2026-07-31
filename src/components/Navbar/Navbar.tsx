"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
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
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-200 focus:bg-primary focus:text-background focus:px-4 focus:py-2 focus:rounded-md focus:text-sm focus:font-semibold"
      >
        Skip to content
      </a>

      {/* Persistent editorial bar — md and up */}
      <div
        className={cn(
          "fixed top-0 left-0 z-100 hidden w-full items-center justify-between px-6 py-6 transition-colors duration-500 md:flex md:px-10",
          isScrolled ? "bg-background" : "bg-transparent",
        )}
        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
      >
        <Link
          href="/"
          className="text-lg font-bold tracking-tighter uppercase text-white"
          style={{ fontFamily: "StretchPro, sans-serif" }}
        >
          PASAJERO
        </Link>

        <nav aria-label="Primary">
          <ul className="flex items-center gap-(--space-m)">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "text-sm tracking-tight transition-colors duration-300 hover:text-white",
                    isActive(item.href) ? "text-white/40" : "text-white",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-(--space-s)">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-sm tracking-tight text-white transition-colors duration-300 hover:text-white/40"
          >
            Email
          </a>
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm tracking-tight text-white transition-colors duration-300 hover:text-white/40"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile: top bar + hamburger + fullscreen overlay — below md */}
      <nav
        data-nav-status={isOpen ? "active" : "not-active"}
        className="fixed inset-0 z-100 pointer-events-none md:hidden"
      >
        <div
          className={cn(
            "absolute z-10 w-full flex justify-between items-center px-6 py-6 transition-colors duration-500",
            isScrolled ? "bg-background" : "bg-transparent",
          )}
        >
          <Link
            href="/"
            onClick={close}
            className="pointer-events-auto relative z-10 text-lg font-bold tracking-tighter uppercase p-2 text-white"
            style={{ fontFamily: "StretchPro, sans-serif" }}
          >
            PASAJERO
          </Link>

          <button
            onClick={toggle}
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isOpen}
            aria-controls="nav-overlay"
            className={cn(
              styles.hamburger,
              "pointer-events-auto relative z-10 flex items-center justify-center w-12 h-12 cursor-pointer bg-transparent overflow-hidden",
            )}
          >
            <span
              className={cn(styles.bar, "absolute w-8 h-[2px] bg-white")}
            />
            <span
              className={cn(styles.bar, "absolute w-8 h-[2px] bg-white")}
            />
            <span
              className={cn(styles.bar, "absolute w-8 h-[2px] bg-white")}
            />
          </button>
        </div>

        <div
          ref={overlayRef}
          id="nav-overlay"
          role="dialog"
          aria-modal={isOpen}
          aria-label="Navigation menu"
          className={cn(
            styles.tile,
            "absolute inset-0 flex flex-col items-center justify-center bg-surface",
          )}
        >
          <ul
            className={cn(
              styles.list,
              "flex flex-col items-center w-full m-0 p-0 list-none",
            )}
          >
            {NAV_ITEMS.map((item) => (
              <li
                key={item.label}
                className={cn(
                  styles.item,
                  "relative flex items-center justify-center w-full m-0 p-0 overflow-hidden h-[calc(clamp(2.5rem,4vw+4vh,10rem)*1.15)]",
                )}
              >
                <div className={styles.link}>
                  <Link
                    href={item.href}
                    onClick={close}
                    tabIndex={isOpen ? 0 : -1}
                    className="block font-light leading-[1.1] tracking-[-0.04em] text-4xl no-underline px-[0.075em] text-foreground"
                    style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
                  >
                    {item.label}
                  </Link>
                </div>
              </li>
            ))}
          </ul>

          <div className="absolute bottom-0 left-0 w-full flex justify-end items-center px-6 py-6">
            <p className="text-muted text-lg m-0">{CONTACT_EMAIL}</p>
          </div>
        </div>
      </nav>
    </>
  );
}

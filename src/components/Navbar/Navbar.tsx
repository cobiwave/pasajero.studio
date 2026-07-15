"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLenis } from "@/components/SmoothScroll";
import { Magnetic } from "./Magnetic";
import content from "@/lib/content";
import styles from "./Navbar.module.css";

const { items: NAV_ITEMS, footer: NAV_FOOTER } = content.nav;

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

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
    if (!lenis) return;
    if (isOpen) {
      lenis.stop();
    }
    return () => {
      lenis.start();
    };
  }, [isOpen, lenis]);

  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-200 focus:bg-primary focus:text-background focus:px-4 focus:py-2 focus:rounded-md focus:text-sm focus:font-semibold"
      >
        Skip to content
      </a>

      <nav
        data-nav-status={isOpen ? "active" : "not-active"}
        className="fixed inset-0 z-100 pointer-events-none"
      >
        <div className="absolute z-10 w-full flex justify-between items-center px-6 py-6 md:px-10">
          <Link
            href="/"
            onClick={close}
            className="pointer-events-auto relative z-10"
          >
            <Magnetic xDistance={0.1} yDistance={0.1}>
              <div
                className="text-lg font-bold tracking-tighter uppercase p-2 text-foreground"
                style={{ fontFamily: "StretchPro, sans-serif" }}
              >
                PASAJERO
              </div>
            </Magnetic>
          </Link>

          <Magnetic>
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
                className={cn(styles.bar, "absolute w-8 h-[2px] bg-foreground")}
              />
              <span
                className={cn(styles.bar, "absolute w-8 h-[2px] bg-foreground")}
              />
              <span
                className={cn(styles.bar, "absolute w-8 h-[2px] bg-foreground")}
              />
            </button>
          </Magnetic>
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
                    style={{ fontFamily: "StretchPro, sans-serif" }}
                  >
                    {item.label}
                  </Link>
                </div>
              </li>
            ))}
          </ul>

          <div className="absolute bottom-0 left-0 w-full flex justify-end items-center px-6 py-6 md:px-10">
            {/* <p className="text-muted text-lg m-0">{NAV_FOOTER.location}</p> */}
            <p className="text-muted text-lg m-0">{NAV_FOOTER.email}</p>
          </div>
        </div>
      </nav>
    </>
  );
}

"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { LenisProvider } from "./LenisContext";

let globalLenis: Lenis | null = null;
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot() {
  return globalLenis;
}

function getServerSnapshot() {
  return null;
}

export function getLenis(): Lenis | null {
  return globalLenis;
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenis = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (globalLenis) return;

    const instance = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    globalLenis = instance;
    listeners.forEach((cb) => cb());

    instance.on("scroll", ScrollTrigger.update);

    const update = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    cleanupRef.current = () => {
      gsap.ticker.remove(update);
      instance.destroy();
      globalLenis = null;
      listeners.forEach((cb) => cb());
    };

    return () => {
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, []);

  return <LenisProvider value={lenis}>{children}</LenisProvider>;
}

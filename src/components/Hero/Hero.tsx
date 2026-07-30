"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

interface HeroProps {
  loaded?: boolean;
  subtitle: string;
}

export default function Hero({ loaded = true, subtitle }: HeroProps) {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set([".hero-meta", ".hero-video-wrap"], {
          autoAlpha: 1,
        });
        return;
      }

      gsap.set([".hero-meta", ".hero-video-wrap"], {
        visibility: "hidden",
      });

      if (!loaded) return;

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".hero-video-wrap",
        { autoAlpha: 0, scale: 1.05 },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 2.4,
          ease: "power2.out",
        },
      ).fromTo(
        ".hero-meta",
        { y: 16, autoAlpha: 0 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          stagger: 0.08,
          force3D: true,
        },
        "-=1.4",
      );
    },
    { scope: container, dependencies: [loaded] },
  );

  return (
    <section
      ref={container}
      className="relative h-dvh flex flex-col justify-end overflow-hidden text-foreground"
    >
      {/* Video Background */}
      <div className="hero-video-wrap absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/bg-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-background/10" />
        <div className="absolute inset-0 bg-linear-to-r from-background/40 via-transparent to-background/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-(--space-l) pb-(--space-m) pt-(--space-m) lg:pt-(--space-3xl)">
        {/* Bottom: tagline + socials */}
        <div className="mt-auto flex flex-wrap justify-between items-end w-full gap-y-(--space-s)">
          <p className="hero-meta text-foreground/60 text-sm lg:text-base font-light leading-snug max-w-[38ch]">
            {subtitle}
          </p>

          <div className="hero-meta flex flex-col items-end gap-(--space-xs)">
            <p className="text-foreground/20 text-xs font-mono tracking-wider uppercase">
              &copy; {new Date().getFullYear()} Pasajero Studio
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

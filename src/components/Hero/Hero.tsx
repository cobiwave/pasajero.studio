"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import content from "@/lib/content";

const { subtitle } = content.hero;
const socials = content.contact.socials;

interface HeroProps {
  loaded?: boolean;
}

export default function Hero({ loaded = true }: HeroProps) {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set([".hero-meta", ".hero-video-wrap", ".hero-badge"], {
          autoAlpha: 1,
        });
        return;
      }

      gsap.set([".hero-meta", ".hero-video-wrap", ".hero-badge"], {
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
      )
        .fromTo(
          ".hero-badge",
          { y: 12, autoAlpha: 0 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=1.6",
        )
        .fromTo(
          ".hero-meta",
          { y: 16, autoAlpha: 0 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            stagger: 0.08,
            force3D: true,
          },
          "-=0.8",
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
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          <source src="/bg-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/70 to-background/30" />
        <div className="absolute inset-0 bg-linear-to-r from-background/60 via-transparent to-background/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-(--space-l) pb-(--space-m) pt-(--space-m) lg:pt-(--space-3xl)">
        {/* Bottom: tagline + socials */}
        <div className="mt-auto flex flex-wrap justify-between items-end w-full gap-y-(--space-s)">
          <p className="hero-meta text-foreground/60 text-sm lg:text-base font-light leading-snug max-w-[38ch]">
            {subtitle}
          </p>

          <div className="hero-meta flex flex-col items-end gap-(--space-xs)">
            <ul className="flex items-center gap-(--space-s)">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/35 hover:text-primary transition-colors duration-300 font-mono tracking-wider uppercase text-xs"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-foreground/20 text-xs font-mono tracking-wider uppercase">
              &copy; {new Date().getFullYear()} Pasajero Studio
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

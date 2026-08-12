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
    <section ref={container}>
      {/* Video Background */}
      <div className="hero-video-wrap">
        <video autoPlay muted loop playsInline>
          <source src="/bg-video.mp4" type="video/mp4" />
        </video>
        <div />
        <div />
      </div>

      {/* Content */}
      <div>
        {/* Bottom: tagline + socials */}
        <div>
          <p className="hero-meta">
            {subtitle}
          </p>

          <div className="hero-meta">
            <p>
              &copy; {new Date().getFullYear()} Pasajero Studio
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import content from "@/data/content.json";

const { headline, subtitle } = content.hero;
const socials = content.contact.socials;

interface HeroProps {
  loaded?: boolean;
}

export default function Hero({ loaded = true }: HeroProps) {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set([".reveal-text", ".hero-meta", ".hero-portrait"], {
          autoAlpha: 1,
        });
        return;
      }

      gsap.set([".reveal-text", ".hero-meta", ".hero-portrait"], {
        visibility: "hidden",
      });

      if (!loaded) return;

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".reveal-text",
        { y: "102%", skewY: 4, autoAlpha: 0 },
        {
          y: "0%",
          skewY: 0,
          autoAlpha: 1,
          duration: 1.4,
          stagger: 0.08,
          transformOrigin: "left top",
          force3D: true,
        }
      )
        .fromTo(
          ".hero-meta",
          { y: 20, autoAlpha: 0 },
          { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08, force3D: true },
          "-=0.8"
        )
        .fromTo(
          ".hero-portrait",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 1.6, ease: "power2.inOut" },
          "-=1.2"
        );
    },
    { scope: container, dependencies: [loaded] }
  );

  return (
    <section
      ref={container}
      className="relative h-screen flex flex-col justify-end overflow-hidden text-foreground"
    >
      <div className="hero-portrait absolute top-0 right-0 h-full w-[60%] sm:w-[50%] lg:w-[45%] z-0">
        <Image
          src="/portrait-placeholder.jpg"
          alt="Portrait"
          fill
          priority
          className="object-cover object-top"
          sizes="(max-width: 640px) 60vw, (max-width: 1024px) 50vw, 45vw"
        />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full px-5 sm:px-8 md:px-10 pb-6 sm:pb-8 pt-24">
        <div className="mt-auto mb-10 sm:mb-14 md:mb-16 max-w-[85%] sm:max-w-[65%] lg:max-w-[55%]">
          <h1 className="text-[clamp(3rem,10vw,13rem)] font-bold tracking-[-0.04em] leading-[0.85] mb-6 sm:mb-8">
            {headline.map((line, i) => (
              <div key={i} className="overflow-hidden">
                <div className="reveal-text">
                  {i === 1 ? (
                    <>
                      <span className="font-serif italic text-foreground/90 font-light">
                        {line}
                      </span>{" "}
                    </>
                  ) : (
                    line
                  )}
                </div>
              </div>
            ))}
          </h1>

          <div className="hero-meta max-w-xs sm:max-w-md lg:max-w-lg">
            <p className="text-[clamp(0.875rem,1.5vw,1.5rem)] text-foreground/70 leading-relaxed">
              {subtitle}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-end w-full">
          <div className="hero-meta text-foreground/50 text-sm">&#8595;</div>

          <ul className="hero-meta flex flex-col items-end gap-1 text-xs sm:text-sm">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-foreground transition-colors underline underline-offset-4 decoration-foreground/20 hover:decoration-foreground/50"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

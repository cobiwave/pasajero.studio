"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import content from "@/lib/content";

const { tagline, comingSoon } = content.hero;
const socials = content.contact.socials;

export default function LabSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set(
          [".lab-reveal", ".lab-meta", ".lab-line", ".lab-badge"],
          { autoAlpha: 1 }
        );
        return;
      }

      gsap.set(
        [".lab-reveal", ".lab-meta", ".lab-line", ".lab-badge"],
        { visibility: "hidden" }
      );

      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        delay: 0.3,
      });

      tl.fromTo(
        ".lab-badge",
        { y: 16, autoAlpha: 0 },
        { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out" }
      )
        .fromTo(
          ".lab-reveal",
          { y: "110%", skewY: 4, autoAlpha: 0 },
          {
            y: "0%",
            skewY: 0,
            autoAlpha: 1,
            duration: 1.4,
            stagger: 0.08,
            transformOrigin: "left top",
            force3D: true,
          },
          "-=0.6"
        )
        .fromTo(
          ".lab-line",
          { scaleX: 0, autoAlpha: 0 },
          {
            scaleX: 1,
            autoAlpha: 1,
            duration: 1.2,
            ease: "power3.inOut",
            transformOrigin: "left center",
          },
          "-=0.8"
        )
        .fromTo(
          ".lab-meta",
          { y: 20, autoAlpha: 0 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            stagger: 0.06,
            force3D: true,
          },
          "-=0.6"
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-dvh flex flex-col justify-end overflow-hidden text-foreground"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(204,255,0,0.08),transparent)]" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-background to-transparent" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 flex flex-col h-full min-h-dvh px-(--space-l) pb-(--space-m) pt-32 lg:pt-(--space-3xl)">
        {/* Badge */}
        <div className="flex items-start">
          <div className="lab-badge inline-flex items-center gap-2 border border-primary/20 rounded-full px-4 py-2 backdrop-blur-sm bg-primary/5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-xs font-mono tracking-[0.15em] uppercase text-primary/80">
              In Development
            </span>
          </div>
        </div>

        {/* Main content — pushed to bottom */}
        <div className="mt-auto mb-(--space-s) lg:mb-(--space-l)">
          <h1
            className="text-display leading-[0.85] mb-(--space-s) lg:mb-(--space-m)"
            style={{
              fontFamily: "StretchPro, sans-serif",
              letterSpacing: "0.02em",
              fontKerning: "none",
            }}
          >
            <div className="overflow-hidden">
              <div className="lab-reveal">AI</div>
            </div>
            <div className="overflow-hidden">
              <div className="lab-reveal text-foreground/75">TOOLS</div>
            </div>
          </h1>

          <div className="lab-line h-px w-full max-w-2xl bg-linear-to-r from-primary/50 via-primary/20 to-transparent mb-(--space-s) lg:mb-(--space-m)" />

          <div className="lab-meta max-w-[55ch]">
            <p className="text-lg leading-relaxed lg:text-xl lg:leading-relaxed text-foreground/65">
              {tagline}. We&apos;re building intelligent tools that understand
              the language of cinema — color science, grading workflows, and
              post-production pipelines.
            </p>
          </div>

          <div className="lab-meta mt-(--space-s) lg:mt-(--space-m) max-w-[55ch]">
            <p className="text-sm text-primary/80 font-mono tracking-wide leading-relaxed">
              {comingSoon}
            </p>
          </div>

          {/* Feature hints */}
          <div className="lab-meta mt-(--space-m) lg:mt-(--space-l) grid grid-cols-1 sm:grid-cols-3 gap-px max-w-3xl">
            {[
              {
                label: "PowerGrade Gen",
                desc: "AI-generated color grades for DaVinci Resolve",
              },
              {
                label: "LUT Intelligence",
                desc: "Context-aware LUT generation from reference frames",
              },
              {
                label: "Scene Analysis",
                desc: "Automated scene detection and mood classification",
              },
            ].map((feature) => (
              <div
                key={feature.label}
                className="border border-foreground/5 p-5 bg-foreground/2 hover:bg-foreground/4 transition-colors duration-500"
              >
                <span className="text-xs font-mono tracking-widest uppercase text-primary/60 block mb-2">
                  {feature.label}
                </span>
                <p className="text-xs text-foreground/40 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-wrap justify-between items-end w-full gap-y-(--space-xs)">
          <p className="lab-meta text-foreground/25 text-xs font-mono tracking-wider uppercase">
            &copy; {new Date().getFullYear()} Pasajero Studio
          </p>

          <ul className="lab-meta flex items-center gap-(--space-s) text-xs">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/50 hover:text-primary transition-colors duration-300 font-mono tracking-wider uppercase text-xs"
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

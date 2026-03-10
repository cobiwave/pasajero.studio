"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import SectionHeader from "@/components/SectionHeader";
import content from "@/lib/content";

const {
  sectionTitle,
  sectionNumber,
  headline,
  roles: ROLES,
  capabilitiesLabel,
  capabilities: CAPABILITIES,
} = content.experience;

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set(".exp-row", { opacity: 1 });
        gsap.set(".cap-tag", { opacity: 1 });
        gsap.set(".exp-statement span", { y: "0%", rotateZ: 0 });
        return;
      }

      gsap.utils.toArray<HTMLElement>(".exp-row").forEach((row) => {
        gsap.fromTo(
          row,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      gsap.fromTo(
        ".cap-tag",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.04,
          scrollTrigger: {
            trigger: ".cap-grid",
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".exp-statement span",
        { y: "110%", rotateZ: 2 },
        {
          y: "0%",
          rotateZ: 0,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: ".exp-statement",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader title={sectionTitle} number={sectionNumber} />

        <div className="mb-20 md:mb-32 exp-statement">
          <h3 className="text-3xl md:text-5xl lg:text-[4rem] font-bold tracking-tighter leading-none">
            <div className="overflow-hidden">
              <span className="inline-block">{headline[0]}</span>
            </div>
            <div className="overflow-hidden">
              <span className="inline-block">
                {headline[1].split(" ").slice(0, 2).join(" ")}{" "}
                <span className="font-serif italic font-light text-foreground/80">
                  {headline[1].split(" ").slice(2).join(" ")}
                </span>
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="inline-block">
                {headline[2].split(" ").slice(0, -1).join(" ")}{" "}
                <span className="text-primary">{headline[2].split(" ").at(-1)}</span>
              </span>
            </div>
          </h3>
        </div>

        <div className="border-t border-foreground/8">
          {ROLES.map((role) => (
            <div
              key={role.company}
              className="exp-row opacity-0 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 md:py-10 border-b border-foreground/8 group cursor-default hover:bg-surface/50 transition-colors duration-500 -mx-6 md:-mx-12 px-6 md:px-12"
            >
              <div className="md:col-span-3">
                <span className="text-xs md:text-sm text-muted font-mono">
                  {role.period}
                </span>
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base md:text-lg font-semibold tracking-tight">
                  {role.role}
                </h4>
                <span className="text-sm text-muted">{role.company}</span>
              </div>
              <div className="md:col-span-5">
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {role.scope}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 md:mt-32">
          <span className="text-xs uppercase tracking-[0.2em] text-muted font-semibold block mb-8">
            {capabilitiesLabel}
          </span>
          <div className="cap-grid flex flex-wrap gap-3">
            {CAPABILITIES.map((cap) => (
              <span
                key={cap}
                className="cap-tag opacity-0 text-sm border border-foreground/10 rounded-full px-5 py-2.5 text-foreground/70 hover:border-primary/40 hover:text-foreground transition-all duration-300"
              >
                {cap}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

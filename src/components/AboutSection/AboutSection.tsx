"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import SectionHeader from "@/components/SectionHeader";

interface AboutSectionProps {
  sectionTitle: string;
  sectionNumber: string;
  statement: string[];
  bio: string[];
  principles: { number: string; title: string; description: string }[];
}

export default function AboutSection({
  sectionTitle,
  sectionNumber,
  statement,
  bio,
  principles: PRINCIPLES,
}: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set(".about-statement span", { y: "0%", rotateZ: 0 });
        gsap.set(".about-bio", { opacity: 1 });
        gsap.set(".principle-card", { opacity: 1 });
        return;
      }

      gsap.fromTo(
        ".about-statement span",
        { y: "110%", rotateZ: 2 },
        {
          y: "0%",
          rotateZ: 0,
          duration: 1.4,
          ease: "power4.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: ".about-statement",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".about-bio",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-bio",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".principle-card").forEach((card) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden"
    >
      <div className="ambient-glow glow-ambient top-0 right-0 opacity-30" />

      <div className="max-w-7xl mx-auto">
        <SectionHeader title={sectionTitle} number={sectionNumber} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 mb-32 md:mb-48">
          <div className="lg:col-span-7">
            <div className="about-statement text-3xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tighter leading-[1.05]">
              <div className="overflow-hidden">
                <span className="inline-block">{statement[0]}</span>
              </div>
              <div className="overflow-hidden">
                <span className="inline-block">{statement[1]}</span>
              </div>
              <div className="overflow-hidden">
                <span className="inline-block">
                  {statement[2].split(" ").slice(0, -1).join(" ")}{" "}
                  <span className="font-serif italic font-light text-primary">
                    {statement[2].split(" ").at(-1)}
                  </span>
                </span>
              </div>
              <div className="overflow-hidden">
                <span className="inline-block">{statement[3]}</span>
              </div>
              <div className="overflow-hidden">
                <span className="inline-block">{statement[4]}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-end">
            <div className="about-bio opacity-0 flex flex-col gap-6 border-l border-foreground/10 pl-8">
              {bio.map((paragraph, i) => (
                <p key={i} className="text-sm md:text-base text-foreground/70 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-foreground/5">
          {PRINCIPLES.map((principle) => (
            <div
              key={principle.number}
              className="principle-card bg-background p-8 md:p-10 opacity-0 group"
            >
              <span className="text-xs text-primary font-mono block mb-6">
                {principle.number}
              </span>
              <h4 className="text-lg md:text-xl font-bold tracking-tight mb-4">
                {principle.title}
              </h4>
              <p className="text-sm text-muted leading-relaxed">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

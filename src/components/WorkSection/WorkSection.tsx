"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import SectionHeader from "@/components/SectionHeader";
import content from "@/data/content.json";

const { sectionTitle, sectionNumber, headline, projects: PROJECTS } = content.work;

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bigTextRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set(".big-work-text span", { y: "0%", rotateZ: 0 });
        gsap.set(".project-card", { opacity: 1 });
        return;
      }

      gsap.fromTo(
        ".big-work-text span",
        { y: "110%", rotateZ: 3 },
        {
          y: "0%",
          rotateZ: 0,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: bigTextRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            delay: i * 0.05,
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader title={sectionTitle} number={sectionNumber} />

        <div ref={bigTextRef} className="mb-20 md:mb-32">
          <h3 className="text-4xl md:text-6xl lg:text-[5.5rem] font-bold tracking-tighter leading-[0.95] overflow-hidden">
            <div className="overflow-hidden">
              <span className="big-work-text inline-block">
                <span className="inline-block">{headline[0]}</span>
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="big-work-text inline-block">
                <span className="inline-block">
                  <span className="font-serif italic font-light text-foreground/80">
                    {headline[1].split(" ")[0]}
                  </span>{" "}
                  {headline[1].split(" ").slice(1).join(" ")}
                </span>
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="big-work-text inline-block">
                <span className="inline-block">
                  {headline[2].split(" ").slice(0, -1).join(" ")}{" "}
                  <span className="text-primary">{headline[2].split(" ").at(-1)}</span>
                </span>
              </span>
            </div>
          </h3>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/5">
          {PROJECTS.map((project) => (
            <article
              key={project.title}
              className="project-card group relative bg-background p-8 md:p-12 flex flex-col justify-between min-h-[360px] md:min-h-[420px] opacity-0 transition-colors duration-500 hover:bg-surface"
            >
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-[0.15em] text-muted font-semibold">
                    {project.category}
                  </span>
                  <span className="text-xs text-muted/60 font-mono">
                    {project.year}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full border border-foreground/10 flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all duration-500">
                  <ArrowUpRight className="w-4 h-4 text-foreground/40 group-hover:text-background group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-500" />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <h4 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight">
                  {project.title}
                </h4>
                <p className="text-sm text-muted leading-relaxed max-w-sm">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-[0.15em] text-foreground/40 border border-foreground/8 rounded-full px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

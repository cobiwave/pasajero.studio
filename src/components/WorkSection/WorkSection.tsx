"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import SectionHeader from "@/components/SectionHeader";

export type WorkProject = {
  id: string | number;
  title: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
  href?: string;
  media?: { url: string; mimeType?: string };
};

type WorkSectionProps = {
  sectionTitle: string;
  sectionNumber: string;
  headline: string[];
  projects: WorkProject[];
};

export default function WorkSection({
  sectionTitle,
  headline,
  projects,
}: WorkSectionProps) {
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
        <SectionHeader title={sectionTitle} />

        <div ref={bigTextRef} className="mb-20 md:mb-32">
          <h3 className="text-4xl md:text-6xl lg:text-[5.5rem] font-bold tracking-tighter leading-[0.95] overflow-hidden">
            <div className="overflow-hidden">
              <span className="big-work-text inline-block">
                <span className="inline-block">{headline[0]}</span>
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="big-work-text inline-block">
                <span className="inline-block">{headline[1]}</span>
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="big-work-text inline-block">
                <span className="inline-block">{headline[2]}</span>
              </span>
            </div>
          </h3>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/5">
          {projects.map((project) => {
            const Wrapper = project.href ? "a" : "div";
            const wrapperProps = project.href
              ? { href: project.href, target: "_blank" as const, rel: "noopener noreferrer" }
              : {};

            return (
              <Wrapper
                key={project.id}
                {...wrapperProps}
                className="project-card group flex flex-col opacity-0 transition-colors duration-500 hover:bg-surface overflow-hidden"
              >
                {project.media && (
                  <div className="relative aspect-video w-full overflow-hidden bg-foreground/3">
                    {project.media.mimeType?.startsWith("video/") ? (
                      <video
                        src={project.media.url}
                        autoPlay={!prefersReducedMotion()}
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={project.media.url}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}
                  </div>
                )}

                <div className="flex flex-col gap-4 p-8 md:p-12">
                  <span className="text-xs text-muted/60 font-mono">
                    {project.year}
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex min-w-0 flex-col gap-1">
                      <h4 className="text-lg md:text-xl font-bold tracking-tight leading-snug break-words">
                        {project.title}
                      </h4>
                      <span className="text-xs uppercase tracking-wide text-muted font-semibold">
                        {project.category}
                      </span>
                    </div>
                    <p className="min-w-0 text-sm text-muted leading-relaxed">
                      {project.description}
                    </p>
                  </div>
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
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}

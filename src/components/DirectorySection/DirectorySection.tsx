"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import SectionHeader from "@/components/SectionHeader";
import content from "@/lib/content";

const {
  sectionTitle,
  sectionNumber,
  headline,
  intro,
  artists: ARTISTS,
} = content.directory;

const ALL_DISCIPLINES = Array.from(
  new Set(ARTISTS.flatMap((artist) => artist.disciplines)),
).sort();

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default function DirectorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeDiscipline, setActiveDiscipline] = useState<string | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set(".big-directory-text span", { y: "0%", rotateZ: 0 });
        gsap.set(".artist-card", { opacity: 1 });
        return;
      }

      gsap.fromTo(
        ".big-directory-text span",
        { y: "110%", rotateZ: 3 },
        {
          y: "0%",
          rotateZ: 0,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ".big-directory-text",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.utils.toArray<HTMLElement>(".artist-card").forEach((card, i) => {
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
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="directory"
      ref={sectionRef}
      className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader title={sectionTitle} number={sectionNumber} />

        <div className="big-directory-text mb-16 md:mb-20 max-w-3xl">
          <h3 className="text-4xl md:text-6xl lg:text-[5.5rem] font-bold tracking-tighter leading-[0.95] overflow-hidden">
            {headline.map((line, i) => (
              <div key={i} className="overflow-hidden">
                <span className="inline-block">
                  {i === headline.length - 1 ? (
                    <>
                      {line.split(" ").slice(0, -1).join(" ")}{" "}
                      <span className="text-primary">
                        {line.split(" ").at(-1)}
                      </span>
                    </>
                  ) : (
                    line
                  )}
                </span>
              </div>
            ))}
          </h3>
          <p className="mt-8 text-sm md:text-base text-muted leading-relaxed max-w-xl">
            {intro}
          </p>
        </div>

        <div
          role="group"
          aria-label="Filtrar por disciplina"
          className="flex flex-wrap gap-2 mb-10 md:mb-12"
        >
          <button
            type="button"
            onClick={() => setActiveDiscipline(null)}
            aria-pressed={activeDiscipline === null}
            className={`text-xs uppercase tracking-[0.15em] rounded-full px-4 py-2 border transition-colors duration-300 ${
              activeDiscipline === null
                ? "border-primary bg-primary text-background font-semibold"
                : "border-foreground/10 text-foreground/50 hover:border-foreground/30 hover:text-foreground"
            }`}
          >
            Todos
          </button>
          {ALL_DISCIPLINES.map((discipline) => (
            <button
              key={discipline}
              type="button"
              onClick={() => setActiveDiscipline(discipline)}
              aria-pressed={activeDiscipline === discipline}
              className={`text-xs uppercase tracking-[0.15em] rounded-full px-4 py-2 border transition-colors duration-300 ${
                activeDiscipline === discipline
                  ? "border-primary bg-primary text-background font-semibold"
                  : "border-foreground/10 text-foreground/50 hover:border-foreground/30 hover:text-foreground"
              }`}
            >
              {discipline}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/5">
          {ARTISTS.map((artist) => {
            const isVisible =
              !activeDiscipline ||
              artist.disciplines.includes(activeDiscipline);

            return (
              <a
                key={artist.name}
                href={artist.contactHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`artist-card group relative bg-background flex flex-col justify-between min-h-[420px] opacity-0 transition-colors duration-500 hover:bg-surface overflow-hidden ${
                  artist.featured ? "md:col-span-2" : ""
                } ${isVisible ? "" : "hidden"}`}
              >
                <div className="absolute inset-0 z-0">
                  {artist.imageUrl ? (
                    <img
                      src={artist.imageUrl}
                      alt={artist.name}
                      className="w-full h-full object-cover opacity-0 group-hover:opacity-20 transition-opacity duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-foreground/3">
                      <span className="text-5xl md:text-6xl font-bold tracking-tighter text-foreground/8">
                        {initials(artist.name)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="relative z-10 flex justify-between items-start p-8 md:p-12 pb-0">
                  <span className="text-xs text-muted/60 font-mono">
                    {artist.location}
                  </span>
                  <div className="w-10 h-10 rounded-full border border-foreground/10 flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all duration-500">
                    <ArrowUpRight className="w-4 h-4 text-foreground/40 group-hover:text-background group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-500" />
                  </div>
                </div>

                <div className="relative z-10 flex flex-col gap-3 p-8 md:p-12 pt-0">
                  <div className="flex flex-col gap-1">
                    <h4 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight">
                      {artist.name}
                    </h4>
                    <span className="text-xs uppercase tracking-[0.15em] text-primary/80 font-semibold">
                      {artist.disciplines.slice(0, 2).join(" / ")}
                    </span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed max-w-sm">
                    {artist.bio}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

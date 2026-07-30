"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import SectionHeader from "@/components/SectionHeader";

export type DirectoryArtist = {
  id: string | number;
  name: string;
  disciplines: string[];
  location: string;
  bio: string;
  media?: { url: string; mimeType?: string };
  contactHref: string;
  featured?: boolean;
};

type DirectorySectionProps = {
  sectionTitle: string;
  sectionNumber: string;
  headline: string[];
  intro: string;
  artists: DirectoryArtist[];
};

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default function DirectorySection({
  sectionTitle,
  headline,
  intro,
  artists,
}: DirectorySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeDiscipline, setActiveDiscipline] = useState<string | null>(null);
  const allDisciplines = Array.from(
    new Set(artists.flatMap((artist) => artist.disciplines)),
  ).sort();

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
        <SectionHeader title={sectionTitle} />

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
          className="flex flex-wrap items-center gap-2 mb-10 md:mb-12 text-xs uppercase tracking-[0.15em]"
        >
          <button
            type="button"
            onClick={() => setActiveDiscipline(null)}
            aria-pressed={activeDiscipline === null}
            className={`transition-colors duration-300 ${
              activeDiscipline === null
                ? "text-foreground"
                : "text-foreground/40 hover:text-foreground/70"
            }`}
          >
            Todos
          </button>
          {allDisciplines.map((discipline) => (
            <span key={discipline} className="flex items-center gap-2">
              <span className="text-foreground/20" aria-hidden="true">
                /
              </span>
              <button
                type="button"
                onClick={() => setActiveDiscipline(discipline)}
                aria-pressed={activeDiscipline === discipline}
                className={`transition-colors duration-300 ${
                  activeDiscipline === discipline
                    ? "text-foreground"
                    : "text-foreground/40 hover:text-foreground/70"
                }`}
              >
                {discipline}
              </button>
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/5">
          {artists.map((artist) => {
            const isVisible =
              !activeDiscipline ||
              artist.disciplines.includes(activeDiscipline);

            return (
              <a
                key={artist.id}
                href={artist.contactHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`artist-card group flex flex-col opacity-0 transition-colors duration-500 hover:bg-surface overflow-hidden ${
                  artist.featured ? "md:col-span-2" : ""
                } ${isVisible ? "" : "hidden"}`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-foreground/3">
                  {artist.media ? (
                    artist.media.mimeType?.startsWith("video/") ? (
                      <video
                        src={artist.media.url}
                        autoPlay={!prefersReducedMotion()}
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={artist.media.url}
                        alt={artist.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-5xl md:text-6xl font-bold tracking-tighter text-foreground/8">
                        {initials(artist.name)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-4 p-8 md:p-12">
                  <span className="text-xs text-muted/60 font-mono">
                    {artist.location}
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex min-w-0 flex-col gap-1">
                      <h4 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight">
                        {artist.name}
                      </h4>
                      <span className="text-xs uppercase tracking-wide text-muted font-semibold">
                        {artist.disciplines.slice(0, 2).join(" / ")}
                      </span>
                    </div>
                    <p className="min-w-0 text-sm text-muted leading-relaxed">
                      {artist.bio}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

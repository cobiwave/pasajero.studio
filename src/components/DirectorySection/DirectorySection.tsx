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
    <section id="directory" ref={sectionRef}>
      <div>
        <SectionHeader title={sectionTitle} />

        <div className="big-directory-text">
          <h3>
            {headline.map((line, i) => (
              <div key={i}>
                <span>
                  {i === headline.length - 1 ? (
                    <>
                      {line.split(" ").slice(0, -1).join(" ")}{" "}
                      <span>
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
          <p>
            {intro}
          </p>
        </div>

        <div role="group" aria-label="Filtrar por disciplina">
          <button
            type="button"
            onClick={() => setActiveDiscipline(null)}
            aria-pressed={activeDiscipline === null}
          >
            Todos
          </button>
          {allDisciplines.map((discipline) => (
            <span key={discipline}>
              <span aria-hidden="true">
                /
              </span>
              <button
                type="button"
                onClick={() => setActiveDiscipline(discipline)}
                aria-pressed={activeDiscipline === discipline}
              >
                {discipline}
              </button>
            </span>
          ))}
        </div>

        <div>
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
                className="artist-card"
              >
                <div>
                  {artist.media ? (
                    artist.media.mimeType?.startsWith("video/") ? (
                      <video
                        src={artist.media.url}
                        autoPlay={!prefersReducedMotion()}
                        loop
                        muted
                        playsInline
                      />
                    ) : (
                      <img src={artist.media.url} alt={artist.name} />
                    )
                  ) : (
                    <div>
                      <span>
                        {initials(artist.name)}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <span>
                    {artist.location}
                  </span>
                  <div>
                    <div>
                      <h4>
                        {artist.name}
                      </h4>
                      <span>
                        {artist.disciplines.slice(0, 2).join(" / ")}
                      </span>
                    </div>
                    <p>
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

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
    <section id="about" ref={sectionRef}>
      <div className="ambient-glow glow-ambient" />

      <div>
        <SectionHeader title={sectionTitle} number={sectionNumber} />

        <div>
          <div>
            <div className="about-statement">
              <div>
                <span>{statement[0]}</span>
              </div>
              <div>
                <span>{statement[1]}</span>
              </div>
              <div>
                <span>
                  {statement[2].split(" ").slice(0, -1).join(" ")}{" "}
                  <span>
                    {statement[2].split(" ").at(-1)}
                  </span>
                </span>
              </div>
              <div>
                <span>{statement[3]}</span>
              </div>
              <div>
                <span>{statement[4]}</span>
              </div>
            </div>
          </div>

          <div>
            <div className="about-bio">
              {bio.map((paragraph, i) => (
                <p key={i}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div>
          {PRINCIPLES.map((principle) => (
            <div key={principle.number} className="principle-card">
              <span>
                {principle.number}
              </span>
              <h4>
                {principle.title}
              </h4>
              <p>
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

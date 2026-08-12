"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import Snap from "lenis/snap";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useLenis } from "@/components/SmoothScroll/LenisContext";

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

export default function WorkSection({ projects }: WorkSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const mediaRefs = useRef<(HTMLElement | null)[]>([]);
  const counterRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const snapRef = useRef<Snap | null>(null);
  const hasMountedInfoFade = useRef(false);
  const lenis = useLenis();
  const [activeIndex, setActiveIndex] = useState(0);

  const activeProject = projects[activeIndex];
  const total = projects.length;

  // Native CSS scroll-snap fights Lenis's animated scroll (causes the
  // instant "flicker" jump instead of a normal scroll). Lenis's own Snap
  // addon lets scrolling stay free while it's happening and only eases
  // into the nearest section once the user stops.
  useEffect(() => {
    if (!lenis) return;

    const snap = new Snap(lenis, {
      type: "mandatory",
      duration: 1,
      onSnapStart: (item) => {
        if (typeof item.index === "number") setActiveIndex(item.index);
      },
    });
    snapRef.current = snap;

    const elements = sectionRefs.current.filter(
      (el): el is HTMLElement => el !== null,
    );
    const removeElements = snap.addElements(elements, { align: "start" });

    return () => {
      removeElements();
      snap.destroy();
      snapRef.current = null;
    };
  }, [lenis, projects]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.indexOf(
              entry.target as HTMLElement,
            );
            if (index !== -1) setActiveIndex(index);
          }
        });
      },
      { threshold: 0.6 },
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [projects]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;

      event.preventDefault();
      if (event.key === "ArrowDown") {
        snapRef.current?.next();
      } else {
        snapRef.current?.previous();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useGSAP(
    () => {
      const introTargets = [
        counterRef.current,
        mediaRefs.current[0],
        infoRef.current,
      ].filter(Boolean);

      hasMountedInfoFade.current = true;

      if (prefersReducedMotion()) {
        gsap.set(introTargets, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        introTargets,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.1 },
      );
    },
    { scope: sectionRef },
  );

  useGSAP(
    () => {
      if (!hasMountedInfoFade.current) return;

      if (prefersReducedMotion()) {
        gsap.set(infoRef.current, { opacity: 1 });
        return;
      }

      gsap.fromTo(
        infoRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" },
      );
    },
    { dependencies: [activeIndex], scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="work">
      <div ref={counterRef} aria-hidden>
        <span>
          {String(activeIndex + 1).padStart(3, "0")}
        </span>
        <span>/{String(total).padStart(3, "0")}</span>
      </div>

      <div>
        <div ref={infoRef}>
          <span>
            {activeProject?.category}
          </span>
          <h4>
            {activeProject?.title}
          </h4>
        </div>
      </div>

      {projects.map((project, index) => {
        const Wrapper = project.href ? "a" : "div";
        const wrapperProps = project.href
          ? {
              href: project.href,
              target: "_blank" as const,
              rel: "noopener noreferrer",
            }
          : {};

        return (
          <section
            key={project.id}
            ref={(el) => {
              sectionRefs.current[index] = el;
            }}
          >
            {project.media && (
              <Wrapper
                {...wrapperProps}
                ref={(el: HTMLElement | null) => {
                  mediaRefs.current[index] = el;
                }}
              >
                {project.media.mimeType?.startsWith("video/") ? (
                  <video
                    src={project.media.url}
                    autoPlay={!prefersReducedMotion()}
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img src={project.media.url} alt={project.title} />
                )}
              </Wrapper>
            )}
          </section>
        );
      })}
    </section>
  );
}

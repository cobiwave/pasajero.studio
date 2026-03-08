"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

interface SectionHeaderProps {
  title: string;
  number: string;
  align?: "left" | "right";
}

export default function SectionHeader({
  title,
  number,
  align = "left",
}: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set(ref.current, { opacity: 1 });
        return;
      }

      gsap.fromTo(
        ref.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className={`flex items-baseline gap-4 mb-16 md:mb-24 opacity-0 ${
        align === "right" ? "justify-end" : "justify-start"
      }`}
    >
      <h2 className="text-sm md:text-base uppercase tracking-[0.2em] font-semibold text-foreground/60">
        {title}
      </h2>
      <span className="text-sm md:text-base text-primary font-mono">
        ({number})
      </span>
    </div>
  );
}

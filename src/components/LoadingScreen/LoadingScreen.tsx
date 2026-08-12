"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

interface LoadingScreenProps {
  words: string[];
  onComplete?: () => void;
}

export default function LoadingScreen({
  words,
  onComplete,
}: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLParagraphElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      if (!wordsRef.current || !wordRef.current || !containerRef.current)
        return;

      if (prefersReducedMotion()) {
        onComplete?.();
        setDone(true);
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          onComplete?.();
          setDone(true);
        },
      });

      tl.set(wordsRef.current, { yPercent: 50 });

      tl.to(wordsRef.current, {
        opacity: 1,
        yPercent: 0,
        duration: 1,
        ease: "expo.inOut",
      });

      words.forEach((word) => {
        tl.call(
          () => {
            if (wordRef.current) wordRef.current.textContent = word;
          },
          undefined,
          "+=0.15",
        );
      });

      tl.to(wordsRef.current, {
        opacity: 0,
        yPercent: -75,
        duration: 0.8,
        ease: "expo.in",
      });

      tl.to(
        containerRef.current,
        {
          autoAlpha: 0,
          duration: 0.6,
          ease: "power1.inOut",
        },
        "-=0.2",
      );
    },
    { scope: containerRef },
  );

  if (done) return null;

  return (
    <div ref={containerRef}>
      <div>
        <div ref={wordsRef}>
          <p ref={wordRef} style={{ fontFamily: "StretchPro, sans-serif" }}>
            {words[0]}
          </p>
        </div>
      </div>
    </div>
  );
}

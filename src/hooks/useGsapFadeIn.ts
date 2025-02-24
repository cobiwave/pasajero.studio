import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export const useGsapFadeIn = (containerRef: React.RefObject<HTMLElement>, selector: string) => {
  useGSAP(
    () => {
      const elements = gsap.utils.toArray<HTMLElement>(
        containerRef.current?.querySelectorAll(selector) || [],
      );

      elements.forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse',
          },
        });
      });
    },
    { scope: containerRef },
  );
};

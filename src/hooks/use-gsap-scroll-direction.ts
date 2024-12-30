import { useEffect, useState } from 'react';
import { Observer } from 'gsap/dist/Observer';

export type ScrollDirectionType = 'top' | 'down' | 'up';

interface UseGsapScrollDirectionProps {
  target?: Window | HTMLElement;
}

export function useGsapScrollDirection({ target }: UseGsapScrollDirectionProps = {}) {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirectionType>('top');

  useEffect(() => {
    const observer = Observer.create({
      target: target || window,
      type: 'scroll',
      onUp: () => {
        if (window.scrollY > 0) {
          setScrollDirection('up');
        } else {
          setScrollDirection('top');
        }
      },
      onDown: () => {
        setScrollDirection('down');
      },
    });

    return () => {
      observer.kill();
    };
  }, [target]);

  return scrollDirection;
}

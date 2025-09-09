import { type RefObject, useEffect, useRef, useState } from 'react';

const intersectionObserverDefaultThreshold = 0.5;

type Callbacks = {
  onEnterViewport(): void;
  onLeaveViewport(): void;
};

type GetIntersectionObserverInstance = {
  callbackMap: Map<Element, Callbacks>;
  observer: IntersectionObserver;
};

/**
 * Helper method that will return a new IntersectionObserver instance for a provided threshold.
 */
function getIntersectionObserverInstance(threshold: number | number[]): GetIntersectionObserverInstance {
  const callbackMap = new Map<Element, Callbacks>();

  return {
    callbackMap,
    observer: new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const entryCallbacks = callbackMap.get(entry.target);
          if (entry.isIntersecting) {
            entryCallbacks?.onEnterViewport();
          }
          if (!entry.isIntersecting) {
            entryCallbacks?.onLeaveViewport();
          }
        }
      },
      { threshold }
    )
  };
}

/**
 * We have a global object that holds all our intersection observers, this way
 * we can avoid creating an excessive amount of observers that all use the
 * same threshold.
 */
const intersectionObserverInstances = new Map<string, ReturnType<typeof getIntersectionObserverInstance>>();

/**
 * Hook that can be used to detect if an element enters or leaves the viewport
 *
 * @param ref
 * @param options
 */
export function useIntersectionObserver(
  ref: RefObject<HTMLElement>,
  options: {
    threshold?: number | number[];
    onEnterViewport?(): void;
    onLeaveViewport?(): void;
  } = {}
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const optionsRef = useRef(options);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    if (isIntersecting) {
      optionsRef.current.onEnterViewport?.();
    }
    if (!isIntersecting) {
      optionsRef.current.onLeaveViewport?.();
    }
  }, [isIntersecting]);

  useEffect(() => {
    const threshold = options.threshold ?? intersectionObserverDefaultThreshold;

    // We generate a key out of the threshold so we can keep the amount of IntersectionObservers to a minimal.
    const thresholdKey = Array.isArray(threshold) ? threshold.join('|') : threshold.toString();

    const element = ref.current;

    if (element) {
      // Check if we already have an intersection observer for the provided threshold.
      let intersectionObserverInstance = intersectionObserverInstances.get(thresholdKey);

      // Create a new intersection observer instance for the `new` threshold
      if (intersectionObserverInstance === undefined) {
        intersectionObserverInstance = getIntersectionObserverInstance(threshold);
        intersectionObserverInstances.set(thresholdKey, intersectionObserverInstance);
      }

      intersectionObserverInstance.callbackMap.set(element, {
        onEnterViewport: () => {
          setIsIntersecting(true);
        },
        onLeaveViewport: () => {
          setIsIntersecting(false);
        }
      });

      intersectionObserverInstance.observer.observe(element);
    }

    return () => {
      const intersectionObserverInstance = intersectionObserverInstances.get(thresholdKey);

      if (intersectionObserverInstance === undefined) {
        return;
      }

      if (element === null) {
        return;
      }

      intersectionObserverInstance.callbackMap.delete(element);
      intersectionObserverInstance.observer.unobserve(element);

      // If we have no more callbacks for the threshold we remove the entire observer
      if (intersectionObserverInstance.callbackMap.size === 0) {
        intersectionObserverInstance.observer.disconnect();

        intersectionObserverInstances.delete(thresholdKey);
      }
    };
  }, [ref, options.threshold]);

  return isIntersecting;
}

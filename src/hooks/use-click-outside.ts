import type { RefObject } from 'react';

import { useCallback, useEffect } from 'react';

export function useClickOutside(element: RefObject<Element>, callback: () => void) {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (element.current && !element.current.contains(event.target as Node)) {
        callback();
      }
    },
    [element, callback],
  );

  useEffect(() => {
    if (element.current) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [handleClickOutside, element]);
}

import { useEffect } from 'react';
import { useRouter } from 'next/router';

interface UseRouterChangeProps {
  callback: () => void;
}

export function useRouterChange({ callback }: UseRouterChangeProps) {
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', callback);
    return () => {
      router.events.off('routeChangeStart', callback);
    };
  }, [callback, router.events]);
}

'use client';

import { useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export type Language = 'en' | 'es';

export const languageNames: { [K in Language]: string } = {
  en: 'EN',
  es: 'ES'
};

export function useLanguage() {
  const pathname = usePathname();
  const router = useRouter();

  // Extraer el idioma actual de la URL
  const getCurrentLanguage = useCallback((): Language => {
    const segments = pathname.split('/');
    const langSegment = segments[1];

    if (langSegment === 'es' || langSegment === 'en') {
      return langSegment as Language;
    }

    return 'en'; // fallback
  }, [pathname]);

  // Cambiar idioma manteniendo la ruta actual
  const changeLanguage = useCallback(
    (newLang: Language) => {
      const segments = pathname.split('/');

      // Reemplazar o agregar el segmento de idioma
      if (segments[1] === 'en' || segments[1] === 'es') {
        segments[1] = newLang;
      } else {
        segments.splice(1, 0, newLang);
      }

      const newPath = segments.join('/');
      router.push(newPath);
    },
    [pathname, router]
  );

  return {
    currentLanguage: getCurrentLanguage(),
    changeLanguage,
    availableLanguages: ['en', 'es'] as const
  };
}

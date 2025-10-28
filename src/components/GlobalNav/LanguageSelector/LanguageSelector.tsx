'use client';

import type { Language } from '@/hooks/use-language';

import { useLanguage } from '@/hooks/use-language';

import css from './LanguageSelector.module.scss';

const languageNames: { [K in Language]: string } = {
  en: 'EN',
  es: 'ES'
};

export default function LanguageSelector() {
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();

  return (
    <div className={css.root} role="group" aria-label="Language selection">
      {availableLanguages.map((lang: Language) => (
        <button
          key={lang}
          type="button"
          className={`${css.button} ${currentLanguage === lang ? css.active : ''}`}
          onClick={() => changeLanguage(lang)}
          aria-pressed={currentLanguage === lang}
          aria-label={`Switch to ${languageNames[lang]}`}
        >
          {languageNames[lang]}
        </button>
      ))}
    </div>
  );
}

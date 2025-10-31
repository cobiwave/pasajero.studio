'use client';

import type { FC } from 'react';
import type { Language } from '@/hooks/use-language';
import type { ControllerProps } from './LanguageSelector.controller';

import classNames from 'classnames';

import { languageNames, useLanguage } from '@/hooks/use-language';
import { useRefs } from '@/hooks/use-refs';

import css from './LanguageSelector.module.scss';

export interface ViewProps extends ControllerProps {}

export type ViewRefs = {
  root: HTMLDivElement;
};

export const View: FC<ViewProps> = ({ className }) => {
  const refs = useRefs<ViewRefs>();
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();

  return (
    <div className={classNames('LanguageSelector', css.root, className)} ref={refs.root}>
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
};

View.displayName = 'LanguageSelector_View';

'use client';

import type { FC } from 'react';
import type { Language } from '@/hooks/use-language';
import type { ControllerProps } from './LanguageSelector.controller';

import { useCallback, useState } from 'react';
import classNames from 'classnames';

import { languageNames, useLanguage } from '@/hooks/use-language';
import { useRefs } from '@/hooks/use-refs';

import css from './LanguageSelector.module.scss';

import { Overlay } from '../Overlay';

export interface ViewProps extends ControllerProps {}

export type ViewRefs = {
  root: HTMLDivElement;
};

export const View: FC<ViewProps> = ({ className }) => {
  const refs = useRefs<ViewRefs>();
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleLanguageSelect = useCallback(
    (lang: Language) => {
      changeLanguage(lang);
      setIsOpen(false);
    },
    [changeLanguage]
  );

  return (
    <div className={classNames('LanguageSelector', css.root, className)} ref={refs.root}>
      {/* Current Language Button */}
      <button
        type="button"
        className={css.currentButton}
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-label={`Current language: ${languageNames[currentLanguage]}. Click to select language`}
      >
        {languageNames[currentLanguage]}
      </button>

      {/* Language Selector Overlay */}
      {isOpen && (
        <Overlay onClose={handleClose} closeOnEscape closeOnRouteChange>
          <div className={css.languageList}>
            <h3 className={css.title}>Select Language</h3>
            {availableLanguages.map((lang: Language) => (
              <button
                key={lang}
                type="button"
                className={classNames(css.languageOption, {
                  [css.active]: currentLanguage === lang
                })}
                onClick={() => handleLanguageSelect(lang)}
                aria-pressed={currentLanguage === lang}
              >
                {languageNames[lang]}
              </button>
            ))}
          </div>
        </Overlay>
      )}
    </div>
  );
};

View.displayName = 'LanguageSelector_View';

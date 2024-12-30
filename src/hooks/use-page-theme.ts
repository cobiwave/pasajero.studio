import type { ZooxTheme } from '@/types';

import { useLayoutEffect } from 'react';

import { localState } from '@/store';

const usePageTheme = () => {
  useLayoutEffect(() => {
    const elements = document.querySelectorAll('[data-theme]');
    const firstElementTheme = elements[0]?.getAttribute('data-theme') as ZooxTheme;
    const lastElementTheme = elements[elements?.length - 1]?.getAttribute(
      'data-theme',
    ) as ZooxTheme;

    localState().theme.setNavbarColor(firstElementTheme);
    localState().theme.setFooterColor(lastElementTheme);
  }, []);
};

export default usePageTheme;

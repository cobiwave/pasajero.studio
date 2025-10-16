import { sass } from '@/utils/sass';

type LayoutType = {
  type: 'ssr' | 'client';
  mobile: boolean;
  tablet: boolean;
  desktop: boolean;
};

export const ssrLayout = {
  type: 'ssr',
  mobile: false,
  tablet: false,
  desktop: true
} as LayoutType;

export function getLayout(): LayoutType {
  if (typeof document !== 'undefined') {
    const matchTablet = window.matchMedia(`(min-width: ${sass['breakpoint-tablet']}px)`);
    const matchDesktop = window.matchMedia(`(min-width: ${sass['breakpoint-desktop']}px)`);

    const desktop = matchDesktop.matches;
    const tablet = matchTablet.matches && !desktop;
    const mobile = !tablet && !desktop;

    return {
      type: 'client',
      mobile,
      tablet,
      desktop
    };
  }
  return ssrLayout;
}

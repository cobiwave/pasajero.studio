import { breakpoints, colors } from '@/styles/tokens';

// Export breakpoints as strings with 'px' suffix for compatibility
export const sass = {
  // breakpoints
  'breakpoint-mobile': `${breakpoints.mobile}`,
  'breakpoint-tablet': `${breakpoints.tablet}`,
  'breakpoint-desktop': `${breakpoints.desktop}`,
  'breakpoint-desktop-large': `${breakpoints.desktopLarge}`,

  // colors
  white: colors.white,
  black: colors.black,
  'gray-light': colors.grayLight,
  'form-error': colors.formError
} as const;

// Re-export colors for convenience
export { colors };

// Usage:
// sass['breakpoint-desktop'] -> '1080'
// sass['white'] -> '#fff'
// sass['black'] -> '#0d1212'
// etc...

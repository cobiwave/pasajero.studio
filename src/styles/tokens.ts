// ====================================================================
// Design Tokens
// Shared between SCSS and TypeScript
// ====================================================================

export const breakpoints = {
  mobile: 390,
  tablet: 768,
  desktop: 1080,
  desktopLarge: 1440
} as const;

export const colors = {
  black: '#0d1212',
  white: '#fff',
  grayLight: '#ececec',
  formError: '#b20c0c'
} as const;

// Export for SCSS (used via @use)
export default {
  breakpoints,
  colors
};

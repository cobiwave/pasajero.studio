export const DEBUG = process.env.NEXT_PUBLIC_DEBUG === 'true';

// Parallax constants
export const parallaxScaleFactor = 1.1;
export const parallaxSpeed = 0.2;
export const parallaxTranslateYPercentage = 20;

export enum AspectRatio {
  Square = '1:1',
  ThreeTwo = '3:2',
  SixteenNine = '16:9'
}

export enum PaddingSizes {
  None = 'none',
  ExtraSmall = 'xs',
  Small = 'sm',
  Medium = 'md',
  Large = 'lg'
}

export enum Sizes {
  Small = 'sm',
  Medium = 'md',
  Large = 'lg'
}

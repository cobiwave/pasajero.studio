export type Theme = 'light' | 'dark';

export enum ThemeEnum {
  Light = 'light',
  Dark = 'dark',
}

export enum AlignmentEnum {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

export enum VerticalAlignmentEnum {
  Top = 'top',
  Center = 'center',
  Bottom = 'bottom',
}

export enum SizesEnum {
  Small = 'sm',
  Medium = 'md',
  Large = 'lg',
  ExtraLarge = 'xl',
  ExtraExtraLarge = 'xxl',
}

export enum AspectRatioEnum {
  OneByOne = '1:1',
  ThreeByTwo = '3:2',
  SixteenByNine = '16:9',
}

export enum TextContentVariantEnum {
  D1 = 'd1',
  D2 = 'd2',
  D3 = 'd3',
  D4 = 'd4',
  D5 = 'd5',
  D6 = 'd6',
}

export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type IconType =
  | 'chevron-right'
  | 'chevron-left'
  | 'plus'
  | 'chevron-down'
  | 'download'
  | 'close';
export type IconSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
export type TextContentVariant = 'd1' | 'd2' | 'd3' | 'd4' | 'd5' | 'd6';
export type MediaType = 'image' | 'file' | 'video' | 'iframe';
export type AriaCurrent = 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false';

export type FormResponse = {
  success: string | null;
  error: string | null;
};

export type FormVariant = 'feedback' | 'complaint' | 'lost-found' | 'contact';
export enum FormVariantEnum {
  Feedback = 'feedback',
  Complaint = 'complaint',
  LostFound = 'lost-found',
  Contact = 'contact',
}

export const ctaVariations = ['primary', 'secondary', 'tertiary'] as const;
export const zooxLogoVariations = ['default', 'spinner', 'text-square', 'text-full'] as const;
export const VerticalSpacingSizes = ['none', 'xs', 'sm', 'md', 'lg'] as const;

export const typographyVariants = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'] as const;
export const typographyWeight = [100, 200, 300, 400, 500, 600, 700, 800] as const;
export const align = ['left', 'center', 'right'] as const;

export type CtaVariations = (typeof ctaVariations)[number];
export type ZooxLogoVariations = (typeof zooxLogoVariations)[number];
export type PaddingSizes = (typeof VerticalSpacingSizes)[number];
export type TypographyVariants = (typeof typographyVariants)[number];
export type TypographyWeitght = (typeof typographyWeight)[number];
export type TypographyAligns = (typeof align)[number];

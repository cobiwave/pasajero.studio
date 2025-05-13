export enum SizesEnum {
  Small = 'sm',
  Medium = 'md',
  Large = 'lg',
  ExtraLarge = 'xl',
  ExtraExtraLarge = 'xxl'
}

export type Article = {
  id: string;
  slug: string | null;
  featuredImage: {
    id: string;
    alt: string | null;
    responsiveImage: {
      alt: string | null;
      title: string | null;
      base64: string | null;
    } | null;
  } | null;
}[];

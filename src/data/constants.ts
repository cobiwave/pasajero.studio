export const DEBUG = process.env.NEXT_PUBLIC_DEBUG === 'true';

export const AspectRatioOptions = ['1:1', '3:2', '16:9'] as const;
export type AspectRatio = (typeof AspectRatioOptions)[number];

export const VerticalSpacingSizes = ['none', 'xs', 'sm', 'md', 'lg'] as const;
export type PaddingSizes = (typeof VerticalSpacingSizes)[number];

import type { RichTextBlockFragment } from '@/graphql/components/RichText.fragment';

import { forwardRef, memo } from 'react';

import { type ResultOf } from '@/lib/datocms/graphql';

import { View } from './RichText.view';

export interface ControllerProps {
  data: ResultOf<typeof RichTextBlockFragment>;
  className?: string;
}

export const Controller = memo(
  forwardRef<HTMLDivElement, ControllerProps>((props, ref) => {
    return <View {...props} ref={ref} />;
  })
);

Controller.displayName = 'RichText_Controller';

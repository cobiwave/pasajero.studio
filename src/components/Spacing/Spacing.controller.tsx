import type { ForwardedRef } from 'react';
import type { SpacingBlockFragment } from '@/graphql/atoms/SpacingBlock.fragment';
import type { ResultOf } from '@/lib/datocms/graphql';
import type { ViewHandle } from './Spacing.view';

import { forwardRef, memo } from 'react';

import { View } from './Spacing.view';

export interface ControllerProps {
  data: ResultOf<typeof SpacingBlockFragment>;
  className?: string;
  handleRef?: ForwardedRef<ViewHandle>;
}

export const Controller = memo(
  forwardRef<HTMLDivElement, ControllerProps>((props, ref) => {
    return <View {...props} ref={ref} />;
  })
);

Controller.displayName = 'Spacing_Controller';

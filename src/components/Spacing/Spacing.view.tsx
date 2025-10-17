'use client';

import type { ControllerProps } from './Spacing.controller';

import { forwardRef } from 'react';
import classNames from 'classnames';

import { decorativeElementProps } from '@/utils/basic-functions';
import { multiRef } from '@/utils/multi-ref';

import { useRefs } from '@/hooks/use-refs';

import css from './Spacing.module.scss';

export type ViewHandle = {
  /* */
};

export interface ViewProps extends ControllerProps {}

export type ViewRefs = {
  root: HTMLDivElement;
};

export const View = forwardRef<HTMLDivElement, ViewProps>(({ data, className }, ref) => {
  const refs = useRefs<ViewRefs>();

  return (
    <div
      className={classNames('Spacing', css.root, className, css[data.variant || 'none'])}
      ref={multiRef(refs.root, ref)}
      {...decorativeElementProps}
    />
  );
});

View.displayName = 'Spacing_View';

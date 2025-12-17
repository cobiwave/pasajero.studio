'use client';

import type { AspectRatio } from '@/data/constants';

import { forwardRef, useMemo } from 'react';
import classNames from 'classnames';
import { animate } from 'motion';

import { ratioToClass } from '@/utils/basic-functions';
import { multiRef } from '@/utils/multi-ref';

import { useRefs } from '@/hooks/use-refs';
import { useTransitionPresence } from '@/hooks/use-transition-presence';

import css from './Image.module.scss';

import ResponsiveImage from '../ResponsiveImage/ResponsiveImage';
import { type ControllerProps } from './Image.controller';

export interface ViewProps extends ControllerProps {
  parallaxEffect?: boolean; // Nueva prop para habilitar el parallax
}

export type ViewRefs = {
  root: HTMLDivElement;
};

export const View = forwardRef<HTMLDivElement, ViewProps>(
  ({ data, className, aspectRatio, responsiveImageProps }, ref) => {
    const refs = useRefs<ViewRefs>();

    useTransitionPresence(
      useMemo(
        () => ({
          animateIn: () => animate(refs.root.current!, { opacity: 1 }),
          animateOut: () => animate(refs.root.current!, { opacity: 0 })
        }),
        [refs]
      )
    );

    return (
      <div
        className={classNames('Image', css.root, className, {
          [css[ratioToClass(aspectRatio as AspectRatio)]]: aspectRatio
        })}
        ref={multiRef(refs.root, ref)}
      >
        <ResponsiveImage
          data={data.asset.responsiveImage}
          pictureClassName={classNames(css.picture)}
          {...responsiveImageProps}
        />
      </div>
    );
  }
);

View.displayName = 'Image_View';

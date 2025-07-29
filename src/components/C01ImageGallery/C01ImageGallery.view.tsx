'use client';

import { forwardRef, useMemo } from 'react';
import classNames from 'classnames';
import { animate } from 'motion';

import { multiRef } from '@/utils/multi-ref';

import { useRefs } from '@/hooks/use-refs';
import { useTransitionPresence } from '@/hooks/use-transition-presence';

import ResponsiveImage from '@/components/atoms/ResponsiveImage/ResponsiveImage';
import { C01ImageGalleryBlockFragment } from '@/components/C01ImageGallery/C01ImageGallery.fragment';

import { readFragment } from '@/lib/datocms/graphql';

import css from './C01ImageGallery.module.scss';

import { type ControllerProps } from './C01ImageGallery.controller';

export interface ViewProps extends ControllerProps {}

export type ViewRefs = {
  root: HTMLDivElement;
};

export const View = forwardRef<HTMLDivElement, ViewProps>(({ data, className }, ref) => {
  const refs = useRefs<ViewRefs>();
  const unmaskedData = readFragment(C01ImageGalleryBlockFragment, data);

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
    <div className={classNames('C01ImageGallery', css.root, className)} ref={multiRef(refs.root, ref)}>
      <ul>
        {unmaskedData?.assets?.map((asset) => (
          <li key={asset.id}>
            <figure>
              <ResponsiveImage
                imgStyle={{
                  width: '100%',
                  height: '100%',
                  maxWidth: '100%',
                  objectFit: 'cover',
                  aspectRatio: '1 / 1'
                }}
                data={asset.responsiveImage}
              />
              <figcaption>{asset.title}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
});

View.displayName = 'C01ImageGallery_View';

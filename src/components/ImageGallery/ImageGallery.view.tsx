'use client';

import { forwardRef, useMemo } from 'react';
import classNames from 'classnames';
import { animate } from 'motion';

import { multiRef } from '@/utils/multi-ref';

import { useRefs } from '@/hooks/use-refs';
import { useTransitionPresence } from '@/hooks/use-transition-presence';

import ResponsiveImage from '@/components/atoms/ResponsiveImage/ResponsiveImage';
import { ImageGalleryBlockFragment } from '@/components/ImageGallery/ImageGallery.fragment';

import { readFragment } from '@/lib/datocms/graphql';

import css from './ImageGallery.module.scss';

import { type ControllerProps } from './ImageGallery.controller';

export interface ViewProps extends ControllerProps {}

export type ViewRefs = {
  root: HTMLDivElement;
};

export const View = forwardRef<HTMLDivElement, ViewProps>(({ data, className }, ref) => {
  const refs = useRefs<ViewRefs>();
  const unmaskedData = readFragment(ImageGalleryBlockFragment, data);

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
    <div className={classNames('ImageGallery', css.root, className)} ref={multiRef(refs.root, ref)}>
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

View.displayName = 'ImageGallery_View';

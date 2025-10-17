'use client';

import { forwardRef, useMemo } from 'react';
import classNames from 'classnames';
import { animate } from 'motion';

import { multiRef } from '@/utils/multi-ref';

import { useRefs } from '@/hooks/use-refs';
import { useTransitionPresence } from '@/hooks/use-transition-presence';

import { ConfigBlockFragment } from '@/graphql/infra/ConfigBlock.fragment';
import { readFragment } from '@/lib/datocms/graphql';

import css from './ImageGallery.module.scss';

import { Image } from '../atoms/Image';
import { ImageBlockFragment } from '../atoms/Image/Image.controller';
import { type ControllerProps } from './ImageGallery.controller';

export interface ViewProps extends ControllerProps {}

export type ViewRefs = {
  root: HTMLDivElement;
};

export const View = forwardRef<HTMLDivElement, ViewProps>(({ className, data }, ref) => {
  const unmaskedConfig = readFragment(ConfigBlockFragment, data.config);
  const unmaskedImages = readFragment(ImageBlockFragment, data.images);
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
      className={classNames(
        'ImageGallery',
        css.root,
        css[`top-padding-${unmaskedConfig?.topPadding}`],
        css[`bottom-padding-${unmaskedConfig?.bottomPadding}`],
        className
      )}
      ref={multiRef(refs.root, ref)}
    >
      <ul>
        {unmaskedImages?.map((image) => (
          <li key={image.id}>
            <Image data={image} />
          </li>
        ))}
      </ul>
    </div>
  );
});

View.displayName = 'ImageGallery_View';

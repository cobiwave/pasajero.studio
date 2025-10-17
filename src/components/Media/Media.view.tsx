'use client';

import type { AspectRatio } from '@/data/constants';
import type { ControllerProps } from './Media.controller';

import { forwardRef, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { animate } from 'motion';

import { multiRef } from '@/utils/multi-ref';

import { useRefs } from '@/hooks/use-refs';
import { useTransitionPresence } from '@/hooks/use-transition-presence';

import { Image } from '@/components/atoms/Image';
import { ImageBlockFragment } from '@/components/atoms/Image/Image.controller';

import { MediaConfigBlockFragment } from '@/graphql/infra/MediaConfigBlock.fragment';
import { readFragment } from '@/lib/datocms/graphql';

import css from './Media.module.scss';

export interface ViewProps extends ControllerProps {}

export type ViewRefs = {
  root: HTMLDivElement;
};

export const View = forwardRef<HTMLDivElement, ViewProps>(({ data, className }, ref) => {
  const refs = useRefs<ViewRefs>();
  const mediaType = data.mediaAsset.__typename;

  useTransitionPresence(
    useMemo(
      () => ({
        animateIn: () => animate(refs.root.current!, { opacity: 1 }),
        animateOut: () => animate(refs.root.current!, { opacity: 0 })
      }),
      [refs]
    )
  );

  const renderMediaBlock = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
    switch (mediaType) {
      case 'ImageBlockRecord': {
        const unmaskedImage = readFragment(ImageBlockFragment, data?.mediaAsset);
        const unmaskedMediaConfig = readFragment(MediaConfigBlockFragment, data?.mediaConfig);

        return (
          <Image
            data={unmaskedImage}
            aspectRatio={unmaskedMediaConfig?.aspectRatio as AspectRatio}
            className={css.image}
          />
        );
      }
      default: {
        return null;
      }
    }
  }, [data?.mediaAsset, data?.mediaConfig, mediaType]);

  return (
    <div className={classNames('Media', css.root, className)} ref={multiRef(refs.root, ref)}>
      {renderMediaBlock()}
    </div>
  );
});

View.displayName = 'Media_View';

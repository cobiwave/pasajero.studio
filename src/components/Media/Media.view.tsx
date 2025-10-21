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
import { Video } from '@/components/atoms/Video';
import { VideoBlockFragment } from '@/components/atoms/Video/Video.controller';

import { MediaConfigBlockFragment } from '@/graphql/infra/MediaConfigBlock.fragment';
import { readFragment } from '@/lib/datocms/graphql';

import css from './Media.module.scss';

import { ExternalVideo } from '../atoms/ExternalVideo';
import { ExternalVideoBlockFragment } from '../atoms/ExternalVideo/ExternalVideo.controller';

export interface ViewProps extends ControllerProps {}

export type ViewRefs = {
  root: HTMLDivElement;
};

export const View = forwardRef<HTMLDivElement, ViewProps>(({ data, className }, ref) => {
  const refs = useRefs<ViewRefs>();
  const mediaType = data.media.__typename;

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
        const unmaskedImage = readFragment(ImageBlockFragment, data?.media);
        const unmaskedMediaConfig = readFragment(MediaConfigBlockFragment, data?.mediaConfig);

        return (
          <Image
            data={unmaskedImage}
            aspectRatio={unmaskedMediaConfig?.aspectRatio as AspectRatio}
            className={css.image}
          />
        );
      }
      case 'VideoBlockRecord': {
        const unmaskedVideo = readFragment(VideoBlockFragment, data?.media);
        const unmaskedMediaConfig = readFragment(MediaConfigBlockFragment, data?.mediaConfig);

        return (
          <Video
            data={unmaskedVideo}
            aspectRatio={unmaskedMediaConfig?.aspectRatio as AspectRatio}
            className={css.video}
          />
        );
      }
      case 'ExternalVideoBlockRecord': {
        const unmaskedExternalVideo = readFragment(ExternalVideoBlockFragment, data?.media);
        const unmaskedMediaConfig = readFragment(MediaConfigBlockFragment, data?.mediaConfig);

        return (
          <ExternalVideo
            data={unmaskedExternalVideo}
            aspectRatio={unmaskedMediaConfig?.aspectRatio as AspectRatio}
            className={css.externalVideo}
          />
        );
      }
      default: {
        return null;
      }
    }
  }, [data?.media, data?.mediaConfig, mediaType]);

  return (
    <div className={classNames('Media', css.root, className)} ref={multiRef(refs.root, ref)}>
      {renderMediaBlock()}
    </div>
  );
});

View.displayName = 'Media_View';

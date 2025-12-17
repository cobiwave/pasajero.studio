'use client';

import type { AspectRatio } from '@/data/constants';
import type { ControllerProps } from './ExternalVideo.controller';

import { forwardRef, useMemo } from 'react';
import classNames from 'classnames';
import { animate } from 'motion';

import { buildYoutubeEmbedUrl, ratioToClass } from '@/utils/basic-functions';
import { multiRef } from '@/utils/multi-ref';

import { useRefs } from '@/hooks/use-refs';
import { useTransitionPresence } from '@/hooks/use-transition-presence';

import css from './ExternalVideo.module.scss';

export interface ViewProps extends ControllerProps {}

export type ViewRefs = {
  root: HTMLDivElement;
  iframe: typeof window extends undefined ? never : HTMLIFrameElement;
};

export const View = forwardRef<HTMLDivElement, ViewProps>(({ data, className, aspectRatio }, ref) => {
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
      className={classNames('ExternalVideo', css.root, className, {
        [css[ratioToClass(aspectRatio as AspectRatio)]]: aspectRatio
      })}
      ref={multiRef(refs.root, ref)}
    >
      {
        // eslint-disable-next-line react/iframe-missing-sandbox
        <iframe
          src={buildYoutubeEmbedUrl(data.link.url)}
          className={classNames(css.iframe)}
          allowFullScreen
          title={data.link.title}
          sandbox="allow-scripts allow-same-origin allow-presentation"
          ref={refs.iframe}
        />
      }
    </div>
  );
});

View.displayName = 'ExternalVideo_View';

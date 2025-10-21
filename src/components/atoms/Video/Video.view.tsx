'use client';

import type { ControllerProps } from './Video.controller';

import { forwardRef, useMemo } from 'react';
import classNames from 'classnames';
import { animate } from 'motion';

import { multiRef } from '@/utils/multi-ref';

import { useRefs } from '@/hooks/use-refs';
import { useTransitionPresence } from '@/hooks/use-transition-presence';

import css from './Video.module.scss';

import VideoPlayer from '../VideoPlayer/VideoPlayer';

export interface ViewProps extends ControllerProps {}

export type ViewRefs = {
  root: HTMLDivElement;
};

export const View = forwardRef<HTMLDivElement, ViewProps>(({ data, className }, ref) => {
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
    <div className={classNames('Video', css.root, className)} ref={multiRef(refs.root, ref)}>
      <figure>
        {/* Render the video player component */}
        <VideoPlayer data={data.asset} />
        {/* Display the title of the video asset below the video player */}
        <figcaption>{data.asset.title}</figcaption>
      </figure>
    </div>
  );
});

View.displayName = 'Video_View';

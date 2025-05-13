import type { ControllerProps } from './ArticleList.controller';

import { forwardRef, useMemo } from 'react';
import classNames from 'classnames';
import { animate } from 'motion';

import { multiRef } from '@/utils/multi-ref';

import { useRefs } from '@/hooks/use-refs';
import { useTransitionPresence } from '@/hooks/use-transition-presence';

import css from './ArticleList.module.scss';

import ResponsiveImage from '../atoms/ResponsiveImage/ResponsiveImage';

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

  console.log('data', data);

  return (
    <div className={classNames('ArticleList', css.root, className)} ref={multiRef(refs.root, ref)}>
      <ul>
        {data.map((prop) => (
          <li key={id}>
            <figure>
              <ResponsiveImage
                imgStyle={{
                  width: '100%',
                  height: '100%',
                  maxWidth: '100%',
                  objectFit: 'cover',
                  aspectRatio: '1 / 1'
                }}
                data={prop}
              />
              <figcaption>{title}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
});

View.displayName = 'ArticleList_View';

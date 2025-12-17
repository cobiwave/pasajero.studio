'use client';

import { forwardRef, useMemo, useState } from 'react';
import classNames from 'classnames';
import { animate } from 'motion';

import { multiRef } from '@/utils/multi-ref';

import { useRefs } from '@/hooks/use-refs';
import { useTransitionPresence } from '@/hooks/use-transition-presence';

import { ConfigBlockFragment } from '@/graphql/infra/ConfigBlock.fragment';
import { readFragment, type ResultOf } from '@/lib/datocms/graphql';

import css from './ImageGallery.module.scss';

import { Image } from '../atoms/Image';
import { ImageBlockFragment } from '../atoms/Image/Image.controller';
import { Overlay } from '../Overlay';
import { type ControllerProps } from './ImageGallery.controller';

export interface ViewProps extends ControllerProps {}

export type ViewRefs = {
  root: HTMLDivElement;
};

export const View = forwardRef<HTMLDivElement, ViewProps>(({ className, data }, ref) => {
  const unmaskedConfig = readFragment(ConfigBlockFragment, data.config);
  const unmaskedImages = readFragment(ImageBlockFragment, data.images);
  const refs = useRefs<ViewRefs>();
  const [selectedImage, setSelectedImage] = useState<ResultOf<typeof ImageBlockFragment> | null>(null);

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
    <>
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
            <li
              className={css.imageWrapper}
              key={image.id}
              onClick={() => setSelectedImage(image)}
              role="button"
              tabIndex={0}
            >
              <Image parallaxEffect data={image} />
            </li>
          ))}
        </ul>
      </div>

      {selectedImage && (
        <Overlay onClose={() => setSelectedImage(null)} closeOnEscape animateChildren={false}>
          <button className={css.closeButton} onClick={() => setSelectedImage(null)} aria-label="Close">
            ×
          </button>
          <div className={css.imageContainer}>
            <Image
              data={selectedImage}
              className={css.fullscreenImage}
              responsiveImageProps={{
                pictureStyle: {
                  aspectRatio: 'auto',
                  width: 'auto',
                  height: 'auto',
                  maxWidth: '100vw',
                  maxHeight: '100vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                },
                imgStyle: {
                  aspectRatio: 'auto',
                  width: 'auto',
                  height: 'auto',
                  maxWidth: '100vw',
                  maxHeight: '100vh',
                  objectFit: 'contain',
                  margin: '0 auto',
                  backgroundSize: 'contain'
                }
              }}
            />
          </div>
        </Overlay>
      )}
    </>
  );
});

View.displayName = 'ImageGallery_View';

'use client';

import type { CmsBaseComponent } from '@/data/types';
import type { ImageBlockRecord } from '@/graphql/atoms/ImageBlock.fragment';
import type { ConfigBlockFragment } from '@/graphql/infra/ConfigBlock.fragment';
import type { ContentType } from './RichText.controller';

import { forwardRef } from 'react';
import { StructuredText } from 'react-datocms';
import classNames from 'classnames';

import { multiRef } from '@/utils/multi-ref';

import { useRefs } from '@/hooks/use-refs';

import { type ResultOf } from '@/lib/datocms/graphql';

import css from './RichText.module.scss';

import ResponsiveImage from '../atoms/ResponsiveImage/ResponsiveImage';

export interface ViewProps extends CmsBaseComponent {
  content: ContentType;
  config?: ResultOf<typeof ConfigBlockFragment>;
  className?: string;
}

export type ViewRefs = {
  root: HTMLDivElement;
};

export const View = forwardRef<HTMLDivElement, ViewProps>(({ content, config, className }, ref) => {
  const refs = useRefs<ViewRefs>();

  return (
    <div
      className={classNames(
        'RichText',
        css.root,
        css[`top-padding-${config?.topPadding}`],
        css[`bottom-padding-${config?.bottomPadding}`],
        className
      )}
      ref={multiRef(refs.root, ref)}
    >
      <StructuredText
        data={content as unknown as Parameters<typeof StructuredText>[0]['data']}
        renderBlock={({ record }) => {
          switch (record.__typename) {
            case 'ImageBlockRecord': {
              const imageRecord = record as unknown as ImageBlockRecord;
              return (
                <ResponsiveImage
                  imgStyle={{
                    width: '100%',
                    height: '100%',
                    maxWidth: '100%',
                    objectFit: 'cover',
                    aspectRatio: '16 / 9'
                  }}
                  pictureClassName={css.image}
                  data={imageRecord.asset.responsiveImage}
                />
              );
            }
            default: {
              return null;
            }
          }
        }}
      />
    </div>
  );
});

View.displayName = 'RichText_View';

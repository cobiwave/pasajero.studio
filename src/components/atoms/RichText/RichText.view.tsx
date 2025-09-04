import type { ImageBlockRecord } from '@/graphql/fragments/ImageBlock.fragment';
import type { ControllerProps } from './RichText.controller';

import { forwardRef } from 'react';
import { StructuredText } from 'react-datocms';
import classNames from 'classnames';

import { multiRef } from '@/utils/multi-ref';

import { useRefs } from '@/hooks/use-refs';

import css from './RichText.module.scss';

import ResponsiveImage from '../ResponsiveImage/ResponsiveImage';

export interface ViewProps extends ControllerProps {}

export type ViewRefs = {
  root: HTMLDivElement;
};

export const View = forwardRef<HTMLDivElement, ViewProps>(({ content, className }, ref) => {
  const refs = useRefs<ViewRefs>();

  if (!content) {
    return null;
  }

  return (
    <div className={classNames('RichText', css.root, className)} ref={multiRef(refs.root, ref)}>
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

'use client';

import type { ImageBlockFragment } from '@/graphql/atoms/ImageBlock.fragment';
import type { SpacingBlockFragment } from '@/graphql/atoms/SpacingBlock.fragment';
import type { ResultOf } from '@/lib/datocms/graphql';
import type { ControllerProps } from './RichText.controller';
import type { StructuredTextGraphQlResponse } from 'react-datocms';

import { forwardRef } from 'react';
import { renderNodeRule, StructuredText } from 'react-datocms';
import classNames from 'classnames';
import { isLink, isParagraph } from 'datocms-structured-text-utils';

import { sanitizeUrl } from '@/utils/basic-functions';
import { multiRef } from '@/utils/multi-ref';

import { useRefs } from '@/hooks/use-refs';

import { ConfigBlockFragment } from '@/graphql/infra/ConfigBlock.fragment';
import { readFragment } from '@/lib/datocms/graphql';

import css from './RichText.module.scss';

import ResponsiveImage from '../atoms/ResponsiveImage/ResponsiveImage';
import { Spacing } from '../Spacing';

export interface ViewProps extends ControllerProps {}

export type ViewRefs = {
  root: HTMLDivElement;
};

const customNodeRules = [
  renderNodeRule(isLink, ({ node, children, key }) => {
    const metaProps = node.meta?.reduce(
      (acc: { [key: string]: unknown }, { id, value }) => {
        acc[id] = value;
        return acc;
      },
      {} as { [key: string]: unknown }
    );

    return (
      <a
        href={sanitizeUrl(node.url)}
        key={key}
        {...metaProps}
        rel={metaProps?.target === '_blank' ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    );
  }),
  renderNodeRule(isParagraph, ({ children, key }) => {
    // If <p> is empty, render spacer div instead
    const isEmpty = children && children.length > 0 && children[0].props.children[0] === '';

    if (isEmpty) {
      return <div className={css.paragraphSpacer} key={key} aria-hidden />;
    }
    return <p key={key}>{children}</p>;
  })
];

export const View = forwardRef<HTMLDivElement, ViewProps>(({ data, className }, ref) => {
  const unmaskedConfig = readFragment(ConfigBlockFragment, data.config);
  const refs = useRefs<ViewRefs>();

  return (
    <div
      className={classNames(
        'RichText',
        css.root,
        css[`top-padding-${unmaskedConfig?.topPadding}`],
        css[`bottom-padding-${unmaskedConfig?.bottomPadding}`],
        className
      )}
      ref={multiRef(refs.root, ref)}
    >
      <div className={css.wrapper}>
        <StructuredText
          data={data.content as unknown as StructuredTextGraphQlResponse}
          customNodeRules={customNodeRules}
          renderBlock={({ record }) => {
            switch (record.__typename) {
              case 'ImageBlockRecord': {
                const imageRecord = record as unknown as ResultOf<typeof ImageBlockFragment>;

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
              case 'SpacingBlockRecord': {
                const spacingRecord = record as unknown as ResultOf<typeof SpacingBlockFragment>;

                return <Spacing data={spacingRecord} />;
              }
              default: {
                return null;
              }
            }
          }}
        />
      </div>
    </div>
  );
});

View.displayName = 'RichText_View';

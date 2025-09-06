import type { ControllerProps as ImageGalleryProps } from './components/ImageGallery/ImageGallery.controller';
import type { PropsWithData as RichTextProps } from './components/RichText/RichText.controller';

import { Fragment, type ReactElement } from 'react';

import { ImageGallery } from './components/ImageGallery';
import { RichText } from './components/RichText';

type ImageGalleryData = { __typename: 'ImageGalleryBlockRecord'; props: ImageGalleryProps };
type RichTextData = { __typename: 'RichTextBlockRecord'; props: RichTextProps };

export type ComponentList = ImageGalleryData | RichTextData;

interface RenderComponentsProps {
  components: ComponentList[];
}

function RenderComponents({ components }: RenderComponentsProps): ReactElement | null {
  const render = (component: ComponentList): ReactElement | null => {
    switch (component.__typename) {
      case 'ImageGalleryBlockRecord': {
        return <ImageGallery data={{ ...component.props.data }} />;
      }
      case 'RichTextBlockRecord': {
        return <RichText data={{ ...component.props.data }} />;
      }
      default: {
        return null;
      }
    }
  };

  if (!components || components.length === 0) {
    return null;
  }

  return (
    <>
      {components
        .filter((component) => Boolean(component.__typename))
        .map((component) => (
          <Fragment key={`${component.__typename}`}>{render(component)}</Fragment>
        ))}
    </>
  );
}

export default RenderComponents;

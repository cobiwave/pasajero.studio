import type { ControllerProps as ImageGalleryProps } from './components/ImageGallery/ImageGallery.controller';

import { Fragment, type ReactElement } from 'react';

import { ImageGallery } from './components/ImageGallery';

type ImageGalleryData = { __typename: 'ImageGalleryBlockRecord'; props: ImageGalleryProps };

export type ComponentList = ImageGalleryData;

interface RenderComponentsProps {
  components: ComponentList[];
}

function RenderComponents({ components }: RenderComponentsProps): ReactElement | null {
  const render = (component: ComponentList): ReactElement | null => {
    switch (component.__typename) {
      case 'ImageGalleryBlockRecord': {
        return <ImageGallery data={{ ...component.props.data }} />;
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

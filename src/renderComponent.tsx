import type { ControllerProps as C01ImageGalleryProps } from './components/C01ImageGallery/C01ImageGallery.controller';

import { Fragment, type ReactElement } from 'react';

import { C01ImageGallery } from './components/C01ImageGallery';

type C01ImageGalleryData = { __typename: 'C01ImageGalleryBlockRecord'; props: C01ImageGalleryProps };

export type ComponentList = C01ImageGalleryData;

interface RenderComponentsProps {
  components: ComponentList[];
}

function RenderComponents({ components }: RenderComponentsProps): ReactElement | null {
  const render = (component: ComponentList): ReactElement | null => {
    switch (component.__typename) {
      case 'C01ImageGalleryBlockRecord': {
        return <C01ImageGallery data={{ ...component.props.data }} />;
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

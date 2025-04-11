import type { StoryFn } from '@storybook/react';
import type { ViewProps } from './ImageGallery.view';

import { View } from './ImageGallery.view';

export default { title: 'components/ImageGallery' };

export const Default: StoryFn<ViewProps> = (args) => {
  return <View {...args} />;
};

Default.args = {};

Default.argTypes = {};

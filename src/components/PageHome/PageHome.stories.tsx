import type { StoryFn } from '@storybook/react';
import type { ViewProps } from './PageHome.view';

import { CmsService } from '@/services/cms.service';

import { TransitionPresence } from '@/motion/transition.presence';

import { View } from './PageHome.view';

export default { title: 'pages/PageHome' };

export const Default: StoryFn<ViewProps & { show: boolean }> = ({ show, ...args }) => {
  return (
    <TransitionPresence>
      {show ? <View {...args} content={CmsService.getPageContent('home')} /> : null}
    </TransitionPresence>
  );
};

Default.args = {
  show: true
};

Default.argTypes = {};

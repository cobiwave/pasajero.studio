import type { StoryFn } from '@storybook/react';
import type { ViewProps } from './PageArticles.view';

import { TransitionPresence } from '@/motion/transition.presence';

import { View } from './PageArticles.view';

export default { title: 'pages/PageArticles' };

export const Default: StoryFn<ViewProps & { show: boolean }> = ({ show, ...args }) => {
  return <TransitionPresence>{show ? <View content={{ allArticles: [] }} {...args} /> : null}</TransitionPresence>;
};

Default.args = {
  show: true
};

Default.argTypes = {};

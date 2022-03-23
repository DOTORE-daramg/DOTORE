import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FeedbackToggleButtons } from './FeedbackToggleButtons';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Artist/FeedbackToggleButtons',
  component: FeedbackToggleButtons,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof FeedbackToggleButtons>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FeedbackToggleButtons> = (args) => <FeedbackToggleButtons {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  leftLabel: '받은 질문',
  rightLabel: '보낸 질문',
  selected: 1,
};

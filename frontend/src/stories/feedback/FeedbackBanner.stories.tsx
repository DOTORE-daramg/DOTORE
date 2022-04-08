import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FeedbackBanner } from './FeedbackBanner';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Feedback/FeedbackBanner',
  component: FeedbackBanner,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof FeedbackBanner>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FeedbackBanner> = () => <FeedbackBanner />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args


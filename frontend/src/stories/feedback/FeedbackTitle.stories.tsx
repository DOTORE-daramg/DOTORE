import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FeedbackTitle } from './FeedbackTitle';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Feedback/FeedbackTitle',
  component: FeedbackTitle,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof FeedbackTitle>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FeedbackTitle> = (args) => <FeedbackTitle {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  itemTitle: '안경을 쓴 늑대가 담배 피우고 있는 작품 이름',
  imageUrl: 'https://mblogthumb-phinf.pstatic.net/20150302_49/1eunnue_1425222085350UyECd_JPEG/%BC%D5%B1%D7%B8%B2_%2814%29.jpg?type=w2'
};

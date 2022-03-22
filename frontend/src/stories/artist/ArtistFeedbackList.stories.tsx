import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArtistFeedbackList, IFeedback } from './ArtistFeedbackList';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Artist/ArtistFeedbackList',
  component: ArtistFeedbackList,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArtistFeedbackList>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ArtistFeedbackList> = (args) => <ArtistFeedbackList {...args} />;

const feedbackList: IFeedback[] = [
  { 
    isAnswered: false,
    itemTitle: '야, 너도 도토리 할 수 있어!',
    questionTitle: '도토리 색 조합에 대해 질문 드립니다.',
    recentDate: '2022-03-11'
  },
  { 
    isAnswered: true,
    itemTitle: '야, 너는 도토리 못해!',
    questionTitle: '야, 너는 도토리 못해!',
    recentDate: '2022-03-12'
  },
  { 
    isAnswered: false,
    itemTitle: '야, 너도 도토리 할 수 있어!',
    questionTitle: '도토리 색 조합에 대해 질문 드립니다.',
    recentDate: '2022-03-11'
  },
  { 
    isAnswered: true,
    itemTitle: '야, 너는 도토리 못해!',
    questionTitle: '야, 너는 도토리 못해!',
    recentDate: '2022-03-12'
  },
  { 
    isAnswered: false,
    itemTitle: '야, 너도 도토리 할 수 있어!',
    questionTitle: '도토리 색 조합에 대해 질문 드립니다.',
    recentDate: '2022-03-11'
  },
  { 
    isAnswered: true,
    itemTitle: '야, 너는 도토리 못해!',
    questionTitle: '야, 너는 도토리 못해!',
    recentDate: '2022-03-12'
  },
]


export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  feedbackList: feedbackList,
};

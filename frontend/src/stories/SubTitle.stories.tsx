import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SubTitle } from './SubTitle';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/SubTitle',
  component: SubTitle,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof SubTitle>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SubTitle> = (args) => <SubTitle {...args} />;

export const MainSubTitle = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
MainSubTitle.args = {
  label: '지금 이 시각 가장 활발한 창작물',
};

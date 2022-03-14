import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Title } from './Title';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Title',
  component: Title,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Title>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Title> = (args) => <Title {...args} />;

export const MainTitle = Template.bind({});
MainTitle.args = {
  label: 'Popular NFTs',
  size: '64px',
}
export const SecondaryTitle = Template.bind({});
SecondaryTitle.args = {
  label: '1차 NFT',
  size: '36px',
}
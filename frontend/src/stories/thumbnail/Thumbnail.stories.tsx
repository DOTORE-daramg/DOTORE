import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Thumbnail } from './Thumbnail';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/ThumbnailGrid',
  component: Thumbnail,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Thumbnail>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Thumbnail> = (args) => <Thumbnail {...args} />;

export const MainThumbnail = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
MainThumbnail.args = {
  itemImageUrl: 'https://ww.namu.la/s/eac71acc34e222bd691c5f8e0ad2450976cfb81af259569252f2dfbd83d2aca1b9e3f4fb4a26d42da46ce2c802a125b24aee7f3b4fa419dca2d33f8cfcf053f1b822d3f2ef26a4b7cf6440c4291e34ba',
  itemTitle: '다람쥐',
  authorName: '이성재이성재이성재이성재이성재이성재이성재',
  onClick: () => {console.log('clicked!')}
};

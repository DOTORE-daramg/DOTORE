import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TransactionHistoryItem from './TransactionHistoryItem';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Artist/TransactionHistoryItem',
  component: TransactionHistoryItem,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof TransactionHistoryItem>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TransactionHistoryItem> = (args) => <TransactionHistoryItem {...args} />;

const data: any[] = [];

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  event: "string",
  // blockHash: "string",
  // from: "string",
  // to: "string",
  // price: 0,
  // tokenId: 0,
};

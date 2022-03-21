import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TransactionHistoryList, ITransactionHistory } from './TransactionHistoryList';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Artist/TransactionHistory',
  component: TransactionHistoryList,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof TransactionHistoryList>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TransactionHistoryList> = (args) => <TransactionHistoryList {...args} />;

const transactionHistoryList: ITransactionHistory[] = [
  {
    transactionHash: '0x1245',
    transactionType: 'minting',
    item: {
      itemImgUrl: 'https://yt3.ggpht.com/ytc/AKedOLTT6MEPkgOn6WLc_ibsb4hrq-qTVi5DFk_kD5DL=s900-c-k-c0x00ffffff-no-rj',
      itemTitle: '보석을 훔친 펭귄',
    },
    transactionTime: '2022-03-21',
    from: '',
    to: '주비스',
  },
  {
    transactionHash: '0x1ab3',
    transactionType: 'transfer',
    item: {
      itemImgUrl: 'https://yt3.ggpht.com/ytc/AKedOLTT6MEPkgOn6WLc_ibsb4hrq-qTVi5DFk_kD5DL=s900-c-k-c0x00ffffff-no-rj',
      itemTitle: '보석을 훔친 펭귄ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ',
    },
    transactionTime: '2022-03-21',
    from: '주비스',
    to: '한지희',
  },
  {
    transactionHash: '0x284b',
    transactionType: 'sale',
    item: {
      itemImgUrl: 'https://yt3.ggpht.com/ytc/AKedOLTT6MEPkgOn6WLc_ibsb4hrq-qTVi5DFk_kD5DL=s900-c-k-c0x00ffffff-no-rj',
      itemTitle: '보석을 훔친 펭귄',
    },
    transactionTime: '2022-03-21',
    from: '주비스ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ',
    to: '한지희',
    price: 0.4,
  }
]

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  txHistoryList: transactionHistoryList,
};

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ProfileUpdateModal } from './ProfileUpdateModal';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Artist/ProfileUpdateModal',
  component: ProfileUpdateModal,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfileUpdateModal>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ProfileUpdateModal> = (args) => <ProfileUpdateModal {...args} />;

const userInfo = {
  nickname: '이성재',
  profileImgUrl: '',
  description: '',
}

export const ModifyModal = Template.bind({});
ModifyModal.args = {
  // disclosure,
  title: "내 정보 수정",
  userInfo,
};

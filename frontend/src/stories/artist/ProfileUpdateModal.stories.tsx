import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ProfileUpdateModal } from "./ProfileUpdateModal";
import { userInfoTypes } from "../..";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Artist/ProfileUpdateModal",
  component: ProfileUpdateModal,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ProfileUpdateModal>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ProfileUpdateModal> = (args) => (
  <ProfileUpdateModal {...args} />
);

const userInfo: userInfoTypes = {
  nickname: "이성재",
  profileImgUrl: "",
  description: "",
  address: "0xabcd",
  acorn: 10342,
};

export const ModifyModal = Template.bind({});
ModifyModal.args = {
  // disclosure,
  // userInfo,
};

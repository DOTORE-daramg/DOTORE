import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ProfileNickname } from "./ProfileNickname";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Artist/ProfileNickname",
  component: ProfileNickname,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof ProfileNickname>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ProfileNickname> = (args) => (
  <ProfileNickname {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  nickname: '한지희'
};

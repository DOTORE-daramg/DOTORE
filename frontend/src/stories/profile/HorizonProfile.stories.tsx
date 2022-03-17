import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { HorizonProfile } from "./HorizonProfile";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Artist/HorizonProfile",
  component: HorizonProfile,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof HorizonProfile>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof HorizonProfile> = (args) => (
  <HorizonProfile {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  profileImgUrl:
    "https://m.secondmorning.co.kr/file_data/secondmorning/2020/11/11/e712578d88cb3d9ca67bfe33405aee6c.jpg",
  profileNickname: "주비스",
  profileLevel: "Lv.2 꼬맹이도토리",
  imgSize: "36px",
  levelSize: "14px",
  NicknameSize: "14px",
};

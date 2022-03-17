import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Description } from "./Description";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Detail/Description",
  component: Description,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Description>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Description> = (args) => (
  <Description {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  title: "안경 쓴 늑대가 담배 피우고 있는 작품 이름",
  descrition: `의사 가운을 입고 있는 건가 봐요<br>
  폭죽이랑 활을 들고 있네요..<br>
  정말 알 수 없는 작품입니다<br>
  늑대인지 개인지 소닉인지..`,
  profileImgUrl:
    "https://m.secondmorning.co.kr/file_data/secondmorning/2020/11/11/e712578d88cb3d9ca67bfe33405aee6c.jpg",
  profileNickname: "주비스",
  profileLevel: "Lv.2 꼬맹이도토리",
  size: "36px",
};

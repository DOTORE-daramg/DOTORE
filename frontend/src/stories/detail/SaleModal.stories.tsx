import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SaleModal } from "./SaleModal";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Detail/SaleModal",
  component: SaleModal,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof SaleModal>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SaleModal> = (args) => (
  <SaleModal {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  title: "안경 쓴 늑대가 담배 피우고 있는 작품 이름",
  imageUrl: "https://cdn.apnews.kr/news/photo/202203/3000347_20366_1256.jpg",
};

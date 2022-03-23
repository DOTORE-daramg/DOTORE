import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Questions from "./Questions";

export default {
  title: "Detail/Questions",
  component: Questions,

  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Questions>;

const Template: ComponentStory<typeof Questions> = (args) => (
  <Questions {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};

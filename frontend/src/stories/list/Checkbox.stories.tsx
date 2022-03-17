import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Checkbox from "./Checkbox";

export default {
  title: "List/Checkbox",
  component: Checkbox,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  label: "이미지",
  width: "8rem",
};

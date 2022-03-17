import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Category from "./Category";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "List/Category",
  component: Category,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Category>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Category> = (args) => (
  <Category {...args} />
);

export const Selected = Template.bind({});
Selected.args = {
  isSelected: true,
  label: "최신순",
};

export const Basic = Template.bind({});
Basic.args = {
  isSelected: false,
  label: "인기순",
};

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { NavMenu } from "./NavMenu";

export default {
  title: "Example/NavMenu",
  component: NavMenu,

  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof NavMenu>;

const Template: ComponentStory<typeof NavMenu> = (args) => (
  <NavMenu {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  label: "NavMenu",
};

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Info from "./Info";

export default {
  title: "Detail/MyComponent",
  component: Info,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Info>;

const Template: ComponentStory<typeof Info> = (args) => <Info {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

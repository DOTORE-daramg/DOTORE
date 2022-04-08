import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Transaction from "./Transaction";

export default {
  title: "Detail/Transaction",
  component: Transaction,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Transaction>;

const Template: ComponentStory<typeof Transaction> = (args) => (
  <Transaction {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};

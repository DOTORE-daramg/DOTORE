import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Amount } from "./Amount";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Common/Amount",
  component: Amount,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Amount>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Amount> = (args) => <Amount {...args} />;

export const Ethereum = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Ethereum.args = {
  mode: "fab",
  icon: "ethereum",
  count: 123234,
  unit: "ETH",
};
export const Heart = Template.bind({});
Heart.args = {
  mode: "fas",
  icon: "heart",
  count: 492,
};

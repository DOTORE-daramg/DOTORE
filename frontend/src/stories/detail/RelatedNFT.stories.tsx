import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import RelatedNFT from "./RelatedNFT";

export default {
  title: "Detail/RelatedNFT",
  component: RelatedNFT,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof RelatedNFT>;

const Template: ComponentStory<typeof RelatedNFT> = (args) => (
  <RelatedNFT {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};

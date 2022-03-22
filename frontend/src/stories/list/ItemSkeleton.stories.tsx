import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ItemSkeleton from "./ItemSkeleton";

export default {
  title: "List/ItemSkeleton",
  component: ItemSkeleton,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ItemSkeleton>;

const Template: ComponentStory<typeof ItemSkeleton> = (args) => (
  <ItemSkeleton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};

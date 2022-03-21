import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ProfileLevel } from "./ProfileLevel";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Artist/ProfileLevel",
  component: ProfileLevel,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ProfileLevel>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ProfileLevel> = (args) => (
  <ProfileLevel {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  profileLevel: 'Lv 1. 응애 도토리'
};

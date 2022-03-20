import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ArtistNavMenu } from "./ArtistNavMenu";

export default {
  title: "Artist/ArtistNavMenu",
  component: ArtistNavMenu,

  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ArtistNavMenu>;

const Template: ComponentStory<typeof ArtistNavMenu> = (args) => <ArtistNavMenu {...args} />;

export const Selected = Template.bind({});
Selected.args = {
  label: "SelectedMenu",
  isSelected: true,
  background: "white",
};

export const NotSelected = Template.bind({});
NotSelected.args = {
  label: "BaseMenu",
  isSelected: false,
  background: "none",
};

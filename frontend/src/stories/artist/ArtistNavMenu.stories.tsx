import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ArtistNavMenu } from "./ArtistNavMenu";

export default {
  title: "Artist/ArtistNavMenu",
  component: ArtistNavMenu,
} as ComponentMeta<typeof ArtistNavMenu>;

const Template: ComponentStory<typeof ArtistNavMenu> = (args) => <ArtistNavMenu {...args} />;

export const Selected = Template.bind({});
Selected.args = {
  label: "SelectedMenu",
  isSelected: true,
};

export const NotSelected = Template.bind({});
NotSelected.args = {
  label: "BaseMenu",
  isSelected: false,
};

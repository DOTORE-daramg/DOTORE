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

const Template: ComponentStory<typeof ArtistNavMenu> = (args) => (
    <ArtistNavMenu {...args} />
);

export const isSelected = Template.bind({});
isSelected.args = {
    label: "SelectedMenu",
};

export const isNotSelected = Template.bind({});
isNotSelected.args = {
    label: "BaseMenu",
};

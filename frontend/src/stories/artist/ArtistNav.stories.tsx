import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArtistNav } from './ArtistNav';

export default {
    title: 'Artist/ArtistNav',
    component: ArtistNav,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArtistNav>;


const Template: ComponentStory<typeof ArtistNav> = (args) => <ArtistNav {...args} />;

export const Selected = Template.bind({});
Selected.args = {
    // label: "",
    isSelected: true,
    background: "rgba(102, 103, 171, 0.1)",
};


export const NotSelected = Template.bind({});
NotSelected.args = {
    isSelected: false,
    background: "none",
};

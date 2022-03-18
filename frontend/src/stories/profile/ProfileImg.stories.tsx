import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ProfileImg } from './ProfileImg';

export default {
    title: 'Artist/ProfileImg',
    component: ProfileImg,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileImg>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ProfileImg> = (args) => <ProfileImg {...args} />;

export const ProfileImg1 = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ProfileImg1.args = {
    profileImgUrl: 'https://m.secondmorning.co.kr/file_data/secondmorning/2020/11/11/e712578d88cb3d9ca67bfe33405aee6c.jpg',
    size: '72px',
};

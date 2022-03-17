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

export const LoggedIn = Template.bind({});
LoggedIn.args = {
    user: {
        name: "Jane Doe",
    },
    isLoggedIn: true,
};


export const LoggedOut = Template.bind({});
LoggedOut.args = {
    isLoggedIn: false,
};



export const MyPageProfileBannner = Template.bind({});
MyPageProfileBannner.args = {
    profileImgUrl: 'https://m.secondmorning.co.kr/file_data/secondmorning/2020/11/11/e712578d88cb3d9ca67bfe33405aee6c.jpg',
    profileNickname: '주비스',
    profileLevel: 'Lv.2 꼬맹이도토리',
    profileAddress: '0x4836680A97a...',
    profileDescription: `안녕하세요? 주비스입니다? 반갑습니다?`,
    profileDotoriAmount: `13928 개`,
    size: '166px',
};

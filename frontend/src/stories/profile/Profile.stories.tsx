// Profile.stories.tsx
import React from 'react';
import Profile from './Profile';
import { ComponentStory, ComponentMeta } from "@storybook/react";

// export default {
//     title: 'Profile',
//     component: Profile,
//     argTypes: {
//         backgroundColor: { control: "color" },
//     },
// } as ComponentMeta<typeof Profile>;

// export const Default: React.FC = () => <Profile>aa</Profile>;



export default {
  title: 'Artist/Profile',
  component: Profile,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Profile>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Profile> = (args) => <Profile {...args} />;


// 얘가 예시임
export const MainProfile = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
MainProfile.args = {
  profileImgUrl: 'https://m.secondmorning.co.kr/file_data/secondmorning/2020/11/11/e712578d88cb3d9ca67bfe33405aee6c.jpg',
  profileNickname: '주비스',
  profileLevel: 'Lv.2 꼬맹이도토리',
  size: '72px',
};

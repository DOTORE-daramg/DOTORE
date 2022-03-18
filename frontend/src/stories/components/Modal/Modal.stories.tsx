// Profile.stories.tsx
import React from 'react';
import { Modal } from './Modal';
import { ComponentStory, ComponentMeta } from "@storybook/react";



export default {
    title: 'Components/Modal',
    component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;


export const ModifyModal = Template.bind({});
ModifyModal.args = {
    // disclosure,
    title: '내 정보 수정',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et odio sed est pellentesque gravida sit amet at orci. Phasellus eget iaculis tortor, quis lobortis augue. Proin semper congue libero a efficitur. Nunc molestie efficitur urna, ac imperdiet sapien volutpat non. Sed sed elementum elit. ',
};

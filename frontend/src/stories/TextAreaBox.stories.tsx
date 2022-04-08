import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TextAreaBox } from "./InputBox";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Common/TextAreaBox",
  component: TextAreaBox,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof TextAreaBox>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TextAreaBox> = (args) => (
  <TextAreaBox {...args} />
);

export const ItemDescTextAreaBox = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ItemDescTextAreaBox.args = {
  placeholder: "작품 설명",
  width: "19rem",
  rows: 5,
  onBlur: (e) => {},
};

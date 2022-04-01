import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { InputBox } from "./InputBox";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Common/InputBox",
  component: InputBox,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof InputBox>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof InputBox> = (args) => (
  <InputBox {...args} />
);

export const IconInputBox = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
IconInputBox.args = {
  placeholder: "영감받은 원작 작품을 검색해주세요.",
  icon: "magnifying-glass",
  width: "19rem",
  onBlur: (e) => {
    console.log(e.target.value);
  },
};

export const PlainInputBox = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
PlainInputBox.args = {
  placeholder: "작품 제목",
  width: "19rem",
  onBlur: (e) => {
    console.log(e.target.value);
  },
};

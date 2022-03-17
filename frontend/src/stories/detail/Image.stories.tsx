import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Image } from "./Image";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Common/Image",
  component: Image,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Image>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Image> = (args) => <Image {...args} />;

export const Detail = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Detail.args = {
  imageUrl: "https://cdn.apnews.kr/news/photo/202203/3000347_20366_1256.jpg",
  name: "메타콩즈1",
  mode: "detail",
};
export const DetailM = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DetailM.args = {
  ...Detail.args,
  mode: "detailM",
};
export const DetailList = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DetailList.args = {
  ...Detail.args,
  mode: "detailList",
};
export const DetailListM = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DetailListM.args = {
  ...Detail.args,
  mode: "detailListM",
};
export const List = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
List.args = {
  ...Detail.args,
  mode: "list",
};

export const ListM = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ListM.args = {
  ...Detail.args,
  mode: "listM",
};
export const Feedback = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Feedback.args = {
  ...Detail.args,
  mode: "feedback",
};
export const FeedbackM = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
FeedbackM.args = {
  ...Detail.args,
  mode: "feedbackM",
};
export const FeedbackTitle = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
FeedbackTitle.args = {
  ...Detail.args,
  mode: "feedbackTitle",
};

export const FeedbackTitleM = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
FeedbackTitleM.args = {
  ...Detail.args,
  mode: "feedbackTitleM",
};

export const Trade = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Trade.args = {
  ...Detail.args,
  mode: "trade",
};

export const TradeM = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TradeM.args = {
  ...Detail.args,
  mode: "tradeM",
};

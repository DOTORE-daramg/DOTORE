import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ArtistFeedbackList, IFeedback } from "./ArtistFeedbackList";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Artist/ArtistFeedbackList",
  component: ArtistFeedbackList,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ArtistFeedbackList>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ArtistFeedbackList> = (args) => (
  <ArtistFeedbackList {...args} />
);

const feedbackList: IFeedback[] = [];

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  feedbackList: feedbackList,
};

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import StyledPagination from "./StyledPagination";

export default {
  title: "Common/StyledPagination",
  component: StyledPagination,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof StyledPagination>;

const Template: ComponentStory<typeof StyledPagination> = (args) => (
  <StyledPagination {...args} />
);

// export const Primary = Template.bind({});
// Primary.args = {
//   primary: true,
//   label: "StyledPagination",
// };

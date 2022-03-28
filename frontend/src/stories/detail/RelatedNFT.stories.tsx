import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import RelatedNFT from "./RelatedNFT";

export default {
  title: "Detail/RelatedNFT",
  component: RelatedNFT,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof RelatedNFT>;

const Template: ComponentStory<typeof RelatedNFT> = (args) => (
  <RelatedNFT {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  relatedNFTs: [
    {
      itemHash:
        "https://mblogthumb-phinf.pstatic.net/20150302_49/1eunnue_1425222085350UyECd_JPEG/%BC%D5%B1%D7%B8%B2_%2814%29.jpg?type=w2",
      itemTitle: "다람쥐",
      tokenId: "1",
    },
    {
      itemHash:
        "https://mblogthumb-phinf.pstatic.net/20150302_49/1eunnue_1425222085350UyECd_JPEG/%BC%D5%B1%D7%B8%B2_%2814%29.jpg?type=w2",
      itemTitle: "다람쥐2",
      tokenId: "2",
    },
    {
      itemHash:
        "https://mblogthumb-phinf.pstatic.net/20150302_49/1eunnue_1425222085350UyECd_JPEG/%BC%D5%B1%D7%B8%B2_%2814%29.jpg?type=w2",
      itemTitle: "다람쥐",
      tokenId: "3",
    },
    {
      itemHash:
        "https://mblogthumb-phinf.pstatic.net/20150302_49/1eunnue_1425222085350UyECd_JPEG/%BC%D5%B1%D7%B8%B2_%2814%29.jpg?type=w2",
      itemTitle: "다람쥐",
      tokenId: "4",
    },
  ],
};

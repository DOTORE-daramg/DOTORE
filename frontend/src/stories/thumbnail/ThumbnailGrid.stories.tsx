import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ThumbnailGrid } from "./ThumbnailGrid";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/ThumbnailGrid",
  component: ThumbnailGrid,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof ThumbnailGrid>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ThumbnailGrid> = (args) => (
  <ThumbnailGrid {...args} />
);

const itemList = [
  {
    itemHash:
      "https://littledeep.com/wp-content/uploads/2020/02/littledeep_squirrel_style1.png",
    itemTitle: "다람쥐1",
    nickname: "이성재",
    size: "14rem",
    like: 2,
    onClick: () => {},
  },
  {
    itemHash:
      "https://png.pngtree.com/element_origin_min_pic/00/16/04/2057177783a4b79.jpg",
    itemTitle: "다람쥐2",
    nickname: "주비스",
    size: "14rem",
    like: 10,
    onClick: () => {},
  },
  {
    itemHash:
      "https://png.pngtree.com/element_origin_min_pic/00/16/04/2057177783a4b79.jpg",
    itemTitle: "다람쥐3",
    nickname: "이성재이성재이성재이성재이성재이성재이성재",
    size: "14rem",
    like: 6,
    onClick: () => {},
  },
  {
    itemHash:
      "https://ww.namu.la/s/eac71acc34e222bd691c5f8e0ad2450976cfb81af259569252f2dfbd83d2aca1b9e3f4fb4a26d42da46ce2c802a125b24aee7f3b4fa419dca2d33f8cfcf053f1b822d3f2ef26a4b7cf6440c4291e34ba",
    itemTitle: "다람쥐4",
    nickname: "이성재이성재이성재이성재이성재이성재이성재",
    size: "14rem",
    like: 7,
    onClick: () => {},
  },
  {
    itemHash:
      "https://www.urbanbrush.net/web/wp-content/uploads/edd/2019/09/urbanbrush-20190902130111743623.png",
    itemTitle: "토리토리도토리",
    nickname: "이성재이성재이성재이성재이성재이성재이성재",
    size: "14rem",
    like: 5,
    onClick: () => {},
  },
  {
    itemHash:
      "https://blog.kakaocdn.net/dn/bpj8Kc/btqCFxz4xFK/kpUTKlADoZxWjnGhHslje1/img.png",
    itemTitle: "다람쥐6",
    nickname: "John Doe",
    size: "14rem",
    like: 3,
    onClick: () => {},
  },
];

export const MainThumbnailGrid = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
MainThumbnailGrid.args = {
  itemList: itemList,
  size: "48rem",
  columnCount: 3,
};

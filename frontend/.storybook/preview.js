import React from "react";

import GlobalStyles from "../src/shared/GlobalStyles";

// 모든 스토리에 스타일을 적용하기 위한 글로벌 decorator
export const decorators = [
  (Story) => (
    <>
      <GlobalStyles />
      <Story />
    </>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

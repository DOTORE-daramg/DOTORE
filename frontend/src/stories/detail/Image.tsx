import React from "react";
import styled from "styled-components";

enum MODE {
  DETAIL = "detail",
  DETAIL_M = "detailM",
  DETAIL_LIST = "detailList",
  DETAIL_LIST_M = "detailListM",
  LIST = "list",
  LIST_M = "listM",
  FEEDBACK = "feedback",
  FEEDBACK_M = "feedbackM",
  FEEDBACK_TITLE = "feedbackTitle",
  FEEDBACK_TITLE_M = "feedbackTitleM",
  TRADE = "trade",
  TRADE_M = "tradeM",
}

const StyledImage = styled.img<{ mode?: MODE }>`
  border-radius: 10px;
  width: ${(props) =>
    props.mode === MODE.DETAIL
      ? "350px"
      : props.mode === MODE.DETAIL_M
      ? "300px"
      : props.mode === MODE.DETAIL_LIST || props.mode === MODE.FEEDBACK_M
      ? "150px"
      : props.mode === MODE.DETAIL_LIST_M
      ? "90px"
      : props.mode === MODE.LIST
      ? "240px"
      : props.mode === MODE.LIST_M
      ? "155px"
      : props.mode === MODE.FEEDBACK
      ? "340px"
      : props.mode === MODE.FEEDBACK_TITLE
      ? "75px"
      : props.mode === MODE.FEEDBACK_TITLE_M
      ? "60px"
      : props.mode === MODE.TRADE
      ? "42px"
      : props.mode === MODE.TRADE_M
      ? "32px"
      : "350px"};

  height: ${(props) =>
    props.mode === MODE.DETAIL
      ? "350px"
      : props.mode === MODE.DETAIL_M
      ? "300px"
      : props.mode === MODE.DETAIL_LIST || props.mode === MODE.FEEDBACK_M
      ? "150px"
      : props.mode === MODE.DETAIL_LIST_M
      ? "90px"
      : props.mode === MODE.LIST
      ? "200px"
      : props.mode === MODE.LIST_M
      ? "130px"
      : props.mode === MODE.FEEDBACK
      ? "340px"
      : props.mode === MODE.FEEDBACK_TITLE
      ? "75px"
      : props.mode === MODE.FEEDBACK_TITLE_M
      ? "60px"
      : props.mode === MODE.TRADE
      ? "42px"
      : props.mode === MODE.TRADE_M
      ? "32px"
      : "350px"};
`;

interface ImageProps {
  imageUrl: string;
  name: string;
  mode?: MODE;
}

export const Image = ({ imageUrl, name, mode }: ImageProps) => {
  return <StyledImage src={imageUrl} alt={name} mode={mode} />;
};

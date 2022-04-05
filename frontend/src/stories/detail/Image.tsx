import React from "react";
import styled from "styled-components";

type MODE =
  | "detail"
  | "detailM"
  | "detailList"
  | "detailListM"
  | "list"
  | "listM"
  | "feedback"
  | "feedbackM"
  | "feedbackCreate"
  | "feedbackCreateM"
  | "feedbackTitle"
  | "feedbackTitleM"
  | "trade"
  | "tradeM";

const StyledImage = styled.img<{ mode?: MODE }>`
  border-radius: 10px;
  border: 1px solid rgb(229, 232, 235);
  object-fit: contain;
  object-position: center;
  width: ${(props) =>
    props.mode === "detail"
      ? "350px"
      : props.mode === "detailM"
      ? "300px"
      : props.mode === "detailList" || props.mode === "feedbackM"
      ? "150px"
      : props.mode === "detailListM"
      ? "90px"
      : props.mode === "list"
      ? "240px"
      : props.mode === "listM"
      ? "155px"
      : props.mode === "feedback"
      ? "340px"
      : props.mode === "feedbackTitle"
      ? "75px"
      : props.mode === "feedbackTitleM"
      ? "60px"
      : props.mode === "feedbackCreate"
      ? "280px"
      : props.mode === "feedbackCreateM"
      ? "200px"
      : props.mode === "trade"
      ? "42px"
      : props.mode === "tradeM"
      ? "32px"
      : "350px"};

  height: ${(props) =>
    props.mode === "detail"
      ? "350px"
      : props.mode === "detailM"
      ? "300px"
      : props.mode === "detailList" || props.mode === "feedbackM"
      ? "150px"
      : props.mode === "detailListM"
      ? "90px"
      : props.mode === "list"
      ? "200px"
      : props.mode === "listM"
      ? "130px"
      : props.mode === "feedback"
      ? "340px"
      : props.mode === "feedbackTitle"
      ? "75px"
      : props.mode === "feedbackTitleM"
      ? "60px"
      : props.mode === "feedbackCreate"
      ? "280px"
      : props.mode === "feedbackCreateM"
      ? "200px"
      : props.mode === "trade"
      ? "42px"
      : props.mode === "tradeM"
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

import React from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import {
  ArtistFeedbackList,
  IFeedback,
} from "../../stories/artist/ArtistFeedbackList";

const feedbackList: IFeedback[] = [
  {
    isAnswered: false,
    itemTitle: "야, 너도 도토리 할 수 있어!",
    questionTitle: "도토리 색 조합에 대해 질문 드립니다.",
    recentDate: "2022-03-11",
  },
  {
    isAnswered: true,
    itemTitle: "야, 너는 도토리 못해!",
    questionTitle: "야, 너는 도토리 못해!",
    recentDate: "2022-03-12",
  },
  {
    isAnswered: false,
    itemTitle: "야, 너도 도토리 할 수 있어!",
    questionTitle: "도토리 색 조합에 대해 질문 드립니다.",
    recentDate: "2022-03-11",
  },
  {
    isAnswered: true,
    itemTitle: "야, 너는 도토리 못해!",
    questionTitle: "야, 너는 도토리 못해!",
    recentDate: "2022-03-12",
  },
  {
    isAnswered: false,
    itemTitle: "야, 너도 도토리 할 수 있어!",
    questionTitle: "도토리 색 조합에 대해 질문 드립니다.",
    recentDate: "2022-03-11",
  },
  {
    isAnswered: true,
    itemTitle: "야, 너는 도토리 못해!",
    questionTitle: "야, 너는 도토리 못해!",
    recentDate: "2022-03-12",
  },
];

const Container = styled.div`
  display: flex;
  margin: auto;
  padding: 5rem 2rem;
  justify-content: center;
`;

const FeedbackList = () => {
  const isPc = useMediaQuery({ minWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 500 });
  const width = isPc ? "52rem" : isTablet ? "32rem" : "24rem";
  return (
    <Container>
      <ArtistFeedbackList
        feedbackList={feedbackList}
        width={width}
      ></ArtistFeedbackList>
    </Container>
  );
};

export default FeedbackList;

import React from "react";
import styled from 'styled-components';
import { ArtistFeedbackList, IFeedback } from "../../stories/artist/ArtistFeedbackList";

const feedbackList: IFeedback[] = [
  { 
    isAnswered: false,
    itemTitle: '야, 너도 도토리 할 수 있어!',
    questionTitle: '도토리 색 조합에 대해 질문 드립니다.',
    recentDate: '2022-03-11'
  },
  { 
    isAnswered: true,
    itemTitle: '야, 너는 도토리 못해!',
    questionTitle: '야, 너는 도토리 못해!',
    recentDate: '2022-03-12'
  },
  { 
    isAnswered: false,
    itemTitle: '야, 너도 도토리 할 수 있어!',
    questionTitle: '도토리 색 조합에 대해 질문 드립니다.',
    recentDate: '2022-03-11'
  },
  { 
    isAnswered: true,
    itemTitle: '야, 너는 도토리 못해!',
    questionTitle: '야, 너는 도토리 못해!',
    recentDate: '2022-03-12'
  },
  { 
    isAnswered: false,
    itemTitle: '야, 너도 도토리 할 수 있어!',
    questionTitle: '도토리 색 조합에 대해 질문 드립니다.',
    recentDate: '2022-03-11'
  },
  { 
    isAnswered: true,
    itemTitle: '야, 너는 도토리 못해!',
    questionTitle: '야, 너는 도토리 못해!',
    recentDate: '2022-03-12'
  },
]

const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 5rem 0;
  justify-content: center;
  @media screen and (max-width: 768px) {
    padding: 2rem 0;
  }
`;

const FeedbackList = () => {
  return (
    <Container>
      <ArtistFeedbackList
        feedbackList={feedbackList}
      ></ArtistFeedbackList>
    </Container>
  );
};

export default FeedbackList;

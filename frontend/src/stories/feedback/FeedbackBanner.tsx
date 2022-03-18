import React from 'react';
import styled from 'styled-components';
import dotori from '../../assets/feedback/sitting-dotori.png';

const Container = styled.div`
  height: 194px;
  width: 100%;
  background-color: rgba(102, 103, 171, 0.7);
  position: relative;
`;
const QnA = styled.span`
  font-size: 144px;
  color: rgba(255, 255, 255, 0.15);
  position: absolute;
  left: -24px;
  top: 20px;
`;
const Subtitle = styled.span`
  font-size: 1.5rem;
  color: #fff;
  position: absolute;
  left: 30%;
  top: 107px;
  @media screen and (max-width: 1200px) {
    left: 20%;
    top: 107px;
  }
  @media screen and (max-width: 768px) {
    top: 122px;
    left: 10%;
  }
  @media screen and (max-width: 500px) {
    top: 122px;
    left: 5%;
  }
`;
const ImgContainer = styled.img`
  position: absolute;
  right: 104px;
  top: 11px;
  height: 172px;
  @media screen and (max-width: 1200px) {
    right: 50px;
  }
  @media screen and (max-width: 768px) {
    right: 30px;
  }
  @media screen and (max-width: 500px) {
    right: 10px;
  }
`;

export const FeedbackBanner = () => {
  return (
    <Container>
      <QnA>Q&A</QnA>
      <Subtitle>작가에게 직접 질문하고 답변받을 수 있습니다</Subtitle>
      <ImgContainer src={dotori}></ImgContainer>
    </Container>
  );
};

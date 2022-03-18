import React from 'react';
import styled from 'styled-components';
import { HorizonProfile, HorizonProfileProps } from '../profile/HorizonProfile';

const QuestionContainer = styled.div`
  width: 100%;
  background-color: rgba(102, 103, 171, 0.1);
  border-radius: 10px;
  padding: 2.5rem 5rem;
  font-weight: 500;
`;

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Content = styled.article`
  font-size: 1.2rem;
  overflow-wrap: break-word;
  padding: 1.5rem 0;
  line-height: 1.5rem;
  white-space: pre-line;
`;

const StyledFooter = styled.footer`
  font-size: 13px;
  color: #666666;
`; 

interface FeedbackQuestionProps extends HorizonProfileProps {
  content: string,
  createdAt: string,
}

export const FeedbackQuestion = ({
  profileImgUrl,
  profileNickname,
  profileLevel,
  content,
  createdAt
}:FeedbackQuestionProps) => {
  return (
    <QuestionContainer>
      <StyledHeader>
        <span>작성자 </span>
        <HorizonProfile 
          profileImgUrl={profileImgUrl}
          profileNickname={profileNickname}
          profileLevel={profileLevel}
          imgSize='32px'
          levelSize='12px'
          NicknameSize='14px'
        ></HorizonProfile>
      </StyledHeader>

      <Content>{content}</Content>

      <StyledFooter>{createdAt}</StyledFooter>
    </QuestionContainer>
  );
};

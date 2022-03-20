import React from 'react';
import styled from 'styled-components';
import { HorizonProfile } from '../profile/HorizonProfile';
import { Image } from '../detail/Image';

type CommentType = 'MainQuestion' | 'Question' | 'Answer';

const CommentContainer = styled.div<{ commentType: CommentType }>`
  width: ${props => 
    props.commentType === 'MainQuestion' ? '100%' : '85%'};

  background-color: ${props =>
    props.commentType === 'Answer' ? 
    'rgba(192, 192, 192, 0.1)' :
    'rgba(102, 103, 171, 0.1)'};

  margin: ${props =>
    props.commentType === 'MainQuestion' ? 
    '0' :
    props.commentType === 'Question' ? 
    '0 15% 0 0' :
    '0 0 0 15%'};

  border-radius: 10px;
  padding: 2.5rem 5rem;
  font-weight: 500;
`;

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ImageContainer = styled.div`
  padding-top: 1rem;
`;

const Content = styled.article`
  font-size: 1.2rem;
  overflow-wrap: break-word;
  padding: 1.5rem 0;
  line-height: 1.5rem;
  white-space: pre-line;
`;

const CreatedAt = styled.div`
  font-size: 0.8rem;
  color: #666666;
`; 

export interface FeedbackArticleProps {
  profileImgUrl: string;
  profileNickname: string;
  profileLevel: string;
  content: string;
  createdAt: string;
  commentType: CommentType;
  imageUrl?: string;
  imgSize?: string;
}

export const FeedbackComment = ({
  profileImgUrl,
  profileNickname,
  profileLevel,
  content,
  createdAt,
  imageUrl,
  commentType,
}:FeedbackArticleProps) => {
  const vw = visualViewport.width;
  const mode = vw <= 500 ? 'feedbackM' : 'feedback';
  return (
    <CommentContainer commentType={commentType}>
      <StyledHeader>
        <span>작성자 </span>
        <HorizonProfile 
          profileImgUrl={profileImgUrl}
          profileNickname={profileNickname}
          profileLevel={profileLevel}
          imgSize='32px'
          levelSize='0.9rem'
          NicknameSize='1rem'
        ></HorizonProfile>
      </StyledHeader>

      {imageUrl ?
        <ImageContainer>
          <Image
            imageUrl={imageUrl} 
            name={`${profileNickname}의 첨부 이미지`} 
            mode={mode}
          ></Image> 
        </ImageContainer>
        : null}

      <Content>{content}</Content>

      <CreatedAt>{createdAt}</CreatedAt>
    </CommentContainer>
  );
};

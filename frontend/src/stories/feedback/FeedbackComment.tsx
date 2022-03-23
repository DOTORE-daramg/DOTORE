import React, { useState } from 'react';
import styled from 'styled-components';
import { useMediaQuery } from "react-responsive"
import { HorizonProfile } from '../profile/HorizonProfile';
import { Image } from '../detail/Image';
import { Icon } from '../common/Icon';
import { TextEditor } from '../common/TextEditor';

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
  @media screen and (max-width: 500px) {
    padding: 2rem 3rem;
  }
`;

const PencilIconContainer = styled.div`
  position: absolute;
  top: -1rem;
  right: -3.5rem;
  cursor: pointer;
  @media screen and (max-width: 500px) {
    top: -1rem;
    right: -1.8rem;
  }
`;
const CloseIconContainer = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  cursor: pointer;
  @media screen and (max-width: 500px) {
    top: 1rem;
    right: 1rem;
  }
`;

const StyledHeader = styled.header`
  display: flex;
  position: relative;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const FeedbackUpdateContainer = styled.div`
  position: relative;
`;

const ImageContainer = styled.div`
  padding-top: 1rem;
`;

const Content = styled.article`
  font-size: 1.2rem;
  overflow-wrap: break-word;
  margin: 1.5rem 0;
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
}: FeedbackArticleProps) => {
  const isPc = useMediaQuery({ minWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 500 });
  const viewMode = isPc ? 'feedback'
    : isTablet ? 'feedback'
    : 'feedbackM'
  
  const [isEditorShow, setIsEditorShow] = useState(false);
  const handleToggleEditor = () => {
    setIsEditorShow(prev => !prev);
    console.log(isEditorShow);
  }
  return (
    <CommentContainer commentType={commentType}>
      <StyledHeader>
        {commentType !== 'MainQuestion' && !isEditorShow ? 
          <PencilIconContainer onClick={handleToggleEditor}>
            <Icon style='fas' icon='pencil' color='#959595'></Icon>
          </PencilIconContainer>
          : null
        }
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
      {commentType !== 'MainQuestion' && isEditorShow ?
        <FeedbackUpdateContainer>
          <CloseIconContainer onClick={handleToggleEditor}>
            <Icon style='fas' icon='xmark' color='#959595'></Icon>
          </CloseIconContainer>
          <TextEditor></TextEditor>
        </FeedbackUpdateContainer>
        : null}
      {commentType === 'MainQuestion' || !isEditorShow ? 
        <div>
          {imageUrl ?
            <ImageContainer>
              <Image
                imageUrl={imageUrl} 
                name={`${profileNickname}의 첨부 이미지`} 
                mode={viewMode}
              ></Image> 
            </ImageContainer>
            : null}
          <Content>{content}</Content>
          <CreatedAt>{createdAt}</CreatedAt>
        </div>
       : null}
    </CommentContainer>
  );
};
import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 8px;
  cursor: pointer;
  &:hover div {
    display: flex;
    flex-flow: column;
    text-align: center;
  }
`;

const StyledImageItem = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const StyledCoverItem = styled.div`
  display: none;
  position: absolute;
  top: 0%;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  .author-name {
    margin-top: 30%;
    margin-bottom: 0.4rem;
    font-size: 50%;
  }
  .item-title {
    margin-top: 0;
    font-weight: 600;
  }
`;

const StyledText = styled.p`
  color: #fff;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding: 0 0.5rem;
`;

interface ThumbnailProps {
  itemImageUrl: string;
  itemTitle: string;
  authorName: string;
  onClick?: () => void;
}

export const Thumbnail = ({
  itemImageUrl,
  itemTitle,
  authorName,
  onClick,
}:ThumbnailProps) => {
  return (
    <Container onClick={onClick}>
      <StyledImageItem src={itemImageUrl} alt='thumbnail'></StyledImageItem>
      <StyledCoverItem>
        <StyledText className="author-name">{authorName}</StyledText>
        <StyledText className="item-title">{itemTitle}</StyledText>
      </StyledCoverItem>
    </Container>
  );
};


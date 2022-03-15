import React from 'react';
import styled from 'styled-components';


const Container = styled.div< {size: string} >`
  position: relative;
  width: ${props => props.size};
  height: ${props => props.size};
  border: 8px;
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
  object-fit:cover;
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
    margin-top: 4rem;
    margin-bottom: 0.4rem;
  }
  .item-title {
    margin-top: 0;
    font-weight: 600;
  }
`;

const StyledText = styled.p< {fontSize?: string} >`
  color: #fff;
  font-size: ${props => props.fontSize};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding: 0 0.5rem;
`;

interface ThumbnailProps {
  itemImageUrl: string;
  itemTitle: string;
  authorName: string;
  size: string;
  authorNameFontSize?: string;
  itemtitleFontSize?: string;
  onClick?: () => void;
}

export const Thumbnail = ({
  itemImageUrl,
  itemTitle,
  authorName,
  size,
  authorNameFontSize = '1rem',
  itemtitleFontSize = '2rem',
  onClick,
}:ThumbnailProps) => {
  return (
    <Container size={size} onClick={onClick}>
      <StyledImageItem src={itemImageUrl} alt='thumbnail'></StyledImageItem>
      <StyledCoverItem>
        <StyledText className="author-name" fontSize={authorNameFontSize}>{authorName}</StyledText>
        <StyledText className="item-title" fontSize={itemtitleFontSize}>{itemTitle}</StyledText>
      </StyledCoverItem>
    </Container>
  );
};


import React from 'react';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import { Image } from '../detail/Image';

const Container = styled.div`
  font-size: 18px;
  display: flex;
  align-items: center;
`;

const ItemTitle = styled.span`
  margin-left: 1rem;
  font-weight: 600;
`;

interface FeedbackTitleProps {
  itemTitle: string,
  imageUrl: string,
}

export const FeedbackTitle = ({
  itemTitle,
  imageUrl,
}:FeedbackTitleProps) => {
  const isPc = useMediaQuery({ minWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 500 });
  const viewMode = isPc ? 'feedbackTitle'
    : isTablet ? 'feedbackTitle'
    : 'feedbackTitleM'
  return (
    <Container>
      <Image imageUrl={imageUrl} name={itemTitle} mode={viewMode}></Image>
      <p><ItemTitle>{itemTitle}</ItemTitle> 에 대한 질문입니다.</p>
    </Container>
  );
};
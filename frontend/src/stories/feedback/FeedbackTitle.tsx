import React from 'react';
import styled from 'styled-components';
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
  const vw = visualViewport.width;
  return (
    <Container>
      <Image imageUrl={imageUrl} name={itemTitle} mode={vw <= 500 ? 'feedbackTitleM' : 'feedbackTitle'}></Image>
      <p><ItemTitle>{itemTitle}</ItemTitle> 에 대한 질문입니다.</p>
    </Container>
  );
};
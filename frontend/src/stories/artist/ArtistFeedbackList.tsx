import React from 'react';
import styled from 'styled-components';
import { FeedbackToggleButton } from './FeedbackToggleButton';


export interface IFeedback {
  isAnswered: boolean,
  itemTitle: string,
  questionTitle: string,
  recentDate: string,
}

interface ArtistFeedbackListProps {
  feedbackList: IFeedback[];
}

const Container = styled.div`
  width: 54rem;

  @media screen and (max-width: 768px) {
    width: 32rem;
  }
  @media screen and (max-width: 500px) {
    width: 24rem;
  }
`;

const TableContainer = styled.div`
  margin-top: 2rem;
`;

const TableHeader = styled.div`
  display: flex;
  font-weight: 600;
  font-size: 1.2rem;
  padding: 2rem 0;
`;

const TableRow = styled.div`
  display: flex;
  font-size: 1.2rem;
  font-weight: 500;
  height: 5rem;
  align-items: center;
  @media screen and (max-width: 768px) {
    height: 3rem;
  }
`;

const TableBlock = styled.div<{ width: string }>`
  display: flex;
  width: ${props => props.width};
`;

const TableCell = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding: 0 0.5rem;
  @media screen and (max-width: 500px) {
    font-size: 0.9rem;
  }
`;

export const ArtistFeedbackList = ({ feedbackList }:ArtistFeedbackListProps) => {
  return (
    <Container>
      <FeedbackToggleButton
        leftLabel='받은 질문'
        rightLabel='보낸 질문'
        selected={0}
      ></FeedbackToggleButton>
      <TableContainer>
        <TableHeader>
          <TableBlock width='15%'>
            <TableCell>답변 여부</TableCell>
          </TableBlock>
          <TableBlock width='33%'>
            <TableCell>작품명</TableCell>
          </TableBlock>
          <TableBlock width='33%'>
            <TableCell>질문명</TableCell>
          </TableBlock>
          <TableBlock width='19%'>
            <TableCell>최근 활동일</TableCell>
          </TableBlock>
        </TableHeader>
        {feedbackList.map((feedback) => (
          <TableRow>
            <TableBlock width='15%'>
              <TableCell>{ feedback.isAnswered ? '해결' : '미해결' }</TableCell>
            </TableBlock>
            <TableBlock width='33%'>
              <TableCell>{ feedback.itemTitle }</TableCell>
            </TableBlock>
            <TableBlock width='33%'>
              <TableCell>{ feedback.questionTitle }</TableCell>
            </TableBlock>
            <TableBlock width='19%'>
              <TableCell>{ feedback.recentDate }</TableCell>
            </TableBlock>
          </TableRow>
        ))}
      </TableContainer>
    </Container>
  );
};

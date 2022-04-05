import React from "react";
import styled from "styled-components";
import QuestionItem, { QuestionProps } from "./QuestionItem";
const Container = styled.div`
  width: 350px;
  height: fit-content;
  /* @media screen and (max-width: 768px) {
    justify-content: space-around;
    margin-left: 0;
  } */
`;

const InnerContainer = styled.div`
  height: 6rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-top: 30px;
`;

const CategoryContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 5fr 6fr 15fr;
  justify-content: flex-start;
  place-items: center;
`;

const Category = styled.div`
  font-weight: 600;
`;

interface QuestionsProps {
  tokenId?: string;
  questions: Array<QuestionProps>;
}
const Questions = ({ tokenId, questions }: QuestionsProps) => {
  return (
    <Container>
      <InnerContainer>
        <CategoryContainer>
          <Category>답변 여부</Category>
          <Category>질문자</Category>
          <Category>질문 내용</Category>
        </CategoryContainer>
        {questions.map((question) => (
          <QuestionItem
            key={question.articleNo}
            tokenId={tokenId}
            {...question}
          />
        ))}
      </InnerContainer>
    </Container>
  );
};

export default Questions;

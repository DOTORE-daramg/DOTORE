import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 5fr 6fr 15fr;
  justify-content: flex-start;
  place-items: center;
`;
const Category = styled.div``;

export interface QuestionProps {
  articleno: number;
  answerYN: boolean;
  nickname: string;
  desc: string;
}

const QuestionItem = ({
  articleno,
  answerYN,
  nickname,
  desc,
}: QuestionProps) => {
  return (
    <Container>
      <Category>{answerYN ? "해결" : "미해결"}</Category>
      <Category>{nickname}</Category>
      <Category>{desc}</Category>
    </Container>
  );
};

export default QuestionItem;

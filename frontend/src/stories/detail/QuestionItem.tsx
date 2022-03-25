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
  yn: boolean;
  nickname: string;
  description: string;
}

const QuestionItem = ({
  articleno,
  yn,
  nickname,
  description,
}: QuestionProps) => {
  return (
    <Container>
      <Category>{yn ? "해결" : "미해결"}</Category>
      <Category>{nickname}</Category>
      <Category>{description}</Category>
    </Container>
  );
};

export default QuestionItem;

import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 5fr 6fr 15fr;
  justify-content: flex-start;
  place-items: center;
`;
const Category = styled.div`
  cursor: pointer;

  &:hover {
    transition: 0.3s;
    font-size: 1.05rem;
    color: #6667ab;
  }
`;

export interface QuestionProps {
  tokenId?: string;
  articleNo: number;
  yn: boolean;
  nickname: string;
  description: string;
}

const QuestionItem = ({
  tokenId,
  articleNo,
  yn,
  nickname,
  description,
}: QuestionProps) => {
  const navigate = useNavigate();
  return (
    <Container onClick={() => navigate(`/feedback/${tokenId}/${articleNo}`)}>
      <div>{yn ? "해결" : "미해결"}</div>
      <div>{nickname}</div>
      <Category>{description}</Category>
    </Container>
  );
};

export default QuestionItem;

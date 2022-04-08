import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;

  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;
const Title = styled.div`
  width: 6rem;
  margin-right: 20px;
  display: flex;
  align-items: center;
`;

interface InfoItemProps {
  title: string;
  content: string;
}
const InfoItem = ({ title, content }: InfoItemProps) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Title id="content">{content}</Title>
    </Container>
  );
};

export default InfoItem;

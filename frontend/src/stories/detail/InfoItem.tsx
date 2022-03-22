import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;
const Title = styled.div`
  width: 6rem;
  margin-right: 20px;
`;

interface InfoItemProps {
  title: string;
  content: string;
}
const InfoItem = ({ title, content }: InfoItemProps) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Title>{content}</Title>
    </Container>
  );
};

export default InfoItem;

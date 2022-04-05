import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;
const Category = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

interface DetailProps {
  date: string;
  seller: string;
  buyer: string;
  price: string;
}
const TransactionItem = ({ date, seller, buyer, price }: DetailProps) => {
  return (
    <Container>
      <Category width="8rem">{date}</Category>
      <Category width="5rem">{seller}</Category>
      <Category width="5rem">{buyer}</Category>
      <Category width="10rem">{price}</Category>
    </Container>
  );
};

export default TransactionItem;

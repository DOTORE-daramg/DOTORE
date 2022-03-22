import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const Date = styled.div`
  width: 8rem;
`;

const Person = styled.div`
  width: 5rem;
`;

const Price = styled.div`
  width: 10rem;
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
      <Date>{date}</Date>
      <Person>{seller}</Person>
      <Person>{buyer}</Person>
      <Price>{price}</Price>
    </Container>
  );
};

export default TransactionItem;

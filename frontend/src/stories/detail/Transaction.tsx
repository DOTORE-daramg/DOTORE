import React from "react";
import styled from "styled-components";
import { Title } from "./Title";
import TransactionItem from "./TransactionItem";

const Container = styled.div``;
const InnerContainer = styled.div`
  height: 6rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-top: 30px;
`;
interface DetailProps {
  date: string;
  seller: string;
  buyer: string;
  price: string;
}
interface TransactionProps {
  transactions: Array<DetailProps>;
}

const Transaction = ({ transactions }: TransactionProps) => {
  return (
    <Container>
      <Title color="#6667ab" title="최근 거래 내역" />
      <InnerContainer>
        {transactions.map((transactions, index) => (
          <TransactionItem
            key={index}
            date={transactions.date}
            seller={transactions.seller}
            buyer={transactions.buyer}
            price={transactions.price}
          />
        ))}
      </InnerContainer>
    </Container>
  );
};

export default Transaction;

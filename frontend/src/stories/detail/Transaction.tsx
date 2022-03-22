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
  transacrions: Array<DetailProps>;
}

const Transaction = ({
  transacrions = [
    {
      date: "거래 일시",
      seller: "판매자",
      buyer: "소유자",
      price: "가격",
    },
    {
      date: "2022-03-12",
      seller: "제진명",
      buyer: "인주비",
      price: "1,000,000 KRW",
    },
    {
      date: "2022-03-12",
      seller: "인주비",
      buyer: "한지희",
      price: "1,500,000 KRW",
    },
  ],
}: TransactionProps) => {
  return (
    <Container>
      <Title color="#6667ab" title="최근 거래 내역" />
      <InnerContainer>
        {transacrions.map((transaction) => (
          <TransactionItem
            date={transaction.date}
            seller={transaction.seller}
            buyer={transaction.buyer}
            price={transaction.price}
          />
        ))}
      </InnerContainer>
    </Container>
  );
};

export default Transaction;

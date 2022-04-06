import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { saleTx } from "../../contracts/api/ItemTxRecord";
import { getTimeStamp } from "../../contracts/api/transactionRecord";
import { Title } from "./Title";
import TransactionItem from "./TransactionItem";

const InnerContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 40px;
`;
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;
interface TransactionProps {
  tokenId?: string;
}
const Category = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Transaction = ({ tokenId }: TransactionProps) => {
  const [isGetHistory, setIsGetHistory] = useState(false);
  const [isSetTimeStamp, setIsSetTimeStamp] = useState(false);
  const [txList, setTxList] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    if (!isGetHistory && tokenId) {
      Promise.resolve()
        .then(() => saleTx(tokenId).then((res) => setTxList(res)))
        .then(() => setIsGetHistory(true));
    }
  }, []);

  useEffect(() => {
    if (isGetHistory) {
      let temp: any[] = [];
      [...txList].map(async (data) => {
        temp.push({
          ...data,
          timeStamp: await getTimeStamp(data.blockHash),
        });
      });
      setTimeout(() => {
        setTransactions(temp.sort((a, b) => b.timeStamp - a.timeStamp));
        setIsSetTimeStamp(true);
      }, 500);
    }
  }, [isGetHistory]);

  return (
    <>
      <Title color="#6667ab" title="최근 거래 내역" />
      <InnerContainer>
        <Container>
          <Category width="30%">거래 날짜</Category>
          <Category width="25%">보낸사람</Category>
          <Category width="25%">받은사람</Category>
          <Category width="20%">가격</Category>
        </Container>
        {/* {!isSetTimeStamp && <LoadingSpinner />} */}
        {isSetTimeStamp &&
          transactions.length > 0 &&
          transactions.map((transactions, index) => (
            <TransactionItem key={index} data={transactions} />
          ))}
      </InnerContainer>
    </>
  );
};

export default Transaction;

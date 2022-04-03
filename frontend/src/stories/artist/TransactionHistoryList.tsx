import React, { useState } from "react";
import styled from "styled-components";
import { Image } from "../detail/Image";
import { useMediaQuery } from "react-responsive";
import TransactionHistoryItem from "./TransactionHistoryItem";

interface IItem {
  itemTitle: string;
  itemImgUrl: string;
}

export interface transactionRecordTypes {
  address: string;
  blockHash: string;
  blockNumber: number;
  event: string;
  id: string;
  logIndex: number;
  raw: any;
  removed: boolean;
  returnValues: any;
  signature: string;
  transactionHash: string;
  transactionIndex: number;
}

export interface ITransactionHistory {
  transactionHash: string;
  transactionType: "minting" | "sale" | "transfer";
  item: IItem;
  transactionTime: string;
  from: string;
  to: string;
  price?: number;
}

interface TransactionHistoryListProps {
  txHistoryList: any[];
  width: string;
}

const Container = styled.div<{ width: string }>`
  width: ${(props) => props.width};
`;

const TableHeader = styled.div`
  display: flex;
  font-weight: 600;
  font-size: 1rem;
  border-bottom: solid 1px #6667ab;
  padding: 1rem 0;
`;

const TableBlock = styled.div<{ width: string }>`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width};
`;

export const TransactionHistoryList = ({
  txHistoryList,
  width,
}: TransactionHistoryListProps) => {
  const isPc = useMediaQuery({ minWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 500 });
  const viewMode = isPc ? "trade" : isTablet ? "trade" : "tradeM";
  console.log(txHistoryList);
  // return (
  //   <Container width={width}>
  //     {txHistoryList.map((data) =>
  //       <div key={data.transactionHash}>{data.transactionHash}</div>
  //     )}
  //   </Container>
  // );
  return (
    <Container width={width}>
      <TableHeader>
        <TableBlock width="10%">거래 종류</TableBlock>
        <TableBlock width="10%">tokenId</TableBlock>
        <TableBlock width="10%">거래 일시</TableBlock>
        <TableBlock width="30%">보낸 사람</TableBlock>
        <TableBlock width="30%">받은 사람</TableBlock>
        <TableBlock width="10%">가격</TableBlock>
      </TableHeader>

      {txHistoryList.map(
      // (data,index) => <div key={index}> {data.blockHash}</div>
      (data, index) => (
        <TransactionHistoryItem key={index} data={data} />
      )
      )}
    </Container>
  );
};

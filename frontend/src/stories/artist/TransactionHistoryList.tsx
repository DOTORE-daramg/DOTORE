import React from "react";
import styled from "styled-components";
import { Image } from "../detail/Image";
import { useMediaQuery } from "react-responsive";
import { transactionRecordTypes } from '../../contracts/api/transactionRecord';

interface IItem {
  itemTitle: string;
  itemImgUrl: string;
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
  txHistoryList: transactionRecordTypes[];
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

const TableRow = styled.div`
  display: flex;
  font-size: 0.8rem;
  font-weight: 500;
  border-bottom: solid 1px #6667ab;
  height: 5rem;
  align-items: center;
`;

const TableBlock = styled.div<{ width: string }>`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width};
`;

const TableCell = styled.span`
text-align: center;
  text-overflow: ellipsis;
  /* text-overflow: clip; */
  overflow: hidden;
  /* white-space: nowrap; */
  /* margin: auto; */
`;

export const TransactionHistoryList = ({
  txHistoryList,
  width,
}: TransactionHistoryListProps) => {
  const isPc = useMediaQuery({ minWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 500 });
  const viewMode = isPc ? "trade" : isTablet ? "trade" : "tradeM";
  console.log(txHistoryList)
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

      {txHistoryList.map((txHistory) => (
        <TableRow key={txHistory.transactionHash}>
          <TableBlock width="10%">
            <TableCell>{txHistory.status}</TableCell>
          </TableBlock>

          {/* <TableBlock width="25%">
            <Image
              imageUrl={txHistory.item.itemImgUrl}
              name={txHistory.item.itemTitle}
              mode={viewMode}
            ></Image>
            <TableCell>{txHistory.item.itemTitle}</TableCell>
          </TableBlock> */}
          <TableBlock width='10%'>{txHistory.tokenId}</TableBlock>
          <TableBlock width="10%">
            <TableCell>{txHistory.timeStamp.getFullYear()}-{txHistory.timeStamp.getMonth()+1}-{txHistory.timeStamp.getDate()}</TableCell>
          </TableBlock>
          <TableBlock width="30%">
            <TableCell>{txHistory.from}</TableCell>
          </TableBlock>
          <TableBlock width="30%">
            <TableCell>{txHistory.to}</TableCell>
          </TableBlock>
          <TableBlock width="10%">
            <TableCell>
              {txHistory.price!=="0" ? `${txHistory.price} ETH` : ""}
            </TableCell>
          </TableBlock>
        </TableRow>
      ))}
    </Container>
  );
};

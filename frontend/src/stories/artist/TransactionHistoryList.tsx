import React from 'react';
import styled from 'styled-components';
import { Image } from '../detail/Image';
import { useMediaQuery } from 'react-responsive';

interface IItem{
  itemTitle: string,
  itemImgUrl: string,
}

export interface ITransactionHistory {
  transactionHash: string,
  transactionType: 'minting' | 'sale' | 'transfer';
  item: IItem;
  transactionTime: string;
  from: string;
  to: string;
  price?: number;
}

interface TransactionHistoryListProps {
  txHistoryList: ITransactionHistory[];
}

const Container = styled.div`
  width: 46rem;

  @media screen and (max-width: 768px) {
    width: 32rem;
  }
`;

const TableHeader = styled.div`
  display: flex;
  font-weight: 600;
  font-size: 1rem;
  border-bottom: solid 1px #6667AB;
  padding: 1rem 0;
`;

const TableRow = styled.div`
  display: flex;
  font-size: 0.8rem;
  font-weight: 500;
  border-bottom: solid 1px #6667AB;
  height: 5rem;
  align-items: center;
`;

const TableBlock = styled.div<{ width: string }>`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  width: ${props => props.width};
`;

const TableCell = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin: auto;
`;

export const TransactionHistoryList = ({ txHistoryList }: TransactionHistoryListProps) => {
  const isPc = useMediaQuery({ minWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 500 });
  const viewMode = isPc ? 'trade'
    : isTablet ? 'trade'
    : 'tradeM'
    
  return (
    <Container>
      <TableHeader>
        <TableBlock width='15%'>거래 종류</TableBlock>
        <TableBlock width='25%'>작품</TableBlock>
        <TableBlock width='15%'>거래 일시</TableBlock>
        <TableBlock width='15%'>보낸 사람</TableBlock>
        <TableBlock width='15%'>받은 사람</TableBlock>
        <TableBlock width='15%'>가격</TableBlock>
      </TableHeader>

      {txHistoryList.map((txHistory) => (
        <TableRow key={ txHistory.transactionHash }>
          <TableBlock width='15%'>
            <TableCell>{txHistory.transactionType}</TableCell>
          </TableBlock>

          <TableBlock width='25%'>
            <Image
              imageUrl={txHistory.item.itemImgUrl}
              name={txHistory.item.itemTitle}
              mode={viewMode}
            ></Image>
            <TableCell>{txHistory.item.itemTitle}</TableCell>
          </TableBlock>

          <TableBlock width='15%'>
            <TableCell>{txHistory.transactionTime}</TableCell>
          </TableBlock>
          <TableBlock width='15%'>
            <TableCell>{txHistory.from}</TableCell>
          </TableBlock>
          <TableBlock width='15%'>
            <TableCell>{txHistory.to}</TableCell>
          </TableBlock>
          <TableBlock width='15%'>
            <TableCell>{txHistory.price ? `${txHistory.price} ETH` : ''}</TableCell>
          </TableBlock>
        </TableRow>
      ))}
    </Container>
  );
};


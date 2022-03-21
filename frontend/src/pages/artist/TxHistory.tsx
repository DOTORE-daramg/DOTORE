import React from "react";
import styled from 'styled-components';
import { ITransactionHistory, TransactionHistoryList } from "../../stories/artist/TransactionHistoryList";

const transactionHistoryList: ITransactionHistory[] = [
  {
    transactionHash: '0x1245',
    transactionType: 'minting',
    item: {
      itemImgUrl: 'https://yt3.ggpht.com/ytc/AKedOLTT6MEPkgOn6WLc_ibsb4hrq-qTVi5DFk_kD5DL=s900-c-k-c0x00ffffff-no-rj',
      itemTitle: '보석을 훔친 펭귄xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    },
    transactionTime: '2022-03-21',
    from: '',
    to: '주비스',
  },
  {
    transactionHash: '0x1ab3',
    transactionType: 'transfer',
    item: {
      itemImgUrl: 'https://yt3.ggpht.com/ytc/AKedOLTT6MEPkgOn6WLc_ibsb4hrq-qTVi5DFk_kD5DL=s900-c-k-c0x00ffffff-no-rj',
      itemTitle: '보석을 훔친 펭귄',
    },
    transactionTime: '2022-03-21',
    from: '주비스',
    to: '한지희',
  },
  {
    transactionHash: '0x284b',
    transactionType: 'sale',
    item: {
      itemImgUrl: 'https://yt3.ggpht.com/ytc/AKedOLTT6MEPkgOn6WLc_ibsb4hrq-qTVi5DFk_kD5DL=s900-c-k-c0x00ffffff-no-rj',
      itemTitle: '보석을 훔친 펭귄',
    },
    transactionTime: '2022-03-21',
    from: '주비스',
    to: '한지희xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    price: 0.4,
  }
]


const Container = styled.div`
  width: 64rem;
  display: flex;
  margin: auto;
  padding: 5rem 0;
  justify-content: center;
  @media screen and (max-width: 1200px) {
    width: 40rem;
  }
  @media screen and (max-width: 500px) {
    width: 35rem;
  }
`;

const TxHistory = () => {
  return (
    <Container>
      <TransactionHistoryList txHistoryList={transactionHistoryList}></TransactionHistoryList>
    </Container>
  );
};

export default TxHistory;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import {
  ITransactionHistory,
  TransactionHistoryList,
} from "../../stories/artist/TransactionHistoryList";
import {
  transactionRecordTypes,
  userTxRecord,
} from "../../contracts/api/transactionRecord";
import { useParams } from 'react-router-dom';

const transactionHistoryList: ITransactionHistory[] = [
  {
    transactionHash: "0x1245",
    transactionType: "minting",
    item: {
      itemImgUrl:
        "https://yt3.ggpht.com/ytc/AKedOLTT6MEPkgOn6WLc_ibsb4hrq-qTVi5DFk_kD5DL=s900-c-k-c0x00ffffff-no-rj",
      itemTitle:
        "보석을 훔친 펭귄xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    },
    transactionTime: "2022-03-21",
    from: "",
    to: "주비스",
  },
  {
    transactionHash: "0x1ab3",
    transactionType: "transfer",
    item: {
      itemImgUrl:
        "https://yt3.ggpht.com/ytc/AKedOLTT6MEPkgOn6WLc_ibsb4hrq-qTVi5DFk_kD5DL=s900-c-k-c0x00ffffff-no-rj",
      itemTitle: "보석을 훔친 펭귄",
    },
    transactionTime: "2022-03-21",
    from: "주비스",
    to: "한지희",
  },
  {
    transactionHash: "0x284b",
    transactionType: "sale",
    item: {
      itemImgUrl:
        "https://yt3.ggpht.com/ytc/AKedOLTT6MEPkgOn6WLc_ibsb4hrq-qTVi5DFk_kD5DL=s900-c-k-c0x00ffffff-no-rj",
      itemTitle: "보석을 훔친 펭귄",
    },
    transactionTime: "2022-03-21",
    from: "주비스",
    to: "한지희xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    price: 0.4,
  },
];

const Container = styled.div`
  width: 100%;
  display: flex;
  margin: auto;
  padding: 5rem 0;
  justify-content: center;
  @media screen and (max-width: 768px) {
    padding: 3rem 0;
  }
`;

const TxHistory = () => {
  const isPc = useMediaQuery({ minWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 500 });
  const width = isPc ? "80rem" : isTablet ? "32rem" : "24rem";
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [transactionRecord, setTransactionRecord] =
    useState<transactionRecordTypes[]>();
    const { userAddress } = useParams();
  useEffect(() => {
    if (!isLoading && userAddress) {
      userTxRecord(userAddress).then((res) => {
        console.log(res);
        setTransactionRecord(res);
        setIsLoading(true);
      })
    }
  }, [isLoading]);
  return (
    <Container>
      {isLoading && transactionRecord && transactionRecord.length !== 0 && (
        <TransactionHistoryList
          txHistoryList={transactionRecord}
          width={width}
        ></TransactionHistoryList>
      )}
    </Container>
  );
};

export default TxHistory;

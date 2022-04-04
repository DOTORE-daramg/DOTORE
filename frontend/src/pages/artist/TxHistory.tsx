import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import {
  ITransactionHistory,
  TransactionHistoryList,
} from "../../stories/artist/TransactionHistoryList";
import {
  getTimeStamp,
  saleFromTx,
  saleToTx,
  userFromTx,
  userToTx,
} from "../../contracts/api/transactionRecord";
import { useParams } from "react-router-dom";

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
  const [isTxLoading, setIsTxLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSort, setIsSort] = useState<boolean>(false);
  const [isMakeTimeStamp, setIsMakeTimeStamp] = useState<boolean>(false);
  const [res1, setRes1] = useState<any[]>([]);
  const [res2, setRes2] = useState<any[]>([]);
  const [res3, setRes3] = useState<any[]>([]);
  const [res4, setRes4] = useState<any[]>([]);
  const [res5, setRes5] = useState<any[]>([]);
  const { userAddress } = useParams();
  // const userAddress = "0x46CCa77125508995b14cD6355e994Ac2949E8B47";

  // 블록체인에서 데이터 불러옴
  useEffect(() => {
    if (userAddress)
      Promise.resolve()
        .then(() =>
          userToTx(userAddress).then((res) => {
            setRes1(res);
          })
        )
        .then(() =>
          userFromTx(userAddress).then((res) => {
            setRes2(res);
          })
        )
        .then(() =>
          saleToTx(userAddress).then((res) => {
            setRes3(res);
          })
        )
        .then(() =>
          saleFromTx(userAddress).then((res) => {
            setRes4(res);
          })
        )
        .then(() => setIsTxLoading(true));
  }, []);

  useEffect(() => {
    if (isTxLoading) {
      let temp: any[] = [];
      console.log(">>>>>>>>>>>>>>>>>>>>>>", res1, res2, res3, res4);
      [...res1, ...res2, ...res3, ...res4].map(async (data) => {
        temp.push({
          ...data,
          timeStamp: await getTimeStamp(data.blockHash),
        });
      });
      setTimeout(() => {
        setRes5(temp.sort((a, b) => b.timeStamp - a.timeStamp));
        setIsMakeTimeStamp(true);
      }, 100);
    }
  }, [isTxLoading]);

  useEffect(() => {
    if (isMakeTimeStamp) {
      console.log(res5);
      setIsSort(true);
    }
  }, [isMakeTimeStamp]);

  // useEffect(() => {
  //   console.log("isLoading", isLoading);
  //   if (isLoading) {
  //     setIsSort(true);
  //   }
  // }, [isLoading]);
  return (
    <Container>
      {isSort && res5.length > 0 && (
        <TransactionHistoryList
          txHistoryList={res5}
          width={width}
        ></TransactionHistoryList>
      )}
    </Container>
  );
};

export default TxHistory;

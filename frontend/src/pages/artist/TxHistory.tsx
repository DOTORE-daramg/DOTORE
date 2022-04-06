import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { TransactionHistoryList } from "../../stories/artist/TransactionHistoryList";
import {
  getTimeStamp,
  saleFromTx,
  saleToTx,
  userFromTx,
  userToTx,
} from "../../contracts/api/transactionRecord";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../stories/common/LoadingSpinner";

const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 2rem 0;
  justify-content: center;
  @media screen and (max-width: 768px) {
    padding: 1rem 0;
  }
`;

const TxHistory = () => {
  const isPc = useMediaQuery({ minWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 500 });
  const width = isPc ? "60rem" : isTablet ? "28rem" : "60rem";
  const [isTxLoading, setIsTxLoading] = useState<boolean>(false);
  const [isSort, setIsSort] = useState<boolean>(false);
  const [isMakeTimeStamp, setIsMakeTimeStamp] = useState<boolean>(false);
  const [res1, setRes1] = useState<any[]>([]);
  const [res2, setRes2] = useState<any[]>([]);
  const [res3, setRes3] = useState<any[]>([]);
  const [res4, setRes4] = useState<any[]>([]);
  const [res5, setRes5] = useState<any[]>([]);
  const { userAddress } = useParams();

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
      [...res1, ...res2, ...res3, ...res4].map(async (data) => {
        temp.push({
          ...data,
          timeStamp: await getTimeStamp(data.blockHash),
        });
      });
      setTimeout(() => {
        setRes5(temp.sort((a, b) => b.timeStamp - a.timeStamp));
        setIsMakeTimeStamp(true);
      }, 500);
    }
  }, [isTxLoading]);

  useEffect(() => {
    if (isMakeTimeStamp) {
      setIsSort(true);
    }
  }, [isMakeTimeStamp]);

  return (
    <Container>
      {!isSort && <LoadingSpinner />}
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

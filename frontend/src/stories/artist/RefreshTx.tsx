import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { userInfoState, userInfoTypes } from "../..";
import { getProgressTx } from "../../api/item";
import { getPendingSale } from "../../api/sale";
import { checkMintDoneTx, checkSaleDoneTx } from "../../contracts/api/mypage";
import { Icon } from "../common/Icon";

const RefreshIcon = styled.div<{ width: string }>`
  display: flex;
  align-items: center;
  justify-content: end;
  margin-bottom: 30px;
  width: ${(props) => (props.width ? props.width : "")};
`;

interface RefreshTxProps {
  gridSize: string;
  setIsLoading: (args: boolean) => void;
}

export const RefreshTx = ({ gridSize, setIsLoading }: RefreshTxProps) => {
  const userInfo = useRecoilValue<userInfoTypes>(userInfoState);

  const onRefreshTx = () => {
    // 유저가 민팅 pending 중인 트랜잭션 목록 갱신
    getProgressTx(userInfo.address).then((res) => {
      const data: any[] = res.data.data;
      if (data.length === 0) return;
      data.map((TxHash: any) => checkMintDoneTx(TxHash.itemTrxHash));
    });
    // 유저가 판매 등록 pending중인 판매 트랜잭션 목록 갱신
    getPendingSale(userInfo.address).then((res) => {
      const txList = res.data.data;
      if (txList.length === 0) return;
      txList.map((txhash: any) =>
        checkSaleDoneTx(txhash.saleTrxHash, userInfo.address, txhash.tokenId)
      );
    });
    setIsLoading(true);
  };
  return (
    <RefreshIcon width={gridSize}>
      <div onClick={onRefreshTx}>
        <Icon mode="fas" icon="arrows-rotate" size="24px" color="#6667AB" />
      </div>
    </RefreshIcon>
  );
};

import { useEffect, useState } from "@storybook/addons";
import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { userInfoState, userInfoTypes } from "../..";
import { getProgressTx } from "../../api/item";
import { CheckDoneTx } from "../../contracts/api/mypage";
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
    getProgressTx(userInfo.address).then((res) => {
      const data: string[] = res.data.data;
      if (data.length === 0) return;
      data.map((TxHash: string) => CheckDoneTx(TxHash));
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

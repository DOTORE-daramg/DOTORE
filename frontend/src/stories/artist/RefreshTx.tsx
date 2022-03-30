import React from "react";
import styled from "styled-components";
import { Icon } from "../common/Icon";

const RefreshIcon = styled.div<{ width: string }>`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 10px;
  margin-bottom: 30px;
  width: ${(props) => (props.width ? props.width : "")};
`;

interface RefreshTxProps {
  gridSize: string;
}

export const RefreshTx = ({ gridSize }: RefreshTxProps) => {
  const onRefreshTx = () => {
    console.log(">>>>>>>>>>");
  };
  return (
    <RefreshIcon width={gridSize}>
      <div>refresh</div>
      <div onClick={onRefreshTx}>
        <Icon mode="fas" icon="arrows-rotate" size="24px" color="#6667AB" />
      </div>
    </RefreshIcon>
  );
};

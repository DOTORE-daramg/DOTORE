import React from "react";
import styled from "styled-components";
import { Icon } from "../common/Icon";
import Skeleton from "./Skeleton";

const Container = styled.div<ItemSkeletonProps>`
  width: ${(props) => (props.width ? props.width : "fit-content")};
  height: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;

const TextContainer = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const AmountContainer = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 768px) {
    width: 50%;
  }
`;

interface ItemSkeletonProps {
  width?: string;
}
const ItemSkeleton = ({ width }: ItemSkeletonProps) => {
  return (
    <Container>
      <Skeleton width={width} height="12.5rem" />
      <TextContainer>
        <Skeleton width={width} height="2rem" />
        <Skeleton width="7rem" height="1.5rem" />
      </TextContainer>
      <AmountContainer>
        <Icon style="fas" icon="download" color="#6667ab" />
        <Skeleton width="1.5rem" height="1.5rem" />
        <Icon style="fas" icon="heart" color="#6667ab" />
        <Skeleton width="1.5rem" height="1.5rem" />
      </AmountContainer>
    </Container>
  );
};

export default ItemSkeleton;

import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import { Icon } from "../common/Icon";
import Skeleton from "./Skeleton";

const Container = styled.div<ItemSkeletonProps>`
  width: ${(props) => (props.width ? props.width : "fit-content")};
  height: 21rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  padding: 25px 25px;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  @media screen and (max-width: 1300px) {
    height: 16.6rem;
  }
  @media screen and (max-width: 768px) {
    height: 21.5rem;
  }
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
  const isPc = useMediaQuery({ minWidth: 1300 });
  const isTablet = useMediaQuery({ minWidth: 768 });

  return (
    <Container>
      <Skeleton
        width={width}
        height={isPc ? "12.5rem" : isTablet ? "8rem" : "10rem"}
      />
      <TextContainer>
        <Skeleton width={width} height={isPc ? "2rem" : "1.5rem"} />
        <Skeleton width="7rem" height={isPc ? "1.5rem" : "1.5rem"} />
      </TextContainer>
      <AmountContainer>
        <Icon mode="fas" icon="download" color="#6667ab" />
        <Skeleton width="1.5rem" height={isPc ? "1.5rem" : "1rem"} />
        <Icon mode="fas" icon="heart" color="#6667ab" />
        <Skeleton width="1.5rem" height={isPc ? "1.5rem" : "1rem"} />
      </AmountContainer>
    </Container>
  );
};

export default ItemSkeleton;

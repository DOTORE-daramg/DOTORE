import { motion } from "framer-motion";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "../common/Icon";
import { Image } from "../detail/Image";

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  cursor: pointer;
  padding: 25px 25px;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const TextContainer = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 10px;
`;

const AmountContainer = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  @media screen and (max-width: 768px) {
    width: 50%;
  }
`;

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Amount = styled.div`
  font-size: 1rem;
`;

const OnSale = styled.div`
  position: absolute;
  font-size: 0.8rem;
  border-radius: 10px;
  padding: 5px 10px;
  background-color: #d1d1e6;
`;
export interface ItemProps {
  itemHash: string;
  itemTitle: string;
  nickname: string;
  download: number;
  like: number;
  tokenId: string;
  onSaleYn: boolean;
}

const Item = ({
  itemHash,
  itemTitle,
  nickname,
  download,
  like,
  tokenId,
  onSaleYn,
}: ItemProps) => {
  const isPc = useMediaQuery({ minWidth: 1300 });
  const isTablet = useMediaQuery({ minWidth: 1000 });
  const viewMode = isPc ? "list" : isTablet ? "listM" : "listM";
  const navigate = useNavigate();

  return (
    <Container
      whileHover={{
        scale: 1.03,
      }}
      onClick={() => navigate(`/detail/${tokenId}`)}
    >
      {onSaleYn && <OnSale>구매 가능</OnSale>}
      <Image mode={viewMode} imageUrl={itemHash} name={itemTitle} />
      <TextContainer>
        <Title>{itemTitle}</Title>
        <Amount>{nickname}</Amount>
      </TextContainer>
      <AmountContainer>
        <Icon mode="fas" icon="download" color="#6667ab" />
        <Amount>{download}</Amount>
        <Icon mode="fas" icon="heart" color="#6667ab" />
        <Amount>{like}</Amount>
      </AmountContainer>
    </Container>
  );
};

export default Item;

import React from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import { Icon } from "../common/Icon";
import { Image } from "../detail/Image";

const Container = styled.div`
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
  justify-content: flex-start;
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

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Amount = styled.div`
  font-size: 1rem;
`;

interface ItemProps {
  imgUrl: string;
  title: string;
  nickname: string;
  download: number;
  like: number;
}
const Item = ({ imgUrl, title, nickname, download, like }: ItemProps) => {
  const isPc = useMediaQuery({ minWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 500 });
  const viewMode = isPc ? "list" : isTablet ? "list" : "listM";

  return (
    <Container>
      <Image mode={viewMode} imageUrl={imgUrl} name={title} />
      <TextContainer>
        <Title>{title}</Title>
        <Amount>{nickname}</Amount>
      </TextContainer>
      <AmountContainer>
        <Icon style="fas" icon="download" color="#6667ab" />
        <Amount>{download}</Amount>
        <Icon style="fas" icon="heart" color="#6667ab" />
        <Amount>{like}</Amount>
      </AmountContainer>
    </Container>
  );
};

export default Item;

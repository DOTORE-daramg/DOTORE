import React from "react";
import styled from "styled-components";
import { Button } from "../stories/Button";
import { Amount } from "../stories/common/Amount";
import { Badge } from "../stories/common/Badge";
import { Icon } from "../stories/common/Icon";
import { Description } from "../stories/detail/Description";
import { Image } from "../stories/detail/Image";
import Skeleton from "../stories/list/Skeleton";
import { Title } from "../stories/Title";

const Container = styled.div`
  width: 100%;
  padding: 100px 2rem;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 60px 20px;
  }
`;

const MainContainer = styled.div`
  width: 100%;
  padding-top: 60px;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const DescContainer = styled.div`
  width: 28rem;
  padding: 10px 0;
  padding-left: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    justify-content: center;
    width: 90%;
    padding: 0;
    padding-top: 20px;
  }
`;

const BadgeContainer = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  @media screen and (max-width: 768px) {
    width: 80%;
  }
`;

const BuyContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`;

const AmountContainer = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-between;
`;

const Detail = () => {
  return (
    <Container>
      <Title label="2차 NFT" size="2rem" />
      <MainContainer>
        <Image
          name="메타콩즈1"
          imageUrl="https://cdn.apnews.kr/news/photo/202203/3000347_20366_1256.jpg"
        />
        <DescContainer>
          <Description
            title="안경 쓴 늑대가 담배 피우고 있는 작품 이름"
            descrition="의사 가운을 입고 있는 건가 봐요<br>
          폭죽이랑 활을 들고 있네요..<br>
          정말 알 수 없는 작품입니다<br>
          늑대인지 개인지 소닉인지.."
            profileImgUrl="https://m.secondmorning.co.kr/file_data/secondmorning/2020/11/11/e712578d88cb3d9ca67bfe33405aee6c.jpg"
            profileNickname="주비스"
            profileLevel="Lv.2 꼬맹이도토리"
            size="fit-content"
          />
          <BadgeContainer>
            <Badge label="도토리" />
            <Badge label="해시태그어쩌구" />
            <Badge label="메타버스" />
          </BadgeContainer>
          <BuyContainer>
            <AmountContainer>
              <Amount
                style="fas"
                icon="heart"
                count={150}
                iconColor="#6667ab"
              />
              {/* 1차 NFT시 (fas)download, 2차 NFT시 (fab)ethereum */}
              <Amount
                style="fab"
                icon="ethereum"
                count={0.03}
                iconColor="#6667ab"
              />
            </AmountContainer>
            <Button width="7rem" label="구매 가능" backgroundColor="#6667ab" />
          </BuyContainer>
        </DescContainer>
      </MainContainer>
    </Container>
  );
};

export default Detail;

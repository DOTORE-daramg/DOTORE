import React from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import { Button } from "../stories/Button";
import { Amount } from "../stories/common/Amount";
import { Badge } from "../stories/common/Badge";
import { Icon } from "../stories/common/Icon";
import { Description } from "../stories/detail/Description";
import { Image } from "../stories/detail/Image";
import Info from "../stories/detail/Info";
import RelatedNFT from "../stories/detail/RelatedNFT";
import Transaction from "../stories/detail/Transaction";
import Skeleton from "../stories/list/Skeleton";
import { Title } from "../stories/Title";

const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 0;
`;

const TitleContainer = styled.div`
  width: calc(28rem + 350px);
  display: flex;
  justify-content: flex-start;
  padding-bottom: 30px;
  @media screen and (max-width: 768px) {
    padding: 0 0 60px 0;
    justify-content: center;
  }
`;

const MainContainer = styled.div`
  width: 100%;
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
    width: 80%;
    padding: 0;
    padding-top: 40px;
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

const DetailContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const InfoContainer = styled.div`
  width: 350px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 5rem;
  @media screen and (max-width: 768px) {
    justify-content: space-around;
    margin-left: 0;
  }
`;

const Detail = () => {
  const relatedNFTs = [
    {
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/20150302_49/1eunnue_1425222085350UyECd_JPEG/%BC%D5%B1%D7%B8%B2_%2814%29.jpg?type=w2",
      itemTitle: "다람쥐",
      itemAddress: "1",
    },
    {
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/20150302_49/1eunnue_1425222085350UyECd_JPEG/%BC%D5%B1%D7%B8%B2_%2814%29.jpg?type=w2",
      itemTitle: "다람쥐2",
      itemAddress: "2",
    },
    {
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/20150302_49/1eunnue_1425222085350UyECd_JPEG/%BC%D5%B1%D7%B8%B2_%2814%29.jpg?type=w2",
      itemTitle: "다람쥐",
      itemAddress: "3",
    },
    {
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/20150302_49/1eunnue_1425222085350UyECd_JPEG/%BC%D5%B1%D7%B8%B2_%2814%29.jpg?type=w2",
      itemTitle: "다람쥐",
      itemAddress: "4",
    },
  ];

  const transacrions = [
    {
      date: "거래 일시",
      seller: "판매자",
      buyer: "소유자",
      price: "가격",
    },
    {
      date: "2022-03-12",
      seller: "제진명",
      buyer: "인주비",
      price: "1,000,000 KRW",
    },
    {
      date: "2022-03-12",
      seller: "인주비",
      buyer: "한지희",
      price: "1,500,000 KRW",
    },
  ];

  const isPc = useMediaQuery({ minWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 500 });
  const viewMode = isPc ? "detail" : isTablet ? "detail" : "detailM";

  return (
    <Container>
      <TitleContainer>
        <Title label="2차 NFT" size="2rem" />
      </TitleContainer>
      {/* 상단 정보 Container */}
      <MainContainer>
        <Image
          name="메타콩즈1"
          imageUrl="https://cdn.apnews.kr/news/photo/202203/3000347_20366_1256.jpg"
          mode={viewMode}
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

      {/* 하단 정보 컨테이너 시작 */}
      <DetailContainer>
        <RelatedNFT relatedNFTs={relatedNFTs} />
        <InfoContainer>
          <Transaction transacrions={transacrions} />
          <Info address="0x48366...037453" tokenId="2" standard="ERC-721" />
        </InfoContainer>
      </DetailContainer>
    </Container>
  );
};

export default Detail;

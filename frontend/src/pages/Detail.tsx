import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getItem, getRelatedItem } from "../api/item";
import { Button } from "../stories/Button";
import { Amount } from "../stories/common/Amount";
import { Badge } from "../stories/common/Badge";
import { Icon } from "../stories/common/Icon";
import { Description } from "../stories/detail/Description";
import { Image } from "../stories/detail/Image";
import Info from "../stories/detail/Info";
import Questions from "../stories/detail/Questions";
import { RealtedNFTItemProps } from "../stories/detail/RealtedNFTItem";
import RelatedNFT from "../stories/detail/RelatedNFT";
import { SaleModal } from "../stories/detail/SaleModal";
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
    width: 300px;
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
  width: 35%;
  display: flex;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  width: 55%;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    width: 50%;
  }
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

const QuestionContainer = styled.div`
  width: 350px;
  height: 400px;
  margin-left: 5rem;
  @media screen and (max-width: 768px) {
    /* justify-content: space-around; */
    margin-left: 0;
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

const SaleContainer = styled.div`
  width: calc(28rem + 350px);
  background-color: rgba(102, 103, 171, 0.3);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  padding: 20px;
  margin-top: 20px;
  div {
    margin-left: 10px;
  }
  #link {
    margin-left: 5px;
    cursor: pointer;
  }
  #link :hover {
    color: rgba(102, 103, 171, 1);
  }
`;
type item = {
  item_title: string;
  item_hash: string;
  nickname: string;
  like: number;
  download: number;
  item_description: string;
  is_first: boolean;
  tags: string[];
};

const Detail = () => {
  // const relatedNFTs = [
  //   {
  //     imageUrl:
  //       "https://mblogthumb-phinf.pstatic.net/20150302_49/1eunnue_1425222085350UyECd_JPEG/%BC%D5%B1%D7%B8%B2_%2814%29.jpg?type=w2",
  //     itemTitle: "다람쥐",
  //     itemAddress: "1",
  //   },
  //   {
  //     imageUrl:
  //       "https://mblogthumb-phinf.pstatic.net/20150302_49/1eunnue_1425222085350UyECd_JPEG/%BC%D5%B1%D7%B8%B2_%2814%29.jpg?type=w2",
  //     itemTitle: "다람쥐2",
  //     itemAddress: "2",
  //   },
  //   {
  //     imageUrl:
  //       "https://mblogthumb-phinf.pstatic.net/20150302_49/1eunnue_1425222085350UyECd_JPEG/%BC%D5%B1%D7%B8%B2_%2814%29.jpg?type=w2",
  //     itemTitle: "다람쥐",
  //     itemAddress: "3",
  //   },
  //   {
  //     imageUrl:
  //       "https://mblogthumb-phinf.pstatic.net/20150302_49/1eunnue_1425222085350UyECd_JPEG/%BC%D5%B1%D7%B8%B2_%2814%29.jpg?type=w2",
  //     itemTitle: "다람쥐",
  //     itemAddress: "4",
  //   },
  // ];

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

  const questions = [
    {
      articleno: 1,
      answerYN: false,
      nickname: "다람쥐_02",
      desc: "도토리 색 조합에 대해 질문...",
    },
    {
      articleno: 2,
      answerYN: true,
      nickname: "다람쥐_01",
      desc: "질문 있습니다!",
    },
  ];
  const isPc = useMediaQuery({ minWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 500 });
  const viewMode = isPc ? "detail" : isTablet ? "detail" : "detailM";
  const [isLoading, setIsLoading] = useState(true);
  // 처음 렌더링 할 때 isFirst값 가져와서 저장해 줘야 함
  const [isFirst, setIsFirst] = useState(false);
  // 2차 NFT의 경우 구매 가능, 불가능으로 나뉜다
  const [isSale, setIsSale] = useState(true);
  // 2차 NFT의 경우 해당 NFT의 소유자일 때 판매 등록, 취소 할 수 있게
  const [isOwner, setIsOwner] = useState(true);
  const [item, setItem] = useState<item>({
    item_title: "",
    item_hash: "",
    nickname: "",
    like: 0,
    download: 0,
    item_description: "",
    is_first: true,
    tags: [],
  });
  const {
    item_title,
    item_hash,
    nickname,
    like,
    download,
    item_description,
    tags,
  } = item;

  const [relatedNFTs, setRelatedNFTs] = useState<RealtedNFTItemProps[]>();
  const [isModalShow, setIsModalShow] = useState(false);
  const onClickToggleModal = () => {
    setIsModalShow((prev) => !prev);
    console.log("toggle!");
  };

  const { tokenId } = useParams();
  useEffect(() => {
    if (isLoading) {
      getItem(tokenId).then((res) => {
        setItem(res.data);
        setIsFirst(res.data.is_first);
        setIsSale(res.data.on_sale_yn);
      });
      getRelatedItem(tokenId).then((res) => {
        setRelatedNFTs(res.data.data);
      });
    }
  }, [tokenId]);

  return (
    <Container>
      <TitleContainer>
        {isFirst ? (
          <Title label="1차 NFT" size="2rem" />
        ) : (
          <Title label="2차 NFT" size="2rem" />
        )}
      </TitleContainer>
      {/* 상단 정보 Container */}
      <MainContainer>
        <Image
          name="메타콩즈1"
          // imageUrl={item_hash}
          imageUrl="https://cdn.apnews.kr/news/photo/202203/3000347_20366_1256.jpg"
          mode={viewMode}
        />
        <DescContainer>
          <Description
            title={item_title}
            descrition={item_description}
            profileImgUrl="https://m.secondmorning.co.kr/file_data/secondmorning/2020/11/11/e712578d88cb3d9ca67bfe33405aee6c.jpg"
            profileNickname={nickname}
            profileLevel="Lv.2 꼬맹이도토리"
            size="fit-content"
          />
          <BadgeContainer>
            {tags &&
              tags.map((tag, index) => <Badge label={tag} key={index} />)}
          </BadgeContainer>
          <BuyContainer>
            <AmountContainer>
              <Amount
                style="fas"
                icon="heart"
                count={like}
                iconColor="#6667ab"
              />
              {/* 1차 NFT시 (fas)download, 2차 NFT시 (fab)ethereum */}
              {isFirst ? (
                <Amount
                  style="fas"
                  icon="download"
                  count={download}
                  iconColor="#6667ab"
                />
              ) : (
                <Amount
                  style="fab"
                  icon="ethereum"
                  count={0.03}
                  iconColor="#6667ab"
                />
              )}
            </AmountContainer>
            {isFirst && (
              <ButtonContainer>
                <Button
                  width="6.3rem"
                  label="질문 등록"
                  backgroundColor="#6667ab"
                />
                <Button
                  width="6rem"
                  label="다운로드"
                  backgroundColor="#6667ab"
                />
              </ButtonContainer>
            )}
            {!isFirst && isSale && (
              <Button
                width="7rem"
                label="구매 가능"
                backgroundColor="#6667ab"
              />
            )}
            {!isFirst && !isSale && (
              <Button
                width="8rem"
                label="구매 불가능"
                backgroundColor="#a09fae"
              />
            )}
          </BuyContainer>
        </DescContainer>
      </MainContainer>

      {isOwner && !isFirst && !isSale && (
        <>
          <SaleContainer>
            <Icon style="fas" icon="circle-exclamation" />
            <div>아직 작품의 판매가 시작되지 않았어요. 판매 등록을 할까요?</div>
            <div id="link" onClick={onClickToggleModal}>
              <Icon style="fas" icon="right-long" />
            </div>
          </SaleContainer>
        </>
      )}

      {isOwner && !isFirst && isSale && (
        <>
          <SaleContainer>
            <Icon style="fas" icon="circle-exclamation" />
            <div>
              작품이 0.03eth에 판매 등록되어 있습니다. 거래를 취소하거나 가격을
              바꿀까요?
            </div>
            <div id="link" onClick={onClickToggleModal}>
              <Icon style="fas" icon="right-long" />
            </div>
          </SaleContainer>
        </>
      )}

      {isModalShow && (
        <SaleModal
          imageUrl="https://cdn.apnews.kr/news/photo/202203/3000347_20366_1256.jpg"
          onClose={onClickToggleModal}
        />
      )}

      {/* 하단 정보 컨테이너 시작 */}
      <DetailContainer>
        {relatedNFTs && <RelatedNFT relatedNFTs={relatedNFTs} />}
        {isFirst ? (
          <QuestionContainer>
            <Questions questions={questions} />
          </QuestionContainer>
        ) : (
          <InfoContainer>
            <Transaction transacrions={transacrions} />
            <Info address="0x48366...037453" tokenId="2" standard="ERC-721" />
          </InfoContainer>
        )}
      </DetailContainer>
    </Container>
  );
};

export default Detail;

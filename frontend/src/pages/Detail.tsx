import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getFeedbacks } from "../api/item";
import { getItem, getRelatedItem } from "../api/item";
import { Button } from "../stories/Button";
import { Amount } from "../stories/common/Amount";
import { Badge } from "../stories/common/Badge";
import { Icon } from "../stories/common/Icon";
import LoadingSpinner from "../stories/common/LoadingSpinner";
import { Description } from "../stories/detail/Description";
import { Image } from "../stories/detail/Image";
import Info from "../stories/detail/Info";
import { QuestionProps } from "../stories/detail/QuestionItem";
import Questions from "../stories/detail/Questions";
import { RealtedNFTItemProps } from "../stories/detail/RealtedNFTItem";
import RelatedNFT from "../stories/detail/RelatedNFT";
import { SaleModal } from "../stories/detail/SaleModal";
import Transaction from "../stories/detail/Transaction";
import Skeleton from "../stories/list/Skeleton";
import { Title } from "../stories/Title";

const LoadContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
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
type Iitem = {
  authorAddress: string;
  itemTitle: string;
  itemHash: string;
  nickname: string;
  like: number;
  download: number;
  itemDescription: string;
  isFirst: boolean;
  tags: string[];
};

const Detail = () => {
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
  const [isLoading, setIsLoading] = useState(true);
  // 처음 렌더링 할 때 isFirst값 가져와서 저장해 줘야 함
  const [isFirst, setIsFirst] = useState(false);
  // 2차 NFT의 경우 구매 가능, 불가능으로 나뉜다
  const [isSale, setIsSale] = useState(true);
  // 2차 NFT의 경우 해당 NFT의 소유자일 때 판매 등록, 취소 할 수 있게
  const [isOwner, setIsOwner] = useState(true);
  const [item, setItem] = useState<Iitem>({
    authorAddress: "",
    itemTitle: "",
    itemHash: "",
    nickname: "",
    like: 0,
    download: 0,
    itemDescription: "",
    isFirst: true,
    tags: [],
  });
  const {
    authorAddress,
    itemTitle,
    itemHash,
    nickname,
    like,
    download,
    itemDescription,
    tags,
  } = item;
  const [relatedNFTs, setRelatedNFTs] = useState<RealtedNFTItemProps[]>();
  const [questions, setQuestions] = useState<QuestionProps[]>();

  const [isModalShow, setIsModalShow] = useState(false);

  const { tokenId } = useParams();
  const navigate = useNavigate();
  const onClickToggleModal = () => {
    setIsModalShow((prev) => !prev);
    console.log("toggle!");
  };

  useEffect(() => {
    setIsLoading(true);

    getItem(tokenId).then((res) => {
      setItem(res.data);
      setIsFirst(res.data.isFirst);
      setIsSale(res.data.onSaleYn);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    });
    getRelatedItem(tokenId).then((res) => {
      setRelatedNFTs(res.data.data);
    });
  }, [tokenId]);

  useEffect(() => {
    if (isFirst) {
      getFeedbacks(tokenId)
        .then((res) => {
          console.log(res);
          setQuestions(res.data.data.slice(-3));
        })
        .catch(() => {
          // setQuestions([
          //   { articleno: -1, yn: false, nickname: "", description: "" },
          // ]);
        });
    }
  }, [isFirst]);
  return (
    <>
      {isLoading && (
        <LoadContainer>
          <LoadingSpinner />
        </LoadContainer>
      )}
      {!isLoading && (
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
              // imageUrl={itemHash}
              imageUrl="https://cdn.apnews.kr/news/photo/202203/3000347_20366_1256.jpg"
              mode={viewMode}
            />
            <DescContainer>
              <Description
                title={itemTitle}
                descrition={itemDescription}
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
                      onClick={() => navigate(`/feedbackcreate/${tokenId}`)}
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
                <div>
                  아직 작품의 판매가 시작되지 않았어요. 판매 등록을 할까요?
                </div>
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
                  작품이 0.03eth에 판매 등록되어 있습니다. 거래를 취소하거나
                  가격을 바꿀까요?
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
                {questions ? (
                  <Questions tokenId={tokenId} questions={questions} />
                ) : (
                  <div>아직 등록된 질문이 없습니다!</div>
                )}
              </QuestionContainer>
            ) : (
              <InfoContainer>
                <Transaction transacrions={transacrions} />
                <Info
                  address="0x48366...037453"
                  tokenId="2"
                  standard="ERC-721"
                />
              </InfoContainer>
            )}
          </DetailContainer>
        </Container>
      )}
    </>
  );
};

export default Detail;

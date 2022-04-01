import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  dislike,
  getFeedbacks,
  getFeedbacksFromMe,
  getIsLike,
} from "../api/item";
import { getItem, getRelatedItem, putLike } from "../api/item";
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
import { Title } from "../stories/Title";
import { Title as SubTitle } from "../stories/detail/Title";
import { useRecoilValue } from "recoil";
import { userInfoState, userInfoTypes } from "..";

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
  padding-left: 60px;
  padding-top: 150px;
  @media screen and (max-width: 768px) {
    padding: 100px 0;
    justify-content: center;
  }
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
  #heart svg {
    stroke: black;
    stroke-width: 20;
    cursor: pointer;
  }
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
const QuestionTitleContainer = styled.div`
  display: flex;
  width: 70%;
  justify-content: space-between;
  margin-bottom: 20px;
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
  const [isOwner, setIsOwner] = useState(false);
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

  // 질문 카테고라이징
  const [isAllQuestions, setIsAllQuestions] = useState<boolean>(true);
  // 좋아요 여부
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isModalShow, setIsModalShow] = useState(false);
  const userInfo = useRecoilValue<userInfoTypes>(userInfoState);

  const { tokenId } = useParams();
  const navigate = useNavigate();

  const onClickToggleModal = () => {
    setIsModalShow((prev) => !prev);
    console.log("toggle!");
  };

  useEffect(() => {
    setIsLoading(true);

    getItem(tokenId).then((res) => {
      const { data } = res;
      const {
        data: { isFirst, onSaleYn, authorAddress },
      } = res;

      setItem(data);
      setIsFirst(isFirst);
      setIsSale(onSaleYn);
      if (authorAddress === userInfo.address) {
        setIsOwner(true);
      } else {
        setIsOwner(false);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 600);
    });
    if (userInfo.address) {
      getIsLike(tokenId, userInfo.address).then((res) => {
        const {
          data: { isLike },
        } = res;
        setIsLike(isLike);
      });
    }
    getRelatedItem(tokenId).then((res) => {
      setRelatedNFTs(res.data.data);
    });
  }, [tokenId]);

  const onClickQuestionCategory = () => {
    if (isAllQuestions) {
      // 내질문으로 바꿔야 함
      getFeedbacksFromMe(tokenId, userInfo.address)
        .then((res) => {
          setQuestions(res.data.data.slice(0, 3));
        })
        .catch(() => {
          // setQuestions();
        });
    } else {
      // 모든 질문으로 바꿔야 함
      getFeedbacks(tokenId).then((res) => {
        setQuestions(res.data.data.slice(0, 3));
      });
    }
    setIsAllQuestions((prev) => !prev);
  };

  const onHeartClick = () => {
    if (userInfo.address) {
      if (isLike) {
        dislike(userInfo.address, tokenId).then((res) => {
          setItem({ ...item, like: res.data.count });
          setIsLike(false);
        });
      } else {
        putLike(userInfo.address, tokenId).then((res) => {
          setItem({ ...item, like: res.data.count });
          setIsLike(true);
        });
      }
    } else {
      alert("로그인 후 가능합니다!");
    }
  };
  useEffect(() => {
    if (isFirst) {
      getFeedbacks(tokenId)
        .then((res) => {
          setQuestions(res.data.data.slice(-3));
        })
        .catch(() => {});
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
            <Image name="메타콩즈1" imageUrl={itemHash} mode={viewMode} />
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
                  {isLike ? (
                    <div onClick={onHeartClick}>
                      <Amount
                        mode="fas"
                        icon="heart"
                        count={like}
                        iconColor="#6667ab"
                      />
                    </div>
                  ) : (
                    <div id="heart" onClick={onHeartClick}>
                      <Amount
                        mode="fas"
                        icon="heart"
                        count={like}
                        iconColor="white"
                      />
                    </div>
                  )}
                  {/* 1차 NFT시 (fas)download, 2차 NFT시 (fab)ethereum */}
                  {isFirst ? (
                    <Amount
                      mode="fas"
                      icon="download"
                      count={download}
                      iconColor="#6667ab"
                    />
                  ) : (
                    <Amount
                      mode="fab"
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
                <Icon mode="fas" icon="circle-exclamation" />
                <div>
                  아직 작품의 판매가 시작되지 않았어요. 판매 등록을 할까요?
                </div>
                <div id="link" onClick={onClickToggleModal}>
                  <Icon mode="fas" icon="right-long" />
                </div>
              </SaleContainer>
            </>
          )}

          {isOwner && !isFirst && isSale && (
            <>
              <SaleContainer>
                <Icon mode="fas" icon="circle-exclamation" />
                <div>
                  작품이 0.03eth에 판매 등록되어 있습니다. 거래를 취소하거나
                  가격을 바꿀까요?
                </div>
                <div id="link" onClick={onClickToggleModal}>
                  <Icon mode="fas" icon="right-long" />
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
                {isAllQuestions ? (
                  <QuestionTitleContainer>
                    <SubTitle title="등록된 질문들" />
                    <SubTitle title="|" color="#999999" />
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={onClickQuestionCategory}
                    >
                      <SubTitle title="내 질문" color="#999999" />
                    </div>
                  </QuestionTitleContainer>
                ) : (
                  <QuestionTitleContainer>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={onClickQuestionCategory}
                    >
                      <SubTitle title="등록된 질문들" color="#999999" />
                    </div>
                    <SubTitle title="|" color="#999999" />
                    <SubTitle title="내 질문" />
                  </QuestionTitleContainer>
                )}
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

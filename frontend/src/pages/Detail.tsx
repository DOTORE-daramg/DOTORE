import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  dislike,
  getFeedbacks,
  getFeedbacksFromMe,
  getIsLike,
  putDownload,
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
import { SaleDeleteModal } from "../stories/detail/SaleDeleteModal";
import Transaction from "../stories/detail/Transaction";
import { Title } from "../stories/Title";
import { Title as SubTitle } from "../stories/detail/Title";
import { useRecoilValue } from "recoil";
import { isLoggedInState, userInfoState, userInfoTypes } from "..";
import { getSale, completeSale } from "../api/sale";
import { web3 } from "../contracts";
import { dTTAddress } from "../contracts/";
import { purchase } from "../contracts/api/second";
import { getLevel } from "../utils/Level";
import { checkSaleDoneTx } from "../contracts/api/mypage";
import { errorAlert, successAlert, warnAlert } from "../stories/common/alert";

export const LoadContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
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
  flex-wrap: wrap;
  gap: 0.5rem;
  /* justify-content: ; */
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
  height: 500px;
  margin-left: 5rem;
  @media screen and (max-width: 768px) {
    /* justify-content: space-around; */
    margin-left: 0;
  }
`;

const InfoContainer = styled.div`
  width: 350px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 5rem;
  padding-bottom: 6rem;
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
  align-items: center;
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
  @media screen and (max-width: 768px) {
    width: 28rem;
    font-size: 1rem;
    line-height: 1.5;
  }
`;
type Iitem = {
  acorn: number;
  authorAddress: string;
  profileImgUrl: string;
  itemTitle: string;
  itemHash: string;
  nickname: string;
  like: number;
  download: number;
  itemDescription: string;
  isFirst: boolean;
  tags: string[];
};

type Isale = {
  saleTrxHash: string;
  cashContractAddress: string;
  completedAt: string;
  price: string;
  result: string;
  saleId: number | undefined;
  saleYn: boolean;
  sellerAddress: string;
  tokenId: number;
  status: string;
};

const Detail = () => {
  const isPc = useMediaQuery({ minWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 500 });
  const viewMode = isPc ? "detail" : isTablet ? "detail" : "detailM";
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [pendingMsg, setPendingMsg] = useState("");
  // 처음 렌더링 할 때 isFirst값 가져와서 저장해 줘야 함
  const [isFirst, setIsFirst] = useState(false);
  // 2차 NFT의 경우 구매 가능, 불가능으로 나뉜다
  const [isSale, setIsSale] = useState(true);
  // 2차 NFT의 경우 해당 NFT의 소유자일 때 판매 등록, 취소 할 수 있게
  const [isOwner, setIsOwner] = useState(false);
  const [saleStatus, setSaleStatus] = useState<Isale>({
    saleTrxHash: "",
    cashContractAddress: "",
    completedAt: "",
    price: "",
    result: "",
    saleId: undefined,
    saleYn: false,
    sellerAddress: "",
    tokenId: 0,
    status: "",
  });
  const [item, setItem] = useState<Iitem>({
    acorn: 0,
    authorAddress: "",
    profileImgUrl: "",
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
    acorn,
    profileImgUrl,
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
  const [isDeleteModalShow, setIsDeleteModalShow] = useState(false);
  const userInfo = useRecoilValue<userInfoTypes>(userInfoState);
  const isLoggedIn = useRecoilValue(isLoggedInState);

  const { tokenId } = useParams<string>();
  const navigate = useNavigate();

  const onClickToggleModal = () => {
    setIsModalShow((prev) => !prev);
  };

  const onClickToggleDeleteModal = () => {
    setIsDeleteModalShow((prev) => !prev);
  };

  useEffect(() => {
    if (isLoading) {
      getItem(tokenId)
        .then((res) => {
          const { data } = res;
          const {
            data: { isFirst, onSaleYn, authorAddress, ownerAddress },
          } = res;
          setItem(data);
          setIsFirst(isFirst);
          setIsSale(onSaleYn);
          if (ownerAddress === userInfo.address) {
            setIsOwner(true);
          } else {
            setIsOwner(false);
          }
        })
        .then(() => setIsLoading(false))
        .catch(() => {
          errorAlert("존재하지 않는 게시물입니다.");
          navigate("/");
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
        if (res.data.data.length > 4) {
          setRelatedNFTs(res.data.data.slice(0, 4));
        } else {
          setRelatedNFTs(res.data.data);
        }
      });
      if (tokenId && !isFirst) {
        getSale(tokenId).then((res) => {
          setSaleStatus(res.data);
        });
      }
      // setTimeout(() => {
      //   setIsLoading(true);
      // }, 600)
    }
  }, [tokenId, isLoading]);

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
      warnAlert("로그인 후 가능합니다!");
    }
  };

  const onClickPurchase = async () => {
    if (!tokenId || isOwner) {
      return;
    }
    if (!isLoggedIn.isLoggedIn) {
      warnAlert("로그인 후 가능합니다!");
    }
    setPendingMsg("구매 중 입니다. 잠시만 기다려주세요.....");
    setIsPending(true);
    purchase({
      tokenId: +tokenId,
      price: saleStatus.price,
      userAddress: userInfo.address,
    })
      .then(() => {
        successAlert("구매에 성공하였습니다!!");
        completeSale(userInfo.address, +tokenId);
        navigate(`/artist/${userInfo.address}`);
      })
      .catch((e) => {
        if (e.code === 4001) {
          errorAlert("구매를 취소하였습니다.");
        } else {
          errorAlert("구매에 실패하였습니다.");
        }
        setIsPending(false);
        setPendingMsg("");
      });
  };

  const onClickDownload = () => {
    if (userInfo.address) {
      window.open(itemHash);
      putDownload(userInfo.address, tokenId).then((res: any) => {
        setItem({ ...item, download: res.data.count });
      });
    } else {
      warnAlert("로그인 후 가능합니다!");
    }
  };

  const onClickQuestion = () => {
    if (!isLoggedIn.isLoggedIn) {
      warnAlert("로그인 후 가능합니다!");
      return;
    }
    navigate(`/feedbackcreate/${tokenId}`);
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
      {isPending ? (
        <LoadContainer>
          <div>{pendingMsg}</div>
          <LoadingSpinner />
        </LoadContainer>
      ) : isLoading ? (
        <LoadContainer>
          <LoadingSpinner />
        </LoadContainer>
      ) : (
        <Container>
          <TitleContainer>
            {isFirst ? (
              <>
                <Title label="1차 NFT" size="2rem" />
              </>
            ) : (
              <Title label="2차 NFT" size="2rem" />
            )}
          </TitleContainer>
          {/* 상단 정보 Container */}
          <MainContainer>
            <Image name={itemTitle} imageUrl={itemHash} mode={viewMode} />
            <DescContainer>
              <Description
                title={itemTitle}
                descrition={itemDescription}
                profileImgUrl={profileImgUrl}
                profileNickname={nickname}
                profileLevel={getLevel(acorn)}
                size="fit-content"
              />
              <BadgeContainer>
                {tags &&
                  tags.map((tag, index) => (
                    <Badge label={tag} key={index} deletable={false} />
                  ))}
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
                      count={+web3.utils.fromWei(saleStatus.price)}
                      iconColor="#6667ab"
                    />
                  )}
                </AmountContainer>
                {isFirst && !isOwner && (
                  <ButtonContainer>
                    <Button
                      width="6.3rem"
                      label="질문 등록"
                      backgroundColor="#6667ab"
                      onClick={onClickQuestion}
                    />
                    <Button
                      width="6rem"
                      label="다운로드"
                      backgroundColor="#6667ab"
                      onClick={onClickDownload}
                    />
                  </ButtonContainer>
                )}
                {isFirst && isOwner && (
                  <Button
                    width="6rem"
                    label="다운로드"
                    backgroundColor="#6667ab"
                    onClick={onClickDownload}
                  />
                )}
                {!isFirst && isSale && (
                  <Button
                    width="7rem"
                    label="구매 가능"
                    backgroundColor="#6667ab"
                    onClick={onClickPurchase}
                  />
                )}
                {!isFirst && !isSale && (
                  <Button
                    width="8rem"
                    label="미판매 상품"
                    backgroundColor="#a09fae"
                  />
                )}
              </BuyContainer>
            </DescContainer>
          </MainContainer>

          {isOwner && !isFirst && !isSale && saleStatus?.status !== "Pending" && (
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

          {!isFirst && !isSale && saleStatus?.status === "Pending" && (
            <>
              <SaleContainer>
                <Icon mode="fas" icon="circle-exclamation" />
                <div>
                  해당 작품이 판매 등록 요청 중입니다. 정보를 갱신 할까요?
                </div>
                <div
                  id="link"
                  onClick={() =>
                    checkSaleDoneTx(
                      saleStatus.saleTrxHash,
                      userInfo.address,
                      tokenId ? +tokenId : 0
                    )
                  }
                >
                  <Icon mode="fas" icon="arrows-rotate" />
                </div>
              </SaleContainer>
            </>
          )}

          {isOwner && !isFirst && isSale && (
            <>
              <SaleContainer>
                <Icon mode="fas" icon="circle-exclamation" />
                <div>
                  작품이 {+web3.utils.fromWei(saleStatus.price)}ETH에 판매
                  등록되어 있습니다. 판매를 취소할까요?
                </div>
                <div id="link" onClick={onClickToggleDeleteModal}>
                  <Icon mode="fas" icon="right-long" />
                </div>
              </SaleContainer>
            </>
          )}

          {/* 하단 정보 컨테이너 시작 */}
          <DetailContainer>
            {relatedNFTs && (
              <RelatedNFT
                setIsLoading={setIsLoading}
                relatedNFTs={relatedNFTs}
              />
            )}
            {isFirst ? (
              <QuestionContainer>
                {!isOwner ? (
                  isAllQuestions ? (
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
                  )
                ) : (
                  <QuestionTitleContainer>
                    <SubTitle title="등록된 질문들" />
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
                <Transaction tokenId={tokenId} />
                <Info
                  address={dTTAddress.slice(0, 30) + "..."}
                  tokenId={tokenId ? tokenId : ""}
                  standard="ERC-721"
                />
              </InfoContainer>
            )}
          </DetailContainer>
          {isModalShow && (
            <SaleModal
              imageUrl={itemHash}
              setIsPending={setIsPending}
              setPendingMsg={setPendingMsg}
              setIsLoading={setIsLoading}
              onClose={onClickToggleModal}
            />
          )}
          {isDeleteModalShow && (
            <SaleDeleteModal
              imageUrl={itemHash}
              onClose={onClickToggleDeleteModal}
              setIsLoading={setIsLoading}
              setIsPending={setIsPending}
              setPendingMsg={setPendingMsg}
            />
          )}
        </Container>
      )}
    </>
  );
};

export default Detail;

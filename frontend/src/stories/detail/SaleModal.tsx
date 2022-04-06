import React, { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { web3 } from "../../contracts";
import { Button } from "../Button";
import { Icon } from "../common/Icon";
import { InputBox } from "../InputBox";
import { Image } from "./Image";
import { createMarketItem } from "../../contracts/api/second";
import { userInfoState } from "../..";
import { useParams } from "react-router-dom";
import { errorAlert, successAlert } from '../common/alert';
import { updateSaleStatus } from '../../api/sale';

const Section = styled.div`
  position: absolute;
  height: 100vh;
  display: flex;
  justify-content: center;
`;
const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10000;
  position: fixed;
  overflow: hidden;
  width: 32rem;
  background: #ffffff;
  box-shadow: 0px 10px 20px rgba(32, 37, 38, 0.1),
    0px 20px 50px rgba(32, 37, 38, 0.1);
  border-radius: 6px;
  @media screen and (max-width: 768px) {
    width: 28rem;
  }
  @media screen and (max-width: 500px) {
    width: 24rem;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  padding: 1rem;
  position: static;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  /* color: #6667AB; */
  h3 {
    /* 내 정보 수정 */
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 2rem;
    /* identical to box height */
    color: #6667ab;
    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 0;
  }
  svg {
    font-size: 1.5rem;
  }
`;
const ModalBorder = styled.div`
  /* border */
  height: 2px;
  background: #f0f1f1;
  width: 100%;
  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 0px 0px;
  height: 2px;
`;

const ModalBody = styled.div`
  /* body text */
  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 2rem 1rem;
  left: 30px;
  top: 81px;
  /* Inside auto layout */
  flex: none;
  order: 2;
  flex-grow: 0;
  margin: 0px 0px;
  .content {
    width: 100%;
    left: 0px;
    top: 30px;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 175%;
    /* or 32px */

    color: #3f575c;

    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 0;
  }
  @media screen and (max-width: 768px) {
    padding: 1rem;
  }
`;

const ImgContainer = styled.div`
  border-radius: 400px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
`;

const InnerContainer = styled.div`
  width: 70%;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  /* justify-content: space-around; */
  div {
    margin-bottom: 20px;
  }
  #info {
    font-size: 0.7rem;
    color: #a09fae;
    margin-left: 15px;
  }
`;

const ModalFooter = styled.div`
  /* footer */
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  background: #f1f1f1;
  padding: 1rem;
  /* Inside auto layout */
  flex: none;
  order: 3;
  flex-grow: 0;
  width: 100%;
  .buttons {
    /* buttons */
    /* Auto layout */
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    /* Inside auto layout */
    flex: none;
    button {
      margin-left: 10px;
      box-shadow: 0px 6px 10px rgba(32, 37, 38, 0.1);
    }
  }
`;

const IconContainer = styled.div`
  cursor: pointer;
`;

const Backdrop = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.3);
`;

export interface ModalProps {
  icon?: string;
  title?: string;
  imageUrl: string;
  onClose: () => void;
  onValidate?: () => void;
  setIsPending: Dispatch<SetStateAction<boolean>>;
  setPendingMsg: Dispatch<SetStateAction<string>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const SaleModal = ({
  title,
  imageUrl,
  onClose,
  onValidate,
  setIsPending,
  setPendingMsg,
  setIsLoading
}: ModalProps) => {
  const userInfo = useRecoilValue(userInfoState);
  const { tokenId } = useParams();
  const [price, setPrice] = useState<string>("");

  const onClickCreateSale = async () => {
    if (!tokenId || tokenId === "0" || !price || !userInfo.address) {
      return;
    }
    const wei = web3.utils.toWei(price);
    setIsPending(true);
    setPendingMsg("판매 등록 중 입니다. 잠시만 기다려주세요...")
    createMarketItem({
      tokenId: tokenId ? parseInt(tokenId) : 0,
      price: wei,
      userAddress: userInfo.address,
    }).then((res) => {
      updateSaleStatus(res.events.MarketItemEvent.returnValues.saleId, res.transactionHash);
      successAlert("판매등록에 성공하였습니다.")
      setIsPending(false);
      setPendingMsg("");
      setIsLoading(true);
    }).catch((e:any) => {
      if(e.code === 4001) {
        errorAlert("판매등록을 취소하였습니다.");
      } else {
        errorAlert("판매등록에 실패하였습니다.");
      }
      setIsPending(false);
      setPendingMsg("");
    });
    onClose();
  };

  const handlePriceChanged = (e: any) => {
    setPrice(e.target.value);
  };
  return (
    <Section>
      <ModalContainer>
        <ModalHeader>
          <h3>NFT 판매 등록</h3>
          <IconContainer onClick={onClose}>
            <Icon mode="fas" icon="xmark" color="#9FABAE" />
          </IconContainer>
        </ModalHeader>
        <ModalBorder></ModalBorder>
        <ModalBody>
          <ImgContainer>
            <Image name="title" mode="listM" imageUrl={imageUrl} />
          </ImgContainer>
          <InnerContainer>
            <div>{title}</div>
            <InputBox
              placeholder="원하는 가격을 등록하세요. 가격: (ETH)"
              width="90%"
              maxLength={30}
              onBlur={handlePriceChanged}
              type="number"
            />
            <div id="info">판매는 언제든지 취소할 수 있습니다.</div>
          </InnerContainer>
        </ModalBody>
        <ModalFooter>
          <div className="buttons">
            <Button
              width="6rem"
              label="취소"
              backgroundColor="#a09fae"
              onClick={onClose}
            />
            <Button
              width="6rem"
              label="등록"
              backgroundColor="#6667AB"
              onClick={onClickCreateSale}
            />
          </div>
        </ModalFooter>
      </ModalContainer>
      <Backdrop onClick={onClose} />
    </Section>
  );
};

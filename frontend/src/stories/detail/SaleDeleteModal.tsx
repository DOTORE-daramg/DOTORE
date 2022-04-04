import React, { useState } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { Button } from "../Button";
import { Icon } from "../common/Icon";
import { Image } from "./Image";
import { userInfoState } from "../..";
import { useParams } from "react-router-dom";
import { getItem } from "../../api/item";
import { cancleSale } from "../../contracts/api/second";

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
  h3 {
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 2rem;
    color: #6667ab;
    flex: none;
    order: 0;
    flex-grow: 0;
  }
  svg {
    font-size: 1.5rem;
  }
`;
const ModalBorder = styled.div`
  height: 2px;
  background: #f0f1f1;
  width: 100%;
  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 0px 0px;
  height: 2px;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 2rem 1rem;
  left: 30px;
  top: 81px;
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
    color: #3f575c;
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
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  background: #f1f1f1;
  padding: 1rem;
  flex: none;
  order: 3;
  flex-grow: 0;
  width: 100%;
  .buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
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
}

export const SaleDeleteModal = ({
  title,
  imageUrl,
  onClose,
  ...props
}: ModalProps) => {
  const userInfo = useRecoilValue(userInfoState);
  const { tokenId } = useParams();

  const onClickDeleteSale = async () => {
    if (!tokenId || tokenId === "0" || !userInfo.address) {
      return;
    }
    // 판매 등록 취소
    onClose();
    try {
      await cancleSale({
        tokenId: parseInt(tokenId),
        userAddress: userInfo.address,
      });
      // 상세 페이지 정보 갱신
      await getItem(tokenId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Section>
      <ModalContainer>
        <ModalHeader>
          <h3>NFT 판매 등록 취소</h3>
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
            정말로 판매 등록 취소하시겠습니까?
          </InnerContainer>
        </ModalBody>
        <ModalFooter>
          <div className="buttons">
            <Button
              width="6rem"
              label="닫기"
              backgroundColor="#a09fae"
              onClick={onClose}
            />
            <Button
              width="6rem"
              label="판매 취소"
              backgroundColor="#6667AB"
              onClick={onClickDeleteSale}
            />
          </div>
        </ModalFooter>
      </ModalContainer>
      <Backdrop onClick={onClose} />
    </Section>
  );
};

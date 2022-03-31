import React, { useState } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { Title } from "../../stories/Title";
import { InputBox, TextAreaBox } from "../../stories/InputBox";
import { FileDropBox } from "../../stories/minting/FileDropBox";
import { Button } from "../../stories/Button";
import { isLoggedInState, userInfoState } from "../..";
import { createToken, createMarketItem, purchase } from "../../contracts/api/second";

const Container = styled.div`
  padding: 8rem 0;
`;

const MintingContainer = styled.div`
  width: 50rem;
  margin: auto;
  @media screen and (max-width: 768px) {
    width: 23rem;
  }
`;

const TitleContainer = styled.header`
  text-align: left;
  padding-bottom: 3rem;
  @media screen and (max-width: 768px) {
    text-align: center;
  }
`;

const InputContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 4rem;
  }
`;

const InputTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    gap: 2rem;
  }
`;

const ChildMinting = () => {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const userInfo = useRecoilValue(userInfoState);
  const [itemTitle, setItemTitle] = useState<string>("");
  const [itemDesc, setitemDesc] = useState<string>("");
  const [itemTags, setitemTags] = useState<string[]>([]);
  const [itemFile, setitemFile] = useState<File>();

  const handleChangeSearchInput = (e: any) => {
    console.log(e.target.value);
  };
  const handleTitleChanged = (e: any) => {
    setItemTitle(e.target.value);
  };
  const handleDescChanged = (e: any) => {
    setitemDesc(e.target.value);
  };
  const handleTagChanged = (label: string) => {
    setitemTags((prev) => [...prev, label]);
  };
  const handleFileChanged = (file: File) => {
    setitemFile(file);
  };

  const onClickCreateToken = async () => {
    console.log("Click Mint DTT!!");
    console.log(itemTitle);
    console.log(itemDesc);
    console.log(itemTags);
    console.log(itemFile);
    try {
      if (!isLoggedIn) {
        return;
      }
      // createToken({ title, description, tokenUrl, isFirst, userAddress });
      // console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const onClickCreateMarketItem = async () => {
    try {
      // createMarketItem({ tokenId, price, userAddress });
      // console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const onClickPurchase = async () => {
    try {
      // purchase({ tokenId, price, userAddress });
      // console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <MintingContainer>
        <TitleContainer>
          <Title label={"2차 NFT 등록"} size={"1.5rem"}></Title>
        </TitleContainer>

        <Button
          label={"민팅"}
          width="7rem"
          backgroundColor="#6667ab"
          onClick={onClickCreateToken}
        ></Button>
        <Button
          label={"판매 등록"}
          width="7rem"
          backgroundColor="#6667ab"
          onClick={onClickCreateMarketItem}
        ></Button>
        <Button
          label={"구매"}
          width="7rem"
          backgroundColor="#6667ab"
          onClick={onClickPurchase}
        ></Button>

        <InputContainer>
          <FileDropBox handleFileChanged={handleFileChanged}></FileDropBox>
          <InputTextContainer>
            <InputBox
              placeholder="영감받은 원작 작품을 검색해 주세요."
              width="23rem"
              icon="magnifying-glass"
              onChange={handleChangeSearchInput}
            ></InputBox>
            <InputBox
              placeholder="작품 제목"
              width="23rem"
              onChange={handleTitleChanged}
            ></InputBox>
            <TextAreaBox
              placeholder="작품 설명"
              width="23rem"
              rows={6}
              onChange={handleDescChanged}
            ></TextAreaBox>
            <InputBox
              placeholder="태그"
              width="23rem"
              icon="hashtag"
              onChange={handleTagChanged}
            ></InputBox>
            <Button
              label={"작품 등록"}
              width="7rem"
              backgroundColor="#6667ab"
              onClick={onClickCreateToken}
            ></Button>
          </InputTextContainer>
        </InputContainer>
      </MintingContainer>
    </Container>
  );
};

export default ChildMinting;

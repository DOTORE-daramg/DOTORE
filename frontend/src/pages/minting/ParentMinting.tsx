import React from "react";
import styled from "styled-components";
import { Title } from "../../stories/Title";
import { InputBox, TextAreaBox } from "../../stories/InputBox";
import { FileDropBox } from "../../stories/minting/FileDropBox";
import { TagInputBox } from "../../stories/minting/TagInputBox";
import { Button } from "../../stories/Button";
import { useRecoilValue } from "recoil";
import { isLoggedInState, userInfoState } from "../..";
import { mintTokenContract } from "../../contracts";

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

const ParentMinting = () => {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const userInfo = useRecoilValue(userInfoState);

  const handleChangeTitleInput = (e: any) => {
    console.log(e.target.value);
  };
  const handleChangeDescInput = (e: any) => {
    console.log(e.target.value);
  };
  const handleChangeTagInput = (e: any) => {
    console.log(e.target.value);
  };

  const onClickMint = async () => {
    console.log("Click Mint!!");
    try {
      if (!isLoggedIn) {
        return;
      }
      const response = await mintTokenContract.methods
        .mintToken("www.ssafy.com")
        .send({ from: userInfo.address, gas: 3000000 });

      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const onClickBalanceOf = async () => {
    try {
      const balance = await mintTokenContract.methods
        .balanceOf(userInfo.address)
        .call();
      const fileUrlRes = await mintTokenContract.methods.fileUrls(1).call();

      console.log("balance: ", balance);
      console.log("fileUrlRes: ", fileUrlRes);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <MintingContainer>
        <TitleContainer>
          <Title label={"1차 NFT 등록"} size={"1.5rem"}></Title>
        </TitleContainer>

        <button onClick={onClickBalanceOf}>balance</button>

        <InputContainer>
          <FileDropBox></FileDropBox>
          <InputTextContainer>
            <InputBox
              placeholder="작품 제목"
              width="23rem"
              onChange={handleChangeTitleInput}
            ></InputBox>
            <TextAreaBox
              placeholder="작품 설명"
              width="23rem"
              rows={6}
              onChange={handleChangeDescInput}
            ></TextAreaBox>
            <TagInputBox></TagInputBox>
            {/* <InputBox
              placeholder="태그"
              width="23rem"
              icon="hashtag"
              onChange={handleChangeTagInput}
            ></InputBox> */}
            <Button
              label={"작품 등록"}
              width="7rem"
              backgroundColor="#6667ab"
              onClick={onClickMint}
            ></Button>
          </InputTextContainer>
        </InputContainer>
      </MintingContainer>
    </Container>
  );
};

export default ParentMinting;

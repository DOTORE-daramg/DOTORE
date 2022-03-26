import React from "react";
import styled from "styled-components";
import { Title } from "../../stories/Title";
import { InputBox, TextAreaBox } from "../../stories/InputBox";
import { FileDropBox } from "../../stories/minting/FileDropBox";
import { TagInputBox } from "../../stories/minting/TagInputBox";
import { Button } from "../../stories/Button";
import { useRecoilValue } from "recoil";
import { isLoggedInState, userInfoState } from "../..";
import { web3, mintTokenContract } from "../../contracts";

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
        .createPrMint(
          "행복회로",
          "돌아간다 어디서 타는 냄새",
          ["행복", "회로", "집단지성", "구경", "이해"],
          "https://w.namu.la/s/b46567c75bd8a9359a0ca3a8cb1b340f11b6b285e622cf9135faf12e3dbf98ba748c2697ba48f1419429982a2bf578efccb7787e2ac4faad1044b4d5363aeb2ea32d6f54c2baa4344bfd4cb3478521783b9670a1900658e94c096a33a31aa7d3"
        )
        .send({
          from: userInfo.address,
          gas: 3000000,
        });

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
      console.log("balance: ", balance);

      const pritems = await mintTokenContract.methods.getPrItems().call();
      console.log(pritems);
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

import React from "react";
import styled from "styled-components";
import { Title } from "../../stories/Title";
import { InputBox, TextAreaBox } from "../../stories/InputBox";
import { FileDropBox } from "../../stories/minting/FileDropBox";
import { TagInputBox } from "../../stories/minting/TagInputBox";
import { Button } from "../../stories/Button";
import { useRecoilValue } from "recoil";
import { isLoggedInState, userInfoState } from "../..";
import {
  dTT,
  dTTAddress,
  dTTMarketAddress,
  dTTMarketContract,
  web3,
} from "../../contracts";
import { createToken, createMarketItem, purchase } from "../../contracts/api/first";

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

  // const onClickBalanceOf = async () => {
  //   try {
  //     const balance = await dTT.methods.balanceOf(userInfo.address).call();
  //     console.log("balance: ", balance);
  //     console.log(
  //       await dTTMarketContract.getPastEvents("allEvents", { fromBlock: 1 })
  //     );
  //     console.log(await dTT.getPastEvents("allEvents", { fromBlock: 1 }));
  //     console.log(await dTTMarketContract.methods.dTT().call());

  //     // console.log(await dTTMarketContract.methods.idMarketItem(0).call());
  //     // console.log(await dTTMarketContract.methods.idMarketItem(1).call());
  //     // console.log(await dTTMarketContract.methods.idMarketItem(2).call());
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const onClickCreateToken = async () => {
    console.log("Click Mint DTT!!");
    try {
      if (!isLoggedIn) {
        return;
      }
      createToken({ title, description, tokenUrl, isFirst, userAddress });
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const onClickCreateMarketItem = async () => {
    try {
      createMarketItem({ tokenId, price, userAddress });
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const onClickPurchase = async () => {
    try {
      purchase({ tokenId, price, userAddress });
      console.log(response);
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
          </InputTextContainer>
        </InputContainer>
      </MintingContainer>
    </Container>
  );
};

export default ParentMinting;
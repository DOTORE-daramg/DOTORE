import React, { useState } from "react";
import styled from "styled-components";
import { Title } from "../../stories/Title";
import { InputBox, TextAreaBox } from "../../stories/InputBox";
import { FileDropBox } from "../../stories/minting/FileDropBox";
import { TagInputBox } from "../../stories/minting/TagInputBox";
import { Button } from "../../stories/Button";
import { useRecoilValue } from "recoil";
import { isLoggedInState, userInfoState } from "../..";
import { createToken } from "../../contracts/api/first";
import { postFile, postMintBefore } from "../../api/item";
import { modifyTokenId } from "../../api/item";

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
  const [itemTitle, setItemTitle] = useState<string>("");
  const [itemDesc, setitemDesc] = useState<string>("");
  const [itemTags, setitemTags] = useState<string[]>([]);
  const [itemFile, setitemFile] = useState<Blob>(new Blob());

  const handleTitleChanged = (e: any) => {
    setItemTitle(e.target.value);
  };
  const handleDescChanged = (e: any) => {
    setitemDesc(e.target.value);
  };
  const handleTagChanged = (label: string) => {
    setitemTags((prev) => [...prev, label]);
  };
  const handleFileChanged = (file: Blob) => {
    setitemFile(file);
  };
  const uploadFile = async () => {
    const data = new FormData();
    data.append("data", itemFile);
    const response = await postFile(data);
    return response.data.imageUrl;
  };

  const onClickCreateToken = async () => {
    try {
      if (!isLoggedIn) {
        return;
      }
      if (
        itemTitle === "" ||
        itemDesc === "" ||
        !itemFile ||
        itemFile.size === 0
      ) {
        return;
      }
      const format = itemFile.type.split("/")[0]; // 파일 포맷

      // 백엔드에 파일 업로드
      const fileUrl = await uploadFile(); // 받아온 Url

      // 블록체인 컨트랙트에게 요청
      const { tx, txHash } = await createToken({
        title: itemTitle,
        description: itemDesc,
        tokenUrl: fileUrl,
        tags: itemTags,
        format,
        userAddress: userInfo.address,
      });
      const tokenId = tx.events.Transfer.returnValues.tokenId;
      console.log(tokenId);

      modifyTokenId({ itemTrxHash: txHash, tokenId: tokenId });
      // tx.events.Transfer.returnValues.

      // 백엔드에게 TX Hash, 작품 정보 전송
      // const res = await postMintBefore({
      //   authorAddress: userInfo.address,
      //   format: format,
      //   isFirst: true,
      //   itemDescription: itemDesc,
      //   itemHash: fileUrl,
      //   itemTitle: itemTitle,
      //   itemTrxHash: hash,
      //   tags: itemTags,
      // });

      // console.log(res.data);

      // console.log(hash);
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
        <InputContainer>
          <FileDropBox handleFileChanged={handleFileChanged}></FileDropBox>
          <InputTextContainer>
            <InputBox
              placeholder="작품 제목"
              width="23rem"
              onChange={handleTitleChanged}
              value={itemTitle}
            ></InputBox>
            <TextAreaBox
              placeholder="작품 설명"
              width="23rem"
              rows={6}
              onChange={handleDescChanged}
              value={itemDesc}
            ></TextAreaBox>
            <TagInputBox handleTagChanged={handleTagChanged}></TagInputBox>
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

export default ParentMinting;

import React, { useState, useEffect } from "react";
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

const SubTitleContainer = styled.span<{ isRequired: boolean }>`
  margin: 0.8rem 0.8rem 0 0rem;
  font-size: 1.2rem;
  font-weight: 700;
  ::after {
    display: ${(props) => (props.isRequired ? "inline" : "none")};
    position: relative;
    top: -0.4rem;
    right: -0.2rem;
    font-size: 0.8rem;
    content: "*";
    color: red;
  }
`;

const SmallMutedText = styled.span`
  font-size: 0.6rem;
  color: rgb(112, 122, 131);
`;

const FormatInfo = styled.p`
  font-size: 0.9rem;
  padding: 0 0 0.8rem 0;
  color: rgb(112, 122, 131);
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
  gap: 3rem;
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
  const [titleValidation, setTitleValidation] = useState<boolean>(true);

  const handleTitleChanged = (e: any) => {
    setItemTitle(e.target.value);
    validateTitle();
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
    validateTitle();
    if (!titleValidation) {
      console.log("Bad title");
      return;
    } else if (itemFile.size === 0) {
      console.log("Upload File!");
      return;
    } else if (!itemDesc) {
      console.log("Write desc!");
      return;
    }
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

      // 토큰 아이디까지 받아왔다면 백엔드에 토큰 아이디 전달
      const tokenId = tx.events.Transfer.returnValues.tokenId;
      console.log(tokenId);

      modifyTokenId({ itemTrxHash: txHash, tokenId: tokenId });
    } catch (err) {
      console.error(err);
    }
  };

  const validateTitle = () => {
    const special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
    if (itemTitle.length < 1 || itemTitle.length > 100) {
      setTitleValidation(false);
    } else if (special_pattern.test(itemTitle)) {
      setTitleValidation(false);
    } else {
      setTitleValidation(true);
    }
  };

  useEffect(() => console.log(itemTitle), [itemTitle]);

  return (
    <Container>
      <MintingContainer>
        <TitleContainer>
          <Title label={"1차 NFT 등록"} size={"1.5rem"}></Title>
        </TitleContainer>
        <InputContainer>
          <div>
            <SubTitleContainer isRequired={true}>
              이미지, 비디오, 오디오
            </SubTitleContainer>
            <FormatInfo>
              JPEG, PNG, GIF, SVG, MP4, MP3, WAV Max Size: 10MB
            </FormatInfo>
            <FileDropBox handleFileChanged={handleFileChanged}></FileDropBox>
          </div>
          <InputTextContainer>
            <div>
              <SubTitleContainer isRequired={true}>제목</SubTitleContainer>
              <SmallMutedText>특수 문자 포함 불가</SmallMutedText>
              <InputBox
                placeholder="작품 제목"
                width="23rem"
                onBlur={handleTitleChanged}
              ></InputBox>
            </div>
            <div>
              <SubTitleContainer isRequired={true}>설명</SubTitleContainer>
              <TextAreaBox
                placeholder="작품 설명"
                width="23rem"
                rows={6}
                onBlur={handleDescChanged}
                maxLength={500}
              ></TextAreaBox>
            </div>
            <div>
              <SubTitleContainer isRequired={false}>태그</SubTitleContainer>
              <SmallMutedText>공백, 특수 문자 포함 불가</SmallMutedText>
              <TagInputBox handleTagChanged={handleTagChanged}></TagInputBox>
            </div>
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

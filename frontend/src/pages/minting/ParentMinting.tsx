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
import { postFile, modifyTokenId } from "../../api/item";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../stories/common/LoadingSpinner";
import {
  errorAlert,
  successAlert,
  warnAlert,
} from "../../stories/common/alert";

const Container = styled.div`
  padding: 8rem 0;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
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
  margin: 0.8rem 0;
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
  const [ispending, setisPending] = useState<boolean>(false);
  const navigate = useNavigate();

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
    if (!validateTitle()) {
      errorAlert("올바른 제목을 입력해주세요");
      return;
    } else if (itemFile.size === 0) {
      errorAlert("파일을 등록해주세요");
      return;
    } else if (!itemDesc) {
      errorAlert("내용을 입력해주세요");
      return;
    }
    try {
      if (!isLoggedIn) {
        return;
      }
      setisPending(true);
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

      modifyTokenId({ itemTrxHash: txHash, tokenId: tokenId });
      successAlert("민팅에 성공하였습니다!!");
    } catch (err: any) {
      if (err.code === 4001) {
        errorAlert("민팅을 취소하였습니다!!");
      } else {
        warnAlert("트랜잭션은 요청하였으나 처리가 지연되고 있습니다.");
      }
    }
    navigate(`/artist/${userInfo.address}`, { replace: true });
  };

  const validateTitle = () => {
    const special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
    if (
      itemTitle.length < 1 ||
      itemTitle.length > 100 ||
      special_pattern.test(itemTitle)
    ) {
      return false;
    }
    return true;
  };
  const onDeleteTag = (itemTag: string) => {
    const idx = itemTags.findIndex(
      (currentItemTag) => currentItemTag === itemTag
    );
    setitemTags((prev) => [...prev.slice(0, idx), ...prev.slice(idx + 1)]);
  };

  useEffect(() => {
    if (!isLoggedIn.isLoggedIn) {
      navigate(-1);
      errorAlert("로그인이 필요한 페이지입니다.");
    }
  }, [isLoggedIn]);

  return (
    <Container>
      {ispending && (
        <>
          <LoadingContainer>
            <div> 민팅 중입니다. 잠시만 기다려주세요</div>
            <LoadingSpinner />
          </LoadingContainer>
        </>
      )}
      {!ispending && (
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
                해당 저작물에 대한 자유로운 2차 저작과 상업적 이용을 허용합니다
              </FormatInfo>
              <FormatInfo>Max Size: 10MB</FormatInfo>
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
                <TagInputBox
                  handleTagChanged={handleTagChanged}
                  onDeleteTag={onDeleteTag}
                ></TagInputBox>
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
      )}
    </Container>
  );
};

export default ParentMinting;

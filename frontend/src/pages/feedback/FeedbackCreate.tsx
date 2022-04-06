import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import { Description } from "../../stories/detail/Description";
import { Image } from "../../stories/detail/Image";
import { Title } from "../../stories/Title";
import { TextEditor } from "../../stories/common/TextEditor";
import { useParams } from "react-router-dom";
import { getItem } from "../../api/item";
import { createParams } from "../../api/feedback";

const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 150px 0;
`;

const TitleContainer = styled.div`
  width: calc(28rem + 280px);
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
  padding: 10px 0;
  padding-left: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  @media screen and (max-width: 768px) {
    justify-content: center;
    width: 80%;
    padding: 0;
    padding-top: 40px;
  }
`;

const TextEditorContainer = styled.div`
  width: calc(28rem + 280px);
  padding-top: 3rem;
  @media screen and (max-width: 768px) {
    width: 80%;
  }
`;
export type Iitem = {
  authorAddress: string;
  itemTitle: string;
  itemHash: string;
  nickname: string;
  itemDescription: string;
  tokenId: number | undefined;
};

const FeedbackCreate = () => {
  const isPc = useMediaQuery({ minWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 500 });
  const viewMode = isPc
    ? "feedbackCreate"
    : isTablet
    ? "feedbackCreate"
    : "feedbackCreateM";

  const { tokenId } = useParams();
  const [item, setItem] = useState<Iitem>({
    authorAddress: "",
    itemTitle: "",
    itemHash: "",
    nickname: "",
    itemDescription: "",
    tokenId: Number(tokenId),
  });
  const { authorAddress, itemTitle, itemHash, nickname, itemDescription } =
    item;
  const onClick = () => {};
  useEffect(() => {
    getItem(tokenId).then((res) => {
      setItem(res.data);
    });
  }, []);
  return (
    <Container>
      <TitleContainer>
        <Title label="질문 등록" size="2rem" />
      </TitleContainer>
      {/* 상단 정보 Container */}
      <MainContainer>
        <Image name={itemTitle} imageUrl={itemHash} mode={viewMode} />
        <DescContainer>
          <Description
            title={itemTitle}
            descrition={itemDescription}
            profileImgUrl={itemHash}
            profileNickname={nickname}
            profileLevel="Lv.2 꼬맹이도토리"
            size="fit-content"
          />
        </DescContainer>
      </MainContainer>
      <TextEditorContainer>
        <TextEditor item={item}></TextEditor>
      </TextEditorContainer>
    </Container>
  );
};

export default FeedbackCreate;

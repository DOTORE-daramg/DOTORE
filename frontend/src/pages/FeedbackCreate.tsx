import React from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import { Description } from "../stories/detail/Description";
import { Image } from "../stories/detail/Image";
import { Title } from "../stories/Title";
import { TextEditor } from "../stories/common/TextEditor";

const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 0;
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
  justify-content: space-between;
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

const Detail = () => {
  const isPc = useMediaQuery({ minWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 500 });
  const viewMode = isPc ? "feedbackCreate" : isTablet ? "feedbackCreate" : "feedbackCreateM";

  return (
    <Container>
      <TitleContainer>
        <Title label="질문 등록" size="2rem" />
      </TitleContainer>
      {/* 상단 정보 Container */}
      <MainContainer>
        <Image
          name="메타콩즈1"
          imageUrl="https://cdn.apnews.kr/news/photo/202203/3000347_20366_1256.jpg"
          mode={viewMode}
        />
        <DescContainer>
          <Description
            title="안경 쓴 늑대가 담배 피우고 있는 작품 이름"
            descrition="의사 가운을 입고 있는 건가 봐요<br>
          폭죽이랑 활을 들고 있네요..<br>
          정말 알 수 없는 작품입니다<br>
          늑대인지 개인지 소닉인지.."
            profileImgUrl="https://m.secondmorning.co.kr/file_data/secondmorning/2020/11/11/e712578d88cb3d9ca67bfe33405aee6c.jpg"
            profileNickname="주비스"
            profileLevel="Lv.2 꼬맹이도토리"
            size="fit-content"
          />          
        </DescContainer>
      </MainContainer>
      <TextEditorContainer>
        <TextEditor></TextEditor>
      </TextEditorContainer>
    </Container>
  );
};

export default Detail;

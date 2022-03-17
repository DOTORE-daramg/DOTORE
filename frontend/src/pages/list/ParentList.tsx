import React from "react";
import styled from "styled-components";
import { InputBox } from "../../stories/InputBox";
import Category from "../../stories/list/Category";
import { Title } from "../../stories/Title";

const Container = styled.div`
  height: 100vh;
  margin: 100px 200px;

  @media screen and (max-width: 768px) {
    margin: 60px;
  }
`;
const SideContainer = styled.div`
  height: 100%;
  margin-top: 30px;
`;
const CategoryContainer = styled.div`
  display: flex;
  width: 10rem;
  justify-content: space-between;
  margin: 30px 0;
`;
const InnerContainer = styled.div``;

const ParentList = () => {
  return (
    <Container>
      <Title label="1차 NFT 보기" size="2rem"></Title>
      <InnerContainer>
        <SideContainer>
          <InputBox width="12rem" placeholder="작품명 / 작가명 검색" />
          <CategoryContainer>
            <Category label="최신순" isSelected={true} />
            <Category label="인기순" isSelected={false} />
            <Category label="가격순" isSelected={false} />
          </CategoryContainer>
        </SideContainer>
      </InnerContainer>
    </Container>
  );
};

export default ParentList;

import React from "react";
import styled from "styled-components";
import { InputBox } from "../../stories/InputBox";
import Category from "../../stories/list/Category";
import Checkbox from "../../stories/list/Checkbox";
import ItemSkeleton from "../../stories/list/ItemSkeleton";
import { Title } from "../../stories/Title";

const Container = styled.div`
  height: fit-content;
  margin: 100px 200px;

  @media screen and (max-width: 768px) {
    margin: 60px 0;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
  }
`;
const SideContainer = styled.div`
  width: 20rem;
  height: 100%;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    width: 100%;
    align-items: center;
  }
`;
const FilterContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;
const CategoryContainer = styled.div`
  display: flex;
  width: 10rem;
  justify-content: space-between;
  margin: 30px 0;
  @media screen and (max-width: 768px) {
    width: 45%;
  }
`;

const CheckboxContainer = styled.div`
  width: 10rem;
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    width: 50%;
    flex-direction: row;
    align-items: center;
  }
`;
const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const MainContainer = styled.div`
  width: calc(100vw-rem);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ParentList = () => {
  return (
    <Container>
      <Title label="1차 NFT 보기" size="2rem"></Title>
      <InnerContainer>
        <SideContainer>
          <InputBox width="80%" placeholder="작품명 / 작가명 검색" />
          <FilterContainer>
            <CategoryContainer>
              <Category label="최신순" isSelected={true} />
              <Category label="인기순" isSelected={false} />
              <Category label="가격순" isSelected={false} />
            </CategoryContainer>
            <CheckboxContainer>
              <Checkbox label="이미지" />
              <Checkbox label="영상" />
              <Checkbox label="음성" />
            </CheckboxContainer>
          </FilterContainer>
        </SideContainer>
        <MainContainer>
          <ItemSkeleton />
          <ItemSkeleton />
          <ItemSkeleton />
          <ItemSkeleton />
          <ItemSkeleton />
          <ItemSkeleton />
          <ItemSkeleton />
          <ItemSkeleton />
          <ItemSkeleton />
        </MainContainer>
      </InnerContainer>
    </Container>
  );
};

export default ParentList;

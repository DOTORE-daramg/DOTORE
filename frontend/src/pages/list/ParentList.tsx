import React from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import StyledPagination from "../../stories/common/StyledPagination";
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
  width: 15rem;
  margin-right: 10rem;
  height: 100%;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    width: 80%;
    align-items: center;
    margin-right: 0;
  }
`;
const FilterContainer = styled.div`
  width: 100%;
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
    justify-content: space-around;
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
  width: calc(100vw - 20rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;
const ItemContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  place-items: center;
  @media screen and (max-width: 768px) {
    width: 90%;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
  }
`;
const ParentList = () => {
  const isPc = useMediaQuery({ minWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 500 });
  const viewMode = isPc ? "15rem" : isTablet ? "15rem" : "13rem";
  return (
    <Container>
      <Title label="1차 NFT 보기" size="2rem"></Title>
      <InnerContainer>
        <SideContainer>
          <InputBox width="100%" placeholder="작품명 / 작가명 검색" />
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
          <ItemContainer>
            <ItemSkeleton width={viewMode} />
            <ItemSkeleton width={viewMode} />
            <ItemSkeleton width={viewMode} />
            <ItemSkeleton width={viewMode} />
            <ItemSkeleton width={viewMode} />
            <ItemSkeleton width={viewMode} />
            <ItemSkeleton width={viewMode} />
            <ItemSkeleton width={viewMode} />
            <ItemSkeleton width={viewMode} />
          </ItemContainer>
          <StyledPagination />
        </MainContainer>
      </InnerContainer>
    </Container>
  );
};

export default ParentList;

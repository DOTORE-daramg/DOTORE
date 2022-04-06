import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import { viewSecond } from "../../api/item";
import StyledPagination from "../../stories/common/StyledPagination";
import { InputBox } from "../../stories/InputBox";
import Category from "../../stories/list/Category";
import Checkbox from "../../stories/list/Checkbox";
import Item, { ItemProps } from "../../stories/list/Item";
import ItemSkeleton from "../../stories/list/ItemSkeleton";
import { Title } from "../../stories/Title";
import {
  CategoryContainer,
  CheckboxContainer,
  Container,
  FilterContainer,
  InnerContainer,
  ItemContainer,
  MainContainer,
  Message,
  SideContainer,
} from "./List";

const SecondList = () => {
  const isPc = useMediaQuery({ minWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 500 });
  const viewMode = isPc ? "15rem" : isTablet ? "15rem" : "13rem";

  const [items, setItems] = useState<ItemProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSelected, setIsSelected] = useState<number>(0);
  const categories = ["최신순", "인기순"];

  useEffect(() => {
    viewSecond()
      .then((res) => {
        if (isSelected === 0) {
          // 최신순
          setItems(res.data.data);
        } else if (isSelected === 1) {
          // 인기순
          setItems(
            res.data.data.sort((a: ItemProps, b: ItemProps) => {
              return b.like - a.like;
            })
          );
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [isSelected]);

  return (
    <Container>
      <Title label="NFT 보기" size="2rem"></Title>
      <InnerContainer>
        <SideContainer>
          <InputBox width="100%" placeholder="작품명 / 작가명 검색" />
          <FilterContainer>
            <CategoryContainer>
              {categories.map((category, index) => (
                <Category
                  key={index}
                  label={category}
                  onClick={() => setIsSelected(index)}
                  isSelected={isSelected === index ? true : false}
                />
              ))}
            </CategoryContainer>
            {/* <CheckboxContainer>
              <Checkbox label="이미지" />
              <Checkbox label="영상" />
              <Checkbox label="음성" />
            </CheckboxContainer> */}
          </FilterContainer>
        </SideContainer>
        <MainContainer>
          {isLoading ? (
            <ItemContainer>
              <ItemSkeleton width={viewMode} />
              <ItemSkeleton width={viewMode} />
              <ItemSkeleton width={viewMode} />
              <ItemSkeleton width={viewMode} />
              <ItemSkeleton width={viewMode} />
              <ItemSkeleton width={viewMode} />
              <ItemSkeleton width={viewMode} />
              <ItemSkeleton width={viewMode} />
            </ItemContainer>
          ) : items && items.length > 0 ? (
            <ItemContainer>
              {items.map((item, index) => (
                <Item key={index + String(item.tokenId)} {...item} />
              ))}
            </ItemContainer>
          ) : (
            <>
              <Message>등록된 작품이 없습니다.</Message>
            </>
          )}
          {/* <StyledPagination /> */}
        </MainContainer>
      </InnerContainer>
    </Container>
  );
};

export default SecondList;

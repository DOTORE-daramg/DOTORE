import React from "react";
import styled from "styled-components";
import { Iitem } from "../../pages/feedback/FeedbackCreate";
import { Image } from "../detail/Image";

const Container = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 1.5rem;
  cursor: pointer;
  :hover {
    background-color: #ccc;
  }
`;
const SearchResult = ({ item, onClick }: any) => {
  return (
    <Container onClick={onClick}>
      <Image
        imageUrl={item.itemHash}
        name={item.itemTitle}
        mode="trade"
      ></Image>
      <div>{item.itemTitle}</div>
    </Container>
  );
};

export default SearchResult;

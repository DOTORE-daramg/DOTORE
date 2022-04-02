import React from "react";
import styled from "styled-components";
import { Iitem } from "../../pages/feedback/FeedbackCreate";
import { Image } from "../detail/Image";

const Container = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  margin: 20px;
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
